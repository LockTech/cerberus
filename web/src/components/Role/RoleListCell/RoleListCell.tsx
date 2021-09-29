import { useTranslation } from 'react-i18next'
import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import FailureCard from 'src/components/Card/FailureCard'
import LoadingCard from 'src/components/Card/LoadingCard'
import RoleCreateModal from 'src/components/Role/RoleCreateModal'

import { useErrorTranslation } from 'src/hooks/useErrorTranslation'

import type { RoleListQuery } from 'types/graphql'

export const QUERY = gql`
  query RoleListQuery {
    roles {
      color
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
    <div className="page-layout">
      <RoleCreateModal />
      <div className="list-layout">
        {roles.map((role) => {
          const color = role.color
          const createdAt = role.createdAt
          const id = role.id
          const name = role.name

          return (
            <Link
              className="card card-interactive border-t-8 outline-none space-y-3 text-center"
              style={{ borderTopColor: color }}
              key={id}
              to={routes.role({ id })}
            >
              <h2 className="text title">{name}</h2>
              <p className="muted hint italic">
                {t('Role.List.Cell.Success.createdAt', { createdAt })}
              </p>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
