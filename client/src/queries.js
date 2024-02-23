import { gql } from '@apollo/client'

export const GET_CONTACTS = gql`
  {
    contacts {
      id
      firstName
      lastName
    }
  }
`

export const ADD_CONTACT = gql`
  mutation AddContact($id: String!, $firstName: String!, $lastName: String!) {
    addContact(id: $id, firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
    }
  }
`

export const UPDATE_CONTACT = gql`
  mutation UpdateContact($id: String!, $firstName: String!, $lastName: String!) {
    updateContact(id: $id, firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
    }
  }
`

export const REMOVE_CONTACT = gql`
  mutation RemoveContact($id: String!) {
    removeContact(id: $id) {
      id
      firstName
      lastName
    }
  }
`
export const GET_CARS = gql`
  query Query($personId: String!){
    personCars(personId: $personId) {
      id
      year
      make
      model
      price
      personId
  }
}
`
export const ADD_CAR = gql`
  mutation AddCar($id: String!, $year: String!, $make: String!, $model: String!, $price: String!, $personId: String!) {
    addCar(id: $id, year: $year, make: $make, model: $model, price: $price,  personId: $personId) {
      id
      year
      make
      model
      price
      personId
    }
  }
`
export const UPDATE_CAR = gql`
  mutation UpdateCar($id: String!, $year: String!, $make: String!, $model: String!, $price: String!, $personId: String!) {
    updateCar(id: $id, year: $year, make: $make, model: $model, price: $price,  personId: $personId) {
      id
      year
      make
      model
      price
      personId
    }
  }
`

export const REMOVE_CAR = gql`
  mutation RemoveCar($id: String!) {
    removeCar(id: $id) {
      id
      year
      make
      model
      price
      personId
    }
  }
`

export const REMOVE_PERSON_CARS = gql`
    mutation RemovePersonCars($personId: String!) {
        removePersonCars(personId: $personId) {
            id
            year
            make
            model
            price
            personId
        }
    }
`