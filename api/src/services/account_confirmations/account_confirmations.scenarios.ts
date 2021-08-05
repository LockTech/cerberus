export const standard = defineScenario({
  // @ts-expect-error thank you typescript
  account_Confirmation: {
    invite_1: {
      id: 'b71c3f1a-3da3-453f-b6bc-5da191cee62c',
      code: 'PFBL7LE9',
      email: 'john.doe@acme.corp',
      organizationId: '0251d504-347b-4880-9783-db6d199e02ee',
    },
    invite_2: {
      id: '0ec0f692-5a9c-4d38-b924-250cbcfb04e4',
      code: 'SM4C5GXC',
      email: 'jane.doe@acme.corp',
    },
    signup_1: {
      id: '48f792d6-4cf8-4049-923f-4cf3126cdc6d',
      code: 'HZ2PAS9G',
      email: 'foo.bar@acme.corp',
    },
    signup_2: {
      id: '388b0ffb-2faf-4895-aba1-9cfb4d83f613',
      code: 'VDBZPA5D',
      email: 'jane.doe@acme.corp',
    },
  },
  // @ts-expect-error thank you typescript
  account: {
    one: {
      id: '45e805e0-ced7-418c-9ffa-16546ee436cd',
      email: 'foo.bar@acme.corp',
      name: 'Foo Bar',
      organizationId: null,
      hashedPassword: '',
      salt: '',
      verified: false,
    },
  },
})

export type AccountConfirmationStandard = typeof standard
