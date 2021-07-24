import type { Account_Confirmation } from '@prisma/client'

import { db } from 'src/lib/db'

import { randomStr } from 'src/util/randomStr'

import { confirmAccount, createAccount } from './confirmation'
import type { CreateAccountOptions } from './confirmation'

import type { ConfirmationScenario } from './confirmation.scenarios'

// const DatabaseError = 'database'
const ExistError = 'exist'

const AccountData: CreateAccountOptions = {
  email: 'cant@exist.net',
  firstName: 'Cant',
  lastName: 'Exist',
  hashedPassword: '',
  salt: '',
}

describe('confirmation lib', () => {
  describe('createAccount', () => {
    scenario(
      'successfully creates an account',
      async (_scenario: ConfirmationScenario) => {
        const res = await createAccount(AccountData)

        expect(res).toBeTruthy()
      }
    )
  })

  describe('confirmAccount', () => {
    scenario(
      'errors if a code cannot be retrieved',
      async (scenario: ConfirmationScenario) => {
        const one = scenario.account_Confirmation.one as Account_Confirmation
        const email = one.email

        const res = await confirmAccount({
          ...AccountData,
          code: randomStr(5),
          email,
        })

        expect(res).toBe(ExistError)
      }
    )

    scenario(
      'errors if an email cannot be retrieved',
      async (scenario: ConfirmationScenario) => {
        const one = scenario.account_Confirmation.one as Account_Confirmation
        const code = one.code

        const res = await confirmAccount({
          ...AccountData,
          code,
        })

        expect(res).toBe(ExistError)
      }
    )

    scenario(
      'removes confirmation data after successful creation',
      async (scenario: ConfirmationScenario) => {
        const one = scenario.account_Confirmation.one as Account_Confirmation
        const code = one.code
        const email = one.email

        const res = await confirmAccount({
          ...AccountData,
          code,
          email,
        })

        const assertRes = await db.account_Confirmation.findMany({
          where: { code, email },
        })

        expect(res).toBeFalsy()
        expect(assertRes).toStrictEqual([])
      }
    )

    scenario(
      'returns "false" when organizationId is defined',
      async (scenario: ConfirmationScenario) => {
        const one = scenario.account_Confirmation.one as Account_Confirmation
        const code = one.code
        const email = one.email

        const res = await confirmAccount({
          ...AccountData,
          code,
          email,
        })

        expect(res).toBeFalsy()
      }
    )

    scenario(
      'returns "true" when organizationId is NOT defined',
      async (scenario: ConfirmationScenario) => {
        const two = scenario.account_Confirmation.two as Account_Confirmation
        const code = two.code
        const email = two.email

        const res = await confirmAccount({
          ...AccountData,
          code,
          email,
        })

        expect(res).toBeTruthy()
      }
    )
  })
})
