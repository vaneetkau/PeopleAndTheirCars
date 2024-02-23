import { find, remove } from 'lodash';

const people = [
  {
    id: '1',
    firstName: 'Bill',
    lastName: 'Gates'
  },
  {
    id: '2',
    firstName: 'Steve',
    lastName: 'Jobs'
  },
  {
    id: '3',
    firstName: 'Linux',
    lastName: 'Torvalds'
  }
]

const cars = [
  {
    id: '1',
    year: '2019',
    make: 'Toyota',
    model: 'Corolla',
    price: '40000',
    personId: '1'
  },
  {
    id: '2',
    year: '2018',
    make: 'Lexus',
    model: 'LX 600',
    price: '13000',
    personId: '1'
  },
  {
    id: '3',
    year: '2017',
    make: 'Honda',
    model: 'Civic',
    price: '20000',
    personId: '1'
  },
  {
    id: '4',
    year: '2019',
    make: 'Acura ',
    model: 'MDX',
    price: '60000',
    personId: '2'
  },
  {
    id: '5',
    year: '2018',
    make: 'Ford',
    model: 'Focus',
    price: '35000',
    personId: '2'
  },
  {
    id: '6',
    year: '2017',
    make: 'Honda',
    model: 'Pilot',
    price: '45000',
    personId: '2'
  },
  {
    id: '7',
    year: '2019',
    make: 'Volkswagen',
    model: 'Golf',
    price: '40000',
    personId: '3'
  },
  {
    id: '8',
    year: '2018',
    make: 'Kia',
    model: 'Sorento',
    price: '45000',
    personId: '3'
  },
  {
    id: '9',
    year: '2017',
    make: 'Volvo',
    model: 'XC40',
    price: '55000',
    personId: '3'
  }
]

const typeDefs = `
  type Contact {
    id: String!
    firstName: String
    lastName: String
  }

  type Car {
    id: String!
    year: String
    make: String
    model: String
    price: String
    personId: String
  }

  type Query {
    contact(id: String!): Contact
    contacts: [Contact]
    car(id: String!): Car
    cars: [Car]
    personCars(personId: String!): [Car]
  }

  type Mutation {
    addContact(id: String!, firstName: String!, lastName: String!): Contact
    updateContact(id: String!, firstName: String!, lastName: String!): Contact
    removeContact(id: String!): Contact
    addCar(id: String!, year: String!, make: String!, model: String!, price: String!, personId: String!): Car
    updateCar(id: String!, year: String!, make: String!, model: String!, price: String!, personId: String!): Car
    removeCar(id: String!): Car
    removePersonCars(personId: String!): [Car]
  }
`

const resolvers = {
  Query: {
    contacts: () => people,
    contact: (parent, args) => {
      return find(people, { id: args.id })
    },
    cars: () => cars,
    car: (parent, args) => {
      return find(cars, { id: args.id })
    },
    personCars(parent, args) {
      return cars.filter(car => car.personId === args.personId)
    },
    cars: () => cars
  },
  Mutation: {
    addContact: (root, args) => {
      const newContact = {
        id: args.id,
        firstName: args.firstName,
        lastName: args.lastName
      }

      people.push(newContact)

      return newContact
    },
    updateContact: (root, args) => {
      const contact = find(people, { id: args.id })
      if (!contact) {
        throw new Error(`Couldn't find contact with id ${args.id}`)
      }

      contact.firstName = args.firstName
      contact.lastName = args.lastName

      return contact
    },
    removeContact: (root, args) => {
      const removedContact = find(people, { id: args.id })
      if (!removedContact) {
        throw new Error(`Couldn't find contact with id ${args.id}`)
      }

      remove(people, c => {
        return c.id === removedContact.id
      })

      return removedContact
    },
    addCar: (root, args) => {
      const newCar = {
        id: args.id,
        year: args.year,
        make: args.make,
        model: args.model,
        price: args.price,
        personId: args.personId,
      }

      cars.push(newCar)

      return newCar
    },
    updateCar: (root, args) => {
      const car = find(cars, { id: args.id })
      if (!car) {
        throw new Error(`Couldn't find car with id ${args.id}`)
      }

      car.year = args.year
      car.make = args.make
      car.model = args.model
      car.price = args.price
      car.personId = args.personId

      return car
    },
    removeCar: (root, args) => {
      const removedCar = find(cars, { id: args.id })
      if (!removedCar) {
        throw new Error(`Couldn't find car with id ${args.id}`)
      }

      remove(cars, c => {
        return c.id === removedCar.id
      })

      return removedCar
    },
    removePersonCars: (root, args) => {
      const removedCars = filter(cars, { personId: args.personId })

      if (!removedCars) {
        throw new Error(`Couldn't find cars for person with ID: ${args.personId}`)
      }

      remove(cars, car => {
        return car.personId === args.personId
      })

      return removedCars
    }
  }
}

export { typeDefs, resolvers }
