import React from 'react';
import { Grid } from '@mui/material';
import MultiImgsWithPreview from '@/components/Widgets/SharedWidgets/ImgUpload/MultiImgsWithPreview'
import ChipContainer from '@/components/Widgets/SharedWidgets/Containers/ChipContainer';
import InputsStackComp from '@/components/Widgets/SharedWidgets/InputFields/InputsStackComp';

const TitleWithMultipleImgs = ({ uniqueKey, useFormPropObj, body, targetArr
    // ,renderCount 
}) => {
    return (
        <>
            <ChipContainer styles={{ bgColor: '#171821', padding: '0.8em 0 1.2em 0', margin: '1em 0' }} >
                <Grid container sx={{ width: '100%' }} >
                    {/* INPUT */}
                    <Grid item xs={6}>
                        {/* <div>TitleWithMultipleImgs</div> */}

                        <InputsStackComp grid={12} dataObj={{
                            arrToMap: targetArr,

                        }} useFormPropObj={useFormPropObj} />
                    </Grid>

                    <Grid item xs={6}>
                        <MultiImgsWithPreview uniqueKey={uniqueKey} 
                        // renderCount={renderCount}
                         useFormPropObj={useFormPropObj} pictures={body?.imgs_arr ?? []} />
                    </Grid>
                </Grid>
            </ChipContainer>
        </>
    )
}

export default TitleWithMultipleImgs