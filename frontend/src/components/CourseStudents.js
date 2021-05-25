import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { enrollToCourse } from '../actions/courseActions'
import { getUsers } from '../actions/userActions'
import { Button } from '../assets/styles'
import { ROLE_STUDENT } from '../constants/roles'
import Alert from './Alert'

const CourseStudents = ({ match }) => {
    const dispatch = useDispatch()

    const courseDetails = useSelector(state => state.courseDetails)
    const { status: courseStatus } = courseDetails

    const userList = useSelector(state => state.userList)
    const { loading, error, users: students } = userList

    const isEnrolled = enrolledCourses => {
        return enrolledCourses.some(enrCourse => enrCourse.courseId === match.params.id)
    }

    const enrollStudent = userId => {
        dispatch(enrollToCourse(match.params.id, userId))
    }

    useEffect(() => {
        if (courseStatus === 'completed') dispatch(getUsers(ROLE_STUDENT))
    }, [dispatch, courseStatus])

    return loading ? (
        'Loading...'
    ) : error ? (
        <Alert>{error}</Alert>
    ) : (
        <>
            <h1>Popis studenata</h1>

            {students && students.length > 0 ? (
                <ul>
                    {students.map(student => (
                        <li key={student.id}>
                            {student.firstName} {student.lastName}
                            {!isEnrolled(student.coursesEnrolled) && (
                                <Button onClick={() => enrollStudent(student.id)}>
                                    Upiši studenta
                                </Button>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <Alert>U sustavu nema studenata</Alert>
            )}
        </>
    )
}

export default CourseStudents
