import { createSlice } from '@reduxjs/toolkit';

export const dataStoreSlice = createSlice({
  name: 'dataStore',
  initialState: {
    personalInfo: {
      firstName: "",
      lastName: "",
      Email: "",
      Mobile: "",
      Address1: "",
      Address2: "",
      City: "",
      State: "",
      Pin: "",
      Objective: ""
    },
    workEx: [
      {
        title: "",
        orgName: "",
        startYear: "",
        endYear: "",
        jobDescription: "",
      }
    ],
    education: [
      {
        Type: "Graduation",
        University: "",
        Degree: "",
        Start: "",
        End: ""
      }
    ],
    skills: [{ skillName: "" }],
    selectedTemplate: "",
    imageFile: null,
    errorMessages: {},
    showErrorMessages: false,
  },

  reducers: {
    updatePersonalInfo: (state, action) => {
      // This function updates the targeted key of the personalInfo element of dataStore
      state.personalInfo[action.payload.key] = action.payload.value;
    },

    updateWorkEx: (state, action) => {
      // This function safely updates the targeted key of the workEx element
      const { index, key, value } = action.payload;
      state.workEx[index] = {
        ...state.workEx[index], // copy old values
        [key]: value,           // update only the required field
      };
    },

    updateEducation: (state, action) => {
      const { index, key, value } = action.payload;
      state.education[index] = {
        ...state.education[index],
        [key]: value,
      };
    },

    updateKeySkills: (state, action) => {
      const { index, key, value } = action.payload;
      state.skills[index] = {
        ...state.skills[index],
        [key]: value,
      };
    },

    updateState: (state, action) => {
      state[action.payload.key] = action.payload.value;
    },

    updateErrorMessages: (state, action) => {
      let key = action.payload.key;
      if (action.payload.index !== undefined) {
        key += '_' + action.payload.index;
      }
      state.errorMessages[key] = action.payload.value;
    },

    addArrayElement: (state, action) => {
      // This function is used to push a blank object in the array
      state[action.payload.key].push(action.payload.element);
    },

    removeArrayElement: (state, action) => {
      // This function deletes the latest saved details in the array
      state[action.payload.key].pop();
    },
  }
});

export const {
  updatePersonalInfo,
  updateWorkEx,
  updateEducation,
  updateKeySkills,
  updateErrorMessages,
  updateState,
  addArrayElement,
  removeArrayElement
} = dataStoreSlice.actions;

export default dataStoreSlice.reducer;
