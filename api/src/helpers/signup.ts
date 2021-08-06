import { ValidationError, UserInputError } from '@redwoodjs/graphql-server'

import { sendSignupEmail } from 'src/helpers/email'

import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'

import {
  confirmInvitation,
  createSignupConfirm,
} from 'src/services/account_confirmations'

import { isStr, isUndefined } from 'src/util/asserters'
import { randomStr } from 'src/util/randomStr'
import { validateAccountName } from 'src/validators/account'

import { validateEmail } from 'src/validators/email'

// ==
const InviteRes = false
const SignupRes = false
//

// ==
interface HandleInvitationOptions {
  code: string
  email: string
  name: string
  hashedPassword: string
  salt: string
}
/**
 * @throws
 *  * 'invite-code-invalid' - When the invitation code given is invalid.
 *  * 'invite-create-account' - When an errror occurs creating the account in the DB.
 */
const handleInvitation = async ({
  code,
  email,
  name,
  hashedPassword,
  salt,
}: HandleInvitationOptions) => {
  if (!(await confirmInvitation({ code, email }))) {
    throw new UserInputError('invite-code-invalid')
  }

  try {
    await db.account.create({
      data: {
        email,
        name,
        hashedPassword,
        salt,
        verified: true,
        verifiedAt: new Date().toISOString(),
      },
    })
  } catch (err) {
    logger.error({ err }, 'Prisma error creating invited account.')
    throw new UserInputError('invite-create-account')
  }

  return InviteRes
}
//

// ==
interface HandleSignupOptions {
  email: string
  name: string
  hashedPassword: string
  salt: string
}
/**
 * @throws
 *  * 'signup-create-confirm' - When an error occurs creating the signup confirmation.
 *  * 'signup-email-send' - When an error occurs sending the confirmation email.
 *  * 'signup-create-account' - When an error occurs creating the account in the DB.
 */
const handleSignup = async ({
  email,
  name,
  hashedPassword,
  salt,
}: HandleSignupOptions) => {
  const code = randomStr(8)

  // confirmation
  try {
    await createSignupConfirm({ code, email })
  } catch (err) {
    logger.error({ err }, 'Error creating signup confirmation.')
    throw new UserInputError('signup-confirm-create')
  }

  // email
  try {
    const data = {
      code,
      email,
    }
    await sendSignupEmail({ data, email })
  } catch (err) {
    logger.error({ err }, 'Error sending signup confirmation email.')
    throw new UserInputError('signup-email-send')
  }

  // create
  try {
    await db.account.create({
      data: {
        email,
        name,
        hashedPassword,
        salt,
        verified: false,
      },
    })
  } catch (err) {
    logger.error({ err }, 'Prisma error creating signed up account.')
    throw new UserInputError('signup-create-account')
  }

  return SignupRes
}
//

// ==
interface SignupHandlerOptions {
  username: string
  hashedPassword: string
  salt: string
  userAttributes?: { code: string; name: string }
}
/**
 * @throws
 *  * Any error thrown by `validateEmail`
 *  * 'signup-name-required' - When `name` is not present.
 *  * 'signup-name-length' - When `name` is not present.
 *  * 'signup-invalid-code' - When `code` is defined but not a string.
 */
export const signupHandler = async ({
  username: email,
  userAttributes: { code, name },
  ...rest
}: SignupHandlerOptions) => {
  logger.debug({ email, code, name, ...rest }, 'Handling signup.')

  validateEmail('signupHandler', { email })
  validateAccountName('signupHandler', { name })

  // Invite
  if (isStr(code)) {
    logger.info('Attempting to accept an invitation.')
    return await handleInvitation({ code, email, name, ...rest })
  }

  // Signup
  else if (isUndefined(code)) {
    logger.info('Attempting to signup a new account.')
    return await handleSignup({ email, name, ...rest })
  }

  // Error
  else {
    logger.warn('Recieved a non-string value for signup "code".')
    throw new ValidationError('signup-invalid-code')
  }
}
