import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'
import { getEnrolledCourses } from '../actions/courseActions'
import Alert from './Alert'
import EnrolledCourseItem from './EnrolledCourseItem'

const EnrolledCourses = () => {
    const dispatch = useDispatch()
    const enrolledCourses = useSelector(state => state.enrolledCourses)
    const { loading, error, enrollment } = enrolledCourses

    useEffect(() => {
        dispatch(getEnrolledCourses())
    }, [dispatch])
    return (
        <div>
            <Heading>Upisani kolegiji</Heading>

            {loading && 'Loading...'}
            {error && <Alert>{error}</Alert>}
            {enrollment && enrollment.length ? (
                <EnrolledGrid>
                    {enrollment.map(e => (
                        <EnrolledCourseItem key={`${e.userId}${e.courseId}`} enrollment={e} />
                    ))}
                </EnrolledGrid>
            ) : (
                <p>
                    Nemate upisanih kolegija. Popis svih možete pronaći{' '}
                    <Link to="/courses">ovdje</Link>
                </p>
            )}
        </div>
    )
}

const EnrolledGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    column-gap: 1.5rem;
`

const Heading = styled.h2`
    margin: 1rem 0;
`

export default EnrolledCourses
