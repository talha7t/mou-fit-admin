import React, { useState } from 'react';
import { Drawer, List, Box, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { MdHome, MdMoveDown, MdMoveUp, MdPublic, MdSubscriptions } from 'react-icons/md';
import Link from 'next/link';
import { useRouter } from 'next/router';

const drawerWidth = 240;

const styles = {
    drawer: {
        // width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        // width: drawerWidth,
        backgroundColor: '#171821',
    },
    drawerItem: {
        paddingX: '20px',
    },
    iconColor: {
        color: '#87888C',
    },
    iconSize: {
        fontSize: '20px'
    },
    iconWidth: {
        minWidth: '35px'
    },
    logo: {
        minHeight: '64px',
    },
};

const activeLinkStyle = {

    color: '#87888C',
    // @@ ACTIVE LINK 
    '&.Mui-selected': {
        backgroundColor: '#7D54C5',
        color: 'black',
        borderRadius: '5px',
        '& .MuiListItemIcon-root': {
            color: 'black',
        },
    },
    // ' &:hover': { } //   @@ HOVER EFFECT
    // '&.Mui-selected , &:hover': { } // @@ BOTH ACTIVE AND HOVER EFFECT
};

const SidebarComp = (props) => {

    const router = useRouter();
    const [subMenuOpen, setSubMenuOpen] = useState({});

    const toggleSubMenu = (index) => {
        setSubMenuOpen({
            ...subMenuOpen,
            [index]: !subMenuOpen[index],
        });
    };


    const handleDrawerClose = () => {
        props?.setIsClosing(false);
        props?.setMobileOpen(false);
    };

    const menuItems = [
        { text: 'Dashboard', icon: <MdHome />, to: '/' },
        {
            text: 'Website',
            icon: <MdPublic />,
            to: '',
            subItems: [
                { text: 'Home', to: '/customization/home' },
                { text: 'About Us', to: '/customization/about-us' },
                { text: 'Locations', to: '/customization/locations' },
                { text: 'Contact Us', to: '/customization/contact-us' },
                { text: 'How it works', to: '/customization/how-it-works' },
                { text: 'Blog', to: '/customization/blog' },
                { text: 'Subscription', to: '/customization/subscriptions' },
                { text: 'Global', to: '/customization/global-view' },
                { text: 'Privacy', to: '/customization/privacy-&-policy' },


            ],
        },
        {
            text: 'User',
            icon: <MdPublic />,
            to: '',
            subItems: [
                { text: 'Approval', to: '/user/approvals' },
                { text: 'List', to: '/user/list' },
                // { text: 'Details', to: '/user/detail' },

            ],
        },
        { text: 'Partners', icon: <MdHome />, to: '/partners' },
        { text: 'Subscribers', icon: <MdHome />, to: '/subscribers' },
        { text: 'Subscriptions', icon: <MdSubscriptions />, to: '/subscriptions' },
        { text: 'Services', icon: <MdHome />, to: '/services' },
        { text: 'Settings', icon: <MdHome />, to: '/settings' },
    ];

    const renderMenuItems = () => {
        return menuItems.map((item, index) => {
            if (!item.subItems) {
                return (
                    <ListItemButton
                        button="true"
                        key={index}
                        component={Link}
                        href={item.to}
                        selected={router.pathname === item.to}
                        onClick={() => handleDrawerClose()}
                        sx={router.pathname === item.to ? activeLinkStyle : {}}
                    >
                        <ListItemIcon style={styles.iconWidth} sx={[styles.iconColor, styles.iconSize]}  >{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItemButton>
                );
            } else {
                const isSubMenuOpen = subMenuOpen[index];
                return (
                    <React.Fragment key={index}>
                        <ListItemButton button onClick={() => toggleSubMenu(index)}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                            {isSubMenuOpen ? <MdMoveUp /> : <MdMoveDown />}
                        </ListItemButton>
                        <List component="div" disablePadding hidden={!isSubMenuOpen}>
                            {item.subItems.map((subItem, subIndex) => (
                                <ListItemButton
                                    button
                                    key={subIndex}
                                    component={Link}
                                    href={subItem.to}
                                    onClick={() => handleDrawerClose()}
                                    selected={router.pathname === subItem.to}
                                >
                                    <ListItemText primary={subItem.text} />
                                </ListItemButton>
                            ))}
                        </List>
                    </React.Fragment>
                )
            }
        });
    };

    return (
        <Box>
            <Drawer
                variant="temporary"
                open={props?.mobileOpen}
                onClose={handleDrawerClose}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    '& .MuiPaper-root': {
                        backgroundColor: '#171821',
                        color: '#87888C'
                    },
                }}
            >
                <div style={styles.logo} />
                <List
                    sx={styles.drawerItem}
                >{renderMenuItems()}</List>
            </Drawer>
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    '& .MuiPaper-root': {
                        backgroundColor: '#171821',
                        color: '#87888C'
                    },
                }}
                open
            >
                <div style={styles.logo} />
                <List
                    sx={styles.drawerItem}
                >{renderMenuItems()}</List>
            </Drawer>
        </Box>
    );
};

export default SidebarComp;
