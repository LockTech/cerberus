import { db } from 'src/lib/db'

export const getCurrentUser = async (session) => {
  return await db.account.findUnique({ where: { id: session.id } })
}
