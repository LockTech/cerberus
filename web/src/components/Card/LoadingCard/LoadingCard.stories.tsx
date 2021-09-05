import { Meta } from '@storybook/react'

import LoadingCard from './LoadingCard'

export default {
  component: LoadingCard,
  title: 'Components/Card/Loading',
} as Meta

export const deafault = () => (
  <LoadingCard>
    <p className="text">
      Whelp, looks like something really important is loading up.
    </p>
  </LoadingCard>
)
