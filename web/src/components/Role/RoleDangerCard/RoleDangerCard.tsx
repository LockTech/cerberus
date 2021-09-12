import { useTranslation } from 'react-i18next'

import DangerCard from 'src/components/Card/DangerCard'
import RoleDeleteModal from 'src/components/Role/RoleDeleteModal'

import type { RoleUpdateQuery } from 'types/graphql'

export interface RoleDangerCardProps {
  role: RoleUpdateQuery['role']
}

const RoleDangerCard = ({ role: { id, name } }: RoleDangerCardProps) => {
  const { t } = useTranslation()

  return (
    <DangerCard>
      <div className="action">
        <div className="space-y-1">
          <p className="text">
            {t('Role.DangerCard.delete.title', { name })}
          </p>
          <p className="muted hint">{t('Role.DangerCard.delete.subtitle')}</p>
        </div>
        <RoleDeleteModal id={id} />
      </div>
    </DangerCard>
  )
}

export default RoleDangerCard
