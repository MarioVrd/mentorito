import styled from 'styled-components/macro'
import PropTypes from 'prop-types'
import { Button } from '../assets/styles'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const CourseItem = ({ course }) => {
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const enrollToCourse = e => {
        e.preventDefault()
        console.log(course.studentsEnrolled.map(e => e.userId).indexOf(userInfo.id))
        console.log(`Uspjesno ste se upisali u kolegij ${course.title}`)
    }

    const enrolled = course.studentsEnrolled.map(e => e.userId).indexOf(userInfo.id) !== -1

    return (
        <Course>
            <Course.Title>
                <Link to={`/courses/${course.id}`}>{course.title}</Link>
                {!enrolled && (
                    <Button onClick={enrollToCourse} disabled={course.locked}>
                        Upis {course.locked && 'onemogućen'}
                    </Button>
                )}
            </Course.Title>
            {course.description && <Course.Description>{course.description}</Course.Description>}
        </Course>
    )
}

CourseItem.propTypes = {
    course: PropTypes.object.isRequired
}

const Course = styled.div`
    margin-bottom: 1rem;
    padding: 0.75rem;
    border: 1px solid var(--clr-grey-100);
`

Course.Title = styled.h3`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

Course.Description = styled.p`
    margin-top: 0.5rem;
`

export default CourseItem
