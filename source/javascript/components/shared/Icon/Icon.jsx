import React from 'react';
import classNames from 'classnames';
import _assign from 'lodash/assign';

/*eslint-disable */
export default class Icon extends React.Component {
  static propTypes = {
    onClick: React.PropTypes.func,
    icon: React.PropTypes.string.isRequired,
    size: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ]),
    style: React.PropTypes.object,
    className: React.PropTypes.string
  };

  static defaultProps = {
    onClick: function () {},
    size: 18,
    className: ''
  };

  shouldComponentUpdate () {
    return false;
  }

  mergeStyles (...args) {
    return _assign({}, ...args);
  }

  renderGraphic () {
    switch (this.props.icon) {
      case 'swap-horiz':
        return (
          <g><path d="M6.99 11l-3.99 4 3.99 4v-3h7.01v-2h-7.01v-3zm14.01-2l-3.99-4v3h-7.01v2h7.01v3l3.99-4z"></path></g>
        );
        
      case 'format-line-spacing':
        return (
          <g><path d="M6 7h2.5l-3.5-3.5-3.5 3.5h2.5v10h-2.5l3.5 3.5 3.5-3.5h-2.5v-10zm4-2v2h12v-2h-12zm0 14h12v-2h-12v2zm0-6h12v-2h-12v2z"></path></g>
        );
        
      case 'format-align-right':
        return (
          <g><path d="M3 21h18v-2h-18v2zm6-4h12v-2h-12v2zm-6-4h18v-2h-18v2zm6-4h12v-2h-12v2zm-6-6v2h18v-2h-18z"></path></g>
        );

      case 'format-align-center':
        return (
          <g><path d="M7 15v2h10v-2h-10zm-4 6h18v-2h-18v2zm0-8h18v-2h-18v2zm4-6v2h10v-2h-10zm-4-4v2h18v-2h-18z"></path></g>
        );

      case 'format-align-left':
        return (
          <g><path d="M15 15h-12v2h12v-2zm0-8h-12v2h12v-2zm-12 6h18v-2h-18v2zm0 8h18v-2h-18v2zm0-18v2h18v-2h-18z"></path></g>
        );

      case 'crop-free':
        return (
          <g><path d="M3 5v4h2v-4h4v-2h-4c-1.1 0-2 .9-2 2zm2 10h-2v4c0 1.1.9 2 2 2h4v-2h-4v-4zm14 4h-4v2h4c1.1 0 2-.9 2-2v-4h-2v4zm0-16h-4v2h4v4h2v-4c0-1.1-.9-2-2-2z"></path></g>
        );

      case 'crop-din':
        return (
          <g><path d="M19 3h-14c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-14c0-1.1-.9-2-2-2zm0 16h-14v-14h14v14z"></path></g>
        );

      case 'rotate-right':
        return (
          <g><path d="M15.55 5.55l-4.55-4.55v3.07c-3.94.49-7 3.85-7 7.93s3.05 7.44 7 7.93v-2.02c-2.84-.48-5-2.94-5-5.91s2.16-5.43 5-5.91v3.91l4.55-4.45zm4.38 5.45c-.17-1.39-.72-2.73-1.62-3.89l-1.42 1.42c.54.75.88 1.6 1.02 2.47h2.02zm-6.93 6.9v2.02c1.39-.17 2.74-.71 3.9-1.61l-1.44-1.44c-.75.54-1.59.89-2.46 1.03zm3.89-2.42l1.42 1.41c.9-1.16 1.45-2.5 1.62-3.89h-2.02c-.14.87-.48 1.72-1.02 2.48z"></path></g>
        );
        
      case 'youtube':
        return (
          <g><path d="M20 2h-16c-1.1 0-1.99.9-1.99 2l-.01 16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-16c0-1.1-.9-2-2-2zm-1.49 15.5c-.45.15-3.73.5-6.51.5-2.77 0-6.05-.35-6.5-.5-1.17-.39-1.5-2.8-1.5-5.5s.33-5.11 1.5-5.5c.45-.15 3.73-.5 6.5-.5 2.78 0 6.06.36 6.51.51 1.17.39 1.49 2.79 1.49 5.49s-.32 5.11-1.49 5.5zm-8.51-2l5.5-3.5-5.5-3.5v7z"></path></g>
        );

      case 'settings-applications':
        return (
          <g><path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm7-7h-14c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2v-14c0-1.1-.89-2-2-2zm-1.75 9c0 .23-.02.46-.05.68l1.48 1.16c.13.11.17.3.08.45l-1.4 2.42c-.09.15-.27.21-.43.15l-1.74-.7c-.36.28-.76.51-1.18.69l-.26 1.85c-.03.17-.18.3-.35.3h-2.8c-.17 0-.32-.13-.35-.29l-.26-1.85c-.43-.18-.82-.41-1.18-.69l-1.74.7c-.16.06-.34 0-.43-.15l-1.4-2.42c-.09-.15-.05-.34.08-.45l1.48-1.16c-.03-.23-.05-.46-.05-.69 0-.23.02-.46.05-.68l-1.48-1.16c-.13-.11-.17-.3-.08-.45l1.4-2.42c.09-.15.27-.21.43-.15l1.74.7c.36-.28.76-.51 1.18-.69l.26-1.85c.03-.17.18-.3.35-.3h2.8c.17 0 .32.13.35.29l.26 1.85c.43.18.82.41 1.18.69l1.74-.7c.16-.06.34 0 .43.15l1.4 2.42c.09.15.05.34-.08.45l-1.48 1.16c.03.23.05.46.05.69z"></path></g>
        );

      case 'format-paint':
        return (
          <g><path d="M18 4v-1c0-.55-.45-1-1-1h-12c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-1h1v4h-10v11c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-9h8v-8h-3z"></path></g>
        );

      case 'video-collection':
        return (
          <g><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8 12.5v-9l6 4.5-6 4.5z"></path></g>
        );

      case 'exposure-plus-1':
        return (
          <g><path d="M10 7h-2v4h-4v2h4v4h2v-4h4v-2h-4v-4zm10 11h-2v-10.62l-3 1.02v-1.7l4.7-1.7h.3v13z"></path></g>
        );

      case 'control-point-duplicate':
        return (
          <g><path d="M16 8h-2v3h-3v2h3v3h2v-3h3v-2h-3zm-14 4c0-2.79 1.64-5.2 4.01-6.32v-2.16c-3.49 1.24-6.01 4.57-6.01 8.48s2.52 7.24 6.01 8.48v-2.16c-2.37-1.12-4.01-3.53-4.01-6.32zm13-9c-4.96 0-9 4.04-9 9s4.04 9 9 9 9-4.04 9-9-4.04-9-9-9zm0 16c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7z"></path></g>
        );

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

      case 'expand-more':
        return (
          <g><path d="M16.59 8.59l-4.59 4.58-4.59-4.58-1.41 1.41 6 6 6-6z"></path></g>
        );

      case 'expand-less':
        return (
          <g><path d="M12 8l-6 6 1.41 1.41 4.59-4.58 4.59 4.58 1.41-1.41z"></path></g>
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

      case 'save':
        return (
          <g><path d="M17 3h-12c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-12l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10h-10v-4h10v4z"></path></g>
        );

      case 'chevron-right':
        return (
          <g><path d="M10 6l-1.41 1.41 4.58 4.59-4.58 4.59 1.41 1.41 6-6z"></path></g>
        );

      case 'chevron-left':
        return (
          <g><path d="M15.41 7.41l-1.41-1.41-6 6 6 6 1.41-1.41-4.58-4.59z"></path></g>
        );

      case 'arrow-back':
        return (
          <g><path d="M20 11h-12.17l5.59-5.59-1.42-1.41-8 8 8 8 1.41-1.41-5.58-5.59h12.17v-2z"></path></g>
        );

      case 'arrow-forward':
        return (
          <g><path d="M12 4l-1.41 1.41 5.58 5.59h-12.17v2h12.17l-5.58 5.59 1.41 1.41 8-8z"></path></g>
        );
    }

    return null;
  }

  render () {
    const { className, size, style, onClick } = this.props;
    const cn = classNames(className);
    const styles = {
      fill: 'currentcolor',
      width: `${size}px`, // CSS instead of the width attr to support non-pixel units
      height: `${size}px` // Prevents scaling issue in IE
    };

    return (
      <svg
        onClick={onClick}
        viewBox='0 0 24 24'
        preserveAspectRatio='xMidYMid meet'
        style={this.mergeStyles(
          styles,
          style // This lets the parent pass custom styles
        )}
        className={cn}>
        { this.renderGraphic() }
      </svg>
    );
  }
}
/*eslint-enable */
