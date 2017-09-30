import React from 'react';
import classNames from '../../../common/classnames';

export default function Copyright () {
    const version = `Builify v${process.env.VERSION}`;

    return (
        <div className={classNames('copyright')}>
            <h3>{ version }</h3>
            <h3>Copyright Trip-Trax 2015 - 2017</h3>
            <h3>All rights reserved</h3>
        </div>
    );
}
