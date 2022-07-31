import { useState, useEffect } from 'react'
import axios from 'axios'

const Another = () => {
    const [data, setData] = useState('')
    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        await axios
            .get('http://localhost:3001/another')
            .then((res) => {
                setData(res.data)
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return <div>{data}</div>
}

export default Another
