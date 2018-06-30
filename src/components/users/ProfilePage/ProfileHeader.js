import React, { Component } from 'react';
import DefaultAvatar from "../../../resources/images/default_avatar.png";
import DefaultCover from "../../../resources/images/default_cover.png";
import { FormattedDate } from 'react-intl';
import Rating from 'react-rating';

class ProfileHeader extends Component {
  render() {
    const {user, isViewOnly, dataUser, toggle} = this.props;

    return (
      <div className='text-center'>
        <div className="top-profile">
          <img
            src={DefaultCover}
            alt="chovoucher"
          />
          </div>
          <div className="middle-profile">
            <div className="avatar">
              <img
                src={DefaultAvatar}
                className="img-avatar"
                alt="chovoucher"
              />
            </div>
            <div className="text-warning">
              <Rating
                initialRating={user.feedback_score}
                emptySymbol="fa fa-star-o fa-2x"
                fullSymbol="fa fa-star fa-2x"
                readonly={true}
              />
              ({user.number_of_feedbacks} đánh gía)
            </div>
            {
              !isViewOnly &&
              <div className="container-edit-profile">
                <div className="button-edit-profile" 
                onClick={()=>{
                    toggle({ type : 'edit_profile', ratingValue : 3.5 });
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
      </div>
    )
  }
}

export default ProfileHeader;
