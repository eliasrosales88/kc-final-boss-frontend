import { connect } from 'react-redux';

import {
  getAdverts,
  getNumAdverts,
  getNumPages,
  getAdvert,
} from '../store/selectors';
import {
  loadAdverts,
  searchAdverts,
  loadAdvert,
  createOrUpdateAdvert,
} from '../store/actions';

const mapStateToProps = (state, ownProps) => ({
  adverts: getAdverts(state),
  numAdverts: getNumAdverts(state),
  numPages: getNumPages(state),
  advert: getAdvert(state)(ownProps.match.params.id),
});

const mapDispatchToProps = {
  loadAdverts,
  searchAdverts,
  loadAdvert,
  createOrUpdateAdvert,
};

export default connect(mapStateToProps, mapDispatchToProps);
