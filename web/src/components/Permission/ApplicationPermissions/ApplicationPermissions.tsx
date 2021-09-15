import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { Disclosure, Transition } from '@headlessui/react'
import { ChevronRightIcon } from '@heroicons/react/solid'

import Permission from 'src/components/Permission/Permission'
import type { PermissionProps } from 'src/components/Permission/Permission'

import './ApplicationPermissions.css'

export type ApplicationPermissionsProps = {
  application: string
  permissions: PermissionProps[]
}

const ApplicationPermissions = ({
  application,
  permissions,
}: ApplicationPermissionsProps) => {
  const { t } = useTranslation()

  return (
    <Disclosure as="div">
      {({ open }) => (
        <>
          <Disclosure.Button className="applicationPermission-button">
            <div className="flex-grow space-y-1">
              <h3 className="font-semibold text text-xl">
                {t(`permissions:${application}.title`)}
              </h3>
              <p className="muted hint">
                {t(`permissions:${application}.subtitle`, {
                  defaultValue: null,
                })}
              </p>
            </div>
            <ChevronRightIcon className={clsx('icon', open && 'rotate-90')} />
          </Disclosure.Button>
          <Transition
            enter="duration-300 ease-out origin-top transform transition"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="duration-100 ease-out origin-top transform transition"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Disclosure.Panel className="mb-6">
              {permissions.map((perm) => (
                <Permission key={perm.id} {...perm} />
              ))}
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  )
}

export default ApplicationPermissions
