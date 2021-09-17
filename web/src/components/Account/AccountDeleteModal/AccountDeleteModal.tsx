import { useCallback, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation } from '@apollo/client'
import { navigate, routes } from '@redwoodjs/router'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Account/AccountListCell'
import DeleteModalTitle from 'src/components/DeleteModalTitle'
import Modal from 'src/components/Modal'
import UndoneNotice from 'src/components/UndoneNotice'

import { useErrorTranslation } from 'src/hooks/useErrorTranslation'

import { Account } from 'types/graphql'

export const MUTATION = gql`
  mutation AccountDeleteMutation($id: ID!) {
    account: deleteAccount(id: $id) {
      name
    }
  }
`

export type AccountDeleteMutationResult = {
  account: Pick<Account, 'name'>
}

export type AccountDeleteModalProps = {
  id: string
}

const AccountDeleteModal = ({ id }: AccountDeleteModalProps) => {
  const cancelBtnRef = useRef()

  const [open, setOpen] = useState(false)

  const { t } = useTranslation()
  const { et } = useErrorTranslation()

  const [mutate, { loading }] = useMutation<AccountDeleteMutationResult>(
    MUTATION,
    { refetchQueries: [{ query: QUERY }], variables: { id } }
  )

  const onDelete = useCallback(() => {
    toast.promise(mutate(), {
      loading: t('Account.Delete.Modal.delete.loading'),
      success: ({ data: { account } }) => {
        setOpen(false)
        navigate(routes.listAccounts())
        return t('Account.Delete.Modal.delete.success', account)
      },
      error: (err: Error) => et(err),
    })
  }, [et, mutate, setOpen, t])

  return (
    <>
      <button className="btn btn-red-ghost" onClick={() => setOpen(true)}>
        {t('Account.Delete.Modal.action')}
      </button>
      <Modal initialFocus={cancelBtnRef} onClose={setOpen} open={open}>
        <div className="card body">
          <DeleteModalTitle>
            <Modal.Title>{t('Account.Delete.Modal.title')}</Modal.Title>
            <Modal.Description>
              {t('Account.Delete.Modal.subtitle')}
            </Modal.Description>
          </DeleteModalTitle>
          <div className="space-y-4">
            <UndoneNotice />
            <p className="text">{t('Account.Delete.Modal.roles')}</p>
          </div>
          <div className="form-button space-x-4">
            <button
              className="btn btn-red"
              disabled={loading}
              onClick={onDelete}
            >
              {t('Account.Delete.Modal.form.confirm')}
            </button>
            <button
              className="btn btn-primary-ghost"
              onClick={() => setOpen(false)}
              ref={cancelBtnRef}
            >
              {t('Account.Delete.Modal.form.cancel')}
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default AccountDeleteModal
