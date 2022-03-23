import React, { useState } from 'react';
import styled from '@emotion/styled';

// Icon
import { ReactComponent as IconCheck } from 'src/assets/images/icon_checked_yellow.svg';
import { ReactComponent as IconDelete } from 'src/assets/images/icon_delete.svg';

// GlobalContext
import { useGlobalStore } from 'src/contexts/globalContext';

const InputCheckBox = styled.input`
    width: ${({ rwdMode }) => rwdMode === 'desktop' ? 32 : 24}px;
    height: ${({ rwdMode }) => rwdMode === 'desktop' ? 32 : 24}px;
    border-radius: 8px;
    border: 1.5px solid #2B2B2B;

    vertical-align: middle;

    appearance: none;
    cursor: pointer;
`;

const InputSpan = styled.div`
    flex: 26 1 0%;

    padding: ${({ rwdMode }) => rwdMode === 'desktop' ? '18px 0px' : '22px 0px'};
    margin-left: ${({ isDone, rwdMode }) => isDone ? rwdMode === 'desktop' ? 49 : 26 : rwdMode === 'desktop' ? 44 : 18}px;

    font-size: ${({ rwdMode }) => rwdMode === 'desktop' ? 24 : 18}px;
    text-decoration: ${({ isDone }) => isDone && 'line-through'};
    color: ${({ isDone }) => isDone && '#AAAAAA'};
`;

const InputContainer = styled.div`
    display: flex;
    align-items: center;
`;

const IconCheckStyle = styled(IconCheck)`
    display: flex;
    flex: ${({ rwdMode }) => rwdMode === 'desktop' ? 1 : 2};
`;

const IconDeleteStyle = styled(IconDelete)`
    display: flex;
    flex: ${({ rwdMode }) => rwdMode === 'desktop' ? 1 : 2};
    visibility: ${({ showDelete }) => showDelete ? 'show' : 'hidden'};

    margin-right: ${({ rwdMode }) => rwdMode === 'desktop' ? 15 : 20}px;

    cursor: pointer;
`;

const HrStyle = styled.hr`
    margin-left: ${({ rwdMode }) => rwdMode === 'desktop' ? 75 : 40}px;
`;

/**
 * Every todo list item
 *
 * @param {object} todo                     All item data
 * @param {function(e)} handleToggleIsDone  Select item change to done
 * @param {function(e)} handleDeleteTodo    Select delete icon and delete it
 *
 * @returns {JSX.Element}
 */
const TodoItem = ({ todo, handleToggleIsDone, handleDeleteTodo }) => {
    const { id, content, isDone } = todo;
    const [showDelete, setShowDelete] = useState(false);// Show delete icon

    const { rwdMode } = useGlobalStore(); // RWD

    /**
     * Toggle handleToggleIsDone and set it done with id
     */
    const handleToggleClick = () => handleToggleIsDone(id);

    /**
     * Mouse over item and show delete icon
     */
    const onMouseOver = () => setShowDelete(true);

    /**
     * Mouse out item and hide delete icon
     */
    const onMouseOut = () => setShowDelete(false);

    /**
     * Click delete icon and delete item with id
     * @param {number} id Item id when clicking
     */
    const onClickDelete = (id) => handleDeleteTodo(id);

    return (
        <>
            <InputContainer
                onMouseOver={onMouseOver}
                onMouseOut={onMouseOut}
            >
                {
                    isDone
                        ?
                        <IconCheckStyle rwdMode={rwdMode} />
                        :
                        <InputCheckBox
                            type='checkbox'
                            id={id}
                            value='checkbox'
                            onChange={handleToggleClick}
                            rwdMode={rwdMode}
                        >
                        </InputCheckBox>
                }
                <InputSpan
                    key={id}
                    isDone={isDone}
                    rwdMode={rwdMode}
                >
                    {content}
                </InputSpan>
                <IconDeleteStyle
                    showDelete={rwdMode === 'desktop' ? showDelete : true}
                    onClick={() => onClickDelete(id)}
                    rwdMode={rwdMode}
                />
            </InputContainer>
            <HrStyle
                width={rwdMode === 'desktop' ? '89%' : '80%'}
                size='1'
                color='#F0F0F0'
                rwdMode={rwdMode}
            />
        </>
    );
};

export default TodoItem;
