import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    text-align: center;
    
    @media (max-width: 768px) {
        justify-content: center;
        Padding-left: 80px;
    }
`;

const Title = styled.h1`
    font-size: 2.5em;
`;

const Message = styled.p`
    font-size: 1.2em;
`;

const NeedAuthPage = () => {
    const { t } = useTranslation();

    return (
        <Container>
            <Title>{t('authRequired')}</Title>
            <Message>{t('authRequiredMessage')}</Message>
        </Container>
    );
};

export default NeedAuthPage;