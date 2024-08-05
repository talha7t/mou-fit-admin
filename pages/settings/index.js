import React from 'react';
import { FiMail } from 'react-icons/fi';
import SettingsCard from '@/components/Widgets/SharedWidgets/Cards/SettingsCard';
import ChipContainer from '@/components/Widgets/SharedWidgets/Containers/ChipContainer';
import { Grid } from '@mui/material';
import DynamicTitle from '@/components/Widgets/SharedWidgets/Text/DynamicTitle';

const containerStyles = {
  padding: {
    xs: `4em 0 1rem 0`,
    sm: "4em 2rem 0 260px",
    md: "4em 2rem 0 260px",
    lg: "4em 2rem 0 260px",
    xl: "4em 2rem 0 260px",
  },
}

const Settings = () => {

  const cardData = [
    { title: 'Users', description: 'Configurate your email address from which all automatic emails will be sent to your customers', icon: <FiMail />, to: '/settings/user' },
    { title: 'Categories', description: 'Manage the languages your customers see on your store', icon: <FiMail />, to: '/settings/categories' },
    { title: 'Payment Gateway', description: 'Add your payment methods', icon: <FiMail />, to: '/settings/gateway' },
    { title: 'User Permissions', description: 'Assign role and permissions to the users', icon: <FiMail />, to: '/settings/permissions' },
    { title: 'Tags', description: 'Define tags for services search and subscribers loyalty tags', icon: <FiMail />, to: '/settings/tags' },
    { title: 'Email & Configuration', description: 'Define tags for services search and subscribers loyalty tags', icon: <FiMail />, to: '/settings/email-config' },
  ];

  return (
    <>
      <Grid container
        sx={containerStyles}
        spacing={1}
      >

        <ChipContainer styles={{
          padding: '1em 1.3em',
          margin: '0 1.5em 1em 2em',
          display: 'flex',
          flexDirection: 'column',
          width: '95%',

        }} >
          
          <DynamicTitle text={'Setting'} styles={{ fontSize: '18px', padding: '0.5em 0 1em 0' }} />

          <SettingsCard data={cardData} />

        </ChipContainer>
      </Grid>
    </>
  )
}

export default Settings;