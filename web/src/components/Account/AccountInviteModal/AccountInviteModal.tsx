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

  const [mutate, { loading }] = useMutation(MUTATION)

  const onSubmit = useCallback(
    (variables: AccountInviteFormData) => {
      if (loading) return

      toast.promise(mutate({ variables }), {
        loading: t('Account.Invite.Modal.loading'),
        success: () => {
          setOpen(false)
          return t('Account.Invite.Modal.success')
        },
        error: (err: Error) => et(err),
      })
    },
    [et, loading, mutate, setOpen, t]
  )

  return (
    <>
      <button className="btn btn-primary w-full" onClick={() => setOpen(true)}>
        {t('Account.Invite.Modal.action')}
      </button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="card body">
          <div className="space-y-1">
            <Modal.Title>{t('Account.Invite.Modal.title')}</Modal.Title>
            <Modal.Description>
              {t('Account.Invite.Modal.subtitle')}
            </Modal.Description>
          </div>
          <p className="text">{t('Account.Invite.Modal.info')}</p>
          <Form className="form" onSubmit={onSubmit}>
            <div className="input-group floating">
              <TextField
                autoComplete="email"
                className="input"
                errorClassName="input input-error"
                name="email"
                placeholder={t('Account.Invite.Modal.form.email.placeholder')}
                validation={{
                  required: {
                    value: true,
                    message: t('Account.Invite.Modal.form.email.required'),
                  },
                }}
              />
              <Label className="input-label" name="email">
                {t('Account.Invite.Modal.form.email.label')}
              </Label>
              <FieldError className="input-error-label" name="email" />
            </div>
            <div className="form-button space-x-4">
              <Submit className="btn btn-primary" disabled={loading}>
                {t('Account.Invite.Modal.form.submit')}
              </Submit>
              <button
                className="btn btn-red-ghost"
                onClick={() => setOpen(false)}
                type="button"
              >
                {t('Account.Invite.Modal.form.cancel')}
              </button>
            </div>
          </Form>
        </div>
      </Modal>
    </>
  )
}

export default AccountInviteModal
