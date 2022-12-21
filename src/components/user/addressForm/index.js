import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  addAddress,
  getCities,
  getDistricts,
  getWards,
  updateAddress,
} from "redux/addressRedux";
import { addressSelector } from "redux/selectors";
import { useStyles } from "./styles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddressForm(props) {
  const { isCheckout = false, setIsOpenDialog } = props;
  const { id } = useParams();
  console.log(id);
  const { addresses } = useSelector(addressSelector);

  const [address, setAddress] = useState({
    name: "",
    phone: "",
    detail: "",
    cityId: "",
    districtId: "",
    wardId: "",
  });

  const storeAddress = useSelector(addressSelector);
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [name, setName] = useState(address?.name);
  const [phone, setPhone] = useState(address?.phone);
  const [detail, setDetail] = useState(address?.detail);
  const [cityId, setCityId] = useState(address?.cityId);
  const [districtId, setDistrictId] = useState(address?.districtId);
  const [wardId, setWardId] = useState(address?.wardId);

  useEffect(() => {
    id &&
      id !== "add" &&
      !isCheckout &&
      setAddress(addresses?.filter((address) => +address.id === +id)?.[0]);
  }, [addresses, id, isCheckout]);

  useEffect(() => {
    if (id && id !== "add" && !isCheckout) {
      setName(address?.name);
      setPhone(address?.phone);
      setDetail(address?.detail);
      setCityId(address?.cityId);
      setDistrictId(address?.districtId);
      setWardId(address?.wardId);
    }
  }, [
    address?.cityId,
    address?.detail,
    address?.districtId,
    address?.name,
    address?.phone,
    address?.wardId,
    id,
    isCheckout,
  ]);

  const handleChangeName = (event) => {
    setName(event.target.value);
  };
  const handleChangePhone = (event) => {
    setPhone(event.target.value);
  };
  const handleChangeAddress = (event) => {
    setDetail(event.target.value);
  };
  const handleChangeCity = (event) => {
    setCityId(event.target.value);
  };
  const handleChangeDistrict = (event) => {
    setDistrictId(event.target.value);
  };
  const handleChangeWard = (event) => {
    setWardId(event.target.value);
  };
  //

  useEffect(() => {
    dispatch(getCities());
  }, [dispatch]);

  useEffect(() => {
    cityId && dispatch(getDistricts(cityId));
  }, [cityId, dispatch, isCheckout]);

  useEffect(() => {
    districtId && dispatch(getWards(districtId));
  }, [dispatch, districtId, isCheckout]);

  const handleSubmit = () => {
    const address = { name, phone, detail, cityId, districtId, wardId };
    if (id === "add" || isCheckout) {
      dispatch(addAddress(address));
    } else {
      dispatch(updateAddress({ id, address }));
    }
    isCheckout
      ? history.push({
          pathname: `/checkout`,
          
        })
      : history.push("/address");
    isCheckout && setIsOpenDialog(false);
  };
  return (
    <Paper>
      <Box p={4}>
        <Box mb={4}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormControl variant="outlined" margin="dense" fullWidth>
                <InputLabel htmlFor="component-outlined">
                  Deliver's Name
                </InputLabel>
                <OutlinedInput
                  id="component-outlined"
                  value={name}
                  onChange={handleChangeName}
                  label="Deliver's Name"
                  placeholder="Deliver's Name"
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
                  value={detail}
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
                <InputLabel id="select-outlined-label">Select City</InputLabel>
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
                <InputLabel id="select-outlined-label">Select Ward</InputLabel>
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
          </Grid>
        </Box>
        {isCheckout ? (
          <Box display="flex" justifyContent={"flex-end"}>
            <Button
              style={{ marginRight: 4, backgroundColor: "#424242" }}
              color="primary"
              variant="contained"
              onClick={() => {
                if (!addresses.length) history.goBack();
                else setIsOpenDialog(false)
              }}
            >
              Cancel
            </Button>
            <Button color="primary" variant="contained" onClick={handleSubmit}>
              Confirm
            </Button>
          </Box>
        ) : (
          <Box>
            <Button color="primary" variant="contained" onClick={handleSubmit}>
              {id === "add" ? "Add New" : "Save Changes"}
            </Button>
          </Box>
        )}
      </Box>
      <ToastContainer autoClose={2000} style={{ marginTop: "100px" }} />
    </Paper>
  );
}
