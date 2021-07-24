import type { Account } from '@prisma/client'

import {
  account,
  accounts,
  currentAccount,
  inviteMember,
  signupAccount,
} from './accounts'

import type { AccountStandard } from './accounts.scenarios'

const TakenError: Error = {
  name: 'SyntaxError',
  message: 'taken',
}

describe('account service', () => {
  describe('create', () => {
    describe('inviteMember', () => {
      scenario(
        'throws when an email already exist',
        async (scenario: AccountStandard) => {
          const email = scenario.account.one.email

          expect(async () => {
            await inviteMember({ email })
          }).rejects.toThrow(TakenError)
        }
      )
    })

    describe('signupAccount', () => {
      scenario(
        'throws when an email already exist',
        async (scenario: AccountStandard) => {
          const email = scenario.account.one.email

          expect(async () => {
            await signupAccount({ email })
          }).rejects.toThrow(TakenError)
        }
      )
    })
  })

  describe('read', () => {
    describe('account', () => {
      scenario(
        'retrieves an account by its ID',
        async (scenario: AccountStandard) => {
          const testAccount = scenario.account.one as Account
          const id = testAccount.id
          const organizationId = testAccount.organizationId

          mockCurrentUser({ organizationId })

          const accountRes = await account({ id })

          expect(accountRes).toEqual(
            expect.objectContaining<Account>(testAccount)
          )
        }
      )

      scenario(
        'only retrieves an account which belong to the admins organization',
        async (scenario: AccountStandard) => {
          const organizationId = scenario.account.one.organizationId

          mockCurrentUser({ organizationId })

          const testAccount = scenario.account.three as Account
          const id = testAccount.id

          const accountRes = await account({ id })

          expect(accountRes).toBeNull()
        }
      )
    })

    describe('accounts', () => {
      scenario(
        'list all accounts belonging to the admins organization',
        async (scenario: AccountStandard) => {
          const one = scenario.account.one as Account
          const two = scenario.account.two as Account
          const thr = scenario.account.three as Account

          const organizationId = one.organizationId
          mockCurrentUser({ organizationId })

          const res = await accounts()

          expect(Array.isArray(res)).toBeTruthy()
          expect(res.length).toBe(2)
          expect(res).toEqual(expect.arrayContaining<Account>([one, two]))
          expect(res).not.toEqual(expect.arrayContaining<Account>([thr]))
        }
      )
    })

    describe('currentAccount', () => {
      scenario(
        "retrieves the current session's account",
        async (scenario: AccountStandard) => {
          const one = scenario.account.one as Account
          const two = scenario.account.two as Account

          const id = one.id
          mockCurrentUser({ id })

          const res = await currentAccount()

          expect(res).toEqual(expect.objectContaining<Account>(one))
          expect(res).not.toEqual(expect.objectContaining<Account>(two))
        }
      )
    })
  })
})
