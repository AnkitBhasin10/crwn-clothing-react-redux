import { Component } from "react";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import {
  createUserDocumentFromAuth,
  signInWithGooglePopUp,
} from "../../utils/firebase.utils";
import "./authentication.styles.scss";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";

class Authentication extends Component {
  render() {
    return (
      <div>
        <div>
          <SignInForm />
        </div>
        <div>
          <SignUpForm />
        </div>
      </div>
    );
  }
}

export default Authentication;
