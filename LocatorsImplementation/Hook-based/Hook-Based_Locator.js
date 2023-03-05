const hookPrefix = 'x-test-hook-';
const templatePrefix = 'x-test-tpl-';
const hookRegex = new RegExp(`^..............(?:(?:${hookPrefix})|(?:${templatePrefix}))\\d+$`);

class RegExp1 extends RegExp {
  [Symbol.split](str, limit) {
    const result = RegExp.prototype[Symbol.split].call(this, str, limit);
    return result.map(x => `(${x})`);
  }
}

function myLocatorBuilder(builder) {

    return (elem) => {
        //debugger;
        let locator = null;

        let templateRootParent = false;

        while (elem !== document) {

            let hookName = getAttributeHook(elem);
            if (hookName) {
                //console.warn('Cannot find hook for element', elem)
                //break;
                //throw new Error('Cannot find hook for element', elem)

                const templateRoot = hookName.indexOf(templatePrefix) >= 0;

                const siblings = getAllSiblings(elem, sameHookFilter(hookName));

                const index = siblings.length > 1 ? siblings.indexOf(elem) + 1 : 0;

                if (!locator || siblings.length > 1 || templateRoot || templateRootParent) { //first loop (target element) or more siblings found
                    locator = builder.elementLocator(hookName, index) + (locator || '');
                    templateRootParent = !!templateRoot;
                }
            }
            elem = elem.parentNode;
        }
        console.log('locator', locator);
        return builder.prefix + locator;
    }
}

const xpathBuilders = {
    elementLocator: (hookName, index) => {
        return `//*[@${hookName}]` + (index > 0 ? `[${index}]` : '');
    },
    prefix: ''
}

LocatorBuilders.add('myXPathHook', myLocatorBuilder(xpathBuilders));