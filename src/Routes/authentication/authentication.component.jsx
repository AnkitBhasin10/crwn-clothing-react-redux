import { Component } from "react";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import "./authentication.styles.scss";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";

class Authentication extends Component {
  render() {
    return (
      <div className="authentication-container">
        <SignInForm />

        <SignUpForm />
      </div>
    );
  }
}

export default Authentication;
