import React, { useState, useEffect } from 'react';
import DashboardView from '@/components/View/DashboardView';
import AuthWrapper from '@/components/Utils/Auth/authWrapper';
import { isUserAuthenticated } from '@/components/Utils/Auth/userAuth';

const Dashboard = () => {
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   if (!isUserAuthenticated) {
  //     setIsLoading(false);
  //   } else {
  //     setIsLoading(true);
  //   }
  // }, [isLoading])

  return (
    <>
    <DashboardView />
      {/* {isLoading && <DashboardView />} */}

    </>
  )
};

export default AuthWrapper(Dashboard);
// export default Dashboard;