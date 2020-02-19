import React, { Fragment } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { withSnackbar } from "notistack";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import * as actions from "../../store/actions";
import SearchIcon from "@material-ui/icons/Search";
import MenuItem from "@material-ui/core/MenuItem";
import Collapse from "@material-ui/core/Collapse";

import "./Filters.css";
import { getTags } from "../../store/selectors";



const Filters = props => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = e => {
    e.preventDefault();
    setExpanded(!expanded);
  };

  const { handleSubmit } = useForm({});

  console.log(props);

  const onSubmit = (data, e) => {
    e.preventDefault();

    console.log("DATA", data);
    
  };

  const currencies = [
    {
      value: "USD",
      label: "$"
    },
    {
      value: "EUR",
      label: "€"
    },
    {
      value: "BTC",
      label: "฿"
    },
    {
      value: "JPY",
      label: "¥"
    }
  ];
  const [currency, setCurrency] = React.useState("EUR");
  const handleChange = event => {
    setCurrency(event.target.value);
  };

  return (
    <Fragment>
      <div className="filters-container">
        <form className="filters-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="search-wrapper">
            <TextField
              className="search-bar"
              autoFocus
              variant="outlined"
              id="search"
              name="search"
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              className="btn-accent search-submit"
            >
              <SearchIcon />
            </Button>
          </div>
          <div className="filters-wrapper">
            <Button
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              Filters
            </Button>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <Fragment>
                <div className="price-filter-wrapper">
                  <TextField
                    id="outlined-basic"
                    label="Min price"
                    variant="outlined"
                    className="price-filter"
                  />
                  <TextField
                    id="outlined-basic"
                    label="Max price"
                    variant="outlined"
                    className="price-filter"
                  />
                </div>


                <div className="select-filter-wrapper">
                  <TextField
                    id="tags"
                    select
                    label="Tags"
                    value={currency}
                    onChange={handleChange}
                    variant="outlined"
                    className="select-filter"
                  >
                    {currencies.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    id="for-sale"
                    select
                    label="For sale"
                    value={currency}
                    onChange={handleChange}
                    variant="outlined"
                    className="select-filter"
                  >
                    {currencies.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <Button
              type="submit"
              variant="contained"
              className="btn-accent search-submit"
            >
              Apply filters
            </Button>
                </div>
              </Fragment>
            </Collapse>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    tags: getTags(state),
    // forSale: getForSale(state),
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onGetTags: () =>
      dispatch(actions.getTags()),
    // onGetForSale: () =>
    //   dispatch(actions.getForSale()),

  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(Filters));
