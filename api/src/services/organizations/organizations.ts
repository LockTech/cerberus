import type { BeforeResolverSpecType } from '@redwoodjs/api'

import { db } from 'src/lib/db'
import { getContextUser } from 'src/lib/context'

import {
  validateCurrentUser,
  validateAccountOrganization,
} from 'src/validators/account'

// Used when the environment variable REDWOOD_SECURE_SERVICES=1
export const beforeResolver = (rules: BeforeResolverSpecType) => {
  rules.add([validateCurrentUser, validateAccountOrganization])
}

// == R
//
export const organization = async () => {
  const id = getContextUser().organizationId

  const res = await db.organization.findUnique({
    where: { id },
  })

  return res
}
//
