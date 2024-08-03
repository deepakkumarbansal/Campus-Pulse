import React from 'react'
import { Container, Logo } from '../index'
import { Link, useNavigate } from 'react-router-dom'
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io5";
import { FaLinkedin } from "react-icons/fa";
import styled from 'styled-components';

const Footer = () => {
    const navigate = useNavigate();

    return (
        <Container className='bottom-0 bg-gray-800'>
            <div className='flex w-full'>
                <div className='w-1/3 flex text-[#e7e3e3] mt-4 mr-4'>
                    <img src='/images/fullLogo.png' onClick={()=>navigate('/')}/>
                </div>
                <div className='w-2/3 border-l-2 p-4 border-gray-700'>
                    <StyledSection>
                        <StyledHeading>About Us</StyledHeading>
                        <StyledParagraph>Learn about our mission and values.</StyledParagraph>
                        <StyledLink to='/about'>Read more</StyledLink>
                    </StyledSection>
                    <StyledSection >
                        <StyledHeading>Contact Us</StyledHeading>
                        <StyledParagraph>Have questions or feedback? Get in touch with us!</StyledParagraph>
                        <StyledLink to='/about'>Contact</StyledLink>
                    </StyledSection>
                    <StyledSection >
                        <StyledHeading>Privacy & Terms</StyledHeading>
                        <StyledLink to='/policy'>Privacy Policy</StyledLink>
                        <br />
                        <StyledLink to='/terms'>Terms of Service.</StyledLink>
                    </StyledSection>
                    <StyledSection >
                        <StyledHeading>Follow Us</StyledHeading>
                        <div className='flex gap-5'>
                            <StyledLink to={'/'} className='flex items-center gap-1 '>
                                <FaFacebook />
                                <p className='text-[1rem]'>Facebook</p>
                            </StyledLink>
                            <StyledLink to={'/'} className='flex items-center gap-1'>
                                <FaXTwitter />
                                <p className='text-[1rem]'>X</p>
                            </StyledLink>
                            <StyledLink to={'/'} className='flex items-center gap-1'>
                                <IoLogoInstagram />
                                <p className='text-[1rem]'>Instagram</p>
                            </StyledLink>
                            <StyledLink to={'/'} className='flex items-center gap-1'>
                                <FaLinkedin />
                                <p className='text-[1rem]'>LinkedIn</p>
                            </StyledLink>
                        </div>
                    </StyledSection>
                </div>
            </div>
            <hr className='mx-10 mt-4'/>
            <div className='flex justify-center items-center h-14'>
                <StyledParagraph >&copy; 2024 Deepak Kumar Bansal. All rights reserved.</StyledParagraph>
            </div>
        </Container>
    )
}
const StyledSection = styled.section`
    text-align: start;
`
const StyledHeading = styled.h4`
    font-weight: 700;
    color: #e7e3e3;
    font-size: 1.1rem;
    margin: auto;
`
const StyledParagraph = styled.p`
    color: #c3c5c6;
    font-size: 1rem;
`
const StyledLink = styled(Link)`
    color: #808080;
    font-size: .96rem;
    transition: color .3s;
    &:hover{
        color: #e7e3e3;
    }
`
export default Footer
