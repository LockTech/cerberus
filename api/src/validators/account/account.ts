import { ValidationError } from '@redwoodjs/api'

import { getCurrentUser } from 'src/lib/currentUser'
import { logger } from 'src/lib/logger'

import { isStr } from 'src/util/asserters'

export const validateAccountOrganization = (name: string) => {
  const currentAccount = getCurrentUser()

  const organizationId = currentAccount?.organizationId || undefined

  if (!isStr(organizationId)) {
    logger.warn(`[${name}]: Could not validate organization id exist.`)
    throw new ValidationError('exist')
  }
}

export const validateAccountId = (name: string) => {
  const currentAccount = getCurrentUser()

  const id = currentAccount?.id || undefined

  if (!isStr(id)) {
    logger.warn(`[${name}]: Could not validate current user has an ID.`)
    throw new ValidationError('exist')
  }
}
