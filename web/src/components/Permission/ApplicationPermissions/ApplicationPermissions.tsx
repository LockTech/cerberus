import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { Disclosure, Transition } from '@headlessui/react'
import { ChevronRightIcon } from '@heroicons/react/outline'

import Permission from 'src/components/Permission/Permission'
import type { PermissionProps } from 'src/components/Permission/Permission'

import type { Permission as TPermission } from 'types/graphql'

import './ApplicationPermissions.css'

export type ApplicationPermissionsProps = Pick<PermissionProps, 'role'> & {
  application: string
  permissions: Pick<
    TPermission,
    'application' | 'id' | 'namespace' | 'object' | 'relation'
  >[]
}

const ApplicationPermissions = ({
  application,
  permissions,
  role,
}: ApplicationPermissionsProps) => {
  const { t } = useTranslation()

  return (
    <Disclosure as="div">
      {({ open }) => (
        <>
          <Disclosure.Button className="applicationPermission-button">
            <ChevronRightIcon
              aria-hidden="true"
              className={clsx('icon', open && 'active')}
            />
            <div className="space-y-1 w-full">
              <h3 className="font-semibold text text-xl">
                {t(`permissions:${application}.title`)}
              </h3>
              <p className="muted hint">
                {t(`permissions:${application}.subtitle`, {
                  defaultValue: null,
                })}
              </p>
            </div>
          </Disclosure.Button>
          <Transition
            enter="duration-300 ease-out origin-top transform transition-opacity"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="duration-100 ease-out origin-top transform transition-opacity"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Disclosure.Panel className="mb-6" unmount={false}>
              {permissions.map((permission) => (
                <Permission
                  key={permission.id}
                  permission={permission}
                  role={role}
                />
              ))}
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  )
}

export default ApplicationPermissions
