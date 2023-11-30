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
	})

export const loginUserSchema = z.object({
	email: z.string({ required_error: EMAIL.REQUIRED }).min(1, EMAIL.REQUIRED).email(EMAIL.INVALID),
	password: z.string({ required_error: PASSWORD.REQUIRED }).min(1, PASSWORD.REQUIRED),
})

export const forgotPasswordSchema = loginUserSchema.omit({ password: true })

export const profileSchema = z.object({
	username: z.string().min(1, USERNAME.REQUIRED).max(50, USERNAME.MAX_LENGTH),
	avatar: z.any().optional().superRefine((avatar, ctx) => {
		// if (avatar && avatar.name) {
		// 	if (!(avatar instanceof File)) {
		// 		setError(form, 'avatar', AVATAR.FILE)
		// 		return
		// 	}

		// 	if (avatar.size > 5000000) {
		// 		setError(form, 'avatar', AVATAR.SIZE)
		// 		return
		// 	}

		// 	if (avatar.type !== 'image/jpeg' && avatar.type !== 'image/png' && avatar.type !== 'image/jpg') {
		// 		setError(form, 'avatar', AVATAR.FORMAT)
		// 		return
		// 	}
		// }

		// ctx.addIssue({
		// 	path: ['username'],
		// 	code: 'custom',
		// 	message: ERROR_MESSAGES.GENERIC,
		// })
	}),
})