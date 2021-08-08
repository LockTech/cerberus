import { validate as validateUUID } from 'uuid'
import { context, ValidationError } from '@redwoodjs/api'

import { AccountNameMaxLength } from 'src/constants/account'

import { logger } from 'src/lib/logger'

import { isStr } from 'src/util/asserters'

/**
 * @param service
 * @throws
 *  * 'user-undefined' - When `context.currentUser` is undefined or null
 */
export const validateUser = (service: string) => {
  const contextUser = context.currentUser
  if (contextUser === undefined || contextUser === null) {
    logger.error({ service }, 'Error validating user.')
    throw new ValidationError('user-undefined')
  }
}

/**
 * @param service
 * @throws
 *  * 'user-id-invalid' - When `context.currentUser.id` is not a valid v4 UUID.
 */
export const validateUserID = (service: string) => {
  const id = context.currentUser.id as string

  if (!isStr(id) || !validateUUID(id)) {
    logger.error({ service }, "Error validating user's ID.")
    throw new ValidationError('user-id-invalid')
  }
}

/**
 * @param service
 * @throws
 *  * 'currentUser-name-invalid' - When `context.currentUser.name` is not a string or is an empty string (`''`)
 *  * 'user-name-length' - When `context.currentUser.name.length` is <= 0 or > `AccountNameMaxLength`.
 */
export const validateUserName = (service: string) => {
  const name = context.currentUser.name as string

  if (!isStr(name)) {
    logger.warn({ service }, "Error validating user's name.")
    throw new ValidationError('user-name-invalid')
  }

  if (name.length <= 0 || name.length > AccountNameMaxLength) {
    logger.warn({ service }, "Error validating user's name.")
    throw new ValidationError('user-name-length')
  }
}

/**
 * @param service
 * @throws
 *  * 'currentUser-organization-invalid' - When `context.currentUser.organizationId` is not a valid v4 UUID
 */
export const validateUserOrg = (service: string) => {
  const organizationId = context.currentUser.organizationId as string

  if (!isStr(organizationId) || !validateUUID(organizationId)) {
    logger.error({ service }, "Error validating user's organization.")
    throw new ValidationError('user-organization-invalid')
  }

  // Perform DB assertion that organization exist
}
