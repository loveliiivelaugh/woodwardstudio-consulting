import { List, ListItem, ListItemIcon, ListItemText, Divider } from "@mui/material";
import { Box, Container, Typography, Grid2 as Grid, Card, CardContent, Button } from '@mui/material';
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { motion } from 'framer-motion';
import { StepForm } from "./BookingPage";
import SlideIn from "@utilities/theme/animations/SlideIn";

const services = [
  {
    title: 'Starter System',
    description: 'One core automation (e.g. onboarding, CRM, Stripe to Notion)',
    price: '$500–$1,000',
  },
  {
    title: 'Growth Engine',
    description: 'Multi-step workflows, integrated tools, custom logic',
    price: '$1,000–$2,500',
  },
  {
    title: 'Infinity Ops',
    description: 'Fully automated backend, agent flows, scalable infra',
    price: '$3,000+',
  },
  {
    title: 'AI Strategy Consulting',
    description: '1:1 consulting to identify automation and AI opportunities. Includes systems mapping and feasibility.',
    price: '$200/hr or $1,500/day',
  },
  {
    title: 'Automation Opportunity Audit',
    description: 'Deep-dive into your stack to uncover automations and inefficiencies. Comes with a prioritized blueprint.',
    price: '$1,000–$3,000',
  },
  {
    title: 'Custom Tech Stack Architecture',
    description: 'Full backend/frontend architecture using local-first or cloud-native tools.',
    price: '$3,000–$8,000',
  },
  {
    title: 'End-to-End Business Automation',
    description: 'Automate entire workflows: client onboarding, task routing, outreach, etc.',
    price: '$5,000–$20,000+',
  },
  {
    title: 'n8n Workflow Engineering',
    description: 'Custom automations using n8n, API integrations, scraping, scheduling, and more.',
    price: '$1,000–$10,000',
  },
  {
    title: 'Upwork Lead Discovery Automator',
    description: 'Fully automated Upwork job scraping, filtering, and outreach pipeline.',
    price: '$2,000–$5,000',
  },
  {
    title: 'Email + Notion-Based Client Portals',
    description: 'AI-powered, self-serve client portals with dashboards and automation.',
    price: '$1,500–$6,000',
  },
  {
    title: 'Private AI Assistant System',
    description: 'Fully self-hosted ChatGPT-style system with memory and workflow integration.',
    price: '$5,000–$25,000',
  },
  {
    title: 'Custom Fine-Tuned LLMs',
    description: 'Fine-tune TinyLlama, Mistral, LLaMA 3, etc. Includes training, optimization, and packaging.',
    price: '$2,000–$10,000',
  },
  {
    title: 'Memory Graph System (Qdrant + Supabase)',
    description: 'Semantic + structured memory system for AI and search.',
    price: '$4,000–$12,000',
  },
  {
    title: 'Hosted Memory/Embedding API',
    description: 'Self-hosted or managed memory API for AI apps.',
    price: '$3,000–$10,000',
  },
  {
    title: 'Auto-Blog + Social Distribution',
    description: 'Fully automated blog + social media system fed by live work context.',
    price: '$1,500–$6,000',
  },
  {
    title: 'LLM-Powered Newsletter System',
    description: 'Automated newsletter content creation and delivery using markdown + HTML templates.',
    price: '$2,000–$4,000',
  },
  {
    title: 'Ghostwriting + Personal Brand AI',
    description: 'Automated content creation for your personal brand and thought leadership.',
    price: '$1,500/mo retainer',
  },
  {
    title: 'Monorepo Dev Environment',
    description: 'Vite, Bun, Drizzle, Supabase and more in one integrated dev stack.',
    price: '$3,000–$8,000',
  },
  {
    title: 'AgentFlow UI Builder',
    description: 'Drag-and-drop interface for agentic workflow and memory orchestration.',
    price: '$4,000–$15,000',
  },
  {
    title: 'Self-Hosted Dev Stack Setup',
    description: 'Cloudflare, Tailscale, Docker, n8n, Ollama, Uptime Kuma, etc.',
    price: '$2,000–$10,000',
  }
];

export const ServicesPage2 = () => {
  return (
    <Box sx={{ bgcolor: 'background.default', color: 'text.primary', minHeight: '100vh', py: 8 }}>
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Typography variant="h3" align="center" gutterBottom fontWeight="bold">
            Automate Your Business.
          </Typography>
          <Typography variant="h4" align="center" gutterBottom fontWeight="bold">
            Unlock Your Time.
          </Typography>
          <Typography variant="body1" align="center" paragraph>
            I build fully customized AI-powered automation systems that eliminate repetitive tasks, reduce operational
            costs, and free your team to focus on high-value work — without adding headcount.
          </Typography>
          <SlideIn delay={0.3}>
              <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{ borderRadius: 999, textTransform: 'none', px: 4, py: 1.5 }}
                  href="https://calendly.com/woodward-michael-a/15min"
                  target="_blank"
                  rel="noopener noreferrer"
              >
                  Book My Free Automation Audit
              </Button>
          </SlideIn>
        </motion.div>

        <Box mt={10}>
          <Typography variant="h4" align="center" fontWeight="bold" gutterBottom sx={{ textDecoration: 'underline' }}>
            Services
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {services.map((service, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={service.title}>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <Card sx={{ height: '100%', bgcolor: 'grey.900', color: 'common.white', boxShadow: 3 }}>
                    <CardContent>
                      <Typography variant="h6" fontWeight="bold" gutterBottom>
                        {service.title}
                      </Typography>
                      <Typography variant="body2" paragraph>
                        {service.description}
                      </Typography>
                      <Typography variant="caption" color="primary">
                        {service.price}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};


const Services = () => {
  return (
    <Container maxWidth="md" sx={{ mt: { xs: 20, sm: 10 }, mb: 10 }}>
      <Typography variant="h3" gutterBottom>
        Work With Me
      </Typography>

      <Typography variant="body1" sx={{ mb: 4, opacity: 0.85 }}>
        I'm a senior full-stack engineer and system architect. I specialize in building autonomous software infrastructure using local-first tools like Supabase, Qdrant, Ollama, and n8n — all orchestrated by agentic pipelines and real-time memory systems.
      </Typography>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h5" gutterBottom>
        What I Can Help With
      </Typography>

      <List>
        {[
          "AI-powered blog generation and publishing pipelines",
          "Local LLM and vector database integration (Ollama + Qdrant)",
          "Custom agent orchestration and task automation with memory",
          "Self-hosted Supabase, n8n, Grafana, and Cloudflare setup",
          "Code generation pipelines and AI-assisted development tools",
          "Notion + GitHub + Slack integrations for agent workflows",
          "AgentFlow system design and private LLM routing infrastructure",
        ].map((text, i) => (
          <ListItem key={i} disablePadding>
            <ListItemIcon sx={{ minWidth: 32 }}>
              <CheckCircleIcon fontSize="small" color="secondary" />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 4 }} />

      <Typography variant="body1" sx={{ mb: 2 }}>
        I work with small teams, early-stage startups, and technical founders who want to build agent-powered systems or local-first AI automation engines.
      </Typography>

      <Typography variant="body1" sx={{ mb: 4 }}>
        If you'd like to talk about working together, just reach out via{" "}
        <a href="mailto:michael@woodwardstudio.com" style={{ textDecoration: "underline", color: "inherit" }}>
          email
        </a>{" "}
        or message me on{" "}
        <a href="https://x.com/LoveLiiiveLaugh" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline", color: "inherit" }}>
          X
        </a>
        .
      </Typography>
    </Container>
  );
};

export default Services;
