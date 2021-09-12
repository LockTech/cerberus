import { useTranslation } from 'react-i18next'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import FailureCard from 'src/components/Card/FailureCard'
import LoadingCard from 'src/components/Card/LoadingCard'
import RoleDangerCard from 'src/components/Role/RoleDangerCard'
import RoleUpdateCard from 'src/components/Role/RoleUpdateCard'
import RolePermissionCell from 'src/components/Role/RolePermissionCell'

import { useErrorTranslation } from 'src/hooks/useErrorTranslation'

import type { RoleDetailQuery } from 'types/graphql'

export const QUERY = gql`
  query RoleDetailQuery($id: ID!) {
    role(id: $id) {
      color
      id
      name
    }
  }
`

export const Loading = () => {
  const { t } = useTranslation()

  return (
    <LoadingCard>
      <p className="text">{t('Role.Update.Cell.Loading')}</p>
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

export const Success = ({ role }: CellSuccessProps<RoleDetailQuery>) => {
  return (
    <div className="page-layout">
      <RoleUpdateCard role={role} />
      <RolePermissionCell />
      <RoleDangerCard role={role} />
    </div>
  )
}
