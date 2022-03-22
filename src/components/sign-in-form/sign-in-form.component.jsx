import { useState } from "react";
import {
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopUp,
} from "../../utils/firebase.utils";

import CustomButton from "../custom-button/custom.component";
import FormInput from "../form-input/form-input.component";

import "./sign-in-form.styles.scss";

const defaultDisplayFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [displayFields, setDisplayFields] = useState(defaultDisplayFields);
  const { email, password } = displayFields;

  const logGoogleUser = async () => {
    await signInWithGooglePopUp();
  };

  const resetForm = () => {
    setDisplayFields(defaultDisplayFields);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await signInAuthUserWithEmailAndPassword(email, password);
      resetForm();
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("wrong password entered for associated email");
          break;
        case "auth/user-not-found":
          alert("No such user exists with entered email");
          break;
        default:
          console.log(error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDisplayFields({ ...displayFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
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
        <div className="buttons-container">
          <CustomButton buttonType="inverted" type="submit">
            Sign In
          </CustomButton>
          <CustomButton
            type="button"
            buttonType="google"
            onClick={logGoogleUser}
          >
            Google
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
