import {JobPosting, JobSiteInfo} from "@/api/types";

const baseUrl = 'http://localhost:8000/api/v1';

export const fetchJobs = async ({endpoint, keywords}: {
    endpoint: string;
    keywords: string[]
}): Promise<JobPosting[]> => {
    const searchParams = new URLSearchParams();
    keywords.forEach((keyword) => {
        searchParams.append('keywords', keyword);
    });
    const response = await fetch(`${baseUrl}${endpoint}?${searchParams.toString()}`);
    if (!response.ok) {
        throw new Error('Failed to fetch jobs');
    }
    return await response.json();
};

export const fetchJobSites = async (): Promise<JobSiteInfo[]> => {
    const response = await fetch(`${baseUrl}/job-sites/`);
    if (!response.ok) {
        throw new Error('Failed to fetch job sites');
    }
    return await response.json();
};