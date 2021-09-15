import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Switch } from '@headlessui/react'
import clsx from 'clsx'

export type PermissionProps = {
  application: string
  id: string
  namespace: string
  object: string
  relation: string
}

const Permission = ({
  application,
  namespace,
  object,
  relation,
}: PermissionProps) => {
  const [active, setActive] = useState(false)

  const { t } = useTranslation()

  const translationKey = `permissions:${application}.${namespace}#${object}#${relation}`

  return (
    <Switch.Group
      as="div"
      className="input-group flex flex-row items-center my-2 px-6 py-4 space-x-10"
    >
      <Switch.Label className="cursor-pointer space-y-1">
        <p className="input-label">{t(`${translationKey}.title`)}</p>
        <p className="input-hint">{t(`${translationKey}.summary`)}</p>
      </Switch.Label>
      <Switch
        checked={active}
        className={clsx('switch-track', active && 'switch-track-active')}
        onChange={setActive}
      >
        <span aria-hidden="true" className="switch-thumb" />
      </Switch>
    </Switch.Group>
  )
}

export default Permission
