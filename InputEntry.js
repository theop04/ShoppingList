import React, {useState} from "react";

const InputEntry = () => {

    const [entry_name, setEntryName] = useState("");
    const [quantity, setQuantity] = useState(1);

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = { entry_name, quantity };
            const response = await fetch("http://localhost:5000/entries", { 
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            window.location = "/";
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <div>
            <h1 className="text-center mt-5">My Shopping List</h1>
            <form className="d-flex mt-5" onSubmit={onSubmitForm}>
                <input 
                    type="text" 
                    className="form-control"
                    value ={entry_name}
                    onChange={e => setEntryName(e.target.value)}
                />
                <input 
                    type="number" 
                    className="form-control" 
                    placeholder="Qty" 
                    min="1" 
                    value = {quantity}
                    onChange={e => setQuantity(Number(e.target.value))}
                    style={{ width: '80px' }}
                />
                <button className="btn btn-success">Add</button>
            </form>
        </div>
    );
};

export default InputEntry;
