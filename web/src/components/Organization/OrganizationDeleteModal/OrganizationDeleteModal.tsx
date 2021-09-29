import { useCallback, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation } from '@apollo/client'
import { useAuth } from '@redwoodjs/auth'
import { toast } from '@redwoodjs/web/toast'

import Modal from 'src/components/Modal'
import DeleteModalTitle from 'src/components/DeleteModalTitle'
import UndoneNotice from 'src/components/UndoneNotice'

import { useErrorTranslation } from 'src/hooks/useErrorTranslation'

export const MUTATION = gql`
  mutation DeleteOrganizationMutation {
    organization: deleteOrganization {
      id
    }
  }
`

const OrganizationDeleteModal = () => {
  const cancelBtnRef = useRef()

  const [open, setOpen] = useState(false)

  const { t } = useTranslation()
  const { et } = useErrorTranslation()

  const [mutate, { loading }] = useMutation(MUTATION)

  const { logOut } = useAuth()

  const onDelete = useCallback(() => {
    toast.promise(mutate(), {
      loading: t('Organization.Delete.Modal.delete.loading'),
      success: () => {
        logOut()
        return t('Organization.Delete.Modal.delete.success')
      },
      error: (err: Error) => et(err),
    })
  }, [et, logOut, mutate, t])

  return (
    <>
      <button className="btn-outline-red" onClick={() => setOpen(true)}>
        {t('Organization.Delete.Modal.action')}
      </button>
      <Modal initialFocus={cancelBtnRef} onClose={setOpen} open={open}>
        <div className="card body">
          <DeleteModalTitle>
            <Modal.Title>{t('Organization.Delete.Modal.title')}</Modal.Title>
            <Modal.Description>
              {t('Organization.Delete.Modal.subtitle')}
            </Modal.Description>
          </DeleteModalTitle>
          <div className="space-y-4">
            <UndoneNotice />
            <p className="text">
              {t('Organization.Delete.Modal.consequences')}
            </p>
            <p className="bold text">
              {t('Organization.Delete.Modal.sideeffects')}
            </p>
          </div>
          <div className="form-button space-x-4">
            <button
              className="btn-fill-primary"
              disabled={loading}
              onClick={onDelete}
            >
              {t('Account.Delete.Modal.form.confirm')}
            </button>
            <button
              className="btn-outline-gray"
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

export default OrganizationDeleteModal
