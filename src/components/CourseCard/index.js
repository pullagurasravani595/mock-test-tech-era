import {Link} from 'react-router-dom'
import './index.css'

const CourseCard = props => {
  const {details} = props
  const {name, logoUrl, id} = details

  return (
    <Link to={`/courses/:${id}`} className="link-item">
      <li className="list-container">
        <img src={logoUrl} alt={name} className="course-image" />
        <h1 className="course-heading-list">{name}</h1>
      </li>
    </Link>
  )
}

export default CourseCard
