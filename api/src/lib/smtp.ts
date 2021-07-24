import { createTransport } from 'nodemailer'
import type { Options } from 'nodemailer/lib/smtp-transport'

import { logger } from 'src/lib/logger'

const host = process.env.SMTP_HOST
const port = parseInt(process.env.SMTP_PORT)
const user = process.env.SMTP_USER
const pass = process.env.SMTP_PASS
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

export const transporter = createTransport(options)
