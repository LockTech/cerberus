import { useTranslation } from 'react-i18next'

import DangerCard from 'src/components/Card/DangerCard'

export interface AccountDangerCardProps {
  name: string
}

const AccountDangerCard = ({ name }: AccountDangerCardProps) => {
  const { t } = useTranslation()

  return (
    <DangerCard>
      <div className="action">
        <div className="title-group">
          <p className="title">
            {t('Account.DangerCard.delete.title', { name })}
          </p>
          <p className="hint">{t('Account.DangerCard.delete.subtitle')}</p>
        </div>
        <button className="button-red-outline">
          {t('Account.DangerCard.delete.action')}
        </button>
      </div>
    </DangerCard>
  )
}

export default AccountDangerCard
