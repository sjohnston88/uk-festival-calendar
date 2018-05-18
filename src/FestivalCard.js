import React, { Component } from "react";
import FlatButton from "material-ui/FlatButton";
import moment from "moment";
import {
  Card,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText,
  CardActions
} from "material-ui/Card";

class FestivalCard extends Component {
  render() {
    return (
      <div className="grid-figure">
        <Card className="grid-photo">
          <CardHeader
            title={this.props.festival.eventname}
            subtitle={this.props.festival.venue.town}
            avatar={this.props.festival.imageurl}
          />
          <CardMedia>
            <img src={this.props.festival.largeimageurl} alt="" />
          </CardMedia>
          <CardTitle
            title={`${moment(this.props.festival.startdatet).format(
              "MMM Do"
            )} - ${moment(this.props.festival.enddate).format("MMM Do")}`}
            subtitle={this.props.festival.entryprice}
          />
          <CardText
            style={{
              paddingTop: 0
            }}
          >
            {this.props.festival.description}
          </CardText>
          <CardActions>
            <FlatButton
              primary={true}
              label="More Information &raquo;"
              href={this.props.festival.link}
              target="_blank"
            />
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default FestivalCard;
