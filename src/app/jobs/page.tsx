'use client'
import React, {useState} from 'react';
import {JobPosting} from "@/app/jobs/types";
import {Box, Button, Card, CardContent, Grid2, Link, TextField, Typography} from '@mui/material';

const baseUrl = 'http://localhost:8000';

export default function JobListings() {
    const [searchKeywords, setSearchKeywords] = useState<string>('');
    const [jobs, setJobs] = useState<JobPosting[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const fetchJobs = async (keywords: string[]) => {
        setLoading(true);
        setError('');
        const searchParams = new URLSearchParams();
        keywords.forEach((keyword) => {
            searchParams.append('keyword', keyword);
        })

        try {
            const response = await fetch(`${baseUrl}/api/get-jobs?${searchParams.toString()}`)
            const data = await response.json();
            setJobs(data);
        } catch (error) {
            setError('Failed to fetch jobs. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div>
                <h1>Job Listings</h1>
                <SearchForm
                    searchKeywords={searchKeywords}
                    setSearchKeywords={setSearchKeywords}
                    onSearch={() => fetchJobs(
                        searchKeywords.split(/\s+/)
                            .map(keyword => keyword.trim())
                            .filter(keyword => keyword))
                    }
                />
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                <JobList jobs={jobs}/>
            </div>
        </div>
    );
};

function SearchForm(
    {
        searchKeywords,
        setSearchKeywords,
        onSearch,
    }: {
        searchKeywords: string;
        setSearchKeywords: (value: string) => void;
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
                placeholder="Job title keywords space separated"
                value={searchKeywords}
                onChange={(e) => setSearchKeywords(e.target.value)}
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

function JobList({jobs}: { jobs: JobPosting[] }) {
    return (
        <Grid2 container spacing={3}>
            {jobs.map((job) => (
                <Grid2 key={job.link}>
                    <Card variant="outlined">
                        <CardContent>
                            <Typography variant="h6">
                                <Link href={job.link} target="_blank" rel="noopener noreferrer"
                                      sx={{textDecoration: 'none'}}
                                >
                                    {job.job_title}
                                </Link>
                            </Typography>
                            <Typography variant="subtitle1">{job.company_name}</Typography>
                            <Typography variant="body2">
                                Location: {Array.isArray(job.location) ? job.location.join(', ') : job.location || 'N/A'}
                            </Typography>
                            <Typography variant="body2">Employment Type: {job.employment_type}</Typography>
                            <Typography variant="body2">
                                Posted At: {job.posted_at ? job.posted_at.toString() : 'N/A'}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid2>
            ))}
        </Grid2>
    );
}
