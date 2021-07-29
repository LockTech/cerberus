import { context, ValidationError } from '@redwoodjs/api'

import { getContextUser } from 'src/lib/context'
import { logger } from 'src/lib/logger'

import { isStr } from 'src/util/asserters'

/**
 * @throws ValidationError('account-invalid')
 */
export const validateCurrentUser = (name: string) => {
  if (!context.currentUser) {
    logger.warn(`[${name}]: Could not validate current user.`)
    throw new ValidationError('account-invalid')
  }
}

/**
 * @throws ValidationError('account-organizationId-invalid')
 */
export const validateAccountOrganization = (name: string) => {
  const currentAccount = getContextUser()

  const organizationId = currentAccount?.organizationId || undefined

  if (!isStr(organizationId)) {
    logger.warn(`[${name}]: Could not validate organization exist.`)
    throw new ValidationError('account-organizationId-invalid')
  }

  // add validation for organization existing in DB
}

/**
 * @throws ValidationError('account-id-invalid')
 */
export const validateAccountId = (name: string) => {
  const currentAccount = getContextUser()

  const id = currentAccount?.id || undefined

  if (!isStr(id)) {
    logger.warn(`[${name}]: Could not validate current user has an ID.`)
    throw new ValidationError('account-id-invalid')
  }
}

/**
 * @throws ValidationError('account-name-invalid')
 */
export const validateAccountName = (name: string) => {
  const currentAccount = getContextUser()

  const firstName = currentAccount?.firstName || undefined
  const lastName = currentAccount?.lastName || undefined

  if (!isStr(firstName) || !isStr(lastName)) {
    logger.warn(
      `[${name}]: Could not validate current user has a first and last name.`
    )
    throw new ValidationError('account-name-invalid')
  }
}
