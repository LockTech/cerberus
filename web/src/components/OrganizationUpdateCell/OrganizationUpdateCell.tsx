import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useMutation } from '@apollo/client'
import { FieldError, Form, Label, Submit, TextField } from '@redwoodjs/forms'
import { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import OrganizationSettingsDangerCard from 'src/components/OrganizationSettingsDangerCard'

import { QUERY as CurrentAccountQuery } from 'src/hooks/useCurrentAccount'

import type {
  OrganizationUpdateQuery,
  OrganizationUpdateMutation,
} from 'types/graphql'

export const MUTATION = gql`
  mutation OrganizationUpdateMutation($name: String!) {
    organization: updateOrganization(name: $name) {
      name
    }
  }
`

export const QUERY = gql`
  query OrganizationUpdateQuery {
    organization {
      name
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

interface OrganizationUpdateFormData {
  name: string
}
export const Success = ({
  organization,
}: CellSuccessProps<OrganizationUpdateQuery>) => {
  const formMethods = useForm<OrganizationUpdateFormData>({
    defaultValues: {
      name: organization.name,
    },
    mode: 'onSubmit',
  })
  const { reset } = formMethods
  const { isDirty } = formMethods.formState

  const { t } = useTranslation()

  const onCompleted = useCallback(
    (data: OrganizationUpdateMutation) => {
      toast.dismiss()
      toast.success(t('Organization.Update.Cell.Success.success'))

      const name = data.organization.name
      reset({ name })
    },
    [reset, t]
  )
  const onError = useCallback(
    (error: Error) => {
      toast.dismiss()
      toast.error(
        t(
          `Organization.Update.Cell.Success.errors.${error.message}`,
          error.message
        )
      )
    },
    [t]
  )

  const [mutate, { loading }] = useMutation(MUTATION, {
    onCompleted,
    onError,
    refetchQueries: [{ query: QUERY }, { query: CurrentAccountQuery }],
  })

  const onSubmit = useCallback(
    (variables: OrganizationUpdateFormData) => {
      if (loading) return

      toast.loading(t('Organization.Update.Cell.Success.loading'))

      mutate({ variables })
    },
    [loading, mutate, t]
  )

  return (
    <div className="page-layout">
      <div className="card card-body">
        <header className="title-group">
          <h2 className="title">
            {t('Organization.Update.Cell.Success.title')}
          </h2>
          <p className="hint">
            {t('Organization.Update.Cell.Success.subtitle')}
          </p>
        </header>
        <Form className="form" formMethods={formMethods} onSubmit={onSubmit}>
          <div className="input-group">
            <Label
              className="input-label"
              errorClassName="input-label-error"
              name="name"
            >
              {t('Organization.Update.Cell.Success.form.name.label')}
            </Label>
            <TextField
              autoComplete="organization"
              className="input-primary"
              defaultValue={organization.name}
              errorClassName="input-error"
              name="name"
              validation={{
                required: {
                  value: true,
                  message: t(
                    'Organization.Update.Cell.Success.form.name.required'
                  ),
                },
              }}
            />
            <FieldError className="input-field-error" name="name" />
          </div>
          <Submit
            className="button-primary-fill form-button"
            disabled={!isDirty || loading}
          >
            {t('Organization.Update.Cell.Success.form.submit')}
          </Submit>
        </Form>
      </div>
      <OrganizationSettingsDangerCard />
    </div>
  )
}
