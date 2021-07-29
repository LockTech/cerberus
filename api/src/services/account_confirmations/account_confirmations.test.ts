import type { Account_Confirmation } from '@prisma/client'
// import { db } from 'src/lib/db'

import { confirmInvitation, confirmSignup } from './account_confirmations'

import type { AccountConfirmationStandard } from './account_confirmations.scenarios'

describe('account_confirmation service', () => {
  describe('create', () => {
    describe('confirmInvitation', () => {
      scenario(
        'returns false when the code cannot be found',
        async (scenario: AccountConfirmationStandard) => {
          const conf = scenario.account_Confirmation
            .invite_1 as Account_Confirmation
          const code = 'THIS DOESNT EXIST'
          const email = conf.email

          const res = await confirmInvitation({ code, email })

          expect(res).toBeFalsy()
        }
      )

      scenario(
        'returns false when "organizationId" is not defined',
        async (scenario: AccountConfirmationStandard) => {
          const conf = scenario.account_Confirmation
            .invite_2 as Account_Confirmation
          const code = conf.code
          const email = conf.email

          const res = await confirmInvitation({ code, email })

          expect(res).toBeFalsy()
        }
      )

      scenario(
        'returns the confirmation when it is successful',
        async (scenario: AccountConfirmationStandard) => {
          const one = scenario.account_Confirmation
            .invite_1 as Account_Confirmation
          const code = one.code
          const email = one.email

          const res = await confirmInvitation({ code, email })

          expect(res).toBeTruthy()
        }
      )
    })

    describe('confirmSignup', () => {
      scenario(
        'returns false when the code cannot be found',
        async (scenario: AccountConfirmationStandard) => {
          const conf = scenario.account_Confirmation
            .signup_1 as Account_Confirmation
          const code = 'THIS DOESNT EXIST'
          const email = conf.email

          const res = await confirmSignup({ code, email })

          expect(res).toBeFalsy()
        }
      )

      scenario(
        'returns false when the code is 10 minutes or older',
        async (scenario: AccountConfirmationStandard) => {
          const conf = scenario.account_Confirmation
            .signup_2 as Account_Confirmation
          const code = conf.code
          const email = conf.email

          const res = await confirmSignup({ code, email })

          expect(res).toBeFalsy()
        }
      )

      scenario(
        'returns false when "organizationId" is defined',
        async (scenario: AccountConfirmationStandard) => {
          const conf = scenario.account_Confirmation
            .invite_1 as Account_Confirmation
          const code = conf.code
          const email = conf.email

          const res = await confirmSignup({ code, email })

          expect(res).toBeFalsy()
        }
      )

      scenario(
        'returns the result when the code is validated in time',
        async (scenario: AccountConfirmationStandard) => {
          const one = scenario.account_Confirmation
            .signup_1 as Account_Confirmation
          const code = one.code
          const email = one.email

          const res = await confirmSignup({ code, email })

          expect(res).toBeTruthy()
        }
      )
    })
  })
})
