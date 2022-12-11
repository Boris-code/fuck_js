return e.prototype.generatePopToken = function(e) {
  var t = this.objectService.get(self, "keyPair.privateKey");
  return a.a.isIE() ? Object(o.a)(this.signForIE(t, e)) : Object(o.a)(self.crypto.subtle.sign(s, t, Object(l.c)(e, self.btoa)))
}