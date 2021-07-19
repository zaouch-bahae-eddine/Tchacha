import styled from 'styled-components';
import { AiOutlineAppstoreAdd, AiOutlineUsergroupAdd } from 'react-icons/ai';

const TaskContainerStyle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 320px;
    background-color: #eceefd;
    border-radius: 10px;
    margin: 17px auto;
`;
const TasksGroupeHeaderStyle = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 90%;

    background-color: #eceefd;
    svg {
        color: #4452a6;
        font-size: 16pt;
        &:hover{
            cursor: pointer;
        }
    }
    div{
        position: relative;
    }
`;

const AddTaskStyle = styled.div`
    display: flex;
    align-items: center;
    width: 90%;
    max-width: 280px;
    height: 50px;
    margin-bottom: 17px;
    background-color: #d9defa;
    border-radius: 10px;
    color: #4452a6;
    svg{
        margin: 0 12px;
        font-size: 16pt;
    }
    &:hover{
        cursor: pointer;
    }
`;

function MemberContainer(props) {
    return (
        <TaskContainerStyle>
            <TasksGroupeHeaderStyle>
                <h2>Members of {props.colomunTitle}</h2>
                <div onClick={() => props.dispalayMemberModal()}>
                    <AiOutlineUsergroupAdd />
                </div>
            </TasksGroupeHeaderStyle>
            {props.children}
            <AddTaskStyle onClick={() => props.dispalayMemberModal()}> <AiOutlineUsergroupAdd /> <span>Add a member</span></AddTaskStyle>
        </TaskContainerStyle>
    )
}

export default MemberContainer