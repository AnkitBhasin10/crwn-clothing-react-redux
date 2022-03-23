import "./cart-dropdown.styles.scss";
import CustomButton from "../custom-button/custom.component";

const CartDropDown = () => {
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items" />

      <CustomButton buttonType="inverted">GO TO CHECKOUT</CustomButton>
    </div>
  );
};

export default CartDropDown;
