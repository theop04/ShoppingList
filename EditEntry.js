import React, { useState } from "react";

const EditEntry = ({ entry }) => {
    const [entry_name, setEntryName] = useState(entry.entry_name)
    const [quantity, setQuantity] = useState(entry.quantity)

    //edit entry_name and/or quantity

    const updateEntry = async (e) => {
        e.preventDefault();
        try {
            const body = { entry_name, quantity};
            const response = await fetch(`http://localhost:5000/entries/${entry.entry_id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            window.location = "/";
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <>
        <button type="button" className="btn btn-warning" data-toggle="modal" data-target={`#id${entry.entry_id}`}>
          Edit
        </button>

        <div 
            className="modal" 
            id={`id${entry.entry_id}`} 
            onClick={() => { 
                    setEntryName(entry.entry_name); 
                    setQuantity(entry.quantity); 
            }}>
          <div className="modal-dialog">
            <div className="modal-content">
        
              <div className="modal-header">
                <h4 className="modal-title">Edit Item</h4>
                <button type="button" className="close" data-dismiss="modal" onClick={() => { 
                    setEntryName(entry.entry_name); 
                    setQuantity(entry.quantity); 
                }}>
                &times;
                </button>
              </div>
        
              <div className="modal-body">
                <input type='text' className="form-control" value={entry_name} onChange={e => 
                    setEntryName(e.target.value)}/>
                <input type='number' className="form-control" value={quantity} onChange={e => 
                    setQuantity(e.target.value)}/>
              </div>

              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-warning" 
                  data-dismiss="modal"
                  onClick = {e => updateEntry(e)}
                >
                    Edit
                </button>
                <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => { 
                    setEntryName(entry.entry_name); 
                    setQuantity(entry.quantity); 
                }}>
                    Close
                </button>
              </div>
        
            </div>
          </div>
        </div></>
    );
};

export default EditEntry;