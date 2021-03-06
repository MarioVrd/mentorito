import asyncHandler from 'express-async-handler'
import prisma from '../prisma/client.js'

// @desc    Fetch news by page and size (if not specified, default page is 1 and size is 10)
// @route   GET /api/news
// @access  Public
export const getNews = asyncHandler(async (req, res) => {
    let { page = 1, size = 10 } = req.query

    page = parseInt(page) - 1
    size = parseInt(size)

    const numOfRecords = await prisma.globalNews.count()
    const numOfPages = Math.ceil(numOfRecords / size)

    if (numOfRecords === 0) {
        res.status(204)
        throw new Error('Trenutno nema novosti.')
    }

    if (page < 0 || page > numOfPages - 1)
        throw new Error(`Nepravilan zahtjev! Stranica mora biti između 1 i ${numOfPages}`)

    const news = await prisma.globalNews.findMany({
        include: { admin: { select: { firstName: true, lastName: true } } },
        orderBy: { createdAt: 'desc' },
        skip: page * size,
        take: size
    })

    res.json({ news, numOfPages })
})

// @desc    Fetch news by id
// @route   GET /api/news/:id
// @access  Public
export const getNewsById = asyncHandler(async (req, res) => {
    const { id } = req.params

    const news = await prisma.globalNews.findUnique({
        where: { id },
        include: { admin: { select: { firstName: true, lastName: true } } }
    })

    if (!news) {
        res.status(404)
        throw new Error('Nije pronađena odabrana obavijest')
    }

    res.json(news)
})

// @desc    Create a news
// @route   POST /api/news
// @access  Admin
export const createNews = asyncHandler(async (req, res) => {
    const { title, content } = req.body

    if (!title || !content) {
        res.status(400)
        throw new Error('Nepravilan zahtjev! Naslov i sadržaj su obavezni.')
    }

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

    if (!title || !content) {
        res.status(400)
        throw new Error('Nepravilan zahtjev! Naslov i sadržaj su obavezni.')
    }

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

    res.json({ message: `Uspješno obrisana obavijest ${deletedNews.title}` })
})
