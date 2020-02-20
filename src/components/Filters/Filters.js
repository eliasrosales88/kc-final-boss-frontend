import React, { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { withSnackbar } from "notistack";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import * as actions from "../../store/actions";
import SearchIcon from "@material-ui/icons/Search";
import MenuItem from "@material-ui/core/MenuItem";
import Collapse from "@material-ui/core/Collapse";

import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core/styles";

import "./Filters.css";
import { getTags } from "../../store/selectors";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    padding: theme.spacing(0.5)
  },
  chip: {
    margin: theme.spacing(0.5)
  }
}));

const Filters = props => {
  const { defaultGetAdvertsParams, onGetAdverts } = props;
  const [expanded, setExpanded] = useState(false);
  const [tag, setTag] = useState("");

  const handleExpandClick = e => {
    e.preventDefault();
    setExpanded(!expanded);
  };

  const { register, handleSubmit } = useForm({});

  const classes = useStyles();
  const [chipData, setChipData] = useState([]);

  const getTagNames = chipData.map(chip => (chip.label));

  const handleChipDelete = chipToDelete => () => {
    setChipData(chips => chips.filter(chip => chip.key !== chipToDelete.key));
  };

  const handleChipCreate = chipToCreate => {
    const { value } = chipToCreate.target;
    setTag(value);
    let chipValue = value;

    if (chipValue.includes(", ")) {
      setTag("");
      setChipData(() => {
        return [
          ...chipData,
          {
            key: chipData.length++,
            label: chipValue.replace(", ", "")
          }
        ];
      });
    }
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
  const [currency, setCurrency] = useState("EUR");
  const handleSelectChange = event => {
    setCurrency(event.target.value);
  };

  const onSubmit = (data, e) => {
    e.preventDefault();
    console.log("DATA", data);
    
    let name = data.search;
    let minPrice = data.minPrice;
    let maxPrice = data.maxPrice;
    let price = `${minPrice}-${maxPrice}`;
    let tags = getTagNames;
    console.log("TAGS", tags);

    onGetAdverts({
      ...defaultGetAdvertsParams,
      name,
      price,
      tags
    });
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
              inputRef={register()}
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
                    name="minPrice"
                    variant="outlined"
                    className="price-filter"
                    inputRef={register()}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Max price"
                    name="maxPrice"
                    variant="outlined"
                    className="price-filter"
                    inputRef={register()}
                  />
                </div>
                <div className="tag-filter-wrapper">
                  <TextField
                    id="tags"
                    label="Add Tags"
                    onChange={handleChipCreate}
                    value={tag}
                    variant="outlined"
                    className="tag-filter"
                    helperText=""
                  ></TextField>
                </div>
                <p className="tag-filter-helper">
                  Write down your tags separating them with a comma and space ',
                  '
                </p>
                <div className="filters-tag-chips">
                  {chipData.map(data => {
                    let icon;
                    return (
                      <Chip
                        key={data.key}
                        icon={icon}
                        label={data.label}
                        onDelete={
                          data.label === "React"
                            ? undefined
                            : handleChipDelete(data)
                        }
                        className={classes.chip}
                      />
                    );
                  })}
                </div>
                <div className="select-filter-wrapper">
                  <TextField
                    id="for-sale"
                    select
                    label="For sale"
                    value={currency}
                    onChange={handleSelectChange}
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
    tags: getTags(state)
    // forSale: getForSale(state),
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onGetAdverts: params => dispatch(actions.getAdverts(params))
    // onGetTags: () =>
    //   dispatch(actions.getTags()),
    // onGetForSale: () =>
    //   dispatch(actions.getForSale()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(Filters));
