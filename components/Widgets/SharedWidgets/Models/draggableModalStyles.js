export  const draggableModalStyles = {
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 9999,
    },
    modalContent: {
      backgroundColor: "white",
      color: "black",
      padding: "2rem",
      borderRadius: "4px",
      maxWidth: "600px",
      textAlign: "center",
    },
    sectionLabel: {
      display: "flex",
      alignItems: "center",
    },
    closeButton: {
      marginLeft: "0.5rem",
      cursor: "pointer",
    },
    addButton: {
      // marginBottom: '1rem',
      height: "3.9em",
      // marginTop: '1em',
    },
    scrollableSection: {
      maxHeight: "300px",
      marginTop: "1rem",
      position: "relative",
      overflowY: "auto",
      "&::WebkitScrollbar": {
        width: "8px",
      },
      "&::WebkitScrollbarTrack": {
        backgroundColor: "#f1f1f1",
      },
      "&::WebkitScrollbarThumb": {
        backgroundColor: "linear-gradient(45deg, #ff9a9e, #fad0c4)",
        borderRadius: "4px",
      },
      "&::WebkitScrollbarThumb:hover": {
        backgroundColor: "linear-gradient(45deg, #ff9a9e, #fad0c4)",
      },
    },
  };