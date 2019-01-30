import React, { Component, ReactNode } from 'react'
import { InputFilterContext } from './InputFilterContext'
import { StyleSheet, Animated, Easing, TextInput } from 'react-native'
import { InputFilterModal } from './InputFilterModal'
import { DURATION, HEIGHT } from './Constants'
import { setStateAsync } from './SetStateAsync'
import { IData } from 'IData'

interface Props {
  children: ReactNode
  statusBarHeight: number
  backgroundColor: string
}

interface State {
  data: IData[]
  marginTop: number
  value: string
}

export class InputFilterProvider extends Component<Props, State> {
  static defaultProps = {
    statusBarHeight: 27,
    backgroundColor: 'white',
  }

  state = {
    data: [],
    marginTop: 30,
    value: '',
  }

  translateY = new Animated.Value(HEIGHT)

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
      toValue: HEIGHT,
      duration: DURATION,
      easing: Easing.inOut(Easing.ease),
    }).start()
  }

  selectFromList = (value: string) => this.setValueAsync(value)

  render() {
    const { children, backgroundColor } = this.props
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
            backgroundColor,
            transform: [{ translateY }],
          }}
        >
          <InputFilterModal {...{ data, selectFromList }} />
        </Animated.View>
      </InputFilterContext.Provider>
    )
  }
}
