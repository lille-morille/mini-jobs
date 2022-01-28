import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FormHelperText } from '@mui/material';
import myFireBase from '../../utils/myFireBase';
import { useNavigate } from 'react-router-dom';
import './style.css';

const initialValues = {
	email: '',
	password: '',
};

const requiredString = Yup.string().required('This field is required');
const validationSchema = Yup.object().shape({
	email: requiredString.email('Invalid email'),
	password: requiredString.min(6, 'Mininum 6 characters'),
});

export default function SigninPage() {
	const navigate = useNavigate();

	const onSubmit = (formValues: typeof initialValues) => {
		const { email, password } = formValues;
		myFireBase.auth.signIn(email, password).then(() => navigate('/'));
	};

	const { handleChange, submitForm, errors } = useFormik({
		initialValues,
		onSubmit,
		validationSchema,
	});

	return (
		<Container component="main" maxWidth="xs" className="main">
			<CssBaseline />
			<Box className="center">
				<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign up
				</Typography>
				<Box sx={{ mt: 3 }}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								autoComplete="email"
								error={!!errors.email}
								onChange={handleChange('email')}
							/>
							<FormHelperText error>{errors.email}</FormHelperText>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								autoComplete="new-password"
								error={!!errors.password}
								onChange={handleChange('password')}
							/>
							<FormHelperText error>{errors.password}</FormHelperText>
						</Grid>
					</Grid>
					<Button
						onClick={submitForm}
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}>
						Sign Up
					</Button>
					<Grid container justifyContent="flex-end">
						<Grid item>
							<Link href="/signup" variant="body2">
								Don't have an account? Sign up
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	);
}