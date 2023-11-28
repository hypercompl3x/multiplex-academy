export const ERROR_MESSAGES = {
	AUTH: {
		USERNAME: {
			REQUIRED: 'Username is required',
			MAX_LENGTH: 'Username must be less than 50 characters',
			UNIQUE: 'Username must be unique',
		},
		EMAIL: {
			REQUIRED: 'Email is required',
			MAX_LENGTH: 'Email must be less than 50 characters',
			INVALID: 'Invalid email',
			NOT_FOUND: 'An account with this email does not exist',
			UNIQUE: 'Email must be unique',
		},
		PASSWORD: {
			REQUIRED: 'Password is required',
			MIN_LENGTH: 'Password must be at least 8 characters',
			MAX_LENGTH: 'Password must be less than 50 characters',
			MATCH: 'Passwords must match',
			SPECIAL: 'Password must contain at least 1 special character',
		},
		INVALID_CREDENTIALS: 'Invalid email or password',
	},
	GENERIC: 'An unexpected error has occured',
}

