import React from 'react';
import styled from 'styled-components';
// Assets
import RollerIcon from 'assets/svg/Services/RollerIcon';
import MonitorIcon from 'assets/svg/Services/MonitorIcon';
import BrowserIcon from 'assets/svg/Services/BrowserIcon';
import PrinterIcon from 'assets/svg/Services/PrinterIcon';
import coreCloud from 'assets/images/services/coreCloud.png';
import coreService from 'assets/images/services/coreService.png';
import coreLearn from 'assets/images/services/coreLearn.png';
import coreSupport from 'assets/images/services/coreSupport.png';

export default function ServiceBox({ icon, title, subtitle }) {
    let getIcon;

    switch (icon) {
        case 'cloud':
            getIcon = <img src={coreCloud} alt="Coresolutions" width="185" height="100%" />;
            break;
        case 'service':
            getIcon = <img src={coreService} alt="Coresolutions" width="185" />;
            break;
        case 'learn':
            getIcon = <img src={coreLearn} alt="Coresolutions" width="185" />;
            break;
        case 'support':
            getIcon = <img src={coreSupport} alt="Coresolutions" width="185" />;
            break;
        default:
            getIcon = <img src={coreCloud} alt="Coresolutions" width="185" />;
            break;
    }

    return (
        <Wrapper className="flex flexColumn">
            <IconStyle>{getIcon}</IconStyle>
            {/* <TitleStyle className="font20 extraBold">{title}</TitleStyle> */}
            <SubtitleStyle className="font15 darkColor">{subtitle}</SubtitleStyle>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    width: 100%;
`;
const IconStyle = styled.div`
    @media (max-width: 860px) {
        margin: 0 auto;
    }
`;
const TitleStyle = styled.h2`
    width: 100%;
    max-width: 300px;
    color: black:
    margin: 0 auto;
    padding: 10px 0;
    @media (max-width: 860px) {
        padding: 20px 0;
    }
`;
const SubtitleStyle = styled.p`
    width: 100%;
    max-width: 300px;
    margin: 0 auto;
    text-align: justify;
    text-justify: inter-word;
`;
