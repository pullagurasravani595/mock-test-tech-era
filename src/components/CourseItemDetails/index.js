import {Component} from 'react'
import './index.css'

const apiStatusConstraints = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
  initial: 'INITIAL',
}

class CourseItemDetails extends Component {
  state = {apiStatus: apiStatusConstraints.initial, courseItem: {}}

  componentDidMount() {
    this.getCourseItemValues()
  }

  getCourseItemValues = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const requiredUrl = `https://apis.ccbp.in/te/courses/${id}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(requiredUrl, options)
  }

  render() {
    return (
      <div>
        <h1>hello</h1>
      </div>
    )
  }
}

export default CourseItemDetails
