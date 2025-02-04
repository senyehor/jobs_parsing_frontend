export interface JobPosting {
    link: string;
    job_title: string;
    company_name: string;
    location: string[] | null;
    employment_type: string | null;
    posted_at: Date | null;
}

export interface JobSiteInfo {
    name: string;
    slug: string;
    link: string;
    description?: string;
}