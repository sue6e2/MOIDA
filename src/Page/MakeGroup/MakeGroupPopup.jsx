import React, {Component} from 'react';

class MakeGroupPopupContent extends Component{
    render(){
        return(
            <div className="makegroup_layer_wrapper">
                <div className="makegroup_full_layer">
                    <div className="makegroup_common_alert">
                        <h2>스터디 그룹 만들기</h2>
                        <div>This is MakeGroupPopup Body</div>
                        <div>
                            <button type="button" onClick={this.props.onClose}>close</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MakeGroupPopupContent;