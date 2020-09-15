/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createCalender = /* GraphQL */ `
  mutation CreateCalender(
    $input: CreateCalenderInput!
    $condition: ModelCalenderConditionInput
  ) {
    createCalender(input: $input, condition: $condition) {
      id
      doctorID
      medicalID
      cityID
      doctor
      medical
      city
      startDate
      endDate
      times {
        startTime
        endTime
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateCalender = /* GraphQL */ `
  mutation UpdateCalender(
    $input: UpdateCalenderInput!
    $condition: ModelCalenderConditionInput
  ) {
    updateCalender(input: $input, condition: $condition) {
      id
      doctorID
      medicalID
      cityID
      doctor
      medical
      city
      startDate
      endDate
      times {
        startTime
        endTime
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteCalender = /* GraphQL */ `
  mutation DeleteCalender(
    $input: DeleteCalenderInput!
    $condition: ModelCalenderConditionInput
  ) {
    deleteCalender(input: $input, condition: $condition) {
      id
      doctorID
      medicalID
      cityID
      doctor
      medical
      city
      startDate
      endDate
      times {
        startTime
        endTime
      }
      createdAt
      updatedAt
    }
  }
`;
export const createCity = /* GraphQL */ `
  mutation CreateCity(
    $input: CreateCityInput!
    $condition: ModelCityConditionInput
  ) {
    createCity(input: $input, condition: $condition) {
      id
      city
      street
      createdAt
      updatedAt
    }
  }
`;
export const updateCity = /* GraphQL */ `
  mutation UpdateCity(
    $input: UpdateCityInput!
    $condition: ModelCityConditionInput
  ) {
    updateCity(input: $input, condition: $condition) {
      id
      city
      street
      createdAt
      updatedAt
    }
  }
`;
export const deleteCity = /* GraphQL */ `
  mutation DeleteCity(
    $input: DeleteCityInput!
    $condition: ModelCityConditionInput
  ) {
    deleteCity(input: $input, condition: $condition) {
      id
      city
      street
      createdAt
      updatedAt
    }
  }
`;
export const createMedical = /* GraphQL */ `
  mutation CreateMedical(
    $input: CreateMedicalInput!
    $condition: ModelMedicalConditionInput
  ) {
    createMedical(input: $input, condition: $condition) {
      id
      medical
      createdAt
      updatedAt
    }
  }
`;
export const updateMedical = /* GraphQL */ `
  mutation UpdateMedical(
    $input: UpdateMedicalInput!
    $condition: ModelMedicalConditionInput
  ) {
    updateMedical(input: $input, condition: $condition) {
      id
      medical
      createdAt
      updatedAt
    }
  }
`;
export const deleteMedical = /* GraphQL */ `
  mutation DeleteMedical(
    $input: DeleteMedicalInput!
    $condition: ModelMedicalConditionInput
  ) {
    deleteMedical(input: $input, condition: $condition) {
      id
      medical
      createdAt
      updatedAt
    }
  }
`;
export const createDoctor = /* GraphQL */ `
  mutation CreateDoctor(
    $input: CreateDoctorInput!
    $condition: ModelDoctorConditionInput
  ) {
    createDoctor(input: $input, condition: $condition) {
      id
      firstname
      surname
      createdAt
      updatedAt
    }
  }
`;
export const updateDoctor = /* GraphQL */ `
  mutation UpdateDoctor(
    $input: UpdateDoctorInput!
    $condition: ModelDoctorConditionInput
  ) {
    updateDoctor(input: $input, condition: $condition) {
      id
      firstname
      surname
      createdAt
      updatedAt
    }
  }
`;
export const deleteDoctor = /* GraphQL */ `
  mutation DeleteDoctor(
    $input: DeleteDoctorInput!
    $condition: ModelDoctorConditionInput
  ) {
    deleteDoctor(input: $input, condition: $condition) {
      id
      firstname
      surname
      createdAt
      updatedAt
    }
  }
`;
export const createVisit = /* GraphQL */ `
  mutation CreateVisit(
    $input: CreateVisitInput!
    $condition: ModelVisitConditionInput
  ) {
    createVisit(input: $input, condition: $condition) {
      id
      userEmail
      doctorID
      medicalID
      cityID
      doctor
      medical
      city
      startDate
      endDate
      times {
        startTime
        endTime
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateVisit = /* GraphQL */ `
  mutation UpdateVisit(
    $input: UpdateVisitInput!
    $condition: ModelVisitConditionInput
  ) {
    updateVisit(input: $input, condition: $condition) {
      id
      userEmail
      doctorID
      medicalID
      cityID
      doctor
      medical
      city
      startDate
      endDate
      times {
        startTime
        endTime
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteVisit = /* GraphQL */ `
  mutation DeleteVisit(
    $input: DeleteVisitInput!
    $condition: ModelVisitConditionInput
  ) {
    deleteVisit(input: $input, condition: $condition) {
      id
      userEmail
      doctorID
      medicalID
      cityID
      doctor
      medical
      city
      startDate
      endDate
      times {
        startTime
        endTime
      }
      createdAt
      updatedAt
    }
  }
`;
