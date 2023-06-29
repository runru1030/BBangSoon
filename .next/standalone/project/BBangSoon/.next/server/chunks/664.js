"use strict";
exports.id = 664;
exports.ids = [664];
exports.modules = {

/***/ 43664:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ index)
});

;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/extends.js
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
// EXTERNAL MODULE: external "next/dist/compiled/react"
var react_ = __webpack_require__(18038);
// EXTERNAL MODULE: ./node_modules/use-composed-ref/dist/use-composed-ref.cjs.js
var use_composed_ref_cjs = __webpack_require__(25970);
;// CONCATENATED MODULE: ./node_modules/react-textarea-autosize/dist/react-textarea-autosize.esm.js





var _excluded = ["cacheMeasurements", "maxRows", "minRows", "onChange", "onHeightChange"];
var TextareaAutosize = function TextareaAutosize(_ref, userRef) {
  _ref.cacheMeasurements;
    _ref.maxRows;
    _ref.minRows;
    _ref.onChange;
    _ref.onHeightChange;
    var props = _objectWithoutPropertiesLoose(_ref, _excluded);
  props.value !== undefined;
  var libRef = react_.useRef(null);
  var ref = (0,use_composed_ref_cjs/* default */.Z)(libRef, userRef);
  react_.useRef(0);
  react_.useRef();
  return /*#__PURE__*/react_.createElement("textarea", _extends({}, props, {
    ref: ref
  }));
};
var index = /* #__PURE__ */react_.forwardRef(TextareaAutosize);




/***/ }),

/***/ 25970:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var __webpack_unused_export__;


__webpack_unused_export__ = ({ value: true });

var React = __webpack_require__(18038);

var updateRef = function updateRef(ref, value) {
  if (typeof ref === 'function') {
    ref(value);
    return;
  }
  ref.current = value;
};

var useComposedRef = function useComposedRef(libRef, userRef) {
  var prevUserRef = React.useRef();
  return React.useCallback(function (instance) {
    libRef.current = instance;

    if (prevUserRef.current) {
      updateRef(prevUserRef.current, null);
    }

    prevUserRef.current = userRef;

    if (!userRef) {
      return;
    }

    updateRef(userRef, instance);
  }, [userRef]);
};

exports.Z = useComposedRef;


/***/ })

};
;