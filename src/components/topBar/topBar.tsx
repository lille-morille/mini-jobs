import {
	AccountCircle as AccountCircleIcon,
	Work as WorkIcon,
} from '@mui/icons-material';
import {
	AppBar,
	Toolbar,
	Typography,
	Button,
	IconButton,
	Menu,
	MenuItem,
	PopoverOrigin,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from '@mui/material';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';
import useIsMobile from '../../hooks/useIsMobile';
import myFireBase from '../../utils/myFireBase';
import './style.css';

const anchorOrigin: PopoverOrigin = {
	vertical: 'top',
	horizontal: 'right',
};

export default function TopBar() {
	const user = useContext(UserContext);
	const isMobile = useIsMobile();

	const [anchorEl, setAnchorEl] = useState<any>(null);
	const [dialogOpen, setDialogOpen] = useState(false);
	const navigate = useNavigate();

	const handleMenu = (e: any) => setAnchorEl(e.currentTarget);
	const handleClose = () => setAnchorEl(null);
	const handleSignOut = () => {
		myFireBase.auth.signOut().then(() => {
			navigate('/');
			setDialogOpen(false);
		});
	};
	const createJob = () => navigate('createJob');
	const handleAccount = () => navigate('/account');
	const handleSignIn = () => navigate('/signin');

	return (
		<AppBar position="sticky">
			<Toolbar
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}>
				<div className="group">
					<WorkIcon />
					{!isMobile && (
						<Typography variant="h6" component="div">
							Mini jobs
						</Typography>
					)}
				</div>
				<Typography variant="body1" component="div">
					{getSignedInText(
						!!user,
						isMobile,
						`${user?.firstName} ${user?.lastName}`
					)}
				</Typography>
				<div className="group">
					{user && (
						<Button color="inherit" onClick={createJob}>
							Create job
						</Button>
					)}
					<IconButton size="large" onClick={handleMenu} color="inherit">
						<AccountCircleIcon />
					</IconButton>
					<Menu
						id="menu-appbar"
						anchorEl={anchorEl}
						anchorOrigin={anchorOrigin}
						keepMounted
						transformOrigin={anchorOrigin}
						open={Boolean(anchorEl)}
						onClose={handleClose}>
						{user ? (
							<MenuItem onClick={handleAccount}>Account</MenuItem>
						) : (
							<MenuItem onClick={handleSignIn}>Sign in</MenuItem>
						)}
						{user && (
							<MenuItem onClick={() => setDialogOpen(true)}>Sign out</MenuItem>
						)}
					</Menu>
				</div>
			</Toolbar>
			<Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
				<DialogTitle>Sign out?</DialogTitle>
				<DialogContent>
					<DialogContentText>
						You will be signed out from this browser.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setDialogOpen(false)}>Cancel</Button>
					<Button onClick={handleSignOut} autoFocus>
						Sign out
					</Button>
				</DialogActions>
			</Dialog>
		</AppBar>
	);
}

const getSignedInText = (
	isSignedIn: boolean,
	isMobile: boolean,
	userName: string
) => {
	if (isMobile) {
		if (isSignedIn) {
			return 'Signed in';
		} else {
			return 'Signed out';
		}
	} else {
		if (isSignedIn) {
			return 'Signed in as ' + userName;
		} else {
			return 'Signed out';
		}
	}
};
