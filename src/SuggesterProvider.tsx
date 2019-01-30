import React, { Component, ReactNode } from 'react'
import { SuggesterContext } from './SuggesterContext'
import { StyleSheet, Easing, Animated } from 'react-native'
import { InputFilterModal } from './SuggesterModal'
import { DURATION, WINDOW_HEIGHT, STATUS_BAR_HEIGHT } from './Constants'
import { setStateAsync } from './SetStateAsync'
import { IData } from './IData'

interface Props {
  children: ReactNode
  statusBarHeight?: number
  backgroundColor?: string
}

interface State {
  data: IData[]
  marginTop: number
  value: string
}

export class SuggesterProvider extends Component<Props, State> {
  static defaultProps = {
    statusBarHeight: STATUS_BAR_HEIGHT,
    backgroundColor: 'white',
  }

  state = {
    data: [],
    marginTop: 30,
    value: '',
  }

  translateY = new Animated.Value(WINDOW_HEIGHT)

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
      toValue: marginTop + this.props.statusBarHeight!,
      duration: DURATION,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start()
  }

  handleBlur = () => {
    Animated.timing(this.translateY, {
      toValue: WINDOW_HEIGHT,
      duration: DURATION,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start()
  }

  selectFromList = (value: string) => this.setValueAsync(value)

  render() {
    const { children, backgroundColor, statusBarHeight } = this.props
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
      <SuggesterContext.Provider
        value={{
          data,
          value,
          setDataAsync,
          setMarginTopAsync,
          handleFocusProvider,
          handleBlurProvider,
          statusBarHeight,
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
      </SuggesterContext.Provider>
    )
  }
}
