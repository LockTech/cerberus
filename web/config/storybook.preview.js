import React from 'react'
import { RecoilRoot } from 'recoil'
import { RedwoodProvider } from '@redwoodjs/web'
import { useChannel } from '@storybook/addons'

import '../src/index.css'

import ToastProvider from '../src/components/ToastProvider/ToastProvider'

import ColorModeLayout from '../src/layouts/ColorModeLayout/ColorModeLayout'

import './i18n'
import './styles.css'

export const decorators = [
  (storyFunc, context) => {
    useChannel(
      {
        DARK_MODE: (mode) => {
          // eslint-disable-next-line
          document.body.classList.toggle('dark', mode)
        },
      },
      []
    )

    const { padding } = context.globals

    return (
      <RedwoodProvider>
        <RecoilRoot>
          <ColorModeLayout>
            <ToastProvider />
            <div className={padding === 'on' ? 'padding' : ''}>
              {storyFunc()}
            </div>
          </ColorModeLayout>
        </RecoilRoot>
      </RedwoodProvider>
    )
  },
]

export const globalTypes = {
  padding: {
    name: 'Padding',
    description: 'Toggle padding surrounding component-preview.',
    defaultValue: 'off',
    toolbar: {
      icon: 'component',
      items: ['on', 'off'],
    },
  },
}

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  layout: 'fullscreen',
}
