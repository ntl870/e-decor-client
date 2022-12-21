import {
  Avatar,
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  OutlinedInput,
  Tooltip,
} from "@material-ui/core";
import axios from "axios";

import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import DeleteIcon from "@material-ui/icons/Delete";
import React, { createRef, useEffect, useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useStyles } from "./styles";
import { useDispatch } from "react-redux";
import { removeProductVersion, updateProductVersion } from "redux/productRedux";
import Icons from "constants/icons";

export default function ProductVersionForm(props) {
  const { productVersion, isView } = props;
  const classes = useStyles();
  // images
  const [files, setFiles] = useState([]);

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  //
  const [image, setImage] = useState(productVersion?.image);
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

  const handleOnChange = (event) => {
    const newImage = event.target?.files?.[0];
    //  setAvatarFile(newImage);
    if (newImage) {
      setImageUrl(URL.createObjectURL(newImage));
    }
    getUploadedUrl(event.target.files?.[0]).then((result) => {
      dispatch(updateProductVersion({ ...productVersion, image: result }));
    });
  };

  const handleClick = (event) => {
    if (image) {
      event.preventDefault();
      setImageUrl(null);
      //  setAvatarFile(null);
      //  setResource({ ...resource, avatar: "" });
    }
  };

  const [showedBtn, setShowedBtn] = useState(false);
  const [name, setName] = useState(productVersion?.name);
  const [price, setPrice] = useState(productVersion?.price);
  const [quantity, setQuantity] = useState(productVersion?.quantity);
  // const [image, setImage] = useState("");
  const dispatch = useDispatch();
  const handleChangeName = (event) => {
    setName(event.target.value);
    dispatch(
      updateProductVersion({ ...productVersion, name: event.target.value })
    );
  };
  const handleChangePrice = (event) => {
    setPrice(event.target.value);
    dispatch(
      updateProductVersion({ ...productVersion, price: event.target.value })
    );
  };
  const handleChangeQuantity = (event) => {
    setQuantity(event.target.value);
    dispatch(
      updateProductVersion({ ...productVersion, quantity: event.target.value })
    );
  };

  const getUploadedUrl = async (file) => {
    //  setUploadCover(true);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "uploads");
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/e-decor/image/upload",
        data
      );
      const { url } = uploadRes.data;
      return url;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box my={2}>
      <Grid container spacing={5}>
        <Grid item xs={12} md={3}>
          <Box
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
              <img src={Icons.IMAGE_ICON} alt=""/>
              
            </Avatar>
            <Box
              className={classes.btn}
              style={{
                display: `${showedBtn ? "block" : "none"}`,
              }}
            >
              <input
                ref={inputFileRef}
                accept="image/*"
                hidden
                id={`avatar-image-upload-${productVersion.id}`}
                type="file"
                onChange={handleOnChange}
              />
              <label htmlFor={`avatar-image-upload-${productVersion.id}`}>
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
                  {image ? (
                    <Tooltip title="Remove">
                      <DeleteIcon />
                    </Tooltip>
                  ) : (
                    <Tooltip title="Upload">
                      <CloudUploadIcon />
                    </Tooltip>
                  )}
                </IconButton>
              </label>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <FormControl
                variant="outlined"
                margin="dense"
                fullWidth
                disabled={isView}
              >
                <InputLabel htmlFor="component-outlined">Price</InputLabel>
                <OutlinedInput
                  id="component-outlined"
                  value={price}
                  onChange={handleChangePrice}
                  label="Price"
                  placeholder="Price"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl
                variant="outlined"
                margin="dense"
                fullWidth
                disabled={isView}
              >
                <InputLabel htmlFor="component-outlined">Stock</InputLabel>
                <OutlinedInput
                  id="component-outlined"
                  value={quantity}
                  onChange={handleChangeQuantity}
                  label="Stock"
                  placeholder="Stock"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12}>
              <FormControl
                variant="outlined"
                margin="dense"
                fullWidth
                disabled={isView}
              >
                <InputLabel htmlFor="component-outlined">
                  Description
                </InputLabel>
                <OutlinedInput
                  id="component-outlined"
                  value={name}
                  onChange={handleChangeName}
                  label="Description"
                  placeholder="Description"
                  multiline
                  rows={3}
                />
              </FormControl>
            </Grid>
            <Grid
              item
              xs={12}
              md={12}
              display="flex"
              // alignItems="center"
              // justifyContent="center"
            >
              <Button
                color="primary"
                variant="outlined"
                onClick={() =>
                  dispatch(removeProductVersion(productVersion.id))
                }
              >
                Remove
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
