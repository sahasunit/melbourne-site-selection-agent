import { UserMessage } from '../UserMessage/UserMessage'
import { AssistantMessage } from '../AssistantMessage/AssistantMessage'
import { LoadingIndicator } from '../LoadingIndicator/LoadingIndicator'
import { RequestErrorNotice } from '../RequestErrorNotice/RequestErrorNotice'
import { RateLimitNotice } from '../RateLimitNotice/RateLimitNotice'
import { Log, Column } from './ChatThread.styles'

export function ChatThread({ messages, onRetry, onSend }) {
  return (
    <Log role="log" aria-live="polite" aria-relevant="additions">
      <Column>
        {messages.map((message, index) => {
          if (message.role === 'user') {
            const next = messages[index + 1]
            const blocked = next?.role === 'assistant' && next.status === 'rate_limited'
            return <UserMessage key={message.id} text={message.text} dimmed={blocked} />
          }

          switch (message.status) {
            case 'pending':
              return <LoadingIndicator key={message.id} />
            case 'error':
              return (
                <RequestErrorNotice
                  key={message.id}
                  status={message.errorStatus}
                  detail={message.errorDetail}
                  question={message.question}
                  onRetry={() => onRetry(message.id)}
                />
              )
            case 'rate_limited':
              return <RateLimitNotice key={message.id} detail={message.errorDetail} />
            case 'done':
            default:
              return (
                <AssistantMessage
                  key={message.id}
                  text={message.text}
                  results={message.results}
                  onRetryTool={() => onSend(message.question)}
                />
              )
          }
        })}
      </Column>
    </Log>
  )
}
