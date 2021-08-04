import type { Account } from '@prisma/client'
import { db } from 'src/lib/db'

import { account, accounts, currentAccount, inviteMember } from './accounts'

import type { AccountStandard } from './accounts.scenarios'

const TakenError: Error = {
  name: 'SyntaxError',
  message: 'email-taken',
}

jest.setTimeout(100000)

/**
 * Remove the `hashedPassword` and `salt` fields from a specific `account`.
 *
 * @param scenario - The scenario provided by RedwoodJS for each test's invocation.
 * @param key - The account being retrieved.
 * @example safeAccount(scenario, 'one')
 */
const safeAccount = (scenario: AccountStandard, key: string) => {
  const res = scenario.account[key] as Account

  delete res.hashedPassword
  delete res.salt

  return res
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

      scenario(
        "saves the invited member's email",
        async (scenario: AccountStandard) => {
          const one = scenario.account.one as Account
          const organizationId = one.organizationId
          mockCurrentUser({ organizationId })

          const email = 'anUnusedemail@example.com'

          const inviteRes = await inviteMember({ email })
          const assertRes = await db.account_Confirmation.findFirst({
            where: { email },
          })

          expect(inviteRes).toBeTruthy()
          expect(assertRes.email).toBe(email)
        }
      )

      scenario(
        'generates a confirmation code',
        async (scenario: AccountStandard) => {
          const one = scenario.account.one as Account
          const organizationId = one.organizationId
          mockCurrentUser({ organizationId })

          const email = 'anUnusedemail@example.com'

          const inviteRes = await inviteMember({ email })
          const assertRes = await db.account_Confirmation.findFirst({
            where: { email },
          })

          expect(inviteRes).toBeTruthy()
          expect(assertRes.code).toBeDefined()
        }
      )
    })
  })

  describe('read', () => {
    describe('account', () => {
      scenario(
        'returns null when the account does not exist',
        async (scenario: AccountStandard) => {
          const acc = scenario.account.one as Account
          const id = 'who would have this ID?'
          const organizationId = acc.organizationId

          mockCurrentUser({ organizationId })

          const res = await account({ id })

          expect(res).toBeNull()
        }
      )

      scenario(
        'returns the account which satisfies the query',
        async (scenario: AccountStandard) => {
          const acc = safeAccount(scenario, 'one')
          const id = acc.id
          const organizationId = acc.organizationId

          mockCurrentUser({ organizationId })

          const res = await account({ id })

          expect(res).toEqual(expect.objectContaining<Account>(acc))
        }
      )

      scenario(
        'removes the "hashedPassword" and "salt" from an account',
        async (scenario: AccountStandard) => {
          const acc = safeAccount(scenario, 'one')
          const id = acc.id
          const organizationId = acc.organizationId

          mockCurrentUser({ organizationId })

          const res = await account({ id })

          expect(res).toEqual(expect.objectContaining<Account>(acc))
          expect(res.hashedPassword).toBeUndefined()
          expect(res.salt).toBeUndefined()
        }
      )

      scenario(
        "only retrieves an account belonging to the invoker's organization",
        async (scenario: AccountStandard) => {
          const orgAcc = scenario.account.three as Account
          const organizationId = orgAcc.organizationId
          mockCurrentUser({ organizationId })

          const queryAcc = scenario.account.one as Account
          const id = queryAcc.id

          const res = await account({ id })

          expect(res).toBeNull()
        }
      )
    })

    describe('accounts', () => {
      scenario(
        'returns an empty array when no users can be found',
        async (_scenario: AccountStandard) => {
          mockCurrentUser({ organizationId: 'if only I were a real boy' })

          const res = await accounts()

          expect(res).toEqual(expect.arrayContaining([]))
        }
      )

      scenario(
        "returns a list of the accounts belonging to the invoker's organization",
        async (scenario: AccountStandard) => {
          const acc1 = safeAccount(scenario, 'one')
          // ==
          const acc2 = safeAccount(scenario, 'two')
          // ==
          const acc3 = safeAccount(scenario, 'three')

          const organizationId = acc1.organizationId
          mockCurrentUser({ organizationId })

          const res = await accounts()

          expect(res).toEqual(expect.arrayContaining<Account>([acc1, acc2]))
          expect(res).not.toEqual(expect.arrayContaining<Account>([acc3]))
        }
      )

      scenario(
        'removes "hashedPassword" and "salt" from all retrieved accounts',
        async (scenario: AccountStandard) => {
          const acc1 = safeAccount(scenario, 'one')

          const organizationId = acc1.organizationId
          mockCurrentUser({ organizationId })

          const res = await accounts()

          res.forEach((acc) => {
            expect(acc.hashedPassword).toBeUndefined()
            expect(acc.salt).toBeUndefined()
          })
        }
      )
    })

    describe('currentAccount', () => {
      scenario(
        'retrieves the account of the invoker',
        async (scenario: AccountStandard) => {
          const acc = safeAccount(scenario, 'one')
          const id = acc.id
          mockCurrentUser({ id })

          const res = await currentAccount()

          expect(res).toEqual(expect.objectContaining<Account>(acc))
        }
      )

      scenario(
        'retrieves only the account of the invoker',
        async (scenario: AccountStandard) => {
          const acc1 = safeAccount(scenario, 'one')
          const id = acc1.id
          mockCurrentUser({ id })

          const acc2 = safeAccount(scenario, 'two')
          const acc3 = safeAccount(scenario, 'three')

          const res = await currentAccount()

          expect(res).toEqual(expect.objectContaining<Account>(acc1))
          expect(res).not.toEqual(expect.objectContaining<Account>(acc2))
          expect(res).not.toEqual(expect.objectContaining<Account>(acc3))
        }
      )

      scenario(
        'removes "hashedPassword" and "salt" from the account',
        async (scenario: AccountStandard) => {
          const acc = safeAccount(scenario, 'one')
          const id = acc.id
          mockCurrentUser({ id })

          const res = await currentAccount()

          expect(res.hashedPassword).toBeUndefined()
          expect(res.salt).toBeUndefined()
        }
      )
    })
  })
})
