import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Typography,
} from "@material-ui/core";
import { formats, modules } from "constants/index";

import axios from "axios";
import ScrollToTop from "components/common/ScrollToTop";
import React, { useEffect, useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useDropzone } from "react-dropzone";
import ReactQuill from "react-quill";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateProduct } from "redux/productRedux";
import { categorySelector, productSelector } from "redux/selectors";
import { getCategoryName } from "utils/helpers";
import ProductVersionsForm from "../productVersions";
import { useStyles } from "./styles";

const thumbsContainer = {
  marginTop: 16,
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
  borderRadius: 8,
  border: "1px solid #ccc",
};

const style = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

export default function ViewProductForm(props) {
  ScrollToTop();

  const { productId } = useParams();
  const { isView, setIsView } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const storeCategory = useSelector(categorySelector);
  const { product } = useSelector(productSelector);
  const [name, setName] = useState(product && product?.name);
  const [images, setImages] = useState(
    product?.images?.map((item) => item.image)
  );
  const [description, setDescription] = useState(
    product && product?.description
  );
  const [categoryId, setCategoryId] = useState(
    product && product?.category?.id
  );
  const handleChange = (value) => {
    setDescription(value);
  };

  // images
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      // Push all the axios request promise into a single array
      const uploaders = acceptedFiles?.map((file) => {
        // Initial FormData
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "uploads"); // Replace the preset name with your own
        formData.append("api_key", "824454275614915"); // Replace API key with your own Cloudinary key
        formData.append("timestamp", (Date.now() / 1000) | 0);

        // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
        return axios
          .post(
            "https://api.cloudinary.com/v1_1/e-decor/image/upload",
            formData,
            {
              headers: { "X-Requested-With": "XMLHttpRequest" },
            }
          )
          .then((response) => {
            return response.data.secure_url;
          });
      });
      //
      // Once all the files are uploaded
      axios.all(uploaders).then((response) => {
        // ... perform after upload is successful operation
        setImages(images.concat(response));
      });
      //
      setFiles(
        acceptedFiles?.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });
  const thumbs = files?.map((file, index) => (
    <Grid item xs={12} md={3} key={index}>
      <Box
        style={{
          borderRadius: 8,
          width: 200,
          height: 200,
          boxSizing: "border-box",
        }}
      >
        <img src={file.preview} style={img} alt="" />
      </Box>
    </Grid>
  ));
  const previousThumbs = product.images?.map((file, index) => (
    <Grid item xs={12} md={3} key={index}>
      <Box
        style={{
          borderRadius: 8,
          width: 200,
          height: 200,
          boxSizing: "border-box",
        }}
      >
        <img src={file.image} style={img} alt="" />
      </Box>
    </Grid>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  // edit

  //

  const storeProduct = useSelector(productSelector);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsView(!isView);
    const data = {
      name,
      categoryId,
      description,
      material: "",
      origin: "",
      size: "",
      weight: 1,
      images,
      versions: storeProduct?.productVersions?.map((item) => ({
        name: item.name,
        image: item.image,
        price: item.price,
        quantity: item.quantity,
      })),
    };
    !isView &&
      dispatch(updateProduct({ id: productId, body: data })).then((data) => {
        history.push({
          pathname: `/shop/products/${getCategoryName(
            categoryId,
            storeCategory.categories
          )}/${data.payload}`,
          state: {
            categoryId,
          },
        });
      });
  };
  return (
    <Paper>
      <Box p={2} my={2}>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <FormControl
                variant="outlined"
                margin="dense"
                fullWidth
                disabled={isView}
              >
                <InputLabel htmlFor="component-outlined">Name</InputLabel>
                <OutlinedInput
                  id="component-outlined"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  label="Name"
                  placeholder="Name"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl
                fullWidth
                margin="dense"
                variant="outlined"
                className={classes.formControl}
              >
                <InputLabel id="select-outlined-label">
                  Select Category
                </InputLabel>
                <Select
                  disabled={isView}
                  labelId="select-outlined-label"
                  id="select-outlined"
                  value={categoryId}
                  onChange={(event) => setCategoryId(event?.target?.value)}
                  label="Select Category"
                  className={classes.input}
                  MenuProps={{
                    anchorOrigin: {
                      vertical: "bottom",
                      horizontal: "left",
                    },
                    transformOrigin: {
                      vertical: "top",
                      horizontal: "left",
                    },
                    getContentAnchorEl: null,
                    disablescrolllock: true,
                  }}
                  // inputProps={{
                  //   MenuProps: {
                  //     disablescrolllock: true,
                  //     classes: {
                  //       paper: classes.paper,
                  //     },
                  //   },
                  // }}
                >
                  {storeCategory?.categories?.map((option, index) => (
                    <MenuItem key={index} value={option?.id}>
                      {option?.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            {isView ? (
              <fieldset
                style={{
                  border: "1px solid #cccccc",
                  borderRadius: 4,
                  padding: "8px 16px 16px",
                  margin: 8,
                }}
              >
                <legend
                  style={{
                    margin: "0px 8px opx -4px",
                    padding: "0px 4px",
                    color: "#777d82",
                  }}
                >
                  Images
                </legend>
                <Grid container item xs={12} md={12} spacing={2}>
                  {images?.map((image, index) => (
                    <Grid item xs={12} md={3} key={index}>
                      <img
                        src={image}
                        alt=""
                        style={{
                          borderRadius: 4,
                          border: "1px solid #cccccc",
                          minHeight: 186.5,
                          minWidth: 186.5,
                        }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </fieldset>
            ) : (
              <Grid item xs={12} md={12}>
                <Box>
                  <div {...getRootProps({ style })}>
                    <input {...getInputProps()} />
                    <p>Drag & drop product images here</p>
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      p={1}
                    >
                      <Divider className={classes.divider} />
                      <Box>
                        <Typography
                          component="span"
                          className={classes.dividerText}
                        >
                          or
                        </Typography>
                      </Box>
                      <Divider className={classes.divider} />
                    </Box>
                    <Button color="primary" variant="contained">
                      Select Files
                    </Button>
                  </div>
                  <aside style={thumbsContainer}>
                    <Grid container spacing={2}>
                      {previousThumbs}
                      {thumbs}
                    </Grid>
                  </aside>
                </Box>
              </Grid>
            )}

            <Grid item xs={12} md={12}>
              <Box>
                {isView ? (
                  <fieldset
                    style={{
                      border: "1px solid #cccccc",
                      borderRadius: 4,
                      padding: "8px 16px 16px",
                      margin: 8,
                    }}
                  >
                    <legend
                      style={{
                        margin: "0px 8px opx -4px",
                        padding: "0px 4px",
                        color: "#777d82",
                      }}
                    >
                      Description
                    </legend>
                    <div
                      dangerouslySetInnerHTML={{ __html: description }}
                    ></div>
                  </fieldset>
                ) : (
                  <ReactQuill
                    className={classes.editor}
                    style={{ borderRadius: 8 }}
                    // theme="snow"
                    value={description}
                    onChange={handleChange}
                    modules={modules}
                    formats={formats}
                    placeholder={"Description ..."}
                  />
                  // <Editor
                  //   rows={5}
                  //   placeholder="Description ..."
                  //   toolbarClassName={classes.editorToolbar}
                  //   editorClassName={classes.editor}
                  //   editorState={editorState}
                  //   onEditorStateChange={onEditorStateChange}
                  // />
                )}
              </Box>
            </Grid>
          </Grid>

          <ProductVersionsForm isView={isView} />
        </form>

        <Box ml={1}>
          <Button
            color="primary"
            variant="contained"
            onClick={(e) => handleSubmit(e)}
          >
            {isView ? "Edit Product" : "Save Changes"}
          </Button>
        </Box>
      </Box>
      <ToastContainer autoClose={2000} style={{ marginTop: "100px" }} />
    </Paper>
  );
}
