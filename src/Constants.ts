import { Dimensions } from 'react-native'
import { isExpo } from './Utils'
import Constants from 'expo-constants'

export const DURATION = 300

export const { height: WINDOW_HEIGHT, width: WINDOW_WIDTH } = Dimensions.get(
  'window',
)

const DEFAULT_STATUS_BAR = 20
export const STATUS_BAR_HEIGHT = (() => {
  if (isExpo()) {
    return Constants.statusBarHeight
  }
  return DEFAULT_STATUS_BAR
})()
