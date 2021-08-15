export const standard = defineScenario({
  organization: {
    one: {
      id: '6a82a1cc-1e2f-47d6-a3e7-ce31c71450fa',
      name: 'Acme Corp',
    },
    two: {
      id: 'e5a15b0b-06a8-4773-9812-0ce5d6e8b7d2',
      name: 'Example Inc.',
    },
  },
})

export type SignupStandard = typeof standard
