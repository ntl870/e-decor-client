import { Avatar, Box, IconButton, Tooltip } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import React, { createRef, useState } from "react";
import { useStyles } from "./styles";

export default function ProductImage(props) {
  const classes = useStyles();
  const { file, index } = props;

  //
  const [image, setImage] = useState("");
  const inputFileRef = createRef(null);

  const cleanup = () => {
    URL.revokeObjectURL(image);
    inputFileRef.current.value = null;
  };

  const setImageUrl = (newImage) => {
    if (image) {
      cleanup();
    }
    setImage(newImage);
  };

  const handleClick = (event) => {
    if (image) {
      event.preventDefault();
      setImageUrl(null);
    }
  };

  const [showedBtn, setShowedBtn] = useState(false);

  return (
    <Box
      style={{ padding: 8 }}
      className={classes.container}
      onMouseEnter={() => setShowedBtn(true)}
      onMouseLeave={() => setShowedBtn(false)}
    >
      <Avatar
        alt=""
        variant="rounded"
        src={image}
        className={classes.avatarWrapper}
        style={{ opacity: `${showedBtn ? 0.5 : 1}` }}
      >
        <img src={file} alt="" />
      </Avatar>
      <Box
        className={classes.btn}
        style={{
          display: `${showedBtn ? "block" : "none"}`,
        }}
      >
        <label htmlFor={`avatar-image-upload-${index}`}>
          <IconButton
            variant="outlined"
            color="primary"
            component="span"
            mb={1}
            onClick={handleClick}
            className={classes.btnUpload}
            style={{
              opacity: `${showedBtn ? 1 : 0.3}`,
            }}
          >
            <Tooltip title="Delete">
              <DeleteIcon />
            </Tooltip>
          </IconButton>
        </label>
      </Box>
    </Box>
  );
}
