import { Wrapper, StatusRow, Dot, StatusText, Bars, SkeletonBar, Caption } from './LoadingIndicator.styles'

// Copy stays generic — the API is a single blocking call with no progress
// events, so we have no real signal for which tools are running or how many.
// No role="status" here — the parent ChatThread is already a role="log" live
// region, so this would cause the addition to be announced twice.
export function LoadingIndicator() {
  return (
    <Wrapper>
      <StatusRow>
        <Dot />
        <StatusText>Checking Melbourne's council data…</StatusText>
      </StatusRow>
      <Bars aria-hidden="true">
        <SkeletonBar $width="92%" />
        <SkeletonBar $width="100%" $delay="0.15s" />
        <SkeletonBar $width="64%" $delay="0.3s" />
      </Bars>
      <Caption>Usually takes a few seconds</Caption>
    </Wrapper>
  )
}
