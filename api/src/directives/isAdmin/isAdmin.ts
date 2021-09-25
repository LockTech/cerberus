import {
  AuthenticationError as AuthError,
  createValidatorDirective,
  ValidatorDirectiveFunc,
} from '@redwoodjs/graphql-server'
import { CerberusAdminTuple } from 'src/constants/permission'
import { checkTuple } from 'src/helpers/keto'

export const schema = gql`
  directive @isAdmin on FIELD_DEFINITION
`

const validate: ValidatorDirectiveFunc = async ({ context }) => {
  const { currentUser } = context
  const { id } = currentUser

  const { namespace, object, relation } = CerberusAdminTuple

  const isAdmin = await checkTuple({ namespace, object, relation, subject: id })

  if (!isAdmin) throw new AuthError('auth-is-admin')
}

const isAdmin = createValidatorDirective(schema, validate)

export default isAdmin
