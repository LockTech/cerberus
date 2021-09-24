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
import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import { useSignupCallback } from 'src/hooks/useAuthCallback'

export interface SignupFormData {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export type SignupPageProps = {
  redirectTo?: string
}

const SignupPage = ({ redirectTo = '/' }: SignupPageProps) => {
  const formMethods = useForm<SignupFormData>({ mode: 'all' })
  const { password: currentPassword } = formMethods.watch()

  const { t } = useTranslation()

  const signUp = useSignupCallback()

  const onSubmit = useCallback(
    async (data: SignupFormData) => {
      const res = await signUp(data)

      !res.error &&
        navigate(routes.signupConfirmation({ email: data.email, redirectTo }))
    },
    [redirectTo, signUp]
  )

  return (
    <>
      <MetaTags title={t('Signup.Page.Meta.title')} />
      <div className="flex flex-col items-center space-y-4">
        <div className="card body">
          <div className="space-y-1">
            <h1 className="text title">{t('Signup.Page.title')}</h1>
            <p className="muted subtitle">{t('Signup.Page.subtitle')}</p>
          </div>
          <p className="text">{t('Signup.Page.welcome')}</p>
          <Form
            className="space-y-6"
            formMethods={formMethods}
            onSubmit={onSubmit}
          >
            <div className="input-group floating">
              <TextField
                autoComplete="name"
                className="input"
                errorClassName="input input-error"
                name="name"
                placeholder={t('Signup.Page.form.name.placeholder')}
                validation={{
                  required: {
                    value: true,
                    message: t('Signup.Page.form.name.required'),
                  },
                }}
              />
              <Label className="input-label" name="name">
                {t('Signup.Page.form.name.label')}
              </Label>
              <FieldError className="input-error-label" name="name" />
            </div>
            <div className="input-group floating">
              <EmailField
                autoComplete="email"
                className="input"
                errorClassName="input input-error"
                name="email"
                placeholder={t('Signup.Page.form.email.placeholder')}
                validation={{
                  required: {
                    value: true,
                    message: t('Signup.Page.form.email.required'),
                  },
                }}
              />
              <Label
                className="input-label"
                errorClassName="input-label"
                name="email"
              >
                {t('Signup.Page.form.email.label')}
              </Label>
              <FieldError className="input-error-label" name="email" />
            </div>
            <div className="input-group floating">
              <PasswordField
                autoComplete="new-password"
                className="input"
                errorClassName="input input-error"
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
              <Label className="input-label" name="password">
                {t('Signup.Page.form.password.label')}
              </Label>
              <Label
                className="input-hint"
                errorClassName="hidden"
                name="password"
              >
                {t('Signup.Page.form.password.hint')}
              </Label>
              <FieldError className="input-error-label" name="password" />
            </div>
            <div className="input-group floating">
              <PasswordField
                autoComplete="new-password"
                className="input"
                errorClassName="input input-error"
                name="confirmPassword"
                placeholder={t('Signup.Page.form.confirmPassword.placeholder')}
                validation={{
                  validate: (val: string) =>
                    val === currentPassword ||
                    t('Signup.Page.form.confirmPassword.match'),
                }}
              />
              <Label className="input-label" name="confirmPassword">
                {t('Signup.Page.form.confirmPassword.label')}
              </Label>
              <FieldError
                className="input-error-label"
                name="confirmPassword"
              />
            </div>
            <Submit className="btn btn-primary w-full">
              {t('Signup.Page.form.submit')}
            </Submit>
          </Form>
        </div>
        <Link className="link mx-auto" to={routes.login()}>
          {t('Signup.Page.login')}
        </Link>
      </div>
    </>
  )
}

export default SignupPage
