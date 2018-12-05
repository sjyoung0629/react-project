import React, { Component } from 'react';
import CommandForm from './CommentForm';

class Comment extends Component {
    state = {
        likeCount: 0,
        time: ''
    }

    // 경과시간 계산
    getTimeAgo = (time) => {
        let comment_time = time;
        // 현재 시간 불러와서 차이 계산
        let cur_time = new Date().getTime();
        let second = (cur_time - comment_time) / 1000;
        let hour, minute, elapsed;

        if (second > 60) {
            minute = second / 60;
            if (minute > 60) {
                hour = minute / 60;
                elapsed = parseInt(hour) + "시간";
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

    // 댓글 삭제
    handleRemove = () => {
        const {info, onRemove} = this.props;
        onRemove(info.id);
    }

    render() {
        const {author, content, time} = this.props.info;

        return (
            <div className="comment">
                <div><b>{author}</b></div>
                <div>{content}</div>
                <div>
                    <span>{this.getTimeAgo(time)} 전</span>
                    <input type="button" value="답글 달기"
                    onClick={this.inputReply}></input>
                    <input type="button" value="좋아요"
                    onClick={this.likeCmd}></input>
                    <span>{this.state.likeCount}</span>
                    <input type="button" value="수정"></input>
                    <input type="button" value="삭제"
                    onClick={this.handleRemove}></input>
                </div>
            </div>
        );
    }
}

export default Comment;