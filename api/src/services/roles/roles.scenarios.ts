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
  // @ts-expect-error only need three accounts
  account: {
    one: {
      id: '00fa2b1a-40d1-4c32-be0c-516d86872970',
      email: 'foo.bar@acme.corp',
      name: 'Foo Bar',
      organizationId: '6a82a1cc-1e2f-47d6-a3e7-ce31c71450fa',
      hashedPassword: '',
      salt: '',
      verified: false,
    },
    two: {
      id: '13d994a8-dad1-4c13-9547-f07436e61e76',
      email: 'foo.baz@acme.corp',
      name: 'Bruce Wayne',
      organizationId: '6a82a1cc-1e2f-47d6-a3e7-ce31c71450fa',
      hashedPassword: '',
      salt: '',
      verified: false,
    },
    three: {
      id: '9d17477b-ece9-4926-8c2d-440430be2bb7',
      email: 'foo.baz@example.net',
      name: 'Foo Baz',
      organizationId: 'e5a15b0b-06a8-4773-9812-0ce5d6e8b7d2',
      hashedPassword: '',
      salt: '',
      verified: false,
    },
  },
  // @ts-expect-error only need three permissions
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
      id: 'e757be42-2674-4060-8e62-ddc4c9cf39d7',
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
      id: '0bb163b1-93e0-4d2c-a2f3-7fb82a418d14',
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
      id: '4da02199-a751-47e1-ba91-9d4ac9a44086',
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
    four: {
      id: '53c5dd7d-b632-4b85-8768-3069dc801d40',
      name: 'Helper',
      organization: {
        connect: {
          id: '6a82a1cc-1e2f-47d6-a3e7-ce31c71450fa',
        },
      },
      accounts: {
        connect: {
          id: '13d994a8-dad1-4c13-9547-f07436e61e76',
        },
      },
    },
  },
})

export type RoleStandard = typeof standard
