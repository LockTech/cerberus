import type { Account_Confirmation } from '@prisma/client'

import { db } from 'src/lib/db'
import { randomStr } from 'src/util/randomStr'

import {
  createInviteConfirm,
  createSignupConfirm,
  confirmInvitation,
  confirmSignup,
} from './account_confirmations'
import type { AccountConfirmationStandard } from './account_confirmations.scenarios'

describe('account_confirmation service', () => {
  describe('confirm', () => {
    describe('invitation', () => {
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
        'returns false when the email cannot be found',
        async (scenario: AccountConfirmationStandard) => {
          const conf = scenario.account_Confirmation
            .invite_1 as Account_Confirmation
          const code = conf.code
          const email = 'WHOSE EMAIL IS THIS?'

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
        'returns true when the code and email combination are valid',
        async (scenario: AccountConfirmationStandard) => {
          const one = scenario.account_Confirmation
            .invite_1 as Account_Confirmation
          const code = one.code
          const email = one.email

          const res = await confirmInvitation({ code, email })

          expect(res).toBeTruthy()
        }
      )

      scenario(
        'deletes the Account_Confirmation when successful',
        async (scenario: AccountConfirmationStandard) => {
          const one = scenario.account_Confirmation
            .invite_1 as Account_Confirmation
          const code = one.code
          const email = one.email

          await confirmInvitation({ code, email })

          const res = await db.account_Confirmation.findFirst({
            where: { code, email },
          })
          expect(res).toBeNull()
        }
      )
    })

    describe('signup', () => {
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
        'returns false when the email cannot be found',
        async (scenario: AccountConfirmationStandard) => {
          const conf = scenario.account_Confirmation
            .signup_1 as Account_Confirmation
          const code = conf.code
          const email = 'ANOTHER FAKE EMAIL? WOW'

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
        'returns true when the code is valid',
        async (scenario: AccountConfirmationStandard) => {
          const one = scenario.account_Confirmation
            .signup_1 as Account_Confirmation
          const code = one.code
          const email = one.email

          const res = await confirmSignup({ code, email })

          expect(res).toBeTruthy()
        }
      )

      scenario(
        'deletes the Account_Confirmation when successful',
        async (scenario: AccountConfirmationStandard) => {
          const one = scenario.account_Confirmation
            .signup_1 as Account_Confirmation
          const code = one.code
          const email = one.email

          await confirmSignup({ code, email })

          const res = await db.account_Confirmation.findFirst({
            where: { email, code },
          })
          expect(res).toBeNull()
        }
      )

      scenario(
        '"verifies" the confirmed account',
        async (scenario: AccountConfirmationStandard) => {
          const one = scenario.account_Confirmation
            .signup_1 as Account_Confirmation
          const code = one.code
          const email = one.email

          await confirmSignup({ code, email })

          const res = await db.account.findFirst({ where: { email } })
          expect(res.verified).toBeTruthy()
          expect(res.verifiedAt).toBeDefined()
        }
      )
    })
  })

  describe('create', () => {
    describe('invitation', () => {
      scenario(
        'creates an invitation confirmation',
        async (_scenarios: AccountConfirmationStandard) => {
          const code = randomStr(8)
          const email = 'terry.boulder@bouldersboulders.com'
          const organizationId = '1'

          await createInviteConfirm({
            code,
            email,
            organizationId,
          })

          const res = await db.account_Confirmation.findFirst({
            where: { code, email },
          })
          expect(res.code).toBe(code)
          expect(res.email).toBe(email)
          expect(res.organizationId).toBe(organizationId)
        }
      )
    })

    describe('signup', () => {
      scenario(
        'creates a signup confirmation',
        async (_scenarios: AccountConfirmationStandard) => {
          const code = randomStr(8)
          const email = 'terry.boulder@bouldersboulders.com'

          await createSignupConfirm({
            code,
            email,
          })

          const res = await db.account_Confirmation.findFirst({
            where: { code, email },
          })
          expect(res.code).toBe(code)
          expect(res.email).toBe(email)
          expect(res.organizationId).toBeNull()
        }
      )
    })
  })
})
