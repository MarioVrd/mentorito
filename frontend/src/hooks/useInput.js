import { useEffect, useState } from 'react'

const useInput = (initialValue, validateFunction, errorMessage = 'Pogrešan unos!') => {
    const [fieldValue, setFieldValue] = useState(initialValue)
    const [error, setError] = useState(null)
    const [isTouched, setIsTouched] = useState(false)

    const resetAll = () => {
        setFieldValue(initialValue)
        setError(null)
        setIsTouched(false)
    }

    useEffect(() => {
        if (!isTouched && fieldValue.length > 0) setIsTouched(true)
    }, [fieldValue, isTouched])

    useEffect(() => {
        if (!validateFunction(fieldValue)) {
            setError(errorMessage)
        } else {
            setError(null)
        }
    }, [fieldValue, errorMessage, isTouched, validateFunction])

    return [fieldValue, setFieldValue, isTouched, error, resetAll]
}

export default useInput
