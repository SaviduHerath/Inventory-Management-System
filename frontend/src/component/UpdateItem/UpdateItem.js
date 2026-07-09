import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'


function UpdateItem() {
  const {id} = useParams();
  const [inventory, setInventory] = useState({
    itemName: '',
    itemCategory: '',
    itemDetails: '',
    itemImage: null
  });

  useEffect(() => {
    const loadItem = async () => {
      const result = await axios.get(`http://localhost:8080/inventory/${id}`);
      const itemData = result.data;

      setInventory({
        itemName: itemData.itemName,
        itemCategory: itemData.itemCategory,
        itemDetails: itemData.itemDetails,
        itemImage: null
      });
    };

    loadItem();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'itemImage' && files && files.length > 0) {
      setInventory(prevState => ({
        ...prevState,
        itemImage: files[0]
      }));
    } else {
      setInventory(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      let imageName = null;
      
      // Upload image first if a new file is selected
      if (inventory.itemImage && inventory.itemImage instanceof File) {
        const formData = new FormData();
        formData.append("file", inventory.itemImage);
        
        const uploadResponse = await axios.post(
          "http://localhost:8080/inventory/itemImg",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        imageName = uploadResponse.data;
      }
      
      // Update inventory item
      const updatedItem = {
        itemName: inventory.itemName,
        itemCategory: inventory.itemCategory,
        itemDetails: inventory.itemDetails,
        itemImage: imageName || inventory.itemImage // Use new image if uploaded, otherwise keep existing
      };
      
      await axios.put(`http://localhost:8080/inventory/${id}`, updatedItem);
      alert("Item updated successfully!");
      window.location.href = "/";
    } catch (error) {
      console.error("Error updating item:", error);
      alert("Failed to update item.");
    }
  };

  return (
    <div className="container mt-5">

      <h2>Add Inventory Item</h2>

      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <label>Item Name</label>

          <input
            type="text"
            className="form-control"
            name="itemName"
            value={inventory.itemName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Category</label>

          <select
            className="form-select"
            name="itemCategory"
            value={inventory.itemCategory}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Books">Books</option>
            <option value="Home & Kitchen">Home & Kitchen</option>
          </select>

        </div>

        <div className="mb-3">

          <label>Item Details</label>

          <textarea
            className="form-control"
            rows="4"
            name="itemDetails"
            value={inventory.itemDetails}
            onChange={handleChange}
            required
          />

        </div>

        <div className="mb-3">

          <label>Item Image</label>

          <input
            type="file"
            className="form-control"
            name="itemImage"
            accept="image/*"
            onChange={handleChange}
          />

        </div>

        <button className="btn btn-primary">
          Save Item
        </button>

      </form>

    </div>
  )
}

export default UpdateItem