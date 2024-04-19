import React, { useState, useEffect, useCallback } from "react";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import CategoryForm from "./CategoryForm";
import EditCategory from "./EditCategory";
import { Grid } from "@mui/material";

const formatDateString = (dateString) => {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
};
const CategoryDetails = () => {
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);

  const fetchData = useCallback(() => {
    axios
      .get("http://localhost:8080/inventry/category")
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Network response was not ok");
        }
        return response.data;
      })
      .then((data) => {
        const formattedData = data.map((item) => ({
          ...item,
          date: formatDateString(item.date),
        }));
        setRows(formattedData);
        setFilteredRows(formattedData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    fetchData(); // Use the memoized callback here
  }, [fetchData]); // Depend on the memoized callback

  const handleSearch = (event) => {
    const { value } = event.target;
    setSearchQuery(value);
    if (value.trim() === "") {
      setFilteredRows(rows); // Display all data when search query is empty
    } else {
      const filteredData = rows.filter((row) =>
        Object.values(row).some((val) =>
          val.toString().toLowerCase().includes(value.toLowerCase())
        )
      );
      setFilteredRows(filteredData);
    }
  };

  const toggleDrawer = (open) => {
    setIsDrawerOpen(open);
  };

  const toggleEditDrawer = (open) => {
    setIsEditDrawerOpen(open);
  };

  const addCategoryAndUpdate = async () => {
    try {
      console.log("Updating category list...");
      await fetchData(); // Fetch updated category list
    } catch (error) {
      console.error("Error updating category list:", error);
    }
  };

  const columns = [
    // { field: 'id', headerName: 'Id',flex: 1, align: 'left', headerClassName: 'super-app-theme--header-bold'  },
    {
      field: "categoryCode",
      headerName: "Category Code",
      flex: 1,
      align: "left",
      headerClassName: "super-app-theme--header-bold",
    },
    {
      field: "categoryName",
      headerName: "Category Name",
      flex: 1,
      align: "left",
      headerClassName: "super-app-theme--header-bold",
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
      align: "left",
      headerClassName: "super-app-theme--header-bold",
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      align: "left",
      headerClassName: "super-app-theme--header-bold",
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      align: "left",
      headerClassName: "super-app-theme--header-bold",
      renderCell: (params) => (
        <EditCategory
          open={isEditDrawerOpen}
          onClose={() => toggleEditDrawer(false)}
          anchor="right"
          categoryId={params.row.id}
          onCategoryAdded={addCategoryAndUpdate}
        />
      ),
    },
  ];
  return (
    <>
      <div>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
          sx={{ justifyContent: "flex-end", marginBottom: "10px", zIndex:"999"}}
        >
          <TextField
            id="standard-basic"
            label="Search Category"
            variant="standard"
            value={searchQuery}
            onChange={handleSearch}
          />

          <Grid item xs={12} sm={6} md={6}>
            <CategoryForm
              open={isDrawerOpen}
              onClose={() => toggleDrawer(false)}
              anchor="right"
              onCategoryAdded={addCategoryAndUpdate}
            />
          </Grid>
        </Stack>
        <div style={{ overflowX: "auto" }}>
        <DataGrid
          // sx={{ "& .MuiDataGrid-cell:focus": { outline: "none" },"& .MuiDataGrid-colCellHeader:focus": { outline: "none" }  }}
          sx={{
            [`& .${gridClasses.cell}:focus, & .${gridClasses.cell}:focus-within`]:
              {
                outline: "none",
              },
            [`& .${gridClasses.columnHeader}:focus, & .${gridClasses.columnHeader}:focus-within`]:
              {
                outline: "none",
              },
             minWidth:950, // Adjust this value as needed
          }}
          rows={filteredRows}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          pageSizeOptions={[10]}
          disableRowSelectionOnClick={true}
          disableColumnSelector={true}
          autoHeight={true}
        />
        </div>
      </div>
    </>
  );
};

export default CategoryDetails;
