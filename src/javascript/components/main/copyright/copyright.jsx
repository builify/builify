import React from 'react';
import classNames from '../../../common/classnames';

export default function Copyright () {
    const version = `Builify v${process.env.VERSION}`;

    return (
        <div className={classNames('copyright')}>
            <h3>{ version }</h3>
            <h3><a href="http://genert.org/" target="_blank">Copyright Genert Org 2015 - present</a></h3>
            <h3>All rights reserved</h3>
        </div>
    );
}
