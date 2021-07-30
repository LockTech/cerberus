import { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSetRecoilState } from 'recoil'
import { useLazyQuery } from '@apollo/client'
import { toast } from '@redwoodjs/web/toast'

import { CurrentAccountAtom } from 'src/atoms/CurrentAccount'
import type { CurrentAccount } from 'src/atoms/CurrentAccount'

type CurrentAccountQueryData = { currentAccount: CurrentAccount }
const QUERY = gql`
  query CurrentAccountQuery {
    currentAccount {
      id
      email
      firstName
      lastName
      organizationId
    }
  }
`

export const useCurrentAccount = () => {
  const { t } = useTranslation()

  const setCurrentAccount = useSetRecoilState(CurrentAccountAtom)

  const onCompleted = useCallback(
    (data: CurrentAccountQueryData) => {
      toast.dismiss()
      toast.success(t('CurrentAccount.hook.success'))
      setCurrentAccount(data.currentAccount)
    },
    [setCurrentAccount, t]
  )
  const onError = useCallback((error: Error) => {
    toast.dismiss()
    toast.error(error.message)
  }, [])

  const [get, { called }] = useLazyQuery(QUERY, {
    onCompleted,
    onError,
  })

  useEffect(() => {
    if (!called) {
      get()
      toast.loading(t('CurrentAccount.hook.loading'))
    }
  }, [called, get, t])
}
