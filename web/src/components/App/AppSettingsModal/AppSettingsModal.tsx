import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useRecoilState } from 'recoil'
import { Form, Label, Submit } from '@redwoodjs/forms'
import { toast } from '@redwoodjs/web/toast'

import { ColorModeAtom } from 'src/atoms/ColorMode'
import type { ColorMode } from 'src/atoms/ColorMode'
import { AppSettingsModalAtom } from 'src/atoms/AppSettingsModal'

import Modal from 'src/components/Modal'
import Select from 'src/components/Select'

import './AppSettingsModal.css'

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

  const [modalOpen, setModalOpen] = useRecoilState(AppSettingsModalAtom)
  const [colorMode, setColorMode] = useRecoilState(ColorModeAtom)

  const onSubmit = useCallback(
    (data: AppSettingsFormData) => {
      setColorMode(data.theme.value)
      setModalOpen(false)
      toast.success(t('App.SettingsModal.saved'))
    },
    [setColorMode, setModalOpen, t]
  )

  return (
    <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
      <div className="card card-body">
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
            <Label className="hint" name="theme">
              {t('App.SettingsModal.form.theme.hint')}
            </Label>
          </div>
          <Submit className="button-primary-fill form-button">
            {t('App.SettingsModal.form.submit')}
          </Submit>
        </Form>
      </div>
    </Modal>
  )
}

export default AppSettingsModal