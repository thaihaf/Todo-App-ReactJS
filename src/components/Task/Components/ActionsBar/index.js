import React, { useState } from "react";

import Menu from "@mui/material/Menu";
import EditTask from "../EditTask";
import DeleteTask from "../DeleteTask";

export default function ActionsBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <ion-icon
        name="ellipsis-vertical"
        style={{
          fontSize: "2rem",
          marginLeft: "auto",
          padding: "1rem",
        }}
        onClick={handleOpen}
      ></ion-icon>

      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          style: {
            backgroundColor: "#1e1e29",
            padding: "0",
            border: "2px solid var(--bg-btn-pink)",
            borderTopRightRadius: "0",
            borderTopLeftRadius: "0",
            borderBottomRightRadius: "1.1rem",
            borderBottomLeftRadius: "1.1rem",
            zIndex: "2",
          },
        }}
      >
        <EditTask />
        <DeleteTask />
      </Menu>
    </div>
  );
}
