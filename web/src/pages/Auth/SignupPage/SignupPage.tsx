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
import { Link, routes } from '@redwoodjs/router'
import { Helmet } from '@redwoodjs/web'

export interface SignupPageFormData {
  name: string
  email: string
  password: string
  confirmPassword: string
}

const SignupPage = () => {
  const formMethods = useForm<SignupPageFormData>({ mode: 'all' })
  const { password: currentPassword } = formMethods.watch()

  const { t } = useTranslation()

  return (
    <>
      <Helmet title={t('Signup.Page.Helmet.title')} />
      <div className="card space-y-6">
        <div className="space-y-1">
          <h1 className="text title">{t('Signup.Page.title')}</h1>
          <p className="muted subtitle">{t('Signup.Page.subtitle')}</p>
        </div>
        <p className="text">{t('Signup.Page.welcome')}</p>
        <Form className="space-y-6" formMethods={formMethods}>
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
            <FieldError className="input-error" name="name" />
          </div>
          <div className="input-group floating">
            <EmailField
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
            <FieldError className="input-error" name="email" />
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
            <FieldError className="input-error" name="password" />
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
            <FieldError className="input-error" name="confirmPassword" />
          </div>
          <Submit className="btn btn-primary w-full">Signup</Submit>
        </Form>
        <Link className="link mx-auto" to={routes.login()}>
          {t('Signup.Page.login')}
        </Link>
      </div>
    </>
  )
}

export default SignupPage
