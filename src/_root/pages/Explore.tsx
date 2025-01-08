import { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

import GridPostList from '@/components/shared/GridPostList'
import SearchResults from '@/components/shared/SearchResults'
import { Input } from '@/components/ui/input'
import { useGetPosts, useSearchPosts } from '@/lib/react-query/queriesAndMutations'
import useDebounce from '@/hooks/useDebounce'
import Loader from '@/components/shared/Loader'

const Explore = () => {
    const { ref, inView } = useInView();

    const { data: posts, fetchNextPage, hasNextPage } =
        useGetPosts();

    const [searchValue, setSearchValue] = useState('');
    const debouncedValue = useDebounce(searchValue, 500);
    const { data: searchedPosts, isFetching: isSearchFetching } =
        useSearchPosts(debouncedValue);

    useEffect(() => {
        if (inView && hasNextPage && !searchValue) {
            fetchNextPage();
        }
    }, [inView, searchValue, hasNextPage, fetchNextPage]);

    if (!posts) {
        <div className='flex-center w-full h-full'>
            <Loader />
        </div>
    }

    const shouldShowSearchResults = searchValue !== '';
    const shouldShowPosts = !shouldShowSearchResults &&
        posts?.pages?.every((item) => item?.documents.length === 0);


    return (
        <div className='explore-container'>
            <div className='explore-inner_container'>
                <h2 className='h3-bold md:h2-bold w-full'>
                    Search Posts
                </h2>
                <div className='flex gap-1 px-4 w-full rounded-lg bg-dark-4'>
                    <img
                        src="/assets/icons/search.svg"
                        alt=""
                        width={24}
                        height={24}
                    />
                    <Input
                        type='text'
                        placeholder='Search for posts'
                        className='explore-search'
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                </div>
            </div>

            <div className='flex-between w-full max-w-5xl mt-16 mb-7'>
                <h2 className='h3-bold md:h2-bold w-full'>
                    Popular Today
                </h2>
                <div className='flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer'>
                    <p className='small-medium md:base-medium text-light-2'>
                        All
                    </p>
                    <img
                        src="/assets/icons/filter.svg"
                        width={20}
                        height={20}
                        alt=""
                    />
                </div>
            </div>

            <div className='flex flex-wrap gap-9 w-full max-w-5xl'>
                <>
                    {shouldShowSearchResults ? (
                        <SearchResults
                            // @ts-expect-error: Unreachable code error
                            searchedPosts={searchedPosts}
                            isSearchFetching={isSearchFetching}
                        />
                    ) : shouldShowPosts ? (
                        <p
                            className='text-light-4 mt-10 text-center w-full'
                        >
                            End of posts
                        </p>
                    ) : (
                        posts?.pages?.map((item, index) => (
                            <GridPostList
                                key={index}
                                // @ts-expect-error: Unreachable code error
                                posts={item.documents}
                            />
                        ))
                    )}
                </>
            </div>

            {hasNextPage && !searchValue && (
                <div ref={ref} className='mt-10'>
                    <Loader />
                </div>
            )}
        </div>
    )
}

export default Explore