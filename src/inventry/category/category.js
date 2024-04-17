 import React,{Component} from "react";
import CategoryDetails from "./categoryDetails";
import Typography from '@mui/material/Typography';





 export class Category extends Component{
    
    render(){
        return(
            <>
            <Typography variant="h4" align="center" gutterBottom fontWeight="bold">
            
        Category Details
      </Typography>
      
            <CategoryDetails />
            </>
        );
    }
 }
 export default Category;