import React, { Component } from "react";
import "../../../resources/profile.scss";
import { connect } from "react-redux";
import { fetchUserProfile, updateUserProfile } from "../../../actions/user";
import { hasKey } from "../../utils/utils";
import SellVouchers from './SellVouchers';
import BoughtCarts from './BoughtCarts';
import EditProfileForm from './EditProfileForm';
import ProfileHeader from './ProfileHeader';
import Feedbacks from '../../Feedbacks';
import Spinner from '../../shared/Spinner';

class IndexProfilePage extends Component {
  constructor(props){
    super(props);

    this.state = {
      profileId: props.match.params.id,
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
  }
  
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
    if(!user.name || !user.address ){
      alert("Dữ liệu thông tin chưa đầy đủ !");
    }

    this.props.updateUserProfile(user.id,{
      phone_number : user.phone_number,
      address : user.address,
      name : user.name,
    })
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
    this.setState({initialTab}); 
  }

  renderTab = () => {
    switch(this.state.initialTab){
      case 1:
        return (<BoughtCarts 
          userId={parseInt(this.state.profileId, 10)}
          currentUserId={this.props.currentUser.id}
        />);
      case 2:
        return (<Feedbacks type='users' recordId={this.state.profileId} />)
      default:
        return <SellVouchers profileId={this.state.profileId}/>
    }
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
    if (!hasKey(dataUser))
      return (
        <div className="container">
          <div className="row">
            <Spinner />
          </div>
        </div>
      );
    const { initialTab, modal } = this.state;
    const { user } = dataUser;
    const { id } = this.props.currentUser;
    const isViewOnly =  (id) === user.id ? false : true; 
    return (
      <div className="container-profile">
        <ProfileHeader
          user={user}
          isViewOnly={isViewOnly}
          dataUser={dataUser}
          toggle={this.toggle}
        />

        <EditProfileForm 
          modal={modal} 
          user={user}
          options={this.state}
          toggle={this.toggle}
          handleChange={this.handleChange}
          _onSubmitHandler={this._onSubmitHandler}
        />

        <div className="col-md-12 text-center">
          <div className="bottom-profile">
            <h3 className="text-title">Tin đăng cá nhân</h3>
            <div className="container-content-bottom">
              <div className="header-content-bottom">
                <div className={`item-header-content-bottom ${
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
                    initialTab === 1 ? "active" : ""
                  }`}
                  onClick={() => {
                    this.handleChangeTab({ initialTab: 1 });
                  }}
                >
                  Đã mua ({dataUser.total_voucher_boughts})
                </div>

                <div
                  className={`item-header-content-bottom ${
                    initialTab === 2 ? "active" : ""
                  }`}
                  onClick={() => {
                    this.handleChangeTab({ initialTab: 2 });
                  }}
                >
                  Feedbacks({dataUser.user.number_of_feedbacks})
                </div>
              </div>
              <div className="content-bottom">
                {this.renderTab() }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.users.currentUser,
  dataUser: state.users.dataUser,
  resultUpdate: state.users.resultUpdate,
  vouchers: state.vouchers.all
});
const mapDispatchToProps = dispatch => {
  return {
    fetchUserProfile: id => dispatch(fetchUserProfile(id)),
    updateUserProfile: (id,data) => dispatch(updateUserProfile(id,data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IndexProfilePage);
