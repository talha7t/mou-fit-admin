import React, { useState } from "react";
import TitleAndBtnRow from "@/components/Sections/SharedSections/TitleAndBtnRow";
import ChipContainer from "@/components/Widgets/SharedWidgets/Containers/ChipContainer";
import FlexContainer from "@/components/Widgets/SharedWidgets/Containers/FlexContainer";
import ListingsTable from "@/components/Widgets/SharedWidgets/Tables/ListingsTable";
import { useRouter } from "next/router";
import AuthWrapper from "@/components/Utils/Auth/authWrapper";
import { Autocomplete, Box, TextField, Typography } from "@mui/material";

const selectInputStyles = {
  '& .MuiOutlinedInput-root': {
    // height: '2.5rem', // Change the height here
    // padding: '5px',
    '& fieldset': {
      borderColor: 'white', // Default border color
    },
    '&:hover fieldset': {
      borderColor: 'white', // Border color on hover
    },
    '&.Mui-focused fieldset': {
      borderColor: 'white', // Border color when focused
    },
    color: 'white', // Text color
  },
  '& .MuiInputLabel-root': {
    color: 'white', // Placeholder color
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: 'white', // Placeholder color when focused
  },
  '& .MuiSvgIcon-root': {color: 'white'}
}

// Define data structure for each row
function createData(id, name, type, location, region, status) {
  return { id, name, type, location, region, status };
}

// Example data
const data = [
  createData(1, "Fitness Hub", "Gym", 101, 10, "Active"),
  createData(2, "Adventure Park", "Random", 202, 20, "On Hold"),
  createData(3, "Health Club", "Gym", 303, 30, "Active"),
  createData(4, "Mystery Spot", "Random", 404, 40, "On Hold"),
  createData(5, "Workout Zone", "Gym", 505, 50, "Active"),
  createData(6, "Workout Zone", "Gym", 505, 50, "Active"),
  createData(7, "Workout Zone", "Gym", 505, 50, "Active"),
];

// Define the columns for the table
const columns = [
  { id: "id", label: "Id" },
  { id: "name", label: "Name" },
  { id: "type", label: "Type" },
  { id: "location", label: "Location" },
  { id: "region", label: "Region" },
  { id: "status", label: "Status" },
];

const PartnerList = () => {
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <FlexContainer grid={12} classes="content-container">
      <ChipContainer>
        <TitleAndBtnRow
          data={{
            text: "Partners",
            title: "Create New",
            onClick: () => router.push("/partners/createPartner"),
          }}
          styles={{
            margin: "0 1em",
          }}
        />

        <Box sx={{ width: "100%", marginTop: "1.5rem", backgroundColor: '#171821' }}>
          <Box sx={{ display: "flex", alignItems: 'center', width: "100%", padding: '2rem', paddingBottom: '1rem' }}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={[{ label: "Gym" }, { label: "Club" }]}
              sx={{ width: "10rem", borderColor: "#fff" }}
              renderInput={(params) => (
                <TextField
                  className="text-field"
                  {...params}
                  label="Category"
                  sx={selectInputStyles}
                />
              )}
            />
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={[{ label: "Gym" }, { label: "Club" }]}
              sx={{ width: "10rem", borderColor: "#fff" }}
              renderInput={(params) => (
                <TextField
                  className="text-field"
                  {...params}
                  label="Services"
                  sx={selectInputStyles}
                />
              )}
            />
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={[{ label: "Gym" }, { label: "Club" }]}
              sx={{ width: "10rem", borderColor: "#fff" }}
              renderInput={(params) => (
                <TextField
                  className="text-field"
                  {...params}
                  label="Region"
                  sx={selectInputStyles}
                />
              )}
            />
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={[{ label: "Gym" }, { label: "Club" }]}
              sx={{ width: "10rem", borderColor: "#fff" }}
              renderInput={(params) => (
                <TextField
                  className="text-field"
                  {...params}
                  label="Locations"
                  sx={selectInputStyles}
                />
              )}
            />

            <Typography component={"p"} sx={{marginLeft:  '2rem', padding: '1rem', color: '#7D54C5', cursor: 'pointer'}}>Apply</Typography>
          </Box>
          <ListingsTable columns={columns} data={data} />
        </Box>
      </ChipContainer>
    </FlexContainer>
  );
};

// export default AuthWrapper(PartnerList);
export default PartnerList;
