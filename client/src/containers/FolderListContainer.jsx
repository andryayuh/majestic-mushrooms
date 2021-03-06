import { connect } from 'react-redux';
import { filterMessages, setFolders, setPage, setAreResults, setView } from '../actions';
import FolderList from '../components/FolderList.jsx';

const mapStateToProps = (state) => {
  return {
    messages: state.messages,
    folders: state.folders
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setFilteredMessages: (newMessages) => {
      dispatch(filterMessages(newMessages));
    },
    setPage: (page) => {
      dispatch(setPage(page));
    },
    setAreResults: (boolean) => {
      dispatch(setAreResults(boolean));
    },
    setNewView: (viewName) => {
      dispatch(setView(viewName));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FolderList);
