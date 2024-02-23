import { Card } from 'antd'
import RemoveContact from '../buttons/RemoveContact'
import { EditOutlined } from '@ant-design/icons'
import { useState } from 'react'
import UpdateContact from '../forms/UpdateContact'
import Cars from '../lists/Cars'
import { Link } from 'react-router-dom'

const getStyles = () => ({
  card: {
    width: '100%',
  }
})

const Contact = props => {
  const { id, firstName, lastName, people } = props
  const styles = getStyles()
  const [editMode, setEditMode] = useState(false)

  const handleButtonClick = () => {
    setEditMode(!editMode)
  }

  return (
    <div>
      {editMode ? (
        <UpdateContact
          id={id}
          firstName={firstName}
          lastName={lastName}
          onButtonClick={handleButtonClick}
        />
      ) : (
        <Card
          style={styles.card}
          actions={[
            <EditOutlined key='edit' onClick={handleButtonClick} />,
            <RemoveContact id={id} firstName={firstName} lastName={lastName} />
          ]}
        >
          {firstName} {lastName}
          <Cars id={id} people={people} />

          <Link to={`/people/${id}`}>LEARN MORE</Link>

        </Card>
      )}
    </div>
  )
}

export default Contact
