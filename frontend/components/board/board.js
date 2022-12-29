import {BoardWrapper} from "./boardWrapper";
import {BoardControls} from "./boardControls";
import {BoardFrame} from "./boardFrame";
import {BoardBackGround} from "./boardBackGround";
import {BoardContent} from "./boardContent";
import {PropTypes} from "prop-types";

export function Board(props) {

    return (
        <BoardWrapper>
            <BoardControls controls = {props.topControls}/>
            <BoardFrame color={props.frameColor}>
                <BoardBackGround bg={props.bg}>
                    <BoardContent>
                        {props.children}
                    </BoardContent>
                </BoardBackGround>
            </BoardFrame>
            <BoardControls controls = {props.bottomControls}/>
        </BoardWrapper>
    );
}

Board.propTypes = {
    frameColor: PropTypes.string,
    bg: PropTypes.string,
    controls: PropTypes.array,
};
