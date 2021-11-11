import React, {Component} from 'react';
import './MakeGroupPopup.css';
import { post } from 'axios';


const TagsInput = props=>{
    const [tags, setTags] = React.useState([]);
    const removeTags = indexToRemove=>{
        setTags(tags.filter((_, index)=> index !== indexToRemove));
    };
    const addTags = event => {
        if(event.target.value !== ""){
            setTags([...tags, event.target.value]);
            props.selected([...tags, event.target.value]);
            event.target.value = "";
        }
    };
    return(
        <div>
            <ul>
                {tags.map((tag, index) => (
                    <li key={index} className="HashWrapInner">
                        <span>{tag}</span>
                        <i
                            className="material-icons" 
                            onClick={() => removeTags(index)}
                        >
                            x
                        </i>
                    </li>
                ))}
            </ul>
            <input
                type="text" className="HashInput" placeholder="tag추가를 위해 enter키를 누르세요"
                onKeyUp={e => (e.key==="Enter" ? addTags(e): null)}
            />
        </div>
    );
}

function Hashtag(){
    const selected = tags =>console.log(tags);
    return(
        <div className="HashWrapOuter">
            <TagsInput selected={selected} />
        </div>
    );
}

class MakeGroupPopupContent extends Component{
    constructor(props) {

        super(props);

        this.state = {
            groupName: '',
            max_number: '',
            master_id: '',
            discription: '',
            status: "public",
        }

    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleValueChange = this.handleValueChange.bind(this)
    this.addGroup = this.addGroup.bind(this)
  }

    handleFormSubmit(e) {

        e.preventDefault()

        this.addGroup()

        .then((response) => {
            console.log(response.data);
        })
        this.setState({
            groupName: '',           
            max_number: '',          
            master_id: '',         
            discription: '',
            status: "public",     
        })           
        window.location.reload();
    }

    handleValueChange(e) {

    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
    }



    addGroup(){

    const url = '/makeGroup';

    const formData = new FormData();
    formData.append('groupName', this.state.groupName)
    formData.append('max_number', this.state.max_number)
    formData.append('master_id', this.state.master_id)
    formData.append('discription', this.state.discription)
    formData.append('status', this.state.status)

    const config = {

    headers: {
        'content-type': 'multipart/form-data'
            }

        }
        return post(url, formData, config)
    }
    
    render(){
        Hashtag();
        return(
            <div className="makegroup_layer_wrapper">
                <div className="makegroup_full_layer">
                    <div className="makegroup_common_alert">
                    <form onSubmit={this.handleFormSubmit}>
                        <h2>스터디 그룹 만들기</h2>
                        <div>                            
                            <h4>스터디 이름</h4>
                            <input type="text" name="groupName" value={this.state.groupName} onChange={this.handleValueChange} placeholder="입력하세요" autoFocus required/>                             
                        </div>
                        <div>                            
                            <h4>최대 인원</h4>
                            <input type="number" name="max_number" value={this.state.max_number} onChange={this.handleValueChange} placeholder="입력하세요" required/>명                             
                        </div>
                        <div className="HashWrap">                                                    
                            <h4>해시 태그(검색용)</h4>
                             {Hashtag()}
                        </div>
                        <div>                            
                            <h4>한 줄 소개</h4>
                            <textarea  name="discription" value={this.state.discription} onChange={this.handleValueChange}  placeholder="입력하세요"></textarea>                          
                        </div>
                        <div>
                            <label><input type="radio" name="status" value={"public"} checked={this.state.status === "public"} onChange={this.handleValueChange}/>공개</label>
                            <label><input type="radio" name="status" value={"private"}  checked={this.state.status === "private"} onChange={this.handleValueChange}/>비공개</label>

                        </div>    
                        <div>
                            <button type="submit" >만들기</button>
                            <button type="button" onClick={this.props.onClose}>취소</button>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default MakeGroupPopupContent;
