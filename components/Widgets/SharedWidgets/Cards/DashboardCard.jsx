import React from 'react';
import Image from 'next/image';
import ChipContainer from '../Containers/ChipContainer';
import FlexContainer from '../Containers/FlexContainer';
import DynamicTitle from '../Text/DynamicTitle';

const customStyles = {
    container: {
        width: '95%',
        padding: '0.5em 1em',
        bgColor: '#21222D',
        height: '100%',
    },
    title: {
        padding: '0.5em 0.8em',
        fontWeight: '500',
        color: 'white',
        fontSize: '16px'
    },
    count: {
        justifyContent: 'start',
        padding: '0.5em 0 '
    },
};

const DashboardCard = ({ data }) => {
  return (
     // @@ MAIN CONTAINER
     <ChipContainer styles={customStyles.container}>
     {/* FIRST ROW */}
     <FlexContainer grid={12} styles={{ justifyContent: 'start' }} >
         <DynamicTitle text={data?.text}
             styles={customStyles.title}
         />
     </FlexContainer>
     {/* FIRST ROW END */}

     {/* SECOND ROW */}
     <FlexContainer grid={12}
         styles={{
             alignItems: 'flex-start'
         }}
     >
         {/* SECOND ROW IMG */}
         <FlexContainer grid={3.5}>
             <Image
                 src={data.src}
                 alt={data.text}
                 width='50'
                 height='50'
             />
         </FlexContainer>

         {/* SECOND ROW  TITLE */}
         <FlexContainer grid={8}
             styles={customStyles.count}
         >
             <DynamicTitle text={data.count} styles={{ color: '#977C1D' }} />
         </FlexContainer>

     </FlexContainer>
     {/* SECOND ROW END */}

 </ChipContainer>
  )
};

export default DashboardCard;