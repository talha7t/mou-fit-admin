import React, { useState } from 'react';
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
    IconButton,
    Menu,
    MenuItem,
    CircularProgress,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

// constants
const tableHeaderCellStyles = {
    color: 'white',
    '&.Mui-active': {
        color: 'white',
        fontWeight: '700'
    },
    '&:hover': {
        color: 'white'
    },
    "& .MuiTableSortLabel-icon": { color: 'white !important' },
    "& .MuiTableSortLabel-iconDirectionAsc": { color: 'white !important' },
    "& .MuiTableSortLabel-iconDirectionDesc	": { color: 'white !important' },
}

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
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// Stable sort implementation
function stableSort(array, comparator) {
    const stabilizedThis = array?.map((el, index) => [el, index]);
    stabilizedThis?.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis?.map((el) => el[0]) || [];
}

// Reusable table component
const ListingsTable = ({ columns, data, loading }) => {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('id'); // Default sort by id
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [anchorEl, setAnchorEl] = useState(null);
    const [currentRowId, setCurrentRowId] = useState(null);

    // Handle sorting request
    const handleRequestSort = (property) => (event) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    // Handle selecting all rows
    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = data?.map((n) => n.id);
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

    // Handle menu open
    const handleMenuOpen = (event, id) => {
        setAnchorEl(event.currentTarget);
        setCurrentRowId(id);
    };

    // Handle menu close
    const handleMenuClose = () => {
        setAnchorEl(null);
        setCurrentRowId(null);
    };

    // Handle edit action
    const handleEdit = () => {
        // onEdit(currentRowId);
        handleMenuClose();
    };

    // Handle delete action
    const handleDelete = () => {
        // onDelete(currentRowId);
        handleMenuClose();
    };

    // Check if a row is selected
    const isSelected = (id) => selected.indexOf(id) !== -1;

    return (
        <Paper sx={{ width: '100%' }}>
            <TableContainer sx={{ backgroundColor: '#171821' }}>

                {loading &&
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                        <CircularProgress />
                    </div>
                }

                {
                    !loading &&
                    <Table>
                        <TableHead sx={{ color: '#fff' }}>
                            <TableRow>
                                <TableCell padding="checkbox" sx={{ color: 'white', padding: '2rem' }}>
                                    <Checkbox
                                        indeterminate={selected.length > 0 && selected.length < data?.length}
                                        checked={data?.length > 0 && selected.length === data?.length}
                                        onChange={handleSelectAllClick}
                                        inputProps={{ 'aria-label': 'select all rows' }}
                                        sx={{ "& svg": { color: 'white' } }}
                                    />
                                </TableCell>
                                {columns.map((column) => (
                                    <TableCell key={column.id} sx={{ color: 'white' }}>
                                        <TableSortLabel
                                            active={orderBy === column.id}
                                            direction={orderBy === column.id ? order : 'asc'}
                                            onClick={handleRequestSort(column.id)}
                                            sx={tableHeaderCellStyles}
                                        >
                                            {column.label}
                                        </TableSortLabel>
                                    </TableCell>
                                ))}
                                <TableCell sx={tableHeaderCellStyles}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {stableSort(data, getComparator(order, orderBy))
                                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                ?.map((row, index) => {
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
                                            sx={{ color: 'white' }}
                                        >
                                            <TableCell padding="checkbox" sx={{ color: 'white', paddingLeft: '2rem' }}>
                                                <Checkbox
                                                    checked={isItemSelected}
                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                    sx={{ "& svg": { color: 'white' } }}
                                                />
                                            </TableCell>
                                            {columns.map((column) => (
                                                <TableCell sx={{ color: 'white' }} key={column.id}>{row[column.id]}</TableCell>
                                            ))}

                                            <TableCell>
                                                <IconButton onClick={(event) => handleMenuOpen(event, row.id)}>
                                                    <MoreVertIcon sx={{ color: 'white' }} />
                                                </IconButton>
                                                <Menu
                                                    anchorEl={anchorEl}
                                                    open={Boolean(anchorEl) && currentRowId === row.id}
                                                    onClose={handleMenuClose}
                                                    sx={{
                                                        "& .MuiMenu-paper": { backgroundColor: '#7D54C5' }
                                                    }}
                                                >
                                                    <MenuItem sx={{ color: '#fff' }} onClick={handleEdit}>Edit</MenuItem>
                                                    <MenuItem sx={{ color: 'red' }} onClick={handleDelete}>Delete</MenuItem>
                                                </Menu>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                }

            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={data?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{
                    backgroundColor: '#171821', color: '#fff',
                    "& .MuiTablePagination-selectIcon": { color: '#fff' },
                    "& .MuiTablePagination-actions button svg": { color: '#fff' },
                }}
            />
        </Paper>
    );
};

export default ListingsTable;
