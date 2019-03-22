(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("framer"), require("react"), require("styled-components"));
	else if(typeof define === 'function' && define.amd)
		define(["framer", "react", "styled-components"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("framer"), require("react"), require("styled-components")) : factory(root["Framer"], root["React"], root["styled-components"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(window, function(__WEBPACK_EXTERNAL_MODULE_framer__, __WEBPACK_EXTERNAL_MODULE_react__, __WEBPACK_EXTERNAL_MODULE_styled_components__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		try { modules[moduleId].call(module.exports, module, module.exports, __webpack_require__); } catch (error) { module.exports = { error } }
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// asset url
/******/ 	var __module_i = eval("typeof module !== 'undefined' ? module.i : ''");
/******/ 	var __framer_package = (/(node_modules[/].*)[/](build|dist).index.js/.exec(__module_i) || [])[1]
/******/ 	function __asset_url__(src) { return __WEBPACK_EXTERNAL_MODULE_framer__.serverURL(__framer_package, src) };
/******/ 	installedModules['framer/resource'] = { i: 'framer/resource', l: true, exports: { url: __asset_url__ } };
/******/
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./package.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./code sync recursive \\.(t|j)s(x?)|\\.css$":
/*!***************************************!*\
  !*** ./code sync \.(t|j)s(x?)|\.css$ ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./LocationLookup.tsx": "./code/LocationLookup.tsx",
	"./canvas.tsx": "./code/canvas.tsx"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	var module = __webpack_require__(id);
	return module;
}
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) { // check for number or string
		var e = new Error('Cannot find module "' + req + '".');
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return id;
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./code sync recursive \\.(t|j)s(x?)|\\.css$";

/***/ }),

/***/ "./code/LocationLookup.tsx":
/*!*********************************!*\
  !*** ./code/LocationLookup.tsx ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst React = __webpack_require__(/*! react */ \"react\");\nconst framer_1 = __webpack_require__(/*! framer */ \"framer\");\nconst styled_components_1 = __webpack_require__(/*! styled-components */ \"styled-components\");\nclass LocationLookup extends React.Component {\n    constructor() {\n        super(...arguments);\n        this.state = {\n            value: this.props.value,\n            valueFromProps: this.props.value,\n            query: \"\",\n            results: [],\n            selected: \"\",\n            hasFocus: false,\n            focused: -1,\n        };\n        this.searchInput = React.createRef();\n        this.loadData = (url, callback) => {\n            window[\"__checkBudget__\"]();\n            if (this.xhttp) {\n                this.xhttp.abort();\n            }\n            const xhttp = (this.xhttp = new XMLHttpRequest());\n            xhttp.onreadystatechange = () => {\n                window[\"__checkBudget__\"]();\n                if (xhttp.readyState == 4 && xhttp.status == 200) {\n                    const response = JSON.parse(xhttp.responseText);\n                    callback(response);\n                }\n            };\n            xhttp.open(\"GET\", url, true);\n            xhttp.send();\n        };\n        this.autoSuggest = (key) => {\n            window[\"__checkBudget__\"]();\n            const pdok = `https://geodata.nationaalgeoregister.nl/locatieserver/v3/suggest?rows=${this.props.resultLength}&q=`;\n            const url = pdok + key;\n            this.loadData(url, data => {\n                window[\"__checkBudget__\"]();\n                this.setState(Object.assign({}, this.state, { query: key, results: data.response.docs, hasFocus: true }));\n            });\n        };\n        this.handleChange = (e) => {\n            window[\"__checkBudget__\"]();\n            this.autoSuggest(e.target.value);\n            this.setState({ value: e.target.value });\n        };\n        this.selectSuggestion = (e, selection) => {\n            window[\"__checkBudget__\"]();\n            e.preventDefault();\n            this.setSuggestion(selection);\n        };\n        this.setSuggestion = (selection) => {\n            window[\"__checkBudget__\"]();\n            this.searchInput.current.value = selection;\n            this.setState(Object.assign({}, this.state, { selected: selection, results: [] }));\n        };\n        this.handleKeyDown = (e) => {\n            window[\"__checkBudget__\"]();\n            const { results, focused } = this.state;\n            const length = results.length;\n            // Arrow down, next result\n            if (e.keyCode === 40 || e.keyCode === 9) {\n                e.preventDefault();\n                if (focused < length - 1) {\n                    this.setState(prevState => {\n                        window[\"__checkBudget__\"]();\n                        return Object.assign({}, this.state, { focused: prevState.focused + 1 });\n                    });\n                }\n            }\n            // Arrow up, previous result\n            else if (e.keyCode === 38) {\n                e.preventDefault();\n                if (focused > 0) {\n                    this.setState(prevState => {\n                        window[\"__checkBudget__\"]();\n                        return Object.assign({}, this.state, { focused: prevState.focused - 1 });\n                    });\n                }\n            }\n            // Enter, select suggestion\n            else if (e.keyCode === 13) {\n                this.setSuggestion(results[focused].weergavenaam);\n            }\n            else {\n                this.setState(Object.assign({}, this.state, { focused: -1 }));\n            }\n        };\n        this.handleOnFocus = (e, index) => {\n            window[\"__checkBudget__\"]();\n            e.preventDefault();\n            this.setState(Object.assign({}, this.state, { focused: index }));\n        };\n    }\n    componentWillMount() {\n        window[\"__checkBudget__\"]();\n        const { value } = this.props;\n        if (value) {\n            this.autoSuggest(this.props.value);\n            this.setState(Object.assign({}, this.state, { focused: 0 }));\n        }\n    }\n    componentWillUnmount() {\n        window[\"__checkBudget__\"]();\n        if (this.xhttp) {\n            this.xhttp.abort();\n        }\n    }\n    render() {\n        window[\"__checkBudget__\"]();\n        const { results, query, hasFocus, focused, selected, value } = this.state;\n        const { paddingPerSide, padding, paddingTop, paddingRight, paddingBottom, paddingLeft, backgroundColor, fontSize, borderRadius, searchColor, resultColor, selectColor, selectBackground, resultSpacing, resultLength, placeholder } = this.props;\n        const paddingValue = paddingPerSide\n            ? `${paddingTop}px ${paddingRight}px ${paddingBottom}px ${paddingLeft}px`\n            : `${padding}px`;\n        const { width, height } = this.props;\n        const hasResults = results.length > 0;\n        const hasText = query.length > 0;\n        const showResults = hasText && hasResults;\n        return (React.createElement(framer_1.Frame, { width: width, overflow: \"visible\", style: {\n                backgroundColor: \"transparent\",\n                overflow: \"visible\"\n            } },\n            React.createElement(SearchInput, { type: \"text\", value: value, placeholder: placeholder, onChange: (e) => this.handleChange(e), width: width, height: height, padding: paddingValue, backgroundColor: backgroundColor, fontSize: fontSize, borderRadius: borderRadius, searchColor: searchColor, onKeyDown: this.handleKeyDown, ref: this.searchInput }),\n            React.createElement(ResultList, { opacity: showResults ? 1 : 0, visibility: showResults ? \"visible\" : \"hidden\", fontSize: fontSize, marginTop: resultSpacing, borderRadius: borderRadius, backgroundColor: backgroundColor, resultColor: resultColor, selectColor: selectColor, selectBackground: selectBackground, height: resultLength * 64 + 16 }, results.map((result, index) => (React.createElement(\"li\", { key: index },\n                React.createElement(\"a\", { href: \"\", onClick: (e) => this.selectSuggestion(e, result.weergavenaam), className: index === focused ? \"isFocused\" : \"\", onMouseOver: (e) => this.handleOnFocus(e, index) },\n                    React.createElement(\"p\", null,\n                        React.createElement(\"strong\", null, result.weergavenaam)),\n                    React.createElement(\"p\", null, result.type))))))));\n    }\n}\nLocationLookup.defaultProps = {\n    width: 320,\n    height: 56,\n    padding: 16,\n    paddingPerSide: true,\n    paddingTop: 16,\n    paddingRight: 16,\n    paddingBottom: 16,\n    paddingLeft: 56,\n    backgroundColor: \"#FFF\",\n    fontSize: 16,\n    borderRadius: 4,\n    searchColor: \"#333\",\n    resultColor: \"#333\",\n    selectColor: \"#1199EE\",\n    selectBackground: \"rgba(0,0,0,0.05)\",\n    resultSpacing: 16,\n    resultLength: 5,\n    value: \"Singel 3\",\n    placeholder: \"Zoek op gemeente, woonplaats, adres of postcode\",\n};\nLocationLookup.propertyControls = {\n    value: { type: framer_1.ControlType.String, title: \"Value\" },\n    placeholder: { type: framer_1.ControlType.String, title: \"Placeholder\" },\n    padding: {\n        type: framer_1.ControlType.FusedNumber,\n        toggleKey: \"paddingPerSide\",\n        toggleTitles: [\"All Sides\", \"Per Side\"],\n        valueKeys: [\"paddingTop\", \"paddingRight\", \"paddingBottom\", \"paddingLeft\"],\n        valueLabels: [\"T\", \"R\", \"B\", \"L\"],\n        min: 0,\n        title: \"Input padding\"\n    },\n    backgroundColor: { type: framer_1.ControlType.Color, title: \"Background\" },\n    searchColor: { type: framer_1.ControlType.Color, title: \"Search Color\" },\n    resultColor: { type: framer_1.ControlType.Color, title: \"Result Color\" },\n    selectColor: { type: framer_1.ControlType.Color, title: \"Select Color\" },\n    selectBackground: { type: framer_1.ControlType.Color, title: \"Select Background\" },\n    fontSize: { type: framer_1.ControlType.Number, title: \"Font Size\", min: 5, max: 25 },\n    borderRadius: { type: framer_1.ControlType.Number, title: \"Radius\", min: 0, max: 50 },\n    resultSpacing: { type: framer_1.ControlType.Number, title: \"Spacing\" },\n    resultLength: { type: framer_1.ControlType.Number, title: \"Max amount\", min: 1, max: 10 },\n};\nexports.LocationLookup = LocationLookup;\nconst SearchInput = styled_components_1.default.input `\n  border: 1px solid #DDD;\n  outline: none;\n  width: ${props => props.width}px;\n  height: ${props => props.height}px;\n  padding: ${props => props.padding};\n  background-color: ${props => props.backgroundColor};\n  font-size: ${props => props.fontSize}px;\n  line-height: 1.5;\n  border-radius: ${props => props.borderRadius}px;\n  color: ${props => props.searchColor};\n  outline: none;    \n  -webkit-appearance: none;\n  -moz-appearance: none;\n  &:focus {\n    border-color: #AAA;\n  }\n`;\nconst ResultList = styled_components_1.default.ul `\n  opacity: ${props => props.opacity};\n  visibility: ${props => props.visibility};\n  list-style: none;\n  margin: ${props => props.marginTop}px 0 0 0;\n  padding: 8px;\n  border-radius: ${props => props.borderRadius}px;\n  overflow: scroll;\n  height: ${props => props.length * 64}px;\n  background-color: ${props => props.backgroundColor};\n  color: ${props => props.resultColor};\n  border: 1px solid #CCC;\n  li {\n    padding: 0;\n    a {\n      font-size: ${props => props.fontSize}px;\n      line-height: 1.5;\n      width: auto;\n      height: 100%;\n      padding: 8px 12px;\n      display: block;\n      background-color: white;\n      text-decoration: none;\n      border-radius: 2px;\n      -webkit-tap-highlight-color: rgba(0,0,0,0);\n      &.isFocused, &:active {\n        background-color: ${props => props.selectBackground};\n        color: ${props => props.selectColor} !important;\n      }\n      &:visited {\n        color: inherit;\n        text-decoration: inherit;\n      }\n      p {\n        margin: 0;\n      }\n    }\n  }\n`;\nexports.__info__ = [{ name: \"LocationLookup\", children: false, type: \"component\" }];\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9jb2RlL0xvY2F0aW9uTG9va3VwLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0dBQWtHLHdCQUF3QjtBQUMxSDtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsZUFBZSwwREFBMEQ7QUFDdkgsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLHdCQUF3QjtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEMsZUFBZSxtQ0FBbUM7QUFDNUY7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLG1CQUFtQjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDQUErQyxlQUFlLGlDQUFpQztBQUMvRixxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDQUErQyxlQUFlLGlDQUFpQztBQUMvRixxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsZUFBZSxjQUFjO0FBQzNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEMsZUFBZSxpQkFBaUI7QUFDMUU7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLFFBQVE7QUFDdkI7QUFDQTtBQUNBLDBDQUEwQyxlQUFlLGFBQWE7QUFDdEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLHFEQUFxRDtBQUNwRSxlQUFlLDROQUE0TjtBQUMzTztBQUNBLGlCQUFpQixXQUFXLEtBQUssYUFBYSxLQUFLLGNBQWMsS0FBSyxZQUFZO0FBQ2xGLGlCQUFpQixRQUFRO0FBQ3pCLGVBQWUsZ0JBQWdCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBLHFEQUFxRDtBQUNyRDtBQUNBO0FBQ0EsYUFBYSxFQUFFO0FBQ2YsOENBQThDLHFUQUFxVDtBQUNuVyw2Q0FBNkMsbVRBQW1ULDZEQUE2RCxhQUFhO0FBQzFhLDBDQUEwQyw2S0FBNks7QUFDdk47QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxvREFBb0Q7QUFDaEUsa0JBQWtCLDBEQUEwRDtBQUM1RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLHNCQUFzQix3REFBd0Q7QUFDOUUsa0JBQWtCLDBEQUEwRDtBQUM1RSxrQkFBa0IsMERBQTBEO0FBQzVFLGtCQUFrQiwwREFBMEQ7QUFDNUUsdUJBQXVCLCtEQUErRDtBQUN0RixlQUFlLHlFQUF5RTtBQUN4RixtQkFBbUIsc0VBQXNFO0FBQ3pGLG9CQUFvQixzREFBc0Q7QUFDMUUsbUJBQW1CLDBFQUEwRTtBQUM3RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxxQkFBcUI7QUFDaEMsWUFBWSxzQkFBc0I7QUFDbEMsYUFBYTtBQUNiLHNCQUFzQjtBQUN0QixlQUFlLHdCQUF3QjtBQUN2QztBQUNBLG1CQUFtQiw0QkFBNEI7QUFDL0MsV0FBVztBQUNYLGdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsZ0JBQWdCO0FBQ2hCO0FBQ0EsWUFBWSx5QkFBeUI7QUFDckM7QUFDQSxtQkFBbUIsNEJBQTRCO0FBQy9DO0FBQ0EsWUFBWSwyQkFBMkI7QUFDdkMsc0JBQXNCO0FBQ3RCLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix3QkFBd0I7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEI7QUFDNUIsaUJBQWlCLDJCQUEyQjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLDZEQUE2RCIsImZpbGUiOiIuL2NvZGUvTG9jYXRpb25Mb29rdXAudHN4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBSZWFjdCA9IHJlcXVpcmUoXCJyZWFjdFwiKTtcbmNvbnN0IGZyYW1lcl8xID0gcmVxdWlyZShcImZyYW1lclwiKTtcbmNvbnN0IHN0eWxlZF9jb21wb25lbnRzXzEgPSByZXF1aXJlKFwic3R5bGVkLWNvbXBvbmVudHNcIik7XG5jbGFzcyBMb2NhdGlvbkxvb2t1cCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5wcm9wcy52YWx1ZSxcbiAgICAgICAgICAgIHZhbHVlRnJvbVByb3BzOiB0aGlzLnByb3BzLnZhbHVlLFxuICAgICAgICAgICAgcXVlcnk6IFwiXCIsXG4gICAgICAgICAgICByZXN1bHRzOiBbXSxcbiAgICAgICAgICAgIHNlbGVjdGVkOiBcIlwiLFxuICAgICAgICAgICAgaGFzRm9jdXM6IGZhbHNlLFxuICAgICAgICAgICAgZm9jdXNlZDogLTEsXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc2VhcmNoSW5wdXQgPSBSZWFjdC5jcmVhdGVSZWYoKTtcbiAgICAgICAgdGhpcy5sb2FkRGF0YSA9ICh1cmwsIGNhbGxiYWNrKSA9PiB7XG4gICAgICAgICAgICB3aW5kb3dbXCJfX2NoZWNrQnVkZ2V0X19cIl0oKTtcbiAgICAgICAgICAgIGlmICh0aGlzLnhodHRwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy54aHR0cC5hYm9ydCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgeGh0dHAgPSAodGhpcy54aHR0cCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpKTtcbiAgICAgICAgICAgIHhodHRwLm9ucmVhZHlzdGF0ZWNoYW5nZSA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICB3aW5kb3dbXCJfX2NoZWNrQnVkZ2V0X19cIl0oKTtcbiAgICAgICAgICAgICAgICBpZiAoeGh0dHAucmVhZHlTdGF0ZSA9PSA0ICYmIHhodHRwLnN0YXR1cyA9PSAyMDApIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBKU09OLnBhcnNlKHhodHRwLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgeGh0dHAub3BlbihcIkdFVFwiLCB1cmwsIHRydWUpO1xuICAgICAgICAgICAgeGh0dHAuc2VuZCgpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmF1dG9TdWdnZXN0ID0gKGtleSkgPT4ge1xuICAgICAgICAgICAgd2luZG93W1wiX19jaGVja0J1ZGdldF9fXCJdKCk7XG4gICAgICAgICAgICBjb25zdCBwZG9rID0gYGh0dHBzOi8vZ2VvZGF0YS5uYXRpb25hYWxnZW9yZWdpc3Rlci5ubC9sb2NhdGllc2VydmVyL3YzL3N1Z2dlc3Q/cm93cz0ke3RoaXMucHJvcHMucmVzdWx0TGVuZ3RofSZxPWA7XG4gICAgICAgICAgICBjb25zdCB1cmwgPSBwZG9rICsga2V5O1xuICAgICAgICAgICAgdGhpcy5sb2FkRGF0YSh1cmwsIGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgIHdpbmRvd1tcIl9fY2hlY2tCdWRnZXRfX1wiXSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5zdGF0ZSwgeyBxdWVyeToga2V5LCByZXN1bHRzOiBkYXRhLnJlc3BvbnNlLmRvY3MsIGhhc0ZvY3VzOiB0cnVlIH0pKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmhhbmRsZUNoYW5nZSA9IChlKSA9PiB7XG4gICAgICAgICAgICB3aW5kb3dbXCJfX2NoZWNrQnVkZ2V0X19cIl0oKTtcbiAgICAgICAgICAgIHRoaXMuYXV0b1N1Z2dlc3QoZS50YXJnZXQudmFsdWUpO1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHZhbHVlOiBlLnRhcmdldC52YWx1ZSB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zZWxlY3RTdWdnZXN0aW9uID0gKGUsIHNlbGVjdGlvbikgPT4ge1xuICAgICAgICAgICAgd2luZG93W1wiX19jaGVja0J1ZGdldF9fXCJdKCk7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB0aGlzLnNldFN1Z2dlc3Rpb24oc2VsZWN0aW9uKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zZXRTdWdnZXN0aW9uID0gKHNlbGVjdGlvbikgPT4ge1xuICAgICAgICAgICAgd2luZG93W1wiX19jaGVja0J1ZGdldF9fXCJdKCk7XG4gICAgICAgICAgICB0aGlzLnNlYXJjaElucHV0LmN1cnJlbnQudmFsdWUgPSBzZWxlY3Rpb247XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKE9iamVjdC5hc3NpZ24oe30sIHRoaXMuc3RhdGUsIHsgc2VsZWN0ZWQ6IHNlbGVjdGlvbiwgcmVzdWx0czogW10gfSkpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmhhbmRsZUtleURvd24gPSAoZSkgPT4ge1xuICAgICAgICAgICAgd2luZG93W1wiX19jaGVja0J1ZGdldF9fXCJdKCk7XG4gICAgICAgICAgICBjb25zdCB7IHJlc3VsdHMsIGZvY3VzZWQgfSA9IHRoaXMuc3RhdGU7XG4gICAgICAgICAgICBjb25zdCBsZW5ndGggPSByZXN1bHRzLmxlbmd0aDtcbiAgICAgICAgICAgIC8vIEFycm93IGRvd24sIG5leHQgcmVzdWx0XG4gICAgICAgICAgICBpZiAoZS5rZXlDb2RlID09PSA0MCB8fCBlLmtleUNvZGUgPT09IDkpIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgaWYgKGZvY3VzZWQgPCBsZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUocHJldlN0YXRlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd1tcIl9fY2hlY2tCdWRnZXRfX1wiXSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHRoaXMuc3RhdGUsIHsgZm9jdXNlZDogcHJldlN0YXRlLmZvY3VzZWQgKyAxIH0pO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBBcnJvdyB1cCwgcHJldmlvdXMgcmVzdWx0XG4gICAgICAgICAgICBlbHNlIGlmIChlLmtleUNvZGUgPT09IDM4KSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGlmIChmb2N1c2VkID4gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHByZXZTdGF0ZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dbXCJfX2NoZWNrQnVkZ2V0X19cIl0oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCB0aGlzLnN0YXRlLCB7IGZvY3VzZWQ6IHByZXZTdGF0ZS5mb2N1c2VkIC0gMSB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gRW50ZXIsIHNlbGVjdCBzdWdnZXN0aW9uXG4gICAgICAgICAgICBlbHNlIGlmIChlLmtleUNvZGUgPT09IDEzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdWdnZXN0aW9uKHJlc3VsdHNbZm9jdXNlZF0ud2VlcmdhdmVuYWFtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5zdGF0ZSwgeyBmb2N1c2VkOiAtMSB9KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuaGFuZGxlT25Gb2N1cyA9IChlLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgd2luZG93W1wiX19jaGVja0J1ZGdldF9fXCJdKCk7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKE9iamVjdC5hc3NpZ24oe30sIHRoaXMuc3RhdGUsIHsgZm9jdXNlZDogaW5kZXggfSkpO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgICAgIHdpbmRvd1tcIl9fY2hlY2tCdWRnZXRfX1wiXSgpO1xuICAgICAgICBjb25zdCB7IHZhbHVlIH0gPSB0aGlzLnByb3BzO1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuYXV0b1N1Z2dlc3QodGhpcy5wcm9wcy52YWx1ZSk7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKE9iamVjdC5hc3NpZ24oe30sIHRoaXMuc3RhdGUsIHsgZm9jdXNlZDogMCB9KSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAgIHdpbmRvd1tcIl9fY2hlY2tCdWRnZXRfX1wiXSgpO1xuICAgICAgICBpZiAodGhpcy54aHR0cCkge1xuICAgICAgICAgICAgdGhpcy54aHR0cC5hYm9ydCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgd2luZG93W1wiX19jaGVja0J1ZGdldF9fXCJdKCk7XG4gICAgICAgIGNvbnN0IHsgcmVzdWx0cywgcXVlcnksIGhhc0ZvY3VzLCBmb2N1c2VkLCBzZWxlY3RlZCwgdmFsdWUgfSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIGNvbnN0IHsgcGFkZGluZ1BlclNpZGUsIHBhZGRpbmcsIHBhZGRpbmdUb3AsIHBhZGRpbmdSaWdodCwgcGFkZGluZ0JvdHRvbSwgcGFkZGluZ0xlZnQsIGJhY2tncm91bmRDb2xvciwgZm9udFNpemUsIGJvcmRlclJhZGl1cywgc2VhcmNoQ29sb3IsIHJlc3VsdENvbG9yLCBzZWxlY3RDb2xvciwgc2VsZWN0QmFja2dyb3VuZCwgcmVzdWx0U3BhY2luZywgcmVzdWx0TGVuZ3RoLCBwbGFjZWhvbGRlciB9ID0gdGhpcy5wcm9wcztcbiAgICAgICAgY29uc3QgcGFkZGluZ1ZhbHVlID0gcGFkZGluZ1BlclNpZGVcbiAgICAgICAgICAgID8gYCR7cGFkZGluZ1RvcH1weCAke3BhZGRpbmdSaWdodH1weCAke3BhZGRpbmdCb3R0b219cHggJHtwYWRkaW5nTGVmdH1weGBcbiAgICAgICAgICAgIDogYCR7cGFkZGluZ31weGA7XG4gICAgICAgIGNvbnN0IHsgd2lkdGgsIGhlaWdodCB9ID0gdGhpcy5wcm9wcztcbiAgICAgICAgY29uc3QgaGFzUmVzdWx0cyA9IHJlc3VsdHMubGVuZ3RoID4gMDtcbiAgICAgICAgY29uc3QgaGFzVGV4dCA9IHF1ZXJ5Lmxlbmd0aCA+IDA7XG4gICAgICAgIGNvbnN0IHNob3dSZXN1bHRzID0gaGFzVGV4dCAmJiBoYXNSZXN1bHRzO1xuICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoZnJhbWVyXzEuRnJhbWUsIHsgd2lkdGg6IHdpZHRoLCBvdmVyZmxvdzogXCJ2aXNpYmxlXCIsIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBcInRyYW5zcGFyZW50XCIsXG4gICAgICAgICAgICAgICAgb3ZlcmZsb3c6IFwidmlzaWJsZVwiXG4gICAgICAgICAgICB9IH0sXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFNlYXJjaElucHV0LCB7IHR5cGU6IFwidGV4dFwiLCB2YWx1ZTogdmFsdWUsIHBsYWNlaG9sZGVyOiBwbGFjZWhvbGRlciwgb25DaGFuZ2U6IChlKSA9PiB0aGlzLmhhbmRsZUNoYW5nZShlKSwgd2lkdGg6IHdpZHRoLCBoZWlnaHQ6IGhlaWdodCwgcGFkZGluZzogcGFkZGluZ1ZhbHVlLCBiYWNrZ3JvdW5kQ29sb3I6IGJhY2tncm91bmRDb2xvciwgZm9udFNpemU6IGZvbnRTaXplLCBib3JkZXJSYWRpdXM6IGJvcmRlclJhZGl1cywgc2VhcmNoQ29sb3I6IHNlYXJjaENvbG9yLCBvbktleURvd246IHRoaXMuaGFuZGxlS2V5RG93biwgcmVmOiB0aGlzLnNlYXJjaElucHV0IH0pLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChSZXN1bHRMaXN0LCB7IG9wYWNpdHk6IHNob3dSZXN1bHRzID8gMSA6IDAsIHZpc2liaWxpdHk6IHNob3dSZXN1bHRzID8gXCJ2aXNpYmxlXCIgOiBcImhpZGRlblwiLCBmb250U2l6ZTogZm9udFNpemUsIG1hcmdpblRvcDogcmVzdWx0U3BhY2luZywgYm9yZGVyUmFkaXVzOiBib3JkZXJSYWRpdXMsIGJhY2tncm91bmRDb2xvcjogYmFja2dyb3VuZENvbG9yLCByZXN1bHRDb2xvcjogcmVzdWx0Q29sb3IsIHNlbGVjdENvbG9yOiBzZWxlY3RDb2xvciwgc2VsZWN0QmFja2dyb3VuZDogc2VsZWN0QmFja2dyb3VuZCwgaGVpZ2h0OiByZXN1bHRMZW5ndGggKiA2NCArIDE2IH0sIHJlc3VsdHMubWFwKChyZXN1bHQsIGluZGV4KSA9PiAoUmVhY3QuY3JlYXRlRWxlbWVudChcImxpXCIsIHsga2V5OiBpbmRleCB9LFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJhXCIsIHsgaHJlZjogXCJcIiwgb25DbGljazogKGUpID0+IHRoaXMuc2VsZWN0U3VnZ2VzdGlvbihlLCByZXN1bHQud2VlcmdhdmVuYWFtKSwgY2xhc3NOYW1lOiBpbmRleCA9PT0gZm9jdXNlZCA/IFwiaXNGb2N1c2VkXCIgOiBcIlwiLCBvbk1vdXNlT3ZlcjogKGUpID0+IHRoaXMuaGFuZGxlT25Gb2N1cyhlLCBpbmRleCkgfSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInBcIiwgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzdHJvbmdcIiwgbnVsbCwgcmVzdWx0LndlZXJnYXZlbmFhbSkpLFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFwicFwiLCBudWxsLCByZXN1bHQudHlwZSkpKSkpKSkpO1xuICAgIH1cbn1cbkxvY2F0aW9uTG9va3VwLmRlZmF1bHRQcm9wcyA9IHtcbiAgICB3aWR0aDogMzIwLFxuICAgIGhlaWdodDogNTYsXG4gICAgcGFkZGluZzogMTYsXG4gICAgcGFkZGluZ1BlclNpZGU6IHRydWUsXG4gICAgcGFkZGluZ1RvcDogMTYsXG4gICAgcGFkZGluZ1JpZ2h0OiAxNixcbiAgICBwYWRkaW5nQm90dG9tOiAxNixcbiAgICBwYWRkaW5nTGVmdDogNTYsXG4gICAgYmFja2dyb3VuZENvbG9yOiBcIiNGRkZcIixcbiAgICBmb250U2l6ZTogMTYsXG4gICAgYm9yZGVyUmFkaXVzOiA0LFxuICAgIHNlYXJjaENvbG9yOiBcIiMzMzNcIixcbiAgICByZXN1bHRDb2xvcjogXCIjMzMzXCIsXG4gICAgc2VsZWN0Q29sb3I6IFwiIzExOTlFRVwiLFxuICAgIHNlbGVjdEJhY2tncm91bmQ6IFwicmdiYSgwLDAsMCwwLjA1KVwiLFxuICAgIHJlc3VsdFNwYWNpbmc6IDE2LFxuICAgIHJlc3VsdExlbmd0aDogNSxcbiAgICB2YWx1ZTogXCJTaW5nZWwgM1wiLFxuICAgIHBsYWNlaG9sZGVyOiBcIlpvZWsgb3AgZ2VtZWVudGUsIHdvb25wbGFhdHMsIGFkcmVzIG9mIHBvc3Rjb2RlXCIsXG59O1xuTG9jYXRpb25Mb29rdXAucHJvcGVydHlDb250cm9scyA9IHtcbiAgICB2YWx1ZTogeyB0eXBlOiBmcmFtZXJfMS5Db250cm9sVHlwZS5TdHJpbmcsIHRpdGxlOiBcIlZhbHVlXCIgfSxcbiAgICBwbGFjZWhvbGRlcjogeyB0eXBlOiBmcmFtZXJfMS5Db250cm9sVHlwZS5TdHJpbmcsIHRpdGxlOiBcIlBsYWNlaG9sZGVyXCIgfSxcbiAgICBwYWRkaW5nOiB7XG4gICAgICAgIHR5cGU6IGZyYW1lcl8xLkNvbnRyb2xUeXBlLkZ1c2VkTnVtYmVyLFxuICAgICAgICB0b2dnbGVLZXk6IFwicGFkZGluZ1BlclNpZGVcIixcbiAgICAgICAgdG9nZ2xlVGl0bGVzOiBbXCJBbGwgU2lkZXNcIiwgXCJQZXIgU2lkZVwiXSxcbiAgICAgICAgdmFsdWVLZXlzOiBbXCJwYWRkaW5nVG9wXCIsIFwicGFkZGluZ1JpZ2h0XCIsIFwicGFkZGluZ0JvdHRvbVwiLCBcInBhZGRpbmdMZWZ0XCJdLFxuICAgICAgICB2YWx1ZUxhYmVsczogW1wiVFwiLCBcIlJcIiwgXCJCXCIsIFwiTFwiXSxcbiAgICAgICAgbWluOiAwLFxuICAgICAgICB0aXRsZTogXCJJbnB1dCBwYWRkaW5nXCJcbiAgICB9LFxuICAgIGJhY2tncm91bmRDb2xvcjogeyB0eXBlOiBmcmFtZXJfMS5Db250cm9sVHlwZS5Db2xvciwgdGl0bGU6IFwiQmFja2dyb3VuZFwiIH0sXG4gICAgc2VhcmNoQ29sb3I6IHsgdHlwZTogZnJhbWVyXzEuQ29udHJvbFR5cGUuQ29sb3IsIHRpdGxlOiBcIlNlYXJjaCBDb2xvclwiIH0sXG4gICAgcmVzdWx0Q29sb3I6IHsgdHlwZTogZnJhbWVyXzEuQ29udHJvbFR5cGUuQ29sb3IsIHRpdGxlOiBcIlJlc3VsdCBDb2xvclwiIH0sXG4gICAgc2VsZWN0Q29sb3I6IHsgdHlwZTogZnJhbWVyXzEuQ29udHJvbFR5cGUuQ29sb3IsIHRpdGxlOiBcIlNlbGVjdCBDb2xvclwiIH0sXG4gICAgc2VsZWN0QmFja2dyb3VuZDogeyB0eXBlOiBmcmFtZXJfMS5Db250cm9sVHlwZS5Db2xvciwgdGl0bGU6IFwiU2VsZWN0IEJhY2tncm91bmRcIiB9LFxuICAgIGZvbnRTaXplOiB7IHR5cGU6IGZyYW1lcl8xLkNvbnRyb2xUeXBlLk51bWJlciwgdGl0bGU6IFwiRm9udCBTaXplXCIsIG1pbjogNSwgbWF4OiAyNSB9LFxuICAgIGJvcmRlclJhZGl1czogeyB0eXBlOiBmcmFtZXJfMS5Db250cm9sVHlwZS5OdW1iZXIsIHRpdGxlOiBcIlJhZGl1c1wiLCBtaW46IDAsIG1heDogNTAgfSxcbiAgICByZXN1bHRTcGFjaW5nOiB7IHR5cGU6IGZyYW1lcl8xLkNvbnRyb2xUeXBlLk51bWJlciwgdGl0bGU6IFwiU3BhY2luZ1wiIH0sXG4gICAgcmVzdWx0TGVuZ3RoOiB7IHR5cGU6IGZyYW1lcl8xLkNvbnRyb2xUeXBlLk51bWJlciwgdGl0bGU6IFwiTWF4IGFtb3VudFwiLCBtaW46IDEsIG1heDogMTAgfSxcbn07XG5leHBvcnRzLkxvY2F0aW9uTG9va3VwID0gTG9jYXRpb25Mb29rdXA7XG5jb25zdCBTZWFyY2hJbnB1dCA9IHN0eWxlZF9jb21wb25lbnRzXzEuZGVmYXVsdC5pbnB1dCBgXG4gIGJvcmRlcjogMXB4IHNvbGlkICNEREQ7XG4gIG91dGxpbmU6IG5vbmU7XG4gIHdpZHRoOiAke3Byb3BzID0+IHByb3BzLndpZHRofXB4O1xuICBoZWlnaHQ6ICR7cHJvcHMgPT4gcHJvcHMuaGVpZ2h0fXB4O1xuICBwYWRkaW5nOiAke3Byb3BzID0+IHByb3BzLnBhZGRpbmd9O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAke3Byb3BzID0+IHByb3BzLmJhY2tncm91bmRDb2xvcn07XG4gIGZvbnQtc2l6ZTogJHtwcm9wcyA9PiBwcm9wcy5mb250U2l6ZX1weDtcbiAgbGluZS1oZWlnaHQ6IDEuNTtcbiAgYm9yZGVyLXJhZGl1czogJHtwcm9wcyA9PiBwcm9wcy5ib3JkZXJSYWRpdXN9cHg7XG4gIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnNlYXJjaENvbG9yfTtcbiAgb3V0bGluZTogbm9uZTsgICAgXG4gIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcbiAgLW1vei1hcHBlYXJhbmNlOiBub25lO1xuICAmOmZvY3VzIHtcbiAgICBib3JkZXItY29sb3I6ICNBQUE7XG4gIH1cbmA7XG5jb25zdCBSZXN1bHRMaXN0ID0gc3R5bGVkX2NvbXBvbmVudHNfMS5kZWZhdWx0LnVsIGBcbiAgb3BhY2l0eTogJHtwcm9wcyA9PiBwcm9wcy5vcGFjaXR5fTtcbiAgdmlzaWJpbGl0eTogJHtwcm9wcyA9PiBwcm9wcy52aXNpYmlsaXR5fTtcbiAgbGlzdC1zdHlsZTogbm9uZTtcbiAgbWFyZ2luOiAke3Byb3BzID0+IHByb3BzLm1hcmdpblRvcH1weCAwIDAgMDtcbiAgcGFkZGluZzogOHB4O1xuICBib3JkZXItcmFkaXVzOiAke3Byb3BzID0+IHByb3BzLmJvcmRlclJhZGl1c31weDtcbiAgb3ZlcmZsb3c6IHNjcm9sbDtcbiAgaGVpZ2h0OiAke3Byb3BzID0+IHByb3BzLmxlbmd0aCAqIDY0fXB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAke3Byb3BzID0+IHByb3BzLmJhY2tncm91bmRDb2xvcn07XG4gIGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnJlc3VsdENvbG9yfTtcbiAgYm9yZGVyOiAxcHggc29saWQgI0NDQztcbiAgbGkge1xuICAgIHBhZGRpbmc6IDA7XG4gICAgYSB7XG4gICAgICBmb250LXNpemU6ICR7cHJvcHMgPT4gcHJvcHMuZm9udFNpemV9cHg7XG4gICAgICBsaW5lLWhlaWdodDogMS41O1xuICAgICAgd2lkdGg6IGF1dG87XG4gICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICBwYWRkaW5nOiA4cHggMTJweDtcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gICAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gICAgICBib3JkZXItcmFkaXVzOiAycHg7XG4gICAgICAtd2Via2l0LXRhcC1oaWdobGlnaHQtY29sb3I6IHJnYmEoMCwwLDAsMCk7XG4gICAgICAmLmlzRm9jdXNlZCwgJjphY3RpdmUge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAke3Byb3BzID0+IHByb3BzLnNlbGVjdEJhY2tncm91bmR9O1xuICAgICAgICBjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy5zZWxlY3RDb2xvcn0gIWltcG9ydGFudDtcbiAgICAgIH1cbiAgICAgICY6dmlzaXRlZCB7XG4gICAgICAgIGNvbG9yOiBpbmhlcml0O1xuICAgICAgICB0ZXh0LWRlY29yYXRpb246IGluaGVyaXQ7XG4gICAgICB9XG4gICAgICBwIHtcbiAgICAgICAgbWFyZ2luOiAwO1xuICAgICAgfVxuICAgIH1cbiAgfVxuYDtcbmV4cG9ydHMuX19pbmZvX18gPSBbeyBuYW1lOiBcIkxvY2F0aW9uTG9va3VwXCIsIGNoaWxkcmVuOiBmYWxzZSwgdHlwZTogXCJjb21wb25lbnRcIiB9XTtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./code/LocationLookup.tsx\n");

/***/ }),

