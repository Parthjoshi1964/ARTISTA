import React, { useState } from "react";
import { Link } from "react-router-dom";
import './NewArrivalNotification.css';

import myImage from './shop/adam.jpg';
import myImage1 from './shop/garden.jpg';
import myImage2 from './shop/jesus.jpg';
import myImage3 from './shop/monalisa.jpg';
import myImage4 from './shop/supper.jpg';
import myImage5 from './shop/tower.jpg';

function Newarrivalnotification() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [images, setImages] = useState([
    { src: myImage, alt: "Adam", artist: "Leonardo da Vinci", date: "1503 to 1519", where: "Louvre Museum (Paris)", time: new Date(), price: 250 },
    { src: myImage1, alt: "Garden", artist: "Pablo Picasso", date: "1937", where: "Museo Reina Sofía (Madrid)", time: new Date(), price: 3000 },
    { src: myImage2, alt: "Jesus", artist: "Diego Velázquez", date: "1656", where: "Museo del Prado (Madrid)", time: new Date(), price: 2000 },
    { src: myImage3, alt: "Monalisa", artist: "Vincent van Gogh", date: "1889", where: "Museum of Modern Art (New York City)", time: new Date(), price: 1500 },
    { src: myImage4, alt: "Supper", artist: "Leonardo da Vinci", date: "1503 to 1519", where: "Louvre Museum (Paris)", time: new Date(), price: 2500 },
    { src: myImage5, alt: "Tower", artist: "Leonardo da Vinci", date: "1503 to 1519", where: "Louvre Museum (Paris)", time: new Date(), price: 2000 },
  ]);
  const [deletedImages, setDeletedImages] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [totalBill, setTotalBill] = useState(0);
  const [editIndex, setEditIndex] = useState(-1);
  const [editedArtist, setEditedArtist] = useState("");
  const [editedDate, setEditedDate] = useState("");
  const [editedWhere, setEditedWhere] = useState("");
  const [editedPrice, setEditedPrice] = useState(0);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [name, setName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = function(event) {
        const uploadedImage = event.target.result;
        setImages([...images, { src: uploadedImage, alt: "Uploaded Image", time: new Date() }]);
      };
      reader.readAsDataURL(selectedFile);
      setSelectedFile(null);
    } else {
      console.log("Please select a file.");
    }
  };

  const handleDelete = (index) => {
    const deletedImage = images[index];
    setDeletedImages([...deletedImages, deletedImage]);

    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    const image = images[index];
    setEditedArtist(image.artist);
    setEditedDate(image.date);
    setEditedWhere(image.where);
    setEditedPrice(image.price);
  };

  const handleSaveEdit = () => {
    const updatedImages = [...images];
    updatedImages[editIndex] = {
      ...updatedImages[editIndex],
      artist: editedArtist,
      date: editedDate,
      where: editedWhere,
      price: editedPrice
    };
    setImages(updatedImages);
    setEditIndex(-1);
  };

  const handleCancelEdit = () => {
    setEditIndex(-1);
  };

  const handleAddToCart = (index) => {
    const selectedImage = images[index];
    const existingItem = cartItems.find((item) => item.alt === selectedImage.alt);

    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.alt === selectedImage.alt
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...selectedImage, quantity: 1 }]);
    }
    
    const updatedTotalBill = totalBill + selectedImage.price;
    setTotalBill(updatedTotalBill);
  };

  const handleRemoveFromCart = (index) => {
    const selectedItem = cartItems[index];
    const updatedCartItems = [...cartItems];

    if (selectedItem.quantity > 1) {
      updatedCartItems[index] = { ...selectedItem, quantity: selectedItem.quantity - 1 };
    } else {
      updatedCartItems.splice(index, 1);
    }

    setCartItems(updatedCartItems);

    const updatedTotalBill = totalBill - selectedItem.price;
    setTotalBill(updatedTotalBill);
  };

  const generateBill = () => {
    console.log("Generating bill...");
    console.log("Total Bill:", totalBill);
    setOrderConfirmed(true);
  };

  const filteredImages = images.filter(image =>
    image.artist.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="navbar">
        <h1>Art Images</h1>
        <input
          type="text"
          placeholder="Search Artist..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table className="image-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredImages.map((image, index) => (
            <React.Fragment key={index}>
              <tr>
                <td className="image-cell"><img src={image.src} width='100px' alt={image.alt} /></td>
                <td className="info-cell">
                  {editIndex === index ? (
                    <div>
                      <input type="text" value={editedArtist} onChange={(e) => setEditedArtist(e.target.value)} />
                      <input type="text" value={editedDate} onChange={(e) => setEditedDate(e.target.value)} />
                      <input type="text" value={editedWhere} onChange={(e) => setEditedWhere(e.target.value)} />
                      <input type="number" value={editedPrice} onChange={(e) => setEditedPrice(e.target.value)} />
                      <button onClick={handleSaveEdit}>Save</button>
                      <button onClick={handleCancelEdit}>Cancel</button>
                    </div>
                  ) : (
                    <React.Fragment>
                      <button onClick={() => handleDelete(index)}>Delete</button>
                      <button onClick={() => handleEdit(index)}>Edit</button>
                      <button onClick={() => handleAddToCart(index)}>Add to Cart</button>
                    </React.Fragment>
                  )}
                </td>
              </tr>
              <tr>
                <td className="info-cell" colSpan="2">
                  <div>
                    <strong>Artist:</strong> {image.artist}
                  </div>
                  <div>
                    <strong>Date:</strong> {image.date}
                  </div>
                  <div>
                    <strong>Where to See:</strong> {image.where}
                  </div>
                  <div>
                    <strong>Time:</strong> {image.time.toLocaleString()}
                  </div>
                  <div>
                    <strong>Status:</strong> {(new Date() - image.time) < (24 * 3600 * 1000) ? 'New' : 'Old'}
                  </div>
                  <div>
                    <strong>Price:</strong> ${image.price}
                  </div>
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
      <div>
        <h2>Upload a File</h2>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>
      </div>
      <div>
        <h2>Deleted Images</h2>
        <ul>
          {deletedImages.map((image, index) => (
            <li key={index}>{image.alt}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Shopping Cart</h2>
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              {item.alt} - ${item.price} - Quantity: {item.quantity}
              <button onClick={() => handleRemoveFromCart(index)}>Remove</button>
            </li>
          ))}
        </ul>

        <div className="total-bill-box">
          <h4>Total Bill</h4>
          <ul>
            {cartItems.map((item) => (
              <li key={item.alt}>
                {item.alt} - ${item.quantity * item.price}
              </li>
            ))}
            <li className="total-bill-amount">
              Total: ${totalBill}
            </li>
          </ul>
        </div>

        <Link to="/paymentDetails" target="_blank">
          <button onClick={generateBill}>pay now</button>
        </Link>
      </div>
    </div>
  );
}

export default Newarrivalnotification;