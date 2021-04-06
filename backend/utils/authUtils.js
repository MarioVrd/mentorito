import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

const { genSalt, hash, compare } = bcryptjs

export const encrypt = async strToEncrypt => {
	const salt = await genSalt()
	const hashed = await hash(strToEncrypt, salt)

	return hashed
}

export const comparePassword = async (password, hashedPassword) => {
	const result = await compare(password, hashedPassword)
	return result
}

export const generateToken = data => {
	// const {id, role} = data
	return jwt.sign(data, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN || '1d'
	})
}
