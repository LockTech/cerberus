import { sendSignupEmail } from 'src/helpers/email'

import { db } from 'src/lib/db'

import {
  confirmInvitation,
  createSignupConfirm,
} from 'src/services/account_confirmations'

import { randomStr } from 'src/util/randomStr'

import { handleInvitation, handleSignup } from './signup'

jest.mock('../email/email')
jest.mock('../../services/account_confirmations/account_confirmations')
jest.mock('../../util/randomStr/randomStr')

const InviteInvalidError = {
  name: 'UserInputError',
  message: 'invite-code-invalid',
}
//
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

describe('signup helper', () => {
  describe('handleInvitation', () => {
    it('throws when the invite confirmation is invalid', async () => {
      // @ts-expect-error jest types
      confirmInvitation.mockResolvedValue(false)

      expect(handleInvitation(TestInput)).rejects.toThrow(InviteInvalidError)
    })

    it('throws when encountering an error confirming the invitation', async () => {
      // @ts-expect-error jest types
      confirmInvitation.mockRejectedValue(new Error('oh no!'))

      expect(handleInvitation(TestInput)).rejects.toThrow()
    })

    it('creates a new verified account if the confirmation is successful', async () => {
      // @ts-expect-error jest types
      confirmInvitation.mockResolvedValue(true)

      const { email, name } = TestInput

      await handleInvitation(TestInput)

      const res = await db.account.findUnique({
        where: { email: TestInput.email },
      })

      expect(res.verified).toBeTruthy()
      expect(res.verifiedAt).toBeDefined()
      expect(res.email).toBe(email)
      expect(res.name).toBe(name)
    })
  })

  describe('handleSignup', () => {
    it('throws when encountering an error creating the signup confirmation', async () => {
      // @ts-expect-error jest types
      createSignupConfirm.mockRejectedValue(new Error('oops'))

      expect(handleSignup(TestInput)).rejects.toThrow()
    })

    it('throws when encountering an error sending the confirmation email', async () => {
      // @ts-expect-error jest types
      createSignupConfirm.mockResolvedValue(true)
      // @ts-expect-error jest types
      sendSignupEmail.mockRejectedValue(new Error('email failed!'))

      expect(handleSignup(TestInput)).rejects.toThrow(SignupEmailSendError)
    })

    it('attempts to send a confirmation email', async () => {
      // @ts-expect-error jest types
      createSignupConfirm.mockResolvedValue(true)
      // @ts-expect-error jest types
      sendSignupEmail.mockResolvedValue(true)

      const { email, code } = TestInput

      // @ts-expect-error jest types
      randomStr.mockReturnValue(code)

      await handleSignup(TestInput)

      expect(sendSignupEmail).toHaveBeenCalledTimes(1)
      expect(sendSignupEmail).toHaveBeenCalledWith({
        data: { email, code },
        email,
      })
    })

    it('creates an unverified account', async () => {
      // @ts-expect-error jest types
      createSignupConfirm.mockResolvedValue(true)
      // @ts-expect-error jest types
      sendSignupEmail.mockResolvedValue(true)

      const { email, code, name } = TestInput

      // @ts-expect-error jest types
      randomStr.mockReturnValue(code)

      await handleSignup(TestInput)

      const dbRes = await db.account.findUnique({ where: { email } })

      expect(dbRes.verified).toBeFalsy()
      expect(dbRes.verifiedAt).toBeNull()
      expect(dbRes.email).toBe(email)
      expect(dbRes.name).toBe(name)
    })
  })

  describe('signupHandler', () => {
    it('', () => {})
  })
})
