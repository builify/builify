import React from 'react';
import { connect } from 'react-redux';
import { SimpleSelect, HighlightedText } from 'react-selectize';
import _ from 'lodash';

class FontSelection extends React.Component {
  shouldComponentUpdate () {
    return false;
  }

  render () {
    const { builderConfiguration } = this.props;
    const { fontsList } = builderConfiguration;
    let { categories, fonts } = fontsList;

    return (
      <SimpleSelect
        groups={categories}
        options={_.take(fonts, 50)}
        placeholder='Select a font'
        renderNoResultsFound = {function(value, search){
                return <div className="no-results-found" style={{fontSize: 13}}>
                    {typeof self.req == "undefined" && self.state.search.length == 0 ?
                    "type a few characters to kick off remote search":"No results found"}
                </div>
            }} />
    );
  }
}

function mapStateToProps (state) {
  return {
    builderConfiguration: state.builderConfiguration
  };
}

export default connect(mapStateToProps)(FontSelection);

/*import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setFont } from '../../Actions';
import { getString } from '../../Common/Localization';
import _ from 'lodash';
import Select from 'react-select';

class FontSelection extends Component {
  render () {
    const { onSetFont, item, builderConfiguration, template } = this.props;
    const { fonts } = builderConfiguration;
    let fontsOptions = null;
    let value = null;
    let itemLabel = item.label.split('.');
    let labelName = itemLabel[itemLabel.length - 1];

    labelName = template.design.typography.fonts[labelName];
    value = labelName !== 'undefined' ? labelName : '';

    if (_.has(builderConfiguration, 'fonts')) {
      fontsOptions = [...fonts];
    }

    return (
      <div className='ab-select'>
        <h3 className='ab-select__name'>
          <span>{getString(item.label)}</span>
        </h3>
        <Select
          name={'sdsd'}
          value={value}
          options={fontsOptions}
          onChange={newValue => {
            return onSetFont(newValue);
          }} />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    builderConfiguration: state.builderConfiguration,
    template: state.template
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onSetFont: font => {
      dispatch(setFont(font));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FontSelection);
*/
