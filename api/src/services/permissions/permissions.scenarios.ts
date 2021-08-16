export const standard = defineScenario({
  // @ts-expect-error only need two organizations
  organization: {
    one: {
      id: '6a82a1cc-1e2f-47d6-a3e7-ce31c71450fa',
      name: 'Acme Corp',
    },
  },
  permission: {
    one: {
      id: '8f46ebb6-eba3-4407-9387-07b866a4b453',
      application: 'baz_ecommerce',
      namespace: 'baz_ecommerce',
      relation: 'edit_products',
    },
    two: {
      id: '72584550-5451-423c-b6d7-ac9c23fd592f',
      application: 'baz_ecommerce',
      namespace: 'baz_ecommerce',
      relation: 'edit_isles',
    },
  },
  // @ts-expect-error only need two organizations
  role: {
    one: {
      name: 'Administrator',
      organization: {
        connect: {
          id: '6a82a1cc-1e2f-47d6-a3e7-ce31c71450fa',
        },
      },
      permissions: {
        connect: [
          { id: '8f46ebb6-eba3-4407-9387-07b866a4b453' },
          { id: '72584550-5451-423c-b6d7-ac9c23fd592f' },
        ],
      },
    },
  },
})

export type PermissionStandard = typeof standard
