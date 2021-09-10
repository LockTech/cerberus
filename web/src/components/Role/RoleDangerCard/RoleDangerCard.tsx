import { useTranslation } from 'react-i18next'

import DangerCard from 'src/components/Card/DangerCard'
import RoleDeleteModal from 'src/components/Role/RoleDeleteModal'

export interface RoleDangerCardProps {
  id: string
  name: string
}

const RoleDangerCard = ({ id, name }: RoleDangerCardProps) => {
  const { t } = useTranslation()

  return (
    <DangerCard>
      <div className="action">
        <div className="space-y-1">
          <p className="text title">
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
