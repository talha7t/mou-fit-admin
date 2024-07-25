import React from 'react';
import MUIDataTable from 'mui-datatables';
import { Grid, IconButton, Menu, MenuItem } from '@mui/material';
import Link from 'next/link';
import { AiOutlineMenuFold } from 'react-icons/ai';

const useMenuState = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);

    };
    const handleClose = (str) => {
        setAnchorEl(null);
        if (str) {
            console.log(str)
        }
    };
    return [anchorEl, handleClick, handleClose];
};

const CustomActionCell = ({ dataIndex, ind }) => {
    const [anchorEl, handleClick, handleClose] = useMenuState();
    const handleDetailsClick = (i) => {
        console.log(ind)
    }
    return (
        <>
            <IconButton onClick={handleClick} style={{ color: 'white' }}>
                <AiOutlineMenuFold />
                {/* <MoreHoriz /> */}...
            </IconButton>
            <Menu
                id="menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                  {/* <MenuItem onClick={() => handleDetailsClick(dataIndex)}>
                    Details
                </MenuItem> */}
                <MenuItem onClick={() => handleDetailsClick(dataIndex)}>
          Details
        </MenuItem>
                <MenuItem onClick={() => handleClose('edit')}>
                    {/* <Edit /> */}
                    Edit
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    {/* <Delete /> */}
                    Delete
                </MenuItem>
            </Menu>
        </>
    );
};



const data = [
    { id: '2',title: 'Lorem Ipsum', status: 'Active' },
    { id: '4',title: 'Dolor Sit', status: 'Inactive' },
    { id: '6',title: 'Amet Consectetur', status: 'Active' },
    { id: '8',title: 'Adipiscing Elit', status: 'Inactive' },
    { id: '10',title: 'Lorem Ipsum', status: 'Active' },
    { id: '12',title: 'Dolor Sit', status: 'Inactive' },
    { id: '14',title: 'Amet Consectetur', status: 'Active' },
    { id: '11',title: 'Adipiscing Elit', status: 'Inactive' },
    { id: '1',title: 'Lorem Ipsum', status: 'Active' },
    { id: '24',title: 'Amet Consectetur', status: 'Active' },
    { id: '21',title: 'Adipiscing Elit', status: 'Inactive' },
    { id: '2',title: 'Lorem Ipsum', status: 'Active' },
  
];

const options = {
    filterType: 'checkbox',

    setTableProps: () => ({
        // set custom styles for the table
        style: {
            backgroundColor: '#171821',
            width: '100%',
        },
    }),

};

// const options = {
//     filterType: 'checkbox',
//     customToolbarSelect: () => {},
//     customToolbar: () => {},
//     // elevation: 30,
//     selectableRows: 'none',
//     // print: false,
//     // download: false,
//     // search: false,
//     // viewColumns: false,
//     // pagination: false,

//     setTableProps: () => ({
//       style: {
//         backgroundColor: '#21222d',
//         width: '100%',
//       },
//     }),
//     responsive: 'vertical', // Remove the border

//     headRowStyle: {
//         backgroundColor: '#21222d', // Change the background color of the table header
//       },
//       footRowStyle: {
//         backgroundColor: '#21222d', // Change the background color of the table footer
//       },

//     // customRowRender: (data, dataIndex, rowIndex) => {
//     //   return (
//     //     <Link href={`/details/${rowIndex + 1}`} passHref>
//     //       <tr>{data.map((cellData, cellIndex) => <td key={cellIndex}>{cellData}</td>)}</tr>
//     //     </Link>
//     //   );
//     // },
//   };


const DataTableComp = ({dataObj}) => {
    const columns = [
        {
            name: 'title',
            label: 'Title',
            options: {
                filter: false,
                sort: true,
               
            },
        },
        {
            name: 'status',
            label: 'Status',
            options: {
                filter: true,
                sort: false,
                customBodyRenderLite: (dataIndex) => {
                    const status = dataObj?.arrToMap[dataIndex].status ?? data[dataIndex].status;
                    const color = status === 'Active' ? '#a154c5' : 'red';
                    const bgColor = status === 'Active' ? '#80008026' : '#f2dede';
                    return (
                        <span
                            style={{
                                color: color,
                                backgroundColor: bgColor,
                                padding: '5px',
                                borderRadius: '5px',
                                width: '30%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            {status}
                        </span>
                    );
                },
            },
        },
        {
            name: 'action',
            label: 'Action',
            options: {
                filter: false,
                sort: false,
                customBodyRenderLite: (dataIndex) => {
                    return <CustomActionCell dataIndex={dataIndex} ind={data[dataIndex].id} />;
                },
            },
        },
    ];
    return (
        <Grid item xs={12} sx={{
            padding: '1em',
            "& .MuiToolbar-root": {
                backgroundColor: '#171821',
                color: 'white',
            },
            "& .MuiTableRow-root": {
                // border: '1px solid #171821',
                color: 'white',
                border: 'none'
                // "&:nth-of-type(even)": {
                //     backgroundColor: '#f2f2f2',
                //     // color: 'white'
                // }
            },
            "& .MuiTableCell-head": {
                backgroundColor: '#171821',
                color: 'white',

            },

            "& .MuiTableCell-body": {
                color: 'white',
                // border: '1px solid #171821',
                border: 'none',
                // backgroundColor: '#171821',

            },
            "& .MuiTableCell-footer": {
                color: '#000',
                // border: '1px solid #171821',
                border: 'none',
                backgroundColor: '#171821'

            },
            "& .MuiPaginationItem-root": {
                color: 'white',
            },
            "& .Mui-selected": {
                // backgroundColor: '#21222d',
                color: '#fff',
                "&:hover": {
                    // backgroundColor: '#21222d',
                }
            },
            "& .MuiIconButton-root": {
                color: '#21222d',
            },
            "& .MuiMenu-paper": {
                // backgroundColor: '#f2f2f2',
                color: '#000',
            },
            "& .MuiMenuItem-root": {
                color: '#000',
                "&:hover": {
                    // backgroundColor: '#21222D',
                }
            },
            "& .MuiTableRow-hover:active": {
                // backgroundColor: '#21222D',
            },
            "& .MuiSvgIcon-root": {
                fill: 'white'
            },
            // "& .MuiDataTableHeadCell-data": {
            //     // color: "white !important",
            //     color: 'black'
            //   },
            //   "& .MuiDataTableHeadCell-sortActive " : {
            //     // color: "white !important",
            //     color: 'black'
            //   }
            "& .MuiButtonBase-root .MuiIconButton-root .MuiIconButton-sizeMedium, .MuiSvgIcon-root .MuiSvgIcon-fontSizeMedium ": {
                color: 'black',
                backgroundColor: 'black'
            }

        }}>
            {/* <MUIDataTable
                title={dataObj?.tableTitle ??'Blogs Table' }
                data={dataObj?.arrToMap ?? dataObj?.tableData ?? data}
                columns={dataObj?.tableColumns ?? columns}
                options={dataObj?.tableOptions ?? options}
            /> */}

        </Grid>
    );
};

export default DataTableComp;