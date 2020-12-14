import React, { useMemo, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AlertBar from '../components/alertBar'

import { alertTypes } from '../config/types'
import { useAuth } from '../services/authContext';

const Copyright = () => (
    <Typography variant="body2" color="textSecondary" align="center">
        {`Copyright ©  Vinicius dos Santos ${new Date().getFullYear()}.`}
    </Typography>
);

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Login() {
    const classes = useStyles();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [checked, setChecked] = useState(false);
    const [openAlert, setOpenAlert] = useState(true);

    const { login } = useAuth();

    const onHandleSubmit = () => {
        login(username, password, checked);
    }

    const AlertBarInfo = useMemo(() => (
        <AlertBar open={openAlert} state={setOpenAlert} type={alertTypes.info} time={90000 * 10}>
            INFO: Aplicação somente para testes! Utilize as seguintes credenciais: Usuario: root | Senha: 123456
        </AlertBar>
    ), [openAlert])

    return (
        <>
            {AlertBarInfo}
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Autenticação
                    </Typography>
                    <form className={classes.form} onSubmit={(e) => {
                        e.preventDefault();
                        onHandleSubmit();
                    }}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Digite seu usuário"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            onChange={(e) => {
                                setUsername(e.target.value);
                            }}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="passwd"
                            label="Digite sua senha"
                            type="password"
                            id="passwd"
                            autoComplete="current-password"
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" onChange={(e) => setChecked(e.target.checked)} />}
                            label="Lembrar-me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Logar
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Esqueceu sua senha?
                            </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <Box mt={8}>
                    <Copyright />
                </Box>
            </Container>
        </>
    );
}