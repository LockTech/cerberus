import { useTranslation } from 'react-i18next'

import AccountDeleteModal from 'src/components/Account/AccountDeleteModal'
import DangerCard from 'src/components/Card/DangerCard'

import type { AccountDetailQuery } from 'types/graphql'

export interface AccountDangerCardProps {
  account: AccountDetailQuery['account']
}

const AccountDangerCard = ({
  account: { id, name },
}: AccountDangerCardProps) => {
  const { t } = useTranslation()

  return (
    <DangerCard>
      <div className="action">
        <div className="space-y-1">
          <p className="text">
            {t('Account.DangerCard.delete.title', { name })}
          </p>
          <p className="muted hint">
            {t('Account.DangerCard.delete.subtitle')}
          </p>
        </div>
        <AccountDeleteModal id={id} />
      </div>
    </DangerCard>
  )
}

export default AccountDangerCard
