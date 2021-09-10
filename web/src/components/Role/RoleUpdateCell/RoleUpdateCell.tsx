import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useMutation } from '@apollo/client'
import {
  ColorField,
  FieldError,
  Form,
  Label,
  Submit,
  TextField,
} from '@redwoodjs/forms'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import FailureCard from 'src/components/Card/FailureCard'
import LoadingCard from 'src/components/Card/LoadingCard'
import RoleBadge from 'src/components/Role/RoleBadge'

import { useErrorTranslation } from 'src/hooks/useErrorTranslation'

import type { RoleUpdateQuery } from 'types/graphql'
import RoleDangerCard from '../RoleDangerCard/RoleDangerCard'

export const QUERY = gql`
  query RoleUpdateQuery($id: ID!) {
    role(id: $id) {
      color
      id
      name
    }
  }
`

export const MUTATION = gql`
  mutation RoleUpdateMutation($id: ID!, $color: String, $name: String) {
    role: updateRole(id: $id, color: $color, name: $name) {
      name
    }
  }
`

export const Loading = () => {
  const { t } = useTranslation()

  return (
    <LoadingCard>
      <p className="text">{t('Role.Update.Cell.Loading')}</p>
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

export type RoleUpdateFormData = {
  color: string
  name: string
}

export const Success = ({
  role: { color, id, name },
}: CellSuccessProps<RoleUpdateQuery>) => {
  const formMethods = useForm<RoleUpdateFormData>({
    mode: 'onSubmit',
    defaultValues: {
      color,
      name,
    },
  })
  const {
    reset,
    formState: { dirtyFields, isDirty },
  } = formMethods

  const { t } = useTranslation()
  const { et } = useErrorTranslation()

  const { color: currentColor, name: currentName } = formMethods.watch()

  const [mutate, { loading }] = useMutation(MUTATION, {
    refetchQueries: [{ query: QUERY, variables: { id } }],
  })

  const onSubmit = useCallback(
    (data: RoleUpdateFormData) => {
      if (loading) return

      const variables = { id }
      Object.keys(dirtyFields).forEach((val) => {
        variables[val] = data[val]
      })

      reset(data)

      toast.promise(mutate({ variables }), {
        loading: t('Role.Update.Cell.Success.update.loading'),
        success: ({ data: { role } }) =>
          t('Role.Update.Cell.Success.update.success', role),
        error: (err: Error) => et(err),
      })
    },
    [dirtyFields, et, id, loading, mutate, reset, t]
  )

  return (
    <div className="page-layout">
      <div className="card body">
        <div className="space-y-1">
          <h2 className="text title">
            {t('Role.Update.Cell.Success.title', { name })}
          </h2>
          <p className="muted hint">
            {t('Role.Update.Cell.Success.subtitle', { name })}
          </p>
        </div>
        <Form className="form" formMethods={formMethods} onSubmit={onSubmit}>
          <div className="input-group floating">
            <TextField
              autoComplete="organization-title"
              className="input"
              errorClassName="input input-error"
              name="name"
              placeholder={t('Role.Update.Cell.Success.form.name.placeholder')}
              validation={{
                required: {
                  value: true,
                  message: t('Role.Update.Cell.Success.form.name.required'),
                },
              }}
            />
            <Label className="input-label" name="name">
              {t('Role.Update.Cell.Success.form.name.label')}
            </Label>
            <FieldError className="input-error" name="name" />
          </div>
          <div className="input-group">
            <Label className="input-label" name="color">
              {t('Role.Update.Cell.Success.form.color.label')}
            </Label>
            <ColorField
              className="input"
              name="color"
              validation={{
                required: {
                  value: true,
                  message: t('Role.Update.Cell.Success.form.color.required'),
                },
              }}
            />
            <Label className="input-hint" errorClassName="hidden" name="color">
              {t('Role.Update.Cell.Success.form.color.hint')}
            </Label>
            <FieldError className="input-error" name="color" />
          </div>
          <div className="input-group">
            <p className="input-label">
              {t('Role.Update.Cell.Success.form.color.preview')}
            </p>
            <div className="flex flex-row self-center space-x-12">
              <div className="bg-white px-6 py-4 rounded-md">
                <RoleBadge
                  className="self-center"
                  color={currentColor}
                  name={currentName}
                />
              </div>
              <div className="dark bg-gray-800 px-6 py-4 rounded-md">
                <RoleBadge
                  className="self-center"
                  color={currentColor}
                  name={currentName}
                />
              </div>
            </div>
          </div>
          <Submit
            className="btn btn-primary form-button"
            disabled={loading || !isDirty}
          >
            {t('Role.Update.Cell.Success.form.submit')}
          </Submit>
        </Form>
      </div>
      <RoleDangerCard id={id} name={name} />
    </div>
  )
}
