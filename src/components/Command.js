import React, { Component } from 'react';

class Command extends Component {
    render() {
        const {author, content, id} = this.props.info;

        return (
            <div class="command">
                <div><b>{author}</b></div>
                <div>{content}</div>
                <div>
                    <input type="button" value="답글 달기"></input>
                    <input type="button" value="수정"></input>
                    <input type="button" value="삭제"></input>
                </div>
            </div>
        );
    }
}

export default Command;