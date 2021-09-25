import {
  AuthenticationError as AuthError,
  createValidatorDirective,
  ValidatorDirectiveFunc,
} from '@redwoodjs/graphql-server'

export const schema = gql`
  directive @requireAuth on FIELD_DEFINITION
`

/**
 * @throws
 *  * 'auth-undefined'  - When `context.currentUser` is undefined or null
 *                      - When `context.currentUser.verified` is `false` or `undefined`
 *                      - When `context.currentUser.disabled` is `true` or `undefined`
 *                      - When `context.currentUser.id` is not a valid v4 UUID
 *                      - When `context.currentUser` does not belong to a created organization
 */
const validate: ValidatorDirectiveFunc = ({ context }) => {
  const currentUser = context.currentUser

  if (!currentUser) throw new AuthError('auth-undefined')
}

const auth = createValidatorDirective(schema, validate)

export default auth
