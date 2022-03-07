import React, { useState } from 'react';
import styled from '@emotion/styled';
import { ReactComponent as IconCheck } from 'src/assets/images/icon_checked_yellow.svg';
import { ReactComponent as IconDelete } from 'src/assets/images/icon_delete.svg';
// import { CloseOutlined } from '@ant-design/icons';


const InputCheckBox = styled('input')`
    width: 32px;
    height: 32px;
    border-radius: 8px;
    vertical-align: middle;
    border: 1.5px solid #2B2B2B;
    appearance: none;
    cursor: pointer;
`;

const InputSpan = styled('div')`
    font-size: 24px;
    padding: 18px 0px;
    margin-left: ${props => props.isDone ? '49px' : '44px'};
    text-decoration: ${props => props.isDone && 'line-through'};
    color: ${props => props.isDone && '#AAAAAA'};
    flex: 26 1 0%;
`;

const InputContainer = styled('div')`
    display: flex;
    align-items: center;
    // margin-right: 50px;
`;

const IconCheckStyle = styled(IconCheck)`
    display: flex;
    flex: 1;
`;

const IconDeleteStyle = styled(IconDelete)`
    margin-right: 40px;
    visibility:${props => props.showDelete ? 'show' : 'hidden'};
    // visibility: show;
    cursor: pointer;
`;

const TodoItem = ({ todo, handleToggleIsDone, handleDeleteTodo }) => {
    const { id, content, isDone } = todo
    const [showDelete, setShowDelete] = useState(false);

    const handleToggleClick = () => {
        handleToggleIsDone(id);
    }

    const onMouseOver = () => {
        setShowDelete(true);
    }

    const onMouseOut = () => {
        setShowDelete(false);
    }

    const onClickDelete = (id) => {
        handleDeleteTodo(id);
    }

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
                <InputSpan for='scales' key={id} isDone={isDone}>{content}</InputSpan>
                <IconDeleteStyle showDelete={showDelete} onClick={() => onClickDelete(id)} />
                {/* {showDelete && <CloseOutlined />} */}
            </InputContainer>
            <hr width='86%' style={{ marginLeft: '75px' }} size='1' color='#F0F0F0' />
        </>
    );
}

export default TodoItem;
