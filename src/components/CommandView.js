import React, { Component } from 'react';
import CommandForm from './CommandForm';
import CommandList from './CommandList';

class CommandView extends Component {
    // 댓글마다 고유한 id값
    command_id = 0;

    state = {
        information: []
    }

    handleCreate = (data) => {
        const {information} = this.state;
        this.setState({
          information: information.concat({
            // data가 추가될때마다 id 값 ++
            ...data,
            id: this.command_id++
          })
        });
    }
    
    render() {
        return (
            <div>
                <CommandList data={this.state.information}/>
                <hr />
                <CommandForm onCreate={this.handleCreate}/>
            </div>
        );
    }
}

export default CommandView;