import React from 'react';
import {Box, Chip, Typography} from '@mui/material';
import {CheckCircle, RadioButtonUnchecked} from '@mui/icons-material';

interface JobSite {
    name: string;
    slug: string;
    link: string;
}

interface JobSiteFiltersProps {
    jobSites: JobSite[];
    selectedSlugs: string[];
    onSlugsChange: (newSlugs: string[]) => void;
}

export const JobSiteFilters: React.FC<JobSiteFiltersProps> = ({jobSites, selectedSlugs, onSlugsChange}) => {
    const handleSlugChange = (slug: string) => {
        const newSelection = selectedSlugs.includes(slug)
            ? selectedSlugs.filter(s => s !== slug) // remove slug
            : [...selectedSlugs, slug]; // add slug
        onSlugsChange(newSelection);
    };

    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                Choose job site to include
            </Typography>
            <Box display="flex" flexDirection="row" flexWrap="wrap" gap={2}>
                {jobSites.map((site) => {
                    const isSelected = selectedSlugs.includes(site.slug);
                    return (
                        <Chip
                            key={site.slug}
                            label={site.name}
                            clickable
                            component="a"
                            href={site.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            color={isSelected ? 'primary' : 'default'}
                            icon={
                                isSelected
                                    ? <CheckCircle sx={{fontSize: '18px'}} />
                                    : <RadioButtonUnchecked sx={{fontSize: '18px'}} />
                            }
                            onClick={(e) => {
                                e.preventDefault();
                                handleSlugChange(site.slug);
                            }}
                            sx={{
                                borderRadius: '16px',
                                padding: '8px 16px',
                                textTransform: 'capitalize',
                                backgroundColor: isSelected ? '#1976d2' : '#e0e0e0',
                                color: isSelected ? '#fff' : '#000',
                                '&:hover': {
                                    backgroundColor: isSelected ? '#1565c0' : '#bdbdbd',
                                },
                                width: 'fit-content'
                            }}
                        />
                    );
                })}
            </Box>
        </Box>
    );
};
