import styled from 'styled-components/macro'
import PropTypes from 'prop-types'
import { Button, Card, LinkButton } from '../assets/styles'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCourse, enrollToCourse } from '../actions/courseActions'
import { ROLE_ADMIN } from '../constants/roles'

const CourseListItem = ({ course }) => {
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const handleEnroll = e => {
        e.preventDefault()

        dispatch(enrollToCourse(course.id))
    }

    const deleteCourseHandler = () => {
        dispatch(deleteCourse(course.id))
    }

    const enrolled = course.enrolledUsers.map(e => e.userId).indexOf(userInfo.id) !== -1

    return (
        <Course>
            <Course.Title>
                <Link to={`/courses/${course.id}`}>{course.title}</Link>
                {!enrolled && (
                    <Button onClick={handleEnroll} disabled={course.locked}>
                        Upis {course.locked && 'onemogućen'}
                    </Button>
                )}
            </Course.Title>
            {course.description && <Course.Description>{course.description}</Course.Description>}
            {userInfo?.role === ROLE_ADMIN && (
                <>
                    <LinkButton
                        size="small"
                        variant="success"
                        to={`/admin/courses/${course.id}/edit`}
                    >
                        Uredi
                    </LinkButton>
                    <Button small danger onClick={deleteCourseHandler}>
                        Izbriši
                    </Button>
                </>
            )}
        </Course>
    )
}

CourseListItem.propTypes = {
    course: PropTypes.object.isRequired
}

const Course = styled(Card)`
    margin-bottom: 1rem;
`

Course.Title = styled.h3`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

Course.Description = styled.p`
    margin-top: 0.5rem;
`

export default CourseListItem
