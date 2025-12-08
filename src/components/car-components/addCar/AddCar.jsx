import React, {useState} from "react";
import { useAuth } from "../../auth/AuthProvider";

export default function AddCar(){
    const {authFetch, auth} = useAuth();
    const [name, setName] = useState("");
    const [model, setModel] = useState("");
    const [feature1, setFeature1] = useState("");
    const [feature2, setFeature2] = useState("");
    const [feature3, setFeature3] = useState("");
    const [type, setType] = useState("");
    const [price, setPrice] = useState(0);
    const [booked, setBooked] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);


    const handleOnPaste = (e) => {
        console.log("paste fired");

        const items = [...e.clipboardData.items];
        console.log("clipboard items:", items);

        items.forEach((item, idx) => {
            console.log(`item[${idx}] type:`, item.type);
        });

        const imageItem = items.find(i => i.type.startsWith("image/"));
        if (!imageItem) {
            console.log("No image/* item in clipboard");
            return;
        }

        const file = imageItem.getAsFile();
        console.log("Got file:", file);
        setImageFile(file);
        setPreviewUrl(URL.createObjectURL(file));
    };




    async function handleSubmit(e){
        e.preventDefault();
        const formData = new FormData();

        if(name ===""){
            alert("Brand is required");
            return;
        }
        formData.append("name", name);
        if(model ===""){
            alert("Model is required");
            return;
        }
        formData.append("model", model);

        formData.append("feature1", feature1);
        formData.append("feature2", feature2);
        formData.append("feature3", feature3);

        if(type ===""){
            alert("Type is required");
            return;
        }
        if(type.length > 20){
            alert("Type can't be longer than 20 characters");
            return;
        }
        formData.append("type", type);
        if(price <= 0){
            alert("Price must be greater than 0");
            return;
        }
        formData.append("price", price);
        formData.append("booked", booked);

        if (imageFile) {
        formData.append("image", imageFile);
        }

        try {
            const response = await authFetch("http://localhost:8080/api/v1/cars", {
                method: "POST",
                body: formData,
            })
            if (!response.ok) {
            throw new Error("Failed to add car");
            }
            alert("Car added successfully");
            setName("");
            setModel("");
            setFeature1("");
            setFeature2("");
            setFeature3("");
            setType("");
            setPrice(0);
            setBooked(false);

        } catch (error) {
            console.error("Error adding car:", error);
        }
    }

    return(
        <div className="form">
            <h1>Add New Car</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Brand:</label>
                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                <label htmlFor="model">Model:</label>
                <input type="text" id="model" value={model} onChange={(e) => setModel(e.target.value)} required />
                <label htmlFor="feature1">Feature 1:</label>
                <input type="text" id="feature1" value={feature1} onChange={(e) => setFeature1(e.target.value)} />
                <label htmlFor="feature2">Feature 2:</label>
                <input type="text" id="feature2" value={feature2} onChange={(e) => setFeature2(e.target.value)} />
                <label htmlFor="feature3">Feature 3:</label>
                <input type="text" id="feature3" value={feature3} onChange={(e) => setFeature3(e.target.value)} />
                <label htmlFor="type">Type:</label>
                <input type="text" id="type" value={type} onChange={(e) => setType(e.target.value)} required />
                <label htmlFor="price">Price per day:</label>
                <input type="number" id="price" value={price} onChange={(e) => setPrice(parseFloat(e.target.value))} required />
                <label htmlFor="booked">Booked:</label>
                <input type="checkbox" id="booked" checked={booked} onChange={(e) => setBooked(e.target.checked)} />
                <div
                    onPaste={handleOnPaste}
                    style={{ border: "1px dashed gray", padding: "10px" }}>
                    Paste image here (Ctrl+V)
                </div> {previewUrl === null && <br />}
                {previewUrl && (
                    <>
                        <div style={{ marginTop: "10px" }}>
                            <p>Preview:</p>
                            <img 
                                src={previewUrl} 
                                alt="preview" 
                                style={{ maxWidth: "300px", border: "1px solid #ccc" }} 
                            />
                        </div><br />
                        </>)
                }
                <button type="submit">Add Car</button>
            </form>
        </div>
    )
}