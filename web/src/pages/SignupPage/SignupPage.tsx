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
  TextField,
} from '@redwoodjs/forms'
import { Link, navigate, routes } from '@redwoodjs/router'
import { Helmet } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

interface SignupFormData {
  firstName: string
  lastName: string
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

  const firstNameRef = useRef<HTMLInputElement>()
  useEffect(() => {
    firstNameRef.current.focus()
  }, [firstNameRef])

  const onSubmit = useCallback(
    async (data: SignupFormData) => {
      toast.loading(t('Signup.Page.loading'))

      const response: unknown = await signUp({ ...data })

      const error = response as Error
      const _id = response as { id: string }

      toast.dismiss()

      if (error.message) {
        toast.error(t(`Signup.Page.Errors.${error.message}`))
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
          {/* firstName */}
          <div className="input-group">
            <Label
              className="input-label"
              errorClassName="input-label-error"
              name="firstName"
            >
              {t('Signup.Page.form.firstName.label')}
            </Label>
            <TextField
              className="input-primary"
              errorClassName="input-error"
              name="firstName"
              placeholder={t('Signup.Page.form.firstName.placeholder')}
              ref={firstNameRef}
              validation={{
                required: {
                  value: true,
                  message: t('Signup.Page.form.firstName.required'),
                },
              }}
            />
            <FieldError className="input-error-message" name="firstName" />
          </div>
          {/* lastName */}
          <div className="input-group">
            <Label
              className="input-label"
              errorClassName="input-label-error"
              name="lastName"
            >
              {t('Signup.Page.form.lastName.label')}
            </Label>
            <TextField
              className="input-primary"
              errorClassName="input-error"
              name="lastName"
              placeholder={t('Signup.Page.form.lastName.placeholder')}
              validation={{
                required: {
                  value: true,
                  message: t('Signup.Page.form.lastName.required'),
                },
              }}
            />
            <FieldError className="input-error-message" name="lastName" />
          </div>
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
