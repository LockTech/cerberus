import { resolve } from 'path'

export const EmailFrom = process.env.EMAIL_FROM

export const EmailDirectory = resolve(__dirname, '../templates')

export const EmailInviteFilePath = `${EmailDirectory}/invite.html`
export const EmailInviteSubject = process.env.EMAIL_INVITE_SUBJECT

export const EmailSignupFilePath = `${EmailDirectory}/signup.html`
export const EmailSignupSubject = process.env.EMAIL_SIGNUP_SUBJECT
