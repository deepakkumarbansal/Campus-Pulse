import React from 'react'
import { useSelector } from 'react-redux'
import {Container, PostCard} from '../index';
import { useNavigate } from 'react-router-dom';

const PostList = ({filteredPosts}) => {
    const userData = useSelector(state=>state.auth);
    const isLogin = userData.isLogin;
    const navigate = useNavigate();

    if(!isLogin){
        return (
            <h1>Please login to read post</h1>
        )
    } else return (
        <Container className={`flex gap-4 flex-col py-4`}>
            {
                filteredPosts?.length > 0 ? filteredPosts.map(post=>(
                    <PostCard title={post.title} slug={post.$id} featuredImage={post.featuredImage} userId={post.userId} key={post.$id} name={post.name} content ={post.content} college={post.university} country={post.country} avatarId = {post.userId}/>
                )) : <p onClick={()=>navigate('/addPost')} className='rounded-lg bg-gray-500 w-fit p-2 text-white font-bold'>Create new post</p>
            }
        </Container>
    )   
}

export default PostList
