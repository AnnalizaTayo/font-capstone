import React, { useState, useEffect } from "react";
import useAuth from '../utils/useAuth';
import { useNavigate } from 'react-router-dom';
import DataTable from "../components/dataTable/DataTable";
import Form from "../components/dynamicForm/Form";
//import postData from "../../utils/requests/postData";
//import fetchData from "../../utils/requests/fetchData";
import axios from "axios";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "email",
    headerName: "Email",
    width: 200,
  },
  {
    field: "firstName",
    headerName: "First name",
    width: 150,
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 150,
  },
  {
    field: "role",
    headerName: "Role",
    width: 150,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 150,
  },
];

const columns2 = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "email",
    headerName: "Email",
    width: 200,
  },
  {
    field: "password",
    headerName: "Password",
    width: 200,
  },
  {
    field: "firstName",
    headerName: "First name",
    width: 150,
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 150,
  },
  {
    field: "role",
    headerName: "Role",
    width: 150,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 150,
  },
];

const Users = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [uploading, setUploading] = useState(false);
  const [data, setData] = useState([]);
  const [isUpdate , setIsUpdate] = useState(false);
  const [userId, setUserId] = useState('');
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
  };

  const onFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  useEffect(() => {
    // Function to fetch data from the server and format it
    const fetchDataFromServer = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/users');
        const jsonResponse  = await response.json();

        console.log('jsonData:', jsonResponse ); // Check the response here

        // Check if "user" array exists in the response
        if (jsonResponse.users && Array.isArray(jsonResponse.users)) {
          const formattedData = jsonResponse.users.map((item) => ({
            id: item._id,
            firstName: item.firstName,
            lastName: item.lastName,
            email: item.email,
            role: item.role,
            createdAt: item.accountCreationDate,
          }));
          setData(formattedData);

        } else {
          console.error('Invalid response format. Users array not found.');
        }
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDataFromServer();
  },[]);

  const onDelete= async(userId) =>{
    try {
      // Send the delete request to the backend using axios
      console.log(userId);
      await axios.delete(`http://localhost:3001/api/delete-user/${userId}`);
      setData((prevData) => prevData.filter((item) => item.id !== userId));
    } catch (error) {
      console.error("Failed to Delete", error);
    }
  }

  const onEditOne = async (userId) => {
    setIsUpdate(true);
    try {
      const response = await axios.get(`http://localhost:3001/api/user/${userId}`);
      if (response.data) {
        setUserId(response.data);
        // Set default form data based on the selected user's data
        const defaultData = {
          
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          color: response.data.color,
        };
        setFormData(defaultData);
        setUserId(userId);
        setOpen(true);
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  const onFormSubmitUpdate = async (e) => {
    e.preventDefault();
      console.log(`User TO BE UPDATED: ${userId}`);
      setUploading(true);

    try {
      const response = await axios.put(`http://localhost:3001/api/update-product/${userId}`, formData);
      // Handle the response as needed
      console.log('Product updated:', response.data);
    } catch (error) {
      console.error('Error updating product:', error);
    }
    setFormData({});
    setUploading(false);
    setOpen(false);
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
      await axios.post(process.env.REACT_APP_CREATE_PRODUCT, productData);

      setFormData({});
      setUploading(false);
      setOpen(false);
    } catch (error) {
      console.error("Error creating product:", error);
      setUploading(false);
    }
  };

  return (
    <div className="pageContainer">
      <div className="info">
        <h1>Users</h1>
        <br />
        <button onClick={() => setOpen(true)}>Add New User</button>
      </div>
      <DataTable slug="users" columns={columns} rows={data} onDelete={onDelete} onEdit ={onEditOne}/>
      {open && <Form
        isUpdate={isUpdate}
        slug="users"
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

export default Users;
