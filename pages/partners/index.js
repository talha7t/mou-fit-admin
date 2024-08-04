import React, { useEffect, useState } from "react";
import TitleAndBtnRow from "@/components/Sections/SharedSections/TitleAndBtnRow";
import ChipContainer from "@/components/Widgets/SharedWidgets/Containers/ChipContainer";
import FlexContainer from "@/components/Widgets/SharedWidgets/Containers/FlexContainer";
import ListingsTable from "@/components/Widgets/SharedWidgets/Tables/ListingsTable";
import { useRouter } from "next/router";
import AuthWrapper from "@/components/Utils/Auth/authWrapper";
import { Autocomplete, Box, Grid, TextField, Typography } from "@mui/material";
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

const applyStyles = {
  marginLeft: {
    md: "2rem",
  },
  backgroundColor: {
    xs: "#7D54C5",
    md: "transparent",
  },
  marginTop: {
    xs: "1rem",
    md: "0",
  },
  padding: {
    xs: "1rem 0",
    md: "1rem",
  },
  color: {
    xs: "#fff",
    md: "#7D54C5",
  },
  borderRadius: {
    xs: "5px",
    md: 0,
  },
  textAlign: "center",
  cursor: "pointer",
};

const containerStyles = {
  margin: {
    xs: "3em 1rem 0 1rem",
    sm: "4em 2rem 0 260px",
    xl: "4em 2rem 0 260px",
    lg: "4em 2rem 0 260px",
    md: "4em 2rem 0 260px",
  },
}

const autoCompleteStyles = {
  width: {
    xs: "98%",
    sm: "98%",
    md: "100%",
    lg: "99%",
    xl: "99%",
  },
  borderColor: "#fff",
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
  const [loading, setLoading] = useState(false);
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
    <Box
      sx={containerStyles}
    >
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
          {!loading && (
            <Grid
              sx={{
                padding: "2rem",
                paddingBottom: "1rem",
              }}
              container
            >
              {/* Row 1 */}
              <Grid item xs={6} sm={6} md={2}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={[{ label: "Gym" }, { label: "Club" }]}
                  sx={autoCompleteStyles}
                  renderInput={(params) => (
                    <TextField
                      className="text-field"
                      {...params}
                      label="Category"
                      sx={selectInputStyles}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6} sm={6} md={2}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={[{ label: "Gym" }, { label: "Club" }]}
                  sx={autoCompleteStyles}
                  renderInput={(params) => (
                    <TextField
                      className="text-field"
                      {...params}
                      label="Services"
                      sx={selectInputStyles}
                    />
                  )}
                />
              </Grid>

              {/* Row 2 */}
              <Grid item xs={6} sm={6} md={2}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={[{ label: "Gym" }, { label: "Club" }]}
                  sx={autoCompleteStyles}
                  renderInput={(params) => (
                    <TextField
                      className="text-field"
                      {...params}
                      label="Region"
                      sx={selectInputStyles}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6} sm={6} md={2}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={[{ label: "Gym" }, { label: "Club" }]}
                  sx={autoCompleteStyles}
                  renderInput={(params) => (
                    <TextField
                      className="text-field"
                      {...params}
                      label="Locations"
                      sx={selectInputStyles}
                    />
                  )}
                />
              </Grid>

              {/* Row 3 */}
              <Grid item xs={12} sm={12} md={2}>
                <Typography component={"p"} sx={applyStyles}>
                  Apply
                </Typography>
              </Grid>
            </Grid>
          )}
          <ListingsTable columns={columns} data={data} loading={loading} />
        </Box>
      </ChipContainer>
    </Box>
  );
};

// export default AuthWrapper(PartnerList);
export default PartnerList;
