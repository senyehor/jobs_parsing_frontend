import {Box, Container, Typography} from "@mui/material";
import Link from "next/link";

export default function Home() {
    return (
        <Container maxWidth="lg" className="flex items-center justify-center h-screen">
            <Box textAlign="center">
                <Typography variant="h1" fontWeight="bold" gutterBottom>
                    Finding jobs made easier
                </Typography>
                <Typography variant="h4">
                    The platform aggregates job listings from multiple sources, allowing you to find the best
                    opportunities quickly.{' '}
                    <Typography variant='inherit' component={Link} href="/jobs/all" color="primary">
                        Let's start!
                    </Typography>
                </Typography>
            </Box>
        </Container>
    );
}
