import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useTranslation } from 'react-i18next'

import FailureCard from 'src/components/FailureCard'
import LoadingCard from 'src/components/LoadingCard'

import { useErrorTranslation } from 'src/hooks/useErrorTranslation'

import type { UpdateRoleQuery } from 'types/graphql'

export const QUERY = gql`
  query RoleUpdateQuery($id: ID!) {
    role(id: $id) {
      id
      name
    }
  }
`

export const MUTATION = gql`
  mutation RoleUpdateMutation($id: ID!, $name: String) {
    role: updateRole(id: $id, name: $name) {
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

export const Success = ({ role }: CellSuccessProps<UpdateRoleQuery>) => {
  return <div>{JSON.stringify(role)}</div>
}
