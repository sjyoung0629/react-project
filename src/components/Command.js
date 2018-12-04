import React, { Component } from 'react';
import CommandForm from './CommandForm';

class Command extends Component {
    state = {
        likeCount: 0,
        time: ''
    }

    // 경과시간 계산
    getTimeAgo = (time) => {
        let command_time = time;
        // 현재 시간 불러와서 차이 계산
        let cur_time = new Date().getTime();
        let second = (cur_time - command_time) / 1000;
        let hour, minute, elapsed;
        // 100초
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
        let commandNode = document.createElement("div");
        parent.appendChild(commandNode);
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

    render() {
        const {author, content, time, id} = this.props.info;

        return (
            <div class="command">
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
                    <input type="button" value="삭제"></input>
                </div>
            </div>
        );
    }
}

export default Command;