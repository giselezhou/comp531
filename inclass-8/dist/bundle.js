/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

    'use strict';

    var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

    var _particle = __webpack_require__(1);

    var _particle2 = _interopRequireDefault(_particle);

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	const getLogger = (c, height) => {
	    const log = msg => {
	        if (!msg) {
	            log.x = 30;
	            log.y = height;
	        }
	        const pt = 16;
	        c.font = `${pt}px Courier`;
	        c.fillStyle = "white";
	        c.fillText(msg, log.x, log.y);
	        log.y = log.y - (4 + pt);
	    };
	    return log;
	};
	
	const frameUpdate = cb => {
	    const rAF = time => {
	        requestAnimationFrame(rAF);
	        const diff = ~~(time - (rAF.lastTime || 0)); // ~~ is like floor
	        cb(diff);
	        rAF.lastTime = time;
	    };
	    rAF(); // go!
	};
	
	window.onload = () => {
	    const canvas = document.getElementById('app');
	    const c = canvas.getContext("2d");
	    let particles = Array(5).fill(true).map(() => particle());
	    const log = getLogger(c, canvas.height);
	    frameUpdate(dt => {
	        particles = particles.map(p => update(p, dt, canvas));
	
	        log();
	        c.fillStyle = '#000';
	        c.fillRect(0, 0, canvas.width, canvas.height);
	
	        particles.forEach(({ position, mass }) => {
	            const [x, y] = position;
	            c.fillStyle = 'red';
	            c.beginPath();
	            c.arc(x, y, mass, 0, 2 * Math.PI);
	            c.fill();
	            log(`(${mass.toFixed(2)}) @ (${x.toFixed(6)}, ${y.toFixed(6)})`);
	        });
	    });
	};

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map