import React, { useEffect, useState } from "react";

import EditEntry from "./EditEntry";

const ListEntries = () => {
  const [entries, setEntries] = useState([]);


  //delete entry function

  const deleteEntry = async (id) => {
    try {
        const deleteEntry = await fetch(`http://localhost:5000/entries/${id}`, {
            method: "DELETE"
        });
        setEntries(entries.filter(entry => entry.entry_id !== id));
    } catch (err) {
        console.error(err.message);
    }
  }


  const getEntries = async () => {
    try {
      const response = await fetch("http://localhost:5000/entries");
      const jsonData = await response.json();
      setEntries(jsonData);
    } catch (err) {
        console.error(err.message);
    }
  };

  useEffect(() => {
    getEntries();
  }, []);

  return (
    <div>
      <h1 className="text-center mt-5"></h1>
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Quantity</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {entries.map(entry => (
            <tr key={entry.entry_id}>
              <td>{entry.entry_name}</td>
              <td>{entry.quantity}</td>
              <td>
                <EditEntry entry={entry}/>
              </td>
              <td>
                <button className="btn btn-danger" onClick={() => deleteEntry(entry.entry_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListEntries;
