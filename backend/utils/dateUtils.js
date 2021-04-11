import validator from 'validator'

export const isValidDeadline = deadlineStr => {
    if (deadlineStr && typeof deadlineStr === 'string' && validator.isAfter(deadlineStr))
        return true

    return false
}
