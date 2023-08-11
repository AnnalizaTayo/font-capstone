import React, { useState, useEffect } from "react";
import useAuth from '../utils/useAuth';
import { useNavigate } from 'react-router-dom';
import DataTable from "../components/dataTable/DataTable";
import "../../assets/styles/admin/collections.scss";
import Form from "../components/dynamicForm/Form";
import axios from "axios";
import { FiRefreshCcw } from 'react-icons/fi';

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "productImg",
    headerName: "Image",
    width: 100,
    type: "file",
    renderCell: (params) => {
      return <img src={params.row.productImg || "images/noavatar.png"} alt="" />;
    },
  },
  {
    field: "productName",
    headerName: "Product Name",
    width: 250,
  },
  {
    field: "description",
    headerName: "Description",
    width: 250,
  },
  {
    field: "color",
    headerName: "Color",
    width: 150,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 200,
  }
];

const columns2 = [
  { field: "id", headerName: "ID", width: 90 },
  
  {
    field: "productName",
    headerName: "Product Name",
    width: 250,
  },
  {
    field: "description",
    headerName: "Description",
    width: 250,
  },
  {
    field: "color",
    headerName: "Color",
    width: 150,
  },
  {
    field: "productImg",
    headerName: "Image",
    width: 100,
    type: "file",
    renderCell: (params) => {
      return <img src={params.row.productImg || "images/noavatar.png"} alt="" />;
    },
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 200,
  }
];


const Collections = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [uploading, setUploading] = useState(false);
  const [data, setData] = useState([]);
  const [isUpdate , setIsUpdate] = useState(false);
  const [product, setProduct] = useState(null);
  const [prodId, setProdId] = useState('');
  const [isError, setError] = useState();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAuthenticated) {
      // Redirect to login page if not authenticated
      navigate('/admin-dashboard/login');
    } 
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const onFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    setError('');
  };

  // Function to fetch data from the server and format it
  const fetchDataFromServer = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_API+'/products/allproducts');
      const jsonResponse  = await response.json();

      console.log('jsonData:', jsonResponse ); // Check the response here

      // Check if "products" array exists in the response
      if (jsonResponse.products && Array.isArray(jsonResponse.products)) {
        const formattedData = jsonResponse.products.map((item) => ({
          id: item._id,
          productImg: process.env.REACT_APP_API + '/products/products-thumbnail/' + item._id,
          productName: item.productName,
          color: item.color,
          description: item.description,
          createdAt: item.createdAt,
        }));

        setData(formattedData);

      } else {
        console.error('Invalid response format. Products array not found.');
        setError(response.message);
      }
      
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error);
    }
  };

  useEffect(() => {
    fetchDataFromServer();
  },[]);

  const handleRefresh = async() => {
    await fetchDataFromServer();
  }

  const onDelete= async(productId) =>{
    try {
      // Send the delete request to the backend using axios
      console.log(productId);
      await axios.delete(`${process.env.REACT_APP_API}/products/delete-product/${productId}`);
      // After successful deletion, you can update the data in the state to reflect the change.
      // For example, you can remove the deleted product from the 'data' state array.
      setData((prevData) => prevData.filter((item) => item.id !== productId));
    } catch (error) {
      console.error("Failed to Delete", error);
    }
  }

  const onEditOne = async (productId) => {
    setIsUpdate(true);
        setError('');
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/products/product-noimage/${productId}`);
      if (response.data) {

        setProduct(response.data);
        // Set default form data based on the selected product's data
        const defaultData = {
          productName: response.data.productName,
          description: response.data.description,
          color: response.data.color,
        };
        setFormData(defaultData);
        setProdId(productId);
        setOpen(true);
        setError('');
      } else {
        setError(response.message);
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
      setError(error);
    }
  };

  const onFormSubmitUpdate = async (e) => {
    e.preventDefault();
      setError('');
      console.log(`PRODUCT TO BE UPDATED: ${prodId}`);
      setUploading(true);
      // Prepare the form data to send to the backend
      const productData = new FormData();
      productData.append("productName", formData.productName);
      productData.append("description", formData.description);
      productData.append("color", formData.color);
      productData.append("productImg", formData.productImg);
      
    try {
      const response = await axios.put(`${process.env.REACT_APP_API}/products/update-product/${prodId}`, productData);
      // Handle the response as needed
      
      console.log('Product updated:', response.data);
    } catch (error) {
      console.error('Error updating product:', error);
      setError(error);
    }
    setIsUpdate(false);
    setUploading(false);
    setOpen(false);
    setError('');
    setFormData({});
  };

  const onFormSubmitAdd = async (e) => {
    e.preventDefault();
    try {
      setUploading(true);
      // Prepare the form data to send to the backend
      const productData = new FormData();
      productData.append("productName", formData.productName);
      productData.append("description", formData.description);
      productData.append("color", formData.color);
      productData.append("productImg", formData.productImg);

      // Send the data to the backend using axios
      await axios.post(process.env.REACT_APP_API+'/products/create-product', productData);

      setFormData({});
      setUploading(false);
      setOpen(false);
    } catch (error) {
      console.error("Error creating product:", error);
      setUploading(false);
      setError(error);
    }
  };

  return (
    <div className="pageContainer collections withTable">
      <div className="info">
        <h1>Collection</h1>
        <br />
        <span>
          <button onClick={() => {setIsUpdate(false); setFormData({}); setOpen(true);}}>Add New Products</button>
          <FiRefreshCcw onClick={handleRefresh}/>
        </span>
      </div>
      <DataTable slug="products" columns={columns} rows={data} onDelete={onDelete} onEdit ={onEditOne}/>
      {open && <Form
        isError={isError}
        isUpdate={isUpdate}
        slug="product"
        columns={columns2}
        setOpen={setOpen}
        onFormSubmit={isUpdate? onFormSubmitUpdate : onFormSubmitAdd}
        handleChange={handleChange}
        formData={formData}
        onFileChange={onFileChange}
        uploading={uploading}
         />}
    </div>
  );
};

export default Collections;
