import {JobPosting} from "@/api/types";

const baseUrl = 'http://localhost:8000/api/';

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
