import {createSlice, PayloadAction} from '@reduxjs/toolkit'

const initialState: {
  countNoti: number
} = {
  countNoti: 0,
}

const screensSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setCountNoti: (state, action: PayloadAction<number>) => {
      state.countNoti = action.payload
    },
  },
})

// Export actions để dùng trong component
export const {setCountNoti} = screensSlice.actions

const ReducerScreens = screensSlice.reducer
export default ReducerScreens
