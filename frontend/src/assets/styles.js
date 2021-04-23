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

    &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }
`

export const UserForm = styled.form`
    border-radius: 0.5rem;
    padding: 2rem;
    box-shadow: 0 0.5rem 0.75rem rgba(0, 0, 0, 0.35);
    width: 400px;
    max-width: 100%;
`

UserForm.Title = styled.h2`
    margin-bottom: 1rem;
`

UserForm.Group = styled.div`
    margin-bottom: 1rem;
`

UserForm.Label = styled.label`
    display: inline-block;
    margin-bottom: 0.25rem;
`

UserForm.Input = styled.input`
    display: block;
    width: 100%;
    font-size: 0.92rem;
    padding: 0.75rem;
    border-radius: 5px;
    border: 1px solid var(--clr-grey-200);
`
