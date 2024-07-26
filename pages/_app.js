import { useRouter } from "next/router";
import { Grid } from "@mui/material";
import SideBarComp from "@/components/Sections/SharedSections/SideBarComp";
import { isUserAuthenticated } from "@/components/Utils/Auth/userAuth";
import "@/styles/globals.css";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    // Check the screen size on initial render
    checkScreenSize();

    // Add event listener for window resize
    window.addEventListener("resize", checkScreenSize);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // '/', '_error'
  // @@ use '_error' if not using custom Page
  const isRestrictedRoute = [
    "/404",
    "/authentication/forgot-password",
    "/authentication/signin",
    "/authentication/signup",
    "/authentication/reset-password",
    "/authentication/get-verified",
  ].includes(router.pathname);

  if (isRestrictedRoute) return <Component {...pageProps} />;

  // Function to check the window width and update state
  const checkScreenSize = () => {
    if (typeof window !== "undefined" && window.innerWidth <= 768) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  };

  return (
    <>
      <Grid container style={{ paddingTop: isSmallScreen ? "3vh" : "inherit" }}>
        {/* SIDEBAR COMP */}
        <Grid item xs={1.8}>
          {/* {!isRestrictedRoute && !isUserAuthenticated && <SideBarComp />} */}
          {!isRestrictedRoute && <SideBarComp isSmallScreen={isSmallScreen} />}
        </Grid>

        {/* <Grid item xs={!isRestrictedRoute ? 12 : 10.2} > */}
        <Grid item xs={10.2}>
          <Component {...pageProps} />
        </Grid>
      </Grid>
    </>
  );
}
