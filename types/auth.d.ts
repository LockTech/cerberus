import type { Account, Organization, Role } from '@prisma/client'

export interface CurrentUser extends Account {
  organization: Organization
  roles: Role[]
}
