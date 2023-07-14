import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../../config/firebase.config";

interface IUser {
    user: {
        email: string | null
    },
    isLoading: boolean
    isError: boolean
    error: string | null
}

const initialState: IUser = {
    user: {
        email: null
    },
    isLoading: false,
    isError: false,
    error: null
}

export const createUser =createAsyncThunk('user/createUser', async ({email, password}: {email:string, password: string}) => {
    const data = await createUserWithEmailAndPassword(auth, email, password)
    return data.user.email
}) 

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<string | null>) => {
            state.user.email =action.payload
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createUser.pending, (state) => {
            state.isLoading = true
            state.isError =false
            state.error = null
        }).addCase(createUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.user.email = action.payload
        }).addCase(createUser.rejected, (state, action) => {
            state.isLoading = false
            state.isError =true
            state.error = action.error.message!
            state.user.email = null
        })
    }
})

export const {setLoading, setUser} = userSlice.actions

export default userSlice.reducer