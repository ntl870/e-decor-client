import { Box } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { INITIAL_PAGE } from "constants/index";
import { useFooterStyles } from "./styles";

export default function TableFooter(props) {
  const classes = useFooterStyles();
  const { page = INITIAL_PAGE, pageSize = 1, handleChangePage } = props;

  return (
    <Box className={classes.root} display="flex" justifyContent="center">
      <Pagination
        className={classes.pagination}
        count={pageSize}
        variant="outlined"
        page={page}
        onChange={handleChangePage}
      />
    </Box>
  );
}
