import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import Button from "@material-ui/core/Button";
import moment from "moment";
import styles from "./styles";

class FestivalCard extends Component {
  render() {
    return (
      <Card className={this.props.classes.card}>
        <CardHeader
          avatar={
            <Avatar
              alt={this.props.festival.eventname}
              src={this.props.festival.largeimageurl}
              className={this.props.classes.avatar}
            />
          }
          title={this.props.festival.eventname}
          subheader={`${moment(this.props.festival.startdatet).format(
            "MMM Do"
          )} - ${moment(this.props.festival.enddate).format("MMM Do")}`}
        />
        <CardMedia
          className={this.props.classes.media}
          image={this.props.festival.largeimageurl}
          title={this.props.festival.eventname}
          href={this.props.festival.link}
        />
        <CardContent>
          <Typography
            color="textSecondary"
            component="p"
            className={this.props.classes.prices}
          >
            {this.props.festival.entryprice}
          </Typography>
          <Typography component="p">
            {this.props.festival.description}
          </Typography>
        </CardContent>
        <CardActions
          className={this.props.classes.actions}
          disableActionSpacing
        >
          <Button
            href={this.props.festival.link}
            color="primary"
            target="_blank"
            size="small"
          >
            Learn More
          </Button>
          <div>
            <IconButton aria-label="Add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="Share">
              <ShareIcon />
            </IconButton>
          </div>
        </CardActions>
      </Card>
    );
  }
}

FestivalCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FestivalCard);