/***/ "./code/canvas.tsx":
/*!*************************!*\
  !*** ./code/canvas.tsx ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// WARNING: this file is auto generated, any changes will be lost
const framer_1 = __webpack_require__(/*! framer */ "framer");
const canvas = framer_1.CanvasStore.shared({"children":[]});


/***/ }),

/***/ "./package.js":
/*!********************!*\
  !*** ./package.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// The template for the dynamic webpack entry. Be aware of the variables

const packageJson = __webpack_require__(/*! ./package.json */ "./package.json")

const package = {
    packageJson,
    sourceModules: {},
    dependencies: {},
}

// This is a special webpack thing that watches the whole directory
// https://github.com/webpack/docs/wiki/context
const ctx = __webpack_require__("./code sync recursive \\.(t|j)s(x?)|\\.css$")

ctx.keys().forEach(key => {
    package.sourceModules[key] = () => ctx(key)
})

// The packages are passed in through a template
const packages = {}

                packages["framer"] = () => {
                    var package = {}
                    try {
                        package = __webpack_require__(/*! framer */ "framer")
                    } catch (e) {
                        console.log(e)
                    }
                    package.__framer__ = package.__framer__ || {}
                    package.__framer__.packageJson = {"name":"framer","version":"0.10.10","main":"build/framer.js","author":"Framer","license":"MIT","scripts":{"coverage":"jest --config jest.json --coverage","test":"jest --config jest.json","watch":"jest --config jest.json --watch"},"devDependencies":{"@microsoft/api-documenter":"^1.5.47","@microsoft/api-extractor":"^7","@types/chalk":"^2.2.0","@types/draft-js":"0.10.19","@types/enzyme":"^3.1.10","@types/enzyme-adapter-react-16":"^1.0.3","@types/hsluv":"https://github.com/framer/typed_hsluv#bump","@types/jest":"^23.0.0","@types/jest-diff":"^20.0.0","@types/jest-matcher-utils":"^21.0.1","@types/node":"^9.6.0","@types/react":"^16","@types/react-dom":"^16","cache-loader":"^1.2.2","chalk":"^2.4.1","convert-tsconfig-paths-to-webpack-aliases":"^0.9.2","css.escape":"^1.5.1","draft-js":"0.10.4","enzyme":"^3.3.0","enzyme-adapter-react-16":"^1.1.1","eventemitter3":"^3.1.0","fork-ts-checker-webpack-plugin":"^0.4.1","hoist-non-react-statics":"^2.5.0","hsluv":"^0.0.3","immutable":"^3.8.2","jest":"^23.1.0","jest-diff":"^23.6.0","jest-junit":"^5.2.0","progress-bar-webpack-plugin":"^1.11.0","raf":"^3.4.0","react":"~16.4","react-dev-utils":"^5.0.1","react-dom":"~16.4","semver":"^5.6.0","ts-jest":"^23.10.5","ts-loader":"^4.1.0","typescript":"^3.0.1","watch":"^1.0.2","webpack":"^4.4.1","webpack-cli":"^3.1.2","webpack-dev-server":"^3.1.10","xcssmatrix":"^0.2.2"},"peerDependencies":{"react":"^16.3","react-dom":"^16.3"},"tsdoc":{"tsdocFlavor":"AEDoc"},"framer":{"components":[{"name":"Scroll","children":true,"properties":[{"key":"direction","title":"Direction","kind":"enum","options":["horizontal","vertical","both"]}]},{"name":"Page"},{"name":"Stack"},{"name":"FramerAppleWatch38","type":"device"},{"name":"FramerAppleWatch42","type":"device"},{"name":"FramerSonySmartWatch","type":"device"},{"name":"FramerAppleIPhoneSE","type":"device"},{"name":"FramerAppleIPhone8","type":"device"},{"name":"FramerAppleIPhone8Plus","type":"device"},{"name":"FramerAppleIPhoneXS","type":"device"},{"name":"FramerAppleIPhoneXR","type":"device"},{"name":"FramerAppleIPhoneXSMax","type":"device"},{"name":"FramerGooglePixel2","type":"device"},{"name":"FramerGooglePixel2XL","type":"device"},{"name":"FramerGooglePixel3","type":"device"},{"name":"FramerGooglePixel3XL","type":"device"},{"name":"FramerSamsungNote5","type":"device"},{"name":"FramerSamsungGalaxyS9","type":"device"},{"name":"FramerAppleIPadAir","type":"device"},{"name":"FramerAppleIPadMini","type":"device"},{"name":"FramerAppleIPadPro","type":"device"},{"name":"FramerGoogleNexusTablet","type":"device"},{"name":"FramerMicrosoftSurfacePro3","type":"device"},{"name":"FramerMicrosoftSurfacePro4","type":"device"},{"name":"FramerAppleIMac","type":"device"},{"name":"FramerAppleThunderboltDisplay","type":"device"},{"name":"FramerAppleMacBook","type":"device"},{"name":"FramerAppleMacBookAir","type":"device"},{"name":"FramerAppleMacBookPro","type":"device"},{"name":"FramerDellXPS","type":"device"},{"name":"FramerMicrosoftSurfaceBook","type":"device"},{"name":"FramerSonyW850C","type":"device"},{"name":"FramerStoreArtwork","type":"device"},{"name":"FramerStoreIcon","type":"device"}]}}
                    return package
                }

