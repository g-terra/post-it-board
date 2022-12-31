import {BoardWrapper} from "./boardWrapper";
import {BoardControls} from "./boardControls";
import {BoardFrame} from "./boardFrame";
import {BoardBackGround} from "./boardBackGround";
import {BoardContent} from "./boardContent";

export function Board({
                          topControls = [],
                          bottomControls = [],
                          frameColor = 'bg-white',
                          bg = 'none',
                          children
                      }) {

    return (
        <BoardWrapper>
            <BoardControls controls={topControls}/>
            <BoardFrame color={frameColor}>
                <BoardBackGround bg={bg}>
                    <BoardContent>
                        {children}
                    </BoardContent>
                </BoardBackGround>
            </BoardFrame>
            <BoardControls controls={bottomControls}/>
        </BoardWrapper>
    );
}
