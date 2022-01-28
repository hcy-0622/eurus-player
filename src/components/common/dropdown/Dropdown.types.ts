import { CSSProps } from '@/types'

export interface DropdownProps extends CSSProps {
  overlay: JSX.Element
  overlayClassName?: string
  overlayStyle?: React.CSSProperties
  defaultStyle?: boolean
}
