import type { Account_Confirmation } from '@prisma/client'

import { sendSignupEmail } from 'src/helpers/email'

import { db } from 'src/lib/db'

import { randomStr } from 'src/util/randomStr'

import {
  createInviteConfirm,
  createSignupConfirm,
  confirmInvitation,
  confirmSignup,
} from './account_confirmations'
import type { AccountConfirmationStandard } from './account_confirmations.scenarios'

jest.mock('../email/email')

const SignupEmailSendError = {
  name: 'UserInputError',
  message: 'signup-email-send',
}

const TestInput = {
  code: '1',
  email: 'test@example.net',
  name: 'Oogey Boogey',
  hashedPassword: '',
  salt: '',
}

describe('account_confirmation service', () => {
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
        'throws when encountering an error creating the signup confirmation',
        async (_scenario: AccountConfirmationStandard) => {
          // @ts-expect-error jest types
          createSignupConfirm.mockRejectedValue(new Error('oops'))

          expect(createSignupConfirm(TestInput)).rejects.toThrow()
        }
      )

      scenario(
        'throws when encountering an error sending the confirmation email',
        async (_scenario: AccountConfirmationStandard) => {
          // @ts-expect-error jest types
          createSignupConfirm.mockResolvedValue(true)
          // @ts-expect-error jest types
          sendSignupEmail.mockRejectedValue(new Error('email failed!'))

          expect(createSignupConfirm(TestInput)).rejects.toThrow(
            SignupEmailSendError
          )
        }
      )

      scenario(
        'attempts to send a confirmation email',
        async (_scenario: AccountConfirmationStandard) => {
          // @ts-expect-error jest types
          createSignupConfirm.mockResolvedValue(true)
          // @ts-expect-error jest types
          sendSignupEmail.mockResolvedValue(true)

          const { email, code } = TestInput

          // @ts-expect-error jest types
          randomStr.mockReturnValue(code)

          await createSignupConfirm(TestInput)

          expect(createSignupConfirm).toHaveBeenCalledTimes(1)
          expect(sendSignupEmail).toHaveBeenCalledWith({
            data: { code },
            email,
          })
        }
      )

      scenario(
        'creates a signup confirmation',
        async (_scenarios: AccountConfirmationStandard) => {
          const code = randomStr(8)
          const email = 'terry.boulder@bouldersboulders.com'

          await createSignupConfirm({
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

  describe('read', () => {
    describe('invitation', () => {
      scenario(
        'returns "null" when the code cannot be found',
        async (scenario: AccountConfirmationStandard) => {
          const conf = scenario.account_Confirmation
            .invite_1 as Account_Confirmation
          const code = 'THIS DOESNT EXIST'
          const email = conf.email

          const res = await confirmInvitation({ code, email })

          expect(res).toBeNull()
        }
      )

      scenario(
        'returns "null" when the email cannot be found',
        async (scenario: AccountConfirmationStandard) => {
          const conf = scenario.account_Confirmation
            .invite_1 as Account_Confirmation
          const code = conf.code
          const email = 'WHOSE EMAIL IS THIS?'

          const res = await confirmInvitation({ code, email })

          expect(res).toBeNull()
        }
      )

      scenario(
        'returns "null" when "organizationId" is not defined',
        async (scenario: AccountConfirmationStandard) => {
          const conf = scenario.account_Confirmation
            .invite_2 as Account_Confirmation
          const code = conf.code
          const email = conf.email

          const res = await confirmInvitation({ code, email })

          expect(res).toBeNull()
        }
      )

      scenario(
        'returns the confirmation when the code and email combination are valid',
        async (scenario: AccountConfirmationStandard) => {
          const one = scenario.account_Confirmation
            .invite_1 as Account_Confirmation
          const code = one.code
          const email = one.email

          const res = await confirmInvitation({ code, email })

          expect(res).toEqual(expect.objectContaining(one))
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
})
