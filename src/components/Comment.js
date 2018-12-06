import React, { Component, Fragment } from 'react';
import CommentForm from './CommentForm';
import Like from './Like';
import FromNow from './FromNow';

class Comment extends Component {
    state = {
        editing: false,
        reply: false,
    }

    // 변경된 부분만 업데이트
    shouldComponentUpdate(nextProps, nextState) {
        if(this.state !== nextState){
            return true;
        }

        return this.props.info !== nextProps.info;
    }

    // 답글 달기
    inputReply = (e) => {
        this.setState({
            reply: !this.state.reply,
        })
    }

    // editing 값에 따라 수정/적용
    handleToggleEdit = () => {
        const {info, onUpdate} = this.props;
        if (this.state.editing) {
            // 수정 모드: 수정된 content값을 업데이트하도록 함
            onUpdate(info.id, {
                content: this.state.content,
            });

        } else {
            // 적용 모드: 수정된(또는 원본) 내용을 가져와서 State에 세팅
            this.setState({
                content: info.content,
            });
        }

        // editing 값을 반전시킴
        this.setState({
            editing: !this.state.editing,
        })
    }

    // '좋아요' 수 반영
    handleUpdateLikes = (likes) => {
        const {info, updateLikes} = this.props;
        updateLikes(info.id, likes);
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    handleKeyUp = (e) => {
        // Enter 키 눌렀을 떄 댓글 수정되도록 함
        if (e.keyCode === 13) {
            this.handleToggleEdit();
        }
    }

    // 댓글 삭제
    handleRemove = () => {
        const {info, onRemove} = this.props;
        onRemove(info.id);
    }

    render() {
        const {author, content, likes, time} = this.props.info;
        const {editing, reply} = this.state;

        return (
            <div className="comment">
                <div><b>{author}</b></div>
                {
                    editing ? (
                        <Fragment>
                            <div>
                                <input name="content" value={this.state.content}
                                onChange={this.handleChange}
                                onKeyUp={this.handleKeyUp} />
                            </div>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <div>{content}</div>
                        </Fragment>
                    )
                }
                <div>
                    <div>
                        <FromNow time={time}/>
                        <span>·</span>
                        <input type="button" className="reply" value="답글 달기"
                                onClick={this.inputReply} />
                    </div>
                    <div>
                        <Like likes={likes} onUpdate={this.handleUpdateLikes}/>
                        <span>{this.state.cmtCount}</span>
                    </div>
                    <div>
                        <input type="button" value={editing ? "적용" : "수정"}
                                onClick={this.handleToggleEdit}></input>
                        <input type="button" value="삭제"
                                onClick={this.handleRemove}></input>
                    </div>
                </div>
                {
                    reply && (
                        <Fragment>
                            <CommentForm type="sub"/>
                        </Fragment>
                    )
                }
            </div>
        );
    }
}

export default Comment;