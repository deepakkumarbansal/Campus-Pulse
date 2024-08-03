import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { databaseService } from '../../appwrite/database.Service';
import { Container } from '../index';
import LoadingBar from 'react-top-loading-bar'
import { storageService } from '../../appwrite/storage.Service';
import parse from "html-react-parser";
import { useSelector } from 'react-redux';
import './Post.css'

const Post = () => {
    const { url } = useParams();
    const [post, setPost] = useState(null);
    const LoaderRef = useRef();
    const navigate = useNavigate();
    const currentUserData = useSelector(state => state.auth.userData);
    const author = post && currentUserData ? currentUserData.$id === post.userId : false
    const [error, setError] = useState('');
    const [postUrl, setPostUrl] = useState('');
    useEffect(() => {
        const fetchPostData = async () => {
            try {
                setError("");
                LoaderRef.current.continuousStart();
                const postData = await databaseService.getPost(url);
                setPost(postData);

                if (postData && postData.featuredImage) {
                    const data = await storageService.getFile(postData.featuredImage);
                    setPostUrl(data.href);
                }
            } catch (error) {
                setError(error.message);
            } finally {
                LoaderRef.current.complete();
            }
        };

        fetchPostData();
    }, [navigate, url]);

    const deletePost = async() => {
        setError('');
        try {
            console.log(post);
            const postId = post.$id;
            const postImageId = post.featuredImage;
            const deletedImage = await storageService.deleteFile(postImageId);
            console.log(deletedImage);
            const success = databaseService.deletePost(postId);
            if (success) {
                navigate('/');
            }
        } catch (error) {
            setError(error);
        }
    }

    return (
        <>
            <LoadingBar ref={LoaderRef} />
            <p className='text-red-600'>{error}</p>
            {
                post && <Container>
                    <h1 className='text-4xl underline'>{post.title.toUpperCase()}</h1>
                    <div className='my-4 min-h-[400px]'>
                        <div className='post-image ml-4'>
                            <img src={postUrl} alt="hello" className='post-image h-[400px]' />
                        </div>
                        <div className='text-justify bg-gray-50 min-h-[400px]'>{parse(post.content)}</div>
                    </div>
                    <div className='flex justify-between items-center my-4'>
                        {
                            author && (
                                <div>
                                    <p className='mb-6 font-bold'><em>Post type: {post.ispublic ? 'Public' : 'Private'}</em></p>
                                    <Link to={`/editPost/${post.$id}`}>
                                        <button className='rounded-md bg-gray-800 text-gray-100 px-[5px] py-[3.5px] w-16 text-xl font-bold mr-3'>Edit</button>
                                    </Link>
                                    <button className='rounded-md bg-red-700 text-gray-100 px-[5px] py-[3.5px] w-20 text-xl font-bold' onClick={deletePost}>Delete</button>
                                </div>
                            )
                        }
                        <div>
                            <p>Created at {new Date(post.$createdAt).toLocaleString()}</p>
                            <p>{`${(post.$createdAt == post.$updatedAt) ? '' : `Last updated: ${new Date(post.$updatedAt).toLocaleString()}`}`}</p>
                        </div>
                    </div>

                </Container>
            }
        </>
    )
}

export default Post