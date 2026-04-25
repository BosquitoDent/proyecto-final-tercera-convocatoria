import PropTypes from "prop-types"

export default function Popup({ message }) {
  if (!message) return null
  return (
    <div className="popup">
      {message}
    </div>
  )
}

Popup.propTypes = {
  message: PropTypes.string,
}
