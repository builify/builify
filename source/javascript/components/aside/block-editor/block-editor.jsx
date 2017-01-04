import React from 'react';
import classNames from '../../../common/classnames';
import localization from '../../../common/localization';
import Scrollbar from '../../shared/scrollbar';
import BackButton from '../back-button';
import BlockTitle from './block-title';
import PositionEditor from './edit-position';
import OpacitySlider from './opacity-editor';
import BorderRadiusEditor from './border-radius-editor';
import ItemMarginEditor from './margin-editor';
import ItemPaddingEditor from './padding-editor';
import TextAlignEditor from './text-align-editor';
import TextSpaceEditor from './text-spacing-editor';
import AttributesEditor from './attributes-editor';
import ColorsEditor from './colors-editor';
import { connect } from 'react-redux';
import { closeBlockEditorTab } from '../../../actions';

class BlockEditor extends React.Component {
  static propTypes = {
    blockEditorTabOpened: React.PropTypes.bool.isRequired,
    blockEditorTarget: React.PropTypes.any,
    closeBlockEditorTab: React.PropTypes.func.isRequired
  };

  shouldComponentUpdate (nextProps) {
    if (nextProps.blockEditorTabOpened !== this.props.blockEditorTabOpened ||
      !nextProps.blockEditorTarget.isSameNode(this.props.blockEditorTarget)) {
      return true;
    }

    return false;
  }
  
  render () {
    if (this.props.blockEditorTabOpened === false) {
      return null;
    }
    
    const { blockEditorTarget } = this.props;

    return (
      <div className={classNames(['tab', 'tab__blockeditor'])}>
        <Scrollbar aside innerPadding>
          <BackButton title={localization('close')} onClick={this.props.closeBlockEditorTab} />
          <h1 className={classNames('tab__title')}>
            <span>{ localization('editor') }</span>
            <span>{ localization('block') }</span>
          </h1>
          <div className={classNames(['be-block', 'be-block--first'])}>
            <BlockTitle title={localization('position')} />
            <PositionEditor target={blockEditorTarget} />
          </div>
          <div className={classNames('be-block')}>
            <BlockTitle title={localization('text')} />
            <TextAlignEditor target={blockEditorTarget} />
            <TextSpaceEditor target={blockEditorTarget} />
          </div>
          <div className={classNames('be-block')}>
            <BlockTitle title={localization('appearance')} />
            <OpacitySlider target={blockEditorTarget} />
            <BorderRadiusEditor target={blockEditorTarget} />
            <ItemMarginEditor target={blockEditorTarget} />
            <ItemPaddingEditor target={blockEditorTarget} />
            <ColorsEditor target={blockEditorTarget} />
          </div>
          <AttributesEditor target={blockEditorTarget} />
        </Scrollbar>
      </div>
    );
  }
}

function mapStateToProps (state) {
  const { builder } = state;
  const { blockEditorTabOpened, blockEditorTarget } = builder;

  return {
    blockEditorTabOpened: blockEditorTabOpened,
    blockEditorTarget: blockEditorTarget
  };
}

function mapDispatchToProps (dispatch) {
  return {
    closeBlockEditorTab: function () {
      dispatch(closeBlockEditorTab());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BlockEditor);
