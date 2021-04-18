import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'

const EnrolledCourseItem = ({ enrollment }) => {
    let description

    if (enrollment.course.description) {
        description = (
            <Course.Description>
                {enrollment.course.description.substring(0, 50)}
            </Course.Description>
        )
    }

    return (
        <Course>
            <Link to={`/courses/${enrollment.course.id}`}>
                <Course.Title>{enrollment.course.title}</Course.Title>
            </Link>
            {description}
            <Course.EnrolledAt>
                Upisan: {new Date(enrollment.enrolledAt).toLocaleString()}
            </Course.EnrolledAt>
        </Course>
    )
}

const Course = styled.div`
    margin-bottom: 2rem;
    padding: 1rem;
    border: 1px solid var(--clr-grey-100);
    border-radius: 5px;
    align-self: flex-start;
`

Course.Title = styled.h3`
    margin-bottom: 1rem;
`

Course.Description = styled.p`
    margin-bottom: 1rem;
`

Course.EnrolledAt = styled.span`
    font-weight: 300;
    font-size: 0.85em;
`

export default EnrolledCourseItem
