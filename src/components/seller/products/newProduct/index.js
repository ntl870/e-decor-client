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
//
import axios from "axios";
import { LoadingProduct } from "components/common/LoadingProduct";
import ScrollToTop from "components/common/ScrollToTop";
import React, { useEffect, useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useDropzone } from "react-dropzone";
import ReactQuill from "react-quill";
import { useDispatch, useSelector } from "react-redux";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createProduct, resetProductVersion } from "redux/productRedux";
import { categorySelector, productSelector } from "redux/selectors";
import { getCategoryId, getCategoryName } from "utils/helpers";
import ProductVersionsForm from "../productVersions";
import { useStyles } from "./styles";
import { formats, modules } from "constants/index";

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 200,
  height: 200,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
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

export default function NewProductForm() {
  ScrollToTop();
  const classes = useStyles();
  const storeCategory = useSelector(categorySelector);
  const storeProduct = useSelector(productSelector);
  const { categoryName } = useParams();
  console.log(categoryName);
  const [name, setName] = useState("");
  const [images, setImages] = useState();
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const dispatch = useDispatch();
  //
  const handleChange = (value) => {
    setDescription(value);
  };

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleChangeCategory = (event) => {
    setCategoryId(event.target.value);
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
        setImages(response);
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
    <div style={thumb} key={index}>
      <div style={thumbInner}>
        <img src={file.preview} style={img} alt="" />
      </div>
    </div>
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

  const history = useHistory();

  useEffect(() => {
    categoryName &&
      setCategoryId(getCategoryId(categoryName, storeCategory.categories));
  }, [categoryName, storeCategory.categories]);

  const handleSubmit = (e) => {
    e.preventDefault();
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
    dispatch(createProduct(data)).then((data) => {
      const categoryName = getCategoryName(
        categoryId,
        storeCategory.categories
      );
      categoryName &&
        data?.payload?.id &&
        history.push({
          pathname: `/shop/products/${getCategoryName(
            categoryId,
            storeCategory.categories
          )}/${data?.payload?.id}`,
          state: {
            categoryId,
          },
        });
    });

    dispatch(resetProductVersion());
  };
  return storeProduct?.isLoading ? (
    <LoadingProduct />
  ) : (
    <Paper>
      <Box p={2} my={2}>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <FormControl variant="outlined" margin="dense" fullWidth>
                <InputLabel htmlFor="component-outlined">Name</InputLabel>
                <OutlinedInput
                  id="component-outlined"
                  value={name}
                  onChange={handleChangeName}
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
                  labelId="select-outlined-label"
                  id="select-outlined"
                  value={categoryId}
                  onChange={handleChangeCategory}
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
                    disableScrollLock: true,
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
                    <MenuItem key={index} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
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
                <aside style={thumbsContainer}>{thumbs}</aside>
              </Box>
            </Grid>

            <Grid item xs={12} md={12}>
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
              {/* <Box>
                <Editor
                  rows={5}
                  placeholder="Description ..."
                  toolbarClassName={classes.editorToolbar}
                  editorClassName={classes.editor}
                  editorState={editorState}
                  onEditorStateChange={onEditorStateChange}
                />
              </Box> */}
            </Grid>
          </Grid>

          <ProductVersionsForm />
        </form>

        <Box pb={1}>
          <Button
            color="primary"
            variant="contained"
            onClick={(e) => handleSubmit(e)}
          >
            Save Product
          </Button>
        </Box>
      </Box>
      <ToastContainer autoClose={2000} style={{ marginTop: "100px" }} />
    </Paper>
  );
}
