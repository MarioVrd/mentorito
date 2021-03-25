import bcryptjs from 'bcryptjs'
const { genSalt, hash } = bcryptjs

export const encrypt = async strToEncrypt => {
	const salt = await genSalt()
	const hashed = await hash(strToEncrypt, salt)

	return hashed
}
