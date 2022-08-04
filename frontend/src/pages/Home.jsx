import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <>
            <div>Home</div>
            <Link to={'/another'}>Go to next</Link>
        </>
    )
}

export default Home
