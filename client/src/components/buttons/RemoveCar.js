import { useMutation } from '@apollo/client'
import { GET_CARS, REMOVE_CAR } from '../../queries'

import { DeleteOutlined } from '@ant-design/icons'
import filter from 'lodash.filter'

const RemoveCar = ({ id, personId }) => {
  const [removeCar] = useMutation(REMOVE_CAR, {
    update(cache, { data: { removeCar } }) {
      const { personCars } = cache.readQuery({ query: GET_CARS, variables: { personId } })
      cache.writeQuery({
        query: GET_CARS,
        variables: { personId },
        data: {
          personCars: filter(personCars, c => {
            return c.id !== removeCar.id
          })
        }
      })
    }
  })

  const handleButtonClick = () => {
    let result = window.confirm('Are you sure you want ot delete this contact?')
    if (result) {
      removeCar({
        variables: {
          id
        }
      })
    }
  }

  return <DeleteOutlined key='delete' onClick={handleButtonClick} style={{ color: 'red' }} />
}

export default RemoveCar
