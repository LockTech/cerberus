import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useAuth } from '@redwoodjs/auth'
import { toast } from '@redwoodjs/web/toast'

import { useErrorTranslation } from 'src/hooks/useErrorTranslation'

export interface LoginData {
  email: string
  password: string
}

export const useLoginCallback = () => {
  const { t } = useTranslation()
  const { et } = useErrorTranslation()

  const { logIn } = useAuth()
  const login = useCallback(
    async ({ email: username, password }: LoginData) => {
      const toastId = toast.loading(t('Login.Hook.loading'))

      const res = await logIn({ username, password })

      toast.dismiss(toastId)

      if (res.error) {
        toast.error(et({ message: res.error }))
        return res
      }

      toast.success(t('Login.Hook.success'))

      return res
    },
    [et, logIn, t]
  )

  return login
}

export interface SignupData {
  code?: string
  email: string
  name: string
  password: string
}

export const useSignupCallback = () => {
  const { t } = useTranslation()
  const { et } = useErrorTranslation()

  const { signUp } = useAuth()
  const signup = useCallback(
    async ({ code, email: username, name, password }: SignupData) => {
      const toastId = toast.loading(t('Signup.Hook.loading'))

      const res = await signUp({ code, username, name, password })

      toast.dismiss(toastId)

      if (res.error) {
        toast.error(et({ message: res.error }))
        return res
      }

      toast.success(t('Signup.Hook.success'))

      return res
    },
    [et, signUp, t]
  )

  return signup
}
