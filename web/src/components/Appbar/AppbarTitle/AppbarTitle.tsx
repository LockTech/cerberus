import { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import { AppbarTitleAtom } from 'src/atoms/AppbarTitleAtom'

interface AppbarTitleProps {
  children: string
}

/**
 * Updates `AppbarTitleAtom` to the value passed as this components `children`.
 *
 * `children` MUST be a `string`.
 */
const AppbarTitle = ({ children }: AppbarTitleProps) => {
  const setTitle = useSetRecoilState(AppbarTitleAtom)

  useEffect(() => {
    setTitle(children)
  }, [children, setTitle])

  return null
}

export default AppbarTitle
