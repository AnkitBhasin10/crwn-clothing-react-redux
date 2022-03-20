import { useState } from 'react'
import {
  createUserAuthWithUserEmailAndPassword,
  createUserDocumentFromAuth,
} from '../../utils/firebase.utils'
import CustomButton from '../custom-button/custom.component'
import FormInput from '../form-input/form-input.component'
import './sign-up-form.styles.scss'

const defaultDisplayFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const SignUpForm = () => {
  const [displayFields, setDisplayFields] = useState(defaultDisplayFields)
  const { displayName, email, password, confirmPassword } = displayFields

  const resetForm = () => {
    setDisplayFields(defaultDisplayFields)
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault()

    if (password !== confirmPassword) {
      alert('Password and Confirm Password do not match')
    } else {
      try {
        const { user } = await createUserAuthWithUserEmailAndPassword(
          email,
          password,
        )
        await createUserDocumentFromAuth(user, { displayName })
        resetForm()
      } catch (error) {
        console.log('failure during user creation', error)
      }
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setDisplayFields({ ...displayFields, [name]: value })
  }

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleFormSubmit}>
        <FormInput
          label="User Name"
          type="text"
          name="displayName"
          value={displayName}
          onChange={handleChange}
        />
        <FormInput
          label="Email"
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
        />
        <FormInput
          label="Password"
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
        />
        <FormInput
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
        />
        <CustomButton buttonType="inverted">Sign Up</CustomButton>
      </form>
    </div>
  )
}

export default SignUpForm
