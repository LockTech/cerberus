import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation } from '@apollo/client'
import { FieldError, Form, Label, Submit, TextField } from '@redwoodjs/forms'
import { toast } from '@redwoodjs/web/toast'

import Modal from 'src/components/Modal'
import { QUERY } from 'src/components/Role/RoleListCell'

import { useErrorTranslation } from 'src/hooks/useErrorTranslation'
import { navigate, routes } from '@redwoodjs/router'

export const MUTATION = gql`
  mutation RoleCreateMutation($name: String!) {
    role: createRole(name: $name) {
      id
    }
  }
`

export interface RoleCreateMutationResult {
  role: { id: string }
}

export interface RoleCreateFormData {
  name: string
}

const RoleCreateModal = () => {
  const [open, setOpen] = useState(false)

  const { t } = useTranslation()
  const { et } = useErrorTranslation()

  const [mutate, { loading }] = useMutation<RoleCreateMutationResult>(
    MUTATION,
    { refetchQueries: [{ query: QUERY }] }
  )

  const onSubmit = useCallback(
    (variables: RoleCreateFormData) => {
      if (loading) return

      toast.promise(mutate({ variables }), {
        loading: t('Role.Create.Modal.create.loading'),
        success: ({
          data: {
            role: { id },
          },
        }) => {
          navigate(routes.role({ id }))
          return t('Role.Create.Modal.create.success')
        },
        error: (err: Error) => et(err),
      })
    },
    [et, loading, mutate, t]
  )

  return (
    <>
      <button className="btn btn-primary w-full" onClick={() => setOpen(true)}>
        {t('Role.Create.Modal.createRole')}
      </button>
      <Modal onClose={setOpen} open={open}>
        <div className="card body">
          <div className="space-y-1">
            <Modal.Title>{t('Role.Create.Modal.title')}</Modal.Title>
            <Modal.Description>
              {t('Role.Create.Modal.subtitle')}
            </Modal.Description>
          </div>
          <Form className="form" onSubmit={onSubmit}>
            <div className="input-group floating">
              <TextField
                autoComplete="organization-title"
                className="input"
                errorClassName="input input-error"
                name="name"
                placeholder={t('Role.Create.Modal.form.name.placeholder')}
                validation={{
                  required: {
                    value: true,
                    message: t('Role.Create.Modal.form.name.required'),
                  },
                }}
              />
              <Label className="input-label" name="name">
                {t('Role.Create.Modal.form.name.label')}
              </Label>
              <FieldError className="input-error-label" name="name" />
            </div>
            <div className="form-button space-x-4">
              <Submit className="btn btn-primary" disabled={loading}>
                {t('Role.Create.Modal.form.submit')}
              </Submit>
              <button
                className="btn btn-red-ghost"
                onClick={() => setOpen(false)}
                type="button"
              >
                {t('Role.Create.Modal.form.cancel')}
              </button>
            </div>
          </Form>
        </div>
      </Modal>
    </>
  )
}

export default RoleCreateModal
