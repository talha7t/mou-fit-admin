import React from "react";
import TitleAndBtnRow from "@/components/Sections/SharedSections/TitleAndBtnRow";
import ChipContainer from "@/components/Widgets/SharedWidgets/Containers/ChipContainer";
import FlexContainer from "@/components/Widgets/SharedWidgets/Containers/FlexContainer";
import ListingsTable from "@/components/Widgets/SharedWidgets/Tables/ListingsTable";
import { useRouter } from "next/router";
import AuthWrapper from "@/components/Utils/Auth/authWrapper";

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
  { id: 'id', label: 'Id' },
  { id: 'name', label: 'Name' },
  { id: 'type', label: 'Type' },
  { id: 'location', label: 'Location' },
  { id: 'region', label: 'Region' },
  { id: 'status', label: 'Status' },
];


const PartnerList = () => {
  const router = useRouter();

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

          <ListingsTable columns={columns} data={data} />
      </ChipContainer>
    </FlexContainer>
  );
};

// export default AuthWrapper(PartnerList);
export default PartnerList;
