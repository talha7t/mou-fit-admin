import React from 'react';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import DynamicTitle from '../Text/DynamicTitle';
import Link from 'next/link';

const styles = {
  card: {
    height: '100px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#171821',
    display: 'flex',
    alignItems: 'center',
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    color: 'white',
  },
  icon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '2em',
    color: '#7D54C5',
    marginBottom: '0',
    // width: '20px',
    // height: '16px'
  },
  title: {
    color: 'white',
    padding: '0 0 5px 0',
    fontSize: '12px',
  },
  desc: { fontSize: '9px' },
};

const SettingsCard = ({ data }) => {
  return (
    <Grid container spacing={2}>
      {data?.map((card, index) => (
        <Grid item key={index} xs={11} sm={5.5} md={3.5} xl={2.5} >
          <Link href={card.to} >
            <Card sx={styles.card}>
              <CardContent sx={{ width: '100%' }}>
                <Grid item xs={12} sx={styles.cardContent}>

                  <Grid item xs={3} sx={styles.icon} >
                    {card.icon}
                  </Grid>

                  <Grid item xs={9}>
                    <DynamicTitle text={card.title} styles={styles.title} />
                    <DynamicTitle text={card.description} styles={styles.desc} />
                  </Grid>

                </Grid>
              </CardContent>
            </Card>
          </Link>
        </Grid>
      ))}
    </Grid>
  )
};

export default SettingsCard;