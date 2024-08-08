import TitleAndBtnRow from '@/components/Sections/SharedSections/TitleAndBtnRow'
import ChipContainer from '@/components/Widgets/SharedWidgets/Containers/ChipContainer'
import { Box, Grid, Input, TextField } from '@mui/material'
import React, { useState } from 'react'

const containerStyles = {
    margin: {
        xs: "3em 1rem 0 1rem",
        sm: "4em 2rem 0 260px",
        xl: "4em 2rem 0 260px",
        lg: "4em 2rem 0 260px",
        md: "4em 2rem 0 260px",
    },
}

const textFieldStyles = {
    color: '#fff',
    background: 'none',
    input: {
        width: '100%',
        color: 'white', // Text color
        padding: '10px 1rem'
    },
    '& .MuiInputLabel-root': {
        color: '#aaa', // Label color

        top: '-5px', // Adjust top position for default label placement
        '&.Mui-focused, &.MuiFormLabel-filled': {
            top: 0, // Reset top position when focused or filled
            transform: 'translate(14px, -8px) scale(0.75)', // Adjust label position
        },
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#fff', // Default border color
            color: 'white',
        },
        '&:hover fieldset': {
            borderColor: '#fff', // Border color on hover
            color: 'white',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#fff', // Border color when focused
            color: 'white',
        },
    },
}


const partnerForm = ({ id }) => {
    const locationName = ""
    const region = ""
    const poc = ""
    const contact = ""
    const [fileName, setFileName] = useState('Upload your VAT licence');

    const handleFile = (e) => {
        console.log('event', e.target.files)
        if (e?.target?.files?.length > 0) {
            let name = e.target.files[0].name
            if (name.length > 10) {
                setFileName(name.substring(0, 13) + '...')
            } else {
                setFileName(name)
            }
        }
    }

    return (
        <Box sx={containerStyles}>
            <ChipContainer>
                <TitleAndBtnRow
                    data={{
                        text: `${id ? 'Edit' : 'Create'} Partner`,
                        title: "Save",
                        onClick: () => { },
                    }}
                    styles={{
                        margin: "0 1em",
                    }}
                />

                <Box sx={{ width: '100%', margin: '1rem', padding: '1rem', backgroundColor: '#171821', color: '#fff' }}>
                    <h1>Basic Details</h1>

                    <Grid container margin='1rem 0'>
                        <Grid item xs={12} sm={6} marginBottom={'1rem'}>
                            <TextField sx={textFieldStyles} fullWidth id="outlined-basic" label="Name" variant="outlined" />
                        </Grid>
                        <Grid item xs={12} sm={6} marginBottom={'1rem'} sx={{ paddingLeft: { sm: '1rem' } }}>
                            <TextField sx={textFieldStyles} fullWidth id="outlined-basic" label="Region" variant="outlined" />
                        </Grid>
                        <Grid item xs={12} sm={6} marginBottom={'1rem'}>
                            <TextField sx={textFieldStyles} fullWidth id="outlined-basic" label="POC" variant="outlined" />
                        </Grid>
                        <Grid item xs={12} sm={6} marginBottom={'1rem'} sx={{ paddingLeft: { sm: '1rem' } }}>
                            <TextField sx={textFieldStyles} fullWidth id="outlined-basic" label="Contact" variant="outlined" />
                        </Grid>
                    </Grid>

                    <h1>Bank Details</h1>

                    <Grid container margin='1rem 0'>
                        <Grid item xs={12} sm={6} marginBottom={'1rem'}>
                            <TextField sx={textFieldStyles} fullWidth id="outlined-basic" label="Bank Name" variant="outlined" />
                        </Grid>
                        <Grid item xs={12} sm={6} marginBottom={'1rem'} sx={{ paddingLeft: { sm: '1rem' } }}>
                            <TextField sx={textFieldStyles} fullWidth id="outlined-basic" label="IBAN /Acc No" variant="outlined" />
                        </Grid>
                        <Grid item xs={12} sm={6} marginBottom={'1rem'}>
                            <TextField sx={textFieldStyles} fullWidth id="outlined-basic" label="Branch code" variant="outlined" />
                        </Grid>
                        <Grid item xs={12} sm={6} marginBottom={'1rem'} sx={{ paddingLeft: { sm: '1rem' } }}>
                            <TextField sx={textFieldStyles} fullWidth id="outlined-basic" label="Swift Code" variant="outlined" />
                        </Grid>
                    </Grid>

                    <h1>Company Details</h1>

                    <Grid container margin='1rem 0'>
                        <Grid item xs={12} sm={6} marginBottom={'1rem'}>
                            <TextField sx={textFieldStyles} fullWidth id="outlined-basic" label="Company Reg" variant="outlined" />
                        </Grid>
                        <Grid item xs={12} sm={6} marginBottom={'1rem'} sx={{ paddingLeft: { sm: '1rem' } }}>
                            <TextField sx={textFieldStyles} fullWidth id="outlined-basic" label="Trade Licence" variant="outlined" />
                        </Grid>
                        <Grid item xs={12} sm={6} marginBottom={'1rem'}>
                            <TextField sx={textFieldStyles} fullWidth id="outlined-basic" label="VAT No" variant="outlined" />
                        </Grid>
                        <Grid item xs={12} sm={6} marginBottom={'1rem'} sx={{ paddingLeft: { sm: '1rem' } }}>
                            <label htmlFor="vat-file"
                                className=' text-black h-full  flex items-center cursor-pointer overflow-none'>
                                <span style={{ backgroundColor: '#E6E6E6' }}
                                    className='bg-white h-full w-2/6 flex items-center justify-center mr-4'
                                >
                                    Browse File
                                </span>
                                <span style={{ color: '#828282' }}>
                                    {fileName}
                                </span>
                            </label>
                            <input type="file" id="vat-file" onChange={handleFile} style={{ display: 'none' }} />
                        </Grid>
                    </Grid>
                </Box>

                <Box sx={{ width: '100%', margin: '1rem', padding: '1rem', backgroundColor: '#171821', color: '#fff' }}>
                    <h1>Add Location</h1>

                    <Grid container margin='1rem 0'>
                        <Grid item xs={12} sm={6} marginBottom={'1rem'}>
                            <TextField sx={textFieldStyles} fullWidth id="outlined-basic" label="Name" variant="outlined" />
                        </Grid>
                        <Grid item xs={12} sm={6} marginBottom={'1rem'} sx={{ paddingLeft: { sm: '1rem' } }}>
                            <TextField sx={textFieldStyles} fullWidth id="outlined-basic" label="POC" variant="outlined" />
                        </Grid>
                        <Grid item xs={12} sm={6} marginBottom={'1rem'}>
                            <TextField sx={textFieldStyles} fullWidth id="outlined-basic" label="Status" variant="outlined" />
                        </Grid>
                        <Grid item xs={12} sm={6} marginBottom={'1rem'} sx={{ paddingLeft: { sm: '1rem' } }}>
                            <TextField sx={textFieldStyles} fullWidth id="outlined-basic" label="Contact" variant="outlined" />
                        </Grid>
                    </Grid>

                </Box>
            </ChipContainer >
        </Box>
    )
}

export default partnerForm