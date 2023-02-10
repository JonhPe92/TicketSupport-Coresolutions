import styled from 'styled-components';
// Assets
import AddImage1 from 'assets/img/add/1.png';
import AddImage2 from 'assets/img/add/2.png';
import AddImage3 from 'assets/img/add/3.png';
import AddImage4 from 'assets/img/add/4.png';
import FullButton from '../../../ui-component/landing-page/Buttons/FullButton';

const Products = () => (
    <Wrapper id="products" style={{ marginBottom: '10em' }}>
        <div className="lightBg">
            <div className="container">
                <Advertising className="flexSpaceCenter">
                    <AddLeft>
                        <h2 className="font40 extraBold">Conoce nuestros productos</h2>
                        <p className="font15 darkColor boxPadding">Trabajamos con las marcas .......</p>
                        <ButtonsRow className="flexNullCenter" style={{ margin: '30px 0' }}>
                            <div style={{ width: '190px', marginLeft: '15px' }}>
                                <FullButton title="Portafolio" action={() => alert('clicked')} border />
                            </div>
                        </ButtonsRow>
                    </AddLeft>
                    <AddRight>
                        <AddRightInner>
                            <div className="flexNullCenter">
                                <AddImgWrapp1 className="flexCenter">
                                    <img src={AddImage1} alt="office" />
                                </AddImgWrapp1>
                                <AddImgWrapp2>
                                    <img src={AddImage2} alt="office" />
                                </AddImgWrapp2>
                            </div>
                            <div className="flexNullCenter">
                                <AddImgWrapp3>
                                    <img src={AddImage3} alt="office" />
                                </AddImgWrapp3>
                                <AddImgWrapp4>
                                    <img src={AddImage4} alt="office" />
                                </AddImgWrapp4>
                            </div>
                        </AddRightInner>
                    </AddRight>
                </Advertising>
            </div>
        </div>
    </Wrapper>
);
export default Products;

const Wrapper = styled.section`
    width: 100%;
`;

const Advertising = styled.div`
    margin: 80px 0;
    padding: 100px 0;
    position: relative;
    @media (max-width: 1160px) {
        padding: 100px 0 40px 0;
    }
    @media (max-width: 860px) {
        flex-direction: column;
        padding: 0 0 30px 0;
        margin: 80px 0 0px 0;
    }
`;
const ButtonsRow = styled.div`
    @media (max-width: 860px) {
        justify-content: space-between;
    }
`;
const AddLeft = styled.div`
    width: 50%;
    p {
        max-width: 475px;
    }
    @media (max-width: 860px) {
        width: 80%;
        order: 2;
        text-align: center;
        h2 {
            line-height: 3rem;
            margin: 15px 0;
        }
        p {
            margin: 0 auto;
        }
    }
`;
const AddRight = styled.div`
    width: 50%;
    position: absolute;
    top: -70px;
    right: 0;
    @media (max-width: 860px) {
        width: 80%;
        position: relative;
        order: 1;
        top: -40px;
    }
`;
const AddRightInner = styled.div`
    width: 100%;
`;
const AddImgWrapp1 = styled.div`
    width: 48%;
    margin: 0 6% 10px 6%;
    img {
        width: 100%;
        height: auto;
        border-radius: 1rem;
        box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
        -webkit-box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
        -moz-box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
    }
`;
const AddImgWrapp2 = styled.div`
    width: 30%;
    margin: 0 5% 10px 5%;
    img {
        width: 100%;
        height: auto;
        border-radius: 1rem;
        box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
        -webkit-box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
        -moz-box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
    }
`;
const AddImgWrapp3 = styled.div`
    width: 20%;
    margin-left: 40%;
    img {
        width: 100%;
        height: auto;
        border-radius: 1rem;
        box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
        -webkit-box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
        -moz-box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
    }
`;
const AddImgWrapp4 = styled.div`
    width: 30%;
    margin: 0 5%auto;
    img {
        width: 100%;
        height: auto;
        border-radius: 1rem;
        box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
        -webkit-box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
        -moz-box-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);
    }
`;
