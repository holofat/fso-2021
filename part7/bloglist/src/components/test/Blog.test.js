/**
 * @jest-environment jsdom
 */

import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from '../Blog'

test('renders content', () => {
  const blog = {
    title: 'This is a test title',
    author: 'This is a test author'
  }

  const component = render(
    <Blog blog={blog} test/>
  )

  expect(component.container).toHaveTextContent(
    'This is a test title'
  )
})

describe('details of the blog', () => {
  let component, blog
  beforeEach(() => {
    blog = {
      title: 'This is a test title',
      author: 'This is a test author',
      url: 'This is a test url',
      likes: 5
    }
    component = render(
      <Blog blog={blog}/>
    )
    const buttonView = component.getByText('view')
    fireEvent.click(buttonView)
  })

  test('show the url and likes', () => {
    
    const div = component.container.querySelector('.togglableContent')
    expect(div).toHaveTextContent(
      'This is a test url'
    )
  })

  test('event handler is called twice when like button is clicked twice', () => {
    const likeButton = component.getByText('Like Button')

    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
    expect(component.container).toHaveTextContent('7')
  })
})