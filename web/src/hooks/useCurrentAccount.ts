import { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { useQuery } from '@apollo/client'
import { toast } from '@redwoodjs/web/toast'

import { CurrentAccountAtom } from 'src/atoms/CurrentAccount'
import type { CurrentAccount } from 'src/atoms/CurrentAccount'

type CurrentAccountQueryData = { currentAccount: CurrentAccount }
export const QUERY = gql`
  query CurrentAccountQuery {
    currentAccount {
      id
      email
      firstName
      lastName
      organization {
        id
        name
      }
    }
  }
`

export const useQueryCurrentAccount = () => {
  const { t } = useTranslation()

  const setCurrentAccount = useSetRecoilState(CurrentAccountAtom)

  const onCompleted = useCallback(
    (data: CurrentAccountQueryData) => {
      setCurrentAccount(data.currentAccount)
    },
    [setCurrentAccount]
  )
  const onError = useCallback(
    (error: Error) => {
      toast.error(t(`CurrentAccount.hook.error.${error.message}`))
    },
    [t]
  )

  const { loading, error, data } = useQuery(QUERY, {
    onCompleted,
    onError,
  })

  useEffect(() => {
    if (!loading) {
      if (error) onError(error)
      if (data) onCompleted(data)
    }
  }, [data, error, loading, onCompleted, onError])
}

/**
 * @returns `useRecoilValue(CurrentAccountAtom)`
 */
export const useCurrentAccount = () => useRecoilValue(CurrentAccountAtom)
