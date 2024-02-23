import { Card } from 'antd'
import RemoveCar from '../buttons/RemoveCar'
import { EditOutlined } from '@ant-design/icons'
import { useState } from 'react'
import UpdateCar from '../forms/UpdateCar'

const getStyles = () => ({
  card: {
    width: '600px',
    backgroundColor: 'grey',
    color: "white"
  },
  list: {
    display: 'flex',
    justifyContent: 'center',
  }
})

const Car = props => {
  const { id, year, make, model, price, personId, people } = props
  const styles = getStyles()
  const [editMode, setEditMode] = useState(false)

  const handleButtonClick = () => {
    setEditMode(!editMode)
  }

  return (
    <div>
      {editMode ? (
        <UpdateCar
          id={id}
          year={year}
          make={make}
          model={model}
          price={price}
          personId={personId}
          people={people}
          onButtonClick={handleButtonClick}
        />
      ) : (
        <Card
          style={styles.card}
          actions={[
            <EditOutlined key='edit' onClick={handleButtonClick} />,
            <RemoveCar id={id} personId={personId} />
          ]}
        >
          {year}, {make}, {model}, ${price}
        </Card>
      )}
    </div>
  )
}

export default Car