package.dependencies = packages

exports.__framer__ = package


/***/ }),

/***/ "./package.json":
/*!**********************!*\
  !*** ./package.json ***!
  \**********************/
/*! exports provided: main, license, version, devDependencies, peerDependencies, framer, author, dependencies, name, default */
/***/ (function(module) {

module.exports = {"main":"dist/index.js","license":"MIT","version":"1.2.0","devDependencies":{"@types/react":"^16.4.16"},"peerDependencies":{"framer":"^0.10","react":"^16.3.0","react-dom":"^16.3.0"},"framer":{"id":"f0f52b1d-1dd6-41fd-bcc3-eade53a200a9","displayName":"Location Lookup"},"author":"Elliot Nolten","dependencies":{"styled-components":"^4.1.3"},"name":"@framer/elliot.location-lookup"};

/***/ }),

/***/ "framer":
/*!******************************************************************************************!*\
  !*** external {"root":"Framer","commonjs2":"framer","commonjs":"framer","amd":"framer"} ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_framer__;

/***/ }),

/***/ "react":
/*!**************************************************************************************!*\
  !*** external {"root":"React","commonjs2":"react","commonjs":"react","amd":"react"} ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_react__;

/***/ }),

/***/ "styled-components":
/*!************************************!*\
  !*** external "styled-components" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_styled_components__;

/***/ })

/******/ });
});