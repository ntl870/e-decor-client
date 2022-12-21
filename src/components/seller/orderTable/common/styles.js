import { TableCell, TableRow } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  height: { height: 350 },
});

export const StyledTableRow = withStyles((theme) => ({
  root: {
    "& .MuiTableCell-root": {
      padding: 16,
      paddingLeft: 24,
    },
    "& .MuiIconButton-root": {
      color: "#000000",
      padding: 8,
      fontSize: 18,
    },
  },
}))(TableRow);

export const StyledTableCell = withStyles({
  head: {
    fontWeight: "bold",
    fontSize: 16,
    borderRight: `1px solid "#E0E0E0"`,
  },
  body: { borderRight: `1px solid "#E0E0E0"` },
})(TableCell);
