import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * Wrapper around i18next's `useTranslation` hook.
 *
 * Provides translations for an API error, falling back to the error's default message.
 *
 * **Unlike** `useTranslation`, the error thrown or caught should be passed directly to the `t` function.
 *
 * @example
 * const apiError = new Error('account-read')
 *
 * const component = () => {
 *  const t = useErrorTranslation()
 *
 *  return <p>{t(apiError)}</p>
 * }
 */
export const useErrorTranslation = () => {
  const { t: _t, ...rest } = useTranslation()

  const t = useCallback(
    ({ message }: Error) => _t(`errors:${message}`, message),
    [_t]
  )

  return { t, ...rest }
}
