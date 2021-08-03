import { useTranslation } from 'react-i18next'
import { useMutation } from '@apollo/client'
import { FieldError, Form, Label, Submit, TextField } from '@redwoodjs/forms'
import { toast } from '@redwoodjs/web/toast'

import Modal from 'src/components/Modal'
import { useCallback } from 'react'
import { QUERY } from 'src/hooks/useCurrentAccount'

export const MUTATION = gql`
  mutation CreateOrganizationMutation($name: String!) {
    organization: createOrganization(name: $name) {
      __typename
    }
  }
`

export interface CreateOrganizationFormData {
  name: string
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
  const onError = useCallback((error: Error) => {
    toast.dismiss()
    toast.error(error.message)
  }, [])

  const [mutate, { called, loading }] = useMutation(MUTATION, {
    onCompleted,
    onError,
    refetchQueries: [{ query: QUERY }],
  })

  const onSubmit = useCallback(
    (data: CreateOrganizationFormData) => {
      if (!called) {
        mutate({ variables: data })
        toast.loading(t('Organization.Create.Modal.loading'))
      }
    },
    [called, mutate, t]
  )

  return (
    <Modal open={open} onClose={() => 0}>
      <div className="card card-body">
        <div className="title-group">
          <Modal.Title>{t('Organization.Create.Modal.title')}</Modal.Title>
          <Modal.Description>
            {t('Organization.Create.Modal.subtitle')}
          </Modal.Description>
        </div>
        <Form className="form" onSubmit={onSubmit}>
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
              className="input-primary w-full"
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
          <Submit
            disabled={called || loading}
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