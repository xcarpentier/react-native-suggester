[![NPM version](https://badge.fury.io/js/react-native-suggester.svg)](http://badge.fury.io/js/react-native-suggester)

# react-native-suggester

React-Native package to decorate TextInput and get suggestions with good UX

## How to use it ?

```jsx
import { SuggesterProvider, SuggestTextInput } from 'react-native-suggester'

const DATA = [
  { id: 1, value: 'Honda' },
  { id: 2, value: 'BMW' },
  { id: 3, value: 'Harley-Davidson' },
  { id: 4, value: 'Yamaha' },
  { id: 5, value: 'Kawasaki' },
  { id: 6, value: 'Triumph' },
  { id: 8, value: 'Ducati' },
  { id: 9, value: 'Suzuki' },
]

export default class App extends React.Component {
  render() {
    return (
      <SuggesterProvider>
        {/* somewhere in your app */}
        <SuggestTextInput name="field1" data={DATA} style={styles.input} />
      </SuggesterProvider>
    )
  }
}
```
