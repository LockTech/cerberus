import { createTransport } from 'nodemailer'
import type { Options } from 'nodemailer/lib/smtp-transport'

import { logger } from 'src/lib/logger'

const host = process.env.SMTP_HOST
const port = parseInt(process.env.SMTP_PORT)
const user = process.env.SMTP_USER || ''
const pass = process.env.SMTP_PASS || ''
const debug = process.env.SMTP_DEBUG === 'true' ? true : false

const options: Options = {
  host,
  port,
  auth: {
    user,
    pass,
  },
  /// @ts-expect-error Pino uses bunyan under the hood.
  logger,
  debug,
}

/**
 * An SMTP `transporter`; can be used to send emails using any of the options available
 * with [Nodemailer's `SMTPTransporter`](https://nodemailer.com/smtp/).
 *
 * An SMTP server should be configured using the provided environment variables.
 *
 * **Note:** For simple emailing, consider using `sendMail`. This function can be combined
 * with `template` to easily created user generated emails.
 */
export const transporter = createTransport(options)
