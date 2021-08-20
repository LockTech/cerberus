import React from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { RecoilRoot } from 'recoil'
import { useChannel } from '@storybook/addons'

import '../src/index.css'
import '../src/i18n'

import ToastProvider from '../src/components/ToastProvider/ToastProvider'

import ColorModeLayout from '../src/layouts/ColorModeLayout/ColorModeLayout'

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
      <HelmetProvider>
        <RecoilRoot>
          <ColorModeLayout>
            <ToastProvider />
            <div className={padding === 'on' ? 'padding' : ''}>
              {storyFunc()}
            </div>
          </ColorModeLayout>
        </RecoilRoot>
      </HelmetProvider>
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
