import { minutes } from 'src/util/time'

const now = new Date()
const fiveMinAgo = new Date(now.valueOf() - minutes(5))
const sevenMinAgo = new Date(now.valueOf() - minutes(7))
const fifteenMinAgo = new Date(now.valueOf() - minutes(15))

export const standard = defineScenario({
  account_Confirmation: {
    invite_1: {
      id: 'b71c3f1a-3da3-453f-b6bc-5da191cee62c',
      code: 'PFBL7LE9',
      email: 'john.doe@acme.corp',
      organizationId: '0251d504-347b-4880-9783-db6d199e02ee',
      created_at: sevenMinAgo,
    },
    invite_2: {
      id: '0ec0f692-5a9c-4d38-b924-250cbcfb04e4',
      code: 'SM4C5GXC',
      email: 'jane.doe@acme.corp',
    },
    signup_1: {
      id: '48f792d6-4cf8-4049-923f-4cf3126cdc6d',
      code: 'HZ2PAS9G',
      email: 'jane.doe@acme.corp',
      created_at: fiveMinAgo,
    },
    signup_2: {
      id: '388b0ffb-2faf-4895-aba1-9cfb4d83f613',
      code: 'VDBZPA5D',
      email: 'jane.doe@acme.corp',
      created_at: fifteenMinAgo,
    },
  },
})

export type AccountConfirmationStandard = typeof standard
