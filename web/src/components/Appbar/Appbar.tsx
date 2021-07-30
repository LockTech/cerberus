import { useTranslation } from 'react-i18next'
import { useRecoilValue } from 'recoil'
import { UserCircleIcon } from '@heroicons/react/solid'

import { AppbarTitleAtom } from 'src/atoms/AppbarTitle'
import { CurrentAccountAtom } from 'src/atoms/CurrentAccount'

import './Appbar.css'

const Appbar = () => {
  const { t } = useTranslation()

  const title = useRecoilValue(AppbarTitleAtom)

  const currentAccount = useRecoilValue(CurrentAccountAtom)

  return (
    <div className="appbar">
      {title !== '' && typeof title === 'string' && <h2>{title}</h2>}
      <div className="actions">
        {/* <button>
          <abbr title={t('Appbar.actions.manual')}>
            <QuestionMarkCircleIcon
              aria-label={t('Appbar.actions.manual')}
              className="icon"
            />
          </abbr>
        </button> */}
        <button aria-label={t('Appbar.actions.userProfile')}>
          {currentAccount && (
            <span className="title">{`${currentAccount.firstName} ${currentAccount.lastName}`}</span>
          )}
          <UserCircleIcon className="icon" />
        </button>
      </div>
    </div>
  )
}

export default Appbar
