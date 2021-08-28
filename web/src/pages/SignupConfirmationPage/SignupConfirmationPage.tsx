import { useCallback, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useRecoilValue } from 'recoil'
import { useAuth } from '@redwoodjs/auth'
import { Form, Label, FieldError, Submit, TextField } from '@redwoodjs/forms'
import { navigate, routes } from '@redwoodjs/router'
import { Helmet, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { SignupDataAtom } from 'src/atoms/SignupData'

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

const SignupConfirmationPage = () => {
  const { t } = useTranslation()

  const signupData = useRecoilValue(SignupDataAtom)

  const { logIn } = useAuth()

  const codeRef = useRef<HTMLElement>()
  useEffect(() => {
    codeRef.current && codeRef.current.focus()
  }, [])

  // ==

  const onCompleted = useCallback(
    async (data: SignupConfirmationMutationResult) => {
      toast.dismiss()

      if (data.confirmed && signupData) {
        toast.success(t('Signup.Confirmation.Page.success'))

        const { username, password } = signupData

        await logIn({ username, password })

        navigate(routes.signupOrganization())
      } else {
        toast.error(t('Signup.Confirmation.Page.failure'))
      }
    },
    [logIn, signupData, t]
  )
  const onError = useCallback(
    (error: Error) => {
      toast.dismiss()
      console.log(error)
      toast.error(
        t(`Signup.Confirmation.Page.errors.${error.message}`, error.message)
      )
    },
    [t]
  )

  const [mutate, { loading }] = useMutation(MUTATION, {
    onCompleted,
    onError,
  })

  const onSubmit = useCallback(
    ({ code }: SignupConfirmationFormData) => {
      if (loading) return

      toast.loading(t('Signup.Confirmation.Page.loading'))

      const email = signupData.username
      mutate({ variables: { code, email } })
    },
    [loading, mutate, signupData, t]
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
        {!signupData && (
          <div className="space-y-3">
            <p className="text">
              {t('Signup.Confirmation.Page.emailNotFound')}
            </p>
            <p className="text">
              {t('Signup.Confirmation.Page.emailNotFoundSteps')}
            </p>
          </div>
        )}
        {signupData && (
          <>
            <div className="space-y-3">
              <p className="text">
                {t(
                  `Signup.Confirmation.Page.${
                    signupData.username ? 'codeEmail' : 'codeSent'
                  }`,
                  {
                    email: signupData.username,
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
