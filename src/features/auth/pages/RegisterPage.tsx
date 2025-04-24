import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import Paper from "@mui/material/Paper";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router";
import { useState } from "react";
import {
    type RegisterCredentials,
    createNewRegisterCredentials,
} from "../interface";
import { validateRegister } from "../validateRegister";
import { registerService, testService } from "../services";

export default function RegisterPage() {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState<RegisterCredentials>(
        createNewRegisterCredentials()
    );
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const handleSubmit = async () => {
        const validation = validateRegister(credentials);
        if (!validation.valid) {
            setSnackbarMessage(validation.message || "Invalid input");
            setOpenSnackbar(true);
            return;
        }
        // Request to create a new user to backend
        const isRegistered = await registerService(credentials);
        // if success, navigate to login page after a success message
        // if error, show error message in snackbar
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "phoneNumber") {
            const numericValue = value.replace(/\D/g, "");
            if (!/^\d*$/.test(value) || numericValue.length > 10) {
                return;
            }
        }
        // TODO: Check if the name is valid before updating the state
        // TODO: Check if phone number is numberic and has a length of 10
        setCredentials((prev) => ({ ...prev, [name]: value }));
    };

    const handleCancel = () => {
        // add dialog to confirm cancel
        const userConfirmed = window.confirm(
            "Are you sure you want to cancel? Your changes will be lost."
        );
        if (!userConfirmed) return;
        navigate(-1);
    };

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    marginTop: 8,
                    marginBottom: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Paper
                    elevation={3}
                    sx={{
                        p: 4,
                        width: "100%",
                        backgroundColor: "background.paper",
                    }}
                >
                    <Typography
                        component="h1"
                        variant="h4"
                        sx={{
                            mb: 4,
                            textAlign: "center",
                            fontWeight: "bold",
                            color: "primary.main",
                        }}
                    >
                        Create New User
                    </Typography>

                    <FormControl component="form" fullWidth>
                        <Stack spacing={2.5}>
                            <TextField
                                name="name"
                                label="Name"
                                variant="outlined"
                                value={credentials.name}
                                onChange={handleChange}
                                placeholder="Enter your name"
                                type="text"
                                required
                                fullWidth
                            />
                            <TextField
                                name="surname"
                                label="Surname"
                                variant="outlined"
                                value={credentials.surname}
                                onChange={handleChange}
                                placeholder="Enter your surname"
                                type="text"
                                required
                                fullWidth
                            />
                            <TextField
                                name="email"
                                label="Email"
                                variant="outlined"
                                value={credentials.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                type="email"
                                required
                                fullWidth
                            />
                            <TextField
                                name="phoneNumber"
                                label="Phone Number"
                                variant="outlined"
                                value={credentials.phoneNumber}
                                onChange={handleChange}
                                placeholder="Enter your phone number"
                                type="tel"
                                required
                                fullWidth
                            />
                            <TextField
                                name="username"
                                label="Username"
                                variant="outlined"
                                value={credentials.username}
                                onChange={handleChange}
                                placeholder="Enter your username"
                                type="text"
                                required
                                fullWidth
                            />
                            <TextField
                                name="password"
                                label="Password"
                                variant="outlined"
                                value={credentials.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                type="password"
                                required
                                fullWidth
                            />
                            <TextField
                                name="confirmPassword"
                                label="Confirm Password"
                                variant="outlined"
                                value={credentials.confirmPassword}
                                onChange={handleChange}
                                placeholder="Comfirm your password"
                                type="password"
                                required
                                fullWidth
                            />
                        </Stack>

                        <Box
                            sx={{
                                mt: 4,
                                display: "flex",
                                gap: 2,
                                justifyContent: "center",
                            }}
                        >
                            <Button
                                variant="contained"
                                onClick={async () => {
                                    await testService();
                                }}
                            >
                                testButton
                            </Button>
                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={handleCancel}
                                sx={{ minWidth: 100 }}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSubmit}
                                sx={{ minWidth: 100 }}
                            >
                                Submit
                            </Button>
                        </Box>
                    </FormControl>
                </Paper>
            </Box>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity="error"
                    sx={{ width: "100%" }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
}
