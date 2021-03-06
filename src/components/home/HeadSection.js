import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {
  Grid,
  Typography,
  //isWidthUp,
  //Typography,
  withStyles,
  withWidth
} from "@material-ui/core";
import WaveBorder from "../Template/WaveBorder";
//import ZoomImage from "../Template/ZoomImage";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  wrapper: {
    paddingTop: `${theme.spacing(10)}px !important`,
    position: "relative",
    backgroundColor: theme.palette.secondary.main,
    paddingBottom: theme.spacing(1)
  },
  wrapper2: {
    paddingTop: `${theme.spacing(0)}px !important`,
    position: "relative",
    backgroundColor: theme.palette.secondary.main,
    paddingBottom: theme.spacing(1)
  },
  image: {
    [theme.breakpoints.up("sm")]: {
      width: `${theme.spacing(160)}px !important`,
      minHeight: `${theme.spacing(70)}px !important`
    },
    [theme.breakpoints.down("sm")]: {
      width: `${theme.spacing(60)}px !important`,
      minHeight: `${theme.spacing(45)}px !important`
    },
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
    verticalAlign: "middle",
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[4],
    backgroundImage: `url(${process.env.PUBLIC_URL}/images/logged_out/banner.png)`
  },
  button: {
    maxWidth: "100%",
    verticalAlign: "middle",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing(50)
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(32)
    }
  },
  container: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    [theme.breakpoints.down("md")]: {
      marginBottom: theme.spacing(1)
    },
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(1)
    },
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(1)
    }
  },
  containerFix: {
    [theme.breakpoints.up("md")]: {
      maxWidth: "none !important"
    }
  },
  waveBorder: {
    paddingTop: theme.spacing(0)
  },
  imageWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
});

class HeadSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDialog: false,
      dialogDetails: ""
    };
  }

  render() {
    const { classes, theme } = this.props;
    return (
      <Fragment>
        <div className={classes.wrapper}>
          <div className={classNames("container-fluid", classes.container)}>
            <Grid
              container
              spacing={1}
              dir={"rtl"}
              direction="column"
              alignItems="center"
              justify="center"
            >
              <Grid item xs={12} sm={12} md={12}>
                <div className={classes.imageWrapper}>
                  <div className={classes.image}>
                    <div className={classes.button}>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                          this.props.openRegisterDialog();
                        }}
                      >
                        <div style={{ display: "block" }}>
                          <Typography
                            variant="h6"
                            align="center"
                            component={"span"}
                            style={{
                              display: "block",
                              marginBottom: "2px",
                              color: "#000000"
                            }}
                          >
                            درخواست ترجمه
                          </Typography>
                          <Typography
                            variant="h6"
                            align="center"
                            component={"span"}
                            style={{
                              display: "block",
                              color: "#000000"
                            }}
                          >
                            demande de traduction
                          </Typography>
                        </div>
                      </Button>
                    </div>
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
        <WaveBorder
          upperColor={theme.palette.secondary.main}
          lowerColor="#FFFFFF"
          className={classes.waveBorder}
        />
      </Fragment>
    );
  }
}

HeadSection.propTypes = {
  classes: PropTypes.object,
  width: PropTypes.string,
  theme: PropTypes.object,
  openRegisterDialog: PropTypes.func.isRequired
};

export default withWidth()(
  withStyles(styles, { withTheme: true })(HeadSection)
);
