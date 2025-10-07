import {createSlice, PayloadAction} from '@reduxjs/toolkit'

const initialState: {
  selectedLanguage: 'vi' | 'en' | 'cn'
} = {
  selectedLanguage: 'en',
}

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<'vi' | 'en' | 'cn'>) => {
      state.selectedLanguage = action.payload
    },
  },
})

// Export actions để dùng trong component
export const {setLanguage} = languageSlice.actions

const ReducerLanguage = languageSlice.reducer
export default ReducerLanguage
