import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components/macro'
import { getAllCourses } from '../actions/courseActions'
import Alert from '../components/Alert'
import CourseItem from '../components/CourseItem'

const CoursesPage = () => {
    const dispatch = useDispatch()
    const courseList = useSelector(state => state.courseList)
    const { loading, error, courses } = courseList

    useEffect(() => {
        dispatch(getAllCourses())
    }, [dispatch])

    return (
        <Main>
            <h1>Courses</h1>
            {loading ? (
                'Loading...'
            ) : error ? (
                <Alert>{error}</Alert>
            ) : courses && courses.length ? (
                courses.map(course => <CourseItem key={course.id} course={course} />)
            ) : (
                <Alert variant="info">Trenutno ne postoji ni jedan kolegij.</Alert>
            )}
        </Main>
    )
}

const Main = styled.main`
    padding: 1rem 2rem;
`

export default CoursesPage
