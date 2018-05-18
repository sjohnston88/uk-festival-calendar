import React, { Component } from "react";
import FestivalCard from "./FestivalCard";

class PhotoGrid extends Component {
  render() {
    return (
      <div className="photo-grid">
        {this.props.festivalData.map((festival, i) => (
          <FestivalCard {...this.props} key={i} i={i} festival={festival} />
        ))}
      </div>
    );
  }
}

export default PhotoGrid;
