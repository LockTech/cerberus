export const standard = defineScenario({
  organization: {
    one: {
      id: '0251d504-347b-4880-9783-db6d199e02ee',
      name: 'Acme Corp',
    },
  },
  account: {
    one: {
      email: 'foo.bar@acme.corp',
      name: 'Foo Bar',
      id: '00fa2b1a-40d1-4c32-be0c-516d86872970',
      organizationId: '0251d504-347b-4880-9783-db6d199e02ee',
      hashedPassword: '',
      salt: '',
    },
  },
})

export type AuthScenario = typeof standard
