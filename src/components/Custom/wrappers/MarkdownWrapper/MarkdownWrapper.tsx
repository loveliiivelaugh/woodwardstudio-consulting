// ****
// *    Install Dependencies
// ```
// @ts
// bun add react-markdown react-syntax-highlighter rehype-katex remark-math react-lazy-load-image-component
// bun add --save-dev @types/react-syntax-highlighter @types/react-lazy-load-image-component
// ```
// *
// ****
import Markdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import rehypeKatex from 'rehype-katex'
import rehypeRaw from 'rehype-raw';
import remarkMath from 'remark-math'
import { LazyLoadImage } from 'react-lazy-load-image-component';
// import { TextGenerateEffect } from '../theme/TextGenerateEffect'
// import { TypewriterEffect } from '../theme/TypeWriterEffect'

interface MarkdownWrapperProps {
    children: string
    isRawHtml?: boolean;
    isLastElement?: boolean
};

const MarkdownWrapper = ({ children, isRawHtml, isLastElement = false }: MarkdownWrapperProps) => {
    const detectAndWrapInlineCode = (html: string): string => {
        // Heuristic: look for lines starting with \"javascript \" and wrap in <pre><code>
        return html.replace(
          /“javascript(.*?)”/gs,
          (_, code) =>
            `<pre><code class=\"language-javascript\">${code.trim()}</code></pre>`
        );
    };
    const toMarkdown = (string: string) => {
        const plainText = new DOMParser()
            .parseFromString(string, 'text/html')
            .body.textContent || '';

        return detectAndWrapInlineCode(plainText);
    };
    return (
        <Markdown
            children={isRawHtml ? toMarkdown(children) : children}
            remarkPlugins={[remarkMath]}
            rehypePlugins={[rehypeKatex, rehypeRaw]}
            components={{
                pre: ({ children }) => <>{children}</>, // 🔧 let react-syntax-highlighter handle the layout
                code(props: any) {
                    const { children, className, node, ...rest } = props
                    const match = /language-(\w+)/.exec(className || '')
                    return match ? (
                        <SyntaxHighlighter
                            {...rest}
                            PreTag="div"
                            children={String(children).replace(/\n$/, '')}
                            language={match[1]}
                            style={dark}
                        />
                    ) : (
                        <code
                            {...rest} 
                            className={className}
                            style={{
                                // background: '#111',//todo -> fix for light/dark mode
                                padding: '2px 6px',
                                borderRadius: '4px',
                                fontSize: '0.85rem'
                            }}
                        >
                            {children}
                        </code>
                    )
                },
                img: (props: any) => <LazyLoadImage {...props} effect="blur" />,
                // ...isLastElement && {
                //     p: (props) => <TextGenerateEffect words={props.children} />
                // }
                // p: (props) => <TypewriterEffect words={props.children.split(' ')} />,
            }}
        />
    )
}

export default MarkdownWrapper