const BaseXform = require('../base-xform');
const BlipXform = require('./blip-xform');
const SrcRectXform = require('./src-rect-xform');

class BlipFillXform extends BaseXform {
  constructor() {
    super();

    this.map = {
      'a:blip': new BlipXform(),
      'a:srcRect': new SrcRectXform(),
    };
  }

  get tag() {
    return 'xdr:blipFill';
  }

  render(xmlStream, model) {
    xmlStream.openNode(this.tag);

    this.map['a:blip'].render(xmlStream, model);
    this.map['a:srcRect'].render(xmlStream, model.srcRect);

    // TODO: options for this + parsing
    xmlStream.openNode('a:stretch');
    xmlStream.leafNode('a:fillRect');
    xmlStream.closeNode();

    xmlStream.closeNode();
  }

  parseOpen(node) {
    if (this.parser) {
      this.parser.parseOpen(node);
      return true;
    }

    switch (node.name) {
      case this.tag:
        this.reset();
        break;

      default:
        this.parser = this.map[node.name];
        if (this.parser) {
          this.parser.parseOpen(node);
        }
        break;
    }
    return true;
  }

  parseText() {}

  parseClose(name) {
    if (this.parser) {
      if (!this.parser.parseClose(name)) {
        this.parser = undefined;
      }
      return true;
    }
    switch (name) {
      case this.tag:
        this.model = this.map['a:blip'].model;
        this.model.srcRect = this.map['a:srcRect'].model;
        return false;

      default:
        return true;
    }
  }
}

module.exports = BlipFillXform;
