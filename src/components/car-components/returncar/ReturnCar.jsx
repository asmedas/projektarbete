import React, {useState} from 'react'
import AdminViewCars from '../AdminViewCars'
import { useAuth } from '../../auth/AuthProvider'
import './returncar.css'

export default function ReturnCar(){
    const {auth, authFetch} = useAuth()
    const [id, setId] = useState(0)

    async function handleSubmit(e) {
        e.preventDefault()
        if(auth.isAdmin){
            const response = await authFetch(`http://localhost:8080/api/v1/bookings/return/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if(!response){
                alert("failed to return car")
                return
            }
            alert("car returned")

        }
    }

    return(
        <div className='returncar'>
          <AdminViewCars setId={setId}/>
          <form className='form' onSubmit={handleSubmit}>
            <label htmlFor="id">Selected ID: {id} </label>
            <button type="submit">Return</button>
          </form>
        </div>
        
    )
}