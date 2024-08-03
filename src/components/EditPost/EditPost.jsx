import React, { useEffect, useState } from 'react'
import PostForm from '../PostForm/PostForm'
import { useParams } from 'react-router-dom'
import { databaseService } from '../../appwrite/database.Service';

const EditPost = () => {
    const { slug } = useParams();
    const [post, setPost] = useState('');
    useEffect(() => {
        async function getPost() {
            if (slug) {
                const data = await databaseService.getPost(slug);
                setPost(data);
            }
        }
        getPost();
    }, [])

    return post ? <PostForm post={post}/> : null
    
}

export default EditPost

