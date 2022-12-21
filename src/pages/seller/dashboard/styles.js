import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  title: {
    color: "#2b3445",
    fontSize: 25,
    marginBottom: 0,
    marginTop: 0,
    fontWeight: 700,
    lineHeight: 1,
    marginLeft: 12,
    whiteSpace: "normal",
  },
  icon: {
    fontSize: 24,
    color: "#D23F57",
  },
  //
  //
  flexBasic: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  header: {
    paddingLeft: 24,
    paddingRight: 30,
  },

  chart: {
    paddingLeft: 24,
    paddingRight: 30,
  },
  tab: {
    padding: "0px 60px",
  },
  moveIcon: {
    color: "#2b3445",
    fontSize: 16,
  },

  actionBox: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  type: {
    fontSize: 14,
    paddingRight: 8,
  },

  select: {
    "& .MuiTextField-root": {
      margin: 0,
      marginLeft: 10,
      marginRight: 8,
    },
    "& .MuiSelect-outlined": {
      fontSize: 14,
      paddingBottom: 9,
    },
  },

  statistics: {
    border: `1px solid #E0E0E0`,
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    padding: 24,
    margin: 8,
  },
  hours: { fontWeight: 600 },

  progressBarBox: {
    marginTop: 40,
  },
  leftText: {
    position: "absolute",
    left: 0,
    bottom: 20,
  },
  rightText: {
    position: "absolute",
    right: 0,
    bottom: 20,
  },

  progressBar: { height: 10, borderRadius: 32 },

  disable: {
    background: "#F5F5F5",
    "&:hover": {
      background: "#E0E0E0",
    },
  },
  current: {
    pointerEvents: "none",
  },

  //
  formControl: {
    margin: 8,
    minWidth: 100,
  },
}));
