import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import type { UseTranslationOptions } from 'react-i18next'

/**
 * Wrapper around i18next's `useTranslation` hook.
 *
 * Provides translations for an API error, falling back to the error's default message if a translation is not found.
 *
 * Unlike `useTranslation`, the error thrown or caught should be passed directly to the `t` function.
 *
 * **Note:** The `t` function has been renamed to `et` to avoid name conflicts when making use of both hooks.
 *
 * @example
 * /// error = new Error('account-read')
 * const component = ({ error }) => {
 *  const { et } = useErrorTranslation()
 *
 *  return <p>{t(apiError)}</p>
 * }
 */
export const useErrorTranslation = (
  ns?: string,
  options?: UseTranslationOptions
) => {
  const { t: _t, ...rest } = useTranslation(ns, options)

  const et = useCallback(
    (
      { message }: Error | { message: string },
      options?: Record<string, unknown>
    ) => _t(`errors:${message}`, { defaultValue: message, ...options }),
    [_t]
  )

  return { et, ...rest }
}
