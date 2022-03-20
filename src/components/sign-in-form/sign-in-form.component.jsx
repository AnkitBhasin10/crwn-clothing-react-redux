import { useState } from 'react'
import {
  createUserAuthWithUserEmailAndPassword,
  createUserDocumentFromAuth, signInWithGooglePopUp,
} from '../../utils/firebase.utils'
import CustomButton from '../custom-button/custom.component'
import FormInput from '../form-input/form-input.component'
import './sign-in-form.styles.scss'

const defaultDisplayFields = {
  email: '',
  password: '',
}

const SignInForm = () => {
  const [displayFields, setDisplayFields] = useState(defaultDisplayFields)
  const { email, password } = displayFields

  const logGoogleUser = async () => {
    const response = await signInWithGooglePopUp()
    const userDocRef = await createUserDocumentFromAuth(response.user)
    console.log(userDocRef)
  }

  const resetForm = () => {
    setDisplayFields(defaultDisplayFields)
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault()


      try {
        const { user } = await createUserAuthWithUserEmailAndPassword(
          email,
          password,
        )
        await createUserDocumentFromAuth(user)
        resetForm()
      } catch (error) {
        console.log('failure during user creation', error)
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
        <div>
          <CustomButton buttonType="inverted" type="submit">Sign In</CustomButton>
          <CustomButton buttonType="google" onClick={logGoogleUser}>Google</CustomButton>
        </div>
      </form>
    </div>
  )
}

export default SignInForm
