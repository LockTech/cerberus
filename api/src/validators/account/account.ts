import { context, ValidationError } from '@redwoodjs/api'

import { getContextUser } from 'src/lib/context'
import { logger } from 'src/lib/logger'

import { isStr } from 'src/util/asserters'

/**
 * Validate `context.currentUser` is not `null`; i.e. the user making the request
 * has been previously authenticated.
 *
 * @throws ValidationError('account-invalid')
 */
export const validateCurrentUser = (name: string) => {
  if (!context.currentUser) {
    logger.warn(`[${name}]: Could not validate current user.`)
    throw new ValidationError('account-invalid')
  }
}

/**
 * Validate `context.currentUser` includes an `organizationId`.
 *
 * @throws ValidationError('account-organizationId-invalid')
 */
export const validateAccountOrganization = (name: string) => {
  const currentAccount = getContextUser()

  const id = currentAccount?.organizationId || undefined

  if (!isStr(id)) {
    logger.warn(`[${name}]: Could not validate organizationId is present.`)
    throw new ValidationError('account-organizationId-invalid')
  }

  // FIXME: Pending release of Redwood 0.36 - support for async beforeResolvers
  // const orgCount = await db.organization.count({ where: { id } })
  // if (orgCount !== 1) {
  //   logger.warn(`[${name}]: Could not validate organization exist.`)
  //   throw new ValidationError('account-organization-exist')
  // }
}

/**
 * Validate that `context.currentUser` includes an `id`.
 *
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
 * Validate that `context.currentUser` includes a `first` and `last` name.
 *
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
