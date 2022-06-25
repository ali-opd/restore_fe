import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Alert,
  AlertTitle,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import agent from "../../app/api/agent";
import { useState } from "react";

const theme = createTheme();

export default function Register() {
  const [validationErrors, setValidationErrors] = useState([]);
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
  } = useForm({
    mode: "all",
  });

  return (
    <ThemeProvider theme={theme}>
      <Container
        component={Paper}
        maxWidth="sm"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 4,
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit((data) => {
            agent.Account.register(data).catch((error) =>
              setValidationErrors(error)
            );
          })}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Username"
                autoFocus
                {...register("username", { required: "Username is required" })}
                error={!!errors.username}
                helperText={<>{errors?.username?.message}</>}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                {...register("email", {
                  required: "Email address is required",
                })}
                error={!!errors.email}
                helperText={<>{errors?.email?.message}</>}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                type="password"
                {...register("password", { required: "Password is required" })}
                error={!!errors.password}
                helperText={<>{errors?.password?.message}</>}
              />
            </Grid>
          </Grid>
          {validationErrors.length > 0 && (
            <Alert severity="error">
              <AlertTitle>Validation Errors</AlertTitle>
              <List>
                {validationErrors.map((error) => (
                  <ListItem key={error}>
                    <ListItemText>{error}</ListItemText>
                  </ListItem>
                ))}
              </List>
            </Alert>
          )}

          <LoadingButton
            loading={isSubmitting}
            disabled={!isValid}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </LoadingButton>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/register">Already have an account? Log in</Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
