import React, { Component } from "react";
import "../../../resources/profile.scss";
import { connect } from "react-redux";
import TextFieldGroup from "../../shared/TextFieldGroup";
import { fetchUserProfile, updateUserProfile, fetchVoucherBoughts } from "../../../actions/user";
import Voucher from '../../vouchers/Voucher';
import SellerInfo from '../../vouchers/VoucherShow/SellerInfo';
import { Container, Button, Modal, ModalBody, ModalHeader, Badge } from "mdbreact";
import { hasKey } from "../../utils/utils";
import Rating from 'react-rating';
import SellVouchers from './SellVouchers';
import BoughtVouchers from './BoughtVouchers';
import { FormattedDate } from 'react-intl';

class IndexProfilePage extends Component {
  state = {
    isOpenModal: false,
    rating_note: "",
    dataUser: {},
    initialTab: 0,
    ratingValue : 3.5,
    voucher_boughts: [],
    modal : {
      isOpenModal: false,
      type: ''
    }
  };
  componentDidMount() {
    const { match } = this.props;
    if (typeof match !== "undefined" && typeof match.params !== "undefined") {
      this.props.fetchUserProfile(match.params.id);
    }
  }
  
  componentWillReceiveProps(nextProps) {
    if (
      typeof nextProps !== "undefined" &&
      nextProps !== this.props &&
      hasKey(nextProps.dataUser)
    ) {
      this.setState({ dataUser: nextProps.dataUser });
    }
    if(typeof nextProps.resultUpdate !== 'undefined'){
      this.setState({...this.state, resultUpdate : nextProps.resultUpdate});
    }
  }
  _onSubmitHandler = () => {
    const { dataUser } = this.state;
    if(!hasKey(dataUser)) return;
    const user = {...dataUser.user};
    if(!user.phone_number || !user.name || !user.address ){
      alert("Dữ liệu thông tin chưa đầy đủ !");
    }
    // return;
    this.props.updateUserProfile(user.id,{
      phone_number : user.phone_number,
      address : user.address,
      name : user.name,
    });
  }
  toggle = ({type, ratingValue}) => {
    this.setState({
      modal : {
        isOpenModal: !this.state.modal.isOpenModal,
        type,
        ratingValue : ratingValue || 3.5
      }
    });
  };
  handleChangeTab = ({initialTab}) =>{
    if(initialTab === 2){
      const { match } = this.props;
      let voucher_boughts = [];
      this.props.fetchVoucherBoughts(match.params.id).then(result => {
        if(result.data && result.data.vouchers){
          voucher_boughts = result.data.vouchers;
          console.log(voucher_boughts)
          this.setState({initialTab, voucher_boughts});
          return;
        }
      });
      
    }
    this.setState({initialTab});
    
  }
  handleChange = ({name, value}) =>{
    const dataUser = {...this.state.dataUser};
    const user = {...dataUser.user};
    if(name && typeof user[name] !== 'undefined'){
      user[name] = value;
    }
    this.setState({
      dataUser : {
        ...dataUser,
        user
      }
    });
  } 

