import React from 'react';

import {Card, CardContent, Grid2, Link, Typography} from "@mui/material";
import {JobPosting} from "@/api/jobs/types";

export function JobList({jobs}: { jobs: JobPosting[] }) {
    return (
        <Grid2 container spacing={3}>
            {jobs.map((job) => (
                <Grid2 key={job.link}>
                    <Card variant="outlined">
                        <CardContent>
                            <Typography variant="h6">
                                <Link href={job.link} target="_blank" rel="noopener noreferrer"
                                      sx={{textDecoration: 'none'}}>
                                    {job.job_title}
                                </Link>
                            </Typography>
                            <Typography variant="subtitle1">{job.company_name}</Typography>
                            <Typography variant="body2">
                                Location: {Array.isArray(job.location) ? job.location.join(', ') : job.location || 'N/A'}
                            </Typography>
                            <Typography variant="body2">Employment type: {job.employment_type}</Typography>
                            <Typography variant="body2">
                                Posted at: {job.posted_at ? job.posted_at.toString() : 'N/A'}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid2>
            ))}
        </Grid2>
    );
}