/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCalender = /* GraphQL */ `
  query GetCalender($id: ID!) {
    getCalender(id: $id) {
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
export const listCalenders = /* GraphQL */ `
  query ListCalenders(
    $filter: ModelCalenderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCalenders(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getCity = /* GraphQL */ `
  query GetCity($id: ID!) {
    getCity(id: $id) {
      id
      city
      street
      createdAt
      updatedAt
    }
  }
`;
export const listCitys = /* GraphQL */ `
  query ListCitys(
    $filter: ModelCityFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCitys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        city
        street
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getMedical = /* GraphQL */ `
  query GetMedical($id: ID!) {
    getMedical(id: $id) {
      id
      medical
      createdAt
      updatedAt
    }
  }
`;
export const listMedicals = /* GraphQL */ `
  query ListMedicals(
    $filter: ModelMedicalFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMedicals(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        medical
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getDoctor = /* GraphQL */ `
  query GetDoctor($id: ID!) {
    getDoctor(id: $id) {
      id
      firstname
      surname
      createdAt
      updatedAt
    }
  }
`;
export const listDoctors = /* GraphQL */ `
  query ListDoctors(
    $filter: ModelDoctorFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDoctors(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        firstname
        surname
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getVisit = /* GraphQL */ `
  query GetVisit($id: ID!) {
    getVisit(id: $id) {
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
export const listVisits = /* GraphQL */ `
  query ListVisits(
    $filter: ModelVisitFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listVisits(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
