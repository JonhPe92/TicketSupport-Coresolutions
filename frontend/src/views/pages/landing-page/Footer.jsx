/* eslint-disable react/jsx-boolean-value */
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-scroll';
// Assets
import LogoImg from '../../../assets/svg/Logo';
import Logo from '../../../ui-component/Logo';

export default function Contact() {
    const getCurrentYear = () => new Date().getFullYear();

    return (
        <Wrapper>
            <div className="darkBg">
                <div className="container">
                    <InnerWrapper className="flexSpaceCenter" style={{ padding: '30px 0' }}>
                        <Link className="flexCenter animate pointer" to="home" smooth={true} offset={-80}>
                            <Logo />
                        </Link>
                        <StyleP className="whiteColor font13">
                            © {getCurrentYear()} - <span className="purpleColor font13">Coresolutions S.A</span> All Right Reserved
                        </StyleP>

                        <Link className="whiteColor animate pointer font13" to="home" smooth={true} offset={-80}>
                            Back to top
                        </Link>
                    </InnerWrapper>
                </div>
            </div>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    width: 100%;
`;
const InnerWrapper = styled.div`
    @media (max-width: 550px) {
        flex-direction: column;
    }
`;
const StyleP = styled.p`
    @media (max-width: 550px) {
        margin: 20px 0;
    }
`;
