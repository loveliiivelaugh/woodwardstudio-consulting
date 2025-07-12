import React from 'react';
import { useNavigate } from 'react-router';
import { Box, Typography, Button, Container, Grid2 as Grid, Card, CardContent, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { LightbulbOutlined, LinkOutlined, AccessTimeOutlined, TrendingDownOutlined } from '@mui/icons-material';
import SlideIn from '@utilities/theme/animations/SlideIn';
import PlatformCarousel from '@components/Custom/PlatformCarousel';
import { ScrollToTop } from '@components/Custom/providers/Providers';
import StepForm from '@components/Custom/forms/premade/StepForm';
import consultingIntroVideo from '@utilities/assets/consult_intro.mp4';

type VideoPlayerProps = {
  src: string;
  poster?: string;
  width?: number | string;
  height?: number | string;
};

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  poster,
  width = "100%",
  height = "auto",
}) => {
  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "1rem" }}>
      <video
        src={src}
        poster={poster}
        width={width}
        height={height}
        controls
        autoPlay={false}
        muted={false}
        playsInline
        style={{
          borderRadius: "1rem",
          boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
          width: "100%",
          height: "auto",
        }}
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

// Pain Points Data Array
const painPoints = [
    {
        icon: <LightbulbOutlined sx={{ fontSize: 50, mb: 2 }} color="primary" />,
        title: "Wasted Founder Time",
        description: "You're spending hours every week on low-value tasks that prevent you from focusing on growth and strategy."
    },
    {
        icon: <LinkOutlined sx={{ fontSize: 50, mb: 2 }} color="primary" />,
        title: "Disconnected SaaS Tools",
        description: "Your systems don't talk to each other, forcing endless copy-paste work across CRMs, spreadsheets, and platforms."
    },
    {
        icon: <AccessTimeOutlined sx={{ fontSize: 50, mb: 2 }} color="primary" />,
        title: "Expensive Administrative Overhead",
        description: "You're paying staff or contractors to manually run processes that should be fully automated and scalable."
    },
    {
        icon: <TrendingDownOutlined sx={{ fontSize: 50, mb: 2 }} color="primary" />,
        title: "Leads & Revenue Lost to Slowness",
        description: "Slow response times, delayed onboarding, and manual follow-ups are leaking revenue and limiting your growth."
    },
];
const processSteps = [
    {
        step: "1. Discovery & Assessment",
        description: "We start by mapping your existing workflows, identifying hidden inefficiencies, and surfacing the highest ROI automation opportunities inside your business."
    },
    {
        step: "2. Strategy & Design",
        description: "I architect a fully customized automation system tailored to your exact business model, technology stack, and growth goals — blending AI agents, APIs, SaaS tools, and human workflows."
    },
    {
        step: "3. Implementation & Integration",
        description: "I build, test, and deploy your automation pipelines — integrating directly with your systems (databases, CRMs, SaaS platforms, APIs) to create a fully connected operating system."
    },
    {
        step: "4. Ongoing Support & Optimization",
        description: "After deployment, I continuously monitor, optimize, and improve your automations as your business evolves — ensuring long-term stability, scalability, and maximum ROI."
    }
];
// Case Studies Data Array
const caseStudies = [
    {
        title: "Lead Generation Automation",
        description: "Built an AI-powered lead scraping + enrichment pipeline that eliminated 12+ hours/week of manual prospecting for a digital agency and grew outbound capacity by 3x.",
        link: "/post/case-study-how-i-automated-lead-generation-and-tripled-outbound-capacity-for-a-digital-agency"
    },
    {
        title: "Operations Automation for Consultant",
        description: "Fully automated client onboarding, scheduling, invoicing, and CRM updates — allowing a solo consultant to double active clients without increasing admin time.",
        link: "/post/case-study-how-i-automated-client-onboarding-doubled-capacity-for-a-solo-consultant"
    },
    {
        title: "Internal Reporting System for SaaS Startup",
        description: "Deployed live reporting dashboards integrated with existing SaaS platform data — cutting monthly reporting time by 90% and improving leadership visibility in real-time.",
        link: "/post/case-study-how-i-automated-internal-reporting-for-a-saas-startup-cutting-reporting-time-by-90"
    },
    {
        title: "Fully Autonomous Blog & Content Flywheel Automation",
        description: "Deployed an AI-powered content flywheel that transforms daily engineering work into SEO-optimized blog posts, embedded affiliate marketing, and repurposed social content — fully automated, eliminating 10+ hours per week of manual content creation.",
        link: "/post/case-study-fully-autonomous-blog-content-flywheel-automation"
    },
    {
        title: "Self-Updating Company Knowledge Base",
        description: "Built an AI-powered documentation system that continuously converts real work — project notes, code updates, internal processes, and operational knowledge — into structured, living company documentation, eliminating the need for manual documentation labor.",
        link: "/post/guardian-case-study-self-updating-company-knowledge-base-automation"
    },
    {
        title: "Intelligent Email Workflow Automation",
        description: "Built an AI-powered email management system that categorizes inbound emails, extracts key business data, and automatically triggers downstream actions — converting unstructured email into fully automated task creation, client updates, and operational workflows.",
        link: "/post/case-study-intelligent-email-workflow-automation"
    }
];
const techStack = [
    "n8n (workflow orchestration)",
    "Supabase (database & auth)",
    "Flowise + Ollama (LLM agent orchestration)",
    "Qdrant (vector memory & embeddings)",
    "Salesforce (CRM integrations)",
    "REST / GraphQL APIs",
    "Postgres",
    "React + MUI + Framer Motion (frontend dashboards)"
];


// Styled Components
const Section = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    padding: theme.spacing(8, 0),
}));

