import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { enrollToCourse } from '../actions/courseActions'
import { getUsers } from '../actions/userActions'
import { Button, Table } from '../assets/styles'
import { STATUS } from '../constants/requestStatusConstants'
import { ROLE_STUDENT } from '../constants/roles'
import useApi from '../hooks/useApi'
import Alert from './Alert'
import Loader from './Loader'

const CourseStudents = ({ match }) => {
    const api = useApi()
    const { status: apiStatus, error: apiError, apiFunction } = api

    const dispatch = useDispatch()

    const courseDetails = useSelector(state => state.courseDetails)
    const { status: courseStatus } = courseDetails

    const courseEnroll = useSelector(state => state.courseEnroll)
    const { status: enrollStatus } = courseEnroll

    const userList = useSelector(state => state.userList)
    const { status, error, users: students } = userList

    const isEnrolled = enrolledCourses => {
        return enrolledCourses.some(enrCourse => enrCourse.courseId === match.params.id)
    }

    const enrollStudent = userId => {
        dispatch(enrollToCourse(match.params.id, userId))
    }

    const unenrollStudent = userId => {
        apiFunction('DELETE', `/api/courses/${match.params.id}/enroll/${userId}`)
    }

    useEffect(() => {
        if (courseStatus === STATUS.completed || apiStatus === STATUS.completed)
            dispatch(getUsers(ROLE_STUDENT))
    }, [dispatch, courseStatus, enrollStatus, apiStatus])

    return status === STATUS.loading ? (
        <Loader />
    ) : error ? (
        <Alert>{error}</Alert>
    ) : (
        <>
            {apiError && <Alert>{apiError}</Alert>}
            <h2>Popis studenata</h2>
            {students && students.length > 0 ? (
                <Table>
                    <Table.Head>
                        <tr>
                            <td>Ime i prezime</td>
                            <td>Datum upisa</td>
                            <td>Poveznice</td>
                        </tr>
                    </Table.Head>
                    <Table.Body>
                        {students.map(student => (
                            <tr key={student.id}>
                                <td>
                                    {student.firstName} {student.lastName}
                                </td>
                                <td>
                                    {isEnrolled(student.coursesEnrolled)
                                        ? new Date(
                                              student.coursesEnrolled.find(
                                                  c => c.courseId === match.params.id
                                              ).enrolledAt
                                          ).toLocaleString()
                                        : 'Nije upisan'}
                                </td>
                                <td>
                                    {!isEnrolled(student.coursesEnrolled) ? (
                                        <Button
                                            success
                                            small
                                            onClick={() => enrollStudent(student.id)}
                                        >
                                            Upiši studenta
                                        </Button>
                                    ) : (
                                        <Button
                                            danger
                                            small
                                            onClick={() => unenrollStudent(student.id)}
                                        >
                                            Ispiši studenta
                                        </Button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </Table.Body>
                </Table>
            ) : (
                <Alert>U sustavu nema studenata</Alert>
            )}
        </>
    )
}

export default CourseStudents
