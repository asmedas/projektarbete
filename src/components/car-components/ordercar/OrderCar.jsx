import React, {useState} from 'react'

export default function OrderCar({carId}){
    const [userId, setUserId] = useState("")

    const handleUserIdInput = (e) => setUserId(e.target.value)
    const handleSubmit = () => {

    }
    return (
        <div className='form'>
            <h1>Order car - submit details</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="UserId">UserId</label><br />
                <input type="text" name="UserId" id="UserId" value={userId} onChange={handleUserIdInput}/><br />
                <label htmlFor="date">Date from</label><br />
                <input type="date"/><br />
                <label htmlFor="date">Date to</label><br />
                <input type="date"/><br /><br />
                <button type='submit'>Order</button>
            </form>
        </div>
    )
}