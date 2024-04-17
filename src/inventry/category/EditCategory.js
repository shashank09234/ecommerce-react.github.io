import React, {useState, useEffect} from 'react';
import Drawer from '@mui/material/Drawer';

import { Button, TextField, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles'
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';



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

export default function EditCategory({  onCategoryAdded, categoryId  }) {
  const [state, setState] = React.useState({
    
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    if(open){
      getCategory();
    }else{      
    onCategoryAdded();
    }
    setState({ ...state, [anchor]: open });
  };



  const showToast = (msg) => {
    console.log("Msg Displayed")
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
id:'',
categoryCode: '',
categoryName: '',
description: '',
date: selectedDate.format('YYYY-MM-DD HH:mm:ss'),
});




const getCategory = () => {


axios.get('http://localhost:8080/inventry/category/'+categoryId)
.then((response) => {
  if (response.status !== 200) {
    throw new Error('Network response was not ok');
  }
  return response.data;
})
.then((data) => {
  const formattedData = ({
    ...data,
   
  });
  setFormData(formattedData);
  console.log(formattedData);
})
.catch((error) => {
  console.error('Error fetching data:', error);
});};

const handleFormSubmit = (event) => {
  event.preventDefault();
  // Process the form data, for example, send it to a server or display it
  console.log('form updated')
  console.log(formData);
  updateCategory(formData);
  toggleDrawer('right', false)
  };

const updateCategory=async (category)=> {
const response =await axios.put("http://localhost:8080/inventry/category",category)
console.log(response)
if(response.status==201){
    showToast(category.categoryName+" Updated");
}else{
    showToast(category.categoryName+" Not Updated");
}
}

const handleInputChange = (event) => {
const { name, value } = event.target;
setFormData((prevData) => ({
  ...prevData,
  [name]: value,
}));
};




  const list = () => (
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
    <TextField name="id" label="iD" variant="outlined" onChange={handleInputChange} value={formData.id}/>
    <TextField name="categoryCode" label="Category Code" variant="outlined" onChange={handleInputChange} value={formData.categoryCode}/>
  <TextField name="categoryName" label="Category Name" variant="outlined" onChange={handleInputChange} value={formData.categoryName}/>
  <TextField name="description" label="Description" variant="outlined" onChange={handleInputChange} value={formData.description}/>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
<DemoContainer components={['MobileDateTimePicker']}>
  
  <MobileDateTimePicker
    label="Controlled picker"
    value={dayjs(formData.date)}
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

  return (
    <div>
      <Button variant="contained" onClick={toggleDrawer('right', true)}  sx={{ "& .MuiDataGrid-cell:focus": { outline: "none" } }}
        
          startIcon={<EditIcon />}>Edit Category</Button>
          <Drawer
            anchor={'right'}
            open={state['right']}
            onClose={toggleDrawer('right', false)}
          >
            {list()}
          </Drawer>
          
        
    </div>
  );
}