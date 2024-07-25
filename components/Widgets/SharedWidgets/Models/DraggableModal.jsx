import React, { useEffect, useState } from "react";
import {
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Box,
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
  Input,
  TextField,
} from "@mui/material";
import { AiOutlineDrag, AiFillPlusCircle } from "react-icons/ai";
import { ReactSortable } from "react-sortablejs";
import { draggableModalStyles } from "./draggableModalStyles";
import {
  extractNullAndFinalArr,
  nullifyUnUsedKeys,
  processArrayAndObject,
} from "./draggableModalLogic";
// import '../Models/draggableModal.css';

// import '/DraggableModal.css';

const DraggableListItem = ({
  value,
  removeSection,
  hidden,
  useFormPropObj,
}) => {
  const handleRemoveSection = () => {
    removeSection(value);
    console.log(useFormPropObj?.watch());
    console.log(value);
  };

  return hidden ? null : (
    <ListItem>
      <ListItemIcon className="drag-handle">
        <AiOutlineDrag />
      </ListItemIcon>
      <ListItemText primary={value.label} />
      <span
        style={draggableModalStyles.closeButton}
        onClick={handleRemoveSection}
      >
        X
      </span>
    </ListItem>
  );
};

const DraggableModal = ({
  handleCloseModal,
  setCurrentState,
  useFormPropObj,
  currentState,
  availableSections,
}) => {
  const { formName } = useFormPropObj;

  const [sections, setSections] = useState(currentState || []);
  const [removedSections, setRemovedSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState("");

  const handleRemoveSection = (section) => {
    console.log(section);
    setSections((prevSections) => {
      const newSections = prevSections?.filter(
        (s) => s.index !== section.index
      );
      setRemovedSections((prevRemovedSections) => [
        ...prevRemovedSections,
        section,
      ]);

      return newSections;
    });
  };

  const handleAddSection = () => {
    // console.log("availableSections", availableSections);
    const section = availableSections?.find((s) => s.label === selectedSection);
    console.log("section", section);
    // @@ GET ROUTE FROM "USEROUTER()" && conditional RENDER UNIQUE KEY
    if (section && section.label === "slider_section") {
      // console.log("setValue", `${section.index}-slider_section.parentRelated`);
      // @@ x.label
      // useFormPropObj?.setValue(`${section.index}-slider_section.parentRelated`,)
    }

    if (section) {
      setSections((prevSections) => [...prevSections, section]);
      setSelectedSection("");
      console.log("AFTER sections", sections);
    }
  };

  const handleSaveChanges = () => {
    // console.log("sections", sections);
    try {
      let newWatchObj = {};
      let tempFormWatchObj = useFormPropObj.watch()[`${formName}`]; //.${formName}
      let updatedSections = [];

      updatedSections = sections?.map((section, index) => ({
        ...section,
        index,
        prevIndex: section?.index,
        is_active: section?.is_active ?? true,
        related_parent: section?.related_parent ?? false,
      }));

      // @@ PASS UPDATED ARR &&  useFormPropObj.watch()[`${formName}`]
      let finalArr = processArrayAndObject(updatedSections, tempFormWatchObj);

      // @@ SET VALUES USING UNIQUE KEYS INTO MAIN WATCH OBJ ==> (useFormPropObj.watch()[`${formName}`]) !!!
      finalArr?.newArray?.map((x, i) => {
        useFormPropObj.setValue(`${formName}.${i}-${x?.label}`, x);
      });

      // @@ SET TEMP STATE HERE !!!
      newWatchObj = finalArr?.newObj ?? {};
      newWatchObj.updatedSections = finalArr?.newArray ?? [];
      newWatchObj.dynamicSectionsArr = finalArr?.newArray ?? [];

      // @@ SET FINAL STATE HERE !!!
      setCurrentState(updatedSections);
      useFormPropObj.setValue(`${formName}`, newWatchObj);

      // @@ CLOSE MODAL !!!
      handleCloseModal();
    } catch (err) {
      console.error(err);
    }
  };

  const hiddenSections = () => {
    return (
      [
        ...removedSections,
        ...currentState?.filter((s) => !sections.includes(s)),
      ] || []
    );
  };

  // useEffect(() => {
  //   console.log('Updated Sections:', sections);
  // }, [sections]);

  return (
    <>
      <style jsx>{`
        .container {
          width: 400px;
          height: 300px;
          margin: 30px auto;
          box-shadow: 0 0 2px gray;
          overflow: scroll;
          overflow-x: hidden;
        }

        /* Define the scrollbar style */
        .container::-webkit-scrollbar {
          width: 15px;
          height: 15px;
        }

        /* Define the thumb style */
        .container::-webkit-scrollbar-thumb {
          background: linear-gradient(
            to bottom right,
            #4d7fff 0%,
            #1a56ff 100%
          );
          border-radius: 5px;
        }

        /* Define the track style */
        .container::-webkit-scrollbar-track {
          background-color: #ddd;
          border: 10px solid #ccc;
        }

        /* Style the beginning section of the scrollbar track */
        .container::-webkit-scrollbar-track-piece:vertical:start {
          background-color: #4d7fff;
        }

        /* Style the end section of the scrollbar track */
        .container::-webkit-scrollbar-track-piece:vertical:end {
          background-color: #673ab769;
        }

        /* Define the button style */
        .container::-webkit-scrollbar-button:vertical {
          background-color: #4d7fff;
          background-repeat: no-repeat;
          background-size: 50%;
          background-position: center;
        }

        .container::-webkit-scrollbar-button:vertical:decrement {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' fill='%23000000' viewBox='0 0 256 256'%3E%3Cpath d='M213.66,165.66a8,8,0,0,1-11.32,0L128,91.31,53.66,165.66a8,8,0,0,1-11.32-11.32l80-80a8,8,0,0,1,11.32,0l80,80A8,8,0,0,1,213.66,165.66Z'%3E%3C/path%3E%3C/svg%3E");
        }

        .container::-webkit-scrollbar-button:vertical:increment {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' fill='%23000000' viewBox='0 0 256 256'%3E%3Cpath d='M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z'%3E%3C/path%3E%3C/svg%3E");
        }

        /* Define the button style when being hovered over */
        .container::-webkit-scrollbar-button:hover {
          background-color: #999999;
        }
      `}</style>
      <div style={draggableModalStyles.modal}>
        <div style={draggableModalStyles.modalContent}>
          <h2>Draggable List Modal</h2>

          <Box
            sx={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}
          >
            <FormControl variant="standard" sx={{ m: 1, mt: 3, width: "100%" }}>
              <TextField
                select
                label="Add Section"
                value={selectedSection}
                onChange={(event) => setSelectedSection(event.target.value)}
                InputProps={{
                  endAdornment: (
                    <AiFillPlusCircle
                      onClick={handleAddSection}
                      style={{ cursor: "pointer" }}
                    />
                  ),
                }}
              >
                {availableSections?.map((section, i) => (
                  <MenuItem key={section?.index} value={`${section?.label}`}>
                    {section?.label}
                  </MenuItem>
                ))}
              </TextField>
              {selectedSection && (
                <FormHelperText>
                  {`Add Section: '${selectedSection}' At Index '${
                    sections?.length + 1
                  }'`}{" "}
                </FormHelperText>
              )}
            </FormControl>

            <Button
              variant="contained"
              color="primary"
              disabled={!selectedSection}
              onClick={handleAddSection}
              style={draggableModalStyles.addButton}
            >
              Add
            </Button>
          </Box>
          <div
            style={draggableModalStyles.scrollableSection}
            className="container"
          >
            <ReactSortable
              list={sections}
              setList={setSections}
              animation={150}
              handle=".drag-handle"
            >
              {sections.map((value, valInd) => (
                <DraggableListItem
                  key={valInd}
                  // key={value.label}
                  useFormPropObj={useFormPropObj}
                  value={value}
                  removeSection={handleRemoveSection}
                  hidden={hiddenSections().includes(value)}
                />
              ))}
            </ReactSortable>
          </div>

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveChanges}
            >
              Save Changes
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleCloseModal}
            >
              Cancel
            </Button>
          </Box>
        </div>
      </div>
    </>
  );
};

export default DraggableModal;
