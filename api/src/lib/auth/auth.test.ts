import type { Account } from '@prisma/client'

import { getCurrentUser } from './auth'

import type { AuthScenario } from './auth.scenarios'

describe('auth lib', () => {
  describe('getContextUser', () => {
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
})
