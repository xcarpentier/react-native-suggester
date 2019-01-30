import * as React from 'react'
import { Text, View, StyleSheet, TextInput } from 'react-native'
import { Constants } from 'expo'
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
        <View style={styles.container}>
          <Text>Hello World</Text>
          <SuggestTextInput data={DATA} style={styles.input} />
          <Text>Hello World</Text>
          <Text>Hello World</Text>
          <Text>Hello World</Text>
          <Text>Hello World</Text>
          <SuggestTextInput data={DATA} style={styles.input} />
          <Text>Hello World</Text>
          <Text>Hello World</Text>
          <Text>Hello World</Text>
          <Text>Hello World</Text>
          <SuggestTextInput data={DATA} style={styles.input} />
        </View>
      </SuggesterProvider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  input: {
    width: 300,
    height: 30,
    borderColor: '#000',
    borderWidth: 1,
  },
})
