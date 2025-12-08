import React, { useState, useEffect } from "react";
import { useAuth } from "../../auth/AuthProvider";

export default function UpdateCar({carId, onSelectContent}) {
    const {authFetch} = useAuth();
    const [formData, setFormData] = useState({
        name: "",
        model: "",
        feature1: "",
        feature2: "",
        feature3: "",
        type: "",
        price: 0,
        booked: false,
        image: null
    });

    function handleChange(e){
        const {name, value} = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    useEffect(() => {
        const loadCarData = async () => {
            try {
                const response = await authFetch(`http://localhost:8080/api/v1/cars/${carId}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch car data");
                }
                const data = await response.json();
                setFormData({
                    name: data.name || "",
                    model: data.model || "",
                    feature1: data.feature1 || "",
                    feature2: data.feature2 || "",
                    feature3: data.feature3 || "",
                    type: data.type || "",
                    price: data.price || 0,
                    booked: data.booked || false,
                    image: null
                });
            } catch (error) {
                console.error("Couldn't load car data", error);
            }
        };

        loadCarData();
    }, [carId, authFetch]);
    async function handleSubmit(e){
        e.preventDefault();
        try{
            const response = await authFetch(`http://localhost:8080/api/v1/cars/${carId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
            if(!response.ok){
                throw new Error("Failed to update car");
            }
            alert("Car updated successfully");
            onSelectContent("AdminViewCars");
        } catch (error) {
            console.error("Couldn't update car", error);
            alert("Failed to update car");
        }
    }
    return(
        <form className="form" onSubmit={handleSubmit}>
            <h2>Update Car ID: {carId}</h2>
            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
            <input type="text" name="model" placeholder="Model" value={formData.model} onChange={handleChange} required />
            <input type="text" name="feature1" placeholder="Feature 1" value={formData.feature1} onChange={handleChange} />
            <input type="text" name="feature2" placeholder="Feature 2" value={formData.feature2} onChange={handleChange} />
            <input type="text" name="feature3" placeholder="Feature 3" value={formData.feature3} onChange={handleChange} />
            <input type="text" name="type" placeholder="Type" value={formData.type} onChange={handleChange} required />
            <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
            <input type="checkbox" name="booked" checked={formData.booked} 
            onChange={(e) => setFormData(prevData => ({...prevData, booked: e.target.checked}))} /> Booked<br /><br />
            <button type="submit">Update car</button>
        </form>
    )
}