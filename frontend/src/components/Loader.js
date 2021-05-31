import styled from 'styled-components'

const Loader = () => {
    return (
        <StyledLoader>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
        </StyledLoader>
    )
}

const StyledLoader = styled.div`
    display: flex;
    justify-content: center;
    padding: 2rem;
    height: 9rem;

    .dot {
        height: 1rem;
        width: 1rem;
        background: var(--clr-primary);
        border-radius: 50%;
        animation: bounce 350ms ease-in infinite alternate;
    }
    .dot:nth-child(2) {
        animation-delay: 100ms;
    }
    .dot:nth-child(3) {
        animation-delay: 200ms;
    }
    .dot:nth-child(4) {
        animation-delay: 300ms;
    }
    .dot + * {
        margin-left: 0.75rem;
    }
    @keyframes bounce {
        from {
            transform: translateY(0);
        }
        to {
            transform: translateY(3.5rem);
        }
    }
`

export default Loader
