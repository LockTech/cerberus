import type {
  Account,
  Account_Confirmation,
  Organization,
  Permission,
} from '@prisma/client'

import { CerberusAdminTuple } from 'src/constants/permission'

import { writeTuple } from 'src/helpers/keto'

import { db } from 'src/lib/db'

import { deleteAllAccounts } from 'src/services/accounts'
import {
  addPermToRole,
  addRoleToAccount,
  createRole,
  deleteRole,
  deleteAllRoles,
} from 'src/services/roles'
import { permission as getPermission } from 'src/services/permissions'

import {
  createOrganization,
  deleteOrganization,
  organization as getOrganization,
  updateOrganization,
} from './organizations'
import { OrganizationStandard } from './organizations.scenarios'
import { KetoBuildOrgMemberTuple } from 'src/constants/keto'

jest.mock('../../helpers/keto/keto')
jest.mock('../accounts/accounts')
jest.mock('../roles/roles')
jest.mock('../permissions/permissions')

describe('organizations service', () => {
  describe('create', () => {
    scenario(
      'creates a new organization',
      async (scenario: OrganizationStandard) => {
        const account = scenario.account.one as Account
        const accountId = account.id
        mockCurrentUser({ id: accountId })

        const name = 'Lorem'
        const adminRoleName = 'wow'

        const perm = scenario.permission.one as Permission
        const permissionId = perm.id

        const roleId = 'd3ab2d8f-6936-4225-a33e-03e9e95cf496'

        // @ts-expect-error jest types
        createRole.mockResolvedValue({ id: roleId })
        // @ts-expect-error jest types
        getPermission.mockResolvedValue({ id: permissionId })
        // @ts-expect-error jest types
        addPermToRole.mockResolvedValue({})
        // @ts-expect-error jest types
        addRoleToAccount.mockResolvedValue({})

        const res = await createOrganization({ name, adminRoleName })
        const id = res.id

        const dbRes = await db.organization.findUnique({ where: { id } })

        expect(dbRes.name).toBe(name)
      }
    )

    scenario(
      'attempts to write a relation tuple to Keto',
      async (scenario: OrganizationStandard) => {
        const account = scenario.account.one as Account
        const accountId = account.id
        mockCurrentUser({ id: accountId })

        const name = 'Lorem'
        const adminRoleName = 'wow'

        const perm = scenario.permission.one as Permission
        const permissionId = perm.id

        const roleId = 'd3ab2d8f-6936-4225-a33e-03e9e95cf496'

        // @ts-expect-error jest types
        createRole.mockResolvedValue({ id: roleId })
        // @ts-expect-error jest types
        getPermission.mockResolvedValue({ id: permissionId })
        // @ts-expect-error jest types
        addPermToRole.mockResolvedValue({})
        // @ts-expect-error jest types
        addRoleToAccount.mockResolvedValue({})
        // @ts-expect-error jest types
        writeTuple.mockResolvedValue(true)

        const res = await createOrganization({ name, adminRoleName })
        const organizationId = res.id

        const tuple = KetoBuildOrgMemberTuple(accountId, organizationId)

        expect(writeTuple).toHaveBeenCalledTimes(1)
        expect(writeTuple).toHaveBeenCalledWith(tuple)
      }
    )

    scenario(
      'attempts to create the administrator role',
      async (scenario: OrganizationStandard) => {
        const account = scenario.account.one as Account
        const accountId = account.id
        mockCurrentUser({ id: accountId })

        const name = 'Lorem'
        const adminRoleName = 'wow'

        const perm = scenario.permission.one as Permission
        const permissionId = perm.id

        const roleId = 'd3ab2d8f-6936-4225-a33e-03e9e95cf496'

        // @ts-expect-error jest types
        createRole.mockResolvedValue({ id: roleId })
        // @ts-expect-error jest types
        getPermission.mockResolvedValue({ id: permissionId })
        // @ts-expect-error jest types
        addPermToRole.mockResolvedValue({})
        // @ts-expect-error jest types
        addRoleToAccount.mockResolvedValue({})

        await createOrganization({ name, adminRoleName })

        expect(createRole).toHaveBeenCalledTimes(1)
        expect(createRole).toHaveBeenCalledWith({ name: adminRoleName })
      }
    )

    scenario(
      'attempts to assign the administrator permission to the created role',
      async (scenario: OrganizationStandard) => {
        const account = scenario.account.one as Account
        const accountId = account.id
        mockCurrentUser({ id: accountId })

        const name = 'Lorem'
        const adminRoleName = 'wow'

        const perm = scenario.permission.one as Permission
        const permissionId = perm.id

        const roleId = 'd3ab2d8f-6936-4225-a33e-03e9e95cf496'

        // @ts-expect-error jest types
        createRole.mockResolvedValue({ id: roleId })
        // @ts-expect-error jest types
        getPermission.mockResolvedValue({ id: permissionId })
        // @ts-expect-error jest types
        addPermToRole.mockResolvedValue({})
        // @ts-expect-error jest types
        addRoleToAccount.mockResolvedValue({})

        await createOrganization({ name, adminRoleName })

        expect(addPermToRole).toHaveBeenCalledTimes(1)
        expect(addPermToRole).toHaveBeenCalledWith({ permissionId, roleId })
      }
    )

    scenario(
      'attempts to assign the created role to the invoking account',
      async (scenario: OrganizationStandard) => {
        const account = scenario.account.one as Account
        const accountId = account.id
        mockCurrentUser({ id: accountId })

        const name = 'Lorem'
        const adminRoleName = 'wow'

        const perm = scenario.permission.one as Permission
        const permissionId = perm.id

        const roleId = 'd3ab2d8f-6936-4225-a33e-03e9e95cf496'

        // @ts-expect-error jest types
        createRole.mockResolvedValue({ id: roleId })
        // @ts-expect-error jest types
        getPermission.mockResolvedValue({ id: permissionId })
        // @ts-expect-error jest types
        addPermToRole.mockResolvedValue({})
        // @ts-expect-error jest types
        addRoleToAccount.mockResolvedValue({})

        await createOrganization({ name, adminRoleName })

        expect(addRoleToAccount).toHaveBeenCalledTimes(1)
        expect(addRoleToAccount).toHaveBeenCalledWith({ accountId, roleId })
      }
    )

    scenario(
      'attempts to retrieve the administrator permission from the db',
      async (scenario: OrganizationStandard) => {
        const account = scenario.account.one as Account
        const accountId = account.id
        mockCurrentUser({ id: accountId })

        const name = 'Lorem'
        const adminRoleName = 'wow'

        const perm = scenario.permission.one as Permission
        const permissionId = perm.id

        const roleId = 'd3ab2d8f-6936-4225-a33e-03e9e95cf496'

        // @ts-expect-error jest types
        createRole.mockResolvedValue({ id: roleId })
        // @ts-expect-error jest types
        getPermission.mockResolvedValue({ id: permissionId })
        // @ts-expect-error jest types
        addPermToRole.mockResolvedValue({})
        // @ts-expect-error jest types
        addRoleToAccount.mockResolvedValue({})

        await createOrganization({ name, adminRoleName })

        expect(getPermission).toHaveBeenCalledTimes(1)
        expect(getPermission).toHaveBeenCalledWith({
          tuple: CerberusAdminTuple,
        })
      }
    )

    scenario(
      'deletes the organization when an error occurs creating the administrator role',
      async (scenario: OrganizationStandard) => {
        const account = scenario.account.one as Account
        const accountId = account.id
        mockCurrentUser({ id: accountId })

        const name = 'Lorem'
        const adminRoleName = 'wow'

        // @ts-expect-error jest types
        createRole.mockRejectedValue(new Error('failure'))

        try {
          await createOrganization({ name, adminRoleName })
        } catch (err) {
          const dbRes = await db.organization.findFirst({ where: { name } })

          expect(dbRes).toBeNull()
        }
      }
    )

    scenario(
      'deletes the organization and role when an error occurs retrieving the administrator permission',
      async (scenario: OrganizationStandard) => {
        const account = scenario.account.one as Account
        const accountId = account.id
        mockCurrentUser({ id: accountId })

        const name = 'Lorem'
        const adminRoleName = 'wow'

        const roleId = 'd3ab2d8f-6936-4225-a33e-03e9e95cf496'

        // @ts-expect-error jest types
        createRole.mockResolvedValue({ id: roleId })
        // @ts-expect-error jest types
        deleteRole.mockResolvedValue({})
        // @ts-expect-error jest types
        getPermission.mockRejectedValue(new Error('failure'))

        try {
          await createOrganization({ name, adminRoleName })
        } catch (err) {
          const orgDbRes = await db.organization.findFirst({ where: { name } })
          const roleDbRes = await db.role.findUnique({ where: { id: roleId } })

          expect(orgDbRes).toBeNull()
          expect(roleDbRes).toBeNull()
        }
      }
    )

    scenario(
      'deletes the organization and role when an error occurs adding the administrator permission to the role',
      async (scenario: OrganizationStandard) => {
        const account = scenario.account.one as Account
        const accountId = account.id
        mockCurrentUser({ id: accountId })

        const name = 'Lorem'
        const adminRoleName = 'wow'

        const perm = scenario.permission.one as Permission
        const permissionId = perm.id

        const roleId = 'd3ab2d8f-6936-4225-a33e-03e9e95cf496'

        // @ts-expect-error jest types
        createRole.mockResolvedValue({ id: roleId })
        // @ts-expect-error jest types
        getPermission.mockResolvedValue({ id: permissionId })
        // @ts-expect-error jest types
        deleteRole.mockResolvedValue({})
        // @ts-expect-error jest types
        addPermToRole.mockRejectedValue(new Error('blasted'))

        try {
          await createOrganization({ name, adminRoleName })
        } catch (err) {
          const orgDbRes = await db.organization.findFirst({ where: { name } })
          const roleDbRes = await db.role.findUnique({ where: { id: roleId } })

          expect(orgDbRes).toBeNull()
          expect(roleDbRes).toBeNull()
        }
      }
    )

    scenario(
      'deletes the organization and role when an error occurs adding the created role to the invoking account',
      async (scenario: OrganizationStandard) => {
        const account = scenario.account.one as Account
        const accountId = account.id
        mockCurrentUser({ id: accountId })

        const name = 'Lorem'
        const adminRoleName = 'wow'

        const perm = scenario.permission.one as Permission
        const permissionId = perm.id

        const roleId = 'd3ab2d8f-6936-4225-a33e-03e9e95cf496'

        // @ts-expect-error jest types
        createRole.mockResolvedValue({ id: roleId })
        // @ts-expect-error jest types
        getPermission.mockResolvedValue({ id: permissionId })
        // @ts-expect-error jest types
        addPermToRole.mockResolvedValue({})
        // @ts-expect-error jest types
        deleteRole.mockResolvedValue({})
        // @ts-expect-error jest types
        addRoleToAccount.mockRejectedValue(new Error('failure'))

        try {
          await createOrganization({ name, adminRoleName })
        } catch (err) {
          const orgDbRes = await db.organization.findFirst({ where: { name } })
          const roleDbRes = await db.role.findUnique({ where: { id: roleId } })

          expect(orgDbRes).toBeNull()
          expect(roleDbRes).toBeNull()
        }
      }
    )
  })

  describe('read', () => {
    describe('organization', () => {
      scenario(
        "retrieves the currentUser's organization",
        async (scenario: OrganizationStandard) => {
          const account = scenario.account.two as Account
          const organizationId = account.organizationId
          mockCurrentUser({ organizationId })

          const org = scenario.organization.one as Organization

          const res = await getOrganization()

          expect(res).toEqual(expect.objectContaining(org))
        }
      )
    })
  })

  describe('update', () => {
    scenario(
      'updates the currentUser\'s organization\'s "name"',
      async (scenario: OrganizationStandard) => {
        const acc = scenario.account.two as Account
        const organizationId = acc.organizationId

        mockCurrentUser({ organizationId })

        const name = 'Lorem Industries'

        const res = await updateOrganization({ name })

        const dbRes = await db.organization.findUnique({
          where: { id: organizationId },
        })

        expect(res.name).toBe(name)
        expect(dbRes.name).toBe(name)
      }
    )

    scenario(
      'updates the "updatedAt" field after updating the DB',
      async (scenario: OrganizationStandard) => {
        const acc = scenario.account.two as Account
        const organizationId = acc.organizationId

        mockCurrentUser({ organizationId })

        const name = 'Lorem Industries'

        const dbRes = await db.organization.findUnique({
          where: { id: organizationId },
        })

        const res = await updateOrganization({ name })

        expect(res.updatedAt).not.toBe(dbRes.updatedAt)
      }
    )

    scenario(
      'only updates the organization\'s "name"',
      async (scenario: OrganizationStandard) => {
        const acc = scenario.account.two as Account
        const organizationId = acc.organizationId

        mockCurrentUser({ organizationId })

        const name = 'Lorem Industries'
        const id = '111'

        const dbRes = await db.organization.findUnique({
          where: { id: organizationId },
        })

        // @ts-expect-error checking failing functionality
        const res = await updateOrganization({ id, name })

        expect(res.id).not.toBe(id)
        expect(res.id).toBe(dbRes.id)
      }
    )
  })

  describe('delete', () => {
    scenario(
      'throws when an errors occurs deleting all "accounts"',
      async (scenario: OrganizationStandard) => {
        const acc = scenario.account.two as Account
        const organizationId = acc.organizationId
        mockCurrentUser({ organizationId })

        // @ts-expect-error jest types
        deleteAllAccounts.mockRejectedValue(new Error('nope'))

        expect(deleteOrganization()).rejects.toThrow()
      }
    )

    scenario(
      'throws when an errors occurs deleting all "roles"',
      async (scenario: OrganizationStandard) => {
        const acc = scenario.account.two as Account
        const organizationId = acc.organizationId
        mockCurrentUser({ organizationId })

        // @ts-expect-error jest types
        deleteAllAccounts.mockResolvedValue(true)
        // @ts-expect-error jest types
        deleteAllRoles.mockRejectedValue(new Error('nope'))

        expect(deleteOrganization()).rejects.toThrow()
      }
    )

    scenario(
      'rethrows the error ecnountered during "account" or "role" deletion',
      async (scenario: OrganizationStandard) => {
        const acc = scenario.account.two as Account
        const organizationId = acc.organizationId
        mockCurrentUser({ organizationId })

        // @ts-expect-error jest types
        deleteAllAccounts.mockResolvedValue(true)
        // @ts-expect-error jest types
        deleteAllRoles.mockRejectedValue(new Error('a failure'))

        expect(deleteOrganization()).rejects.toThrow(new Error('a failure'))
      }
    )

    scenario(
      'deletes the organization of the invoker from the database',
      async (scenario: OrganizationStandard) => {
        const acc = scenario.account.two as Account
        const organizationId = acc.organizationId
        mockCurrentUser({ organizationId })

        // @ts-expect-error jest types
        deleteAllAccounts.mockResolvedValue(true)
        // @ts-expect-error jest types
        deleteAllRoles.mockResolvedValue(true)

        await deleteOrganization()

        const res = await db.organization.findUnique({
          where: { id: organizationId },
        })

        expect(res).toBeNull()
      }
    )

    scenario(
      "deletes all the organization's pending confirmations",
      async (scenario: OrganizationStandard) => {
        const acc = scenario.account.two as Account
        const organizationId = acc.organizationId
        mockCurrentUser({ organizationId })

        const confirm = scenario.account_Confirmation
          .one as Account_Confirmation
        const id = confirm.id
        const where = { id }

        // @ts-expect-error jest types
        deleteAllAccounts.mockResolvedValue(true)
        // @ts-expect-error jest types
        deleteAllRoles.mockResolvedValue(true)

        const preDbRes = await db.account_Confirmation.findFirst({ where })
        await deleteOrganization()
        const postDbRes = await db.account_Confirmation.findFirst({ where })

        expect(preDbRes).toEqual(expect.objectContaining(confirm))
        expect(postDbRes).toBeNull()
      }
    )
  })
})
