import type { Account } from '@prisma/client'

import { getCurrentUser, requireCurrentUser } from './auth'

import type { AuthScenario } from './auth.scenarios'

const AuthError: Error = {
  name: 'AuthenticationError',
  message: 'authentication',
}

describe('auth lib', () => {
  describe('getCurrentUser', () => {
    scenario(
      'successfully creates an account',
      async (scenario: AuthScenario) => {
        const one = scenario.account.one as Account
        const id = one.id

        const res = await getCurrentUser({ id })

        expect(res).toEqual(expect.objectContaining<Account>(one))
      }
    )
  })

  describe('requireCurrentUser', () => {
    scenario(
      "throws an AuthenticationError when current request's user is undefined",
      async (_scenario: AuthScenario) => {
        mockCurrentUser(undefined)

        expect(() => {
          requireCurrentUser()
        }).toThrow(AuthError)
      }
    )

    scenario(
      "throws an AuthenticationError when current request's user is null",
      async (_scenario: AuthScenario) => {
        mockCurrentUser(null)

        expect(() => {
          requireCurrentUser()
        }).toThrow(AuthError)
      }
    )
  })
})
