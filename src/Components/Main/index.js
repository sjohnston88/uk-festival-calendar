import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Header from "../Header";
import PhotoGrid from "../PhotoGrid";
import Pagination from "../Pagination";
import axios from "axios";
import moment from "moment";
import styles from "./styles";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      siteName: "UK Festival Calendar",
      fetchOffset: 0,
      festivalData: [],
      totalResults: 0,
      NumberOfPagesToShow: 6,
      pageTotal: 0
    };
    this.getFestivals = this.getFestivals.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  async getFestivals(offset) {
    let apiKey = process.env.REACT_APP_SKIDDLE_API_KEY;
    try {
      let festivals = await axios.get(
        `http://www.skiddle.com/api/v1/events/search/?api_key=${apiKey}=&minDate${moment().format(
          "YYYY-MM-DD"
        )}&maxDate=${moment().year()}-12-31&description=true&country=GB&eventcode=FEST&limit=20&offset=${
          offset ? offset : 0
        }`
      );
      console.log(festivals);
      return festivals;
    } catch (error) {
      console.error(error);
    }
  }

  async componentDidMount() {
    let festivalData = await this.getFestivals();
    let totalPages = Math.ceil(festivalData.data.totalcount / 20) - 1;
    this.setState({
      festivalData: festivalData.data.results,
      totalResults: festivalData.data.totalcount,
      pageTotal: totalPages
    });
  }

  async handlePageChange(currentPage) {
    let offset = 20 * currentPage;
    let festivalData = await this.getFestivals(offset);
    this.setState({
      currentPage,
      offset,
      festivalData: festivalData.data.results
    });
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div>
        <Header siteName={this.state.siteName} />
        <div className={this.props.classes.wrapper}>
          <Pagination
            total={this.state.pageTotal}
            current={this.state.currentPage}
            display={this.state.NumberOfPagesToShow}
            onChange={this.handlePageChange}
          />
          <PhotoGrid festivalData={this.state.festivalData} />
          <Pagination
            total={this.state.pageTotal}
            current={this.state.currentPage}
            display={this.state.NumberOfPagesToShow}
            onChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Main);
