import React, { PureComponent, div } from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { usersActions, usersSelectors } from 'reduxResources/users';

import Styles from './index.scss';


class HomeContainer extends PureComponent {
  static propTypes = {
    requestUser: Proptypes.func.isRequired,
    users: Proptypes.array.isRequired,
  }
  componentDidMount() {
    this.props.requestUser();
  }

  render() {
    const { users, isLoading } = this.props;
    if (isLoading) {
      return (
        <div>isLoading</div>
      );
    }

    return (
      <div className={Styles.home}>
        {users && JSON.stringify(users)}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  users: usersSelectors.items,
  isLoading: usersSelectors.isLoadingItems,
});

const mapDispatchToProps = (dispatch) => {
  return {
    requestUser: () => {
      dispatch(usersActions.usersGetAllAjax({ url: 'https://reqres.in/api/users' }));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
