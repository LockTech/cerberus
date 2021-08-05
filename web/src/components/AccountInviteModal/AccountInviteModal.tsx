import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation } from '@apollo/client'
import { FieldError, Form, Label, Submit, TextField } from '@redwoodjs/forms'
import { toast } from '@redwoodjs/web/toast'

import Modal from 'src/components/Modal'

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

  const [open, setOpen] = useState(false)

  const onCompleted = useCallback(() => {
    toast.dismiss()
    toast.success(t('Account.Invite.Modal.success'))
  }, [t])
  const onError = useCallback(
    (error: Error) => {
      toast.dismiss()
      toast.error(
        t(`Account.Invite.modal.errors.${error.message}`, error.message)
      )
    },
    [t]
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
        {t('Accounts.Invite.Modal.inviteMember')}
      </button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="card card-body">
          <div>
            <Modal.Title>{t('Accounts.Invite.Modal.title')}</Modal.Title>
            <Modal.Description>
              {t('Accounts.Invite.Modal.subtitle')}
            </Modal.Description>
          </div>
          <Form className="form" onSubmit={onSubmit}>
            <div className="input-group">
              <Label
                className="input-label"
                errorClassName="input-label-error"
                name="email"
              >
                {t('Accounts.Invite.Modal.form.email.label')}
              </Label>
              <TextField
                autoComplete="email"
                className="input-primary"
                errorClassName="input-error"
                name="email"
                validation={{
                  required: {
                    value: true,
                    message: t('Accounts.Invite.Modal.form.email.required'),
                  },
                }}
              />
              <FieldError className="input-field-error" name="email" />
            </div>
            <Submit className="button-primary-fill form-button">
              {t('Accounts.Invite.Modal.form.submit')}
            </Submit>
          </Form>
        </div>
      </Modal>
    </>
  )
}

export default AccountInviteModal
