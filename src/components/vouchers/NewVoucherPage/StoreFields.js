import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TextFieldGroup from '../../shared/TextFieldGroup';
import PlacesWithStandaloneSearchBox from '../../shared/PlacesWithStandaloneSearchBox';
import RegionSelect from '../../shared/RegionSelect';

class StoreFields extends Component {
  componentDidMount(){
    if(typeof this.props.getRegions === 'function'){
      this.props.getRegions()
    }
  }

  static propType = {
    fields: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired
  }

  renderMoreFields = () =>{
    if (this.props.fields.showStoreName) {
      return(
        <div className="mt-3 border-top-light">
          <TextFieldGroup 
            name='name'
            type="text"
            label="Tên địa điểm"
            value={this.props.fields.name}
            handleChange={this.props.handleChange}
            error={this.props.errors.name}
          />
          <h5 className="mt-3 mb-4">
            Them dia điểm áp dụng mã gỉam gía</h5>
            <RegionSelect 
              regions={this.props.regions}
              handleChange={this.props.handleRegionSelectChange} 
              approved_regions={this.props.approved_regions}
            />
        </div>
      );
    } else {
      return (<p className="text-primary">Mời bạn chọn địa điểm</p>)
    }
  }

  render() {
    return (
       <div className='col-md-6 offset-md-3'>
        <h4 className="mt-3 text-center font-weight-bold mb-4">
          Đia điểm áp dụng mã gỉam gía</h4>
        <form className="mt-4" onSubmit={this.props.handleSubmit.bind(this)}>
          <PlacesWithStandaloneSearchBox
            name='address'
            label="Chọn tên địa điểm áp dụng"
            loadingElement={<div style={{ height: `100%` }}/>}
            value={this.props.fields.address}
            handleAddressChanged={this.props.handleAddressChanged}
            handleChange={this.props.handleChange}
            error={this.props.errors.address}
          />
          {this.renderMoreFields()}
          <button className="btn btn-primary">Next Step</button>
        </form>
      </div>
    );
  }
}

export default StoreFields;