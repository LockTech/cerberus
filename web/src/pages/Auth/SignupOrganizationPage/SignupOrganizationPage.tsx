import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation } from '@apollo/client'
import { FieldError, Form, Label, Submit, TextField } from '@redwoodjs/forms'
import { MetaTags } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { useErrorTranslation } from 'src/hooks/useErrorTranslation'

const MUTATION = gql`
  mutation SignupCreateOrganizationMutation(
    $name: String!
    $adminRoleName: String!
  ) {
    organization: createOrganization(
      name: $name
      adminRoleName: $adminRoleName
    ) {
      __typename
    }
  }
`

export interface SignupOrganizationFormData {
  name: string
  adminRoleName: string
}

export type SignupOrganizationPageProps = {
  redirectTo?: string
}

const SignupOrganizationPage = ({
  redirectTo = '/',
}: SignupOrganizationPageProps) => {
  const { t } = useTranslation()
  const { et } = useErrorTranslation()

  const [mutate, { loading }] = useMutation(MUTATION)

  const onSubmit = useCallback(
    (variables: SignupOrganizationFormData) => {
      if (loading) return

      toast.promise(mutate({ variables }), {
        loading: t('Signup.Organization.Page.create.loading'),
        success: () => {
          window.location.href = redirectTo
          return t('Signup.Organization.Page.create.success')
        },
        error: (err: Error) => et(err),
      })
    },
    [et, loading, mutate, redirectTo, t]
  )

  return (
    <>
      <MetaTags title={t('Signup.Organization.Page.Meta.title')} />
      <div className="card body min-w-[26rem]">
        <div>
          <h1 className="text title">{t('Signup.Organization.Page.title')}</h1>
          <p className="muted hint">{t('Signup.Organization.Page.subtitle')}</p>
        </div>
        <Form className="space-y-6" onSubmit={onSubmit}>
          <div className="input-group floating">
            <TextField
              autoComplete="organization"
              className="input"
              errorClassName="input input-error"
              name="name"
              placeholder={t('Signup.Organization.Page.form.name.placeholder')}
              validation={{
                required: {
                  value: true,
                  message: t('Signup.Organization.Page.form.name.required'),
                },
              }}
            />
            <Label className="input-label" name="name">
              {t('Signup.Organization.Page.form.name.label')}
            </Label>
            <FieldError className="input-error-label" name="name" />
          </div>
          <div className="input-group floating">
            <TextField
              autoComplete="organization-title"
              className="input"
              errorClassName="input input-error"
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
            <Label className="input-label" name="adminRoleName">
              {t('Signup.Organization.Page.form.adminRoleName.label')}
            </Label>
            <Label
              className="input-hint"
              errorClassName="hidden"
              name="adminRoleName"
            >
              {t('Signup.Organization.Page.form.adminRoleName.hint')}
            </Label>
            <FieldError className="input-error-label" name="adminRoleName" />
          </div>
          <Submit className="btn-fill-primary w-full" disabled={loading}>
            {t('Signup.Organization.Page.form.submit')}
          </Submit>
        </Form>
      </div>
    </>
  )
}

export default SignupOrganizationPage
