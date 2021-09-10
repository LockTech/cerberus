import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useRecoilState } from 'recoil'
import { Form, Label, Submit } from '@redwoodjs/forms'
import { toast } from '@redwoodjs/web/toast'

import { ColorModeAtom } from 'src/context/ColorMode'
import type { ColorMode } from 'src/context/ColorMode'
import { AppSettingsModalAtom } from 'src/context/AppSettingsModal'

import Modal from 'src/components/Modal'
import Select from 'src/components/Select'

const ThemeKey = 'App.SettingsModal.form.theme.options'
const ThemeValues = [
  { name: `${ThemeKey}.browser`, value: 'browser' },
  { name: `${ThemeKey}.light`, value: 'light' },
  { name: `${ThemeKey}.night`, value: 'night' },
]

interface AppSettingsFormData {
  theme: { name: string; value: ColorMode }
}

const AppSettingsModal = () => {
  const { t } = useTranslation()

  const [open, setOpen] = useRecoilState(AppSettingsModalAtom)
  const [colorMode, setColorMode] = useRecoilState(ColorModeAtom)

  const onSubmit = useCallback(
    (data: AppSettingsFormData) => {
      setColorMode(data.theme.value)
      setOpen(false)
      toast.success(t('App.SettingsModal.saved'))
    },
    [setColorMode, setOpen, t]
  )

  return (
    <Modal open={open} onClose={setOpen}>
      <div className="card body">
        <header className="title-group">
          <Modal.Title>{t('App.SettingsModal.title')}</Modal.Title>
          <Modal.Description>
            {t('App.SettingsModal.subtitle')}
          </Modal.Description>
        </header>
        <Form className="form" onSubmit={onSubmit}>
          {/* Theme */}
          <div className="input-group">
            <Label className="input-label" name="theme">
              {t('App.SettingsModal.form.theme.label')}
            </Label>
            <Select
              defaultValue={{
                name: `${ThemeKey}.${colorMode}`,
                value: colorMode,
              }}
              name="theme"
              values={ThemeValues}
            />
            <Label className="input-hint" name="theme">
              {t('App.SettingsModal.form.theme.hint')}
            </Label>
          </div>
          <div className="form-button space-x-4">
            <Submit className="btn btn-primary">
              {t('App.SettingsModal.form.submit')}
            </Submit>
            <button
              className="btn btn-red-ghost"
              onClick={() => setOpen(false)}
              type="button"
            >
              {t('App.SettingsModal.form.cancel')}
            </button>
          </div>
        </Form>
      </div>
    </Modal>
  )
}

export default AppSettingsModal
