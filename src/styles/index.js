import { Platform } from 'react-native'

export const COLOR = {
  primary: '#33475C',
  secondary: '#007EA7',
  bg: '#fff',
  text: '#A3ADB4',
  white: '#fff',
  black: '#000',
  blue: '#496381',
  red: '#DE5E5E',
  green: '#417505',
  gray: '#757575',
}

export const MARGIN = {
  LG: 20,
  MD: 10,
  SM: 5,
}

export const PADDING = {
  LG: 20,
  MD: 10,
  SM: 5,
}

export const FONT_SIZE = {
  LG: 20,
  MD: 16,
  SM: 14,
  TY: 11,
}

export const FONT_WEIGHT = {
  LG: '800',
  MD: '600',
  SM: '400',
  TY: '300',
}

export const FONT_FAMILY = {
  main: Platform.OS === 'ios' ? 'System' : 'Roboto',
}
