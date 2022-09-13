import React from 'react'
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved
} from '@testing-library/react'
import Post from '../Post'
import { gql } from '@apollo/client'
import { Wrappers } from '../../../__mocks__/Wrappers'
export const getPost = gql`
  query Post($postId: Int) {
    post(id: $postId) {
      id
      title
      body
    }
  }
`
const mocks = [
  {
    request: {
      query: getPost,
      variables: {
        postId: 1
      }
    },
    result: {
      data: {
        post: { id: '1', title: 'Buck', body: 'The best bulldog' }
      }
    }
  }
]
describe('Test Post page', () => {
  it('Should be render', async () => {
    const component = render(
      <Wrappers mocks={mocks}>
        <Post />
      </Wrappers>
    )
    const res1 = await component.findByText('Loading')
    const res2 = await component.findByText('Post Widget')
    console.log(res1)
    console.log(res2)
  })
})
