import { useQuery } from '@apollo/client'
import { GET_CARS } from '../../queries'
import { List } from 'antd'
import Car from '../listItems/Car'

const getStyles = () => ({
  list: {
    display: 'flex',
    justifyContent: 'center'
  }
})

const Cars = (props) => {
  const { id, people } = props;

  const styles = getStyles()

  const { loading, error, data } = useQuery(GET_CARS, {
    variables: { personId: id }
  })
  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`

  console.log('data', data)

  return (
    <List grid={{ gutter: 20, column: 1 }} style={styles.list}>
      {data.personCars.map(({ id, year, model, make, price, personId }) => (
        <List.Item key={id}>
          <Car id={id} make={make} model={model} year={year} price={price} personId={personId} people={people} />
        </List.Item>
      ))}
    </List>
  )
}

export default Cars
