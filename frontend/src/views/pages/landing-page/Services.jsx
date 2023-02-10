import React from 'react';
import styled from 'styled-components';
// Components

import ClientSlider from '../../../ui-component/landing-page/Elements/ClientSlider';
import ServiceBox from '../../../ui-component/landing-page/Elements/ServiceBox';

export default function Services() {
    return (
        <Wrapper id="services">
            <div className="lightBg" style={{ padding: '50px 0' }}>
                <div className="container">
                    <ClientSlider />
                </div>
            </div>
            <div className="whiteBg" style={{ padding: '60px 0' }}>
                <div className="container">
                    <HeaderInfo>
                        <h1 className="font40 extraBold">Conoce nuestros servicios</h1>
                        <p className="font15 boxPadding darkColor">
                            Operando en la intersección de estrategia, innovación, planificación y tecnología, combinamos nuestra
                            experiencia profesional con la experiencia de la industria para que podamos hacer una diferencia en el mundo de
                            la innovación.
                        </p>
                    </HeaderInfo>
                    <ServiceBoxRow className="flex">
                        <ServiceBoxWrapper>
                            <ServiceBox
                                icon="cloud"
                                title="CoreCloud"
                                subtitle="Trabajamos con las mejores marcas en el mercado Cloud como es el caso de: IBM Cloud, Amazon Web Services, Microsoft Azure y Office 365. Entregamos servicios cloud tanto como Cloud Pública como Cloud Privada"
                            />
                        </ServiceBoxWrapper>
                        <ServiceBoxWrapper>
                            <ServiceBox
                                icon="service"
                                title="CoreService"
                                subtitle="Nuestras soluciones son integrales, por lo que los servicios intangibles de TI juegan un rol muy importante para el mejoramiento y la eficiencia en la implementación y funcionamiento de dichas soluciones."
                            />
                        </ServiceBoxWrapper>
                        <ServiceBoxWrapper>
                            <ServiceBox
                                icon="learn"
                                title="CoreLearn"
                                subtitle="Capacitaciones, certificaciones y pruebas electrónicas para clientes de tecnología de la información, académicos, gubernamentales y profesionales."
                            />
                        </ServiceBoxWrapper>
                        <ServiceBoxWrapper>
                            <ServiceBox
                                icon="support"
                                title="CoreSupport"
                                subtitle="Brindamos soporte tecnico especializado a las necesidades de los clientes, al trabajar con un equipo multidisciplinario nos permite encontrar una solución acorde a cada problema."
                            />
                        </ServiceBoxWrapper>
                    </ServiceBoxRow>
                </div>
            </div>
        </Wrapper>
    );
}

const Wrapper = styled.section`
    width: 100%;
`;
const ServiceBoxRow = styled.div`
    @media (max-width: 860px) {
        flex-direction: column;
    }
`;
const ServiceBoxWrapper = styled.div`
    width: 20%;
    margin-right: 5%;
    padding: 80px 0;
    @media (max-width: 860px) {
        width: 100%;
        text-align: center;
        padding: 40px 0;
    }
`;
const HeaderInfo = styled.div`
    @media (max-width: 860px) {
        text-align: center;
    }
`;
