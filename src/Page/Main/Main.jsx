import React, {Component} from 'react';
import PopupDom from '../../Page/MakeGroup/PopupDom';
import MakeGroupPopupContent from '../../Page/MakeGroup/MakeGroupPopup';

import '../../Page/MakeGroup/MakeGroupPopup.css';

class Main extends Component{
    constructor(props){
        super(props); //why?

        this.state={
            isOpenPopup: false,
        }
        
        this.openPopup=this.openPopup.bind(this);
        this.closePopup=this.closePopup.bind(this);
    }
    openPopup(){
        this.setState({
            isOpenPopup: true,
        })
    }
    closePopup(){
        this.setState({
            isOpenPopup: false,
        })
    }
    render(){
        return(
            <div>
                <h2>Main Page 입니다.</h2> 
                <div>
                    <button type="button" id="popupDom" onClick={this.openPopup}>
                        방 만들기
                    </button>
                    {this.state.isOpenPopup && 
                        <PopupDom>
                            <MakeGroupPopupContent onClose={this.closePopup}/>                        
                        </PopupDom>}
                </div>
            </div>
        );
    }
}

export default Main;