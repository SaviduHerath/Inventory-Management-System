import React, { useState } from "react";
import axios from "axios";

function ItemAdd() {

  const [inventory, setInventory] = useState({
    itemImage: null,
    itemName: "",
    itemCategory: "",
    itemDetails: "",
  });

  const handleChange = (e) => {

    if (e.target.name === "itemImage") {
      setInventory({
        ...inventory,
        itemImage: e.target.files[0],
      });
    } else {
      setInventory({
        ...inventory,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      // Upload Image
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

      // Backend returns filename only
      const imageName = uploadResponse.data;

      // Save Inventory
      const item = {
        itemImage: imageName,
        itemName: inventory.itemName,
        itemCategory: inventory.itemCategory,
        itemDetails: inventory.itemDetails,
      };

      await axios.post("http://localhost:8080/inventory", item);

      alert("Item Added Successfully");

      window.location.href = "/";

    } catch (err) {
      console.log(err);
      alert("Error");
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
            required
          />

        </div>

        <button className="btn btn-primary">
          Save Item
        </button>

      </form>

    </div>
  );
}

export default ItemAdd;