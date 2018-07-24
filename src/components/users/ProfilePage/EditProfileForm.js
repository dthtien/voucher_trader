import React, { Component } from 'react';
import { Container, Button, Modal, ModalBody, ModalHeader, Badge } from "mdbreact";
import TextFieldGroup from "../../shared/TextFieldGroup";

class EditProfileForm extends Component {
  render() {
    const { modal, user, options, toggle, handleChange, _onSubmitHandler } = this.props;
    return (
      <Container>
        <Modal 
          isOpen={modal.isOpenModal} 
          toggle={()=>{
            toggle({type : ''});
          }}
        >
          <ModalHeader toggle={()=>{ toggle({type : ''}) }}>
            Cập nhật tài khoản
          </ModalHeader>
          <ModalBody>
            {
              (options.resultUpdate) ?
              (
                (options.resultUpdate === 'success')
                 ? <Badge badgecolor="success">Cập nhật thông tin thành công</Badge>
                 : <Badge badgecolor="danger">
                     Cập nhật thông tin thất bại !
                   </Badge>
              ) 
              : null
            }
            <h3>Thông tin tài khoản</h3>
            <div>
              <TextFieldGroup
                type="text"
                name="name"
                value={user.name || ""}
                handleChange={e => {
                  handleChange({name : 'name', value: e.target.value});
                }}
                label="Tên"
              />
              <TextFieldGroup
                type="text"
                name="phone_number"
                value={user.phone_number || ""}
                handleChange={e => {return;}}
                label="Số điện thoại"
              />
              <TextFieldGroup
                type="text"
                name="email"
                value={user.email || ""}
                handleChange={e => {return;}}
                label="Email"
              />
              <TextFieldGroup
                type="text"
                name="address"
                value={user.address || ""}
                handleChange={e => {
                  handleChange({name : 'address', value: e.target.value});
                }}
                label="Địa chỉ"
              />
            </div>
          </ModalBody>
          <div>
            <Button color="danger" onClick={()=>{toggle({type : ''})}}>
              Hủy bỏ
            </Button>
            <Button color="success" 
              onClick={()=>{
                _onSubmitHandler();
            }}>Cập nhật</Button>
          </div>
        </Modal>
      </Container>
    );
  }
}

export default EditProfileForm;
