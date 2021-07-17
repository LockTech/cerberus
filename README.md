# Cerberus

A control panel and platform for self-managed, multi-tenant identity and permission management.

Built using the [RedwoodJS framework](https://redwoodjs.com) and [Ory Keto](https://www.ory.sh/keto/docs/next/).

## Introduction

The [identity](#identity-management) and [permission](#permission-management) management sections of this `README` provide more detailed information on each respective feature.
These sections also provide usage information.

These features are designed for the benefit of many, distinct applications.
These distinct applications are expected to make use of the identities offered by Cerberus, letting the applications focus on their technical goals.
More information about the nature of an application's relationship to Cerberus can be found under the [applications](#applications) section of this document.

Finally, the "self-managed" portion of Cerberus comes from the fact that it is expected each indavidual organization manage their identities on their own terms.
Organizations are free to invite new members, edit those members, remove them, and assign permissions to them - all done independent any other organization.

> To be specific, Cerberus is a multi-tenant application which uses a single, multi-tenant database. Tenant distinguishing is done at table-level.
>
> [This article](https://www.endpoint.com/blog/2018/03/multi-tenant-architecture/#types-of-multi-tenancy) by Gaurav Soni provides an adequate description of the differences in multi-tenant architectures.
>
> This architecture **is not** required by applications which rely upon Cerberus' functionality; they are free to implement multi-tenancy however best fits their needs.

## Installation

To be written

## Dependencies

In addition to the dependencies outlined in [RedwoodJS' introduction](https://redwoodjs.com/docs/introduction#technologies), the following are used by the Cerberus RedwoodJS application.

* [HeadlessUI (React)](https://headlessui.dev/)
* [i18next](https://www.i18next.com/)
* [PostgreSQL](https://www.postgresql.org/)
* [react-hook-form](https://react-hook-form.com/)
* [RecoilJS](https://recoiljs.org/)
* [TailwindCSS](https://tailwindcss.com/)
  * [Autoprefixer](https://github.com/postcss/autoprefixer)
  * [PostCSS](https://github.com/postcss/postcss)

### Indirect Dependencies

These dependencies are not directly required by Cerberus' RedwoodJS application, but are required for its full functionality.

They must be installed alongside the application.

* [Ory Keto](https://www.ory.sh/keto/docs/next/)

### Optional Dependencies

LockTech provides configuration for an [API gateway](https://github.com/LockTech/poseidon) and a [relational database](https://github.com/LockTech/portunus).

While not required, the linked repositories may provide utility for setting up the application in a development or production environment.

## Contributing

How the application is configured and works, with respect to contributing, [can be found in the `CONTRIBUTING.md` document](CONTRIBUTING.md).

Please read through it and the remainder of this `README` before submitting contributions for approval.

---

## Glossary

While most of the terminology used by Cerberus is obvious, common ideas have been explicity defined here to standardize the language used by and when describing the platform.

* Organization - The tenants of this multi-tenant platform. Each organization is independent another; organizations can only manage the identities which belong to them.
* Identity - A "user" or "account" which contains information identifying an indavidual in a particular organization.
* Member - The indaviduals of an organization, who use their identity to access various features and services.
  * "Member" is perferred, to "identitiy", when speaking *to* an end-user of the Cerberus platform;
  "Manage your organization's identities" would become "Manage your organization's members".
  * A member is a person, an identity is a thing.

## Applications

As stated above, Cerberus was designed for, among many things, the benefit of other applications.

> One of the unstated, yet implied, requirements of these applications is that a multi-tenant architecture makes sense.
>
> Cerberus has **not** been designed to act in the interest of single-tenant systems.

At a minimum, applications can make use of the identities stored by Cerberus; this provides them a shared space for implementing personalized content that is dependent upon
the concept of an "account". It also removes a burden from these applications, resulting in them not needing to provide identity management themselves.

Applications can also make permissions known to Cerberus, letting the platform act as the tool which organizations may use to provide access to their identities concerning what
features they can access.

## Identity Management

Identity (a.k.a. "user") management functionality is driven by [RedwoodJS' dbAuth](https://redwoodjs.com/docs/authentication#self-hosted-auth-installation-and-setup).

An identity represents an indavidual in an organization, and each identity can only be a member of a single organization.

An organization's first identity is created when one of its members `signs up`. This will send them a confirmation e-mail. After clicking it an navigating back to the Cerberus application,
the user will complete signing up; this will include naming the organization and creating the default, Administrator role and setting its permissions.

Other members of the organization can be `invited` by an administrator. These identities will have no permissions, and will need to go through a similar confirmation step as described above.

Administrators may also use Cerberus to manage invited members:
* Updating an identity's details, such as its: name, e-mail, and initiating the password-reset process.
* Removing an identity from the administrator's organization.
* Adjusting an identity's permissions.

### Authenticating Identities

## Permission Management

Permissions are made possible thanks to [Ory Keto](https://www.ory.sh/keto/docs/next/).

> Ory Keto is the first and only open source implementation of "Zanzibar: Google's Consistent, Global Authorization System"...

Cerberus is responsible for [`writing`](https://www.ory.sh/keto/docs/next/reference/rest-api#write) [relation-tuples](https://www.ory.sh/keto/docs/next/concepts/relation-tuples)
to Keto, based on end-user interaction with the web-side of Cerberus' RedwoodJS application, facilitated by its API-side; and using information supplied by application-developers.

Other applications can then [`check`](https://www.ory.sh/keto/docs/next/reference/rest-api#check-a-relation-tuple) if a given identity has been assigned an expected permission.

### Submitting Permissions

Applications are required to submit their permissions to Cerberus before they can be used by an end-user. This processs can be broken down into 2 steps:

#### 1) Creating a Namespace

To better organize relation-tuples, Keto provides the concept of [Namespaces](https://www.ory.sh/keto/docs/next/concepts/namespaces). Applications should take full advantage of this feature to better organize their own permissions. These namespaces will be used by Cerberus when `writing` a relation-tuple to Keto.

An application **is not** limited to a single namespace. Instead, they may use any number to best represent the permissions of their features. It is recommended that applications prefix their namespace with a unique name used to identify the application. It's best if this name is the same which is used in step 2.

> You are responsible for [configuring](https://www.ory.sh/keto/docs/reference/configuration), [defining](https://github.com/ory/keto/blob/f8af777f0b2040aa00fe65a33ad0269595232124/contrib/cat-videos-example/keto.yml#L6), and [migrating](https://www.ory.sh/keto/docs/next/concepts/namespaces#migrations) namespaces to your instance of Keto prior to them being used by Cerberus.
>
> A more detailed explanation of how namespaces can be defined will be written at a later date; Keto's documentation and [examples](https://github.com/ory/keto/tree/master/contrib) provide sufficent information to get started.

#### 2) `POST` a permission-tuple to Cerberus

Finally, an application (or you, manually) must `POST` a permission-tuple.

These objects are used by Cerberus to create the relation-tuples that will ultimately be `written` to Keto. Each permission-tuple has a one to one relationship with an application's permission. Below is an example of what a common permission-tuple may resemble:

```YAML
{
  "application": "foo", // The unique application-name described in step 1
  "namespace": "foo_publish_books", // The namespace, created in step 1
  "object": "",
  "relation": "can",
}
```

Where [`object` and `relation`](https://www.ory.sh/keto/docs/next/concepts/objects) are other parts of Keto's relation-tuple.

### Internationalizing Permissions

Cerberus makes use of the [i18n](https://www.i18next.com/) framework.

You can make use of this framework, to provide better context and a more human-friendly experience to users making use of your application's permissions.

[Translations are located on the web-side](web/locales) of the application. Your permission's locales should be added to either a new or
[existing](web/src/locales/en/permissions.json) `permissions.json`.

The structure of these translations should resemble the following, in continuing the example from above:

```YAML
{
  "foo": { // "application"
    "title": "Foo's Book Publishing",
    "foo_publish_books::can": { // "namespace:object:relation"
      "title": "Publish",
      "summary": "Provide permission to publish new books to the site and send it to printing."
    }
  }
}
```

> This workflow is subject to change, taking advantage of [i18n's backend functionality](https://www.i18next.com/overview/plugins-and-utils#backends) to load translations from
> a remote location, removing the need to rebuild the web-side yourself.

> As you can imagine, permissions which target specific objects may get tricky to localize.
>
> This is more a warning, the solution I've imagined is to not provide object-specific permissions to Cerberus, but to manage it at the application-level.

> If you happen to translate `en/common.json` and `en/permissions.json` for your own use, *please* consider submitting a PR to push that addition back to this repository :)

## Roles

Identities are not directly assigned permissions. Instead, this association is decoupled into the concept of Roles.

Permissions are assigned to roles, roles are then assigned to identities. Many identities can share the same role, and an identity can be assigned many roles.

To an application which depends upon Cerberus' functionality, the distinction between who carries what role is arbitrary: the application can `check` if an identity
has been assigned an expected permission without knowing anything about the roles which that user has, or that roles exist at all.

> The following is not required to make use of Cerberus, but helps to provide an understanding of how Keto is put to use and how your permission-tuples are being used.
>
> Hopefully this illustrates how you can use Keto's features, such as [subject sets](https://www.ory.sh/keto/docs/next/concepts/subjects#subject-sets), to extend Cerberus'
> features in your application.

The permissions a role has been assigned are represented in Keto using a relation-tuple which would resemble the following, using the example given from the Permissions Management section above.

```YAML
{
  "namespace": "foo_publish_books",
  "object": "",
  "relation": "can",
  "subject": "cerberus_roles:role_id#",
}
```

Here a [subject set](https://www.ory.sh/keto/docs/next/concepts/subjects#subject-sets) is used; this is combined with an [empty relation](https://www.ory.sh/keto/docs/next/concepts/subjects#subject-sets), a feature of Keto which is demonstrated in [this section of Keto's documentation](https://www.ory.sh/keto/docs/next/performance#check-engine).

The relation-tuple this set maps to can be defined as by:

```YAML
{
  "namespace": 'cerberus_roles',
  "object": role_id,
  "relation": 'has',
  "subject": user_id
}
```

## Checking Permissions

An application can [`check`](https://www.ory.sh/keto/docs/next/reference/rest-api#check-a-relation-tuple) a given identity has a permission by sending a request
or using an [API](https://www.ory.sh/keto/docs/next/reference/proto-api).

As stated in the Roles section, an application only needs to know the information given in a permission-tuple and an identity's UUID. The UUID is obtained once a member has been successfully authenticated.

Using the example given in Permission Management, a `check` request may resemble:

```YAML
{
  "namespace": "foo_publish_books",
  "object": "",
  "relation": "can",
  "subject": user_id
}
```

## Licensing

The Cerberus platform is provided under the [GNU Affero General Public License](https://www.gnu.org/licenses/agpl-3.0.en.html).

This choice was made to ensure further work done on the platform, whether pushed to this repository or not, is always available for the benefit of everyone.
