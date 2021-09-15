import type { Meta, Story } from '@storybook/react'

import UndoneNotice from './UndoneNotice'
import type { UndoneNoticeProps } from './UndoneNotice'

export default {
  component: UndoneNotice,
  title: 'Components/UndoneNotice',
} as Meta

export const Default: Story<UndoneNoticeProps> = (props) => (
  <UndoneNotice {...props} />
)
Default.args = {
  children: 'Hello there',
}
