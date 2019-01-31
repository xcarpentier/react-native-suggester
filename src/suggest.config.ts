import { SuggesterProviderProps } from './SuggesterProvider'

export const SuggestOptions: { options: SuggesterProviderProps } = {
  options: {},
}

export const setSuggestOptions = (options: SuggesterProviderProps) => {
  SuggestOptions.options = options
}
