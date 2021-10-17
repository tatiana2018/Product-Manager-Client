import React, { useContext, useState } from "react";
import { Fragment } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import AuthContext from "../../context/productContext";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormLabel-root": {
      fontSize: 14,
      marginTop: -12,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.dark,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    fontSize: 14,
  },
}));

const Login = (props) => {
  const classes = useStyles();

  const authContext = useContext(AuthContext);
  const { iniciarSesion } = authContext;

  const [usuario, guardarUsuario] = useState({
    nombres: "",
    contraseña: "",
  });

  // extraer de usuario
  const { nombres, contraseña } = usuario;

  const onChange = (evento) => {
    const { name, value } = evento.target;
    guardarUsuario({
      ...usuario,
      [name]: value,
    });
  };

  // // Cuando el usuario quiere iniciar sesión
  const onSubmit = (e) => {
    e.preventDefault();

    // Validar que no haya campos vacios
    if (nombres.trim() === "" || contraseña.trim() === "") {
      return;
    }

    // Pasarlo al action
    iniciarSesion(usuario);
    props.history.push("/main");
  };

  return (
    <Fragment>
      <div>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Inicia sesión
            </Typography>
            <form onSubmit={onSubmit} className={classes.form}>
              <TextField
                variant="outlined"
                margin="normal"
                type="text"
                required
                fullWidth
                id="nombres"
                label="Nombres y Apellido"
                name="nombres"
                className={classes.root}
                autoFocus
                value={nombres}
                onChange={onChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="contraseña"
                label="Contraseña"
                className={classes.root}
                type="password"
                id="password"
                value={contraseña}
                onChange={onChange}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Acceder{" "}
              </Button>
              <span>Accede con cualquier informacion</span>
            </form>
          </div>
        </Container>
      </div>
    </Fragment>
  );
};

export default Login;
