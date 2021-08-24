import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import path from 'path'

import userRoutes from './routes/userRoutes.js'
import courseRoutes from './routes/courseRoutes.js'
import newsRoutes from './routes/newsRoutes.js'
import exerciseRoutes from './routes/exerciseRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'

dotenv.config()

const app = express()

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use(express.json())

// Routes
app.use('/api/users', userRoutes)
app.use('/api/courses', courseRoutes)
app.use('/api/news', newsRoutes)
app.use('/api/exercises', exerciseRoutes)
app.use('/api/upload', uploadRoutes)

const __dirname = path.resolve('..')
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

// 404 Not found fallback
app.use(notFound)

// General error handler middleware
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
    PORT,
    console.log(`Poslužitelj pokrenut u ${process.env.NODE_ENV} načinu rada na portu ${PORT}`)
)
