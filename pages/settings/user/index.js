import TitleAndBtnRow from '@/components/Sections/SharedSections/TitleAndBtnRow';
import ChipContainer from '@/components/Widgets/SharedWidgets/Containers/ChipContainer';
import { Grid } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

const UserList = () => {

  
  const router = useRouter();
  let padding = '4em 0 0 ';

  return (
    <>
      <Grid container
        sx={{
          padding: {
            sm: `${padding} 6em`,
            md: `${padding} 5em`,
            lg: `${padding} 1.2em`,
            xl: `${padding} 0em`
          },
        }}
        spacing={1}
      >
        <ChipContainer styles={{
          padding: '1em 1em 1em 0em',
          margin: '0 1em 0 1em',
        }} >

          <TitleAndBtnRow data={{
            text: 'User Management',
            backLink: '/settings',
            title: 'Add User',
            onClick: () => router.push('/settings/user/createUser')
          }}
          styles={{
            margin: '0'
          }}
          />

        </ChipContainer>
      </Grid>
    </>
  )
};

export default UserList;