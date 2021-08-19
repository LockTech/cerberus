import type { Meta, Story } from '@storybook/react'

import BrandBanner from './BrandBanner'

export default {
  component: BrandBanner,
  title: 'Components/BrandBanner',
} as Meta

export const Default: Story = () => <BrandBanner />
