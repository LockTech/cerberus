export const standard = defineScenario({
  organization: {
    one: {
      id: '0251d504-347b-4880-9783-db6d199e02ee',
      name: 'Acme Corp',
    },
    two: {
      id: '9ad110e6-71db-4e83-b9ae-eed8df78e332',
      name: 'Example.com',
    },
    three: {
      id: '5bb10bf4-1e47-4d2a-b6ed-ed893e0b4bd1',
      name: 'Abandon LLC.',
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
      verified: false,
    },
    two: {
      email: 'foo.baz@acme.corp',
      name: 'Foo Baz',
      id: '9d17477b-ece9-4926-8c2d-440430be2bb7',
      organizationId: '0251d504-347b-4880-9783-db6d199e02ee',
      hashedPassword: '',
      salt: '',
      verified: false,
    },
    three: {
      email: 'john.doe@example.com',
      name: 'John Doe',
      id: '65bbec92-e9c3-4cbd-8b18-747276dedaa4',
      organizationId: '9ad110e6-71db-4e83-b9ae-eed8df78e332',
      hashedPassword: '',
      salt: '',
      verified: false,
    },
  },
})

export type AccountStandard = typeof standard
