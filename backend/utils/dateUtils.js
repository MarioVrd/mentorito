import validator from 'validator'

export const isValidDeadline = deadlineStr => {
    try {
        if (
            deadlineStr === '' ||
            (typeof deadlineStr === 'string' && validator.isAfter(deadlineStr))
        ) {
            return true
        }

        return false
    } catch {
        return false
    }
}
