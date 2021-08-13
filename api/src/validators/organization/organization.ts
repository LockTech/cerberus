import { validate as isUUID } from 'uuid'
import { ValidationError } from '@redwoodjs/api'

import { OrganizationMaxNameLength } from 'src/constants/organization'

import { isStr } from 'src/util/asserters'

import type { IDInput, NameInput } from 'types/inputs'

/**
 * @throws
 *  * 'organization-name-invalid' - When `name` is not a string
 *  * 'organization-name-length' - When `name` is less than or 0 or greater than `OrganizationMaxNameLength` characters long
 *  * 'organization-name-taken' - When `name` is in use by another organization
 */
export const validateOrganizationName = (s: string, { name }: NameInput) => {
  if (!isStr(name)) throw new ValidationError('organization-name-invalid')

  if (name.length <= 0 || name.length > OrganizationMaxNameLength)
    throw new ValidationError('organization-name-length')

  // perform db check for name uniqueness case insensitive
}

/**
 * @throws
 *  * 'organization-id-invalid' - When `id` is not a valid UUID
 *  * 'organization-id-exist' - When `id` does not belong to an organization which exist
 */
export const validateOrganizationId = (s: string, { id }: IDInput) => {
  if (!isUUID(id)) throw new ValidationError('organization-id-invalid')

  // perform db check that id belongs to an organization
}
