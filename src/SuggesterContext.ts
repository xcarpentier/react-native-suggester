import * as React from 'react'
import { IData } from './IData'
import { STATUS_BAR_HEIGHT } from './Constants'

export interface SuggesterContextParam {
  values?: { [name: string]: string }
  statusBarHeight?: number
  backgroundColor?: string
  textColor?: string
  textFont?: string
  focused?: boolean
  setMarginTopAsync?(marginTop: number): Promise<void>
  setValueAsync?(name: string, value: string): Promise<void>
  handleFocusProvider?(): void
  setDataAsync?(name: string, data: IData[]): Promise<void>
  handleBlurProvider?(): void
  setPaddingHorizontalAsync?(paddingVertical: number): Promise<void>
}

export const SuggesterContext = React.createContext<SuggesterContextParam>({
  statusBarHeight: STATUS_BAR_HEIGHT,
})
