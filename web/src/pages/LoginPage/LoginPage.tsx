import { useCallback, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useAuth } from '@redwoodjs/auth'
import {
  EmailField,
  Form,
  Label,
  PasswordField,
  Submit,
  FieldError,
} from '@redwoodjs/forms'
import { Link, navigate, routes, useLocation } from '@redwoodjs/router'
import { Helmet } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { useErrorTranslation } from 'src/hooks/useErrorTranslation'

export interface LoginPageProps {
  redirectTo?: string
}

const LoginPage = ({ redirectTo }: LoginPageProps) => {
  const { t } = useTranslation()
  const { et } = useErrorTranslation()

  const { isAuthenticated, logIn } = useAuth()

  const location = useLocation()

  useEffect(() => {
    if (isAuthenticated) {
      if (redirectTo) {
        window.location.href = redirectTo
        toast(t('Login.Page.redirect'))
      } else {
        navigate(routes.home())
      }
    }
  }, [isAuthenticated, redirectTo, location, t])

  const usernameRef = useRef<HTMLInputElement>()
  useEffect(() => {
    usernameRef.current.focus()
  }, [])

  const onSubmit = useCallback(
    async (data) => {
      toast.loading(t('Login.Page.loading'))

      const response: unknown = await logIn({ ...data })

      console.log(response)

      const { error } = response as { error: string }
      const { id: _id } = response as { id: string }

      toast.dismiss()

      if (error) {
        toast.error(et({ name: 'Error', message: error }))
      } else {
        toast.success(t('Login.Page.success'))
      }
    },
    [et, logIn, t]
  )

  return (
    <>
      <Helmet>
        <title>{t('Login.Page.Helmet.title')}</title>
      </Helmet>
      <div className="auth-card">
        <header className="title-group">
          <h1 className="title">{t('Login.Page.title')}</h1>
          <p className="hint">{t('Login.Page.subtitle')}</p>
        </header>
        <Form onSubmit={onSubmit} className="form">
          {/* username */}
          <div className="input-group">
            <Label
              className="input-label"
              errorClassName="input-label-error"
              name="username"
            >
              {t('Login.Page.form.username.label')}
            </Label>
            <EmailField
              autoComplete="email"
              className="input-primary"
              errorClassName="input-error"
              name="username"
              placeholder={t('Login.Page.form.username.placeholder')}
              ref={usernameRef}
              validation={{
                required: {
                  value: true,
                  message: t('Login.Page.form.username.required'),
                },
              }}
            />
            <FieldError name="username" className="input-field-error" />
          </div>
          {/* password */}
          <div className="input-group">
            <Label
              className="input-label"
              errorClassName="input-label-error"
              name="password"
            >
              {t('Login.Page.form.password.label')}
            </Label>
            <PasswordField
              autoComplete="current-password"
              className="input-primary"
              errorClassName="input-error"
              name="password"
              placeholder={t('Login.Page.form.password.placeholder')}
              validation={{
                required: {
                  value: true,
                  message: t('Login.Page.form.password.required'),
                },
              }}
            />
            <FieldError name="password" className="input-field-error" />
          </div>
          {/* submit */}
          <Submit className="button-primary-fill w-full">
            {t('Login.Page.form.submit')}
          </Submit>
        </Form>
      </div>
      <div className="auth-link">
        <Link to={routes.signup()} className="link-primary">
          {t('Login.Page.signup')}
        </Link>
      </div>
    </>
  )
}

export default LoginPage
