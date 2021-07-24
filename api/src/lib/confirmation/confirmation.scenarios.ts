import { randomStr } from 'src/util/randomStr'

export const standard = defineScenario({
  /// @ts-expect-error failing
  organization: {
    one: {
      id: '0251d504-347b-4880-9783-db6d199e02ee',
      name: 'Acme Corp',
    },
  },
  account_Confirmation: {
    one: {
      code: randomStr(5),
      email: 'foo.bar@acme.corp',
      id: '50e4c768-af91-469a-816d-1d0d9929dff6',
      organizationId: '0251d504-347b-4880-9783-db6d199e02ee',
    },
    two: {
      code: randomStr(5),
      email: 'john.doe@example.corp',
      id: '304f7740-5d2f-4005-ac56-b363478b5abe',
    },
  },
})

export type ConfirmationScenario = typeof standard
