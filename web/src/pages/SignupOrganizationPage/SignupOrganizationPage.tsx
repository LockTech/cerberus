import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation } from '@apollo/client'
import { useAuth } from '@redwoodjs/auth'
import { FieldError, Form, Label, Submit, TextField } from '@redwoodjs/forms'
import { navigate, routes } from '@redwoodjs/router'
import { Helmet } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { useCurrentAccount } from 'src/hooks/useCurrentAccount'
import { useRecoilValue } from 'recoil'
import { SignupDataAtom } from 'src/atoms/SignupData'

export const MUTATION = gql`
  mutation CreateOrganizationMutation($name: String!, $adminRoleName: String!) {
    organization: createOrganization(
      name: $name
      adminRoleName: $adminRoleName
    ) {
      __typename
    }
  }
`

export interface CreateOrganizationFormData {
  name: string
  adminRoleName: string
}
export interface CreateOrganizationMutationResult {
  organization: { __typename: string }
}

const SignupOrganizationPage = () => {
  const { t } = useTranslation()

  const { reauthenticate } = useAuth()

  const currentAccount = useCurrentAccount()

  const signupData = useRecoilValue(SignupDataAtom)

  const onCompleted = useCallback(
    async (_result: CreateOrganizationMutationResult) => {
      await reauthenticate()

      toast.dismiss()
      toast.success(t('Signup.Organization.Page.success'))

      if (signupData.redirect) {
        window.location.href = signupData.redirect
        toast(t('Signup.Organization.Page.redirect'))
      }

      navigate(routes.home())
    },
    [reauthenticate, signupData, t]
  )
  const onError = useCallback(
    (error: Error) => {
      toast.dismiss()
      toast.error(
        t(`Signup.Organization.Page.errors.${error.message}`, error.message)
      )
      navigate(routes.signup())
    },
    [t]
  )

  const [mutate, { loading }] = useMutation(MUTATION, {
    onCompleted,
    onError,
  })

  const onSubmit = useCallback(
    (variables: CreateOrganizationFormData) => {
      if (!loading) {
        mutate({ variables })
        toast.loading(t('Signup.Organization.Page.loading'))
      }
    },
    [loading, mutate, t]
  )

  if (!currentAccount || currentAccount.organization !== null)
    navigate(routes.home())

  return (
    <>
      <Helmet>
        <title>{t('Signup.Organization.Page.Helmet.title')}</title>
      </Helmet>
      <div className="auth-card">
        <header className="title-group">
          <h1 className="title">{t('Signup.Organization.Page.title')}</h1>
          <p className="hint">{t('Signup.Organization.Page.subtitle')}</p>
        </header>
        <Form className="form" onSubmit={onSubmit}>
          {/* name */}
          <div className="input-group">
            <Label
              className="input-label"
              errorClassName="input-label-error"
              name="name"
            >
              {t('Signup.Organization.Page.form.name.label')}
            </Label>
            <TextField
              autoComplete="organization"
              className="input-primary"
              errorClassName="input-error"
              name="name"
              placeholder={t('Signup.Organization.Page.form.name.placeholder')}
              validation={{
                required: {
                  value: true,
                  message: t('Signup.Organization.Page.form.name.required'),
                },
              }}
            />
            <FieldError className="input-field-error" name="name" />
          </div>
          {/* adminRoleName */}
          <div className="input-group">
            <Label
              className="input-label"
              errorClassName="input-label-error"
              name="adminRoleName"
            >
              {t('Signup.Organization.Page.form.adminRoleName.label')}
            </Label>
            <TextField
              className="input-primary"
              errorClassName="input-error"
              name="adminRoleName"
              placeholder={t(
                'Signup.Organization.Page.form.adminRoleName.placeholder'
              )}
              validation={{
                required: {
                  value: true,
                  message: t(
                    'Signup.Organization.Page.form.adminRoleName.required'
                  ),
                },
              }}
            />
            <FieldError className="input-field-error" name="adminRoleName" />
          </div>
          <Submit disabled={loading} className="button-primary-fill w-full">
            {t('Signup.Organization.Page.form.submit')}
          </Submit>
        </Form>
      </div>
    </>
  )
}

export default SignupOrganizationPage
