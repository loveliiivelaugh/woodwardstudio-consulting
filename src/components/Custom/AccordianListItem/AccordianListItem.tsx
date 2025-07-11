import { List, ListItemText, Stack, Typography } from "@mui/material";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";

const defaultExperienceData = [
    {
        company: "Discover Financial Services, Illinois",
        position: "Application Engineer",
        period: "September 2024 - Current",
        details: [
            "Develop features using TypeScript, React, Redux, GraphQL, and Vitest.",
            "Implement microfrontend and microservices architecture.",
            "Write testable, high-quality code with 90%+ coverage w/React-Testing-Library, Jest, and Vitest.",
            "Participate in agile development, daily standups, and code reviews.",
            "Provide mentorship to junior engineers.",
            "Adhere to CI/CD Code Quality checks.",
        ],
        links: {
            companySite: "",
            linkedin: ""
        }
    },
    {
        company: "Charter Communications, Austin, Texas",
        position: "JavaScript Developer",
        period: "June 2022 - September 2024",
        details: [
            "Develop enterprise applications automating field technician processes.",
            "Build seamless UI/UX using React.",
            "Convert Python to JavaScript and develop backend services with Node.js.",
            "Implement user validation rules to ensure data integrity.",
        ],
        links: {
            companySite: "",
            linkedin: ""
        }
    },
    {
        company: "3vue, Woodridge, Illinois",
        position: "Front End React Web Developer",
        period: "July 2021 - April 2022",
        details: [
            "Develop business intelligence applications for health and life sciences.",
            "Integrate data visualizations using the QlikSense API.",
            "Create a reusable design system improving development speed and consistency.",
        ],
        links: {
            companySite: "",
            linkedin: ""
        }
    }
];

type ExperienceDataType = {
    company: string;
    position: string;
    period: string;
    details: string[];
    links: {
        companySite: string;
        linkedin: string;
    }
};

// Reusable AccordionListItem component 
const AccordionListItem = ({ company, position, period, details, links }: ExperienceDataType) => {
    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel-${company}-content`}
                id={`panel-${company}-header`}
            >
                <ListItemText
                    primary={<Typography variant="h5">{company}</Typography>}
                    secondary={<Typography variant="body1"><b>{position}</b></Typography>}
                />
            </AccordionSummary>
            <AccordionDetails>
                <Typography variant="h6">{period}</Typography>
                <List>
                    {details.map((detail: string, index: number) => (
                        <ListItemText key={index} primary={detail} />
                    ))}
                </List>
                <Stack direction={"row"} sx={{ gap: 2 }}>
                    <Link to={links.companySite}>Company Site</Link>
                    <Link to={links.linkedin}>LinkedIn</Link>
                </Stack>
            </AccordionDetails>
        </Accordion>
    );
};

// Usage in your component
const ExperienceSection = ({experienceData = defaultExperienceData}) => experienceData
    .map((job, index) => <AccordionListItem key={index} {...job} />);

export {AccordionListItem, ExperienceSection}