import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation } from '@apollo/client'
import { FieldError, Form, Label, Submit, TextField } from '@redwoodjs/forms'
import { toast } from '@redwoodjs/web/toast'

import Modal from 'src/components/Modal'

import { useErrorTranslation } from 'src/hooks/useErrorTranslation'

export const MUTATION = gql`
  mutation InviteMemberMutation($email: String!) {
    account: inviteAccount(email: $email)
  }
`

interface AccountInviteFormData {
  email: string
}

const AccountInviteModal = () => {
  const { t } = useTranslation()
  const { et } = useErrorTranslation()

  const [open, setOpen] = useState(false)

  const onCompleted = useCallback(() => {
    toast.dismiss()
    toast.success(t('Account.Invite.Modal.success'))

    setOpen(false)
  }, [setOpen, t])
  const onError = useCallback(
    (error: Error) => {
      toast.dismiss()
      toast.error(et(error))
    },
    [et]
  )

  const [mutate, { loading }] = useMutation(MUTATION, { onCompleted, onError })

  const onSubmit = useCallback(
    (variables: AccountInviteFormData) => {
      if (!loading) {
        toast.loading(t('Account.Invite.Modal.loading'))
        mutate({ variables })
      }
    },
    [loading, mutate, t]
  )

  return (
    <>
      <button
        className="button-primary-fill w-full"
        onClick={() => setOpen(true)}
      >
        {t('Account.Invite.Modal.action')}
      </button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="card card-body">
          <div className="title-group">
            <Modal.Title>{t('Account.Invite.Modal.title')}</Modal.Title>
            <Modal.Description>
              {t('Account.Invite.Modal.subtitle')}
            </Modal.Description>
          </div>
          <p className="text">{t('Account.Invite.Modal.info')}</p>
          <Form className="form" onSubmit={onSubmit}>
            <div className="input-group">
              <Label
                className="input-label"
                errorClassName="input-label-error"
                name="email"
              >
                {t('Account.Invite.Modal.form.email.label')}
              </Label>
              <TextField
                autoComplete="email"
                className="input-primary"
                errorClassName="input-error"
                name="email"
                placeholder={t('Account.Invite.Modal.form.email.placeholder')}
                validation={{
                  required: {
                    value: true,
                    message: t('Account.Invite.Modal.form.email.required'),
                  },
                }}
              />
              <FieldError className="input-field-error" name="email" />
            </div>
            <Submit className="button-primary-fill form-button">
              {t('Account.Invite.Modal.form.submit')}
            </Submit>
          </Form>
        </div>
      </Modal>
    </>
  )
}

export default AccountInviteModal
