import styled from 'styled-components/macro'
import PropTypes from 'prop-types'
import { Button } from '../assets/styles'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { enrollToCourse } from '../actions/courseActions'
import { useEffect } from 'react'
import { ENROLL_TO_COURSE_RESET } from '../constants/courseConstants'
import Alert from './Alert'

const CourseItem = ({ course }) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const courseEnroll = useSelector(state => state.courseEnroll)
    const { error, success } = courseEnroll

    const handleEnroll = e => {
        e.preventDefault()

        dispatch(enrollToCourse(course.id))
    }

    useEffect(() => {
        if (success) history.push(`/courses/${course.id}`)

        return () => {
            dispatch({ type: ENROLL_TO_COURSE_RESET })
        }
    }, [dispatch, success, course.id, history])

    const enrolled = course.enrolledUsers.map(e => e.userId).indexOf(userInfo.id) !== -1

    return (
        <Course>
            {error && <Alert>{error}</Alert>}
            <Course.Title>
                <Link to={`/courses/${course.id}`}>{course.title}</Link>
                {!enrolled && (
                    <Button onClick={handleEnroll} disabled={course.locked}>
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
