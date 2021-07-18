import { atom } from 'recoil'

export type ColorMode = 'light' | 'night'

export const ColorModeAtom = atom<ColorMode>({
  key: 'ColorMode',
  default: 'light',
})
