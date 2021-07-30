import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useRecoilState } from 'recoil'
import { Dialog, Transition } from '@headlessui/react'
import { Form, Label, Submit } from '@redwoodjs/forms'

import { ColorModeAtom } from 'src/atoms/ColorMode'
import type { ColorMode } from 'src/atoms/ColorMode'
import { CurrentAccountSettingsModalAtom } from 'src/atoms/CurrentAccountSettingsModal'

import Select from 'src/components/Select'

import './CurrentAccountSettingsModal.css'

const ThemeKey = 'CurrentAccount.SettingsModal.form.theme.options'
const ThemeValues = [
  { name: `${ThemeKey}.browser`, value: 'browser' },
  { name: `${ThemeKey}.light`, value: 'light' },
  { name: `${ThemeKey}.night`, value: 'night' },
]

interface CurrentAccountSettingsFormData {
  theme: { name: string; value: ColorMode }
}

const CurrentAccountSettingsModal = () => {
  const { t } = useTranslation()

  const [modalOpen, setModalOpen] = useRecoilState(
    CurrentAccountSettingsModalAtom
  )
  const [colorMode, setColorMode] = useRecoilState(ColorModeAtom)

  const onSubmit = useCallback(
    (data: CurrentAccountSettingsFormData) => {
      setColorMode(data.theme.value)
      setModalOpen(false)
    },
    [setColorMode, setModalOpen]
  )

  return (
    <Transition as={React.Fragment} show={modalOpen}>
      <Dialog className="modal" onClose={() => null}>
        <Transition.Child
          as={Dialog.Overlay}
          className="modal-overlay"
          enter="duration-100 ease-in-out transition-opacity"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-100 ease-in-out transition-opacity"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        />
        <Transition.Child
          as="div"
          className="modal-layout"
          enter="duration-100 ease-in-out origin-top transition-all transform-gpu"
          enterFrom="opacity-0 scale-75"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in-out origin-top transition-all transform-gpu"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-75"
        >
          <div className="card card-body modal-body">
            <div className="title-group">
              <h2 className="modal-title">
                {t('CurrentAccount.SettingsModal.title')}
              </h2>
            </div>
            <Form className="form" onSubmit={onSubmit}>
              <div className="input-group">
                <Label name="theme" className="input-label">
                  {t('CurrentAccount.SettingsModal.form.theme.label')}
                </Label>
                <Select
                  defaultValue={{
                    name: `${ThemeKey}.${colorMode}`,
                    value: colorMode,
                  }}
                  name="theme"
                  values={ThemeValues}
                />
              </div>
              <Submit className="button-primary-fill w-full">
                {t('CurrentAccount.SettingsModal.form.submit')}
              </Submit>
            </Form>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  )
}

export default CurrentAccountSettingsModal
