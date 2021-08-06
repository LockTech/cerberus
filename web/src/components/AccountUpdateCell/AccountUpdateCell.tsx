import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useMutation } from '@apollo/client'
import { FieldError, Form, Label, TextField, Submit } from '@redwoodjs/forms'
import { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import AccountDangerCard from 'src/components/AccountDangerCard'
import FailureCard from 'src/components/FailureCard'
import LoadingCard from 'src/components/LoadingCard'

import type { AccountUpdateQuery, AccountUpdateMutation } from 'types/graphql'
import { useCallback } from 'react'

export const QUERY = gql`
  query AccountUpdateQuery($id: ID!) {
    account(id: $id) {
      id
      name
      email
    }
  }
`

export const MUTATION = gql`
  mutation AccountUpdateMutation($id: ID!, $email: String!, $name: String!) {
    account: updateAccount(id: $id, email: $email, name: $name) {
      email
      name
    }
  }
`

export const Loading = () => {
  const { t } = useTranslation()

  return (
    <LoadingCard>
      <p className="text">{t('Account.Update.Cell.Loading')}</p>
    </LoadingCard>
  )
}

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => {
  const { t } = useTranslation()

  return (
    <FailureCard>
      <p className="text">{t('Account.Update.Cell.Failure.title')}</p>
      <p className="text">
        {t(
          `Account.Update.Cell.Failure.errors.${error.message}`,
          error.message
        )}
      </p>
    </FailureCard>
  )
}

interface UpdateAccountFormData {
  email: string
  name: string
}
type AccountUpdateMutationResult = AccountUpdateMutation['account']
export const Success = ({ account }: CellSuccessProps<AccountUpdateQuery>) => {
  const email = account.email
  const id = account.id
  const name = account.name

  const formMethods = useForm({
    mode: 'onSubmit',
    defaultValues: {
      email,
      name,
    },
  })
  const { reset } = formMethods
  const { isDirty } = formMethods.formState

  const { t } = useTranslation()

  const onCompleted = useCallback(
    (data: AccountUpdateMutationResult) => {
      toast.dismiss()
      toast.success(t('Account.Update.Cell.Success.success'))

      reset({ email: data.email, name: data.name })
    },
    [reset, t]
  )
  const onError = useCallback(
    (error: Error) => {
      toast.dismiss()
      toast.error(
        t(`Account.Update.Cell.Success.errors.${error.message}`, error.message)
      )
    },
    [t]
  )

  const [mutate, { loading }] = useMutation(MUTATION, {
    onCompleted,
    onError,
    refetchQueries: [{ query: QUERY, variables: { id } }],
  })

  const onSubmit = useCallback(
    (variables: UpdateAccountFormData) => {
      if (!loading) {
        toast.loading(t('Account.Update.Cell.Success.loading'))

        mutate({ variables: { id, ...variables } })
      }
    },
    [id, loading, mutate, t]
  )

  return (
    <div className="page-layout">
      <div className="card card-body">
        <header className="title-group">
          <h2 className="title">
            {t('Account.Update.Cell.Success.title', { name })}
          </h2>
          <p className="hint">
            {t('Account.Update.Cell.Success.subtitle', { name })}
          </p>
        </header>
        <Form className="form" formMethods={formMethods} onSubmit={onSubmit}>
          {/* email */}
          <div className="input-group">
            <Label
              className="input-label"
              errorClassName="input-label-error"
              name="email"
            >
              {t('Account.Update.Cell.Success.form.email.label')}
            </Label>
            <TextField
              autoComplete="email"
              className="input-primary"
              defaultValue={email}
              errorClassName="input-error"
              name="email"
              validation={{
                required: {
                  value: true,
                  message: t('Account.Update.Cell.Success.form.email.required'),
                },
              }}
            />
            <FieldError className="input-field-error" name="email" />
          </div>
          {/* name */}
          <div className="input-group">
            <Label
              className="input-label"
              errorClassName="input-label-error"
              name="name"
            >
              {t('Account.Update.Cell.Success.form.name.label')}
            </Label>
            <TextField
              autoComplete="name"
              className="input-primary"
              defaultValue={name}
              errorClassName="input-error"
              name="name"
              validation={{
                required: {
                  value: true,
                  message: t('Account.Update.Cell.Success.form.name.required'),
                },
              }}
            />
            <FieldError className="input-field-error" name="name" />
          </div>
          <Submit
            className="button-primary-fill form-button"
            disabled={!isDirty || loading}
          >
            {t('Account.Update.Cell.Success.form.submit')}
          </Submit>
        </Form>
      </div>
      <AccountDangerCard name={name} />
    </div>
  )
}
