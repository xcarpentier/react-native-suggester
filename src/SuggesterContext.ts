import * as React from 'react'
import { IData } from './IData'
import { STATUS_BAR_HEIGHT } from './Constants'

export interface SuggesterContextParam {
  statusBarHeight?: number
  setMarginTopAsync?(marginTop: number): Promise<void>
  handleFocusProvider?(): void
  setDataAsync?(data: IData[]): Promise<void>
  handleBlurProvider?(): void
}

export const SuggesterContext = React.createContext<SuggesterContextParam>({
  statusBarHeight: STATUS_BAR_HEIGHT,
})
