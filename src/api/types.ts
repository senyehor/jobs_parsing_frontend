export interface JobPosting {
    link: string;
    job_title: string;
    company_name: string;
    location: string[] | null;
    employment_type: string | null;
    posted_at: Date | null;
}
