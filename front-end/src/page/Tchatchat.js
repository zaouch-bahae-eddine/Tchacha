import React from 'react'
import { useAuth } from '../Auth/AuthProvider'

function Tchatchat() {
    const auth = useAuth();
    return (
        <div>
            Tchatchat <button onClick={(e) =>{e.preventDefault(); auth.logout(); }}>Log out</button>
        </div>
    )
}

export default Tchatchat
