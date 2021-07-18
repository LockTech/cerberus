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
import { parseSearch } from '@redwoodjs/router/dist/util'
import { toast } from '@redwoodjs/web/toast'

const LoginPage = () => {
  const { t } = useTranslation()

  const { isAuthenticated, logIn } = useAuth()

  const location = useLocation()

  useEffect(() => {
    if (isAuthenticated) {
      const redirect =
        location.search &&
        (parseSearch(location.search) as { redirectTo: string }).redirectTo

      if (redirect) {
        window.location.href = redirect
        toast(t('Login.Page.redirectUnknown'))
      } else {
        navigate(routes.home())
        toast(t('Login.Page.redirectHome'))
      }
    }
  }, [isAuthenticated, location, t])

  const usernameRef = useRef<HTMLInputElement>()
  useEffect(() => {
    usernameRef.current.focus()
  }, [])

  const onSubmit = useCallback(
    (data) => {
      toast.promise(logIn({ ...data }), {
        loading: t('Login.Page.loading'),
        success: t('Login.Page.success'),
        error: (err: Error) => err.message,
      })
    },
    [logIn, t]
  )

  return (
    <>
      <div className="card card-body space-y-6">
        <header className="title-group">
          <h1 className="title">{t('Login.Page.title')}</h1>
          <p className="hint">{t('Login.Page.subtitle')}</p>
        </header>
        <Form onSubmit={onSubmit} className="form">
          {/* username */}
          <div className="input-group">
            <Label name="username" className="input-label">
              {t('Login.Page.form.username.label')}
            </Label>
            <EmailField
              autoComplete="email"
              className="input"
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
            <FieldError name="username" className="input-error-message" />
          </div>
          {/* password */}
          <div className="input-group">
            <Label name="password" className="input-label">
              {t('Login.Page.form.password.label')}
            </Label>
            <PasswordField
              autoComplete="current-password"
              className="input"
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
            <FieldError name="password" className="input-error-message" />
          </div>
          {/* submit */}
          <Submit className="block button-fill-blue">
            {t('Login.Page.form.submit')}
          </Submit>
        </Form>
      </div>
      <div className="auth-account">
        <span>{t('Login.Page.account')}</span>{' '}
        <Link to={routes.signup()} className="link">
          {t('Login.Page.signup')}
        </Link>
      </div>
    </>
  )
}

export default LoginPage
