import { CSSProps } from '@/types'

export type SliderDirection = 'vertical' | 'horizon'
export type SliderChange = (value: number) => void

export interface SliderProps extends CSSProps {
  direction?: SliderDirection
  defaultValue?: number
  value?: number
  onChange?: SliderChange
}
