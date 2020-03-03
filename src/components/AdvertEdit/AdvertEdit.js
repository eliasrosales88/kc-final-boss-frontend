import React, { Fragment, useState, useEffect, useCallback } from "react";
import { getSession, getAdvert, getToken, getUi } from "../../store/selectors";
import * as actions from "../../store/actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Button, TextField, MenuItem, Chip } from "@material-ui/core";
import "./AdvertEdit.css";
import { useForm } from "react-hook-form";
import { withSnackbar } from "notistack";

const AdvertEdit = props => {
  const { register, handleSubmit, errors } = useForm({});
  //---------------------------------------------------------------------
  //---------------------------------------------------------------------

  const load = useCallback(() => {
    if (props.advert.name === undefined) {
      props.onGetAdvert(props.match.params.id, props.token);
      
    }
    if (props.advert.tags !== undefined) {
      setChipData([...props.advert.tags.map((tag, i)=>({key:i, label:tag}))]);
    }
    if (props.advert.forSale !== undefined) {
      setAdvert({...props.advert})
    }
  }, [props]);


  const notify = useCallback(() => {
    if (props.ui.notification) {
      props.enqueueSnackbar("Advert updated", {
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
        variant: "success",
        autoHideDuration: 1500
      });
    }else if(props.ui.notification !== undefined && !props.ui.notification ) {
      props.enqueueSnackbar("Something went wrong", {
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
        variant: "error",
        autoHideDuration: 1500
      });
    }
  }, [props]);
  useEffect(() => {
    load();
    notify();
  }, [load, notify]);

  const handleSelectChange = event => {
    setAdvert({ ...advert, forSale: event.target.value });
  };

  const onSubmit = (data, e) => {
    e.preventDefault();
    let dataToSend = {};
    dataToSend._id = props.match.params.id;
    dataToSend.name = advert.name;
    dataToSend.price = advert.price;
    dataToSend.description = advert.description;
    dataToSend.forSale = advert.forSale;
    dataToSend.tags = chipData.map(chip => chip.label);
    dataToSend.updatedAt = new Date().toISOString();

    if (selectedFile !== null) {
      dataToSend.photo = selectedFile;
    }

    dataToSend = buildFormData(dataToSend);

    props.onUpdateAdvert(
      { body: dataToSend, headers: { "Content-Type": "multipart/form-data" } },
      props.token
    );
  };

  const buildFormData = object => {
    const formData = new FormData();
    for (const key in object) {
      if (object.hasOwnProperty(key)) {
        const element = object[key];

        formData.append(key, element);
      }
    }
    return formData;
  };

  const handleChipDelete = chipToDelete => () => {
    let chips = chipData.filter(chip => chip.key !== chipToDelete.key);
    setChipData([...chips]);
  };

  const handleChipCreate = chipToCreate => {
    const { value } = chipToCreate.target;
    setTag(value);
    let chipValue = value;

    if (chipValue.includes(", ")) {
      let chips = chipData;
      setTag("");
      setChipData([
        ...chipData,
        {
          key: chips.length,
          label: chipValue.replace(", ", "")
        }
      ]);
    }
  };

  const handlePhoto = eventPhoto => {
    if (eventPhoto) {
      setSelectedFile(eventPhoto.target.files[0]);
    }
  };

  const handleTextChange = event => {
    const { name, value } = event.target;
    setAdvert({ ...advert, [name]: value });
  };
  //---------------------------------------------------------------------
  //---------------------------------------------------------------------

  const [advert, setAdvert] = useState({
    name: "",
    price: "",
    description: "",
    forSale: ""
  });
  const forSaleValues = ["true", "false"];
  const [chipData, setChipData] = useState([]);
  const [tag, setTag] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  return (
    <div>
      {props.advert.name !== undefined && (
        <div className="advert-edit-container">
          <div className="advert-edit-info">
            <h1>{advert.name === ''?props.advert.name : advert.name}</h1>
          </div>
          <form className="advert-edit-form" onSubmit={handleSubmit(onSubmit)}>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              name="name"
              label="Name"
              defaultValue={props.advert.name}
              onChange={handleTextChange}
              fullWidth
              error={!!errors.name}
              inputRef={register({ required: true, minLength: 8 })}
            />
            <p className="advert-edit-error-label">
              {errors.name &&
                "Add a longer name, should have at least 8 characters"}
            </p>
            <TextField
              margin="dense"
              id="price"
              name="price"
              label="Price"
              defaultValue={props.advert.price}
              onChange={handleTextChange}
              fullWidth
              error={!!errors.price}
              inputRef={register({
                validate: {
                  positive: value => parseInt(value, 10) > 0
                },
                required: true,
                pattern: /^[0-9]*$/gm
              })}
            />
            <p className="advert-edit-error-label">
              {errors.price && "Add a price. Only numbers"}
            </p>

            <TextField
              id="description"
              label="Description"
              placeholder="Write your description"
              multiline
              margin="dense"
              name="description"
              defaultValue={props.advert.description}
              onChange={handleTextChange}
              fullWidth
              error={!!errors.description}
              inputRef={register({ required: true, minLength: 12 })}
            />
            <p className="advert-edit-error-label">
              {errors.name &&
                "Add a longer description, should have at least 12 characters"}
            </p>
            <p>Current value: {`${advert.forSale === '' ? props.advert.forSale : advert.forSale}`}</p>
            <div className="advert-edit-forSale">
              <TextField
                id="forSale"
                select
                label="For sale"
                onChange={handleSelectChange}
                variant="outlined"
                className="select-filter"
                value={props.advert.forSale}
                name="forSale"
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
                value={props.advert.forSale}
              />
            </div>

            <Fragment>
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

              <p className="advert-edit-tag-helper">
                Write down your tags separating them with a comma and space ', '
              </p>
            </Fragment>

            <div className="advert-edit-tags">
              {chipData.length >= 1 &&
                chipData.map(data => {
                  let icon;
                  return (
                    <Chip
                      key={data.key}
                      icon={icon}
                      label={data.label}
                      onDelete={handleChipDelete(data)}
                    />
                  );
                })}
            </div>

            <input type="file" name="photo" onChange={handlePhoto} />
            <img
              className="advert-edit-photo"
              src={props.advert.photo}
              alt={props.advert.name}
            />
            <Button
              type="submit"
              variant="contained"
              className="advert-edit-button"
            >
              SAVE
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};



const mapStateToProps = state => {
  return {
    session: getSession(state),
    advert: getAdvert(state),
    token: getToken(state),
    ui: getUi(state)
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onUpdateAdvert: (data, token) =>
      dispatch(actions.updateAdvert(data, token)),
    onGetAdvert: (data, token) => dispatch(actions.getAdvert(data, token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withSnackbar(AdvertEdit)));
