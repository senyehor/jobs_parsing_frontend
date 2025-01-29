'use client'

import React, {useState} from 'react';
import {JobPosting} from "@/api/types";
import {SearchForm} from "@/components/SearchForm";
import {JobList} from "@/app/jobs/components/JobList";
import {fetchJobs as fetchJobsFromEndpoint} from "@/api/services";

const endpoint = 'all-sites/'

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
            const data = await fetchJobsFromEndpoint({
                endpoint: endpoint,
                keywords: keywords
            });
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
                    placeholder={"Keywords space separated"}
                    value={searchKeywords}
                    onChange={setSearchKeywords}
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