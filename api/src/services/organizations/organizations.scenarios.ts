import { CerberusAdminTuple } from 'src/constants/permission'

export const standard = defineScenario({
  organization: {
    one: {
      id: '6a82a1cc-1e2f-47d6-a3e7-ce31c71450fa',
      name: 'Acme Corp',
    },
    two: {
      id: 'e5a15b0b-06a8-4773-9812-0ce5d6e8b7d2',
      name: 'Example Inc.',
    },
  },
  // @ts-expect-error only need 1 permission
  permission: {
    one: {
      ...CerberusAdminTuple,
    },
  },
  account: {
    one: {
      id: '45e805e0-ced7-418c-9ffa-16546ee436cd',
      email: 'foo.bar@acme.corp',
      name: 'Foo Bar',
      organizationId: null,
      hashedPassword: '',
      salt: '',
    },
    two: {
      id: 'c97decb8-9df0-4be9-a462-358534465480',
      email: 'baz.raz@example.net',
      name: 'Baz Raz',
      organizationId: '6a82a1cc-1e2f-47d6-a3e7-ce31c71450fa',
      hashedPassword: '',
      salt: '',
    },
  },
  // @ts-expect-error only need 1 confirmation
  account_Confirmation: {
    one: {
      id: '1ef01680-a2d9-4146-935e-78a88dd251e4',
      code: 'PFBL7LE9',
      email: 'john.doe@acme.corp',
      organizationId: '6a82a1cc-1e2f-47d6-a3e7-ce31c71450fa',
    },
  },
})

export type OrganizationStandard = typeof standard
