# Cerberus

> This is a WIP project which is not suitable for production use.

A control panel and platform for self-managed, multi-tenant account and permission management.

Built using the [RedwoodJS framework](https://redwoodjs.com) and [Ory Keto](https://www.ory.sh/keto/docs/next/). This platform is intended for web applications, and has been designed specifically to work well with other RedwoodJS applications.

## Introduction

The [account](#account-management) and [permission](#permission-management) management sections of this `README` provide more detailed information on each respective feature.

These features are designed for the benefit of many, distinct applications. These distinct applications are expected to make use of the accounts offered by Cerberus, letting the applications focus on their technical goals.
More information about the nature of an application's relationship to Cerberus can be found under the [applications](#applications) section of this document.

Finally, the "self-managed" portion of Cerberus comes from the fact that it is expected each indavidual organization manage their accounts on their own terms.
Organizations are free to invite new members, edit those members, remove them, and assign permissions to them - all done independent any other organization.

> As described in [Account Management](#account-management), this independence is enforced down to an identitiy's `email`.

> To be specific, Cerberus is a multi-tenant application which uses a single, multi-tenant database. Tenant distinguishing is done at table-level.
>
> [This article](https://www.endpoint.com/blog/2018/03/multi-tenant-architecture/#types-of-multi-tenancy) by Gaurav Soni provides an adequate description of the differences in multi-tenant architectures.
>
> This architecture **is not** required by applications which rely upon Cerberus' functionality; they are free to implement multi-tenancy however best fits their needs.

## Installation

To be written

### Configuration

#### RedwoodJS Application

All of Cerberus' RedwoodJS application's configuration can be done through environment variables; a file, `.env`, should be located at the project's root. An example of supported values can be found in [`.env.example`](./.env.example).

> Remember that the `.env` used by your application in production should **never** be checked into source-control (ex: GitHub).
> This is setup by default via [`.gitignore`](.gitignore)

All variables are available to the API-side of the application. Only variables specified under `web/includeEnvironmentVariables` in [`redwood.toml`](redwood.toml) will be included on the web-side; [as-per RedwoodJS' documentation](https://redwoodjs.com/docs/environment-variables.html#production), prefixing a variable with `REDWOOD_ENV_` will have the same effect. Changing variables on the web-side will require rebuilding.

#### Keto

If you use the provided [`docker-compose.yml`](docker-compose.yml), [Keto can be configured](https://www.ory.sh/keto/docs/next/reference/configuration) by creating a `./config/keto` directory and adding the configuration to a `keto.yml` file. Here is an example which adds Cerberus' roles namespace (which is required) and an example application's.

> By default, the entire `./config/` directory, and its children, are specified in this repository's accompanying [`.gitignore`](.gitignore).

```YAML
namespaces:
  - id: 0
    name: cerberus_roles
  - id: 1
    name: foo_books

dsn: postgres://keto:secret@database:5432/keto
```

## Dependencies

In addition to the dependencies outlined in [RedwoodJS' introduction](https://redwoodjs.com/docs/introduction#technologies), the following are used by the Cerberus RedwoodJS application.

### Shared

* [TypeScript](https://www.typescriptlang.org/)

### API Side

* [Nodemailer](https://nodemailer.com/about/)
* [SquirrellyJS](https://squirrelly.js.org/)
* [UUID](https://www.npmjs.com/package/uuid) ([types](https://www.npmjs.com/package/@types/uuid))

### Web Side

* [HeadlessUI (React)](https://headlessui.dev/)
* [i18next](https://www.i18next.com/)
* [niceramps](https://github.com/MathGeniusJodie/niceramps)
* [PostgreSQL](https://www.postgresql.org/)
* [react-hook-form](https://react-hook-form.com/)
* [RecoilJS](https://recoiljs.org/)
* [TailwindCSS](https://tailwindcss.com/)
  * [Autoprefixer](https://github.com/postcss/autoprefixer)
  * [PostCSS](https://github.com/postcss/postcss)

### Indirect Dependencies

These dependencies are not directly required by Cerberus' RedwoodJS application, but are required for its full functionality.

They must be installed alongside the application.

* [Ory Keto](https://www.ory.sh/keto/docs/next/) - An example of using Keto with [Docker](https://www.docker.com/) can be found in this repository's [`docker-compose.yml`](docker-compose.yml).
* As shown in [the `.env.example` file](.env.example), a server configured to, at a minimum, relay emails using SMTP.

### Optional Dependencies

LockTech provides configuration for an [API gateway](https://github.com/LockTech/poseidon) and a [relational database](https://github.com/LockTech/portunus).

While not required, the linked repositories may provide utility for setting up the application in a development or production environment.

## Contributing

How the application is configured and works, with respect to contributing, [can be found in the `CONTRIBUTING.md` document](CONTRIBUTING.md).

Please read through it and the remainder of this `README` before submitting contributions for approval.

---

## Preface

[Cerberus' wiki](https://github.com/LockTech/cerberus/wiki) contains information detailing the platform and how it operates and can be used.

This `README` was created prior to any work being done on the platform, and serves as its executive summary. Eventually, the wiki linked above will fully replace it.

That said, please take this document as the intended state of Cerberus, where as the wiki is an update-to-date documentation of its current state.

## Glossary

While most of the terminology used by Cerberus is obvious, common ideas have been explicity defined here to standardize the language used by and when describing the platform.

* **Organization** - The tenants of this multi-tenant platform. Each organization is independent another; organizations can only manage the accounts which belong to them.
* **Account** - A "user" or "account" which contains information identifying an indavidual in a particular organization.
* **Member** - The indaviduals of an organization, who use their account to access various features and services.
  * "Member" is perferred, to "account", when speaking *to* an end-user of the Cerberus platform;
  "Manage your organization's accounts" would become "Manage your organization's members".
  * A member is a person, an account is a thing.
  * A member could have many accounts; so long as they have many emails backing those accounts.
* **Administrator** - A member of an organization who has access to managing the organization's accounts.

## Applications

As stated above, Cerberus was designed for, among many things, the benefit of other applications.

> One of the unstated, yet implied, requirements of these applications is that a multi-tenant architecture makes sense.
>
> Cerberus has **not** been designed to act in the interest of single-tenant systems.

At a minimum, applications can make use of the accounts stored by Cerberus; this provides them a shared space for implementing personalized content that is dependent upon the concept of an "account".

Applications can also make permissions known to Cerberus, letting the platform act as the tool which organizations may use to provide access to their accounts concerning what
features those accounts can access.

## Account Management

Account (a.k.a. "user") management functionality is driven by [RedwoodJS' dbAuth](https://redwoodjs.com/docs/authentication#self-hosted-auth-installation-and-setup).

An account represents an indavidual in an organization, and each account can only be a member of a single organization. Uniquness is determined using an account's `email`.

An organization's first account is created when one of its members `signs up`. This will send them a confirmation e-mail. After clicking it and navigating back to the Cerberus application, filling out the given fields, the user will complete sign up; this will include providing the member's name, naming the organization, and creating the default, Administrator role, setting its permissions.

Other members of the organization can be `invited` by an administrator. These accounts will have no permissions, and will need to go through a similar confirmation step as described above.

Administrators may also use Cerberus to manage invited members:
* Updating an account's details, such as its: name, e-mail, and initiating the password-reset process.
* Removing an account from the administrator's organization.
* Adjusting an account's permissions.

### Authenticating Accounts

To be written; requires exploration.

### Using a Session

To be written; requires exploration.

## Permission Management

Permissions are made possible thanks to [Ory Keto](https://www.ory.sh/keto/docs/next/).

> Ory Keto is the first and only open source implementation of "Zanzibar: Google's Consistent, Global Authorization System"...

> Cerberus takes steps to limit the performance impact of deeply nested relations. If you plan to extend much of Cerberus' permissions functionality, ensure you read through Keto's [performance](https://www.ory.sh/keto/docs/next/performance/) considerations.
>
> Cerberus' permission and [roles](#roles) system will always have a depth of 1, [the relation between a permission->role->account](#relation-tuples-mocked). Assigning permissions directly in your application will, in-fact, improve performance by limiting it to permission->account.

Cerberus is responsible for [`writing`](https://www.ory.sh/keto/docs/next/reference/rest-api#write) [relation-tuples](https://www.ory.sh/keto/docs/next/concepts/relation-tuples)
to Keto, based on end-user interaction with the web-side of Cerberus' RedwoodJS application, facilitated by its API-side; and using information supplied by application-developers.

Other applications can then [`check`](https://www.ory.sh/keto/docs/next/reference/rest-api#check-a-relation-tuple) if a given account has been assigned an expected permission.

### Submitting Permissions

Applications are required to submit their permissions to Cerberus before they can be used by an end-user. This processs can be broken down into 2 steps:

#### 1) Creating a Namespace

To better organize relation-tuples, Keto provides the concept of [Namespaces](https://www.ory.sh/keto/docs/next/concepts/namespaces). Applications should take full advantage of this feature to better organize their own permissions. These namespaces will be used by Cerberus when `writing` a relation-tuple to Keto.

An application **is not** limited to a single namespace. Instead, they may use any number to best represent the permissions of their features. It is recommended that applications prefix their namespace with a unique name used to identify the application. It's best if this name is the same which is used in step 2.

> You are responsible for [configuring](https://www.ory.sh/keto/docs/reference/configuration), [defining](https://github.com/ory/keto/blob/f8af777f0b2040aa00fe65a33ad0269595232124/contrib/cat-videos-example/keto.yml#L6), and [migrating](https://www.ory.sh/keto/docs/next/concepts/namespaces#migrations) namespaces to your instance of Keto prior to them being used by Cerberus.
>
> A more detailed explanation of how namespaces can be defined will be written at a later date; Keto's documentation and [examples](https://github.com/ory/keto/tree/master/contrib) provide sufficent information to get started.

#### 2) `POST` a permission-tuple to Cerberus

Finally, an application (or you, manually) must `POST` your permission-tuple(s).

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

Cerberus makes use of the [i18n framework](https://www.i18next.com/).

You can make use of this framework, to provide better context and a more human-friendly experience to users making use of your application's permissions.

[Translations are located on the web-side](web/locales) of the application. Your permission's locales should be added to either a new or [existing](web/src/locales/en/permissions.json) `permissions.json`.

The structure of these translations should resemble the following, in continuing with the example from above:

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

Accounts are not directly assigned permissions. Instead, this association is decoupled into the concept of Roles.

Permissions are assigned to roles, roles are then assigned to accounts. Many accounts can share the same role, and an account can be assigned many roles.

To an application which depends upon Cerberus' functionality, the distinction between who carries what role is arbitrary: the application can `check` if an account
has been assigned an expected permission without knowing anything about the roles which that user has, or that roles exist at all.

Roles cannot extend the permissions of another role. This choice was made as a [performance](https://www.ory.sh/keto/docs/next/performance) consideration, to limit the depth of `checks`.

### Relation-tuples mocked

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
  "subject": "cerberus_roles:role_id#" // role_id - a UUID generated during role creation
}
```

Here, a [subject set](https://www.ory.sh/keto/docs/next/concepts/subjects#subject-sets) is used; this is combined with an [empty relation](https://www.ory.sh/keto/docs/next/concepts/subjects#subject-sets), a feature of Keto which is demonstrated in [this section of its documentation](https://www.ory.sh/keto/docs/next/performance#check-engine).

A relation-tuple which would fulfil this subject-set would resemble:

```YAML
{
  "namespace": 'cerberus_roles',
  "object": role_id,
  "relation": 'has',
  "subject": user_id // an account's UUID
}
```

> [Recall from Keto](https://www.ory.sh/keto/docs/next/concepts/relation-tuples) that relation-tuples, "...can be translated into the english sentence 'Subject has relation on object'".

This is the workflow which powers [checking an account has been assigned an expected permission](#checking-permissions).

## Checking Permissions

An application can [`check`](https://www.ory.sh/keto/docs/next/reference/rest-api#check-a-relation-tuple) a given account has a permission by sending a request or using an [API](https://www.ory.sh/keto/docs/next/reference/proto-api) provided by Keto.

As stated in the Roles section, an application only needs to know the information given in a permission-tuple and an account's UUID. The UUID is obtained once a member has been successfully authenticated.

Using the example given in Permission Management and Roles, a `check` request may resemble:

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
