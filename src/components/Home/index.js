import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import CourseCard from '../CourseCard'
import './index.css'

const apiStatusConditions = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {apiStatus: apiStatusConditions.initial, courseList: []}

  componentDidMount() {
    this.getTechCourse()
  }

  getTechCourse = async () => {
    this.setState({apiStatus: apiStatusConditions.inProgress})
    const apiUrl = 'https://apis.ccbp.in/te/courses'
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updateData = data.courses.map(eachCourse => ({
        id: eachCourse.id,
        name: eachCourse.name,
        logoUrl: eachCourse.logo_url,
      }))
      this.setState({
        apiStatus: apiStatusConditions.success,
        courseList: updateData,
      })
    } else {
      this.setState({apiStatus: apiStatusConditions.failure})
    }
  }

  renderSuccessView = () => {
    const {courseList} = this.state
    return (
      <div className="success-container">
        <h1 className="heading-success">Courses</h1>
        <ul className="un-order-list-container">
          {courseList.map(eachItem => (
            <CourseCard details={eachItem} key={eachItem.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="failure-home-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
        className="failure-home"
      />
      <h1 className="failure-heading-home">Oops! Something Went Wrong</h1>
      <p className="failure-description-home">
        We cannot seem to find the page you are looking for.
      </p>
      <button type="button" className="failure-retry-btn">
        Retry
      </button>
    </div>
  )

  renderLoaderView = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#475569" height="50" width="50" />
    </div>
  )

  renderDisplayView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConditions.success:
        return this.renderSuccessView()
      case apiStatusConditions.failure:
        return this.renderFailureView()
      case apiStatusConditions.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        {this.renderDisplayView()}
      </div>
    )
  }
}

export default Home
