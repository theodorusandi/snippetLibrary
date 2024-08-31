import { Alert, Avatar, Box, Button, Container, CssBaseline, Grid, TextField, Typography } from "@mui/material";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "./hooks/useAuth";

interface FormData {
  username: string;
  password: string;
}

enum FormState {
  SIGN_IN = "sign in",
  SIGN_UP = "sign up",
}

const defaultValue: FormData = {
  username: "",
  password: "",
};

const SignInPage = () => {
  const { signin, signup } = useAuth();
  const [formState, setFormState] = useState<FormState>(FormState.SIGN_IN);
  const [formData, setFormData] = useState<FormData>(defaultValue);
  const [alertOpen, setAlertOpen] = useState<boolean>(false);

  const signUpState = formState === FormState.SIGN_UP;
  const formLabel = signUpState ? "Sign Up" : "Sign In";

  const setFormDataValue = useCallback((key: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  }, []);

  const resetFormData = useCallback(() => {
    setFormData(defaultValue);
  }, []);

  const toggleFormState = useCallback(() => {
    setFormState(signUpState ? FormState.SIGN_IN : FormState.SIGN_UP);
    resetFormData();
  }, [resetFormData, signUpState]);

  const onSubmit = useCallback(async () => {
    try {
      if (signUpState) {
        signup(formData);
        return;
      }
      signin(formData);
    } catch (err) {
      console.error(err);
    } finally {
      resetFormData();
      setAlertOpen(true);
    }
  }, [formData, resetFormData, signUpState, signin, signup]);

  useEffect(() => {
    if (alertOpen) {
      setTimeout(() => {
        setAlertOpen(false);
      }, 3000)
    }
  }, [alertOpen])

  return (
    <Container component="div" maxWidth="xs">
      <CssBaseline />
      <Box
        component="div"
        sx={{
          marginTop: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar
          sx={{
            margin: 1,
          }}
        >
          <LockOpenIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ marginBottom: 1 }}>
          {formLabel}
        </Typography>
        <Box>
          <TextField
            value={formData.username}
            onChange={(e) => setFormDataValue("username", e.target.value)}
            variant="outlined"
            margin="normal"
            label="Username"
            required
            fullWidth
          />
          <TextField
            value={formData.password}
            onChange={(e) => setFormDataValue("password", e.target.value)}
            variant="outlined"
            margin="normal"
            label="Password"
            type="password"
            required
            fullWidth
          />
          <Button onClick={onSubmit} fullWidth variant="contained" color="primary" sx={{ marginTop: 2 }}>
            {formLabel}
          </Button>
          <Grid container>
            <Grid item>
              <Button onClick={toggleFormState}>{signUpState ? "Sign in" : "Sign up"}</Button>
            </Grid>
          </Grid>
        </Box>
        {alertOpen && <Alert severity="success">Success</Alert>}
      </Box>
    </Container>
  );
};

export default SignInPage;
