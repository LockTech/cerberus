import type { Organization } from '@prisma/client'

import { KetoBuildOrgMemberTuple } from 'src/constants/keto'
import { SignupInviteRes, SignupRes } from 'src/constants/signup'

import { sendSignupEmail } from 'src/helpers/email'
import { writeTuple } from 'src/helpers/keto'

import { db } from 'src/lib/db'

import {
  confirmInvitation,
  createSignupConfirm,
} from 'src/services/account_confirmations'

import { randomStr } from 'src/util/randomStr'

import { handleInvitation, handleSignup } from './signup'
import type { SignupStandard } from './signup.scenarios'

jest.mock('../email/email')
jest.mock('../keto/keto')
jest.mock('../../services/account_confirmations/account_confirmations')
jest.mock('../../util/randomStr/randomStr')

const InviteInvalidError = {
  name: 'UserInputError',
  message: 'invite-code-invalid',
}
//

const TestInput = {
  code: '1',
  email: 'test@example.net',
  name: 'Oogey Boogey',
  hashedPassword: '',
  salt: '',
}

describe('signup helper', () => {
  describe('handleInvitation', () => {
    scenario(
      'throws when the invite confirmation is invalid',
      async (_scenario: SignupStandard) => {
        // @ts-expect-error jest types
        confirmInvitation.mockResolvedValue(null)

        expect(handleInvitation(TestInput)).rejects.toThrow(InviteInvalidError)
      }
    )

    scenario(
      'throws when encountering an error confirming the invitation',
      async (_scenario: SignupStandard) => {
        // @ts-expect-error jest types
        confirmInvitation.mockRejectedValue(new Error('oh no!'))

        expect(handleInvitation(TestInput)).rejects.toThrow()
      }
    )

    scenario(
      'creates a new verified account if the confirmation is successful',
      async (scenario: SignupStandard) => {
        const organization = scenario.organization.one as Organization
        const organizationId = organization.id

        // @ts-expect-error jest types
        confirmInvitation.mockResolvedValue({ organizationId })

        const { email, name } = TestInput

        await handleInvitation(TestInput)

        const res = await db.account.findUnique({ where: { email } })

        expect(res.verified).toBeTruthy()
        expect(res.verifiedAt).toBeDefined()
        expect(res.email).toBe(email)
        expect(res.name).toBe(name)
      }
    )

    scenario(
      'adds the invited account to the organization they were invited to',
      async (scenario: SignupStandard) => {
        const organization = scenario.organization.one as Organization
        const organizationId = organization.id

        // @ts-expect-error jest types
        confirmInvitation.mockResolvedValue({ organizationId })

        const { email } = TestInput

        await handleInvitation(TestInput)

        const res = await db.account.findUnique({ where: { email } })

        expect(res.organizationId).toBe(organizationId)
      }
    )

    scenario(
      `returns with the value of ${SignupInviteRes}`,
      async (scenario: SignupStandard) => {
        const organization = scenario.organization.one as Organization
        const organizationId = organization.id

        // @ts-expect-error jest types
        confirmInvitation.mockResolvedValue({ organizationId })

        const res = await handleInvitation(TestInput)

        expect(res).toBe(SignupInviteRes)
      }
    )

    scenario(
      'attempts to write a relation-tuple to Keto',
      async (scenario: SignupStandard) => {
        const organization = scenario.organization.one as Organization
        const organizationId = organization.id

        // @ts-expect-error jest types
        confirmInvitation.mockResolvedValue({ organizationId })
        // @ts-expect-error jest types
        writeTuple.mockResolvedValue(true)

        const { email } = TestInput

        await handleInvitation(TestInput)

        const res = await db.account.findUnique({ where: { email } })
        const accountId = res.id

        const tuple = KetoBuildOrgMemberTuple(accountId, organizationId)

        expect(writeTuple).toHaveBeenCalledTimes(1)
        expect(writeTuple).toHaveBeenCalledWith(tuple)
      }
    )
  })

  describe('handleSignup', () => {
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

    it(`returns with the value of ${SignupRes}`, async () => {
      // @ts-expect-error jest types
      createSignupConfirm.mockResolvedValue(true)
      // @ts-expect-error jest types
      sendSignupEmail.mockResolvedValue(true)

      const { code } = TestInput

      // @ts-expect-error jest types
      randomStr.mockReturnValue(code)

      const res = await handleSignup(TestInput)

      expect(res).toBe(SignupRes)
    })
  })
})
