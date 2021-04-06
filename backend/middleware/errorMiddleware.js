import contains from 'validator/lib/contains.js'

export const notFound = (req, res, next) => {
	const error = new Error(`Not found - ${req.originalUrl}`)
	res.status(404)
	next(error)
}

export const errorHandler = (err, req, res, next) => {
	let statusCode = res.statusCode === 200 ? 500 : res.statusCode

	if (contains(err.message, 'invalid', { ignoreCase: true })) {
		statusCode = 400
	} else if (err.name === 'NotFoundError') {
		statusCode = 404
	}

	res.status(statusCode)

	res.json({
		message: err.name === 'TypeError' ? 'Something went wrong' : err.message,
		stack: process.env.NODE_ENV === 'production' ? null : err.stack
	})
}
