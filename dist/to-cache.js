(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.toCache = factory());
}(this, (function () { 'use strict';

    var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    /**
     * 缓存模块
     *
     * @class Cache
     */
    var Cache = function () {
        function Cache() {
            _classCallCheck(this, Cache);

            this._map = {};
            this.Cache = Cache;
        }

        /**
         * 存储所有缓存
         *
         * @memberof Cache
         */


        _createClass(Cache, [{
            key: "has",


            /**
             * 是否包含某缓存
             *
             * @param {string} key 缓存的key
             * @returns {boolean}
             * @memberof Cache
             */
            value: function has(key) {
                return this._map.hasOwnProperty(key);
            }

            /**
             * 根据key获取缓存值
             *
             * @param {string} key 缓存的key
             * @returns {any}
             * @memberof Cache
             */

        }, {
            key: "get",
            value: function get(key) {
                if (this.has(key)) {
                    return this._map[key].value;
                }
                return null;
            }

            /**
             * 从缓存获取数据，如果不存在，则通过方法获取并缓存
             *
             * @param {string} key 缓存的key
             * @param {number} expires 有效期
             * @param {Function} fn 生成缓存的回掉
             * @returns {Promise<any>}
             * @memberof Cache
             */

        }, {
            key: "getAndCache",
            value: function getAndCache(key, expires, fn) {
                var _this = this;

                if (this.has(key)) {
                    return this.get(key);
                }
                return Promise.resolve(fn()).then(function (value) {
                    _this.set(key, value, expires);
                    return value;
                });
            }

            /**
             * 设置缓存数据
             *
             * @param {string} key 缓存的key
             * @param {any} value 缓存的值
             * @param {number} [expires=0] 有效期
             * @memberof Cache
             */

        }, {
            key: "set",
            value: function set(key, value) {
                var _this2 = this;

                var expires = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

                this.del(key);
                var item = { value: value };
                if (expires > 0) {
                    item.timer = setTimeout(function () {
                        _this2.del(key);
                    }, expires);
                }
                this._map[key] = item;
            }

            /**
             * 根据key删除缓存
             *
             * @param {string} key 缓存的key
             * @returns
             * @memberof Cache
             */

        }, {
            key: "del",
            value: function del(key) {
                if (!this.has(key)) {
                    return;
                }
                clearTimeout(this._map[key].timer);
                delete this._map[key];
            }
        }]);

        return Cache;
    }();

    var toCache = new Cache();

    return toCache;

})));