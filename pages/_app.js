import { useRouter } from "next/router";
import { AppBar, Box, CssBaseline, IconButton, Toolbar } from "@mui/material";
import SideBarComp from "@/components/Sections/SharedSections/SideBarComp";
import { isUserAuthenticated } from "@/components/Utils/Auth/userAuth";
import "@/styles/globals.css";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";

const drawerWidth = 240;

export default function App({ Component, pageProps }) {
  const router = useRouter();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

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

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        color="primary"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          background: "transparent",
          boxShadow: "none",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <SideBarComp
          mobileOpen={mobileOpen}
          isClosing={isClosing}
          setIsClosing={setIsClosing}
          setMobileOpen={setMobileOpen}
        />
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Component {...pageProps} />
      </Box>
    </Box>
  );
}
