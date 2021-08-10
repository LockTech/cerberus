export const standard = defineScenario({
  permission: {
    one: {
      application: 'baz_ecommerce',
      namespace: 'baz_ecommerce',
      relation: 'edit_products',
    },
    two: {
      application: 'baz_ecommerce',
      namespace: 'baz_ecommerce',
      relation: 'edit_isles',
    },
  },
})

export type PermissionStandard = typeof standard
