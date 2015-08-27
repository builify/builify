export default function proccessChildrenData (data) {
  let childrenToRender = [];

  if (!data) {
    throw Error('No data defined.');
  }

  if (data.hasOwnProperty('children')) {
    const { children } = data;
    let childrenLength = children.length;

    if (childrenLength !== 0) {
      for (let i = 0; i < childrenLength; i++) {
        let currentChildren = children[i];
        let currentChildrenType = null;
          
        if (currentChildren.hasOwnProperty('type')) {
          currentChildrenType = currentChildren.type;
        } else {
          throw Error('Tab children does not have type defined.');
        }

        let splitCurrentChildrenType = currentChildrenType.split('.');

        let typeName = splitCurrentChildrenType.length !== 0 ? 
          splitCurrentChildrenType[0] : currentChildrenType.substr(0, currentChildrenType.indexOf('.'));

        switch (typeName) {
          case 'block':
            let blockType = splitCurrentChildrenType[1];

            if (blockType === 'title') {
              let { title } = currentChildren;
              let titleBlock = {
                type: 'title',
                text: title
              };

              childrenToRender.push(titleBlock);
            } else if (blockType === 'colors') {
              if (currentChildren.hasOwnProperty('colors')) {
                let { colors } = currentChildren;

                for (let j = 0; j < colors.length; j++) {
                  let color = colors[j];
                  let colorBlock = {
                    type: 'color',
                    id: color.id
                  };

                  childrenToRender.push(colorBlock);
                }
              }
            } else if (blockType === 'swatches') {
              let swatchBlock = {
                type: 'swatches'
              }

              childrenToRender.push(swatchBlock);
            } else if (blockType === 'pages') {
              let pagesBlock = {
                type: 'pages'
              };

              childrenToRender.push(pagesBlock);
            } else if (blockType === 'switch') {
              let state = currentChildren.state === 'on' ? true : false;
              let switchBlock = {
                type: 'switch',
                state: state,
                text: currentChildren.name ? currentChildren.name : ''
              };

              childrenToRender.push(switchBlock); 
            } else if (blockType === 'font') {
              let fontBlock = {
                type: 'font'
              };

              childrenToRender.push(fontBlock);
            } else if (blockType === 'size') {
              let sizeBlock = {
                type: 'size',
                min: currentChildren.min ? currentChildren.min : 0,
                max: currentChildren.max ? currentChildren.max : 0,
                label: currentChildren.label ? currentChildren.label : '',
                sizeType: splitCurrentChildrenType[2] ? splitCurrentChildrenType[2] : null
              };

              childrenToRender.push(sizeBlock);
            }

            break;

          case 'open':
            let openWhat = currentChildrenType.substr('open.'.length);

            if (openWhat === 'sidetab') {
              let target = currentChildren.target.split('.');
              let sideTarget = target[target.length - 1];
              let sideTabBlock = {
                type: 'sidetab',
                title: currentChildren.title,
                target: sideTarget
              };

              childrenToRender.push(sideTabBlock);
            }

            break;

          default:
            break;
        }
      }
    }
  }

  return childrenToRender;
}