import React, { useEffect, useState } from 'react'
import PostList from '../PostList/PostList';
import { useSelector } from 'react-redux';
const FilterPosts = ({ user }) => {

  const userData = useSelector((state) => state.auth);
  const allPosts = useSelector(state => state.posts);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (user) {
      const filteredPosts = allPosts.filter((post) => post.userId == userData?.userData?.$id);
      setPosts(filteredPosts);
    } else {
      const filteredPosts = allPosts.filter((post) => post.ispublic == true);
      setPosts(filteredPosts);
    }
  }, [userData, allPosts])
  return (
    <>
      <PostList filteredPosts={posts} />
    </>
  )
}

export default FilterPosts
