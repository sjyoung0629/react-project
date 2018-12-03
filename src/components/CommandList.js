import React, { Component } from 'react';
import Command from './Command';

class CommandList extends Component {
    static defaultProps = {
        data: []
    }
    
    render() {
        const {data} = this.props;
        const list = data.map(
            // info들의 배열을 Command 컴포넌트로 변환해준다
            info => (<Command info={info} key={info.id} />)
        );

        return (
            <div class="command_list">
                {list}
            </div>
        );
    }
}

export default CommandList;