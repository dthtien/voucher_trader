import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getFeedbacks } from '../../actions/feedback';
import Feedback from './Feedback';
import Spinner from '../shared/Spinner';

class Feedbacks extends Component{
  componentDidMount(){
    const {type, recordId} = this.props;
    this.props.getFeedbacks(type, recordId);
  }

  renderFeedbackList = () => {
    return this.props.feedbacks.map( feedback => {
      return (
        <Feedback 
          key={feedback.id}
          feedback={feedback} 
        />
      )
    });
  }

  render() {
    const {isLoading} = this.props;
    if (isLoading) {
      return <Spinner />
    } else {
      return (
        this.renderFeedbackList()
      );
    }
  }
}
const mapStateToProps = (state) =>({
  feedbacks: state.feedbacks.all,
  isLoading: state.feedbacks.isLoading
})

export default connect(mapStateToProps, {getFeedbacks})(Feedbacks);
