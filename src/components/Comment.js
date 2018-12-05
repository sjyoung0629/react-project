import React, { Component, Fragment } from 'react';
import CommandForm from './CommentForm';

class Comment extends Component {
    state = {
        author: '',
        content: '',
        likeCount: 0,
        time: '',
        editing: false,
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
            elapsed = (second > 0) ? parseInt(second) : 0;
            elapsed += "초";
        }

        return elapsed
    }

    // 답글 달기
    inputReply = (e) => {
        let target = e.target;
        let parent = target.parentNode;
        let commentNode = document.createElement("div");
        parent.appendChild(commentNode);
        // console.log(commandNode)
        // parent.appendChild(commandNode);
    }

    // '좋아요' 카운트하는 함수
    likeCmd = () => {
        let cur_count = this.state.likeCount;
        cur_count++;
        this.setState({
            likeCount: cur_count,
        });
    }

    // editing 값을 반전시킴
    handleToggleEdit = () => {
        const {info, onUpdate} = this.props;
        if (this.state.editing) {
            onUpdate(info.id, {
                author: this.state.author,
                content: this.state.content,
            });

        } else {
            this.setState({
                author: info.author,
                content: info.content,
            });
        }

        this.setState({
            editing: !this.state.editing,
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    // 댓글 수정 반영
    handleUpdate = (id, data) => {
        const {onUpdate} = this.props;
        onUpdate(id, data);
    }

    // 댓글 삭제
    handleRemove = () => {
        const {info, onRemove} = this.props;
        onRemove(info.id);
    }

    render() {
        const {author, content, time, id} = this.props.info;
        const {editing} = this.state;

        return (
            <div className="comment">
                {
                    editing ? (
                        <Fragment>
                            <div>
                                <input name="author" value={this.state.author}
                                onChange={this.handleChange} />
                            </div>
                            <div>
                                <input name="content" value={this.state.content}
                                onChange={this.handleChange} />
                            </div>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <div><b>{author}</b></div>
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
            </div>
        );
    }
}

export default Comment;