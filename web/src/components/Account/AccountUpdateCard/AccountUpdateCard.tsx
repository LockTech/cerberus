import clsx from 'clsx'
import { useCallback } from 'react'
import { useController, useForm } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import { Switch } from '@headlessui/react'
import { FieldError, Form, Label, TextField, Submit } from '@redwoodjs/forms'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Account/AccountDetailCell'

import { useAuth } from 'src/hooks/useAuth'
import { useTranslation } from 'react-i18next'
import { useErrorTranslation } from 'src/hooks/useErrorTranslation'

import type { AccountDetailQuery } from 'types/graphql'

export const MUTATION = gql`
  mutation AccountUpdateMutation(
    $id: ID!
    $disabled: Boolean
    $email: String
    $name: String
  ) {
    account: updateAccount(
      id: $id
      disabled: $disabled
      email: $email
      name: $name
    ) {
      disabled
      email
      name
    }
  }
`

interface UpdateAccountFormData {
  disabled: boolean
  email: string
  name: string
}

export type AccountUpdateCardProps = {
  account: AccountDetailQuery['account']
}

const AccountUpdateCard = ({
  account: { disabled, email, id, name },
}: AccountUpdateCardProps) => {
  const formMethods = useForm({
    mode: 'onSubmit',
    defaultValues: {
      disabled,
      email,
      name,
    },
  })
  const { control, reset } = formMethods
  const { dirtyFields, isDirty } = formMethods.formState

  const {
    field: { onChange: onChangeDisabled, value: disabledValue },
  } = useController({ control, name: 'disabled' })

  const { t } = useTranslation()
  const { et } = useErrorTranslation()

  const [mutate, { loading }] = useMutation(MUTATION, {
    refetchQueries: [{ query: QUERY, variables: { id } }],
  })

  const { currentUser, reauthenticate } = useAuth()

  const onSubmit = useCallback(
    async (data: UpdateAccountFormData) => {
      if (loading) return

      const variables = { id }
      Object.keys(dirtyFields).forEach((val) => {
        variables[val] = data[val]
      })

      reset(data)

      toast.promise(mutate({ variables }), {
        loading: t('Account.Update.Card.update.loading'),
        success: ({ data: { account } }) => {
          if (id === currentUser.id) {
            reauthenticate()
          }

          return t('Account.Update.Card.update.success', account)
        },
        error: (err: Error) => et(err),
      })
    },
    [
      currentUser,
      dirtyFields,
      et,
      id,
      loading,
      mutate,
      reauthenticate,
      reset,
      t,
    ]
  )

  return (
    <div className="card body">
      <header className="space-y-1">
        <h2 className="text title">
          {t('Account.Update.Card.title', { name })}
        </h2>
        <p className="muted hint">{t('Account.Update.Card.subtitle')}</p>
      </header>
      <Form className="form" formMethods={formMethods} onSubmit={onSubmit}>
        {/* email */}
        <div className="input-group floating">
          <TextField
            autoComplete="email"
            className="input"
            defaultValue={email}
            errorClassName="input input-error"
            name="email"
            validation={{
              required: {
                value: true,
                message: t('Account.Update.Card.form.email.required'),
              },
            }}
          />
          <Label className="input-label" name="email">
            {t('Account.Update.Card.form.email.label')}
          </Label>
          <FieldError className="input-error" name="email" />
        </div>
        {/* name */}
        <div className="input-group floating">
          <TextField
            autoComplete="name"
            className="input"
            defaultValue={name}
            errorClassName="input input-error"
            name="name"
            validation={{
              required: {
                value: true,
                message: t('Account.Update.Card.form.name.required'),
              },
            }}
          />
          <Label className="input-label" name="name">
            {t('Account.Update.Card.form.name.label')}
          </Label>
          <FieldError className="input-error" name="name" />
        </div>
        {/* disabled */}
        <Switch.Group as="div" className="input-group">
          <Switch.Label as={Label} className="input-label" name="disabled">
            {t('Account.Update.Card.form.disabled.label')}
          </Switch.Label>
          <Switch
            checked={disabledValue}
            className={clsx(
              'switch-track',
              disabledValue && 'switch-track-active'
            )}
            onChange={onChangeDisabled}
          >
            <span aria-disabled="true" className="switch-thumb" />
          </Switch>
          <Switch.Label as={Label} className="input-hint" name="disabled">
            {t('Account.Update.Card.form.disabled.hint')}
          </Switch.Label>
        </Switch.Group>
        <Submit
          className="btn btn-primary form-button"
          disabled={!isDirty || loading}
        >
          {t('Account.Update.Card.form.submit')}
        </Submit>
      </Form>
    </div>
  )
}

export default AccountUpdateCard
