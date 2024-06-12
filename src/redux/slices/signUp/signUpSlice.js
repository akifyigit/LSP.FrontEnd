import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userInfo: {
        username: "",
        password: "",
        email: "",
        fullName: "",
        companyName: "",
        countryCode: "",
        countryName: "",
        cityCode: "",
        cityName: "",
        districtName: "",
        zipCode: "",
        address: "",
        telephone: "",
        mobile: "",
        taxNumber: "",
        taxOffice: "",
        identityNumber: "",
        createDate: '2022-07-07T09:58:36.604Z'
    },
    userType: ''
};

export const signUpSlice = createSlice({
    name: 'signUp',
    initialState,
    reducers: {
        updateUserInfoField: (state, action) => {
            const { field, value } = action.payload;
            state.userInfo[field] = value;
        },
        updateUserTypeField: (state, action) => {
            state.userType = action.payload;
        },
    },
});

export const userInfoSelector = (state) => state.signUp.userInfo;
export const userTypeSelector = (state) => state.signUp.userType;
export const isUserCompanySelector = (state) => state.signUp.userType === 'işletme';
export const { updateUserInfoField, updateUserTypeField } = signUpSlice.actions;

export const signUpReducer = signUpSlice.reducer;
export const signUpReducerName = signUpSlice.name;

export default signUpSlice.reducer;
