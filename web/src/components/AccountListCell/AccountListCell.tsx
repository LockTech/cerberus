import { useTranslation } from 'react-i18next'
import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import FailureCard from 'src/components/FailureCard'
import LoadingCard from 'src/components/LoadingCard'

import { useErrorTranslation } from 'src/hooks/useErrorTranslation'

import type { AccountListQuery } from 'types/graphql'

import './AccountListCell.css'

export const QUERY = gql`
  query AccountListQuery {
    accounts {
      email
      id
      lastLoginAt
      name
      verifiedAt
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
  const { et } = useErrorTranslation()

  return (
    <FailureCard>
      <p className="text">{et(error)}</p>
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
        const verifiedAt = account.verifiedAt

        return (
          <button
            className="card card-body card-interactive"
            key={id}
            onClick={() => navigate(routes.account({ id }))}
          >
            <div className="title-group">
              <h2 className="account-name text">{name}</h2>
              <p className="account-email hint">{email}</p>
            </div>
            <div className="title-group">
              <p className="text">
                {t('Account.List.Cell.Success.lastLogin', {
                  time: lastLogin,
                  date: lastLogin,
                })}
              </p>
              <p className="hint">
                {t('Account.List.Cell.Success.verified', { date: verifiedAt })}
              </p>
            </div>
          </button>
        )
      })}
    </div>
  )
}
