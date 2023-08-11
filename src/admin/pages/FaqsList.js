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
    field: "question",
    headerName: "Question",
    width: 250,
  },
  {
    field: "answer",
    headerName: "Answer",
    width: 150,
  },
  
];

const columns2 = [
  { field: "id", headerName: "ID", width: 90 },
  
  {
    field: "question",
    headerName: "Question",
    width: 250,
  },
  {
    field: "answer",
    headerName: "Answer",
    width: 250,
  }, 
  
];


const Employees = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [uploading, setUploading] = useState(false);
  const [data, setData] = useState([]);
  const [isUpdate , setIsUpdate] = useState(false);
  const [faqs, setFaqs] = useState(null);
  const [faqsId, setFaqsId] = useState('');
  const { isAuthenticated , userRole } = useAuth();
  const [isError, setError] = useState();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAuthenticated) {
      // Redirect to login page if not authenticated
      navigate('/admin-dashboard/login');
    } 
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(e.target.value);
  };
      
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/faqs`)
    .then(response => response.json())
    .then(data => setData(data))
    .catch(error => console.error('Error fetching faqs:', error));
  },[]);

  const handleRefresh = async() => {
    fetch(`${process.env.REACT_APP_API}/faqs`)
    .then(response => response.json())
    .then(data => setData(data))
    .catch(error => console.error('Error fetching faqs:', error));
  }

  const formattedFaqs = data.map(faq => ({
    id: faq._id,
    question: faq.question,
    answer: faq.answer,
  }));

  const onDelete= async(faqsId) =>{
    try {
      // Send the delete request to the backend using axios
      console.log(faqsId);
      await axios.delete(`${process.env.REACT_APP_API}/faqs/${faqsId}`, );

      setData((prevData) => prevData.filter((item) => item.id !== faqsId));
      fetch(`${process.env.REACT_APP_API}/faqs`)
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.error('Error fetching faqs:', error));
    } catch (error) {
      console.error("Failed to Delete", error);
    }
  }

  const onEditOne = async (faqsId) => {
    setError('');
    setIsUpdate(true);
    try {
      console.log(`${process.env.REACT_APP_API}/faqs/${faqsId}`);
      const response = await axios.get(`${process.env.REACT_APP_API}/faqs/${faqsId}`);
      if (response.data) {
        setFaqs(response.data.faqs);
        // Set default form data based on the selected faqs's data
        const defaultData = {
          id: response.data.faqs._id,
          question: response.data.faqs.question,
          answer: response.data.faqs.answer,
        };
        console.log(response);
        setFormData(defaultData);
        setFaqsId(faqsId);
        setOpen(true);
      }
    } catch (error) {
      console.error("Error fetching faqs data:", error);
      setError(error.message || "An error occurred.");
    }
  };

  const onFormSubmitUpdate = async (e) => {
    e.preventDefault();
      console.log(`User TO BE UPDATED: ${faqsId}`);
      setUploading(true);
    try {
      const response = await axios.put(`${process.env.REACT_APP_API}/faqs/${faqsId}`, formData);
      // Handle the response as needed
      console.log('User updated:', response.data);
    } catch (error) {
      console.error('Error updating faqs:', error);
    }
    setFormData({});
    setUploading(false);
    setOpen(false);

    fetch(`${process.env.REACT_APP_API}/faqs`)
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.error('Error fetching faqs:', error));
  };

  

  const onFormSubmitAdd = async (e) => {
    e.preventDefault();
    try {
      setUploading(true);
      // Prepare the form data to send to the backend
      setFormData(prevData => ({
        ...prevData,
        question: formData.question,
        answer: formData.answer,
      }));
      console.log(formData);
      const faqsData = new FormData();
      faqsData.append("question", formData.question);
      faqsData.append("answer", formData.answer);

      console.log('Form Data before submission:', faqsData);

      // Send the data to the backend using axios
      await axios.post(`${process.env.REACT_APP_API}/faqs/${faqsId}`, formData);

      console.log('New entry added:', formData);
    } catch (error) {
      console.error('Error adding an FAQs:', error);
    }

    setFormData({});
    setUploading(false);
    setOpen(false);

    fetch(`${process.env.REACT_APP_API}/faqs`)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching faqs:', error));
  };

  const handleClickAdd = () => {
    setError('');
    setFormData({});
    setIsUpdate(false);
    setOpen(true);
  }

  return (
    <div className="pageContainer collections withTable">
      <div className="info">
        <h1>Add New FAQs</h1>
        <br/>
        <span>
          <button onClick={handleClickAdd}>Add New FAQs</button>
          <FiRefreshCcw onClick={handleRefresh}/>
        </span>
      </div>
      <DataTable slug="faqs" columns={columns} rows={formattedFaqs} onDelete={onDelete} onEdit ={onEditOne} 
        setIsUpdate={setIsUpdate}/>
      {open && <Form
        isError={isError}
        isUpdate={isUpdate}
        slug="faqs"
        columns={columns2}
        setOpen={setOpen}
        onFormSubmit={isUpdate? onFormSubmitUpdate : onFormSubmitAdd}
        handleChange={handleChange}
        formData={formData}
        uploading={uploading}
         />}
    </div>
  );
};

export default Employees;
