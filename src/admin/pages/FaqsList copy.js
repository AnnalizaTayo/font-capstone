import React, { useState, useEffect } from "react";
import useAuth from '../utils/useAuth';
import { useNavigate } from 'react-router-dom';
import DataTable from "../components/dataTable/DataTableFaqs";
import "../../assets/styles/admin/collections.scss";
import Form from "../components/dynamicForm/Form";
import axios from "axios";
import { FiRefreshCcw } from 'react-icons/fi';

const columns = [
  { field: "id", headerName: "ID", width: 100 },
  {
    field: "question",
    headerName: "Question",
    width: 250,
  },
  {
    field: "answer",
    headerName: "Answer",
    width: 300,
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


const Collections = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [uploading, setUploading] = useState(false);
  const [data, setData] = useState([]);
  const [isUpdate , setIsUpdate] = useState(false);
  const [faqs, setFaqs] = useState(null);
  const [faqsId, setFaqsId] = useState('');
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


  // Function to fetch data from the server and format it
  const fetchDataFromServer = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_API+'/faqs');
      const jsonResponse  = await response.json();

      console.log('jsonData:', jsonResponse ); // Check the response here

      // Check if "faqss" array exists in the response
      if (jsonResponse && Array.isArray(jsonResponse)) {
        const formattedData = jsonResponse.map((item) => ({
          id: item._id,
          question: item.question,
          answer: item.answer,
        }));

        setData(formattedData);

      } else {
        console.error('Invalid response format. FAQs array not found.');
        setError(response.message);
        console.log(response.message);
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

  const onDelete= async(faqsId) =>{
    try {
      // Send the delete request to the backend using axios
      console.log(faqsId);
      await axios.delete(`${process.env.REACT_APP_API}/faqs/${faqsId}`, );

      setData((prevData) => prevData.filter((item) => item.id !== faqsId));
    } catch (error) {
      console.error("Failed to Delete", error);
    }
  }

  const onEditOne = async (faqsId) => {
    setIsUpdate(true);
    setError('');
    setFormData({});
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/faqs/${faqsId}`);

      console.log('this is the fetched data',response.data);

      if (response.ok) {

        setFaqs(response.data.faqs);
        console.log();

        console.log('this is the faqs', faqs);
        // Set default form data based on the selected faqs's data
        const defaultData = {
          id: response.data.faqs._id,
          question: response.data.faqs.question,
          answer: response.data.faqs.answer,
        };

        console.log('this is the default data: ', defaultData);

        setFormData(defaultData);
        setFaqsId(faqsId);
        setOpen(true);
        setError('');
      } else {
        setError(response.message);
      }
    } catch (error) {
      console.error("Error fetching faqs data:", error);
      setError(error);
    }
  };

  const onFormSubmitUpdate = async (e) => {
    e.preventDefault();
      setError('');
      setUploading(true);

      console.log(`PRODUCT TO BE UPDATED: ${faqsId}`);
      // Prepare the form data to send to the backend
      const faqsData = new FormData();
      faqsData.append("question", formData.faqsName);
      faqsData.append("answer", formData.description);
      
    try {
      const response = await axios.put(`${process.env.REACT_APP_API}/faqs/${faqsId}`, faqsData);
      // Handle the response as needed
      
      console.log('Faqs updated:', response.data);
    } catch (error) {
      console.error('Error updating faqs:', error);
      setError(error);
    }
    setIsUpdate(false);
    setUploading(false);
    setOpen(false);
    setError('');
    setFormData({});
    fetchDataFromServer();
  };

  const onFormSubmitAdd = async (e) => {
    e.preventDefault();
    try {
      setUploading(true);
      console.log(formData);      

      // Send the data to the backend using axios
      await axios.post(process.env.REACT_APP_API+'/faqs', formData);

      setFormData({});
      setUploading(false);
      setOpen(false);
    } catch (error) {
      console.error("Error creating faqs:", error);
      setUploading(false);
      
    }
    fetchDataFromServer();
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
        <h1>Faqs</h1>
        <br />
        <span>
          <button onClick={handleClickAdd}>Add FAQS</button>
          <FiRefreshCcw onClick={handleRefresh}/>
        </span>
      </div>
      <DataTable slug="faqs" columns={columns} rows={data} onDelete={onDelete} onEdit ={onEditOne}/>
      {open && <Form
        setFormData={setFormData}
        isError={isError}
        isUpdate={isUpdate}
        setIsUpdate={setIsUpdate}
        slug="FAQs"
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

export default Collections;
