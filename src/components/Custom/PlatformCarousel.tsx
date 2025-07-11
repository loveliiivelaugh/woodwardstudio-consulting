import { Box, Typography, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import SlideIn from '@utilities/theme/animations/SlideIn';

// Logo Data Array
const platforms = [
  { name: "n8n", logo: "/logos/n8n.svg" },
  { name: "Supabase", logo: "/logos/supabase.svg" },
  { name: "Qdrant", logo: "/logos/qdrant.svg" },
  { name: "Flowise", logo: "/logos/flowise.svg" },
  { name: "Ollama", logo: "/logos/ollama.svg" },
  { name: "Salesforce", logo: "/logos/salesforce.svg" },
  { name: "Zapier", logo: "/logos/zapier.svg" },
  { name: "Make", logo: "/logos/make.svg" },
  { name: "Shortcuts", logo: "/logos/shortcuts.svg" },
  { name: "REST APIs", logo: "/logos/api.svg" },
  { name: "GraphQL", logo: "/logos/graphql.svg" }
];

// Styled Components
const MarqueeWrapper = styled(Box)(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  width: '100%',
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(6, 0),
}));

const MarqueeInner = styled(motion.div)({
  display: 'flex',
  gap: '80px',
  alignItems: 'center',
});

const PlatformLogo = styled('img')({
  height: 40,
  filter: 'brightness(0) invert(1)',
  opacity: 0.7,
  transition: 'opacity 0.3s ease',
  '&:hover': { opacity: 1 }
});

const Section = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    padding: theme.spacing(8, 0),
}));

export default function PlatformCarousel() {
    return (
        <Section>
            <Container maxWidth="md">
                <SlideIn>
                    <Typography variant="h4" fontWeight={600} textAlign="center" gutterBottom>
                        Platforms I Build With
                    </Typography>
                </SlideIn>

                <MarqueeWrapper>
                    <MarqueeInner
                        animate={{
                            x: ['0%', '-50%']
                        }}
                        transition={{
                            repeat: Infinity,
                            repeatType: 'loop',
                            duration: 40, // Smooth slow professional scroll
                            ease: 'linear'
                        }}
                    >
                        {[...platforms, ...platforms].map((platform, index) => (
                            <PlatformLogo key={index} src={platform.logo} alt={platform.name} />
                        ))}
                    </MarqueeInner>
                </MarqueeWrapper>
            </Container>
        </Section>
    );
}

