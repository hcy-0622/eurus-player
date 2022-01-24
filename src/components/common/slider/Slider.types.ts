export type SliderDirection = 'vertical' | 'horizon'
export type SliderChange = (value: number) => void

export interface SliderProps {
  direction?: SliderDirection
  defaultValue?: number
  value?: number
  onChange: SliderChange
}
