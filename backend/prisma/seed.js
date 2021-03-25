import { users, courses } from './seedData.js'
import prismaPkg from '@prisma/client'

const { PrismaClient } = prismaPkg
const prisma = new PrismaClient()

const seed = async () => {
	for (let user of users) {
		await prisma.user.upsert({
			where: { email: user.email },
			update: {},
			create: user
		})
	}

	// Insert courses
	for (let course of courses) {
		await prisma.course.create({ data: course })
	}
}

seed()
	.catch(e => {
		console.error(e)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
