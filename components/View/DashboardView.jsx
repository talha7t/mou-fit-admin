import React from 'react';
import { Grid } from '@mui/material';
import { MdHome } from 'react-icons/md';

import Icon1 from '../../public/images/dashboardImages/Icon1.png';
import Icon2 from '../../public/images/dashboardImages/Icon2.png';
import Icon3 from '../../public/images/dashboardImages/Icon3.png';
import Icon4 from '../../public/images/dashboardImages/Icon4.png';

// import DashboardCardSection from '../Sections/SingleUseSections/DashboardSections/DashboardCardSection';
import DashboardCard from '../Widgets/SharedWidgets/Cards/DashboardCard';


const DashboardView = () => {

    const dashboardChips = [
        { text: 'Total Partners', icon: <MdHome />, count: 500, src: Icon1 },
        { text: 'Active Partners', icon: <MdHome />, count: 500, src: Icon2 },
        { text: 'Inactive Partners', icon: <MdHome />, count: 500, src: Icon3 },
        { text: 'New Signup', icon: <MdHome />, count: 500, src: Icon4 },
    ];

    let padding = '4em 0 0 ';

    return (
        <Grid container
            sx={{
                padding: {
                    sm: `${padding} 6em`,
                    md: `${padding} 5em`,
                    lg: `${padding} 2em`,
                    xl: `${padding} 0em`
                }
            }}
            spacing={1}
        >
            {dashboardChips.map((item, index) => (
                <Grid key={index} item xs={6} sm={5} md={4} lg={2.7} xl={2.2}  >
                    <DashboardCard
                        key={index}
                        data={item}
                    />
                </Grid>
            ))}
        </Grid>
    )
};

export default DashboardView;