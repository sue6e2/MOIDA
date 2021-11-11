import React, {Component} from "react";
import Group from "../../Components/Member/Group";
import MakeGroupPopupContent from "./MakeGroupPopup";

//group data 관리(API응답해서 데이터베이스에있는 그룹 data 보여줌)
class MakeGroup extends Component{
    constructor(props){
        super(props);

        this.state={
            groups:''
            
            }
        this.stateRefresh=this.stateRefresh.bind(this);
    }

    stateRefresh(){
        this.setState({
            groups:''
            
        });
        this.callApi()
        .then(res => this.setState({groups : res}))
        .catch(err => console.log(err));
    }

    componentDidMount(){
        this.callApi()
        .then(res => this.setState({groups : res}))
        .catch(err => console.log(err));
    }
 
    callApi=async()=>{
        const response=await fetch('/makeGroup');
        const body = await response.json();
        return body;
    }

    render(){
        return(
            <div>
                한 스터디그룹 페이지
                {
                    this.state.groups ? this.state.groups.map(c => {
                        return(
                            
                            <Group
                                key={c.id}
                                id={c.id}
                                name={c.name}
                                max_member_number={c.max_member_number}
                                master_id={c.master_id}                              
                                discription={c.discription}
                                status={c.status}
                            />
                        )
                    }): ''
                }
                <Group/>
                <MakeGroupPopupContent stateRefresh = {this.stateRefresh}/>
            </div>
        );
    }
}

export default MakeGroup;