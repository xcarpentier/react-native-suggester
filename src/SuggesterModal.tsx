import React, { Component } from 'react'
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { IData } from './IData'

interface Props {
  data: IData[]
  currentName?: string
  textWhenEmpty?: string
  backgroundColor?: string
  paddingHorizontal?: number
  selectFromList(name: string, value: string): void
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingVertical: 7,
  },
  empty: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
})

export class SuggesterModal extends Component<Props> {
  static defaultProps = {
    textWhenEmpty: 'Type text, we suggest',
    backgroundColor: 'white',
  }
  keyExtractor = (item: { id: string | number }) => `${item.id}`

  renderEmpty = () => (
    <View
      style={[styles.empty, { backgroundColor: this.props.backgroundColor }]}
    >
      <Text>{this.props.textWhenEmpty}</Text>
    </View>
  )

  renderItem = (selectFromList: Props['selectFromList']) => ({
    item,
  }: {
    item: IData
  }) => {
    const { backgroundColor, paddingHorizontal } = this.props
    return (
      <TouchableOpacity
        onPress={() => selectFromList(this.props.currentName!, item.value)}
        style={[styles.item, { backgroundColor, paddingHorizontal }]}
      >
        <Text>{item.value}</Text>
      </TouchableOpacity>
    )
  }

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
