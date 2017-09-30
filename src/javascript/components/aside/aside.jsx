import React from 'react';
import classNames from '../../common/classnames';
import Tab from './tab';
import BlockEditor from './block-editor';

export default function Aside () {
    return (
        <aside className={classNames('aside')}>
            <div className={classNames('aside__wrapper')}>
                <div className={classNames('aside__item')}>
                    <BlockEditor />
                    <Tab />
                </div>
            </div>
            </aside>
    );
}
