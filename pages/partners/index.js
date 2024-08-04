import React, { useEffect, useState } from "react";
import TitleAndBtnRow from "@/components/Sections/SharedSections/TitleAndBtnRow";
import ChipContainer from "@/components/Widgets/SharedWidgets/Containers/ChipContainer";
import FlexContainer from "@/components/Widgets/SharedWidgets/Containers/FlexContainer";
import ListingsTable from "@/components/Widgets/SharedWidgets/Tables/ListingsTable";
import { useRouter } from "next/router";
import AuthWrapper from "@/components/Utils/Auth/authWrapper";
import { Autocomplete, Box, TextField, Typography } from "@mui/material";
import { getAllDocsWithinCollection } from "@/components/Helpers/ApiCalls/firebaseApiCalls";

const selectInputStyles = {
  "& .MuiOutlinedInput-root": {
    // height: '2.5rem', // Change the height here
    // padding: '5px',
    "& fieldset": {
      borderColor: "white", // Default border color
    },
    "&:hover fieldset": {
      borderColor: "white", // Border color on hover
    },
    "&.Mui-focused fieldset": {
      borderColor: "white", // Border color when focused
    },
    color: "white", // Text color
  },
  "& .MuiInputLabel-root": {
    color: "white", // Placeholder color
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "white", // Placeholder color when focused
  },
  "& .MuiSvgIcon-root": { color: "white" },
};

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

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const partners = await getAllDocsWithinCollection("users");
      
      if (partners?.length > 0) {
        const temp = partners.map((partner) => ({
          id: partner.id,
          name: partner.first_name + " " + partner.last_name,
          type: partner?.type || "Gym",
          location: partner?.location || 1,
          region: partner?.region || 2,
          status: partner?.status || "Inactive",
        }));

        setData(temp);
        setLoading(false);
      } else {
        setData([]);
        setLoading(false);
      }
    } catch (error) {
      setData([]);
      setLoading(false);
    }
  };

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

        <Box
          sx={{
            width: "100%",
            marginTop: "1.5rem",
            backgroundColor: "#171821",
          }}
        >
          {
            !loading && 
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              padding: "2rem",
              paddingBottom: "1rem",
            }}
          >
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

            <Typography
              component={"p"}
              sx={{
                marginLeft: "2rem",
                padding: "1rem",
                color: "#7D54C5",
                cursor: "pointer",
              }}
            >
              Apply
            </Typography>
          </Box>
          }
          <ListingsTable columns={columns} data={data} loading={loading} />
        </Box>
      </ChipContainer>
    </FlexContainer>
  );
};

// export default AuthWrapper(PartnerList);
export default PartnerList;
