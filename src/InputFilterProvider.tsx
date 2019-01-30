import React, { Component } from 'react'
import { InputFilterContext } from './InputFilterContext'
import { StyleSheet, Animated, Dimensions, Easing } from 'react-native'
import { InputFilterModal } from './InputFilterModal'
import { DURATION } from './Constants'
import { setStateAsync } from './SetStateAsync'
import { IData } from 'IData'

const { height } = Dimensions.get('window')

interface Props {
  statusBarHeight: number
}

interface State {
  state: IData[]
  marginTop: number
  value: string
}

export class InputFilterProvider extends Component<Props, State> {
  static defaultProps: Props = {
    statusBarHeight: 27,
  }

  state = {
    data: [],
    marginTop: 15,
    value: '',
  }

  translateY = new Animated.Value(height)
  setDataAsync = (data: IData[]) =>
    setStateAsync({ component: this, state: { data } })
  setValueAsync = (value: string) =>
    setStateAsync({ component: this, state: { value } })
  setMarginTopAsync = (marginTop: number) =>
    setStateAsync({ component: this, state: { marginTop } })

  handleFocus = () => {
    const { marginTop } = this.state
    this.setValueAsync('')
    Animated.timing(this.translateY, {
      toValue: marginTop + this.props.statusBarHeight,
      duration: DURATION,
      easing: Easing.inOut(Easing.ease),
    }).start()
  }

  handleBlur = () => {
    Animated.timing(this.translateY, {
      toValue: height,
      duration: DURATION,
      easing: Easing.inOut(Easing.ease),
    }).start()
  }

  selectFromList = (value: string) => this.setValueAsync(value)

  render() {
    const { children } = this.props
    const { data, value } = this.state
    const {
      setDataAsync,
      setMarginTopAsync,
      selectFromList,
      handleFocus: handleFocusProvider,
      handleBlur: handleBlurProvider,
      translateY,
    } = this

    return (
      <InputFilterContext.Provider
        value={{
          data,
          value,
          setDataAsync,
          setMarginTopAsync,
          handleFocusProvider,
          handleBlurProvider,
        }}
      >
        {children}
        <Animated.View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: 'white',
            transform: [{ translateY }],
          }}
        >
          <InputFilterModal {...{ data, selectFromList }} />
        </Animated.View>
      </InputFilterContext.Provider>
    )
  }
}
