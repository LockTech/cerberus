import { context, ValidationError } from '@redwoodjs/graphql-server'

import { getContextUser } from 'src/lib/context'

import { isStr } from 'src/util/asserters'

const MaxNameLength = 70

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
 *  * 'account-organization-invalid' - When `context.currentUser.organizationId` is undefined.
 */
export const validateAccountOrganization = () => {
  const currentAccount = getContextUser()

  const id = currentAccount?.organizationId || undefined

  if (!isStr(id)) {
    throw new ValidationError('account-organization-invalid')
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
 * Validate that `context.currentUser` includes a `name`.
 *
 * @throws
 *  * 'account-name-invalid' - When `name` is undefined.
 *  * 'account-name-length' - When `name` is longer than `MaxNameLength`.
 */
export const validateAccountName = (
  _service: string,
  { name }: { name?: string }
) => {
  if (!isStr(name)) {
    throw new ValidationError('account-name-invalid')
  }

  if (name.length > MaxNameLength) {
    throw new ValidationError('account-name-length')
  }
}
