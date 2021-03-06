import React, { useState, useCallback, useRef, Fragment } from "react";
import PropTypes from "prop-types";
import {
  TextField,
  Button,
  Typography,
  withStyles,
  InputAdornment
} from "@material-ui/core";
import FormDialog from "../Template/FormDialog";
import HighlightedInformation from "../Template/HighlightedInformation";
import ButtonCircularProgress from "../Template/ButtonCircularProgress";
import VisibilityPasswordTextField from "../Template/VisibilityPasswordTextField";
import AuthService from "../../AuthService";
import SnackbarWrapper from "../Snackbar/SnackbarWrapper";
import { withRouter } from "react-router-dom";
import Box from "@material-ui/core/Box";
import { getCompleteName } from "../../Dictionary";
import CustomTooltip from "../Tooltip/CustomTooltip";

const styles = theme => ({
  link: {
    transition: theme.transitions.create(["background-color"], {
      duration: theme.transitions.duration.complex,
      easing: theme.transitions.easing.easeInOut
    }),
    cursor: "pointer",
    color: theme.palette.secondary.main,
    "&:enabled:hover": {
      color: theme.palette.secondary.dark
    },
    "&:enabled:focus": {
      color: theme.palette.secondary.dark
    }
  }
});

function RegisterDialog(props) {
  const {
    setStatus,
    onClose,
    status,
    classes,
    showSnackbar,
    history,
    openLoginDialog
  } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const registerPassword = useRef();
  const registerPasswordRepeat = useRef();
  const username = useRef();
  const email = useRef();
  const phone = useRef();

  const Auth = new AuthService();

  const validateEmail = email => {
    // eslint-disable-next-line no-useless-escape
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const register = useCallback(() => {
    if (
      registerPassword.current.value !== registerPasswordRepeat.current.value
    ) {
      setStatus("passwordsDontMatch");
      return;
    }

    if (registerPassword.current.value.length < 6) {
      setStatus("passwordTooShort");
      return;
    }

    if (!email.current.value && !phone.current.value) {
      setStatus("nullEmailPhone");
      return;
    }

    if (email.current.value && !validateEmail(email.current.value)) {
      setStatus("invalidEmail");
      return;
    }

    setStatus(null);
    setIsLoading(true);
    Auth.register(
      username.current.value,
      registerPassword.current.value,
      email.current.value
    )
      .then(function(res) {
        if (res.success) {
          history.push("/userPanel");
          showSnackbar(res.message, "success");
        } else if (
          res &&
          res.message &&
          res.message === "نام کاربری وارد شده تکراری است"
        ) {
          setStatus("invalidUsername");
        } else {
          showSnackbar(res.message, "error");
        }
        setIsLoading(false);
      })
      .catch(function() {
        setIsLoading(false);
      });
  }, [setIsLoading, setStatus, registerPassword, registerPasswordRepeat]);

  return (
    <FormDialog
      loading={isLoading}
      onClose={onClose}
      open
      headline="ثبت نام"
      onFormSubmit={e => {
        e.preventDefault();
        register();
      }}
      hideBackdrop
      hasCloseIcon
      content={
        <Fragment>
          <TextField
            inputRef={username}
            margin="normal"
            required
            autoFocus
            fullWidth
            error={status === "invalidUsername"}
            label="نام کاربری"
            autoComplete="off"
            type="text"
            helperText={(() => {
              if (status === "invalidUsername") {
                return "نام کاربری وارد شده تکراری است";
              }
              return null;
            })()}
            onChange={() => {
              if (status === "invalidUsername") {
                setStatus(null);
              }
            }}
            FormHelperTextProps={{ error: true }}
          />
          <TextField
            inputRef={email}
            margin="normal"
            fullWidth
            error={status === "invalidEmail" || status === "nullEmailPhone"}
            label="آدرس ایمیل"
            autoComplete="off"
            type="text"
            helperText={(() => {
              if (status === "invalidEmail")
                return "ایمیل وارد شده نامعتبر است";
              if (status === "nullEmailPhone")
                return "آدرس ایمیل یا شماره موبایل را وارد کنید";
              return null;
            })()}
            onChange={() => {
              if (status === "invalidEmail" || status === "nullEmailPhone") {
                setStatus(null);
              }
            }}
            FormHelperTextProps={{ error: true }}
          />
          <TextField
            inputRef={phone}
            margin="normal"
            fullWidth
            error={status === "nullEmailPhone"}
            label="شماره موبایل"
            autoComplete="off"
            type="number"
            helperText={(() => {
              if (status === "nullEmailPhone")
                return "آدرس ایمیل یا شماره موبایل را وارد کنید";
              return null;
            })()}
            onChange={() => {
              if (status === "nullEmailPhone") {
                setStatus(null);
              }
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <CustomTooltip text={getCompleteName("useFrenchNumber")} />
                </InputAdornment>
              )
            }}
            FormHelperTextProps={{ error: true }}
          />
          <VisibilityPasswordTextField
            margin="normal"
            required
            fullWidth
            error={
              status === "passwordTooShort" || status === "passwordsDontMatch"
            }
            label="رمز عبور"
            inputRef={registerPassword}
            autoComplete="off"
            onChange={() => {
              if (
                status === "passwordTooShort" ||
                status === "passwordsDontMatch"
              ) {
                setStatus(null);
              }
            }}
            helperText={(() => {
              if (status === "passwordTooShort") {
                return "طول رمزعبور باید حداقل ۶ کاراکتر باشد";
              }
              if (status === "passwordsDontMatch") {
                return "رمزهای وارد شده مطابقت ندارند";
              }
              return null;
            })()}
            FormHelperTextProps={{ error: true }}
            isVisible={isPasswordVisible}
            onVisibilityChange={setIsPasswordVisible}
          />
          <VisibilityPasswordTextField
            margin="normal"
            required
            fullWidth
            error={
              status === "passwordTooShort" || status === "passwordsDontMatch"
            }
            label="تکرار رمزعبور"
            inputRef={registerPasswordRepeat}
            autoComplete="off"
            onChange={() => {
              if (
                status === "passwordTooShort" ||
                status === "passwordsDontMatch"
              ) {
                setStatus(null);
              }
            }}
            helperText={(() => {
              if (status === "passwordTooShort") {
                return "طول رمزعبور باید حداقل ۶ کاراکتر باشد";
              }
              if (status === "passwordsDontMatch") {
                return "رمزهای وارد شده مطابقت ندارند";
              }
            })()}
            FormHelperTextProps={{ error: true }}
            isVisible={isPasswordVisible}
            onVisibilityChange={setIsPasswordVisible}
          />
          <Box fontWeight="fontWeightBold">
            <Typography
              variant="h6"
              dir={"rtl"}
              style={{
                useNextVariants: true,
                suppressDeprecationWarnings: true,
                h6: {
                  fontWeight: 600
                }
              }}
            >
              قبلا حساب شخصی ساخته اید؟
              <span
                className={classes.link}
                onClick={isLoading ? null : openLoginDialog}
                tabIndex={0}
                role="button"
                onKeyDown={event => {
                  // For screenreaders listen to space and enter events
                  if (
                    (!isLoading && event.keyCode === 13) ||
                    event.keyCode === 32
                  ) {
                    openLoginDialog();
                  }
                }}
              >
                {" "}
                ورود
              </span>
            </Typography>
          </Box>
          {status === "accountCreated" ? (
            <HighlightedInformation>اکانت شما ساخته شد.</HighlightedInformation>
          ) : null}
        </Fragment>
      }
      actions={
        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          color="secondary"
          disabled={isLoading}
        >
          ثبت نام
          {isLoading && <ButtonCircularProgress />}
        </Button>
      }
    />
  );
}

RegisterDialog.propTypes = {
  theme: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  openTermsDialog: PropTypes.func.isRequired,
  openLoginDialog: PropTypes.func.isRequired,
  status: PropTypes.string,
  setStatus: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  showSnackbar: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export default SnackbarWrapper(
  withRouter(withStyles(styles, { withTheme: true })(RegisterDialog))
);
