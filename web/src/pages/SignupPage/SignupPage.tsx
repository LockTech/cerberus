import { useCallback, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useAuth } from '@redwoodjs/auth'
import {
  EmailField,
  Form,
  Label,
  PasswordField,
  FieldError,
  Submit,
} from '@redwoodjs/forms'
import { Link, navigate, routes } from '@redwoodjs/router'
import { Helmet } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

interface SignupFormData {
  username: string
  password: string
}

const SignupPage = () => {
  const { t } = useTranslation()

  const { isAuthenticated, signUp } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  // focus on email box on page load
  const usernameRef = useRef<HTMLInputElement>()
  useEffect(() => {
    usernameRef.current.focus()
  }, [usernameRef])

  const onSubmit = useCallback(
    async (data: SignupFormData) => {
      toast.loading(t('Signup.Page.loading'))

      const response: unknown = await signUp({ ...data })

      const error = response as Error
      const _id = response as { id: string }

      toast.dismiss()

      if (error.message) {
        toast.error(error.message)
      } else {
        toast.success(t('Signup.Page.success'))
      }
    },
    [signUp, t]
  )

  return (
    <>
      <Helmet>
        <title>{t('Signup.Page.Helmet.title')}</title>
      </Helmet>
      <div className="auth-card">
        <header className="title-group">
          <h1 className="title">{t('Signup.Page.title')}</h1>
          <p className="hint">{t('Signup.Page.subtitle')}</p>
        </header>
        <Form onSubmit={onSubmit} className="form">
          {/* username */}
          <div className="input-group">
            <Label
              className="input-label"
              errorClassName="input-label-error"
              name="username"
            >
              {t('Signup.Page.form.username.label')}
            </Label>
            <EmailField
              autoComplete="email"
              className="input-primary"
              errorClassName="input-error"
              name="username"
              placeholder={t('Signup.Page.form.username.placeholder')}
              ref={usernameRef}
              validation={{
                required: {
                  value: true,
                  message: t('Signup.Page.form.username.required'),
                },
              }}
            />
            <FieldError className="input-error-message" name="username" />
          </div>
          {/* password */}
          <div className="input-group">
            <Label
              className="input-label"
              errorClassName="input-label-error"
              name="password"
            >
              {t('Signup.Page.form.password.label')}
            </Label>
            <PasswordField
              autoComplete="current-password"
              className="input-primary"
              errorClassName="input-error"
              name="password"
              placeholder={t('Signup.Page.form.password.placeholder')}
              validation={{
                minLength: {
                  value: 8,
                  message: t('Signup.Page.form.password.minLength'),
                },
                required: {
                  value: true,
                  message: t('Signup.Page.form.password.required'),
                },
              }}
            />
            <FieldError className="input-error-message" name="password" />
            <Label name="password" className="hint" errorClassName="hidden">
              {t('Signup.Page.form.password.hint')}
            </Label>
          </div>
          {/* submit */}
          <Submit className="block button-primary-fill">
            {t('Signup.Page.form.submit')}
          </Submit>
        </Form>
      </div>
      <div className="auth-link">
        <span>{t('Signup.Page.account')}</span>{' '}
        <Link to={routes.login()} className="link-primary">
          {t('Signup.Page.login')}
        </Link>
      </div>
    </>
  )
}

export default SignupPage
