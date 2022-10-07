import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {appointmentList: [], title: '', dateInput: '', starBtnActive: false}

  addAppointmentDetails = event => {
    event.preventDefault()
    const {title, dateInput} = this.state
    const formattedDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''
    //  const newDate = format(new Date(date), 'dd MMMM yyyy,EEEE')
    const appointmentDetails = {
      id: uuidv4(),
      appointmentTitle: title,
      date: formattedDate,
      starFlag: false,
    }
    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, appointmentDetails],
      title: '',
      dateInput: '',
    }))
  }

  favoriteAppointmentItem = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachAppointment => {
        if (eachAppointment.id === id) {
          return {...eachAppointment, starFlag: !eachAppointment.starFlag}
        }
        return eachAppointment
      }),
    }))
  }

  starredAppointments = () => {
    const {starBtnActive} = this.state
    this.setState({starBtnActive: !starBtnActive})
  }

  titleValue = event => {
    this.setState({title: event.target.value})
  }

  dateValue = event => {
    this.setState({dateInput: event.target.value})
  }

  getStarredAppointmentItems = () => {
    const {appointmentList, starBtnActive} = this.state

    if (starBtnActive) {
      return appointmentList.filter(eachItem => eachItem.starFlag === true)
    }
    return appointmentList
  }

  render() {
    const {title, dateInput, starBtnActive} = this.state
    const makeStarBtnActive = starBtnActive ? 'active-star-btn' : ''
    const flterItemsList = this.getStarredAppointmentItems()

    return (
      <div className="appointment-bg-container">
        <div className="appointment-container">
          <div className="content-img-container">
            <div className="title-date-container">
              <form
                className="form-details"
                onSubmit={this.addAppointmentDetails}
              >
                <h1 className="heading">Add Appointment</h1>
                <label className="title-label" htmlFor="title">
                  TITLE
                </label>
                <input
                  type="text"
                  className="title-field"
                  id="title"
                  onChange={this.titleValue}
                  value={title}
                />
                <label className="date-label" htmlFor="date">
                  DATE
                </label>
                <input
                  type="date"
                  className="date-field"
                  id="date"
                  onChange={this.dateValue}
                  value={dateInput}
                />
                <button type="submit" className="button">
                  Add
                </button>
              </form>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              className="appointment-img"
              alt="appointments"
            />
          </div>

          <hr className="horizontal-line" />
          <div className="star-apt-container">
            <h1 className="appointment-heading">Appointments</h1>
            <button
              type="button"
              className={`star-button ${makeStarBtnActive}`}
              onClick={this.starredAppointments}
            >
              Starred
            </button>
          </div>
          <ul className="appoint-list-container">
            {flterItemsList.map(eachAppointment => (
              <AppointmentItem
                key={eachAppointment.id}
                appointmentDetails={eachAppointment}
                favoriteAppointmentItem={this.favoriteAppointmentItem}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
