'use client'
import React, {useState} from 'react';
import {JobPosting} from "@/app/jobs/types";

const baseUrl = 'http://localhost:8000';

export default function JobListings() {
    const [searchKeywords, setSearchKeywords] = useState<string>('');
    const [jobs, setJobs] = useState<JobPosting[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const fetchJobs = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const keywords = searchKeywords.split(' ')
            .map(keyword => keyword.trim())
            .filter(keyword => keyword);
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
            <h1>Job Listings</h1>
            <form onSubmit={fetchJobs}>
                <input
                    type="text"
                    placeholder="Keywords"
                    value={searchKeywords}
                    onChange={(e) => setSearchKeywords(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>

            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}

            <ul>
                {jobs.map((job) => (
                    <li key={job.link}>
                        <a href={job.link} target="_blank" rel="noopener noreferrer">
                            {job.job_title} at {job.company_name}
                        </a>
                        <p>Location: {Array.isArray(job.location) ? job.location.join(', ') : job.location || 'N/A'}</p>
                        <p>Employment Type: {job.employment_type}</p>
                        <p>Posted At: {job.posted_at ? job.posted_at.toString() : 'N/A'}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};
