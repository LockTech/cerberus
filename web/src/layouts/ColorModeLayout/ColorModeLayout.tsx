import { useEffect } from 'react'
import { useRecoilValue } from 'recoil'

import { ColorModeAtom } from 'src/atoms/ColorModeAtom'

type ColorModeLayoutProps = {
  children: React.ReactNode
}

const ColorModeLayout = ({ children }: ColorModeLayoutProps) => {
  const colorMode = useRecoilValue(ColorModeAtom)

  useEffect(() => {
    colorMode === 'night'
      ? window.document.body.classList.add('dark')
      : window.document.body.classList.remove('dark')
  }, [colorMode])

  return <>{children}</>
}

export default ColorModeLayout
