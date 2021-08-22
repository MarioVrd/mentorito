import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Pagination = ({ numOfPages, currentPage }) => {
    const location = useLocation()

    return numOfPages === currentPage ? (
        <Link to={`${location.pathname}?page=${currentPage - 1}`}>Prethodna stranica</Link>
    ) : currentPage === 1 ? (
        <Link to={`${location.pathname}?page=${currentPage + 1}`}>Sljedeća stranica</Link>
    ) : (
        <SpaceBetween>
            <Link to={`${location.pathname}?page=${currentPage - 1}`}>Prethodna stranica</Link>
            <Link to={`${location.pathname}?page=${currentPage + 1}`}>Sljedeća stranica</Link>
        </SpaceBetween>
    )
}

const SpaceBetween = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`

Pagination.propTypes = {
    numOfPages: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired
}

export default Pagination
