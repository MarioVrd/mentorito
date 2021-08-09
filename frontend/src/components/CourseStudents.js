import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { enrollToCourse } from '../actions/courseActions'
import { getUsers } from '../actions/userActions'
import { Button, Table } from '../assets/styles'
import { ROLE_STUDENT } from '../constants/roles'
import Alert from './Alert'
import Loader from './Loader'

const CourseStudents = ({ match }) => {
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

    useEffect(() => {
        if (courseStatus === 'completed') dispatch(getUsers(ROLE_STUDENT))
    }, [dispatch, courseStatus, enrollStatus])

    return status === 'loading' ? (
        <Loader />
    ) : error ? (
        <Alert>{error}</Alert>
    ) : (
        <>
            <h2>Popis studenata</h2>
            {students && students.length > 0 ? (
                <Table>
                    <Table.Head>
                        <tr>
                            <td>Ime i prezime</td>
                            <td>Datum upisa</td>
                            <td>Akcije</td>
                        </tr>
                    </Table.Head>
                    <Table.Body>
                        {students.map(student => (
                            <tr key={student.id}>
                                <td>
                                    {student.firstName} {student.lastName}
                                </td>
                                <td colSpan={!isEnrolled(student.coursesEnrolled) ? 1 : 2}>
                                    {isEnrolled(student.coursesEnrolled)
                                        ? new Date(
                                              student.coursesEnrolled.find(
                                                  c => c.courseId === match.params.id
                                              ).enrolledAt
                                          ).toLocaleString()
                                        : 'Nije upisan'}
                                </td>
                                {!isEnrolled(student.coursesEnrolled) && (
                                    <td>
                                        <Button
                                            success
                                            small
                                            onClick={() => enrollStudent(student.id)}
                                        >
                                            Upiši studenta
                                        </Button>
                                    </td>
                                )}
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
