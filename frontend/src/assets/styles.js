import styled from 'styled-components/macro'

export const Button = styled.button`
    display: inline-block;
    width: ${props => (props.block ? '100%' : 'auto')};
    background-color: ${props => (props.primary ? 'var(--clr-primary)' : 'var(--clr-grey-100)')};
    padding: 0.75rem 1rem;
    border-radius: 5px;
    border: 0;
    font-family: 'Poppins', sans-serif;
    font-size: 0.95rem;
    color: ${props => (props.primary ? 'var(--clr-white)' : 'var(--clr-dark)')};
    cursor: pointer;
    transition: opacity 200ms;

    &:hover {
        opacity: 0.9;
    }
`
