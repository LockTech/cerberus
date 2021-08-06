import { ValidationError } from '@redwoodjs/graphql-server'
import { isStr } from 'src/util/asserters'

const MaxNameLength = 60

export const validateOrganizationExist = () => {
  // FIXME: pending Redwood 0.36, support for async beforeResolvers
}

interface NameInput {
  name: string
}
/**
 * @throws
 *  * 'organization-name-invalid' - When `name` is not a string or equals ''
 *  * 'organization-name-length' - When `name.length` is greater than `MaxNameLength` (default: 60)
 */
export const validateOrganizationName = (
  _service: string,
  { name }: NameInput
) => {
  if (!isStr(name) || name === '') {
    throw new ValidationError('organization-name-invalid')
  }

  if (name.length > MaxNameLength) {
    throw new ValidationError('organization-name-length')
  }
}
