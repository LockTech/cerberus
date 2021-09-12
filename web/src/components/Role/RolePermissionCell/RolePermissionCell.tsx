import { useTranslation } from 'react-i18next'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import FailureCard from 'src/components/Card/FailureCard'
import LoadingCard from 'src/components/Card/LoadingCard'

import { useErrorTranslation } from 'src/hooks/useErrorTranslation'

import type { RolePermissionQuery } from 'types/graphql'

export const QUERY = gql`
  query RolePermissionQuery {
    permissions {
      application
      id
      namespace
      object
      relation
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
  permissions,
}: CellSuccessProps<RolePermissionQuery>) => {
  const { t } = useTranslation()

  return (
    <div className="card body">
      <h2 className="text title">{t('Role.Permission.Cell.Success.title')}</h2>
      {permissions.map(({ application, namespace, object, relation }) => {
        const permKey = `${namespace}#${object}#${relation}`

        return (
          <div className="space-y-1">
            <h4 className="font-semibold text text-lg">{t(`permissions:${application}.title`)}</h4>
            <p className="text">{t(`permissions:${application}.${permKey}.title`)}</p>
            <p className="text">{t(`permissions:${application}.${permKey}.summary`)}</p>
          </div>
        )
      })}
    </div>
  )
}
