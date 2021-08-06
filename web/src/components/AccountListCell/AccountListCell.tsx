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
      id
      name
      email
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
  return (
    <div className="account-list">
      {accounts.map((account) => (
        <button
          className="card card-body card-interactive"
          key={account.id}
          onClick={() => navigate(routes.account({ id: account.id }))}
        >
          <div className="title-group">
            <h3 className="account-name text">{account.name}</h3>
            <p className="account-email hint">{account.email}</p>
          </div>
          <p className="text">
            Last seen at {new Date().toLocaleTimeString()} on{' '}
            {new Date().toLocaleDateString()}
          </p>
        </button>
      ))}
    </div>
  )
}
