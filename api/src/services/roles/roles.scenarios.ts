export const standard = defineScenario({
  // @ts-expect-error only need two organizations
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
  account: {
    one: {
      email: 'foo.bar@acme.corp',
      name: 'Foo Bar',
      id: '00fa2b1a-40d1-4c32-be0c-516d86872970',
      organizationId: '6a82a1cc-1e2f-47d6-a3e7-ce31c71450fa',
      hashedPassword: '',
      salt: '',
      verified: false,
    },
    two: {
      email: 'foo.baz@acme.corp',
      name: 'Bruce Wayne',
      id: '13d994a8-dad1-4c13-9547-f07436e61e76',
      organizationId: '6a82a1cc-1e2f-47d6-a3e7-ce31c71450fa',
      hashedPassword: '',
      salt: '',
      verified: false,
    },
    three: {
      email: 'foo.baz@example.net',
      name: 'Foo Baz',
      id: '9d17477b-ece9-4926-8c2d-440430be2bb7',
      organizationId: 'e5a15b0b-06a8-4773-9812-0ce5d6e8b7d2',
      hashedPassword: '',
      salt: '',
      verified: false,
    },
  },
  permission: {
    one: {
      id: '3c456ca9-1f9e-4326-9046-f10469cb73c9',
      application: 'baz_ecommerce',
      namespace: 'baz_ecommerce',
      relation: 'edit_products',
    },
    two: {
      id: '8b33c04a-0ba0-46c8-9236-5459d76d4f8b',
      application: 'baz_ecommerce',
      namespace: 'baz_ecommerce',
      relation: 'edit_isles',
    },
    three: {
      id: '427579a9-fb7c-4781-80d9-6dc72e348c14',
      application: 'baz_ecommerce',
      namespace: 'baz_ecommerce',
      relation: 'view_products',
    },
  },
  role: {
    one: {
      name: 'Administrator',
      organization: {
        connect: {
          id: '6a82a1cc-1e2f-47d6-a3e7-ce31c71450fa',
        },
      },
      accounts: {
        connect: {
          id: '00fa2b1a-40d1-4c32-be0c-516d86872970',
        },
      },
      permissions: {
        connect: [
          { id: '3c456ca9-1f9e-4326-9046-f10469cb73c9' },
          { id: '8b33c04a-0ba0-46c8-9236-5459d76d4f8b' },
          { id: '427579a9-fb7c-4781-80d9-6dc72e348c14' },
        ],
      },
    },
    two: {
      name: 'Viewer',
      organization: {
        connect: {
          id: '6a82a1cc-1e2f-47d6-a3e7-ce31c71450fa',
        },
      },
      permissions: {
        connect: {
          id: '427579a9-fb7c-4781-80d9-6dc72e348c14',
        },
      },
    },
    three: {
      name: 'Administrator',
      organization: {
        connect: {
          id: 'e5a15b0b-06a8-4773-9812-0ce5d6e8b7d2',
        },
      },
      accounts: {
        connect: {
          id: '9d17477b-ece9-4926-8c2d-440430be2bb7',
        },
      },
      permissions: {
        connect: [
          { id: '3c456ca9-1f9e-4326-9046-f10469cb73c9' },
          { id: '8b33c04a-0ba0-46c8-9236-5459d76d4f8b' },
          { id: '427579a9-fb7c-4781-80d9-6dc72e348c14' },
        ],
      },
    },
  },
})

export type RoleStandard = typeof standard
