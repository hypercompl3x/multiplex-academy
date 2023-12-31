import { z } from 'zod'
import { ERROR_MESSAGES } from '$lib/constants/constants'

const passwordRegex = /^(?=.*[!@#$%^&*])/

const { EMAIL, PASSWORD, USERNAME } = ERROR_MESSAGES.AUTH

export const registerUserSchema = z
	.object({
		username: z.string().min(1, USERNAME.REQUIRED).max(50, USERNAME.MAX_LENGTH),
		email: z.string().min(1, EMAIL.REQUIRED).max(50, EMAIL.MAX_LENGTH).email(EMAIL.INVALID),
		password: z
			.string()
			.min(1, PASSWORD.REQUIRED)
			.min(8, PASSWORD.MIN_LENGTH)
			.max(50, PASSWORD.MAX_LENGTH)
			.regex(passwordRegex, PASSWORD.SPECIAL),
		passwordConfirm: z
			.string()
			.min(1, PASSWORD.REQUIRED)
	}).refine(data => data.password === data.passwordConfirm, {
		message: PASSWORD.MATCH,
		path: ["password"]
	})

export const loginUserSchema = z.object({
	email: z.string({ required_error: EMAIL.REQUIRED }).min(1, EMAIL.REQUIRED).email(EMAIL.INVALID),
	password: z.string({ required_error: PASSWORD.REQUIRED }).min(1, PASSWORD.REQUIRED),
})

export const forgotPasswordSchema = loginUserSchema.omit({ password: true })

const fileExistsOptions = ["yes", "no"] as const

export const profileSchema = z.object({
	username: z.string().min(1, USERNAME.REQUIRED).max(50, USERNAME.MAX_LENGTH),
	fileExists: z.enum(fileExistsOptions)
})

export const accountSchema = loginUserSchema.omit({ password: true })

export const securitySchema = z
	.object({
		oldPassword: z
		.string()
		.min(1, PASSWORD.REQUIRED),
		password: z
			.string()
			.min(1, PASSWORD.REQUIRED)
			.min(8, PASSWORD.MIN_LENGTH)
			.max(50, PASSWORD.MAX_LENGTH)
			.regex(passwordRegex, PASSWORD.SPECIAL),
		passwordConfirm: z
			.string()
			.min(1, PASSWORD.REQUIRED)
	}).refine(data => data.password === data.passwordConfirm, {
		message: PASSWORD.MATCH,
		path: ["password"]
	})

