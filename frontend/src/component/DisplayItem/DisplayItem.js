import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './DisplayItem.css'

function DisplayItem() {

    const [inventory, setInventory] = useState([]);
    const {id} = useParams();

    useEffect(() => {
        loadInventory();
    }, []);

    const loadInventory = async () => {
        const result = await axios.get(`http://localhost:8080/inventory`);
        setInventory(result.data);
    };

    const UpdateNavigate = (id) => {
        window.location.href = `/updateItem/${id}`;
    }

  return (
    <div className="container">
        <h1>Display Item</h1>
        <table>
            <thead>
                <tr>
                    <th>Item ID</th>
                    <th>Item Name</th>
                    <th>Category</th>
                    <th>Details</th>
                    <th>Image</th>
                </tr>
            </thead>
            <tbody>
                {inventory.map((item,index) => (
                    <tr key={index}>
                        <td>{item.id}</td>
                        <td>{item.itemName}</td>
                        <td>{item.itemCategory}</td>
                        <td>{item.itemDetails}</td>
                        <td>
                            <img src={`http://localhost:8080/upload/${item.itemImage} `} alt={item.itemName} width="100" />
                        </td>
                        <td>
                            <button onClick={() => UpdateNavigate(item.id)}>Update</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default DisplayItem