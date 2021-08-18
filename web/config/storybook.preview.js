import React from 'react'
import { RecoilRoot } from 'recoil'
import { useChannel } from '@storybook/addons'

import '../src/index.css'
import '../src/i18n'

import ToastProvider from '../src/components/ToastProvider/ToastProvider'

export const decorators = [
  (storyFunc) => <RecoilRoot>{storyFunc()}</RecoilRoot>,
  (storyFunc) => (
    <>
      <ToastProvider />
      {storyFunc()}
    </>
  ),
  (storyFunc) => {
    useChannel(
      {
        DARK_MODE: (mode) => {
          // eslint-disable-next-line no-undef
          document.body.classList.toggle('dark', mode)
        },
      },
      []
    )

    return storyFunc()
  },
  // (storyFunc) => <div className="m-6">{storyFunc()}</div>,
]
