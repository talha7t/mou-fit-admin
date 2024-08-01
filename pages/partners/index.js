import React from "react";
import TitleAndBtnRow from "@/components/Sections/SharedSections/TitleAndBtnRow";
import ChipContainer from "@/components/Widgets/SharedWidgets/Containers/ChipContainer";
import FlexContainer from "@/components/Widgets/SharedWidgets/Containers/FlexContainer";
import DataTableComp from "@/components/Widgets/SharedWidgets/Tables/DataTableComp";
import { useRouter } from "next/router";
import AuthWrapper from "@/components/Utils/Auth/authWrapper";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
  Checkbox,
  Paper,
} from "@mui/material";

// Define data structure for each row
function createData(id, name, type, location, region, status) {
  return { id, name, type, location, region, status };
}

// Example data
const rows = [
  createData(1, "Fitness Hub", "Gym", 101, 10, "Active"),
  createData(2, "Adventure Park", "Random", 202, 20, "On Hold"),
  createData(3, "Health Club", "Gym", 303, 30, "Active"),
  createData(4, "Mystery Spot", "Random", 404, 40, "On Hold"),
  createData(5, "Workout Zone", "Gym", 505, 50, "Active"),
  createData(6, "Workout Zone", "Gym", 505, 50, "Active"),
  createData(7, "Workout Zone", "Gym", 505, 50, "Active"),
];

// Function to compare values for sorting
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

// Get the comparator function based on the order
function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Stable sort implementation
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const PartnerList = () => {
  const router = useRouter();

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("id"); // Default sort by id
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Handle sorting request
  const handleRequestSort = (property) => (event) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // Handle selecting all rows
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  // Handle row selection
  const handleClick = (id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Check if a row is selected
  const isSelected = (id) => selected.indexOf(id) !== -1;

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

        <Paper sx={{width: '100%', marginTop: '2rem'}}> 
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      indeterminate={
                        selected.length > 0 && selected.length < rows.length
                      }
                      checked={rows.length > 0 && selected.length === rows.length}
                      onChange={handleSelectAllClick}
                      inputProps={{ "aria-label": "select all rows" }}
                    />
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === "id"}
                      direction={orderBy === "id" ? order : "asc"}
                      onClick={handleRequestSort("id")}
                    >
                      Id
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === "name"}
                      direction={orderBy === "name" ? order : "asc"}
                      onClick={handleRequestSort("name")}
                    >
                      Name
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === "type"}
                      direction={orderBy === "type" ? order : "asc"}
                      onClick={handleRequestSort("type")}
                    >
                      Type
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === "location"}
                      direction={orderBy === "location" ? order : "asc"}
                      onClick={handleRequestSort("location")}
                    >
                      Location
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === "region"}
                      direction={orderBy === "region" ? order : "asc"}
                      onClick={handleRequestSort("region")}
                    >
                      Region
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === "status"}
                      direction={orderBy === "status" ? order : "asc"}
                      onClick={handleRequestSort("status")}
                    >
                      Status
                    </TableSortLabel>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.id);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={() => handleClick(row.id)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isItemSelected}
                            inputProps={{ "aria-labelledby": labelId }}
                          />
                        </TableCell>
                        <TableCell component="th" id={labelId} scope="row">
                          {row.id}
                        </TableCell>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.type}</TableCell>
                        <TableCell>{row.location}</TableCell>
                        <TableCell>{row.region}</TableCell>
                        <TableCell>{row.status}</TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </ChipContainer>
    </FlexContainer>
  );
};

// export default AuthWrapper(PartnerList);
export default PartnerList;
