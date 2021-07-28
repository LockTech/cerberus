import { sendSignupEmail } from 'src/helpers/email'

import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'

import {
  confirmInvitation,
  createSignupConfirm,
} from 'src/services/account_confirmations'

import { isStr, isUndefined } from 'src/util/asserters'
import { randomStr } from 'src/util/randomStr'

import { validateEmail } from 'src/validators/email'

// ==
const InviteRes = false
const SignupRes = false
//

// ==
interface HandleInvitationOptions {
  code: string
  email: string
  firstName: string
  hashedPassword: string
  lastName: string
  salt: string
}
const handleInvitation = async ({
  code,
  email,
  firstName,
  hashedPassword,
  lastName,
  salt,
}: HandleInvitationOptions) => {
  const verifyCode = await confirmInvitation({ code, email })

  if (!verifyCode) {
    throw new Error('invalid-invite')
  }

  await db.account.create({
    data: {
      email,
      firstName,
      hashedPassword,
      lastName,
      salt,
      verified: true,
    },
  })

  return InviteRes
}
//

// ==
interface HandleSignupOptions {
  email: string
  firstName: string
  hashedPassword: string
  lastName: string
  salt: string
}
const handleSignup = async ({
  email,
  firstName,
  hashedPassword,
  lastName,
  salt,
}: HandleSignupOptions) => {
  const code = randomStr(8)

  await createSignupConfirm({ code, email })

  const data = {
    code,
  }
  await sendSignupEmail({ data, email })

  await db.account.create({
    data: {
      email,
      firstName,
      hashedPassword,
      lastName,
      salt,
      verified: false,
    },
  })

  return SignupRes
}
//

// ==
interface SignupHandlerOptions {
  username: string
  hashedPassword: string
  salt: string
  userAttributes?: { code: string; firstName: string; lastName: string }
}
export const signupHandler = async ({
  username: email,
  userAttributes: { code, firstName, lastName },
  ...rest
}: SignupHandlerOptions) => {
  validateEmail('signupHandler', { input: { email } })

  if (!isStr(firstName) || !isStr(lastName)) {
    logger.warn('Attempted signup without a first and last name.')
    throw new SyntaxError(
      'Cannot create an account without a first and last name.'
    )
  }

  // Invite
  if (isStr(code)) {
    logger.info('Attempting to accept an invitation.')
    return await handleInvitation({ code, email, firstName, lastName, ...rest })
  }

  // Signup
  else if (isUndefined(code)) {
    logger.info('Attempting to signup a new account.')
    return await handleSignup({ email, firstName, lastName, ...rest })
  }

  // Error
  else {
    logger.warn('Recieved a non-string value for signup "code".')
    throw new SyntaxError('Signup code should be a string.')
  }
}
