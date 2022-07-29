import { useState } from 'react'
import axios from 'axios'

const Signup = () => {
    const [user, setUser] = useState(null)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('http://localhost:3001/signup', {
                email,
                password,
            })
            console.log(res.data)
            setUser(res.data)
        } catch (err) {
            if (err.response.data[0].email === '') {
                setErrors(err.response.data[0].password)
            } else {
                setErrors(err.response.data[0].email)
            }
            console.log(err.response.data[0])
        }
    }

    return (
        <form className='signup' onSubmit={handleSubmit}>
            <h3>Sign Up</h3>
            {errors && <div className='error'>{errors}</div>}
            <label>Email address:</label>
            <input
                type='email'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <label>Password:</label>
            <input
                type='password'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />

            <button>Sign up</button>
        </form>
    )
}

export default Signup
