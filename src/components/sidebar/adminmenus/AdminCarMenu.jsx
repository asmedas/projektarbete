import React, {useState} from 'react'

export default function AdminCarMenu({onSelectContent}){
    const [carsOpen, setCarsOpen] = useState(false);

    if(carsOpen){
        return(
        <>
            <button onClick={() => setCarsOpen(!carsOpen)}>
            Cars {carsOpen ? "▲" : "▼"}
            </button>

            <div className="submenu">
                <button onClick={() => onSelectContent("AdminViewCars")}>View cars</button>
                <button onClick={() => onSelectContent("AddCar")}>Add car</button>
                <button onClick={() => onSelectContent("UpdateCar")}>Update car</button>
                <button onClick={() => onSelectContent("ReturnCar")}>Return car</button>
                <button onClick={() => onSelectContent("DeleteCar")}>Delete car</button>
            </div>
        </>
        )
        
    }
    if(!carsOpen){
        return(
            <button onClick={() => setCarsOpen(!carsOpen)}>
            Cars {carsOpen ? "▲" : "▼"}
            </button>
        )
    }
}