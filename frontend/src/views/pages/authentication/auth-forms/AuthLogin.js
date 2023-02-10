import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Button,
    Checkbox,
    Divider,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography,
    useMediaQuery
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useLazyQuery, useMutation } from '@apollo/client';
import { SIGN_IN, USER_DATA } from '../../../../graphql/auth/auth-graphql';
import { useSignIn, useAuthUser, useIsAuthenticated } from 'react-auth-kit';

// project imports
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { normalize } from '../../../../utils/normaliceData';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// ============================|| FIREBASE - LOGIN ||============================ //

const AuthLogin = ({ ...others }) => {
    const navigate = useNavigate();
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const [checked, setChecked] = useState(true);
    const signIn = useSignIn();
    const [loginError, setloginError] = useState(false);
    const auth = useAuthUser();
    const isAuthenticated = useIsAuthenticated();

    useEffect(() => {
        console.log('user auth run');
        console.log(isAuthenticated());
        if (!isAuthenticated()) {
            console.log('user auth not log');
            navigate('/support-portal/login');
        } else {
            const userData = auth();
            console.log('user auth user data');
            console.group(userData);
            switch (userData.role) {
                case 'admin':
                    navigate('/admin/dashboard');
                    break;
                case 'client':
                    navigate('/support-portal/home');
                    break;
                default:
                    navigate('/');
                    break;
            }
        }
    }, []);

    // sign in mutation
    const [login] = useMutation(SIGN_IN);

    // query user info
    const [userData] = useLazyQuery(USER_DATA);

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <>
            {loginError && (
                <Typography variant="subtitle" color="red">
                    Usuario o contraseña invalidos
                </Typography>
            )}
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string().email('Ingrese un email valido').max(255).required('Se requiere Email'),
                    password: Yup.string().max(255).required('Se requiere Password')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        setSubmitting(true);
                        setloginError(false);
                        const response = await login({ variables: { identifier: values.email, password: values.password } });
                        const account = normalize(response);
                        if (account) {
                            const token = account.login.jwt;
                            const { id, username, email } = account.login.user;
                            const user = await userData({ variables: { id } });
                            const { usersPermissionsUser } = normalize(user);

                            if (
                                signIn({
                                    token,
                                    expiresIn: 60,
                                    tokenType: 'Bearer',
                                    authState: {
                                        id,
                                        username,
                                        email,
                                        name: usersPermissionsUser.name,
                                        lastname: usersPermissionsUser.lastname,
                                        role: usersPermissionsUser.role.name
                                    }
                                })
                            ) {
                                // Redirect
                                navigate('/admin/dashboard');
                                setSubmitting(false);
                            } else {
                                // Throw error
                                throw new Error('Cant Sign in');
                            }
                        }
                    } catch (err) {
                        console.error(err.message);
                        setloginError(true);
                        setSubmitting(false);
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit} {...others}>
                        <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-email-login">Email Address / Username</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-email-login"
                                type="email"
                                value={values.email}
                                name="email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                label="Email Address / Username"
                                inputProps={{}}
                            />
                            {touched.email && errors.email && (
                                <FormHelperText error id="standard-weight-helper-text-email-login">
                                    {errors.email}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <FormControl
                            fullWidth
                            error={Boolean(touched.password && errors.password)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password-login"
                                type={showPassword ? 'text' : 'password'}
                                value={values.password}
                                name="password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            size="large"
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                                inputProps={{}}
                            />
                            {touched.password && errors.password && (
                                <FormHelperText error id="standard-weight-helper-text-password-login">
                                    {errors.password}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={checked}
                                        onChange={(event) => setChecked(event.target.checked)}
                                        name="checked"
                                        color="secondary"
                                    />
                                }
                                label="Remember me"
                            />
                            <Typography variant="subtitle1" color="secondary" sx={{ textDecoration: 'none', cursor: 'pointer' }}>
                                Forgot Password?
                            </Typography>
                        </Stack>
                        {errors.submit && (
                            <Box sx={{ mt: 3 }}>
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            </Box>
                        )}

                        <Box sx={{ mt: 2 }}>
                            <LoadingButton
                                loading={isSubmitting}
                                variant="contained"
                                fullWidth
                                size="large"
                                type="submit"
                                disabled={isSubmitting}
                                color="secondary"
                            >
                                Sign in
                            </LoadingButton>
                        </Box>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default AuthLogin;
