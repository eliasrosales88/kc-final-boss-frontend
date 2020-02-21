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

import "./Filters.css";
import { getTags } from "../../store/selectors";


const Filters = props => {

  const { defaultGetAdvertsParams, onGetAdverts } = props;
  const [expanded, setExpanded] = useState(false);
  const [tag, setTag] = useState("");

  const handleExpandClick = e => {
    e.preventDefault();
    setExpanded(!expanded);
  };

  const { register, handleSubmit } = useForm({});




  /**
   * FORM TAG INPUT
   */
  const [chipData, setChipData] = useState([]);
  const getTagNames = chipData.map(chip => chip.label);
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




  /**
   * FORM FOR SALE SELECT
   */
  const forSaleValues = ["true", "false"];
  const [forSale, setForSale] = useState("true");
  const handleSelectChange = event => {
    setForSale(event.target.value);
  };



  /**
   * On submit form
   * @param {*} data Form data
   * @param {*} e event
   */
  const onSubmit = (data, e) => {
    e.preventDefault();
    let name = data.search;
    let minPrice = data.minPrice;
    let maxPrice = data.maxPrice;
    let price = `${minPrice}-${maxPrice}`;
    let tags = getTagNames;
    let forSale = data.forSale;


    /**
     * Call to action and filter Adverts
     */
    onGetAdverts({
      ...defaultGetAdvertsParams,
      name,
      price,
      tags,
      forSale
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
                      />
                    );
                  })}
                </div>
                <div className="select-filter-wrapper">
                  <TextField
                    id="forSale"
                    select
                    label="For sale"
                    value={forSale}
                    onChange={handleSelectChange}
                    variant="outlined"
                    className="select-filter"
                    name="forSale"
                    SelectProps={{
                      native: false,
                      name: "forSale"
                    }}
                    inputRef={register}
                  >
                    {forSaleValues.map((option, i) => (
                      <MenuItem key={i} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                  <input
                    type="hidden"
                    ref={register}
                    name="forSale"
                    value={forSale}
                  />
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
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onGetAdverts: params => dispatch(actions.getAdverts(params))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(Filters));
