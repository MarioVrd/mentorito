import { Card } from '../assets/styles'

const UserCard = ({ user }) => {
    return (
        <Card text="center">
            <Card.Title>
                {user.firstName} {user.lastName}
            </Card.Title>
            <Card.Description>{user.role}</Card.Description>
            <Card.Link href={`mailto:${user.email}`}>{user.email}</Card.Link>
        </Card>
    )
}

export default UserCard
