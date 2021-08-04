export const standard = defineScenario({
  // @ts-expect-error only one organization required
  organization: {
    one: {
      id: '6a82a1cc-1e2f-47d6-a3e7-ce31c71450fa',
      name: 'Acme Corp',
    },
  },
  account: {
    one: {
      id: '45e805e0-ced7-418c-9ffa-16546ee436cd',
      email: 'foo.bar@acme.corp',
      firstName: 'Foo',
      lastName: 'Bar',
      organizationId: null,
      hashedPassword: '',
      salt: '',
    },
    two: {
      id: 'c97decb8-9df0-4be9-a462-358534465480',
      email: 'baz.raz@example.net',
      firstName: 'Baz',
      lastName: 'Raz',
      organizationId: '6a82a1cc-1e2f-47d6-a3e7-ce31c71450fa',
      hashedPassword: '',
      salt: '',
    },
  },
})

export type OrganizationStandard = typeof standard
