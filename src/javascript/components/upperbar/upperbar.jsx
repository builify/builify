import React from 'react';
import classNames from '../../common/classnames';
import PreviewControls from './preview-controls';

export default function Upperbar () {
    return (
        <div className={classNames('upperbar')}>
            <PreviewControls />
        </div>
    );
}
