import ReactMarkdown from 'react-markdown'
import { ResultGroup } from '../ResultGroup/ResultGroup'
import { Wrapper, Paragraph, Divider } from './AssistantMessage.styles'

// react-markdown passes its mdast `node` prop to custom renderers — strip it
// before spreading the rest, otherwise styled-components forwards it to the
// DOM <p>/<hr> and React warns about an unrecognized attribute.
function MarkdownParagraph({ node, ...props }) {
  return <Paragraph {...props} />
}

function MarkdownDivider({ node, ...props }) {
  return <Divider {...props} />
}

export function AssistantMessage({ text, results, onRetryTool }) {
  return (
    <Wrapper>
      <ReactMarkdown components={{ p: MarkdownParagraph, hr: MarkdownDivider }}>{text}</ReactMarkdown>
      <ResultGroup results={results} onRetryTool={onRetryTool} />
    </Wrapper>
  )
}
