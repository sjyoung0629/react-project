import React, { Component } from 'react';

class CommentForm extends Component {
    state = {
        author: '',
        content: '',
        likes: 0,
        time: '',
    }

    handleSubmit = (e) => {
        // preventDefault: submit의 기본 이벤트 동작을 막음
        e.preventDefault();
        const state = this.state;
        const type = this.props.type;
        // author, content 값이 있을때만 댓글 입력하도록 함
        // 향후 button disabled/abled 로 관리
        if (state.author && state.content) {
            // 댓글 작성한 시간 불러와서 state에 저장
            this.state.time = new Date().getTime();
            if (type === "main") {
                this.props.onCreate(this.state);
            }
            // submit 후 초기화
            this.setState({
                author: '',
                content: '',
                likes: 0,
                time: '',
            });
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleKeyUp = (e) => {
        // Enter 키 눌렀을 떄 댓글 입력되도록 함
        if (e.keyCode === 13) {
            this.handleSubmit(e);
        }
    }

    render() {
        return (
            <form onKeyUp={this.handleKeyUp}>
                <div>
                    <input name="author"
                    value={this.state.author}
                    placeholder="아이디"
                    onChange={this.handleChange}></input>
                    <input name="content"
                    value={this.state.content}
                    placeholder="댓글을 달아보세요"
                    onChange={this.handleChange}></input>
                    <div>
                        <input type="button"
                        onClick={this.handleSubmit}
                        value="게시"/>
                    </div>
                </div>
            </form>
        );
    }
}

export default CommentForm;