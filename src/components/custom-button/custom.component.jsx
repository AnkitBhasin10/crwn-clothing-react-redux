import './custom-button.styles.scss'

const BUTTON_TYPE_CLASSES = {
  google: 'google-authentication',
  inverted: 'inverted',
}

const CustomButton = ({ children, buttonType, ...otherProps }) => {
  return (
    <button
      className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
      {...otherProps}
    >
      {children}
    </button>
  )
}

export default CustomButton
