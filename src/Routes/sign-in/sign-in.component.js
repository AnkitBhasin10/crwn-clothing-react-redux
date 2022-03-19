import { Component } from 'react'
import {
  createUserDocumentFromAuth,
  signInWithGooglePopUp,
} from '../../utils/firebase.utils'
import './sign-in.styles.scss'

class SignIn extends Component {
  logGoogleUser = async () => {
    const response = await signInWithGooglePopUp()
    const userDocRef = await createUserDocumentFromAuth(response.user)
    console.log(userDocRef)
  }

  render() {
    return (
      <div>
        This is sign in component
        <button onClick={this.logGoogleUser}>
          Log user with google signIn
        </button>
      </div>
    )
  }
}

export default SignIn
