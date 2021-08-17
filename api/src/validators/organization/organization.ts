import { validate as isUUID } from 'uuid'
import { ValidationError } from '@redwoodjs/api'

import { OrganizationMaxNameLength } from 'src/constants/organization'

import { isStr } from 'src/util/asserters'

import type { IDInput, NameInput } from 'types/inputs'

/**
 * @throws
 *  * 'organization-name-invalid' - When `name` is not a string
 *  * 'organization-name-length' - When `name` is less than or 0 or greater than `OrganizationMaxNameLength` characters long
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
 */
export const validateOrganizationId = (s: string, { id }: IDInput) => {
  if (!isUUID(id)) throw new ValidationError('organization-id-invalid')

  // perform keto check that id is the invoker's organization
}
