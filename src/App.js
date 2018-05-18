import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import SearchBar from "material-ui-search-bar";
import Pagination from "material-ui-pagination";
import PhotoGrid from "./PhotoGrid";
import AppBar from "material-ui/AppBar";
import axios from "axios";
import moment from "moment";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      siteName: "UK Festival Calendar",
      fetchOffset: 0,
      festivalData: [],
      totalResults: 0,
      NumberOfPagesToShow: 10,
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
    let totalPages = Math.ceil(festivalData.data.totalcount / 20);
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
      <MuiThemeProvider>
        <AppBar title={this.state.siteName} showMenuIconButton={false} />
        <SearchBar
          placeholder="Search by Postcode"
          dataSource={this.state.festivalData}
          onChange={value => console.log(value)}
          onRequestSearch={() => console.log("onRequestSearch")}
          style={{
            margin: "50px auto",
            maxWidth: 800
          }}
        />
        <Pagination
          styleRoot={{ margin: "50px auto", width: "fit-content" }}
          total={this.state.pageTotal}
          current={this.state.currentPage}
          display={this.state.NumberOfPagesToShow}
          onChange={currentPage => this.handlePageChange(currentPage)}
        />
        <PhotoGrid festivalData={this.state.festivalData} />
        <Pagination
          styleRoot={{ margin: "50px auto", width: "fit-content" }}
          total={this.state.pageTotal}
          current={this.state.currentPage}
          display={this.state.NumberOfPagesToShow}
          onChange={currentPage => this.handlePageChange(currentPage)}
        />
      </MuiThemeProvider>
    );
  }
}

export default App;
