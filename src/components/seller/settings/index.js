import {
  Avatar,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
} from "@material-ui/core";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCities, getDistricts, getWards, reset } from "redux/addressRedux";
import { addressSelector, shopSelector } from "redux/selectors";
import { createShop, getMyShop, updateShop } from "redux/shopRedux";
import defaultAva from "../../../assets/images/profile_pic.svg";
import defaultWall from "../../../assets/images/default_photo.svg";
import { useStyles } from "./styles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ShopInfo() {
  const classes = useStyles();
  const storeShop = useSelector(shopSelector);
  const [name, setName] = useState(
    storeShop?.currentShop ? storeShop?.currentShop?.name : ""
  );
  const [paypalMail, setPaypalMail] = useState(
    storeShop?.currentShop ? storeShop?.currentShop?.paypalMail : ""
  );
  const [phone, setPhone] = useState(
    storeShop?.currentShop ? storeShop?.currentShop?.phone || "" : ""
  );
  const [addressDetail, setAddressDetail] = useState(
    storeShop?.currentShop ? storeShop?.currentShop?.addressDetail || "" : ""
  );
  const [cityId, setCityId] = useState(
    storeShop?.currentShop ? storeShop?.currentShop?.city?.id : ""
  );
  const [districtId, setDistrictId] = useState(
    storeShop?.currentShop ? storeShop?.currentShop?.district?.id : ""
  );
  const [wardId, setWardId] = useState(
    storeShop?.currentShop ? storeShop?.currentShop?.ward?.id : ""
  );

  const handleChangeName = (event) => {
    setName(event.target.value);
  };
  const handleChangePhone = (event) => {
    setPhone(event.target.value);
  };
  const handleChangeAddress = (event) => {
    setAddressDetail(event.target.value);
  };
  const handleChangeCity = (event) => {
    dispatch(reset());
    setCityId(event.target.value);
  };
  const handleChangeDistrict = (event) => {
    setDistrictId(event.target.value);
  };
  const handleChangeWard = (event) => {
    setWardId(event.target.value);
  };

  const storeAddress = useSelector(addressSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCities());
  }, [dispatch]);

  useEffect(() => {
    cityId && dispatch(getDistricts(cityId));
  }, [cityId, dispatch]);

  useEffect(() => {
    districtId && dispatch(getWards(districtId));
  }, [dispatch, districtId]);

  const [avaUrl, setAvaUrl] = useState(
    storeShop?.currentShop ? storeShop?.currentShop?.avatar : defaultAva
  );
  const [wallUrl, setWallUrl] = useState(
    storeShop?.currentShop ? storeShop?.currentShop?.coverImage : defaultWall
  );

  // upload
  const getUploadedUrl = async (file) => {
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

  const handleSubmitShop = () => {
    const data = {
      name,
      phone,
      addressDetail,
      cityId,
      districtId,
      wardId,
      coverImage: wallUrl,
      avatar: avaUrl,
      description: "description",
      paypalMail,
    };
    storeShop?.currentShop
      ? dispatch(updateShop({ ...data, id: storeShop.currentShop.id })).then(
          (data) => {
            dispatch(getMyShop());
          }
        )
      : setIsOpen(!isOpen);
  };

  const [isConfirm, setIsConfirm] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Paper>
      <Box p={3}>
        <Box
          mb={3}
          style={{
            border: "1px solid #ccc",
            backgroundImage: `url(${wallUrl})`,
            backgroundPositionX: `center`,
            backgroundPositionY: `center`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            borderRadius: 10,
            overflow: "hidden",
            height: 173,
            position: "relative",
          }}
        >
          <Box
            display="flex"
            alignItems="flex-end"
            style={{ position: "absolute", bottom: 20, left: 24 }}
          >
            <Avatar alt="" src={avaUrl} className={classes.avatar} />
            <Box>
              <input
                accept="image/*"
                className={classes.uploadInput}
                id="ava-file"
                type="file"
                onChange={(e) => {
                  getUploadedUrl(e.target.files?.[0]).then((result) =>
                    setAvaUrl(result)
                  );
                }}
              />
              <label
                className={classes.label}
                htmlFor="ava-file"
                style={{ marginLeft: -24 }}
              >
                <IconButton
                  size="small"
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <PhotoCamera />
                </IconButton>
              </label>
            </Box>
          </Box>
          <Box style={{ position: "absolute", top: 20, right: 24 }}>
            <input
              accept="image/*"
              className={classes.wallInput}
              id="wall-file"
              type="file"
              onChange={(e) => {
                getUploadedUrl(e.target.files?.[0]).then((result) =>
                  setWallUrl(result)
                );
              }}
            />
            <label
              className={classes.wallLabel}
              htmlFor="wall-file"
              style={{ marginLeft: -24 }}
            >
              <IconButton
                size="small"
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <PhotoCamera />
              </IconButton>
            </label>
          </Box>
        </Box>
        <Box>
          <Box mb={4}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <FormControl variant="outlined" margin="dense" fullWidth>
                  <InputLabel htmlFor="component-outlined">
                    Shop Name
                  </InputLabel>
                  <OutlinedInput
                    id="component-outlined"
                    value={name}
                    onChange={handleChangeName}
                    label="Shop Name"
                    placeholder="Shop Name"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl
                  variant="outlined"
                  margin="dense"
                  fullWidth
                  className={classes.phone}
                >
                  <InputLabel htmlFor="component-outlined">Phone</InputLabel>
                  <OutlinedInput
                    id="component-outlined"
                    value={phone}
                    onChange={handleChangePhone}
                    label="Phone"
                    placeholder="Phone"
                    inputProps={{ type: "text" }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl variant="outlined" margin="dense" fullWidth>
                  <InputLabel htmlFor="component-outlined">Address</InputLabel>
                  <OutlinedInput
                    id="component-outlined"
                    value={addressDetail}
                    onChange={handleChangeAddress}
                    label="Address"
                    placeholder="Address"
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
                    Select City
                  </InputLabel>
                  <Select
                    labelId="select-outlined-label"
                    id="select-outlined"
                    value={cityId}
                    onChange={handleChangeCity}
                    label="Select City"
                    className={classes.input}
                    defaultValue=""
                    MenuProps={{
                      classes: { paper: classes.menuPaper },
                      anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "left",
                      },
                      transformOrigin: {
                        vertical: "top",
                        horizontal: "left",
                      },
                      getContentAnchorEl: null,
                    }}
                  >
                    {storeAddress?.cities?.map((city, index) => (
                      <MenuItem key={index} value={city.id}>
                        {city.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl
                  fullWidth
                  margin="dense"
                  variant="outlined"
                  className={classes.formControl}
                  disabled={!cityId}
                >
                  <InputLabel id="select-outlined-label">
                    Select District
                  </InputLabel>
                  <Select
                    labelId="select-outlined-label"
                    id="select-outlined"
                    value={districtId}
                    onChange={handleChangeDistrict}
                    label="Select District"
                    className={classes.input}
                    defaultValue=""
                    MenuProps={{
                      classes: { paper: classes.menuPaper },

                      anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "left",
                      },
                      transformOrigin: {
                        vertical: "top",
                        horizontal: "left",
                      },
                      getContentAnchorEl: null,
                    }}
                  >
                    {storeAddress?.districts?.map((district, index) => (
                      <MenuItem key={index} value={district.id}>
                        {district.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl
                  fullWidth
                  margin="dense"
                  variant="outlined"
                  className={classes.formControl}
                  disabled={!districtId}
                >
                  <InputLabel id="select-outlined-label">
                    Select Ward
                  </InputLabel>
                  <Select
                    labelId="select-outlined-label"
                    id="select-outlined"
                    value={wardId}
                    onChange={handleChangeWard}
                    label="Select Ward"
                    className={classes.input}
                    defaultValue=""
                    MenuProps={{
                      classes: { paper: classes.menuPaper },

                      anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "left",
                      },
                      transformOrigin: {
                        vertical: "top",
                        horizontal: "left",
                      },
                      getContentAnchorEl: null,
                    }}
                  >
                    {storeAddress?.wards?.map((ward, index) => (
                      <MenuItem key={index} value={ward.id}>
                        {ward.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={12}>
                <FormControl variant="outlined" margin="dense" fullWidth>
                  <InputLabel htmlFor="component-outlined">
                    Paypal Mail
                  </InputLabel>
                  <OutlinedInput
                    id="component-outlined"
                    value={paypalMail}
                    onChange={(e) => setPaypalMail(e.target.value)}
                    label="Paypal Mail"
                    placeholder="Paypal Mail"
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Box>
          <Box style={{ position: "relative" }}>
            <Button
              color="primary"
              variant="contained"
              onClick={handleSubmitShop}
              disabled={storeShop?.isLoading}
            >
              {storeShop?.currentShop ? "Save Changes" : "Create your shop"}
            </Button>
            {storeShop?.isLoading && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </Box>
        </Box>
      </Box>
      <Dialog
        open={isOpen}
        onClose={() => {
          setIsOpen(!isOpen);
        }}
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="form-dialog-title" onClose={() => {}}>
          Official Shop Terms of Service
        </DialogTitle>
        <DialogContent>
          <Box>
            Official Shops are participating Sellers that have been carefully
            selected by E-Decor (such Sellers, “Official Shops”) from whom
            E-Decor-registered Buyers will be able to enjoy the rights and
            privileges described in these Official Shop Terms of Services
            (“Official Shop Terms of Service”) when purchasing Items from
            Official Shops (“Official Shop Items”).
          </Box>
          <Box>
            If you are a Buyer, you will be deemed to have consented to the
            terms and conditions described in these Official Shop Terms of
            Service when you make purchases on E-Decor.
          </Box>
          <Box>
            Similarly, if you are an Official Shop, you will be deemed to have
            consented to the terms and conditions described in these Official
            Shop Terms of Service by your continued participation in E-Decor as
            an Official Shop.
          </Box>
          <Box>
            These Official Shop Terms of Service supplement the Terms of Service
            and the other E-Decor Policies, of which these Official Shop
            Official Shop Terms of Service forms a part – please read the Terms
            of Service and the other E-Decor Policies available on the Site as
            they contain important information regarding your rights and
            obligations.
          </Box>
          <Box>
            Any terms that are used in these Official Shop Terms of Service that
            are not defined here will have the meanings given to such terms in
            the Terms of Service and/or the applicable E-Decor Policy.
          </Box>
          <Box>
            All terms and conditions described in these Official Shop Terms of
            Service are subject to change at E-Decor’s discretion pursuant to
            the Terms of Service.
          </Box>
          <FormControlLabel
            control={
              <Checkbox
                checked={isConfirm}
                onChange={() => {
                  setIsConfirm(!isConfirm);
                }}
                name="isConfirm"
                color="primary"
              />
            }
            label="I agree with the Terms of Service"
          />
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <Button
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            variant="outlined"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              const data = {
                name,
                phone,
                addressDetail,
                cityId,
                districtId,
                wardId,
                coverImage: wallUrl,
                avatar: avaUrl,
                description: "description",
                paypalMail,
              };
              dispatch(createShop(data)).then((data) => {
                dispatch(getMyShop());
              });
              setIsOpen(!isOpen);
            }}
            color="primary"
            variant="contained"
            disableElevation
            disabled={!isConfirm}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer autoClose={2000} style={{ marginTop: "100px" }} />
    </Paper>
  );
}
