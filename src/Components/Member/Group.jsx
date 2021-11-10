import React from 'react';

//group component 구조화(MakeGroup에서 출력하게 된다)
class Group extends React.Component{
    render(){
        return(
        <div>
           <GroupProfile id={this.props.id} name={this.props.name}/>
           <GroupIfno max_member_number={this.props.max_member_number}
           master_id={this.props.master_id} discription={this.props.discription} status={this.props.status}/>

        </div>
        )
    }
}

class GroupProfile extends React.Component{
    render(){
        return(
            <div>
                {this.props.name}({this.props.id})
            </div>
        )
    }
}
class GroupIfno extends React.Component{
    render(){
        return(
            <div>
                
                {this.props.max_member_number}
                {this.props.master_id}
                {this.props.discription}
                {this.props.status}


            </div>
        )
    }
}

export default Group;
