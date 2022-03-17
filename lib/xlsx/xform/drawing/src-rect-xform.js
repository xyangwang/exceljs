const BaseXform = require('../base-xform');

class SrcRectXform extends BaseXform {
  get tag() {
    return 'a:srcRect';
  }

  render(xmlStream, model) {
    const attributes = {};

    if (model && model.b) attributes.b = model.b;
    if (model && model.l) attributes.l = model.l;
    if (model && model.r) attributes.r = model.r;
    if (model && model.t) attributes.t = model.t;

    xmlStream.leafNode(this.tag, attributes);
  }

  parseOpen(node) {
    switch (node.name) {
      case this.tag:
        this.model = {};
        if (node.attributes.b) this.model.b = node.attributes.b;
        if (node.attributes.l) this.model.l = node.attributes.l;
        if (node.attributes.r) this.model.r = node.attributes.r;
        if (node.attributes.t) this.model.t = node.attributes.t;
        return true;
      default:
        return true;
    }
  }

  parseText() {}

  parseClose(name) {
    switch (name) {
      case this.tag:
        return false;
      default:
        // unprocessed internal nodes
        return true;
    }
  }
}

module.exports = SrcRectXform;
