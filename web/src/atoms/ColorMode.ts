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

    const themeCookie = document.cookie
      .split('; ')
      .find((row) => row.startsWith('theme='))

    let localMode: ColorMode = null
    if (themeCookie) {
      localMode = themeCookie.split('=')[1] as ColorMode
    }

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
    document.cookie = `theme=${val};max-age=63072000;path=/;secure`
    set(_ColorModeAtom, val)
  },
})
