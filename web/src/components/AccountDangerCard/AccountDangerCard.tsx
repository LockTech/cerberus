import { useTranslation } from 'react-i18next'

import DangerCard from 'src/components/DangerCard'

export interface AccountUpdateCellProps {
  name: string
}

const AccountDangerCard = ({ name }: AccountUpdateCellProps) => {
  const { t } = useTranslation()

  return (
    <DangerCard>
      <div className="action">
        <div className="title-group">
          <p className="title">
            {t('Account.Danger.Card.delete.title', { name })}
          </p>
          <p className="hint">{t('Account.Danger.Card.delete.subtitle')}</p>
        </div>
        <button className="button-red-outline">
          {t('Account.Danger.Card.delete.action')}
        </button>
      </div>
    </DangerCard>
  )
}

export default AccountDangerCard