const CardStyled = styled(Card)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[3],
    transition: 'transform 0.3s ease-in-out',
    '&:hover': { transform: 'translateY(-5px)' },
}));

const Consulting: React.FC = () => {
    const navigate = useNavigate();
    return (
        <ScrollToTop>
            <Box sx={{ minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
                {/* Hero */}
                <Section>
                    <Container maxWidth="md" sx={{ textAlign: 'center' }}>
                        <SlideIn>
                            <Typography variant="h2" fontWeight={700} gutterBottom>
                                Automate Your Business. Unlock Your Time.
                            </Typography>
                        </SlideIn>
                        <SlideIn delay={0.15}>
                            <Typography variant="h6" sx={{ color: 'text.secondary', mb: 4 }}>
                                I build fully customized AI-powered automation systems that eliminate repetitive tasks, reduce operational costs, and free your team to focus on high-value work — without adding headcount.
                            </Typography>
                        </SlideIn>
                        <SlideIn delay={0.3}>
                            <VideoPlayer src={consultingIntroVideo} />
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                sx={{ borderRadius: 999, textTransform: 'none', px: 4, py: 1.5 }}
                                href="https://booking.woodwardstudio.dev"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Book My Free Automation Audit
                            </Button>
                        </SlideIn>
                    </Container>
                </Section>

                {/* Pain Points */}
                <Section>
                    <Container maxWidth="lg">
                        <SlideIn>
                            <Typography variant="h4" fontWeight={600} textAlign="center" gutterBottom>
                                Common Automation Bottlenecks I Solve
                            </Typography>
                        </SlideIn>
                        <Grid container spacing={4} mt={4}>
                            {painPoints.map((item, index) => (
                                <Grid size={{ xs: 12, md: 3 }} key={index}>
                                    <SlideIn delay={index * 0.1}>
                                        <CardStyled>
                                            <CardContent sx={{ textAlign: 'center' }}>
                                                {item.icon}
                                                <Typography variant="h6" gutterBottom>{item.title}</Typography>
                                                <Typography variant="body2">{item.description}</Typography>
                                            </CardContent>
                                        </CardStyled>
                                    </SlideIn>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </Section>

                {/* Process */}
                {/* Consulting Process */}
                <Section>
                    <Container maxWidth="md">
                        <SlideIn>
                            <Typography variant="h4" fontWeight={600} textAlign="center" gutterBottom>
                                My Consulting Process
                            </Typography>
                        </SlideIn>
                        <Stack spacing={4} mt={4}>
                            {processSteps.map((item, index) => (
                                <SlideIn delay={index * 0.1} key={index}>
                                    <Typography variant="body1">
                                        <strong>{item.step}:</strong> {item.description}
                                    </Typography>
                                </SlideIn>
                            ))}
                        </Stack>
                    </Container>
                </Section>

                {/* Case Studies */}
                <Section>
                    <Container maxWidth="lg">
                        <SlideIn>
                            <Typography variant="h4" fontWeight={600} textAlign="center" gutterBottom>
                                Real Client Outcomes
                            </Typography>
                        </SlideIn>
                        <Grid container spacing={4} mt={4}>
                            {caseStudies.map((item, index) => (
                                <Grid size={{ xs: 12, md: 4 }} key={index}>
                                    <SlideIn delay={index * 0.1}>
                                        <CardStyled>
                                            <CardContent>
                                                <Typography variant="h6" fontWeight={580} gutterBottom>{item.title}</Typography>
                                                <Typography variant="body2" gutterBottom>{item.description}</Typography>
                                                <Box sx={{ mt: 2, textAlign: 'right' }}>
                                                    <Button
                                                        variant="outlined"
                                                        size="small"
                                                        onClick={() => navigate(item.link)}
                                                    >
                                                        {"Read Case Study"}
                                                    </Button>
                                                </Box>
                                            </CardContent>
                                        </CardStyled>
                                    </SlideIn>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </Section>

                {/* Tech Stack */}
                <PlatformCarousel />

                {/* About */}
                <Section>
                    <Container maxWidth="md">
                        <SlideIn>
                            <Typography variant="h4" fontWeight={600} textAlign="center" gutterBottom>
                                About Me
                            </Typography>
                        </SlideIn>
                        <SlideIn delay={0.15}>
                            <Typography variant="body1" textAlign="center" sx={{ color: 'text.secondary', mt: 2 }}>
                                I'm Michael Woodward — a full-stack AI automation engineer and systems architect. I build custom AI-powered automation systems that connect business workflows, eliminate manual work, and create fully integrated business operating systems. With deep experience across SaaS, APIs, CRMs, data pipelines, and AI agents, I help businesses scale efficiently while freeing founders to focus on growth.
                            </Typography>
                        </SlideIn>
                    </Container>
                </Section>

                {/* CTA */}
                <Section>
                    <Container maxWidth="md" sx={{ textAlign: 'center' }}>
                        <SlideIn>
                            <Typography variant="h4" fontWeight={600} gutterBottom>
                                Let’s Unlock Time & Scale Your Business
                            </Typography>
                        </SlideIn>
                        <SlideIn delay={0.15}>
                            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>
                                Book a free 15-minute automation audit. I’ll analyze your workflows and identify 2-3 high-impact automation opportunities you can implement immediately.
                            </Typography>
                        </SlideIn>
                        <SlideIn delay={0.3}>
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                sx={{ borderRadius: 999, textTransform: 'none', px: 4, py: 1.5 }}
                                href="https://booking.woodwardstudio.dev"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Book My Free Automation Audit
                            </Button>
                        </SlideIn>
                    </Container>
                </Section>
            </Box>
        </ScrollToTop>
    );
};

export default Consulting;
