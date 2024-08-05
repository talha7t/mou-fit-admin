import TitleAndBtnRow from '@/components/Sections/SharedSections/TitleAndBtnRow';
import ChipContainer from '@/components/Widgets/SharedWidgets/Containers/ChipContainer';
import { Grid } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

const containerStyles = {
  padding: {
    xs: `4em 1rem 1rem 1rem`,
    sm: "4em 2rem 0 260px",
    md: "4em 2rem 0 260px",
    lg: "4em 2rem 0 260px",
    xl: "4em 2rem 0 260px",
  },
}

const UserList = () => {

  const router = useRouter();
  let padding = '4em 0 0 ';

  return (
    <>
      <Grid container
        sx={containerStyles}
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