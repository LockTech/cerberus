import { validate as isUUID } from 'uuid'
import { AuthenticationError, context, ValidationError } from '@redwoodjs/api'

import { AccountNameMaxLength } from 'src/constants/account'
import { CerberusAdminTuple } from 'src/constants/permission'

import { checkTuple } from 'src/helpers/keto'

import { db } from 'src/lib/db'

import { isBool, isStr } from 'src/util/asserters'
import { getContextUser } from 'src/lib/context'

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
 *  * 'auth-disabled' - When `context.currentUser.disabled` is `true` or `undefined`
 */
export const validateAuthDisabled = (s: string) => {
  validateCurrentUser(s)
  const currentUser = context.currentUser

  const disabled = currentUser.disabled

  if (!isBool(disabled) || disabled) throw new ValidationError('auth-disabled')
}

/**
 * @throws
 *  * 'auth-organization-invalid' - When `context.currentUser.organizationId` is not a valid v4 UUID.
 *  * 'auth-organization-exist' - When `context.currentUser.organizationId` is not a valid organization.
 */
export const validateAuthOrganization = async (s: string) => {
  validateCurrentUser(s)
  const user = getContextUser()
  const id = user.organizationId

  if (!isUUID(id)) throw new ValidationError('auth-organization-invalid')

  const res = await db.organization.findUnique({ where: { id } })

  if (res === null) throw new ValidationError('auth-organization-exist')
}

/**
 * @throws
 *  * 'auth-is-admin' - When the Keto `check` fails.
 */
export const validateIsAdmin = async (_s: string) => {
  const id = context.currentUser.id as string

  const { namespace, object, relation } = CerberusAdminTuple

  const tuple = {
    namespace,
    object,
    relation,
    subject: id,
  }

  const res = await checkTuple(tuple)

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
export const validateAuth = async (s: string) => {
  validateAuthVerified(s)
  validateAuthDisabled(s)
  validateAuthId(s)
  validateAuthName(s)
  await validateAuthOrganization(s)
  await validateIsAdmin(s)
  return
}
