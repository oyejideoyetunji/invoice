import React, { createContext, FC, ReactNode, useEffect, useState } from 'react'
import { AuthData, AuthUser } from '../../lib/types'
import { getStoreData, StoreKey } from '../../store/user'

export const defaultAuthData: AuthData = {
    user_data: null,
    token: null,
}
export const AuthContext = createContext<AuthData>(defaultAuthData)

interface AuthContextWrapperProps {
    children: ReactNode
}

const AuthContextWrapper: FC<AuthContextWrapperProps> = (
    props: AuthContextWrapperProps
) => {
    const [authenticatedUser, setAuthenticatedUser] = useState<AuthUser | null>(
        null
    )
    const [authToken, setAuthToken] = useState<string | null>(null)

    useEffect(() => {
        setAuthenticatedUser(getStoreData<AuthUser>(StoreKey.USER))
        setAuthToken(getStoreData<string>(StoreKey.TOKEN))
    })

    return (
        <AuthContext.Provider
            value={{ user_data: authenticatedUser, token: authToken }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextWrapper
