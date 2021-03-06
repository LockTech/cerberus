import { resolve } from 'path'

import { transporter } from 'src/lib/smtp'
import { template } from 'src/lib/template'
import type { TemplateData } from 'src/lib/template'

import { readFile } from 'src/util/readFile'

export const from = process.env.EMAIL_FROM

export const EmailDirectory = resolve(__dirname, '../../../templates')

export const EmailInviteFilePath = `${EmailDirectory}/invite.html`
export const EmailInviteSubject = process.env.EMAIL_INVITE_SUBJECT

export const EmailSignupFilePath = `${EmailDirectory}/signup.html`
export const EmailSignupSubject = process.env.EMAIL_SIGNUP_SUBJECT

// ==
export interface SendMailOptions {
  body: string
  subject: string
  to: string
}
/**
 * Makes use of `SMTPTransport`, provided by `/lib/smtp`, to send an email to the given `to`.
 *
 * `from` will be automatically filled in with the configured `EMAIL_FROM`.
 *
 * `body` should be an already templated string; **any user generated values have already been escaped**.
 */
export const sendMail = async ({ body, subject, to }: SendMailOptions) =>
  await transporter.sendMail({
    from,
    html: body,
    subject,
    to,
  })
//

// ==
export interface SendTemplateFileMailOptions
  extends Omit<SendMailOptions, 'body'> {
  data: TemplateData
  path: string
}
/**
 * Template the file at the given `path`, sending the templated results to the provided email (`to`).
 *
 * Additional arguments are provided to further configure the email sent.
 */
export const templateFileSendMail = async ({
  data,
  path,
  subject,
  to,
}: SendTemplateFileMailOptions) => {
  const file = readFile(path)
  const body = template(file, data)
  return await sendMail({ body, subject, to })
}
//

// ==
interface SendInviteEmailData extends TemplateData {
  code: string
  /**
   * The name of the member inviting another member.
   */
  name: string
  /** */
  organizationName: string
}
interface SendInviteEmailOptions {
  data: SendInviteEmailData
  email: string
}
/**
 * Send an invitation confirmation request to the given `email`
 * formatted using `data`.
 */
export const sendInviteEmail = async ({
  data,
  email,
}: SendInviteEmailOptions) =>
  await templateFileSendMail({
    data,
    path: EmailInviteFilePath,
    subject: EmailInviteSubject,
    to: email,
  })
//

// ==
interface SendSignupEmailData extends TemplateData {
  code: string
}
interface SendSignupEmailOptions {
  data: SendSignupEmailData
  email: string
}
/**
 * Send a signup confirmation request to the given `email`
 * formatted using `data`.
 */
export const sendSignupEmail = async ({
  data,
  email,
}: SendSignupEmailOptions) =>
  await templateFileSendMail({
    data,
    path: EmailSignupFilePath,
    subject: EmailSignupSubject,
    to: email,
  })
//
