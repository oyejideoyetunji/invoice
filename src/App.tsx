import React, { FC } from 'react'
import AuthContextWrapper from './components/authContextWrapper'
import Navigation from './components/navigation'

const App: FC = () => {
    return (
        <AuthContextWrapper>
            <Navigation />
        </AuthContextWrapper>
    )
}

export default App
