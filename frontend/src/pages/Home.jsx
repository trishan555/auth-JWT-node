import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <>
            <div>Home</div>
            <Link to={'/another'}>
                <button>Go to next</button>
            </Link>
        </>
    )
}

export default Home
