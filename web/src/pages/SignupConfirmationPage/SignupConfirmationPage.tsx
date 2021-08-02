import { useCallback, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation } from '@apollo/client'
import { Form, Label, FieldError, Submit, TextField } from '@redwoodjs/forms'
import { Helmet } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'

export const MUTATION = gql`
  mutation SignupConfirmationMutation($code: String!, $email: String!) {
    confirmed: confirmSignup(code: $code, email: $email)
  }
`

interface SignupConfirmationMutationResult {
  confirmed: boolean
}

interface SignupConfirmationFormData {
  code: string
}

export interface SignupConfirmationPageProps {
  email?: string
}

const SignupConfirmationPage = ({ email }: SignupConfirmationPageProps) => {
  const { t } = useTranslation()

  const codeRef = useRef<HTMLElement>()
  useEffect(() => {
    codeRef.current && codeRef.current.focus()
  }, [])

  // ==

  const onCompleted = useCallback(
    (data: SignupConfirmationMutationResult) => {
      toast.dismiss()

      if (data.confirmed) {
        toast(t('Signup.Confirmation.Page.login'))
        toast.success(t('Signup.Confirmation.Page.success'))
        navigate(routes.login())
      } else {
        toast.error(t('Signup.Confirmation.Page.failure'))
      }
    },
    [t]
  )
  const onError = useCallback(
    (error: Error) => {
      toast.dismiss()
      toast.error(t(`Signup.Confirmation.Page.Errors.${error.message}`))
    },
    [t]
  )

  const [mutate, { loading }] = useMutation(MUTATION, {
    onCompleted,
    onError,
  })

  const onSubmit = useCallback(
    (data: SignupConfirmationFormData) => {
      if (loading) return

      toast.loading(t('Signup.Confirmation.Page.loading'))

      const code = data.code

      mutate({ variables: { code, email } })
    },
    [email, loading, mutate, t]
  )

  return (
    <>
      <Helmet>
        <title>{t('Signup.Confirmation.Page.Helmet.title')}</title>
      </Helmet>
      <div className="auth-card">
        <header className="title-group">
          <h1 className="title">{t('Signup.Confirmation.Page.title')}</h1>
        </header>
        {!email && (
          <div className="space-y-3">
            <p className="text">
              {t('Signup.Confirmation.Page.emailNotFound')}
            </p>
            <p className="text">
              {t('Signup.Confirmation.Page.emailNotFoundSteps')}
            </p>
          </div>
        )}
        {email && (
          <>
            <div className="space-y-3">
              <p className="text">
                {t(
                  `Signup.Confirmation.Page.${
                    email ? 'codeEmail' : 'codeSent'
                  }`,
                  {
                    email,
                  }
                )}
              </p>
              <p className="text">{t('Signup.Confirmation.Page.codeUse')}</p>
            </div>
            <Form className="form" onSubmit={onSubmit}>
              {/* Code */}
              <div className="input-group">
                <Label
                  className="input-label"
                  errorClassName="input-label-error"
                  name="code"
                >
                  {t('Signup.Confirmation.Page.form.code.label')}
                </Label>
                <TextField
                  autoComplete="one-time-code"
                  className="input-primary"
                  errorClassName="input-error"
                  name="code"
                  placeholder={t(
                    'Signup.Confirmation.Page.form.code.placeholder'
                  )}
                  ref={codeRef}
                  validation={{
                    required: {
                      value: true,
                      message: t('Signup.Confirmation.Page.form.code.required'),
                    },
                  }}
                />
                <FieldError className="input-field-error" name="code" />
              </div>
              {/* Submit */}
              <Submit className="button-primary-fill w-full" disabled={loading}>
                {t('Signup.Confirmation.Page.form.submit')}
              </Submit>
            </Form>
          </>
        )}
      </div>
    </>
  )
}

export default SignupConfirmationPage
