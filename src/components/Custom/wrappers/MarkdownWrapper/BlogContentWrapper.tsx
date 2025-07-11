import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import { Box, IconButton } from '@mui/material';
import { useState } from 'react';

// Custom CodeBlock component
const CodeBlock = ({ language, value }: { language: string; value: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Box position="relative" mb={3}>
      <IconButton
        onClick={handleCopy}
        sx={{ position: 'absolute', top: 10, right: 10, zIndex: 2 }}
        size="small"
      >
        {copied ? <CheckIcon fontSize="small" /> : <ContentCopyIcon fontSize="small" />}
      </IconButton>

      <SyntaxHighlighter language={language} style={oneDark} customStyle={{
        borderRadius: 8,
        fontSize: "1rem",
        padding: "1.5rem",
        background: "#1e1e1e"
      }}>
        {value}
      </SyntaxHighlighter>
    </Box>
  );
};

export default function BlogPostRenderer({ content }: { content: string }) {
  return (
    <Box
      sx={{
        "& a": {
          color: "primary.main",
          textDecoration: "underline",
          wordBreak: "break-word",
          "&:hover": { textDecoration: "none", opacity: 0.85 }
        },
        "& img": {
          maxWidth: "100%",
          height: "auto",
          borderRadius: 2,
          display: "block",
          margin: "1rem auto",
          boxShadow: 2
        },
        "& h1": { fontSize: "2rem", fontWeight: 700, mt: 5, mb: 3 },
        "& h2": { fontSize: "1.75rem", fontWeight: 700, mt: 4, mb: 2 },
        "& h3": { fontSize: "1.4rem", fontWeight: 600, mt: 3, mb: 2 },
        "& h4": { fontSize: "1.2rem", fontWeight: 600, mt: 2, mb: 1 },
        "& h5, & h6": { fontSize: "1rem", fontWeight: 600, mt: 2, mb: 1 },
        "& p": { fontSize: "1.05rem", lineHeight: 1.7, mb: 2 },
        "& ul": { pl: 3, mb: 2, fontSize: "1.05rem" },
        "& li": { mb: 1 },
        "& table": {
          width: "100%",
          borderCollapse: "collapse",
          margin: "1.5rem 0",
          boxShadow: 2
        },
        "& th, & td": {
          border: "1px solid #444",
          padding: "0.75rem 1rem",
          textAlign: "left",
          verticalAlign: "top",
          fontSize: "1rem"
        },
        "& th": {
          backgroundColor: "#333",
          fontWeight: 700,
          color: "#fff"
        },
        "& td": {
          backgroundColor: "#1a1a1a",
          color: "#ddd"
        }
      }}
    >
      <ReactMarkdown
        components={{
          code({ inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <CodeBlock language={match[1]} value={String(children).trim()} />
            ) : (
              <code style={{
                backgroundColor: "#222",
                padding: "0.2rem 0.4rem",
                borderRadius: "4px"
              }}>
                {children}
              </code>
            );
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </Box>
  );
}
