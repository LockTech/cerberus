import { ValidationError, UserInputError } from '@redwoodjs/graphql-server'

import { SignupRes, SignupInviteRes } from 'src/constants/signup'

import { sendSignupEmail } from 'src/helpers/email'

import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'

import {
  confirmInvitation,
  createSignupConfirm,
} from 'src/services/account_confirmations'

import { isStr, isUndefined } from 'src/util/asserters'
import { randomStr } from 'src/util/randomStr'

import {
  validateAccountEmail,
  validateAccountName,
} from 'src/validators/account'

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
export const handleInvitation = async ({
  code,
  email,
  name,
  hashedPassword,
  salt,
}: HandleInvitationOptions) => {
  const isValid = await confirmInvitation({ code, email })
  if (!isValid) {
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

  return SignupInviteRes
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
 *  * 'signup-email-send' - When an error occurs sending the confirmation email.
 *  * 'signup-create-account' - When an error occurs creating the account in the DB.
 */
export const handleSignup = async ({
  email,
  name,
  hashedPassword,
  salt,
}: HandleSignupOptions) => {
  const code = randomStr(8)

  // confirmation
  await createSignupConfirm({ code, email })

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
  validateAccountEmail('signupHandler', { email })
  validateAccountName('signupHandler', { name })

  /* eslint-disable prettier/prettier */
  if (isStr(code)) return await handleInvitation({ code, email, name, ...rest })
  else if (isUndefined(code)) return await handleSignup({ email, name, ...rest })
  else throw new ValidationError('signup-invalid-code')
  /* eslint-enable prettier/prettier */
}
