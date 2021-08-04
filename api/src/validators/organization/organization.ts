import { ValidationError } from '@redwoodjs/api'
import { isStr } from 'src/util/asserters'

export const validateOrganizationExist = () => {
  // FIXME: pending Redwood 0.36, support for async beforeResolvers
}

interface NameInput {
  name: string
}
/**
 * @throws
 *  - 'organization-name-invalid' - When `name` is not a string or equals ''
 */
export const validateOrganizationName = (
  _service: string,
  { name }: NameInput
) => {
  if (!isStr(name) || name === '') {
    throw new ValidationError('organization-name-invalid')
  }
}
