import { useCallback, useEffect } from 'react'
import { useRecoilState } from 'recoil'

import { ColorModeAtom } from 'src/atoms/ColorMode'

type ColorModeLayoutProps = {
  children: React.ReactNode
}

const ColorModeLayout = ({ children }: ColorModeLayoutProps) => {
  const [colorMode, setColorMode] = useRecoilState(ColorModeAtom)

  const onChangePreference = useCallback((e) => {
    e.matches
      ? document.body.classList.add('dark')
      : document.body.classList.remove('dark')
  }, [])

  useEffect(() => {
    switch (colorMode) {
      case 'browser': {
        window.matchMedia('(prefers-color-scheme: dark)').matches
          ? document.body.classList.add('dark')
          : document.body.classList.remove('dark')

        window
          .matchMedia('(prefers-color-scheme: dark)')
          .addEventListener('change', onChangePreference)
        break
      }
      case 'light': {
        document.body.classList.remove('dark')
        window
          .matchMedia('(prefers-color-scheme: dark)')
          .removeEventListener('change', onChangePreference)
        break
      }
      case 'night': {
        document.body.classList.add('dark')
        window
          .matchMedia('(prefers-color-scheme: dark)')
          .removeEventListener('change', onChangePreference)
        break
      }
    }

    return () =>
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .removeEventListener('change', onChangePreference)
  }, [colorMode, onChangePreference, setColorMode])

  return <>{children}</>
}

export default ColorModeLayout
