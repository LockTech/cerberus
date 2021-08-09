import { useCallback, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
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
  name: string
  username: string
  password: string
}

const SignupPage = () => {
  // REALLY doesn't want to validate `currentPassword` before first
  // submit without initiating the form ourselves; no biggie.
  const formMethods = useForm({ mode: 'all' })

  const { t } = useTranslation()

  const { isAuthenticated, signUp } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  const nameRef = useRef<HTMLInputElement>()
  useEffect(() => {
    nameRef.current.focus()
  }, [])

  const passwordRef = useRef<HTMLInputElement>()
  const currentPassword =
    (passwordRef.current && passwordRef.current.value) || ''

  const onSubmit = useCallback(
    async (data: SignupFormData) => {
      toast.loading(t('Signup.Page.loading'))

      const response: unknown = await signUp({ ...data })

      const error = response as Error
      const _id = response as { id: string }

      toast.dismiss()

      if (error.message) {
        toast.error(t(`Signup.Page.Errors.${error.message}`, error.message))
      } else {
        toast.success(t('Signup.Page.success'))

        const email = data.username
        navigate(routes.signupConfirmation({ email }))
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
        <Form className="form" formMethods={formMethods} onSubmit={onSubmit}>
          {/* name */}
          <div className="input-group">
            <Label
              className="input-label"
              errorClassName="input-label-error"
              name="name"
            >
              {t('Signup.Page.form.name.label')}
            </Label>
            <TextField
              autoComplete="name"
              className="input-primary"
              errorClassName="input-error"
              name="name"
              placeholder={t('Signup.Page.form.name.placeholder')}
              ref={nameRef}
              validation={{
                maxLength: {
                  value: 70,
                  message: t('Signup.Page.form.name.length'),
                },
                required: {
                  value: true,
                  message: t('Signup.Page.form.name.required'),
                },
              }}
            />
            <FieldError className="input-field-error" name="name" />
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
            <FieldError className="input-field-error" name="username" />
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
              autoComplete="new-password"
              className="input-primary"
              errorClassName="input-error"
              name="password"
              placeholder={t('Signup.Page.form.password.placeholder')}
              ref={passwordRef}
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
            <FieldError className="input-field-error" name="password" />
          </div>
          {/* confirm password */}
          <div className="input-group">
            <Label
              className="input-label"
              errorClassName="input-label-error"
              name="confirmPassword"
            >
              {t('Signup.Page.form.confirmPassword.label')}
            </Label>
            <PasswordField
              autoComplete="new-password"
              className="input-primary"
              errorClassName="input-error"
              name="confirmPassword"
              placeholder={t('Signup.Page.form.password.placeholder')}
              validation={{
                validate: (value: string) =>
                  value === currentPassword ||
                  t('Signup.Page.form.confirmPassword.match'),
              }}
            />
            <FieldError className="input-field-error" name="confirmPassword" />
          </div>
          {/* submit */}
          <Submit className="button-primary-fill w-full">
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
