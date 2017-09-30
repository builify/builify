import { assign as _assign } from 'lodash';
import TTDOM from '../../../common/TTDOM';

export default {
    checkIfBackgroundImageHolderIsNear(target) {
        let newTarget = target;

        if (target.getAttribute('data-abccorent')) {
            const { children } = target;

            for (let i = 0; i < children.length; i += 1) {
                const currentChild = children[i];

                if (currentChild.classList.contains('background-image-holder')) {
                    newTarget = currentChild;
                    newTarget.setAttribute('data-abcnotremoveable', true);
                    break;
                }
            }
        }

        return newTarget;
    },

    hasGridClassnames(elem, elementOptions) {
        const func = (item, cn) => {
            return (item.className.indexOf(cn) !== -1);
        };

        if (TTDOM.element.is(elem, 'div, p, span, figure, article, img')) {
            if (func(elem, 'col-xs') ||
          func(elem, 'col-sm') ||
          func(elem, 'col-md')) {
                return _assign({}, elementOptions, {
                    showExpandColumn: true,
                    showShrinkColumn: true
                });
            }
        }

        return elementOptions;
    },

    replaceGridClassnames(element, shrink = false) {
        const { className: text } = element;
        const regex = /(col-)(md|sm|xs)-\d/g;
        let m = null;

    while ((m = regex.exec(text)) !== null) { // eslint-disable-line
            if (m.index === regex.lastIndex) {
                regex.lastIndex += 1;
            }

            const result = m[0];
            let number = parseInt(result.match(/\d/g).join(''), 10);

            if (number > 0) {
                if (shrink && number <= 12) {
                    number -= 1;
                } else if (!shrink && number < 12) {
                    number += 1;
                }
            }

            element.classList.remove(result);
            element.classList.add(result.replace(/(\d){1,2}?$/, number));
        }
    },

    cloneItem(element) {
        const cloneElement = element.cloneNode(true);
        const parent = element.parentNode;

        if (TTDOM.element.is(parent, 'li')) {
            const parentsParent = parent.parentNode;
            const newListItem = document.createElement('li');

            newListItem.appendChild(cloneElement);

            parentsParent.insertBefore(newListItem, parent.nextSibling);
        } else {
            parent.insertBefore(cloneElement, element.nextSibling);
        }
    }
};
