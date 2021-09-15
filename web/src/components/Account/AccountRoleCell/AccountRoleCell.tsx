import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { CellSuccessProps, CellFailureProps, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import FailureCard from 'src/components/Card/FailureCard'
import LoadingCard from 'src/components/Card/LoadingCard'

import { useErrorTranslation } from 'src/hooks/useErrorTranslation'

import type { AccountRoleQuery } from 'types/graphql'

import './AccountRoleCell.css'

export const QUERY = gql`
  query AccountRoleQuery($id: ID!) {
    account(id: $id) {
      id
      name
      roles {
        color
        id
        name
      }
    }
    roles(accountId: $id) {
      color
      id
      name
    }
  }
`

export const ADD_MUTATION = gql`
  mutation AccountAddRoleMutation($accountId: ID!, $roleId: ID!) {
    role: addRoleToAccount(accountId: $accountId, roleId: $roleId) {
      id
    }
  }
`

export const DEL_MUTATION = gql`
  mutation AccountDelRoleMutation($accountId: ID!, $roleId: ID!) {
    role: delRoleFromAccount(accountId: $accountId, roleId: $roleId) {
      id
    }
  }
`

export const Loading = () => {
  const { t } = useTranslation()

  return (
    <LoadingCard>
      <p className="text">{t('Account.Role.Cell.Loading')}</p>
    </LoadingCard>
  )
}

export const Failure = ({ error }: CellFailureProps) => {
  const { et } = useErrorTranslation()

  return (
    <FailureCard>
      <p className="text">{et(error)}</p>
    </FailureCard>
  )
}

const roleComponent = (
  { color, id, name },
  callback: (id: string, name: string) => void
) => (
  <button
    className="accountRole-item"
    key={id}
    onClick={() => callback(id, name)}
  >
    <span className="dot" style={{ backgroundColor: color }} />
    <span>{name}</span>
  </button>
)

export const Success = ({
  account,
  roles,
}: CellSuccessProps<AccountRoleQuery>) => {
  const { t } = useTranslation()
  const { et } = useErrorTranslation()

  const [add, { loading: addLoading }] = useMutation(ADD_MUTATION, {
    refetchQueries: [{ query: QUERY, variables: { id: account.id } }],
  })
  const [del, { loading: delLoading }] = useMutation(DEL_MUTATION, {
    refetchQueries: [{ query: QUERY, variables: { id: account.id } }],
  })

  const onAddRole = useCallback(
    (roleId: string, roleName: string) => {
      if (addLoading || delLoading) return

      const { id: accountId, name: accountName } = account

      const variables = { accountId, roleId }

      toast.promise(add({ variables }), {
        loading: t('Account.Role.Cell.Success.add.loading', {
          accountName,
          roleName,
        }),
        success: t('Account.Role.Cell.Success.add.success', {
          accountName,
          roleName,
        }),
        error: (err: Error) => et(err, { accountName, roleName }),
      })
    },
    [account, add, addLoading, delLoading, et, t]
  )
  const onDelRole = useCallback(
    (roleId: string, roleName: string) => {
      if (addLoading || delLoading) return

      const { id: accountId, name: accountName } = account

      const variables = { accountId, roleId }

      toast.promise(del({ variables }), {
        loading: t('Account.Role.Cell.Success.del.loading', {
          accountName,
          roleName,
        }),
        success: t('Account.Role.Cell.Success.del.success', {
          accountName,
          roleName,
        }),
        error: (err: Error) => et(err),
      })
    },
    [account, addLoading, del, delLoading, et, t]
  )

  return (
    <div className="card sm:p-6 space-y-6">
      <div className="space-y-1">
        <h2 className="text title">{t('Account.Role.Cell.Success.title')}</h2>
        <p className="muted hint">{t('Account.Role.Cell.Success.subtitle')}</p>
      </div>
      <div className="gap-4 md:gap-16 grid grid-cols-1 md:grid-cols-2">
        <div className="accountRole-container">
          <div className="space-y-1">
            <h3 className="text title">
              {t('Account.Role.Cell.Success.roles.title')}
            </h3>
            <p className="muted hint">
              {t('Account.Role.Cell.Success.roles.subtitle')}
            </p>
          </div>
          <div className="accountRole-items">
            {roles.map((role) => roleComponent(role, onAddRole))}
          </div>
        </div>
        <div className="accountRole-container">
          <div className="space-y-1">
            <h3 className="text title">
              {t('Account.Role.Cell.Success.account.title', {
                name: account.name,
              })}
            </h3>
            <p className="muted hint">
              {t('Account.Role.Cell.Success.account.subtitle')}
            </p>
          </div>
          <div className="accountRole-items">
            {account.roles.map((role) => roleComponent(role, onDelRole))}
          </div>
        </div>
      </div>
    </div>
  )
}
