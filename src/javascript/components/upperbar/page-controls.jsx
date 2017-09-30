import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _map from 'lodash/map';
import _isObject from 'lodash/isobject';
import _size from 'lodash/size';
import classNames from '../../common/classnames';
import Dropdown from '../shared/dropdown';
import { loadPreviousPage, saveCurrentPage } from '../../actions';

class PageControls extends React.Component {
    static propTypes = {
        pages: PropTypes.array.isRequired,
        pageID: PropTypes.any.isRequired,
        loadPreviousPage: PropTypes.func.isRequired,
        saveCurrentPage: PropTypes.func.isRequired,
    };

    state = {
      pageID: null
    };

    _options = [];
    _dropdownHeight = [];

    shouldComponentUpdate () {
        return true;
    }

    componentWillMount () {
        this.updateOptions();
    }

    componentWillReceiveProps () {
        this.updateOptions();
    }

    changePage (pageID) {
        if (pageID === this.state.pageID) {
            return;
        }

        this.props.saveCurrentPage();

        this.setState({
            pageID,
        });

        return this.props.loadPreviousPage(pageID);
    }

    updateOptions () {
        const { pages, pageID } = this.props;
        const optionItemHeight = 30;
        let options = [];

        if (_size(pages) > 0) {
            _map(pages, (page) => {
                if (_isObject(page)) {
                    const { pageID, pageFileName } = page;

                    options.push({
                        text: pageFileName,
                        value: pageID,
                    });
                }
            });
        }

        this._options = options;
        this._dropdownHeight = optionItemHeight * options.length;

        if (pageID === null) {
            this.setState({
                pageID: null,
            });
        }
    }

    render () {
        return (
            <div className={classNames('upperbar__pcontrols')}>
                <Dropdown
                  options={this._options}
                  label="Select Page"
                  value={this.state.pageID}
                  previews={false}
                  onChange={::this.changePage}
                  height={this._dropdownHeight} />
            </div>
        );
    }
}

function mapStateToProps (state) {
    const { builder, page } = state;
    const { pages } = builder;
    const { pageID } = page;

    return {
        pages: pages,
        pageID: pageID,
    };
}

function mapDispatchToProps (dispatch) {
    return {
        loadPreviousPage: (page) => {
            dispatch(loadPreviousPage(page));
        },

        saveCurrentPage: () => {
            dispatch(saveCurrentPage());
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PageControls);
