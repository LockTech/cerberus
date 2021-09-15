import { useCallback, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation } from '@apollo/client'
import { navigate, routes } from '@redwoodjs/router'
import { toast } from '@redwoodjs/web/toast'

import DeleteModalTitle from 'src/components/DeleteModalTitle'
import Modal from 'src/components/Modal'
import { QUERY } from 'src/components/Role/RoleListCell'
import UndoneNotice from 'src/components/UndoneNotice'

import { useErrorTranslation } from 'src/hooks/useErrorTranslation'

export const MUTATION = gql`
  mutation RoleDeleteMutation($id: ID!) {
    role: deleteRole(id: $id) {
      name
    }
  }
`

export type RoleDeleteMutationResults = {
  role: { name: string }
}

export type RoleDeleteModalProps = {
  id: string
}

const RoleDeleteModal = ({ id }: RoleDeleteModalProps) => {
  const [open, setOpen] = useState(false)

  const cancelRef = useRef()

  const { t } = useTranslation()
  const { et } = useErrorTranslation()

  const [mutate, { loading }] = useMutation<RoleDeleteMutationResults>(
    MUTATION,
    {
      refetchQueries: [{ query: QUERY }],
      variables: { id },
    }
  )

  const onSubmit = useCallback(() => {
    toast.promise(mutate(), {
      loading: t('Role.Delete.Modal.delete.loading'),
      success: ({ data: { role } }) => {
        navigate(routes.listRoles())
        return t('Role.Delete.Modal.delete.success', role)
      },
      error: (err: Error) => et(err),
    })
  }, [et, mutate, t])

  return (
    <>
      <button className="btn btn-red-ghost" onClick={() => setOpen(true)}>
        {t('Role.Delete.Modal.action')}
      </button>
      <Modal initialFocus={cancelRef} onClose={setOpen} open={open}>
        <div className="card body">
          <DeleteModalTitle>
            <Modal.Title>{t('Role.Delete.Modal.title')}</Modal.Title>
            <Modal.Description>
              {t('Role.Delete.Modal.subtitle')}
            </Modal.Description>
          </DeleteModalTitle>
          <div className="space-y-4">
            <UndoneNotice>{t('Role.Delete.Modal.undone')}</UndoneNotice>
            <p className="text">{t('Role.Delete.Modal.accounts')}</p>
          </div>
          <div className="form-button space-x-4">
            <button
              className="btn btn-red"
              disabled={loading}
              onClick={onSubmit}
            >
              {t('Role.Delete.Modal.form.delete')}
            </button>
            <button
              className="btn btn-primary-ghost"
              disabled={loading}
              onClick={() => setOpen(false)}
              ref={cancelRef}
            >
              {t('Role.Delete.Modal.form.cancel')}
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default RoleDeleteModal
