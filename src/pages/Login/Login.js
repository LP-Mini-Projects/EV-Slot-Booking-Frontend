import React, { useState } from "react";
import login from "../../assets/images/cover.png";
import "./Login.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/LPlogo.png";
import cover from "../../assets/images/cover.png";

export default function LoginSide() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	var myHeaders = new Headers();
	myHeaders.append(
		"Authorization",
		"Basic Z3JlaGFzaGFoNkBnbWFpbC5jb206Z3JlaGFzaGFo"
	);
	myHeaders.append(
		"Cookie",
		"csrftoken=fQ5GcS3afHVVVyREFENw1Ub54RZgwlMkIFicrHrxOrddyB7xgNi46AaN5B6A4090; sessionid=vkfter6wndyr2xly3808yhu1meqwl3gn"
	);

	const handleSubmit = (event) => {
		event.preventDefault();
		var formdata = new FormData();
		formdata.append("email", email);
		formdata.append("password", password);
		fetch("https://findmyplug.herokuapp.com/login/", {
			method: "POST",
			headers: myHeaders,
			body: formdata,
			redirect: "follow",
		})
			.then((response) => response.json())
			.then((result) => {
				if(result.token ){
					console.log(result.token)
					navigate('/booking')
				}else{
					navigate('/signup')
					alert('Invalid cred')
				}
				// result.token ? navigate("/booking"):
				// alert("invalid"), navigate("/signup")
				localStorage.setItem('token', result.token)
				
			})
			.catch((error) => {
				console.log(error)
				alert('Invalid Credentials')
			});
		// eslint-disable-next-line no-console
	};

	const navigate = useNavigate();

	

	return (
		<Grid
			container
			component="main"
			sx={{ height: "100vh", overflow: "hidden" }}
		>
			<Grid
				item
				xs={12}
				sm={8}
				md={8}
				component={Paper}
				elevation={6}
				square
				backgroundColor="#ececed"
			>
				<div>
					<img src={logo} alt="logo" style={{ marginTop: '25px', display: "flex", justifyContent: 'flex-start', marginLeft: '25px' }} />

					<Box
						sx={{
							my: 8,
							mx: 4,
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
						}}
					>
						<Typography
							component="h1"
							variant="h5"
							display="flex"
							flexDirection="column"
							alignItems="right"
							sx={{ mt: 8, fontWeight: "bold" }}
						>
							SIGN IN
						</Typography>
						<Typography component="h6">
							to continue and book your slot
						</Typography>
						<Box
							component="form"
							noValidate
							onSubmit={handleSubmit}
							sx={{ mt: 1 }}
						>
							<TextField
								margin="normal"
								required
								sx={{ width: "350px" }}
								id="email"
								label="Email"
								name="email"
								autoComplete="email"
								autoFocus
								onChange={(e) => setEmail(e.target.value)}
							/>
							<TextField
								margin="normal"
								required
								sx={{
									width: "350px",
									display: "flex",
									flexDirection: "column",
								}}
								name="password"
								label="Password"
								type="password"
								id="password"
								autoComplete="current-password"
								onChange={(e) => setPassword(e.target.value)}
							/>
							<p style={{ textAlign: 'center', fontSize: '0.89rem', color: '#1F2128' }}>Don't have an account? <span onClick={() => navigate('/signup')} style={{ cursor: 'pointer', color: 'blue' }}>Sign Up</span></p>
							<Button
								className="main_btn"
								type="submit"
								fullWidth
								variant="outlined"
								// onClick={() => {
								// 	navigate("/booking");
								// }}

								// sx={{
								// 	height: "50px",
								// 	mt: 4,
								// 	display: "flex",
								// 	justifyContent: "center",
								// 	alignItems: "center",
								// 	flexDirection: "column"
								// }}
							>
								Sign In
							</Button>
						</Box>
					</Box>
				</div>
			</Grid>

			<Grid
				item
				xs={false}
				sm={4}
				md={4}
				sx={{
					backgroundImage: login,
					backgroundSize: "cover",
					backgroundPosition: "center",
					backgroundColor: "#1F2128",
				}}
			>
				<img
					src={cover}
					style={{ width: "100%", height: "100vh" }}
					alt="login-img"
				/>
				<Button
					className="login_button"
					type="button"
					variant="contained"
					onClick={() => {
						navigate("/login");
					}}
					sx={{
						mt: -145,
						mb: 2,
						mr: 58,
						padding: "10px",
						width: "110px",
						backgroundColor: "#ECECED",
						paddingRight: "25px",
						paddingTop: "10px",
						paddingBottom: "10px",
						color: "#1F2128",
						fontWeight: "bold",
						borderRadius: '0px 25px 25px 0px !important'
					}}
				>
					Login
				</Button>
				<Button
					className="login_button"
					type="button"
					variant="contained"
					onClick={() => {
						navigate("/signup");
					}}
					sx={{
						mt: -135,
						mb: 2,
						mr: 58,
						padding: "10px",
						width: "110px",
						backgroundColor: "#1F2128",
						paddingRight: "25px",
						paddingTop: "10px",
						paddingBottom: "10px",
						color: "#ECECED",
						fontWeight: "bold",
						borderRadius: '0px 25px 25px 0px !important',
					}}
				// sx={{ "&:hover": { backgroundColor:"white"} }}
				>
					Sign Up
				</Button>
				<Typography
					component="h6"
					variant="h2"
					fontWeight="bold"
					fontSize="35px"
					color="white"
					sx={{
						mt: -55,
						mr: 12,
						ml: 15,
						opacity: 1,
					}}
				>
					Welcome, Back
				</Typography>
			</Grid>
		</Grid>
	);
}
