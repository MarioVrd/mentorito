import styled from 'styled-components/macro'

const UserCard = ({ user }) => {
    return (
        <Card>
            <Card.Name>
                {user.firstName} {user.lastName}
            </Card.Name>
            <Card.Role>{user.role}</Card.Role>
            <Card.Email href={`mailto:${user.email}`}>{user.email}</Card.Email>
        </Card>
    )
}

const Card = styled.div`
    text-align: center;
    box-shadow: 0 0.5rem 0.5rem rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    padding: 1rem;
`

Card.Name = styled.h3``

Card.Role = styled.p``

Card.Email = styled.a``

export default UserCard
