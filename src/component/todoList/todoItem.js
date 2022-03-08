import React, { useState } from 'react';
import styled from '@emotion/styled';

// Icon
import { ReactComponent as IconCheck } from 'src/assets/images/icon_checked_yellow.svg';
import { ReactComponent as IconDelete } from 'src/assets/images/icon_delete.svg';

const InputCheckBox = styled.input`
    width: 32px;
    height: 32px;
    border-radius: 8px;
    border: 1.5px solid #2B2B2B;

    vertical-align: middle;

    appearance: none;
    cursor: pointer;
`;

const InputSpan = styled.div`
    flex: 26 1 0%;

    padding: 18px 0px;
    margin-left: ${props => props.isDone ? '49px' : '44px'};

    font-size: 24px;
    text-decoration: ${props => props.isDone && 'line-through'};
    color: ${props => props.isDone && '#AAAAAA'};
`;

const InputContainer = styled.div`
    display: flex;
    align-items: center;
`;

const IconCheckStyle = styled(IconCheck)`
    display: flex;
    flex: 1;
`;

const IconDeleteStyle = styled(IconDelete)`
    visibility: ${props => props.showDelete ? 'show' : 'hidden'};
    
    margin-right: 40px;

    cursor: pointer;
`;

const HrStyle = styled.hr`
    margin-left: '75px';
`;

/**
 * 每一筆todo list item
 *
 * @param {object} todo 全部item資料
 * @param {function(e)} handleToggleIsDone 點選item為done
 * @param {function(e)} handleDeleteTodo 點選delete icon並刪除
 *
 * @returns {JSX.Element}
 */
const TodoItem = ({ todo, handleToggleIsDone, handleDeleteTodo }) => {
    const { id, content, isDone } = todo;
    const [showDelete, setShowDelete] = useState(false);// 是否顯示刪除icon

    /**
     * checkbox onChange
     * 觸發handleToggleIsDone設定為done並帶入id
     */
    const handleToggleClick = () => {
        handleToggleIsDone(id);
    };

    /**
     * 滑鼠滑入item 顯示delete icon
     */
    const onMouseOver = () => {
        setShowDelete(true);
    };

    /**
     * 滑鼠滑出item 隱藏delete icon
     */
    const onMouseOut = () => {
        setShowDelete(false);
    };

    /**
     * 點選delete icon 觸發handleDeleteTodo並帶入id
     * @param {number} id 點選item的id
     */
    const onClickDelete = (id) => {
        handleDeleteTodo(id);
    };

    return (
        <>
            <InputContainer onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
                {
                    isDone
                        ?
                        <IconCheckStyle />
                        :
                        <InputCheckBox
                            type='checkbox'
                            id={id}
                            value='checkbox'
                            onChange={handleToggleClick}
                        >
                        </InputCheckBox>
                }
                <InputSpan
                    for='scales'
                    key={id}
                    isDone={isDone}
                >
                    {content}
                </InputSpan>
                <IconDeleteStyle
                    showDelete={showDelete}
                    onClick={() => onClickDelete(id)}
                />
            </InputContainer>
            <HrStyle width='86%' size='1' color='#F0F0F0' />
        </>
    );
};

export default TodoItem;
