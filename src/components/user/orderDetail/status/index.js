import {
  Box,
  makeStyles,
  Paper,
  Step,
  StepConnector,
  StepLabel,
  Stepper,
  withStyles,
} from "@material-ui/core";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import clsx from "clsx";
import Icons from "constants/icons";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { orderSelector } from "redux/selectors";

const status = ["processing", "shipped", "delivered"];
const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 28,
  },
  active: {
    "& $line": {
      backgroundColor: "#D23F57",
    },
  },
  completed: {
    "& $line": {
      backgroundColor: "#D23F57",
    },
  },
  line: {
    height: 5,
    border: 0,
    backgroundColor: "#ddd",
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 64,
    height: 64,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    "& .MuiSvgIcon-root": {
      width: 32,
      height: 32,
    },
  },
  active: {
    backgroundColor: "#D23F57",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  },
  completed: {
    backgroundColor: "#D23F57",
  },
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;
  const icons = {
    1: <img src={Icons.WHITE_PACKAGE_ICON} alt="" />,
    2: <LocalShippingIcon />,
    3: <img src={Icons.RECEIVED_PACKAGE_ICON} alt="" />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

export default function Status() {
  const { order } = useSelector(orderSelector);
  const [activeStep, setActiveStep] = useState(null);
  useEffect(() => {
    setActiveStep(
      status.indexOf(order?.status) >= 0 ? status.indexOf(order?.status) : null
    );
  }, [order?.status]);
  return (
    <Paper>
      <Box py={4} mx={0} my={2}>
        <Stepper
          alternativeLabel
          activeStep={activeStep}
          connector={<ColorlibConnector />}
        >
          <Step key={"label"}>
            <StepLabel
              StepIconComponent={ColorlibStepIcon}
              StepIconProps={{
                active:
                  order?.status === "processing" ||
                  order?.status === "shipped" ||
                  order?.status === "delivered",
                completed:
                  order?.status === "processing" ||
                  order?.status === "shipped" ||
                  order?.status === "delivered",
              }}
            >
              Process
            </StepLabel>
          </Step>
          <Step key={"label2"}>
            <StepLabel
              StepIconComponent={ColorlibStepIcon}
              StepIconProps={{
                active:
                  order?.status === "delivered" || order?.status === "shipped",
                completed:
                  order?.status === "delivered" || order?.status === "shipped",
              }}
            >
              Deliver
            </StepLabel>
          </Step>
          <Step key={"label3"}>
            <StepLabel
              StepIconComponent={ColorlibStepIcon}
              StepIconProps={{
                active: order?.status === "delivered",
                completed: order?.status === "delivered",
              }}
            >
              Receive
            </StepLabel>
          </Step>
        </Stepper>
      </Box>
    </Paper>
  );
}
