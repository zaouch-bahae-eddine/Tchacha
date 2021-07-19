import React, { Fragment } from 'react'
import { Redirect, useParams } from 'react-router-dom';
import { useAuth } from '../Auth/AuthProvider'

function Tchatchat() {
    const auth = useAuth();
    const { id } = useParams();
    return (
        <Fragment>
            {
                auth.user != null ?
                    <button onClick={(e) => { e.preventDefault(); auth.logout(); }}>Log out</button>
                    : <Redirect to="/" />
            }
        </Fragment>
    )
}

export default Tchatchat
