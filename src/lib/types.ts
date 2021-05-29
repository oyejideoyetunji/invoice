export interface AuthUser {
    firstName: string
    lastName: string
    email: string
    id: string
}

export interface AuthData {
    token: string | null
    user_data: AuthUser | null
    message?: string
}

export interface SignUpData {
    firstName: string
    lastName: string
    email: string
    password: string
}

export interface LoginData {
    email: string
    password: string
}

export enum StoreKey {
    USER = 'current_user',
    TOKEN = 'token',
    Theme = 'theme',
}
