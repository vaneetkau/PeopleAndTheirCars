import { useEffect, useState } from 'react'
import { Button, Form, Input, Select } from 'antd'
import { v4 as uuidv4 } from 'uuid'
import { useMutation } from '@apollo/client'
import { ADD_CAR, GET_CARS } from '../../queries'

const { Option } = Select;

const AddCar = (props) => {
  const { people } = props;

  const [id] = useState(uuidv4())
  const [addCar] = useMutation(ADD_CAR)

  const [form] = Form.useForm()
  const [, forceUpdate] = useState()

  // to disable the submit button at the beginning
  useEffect(() => {
    forceUpdate({})
  }, [])

  const onFinish = values => {
    const { year, make, model, price, personId } = values

    addCar({
      variables: {
        id,
        year,
        make,
        model,
        price,
        personId
      },
      refetchQueries: [{ query: GET_CARS, variables: { personId } }]
    })

    form.resetFields();
  }

  return (
    <>
      <h1>Add Car</h1>
      <Form
        form={form}
        name='add-car-form'
        layout='inline'
        onFinish={onFinish}
        size='large'
        style={{ marginBottom: '40px', justifyContent: 'center', display: 'flex' }}
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
                !form.isFieldsTouched(true) ||
                form.getFieldsError().filter(({ errors }) => errors.length).length
              }
            >
              Add Car
            </Button>
          )}
        </Form.Item>
      </Form>
    </>
  )
}

export default AddCar
