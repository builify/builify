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

        let typeName = currentChildrenType.substr(0, currentChildrenType.indexOf('.'));

        switch (typeName) {
          case 'block':
            let blockType = currentChildrenType.substr('block.'.length);

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
        }
      }
    }
  }

  return childrenToRender;
}