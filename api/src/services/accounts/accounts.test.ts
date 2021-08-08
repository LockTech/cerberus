import type { Account, Organization } from '@prisma/client'

import { db } from 'src/lib/db'

import {
  account,
  accounts,
  currentAccount,
  deleteAccount,
  inviteAccount,
  removeAuthFields,
  updateAccount,
} from './accounts'
import type { AccountStandard } from './accounts.scenarios'

import { sendInviteEmail as send } from 'src/helpers/email'
jest.mock('../../helpers/email/email')
// @ts-expect-error nope
const sendInviteEmail = <jest.Mock<typeof send>>send

//

const AccountInviteEmailSend = {
  name: 'ValidationError',
  message: 'account-email-send',
}
//
const _AccountRead = {
  name: 'ValidationError',
  message: 'account-read',
}
//
const AccountDeleteSelf = {
  name: 'UserInputError',
  message: 'account-delete-self',
}

describe('account service', () => {
  describe('removeAuthFields', () => {
    scenario(
      'removes sensitive fields from given object',
      async (scenario: AccountStandard) => {
        const acc = scenario.account.one as Account

        const res = removeAuthFields(acc)

        expect(res.hashedPassword).toBeUndefined()
        expect(res.salt).toBeUndefined()
      }
    )
  })

  describe('create', () => {
    describe('inviteAccount', () => {
      scenario(
        'throws when failing to send a confirmation email',
        async (scenario: AccountStandard) => {
          const acc = scenario.account.one as Account
          const name = acc.name
          const organizationId = acc.organizationId
          mockCurrentUser({ name, organizationId })

          const email = 'anunknownemail@example.net'

          // @ts-expect-error this
          sendInviteEmail.mockRejectedValueOnce(new Error('oh no!'))

          expect(inviteAccount({ email })).rejects.toThrow(
            AccountInviteEmailSend
          )
        }
      )

      scenario(
        'removes the created confirmation if failing to send email',
        async (scenario: AccountStandard) => {
          const acc = scenario.account.one as Account
          const name = acc.name
          const organizationId = acc.organizationId
          mockCurrentUser({ name, organizationId })

          const email = 'anunknownemail@example.net'

          // @ts-expect-error this
          sendInviteEmail.mockRejectedValueOnce(new Error('oh no!'))

          const res = await db.account_Confirmation.findFirst({
            where: { email },
          })

          expect(inviteAccount({ email })).rejects.toThrow(
            AccountInviteEmailSend
          )
          expect(res).toBeNull()
        }
      )

      scenario(
        'uses currentUser to create an invitation',
        async (scenario: AccountStandard) => {
          const acc = scenario.account.one as Account
          const name = acc.name
          const organization = scenario.organization.one as Organization
          const organizationId = acc.organizationId
          const organizationName = organization.name
          mockCurrentUser({ name, organizationId })

          const email = 'anUnknownEmail@example.net'

          // @ts-expect-error this
          sendInviteEmail.mockReturnValueOnce(true)

          await inviteAccount({ email })

          const res = await db.account_Confirmation.findFirst({
            where: { email },
          })
          const code = res.code

          expect(res.organizationId).toBe(organizationId)
          expect(sendInviteEmail).toHaveBeenCalledTimes(1)
          expect(sendInviteEmail).toHaveBeenCalledWith({
            data: { code, name, organizationName },
            email,
          })
        }
      )
    })
  })

  describe('read', () => {
    describe('account', () => {
      scenario(
        'retrieves an account using its ID',
        async (scenario: AccountStandard) => {
          const acc = scenario.account.one as Account
          const organizationId = acc.organizationId
          mockCurrentUser({ organizationId })

          const resAcc = scenario.account.two as Account
          const id = resAcc.id
          delete resAcc.hashedPassword
          delete resAcc.salt

          const res = await account({ id })

          expect(res).toEqual(expect.objectContaining<Account>(resAcc))
        }
      )

      scenario(
        'returns null when the account cannot be found',
        async (scenario: AccountStandard) => {
          const acc = scenario.account.one as Account
          const organizationId = acc.organizationId
          mockCurrentUser({ organizationId })

          const resAcc = scenario.account.three as Account
          const id = resAcc.id
          delete resAcc.hashedPassword
          delete resAcc.salt

          const res = await account({ id })

          expect(res).toBeNull()

          const res2 = await account({ id: '423252' })

          expect(res2).toBeNull()
        }
      )
    })

    describe('accounts', () => {
      scenario(
        'retrieves all accounts belonging to the invokers organization',
        async (scenario: AccountStandard) => {
          const acc1 = removeAuthFields(scenario.account.one)
          const acc2 = removeAuthFields(scenario.account.two)
          const acc3 = removeAuthFields(scenario.account.three)

          const organizationId = acc1.organizationId
          mockCurrentUser({ organizationId })

          const res = await accounts()

          expect(res).toEqual(expect.arrayContaining([acc1, acc2]))
          expect(res).not.toEqual(expect.arrayContaining([acc3]))
        }
      )

      scenario(
        'returns an empty array when no accounts are found',
        async (_scenario: AccountStandard) => {
          const organizationId = '12523423'
          mockCurrentUser({ organizationId })

          const res = await accounts()

          expect(res).toEqual(expect.arrayContaining([]))
        }
      )
    })

    describe('currentAccount', () => {
      scenario(
        'retrieves the invokers account',
        async (scenario: AccountStandard) => {
          const acc = scenario.account.one as Account
          delete acc.hashedPassword
          delete acc.salt

          mockCurrentUser(acc)

          const res = await currentAccount()

          expect(res).toBe(acc)
        }
      )
    })
  })

  describe('update', () => {
    scenario(
      "updates only an account's `email`",
      async (scenario: AccountStandard) => {
        const updatee = scenario.account.one as Account
        const id = updatee.id

        const email = 'my_new_email@example.net'

        const res = await updateAccount({ email, id })

        expect(res.email).not.toBe(updatee.email)
        expect(res.name).toBe(updatee.name)
        expect(res.email).toBe(email)
      }
    )

    scenario(
      "updates only an account's `name`",
      async (scenario: AccountStandard) => {
        const updatee = scenario.account.one as Account
        const id = updatee.id

        const name = 'Clark Kent'

        const res = await updateAccount({ name, id })

        expect(res.email).toBe(updatee.email)
        expect(res.name).not.toBe(updatee.name)
        expect(res.name).toBe(name)
      }
    )
  })

  describe('delete', () => {
    scenario(
      "throws when delete id is the invoker's id",
      async (scenario: AccountStandard) => {
        const acc = scenario.account.one as Account
        const id = acc.id

        expect(deleteAccount({ id })).rejects.toThrow(AccountDeleteSelf)
      }
    )

    scenario(
      'removes the given account from the organizations',
      async (scenario: AccountStandard) => {
        const acc = scenario.account.two as Account
        const id = acc.id

        const res = await deleteAccount({ id })
        const dbRes = await db.account.findUnique({ where: { id } })

        expect(res.id).toBe(id)
        expect(dbRes).toBeNull()
      }
    )
  })
})
