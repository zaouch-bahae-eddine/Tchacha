import styled, {keyframes} from 'styled-components';
const Move = keyframes`
    0% {
        transform: rotate(0) scale(1);
        animation-timing-function: ease-in;
    }
    10% {
        transform: rotate(90deg) scale(0);
    }
    50% {
        transform: rotate(90deg) scale(0);
        animation-timing-function: ease-out;
    }
    60% {
        transform: rotate(180deg) scale(1);
    }
    100% {
        transform: rotate(180deg) scale(1);
    }
`;
export const StyleSpiner = styled.div.attrs(props => ({
    size: props.size || "2rem",
    duration: props.duration || "2s"
}))`
    position: fixed;
    top: 50%;
    left: 50%;
    height: ${props=>props.size};
    width: ${props=>props.size};
    transform: translateX(-50%) translateY(-50%); 
`;

export const StyleSpinerBlock = styled.div.attrs(props => ({
    size: props.size || "2rem",
    duration: props.duration || "2s",
    color: props.color || "#3a0ca3"
}))`
    position: absolute;
    top: 0;
    left: 0;
    height: ${props=>props.size};
    width: ${props=>props.size};
    & > div {
        position: absolute;
        height: ${props=>props.size};
        width: ${props=>props.size};
        background: ${props => props.color};
        animation: ${Move} ${props=>props.duration} linear infinite;
        
        &:nth-of-type(1) {
            top: ${props=>("-"+props.size)};
            left: ${props=>("-"+props.size)};
            animation-delay:  ${props=>((-7 *parseInt((props.duration).slice(0, -1), 10)/ 8) + "s")} ;
        }
        
        &:nth-of-type(2) {
            top: ${props=>("-"+props.size)};
            left: 0;
            animation-delay: ${props=>((-6 *parseInt((props.duration).slice(0, -1), 10)/ 8) + "s")};
        }
        
        &:nth-of-type(3) {
            top: ${props=>("-"+props.size)};
            left: ${props=>(props.size)};
            animation-delay: ${props=>((-5 *parseInt((props.duration).slice(0, -1), 10)/ 8) + "s")};
        }
        
        &:nth-of-type(4) {
            top: 0;
            left: ${props=>(props.size)};
            animation-delay: ${props=>((-4 *parseInt((props.duration).slice(0, -1), 10)/ 8) + "s")};
        }
        
        &:nth-of-type(5) {
            top: ${props=>(props.size)};
            left: ${props=>(props.size)};
            animation-delay: ${props=>((-3 *parseInt((props.duration).slice(0, -1), 10)/ 8) + "s")};
        }
        
        &:nth-of-type(6) {
            top: ${props=>(props.size)};
            left: 0;
            animation-delay: -${props=>((-2 *parseInt((props.duration).slice(0, -1), 10)/ 8) + "s")};
        }
        
        &:nth-of-type(7) {
            top: ${props=>(props.size)};
            left: ${props=>("-" + props.size)};
            animation-delay: ${props=>((-1 *parseInt((props.duration).slice(0, -1), 10)/ 8) + "s")};
        }
        
        &:nth-of-type(8) {
            top: 0;
            left: ${props=>("-" + props.size)};
            animation-delay: ${props=>((0 *parseInt((props.duration).slice(0, -1), 10)/ 8) + "s")};
        }
    }
`;