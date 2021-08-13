export const standard = defineScenario({
  // @ts-expect-error only 1 org
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
      hashedPassword: '',
      salt: '',
      organization: {
        connect: { id: '0251d504-347b-4880-9783-db6d199e02ee' },
      },
      verified: true,
      verifiedAt: new Date(),
    },
    two: {
      email: 'baz.burb@acme.corp',
      name: 'Baz Burb',
      id: '3fe9cb67-7a4e-4ebf-9575-0ded4d12facc',
      hashedPassword: '',
      salt: '',
      organization: {
        connect: { id: '0251d504-347b-4880-9783-db6d199e02ee' },
      },
      verified: false,
      verifiedAt: null,
    },
  },
})

export type AuthScenario = typeof standard
