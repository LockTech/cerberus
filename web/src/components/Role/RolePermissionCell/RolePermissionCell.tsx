import { useTranslation } from 'react-i18next'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import FailureCard from 'src/components/Card/FailureCard'
import LoadingCard from 'src/components/Card/LoadingCard'
import ApplicationPermissions from 'src/components/Permission/ApplicationPermissions'

import { useErrorTranslation } from 'src/hooks/useErrorTranslation'

import type { RoleDetailQuery, RolePermissionQuery } from 'types/graphql'

export const QUERY = gql`
  query RolePermissionQuery {
    applicationPermissions {
      application
      permissions {
        application
        id
        namespace
        object
        relation
      }
    }
  }
`

export const Loading = () => {
  const { t } = useTranslation()

  return (
    <LoadingCard>
      <p className="text">{t('Role.Permission.Cell.Loading')}</p>
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

export const Success = ({
  applicationPermissions,
  role,
}: CellSuccessProps<RolePermissionQuery> &
  CellSuccessProps<RoleDetailQuery>) => {
  const { t } = useTranslation()

  return (
    <div className="card body">
      <div className="space-y-1">
        <h3 className="text">{t('Role.Permission.Cell.Success.title')}</h3>
        <p className="muted hint">
          {t('Role.Permission.Cell.Success.subtitle', { name: role.name })}
        </p>
      </div>
      <div className="divide-y-2 divide-gray-100 dark:divide-gray-600">
        {applicationPermissions.map(({ application, permissions }) => (
          <ApplicationPermissions
            key={application}
            application={application}
            permissions={permissions}
            role={role}
          />
        ))}
      </div>
    </div>
  )
}
