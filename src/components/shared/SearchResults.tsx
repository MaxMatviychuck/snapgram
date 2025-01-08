
import { Models } from 'appwrite'

import Loader from './Loader'
import GridPostList from './GridPostList'

type SearchResultProps = {
  isSearchFetching: boolean
  searchedPosts: Models.Document[]
}

const SearchResults = (
  { isSearchFetching,
    searchedPosts
  }: SearchResultProps) => {

  if (isSearchFetching) return <Loader />

  // @ts-expect-error: Unreachable code error
  if (searchedPosts && searchedPosts.documents.length > 0) {
    return (
      // @ts-expect-error: Unreachable code error
      <GridPostList posts={searchedPosts.documents} />
    )
  }

  return (
    <p className='text-light-4 mt-10 text-center w-full'>
      No results found
    </p>
  )
}

export default SearchResults