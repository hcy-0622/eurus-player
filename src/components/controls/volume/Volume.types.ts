import { CSSProps } from '@/types'

export interface VolumeProps extends CSSProps {
  isMuted: boolean
  value?: number
  onMuteChange: (isMuted: boolean) => void
  onVolumeChange?: (value: number) => void
}
