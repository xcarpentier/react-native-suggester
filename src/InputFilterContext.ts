import * as React from 'react'
import { IData } from 'IData'

export interface InputContext {
  setMarginTopAsync?(marginTop: number): Promise<void>
  handleFocusProvider?(): void
  setDataAsync?(data: IData[]): Promise<void>
  handleBlurProvider?(): void
}

export const InputFilterContext = React.createContext<InputContext>({})
