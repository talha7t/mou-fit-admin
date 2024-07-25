import ChipContainer from '@/components/Widgets/SharedWidgets/Containers/ChipContainer'
import FlexContainer from '@/components/Widgets/SharedWidgets/Containers/FlexContainer'
import SingleDropdown from '@/components/Widgets/SharedWidgets/Dropdown/SingleDropdown'
import DynamicTitle from '@/components/Widgets/SharedWidgets/Text/DynamicTitle'
import { Grid } from '@mui/material'
import React from 'react'
import AutoCompleteWithChipsSection from '../../SharedSections/AutoCompleteWithChipsSection'

const serviceOptionList = [
    { label: 'Service 1', value: 'service1' },
    { label: 'Service 2', value: 'service2' },
    { label: 'Service 3', value: 'service3' },
    { label: 'Service 4', value: 'service4' },
  ];

const AboutUsFifthBanner = ({useFormPropObj}) => {

  return (
    <>
    <ChipContainer styles={{ bgColor: '#171821', padding: '0.8em 0 1.2em 0', margin: '1em 0' }} >
        <FlexContainer grid={12} styles={{ justifyContent: 'start' }}>
            <DynamicTitle text={'We have partnered with some of the Fitness Institutes'} styles={{ padding: '0 0 0.3em 1em' }} />
        </FlexContainer>

        <FlexContainer grid={12} styles={{display: 'flex', alignItems: 'start'}} >

          <Grid item xs={6} sx={{ display: 'flex', flexDirection: 'column' }} >
           

            <Grid item xs={12} sx={{ display: 'flex', marginTop: '1em' }}>
              <Grid item xs={4.5} lg={3} xl={3} >
                <DynamicTitle text={'Gyms Shown'} styles={{ padding: '0.5em 0 0 1em', fontSize: '12px' }} />
              </Grid>

              <Grid item xs={7.5} lg={9.5} xl={9}  >
                <SingleDropdown
                  dataObj={{
                    target: 'fifthBanner.gymCount',
                    // label: '',
                    arrToMap: serviceOptionList
                  }}
                  styles={{ width: '40%' }}
                  useFormPropObj={useFormPropObj}
                />
              </Grid>
            </Grid>
          </Grid>


          {/* <FlexContainer grid={6} styles={{
             display: 'flex',alignItems: 'self-start'
          }} > */}
            <Grid item xs={6} sx={{ display: 'flex', alignItems: 'self-start', marginTop: '0.5em' }}>

            <AutoCompleteWithChipsSection
              gridObj={{
                title: {
                  md: 4, lg: 3
                }
              }}
              dataObj={{
                title: 'Select Gyms',
                label: "Label",
                target: "fifthBanner.selectedGyms",
                optionsList: serviceOptionList,
                arrToMap: [],
                value: useFormPropObj.getValues(`${useFormPropObj.formName}.fifthBanner.selectedGyms`)
              }}
              useFormPropObj={useFormPropObj}
            />
</Grid>


          {/* </FlexContainer> */}

        </FlexContainer>

        </ChipContainer>
    </>
  )
}

export default AboutUsFifthBanner
