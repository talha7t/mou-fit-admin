import React from 'react'
import { getUniqueArray } from '@/components/Helpers/GlobalFuncs/arrFuncs'
import { Grid, Chip } from '@mui/material'

const ChipContainerSection = ({ dataObj, styles,  }) => {
    return (
        <Grid container spacing={styles?.spacing ?? 1} sx={{ marginTop: 1 }}>
            {dataObj?.arrForMap && getUniqueArray(dataObj?.arrForMap, 'label').map((item, i) => (
                <Grid item key={i}>
                    <Chip

                        label={item.label}
                        onDelete={dataObj?.handleDelete(item)}
                        color="primary"
                        sx={{ cursor: 'pointer' }}
                    />
                </Grid>
            ))}
        </Grid>
    )
}

export default ChipContainerSection