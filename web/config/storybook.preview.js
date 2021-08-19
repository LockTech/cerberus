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
  (storyFunc) => {
    useChannel(
      {
        DARK_MODE: (mode) => {
          // eslint-disable-next-line
          document.body.classList.toggle('dark', mode)
        },
      },
      []
    )

    return (
      <HelmetProvider>
        <RecoilRoot>
          <ColorModeLayout>
            <ToastProvider />
            {storyFunc()}
          </ColorModeLayout>
        </RecoilRoot>
      </HelmetProvider>
    )
  },
]
