import { connect } from 'react-redux';

import { getTags } from '../store/selectors';
import { checkApi, loadTags } from '../store/actions';

const mapStateToProps = state => ({
  tags: getTags(state),
});

const mapDispatchToProps = {
  loadTags,
  checkApi,
};

export default connect(mapStateToProps, mapDispatchToProps);
