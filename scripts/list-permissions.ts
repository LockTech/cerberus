import { permissions } from '../api/dist/services/permissions/permissions'

export default async () => {
  const res = await permissions()

  console.log({ res })
}
