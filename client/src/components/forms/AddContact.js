import { useEffect, useState } from 'react'
import { Button, Form, Input } from 'antd'
import { v4 as uuidv4 } from 'uuid'
import { useMutation } from '@apollo/client'
import { ADD_CONTACT, GET_CONTACTS } from '../../queries'

const AddContact = () => {
  const [id] = useState(uuidv4())
  const [addContact] = useMutation(ADD_CONTACT)

  const [form] = Form.useForm()
  const [, forceUpdate] = useState()

  // to disable the submit button at the beginning
  useEffect(() => {
    forceUpdate({})
  }, [])

  const onFinish = values => {
    const { firstName, lastName } = values

    addContact({
      variables: {
        id,
        firstName,
        lastName
      },
      update: (cache, { data: { addContact } }) => {
        const data = cache.readQuery({ query: GET_CONTACTS })
        cache.writeQuery({
          query: GET_CONTACTS,
          data: {
            ...data,
            contacts: [...data.contacts, addContact]
          }
        })
      }
    })

    form.resetFields();
  }

  return (
    <>
      <h1>Add Person</h1>
      <Form
        form={form}
        name='add-contact-form'
        layout='inline'
        onFinish={onFinish}
        size='large'
        style={{ marginBottom: '40px', justifyContent: 'center', display: 'flex' }}
      >
        <Form.Item
          name='firstName'
          rules={[{ required: true, message: 'Please input your first name!' }]}
        >
          <Input placeholder='First Name' />
        </Form.Item>
        <Form.Item
          name='lastName'
          rules={[{ required: true, message: 'Please input your last name!' }]}
        >
          <Input placeholder='Last Name' />
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
              Add Person
            </Button>
          )}
        </Form.Item>
      </Form>
    </>
  )
}

export default AddContact
