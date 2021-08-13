import type { Account, Organization } from '@prisma/client'

import { getCurrentUser } from './auth'
import type { AuthScenario } from './auth.scenarios'

describe('auth lib', () => {
  describe('getCurrentUser', () => {
    scenario(
      'returns "null" when an account cannot be found',
      async (_scenario: AuthScenario) => {
        const res = await getCurrentUser({ id: '1' })

        expect(res).toBeNull()
      }
    )

    scenario(
      'returns "null" when the account is not verified',
      async (scenario: AuthScenario) => {
        const acc = scenario.account.two as Account
        const id = acc.id

        const res = await getCurrentUser({ id })

        expect(res).toBeNull()
      }
    )

    scenario(
      'returns the correct account if successful',
      async (scenario: AuthScenario) => {
        const acc = scenario.account.one as Account
        const id = acc.id

        const res = await getCurrentUser({ id })

        delete acc.hashedPassword
        delete acc.salt
        delete res.organization

        expect(res).toEqual(expect.objectContaining(acc))
      }
    )

    scenario(
      "returns the account's organization",
      async (scenario: AuthScenario) => {
        const acc = scenario.account.one as Account
        const id = acc.id

        const org = scenario.organization.one as Organization

        const fullRes = await getCurrentUser({ id })
        const res = fullRes.organization

        expect(res).toEqual(expect.objectContaining(org))
      }
    )
  })
})
