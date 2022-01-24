import { CSSProps } from '../../../types'

export interface PlayProps extends CSSProps {
  isPlaying: boolean
  color?: string
  onPlayChange: (isPlaying: boolean) => void
}
