import {Box, Button, TextField} from '@mui/material';
import React from "react";

export function SearchForm(
    {
        placeholder,
        value,
        onChange,
        onSearch,
    }: {
        placeholder: string
        value: string;
        onChange: (value: string) => void;
        onSearch: () => void;
    }) {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSearch();
    };

    return (
        <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection={{xs: 'column', sm: 'row'}}
             alignItems="center">
            <TextField
                variant="outlined"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                fullWidth
                margin="normal"
                size="medium"
                sx={{flexGrow: 1, marginBottom: {xs: 1, sm: 0}}}
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                size="medium"
                sx={{marginLeft: {sm: 2}, marginTop: {xs: 1, sm: 0}}}
            >
                Search
            </Button>
        </Box>
    );
}
