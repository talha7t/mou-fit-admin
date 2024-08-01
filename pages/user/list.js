import DataTableComp from '@/components/Widgets/SharedWidgets/Tables/DataTableComp'
import ChipContainer from "@/components/Widgets/SharedWidgets/Containers/ChipContainer";
import DynamicTitle from "@/components/Widgets/SharedWidgets/Text/DynamicTitle";
import { oldAuth, oldDB } from "@/components/firebase-config";
import { newAuth, newDB } from "@/components/firebase-new-config";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import { createUserWithEmailAndPassword, deleteUser } from "firebase/auth";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

let padding = "4em 2em 0 ";

  const Userlist = () => {
    const {
      register,
      getValues,
      setValue,
      watch,
      handleSubmit,
      formState: { errors },
    } = useForm({
      defaultValues: {
        userApprovalForm: {
          userList: [],
        },
      },
    });
    const useFormPropObj = {
      formName: "userApprovalForm",
      register,
      getValues,
      setValue,
      watch,
    };
  
    const [anchorEl, setAnchorEl] = useState(null);
  
    const handleMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleMenuClose = () => {
      setAnchorEl(null);
      // @@ REMOVE USER FROM USER APPROVAL LIST !
    };
  
    const handleApproveClick = (userData, userInd) => {
      console.log(userData);
      // handleMenuClose();
      // // @@ CREATE USER USING EMAIL AND PASSWORD !
      // createUserInNewDB(userData);
      // createUserInOldDB(userData);
      // handleDeleteClick(userData.id);
    };
  
    const handleDeleteClick = async (uID) => {
      console.log(uID);
      try {
        // const userDocRef = doc(newDB, "humans_approval", uID);
        // await deleteDoc(userDocRef);
      } catch (err) {
        console.log(err);
      }
    };
  
   
    useEffect(() => {
      console.log(watch());
      const getUserApprovalList = async () => {
        const newDBRef = collection(oldDB, "humans");
        const newUserSnapshot = await getDocs(newDBRef);
        const newUsers = newUserSnapshot.docs.map((doc) => {
          console.log(doc.id);
          console.log(doc.data());
          return {
            email: doc?.data()?.email,
            password: doc?.data()?.password,
            id: doc?.id,
          };
        });
        console.log(newUsers);
  
        // const filteredList = newUsers?.filter(x => typeof(x.email) !== 'undefined' || x.status !== 'PENDING')
        const filteredList = newUsers?.filter(
          (x) => typeof x?.email !== "undefined"
        );
        console.log(filteredList);
  
        setValue("userApprovalForm.userList", filteredList);
      };
  
      getUserApprovalList();
    }, []);
    return (
      <Grid
        container
        sx={{
          padding: {
            xs: `${padding} 0`,
            sm: `${padding} 0`,
            md: `${padding} 0`,
            lg: `${padding} 0`,
            xl: `${padding} 0`
          },
        }}
        spacing={1}
      >
        <Grid item xs={12} style={{paddingRight: '2em'}}>
          <ChipContainer
            styles={{
              padding: "1em 1.3em",
              margin: "0 1.5em 1em 2em",
            }}
          >
            <Grid item xs={12}>
              <DynamicTitle text="User Approval" />
            </Grid>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Email/Name</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(getValues("userApprovalForm.userList") || [])?.map(
                    (user, userInd) => (
                      <TableRow key={userInd}>
                        {/* // <TableRow key={userInd} onClick={() => {console.log(user, userInd)}}> */}
                        <TableCell>{user.email}</TableCell>
                        <TableCell>PENDING</TableCell>
                        <TableCell>
                          <Button
                            aria-controls="user-menu"
                            aria-haspopup="true"
                            onClick={handleMenuOpen}
                          >
                            {/* <MoreVertIcon /> */}
                            ...
                          </Button>
                          <Menu
                            id="user-menu"
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                          >
                            <MenuItem
                              onClick={() => handleApproveClick(user, userInd)}
                            >
                              Approve
                            </MenuItem>
                            <MenuItem onClick={() => handleDeleteClick(user.id)}>
                              Delete
                            </MenuItem>
                          </Menu>
                        </TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </ChipContainer>
        </Grid>
      </Grid>
    );
  };

export default Userlist