export interface JobPosting {
    link: string;
    job_title: string;
    company_name: string;
    location: string[] | null;
    employment_type: string | null;
    posted_at: Date | null;
}

export async function fetchJobsFromEndpoint(
    baseUrl: string, endpoint: string, keywords: string[]
): Promise<JobPosting[]> {
    const searchParams = new URLSearchParams();
    keywords.forEach((keyword) => searchParams.append('keywords', keyword));
    const response = await fetch(`${baseUrl}${endpoint}?${searchParams.toString()}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch jobs from ${endpoint}`);
    }
    return await response.json();
}
