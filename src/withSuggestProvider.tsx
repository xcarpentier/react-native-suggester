import React from 'react'
import { SuggesterProvider } from './SuggesterProvider'
import { SuggestOptions } from './suggest.config'

export const withSuggestProvider = <P extends {}>(
  WrappedComponent: React.ComponentType<P>,
) => (wrappedComponentProps: P) => (
  <SuggesterProvider {...SuggestOptions.options}>
    <WrappedComponent {...wrappedComponentProps} />
  </SuggesterProvider>
)
