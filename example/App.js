import * as React from 'react'
import { Text, View, StyleSheet, TextInput } from 'react-native'
import { Constants } from 'expo'
import { InputFilterProvider } from './InputFilterProvider'
import { InputFilterWrapper } from './InputFilterWrapper'

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
      <InputFilterProvider>
        <View style={styles.container}>
          <Text>Hello World</Text>
          <InputFilterWrapper data={DATA}>
            <TextInput style={styles.input} />
          </InputFilterWrapper>
          <Text>Hello World</Text>
          <Text>Hello World</Text>
          <Text>Hello World</Text>
          <Text>Hello World</Text>
          <InputFilterWrapper data={DATA}>
            <TextInput style={styles.input} />
          </InputFilterWrapper>
          <Text>Hello World</Text>
          <Text>Hello World</Text>
          <Text>Hello World</Text>
          <Text>Hello World</Text>
          <InputFilterWrapper data={DATA}>
            <TextInput style={styles.input} placeholder={'marque'} />
          </InputFilterWrapper>
        </View>
      </InputFilterProvider>
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
