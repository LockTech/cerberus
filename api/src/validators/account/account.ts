import { context, ValidationError } from '@redwoodjs/api'

import { getContextUser } from 'src/lib/context'

import { isStr } from 'src/util/asserters'

/**
 * Validate `context.currentUser` is not `null`; i.e. the user making the request
 * has been previously authenticated.
 *
 * @throws
 *  * 'account-invalid' - When `context.currentUser` is undefined.
 */
export const validateCurrentUser = () => {
  if (!context.currentUser) {
    throw new ValidationError('account-invalid')
  }
}

/**
 * Validate `context.currentUser` includes an `organizationId`.
 *
 * @throws
 *  * 'account-organizationId-invalid' - When `context.currentUser.organizationId` is undefined.
 */
export const validateAccountOrganization = () => {
  const currentAccount = getContextUser()

  const id = currentAccount?.organizationId || undefined

  if (!isStr(id)) {
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
 * @throws
 *  * 'account-id-invalid' - When `context.currentUser.id` is undefined.
 */
export const validateAccountId = () => {
  const currentAccount = getContextUser()

  const id = currentAccount?.id || undefined

  if (!isStr(id)) {
    throw new ValidationError('account-id-invalid')
  }
}

/**
 * Validate that `context.currentUser` includes a `first` and `last` name.
 *
 * @throws
 *  * 'account-name-invalid' - When `context.currentUser.firstName` AND `context.currentUser.lastName` are undefined.
 *  * 'account-name-length' - When `context.currentUser.firstName` OR `context.currentUser.lastName` are longer than `MaxNameLength`.
 */
export const validateAccountName = () => {
  const currentAccount = getContextUser()

  const firstName = currentAccount?.firstName || undefined
  const lastName = currentAccount?.lastName || undefined

  if (!isStr(firstName) || !isStr(lastName)) {
    throw new ValidationError('account-name-invalid')
  }
}
