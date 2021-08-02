import { useTranslation } from 'react-i18next'
import { FieldError, Form, Label, Submit, TextField } from '@redwoodjs/forms'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import type { OrganizationUpdateQuery } from 'types/graphql'

export const QUERY = gql`
  query OrganizationUpdateQuery {
    organization {
      name
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({
  organization,
}: CellSuccessProps<OrganizationUpdateQuery>) => {
  const { t } = useTranslation()

  return (
    <div className="card card-body space-y-6">
      <div className="title-group">
        <h2 className="title">{t('Organization.Update.Cell.Success.title')}</h2>
        <p className="hint">{t('Organization.Update.Cell.Success.subtitle')}</p>
      </div>
      <Form className="form">
        <div className="input-group">
          <Label
            className="input-label"
            errorClassName="input-label-error"
            name="name"
          >
            {t('Organization.Update.Cell.Success.form.name.label')}
          </Label>
          <TextField
            className="input-primary"
            defaultValue={organization.name}
            errorClassName="input-error"
            name="name"
            validation={{
              required: {
                value: true,
                message: t(
                  'Organization.Update.Cell.Success.form.name.required'
                ),
              },
            }}
          />
          <FieldError className="input-field-error" name="name" />
        </div>
        <Submit className="button-primary-fill form-button">
          {t('Organization.Update.Cell.Success.form.submit')}
        </Submit>
      </Form>
    </div>
  )
}
