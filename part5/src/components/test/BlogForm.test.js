/**
 * @jest-environment jsdom
 */

 import React from 'react'
 import '@testing-library/jest-dom/extend-expect'
 import { render, fireEvent } from '@testing-library/react'
 import BlogForm from '../BlogForm'


 test('the form calls the event handler it received as props with the right details when a new blog is created', () => {
   const createBlog = jest.fn()

   const component = render(
     <BlogForm handleCreateBlog={createBlog}/>
   )

   const title  = component.container.querySelector('input#title')
   const author  = component.container.querySelector('#author')
   const url = component.container.querySelector('#url')
   const formBlog  = component.container.querySelector('form')

   fireEvent.change(title, {
     target: { value: 'Test Title'}
   })

   fireEvent.change(author, {
     target: { value: 'Test Author'}
   })

   fireEvent.change(url, {
     target: { value: 'Test URL'}
   })

   fireEvent.submit(formBlog)

   expect(createBlog.mock.calls).toHaveLength(1)
   expect(title.value).toBe('Test Title')
   expect(author.value).toBe('Test Author')
   expect(url.value).toBe('Test URL')
 })