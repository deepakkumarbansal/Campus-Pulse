import React, { useEffect, useState } from 'react'
import { storageService } from '../../appwrite/storage.Service'
import { Link } from 'react-router-dom'
import parse from 'html-react-parser'
const PostCard = ({ title, slug, featuredImage, userId, name, content, college, country, avatarId='66a201fe003d29bd7a63' }) => {
    const parsedContent = typeof content === 'string' ? parse(content) : '';
    const [avatarUrl, setAvatarUrl] = useState('');
    useEffect(() => {
        if (avatarId) {
            const url = storageService.getFilePreview(avatarId, true);
            setAvatarUrl(url.href);
        }
    }, [])
    return (
        <>
            <Link to={`/post/${slug}`} className='m-auto'>
                <div className='w-[60rem] h-[500px] rounded-xl bg-gray-200 border-2 border-black'>
                    <div className='bg-[#E68369] dark:bg-gray-900 rounded-t-xl flex items-center gap-4 h-14 pl-2'>
                        <img src={avatarUrl} alt="avatar" className='border rounded-full w-14 h-14' />
                        <p className='text-white font-semibold'>{`${name} (~${userId})`}</p>
                    </div>
                    <h3 className='h-10 text-3xl bg-black text-white pl-2 font-extrabold text-center border-y-4 border-white'>{title}</h3>
                    <div className='flex w-full h-[calc(500px-6rem)]'>
                        <img src={storageService.getFilePreview(featuredImage)} alt={title} className={`h-full pb-1 w-1/2 rounded-bl-xl  dark:border-green-500`} />
                        <div className='flex flex-col justify-between w-1/2 rounded-br-xl text-black dark:text-white dark:border-none'>
                            <div className='overflow-hidden px-3 pt-5 text-justify'>
                                {
                                    parsedContent.length > 40 ? parsedContent.substring(41) + "..." : parsedContent
                                }
                            </div>
                            <p className='p-2 text-end min-h-12 border-t-2 border-black'>{`-- ${college} (${country})`}</p>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    )
}

export default PostCard
