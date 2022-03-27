import "./cart-dropdown.styles.scss";
import CustomButton from "../custom-button/custom.component";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart-context";
import CartItem from "../cart-item/cart-item.component";
import { useNavigate } from "react-router-dom";

const CartDropDown = () => {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const goToCheckoutHandler = () => {
    navigate("/checkout");
  };

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.length ? (
          cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} cartItem={cartItem} />
          ))
        ) : (
          <span className="empty-message">Your cart is empty</span>
        )}
      </div>
      <CustomButton buttonType="inverted" onClick={goToCheckoutHandler}>
        GO TO CHECKOUT
      </CustomButton>
    </div>
  );
};

export default CartDropDown;
