import { CSSProps } from '@/types'

export interface FullscreenProps extends CSSProps {
  isFullscreen: boolean
  onFullscreenChange: (isFullscreen: boolean) => void
}
