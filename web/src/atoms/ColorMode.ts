import { atom, selector } from 'recoil'

export type ColorMode = 'browser' | 'light' | 'night'

export const _ColorModeAtom = atom<ColorMode>({
  key: '_ColorMode',
  default: null,
})

export const ColorModeAtom = selector({
  key: 'ColorMode',
  get: ({ get }) => {
    const colorMode = get(_ColorModeAtom)
    const localMode = window.localStorage.getItem('theme') as ColorMode | null

    if (localMode !== null && colorMode !== localMode) {
      return localMode
    }

    if (localMode === null && colorMode === null) {
      window.localStorage.setItem('theme', 'browser')
      return 'browser'
    }

    return colorMode
  },
  set: ({ set }, val: string) => {
    window.localStorage.setItem('theme', val)
    set(_ColorModeAtom, val)
  },
})
