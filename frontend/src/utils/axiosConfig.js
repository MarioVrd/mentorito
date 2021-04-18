export const contentTypeJson = {
    headers: {
        'Content-Type': 'application/json'
    }
}

export const getAuthorizedJsonConfig = token => {
    return {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    }
}
