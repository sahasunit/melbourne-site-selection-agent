import { Header } from '../Header/Header'
import { Shell, Main, InputBar, InputBarInner } from './ChatShell.styles'

export function ChatShell({ children, input }) {
  return (
    <Shell>
      <Header />
      <Main>{children}</Main>
      <InputBar>
        <InputBarInner>{input}</InputBarInner>
      </InputBar>
    </Shell>
  )
}
