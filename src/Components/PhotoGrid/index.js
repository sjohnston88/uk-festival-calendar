import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import FestivalCard from "../FestivalCard";
import styles from "./styles";

class PhotoGrid extends Component {
  render() {
    return (
      <Grid container className={this.props.classes.root} spacing={24}>
        <Grid item xs={12}>
          <Grid
            container
            justify="center"
            className={this.props.classes.demo}
            spacing={24}
          >
            {this.props.festivalData.map((festival, i) => (
              <Grid key={i} item>
                <FestivalCard festival={festival} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

PhotoGrid.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PhotoGrid);
