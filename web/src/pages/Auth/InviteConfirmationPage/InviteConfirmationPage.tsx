import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import {
  EmailField,
  FieldError,
  Form,
  Label,
  PasswordField,
  Submit,
  TextField,
} from '@redwoodjs/forms'
import { MetaTags } from '@redwoodjs/web'

import { useSignupCallback } from 'src/hooks/useAuthCallback'
import { navigate, routes } from '@redwoodjs/router'

export interface InviteConfirmationFormData {
  email: string
  name: string
  password: string
  confirmPassword: string
}

export type InviteConfirmationPageProps = {
  code: string
  email: string
}

const InviteConfirmationPage = ({
  code = '',
  email = '',
}: InviteConfirmationPageProps) => {
  const formMethods = useForm<InviteConfirmationFormData>({ mode: 'all' })
  const { password: currentPassword } = formMethods.watch()

  const { t } = useTranslation()

  const signUp = useSignupCallback()

  const onSubmit = useCallback(
    async ({ email, name, password }: InviteConfirmationFormData) => {
      const res = await signUp({ code, email, name, password })

      !res.error && navigate(routes.home())
    },
    [code, signUp]
  )

  return (
    <>
      <MetaTags title={t('Invite.Confirmation.Page.Helmet.title')} />
      <div className="card body min-w-[26rem]">
        <div className="space-y-1">
          <h1 className="text title">{t('Invite.Confirmation.Page.title')}</h1>
          <h1 className="muted hint">
            {t('Invite.Confirmation.Page.subtitle')}
          </h1>
        </div>
        <Form className="form" formMethods={formMethods} onSubmit={onSubmit}>
          {/* Name */}
          <div className="input-group floating">
            <TextField
              autoComplete="name"
              className="input"
              errorClassName="input input-error"
              name="name"
              placeholder={t('Invite.Confirmation.Page.form.name.placeholder')}
              validation={{
                required: {
                  value: true,
                  message: t('Invite.Confirmation.Page.form.name.required'),
                },
              }}
            />
            <Label className="input-label" name="name">
              {t('Invite.Confirmation.Page.form.name.label')}
            </Label>
            <FieldError className="input-error-label" name="name" />
          </div>
          {/* Email */}
          <div className="input-group floating">
            <EmailField
              className="input"
              defaultValue={email}
              errorClassName="input input-error"
              name="email"
              placeholder={t('Invite.Confirmation.Page.form.email.placeholder')}
              validation={{
                required: {
                  value: true,
                  message: t('Invite.Confirmation.Page.form.email.required'),
                },
              }}
            />
            <Label className="input-label" name="email">
              {t('Invite.Confirmation.Page.form.email.label')}
            </Label>
            <FieldError className="input-error-label" name="email" />
          </div>
          {/* Password */}
          <div className="input-group floating">
            <PasswordField
              className="input"
              errorClassName="input input-error"
              name="password"
              placeholder={t(
                'Invite.Confirmation.Page.form.password.placeholder'
              )}
              validation={{
                minLength: {
                  value: 8,
                  message: t(
                    'Invite.Confirmation.Page.form.password.minLength'
                  ),
                },
                required: {
                  value: true,
                  message: t('Invite.Confirmation.Page.form.password.required'),
                },
              }}
            />
            <Label className="input-label" name="password">
              {t('Invite.Confirmation.Page.form.password.label')}
            </Label>
            <FieldError className="input-error-label" name="password" />
          </div>
          {/* Confirm Password */}
          <div className="input-group floating">
            <PasswordField
              className="input"
              errorClassName="input input-error"
              name="confirmPassword"
              placeholder={t(
                'Invite.Confirmation.Page.form.confirmPassword.placeholder'
              )}
              validation={{
                validate: (val: string) =>
                  val === currentPassword ||
                  t('Invite.Confirmation.Page.form.confirmPassword.match'),
              }}
            />
            <Label className="input-label" name="confirmPassword">
              {t('Invite.Confirmation.Page.form.confirmPassword.label')}
            </Label>
            <FieldError className="input-error-label" name="confirmPassword" />
          </div>
          <Submit className="btn btn-primary w-full">
            {t('Invite.Confirmation.Page.form.submit')}
          </Submit>
        </Form>
      </div>
    </>
  )
}

export default InviteConfirmationPage
