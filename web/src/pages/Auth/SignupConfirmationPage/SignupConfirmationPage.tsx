import { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation } from '@apollo/client'
import { FieldError, Form, Label, Submit, TextField } from '@redwoodjs/forms'
import { navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { useErrorTranslation } from 'src/hooks/useErrorTranslation'

export const RESEND_MUTATION = gql`
  mutation ResendAccountConfirmationMutation($email: String!) {
    resendConfirmation(email: $email)
  }
`
export const CONFIRM_MUTATION = gql`
  mutation ConfirmAccountMutation($code: String!, $email: String!) {
    confirmSignup(code: $code, email: $email)
  }
`

export interface SignupConfirmationFormData {
  code: string
}

export type SignupConfirmationPageProps = {
  email: string
  redirectTo?: string
}

const SignupConfirmationPage = ({
  email,
  redirectTo,
}: SignupConfirmationPageProps) => {
  const { t } = useTranslation()
  const { et } = useErrorTranslation()

  const [resend, { loading: loadingResend }] = useMutation(RESEND_MUTATION, {
    variables: { email },
  })
  const onClickResend = useCallback(async () => {
    if (loadingResend) return

    toast.promise(resend(), {
      loading: t('Signup.Confirmation.Page.resend.loading'),
      success: t('Signup.Confirmation.Page.resend.success'),
      error: (err: Error) => et(err),
    })
  }, [et, loadingResend, resend, t])

  useEffect(() => {
    if (email === undefined) {
      toast.error(t('Signup.Confirmation.Page.emailMissing'))
      navigate(routes.signup())
    }
  }, [email, t])

  const [confirm, { loading: loadingConfirm }] = useMutation(CONFIRM_MUTATION)
  const onSubmit = useCallback(
    ({ code }: SignupConfirmationFormData) => {
      if (loadingConfirm) return

      toast.promise(confirm({ variables: { code, email } }), {
        loading: t('Signup.Confirmation.Page.confirm.loading'),
        success: () => {
          navigate(routes.signupLogin({ email, redirectTo }))
          return t('Signup.Confirmation.Page.confirm.success')
        },
        error: (err: Error) => et(err),
      })
    },
    [confirm, email, et, loadingConfirm, redirectTo, t]
  )

  return (
    <>
      <MetaTags title={t('Signup.Confirmation.Page.Meta.title')} />
      <div className="card body">
        <div className="space-y-1">
          <h1 className="text title">{t('Signup.Confirmation.Page.title')}</h1>
          <p className="muted subtitle">
            {t('Signup.Confirmation.Page.subtitle')}
          </p>
        </div>
        <div className="space-y-4">
          <p className="text">{t('Signup.Confirmation.Page.emailSent')}</p>
          <p className="text">{t('Signup.Confirmation.Page.instructions')}</p>
        </div>
        <Form className="space-y-6" onSubmit={onSubmit}>
          <div className="input-group floating">
            <TextField
              className="input"
              errorClassName="input input-error"
              name="code"
              placeholder={t('Signup.Confirmation.Page.form.code.placeholder')}
              validation={{
                required: {
                  value: true,
                  message: t('Signup.Confirmation.Page.form.code.required'),
                },
              }}
            />
            <Label className="input-label" name="code">
              {t('Signup.Confirmation.Page.form.code.label')}
            </Label>
            <FieldError className="input-error-label" name="code" />
          </div>
          <Submit className="btn btn-primary w-full">
            {t('Signup.Confirmation.Page.form.submit')}
          </Submit>
        </Form>
        <button
          className="link mx-auto"
          onClick={onClickResend}
          disabled={loadingConfirm}
        >
          {t('Signup.Confirmation.Page.resend.message')}
        </button>
      </div>
    </>
  )
}

export default SignupConfirmationPage
