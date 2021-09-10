import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useMutation } from '@apollo/client'
import { useAuth } from '@redwoodjs/auth'
import { FieldError, Form, Label, Submit, TextField } from '@redwoodjs/forms'
import { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import FailureCard from 'src/components/Card/FailureCard'
import LoadingCard from 'src/components/Card/LoadingCard'
import OrganizationSettingsDangerCard from 'src/components/Organization/OrganizationSettingsDangerCard'

import type {
  OrganizationUpdateQuery,
  OrganizationUpdateMutation,
} from 'types/graphql'
import { useErrorTranslation } from 'src/hooks/useErrorTranslation'

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

export const Loading = () => {
  const { t } = useTranslation()

  return (
    <LoadingCard>
      <p className="text">{t('Organization.Update.Cell.Loading')}</p>
    </LoadingCard>
  )
}

export const Failure = ({ error }: CellFailureProps) => {
  const { et } = useErrorTranslation()

  return (
    <FailureCard>
      <p className="text">{et(error)}</p>
    </FailureCard>
  )
}

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
  const { et } = useErrorTranslation()

  const { reauthenticate } = useAuth()

  const onCompleted = useCallback(
    async ({ name }) => {
      await reauthenticate()
      reset({ name })

      toast.dismiss()
      toast.success(t('Organization.Update.Cell.Success.update.success'))
    },
    [reauthenticate, reset, t]
  )
  const onError = useCallback(
    (err: Error) => {
      toast.dismiss()
      toast.error(et(err))
    },
    [et]
  )
  const [mutate, { loading }] = useMutation<OrganizationUpdateMutation>(
    MUTATION,
    {
      onCompleted,
      onError,
      refetchQueries: [{ query: QUERY }],
    }
  )

  const onSubmit = useCallback(
    (variables: OrganizationUpdateFormData) => {
      if (loading) return

      mutate({ variables })
    },
    [loading, mutate]
  )

  return (
    <div className="page-layout">
      <div className="card body">
        <header className="space-y-1">
          <h2 className="text title">
            {t('Organization.Update.Cell.Success.title')}
          </h2>
          <p className="muted hint">
            {t('Organization.Update.Cell.Success.subtitle')}
          </p>
        </header>
        <Form className="form" formMethods={formMethods} onSubmit={onSubmit}>
          <div className="input-group floating">
            <TextField
              autoComplete="organization"
              className="input"
              defaultValue={organization.name}
              errorClassName="input input-error"
              name="name"
              placeholder={t(
                'Organization.Update.Cell.Success.form.name.placeholder'
              )}
              validation={{
                required: {
                  value: true,
                  message: t(
                    'Organization.Update.Cell.Success.form.name.required'
                  ),
                },
              }}
            />
            <Label className="input-label" name="name">
              {t('Organization.Update.Cell.Success.form.name.label')}
            </Label>
            <FieldError className="input-error" name="name" />
          </div>
          <Submit
            className="btn btn-primary form-button"
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
