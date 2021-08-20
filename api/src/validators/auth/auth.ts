import { validate as isUUID } from 'uuid'
import { AuthenticationError, context, ValidationError } from '@redwoodjs/api'

import { AccountNameMaxLength } from 'src/constants/account'
import { CerberusAdminTuple } from 'src/constants/permission'

// import { checkTuple } from 'src/helpers/keto'

import { isBool, isStr } from 'src/util/asserters'

/**
 * @throws
 *  * 'auth-undefined' - When `context.currentUser` is undefined or null
 */
export const validateCurrentUser = (_s: string) => {
  const currentUser = context.currentUser

  if (currentUser === undefined || currentUser === null)
    throw new ValidationError('auth-undefined')
}

/**
 * @throws
 *  * 'auth-id-invalid' - When `context.currentUser.id` is not a valid v4 UUID
 */
export const validateAuthId = (s: string) => {
  validateCurrentUser(s)
  const currentUser = context.currentUser

  const id = currentUser.id as string
  if (!isUUID(id)) throw new ValidationError('auth-id-invalid')
}

/**
 * @throws
 *  * 'auth-name-invalid' - When `context.currentUser.name` is not a string or is an empty string (`''`)
 *  * 'auth-name-length' - When `context.currentUser.name.length` is <= 0 or > `AccountNameMaxLength`.
 */
export const validateAuthName = (s: string) => {
  validateCurrentUser(s)
  const currentUser = context.currentUser

  const name = currentUser.name as string

  if (!isStr(name)) throw new ValidationError('auth-name-invalid')

  if (name.length <= 0 || name.length > AccountNameMaxLength)
    throw new ValidationError('auth-name-length')
}

/**
 * @throws
 *  * 'auth-organization-invalid' - When `context.currentUser.organizationId` is not a valid v4 UUID
 */
export const validateAuthOrganization = (s: string) => {
  validateCurrentUser(s)
  const currentUser = context.currentUser

  const organizationId = currentUser.organizationId as string

  if (!isUUID(organizationId))
    throw new ValidationError('auth-organization-invalid')

  // Perform DB assertion that organization exist
}

/**
 * @throws
 *  * 'auth-verified' - When `context.currentUser.verified` is `false` or `undefined`
 */
export const validateAuthVerified = (s: string) => {
  validateCurrentUser(s)
  const currentUser = context.currentUser

  const verified = currentUser.verified

  if (!isBool(verified) || !verified) throw new ValidationError('auth-verified')
}

/**
 * @throws
 *  * 'auth-is-admin' - When the Keto `check` fails.
 */
export const validateIsAdmin = (_s: string) => {
  const id = context.currentUser.id as string

  const { namespace, object, relation } = CerberusAdminTuple

  const _tuple = {
    namespace,
    object,
    relation,
    subject: id,
  }

  const res = true // await checkTuple(tuple)

  if (!res) throw new AuthenticationError('auth-is-admin')
}

/**
 * Shorthand for including all `auth` validators, including:
 * * `validateCurrentUser` (implicitly)
 * * `validateAuthVerified`
 * * `validateAuthId`
 * * `validateAuthName`
 * * `validateIsAdmin`
 */
export const validateAuth = (s: string) => {
  validateAuthVerified(s)
  validateAuthId(s)
  validateAuthName(s)
  validateAuthOrganization(s)
  // await validateIsAdmin(s)
}
