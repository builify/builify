import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import _ from 'lodash';

export default class Icon extends Component {
  static propTypes = {
    onClick: PropTypes.func,
    icon: PropTypes.string.isRequired,
    size: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    style: PropTypes.object,
    className: PropTypes.string
  }

  static defaultProps = {
    onClick: () => {},
    size: 18,
    className: ''
  }

  mergeStyles (...args) {
    return _.assign({}, ...args);
  }

  renderGraphic () {
    switch (this.props.icon) {
      case 'clear':
        return (
          <g><path d="M19 6.41l-1.41-1.41-5.59 5.59-5.59-5.59-1.41 1.41 5.59 5.59-5.59 5.59 1.41 1.41 5.59-5.59 5.59 5.59 1.41-1.41-5.59-5.59z"></path></g>
        );

      case 'link':
        return (
          <g><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4v-1.9h-4c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9h-4c-1.71 0-3.1-1.39-3.1-3.1zm4.1 1h8v-2h-8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4v1.9h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"></path></g>
        );

      case 'star':
        return (
          <g><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></g>
        );

      case 'photo':
      case 'image':
        return (
          <g><path d="M21 19v-14c0-1.1-.9-2-2-2h-14c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zm-12.5-5.5l2.5 3.01 3.5-4.51 4.5 6h-14l3.5-4.5z"></path></g>
        );

      case 'settings':
        return (
          <g><path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65c-.03-.24-.24-.42-.49-.42h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zm-7.43 2.52c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"></path></g>
        );

      case 'remove-circle-outline':
        return (
          <g><path d="M7 11v2h10v-2h-10zm5-9c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path></g>
        );

      case 'remove':
      case 'close':
      case 'clear':
        return (
          <g><path d="M19 6.41l-1.41-1.41-5.59 5.59-5.59-5.59-1.41 1.41 5.59 5.59-5.59 5.59 1.41 1.41 5.59-5.59 5.59 5.59 1.41-1.41-5.59-5.59z"></path></g>
        );

      case 'format-indent-decrease':
        return (
          <g><path d="M11 17h10v-2h-10v2zm-8-5l4 4v-8l-4 4zm0 9h18v-2h-18v2zm0-18v2h18v-2h-18zm8 6h10v-2h-10v2zm0 4h10v-2h-10v2z"></path></g>
        );

      case 'format-indent-increase':
        return (
          <g><path d="M3 21h18v-2h-18v2zm0-13v8l4-4-4-4zm8 9h10v-2h-10v2zm-8-14v2h18v-2h-18zm8 6h10v-2h-10v2zm0 4h10v-2h-10v2z"></path></g>
        );

      case 'content-copy':
        return (
          <g><path d="M16 1h-12c-1.1 0-2 .9-2 2v14h2v-14h12v-2zm3 4h-11c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2v-14c0-1.1-.9-2-2-2zm0 16h-11v-14h11v14z"></path></g>
        );

      case 'format-paint':
        return (
          <g><path d="M18 4v-1c0-.55-.45-1-1-1h-12c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-1h1v4h-10v11c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-9h8v-8h-3z"></path></g>
        );

      case 'look':
      case 'eye':
        return (
          <g><path d="M12 4.5c-5 0-9.27 3.11-11 7.5 1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zm0 12.5c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"></path></g>
        );

      case 'file-download':
        return (
          <g><path d="M19 9h-4v-6h-6v6h-4l7 7 7-7zm-14 9v2h14v-2h-14z"></path></g>
        );

      case 'desktop':
        return (
          <g><path d="M21 2h-18c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7l-2 3v1h8v-1l-2-3h7c1.1 0 2-.9 2-2v-12c0-1.1-.9-2-2-2zm0 12h-18v-10h18v10z"></path></g>
        );

      case 'tablet':
        return (
          <g><path d="M18.5 0h-14c-1.38 0-2.5 1.12-2.5 2.5v19c0 1.38 1.12 2.5 2.5 2.5h14c1.38 0 2.5-1.12 2.5-2.5v-19c0-1.38-1.12-2.5-2.5-2.5zm-7 23c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm7.5-4h-15v-16h15v16z"></path></g>
        );

      case 'phone':
        return (
          <g><path d="M15.5 1h-8c-1.38 0-2.5 1.12-2.5 2.5v17c0 1.38 1.12 2.5 2.5 2.5h8c1.38 0 2.5-1.12 2.5-2.5v-17c0-1.38-1.12-2.5-2.5-2.5zm-4 21c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4.5-4h-9v-14h9v14z"></path></g>
        );

      case 'screen-rotation':
        return (
          <g><path d="M16.48 2.52c3.27 1.55 5.61 4.72 5.97 8.48h1.5c-.51-6.16-5.66-11-11.95-11l-.66.03 3.81 3.81 1.33-1.32zm-6.25-.77c-.59-.59-1.54-.59-2.12 0l-6.36 6.36c-.59.59-.59 1.54 0 2.12l12.02 12.02c.59.59 1.54.59 2.12 0l6.36-6.36c.59-.59.59-1.54 0-2.12l-12.02-12.02zm4.6 19.44l-12.02-12.02 6.36-6.36 12.02 12.02-6.36 6.36zm-7.31.29c-3.27-1.54-5.61-4.72-5.97-8.48h-1.5c.51 6.16 5.66 11 11.95 11l.66-.03-3.81-3.81-1.33 1.32z"></path></g>
        );

      case 'reorder':
        return (
          <g><path d="M3,15h18v-2H3V15z M3,19h18v-2H3V19z M3,11h18V9H3V11z M3,5v2h18V5H3z"></path></g>
        );

      case 'pencil':
      case 'create':
        return (
          <g><path d="M3 17.25v3.75h3.75l11.06-11.06-3.75-3.75-11.06 11.06zm17.71-10.21c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></g>
        );

      case 'restore':
        return (
          <g><path d="M14 12c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2zm-2-9c-4.97 0-9 4.03-9 9h-3l4 4 4-4h-3c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.51 0-2.91-.49-4.06-1.3l-1.42 1.44c1.52 1.16 3.42 1.86 5.48 1.86 4.97 0 9-4.03 9-9s-4.03-9-9-9z"></path></g>
        );

      case 'search':
        return (
          <g><path d="M15.5 14h-.79l-.28-.27c.98-1.14 1.57-2.62 1.57-4.23 0-3.59-2.91-6.5-6.5-6.5s-6.5 2.91-6.5 6.5 2.91 6.5 6.5 6.5c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99 1.49-1.49-4.99-5zm-6 0c-2.49 0-4.5-2.01-4.5-4.5s2.01-4.5 4.5-4.5 4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5z"></path></g>
        );
    }

    return null;
  }

  render () {
    const { className, size, style, onClick } = this.props;
    const cn = cx(className);
    let styles = {
      fill: 'currentcolor',
      width: size, // CSS instead of the width attr to support non-pixel units
      height: size // Prevents scaling issue in IE
    };

    return (
      <svg
        onClick={onClick}
        viewBox='0 0 24 24'
        preserveAspectRatio='xMidYMid meet'
        fit
        style={this.mergeStyles(
          styles,
          style // This lets the parent pass custom styles
        )}
        className={cn}>
          {this.renderGraphic()}
      </svg>
    );
  }
}
