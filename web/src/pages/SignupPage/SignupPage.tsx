import { useEffect, useRef } from 'react'
import { useAuth } from '@redwoodjs/auth'
import {
  Form,
  Label,
  TextField,
  PasswordField,
  FieldError,
  Submit,
} from '@redwoodjs/forms'
import { Link, navigate, routes } from '@redwoodjs/router'
import { toast } from '@redwoodjs/web/toast'

const SignupPage = () => {
  const { isAuthenticated, signUp } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  // focus on email box on page load
  const usernameRef = useRef<HTMLInputElement>()
  useEffect(() => {
    usernameRef.current && usernameRef.current.focus()
  }, [usernameRef])

  const onSubmit = async (data) => {
    const response = await signUp({ ...data })

    if (response.message) {
      toast.error(response.message)
    } else {
      toast.success('Welcome!')
    }
  }

  return (
    <>
      <Form onSubmit={onSubmit} className="">
        <div className="input-group">
          <Label name="username" className="" errorClassName="">
            Username
          </Label>
          <TextField
            name="username"
            className=""
            errorClassName=""
            ref={usernameRef}
            validation={{
              required: {
                value: true,
                message: 'Username is required',
              },
            }}
          />
          <FieldError name="username" className="" />
        </div>
        <div className="">
          <Label name="password" className="" errorClassName="">
            Password
          </Label>
          <PasswordField
            name="password"
            className=""
            errorClassName=""
            autoComplete="current-password"
            validation={{
              required: {
                value: true,
                message: 'Password is required',
              },
            }}
          />
          <FieldError name="password" className="" />
        </div>

        <div className="">
          <Submit className="">Sign Up</Submit>
        </div>
      </Form>
      <div className="">
        <span>Already have an account?</span>{' '}
        <Link to={routes.login()} className="">
          Log in!
        </Link>
      </div>
    </>
  )
}

export default SignupPage
