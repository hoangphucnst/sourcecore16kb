import {PayloadAction, createSlice} from '@reduxjs/toolkit'
import {Dimensions, ScaledSize} from 'react-native'
import {LIST_IMAGE_HEADER_HOME, MODE_THEME} from '~/constants'

export interface InfoScreen extends ScaledSize {
  isLandscape: boolean
}

export interface ThemeState {
  mode: string
  infoScreen: InfoScreen
  backgoundHome: {id: string; image: string}
}
const initState: ThemeState = {
  mode: MODE_THEME.LIGHT,
  infoScreen: {
    ...Dimensions.get('screen'),
    isLandscape: false,
  },
  backgoundHome: LIST_IMAGE_HEADER_HOME[0],
}

export const ThemeSlice = createSlice({
  initialState: initState,
  name: 'theme',
  reducers: _ => ({
    changeTheme: (state, action: PayloadAction<string>) => {
      state.mode = action.payload
    },
    changeInfoScreen: (state, action: PayloadAction<InfoScreen>) => {
      state.infoScreen = action.payload
    },
    changeBackgroundHome: (
      state,
      action: PayloadAction<{id: string; image: string}>,
    ) => {
      state.backgoundHome = action.payload
    },
  }),
})

export const {changeTheme, changeInfoScreen, changeBackgroundHome} =
  ThemeSlice.actions
const ReducerTheme = ThemeSlice.reducer
export default ReducerTheme
