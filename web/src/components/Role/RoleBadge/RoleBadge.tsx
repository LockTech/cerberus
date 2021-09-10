import clsx from 'clsx'

import { useRoleStyle } from 'src/hooks/useRoleStyle'

export type RoleBageProps = {
  as?: keyof JSX.IntrinsicElements | React.ComponentType
  className?: string
  color: string
  name: string
}

const RoleBadge = ({
  as: Component = 'span',
  className,
  color,
  name,
  ...rest
}: RoleBageProps & typeof Component) => {
  const style = useRoleStyle(color)

  return (
    <Component
      className={clsx('badge badge-sm w-[fit-content]', className)}
      style={style}
      {...rest}
    >
      {name}
    </Component>
  )
}

export default RoleBadge
