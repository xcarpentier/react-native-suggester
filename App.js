import * as React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Constants } from 'expo'
import { SuggesterProvider, SuggestTextInput } from './src'

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
  state = {
    field1: 'not set',
    field2: 'not set',
    field3: 'not set',
  }
  render() {
    return (
      <SuggesterProvider
        backgroundColor="black"
        textColor="white"
        textWhenEmpty="..."
        textFont="System"
      >
        <View style={styles.container}>
          <Text>Hello World</Text>
          <SuggestTextInput
            placeholderTextColor="#888"
            placeholder="moto 1"
            name="field1"
            data={DATA}
            style={styles.input}
            onChangeText={text => this.setState({ field1: text })}
          />
          <Text>Field value: {this.state.field1}</Text>
          <Text>Hello World</Text>
          <Text>Hello World</Text>
          <Text>Hello World</Text>
          <Text>Hello World</Text>
          <SuggestTextInput
            placeholderTextColor="#888"
            placeholder="moto 2"
            name="field2"
            data={DATA}
            style={styles.input}
            onChangeText={text => this.setState({ field2: text })}
          />
          <Text>Field value: {this.state.field2}</Text>
          <Text>Hello World</Text>
          <Text>Hello World</Text>
          <Text>Hello World</Text>
          <Text>Hello World</Text>
          <SuggestTextInput
            placeholderTextColor="#888"
            placeholder="moto 3"
            name="field3"
            data={DATA}
            style={styles.input}
            onChangeText={text => this.setState({ field3: text })}
            onSubmitEditing={({ text }) => this.setState({ field3: text })}
          />
          <Text>Field value: {this.state.field3}</Text>
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
    borderColor: '#fff',
    color: '#fff',
    borderWidth: 1,
  },
})
