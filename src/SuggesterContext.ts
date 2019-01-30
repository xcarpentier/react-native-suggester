import * as React from 'react'
import { IData } from 'IData'

export interface SuggesterContextParam {
  setMarginTopAsync?(marginTop: number): Promise<void>
  handleFocusProvider?(): void
  setDataAsync?(data: IData[]): Promise<void>
  handleBlurProvider?(): void
}

export const SuggesterContext = React.createContext<SuggesterContextParam>({})
