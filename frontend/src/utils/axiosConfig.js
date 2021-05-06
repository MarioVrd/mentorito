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

export const getAuthorizedFormConfig = token => {
    return {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
        }
    }
}
