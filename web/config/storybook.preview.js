import React from 'react'
import { RecoilRoot } from 'recoil'

import '../src/index.css'
import '../src/i18n'

export const decorators = [
  (storyFunc) => <RecoilRoot>{storyFunc()}</RecoilRoot>,
  (storyFunc) => <div className="m-6">{storyFunc()}</div>,
]
