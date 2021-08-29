import isStrongPassword from 'validator/lib/isStrongPassword'
import { pwdConfig } from '../constants/passwordConfig'

export const isRequired = string => typeof string === 'string' && string.length > 0
export const isValidPassword = password => isStrongPassword(password, pwdConfig)

export const firstNameMsg = 'Ime je obavezno'
export const lastNameMsg = 'Prezime je obavezno'
export const emailMsg = 'Email mora biti u obliku xxx@yyy.zzz'
export const passwordMsg = `Lozinka mora imati barem ${pwdConfig.minLength} znakova od kojih barem ${pwdConfig.minLowercase} malo, ${pwdConfig.minUppercase} veliko slovo i ${pwdConfig.minNumbers} broj`
