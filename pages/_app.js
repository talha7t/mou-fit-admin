import { useRouter } from 'next/router';
import { Grid } from '@mui/material'
import SideBarComp from '@/components/Sections/SharedSections/SideBarComp';
import { isUserAuthenticated } from '@/components/Utils/Auth/userAuth';
import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
  const router = useRouter();

  // '/', '_error'
  // @@ use '_error' if not using custom Page 
  const isRestrictedRoute = ['/404', '/authentication/forgot-password', '/authentication/signin','/authentication/signup', '/authentication/reset-password', '/authentication/get-verified'].includes(router.pathname);
  
  return <>
    <Grid container >
      {/* SIDEBAR COMP */}
      <Grid item xs={1.8} >
        {/* {!isRestrictedRoute && !isUserAuthenticated && <SideBarComp />} */}
        {!isRestrictedRoute  && <SideBarComp />}
      </Grid>
      
      {/* <Grid item xs={!isRestrictedRoute ? 12 : 10.2} > */}
      <Grid item xs={10.2} >
        <Component {...pageProps} />
      </Grid>

    </Grid>
  </>
};
