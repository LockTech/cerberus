import type { Account, Organization, Role } from '@prisma/client'

import { AccountRemoveAuthFields } from 'src/constants/account'
import {
  KetoBuildAccountRoleTuple,
  KetoBuildOrgMemberTuple,
} from 'src/constants/keto'

import { sendInviteEmail as send } from 'src/helpers/email'
import { deleteTuple } from 'src/helpers/keto'

import { db } from 'src/lib/db'

import {
  account,
  accounts,
  deleteAccount,
  deleteAllAccounts,
  inviteAccount,
  updateAccount,
} from './accounts'
import type { AccountStandard } from './accounts.scenarios'

jest.mock('../../helpers/email/email')
// @ts-expect-error nope
const sendInviteEmail = <jest.Mock<typeof send>>send
jest.mock('../../helpers/keto/keto')

//

const AccountInviteEmailSend = {
  name: 'ValidationError',
  message: 'account-invite-email-send',
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
  describe('AccountRemoveAuthFields', () => {
    scenario(
      'removes sensitive fields from given object',
      async (scenario: AccountStandard) => {
        const acc = scenario.account.one as Account

        const res = AccountRemoveAuthFields(acc)

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
          const role = scenario.role.one as Role

          const acc1 = AccountRemoveAuthFields(scenario.account.one)
          acc1['roles'] = [role]
          const acc2 = AccountRemoveAuthFields(scenario.account.two)
          acc2['roles'] = []
          const acc3 = AccountRemoveAuthFields(scenario.account.three)
          acc3['roles'] = []

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
  })

  describe('update', () => {
    scenario(
      "updates only an account's `email`",
      async (scenario: AccountStandard) => {
        const updatee = scenario.account.one as Account
        const id = updatee.id

        const email = 'my_new_email@example.net'

        const res = await updateAccount({ email, id })

        expect(res.disabled).toBe(updatee.disabled)
        expect(res.email).toBe(email)
        expect(res.name).toBe(updatee.name)
      }
    )

    scenario(
      "updates only an account's `name`",
      async (scenario: AccountStandard) => {
        const updatee = scenario.account.one as Account
        const id = updatee.id

        const name = 'Clark Kent'

        const res = await updateAccount({ name, id })

        expect(res.disabled).toBe(updatee.disabled)
        expect(res.email).toBe(updatee.email)
        expect(res.name).toBe(name)
      }
    )

    scenario(
      "updates only an account's `disabled` status",
      async (scenario: AccountStandard) => {
        const updatee = scenario.account.one as Account
        const id = updatee.id

        const disabled = true

        const res = await updateAccount({ disabled, id })

        expect(res.disabled).toBe(disabled)
        expect(res.email).toBe(updatee.email)
        expect(res.name).toBe(updatee.name)
      }
    )
  })

  describe('delete', () => {
    scenario(
      "throws when delete id is the invoker's id",
      async (scenario: AccountStandard) => {
        const acc = scenario.account.one as Account
        const id = acc.id

        mockCurrentUser({ id })

        expect(deleteAccount({ id })).rejects.toThrow(AccountDeleteSelf)
      }
    )

    scenario(
      'removes the given account from the organizations',
      async (scenario: AccountStandard) => {
        const invoker = scenario.account.one as Account
        const invokerId = invoker.id

        const organization = scenario.organization.one as Organization
        const organizationId = organization.id

        mockCurrentUser({ id: invokerId, organizationId })

        const acc = scenario.account.two as Account
        const id = acc.id

        const res = await deleteAccount({ id })
        const dbRes = await db.account.findUnique({ where: { id } })

        expect(res.id).toBe(id)
        expect(dbRes).toBeNull()
      }
    )

    scenario(
      "removes the account's connection to its roles",
      async (scenario: AccountStandard) => {
        const invoker = scenario.account.two as Account
        const invokerId = invoker.id

        const organization = scenario.organization.one as Organization
        const organizationId = organization.id

        mockCurrentUser({ id: invokerId, organizationId })

        const acc = scenario.account.one as Account
        const id = acc.id

        const role = scenario.role.one as Role
        const roleId = role.id

        // @ts-expect-error jest typings
        deleteTuple.mockResolvedValue(null)

        await deleteAccount({ id })

        const roleRes = await db.role.findUnique({ where: { id: roleId } })
        const roleNullRes = await db.role.findFirst({
          where: { id: roleId, accounts: { some: { id } } },
        })

        expect(roleRes).toEqual(expect.objectContaining(role))
        expect(roleNullRes).toBeNull()
      }
    )

    scenario(
      "attempts to delete the account's organization relation tuple",
      async (scenario: AccountStandard) => {
        const invoker = scenario.account.two as Account
        const invokerId = invoker.id

        const organization = scenario.organization.one as Organization
        const organizationId = organization.id

        mockCurrentUser({ id: invokerId, organizationId })

        const acc = scenario.account.one as Account
        const id = acc.id

        // @ts-expect-error jest typings
        deleteTuple.mockResolvedValue(null)

        await deleteAccount({ id })

        expect(deleteTuple).toHaveBeenCalledTimes(2)
        expect(deleteTuple).toHaveBeenCalledWith(
          KetoBuildOrgMemberTuple(id, organizationId)
        )
      }
    )

    scenario(
      "attempts to delete the account's role relation tuple",
      async (scenario: AccountStandard) => {
        const invoker = scenario.account.two as Account
        const invokerId = invoker.id

        const organization = scenario.organization.one as Organization
        const organizationId = organization.id

        mockCurrentUser({ id: invokerId, organizationId })

        const acc = scenario.account.one as Account
        const id = acc.id

        const role = scenario.role.one as Role
        const roleId = role.id

        // @ts-expect-error jest typings
        deleteTuple.mockResolvedValue(null)

        await deleteAccount({ id })

        expect(deleteTuple).toHaveBeenCalledTimes(2)
        expect(deleteTuple).toHaveBeenCalledWith(
          KetoBuildAccountRoleTuple(id, roleId)
        )
      }
    )

    describe('deleteAllAccounts', () => {
      scenario(
        'attempts to delete all account-organization relation tuples',
        async (scenario: AccountStandard) => {
          const organization = scenario.organization.one as Organization
          const organizationId = organization.id

          mockCurrentUser({ organizationId })

          // @ts-expect-error jest types
          deleteTuple.mockResolvedValue(null)

          const acc1 = scenario.account.one as Account
          const acc1Id = acc1.id
          const acc2 = scenario.account.two as Account
          const acc2Id = acc2.id

          const tuple1 = KetoBuildOrgMemberTuple(acc1Id, organizationId)
          const tuple2 = KetoBuildOrgMemberTuple(acc2Id, organizationId)

          await deleteAllAccounts()

          expect(deleteTuple).toHaveBeenCalledTimes(3)
          expect(deleteTuple).toHaveBeenCalledWith(tuple1)
          expect(deleteTuple).toHaveBeenCalledWith(tuple2)
        }
      )

      scenario(
        'attempts to delete all account-role relation tuples',
        async (scenario: AccountStandard) => {
          const organization = scenario.organization.one as Organization
          const organizationId = organization.id

          mockCurrentUser({ organizationId })

          // @ts-expect-error jest types
          deleteTuple.mockResolvedValue(null)

          const acc1 = scenario.account.one as Account
          const acc1Id = acc1.id

          const role = scenario.role.one as Role
          const roleId = role.id

          const tuple = KetoBuildAccountRoleTuple(acc1Id, roleId)

          await deleteAllAccounts()

          expect(deleteTuple).toHaveBeenCalledTimes(3)
          expect(deleteTuple).toHaveBeenCalledWith(tuple)
        }
      )

      scenario(
        'successfully removes all accounts from the database',
        async (scenario: AccountStandard) => {
          const organization = scenario.organization.one as Organization
          const organizationId = organization.id

          mockCurrentUser({ organizationId })

          // @ts-expect-error jest types
          deleteTuple.mockResolvedValue(null)

          const acc1 = scenario.account.one as Account
          const acc2 = scenario.account.two as Account

          /* eslint-disable prettier/prettier */
          const preRes = await db.account.findMany({ where: { organizationId } })
          await deleteAllAccounts()
          const postRes = await db.account.findMany({ where: { organizationId } })
          /* eslint-enable prettier/prettier */

          expect(preRes).toEqual(expect.arrayContaining([acc1, acc2]))
          expect(postRes).toEqual(expect.arrayContaining([]))
        }
      )
    })
  })
})
