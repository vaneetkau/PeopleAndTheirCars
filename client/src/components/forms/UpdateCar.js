import { useMutation } from '@apollo/client'
import { Button, Form, Input, Select } from 'antd'
import { useEffect, useState } from 'react'
import { UPDATE_CAR, GET_CARS } from '../../queries'
import { forEach } from 'lodash'

const { Option } = Select


const UpdateCar = props => {
  const { id, year, make, model, price, personId, people } = props
  const [form] = Form.useForm()
  const [, forceUpdate] = useState()

  const [updateCar] = useMutation(UPDATE_CAR)

  useEffect(() => {
    forceUpdate({})
  }, [])

  const onFinish = values => {
    const { make, model, year, price, personId } = values
    const currentPersonId = props.personId
    const newPersonId = personId
    const idArray = [currentPersonId, newPersonId]

    if (currentPersonId !== newPersonId) {
      forEach(idArray, i => {
        updateCar({
          variables: {
            id,
            make,
            model,
            year,
            price,
            personId
          },
          refetchQueries: [{ query: GET_CARS, variables: { personId: i } }]
        })
      })

    } else {
      updateCar({
        variables: {
          id,
          make,
          model,
          year,
          price,
          personId
        },
      })
    }

    props.onButtonClick()
  }

  return (
    <Form
      form={form}
      name='update-car-form'
      layout='inline'
      onFinish={onFinish}
      initialValues={{
        year,
        make,
        model,
        price,
        personId
      }}
      size='large'
      style={{ marginBottom: '20px', justifyContent: 'center', display: 'flex' }}

    >
      <Form.Item
        name='year'
        rules={[{ required: true, message: 'Please input' }]}
      >
        <Input placeholder='Year' />
      </Form.Item>
      <Form.Item
        name='make'
        rules={[{ required: true, message: 'Please input' }]}
      >
        <Input placeholder='Make' />
      </Form.Item>

      <Form.Item
        name='model'
        rules={[{ required: true, message: 'Please input' }]}
      >
        <Input placeholder='Model' />
      </Form.Item>
      <Form.Item
        name='price'
        rules={[{ required: true, message: 'Please input' }]}
      >
        <Input placeholder='Price' />
      </Form.Item>

      <Form.Item name='personId' style={{ marginBottom: '8px', width: '18%' }}
        rules={[{ required: true, message: 'Please select person ID!' }]}>
        <Select placeholder="Select Person">
          {people.map(person =>
            <Option key={person.id} value={person.id}>{person.firstName} {person.lastName}</Option>
          )}
        </Select>
      </Form.Item>

      <Form.Item shouldUpdate={true}>
        {() => (
          <Button
            type='primary'
            htmlType='submit'
            disabled={
              (!form.isFieldTouched('year') && !form.isFieldTouched('make') && !form.isFieldTouched('model') && !form.isFieldTouched('price')) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Update Car
          </Button>
        )}
      </Form.Item>
      <Button onClick={props.onButtonClick}>Cancel</Button>
    </Form>
  )
}

export default UpdateCar
