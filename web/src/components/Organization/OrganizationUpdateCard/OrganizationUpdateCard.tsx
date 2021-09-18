import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useMutation } from '@apollo/client'
import { useAuth } from '@redwoodjs/auth'
import { FieldError, Form, Label, Submit, TextField } from '@redwoodjs/forms'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Organization/OrganizationDetailCell'

import { useErrorTranslation } from 'src/hooks/useErrorTranslation'

import type { OrganizationDetailQuery } from 'types/graphql'

export const MUTATION = gql`
  mutation OrganizationUpdateMutation($name: String!) {
    organization: updateOrganization(name: $name) {
      name
    }
  }
`

export interface OrganizationUpdateFormData {
  name: string
}

export type OrganizationUpdateCardProps = {
  organization: OrganizationDetailQuery['organization']
}

const OrganizationUpdateCard = ({
  organization: { name },
}: OrganizationUpdateCardProps) => {
  const formMethods = useForm<OrganizationUpdateFormData>({
    defaultValues: { name },
    mode: 'onSubmit',
  })
  const { reset } = formMethods
  const { isDirty } = formMethods.formState

  const { t } = useTranslation()
  const { et } = useErrorTranslation()

  const { reauthenticate } = useAuth()

  const [mutate, { loading }] = useMutation(MUTATION, {
    refetchQueries: [{ query: QUERY }],
  })

  const onSubmit = useCallback(
    (variables: OrganizationUpdateFormData) => {
      if (loading) return

      reset(variables)

      reauthenticate()

      toast.promise(mutate({ variables }), {
        loading: t('Organization.Update.Card.update.loading'),
        success: t('Organization.Update.Card.update.success'),
        error: (err) => et(err),
      })
    },
    [et, loading, mutate, t, reauthenticate, reset]
  )

  return (
    <div className="card body">
      <header className="space-y-1">
        <h2 className="text title">{t('Organization.Update.Card.title')}</h2>
        <p className="muted hint">{t('Organization.Update.Card.subtitle')}</p>
      </header>
      <Form className="form" formMethods={formMethods} onSubmit={onSubmit}>
        <div className="input-group floating">
          <TextField
            autoComplete="organization"
            className="input"
            defaultValue={name}
            errorClassName="input input-error"
            name="name"
            placeholder={t('Organization.Update.Card.form.name.placeholder')}
            validation={{
              required: {
                value: true,
                message: t('Organization.Update.Card.form.name.required'),
              },
            }}
          />
          <Label className="input-label" name="name">
            {t('Organization.Update.Card.form.name.label')}
          </Label>
          <FieldError className="input-error-label" name="name" />
        </div>
        <Submit
          className="btn btn-primary form-button"
          disabled={!isDirty || loading}
        >
          {t('Organization.Update.Card.form.submit')}
        </Submit>
      </Form>
    </div>
  )
}

export default OrganizationUpdateCard
