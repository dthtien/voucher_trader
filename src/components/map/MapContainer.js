import React, { Component } from 'react'; 
import InitialMap from './InitialMap';

class MapCotainer extends Component {
  componentDidMount() {
    this.delayedShowMarker()
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true })
    }, 3000)
  }

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false })
    this.delayedShowMarker()
  }

  render() {
    return (
      <InitialMap
        onMarkerClick={this.handleMarkerClick}
      />
    )
  }
}