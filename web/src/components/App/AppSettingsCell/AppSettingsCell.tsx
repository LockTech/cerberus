import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useRecoilState } from 'recoil'
import { Form, Label, Submit } from '@redwoodjs/forms'
import type { CellSuccessProps } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { ColorModeAtom } from 'src/context/ColorMode'
import type { ColorMode } from 'src/context/ColorMode'
import { AppSettingsModalAtom } from 'src/context/AppSettingsModal'

import Modal from 'src/components/Modal'
import Select from 'src/components/Select'

import type { LocalesQuery } from 'types/graphql'

const ThemeKey = 'App.Settings.Cell.Success.form.theme.options'
const ThemeValues = ['browser', 'light', 'night']

export interface AppSettingsFormData {
  theme: { name: string; value: ColorMode }
  language: { name: string; value: string }
}

export const QUERY = gql`
  query LocalesQuery {
    locales
  }
`

export const Loading = () => null

export const Failure = () => null

export const Success = ({ locales }: CellSuccessProps<LocalesQuery>) => {
  const { i18n, t } = useTranslation()

  const [open, setOpen] = useRecoilState(AppSettingsModalAtom)
  const [colorMode, setColorMode] = useRecoilState(ColorModeAtom)

  const onSubmit = useCallback(
    ({ theme, language }: AppSettingsFormData) => {
      setColorMode(theme.value)
      i18n.changeLanguage(language.value)

      setOpen(false)

      toast.success(t('App.Settings.Cell.Success.saved'))
    },
    [i18n, setColorMode, setOpen, t]
  )

  return (
    <Modal open={open} onClose={setOpen}>
      <div className="card body">
        <header className="title-group">
          <Modal.Title>{t('App.Settings.Cell.Success.title')}</Modal.Title>
          <Modal.Description>
            {t('App.Settings.Cell.Success.subtitle')}
          </Modal.Description>
        </header>
        <Form className="form" onSubmit={onSubmit}>
          {/* Theme */}
          <div className="input-group">
            <Label className="input-label" name="theme">
              {t('App.Settings.Cell.Success.form.theme.label')}
            </Label>
            <Select
              defaultValue={{
                name: t(`${ThemeKey}.${colorMode}`),
                value: colorMode,
              }}
              name="theme"
              values={ThemeValues.map((theme) => ({
                name: t(`${ThemeKey}.${theme}`),
                value: theme,
              }))}
            />
            <Label className="input-hint" name="theme">
              {t('App.Settings.Cell.Success.form.theme.hint')}
            </Label>
          </div>
          {/* Language */}
          <div className="input-group">
            <Label className="input-label" name="language">
              {t('App.Settings.Cell.Success.form.language.label')}
            </Label>
            <Select
              defaultValue={{
                name: t(`languages:${i18n.language}`, { lng: i18n.language }),
                value: i18n.language,
              }}
              name="language"
              values={locales.map((lng) => ({
                name: t(`languages:${lng}`, { lng }),
                value: lng,
              }))}
            />
          </div>
          <div className="form-button space-x-4">
            <Submit className="btn btn-primary">
              {t('App.Settings.Cell.Success.form.submit')}
            </Submit>
            <button
              className="btn btn-red-ghost"
              onClick={() => setOpen(false)}
              type="button"
            >
              {t('App.Settings.Cell.Success.form.cancel')}
            </button>
          </div>
        </Form>
      </div>
    </Modal>
  )
}
