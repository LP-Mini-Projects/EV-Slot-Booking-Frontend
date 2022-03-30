import React from "react";
import Grid from "@material-ui/core/Grid";
import "./Book.css";
import EvStationIcon from "@mui/icons-material/EvStation";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import PaymentIcon from "@mui/icons-material/Payment";
import logo from "../../assets/images/LPlogo.png";
import { Button } from "@mui/material";
import { Slider } from "@material-ui/core";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
// import TextField from '@mui/material/TextField';
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";

function Book() {
	const location = useLocation();
	const [selection, setSelection] = useState(0);
	console.log(location.state);
	const [booking, setBooking] = useState({
		station: "",
		capacity: "",
		start_time: "",
		end_time: "",
		date: "",
		plug: "",
	});

	const [val, setVal] = useState([0, 45]);
	const updateRange = (e, data) => {
		setSelection(data);
		setVal(data);
	};
	const [value, setValue] = React.useState(null);

	const options = [
		"CSS Connector 1",
		"CSS Connector 2",
		"CSS Connector 3",
		"CSS Connector 4",
	];
	const [open, setOpen] = React.useState(false);
	const anchorRef = React.useRef(null);
	const [selectedIndex, setSelectedIndex] = React.useState(1);

	const handleClick = () => {
		console.info(`You clicked ${options[selectedIndex]}`);
	};

	const handleMenuItemClick = (event, index) => {
		setSelectedIndex(index);
		setOpen(false);
	};

	const handleToggle = () => {
		setOpen((prevOpen) => !prevOpen);
	};

	const handleClose = (event) => {
		if (anchorRef.current && anchorRef.current.contains(event.target)) {
			return;
		}

		setOpen(false);
	};

	const marks = [
		{
			value: 0,
			label: "0",
		},
		{
			value: 15,
			label: "15",
		},
		{
			value: 30,
			label: "30",
		},
		{
			value: 45,
			label: "45",
		},
	];

	const handleChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setBooking({ ...booking, [name]: value ? value : null });
	};

	const handleBooking = (e) => {
		e.preventDefault();
		if (
			booking.station &&
			booking.capacity &&
			booking.duration &&
			booking.start_time &&
			booking.end_time &&
			booking.date &&
			booking.plug
		) {
			var myHeaders = new Headers();
			myHeaders.append(
				"Authorization",
				`Token ${localStorage.getItem("token")}`
			);

			var formdata = new FormData();
			formdata.append("date", booking.date);
			formdata.append("duration", booking.duration);
			formdata.append("start_time", booking.start_time);
			formdata.append("end_time", booking.end_time);
			formdata.append("units", "15");
			formdata.append("amount", "700.00");
			formdata.append("plug", booking.plug);

			var requestOptions = {
				method: "POST",
				headers: myHeaders,
				body: formdata,
				redirect: "follow",
			};

			fetch("https://findmyplug.herokuapp.com/bookings/", requestOptions)
				.then((response) => response.json())
				.then((result) => console.log(result))
				.catch((error) => console.log("error", error));
		}
	};

	return (
		<>
			<img
				src={logo}
				alt="cover-img"
				style={{
					marginTop: "25px",
					display: "flex",
					justifyContent: "flex-start",
					marginLeft: "50px",
				}}
			/>
			<div className="BookContent">
				<Grid container className="BookContainerGrid">
					<div className="circle">
						<EvStationIcon className="EVIcon" />
					</div>
					<Grid item className="BookingInfoOuterGrid">
						<Grid container className="BookingDetailsGrid">
							<Grid item className="BookingDetailsGridItem">
								<p className="BookingInfo">
									<b>Station Name : </b>
									{location.state.name}
								</p>
								<p className="BookingInfo">
									<b>Address : </b>
									{location.state.address}
								</p>
								<p className="BookingInfo">
									<b>Phone Number : </b>
									{location.state.number}
								</p>
							</Grid>
							<Grid item>
								<div className="priceDiv">
									<h2>Price</h2>
								</div>
							</Grid>
						</Grid>
					</Grid>
					<Grid item className="BookingFormOuterDiv">
						<h2 style={{ textAlign: "left" }}>Details : </h2>
						<Grid container className="BookingFormInnerDiv">
							<Grid item className="textFieldContainer">
								<LocalizationProvider
									dateAdapter={AdapterDateFns}
									className="date_picker"
								>
									<DatePicker
										label="Date"
										value={value}
										onChange={(newValue) => {
											setValue(newValue);
										}}
										renderInput={(params) => <TextField {...params} />}
									/>
								</LocalizationProvider>

								<Grid className="duration">
									<ButtonGroup
										variant="outlined"
										margin="normal"
										required
										aria-label="outlined button group"
										value={booking.duration}
									>
										<h3>Duration:</h3>
										<Button
											className="duration_button"
											onClick={() => setSelection(15)}
										>
											1h
										</Button>
										<Button
											className="duration_button"
											onClick={() => setSelection(30)}
										>
											2h
										</Button>
										<Button
											className="duration_button"
											onClick={() => setSelection(45)}
										>
											3h
										</Button>
									</ButtonGroup>
								</Grid>
							</Grid>
							<Grid item className="textFieldContainer">
								<Box sx={{ width: 350 }} className="capacity">
									<Slider
										aria-label="Restricted values"
										onChange={updateRange}
										// getAriaValueText={valuetext}
										step={15}
										valueLabelDisplay="auto"
										marks={marks}
										max={45}
									/>
								</Box>

								<React.Fragment>
									<ButtonGroup
										variant="outlined"
										ref={anchorRef}
										aria-label="split button"
										className="plug_type"
									>
										<Button onClick={handleClick}>
											{options[selectedIndex]}
										</Button>
										<Button
											size="small"
											aria-controls={open ? "split-button-menu" : undefined}
											aria-expanded={open ? "true" : undefined}
											aria-label="select merge strategy"
											aria-haspopup="menu"
											onClick={handleToggle}
										>
											<ArrowDropDownIcon />
										</Button>
									</ButtonGroup>
									<Popper
										open={open}
										anchorEl={anchorRef.current}
										role={undefined}
										transition
										// disablePortal
									>
										{({ TransitionProps, placement }) => (
											<Grow
												{...TransitionProps}
												style={{
													transformOrigin:
														placement === "bottom"
															? "center top"
															: "center bottom",
												}}
											>
												<Paper>
													<ClickAwayListener onClickAway={handleClose}>
														<MenuList id="split-button-menu">
															{options.map((option, index) => (
																<MenuItem
																	key={option}
																	// disabled={index === 2}
																	selected={index === selectedIndex}
																	onClick={(event) =>
																		handleMenuItemClick(event, index)
																	}
																>
																	{option}
																</MenuItem>
															))}
														</MenuList>
													</ClickAwayListener>
												</Paper>
											</Grow>
										)}
									</Popper>
								</React.Fragment>
							</Grid>
						</Grid>
					</Grid>
					<Grid item className="BookingFormConfirmReview">
						<h3
							className="main_bt"
							style={{ textAlign: "left" }}
							onClick={handleBooking}
						>
							Find Slots
						</h3>
					</Grid>
					{/* <Grid item className="BookingFormPaymentMethod">
						<h2 style={{ textAlign: "left" }}>Payment Method : </h2>
						<div className="paymentOptions">
							<PaymentIcon className="paymentIcon" />
							<h2>PayTM</h2>
						</div>
					</Grid> */}
					<Grid item className="BookingFormPaymentMethod">
						<h2 style={{ textAlign: "left" }}>Slots Available : </h2>
					</Grid>

					<Grid item className="BookingFormConfirmReview">
						<h3 style={{ textAlign: "left" }} onClick={handleBooking}>
							Confirm Booking
						</h3>
						{/* <h3 style={{ textAlign: "left" }}>Review</h3> */}
					</Grid>
				</Grid>
			</div>
		</>
	);
}

export default Book;
