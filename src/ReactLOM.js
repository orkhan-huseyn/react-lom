import Reconciler from 'react-reconciler';

/** Configuration for host environment */
const LOMHostConfig = {
  supportsMutation: true, // it works by mutating nodes
  createInstance(type, props) {
    const element = document.createElement(type);

    ['alt', 'className', 'src', 'href', 'rel', 'target'].forEach((key) => {
      if (props[key]) element[key] = props[key];
    });

    if (props.onClick) {
      element.addEventListener('click', props.onClick);
    }

    if (props.bgColor) {
      element.style.backgroundColor = props.bgColor;
    }

    return element;
  },
  createTextInstance(text) {
    return document.createTextNode(text);
  },
  appendInitialChild(parentInstance, child) {
    parentInstance.appendChild(child);
  },
  appendChild(parent, child) {
    parent.appendChild(child);
  },
  appendChildToContainer(container, child) {
    container.appendChild(child);
  },
  insertInContainerBefore(container, child, beforeChild) {
    container.insertBefore(child, beforeChild);
  },
  insertBefore(parentInstance, child, beforeChild) {
    parentInstance.insertBefore(child, beforeChild);
  },
  removeChild(parentInstance, child) {
    parentInstance.removeChild(child);
  },
  removeChildFromContainer(container, child) {
    container.removeChild(child);
  },
  getRootHostContext(rootContainer) {},
  getChildHostContext(parentHostContext, type, rootContainer) {},
  getPublicInstance() {},
  shouldSetTextContent(type, props) {
    return false;
  },
  clearContainer(container) {},
  prepareUpdate(
    instance,
    type,
    oldProps,
    newProps,
    rootContainer,
    hostContext
  ) {
    let payload = {};
    if (oldProps.bgColor !== newProps.bgColor) {
      payload = { newBgColor: newProps.bgColor };
    }
    return payload;
  },
  commitUpdate(
    instance,
    updatePayload,
    type,
    prevProps,
    nextProps,
    internalHandle
  ) {
    if (updatePayload.newBgColor) {
      instance.style.backgroundColor = updatePayload.newBgColor;
    }
  },
  prepareForCommit(containerInfo) {
    return null;
  },
  commitMount(instance, type, props, internalHandle) {},
  resetAfterCommit(containerInfo) {},
  finalizeInitialChildren(instance, type, props, rootContainer, hostContext) {},
};

const lomRenderer = Reconciler(LOMHostConfig);

const ReactLOM = {
  render(element, container, callback) {
    const rootContainer = lomRenderer.createContainer(container, false);
    lomRenderer.updateContainer(element, rootContainer, null, callback);
  },
};

export default ReactLOM;
