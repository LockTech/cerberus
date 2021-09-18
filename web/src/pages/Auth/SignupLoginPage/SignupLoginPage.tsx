import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import {
  EmailField,
  FieldError,
  Form,
  Label,
  PasswordField,
  Submit,
} from '@redwoodjs/forms'
import { navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import { useLoginCallback } from 'src/hooks/useAuthCallback'

export interface SignupLoginFormData {
  email: string
  password: string
}

export type SignupLoginPageProps = {
  email: string
  redirectTo: string
}

const SignupLoginPage = ({ email, redirectTo }: SignupLoginPageProps) => {
  const { t } = useTranslation()

  const logIn = useLoginCallback()

  const onSubmit = useCallback(
    async (data: SignupLoginFormData) => {
      const res = await logIn(data)

      !res.error && navigate(routes.signupOrganization({ redirectTo }))
    },
    [logIn, redirectTo]
  )

  return (
    <>
      <MetaTags title={t('Signup.Login.Page.Meta.title')} />
      <div className="card body">
        <div className="space-y-1">
          <h1 className="text title">{t('Signup.Login.Page.title')}</h1>
          <p className="muted hint">{t('Signup.Login.Page.subtitle')}</p>
        </div>
        <Form className="space-y-6" onSubmit={onSubmit}>
          <div className="input-group floating">
            <EmailField
              autoComplete="email"
              className="input"
              defaultValue={email}
              errorClassName="input input-error"
              name="email"
              placeholder={t('Signup.Login.Page.form.email.placeholder')}
              validation={{
                required: {
                  value: true,
                  message: t('Signup.Login.Page.form.email.required'),
                },
              }}
            />
            <Label
              className="input-label"
              errorClassName="input-label"
              name="email"
            >
              {t('Signup.Login.Page.form.email.label')}
            </Label>
            <FieldError className="input-error-label" name="email" />
          </div>
          <div className="input-group floating">
            <PasswordField
              autoComplete="new-password"
              className="input"
              errorClassName="input input-error"
              name="password"
              placeholder={t('Signup.Login.Page.form.password.placeholder')}
              validation={{
                required: {
                  value: true,
                  message: t('Signup.Login.Page.form.password.required'),
                },
              }}
            />
            <Label className="input-label" name="password">
              {t('Signup.Login.Page.form.password.label')}
            </Label>
            <FieldError className="input-error-label" name="password" />
          </div>
          <Submit className="btn btn-primary w-full">
            {t('Signup.Login.Page.form.submit')}
          </Submit>
        </Form>
      </div>
    </>
  )
}

export default SignupLoginPage
