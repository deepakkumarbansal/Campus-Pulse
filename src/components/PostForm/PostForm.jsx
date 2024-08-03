import React, { useRef, useState, useEffect } from 'react'
import { Container, Input, RTE, Select, SubmitBtn } from '../index'
import { Controller, useForm } from 'react-hook-form'
import { databaseService } from '../../appwrite/database.Service'
import { storageService } from '../../appwrite/storage.Service'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'
import ReactSelect from 'react-select'


const PostForm = ({ post }) => {
    const { register, handleSubmit, setValue, control, formState: { errors }, getValues } = useForm({
        defaultValues: {
            title: post?.title || '',
            university: post?.university || '',
            ispublic: post?.ispublic === true ? 'Public' : 'Private',
            content: post?.content || null,
            country: post?.country || 'INDIA'
        }
    });
    const [error, setError] = useState('');
    const [isSubmitPending, setIsSubmitPending] = useState(false);
    const userData = useSelector(state => state.auth.userData);
    const navigate = useNavigate();
    const formRef = useRef();
    const [country, setCountry] = useState(getValues('country'))
    const [universities, setUniversities] = useState([]);
    const [postImageUrl, setPostImageUrl] = useState('');

    useEffect(() => {
        async function fetchUniversities() {
            try {
                const res = await fetch(`http://universities.hipolabs.com/search?country=${country}`);
                const data = await res.json();
                const universities = data.map((university) => {
                    return university.name
                })
                const reactSelectOptions = universities.map((name) => {
                    return {
                        value: name,
                        label: name
                    }
                })
                setUniversities(reactSelectOptions)
            } catch (error) {
                setError(error.message);
            }
        }
        fetchUniversities()
    }, [country]);

    useEffect(() => {
        if (post && post.featuredImage) {
            const url = storageService.getFilePreview(post.featuredImage).href;
            setPostImageUrl(url);
        }
    }, [post])

    const createOrUpdatePost = async (data) => {
        setError("");
        formRef.current.continuousStart();
        setIsSubmitPending(true);
        const isPublic = data.ispublic === 'Public' ? true : false
        try {
            if (post) {
                const file = data.featuredImage[0] ? await storageService.uploadFile(data.featuredImage[0]) : null;
                if (file) {
                    await storageService.deleteFile(post.featuredImage);
                }
                const updatedPost = await databaseService.updatePost(post.$id, { ...data, featuredImage: file ? file.$id : undefined, ispublic: isPublic, university: data.university.value });
                if (updatedPost) {
                    navigate(`/post/${post.$id}`);
                }
            } else {
                const file = await storageService.uploadFile(data.featuredImage[0]);
                if (file) {
                    const fileId = file.$id;
                    data.featuredImage = fileId;
                    const post = await databaseService.createPost({ ...data, userId: userData.$id, ispublic: isPublic, name: userData.name, university: data.university.value });
                    if (post) {
                        navigate(`/post/${post.$id}`);
                    }
                }
            }
        } catch (error) {
            setError(error.message);
        }
        setIsSubmitPending(false);
        formRef.current.complete()
    }

    const changeCountry = (e) => {
        const value = e.target.value.toUpperCase();
        setCountry(value);
        console.log(value);
    }

    const customStyles = {
        control: (provider, state) => ({
            ...provider,
            width: '360px',
            height: '3.5rem',
            border: '2px solid #02881df1',
            outline: 'none',
            borderRadius: "8px",
        }),
        menu: (provided) => ({
            ...provided,
            zIndex: 9999,
            width: "360px"
        })
    };

    const getImagePreview = (e) => {
        if (e.target.files[0]) {
            const imageUrl = URL.createObjectURL(e.target.files[0]);
            setPostImageUrl(imageUrl);
        }
    }
    return (
        <Container className='p-2'>
            <LoadingBar ref={formRef} />
            <div className='items-center w-full'>
                <Input name='title' placeholder='Title' register={register} className='w-1/2' errors={errors} value={getValues('title')} />
                <p>{post?.featuredImage ? 'Change ' : ''}Post images:</p>
                <div className='flex items-center flex-col'>
                    <div className={`w-[450px] h-[200px] border-2 border-gray-500 rounded bg-white relative p-4 ${postImageUrl ? 'hidden' : ''}`}>
                        <input type='file' {...register('featuredImage', { required: post?.featuredImage ? false : 'Post images are required' })} id='upload-image' accept='image/jpg, image/png, image/gif' onChange={getImagePreview} className='absolute z-[-1]' />
                        <label className='border-2 h-full border-gray-400 rounded border-dashed w-full block bg-gray-100 cursor-pointer' htmlFor='upload-image'>
                            <img src={'/images/defaultPostImage.png'} alt="Post Image" width={'100px'} className='ml-[35%]' />
                            <p className='text-xl text-center text-gray-700 font-bold'>Drag and drop or click here <br /> <span className='text-gray-400 text-lg font-normal'>to upload image</span></p>
                        </label>
                    </div>
                    {errors.featuredImage && <p className='text-red-500'>{errors.featuredImage.message}</p>}
                    {postImageUrl &&
                        <>
                            <img src={postImageUrl} alt="" className='w-[450px] h-[200px]' />
                            <label htmlFor="upload-image" className='border-2 px-2 py-1 mt-2 bg-gray-600 text-gray-50 font-bold'>Change Image</label>
                        </>
                    }
                </div>
                <div>
                    <Input name="country" placeholder="Country" value={country} onChange={changeCountry} register={register} className='w-[360px]' errors={errors} />
                    <Controller
                        name='university'
                        control={control}
                        render={({ field }) => (
                            <ReactSelect
                                {...field}
                                options={universities}
                                placeholder="Select University"
                                isClearable
                                isSearchable
                                styles={customStyles}
                                defaultInputValue={getValues('university')}
                            />
                        )}
                        rules={{ required: 'Please select the university' }}
                    />
                    {errors.university && <p className='text-red-500'>{errors.university.message}</p>}
                </div>
                <div className='flex my-4 gap-2'>
                    <p>Post type:</p>
                    <Select options={['Public', 'Private']} {...register('ispublic')} className='border-2 border-green-600 outline-none' />
                </div>
            </div>
            <p className='text-red-600'>{error}</p>
            <div>
                <p className='text-start'>Content:</p>
                <div>
                    <RTE setValue={setValue} defaultValue={getValues('content')} />
                </div>
            </div>

            <SubmitBtn className='w-fit' isSubmitPending={isSubmitPending} value={post ? "Update" : "Submit"} onClick={handleSubmit(createOrUpdatePost)} />
        </Container>
    )
}

export default PostForm
