import React, {useState} from 'react';
import { Button, TextField, Grid, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles'
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';



const FormContainer = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(1),
    margin: '10px',
    // maxWidth: 400,
  }));
  
  const Form = styled('form')({
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  });
  
  

  const AddCategory = ({ onCategoryAdded }) => {

    const showToast = (msg) => {
        toast.success(msg, {
          position: 'top-right',
          autoClose: 3000, // 3 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      };
    
    const today = new Date();
    const [selectedDate, setSelectedDate] = React.useState(dayjs(today));
  // Set initial state for the DatePicker
  const [formData, setFormData] = useState({
    categoryCode: '',
    categoryName: '',
    description: '',
    date: selectedDate.format('YYYY-MM-DD HH:mm:ss'),
  });

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Process the form data, for example, send it to a server or display it
    console.log('form submitted')
    console.log(formData);
    addCategory(formData);
    
  };

  const addCategory=async (category)=> {
    const response =await axios.post("http://localhost:8080/inventry/category",category)
    console.log(response)
    if(response.status==201){
        showToast(category.categoryName+" Added");
        onCategoryAdded();
    }else{
        showToast(category.categoryName+" Not Added");
    }
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
    return (
        <FormContainer>
          <Typography 
          variant="h6"  
          align="center" 
          gutterBottom 
          fontWeight="bold"
          style={{ color: 'blue' }} 
          >
            Add New Category
          </Typography>
          <Form onSubmit={handleFormSubmit}>
          <TextField name="categoryCode" label="Category Code" variant="outlined" onChange={handleInputChange} />
        <TextField name="categoryName" label="Category Name" variant="outlined" onChange={handleInputChange} />
        <TextField name="description" label="Description" variant="outlined" onChange={handleInputChange} />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['MobileDateTimePicker']}>
        
        <MobileDateTimePicker
          label="Controlled picker"
          value={selectedDate}
          defaultValue={dayjs(today)}
          onChange={(newValue) => setSelectedDate(newValue)}
        />
      </DemoContainer>
    </LocalizationProvider>
      
            <Button type='submit' variant="contained" color="primary">
              Submit
            </Button>
          </Form>
        </FormContainer>
      );
  };
  
  export default AddCategory;
  