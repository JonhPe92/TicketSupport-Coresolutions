/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import styled from 'styled-components';
// Assets
import ContactImg1 from 'assets/img/contact-1.png';
import ContactImg2 from 'assets/img/contact-2.png';
import ContactImg3 from 'assets/img/contact-3.png';

export default function Contact() {
    return (
        <Wrapper id="contact">
            <div className="lightBg">
                <div className="container">
                    <HeaderInfo>
                        <h1 className="font40 extraBold">Contactos</h1>
                    </HeaderInfo>
                    <div className="row" style={{ paddingBottom: '30px' }}>
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                            <h3 className="extraBold darkColor">Direccion</h3>
                            <p className="font15 extraBold greyColor" style={{ paddingTop: '1em' }}>
                                Av. 3 de Noviembre 21-176 y Juan Pablo I. Cuenca
                            </p>

                            <h3 className="extraBold darkColor" style={{ paddingTop: '2em' }}>
                                Email
                            </h3>
                            <p className="font15 extraBold greyColor" style={{ paddingTop: '1em' }}>
                                info@coresolutions.com.ec
                            </p>

                            <h3 className="extraBold darkColor" style={{ paddingTop: '2em' }}>
                                Telefonos
                            </h3>
                            <p className="font15 extraBold greyColor" style={{ paddingTop: '1em' }}>
                                (593-7) 2843991 / (593-7) 2841495
                            </p>
                        </div>

                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 flex">
                            <div style={{ width: '50%' }} className="flexNullCenter flexColumn">
                                <ContactImgBox>
                                    <img src={ContactImg1} alt="office" className="radius6" />
                                </ContactImgBox>
                                <ContactImgBox>
                                    <img src={ContactImg2} alt="office" className="radius6" />
                                </ContactImgBox>
                            </div>
                            <div style={{ width: '50%' }}>
                                <div style={{ marginTop: '100px' }}>
                                    <img src={ContactImg3} alt="office" className="radius6" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
}

const Wrapper = styled.section`
    width: 100%;
`;
const HeaderInfo = styled.div`
    padding: 70px 0 30px 0;
    @media (max-width: 860px) {
        text-align: center;
    }
`;
const Form = styled.form`
    padding: 70px 0 30px 0;
    input,
    textarea {
        width: 100%;
        background-color: transparent;
        border: 0px;
        outline: none;
        box-shadow: none;
        border-bottom: 1px solid #707070;
        height: 30px;
        margin-bottom: 30px;
    }
    textarea {
        min-height: 100px;
    }
    @media (max-width: 860px) {
        padding: 30px 0;
    }
`;
const ButtonInput = styled.input`
    border: 1px solid #7620ff;
    background-color: #7620ff;
    width: 100%;
    padding: 15px;
    outline: none;
    color: #fff;
    :hover {
        background-color: #580cd2;
        border: 1px solid #7620ff;
        color: #fff;
    }
    @media (max-width: 991px) {
        margin: 0 auto;
    }
`;
const ContactImgBox = styled.div`
    max-width: 180px;
    align-self: flex-end;
    margin: 10px 30px 10px 0;
`;
const SumbitWrapper = styled.div`
    @media (max-width: 991px) {
        width: 100%;
        margin-bottom: 50px;
    }
`;
