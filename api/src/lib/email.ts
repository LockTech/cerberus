import { transporter } from 'src/lib/smtp'
import { templateFile } from 'src/lib/template'
import type { TemplateData } from 'src/lib/template'

const from = process.env.EMAIL_FROM

export interface SendMailOptions {
  body: string
  subject: string
  to: string
}
export const sendMail = async ({ body, subject, to }: SendMailOptions) => {
  await transporter.sendMail({
    from,
    html: body,
    subject,
    to,
  })
}

export interface SendTemplateFileMailOptions
  extends Omit<SendMailOptions, 'body'> {
  /**
   * The data to use when templating the file located at `path`.
   */
  data: TemplateData
  /**
   * Path to a file which will be templated from, using [`SquirrellyJS`](https://squirrelly.js.org/).
   */
  path: string
}
export const templateFileSendMail = async ({
  data,
  path,
  subject,
  to,
}: SendTemplateFileMailOptions) => {
  const body = templateFile(path, data)
  return await sendMail({ body, subject, to })
}
