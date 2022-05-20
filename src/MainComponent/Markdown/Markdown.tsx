import 'github-markdown-css'
import React, { FunctionComponent } from 'react'
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism'

export interface MarkdownProps {
    source: string
}

const Markdown: FunctionComponent<MarkdownProps> = ({ source }) => {
    // for more advanced options, see: https://github.com/remarkjs/react-markdown
    return (
        <ReactMarkdown
            children={source}
            linkTarget="_blank"
            components={{
                code({node, inline, className, children, ...props}) {
                  const match = /language-(\w+)/.exec(className || '')
                  return !inline && match ? (
                    <SyntaxHighlighter
                      children={String(children).replace(/\n$/, '')}
                      language={match[1]}
                      PreTag="div"
                      {...props}
                      style={dark} // needs to come after the ...props, apparently
                    />
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  )
                }
            }}
        />
    )
}

export default Markdown