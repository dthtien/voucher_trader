import React, { Component } from "react";
import "../../../resources/profile.scss";
import { connect } from "react-redux";
import TextFieldGroup from "../../shared/TextFieldGroup";
import { fetchUserProfile } from "../../../actions/user";
import { Container, Button, Modal, ModalBody, ModalHeader } from "mdbreact";
import { hasKey } from "../../utils/utils";

class IndexProfilePage extends Component {
  state = {
    isOpenModal: false,
    rating_note: "",
    dataUser: {},
    initialTab: 0
  };
  toggle = () => {
    this.setState({
      isOpenModal: !this.state.isOpenModal
    });
  };
  handleChangeTab = ({initialTab}) =>{
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
  componentDidMount() {
    if (
      typeof this.props.currentUser === "undefined" ||
      !this.props.currentUser ||
      Object.keys(this.props.currentUser).length < 1
    ) {
      this.props.history.push("/login");
      return;
    }
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
  }

  render() {
    const { dataUser } = this.state;
    if (!hasKey(dataUser))
      return (
        <div className="container">
          <div className="row">
            <h3 className="text-title">Đang tải dữ liệu...</h3>
          </div>
        </div>
      );
    const { initialTab } = this.state;
    const { user } = dataUser;
    const { vouchers } = dataUser;
    return (
      <div className="container-profile">
        <Container>
          <Modal isOpen={this.state.isOpenModal} toggle={this.toggle}>
            <ModalHeader toggle={this.toggle}>Cập nhật tài khoản</ModalHeader>
            <ModalBody>
              <h3>Thông tin tài khoản</h3>
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
            </ModalBody>
            <div>
              <Button color="danger" onClick={this.toggle}>
                Hủy bỏ
              </Button>
              <Button color="success" onClick={()=>{
                console.log('datausser', this.state.dataUser)
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
            <div className="container-edit-profile">
              <div className="button-edit-profile" onClick={this.toggle}>
                <i className="material-icons">create</i>
              </div>
            </div>
            <h3 className="text-title">{user.name || ""}</h3>
            <div className="list-icon-provice">
              <span className="text-middle">Đã cung cấp</span>
              <span className="icon-item">
                <i className="material-icons fa-2x">store_mall_directory</i>
              </span>
              <span className="icon-item">
                <i className="material-icons fa-2x">store_mall_directory</i>
              </span>
              <span className="icon-item">
                <i className="material-icons fa-2x">store_mall_directory</i>
              </span>
              <span className="icon-item">
                <i className="material-icons fa-2x">store_mall_directory</i>
              </span>
            </div>
            <h3 className="text-middle">Ngày tham gia</h3>
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
                  Đang bán(0)
                </div>
                <div
                  className={`item-header-content-bottom ${
                    initialTab === 1 ? "active" : ""
                  }`}
                  onClick={() => {
                    this.handleChangeTab({ initialTab: 1 });
                  }}
                >
                  Đã bán (0)
                </div>
              </div>
              <div className="content-bottom">
                {hasKey(vouchers) ? (
                  vouchers.map((voucher, index) => (
                    <div key={"voucher" + index}>
                      <div>Điều kiện : {voucher.approved_condition || ""}</div>
                      <div>Ngày tạo : {voucher.date_start || ""}</div>
                      <div>Ngày hết hạn : {voucher.date_end || ""}</div>
                      <div>Hướng dẫn : {voucher.instruction || ""}</div>
                      <div>Số lượng : {voucher.quantity || ""}</div>
                      <div>Giá : {voucher.price || ""}</div>
                    </div>
                  ))
                ) : (
                  <div className="empty-data">
                    <h3>
                      Bạn chưa có tin đăng cá nhân nào đang bán thử đăng bán
                      ngay
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
    dataUser: state.users.dataUser
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchUserProfile: id => dispatch(fetchUserProfile(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IndexProfilePage);
