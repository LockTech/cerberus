import clsx from 'clsx'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation } from '@apollo/client'
import { Switch } from '@headlessui/react'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Role/RoleDetailCell'

import { useErrorTranslation } from 'src/hooks/useErrorTranslation'

import { Permission as TPermission, RoleDetailQuery } from 'types/graphql'

import './Permission.css'

export const ADD_MUTATION = gql`
  mutation RoleAddPermissionMutation($permissionId: ID!, $roleId: ID!) {
    role: addPermToRole(permissionId: $permissionId, roleId: $roleId) {
      id
    }
  }
`

export const DEL_MUTATION = gql`
  mutation RoleDelPermissionMutation($permissionId: ID!, $roleId: ID!) {
    role: delPermFromRole(permissionId: $permissionId, roleId: $roleId) {
      id
    }
  }
`

export type PermissionProps = {
  permission: Pick<
    TPermission,
    'application' | 'id' | 'namespace' | 'object' | 'relation'
  >
  role: RoleDetailQuery['role']
}

const Permission = ({
  permission: { application, id: permissionId, namespace, object, relation },
  role: { id: roleId, name: roleName, permissions },
}: PermissionProps) => {
  const translationKey = `permissions:${application}.${namespace}#${object}#${relation}`

  const [active, setActive] = useState(false)

  const { t } = useTranslation()
  const { et } = useErrorTranslation()

  const [add, { loading: addLoading }] = useMutation(ADD_MUTATION, {
    refetchQueries: [{ query: QUERY, variables: { id: roleId } }],
    variables: { permissionId, roleId },
  })
  const [del, { loading: delLoading }] = useMutation(DEL_MUTATION, {
    refetchQueries: [{ query: QUERY, variables: { id: roleId } }],
    variables: { permissionId, roleId },
  })

  const onChange = useCallback(
    async (state: boolean) => {
      const tOptions = {
        permissionName: `$t(${t(`${translationKey}.title`)})`,
        roleName,
      }

      state &&
        toast.promise(add(), {
          loading: t('Permission.add.loading', tOptions),
          success: () => {
            setActive(state)
            return t('Permission.add.success', tOptions)
          },
          error: (err) => et(err, tOptions),
        })
      !state &&
        toast.promise(del(), {
          loading: t('Permission.del.loading', tOptions),
          success: () => {
            setActive(state)
            return t('Permission.del.success', tOptions)
          },
          error: (err) => et(err, tOptions),
        })
    },
    [add, del, et, roleName, t, translationKey]
  )

  useEffect(() => {
    const match = permissions.find((perm) => perm.id === permissionId)
    match && setActive(true)
  }, [permissions, permissionId, setActive])

  return (
    <Switch.Group as="div" className="permission">
      <Switch
        checked={active}
        className={clsx('permission-switch', active && 'active')}
        disabled={addLoading || delLoading}
        onChange={onChange}
      >
        <span aria-hidden="true" className="switch-thumb" />
      </Switch>
      <Switch.Label className="cursor-pointer space-y-1 w-full">
        <p className="input-label">{t(`${translationKey}.title`)}</p>
        <p className="input-hint">{t(`${translationKey}.summary`)}</p>
      </Switch.Label>
    </Switch.Group>
  )
}

export default Permission
