import React, {Component} from "react";
import Group from "../../Components/Member/Group";

//group data 관리
class MakeGroup extends Component{

    state={
        groups:""
    }

    componentDidMount(){
        this.callApi()
        .then(res=>this.setState({groups : res}))
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
                    }): ""
                }
                <Group/>
            </div>
        );
    }
}

export default MakeGroup;