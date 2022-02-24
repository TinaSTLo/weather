import React, { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import { Empty } from 'antd';

const TodoListCardWrapper = styled.div`
    position: relative;
    min-width: 360px;
    box-sizing: border-box;
    padding: 30px 15px;
    box-shadow: ${({ theme }) => theme.boxShadow};
    background-color: ${({ theme }) => theme.foregroundColor} !important;
    border-radius: 16px;
    width: 937px;
    height: 514px;
    background: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const EmptyStyle = styled(Empty)`
    .ant-empty-description{
        font-size: 18px;
    }
`;

const WeatherCard = (props) => {

    return (
        <TodoListCardWrapper>
            <EmptyStyle
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={
                    <span>
                        未有待辦事項，請由上方輸入<br/>輸入完成後按Enter即可將項目加入清單
                    </span>
                }
            >
            </EmptyStyle>
        </TodoListCardWrapper >
    )
}

export default WeatherCard;