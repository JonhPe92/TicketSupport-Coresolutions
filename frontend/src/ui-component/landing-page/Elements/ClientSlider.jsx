import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';

// Assets

import cartopel from 'assets/images/clients/cartopel.png';
import cedia from 'assets/images/clients/cedia.png';
import centrosur from 'assets/images/clients/centrosur.png';
import crea from 'assets/images/clients/crea.png';
import etapa from 'assets/images/clients/etapa.png';
import graiman from 'assets/images/clients/graiman.png';
import indurama from 'assets/images/clients/indurama.png';
import jardinAzuayo from 'assets/images/clients/jardinAzuayo.png';
import jep from 'assets/images/clients/jep.png';

const clients = [cartopel, cedia, centrosur, crea, etapa, graiman, indurama, jardinAzuayo, jep];

export default function ClientSlider() {
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 2,
        arrows: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }
        ]
    };
    return (
        <div>
            <div className="lightBg" style={{ padding: '10px 0', display: 'grid', placeItems: 'center', filter: 'opacity(70%)' }}>
                <h1 className="font30 extraBold darkColor"> Nuestros Clientes</h1>
                <p className="font15 darkColor" style={{ marginTop: '1em' }}>
                    Desde nuestros inicios hemos mantenido como filosofía de trabajo entregar a nuestros clientes un servicio de la más alta
                    calidad, por lo que brindamos soluciones integrales que involucran asesoramiento, implementaciones, capacitación,
                    consultoría, y sobre todo el soporte técnico oportuno en el momento en que lo necesitan.
                </p>
            </div>
            <Slider {...settings}>
                {clients.map((client) => (
                    <LogoWrapper className="flexCenter" key={client}>
                        <ImgStyle src={client} alt="client logo" />
                    </LogoWrapper>
                ))}
            </Slider>
        </div>
    );
}

const LogoWrapper = styled.div`
    width: 80%;
    height: 170px;
    cursor: pointer;
    :focus-visible {
        outline: none;
        border: 0px;
    }
`;

const ImgStyle = styled.img`
    width: 80%;
    height: 100%;
    padding: 10%;
`;
