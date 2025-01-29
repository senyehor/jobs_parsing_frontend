import {Box, Container, Typography} from "@mui/material";

export default function Home() {
    return (
        <Container maxWidth="md" className="flex items-center justify-center h-screen">
            <Box textAlign="center">
                <Typography variant="h2" fontWeight="bold" gutterBottom>
                    Finding jobs made easier
                </Typography>
                <Typography variant="h5">
                    The platform aggregates job listings from multiple sources, allowing you to find the best
                    opportunities quickly.
                </Typography>
            </Box>
        </Container>
    );
}
