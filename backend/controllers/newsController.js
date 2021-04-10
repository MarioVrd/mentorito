import asyncHandler from 'express-async-handler'
import prisma from '../prisma/client.js'

// @desc    Fetch all news
// @route   GET /api/news
// @access  Public
export const getNews = asyncHandler(async (req, res) => {
    const news = await prisma.globalNews.findMany()

    res.json(news)
})

// @desc    Fetch news by id
// @route   GET /api/news/:id
// @access  Public
export const getNewsById = asyncHandler(async (req, res) => {
    const { id } = req.params

    const news = await prisma.globalNews.findUnique({ where: { id }, rejectOnNotFound: true })

    res.json(news)
})

// @desc    Create a news
// @route   POST /api/news
// @access  Admin
export const createNews = asyncHandler(async (req, res) => {
    const { title, content } = req.body

    const news = await prisma.globalNews.create({
        data: { title, content, adminId: req.user.id }
    })

    res.status(201).json(news)
})

// @desc    Update the news
// @route   PUT /api/news/:id
// @access  Admin
export const updateNews = asyncHandler(async (req, res) => {
    const { id } = req.params
    const { title, content } = req.body

    const updatedNews = await prisma.globalNews.update({
        data: { title, content },
        where: { id }
    })

    res.json(updatedNews)
})

// @desc    Delete the news
// @route   DELETE /api/news/:id
// @access  Admin
export const deleteNews = asyncHandler(async (req, res) => {
    const { id } = req.params

    const deletedNews = await prisma.globalNews.delete({ where: { id } })

    res.json({ message: `Successfully deleted ${deletedNews.title}` })
})
