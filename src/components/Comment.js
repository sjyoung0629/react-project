import React, { Component, Fragment } from 'react';
import CommandForm from './CommentForm';
import CommentForm from './CommentForm';

class Comment extends Component {
    state = {
        author: '',
        content: '',
        likeCount: 0,
        time: '',
        editing: false,
        reply: false,
    }

    // 경과시간 계산
    getTimeAgo = (time) => {
        const comment_time = time;
        // 현재 시간 불러와서 차이 계산
        const cur_time = new Date().getTime();
        let second = (cur_time - comment_time) / 1000;
        let day, hour, minute, elapsed;

        if (second > 60) {
            minute = second / 60;
            if (minute > 60) {
                hour = minute / 60;
                if (hour > 24) {
                    day = hour / 24;
                    elapsed = parseInt(day) + "일";
                } else {
                    elapsed = parseInt(hour) + "시간";
                }
            } else {
                elapsed = parseInt(minute) + "분";
            }

        } else {
            elapsed = "몇 초";
        }

        return elapsed
    }

    // 답글 달기
    inputReply = (e) => {
        this.setState({
            reply: !this.state.reply,
        })
    }

    // '좋아요' 카운트하는 함수
    likeCmd = () => {
        let cur_count = this.state.likeCount;
        cur_count++;
        this.setState({
            likeCount: cur_count,
        });
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
        const {author, content, time} = this.props.info;
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
                    <span>{this.getTimeAgo(time)} 전</span>
                    <input type="button" value="답글 달기"
                    onClick={this.inputReply}></input>
                    <input type="button" value="좋아요"
                    onClick={this.likeCmd}></input>
                    <span>{this.state.likeCount}</span>
                    <input type="button" value={
                        editing ? "적용" : "수정"
                    }
                    onClick={this.handleToggleEdit}></input>
                    <input type="button" value="삭제"
                    onClick={this.handleRemove}></input>
                </div>
                {
                    reply && (
                        <Fragment>
                            <CommentForm />
                        </Fragment>
                    )
                }
            </div>
        );
    }
}

export default Comment;