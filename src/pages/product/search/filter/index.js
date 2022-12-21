import {
  Box,
  Card,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  storeCategories,
  storeMax,
  storeMin,
  storeRatings,
} from "redux/filterRedux";
import ReplayIcon from "@material-ui/icons/Replay";
import { filterSelector } from "redux/selectors";
import { useStyles } from "./styles";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
export default function Filter(props) {
  const { allCategories } = props;
  const { categories, ratings } = useSelector(filterSelector);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const stars = [5, 4, 3, 2, 1];

  const status = {
    sale: false,
    stock: false,
    featured: false,
  };

  const handleChangeRating = (event) => {
    dispatch(storeRatings(event.target.value));
  };
  const handleChangeStatus = (event) => {};
  const [selectedCategories, setSelectedCategories] = useState(categories);
  const handleChangeCategory = (event) => {
    if (selectedCategories?.includes(+event.target.name)) {
      setSelectedCategories(
        selectedCategories?.filter((item) => +item !== +event.target.name)
      );
      dispatch(
        storeCategories(
          selectedCategories?.filter((item) => +item !== +event.target.name)
        )
      );
      if (
        !selectedCategories?.filter((item) => +item !== +event.target.name)
          .length
      )
        history.push("/products");
    } else {
      dispatch(storeCategories([...selectedCategories, +event.target.name]));
      setSelectedCategories([...selectedCategories, +event.target.name]);
      if ([...selectedCategories, +event.target.name].length > 1)
        history.push("/products");
    }
  };

  const { sale, stock, featured } = status;
  return (
    <Card className={classes.root}>
      <Box my={1}>
        <Box>
          <Typography className={classes.headText}>Categories</Typography>
        </Box>
        <Box>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormGroup>
              {allCategories?.map((item, index) => (
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      checked={selectedCategories?.includes(item.id)}
                      onChange={handleChangeCategory}
                      name={item?.id?.toString()}
                    />
                  }
                  label={item?.name}
                />
              ))}
            </FormGroup>
          </FormControl>
        </Box>
      </Box>

      <Divider />

      <Box my={1}>
        <Box>
          <Typography className={classes.headText}>Price Range</Typography>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          pb={1}
        >
          <FormControl fullWidth>
            <TextField
              id="outlined-number"
              type="number"
              variant="outlined"
              placeholder="0"
              size="small"
              InputProps={{ inputProps: { min: 0, step: 10 } }}
              onChange={(e) => {
                !e.target.value && dispatch(storeMin(e.target.value));
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.target.value) {
                  dispatch(storeMin(e.target.value));
                }
              }}
            />
          </FormControl>
          <Box mx={1} className={classes.headText}>
            -
          </Box>
          <FormControl fullWidth>
            <TextField
              id="outlined-number"
              type="number"
              variant="outlined"
              placeholder="100"
              size="small"
              InputProps={{ inputProps: { min: 0, step: 10 } }}
              onChange={(e) => {
                !e.target.value && dispatch(storeMax(e.target.value));
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.target.value) {
                  dispatch(storeMax(e.target.value));
                }
              }}
            />
          </FormControl>
        </Box>
      </Box>
      <Divider />

      <Box my={1}>
        <Box>
          <Typography className={classes.headText}>Status</Typography>
        </Box>
        <Box>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={sale}
                    onChange={handleChangeStatus}
                    name="sale"
                  />
                }
                label="On Sale"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={stock}
                    onChange={handleChangeStatus}
                    name="stock"
                  />
                }
                label="In Stock"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={featured}
                    onChange={handleChangeStatus}
                    name="featured"
                  />
                }
                label="Featured"
              />
            </FormGroup>
          </FormControl>
        </Box>
      </Box>
      <Divider />
      <Box my={1}>
        <Box
          my={1}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography className={classes.headText}>Ratings</Typography>
          <IconButton onClick={() => dispatch(storeRatings(""))}>
            <ReplayIcon />
          </IconButton>
        </Box>
        <Box>
          <FormControl component="fieldset" className={classes.formControl}>
            <RadioGroup
              name="type"
              // defaultValue={""}
              value={+ratings}
              onChange={handleChangeRating}
            >
              {stars.map((item, index) => (
                <FormControlLabel
                  key={index}
                  value={+item}
                  control={<Radio />}
                  label={
                    <Box display="flex" alignItems="center">
                      <Rating
                        name="size-medium"
                        value={item}
                        readOnly
                        className={classes.rating}
                      />
                      {item !== 5 && <Box ml={1}>& Up</Box>}
                    </Box>
                  }
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Box>
      </Box>
      <Divider />

      <Box my={1}>
        <Box>
          <Typography className={classes.headText}>Colors</Typography>
        </Box>
        <Box>
          <Typography className={classes.text}>Featured colors</Typography>
        </Box>
      </Box>
    </Card>
  );
}
