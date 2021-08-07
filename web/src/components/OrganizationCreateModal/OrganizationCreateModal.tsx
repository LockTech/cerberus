import { useTranslation } from 'react-i18next'
import { useMutation } from '@apollo/client'
import { FieldError, Form, Label, Submit, TextField } from '@redwoodjs/forms'
import { toast } from '@redwoodjs/web/toast'

import Modal from 'src/components/Modal'
import { useCallback } from 'react'
import { QUERY } from 'src/hooks/useCurrentAccount'

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

export interface OrganizationCreateModal {
  open: boolean
}

const OrganizationCreateModal = ({ open }: OrganizationCreateModal) => {
  const { t } = useTranslation()

  const onCompleted = useCallback(
    (result: CreateOrganizationMutationResult) => {
      console.log(result)
      toast.dismiss()
      toast.success(t('Organization.Create.Modal.success'))
    },
    [t]
  )
  const onError = useCallback(
    (error: Error) => {
      toast.dismiss()
      toast.error(
        t(`Organization.Create.Modal.errors.${error.message}`, error.message)
      )
    },
    [t]
  )

  const [mutate, { loading }] = useMutation(MUTATION, {
    onCompleted,
    onError,
    refetchQueries: [{ query: QUERY }],
  })

  const onSubmit = useCallback(
    (variables: CreateOrganizationFormData) => {
      if (!loading) {
        mutate({ variables })
        toast.loading(t('Organization.Create.Modal.loading'))
      }
    },
    [loading, mutate, t]
  )

  return (
    <Modal open={open} onClose={() => 0}>
      <div className="card card-body">
        <header className="title-group">
          <Modal.Title>{t('Organization.Create.Modal.title')}</Modal.Title>
          <Modal.Description>
            {t('Organization.Create.Modal.subtitle')}
          </Modal.Description>
        </header>
        <Form className="form" onSubmit={onSubmit}>
          {/* name */}
          <div className="input-group">
            <Label
              className="input-label"
              errorClassName="input-label-error"
              name="name"
            >
              {t('Organization.Create.Modal.form.name.label')}
            </Label>
            <TextField
              autoComplete="organization"
              className="input-primary"
              errorClassName="input-error"
              name="name"
              validation={{
                required: {
                  value: true,
                  message: t('Organization.Create.Modal.form.name.required'),
                },
              }}
            />
            <FieldError className="input-field-error" name="name" />
            <Label className="hint" errorClassName="hidden" name="name">
              {t('Organization.Create.Modal.form.name.hint')}
            </Label>
          </div>
          {/* adminRoleName */}
          <div className="input-group">
            <Label
              className="input-label"
              errorClassName="input-label-error"
              name="adminRoleName"
            >
              {t('Organization.Create.Modal.form.adminRoleName.label')}
            </Label>
            <TextField
              autoComplete="organization"
              className="input-primary"
              errorClassName="input-error"
              name="adminRoleName"
              validation={{
                required: {
                  value: true,
                  message: t(
                    'Organization.Create.Modal.form.adminRoleName.required'
                  ),
                },
              }}
            />
            <FieldError className="input-field-error" name="adminRoleName" />
            <Label
              className="hint"
              errorClassName="hidden"
              name="adminRoleName"
            >
              {t('Organization.Create.Modal.form.adminRoleName.hint')}
            </Label>
          </div>
          <Submit
            disabled={loading}
            className="button-primary-fill form-button"
          >
            {t('Organization.Create.Modal.form.submit')}
          </Submit>
        </Form>
      </div>
    </Modal>
  )
}

export default OrganizationCreateModal
