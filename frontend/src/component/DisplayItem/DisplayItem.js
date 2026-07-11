import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './DisplayItem.css'
import jspdf from 'jspdf';
import autotable from 'jspdf-autotable';

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

    const DeleteNavigate = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this item?");
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:8080/inventory/${id}`);
                alert("Item deleted successfully!");
                loadInventory(); // Refresh the list after deletion
            
            }catch (error) {
                console.error("Error deleting item:", error);
                alert("Failed to delete the item. Please try again.");
            }
        }
    }

    //PDF Generation
    const generatePDF = (inventory)=> {
        const doc = new jspdf();
        doc.text("Inventory List", 14, 10);
        const tableData = inventory.map(item => [item.id, item.itemName, item.itemCategory, item.itemDetails]);
        autotable(doc, {
            head: [['ID', 'Item Name', 'Category', 'Details']],
            body: tableData,
            startY: 20,
        });
        doc.save('inventory_Items.pdf');
    }

  return (
    <div className="container">
        <h1>Display Item</h1>
        <button onClick={() => generatePDF(inventory)}>Generate PDF</button>
        <br/><br/>
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
                         <td>
                            <button onClick={() => DeleteNavigate(item.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default DisplayItem