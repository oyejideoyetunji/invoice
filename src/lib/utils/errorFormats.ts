export function interpreteSignUpError(message: string): string {
    const status = message.split(':')[0].trim()

    if (status === 'User validation failed') {
        return 'Error: user with the supplied email already exists'
    } else {
        return message
    }
}
