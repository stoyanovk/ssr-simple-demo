import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Pagination } from '../index'
import { Wrappers } from '../../../__mocks__/Wrappers'

const getNextPageUrl = () => '/posts?page=2'
describe('Test pagination', () => {
  test('pagination render', async () => {
    const { container } = render(
      <Wrappers>
        <Pagination
          perPage={10}
          currentPage={1}
          total={100}
          nextPageUrl={getNextPageUrl}
        />
      </Wrappers>
    )
    expect(container.querySelector('[data-test="pagination"]')).not.toBeNull
  })
})
