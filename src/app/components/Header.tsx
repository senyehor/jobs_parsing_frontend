"use client"; // Ensure this runs on the client side

import {usePathname} from "next/navigation";
import {AppBar, Box, Button, Toolbar, Typography} from "@mui/material";
import Link from "next/link";

export default function Header() {
    const pathname = usePathname();

    const navItems = [
        {label: "Jobs", path: "/jobs/all"},
        {label: "About", path: "/about"},
    ];

    return (
        <AppBar position="static" sx={{backgroundColor: "#222"}}>
            <Toolbar>
                <Link href="/" passHref legacyBehavior>
                    <Typography variant="h6" sx={{flexGrow: 1, cursor: "pointer"}}>
                        JobFinder
                    </Typography>
                </Link>
                <Box sx={{display: "flex", gap: 2}}>
                    {navItems.map(({label, path}) => (
                        <Button
                            key={path}
                            component={Link}
                            href={path}
                            color="inherit"
                            sx={{
                                color: pathname === path ? "#555" : "white",
                                borderRadius: "5px",
                                "&:hover": {
                                    backgroundColor: pathname === path ? "#555" : "#444",
                                }
                            }}
                        >
                            {label}
                        </Button>
                    ))}
                </Box>
            </Toolbar>
        </AppBar>
    );
}
