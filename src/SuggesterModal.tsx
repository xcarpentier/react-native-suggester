import React, { Component } from 'react'
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { IData } from './IData'

export interface Props {
  data: IData[]
  selectFromList(value: string): void
}

export class InputFilterModal extends Component<Props> {
  keyExtractor = (item: { id: string | number }) => `${item.id}`

  renderEmpty = () => (
    <View
      style={{
        alignItems: 'center',
        backgroundColor: 'blue',
        flex: 1,
        justifyContent: 'center',
      }}
    >
      <Text>{'Type text we suggest'}</Text>
    </View>
  )

  renderItem = (selectFromList: Props['selectFromList']) => ({
    item,
  }: {
    item: IData
  }) => (
    <TouchableOpacity
      onPress={() => selectFromList(item.value)}
      style={{
        backgroundColor: '#fff',
        height: 30,
        paddingHorizontal: 15,
        width: '100%',
      }}
    >
      <Text>{item.value}</Text>
    </TouchableOpacity>
  )

  render() {
    const { data, selectFromList } = this.props
    return (
      <FlatList
        style={StyleSheet.absoluteFill}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem(selectFromList)}
        ListEmptyComponent={this.renderEmpty}
        keyboardShouldPersistTaps="always"
        data={data}
      />
    )
  }
}
