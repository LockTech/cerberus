import { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'

import { AppbarTitleAtom } from 'src/atoms/AppbarTitle'

interface AppbarTitleProps {
  children: string
}

/**
 * Updates `AppbarTitleAtom` to the value passed as this components `children`.
 *
 * `children` MUST be a `string`.
 *
 * The value of `children` will be used as the `<main>` content's `<h1>` declaration.
 */
const AppbarTitle = ({ children }: AppbarTitleProps) => {
  const setTitle = useSetRecoilState(AppbarTitleAtom)

  useEffect(() => {
    setTitle(children)
  }, [children, setTitle])

  return null
}

export default AppbarTitle
