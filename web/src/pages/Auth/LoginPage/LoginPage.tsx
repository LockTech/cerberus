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
import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import { useLoginCallback } from 'src/hooks/useAuthCallback'

export interface LoginFormData {
  email: string
  password: string
}

export type LoginPageProps = {
  redirectTo?: string
}

const LoginPage = ({ redirectTo = '/' }: LoginPageProps) => {
  const { t } = useTranslation()

  const logIn = useLoginCallback()

  const onSubmit = useCallback(
    async (data: LoginFormData) => {
      const res = await logIn(data)

      window.location.href = !res.errors ? redirectTo : ''
    },
    [logIn, redirectTo]
  )

  return (
    <>
      <MetaTags title={t('Login.Page.Meta.title')} />
      <div className="flex flex-col items-center space-y-6">
        <div className="card body">
          <div className="space-y-1">
            <h1 className="text title">{t('Login.Page.title')}</h1>
            <p className="muted hint">{t('Login.Page.subtitle')}</p>
          </div>
          <Form className="space-y-6" onSubmit={onSubmit}>
            <div className="input-group floating">
              <EmailField
                autoComplete="email"
                className="input"
                errorClassName="input input-error"
                name="email"
                placeholder={t('Login.Page.form.email.placeholder')}
                validation={{
                  required: {
                    value: true,
                    message: t('Login.Page.form.email.required'),
                  },
                }}
              />
              <Label
                className="input-label"
                errorClassName="input-label"
                name="email"
              >
                {t('Login.Page.form.email.label')}
              </Label>
              <FieldError className="input-error-label" name="email" />
            </div>
            <div className="input-group floating">
              <PasswordField
                autoComplete="new-password"
                className="input"
                errorClassName="input input-error"
                name="password"
                placeholder={t('Login.Page.form.password.placeholder')}
                validation={{
                  required: {
                    value: true,
                    message: t('Login.Page.form.password.required'),
                  },
                }}
              />
              <Label className="input-label" name="password">
                {t('Login.Page.form.password.label')}
              </Label>
              <FieldError className="input-error-label" name="password" />
            </div>
            <Submit className="btn btn-primary w-full">
              {t('Login.Page.form.submit')}
            </Submit>
          </Form>
        </div>
        <Link className="link mx-auto" to={routes.signup()}>
          {t('Login.Page.signup')}
        </Link>
      </div>
    </>
  )
}

export default LoginPage
