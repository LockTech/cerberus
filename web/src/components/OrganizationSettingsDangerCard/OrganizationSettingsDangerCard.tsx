import { useTranslation } from 'react-i18next'

import DangerCard from 'src/components/DangerCard'

const OrganizationSettingsDangerCard = () => {
  const { t } = useTranslation()

  return (
    <DangerCard>
      <div className="action">
        <div className="title-group">
          <p className="title">
            {t('Organization.Settings.Danger.Card.delete.title')}
          </p>
          <p className="hint">
            {t('Organization.Settings.Danger.Card.delete.subtitle')}
          </p>
        </div>
        <button className="button-red-outline">
          {t('Organization.Settings.Danger.Card.delete.action')}
        </button>
      </div>
    </DangerCard>
  )
}

export default OrganizationSettingsDangerCard
