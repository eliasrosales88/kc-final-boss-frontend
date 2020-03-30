import React, { Fragment, useState, useEffect, useCallback } from "react";
import { getSession, getAdvert, getToken, getUi } from "../../store/selectors";
import * as actions from "../../store/actions";
import { connect } from "react-redux";
import { Button, TextField, MenuItem, Chip, Divider } from "@material-ui/core";

import "./AdvertCreate.css";
import { useForm } from "react-hook-form";
import { withSnackbar } from "notistack";

const AdvertCreate = props => {
  const { register, handleSubmit, errors, reset } = useForm({});
  //---------------------------------------------------------------------
  //---------------------------------------------------------------------
  const handleSelectChange = event => {
    setAdvert({ ...advert, forSale: event.target.value });
  };

  const onSubmit = (data, e) => {
    e.preventDefault();

    let dataToSend = {};
    dataToSend.name = advert.name;
    dataToSend.price = advert.price;
    dataToSend.description = advert.description;
    dataToSend.forSale = advert.forSale;
    dataToSend.tags = chipData.map(chip => chip.label);
    dataToSend.createdAt = new Date().toISOString();
    dataToSend.updatedAt = new Date().toISOString();
    dataToSend.owner = props.session.username;

    if (selectedFile !== null) {
      dataToSend.photo = selectedFile;
    }

    dataToSend = buildFormData(dataToSend);

    props.onCreateAdvert(
      { body: dataToSend, headers: { "Content-Type": "multipart/form-data" } },
      props.token
    );

    clearForm();
  };

  const clearForm = () => {
    reset();
    setAdvert({
      name: "",
      price: "",
      description: "",
      forSale: "true"
    });
    setChipData([]);
    setTag("");
    setSelectedFile(null);
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

  const notify = useCallback(() => {
    if (props.ui.notification) {
      props.enqueueSnackbar("Advert created", {
        anchorOrigin: {
          vertical: "top",
          horizontal: "center"
        },
        variant: "success",
        autoHideDuration: 1500
      });
    } else if (props.ui.success !== undefined && !props.ui.success) {
      props.enqueueSnackbar("Something went wrong", {
        anchorOrigin: {
          vertical: "top",
          horizontal: "center"
        },
        variant: "error",
        autoHideDuration: 1500
      });
    }
  }, [props]);

  useEffect(() => {
    notify();
  }, [notify]);

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

  const [advert, setAdvert] = useState({ forSale: "true" });
  const forSaleValues = ["true", "false"];
  const [chipData, setChipData] = useState([]);
  const [tag, setTag] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  return (
    <div>
      <div className="advert-create-container">
        <form className="advert-create-form" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="name"
            label="Name"
            onChange={handleTextChange}
            fullWidth
            error={!!errors.name}
            inputRef={register({ required: true, minLength: 8 })}
          />
          <p className="advert-create-error-label">
            {errors.name &&
              "Add a longer name, should have at least 8 characters"}
          </p>
          <TextField
            margin="dense"
            id="price"
            name="price"
            label="Price"
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
          <p className="advert-create-error-label">
            {errors.price && "Add a price. Only numbers"}
          </p>
          <TextField
            id="description"
            label="Description"
            placeholder="Write your description"
            multiline
            margin="dense"
            name="description"
            onChange={handleTextChange}
            fullWidth
            error={!!errors.description}
            inputRef={register({ required: true, minLength: 12 })}
          />
          <p className="advert-create-error-label">
            {errors.name &&
              "Add a longer description, should have at least 12 characters"}
          </p>
          <div className="advert-create-forSale">
            <TextField
              id="forSale"
              select
              label="For sale"
              onChange={handleSelectChange}
              variant="outlined"
              className="select-filter"
              value={`${advert.forSale}`}
              defaultValue={forSaleValues[0]}
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
              value={advert.forSale}
            />
          </div>
          <Fragment>
            <div className="tag-filter-wrapper">
              <TextField
                id="tags"
                label="Add Tags"
                name="tags"
                onChange={handleChipCreate}
                value={tag}
                variant="outlined"
                className="tag-filter"
                helperText=""
              ></TextField>
            </div>

            <p className="tag-filter-helper">
              Write down your tags separating them with a comma and space ', '
            </p>
          </Fragment>
          <div className="filters-tag-chips">
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
          Required <br />
          <input required type="file" name="photo" onChange={handlePhoto} />
          <img src={advert.photo} alt={advert.name} />
          <Divider />
          <Button
            type="submit"
            variant="contained"
            className="advert-create-button"
          >
            SAVE
          </Button>
        </form>
      </div>
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
    onCreateAdvert: (data, token) => dispatch(actions.createAdvert(data, token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(AdvertCreate));
