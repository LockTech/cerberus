import { useTranslation } from 'react-i18next'
import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import FailureCard from 'src/components/Card/FailureCard'
import LoadingCard from 'src/components/Card/LoadingCard'

import { useErrorTranslation } from 'src/hooks/useErrorTranslation'

import type { RoleListQuery } from 'types/graphql'

import './RoleListCell.css'

export const QUERY = gql`
  query RoleListQuery {
    roles {
      id
      name
      createdAt
    }
  }
`

export const Loading = () => {
  const { t } = useTranslation()

  return (
    <LoadingCard>
      <p className="text">{t('Role.List.Cell.Loading')}</p>
    </LoadingCard>
  )
}

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => {
  const { et } = useErrorTranslation()

  return (
    <FailureCard>
      <p className="text">{et(error)}</p>
    </FailureCard>
  )
}

export const Success = ({ roles }: CellSuccessProps<RoleListQuery>) => {
  const { t } = useTranslation()

  return (
    <div className="role-list">
      {roles.map((role) => {
        const createdAt = role.createdAt
        const id = role.id
        const name = role.name

        return (
          <button
            className="card card-body card-interactive"
            key={id}
            onClick={() => navigate(routes.role({ id }))}
          >
            <div>
              <h2 className="role-name text">{name}</h2>
            </div>
            <p className="text">
              {t('Role.List.Cell.Success.createdAt', { createdAt })}
            </p>
          </button>
        )
      })}
    </div>
  )
}
