<p align="center" >
   <a href="https://reactnative.gallery/xcarpentier/react-native-suggester">
    <img alt="react-native-suggester" src="https://thumbs.gfycat.com/BlueInferiorHorseshoecrab-size_restricted.gif" width="260" height="510" />
 </a>

</p>

<p align="center">
  <a href="https://www.npmjs.com/package/react-native-suggester">
  <img alt="npm downloads" src="https://img.shields.io/npm/dm/react-native-suggester.svg"/></a>
  <a href="https://www.npmjs.com/package/react-native-suggester"><img alt="npm version" src="https://badge.fury.io/js/react-native-suggester.svg"/></a>
  <a href="#hire-an-expert"><img src="https://img.shields.io/badge/%F0%9F%92%AA-hire%20an%20expert-brightgreen"/></a>
</p>

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

### With HOC

```jsx
import {
  SuggesterProvider,
  SuggestTextInput,
  setSuggestOptions,
} from 'react-native-suggester'

setSuggestOptions({
  statusBarHeight: 10,
  backgroundColor: 'white',
  textColor: 'black',
  textFont: 'System',
  textFontSize: 16,
  textWhenEmpty: '...',
})

@SuggesterProvider
class App extends React.Component {
  render() {
    return (
      <View>
        {/* somewhere in your app */}
        <SuggestTextInput name="field1" data={DATA} style={styles.input} />
      </View>
    )
  }
}
```

## Hire an expert!

Looking for a ReactNative freelance expert with more than 12 years experience? Contact me from my [website](https://xaviercarpentier.com)!
