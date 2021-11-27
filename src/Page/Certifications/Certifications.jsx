import { Component } from 'react';
import TopBar from '../../Components/Bar/Bar';
import { PopUp } from '../../Components/Popup/Popup';
import Data from '../../Data';
import './Certifications.css';
import icon_camera from '../../res/img/icon-camera.svg';
import icon_close from '../../res/img/icon-close.svg';
import preview_image from '../../res/img/certification_default.png';
import axios from 'axios';
import { CertificationCard } from '../../Components/Card/Card';

class CertificationsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isConfirmOpen: false,
            confirmTitle: "",
            confirmDescription: "",
            confirmDate: new Date(),
            file: null,
            fileName: "",
            certificationData: []
        }


        if (this.state.certificationData.length == 0) {
            this.getCertificationData();
        }
    }
    userData = Data.getUserData();
    challengeData = Data.getChallengeData();

    getCertificationData = async () => {
        try {
            let response = await axios.get("http://localhost:5001/challengeMain/others",
                {
                    headers: {
                    },
                    params: { group_id: this.challengeData.group_id }

                }
            );
            console.log(response);
            if (response.data.code == 0) {
                this.setState({
                    certificationData: response.data.rows
                })
            }
        } catch (error) {
            console.log(error);
        }

    }
    goBack2Challenge = () => {
        location.href = "/Challenge/" + this.challengeData.name;
    }
    onChangeInputHandler = (e) => {
        const { value, name } = e.target;
        this.setState({
            [name]: value
        })
    }

    handleConfirmFileChange = (e) => {
        e.preventDefault();
        let files = e.target.files;
        this.setState({
            file: files[0],
            fileName: e.target.value
        })
        this.readConfirmImage(e.target);
    }

    readConfirmImage(input) {
        if (input.files && input.files[0]) {

            const reader = new FileReader()
            reader.onload = e => {
                const previewImage = document.getElementById("preview-confirmimage");
                previewImage.src = e.target.result
            }
            reader.readAsDataURL(input.files[0])
        }
    }

    openConfirmPopUp = () => {
        this.setState({
            isConfirmOpen: true,
        })
    }
    closeConfirmPopUp = () => {
        this.setState({
            isConfirmOpen: false,
        })
    }

    confirmSubmitHandler = (e) => {
        e.preventDefault();
        this.makeConfirmation();
    }

    makeConfirmation = async () => {
        const formData = new FormData();
        formData.append('group_id', this.challengeData.group_id);
        formData.append('user_realid', this.userData.realId);
        formData.append('title', this.state.confirmTitle);
        formData.append('description', this.state.confirmDescription)
        formData.append('photo', this.state.file);
        formData.append('date', this.state.confirmDate);


        try {
            let response = await axios(
                {
                    method: 'post',
                    url: 'http://localhost:5001/challengeMain/certification',
                    data: formData,
                    headers: {
                        "Content-Type": "multipart/form-data"
                    },
                }
            );
            console.log(response);
            if (response.data.code == 0) {
                this.closeConfirmPopUp();
                location.reload();
            }
        } catch (error) {
            console.log(error);
        }
    }

    handleBlame = async (index) => {
        try {
            let response = await axios.post("http://localhost:5001/blame",
                {
                    headers: {
                    },
                    params: {
                        group_id: this.challengeData.group_id,
                        cert_id: this.state.certificationData[index].c_id,
                        user_realid: this.userData.realId,
                        blamedUser_id: this.state.certificationData[index].id
                    }

                }
            );
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    today = new Date();
    year = this.today.getFullYear();
    month = this.today.getMonth() + 1;
    date = this.today.getDate();

    render() {
        console.log(this.state.certificationData)
        return (
            <div className="CertificationsPage">
                <TopBar />
                <div className="CertificationsContent">
                    <div className="InfoSection">
                        <h1>{this.challengeData.name}</h1>
                        <button onClick={() => { this.goBack2Challenge() }} className="GoBack2Challenge" >챌린지로</button>
                        <button onClick={() => { this.openConfirmPopUp() }} className="ConfirmButton" >인증하기</button>
                    </div>
                    <div className="CertificationsSection">
                        {
                            this.state.certificationData.map((current, index) => {
                                return (
                                    <CertificationCard
                                        img={current.photo}
                                        title={current.title}
                                        description={current.description}
                                        date={current.date}
                                        userName={current.account_name}
                                        blameClicked={() => { this.handleBlame(index) }}
                                        userId={current.id}
                                        lineHeight={1}
                                        validation={current.validation}
                                    />
                                )
                            })
                        }
                    </div>
                </div>
                <PopUp
                    isOpen={this.state.isConfirmOpen}
                    width={1000}
                    height={800}
                >
                    <div className="ConfirmPopUp">
                        <form encType="multipart/form-data" onSubmit={this.confirmSubmitHandler}>
                            <img className="ConfirmCloseBt" src={icon_close} onClick={() => { this.closeConfirmPopUp() }} />
                            <h1 className="Title">내인증</h1>
                            <img id="preview-confirmimage" src={preview_image} className="ConfirmImage" alt="인증이미지"></img>
                            <label for="confirm-input-file" className="ConfirmImgUpload">이미지 업로드<img src={icon_camera} /></label>
                            <input style={{ display: "none" }} id="confirm-input-file" type="file" name="file" file={this.state.file} value={this.state.fileName} onChange={this.handleConfirmFileChange} />
                            <div className="ConfirmTitleSection">
                                <label className="ConfirmTitle">인증 제목: </label>
                                <input required className="ConfirmTitleInput" type="text" name="confirmTitle" onChange={this.onChangeInputHandler} />
                            </div>
                            <div className="ConfirmDescriptionSection">
                                <label className="ConfirmDescriptionTitle">인증 설명: </label>
                                <textarea required className="ConfirmDescriptionTextArea" type="text" name="confirmDescription" onChange={this.onChangeInputHandler} />
                            </div>
                            <div className="ConfirmDateSection">
                                <label className="ConfirmDateTitle">인증 날짜: </label>
                                <input className="ConfirmDateInput" type="text" value={this.year + '.' + this.month + '.' + this.date} readOnly />
                            </div>
                            <button className="SubmitConfirmBt" type="submit">생성하기</button>
                        </form>
                    </div>
                </PopUp>
            </div>
        );
    }
}

export default CertificationsPage;