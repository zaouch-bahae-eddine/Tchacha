import styled from 'styled-components';

const SettingMenuStyle = styled.ul`
    display: ${props => props.visible? "block" : "none"};
    z-index: 9;
    position: absolute;
    top: -19px;
    right: -5px;
    background-color: #ffffffc9;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    list-style: none;
    padding:0;
    width: ${props => props.size? props.size : "150px"};
    li {
        font-size: 0.9em;
        color: ${props => props.color};
        display: flex;
        align-items: center;
        padding: 7px;
        border-radius: 5px;
        transition: 0.1s;
        svg{
            margin-right: 12px;
        }
        &:hover{
            cursor: pointer;
            background-color: ${props => props.color};
            transition: 0.3s;
            color: white;
            svg{
                color: white;
            }
        }
    }
`;
export {SettingMenuStyle};