import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'

export const Grid = styled.div`
    @media (min-width: 1250px) {
        display: grid;
        grid-template-columns: 5fr minmax(400px, 1fr);
    }
`

export const Main = styled.main`
    padding: 1.5rem 2rem;
`

Main.Title = styled.h2`
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--clr-grey-100);
`

Main.Description = styled.p`
    margin-bottom: 1rem;
`

export const Sidebar = styled.aside`
    padding: 1.5rem;
    background-color: var(--clr-grey-100);

    > * {
        margin-bottom: 1.35rem;
    }
`

Sidebar.Notifications = styled.div`
    max-height: 50vh;
    overflow: auto;
`

export const Button = styled.button`
    display: inline-block;
    width: ${props => (props.block ? '100%' : 'auto')};
    background-color: ${props =>
        props.primary
            ? 'var(--clr-primary)'
            : props.danger
            ? 'var(--clr-danger)'
            : props.success
            ? 'var(--clr-success)'
            : 'var(--clr-grey-100)'};
    padding: 0.75em 1em;
    border-radius: 5px;
    border: 0;
    font-family: 'Poppins', sans-serif;
    font-size: ${props => (props.small ? '0.8rem' : '0.95rem')};
    color: ${props =>
        props.primary || props.danger || props.success ? 'var(--clr-white)' : 'var(--clr-dark)'};
    cursor: pointer;
    transition: opacity 200ms;

    &:hover {
        opacity: 0.9;
        color: ${props =>
            props.primary || props.danger || props.success
                ? 'var(--clr-white)'
                : 'var(--clr-dark)'};
    }

    &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }
`

export const LinkButton = styled(Link)`
    display: inline-block;
    width: ${props => (props.block ? '100%' : 'auto')};
    background-color: ${props =>
        props.variant === 'primary'
            ? 'var(--clr-primary)'
            : props.variant === 'danger'
            ? 'var(--clr-danger)'
            : props.variant === 'success'
            ? 'var(--clr-success)'
            : 'var(--clr-grey-100)'};
    padding: 0.75em 1em;
    border-radius: 5px;
    border: 0;
    font-family: 'Poppins', sans-serif;
    font-size: ${props => (props.size === 'small' ? '0.8rem' : '0.95rem')};
    color: ${props =>
        props.variant === 'primary' || props.variant === 'danger' || props.variant === 'success'
            ? 'var(--clr-white)'
            : 'var(--clr-dark)'};
    cursor: pointer;
    transition: opacity 200ms;

    &:hover {
        opacity: 0.9;
        color: ${props =>
            props.variant === 'primary' || props.variant === 'danger' || props.variant === 'success'
                ? 'var(--clr-white)'
                : 'var(--clr-dark)'};
    }

    &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }
`

export const Card = styled.div`
    ${props => props.text && `text-align: ${props.text};`}
    box-shadow: 0 0.1rem 0.2rem rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    padding: 1rem;
`

Card.Title = styled.h3``

Card.Description = styled.p``

Card.Link = styled.a``

export const Form = styled.form`
    border-radius: 5px;
    padding: 1.5rem;
    border: 1px solid var(--clr-grey-100);
`

Form.Title = styled.h3`
    margin-bottom: 1em;
    padding-bottom: 1em;
    border-bottom: 1px solid var(--clr-grey-100);
`

Form.Group = styled.div`
    margin-bottom: 1rem;
`

Form.Label = styled.label`
    display: block;
    margin-bottom: 0.25rem;
`

Form.Input = styled.input`
    display: block;
    width: 100%;
    font-size: 0.92rem;
    padding: 0.75rem;
    border-radius: 5px;
    border: 1px solid var(--clr-grey-200);

    &[type='file'] {
        border: 0;
        padding: 0;
        border-radius: 0;
    }
`

Form.Error = styled.p`
    margin-top: 0.5rem;
    color: var(--clr-danger);
    font-size: 0.8rem;
`

Form.Textarea = styled.textarea`
    display: block;
    width: 100%;
    font-size: 0.95rem;
    font-family: inherit;
    padding: 0.75rem;
    border-radius: 5px;
    border: 1px solid var(--clr-grey-200);
    resize: vertical;
`

export const UserForm = styled(Form)`
    border-radius: 0.5rem;
    padding: 2rem;
    box-shadow: 0 0.5rem 0.75rem rgba(0, 0, 0, 0.35);
    width: 400px;
    max-width: 100%;
`

UserForm.Title = styled.h2`
    margin-bottom: 1rem;
`

UserForm.Group = styled(Form.Group)`
    margin-bottom: 1.25rem;
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

UserForm.Error = styled.p`
    margin-top: 0.5rem;
    color: var(--clr-danger);
    font-size: 0.8rem;
`

export const Table = styled.table`
    border-radius: 5px;
    overflow: hidden;
    width: 100%;
    border-collapse: collapse;

    td {
        padding: 0.5rem;
    }
`

Table.Head = styled.thead`
    font-weight: bold;
    font-size: 1.1rem;
    padding: 0.5em 0;
    background-color: var(--clr-primary);
    color: var(--clr-white);
`

Table.Body = styled.tbody`
    tr:nth-child(even) {
        background-color: var(--clr-grey-100);
    }

    tr {
        transition: background-color 200ms ease;

        &:hover {
            background-color: var(--clr-grey-200);
        }
    }
`

export const News = styled(Card)`
    width: 100%;
    border-bottom: 1px solid var(--clr-grey-100);
    padding-bottom: 0.75rem;
    margin-bottom: 1rem;
`

News.Published = styled.p`
    font-size: 0.85rem;
    margin-bottom: 0.5em;
    color: var(--clr-grey-300);
`

News.Title = styled.h3`
    margin-bottom: 0.75rem;
`

News.Content = styled.p`
    margin-bottom: 1rem;
`