  render() {
    const { dataUser } = this.state;
    console.log("dataUser", dataUser);
    if (!hasKey(dataUser))
      return (
        <div className="container">
          <div className="row">
            <h3 className="text-title">Đang tải dữ liệu...</h3>
          </div>
        </div>
      );
    const { initialTab, modal, voucher_boughts } = this.state;
    const { user } = dataUser;
    const { vouchers } = dataUser;
    const { id } = this.props.currentUser;
    const isViewOnly =  (id) === user.id ? false : true; 
    return (
      <div className="container-profile">
        <Container>
          <Modal isOpen={modal.isOpenModal} toggle={()=>{
           this.toggle({type : ''});
          }}>
            <ModalHeader toggle={()=>{ this.toggle({type : ''}) }}>
            {
              modal.type === 'rating' 
              ? `Đánh giá của bạn !`
              : (modal.type === 'edit_profile')
              ? 'Cập nhật tài khoản' : null
            }
            </ModalHeader>
            <ModalBody>
              {
                (this.state.resultUpdate === 'success' && modal.type === 'edit_profile') 
                ? <Badge badgeColor="success">Cập nhật thông tin thành công</Badge>
                : (this.state.resultUpdate === 'error' && modal.type === 'edit_profile')
                ? <Badge badgeColor="danger">Cập nhật thông tin thất bại !</Badge>
                : null   
              }
              {
                modal.type === 'rating' 
                ? <h3>Bạn đã đánh giá {this.state.ratingValue} sao !</h3>
                : (modal.type === 'edit_profile')
                ? <h3>Thông tin tài khoản</h3> : null
              }
              {
                (modal.type === 'edit_profile') 
                ?
                <div>
                  <TextFieldGroup
                    type="text"
                    name="name"
                    value={user.name || ""}
                    handleChange={e => {
                      this.handleChange({name : 'name', value: e.target.value});
                    }}
                    label="Tên"
                  />
                  <TextFieldGroup
                    type="text"
                    name="phone_number"
                    value={user.phone_number || ""}
                    handleChange={e => {
                      this.handleChange({name : 'phone_number', value: e.target.value});
                    }}
                    label="Số điện thoại"
                  />
                  <TextFieldGroup
                    type="text"
                    name="email"
                    value={user.email || ""}
                    handleChange={e => {
                      this.handleChange({name : 'email', value: e.target.value});
                    }}
                    label="Email"
                  />
                  <TextFieldGroup
                    type="text"
                    name="address"
                    value={user.address || ""}
                    handleChange={e => {
                      this.handleChange({name : 'address', value: e.target.value});
                    }}
                    label="Địa chỉ"
                  />
                </div> : 
                (modal.type === 'rating') ?
                <div>
                  <TextFieldGroup 
                    type='text'
                    name='rating_note'
                    value={this.state.rating_note}
                    handleChange={(e) =>{
                      const rating_note = e.target.value;
                      this.setState({ rating_note });
                    }}
                    label="Ý kiến đánh giá"
                  />
                </div> : null  
              }
            </ModalBody>
            <div>
              <Button color="danger" onClick={()=>{this.toggle({type : ''})}}>
                Hủy bỏ
              </Button>
              <Button color="success" onClick={()=>{
                this._onSubmitHandler();
              }}>Cập nhật</Button>
            </div>
          </Modal>
        </Container>
        <div className="col-md-12 text-center">
          <div className="top-profile">
            <img
              src="https://www.kvbkunlun.com/img/maps/img-maps-sydney-2.png"
              alt=""
            />
          </div>
          <div className="middle-profile">
            <div className="avatar">
              <img
                src="https://www.bowerplace.com.au/wp-content/themes/bridge-child/img/default_avatar_community.png"
                className="img-avatar"
                alt=""
              />
            </div>
            <div className="text-warning">
              <Rating
                initialRating={user.feedback_score}
                emptySymbol="fa fa-star-o fa-2x"
                fullSymbol="fa fa-star fa-2x"
                readonly={true}
              />
            </div>
            {
              !isViewOnly &&
              <div className="container-edit-profile">
                <div className="button-edit-profile" 
                onClick={()=>{
                    this.toggle({ type : 'edit_profile', ratingValue : 3.5 });
                  }
                }
                >
                  <i className="material-icons">create</i>
                </div>
              </div>
            }
            <h3 className="text-title">{user.name || ""}</h3>
            <h3 className="text-middle">
              Ngày tham gia: 
              <FormattedDate
                value={dataUser.user.created_at}
                className='ml-2'
                year='numeric'
                month='long'
                day='2-digit'
              />
            </h3>
          </div>
          <div className="bottom-profile">
            <h3 className="text-title">Tin đăng cá nhân</h3>
            <div className="container-content-bottom">
              <div className="header-content-bottom">
                <div
                  className={`item-header-content-bottom ${
                    initialTab === 0 ? "active" : ""
                  }`}
                  onClick={() => {
                    this.handleChangeTab({ initialTab: 0 });
                  }}
                >
                  Đang bán({dataUser.total_voucher_sells})
                </div>
               
                <div
                  className={`item-header-content-bottom ${
                    initialTab === 2 ? "active" : ""
                  }`}
                  onClick={() => {
                    this.handleChangeTab({ initialTab: 2 });
                  }}
                >
                  Đã mua ({dataUser.total_voucher_boughts})
                </div>
              </div>
              <div className="content-bottom">

                {(hasKey(vouchers) && initialTab === 0) ? 
                (
                  <SellVouchers vouchers={vouchers}/>
                ) 
                : (hasKey(voucher_boughts) && initialTab === 2) ? 
                (
                  <BoughtVouchers 
                    vouchers={voucher_boughts} 
                    userId={parseInt(this.props.match.params.id)}
                    currentUserId={this.props.currentUser.id}
                  />
                ) 
                :
                (
                  <div className="empty-data">
                    <h3>
                      Chưa có tin đăng nào
                    </h3>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.users.currentUser,
    dataUser: state.users.dataUser,
    resultUpdate: state.users.resultUpdate,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchUserProfile: id => dispatch(fetchUserProfile(id)),
    updateUserProfile: (id,data) => dispatch(updateUserProfile(id,data)),
    fetchVoucherBoughts: (id) => dispatch(fetchVoucherBoughts(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IndexProfilePage);
