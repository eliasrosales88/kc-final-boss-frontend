import { connect } from 'react-redux';

import { getUi } from '../store/selectors';

export default connect(getUi);
