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
import { toast } from '@redwoodjs/web/toast'
import RoleBadge from 'src/components/Role/RoleBadge'

import { QUERY } from 'src/components/Role/RoleDetailCell'

import { useErrorTranslation } from 'src/hooks/useErrorTranslation'

import type { RoleDetailQuery } from 'types/graphql'

export const MUTATION = gql`
  mutation RoleUpdateMutation($id: ID!, $color: String, $name: String) {
    role: updateRole(id: $id, color: $color, name: $name) {
      name
    }
  }
`

export type RoleUpdateFormData = {
  color: string
  name: string
}

export interface RoleUpdateCardProps {
  role: RoleDetailQuery['role']
}

const RoleUpdateCard = ({ role: { color, id, name } }: RoleUpdateCardProps) => {
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
        loading: t('Role.Update.Card.update.loading'),
        success: ({ data: { role } }) =>
          t('Role.Update.Card.update.success', role),
        error: (err: Error) => et(err),
      })
    },
    [dirtyFields, et, id, loading, mutate, reset, t]
  )

  return (
    <div className="card body">
      <div className="space-y-1">
        <h2 className="text title">{t('Role.Update.Card.title', { name })}</h2>
        <p className="muted hint">{t('Role.Update.Card.subtitle', { name })}</p>
      </div>
      <Form className="form" formMethods={formMethods} onSubmit={onSubmit}>
        <div className="input-group floating">
          <TextField
            autoComplete="organization-title"
            className="input"
            errorClassName="input input-error"
            name="name"
            placeholder={t('Role.Update.Card.form.name.placeholder')}
            validation={{
              required: {
                value: true,
                message: t('Role.Update.Card.form.name.required'),
              },
            }}
          />
          <Label className="input-label" name="name">
            {t('Role.Update.Card.form.name.label')}
          </Label>
          <FieldError className="input-error" name="name" />
        </div>
        <div className="input-group">
          <Label className="input-label" name="color">
            {t('Role.Update.Card.form.color.label')}
          </Label>
          <ColorField
            className="input"
            name="color"
            validation={{
              required: {
                value: true,
                message: t('Role.Update.Card.form.color.required'),
              },
            }}
          />
          <Label className="input-hint" errorClassName="hidden" name="color">
            {t('Role.Update.Card.form.color.hint')}
          </Label>
          <FieldError className="input-error" name="color" />
          <div className="flex flex-col md:flex-row items-center mt-6 self-center space-x-0 md:space-x-12 space-y-4 md:space-y-0">
            <div className="bg-white px-6 py-4 rounded-md">
              <RoleBadge color={currentColor} name={currentName} />
            </div>
            <div className="dark bg-gray-800 px-6 py-4 rounded-md">
              <RoleBadge color={currentColor} name={currentName} />
            </div>
          </div>
        </div>
        <Submit
          className="btn btn-primary form-button"
          disabled={loading || !isDirty}
        >
          {t('Role.Update.Card.form.submit')}
        </Submit>
      </Form>
    </div>
  )
}

export default RoleUpdateCard
