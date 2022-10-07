import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, favoriteAppointmentItem} = props
  const {id, appointmentTitle, date, starFlag} = appointmentDetails

  const activateStarIcon = () => {
    favoriteAppointmentItem(id)
  }
  const starImgUrl = starFlag
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="apt-list-item">
      <div className="apt-container">
        <p className="apt-name">{appointmentTitle}</p>
        <p className="apt-date">Date: {date}</p>
      </div>
      <button
        type="button"
        //  testid="star"
        className="btn-str"
        onClick={activateStarIcon}
      >
        <img src={starImgUrl} alt="star" className="star-img" />
      </button>
    </li>
  )
}
export default AppointmentItem
