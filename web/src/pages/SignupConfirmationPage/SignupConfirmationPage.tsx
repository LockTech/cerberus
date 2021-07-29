import { useCallback, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Form, Label, FieldError, Submit, TextField } from '@redwoodjs/forms'
import { Helmet } from '@redwoodjs/web'

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

  const onSubmit = useCallback((data: SignupConfirmationFormData) => {}, [])

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
                <FieldError className="input-error-message" name="code" />
              </div>
              {/* Submit */}
              <Submit className="block button-primary-fill">
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
