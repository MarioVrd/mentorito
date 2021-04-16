import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

const Alert = ({ variant = 'danger', children }) => {
    return <AlertMessage variant={variant}>{children}</AlertMessage>
}

const AlertMessage = styled.div`
    background-color: ${props => `var(--clr-${props.variant})`};
    color: var(--clr-white);
    padding: 0.75rem;
    margin-bottom: 1rem;
    border-radius: 5px;
    font-size: 0.9em;
`

const availableVariants = ['danger', 'success', 'info']
Alert.propTypes = {
    variant: PropTypes.oneOf(availableVariants)
}

export default Alert
