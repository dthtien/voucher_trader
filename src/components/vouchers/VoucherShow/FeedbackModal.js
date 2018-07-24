import React, { Component } from 'react';
import { Container, Button, Modal, ModalBody, ModalHeader } from 'mdbreact';
import TextFieldGroup from '../../shared/TextFieldGroup';
import Rating from 'react-rating';

class FeedbackModal extends Component {
  render() {
    const {
      modal, options, toggle, _onRatingHandler, onChange, onRatingChange
    } = this.props;
    return (
      <Container>
        <Modal isOpen={modal.isOpen} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
           {
             modal.type === 'rate' 
             ? 'Đánh giá của bạn'
             : modal.type === 'notice'
             ? 'Thông báo' : null 
           } 
          </ModalHeader>
          <ModalBody>
            {
              options.messageModal && 
              <h3 style={{color: 'red'}}>{options.messageModal}</h3>
            }
            {  modal.type === 'rate' &&
              <div>
                <Rating
                  initialRating={options.ratingValue}
                  emptySymbol="fa fa-star-o fa-2x text-warning"
                  fullSymbol="fa fa-star fa-2x text-warning"
                  fractions={2}
                  onChange={onRatingChange}
                />
                <TextFieldGroup 
                  type='text'
                  name='rating_note'
                  value={options.rating_note}
                  handleChange={onChange.bind(this)}
                  label="Ý kiến đánh giá"
                  onChange={onChange}
                />
              </div>
            }
          </ModalBody>
          <div>
            <Button color="danger" onClick={toggle}>Đóng</Button>
            {
              modal.type === 'rate' &&
              <Button color="success" onClick={_onRatingHandler}>Đánh giá</Button>
            }
          </div>
        </Modal>
      </Container>
    );
  }
}

export default FeedbackModal;
