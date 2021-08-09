import { validate as validateUUID } from 'uuid'
import { AuthenticationError, context, ValidationError } from '@redwoodjs/api'

import { AccountNameMaxLength } from 'src/constants/account'
import { CerberusAdminTuple } from 'src/constants/permission'

// import { checkTuple } from 'src/helpers/keto'

import { isStr } from 'src/util/asserters'

/**
 * @param service
 * @throws
 *  * 'auth-undefined' - When `context.currentUser` is undefined or null
 *  * 'auth-id-invalid' - When `context.currentUser.id` is not a valid v4 UUID.
 *  * 'auth-name-invalid' - When `context.currentUser.name` is not a string or is an empty string (`''`)
 *  * 'auth-name-length' - When `context.currentUser.name.length` is <= 0 or > `AccountNameMaxLength`.
 *  * 'auth-organization-invalid' - When `context.currentUser.organizationId` is not a valid v4 UUID
 */
export const validateAuth = (_service: string) => {
  const currentUser = context.currentUser

  if (currentUser === undefined || currentUser === null)
    throw new ValidationError('auth-undefined')

  // ID
  const id = currentUser.id as string

  if (!isStr(id) || !validateUUID(id))
    throw new ValidationError('auth-id-invalid')

  // Name
  const name = currentUser.name as string

  if (!isStr(name)) throw new ValidationError('auth-name-invalid')

  if (name.length <= 0 || name.length > AccountNameMaxLength)
    throw new ValidationError('auth-name-length')

  // Organization
  const organizationId = currentUser.organizationId as string

  if (!isStr(organizationId) || !validateUUID(organizationId))
    throw new ValidationError('auth-organization-invalid')

  // Perform DB assertion that organization exist
}

/**
 * @throws
 *  * 'authorization' - When the Keto `check` fails.
 */
export const validateIsAdmin = (_service: string) => {
  const id = context.currentUser.id as string

  const { namespace, object, relation } = CerberusAdminTuple

  const _tuple = {
    namespace,
    object,
    relation,
    subject: id,
  }

  const res = true // await checkTuple(tuple)

  if (!res) throw new AuthenticationError('authorization')
}
