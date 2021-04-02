import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'

import courseRoutes from './routes/courseRoutes.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'

dotenv.config()

const app = express()

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'))
}

app.use(express.json())

// Routes
app.use('/api/courses', courseRoutes)

// 404 Not found fallback
app.use(notFound)

// General error handler middleware
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))
