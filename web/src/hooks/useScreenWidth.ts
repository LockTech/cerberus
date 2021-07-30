import { useCallback, useEffect, useState } from 'react'

export const useScreenWidth = () => {
  const [width, setWidth] = useState<number>(window.innerWidth)

  const onResizeBody = useCallback(() => {
    const width = window.innerWidth
    setWidth(width)
  }, [setWidth])

  useEffect(() => {
    window.addEventListener('resize', onResizeBody)
    return () => window.removeEventListener('resize', onResizeBody)
  }, [onResizeBody])

  return width
}
