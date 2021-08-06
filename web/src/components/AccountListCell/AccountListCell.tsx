import { useTranslation } from 'react-i18next'
import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import FailureCard from 'src/components/FailureCard'
import LoadingCard from 'src/components/LoadingCard'

import type { AccountListQuery } from 'types/graphql'

import './AccountListCell.css'

export const QUERY = gql`
  query AccountListQuery {
    accounts {
      email
      id
      lastLoginAt
      name
    }
  }
`

export const Loading = () => {
  const { t } = useTranslation()

  return (
    <LoadingCard>
      <p className="text">{t('Account.List.Cell.Loading')}</p>
    </LoadingCard>
  )
}

export const Failure = ({ error }: CellFailureProps) => {
  const { t } = useTranslation()

  return (
    <FailureCard>
      <p className="text">{t('Account.List.Cell.Failure.title')}</p>
      <p className="text">
        {t(`Account.List.Cell.Failure.errors.${error.message}`, error.message)}
      </p>
    </FailureCard>
  )
}

export const Success = ({ accounts }: CellSuccessProps<AccountListQuery>) => {
  const { t } = useTranslation()

  return (
    <div className="account-list">
      {accounts.map((account) => {
        const email = account.email
        const id = account.id
        const lastLogin = account.lastLoginAt
        const name = account.name

        return (
          <button
            className="card card-body card-interactive"
            key={id}
            onClick={() => navigate(routes.account({ id }))}
          >
            <div className="title-group">
              <h3 className="account-name text">{name}</h3>
              <p className="account-email hint">{email}</p>
            </div>
            <p className="text">
              {t('Account.List.Cell.Success.lastLogin', {
                time: new Date(lastLogin).toLocaleTimeString(undefined, {
                  timeStyle: 'short',
                }),
                date: new Date(lastLogin).toLocaleDateString(undefined, {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                }),
              })}
            </p>
          </button>
        )
      })}
    </div>
  )
}
