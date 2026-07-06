const appName = "song_finder";
const appVersion = "0.0.1";
function getDefaultExportFromCjs$1(x2) {
  return x2 && x2.__esModule && Object.prototype.hasOwnProperty.call(x2, "default") ? x2["default"] : x2;
}
var browser = { exports: {} };
var process = browser.exports = {};
var cachedSetTimeout;
var cachedClearTimeout;
function defaultSetTimout() {
  throw new Error("setTimeout has not been defined");
}
function defaultClearTimeout() {
  throw new Error("clearTimeout has not been defined");
}
(function() {
  try {
    if (typeof setTimeout === "function") {
      cachedSetTimeout = setTimeout;
    } else {
      cachedSetTimeout = defaultSetTimout;
    }
  } catch (e2) {
    cachedSetTimeout = defaultSetTimout;
  }
  try {
    if (typeof clearTimeout === "function") {
      cachedClearTimeout = clearTimeout;
    } else {
      cachedClearTimeout = defaultClearTimeout;
    }
  } catch (e2) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();
function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    return setTimeout(fun, 0);
  }
  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }
  try {
    return cachedSetTimeout(fun, 0);
  } catch (e2) {
    try {
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e22) {
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}
function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    return clearTimeout(marker);
  }
  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }
  try {
    return cachedClearTimeout(marker);
  } catch (e2) {
    try {
      return cachedClearTimeout.call(null, marker);
    } catch (e22) {
      return cachedClearTimeout.call(this, marker);
    }
  }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;
function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }
  draining = false;
  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }
  if (queue.length) {
    drainQueue();
  }
}
function drainQueue() {
  if (draining) {
    return;
  }
  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len2 = queue.length;
  while (len2) {
    currentQueue = queue;
    queue = [];
    while (++queueIndex < len2) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }
    queueIndex = -1;
    len2 = queue.length;
  }
  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}
process.nextTick = function(fun) {
  var args = new Array(arguments.length - 1);
  if (arguments.length > 1) {
    for (var i2 = 1; i2 < arguments.length; i2++) {
      args[i2 - 1] = arguments[i2];
    }
  }
  queue.push(new Item(fun, args));
  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
};
function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}
Item.prototype.run = function() {
  this.fun.apply(null, this.array);
};
process.title = "browser";
process.browser = true;
process.env = {};
process.argv = [];
process.version = "";
process.versions = {};
function noop$1() {
}
process.on = noop$1;
process.addListener = noop$1;
process.once = noop$1;
process.off = noop$1;
process.removeListener = noop$1;
process.removeAllListeners = noop$1;
process.emit = noop$1;
process.prependListener = noop$1;
process.prependOnceListener = noop$1;
process.listeners = function(name) {
  return [];
};
process.binding = function(name) {
  throw new Error("process.binding is not supported");
};
process.cwd = function() {
  return "/";
};
process.chdir = function(dir) {
  throw new Error("process.chdir is not supported");
};
process.umask = function() {
  return 0;
};
var browserExports = browser.exports;
const process$1 = /* @__PURE__ */ getDefaultExportFromCjs$1(browserExports);
var buffer = {};
var base64Js = {};
base64Js.byteLength = byteLength;
base64Js.toByteArray = toByteArray;
base64Js.fromByteArray = fromByteArray;
var lookup = [];
var revLookup = [];
var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for (var i$1 = 0, len = code.length; i$1 < len; ++i$1) {
  lookup[i$1] = code[i$1];
  revLookup[code.charCodeAt(i$1)] = i$1;
}
revLookup["-".charCodeAt(0)] = 62;
revLookup["_".charCodeAt(0)] = 63;
function getLens(b64) {
  var len2 = b64.length;
  if (len2 % 4 > 0) {
    throw new Error("Invalid string. Length must be a multiple of 4");
  }
  var validLen = b64.indexOf("=");
  if (validLen === -1) validLen = len2;
  var placeHoldersLen = validLen === len2 ? 0 : 4 - validLen % 4;
  return [validLen, placeHoldersLen];
}
function byteLength(b64) {
  var lens = getLens(b64);
  var validLen = lens[0];
  var placeHoldersLen = lens[1];
  return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
}
function _byteLength(b64, validLen, placeHoldersLen) {
  return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
}
function toByteArray(b64) {
  var tmp;
  var lens = getLens(b64);
  var validLen = lens[0];
  var placeHoldersLen = lens[1];
  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
  var curByte = 0;
  var len2 = placeHoldersLen > 0 ? validLen - 4 : validLen;
  var i2;
  for (i2 = 0; i2 < len2; i2 += 4) {
    tmp = revLookup[b64.charCodeAt(i2)] << 18 | revLookup[b64.charCodeAt(i2 + 1)] << 12 | revLookup[b64.charCodeAt(i2 + 2)] << 6 | revLookup[b64.charCodeAt(i2 + 3)];
    arr[curByte++] = tmp >> 16 & 255;
    arr[curByte++] = tmp >> 8 & 255;
    arr[curByte++] = tmp & 255;
  }
  if (placeHoldersLen === 2) {
    tmp = revLookup[b64.charCodeAt(i2)] << 2 | revLookup[b64.charCodeAt(i2 + 1)] >> 4;
    arr[curByte++] = tmp & 255;
  }
  if (placeHoldersLen === 1) {
    tmp = revLookup[b64.charCodeAt(i2)] << 10 | revLookup[b64.charCodeAt(i2 + 1)] << 4 | revLookup[b64.charCodeAt(i2 + 2)] >> 2;
    arr[curByte++] = tmp >> 8 & 255;
    arr[curByte++] = tmp & 255;
  }
  return arr;
}
function tripletToBase64(num) {
  return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
}
function encodeChunk(uint8, start, end) {
  var tmp;
  var output = [];
  for (var i2 = start; i2 < end; i2 += 3) {
    tmp = (uint8[i2] << 16 & 16711680) + (uint8[i2 + 1] << 8 & 65280) + (uint8[i2 + 2] & 255);
    output.push(tripletToBase64(tmp));
  }
  return output.join("");
}
function fromByteArray(uint8) {
  var tmp;
  var len2 = uint8.length;
  var extraBytes = len2 % 3;
  var parts = [];
  var maxChunkLength = 16383;
  for (var i2 = 0, len22 = len2 - extraBytes; i2 < len22; i2 += maxChunkLength) {
    parts.push(encodeChunk(uint8, i2, i2 + maxChunkLength > len22 ? len22 : i2 + maxChunkLength));
  }
  if (extraBytes === 1) {
    tmp = uint8[len2 - 1];
    parts.push(
      lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "=="
    );
  } else if (extraBytes === 2) {
    tmp = (uint8[len2 - 2] << 8) + uint8[len2 - 1];
    parts.push(
      lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "="
    );
  }
  return parts.join("");
}
var ieee754 = {};
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
ieee754.read = function(buffer2, offset2, isLE, mLen, nBytes) {
  var e2, m2;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = -7;
  var i2 = isLE ? nBytes - 1 : 0;
  var d2 = isLE ? -1 : 1;
  var s2 = buffer2[offset2 + i2];
  i2 += d2;
  e2 = s2 & (1 << -nBits) - 1;
  s2 >>= -nBits;
  nBits += eLen;
  for (; nBits > 0; e2 = e2 * 256 + buffer2[offset2 + i2], i2 += d2, nBits -= 8) {
  }
  m2 = e2 & (1 << -nBits) - 1;
  e2 >>= -nBits;
  nBits += mLen;
  for (; nBits > 0; m2 = m2 * 256 + buffer2[offset2 + i2], i2 += d2, nBits -= 8) {
  }
  if (e2 === 0) {
    e2 = 1 - eBias;
  } else if (e2 === eMax) {
    return m2 ? NaN : (s2 ? -1 : 1) * Infinity;
  } else {
    m2 = m2 + Math.pow(2, mLen);
    e2 = e2 - eBias;
  }
  return (s2 ? -1 : 1) * m2 * Math.pow(2, e2 - mLen);
};
ieee754.write = function(buffer2, value, offset2, isLE, mLen, nBytes) {
  var e2, m2, c2;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt2 = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
  var i2 = isLE ? 0 : nBytes - 1;
  var d2 = isLE ? 1 : -1;
  var s2 = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
  value = Math.abs(value);
  if (isNaN(value) || value === Infinity) {
    m2 = isNaN(value) ? 1 : 0;
    e2 = eMax;
  } else {
    e2 = Math.floor(Math.log(value) / Math.LN2);
    if (value * (c2 = Math.pow(2, -e2)) < 1) {
      e2--;
      c2 *= 2;
    }
    if (e2 + eBias >= 1) {
      value += rt2 / c2;
    } else {
      value += rt2 * Math.pow(2, 1 - eBias);
    }
    if (value * c2 >= 2) {
      e2++;
      c2 /= 2;
    }
    if (e2 + eBias >= eMax) {
      m2 = 0;
      e2 = eMax;
    } else if (e2 + eBias >= 1) {
      m2 = (value * c2 - 1) * Math.pow(2, mLen);
      e2 = e2 + eBias;
    } else {
      m2 = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
      e2 = 0;
    }
  }
  for (; mLen >= 8; buffer2[offset2 + i2] = m2 & 255, i2 += d2, m2 /= 256, mLen -= 8) {
  }
  e2 = e2 << mLen | m2;
  eLen += mLen;
  for (; eLen > 0; buffer2[offset2 + i2] = e2 & 255, i2 += d2, e2 /= 256, eLen -= 8) {
  }
  buffer2[offset2 + i2 - d2] |= s2 * 128;
};
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
(function(exports) {
  const base64 = base64Js;
  const ieee754$1 = ieee754;
  const customInspectSymbol = typeof Symbol === "function" && typeof Symbol["for"] === "function" ? Symbol["for"]("nodejs.util.inspect.custom") : null;
  exports.Buffer = Buffer2;
  exports.SlowBuffer = SlowBuffer;
  exports.INSPECT_MAX_BYTES = 50;
  const K_MAX_LENGTH = 2147483647;
  exports.kMaxLength = K_MAX_LENGTH;
  const { Uint8Array: GlobalUint8Array, ArrayBuffer: GlobalArrayBuffer, SharedArrayBuffer: GlobalSharedArrayBuffer } = globalThis;
  Buffer2.TYPED_ARRAY_SUPPORT = typedArraySupport();
  if (!Buffer2.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") {
    console.error(
      "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
    );
  }
  function typedArraySupport() {
    try {
      const arr = new GlobalUint8Array(1);
      const proto = { foo: function() {
        return 42;
      } };
      Object.setPrototypeOf(proto, GlobalUint8Array.prototype);
      Object.setPrototypeOf(arr, proto);
      return arr.foo() === 42;
    } catch (e2) {
      return false;
    }
  }
  Object.defineProperty(Buffer2.prototype, "parent", {
    enumerable: true,
    get: function() {
      if (!Buffer2.isBuffer(this)) return void 0;
      return this.buffer;
    }
  });
  Object.defineProperty(Buffer2.prototype, "offset", {
    enumerable: true,
    get: function() {
      if (!Buffer2.isBuffer(this)) return void 0;
      return this.byteOffset;
    }
  });
  function createBuffer(length) {
    if (length > K_MAX_LENGTH) {
      throw new RangeError('The value "' + length + '" is invalid for option "size"');
    }
    const buf = new GlobalUint8Array(length);
    Object.setPrototypeOf(buf, Buffer2.prototype);
    return buf;
  }
  function Buffer2(arg, encodingOrOffset, length) {
    if (typeof arg === "number") {
      if (typeof encodingOrOffset === "string") {
        throw new TypeError(
          'The "string" argument must be of type string. Received type number'
        );
      }
      return allocUnsafe(arg);
    }
    return from(arg, encodingOrOffset, length);
  }
  Buffer2.poolSize = 8192;
  function from(value, encodingOrOffset, length) {
    if (typeof value === "string") {
      return fromString(value, encodingOrOffset);
    }
    if (GlobalArrayBuffer.isView(value)) {
      return fromArrayView(value);
    }
    if (value == null) {
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
      );
    }
    if (isInstance(value, GlobalArrayBuffer) || value && isInstance(value.buffer, GlobalArrayBuffer)) {
      return fromArrayBuffer(value, encodingOrOffset, length);
    }
    if (typeof GlobalSharedArrayBuffer !== "undefined" && (isInstance(value, GlobalSharedArrayBuffer) || value && isInstance(value.buffer, GlobalSharedArrayBuffer))) {
      return fromArrayBuffer(value, encodingOrOffset, length);
    }
    if (typeof value === "number") {
      throw new TypeError(
        'The "value" argument must not be of type number. Received type number'
      );
    }
    const valueOf = value.valueOf && value.valueOf();
    if (valueOf != null && valueOf !== value) {
      return Buffer2.from(valueOf, encodingOrOffset, length);
    }
    const b2 = fromObject(value);
    if (b2) return b2;
    if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === "function") {
      return Buffer2.from(value[Symbol.toPrimitive]("string"), encodingOrOffset, length);
    }
    throw new TypeError(
      "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
    );
  }
  Buffer2.from = function(value, encodingOrOffset, length) {
    return from(value, encodingOrOffset, length);
  };
  Object.setPrototypeOf(Buffer2.prototype, GlobalUint8Array.prototype);
  Object.setPrototypeOf(Buffer2, GlobalUint8Array);
  function assertSize(size2) {
    if (typeof size2 !== "number") {
      throw new TypeError('"size" argument must be of type number');
    } else if (size2 < 0) {
      throw new RangeError('The value "' + size2 + '" is invalid for option "size"');
    }
  }
  function alloc(size2, fill, encoding) {
    assertSize(size2);
    if (size2 <= 0) {
      return createBuffer(size2);
    }
    if (fill !== void 0) {
      return typeof encoding === "string" ? createBuffer(size2).fill(fill, encoding) : createBuffer(size2).fill(fill);
    }
    return createBuffer(size2);
  }
  Buffer2.alloc = function(size2, fill, encoding) {
    return alloc(size2, fill, encoding);
  };
  function allocUnsafe(size2) {
    assertSize(size2);
    return createBuffer(size2 < 0 ? 0 : checked(size2) | 0);
  }
  Buffer2.allocUnsafe = function(size2) {
    return allocUnsafe(size2);
  };
  Buffer2.allocUnsafeSlow = function(size2) {
    return allocUnsafe(size2);
  };
  function fromString(string, encoding) {
    if (typeof encoding !== "string" || encoding === "") {
      encoding = "utf8";
    }
    if (!Buffer2.isEncoding(encoding)) {
      throw new TypeError("Unknown encoding: " + encoding);
    }
    const length = byteLength2(string, encoding) | 0;
    let buf = createBuffer(length);
    const actual = buf.write(string, encoding);
    if (actual !== length) {
      buf = buf.slice(0, actual);
    }
    return buf;
  }
  function fromArrayLike(array) {
    const length = array.length < 0 ? 0 : checked(array.length) | 0;
    const buf = createBuffer(length);
    for (let i2 = 0; i2 < length; i2 += 1) {
      buf[i2] = array[i2] & 255;
    }
    return buf;
  }
  function fromArrayView(arrayView) {
    if (isInstance(arrayView, GlobalUint8Array)) {
      const copy = new GlobalUint8Array(arrayView);
      return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength);
    }
    return fromArrayLike(arrayView);
  }
  function fromArrayBuffer(array, byteOffset, length) {
    if (byteOffset < 0 || array.byteLength < byteOffset) {
      throw new RangeError('"offset" is outside of buffer bounds');
    }
    if (array.byteLength < byteOffset + (length || 0)) {
      throw new RangeError('"length" is outside of buffer bounds');
    }
    let buf;
    if (byteOffset === void 0 && length === void 0) {
      buf = new GlobalUint8Array(array);
    } else if (length === void 0) {
      buf = new GlobalUint8Array(array, byteOffset);
    } else {
      buf = new GlobalUint8Array(array, byteOffset, length);
    }
    Object.setPrototypeOf(buf, Buffer2.prototype);
    return buf;
  }
  function fromObject(obj) {
    if (Buffer2.isBuffer(obj)) {
      const len2 = checked(obj.length) | 0;
      const buf = createBuffer(len2);
      if (buf.length === 0) {
        return buf;
      }
      obj.copy(buf, 0, 0, len2);
      return buf;
    }
    if (obj.length !== void 0) {
      if (typeof obj.length !== "number" || numberIsNaN(obj.length)) {
        return createBuffer(0);
      }
      return fromArrayLike(obj);
    }
    if (obj.type === "Buffer" && Array.isArray(obj.data)) {
      return fromArrayLike(obj.data);
    }
  }
  function checked(length) {
    if (length >= K_MAX_LENGTH) {
      throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + K_MAX_LENGTH.toString(16) + " bytes");
    }
    return length | 0;
  }
  function SlowBuffer(length) {
    if (+length != length) {
      length = 0;
    }
    return Buffer2.alloc(+length);
  }
  Buffer2.isBuffer = function isBuffer2(b2) {
    return b2 != null && b2._isBuffer === true && b2 !== Buffer2.prototype;
  };
  Buffer2.compare = function compare(a2, b2) {
    if (isInstance(a2, GlobalUint8Array)) a2 = Buffer2.from(a2, a2.offset, a2.byteLength);
    if (isInstance(b2, GlobalUint8Array)) b2 = Buffer2.from(b2, b2.offset, b2.byteLength);
    if (!Buffer2.isBuffer(a2) || !Buffer2.isBuffer(b2)) {
      throw new TypeError(
        'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
      );
    }
    if (a2 === b2) return 0;
    let x2 = a2.length;
    let y2 = b2.length;
    for (let i2 = 0, len2 = Math.min(x2, y2); i2 < len2; ++i2) {
      if (a2[i2] !== b2[i2]) {
        x2 = a2[i2];
        y2 = b2[i2];
        break;
      }
    }
    if (x2 < y2) return -1;
    if (y2 < x2) return 1;
    return 0;
  };
  Buffer2.isEncoding = function isEncoding(encoding) {
    switch (String(encoding).toLowerCase()) {
      case "hex":
      case "utf8":
      case "utf-8":
      case "ascii":
      case "latin1":
      case "binary":
      case "base64":
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return true;
      default:
        return false;
    }
  };
  Buffer2.concat = function concat(list, length) {
    if (!Array.isArray(list)) {
      throw new TypeError('"list" argument must be an Array of Buffers');
    }
    if (list.length === 0) {
      return Buffer2.alloc(0);
    }
    let i2;
    if (length === void 0) {
      length = 0;
      for (i2 = 0; i2 < list.length; ++i2) {
        length += list[i2].length;
      }
    }
    const buffer2 = Buffer2.allocUnsafe(length);
    let pos = 0;
    for (i2 = 0; i2 < list.length; ++i2) {
      let buf = list[i2];
      if (isInstance(buf, GlobalUint8Array)) {
        if (pos + buf.length > buffer2.length) {
          if (!Buffer2.isBuffer(buf)) buf = Buffer2.from(buf);
          buf.copy(buffer2, pos);
        } else {
          GlobalUint8Array.prototype.set.call(
            buffer2,
            buf,
            pos
          );
        }
      } else if (!Buffer2.isBuffer(buf)) {
        throw new TypeError('"list" argument must be an Array of Buffers');
      } else {
        buf.copy(buffer2, pos);
      }
      pos += buf.length;
    }
    return buffer2;
  };
  function byteLength2(string, encoding) {
    if (Buffer2.isBuffer(string)) {
      return string.length;
    }
    if (GlobalArrayBuffer.isView(string) || isInstance(string, GlobalArrayBuffer)) {
      return string.byteLength;
    }
    if (typeof string !== "string") {
      throw new TypeError(
        'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof string
      );
    }
    const len2 = string.length;
    const mustMatch = arguments.length > 2 && arguments[2] === true;
    if (!mustMatch && len2 === 0) return 0;
    let loweredCase = false;
    for (; ; ) {
      switch (encoding) {
        case "ascii":
        case "latin1":
        case "binary":
          return len2;
        case "utf8":
        case "utf-8":
          return utf8ToBytes(string).length;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return len2 * 2;
        case "hex":
          return len2 >>> 1;
        case "base64":
          return base64ToBytes(string).length;
        default:
          if (loweredCase) {
            return mustMatch ? -1 : utf8ToBytes(string).length;
          }
          encoding = ("" + encoding).toLowerCase();
          loweredCase = true;
      }
    }
  }
  Buffer2.byteLength = byteLength2;
  function slowToString(encoding, start, end) {
    let loweredCase = false;
    if (start === void 0 || start < 0) {
      start = 0;
    }
    if (start > this.length) {
      return "";
    }
    if (end === void 0 || end > this.length) {
      end = this.length;
    }
    if (end <= 0) {
      return "";
    }
    end >>>= 0;
    start >>>= 0;
    if (end <= start) {
      return "";
    }
    if (!encoding) encoding = "utf8";
    while (true) {
      switch (encoding) {
        case "hex":
          return hexSlice(this, start, end);
        case "utf8":
        case "utf-8":
          return utf8Slice(this, start, end);
        case "ascii":
          return asciiSlice(this, start, end);
        case "latin1":
        case "binary":
          return latin1Slice(this, start, end);
        case "base64":
          return base64Slice(this, start, end);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return utf16leSlice(this, start, end);
        default:
          if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
          encoding = (encoding + "").toLowerCase();
          loweredCase = true;
      }
    }
  }
  Buffer2.prototype._isBuffer = true;
  function swap(b2, n2, m2) {
    const i2 = b2[n2];
    b2[n2] = b2[m2];
    b2[m2] = i2;
  }
  Buffer2.prototype.swap16 = function swap16() {
    const len2 = this.length;
    if (len2 % 2 !== 0) {
      throw new RangeError("Buffer size must be a multiple of 16-bits");
    }
    for (let i2 = 0; i2 < len2; i2 += 2) {
      swap(this, i2, i2 + 1);
    }
    return this;
  };
  Buffer2.prototype.swap32 = function swap32() {
    const len2 = this.length;
    if (len2 % 4 !== 0) {
      throw new RangeError("Buffer size must be a multiple of 32-bits");
    }
    for (let i2 = 0; i2 < len2; i2 += 4) {
      swap(this, i2, i2 + 3);
      swap(this, i2 + 1, i2 + 2);
    }
    return this;
  };
  Buffer2.prototype.swap64 = function swap64() {
    const len2 = this.length;
    if (len2 % 8 !== 0) {
      throw new RangeError("Buffer size must be a multiple of 64-bits");
    }
    for (let i2 = 0; i2 < len2; i2 += 8) {
      swap(this, i2, i2 + 7);
      swap(this, i2 + 1, i2 + 6);
      swap(this, i2 + 2, i2 + 5);
      swap(this, i2 + 3, i2 + 4);
    }
    return this;
  };
  Buffer2.prototype.toString = function toString3() {
    const length = this.length;
    if (length === 0) return "";
    if (arguments.length === 0) return utf8Slice(this, 0, length);
    return slowToString.apply(this, arguments);
  };
  Buffer2.prototype.toLocaleString = Buffer2.prototype.toString;
  Buffer2.prototype.equals = function equals(b2) {
    if (!Buffer2.isBuffer(b2)) throw new TypeError("Argument must be a Buffer");
    if (this === b2) return true;
    return Buffer2.compare(this, b2) === 0;
  };
  Buffer2.prototype.inspect = function inspect() {
    let str = "";
    const max2 = exports.INSPECT_MAX_BYTES;
    str = this.toString("hex", 0, max2).replace(/(.{2})/g, "$1 ").trim();
    if (this.length > max2) str += " ... ";
    return "<Buffer " + str + ">";
  };
  if (customInspectSymbol) {
    Buffer2.prototype[customInspectSymbol] = Buffer2.prototype.inspect;
  }
  Buffer2.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
    if (isInstance(target, GlobalUint8Array)) {
      target = Buffer2.from(target, target.offset, target.byteLength);
    }
    if (!Buffer2.isBuffer(target)) {
      throw new TypeError(
        'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof target
      );
    }
    if (start === void 0) {
      start = 0;
    }
    if (end === void 0) {
      end = target ? target.length : 0;
    }
    if (thisStart === void 0) {
      thisStart = 0;
    }
    if (thisEnd === void 0) {
      thisEnd = this.length;
    }
    if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
      throw new RangeError("out of range index");
    }
    if (thisStart >= thisEnd && start >= end) {
      return 0;
    }
    if (thisStart >= thisEnd) {
      return -1;
    }
    if (start >= end) {
      return 1;
    }
    start >>>= 0;
    end >>>= 0;
    thisStart >>>= 0;
    thisEnd >>>= 0;
    if (this === target) return 0;
    let x2 = thisEnd - thisStart;
    let y2 = end - start;
    const len2 = Math.min(x2, y2);
    const thisCopy = this.slice(thisStart, thisEnd);
    const targetCopy = target.slice(start, end);
    for (let i2 = 0; i2 < len2; ++i2) {
      if (thisCopy[i2] !== targetCopy[i2]) {
        x2 = thisCopy[i2];
        y2 = targetCopy[i2];
        break;
      }
    }
    if (x2 < y2) return -1;
    if (y2 < x2) return 1;
    return 0;
  };
  function bidirectionalIndexOf(buffer2, val, byteOffset, encoding, dir) {
    if (buffer2.length === 0) return -1;
    if (typeof byteOffset === "string") {
      encoding = byteOffset;
      byteOffset = 0;
    } else if (byteOffset > 2147483647) {
      byteOffset = 2147483647;
    } else if (byteOffset < -2147483648) {
      byteOffset = -2147483648;
    }
    byteOffset = +byteOffset;
    if (numberIsNaN(byteOffset)) {
      byteOffset = dir ? 0 : buffer2.length - 1;
    }
    if (byteOffset < 0) byteOffset = buffer2.length + byteOffset;
    if (byteOffset >= buffer2.length) {
      if (dir) return -1;
      else byteOffset = buffer2.length - 1;
    } else if (byteOffset < 0) {
      if (dir) byteOffset = 0;
      else return -1;
    }
    if (typeof val === "string") {
      val = Buffer2.from(val, encoding);
    }
    if (Buffer2.isBuffer(val)) {
      if (val.length === 0) {
        return -1;
      }
      return arrayIndexOf(buffer2, val, byteOffset, encoding, dir);
    } else if (typeof val === "number") {
      val = val & 255;
      if (typeof GlobalUint8Array.prototype.indexOf === "function") {
        if (dir) {
          return GlobalUint8Array.prototype.indexOf.call(buffer2, val, byteOffset);
        } else {
          return GlobalUint8Array.prototype.lastIndexOf.call(buffer2, val, byteOffset);
        }
      }
      return arrayIndexOf(buffer2, [val], byteOffset, encoding, dir);
    }
    throw new TypeError("val must be string, number or Buffer");
  }
  function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
    let indexSize = 1;
    let arrLength = arr.length;
    let valLength = val.length;
    if (encoding !== void 0) {
      encoding = String(encoding).toLowerCase();
      if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
        if (arr.length < 2 || val.length < 2) {
          return -1;
        }
        indexSize = 2;
        arrLength /= 2;
        valLength /= 2;
        byteOffset /= 2;
      }
    }
    function read(buf, i3) {
      if (indexSize === 1) {
        return buf[i3];
      } else {
        return buf.readUInt16BE(i3 * indexSize);
      }
    }
    let i2;
    if (dir) {
      let foundIndex = -1;
      for (i2 = byteOffset; i2 < arrLength; i2++) {
        if (read(arr, i2) === read(val, foundIndex === -1 ? 0 : i2 - foundIndex)) {
          if (foundIndex === -1) foundIndex = i2;
          if (i2 - foundIndex + 1 === valLength) return foundIndex * indexSize;
        } else {
          if (foundIndex !== -1) i2 -= i2 - foundIndex;
          foundIndex = -1;
        }
      }
    } else {
      if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
      for (i2 = byteOffset; i2 >= 0; i2--) {
        let found = true;
        for (let j = 0; j < valLength; j++) {
          if (read(arr, i2 + j) !== read(val, j)) {
            found = false;
            break;
          }
        }
        if (found) return i2;
      }
    }
    return -1;
  }
  Buffer2.prototype.includes = function includes(val, byteOffset, encoding) {
    return this.indexOf(val, byteOffset, encoding) !== -1;
  };
  Buffer2.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
    return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
  };
  Buffer2.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
    return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
  };
  function hexWrite(buf, string, offset2, length) {
    offset2 = Number(offset2) || 0;
    const remaining = buf.length - offset2;
    if (!length) {
      length = remaining;
    } else {
      length = Number(length);
      if (length > remaining) {
        length = remaining;
      }
    }
    const strLen = string.length;
    if (length > strLen / 2) {
      length = strLen / 2;
    }
    let i2;
    for (i2 = 0; i2 < length; ++i2) {
      const parsed = parseInt(string.substr(i2 * 2, 2), 16);
      if (numberIsNaN(parsed)) return i2;
      buf[offset2 + i2] = parsed;
    }
    return i2;
  }
  function utf8Write(buf, string, offset2, length) {
    return blitBuffer(utf8ToBytes(string, buf.length - offset2), buf, offset2, length);
  }
  function asciiWrite(buf, string, offset2, length) {
    return blitBuffer(asciiToBytes(string), buf, offset2, length);
  }
  function base64Write(buf, string, offset2, length) {
    return blitBuffer(base64ToBytes(string), buf, offset2, length);
  }
  function ucs2Write(buf, string, offset2, length) {
    return blitBuffer(utf16leToBytes(string, buf.length - offset2), buf, offset2, length);
  }
  Buffer2.prototype.write = function write(string, offset2, length, encoding) {
    if (offset2 === void 0) {
      encoding = "utf8";
      length = this.length;
      offset2 = 0;
    } else if (length === void 0 && typeof offset2 === "string") {
      encoding = offset2;
      length = this.length;
      offset2 = 0;
    } else if (isFinite(offset2)) {
      offset2 = offset2 >>> 0;
      if (isFinite(length)) {
        length = length >>> 0;
        if (encoding === void 0) encoding = "utf8";
      } else {
        encoding = length;
        length = void 0;
      }
    } else {
      throw new Error(
        "Buffer.write(string, encoding, offset[, length]) is no longer supported"
      );
    }
    const remaining = this.length - offset2;
    if (length === void 0 || length > remaining) length = remaining;
    if (string.length > 0 && (length < 0 || offset2 < 0) || offset2 > this.length) {
      throw new RangeError("Attempt to write outside buffer bounds");
    }
    if (!encoding) encoding = "utf8";
    let loweredCase = false;
    for (; ; ) {
      switch (encoding) {
        case "hex":
          return hexWrite(this, string, offset2, length);
        case "utf8":
        case "utf-8":
          return utf8Write(this, string, offset2, length);
        case "ascii":
        case "latin1":
        case "binary":
          return asciiWrite(this, string, offset2, length);
        case "base64":
          return base64Write(this, string, offset2, length);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return ucs2Write(this, string, offset2, length);
        default:
          if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
          encoding = ("" + encoding).toLowerCase();
          loweredCase = true;
      }
    }
  };
  Buffer2.prototype.toJSON = function toJSON() {
    return {
      type: "Buffer",
      data: Array.prototype.slice.call(this._arr || this, 0)
    };
  };
  function base64Slice(buf, start, end) {
    if (start === 0 && end === buf.length) {
      return base64.fromByteArray(buf);
    } else {
      return base64.fromByteArray(buf.slice(start, end));
    }
  }
  function utf8Slice(buf, start, end) {
    end = Math.min(buf.length, end);
    const res = [];
    let i2 = start;
    while (i2 < end) {
      const firstByte = buf[i2];
      let codePoint = null;
      let bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
      if (i2 + bytesPerSequence <= end) {
        let secondByte, thirdByte, fourthByte, tempCodePoint;
        switch (bytesPerSequence) {
          case 1:
            if (firstByte < 128) {
              codePoint = firstByte;
            }
            break;
          case 2:
            secondByte = buf[i2 + 1];
            if ((secondByte & 192) === 128) {
              tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
              if (tempCodePoint > 127) {
                codePoint = tempCodePoint;
              }
            }
            break;
          case 3:
            secondByte = buf[i2 + 1];
            thirdByte = buf[i2 + 2];
            if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
              tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
              if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                codePoint = tempCodePoint;
              }
            }
            break;
          case 4:
            secondByte = buf[i2 + 1];
            thirdByte = buf[i2 + 2];
            fourthByte = buf[i2 + 3];
            if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
              tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
              if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                codePoint = tempCodePoint;
              }
            }
        }
      }
      if (codePoint === null) {
        codePoint = 65533;
        bytesPerSequence = 1;
      } else if (codePoint > 65535) {
        codePoint -= 65536;
        res.push(codePoint >>> 10 & 1023 | 55296);
        codePoint = 56320 | codePoint & 1023;
      }
      res.push(codePoint);
      i2 += bytesPerSequence;
    }
    return decodeCodePointsArray(res);
  }
  const MAX_ARGUMENTS_LENGTH = 4096;
  function decodeCodePointsArray(codePoints) {
    const len2 = codePoints.length;
    if (len2 <= MAX_ARGUMENTS_LENGTH) {
      return String.fromCharCode.apply(String, codePoints);
    }
    let res = "";
    let i2 = 0;
    while (i2 < len2) {
      res += String.fromCharCode.apply(
        String,
        codePoints.slice(i2, i2 += MAX_ARGUMENTS_LENGTH)
      );
    }
    return res;
  }
  function asciiSlice(buf, start, end) {
    let ret = "";
    end = Math.min(buf.length, end);
    for (let i2 = start; i2 < end; ++i2) {
      ret += String.fromCharCode(buf[i2] & 127);
    }
    return ret;
  }
  function latin1Slice(buf, start, end) {
    let ret = "";
    end = Math.min(buf.length, end);
    for (let i2 = start; i2 < end; ++i2) {
      ret += String.fromCharCode(buf[i2]);
    }
    return ret;
  }
  function hexSlice(buf, start, end) {
    const len2 = buf.length;
    if (!start || start < 0) start = 0;
    if (!end || end < 0 || end > len2) end = len2;
    let out = "";
    for (let i2 = start; i2 < end; ++i2) {
      out += hexSliceLookupTable[buf[i2]];
    }
    return out;
  }
  function utf16leSlice(buf, start, end) {
    const bytes = buf.slice(start, end);
    let res = "";
    for (let i2 = 0; i2 < bytes.length - 1; i2 += 2) {
      res += String.fromCharCode(bytes[i2] + bytes[i2 + 1] * 256);
    }
    return res;
  }
  Buffer2.prototype.slice = function slice(start, end) {
    const len2 = this.length;
    start = ~~start;
    end = end === void 0 ? len2 : ~~end;
    if (start < 0) {
      start += len2;
      if (start < 0) start = 0;
    } else if (start > len2) {
      start = len2;
    }
    if (end < 0) {
      end += len2;
      if (end < 0) end = 0;
    } else if (end > len2) {
      end = len2;
    }
    if (end < start) end = start;
    const newBuf = this.subarray(start, end);
    Object.setPrototypeOf(newBuf, Buffer2.prototype);
    return newBuf;
  };
  function checkOffset(offset2, ext, length) {
    if (offset2 % 1 !== 0 || offset2 < 0) throw new RangeError("offset is not uint");
    if (offset2 + ext > length) throw new RangeError("Trying to access beyond buffer length");
  }
  Buffer2.prototype.readUintLE = Buffer2.prototype.readUIntLE = function readUIntLE(offset2, byteLength3, noAssert) {
    offset2 = offset2 >>> 0;
    byteLength3 = byteLength3 >>> 0;
    if (!noAssert) checkOffset(offset2, byteLength3, this.length);
    let val = this[offset2];
    let mul = 1;
    let i2 = 0;
    while (++i2 < byteLength3 && (mul *= 256)) {
      val += this[offset2 + i2] * mul;
    }
    return val;
  };
  Buffer2.prototype.readUintBE = Buffer2.prototype.readUIntBE = function readUIntBE(offset2, byteLength3, noAssert) {
    offset2 = offset2 >>> 0;
    byteLength3 = byteLength3 >>> 0;
    if (!noAssert) {
      checkOffset(offset2, byteLength3, this.length);
    }
    let val = this[offset2 + --byteLength3];
    let mul = 1;
    while (byteLength3 > 0 && (mul *= 256)) {
      val += this[offset2 + --byteLength3] * mul;
    }
    return val;
  };
  Buffer2.prototype.readUint8 = Buffer2.prototype.readUInt8 = function readUInt8(offset2, noAssert) {
    offset2 = offset2 >>> 0;
    if (!noAssert) checkOffset(offset2, 1, this.length);
    return this[offset2];
  };
  Buffer2.prototype.readUint16LE = Buffer2.prototype.readUInt16LE = function readUInt16LE(offset2, noAssert) {
    offset2 = offset2 >>> 0;
    if (!noAssert) checkOffset(offset2, 2, this.length);
    return this[offset2] | this[offset2 + 1] << 8;
  };
  Buffer2.prototype.readUint16BE = Buffer2.prototype.readUInt16BE = function readUInt16BE(offset2, noAssert) {
    offset2 = offset2 >>> 0;
    if (!noAssert) checkOffset(offset2, 2, this.length);
    return this[offset2] << 8 | this[offset2 + 1];
  };
  Buffer2.prototype.readUint32LE = Buffer2.prototype.readUInt32LE = function readUInt32LE(offset2, noAssert) {
    offset2 = offset2 >>> 0;
    if (!noAssert) checkOffset(offset2, 4, this.length);
    return (this[offset2] | this[offset2 + 1] << 8 | this[offset2 + 2] << 16) + this[offset2 + 3] * 16777216;
  };
  Buffer2.prototype.readUint32BE = Buffer2.prototype.readUInt32BE = function readUInt32BE(offset2, noAssert) {
    offset2 = offset2 >>> 0;
    if (!noAssert) checkOffset(offset2, 4, this.length);
    return this[offset2] * 16777216 + (this[offset2 + 1] << 16 | this[offset2 + 2] << 8 | this[offset2 + 3]);
  };
  Buffer2.prototype.readBigUInt64LE = defineBigIntMethod(function readBigUInt64LE(offset2) {
    offset2 = offset2 >>> 0;
    validateNumber(offset2, "offset");
    const first = this[offset2];
    const last = this[offset2 + 7];
    if (first === void 0 || last === void 0) {
      boundsError(offset2, this.length - 8);
    }
    const lo = first + this[++offset2] * 2 ** 8 + this[++offset2] * 2 ** 16 + this[++offset2] * 2 ** 24;
    const hi = this[++offset2] + this[++offset2] * 2 ** 8 + this[++offset2] * 2 ** 16 + last * 2 ** 24;
    return BigInt(lo) + (BigInt(hi) << BigInt(32));
  });
  Buffer2.prototype.readBigUInt64BE = defineBigIntMethod(function readBigUInt64BE(offset2) {
    offset2 = offset2 >>> 0;
    validateNumber(offset2, "offset");
    const first = this[offset2];
    const last = this[offset2 + 7];
    if (first === void 0 || last === void 0) {
      boundsError(offset2, this.length - 8);
    }
    const hi = first * 2 ** 24 + this[++offset2] * 2 ** 16 + this[++offset2] * 2 ** 8 + this[++offset2];
    const lo = this[++offset2] * 2 ** 24 + this[++offset2] * 2 ** 16 + this[++offset2] * 2 ** 8 + last;
    return (BigInt(hi) << BigInt(32)) + BigInt(lo);
  });
  Buffer2.prototype.readIntLE = function readIntLE(offset2, byteLength3, noAssert) {
    offset2 = offset2 >>> 0;
    byteLength3 = byteLength3 >>> 0;
    if (!noAssert) checkOffset(offset2, byteLength3, this.length);
    let val = this[offset2];
    let mul = 1;
    let i2 = 0;
    while (++i2 < byteLength3 && (mul *= 256)) {
      val += this[offset2 + i2] * mul;
    }
    mul *= 128;
    if (val >= mul) val -= Math.pow(2, 8 * byteLength3);
    return val;
  };
  Buffer2.prototype.readIntBE = function readIntBE(offset2, byteLength3, noAssert) {
    offset2 = offset2 >>> 0;
    byteLength3 = byteLength3 >>> 0;
    if (!noAssert) checkOffset(offset2, byteLength3, this.length);
    let i2 = byteLength3;
    let mul = 1;
    let val = this[offset2 + --i2];
    while (i2 > 0 && (mul *= 256)) {
      val += this[offset2 + --i2] * mul;
    }
    mul *= 128;
    if (val >= mul) val -= Math.pow(2, 8 * byteLength3);
    return val;
  };
  Buffer2.prototype.readInt8 = function readInt8(offset2, noAssert) {
    offset2 = offset2 >>> 0;
    if (!noAssert) checkOffset(offset2, 1, this.length);
    if (!(this[offset2] & 128)) return this[offset2];
    return (255 - this[offset2] + 1) * -1;
  };
  Buffer2.prototype.readInt16LE = function readInt16LE(offset2, noAssert) {
    offset2 = offset2 >>> 0;
    if (!noAssert) checkOffset(offset2, 2, this.length);
    const val = this[offset2] | this[offset2 + 1] << 8;
    return val & 32768 ? val | 4294901760 : val;
  };
  Buffer2.prototype.readInt16BE = function readInt16BE(offset2, noAssert) {
    offset2 = offset2 >>> 0;
    if (!noAssert) checkOffset(offset2, 2, this.length);
    const val = this[offset2 + 1] | this[offset2] << 8;
    return val & 32768 ? val | 4294901760 : val;
  };
  Buffer2.prototype.readInt32LE = function readInt32LE(offset2, noAssert) {
    offset2 = offset2 >>> 0;
    if (!noAssert) checkOffset(offset2, 4, this.length);
    return this[offset2] | this[offset2 + 1] << 8 | this[offset2 + 2] << 16 | this[offset2 + 3] << 24;
  };
  Buffer2.prototype.readInt32BE = function readInt32BE(offset2, noAssert) {
    offset2 = offset2 >>> 0;
    if (!noAssert) checkOffset(offset2, 4, this.length);
    return this[offset2] << 24 | this[offset2 + 1] << 16 | this[offset2 + 2] << 8 | this[offset2 + 3];
  };
  Buffer2.prototype.readBigInt64LE = defineBigIntMethod(function readBigInt64LE(offset2) {
    offset2 = offset2 >>> 0;
    validateNumber(offset2, "offset");
    const first = this[offset2];
    const last = this[offset2 + 7];
    if (first === void 0 || last === void 0) {
      boundsError(offset2, this.length - 8);
    }
    const val = this[offset2 + 4] + this[offset2 + 5] * 2 ** 8 + this[offset2 + 6] * 2 ** 16 + (last << 24);
    return (BigInt(val) << BigInt(32)) + BigInt(first + this[++offset2] * 2 ** 8 + this[++offset2] * 2 ** 16 + this[++offset2] * 2 ** 24);
  });
  Buffer2.prototype.readBigInt64BE = defineBigIntMethod(function readBigInt64BE(offset2) {
    offset2 = offset2 >>> 0;
    validateNumber(offset2, "offset");
    const first = this[offset2];
    const last = this[offset2 + 7];
    if (first === void 0 || last === void 0) {
      boundsError(offset2, this.length - 8);
    }
    const val = (first << 24) + // Overflow
    this[++offset2] * 2 ** 16 + this[++offset2] * 2 ** 8 + this[++offset2];
    return (BigInt(val) << BigInt(32)) + BigInt(this[++offset2] * 2 ** 24 + this[++offset2] * 2 ** 16 + this[++offset2] * 2 ** 8 + last);
  });
  Buffer2.prototype.readFloatLE = function readFloatLE(offset2, noAssert) {
    offset2 = offset2 >>> 0;
    if (!noAssert) checkOffset(offset2, 4, this.length);
    return ieee754$1.read(this, offset2, true, 23, 4);
  };
  Buffer2.prototype.readFloatBE = function readFloatBE(offset2, noAssert) {
    offset2 = offset2 >>> 0;
    if (!noAssert) checkOffset(offset2, 4, this.length);
    return ieee754$1.read(this, offset2, false, 23, 4);
  };
  Buffer2.prototype.readDoubleLE = function readDoubleLE(offset2, noAssert) {
    offset2 = offset2 >>> 0;
    if (!noAssert) checkOffset(offset2, 8, this.length);
    return ieee754$1.read(this, offset2, true, 52, 8);
  };
  Buffer2.prototype.readDoubleBE = function readDoubleBE(offset2, noAssert) {
    offset2 = offset2 >>> 0;
    if (!noAssert) checkOffset(offset2, 8, this.length);
    return ieee754$1.read(this, offset2, false, 52, 8);
  };
  function checkInt(buf, value, offset2, ext, max2, min2) {
    if (!Buffer2.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
    if (value > max2 || value < min2) throw new RangeError('"value" argument is out of bounds');
    if (offset2 + ext > buf.length) throw new RangeError("Index out of range");
  }
  Buffer2.prototype.writeUintLE = Buffer2.prototype.writeUIntLE = function writeUIntLE(value, offset2, byteLength3, noAssert) {
    value = +value;
    offset2 = offset2 >>> 0;
    byteLength3 = byteLength3 >>> 0;
    if (!noAssert) {
      const maxBytes = Math.pow(2, 8 * byteLength3) - 1;
      checkInt(this, value, offset2, byteLength3, maxBytes, 0);
    }
    let mul = 1;
    let i2 = 0;
    this[offset2] = value & 255;
    while (++i2 < byteLength3 && (mul *= 256)) {
      this[offset2 + i2] = value / mul & 255;
    }
    return offset2 + byteLength3;
  };
  Buffer2.prototype.writeUintBE = Buffer2.prototype.writeUIntBE = function writeUIntBE(value, offset2, byteLength3, noAssert) {
    value = +value;
    offset2 = offset2 >>> 0;
    byteLength3 = byteLength3 >>> 0;
    if (!noAssert) {
      const maxBytes = Math.pow(2, 8 * byteLength3) - 1;
      checkInt(this, value, offset2, byteLength3, maxBytes, 0);
    }
    let i2 = byteLength3 - 1;
    let mul = 1;
    this[offset2 + i2] = value & 255;
    while (--i2 >= 0 && (mul *= 256)) {
      this[offset2 + i2] = value / mul & 255;
    }
    return offset2 + byteLength3;
  };
  Buffer2.prototype.writeUint8 = Buffer2.prototype.writeUInt8 = function writeUInt8(value, offset2, noAssert) {
    value = +value;
    offset2 = offset2 >>> 0;
    if (!noAssert) checkInt(this, value, offset2, 1, 255, 0);
    this[offset2] = value & 255;
    return offset2 + 1;
  };
  Buffer2.prototype.writeUint16LE = Buffer2.prototype.writeUInt16LE = function writeUInt16LE(value, offset2, noAssert) {
    value = +value;
    offset2 = offset2 >>> 0;
    if (!noAssert) checkInt(this, value, offset2, 2, 65535, 0);
    this[offset2] = value & 255;
    this[offset2 + 1] = value >>> 8;
    return offset2 + 2;
  };
  Buffer2.prototype.writeUint16BE = Buffer2.prototype.writeUInt16BE = function writeUInt16BE(value, offset2, noAssert) {
    value = +value;
    offset2 = offset2 >>> 0;
    if (!noAssert) checkInt(this, value, offset2, 2, 65535, 0);
    this[offset2] = value >>> 8;
    this[offset2 + 1] = value & 255;
    return offset2 + 2;
  };
  Buffer2.prototype.writeUint32LE = Buffer2.prototype.writeUInt32LE = function writeUInt32LE(value, offset2, noAssert) {
    value = +value;
    offset2 = offset2 >>> 0;
    if (!noAssert) checkInt(this, value, offset2, 4, 4294967295, 0);
    this[offset2 + 3] = value >>> 24;
    this[offset2 + 2] = value >>> 16;
    this[offset2 + 1] = value >>> 8;
    this[offset2] = value & 255;
    return offset2 + 4;
  };
  Buffer2.prototype.writeUint32BE = Buffer2.prototype.writeUInt32BE = function writeUInt32BE(value, offset2, noAssert) {
    value = +value;
    offset2 = offset2 >>> 0;
    if (!noAssert) checkInt(this, value, offset2, 4, 4294967295, 0);
    this[offset2] = value >>> 24;
    this[offset2 + 1] = value >>> 16;
    this[offset2 + 2] = value >>> 8;
    this[offset2 + 3] = value & 255;
    return offset2 + 4;
  };
  function wrtBigUInt64LE(buf, value, offset2, min2, max2) {
    checkIntBI(value, min2, max2, buf, offset2, 7);
    let lo = Number(value & BigInt(4294967295));
    buf[offset2++] = lo;
    lo = lo >> 8;
    buf[offset2++] = lo;
    lo = lo >> 8;
    buf[offset2++] = lo;
    lo = lo >> 8;
    buf[offset2++] = lo;
    let hi = Number(value >> BigInt(32) & BigInt(4294967295));
    buf[offset2++] = hi;
    hi = hi >> 8;
    buf[offset2++] = hi;
    hi = hi >> 8;
    buf[offset2++] = hi;
    hi = hi >> 8;
    buf[offset2++] = hi;
    return offset2;
  }
  function wrtBigUInt64BE(buf, value, offset2, min2, max2) {
    checkIntBI(value, min2, max2, buf, offset2, 7);
    let lo = Number(value & BigInt(4294967295));
    buf[offset2 + 7] = lo;
    lo = lo >> 8;
    buf[offset2 + 6] = lo;
    lo = lo >> 8;
    buf[offset2 + 5] = lo;
    lo = lo >> 8;
    buf[offset2 + 4] = lo;
    let hi = Number(value >> BigInt(32) & BigInt(4294967295));
    buf[offset2 + 3] = hi;
    hi = hi >> 8;
    buf[offset2 + 2] = hi;
    hi = hi >> 8;
    buf[offset2 + 1] = hi;
    hi = hi >> 8;
    buf[offset2] = hi;
    return offset2 + 8;
  }
  Buffer2.prototype.writeBigUInt64LE = defineBigIntMethod(function writeBigUInt64LE(value, offset2 = 0) {
    return wrtBigUInt64LE(this, value, offset2, BigInt(0), BigInt("0xffffffffffffffff"));
  });
  Buffer2.prototype.writeBigUInt64BE = defineBigIntMethod(function writeBigUInt64BE(value, offset2 = 0) {
    return wrtBigUInt64BE(this, value, offset2, BigInt(0), BigInt("0xffffffffffffffff"));
  });
  Buffer2.prototype.writeIntLE = function writeIntLE(value, offset2, byteLength3, noAssert) {
    value = +value;
    offset2 = offset2 >>> 0;
    if (!noAssert) {
      const limit = Math.pow(2, 8 * byteLength3 - 1);
      checkInt(this, value, offset2, byteLength3, limit - 1, -limit);
    }
    let i2 = 0;
    let mul = 1;
    let sub = 0;
    this[offset2] = value & 255;
    while (++i2 < byteLength3 && (mul *= 256)) {
      if (value < 0 && sub === 0 && this[offset2 + i2 - 1] !== 0) {
        sub = 1;
      }
      this[offset2 + i2] = (value / mul >> 0) - sub & 255;
    }
    return offset2 + byteLength3;
  };
  Buffer2.prototype.writeIntBE = function writeIntBE(value, offset2, byteLength3, noAssert) {
    value = +value;
    offset2 = offset2 >>> 0;
    if (!noAssert) {
      const limit = Math.pow(2, 8 * byteLength3 - 1);
      checkInt(this, value, offset2, byteLength3, limit - 1, -limit);
    }
    let i2 = byteLength3 - 1;
    let mul = 1;
    let sub = 0;
    this[offset2 + i2] = value & 255;
    while (--i2 >= 0 && (mul *= 256)) {
      if (value < 0 && sub === 0 && this[offset2 + i2 + 1] !== 0) {
        sub = 1;
      }
      this[offset2 + i2] = (value / mul >> 0) - sub & 255;
    }
    return offset2 + byteLength3;
  };
  Buffer2.prototype.writeInt8 = function writeInt8(value, offset2, noAssert) {
    value = +value;
    offset2 = offset2 >>> 0;
    if (!noAssert) checkInt(this, value, offset2, 1, 127, -128);
    if (value < 0) value = 255 + value + 1;
    this[offset2] = value & 255;
    return offset2 + 1;
  };
  Buffer2.prototype.writeInt16LE = function writeInt16LE(value, offset2, noAssert) {
    value = +value;
    offset2 = offset2 >>> 0;
    if (!noAssert) checkInt(this, value, offset2, 2, 32767, -32768);
    this[offset2] = value & 255;
    this[offset2 + 1] = value >>> 8;
    return offset2 + 2;
  };
  Buffer2.prototype.writeInt16BE = function writeInt16BE(value, offset2, noAssert) {
    value = +value;
    offset2 = offset2 >>> 0;
    if (!noAssert) checkInt(this, value, offset2, 2, 32767, -32768);
    this[offset2] = value >>> 8;
    this[offset2 + 1] = value & 255;
    return offset2 + 2;
  };
  Buffer2.prototype.writeInt32LE = function writeInt32LE(value, offset2, noAssert) {
    value = +value;
    offset2 = offset2 >>> 0;
    if (!noAssert) checkInt(this, value, offset2, 4, 2147483647, -2147483648);
    this[offset2] = value & 255;
    this[offset2 + 1] = value >>> 8;
    this[offset2 + 2] = value >>> 16;
    this[offset2 + 3] = value >>> 24;
    return offset2 + 4;
  };
  Buffer2.prototype.writeInt32BE = function writeInt32BE(value, offset2, noAssert) {
    value = +value;
    offset2 = offset2 >>> 0;
    if (!noAssert) checkInt(this, value, offset2, 4, 2147483647, -2147483648);
    if (value < 0) value = 4294967295 + value + 1;
    this[offset2] = value >>> 24;
    this[offset2 + 1] = value >>> 16;
    this[offset2 + 2] = value >>> 8;
    this[offset2 + 3] = value & 255;
    return offset2 + 4;
  };
  Buffer2.prototype.writeBigInt64LE = defineBigIntMethod(function writeBigInt64LE(value, offset2 = 0) {
    return wrtBigUInt64LE(this, value, offset2, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
  });
  Buffer2.prototype.writeBigInt64BE = defineBigIntMethod(function writeBigInt64BE(value, offset2 = 0) {
    return wrtBigUInt64BE(this, value, offset2, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
  });
  function checkIEEE754(buf, value, offset2, ext, max2, min2) {
    if (offset2 + ext > buf.length) throw new RangeError("Index out of range");
    if (offset2 < 0) throw new RangeError("Index out of range");
  }
  function writeFloat(buf, value, offset2, littleEndian, noAssert) {
    value = +value;
    offset2 = offset2 >>> 0;
    if (!noAssert) {
      checkIEEE754(buf, value, offset2, 4);
    }
    ieee754$1.write(buf, value, offset2, littleEndian, 23, 4);
    return offset2 + 4;
  }
  Buffer2.prototype.writeFloatLE = function writeFloatLE(value, offset2, noAssert) {
    return writeFloat(this, value, offset2, true, noAssert);
  };
  Buffer2.prototype.writeFloatBE = function writeFloatBE(value, offset2, noAssert) {
    return writeFloat(this, value, offset2, false, noAssert);
  };
  function writeDouble(buf, value, offset2, littleEndian, noAssert) {
    value = +value;
    offset2 = offset2 >>> 0;
    if (!noAssert) {
      checkIEEE754(buf, value, offset2, 8);
    }
    ieee754$1.write(buf, value, offset2, littleEndian, 52, 8);
    return offset2 + 8;
  }
  Buffer2.prototype.writeDoubleLE = function writeDoubleLE(value, offset2, noAssert) {
    return writeDouble(this, value, offset2, true, noAssert);
  };
  Buffer2.prototype.writeDoubleBE = function writeDoubleBE(value, offset2, noAssert) {
    return writeDouble(this, value, offset2, false, noAssert);
  };
  Buffer2.prototype.copy = function copy(target, targetStart, start, end) {
    if (!Buffer2.isBuffer(target)) throw new TypeError("argument should be a Buffer");
    if (!start) start = 0;
    if (!end && end !== 0) end = this.length;
    if (targetStart >= target.length) targetStart = target.length;
    if (!targetStart) targetStart = 0;
    if (end > 0 && end < start) end = start;
    if (end === start) return 0;
    if (target.length === 0 || this.length === 0) return 0;
    if (targetStart < 0) {
      throw new RangeError("targetStart out of bounds");
    }
    if (start < 0 || start >= this.length) throw new RangeError("Index out of range");
    if (end < 0) throw new RangeError("sourceEnd out of bounds");
    if (end > this.length) end = this.length;
    if (target.length - targetStart < end - start) {
      end = target.length - targetStart + start;
    }
    const len2 = end - start;
    if (this === target && typeof GlobalUint8Array.prototype.copyWithin === "function") {
      this.copyWithin(targetStart, start, end);
    } else {
      GlobalUint8Array.prototype.set.call(
        target,
        this.subarray(start, end),
        targetStart
      );
    }
    return len2;
  };
  Buffer2.prototype.fill = function fill(val, start, end, encoding) {
    if (typeof val === "string") {
      if (typeof start === "string") {
        encoding = start;
        start = 0;
        end = this.length;
      } else if (typeof end === "string") {
        encoding = end;
        end = this.length;
      }
      if (encoding !== void 0 && typeof encoding !== "string") {
        throw new TypeError("encoding must be a string");
      }
      if (typeof encoding === "string" && !Buffer2.isEncoding(encoding)) {
        throw new TypeError("Unknown encoding: " + encoding);
      }
      if (val.length === 1) {
        const code2 = val.charCodeAt(0);
        if (encoding === "utf8" && code2 < 128 || encoding === "latin1") {
          val = code2;
        }
      }
    } else if (typeof val === "number") {
      val = val & 255;
    } else if (typeof val === "boolean") {
      val = Number(val);
    }
    if (start < 0 || this.length < start || this.length < end) {
      throw new RangeError("Out of range index");
    }
    if (end <= start) {
      return this;
    }
    start = start >>> 0;
    end = end === void 0 ? this.length : end >>> 0;
    if (!val) val = 0;
    let i2;
    if (typeof val === "number") {
      for (i2 = start; i2 < end; ++i2) {
        this[i2] = val;
      }
    } else {
      const bytes = Buffer2.isBuffer(val) ? val : Buffer2.from(val, encoding);
      const len2 = bytes.length;
      if (len2 === 0) {
        throw new TypeError('The value "' + val + '" is invalid for argument "value"');
      }
      for (i2 = 0; i2 < end - start; ++i2) {
        this[i2 + start] = bytes[i2 % len2];
      }
    }
    return this;
  };
  const errors = {};
  function E2(sym, getMessage, Base) {
    errors[sym] = class NodeError extends Base {
      constructor() {
        super();
        Object.defineProperty(this, "message", {
          value: getMessage.apply(this, arguments),
          writable: true,
          configurable: true
        });
        this.name = `${this.name} [${sym}]`;
        this.stack;
        delete this.name;
      }
      get code() {
        return sym;
      }
      set code(value) {
        Object.defineProperty(this, "code", {
          configurable: true,
          enumerable: true,
          value,
          writable: true
        });
      }
      toString() {
        return `${this.name} [${sym}]: ${this.message}`;
      }
    };
  }
  E2(
    "ERR_BUFFER_OUT_OF_BOUNDS",
    function(name) {
      if (name) {
        return `${name} is outside of buffer bounds`;
      }
      return "Attempt to access memory outside buffer bounds";
    },
    RangeError
  );
  E2(
    "ERR_INVALID_ARG_TYPE",
    function(name, actual) {
      return `The "${name}" argument must be of type number. Received type ${typeof actual}`;
    },
    TypeError
  );
  E2(
    "ERR_OUT_OF_RANGE",
    function(str, range, input) {
      let msg = `The value of "${str}" is out of range.`;
      let received = input;
      if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
        received = addNumericalSeparator(String(input));
      } else if (typeof input === "bigint") {
        received = String(input);
        if (input > BigInt(2) ** BigInt(32) || input < -(BigInt(2) ** BigInt(32))) {
          received = addNumericalSeparator(received);
        }
        received += "n";
      }
      msg += ` It must be ${range}. Received ${received}`;
      return msg;
    },
    RangeError
  );
  function addNumericalSeparator(val) {
    let res = "";
    let i2 = val.length;
    const start = val[0] === "-" ? 1 : 0;
    for (; i2 >= start + 4; i2 -= 3) {
      res = `_${val.slice(i2 - 3, i2)}${res}`;
    }
    return `${val.slice(0, i2)}${res}`;
  }
  function checkBounds(buf, offset2, byteLength3) {
    validateNumber(offset2, "offset");
    if (buf[offset2] === void 0 || buf[offset2 + byteLength3] === void 0) {
      boundsError(offset2, buf.length - (byteLength3 + 1));
    }
  }
  function checkIntBI(value, min2, max2, buf, offset2, byteLength3) {
    if (value > max2 || value < min2) {
      const n2 = typeof min2 === "bigint" ? "n" : "";
      let range;
      {
        if (min2 === 0 || min2 === BigInt(0)) {
          range = `>= 0${n2} and < 2${n2} ** ${(byteLength3 + 1) * 8}${n2}`;
        } else {
          range = `>= -(2${n2} ** ${(byteLength3 + 1) * 8 - 1}${n2}) and < 2 ** ${(byteLength3 + 1) * 8 - 1}${n2}`;
        }
      }
      throw new errors.ERR_OUT_OF_RANGE("value", range, value);
    }
    checkBounds(buf, offset2, byteLength3);
  }
  function validateNumber(value, name) {
    if (typeof value !== "number") {
      throw new errors.ERR_INVALID_ARG_TYPE(name, "number", value);
    }
  }
  function boundsError(value, length, type) {
    if (Math.floor(value) !== value) {
      validateNumber(value, type);
      throw new errors.ERR_OUT_OF_RANGE("offset", "an integer", value);
    }
    if (length < 0) {
      throw new errors.ERR_BUFFER_OUT_OF_BOUNDS();
    }
    throw new errors.ERR_OUT_OF_RANGE(
      "offset",
      `>= ${0} and <= ${length}`,
      value
    );
  }
  const INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
  function base64clean(str) {
    str = str.split("=")[0];
    str = str.trim().replace(INVALID_BASE64_RE, "");
    if (str.length < 2) return "";
    while (str.length % 4 !== 0) {
      str = str + "=";
    }
    return str;
  }
  function utf8ToBytes(string, units) {
    units = units || Infinity;
    let codePoint;
    const length = string.length;
    let leadSurrogate = null;
    const bytes = [];
    for (let i2 = 0; i2 < length; ++i2) {
      codePoint = string.charCodeAt(i2);
      if (codePoint > 55295 && codePoint < 57344) {
        if (!leadSurrogate) {
          if (codePoint > 56319) {
            if ((units -= 3) > -1) bytes.push(239, 191, 189);
            continue;
          } else if (i2 + 1 === length) {
            if ((units -= 3) > -1) bytes.push(239, 191, 189);
            continue;
          }
          leadSurrogate = codePoint;
          continue;
        }
        if (codePoint < 56320) {
          if ((units -= 3) > -1) bytes.push(239, 191, 189);
          leadSurrogate = codePoint;
          continue;
        }
        codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
      } else if (leadSurrogate) {
        if ((units -= 3) > -1) bytes.push(239, 191, 189);
      }
      leadSurrogate = null;
      if (codePoint < 128) {
        if ((units -= 1) < 0) break;
        bytes.push(codePoint);
      } else if (codePoint < 2048) {
        if ((units -= 2) < 0) break;
        bytes.push(
          codePoint >> 6 | 192,
          codePoint & 63 | 128
        );
      } else if (codePoint < 65536) {
        if ((units -= 3) < 0) break;
        bytes.push(
          codePoint >> 12 | 224,
          codePoint >> 6 & 63 | 128,
          codePoint & 63 | 128
        );
      } else if (codePoint < 1114112) {
        if ((units -= 4) < 0) break;
        bytes.push(
          codePoint >> 18 | 240,
          codePoint >> 12 & 63 | 128,
          codePoint >> 6 & 63 | 128,
          codePoint & 63 | 128
        );
      } else {
        throw new Error("Invalid code point");
      }
    }
    return bytes;
  }
  function asciiToBytes(str) {
    const byteArray = [];
    for (let i2 = 0; i2 < str.length; ++i2) {
      byteArray.push(str.charCodeAt(i2) & 255);
    }
    return byteArray;
  }
  function utf16leToBytes(str, units) {
    let c2, hi, lo;
    const byteArray = [];
    for (let i2 = 0; i2 < str.length; ++i2) {
      if ((units -= 2) < 0) break;
      c2 = str.charCodeAt(i2);
      hi = c2 >> 8;
      lo = c2 % 256;
      byteArray.push(lo);
      byteArray.push(hi);
    }
    return byteArray;
  }
  function base64ToBytes(str) {
    return base64.toByteArray(base64clean(str));
  }
  function blitBuffer(src, dst, offset2, length) {
    let i2;
    for (i2 = 0; i2 < length; ++i2) {
      if (i2 + offset2 >= dst.length || i2 >= src.length) break;
      dst[i2 + offset2] = src[i2];
    }
    return i2;
  }
  function isInstance(obj, type) {
    return obj instanceof type || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type.name;
  }
  function numberIsNaN(obj) {
    return obj !== obj;
  }
  const hexSliceLookupTable = (function() {
    const alphabet = "0123456789abcdef";
    const table = new Array(256);
    for (let i2 = 0; i2 < 16; ++i2) {
      const i16 = i2 * 16;
      for (let j = 0; j < 16; ++j) {
        table[i16 + j] = alphabet[i2] + alphabet[j];
      }
    }
    return table;
  })();
  function defineBigIntMethod(fn) {
    return typeof BigInt === "undefined" ? BufferBigIntNotDefined : fn;
  }
  function BufferBigIntNotDefined() {
    throw new Error("BigInt not supported");
  }
})(buffer);
const Buffer = buffer.Buffer;
function getDefaultExportFromCjs(x2) {
  return x2 && x2.__esModule && Object.prototype.hasOwnProperty.call(x2, "default") ? x2["default"] : x2;
}
var debug_1$1;
var hasRequiredDebug$1;
function requireDebug$1() {
  if (hasRequiredDebug$1) return debug_1$1;
  hasRequiredDebug$1 = 1;
  var define_process_env_default2 = {};
  const debug = typeof process$1 === "object" && define_process_env_default2 && define_process_env_default2.NODE_DEBUG && /\bsemver\b/i.test(define_process_env_default2.NODE_DEBUG) ? (...args) => console.error("SEMVER", ...args) : () => {
  };
  debug_1$1 = debug;
  return debug_1$1;
}
var constants$1;
var hasRequiredConstants$1;
function requireConstants$1() {
  if (hasRequiredConstants$1) return constants$1;
  hasRequiredConstants$1 = 1;
  const SEMVER_SPEC_VERSION = "2.0.0";
  const MAX_LENGTH = 256;
  const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
  9007199254740991;
  const MAX_SAFE_COMPONENT_LENGTH = 16;
  const MAX_SAFE_BUILD_LENGTH = MAX_LENGTH - 6;
  const RELEASE_TYPES = [
    "major",
    "premajor",
    "minor",
    "preminor",
    "patch",
    "prepatch",
    "prerelease"
  ];
  constants$1 = {
    MAX_LENGTH,
    MAX_SAFE_COMPONENT_LENGTH,
    MAX_SAFE_BUILD_LENGTH,
    MAX_SAFE_INTEGER,
    RELEASE_TYPES,
    SEMVER_SPEC_VERSION,
    FLAG_INCLUDE_PRERELEASE: 1,
    FLAG_LOOSE: 2
  };
  return constants$1;
}
var re$2 = { exports: {} };
var hasRequiredRe$1;
function requireRe$1() {
  if (hasRequiredRe$1) return re$2.exports;
  hasRequiredRe$1 = 1;
  (function(module, exports) {
    const {
      MAX_SAFE_COMPONENT_LENGTH,
      MAX_SAFE_BUILD_LENGTH,
      MAX_LENGTH
    } = requireConstants$1();
    const debug = requireDebug$1();
    exports = module.exports = {};
    const re2 = exports.re = [];
    const safeRe = exports.safeRe = [];
    const src = exports.src = [];
    const safeSrc = exports.safeSrc = [];
    const t3 = exports.t = {};
    let R2 = 0;
    const LETTERDASHNUMBER = "[a-zA-Z0-9-]";
    const safeRegexReplacements = [
      ["\\s", 1],
      ["\\d", MAX_LENGTH],
      [LETTERDASHNUMBER, MAX_SAFE_BUILD_LENGTH]
    ];
    const makeSafeRegex = (value) => {
      for (const [token, max2] of safeRegexReplacements) {
        value = value.split(`${token}*`).join(`${token}{0,${max2}}`).split(`${token}+`).join(`${token}{1,${max2}}`);
      }
      return value;
    };
    const createToken = (name, value, isGlobal) => {
      const safe = makeSafeRegex(value);
      const index = R2++;
      debug(name, index, value);
      t3[name] = index;
      src[index] = value;
      safeSrc[index] = safe;
      re2[index] = new RegExp(value, isGlobal ? "g" : void 0);
      safeRe[index] = new RegExp(safe, isGlobal ? "g" : void 0);
    };
    createToken("NUMERICIDENTIFIER", "0|[1-9]\\d*");
    createToken("NUMERICIDENTIFIERLOOSE", "\\d+");
    createToken("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${LETTERDASHNUMBER}*`);
    createToken("MAINVERSION", `(${src[t3.NUMERICIDENTIFIER]})\\.(${src[t3.NUMERICIDENTIFIER]})\\.(${src[t3.NUMERICIDENTIFIER]})`);
    createToken("MAINVERSIONLOOSE", `(${src[t3.NUMERICIDENTIFIERLOOSE]})\\.(${src[t3.NUMERICIDENTIFIERLOOSE]})\\.(${src[t3.NUMERICIDENTIFIERLOOSE]})`);
    createToken("PRERELEASEIDENTIFIER", `(?:${src[t3.NONNUMERICIDENTIFIER]}|${src[t3.NUMERICIDENTIFIER]})`);
    createToken("PRERELEASEIDENTIFIERLOOSE", `(?:${src[t3.NONNUMERICIDENTIFIER]}|${src[t3.NUMERICIDENTIFIERLOOSE]})`);
    createToken("PRERELEASE", `(?:-(${src[t3.PRERELEASEIDENTIFIER]}(?:\\.${src[t3.PRERELEASEIDENTIFIER]})*))`);
    createToken("PRERELEASELOOSE", `(?:-?(${src[t3.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${src[t3.PRERELEASEIDENTIFIERLOOSE]})*))`);
    createToken("BUILDIDENTIFIER", `${LETTERDASHNUMBER}+`);
    createToken("BUILD", `(?:\\+(${src[t3.BUILDIDENTIFIER]}(?:\\.${src[t3.BUILDIDENTIFIER]})*))`);
    createToken("FULLPLAIN", `v?${src[t3.MAINVERSION]}${src[t3.PRERELEASE]}?${src[t3.BUILD]}?`);
    createToken("FULL", `^${src[t3.FULLPLAIN]}$`);
    createToken("LOOSEPLAIN", `[v=\\s]*${src[t3.MAINVERSIONLOOSE]}${src[t3.PRERELEASELOOSE]}?${src[t3.BUILD]}?`);
    createToken("LOOSE", `^${src[t3.LOOSEPLAIN]}$`);
    createToken("GTLT", "((?:<|>)?=?)");
    createToken("XRANGEIDENTIFIERLOOSE", `${src[t3.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`);
    createToken("XRANGEIDENTIFIER", `${src[t3.NUMERICIDENTIFIER]}|x|X|\\*`);
    createToken("XRANGEPLAIN", `[v=\\s]*(${src[t3.XRANGEIDENTIFIER]})(?:\\.(${src[t3.XRANGEIDENTIFIER]})(?:\\.(${src[t3.XRANGEIDENTIFIER]})(?:${src[t3.PRERELEASE]})?${src[t3.BUILD]}?)?)?`);
    createToken("XRANGEPLAINLOOSE", `[v=\\s]*(${src[t3.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t3.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t3.XRANGEIDENTIFIERLOOSE]})(?:${src[t3.PRERELEASELOOSE]})?${src[t3.BUILD]}?)?)?`);
    createToken("XRANGE", `^${src[t3.GTLT]}\\s*${src[t3.XRANGEPLAIN]}$`);
    createToken("XRANGELOOSE", `^${src[t3.GTLT]}\\s*${src[t3.XRANGEPLAINLOOSE]}$`);
    createToken("COERCEPLAIN", `${"(^|[^\\d])(\\d{1,"}${MAX_SAFE_COMPONENT_LENGTH}})(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?`);
    createToken("COERCE", `${src[t3.COERCEPLAIN]}(?:$|[^\\d])`);
    createToken("COERCEFULL", src[t3.COERCEPLAIN] + `(?:${src[t3.PRERELEASE]})?(?:${src[t3.BUILD]})?(?:$|[^\\d])`);
    createToken("COERCERTL", src[t3.COERCE], true);
    createToken("COERCERTLFULL", src[t3.COERCEFULL], true);
    createToken("LONETILDE", "(?:~>?)");
    createToken("TILDETRIM", `(\\s*)${src[t3.LONETILDE]}\\s+`, true);
    exports.tildeTrimReplace = "$1~";
    createToken("TILDE", `^${src[t3.LONETILDE]}${src[t3.XRANGEPLAIN]}$`);
    createToken("TILDELOOSE", `^${src[t3.LONETILDE]}${src[t3.XRANGEPLAINLOOSE]}$`);
    createToken("LONECARET", "(?:\\^)");
    createToken("CARETTRIM", `(\\s*)${src[t3.LONECARET]}\\s+`, true);
    exports.caretTrimReplace = "$1^";
    createToken("CARET", `^${src[t3.LONECARET]}${src[t3.XRANGEPLAIN]}$`);
    createToken("CARETLOOSE", `^${src[t3.LONECARET]}${src[t3.XRANGEPLAINLOOSE]}$`);
    createToken("COMPARATORLOOSE", `^${src[t3.GTLT]}\\s*(${src[t3.LOOSEPLAIN]})$|^$`);
    createToken("COMPARATOR", `^${src[t3.GTLT]}\\s*(${src[t3.FULLPLAIN]})$|^$`);
    createToken("COMPARATORTRIM", `(\\s*)${src[t3.GTLT]}\\s*(${src[t3.LOOSEPLAIN]}|${src[t3.XRANGEPLAIN]})`, true);
    exports.comparatorTrimReplace = "$1$2$3";
    createToken("HYPHENRANGE", `^\\s*(${src[t3.XRANGEPLAIN]})\\s+-\\s+(${src[t3.XRANGEPLAIN]})\\s*$`);
    createToken("HYPHENRANGELOOSE", `^\\s*(${src[t3.XRANGEPLAINLOOSE]})\\s+-\\s+(${src[t3.XRANGEPLAINLOOSE]})\\s*$`);
    createToken("STAR", "(<|>)?=?\\s*\\*");
    createToken("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$");
    createToken("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
  })(re$2, re$2.exports);
  return re$2.exports;
}
var parseOptions_1$1;
var hasRequiredParseOptions$1;
function requireParseOptions$1() {
  if (hasRequiredParseOptions$1) return parseOptions_1$1;
  hasRequiredParseOptions$1 = 1;
  const looseOption = Object.freeze({ loose: true });
  const emptyOpts = Object.freeze({});
  const parseOptions = (options) => {
    if (!options) {
      return emptyOpts;
    }
    if (typeof options !== "object") {
      return looseOption;
    }
    return options;
  };
  parseOptions_1$1 = parseOptions;
  return parseOptions_1$1;
}
var identifiers$1;
var hasRequiredIdentifiers$1;
function requireIdentifiers$1() {
  if (hasRequiredIdentifiers$1) return identifiers$1;
  hasRequiredIdentifiers$1 = 1;
  const numeric = /^[0-9]+$/;
  const compareIdentifiers = (a2, b2) => {
    if (typeof a2 === "number" && typeof b2 === "number") {
      return a2 === b2 ? 0 : a2 < b2 ? -1 : 1;
    }
    const anum = numeric.test(a2);
    const bnum = numeric.test(b2);
    if (anum && bnum) {
      a2 = +a2;
      b2 = +b2;
    }
    return a2 === b2 ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a2 < b2 ? -1 : 1;
  };
  const rcompareIdentifiers = (a2, b2) => compareIdentifiers(b2, a2);
  identifiers$1 = {
    compareIdentifiers,
    rcompareIdentifiers
  };
  return identifiers$1;
}
var semver$1;
var hasRequiredSemver$1;
function requireSemver$1() {
  if (hasRequiredSemver$1) return semver$1;
  hasRequiredSemver$1 = 1;
  const debug = requireDebug$1();
  const { MAX_LENGTH, MAX_SAFE_INTEGER } = requireConstants$1();
  const { safeRe: re2, t: t3 } = requireRe$1();
  const parseOptions = requireParseOptions$1();
  const { compareIdentifiers } = requireIdentifiers$1();
  const isPrereleaseIdentifier = (prerelease, identifier) => {
    const identifiers2 = identifier.split(".");
    if (identifiers2.length > prerelease.length) {
      return false;
    }
    for (let i2 = 0; i2 < identifiers2.length; i2++) {
      if (compareIdentifiers(prerelease[i2], identifiers2[i2]) !== 0) {
        return false;
      }
    }
    return true;
  };
  class SemVer {
    constructor(version, options) {
      options = parseOptions(options);
      if (version instanceof SemVer) {
        if (version.loose === !!options.loose && version.includePrerelease === !!options.includePrerelease) {
          return version;
        } else {
          version = version.version;
        }
      } else if (typeof version !== "string") {
        throw new TypeError(`Invalid version. Must be a string. Got type "${typeof version}".`);
      }
      if (version.length > MAX_LENGTH) {
        throw new TypeError(
          `version is longer than ${MAX_LENGTH} characters`
        );
      }
      debug("SemVer", version, options);
      this.options = options;
      this.loose = !!options.loose;
      this.includePrerelease = !!options.includePrerelease;
      const m2 = version.trim().match(options.loose ? re2[t3.LOOSE] : re2[t3.FULL]);
      if (!m2) {
        throw new TypeError(`Invalid Version: ${version}`);
      }
      this.raw = version;
      this.major = +m2[1];
      this.minor = +m2[2];
      this.patch = +m2[3];
      if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
        throw new TypeError("Invalid major version");
      }
      if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
        throw new TypeError("Invalid minor version");
      }
      if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
        throw new TypeError("Invalid patch version");
      }
      if (!m2[4]) {
        this.prerelease = [];
      } else {
        this.prerelease = m2[4].split(".").map((id) => {
          if (/^[0-9]+$/.test(id)) {
            const num = +id;
            if (num >= 0 && num < MAX_SAFE_INTEGER) {
              return num;
            }
          }
          return id;
        });
      }
      this.build = m2[5] ? m2[5].split(".") : [];
      this.format();
    }
    format() {
      this.version = `${this.major}.${this.minor}.${this.patch}`;
      if (this.prerelease.length) {
        this.version += `-${this.prerelease.join(".")}`;
      }
      return this.version;
    }
    toString() {
      return this.version;
    }
    compare(other) {
      debug("SemVer.compare", this.version, this.options, other);
      if (!(other instanceof SemVer)) {
        if (typeof other === "string" && other === this.version) {
          return 0;
        }
        other = new SemVer(other, this.options);
      }
      if (other.version === this.version) {
        return 0;
      }
      return this.compareMain(other) || this.comparePre(other);
    }
    compareMain(other) {
      if (!(other instanceof SemVer)) {
        other = new SemVer(other, this.options);
      }
      if (this.major < other.major) {
        return -1;
      }
      if (this.major > other.major) {
        return 1;
      }
      if (this.minor < other.minor) {
        return -1;
      }
      if (this.minor > other.minor) {
        return 1;
      }
      if (this.patch < other.patch) {
        return -1;
      }
      if (this.patch > other.patch) {
        return 1;
      }
      return 0;
    }
    comparePre(other) {
      if (!(other instanceof SemVer)) {
        other = new SemVer(other, this.options);
      }
      if (this.prerelease.length && !other.prerelease.length) {
        return -1;
      } else if (!this.prerelease.length && other.prerelease.length) {
        return 1;
      } else if (!this.prerelease.length && !other.prerelease.length) {
        return 0;
      }
      let i2 = 0;
      do {
        const a2 = this.prerelease[i2];
        const b2 = other.prerelease[i2];
        debug("prerelease compare", i2, a2, b2);
        if (a2 === void 0 && b2 === void 0) {
          return 0;
        } else if (b2 === void 0) {
          return 1;
        } else if (a2 === void 0) {
          return -1;
        } else if (a2 === b2) {
          continue;
        } else {
          return compareIdentifiers(a2, b2);
        }
      } while (++i2);
    }
    compareBuild(other) {
      if (!(other instanceof SemVer)) {
        other = new SemVer(other, this.options);
      }
      let i2 = 0;
      do {
        const a2 = this.build[i2];
        const b2 = other.build[i2];
        debug("build compare", i2, a2, b2);
        if (a2 === void 0 && b2 === void 0) {
          return 0;
        } else if (b2 === void 0) {
          return 1;
        } else if (a2 === void 0) {
          return -1;
        } else if (a2 === b2) {
          continue;
        } else {
          return compareIdentifiers(a2, b2);
        }
      } while (++i2);
    }
    // preminor will bump the version up to the next minor release, and immediately
    // down to pre-release. premajor and prepatch work the same way.
    inc(release, identifier, identifierBase) {
      if (release.startsWith("pre")) {
        if (!identifier && identifierBase === false) {
          throw new Error("invalid increment argument: identifier is empty");
        }
        if (identifier) {
          const match = `-${identifier}`.match(this.options.loose ? re2[t3.PRERELEASELOOSE] : re2[t3.PRERELEASE]);
          if (!match || match[1] !== identifier) {
            throw new Error(`invalid identifier: ${identifier}`);
          }
        }
      }
      switch (release) {
        case "premajor":
          this.prerelease.length = 0;
          this.patch = 0;
          this.minor = 0;
          this.major++;
          this.inc("pre", identifier, identifierBase);
          break;
        case "preminor":
          this.prerelease.length = 0;
          this.patch = 0;
          this.minor++;
          this.inc("pre", identifier, identifierBase);
          break;
        case "prepatch":
          this.prerelease.length = 0;
          this.inc("patch", identifier, identifierBase);
          this.inc("pre", identifier, identifierBase);
          break;
        // If the input is a non-prerelease version, this acts the same as
        // prepatch.
        case "prerelease":
          if (this.prerelease.length === 0) {
            this.inc("patch", identifier, identifierBase);
          }
          this.inc("pre", identifier, identifierBase);
          break;
        case "release":
          if (this.prerelease.length === 0) {
            throw new Error(`version ${this.raw} is not a prerelease`);
          }
          this.prerelease.length = 0;
          break;
        case "major":
          if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) {
            this.major++;
          }
          this.minor = 0;
          this.patch = 0;
          this.prerelease = [];
          break;
        case "minor":
          if (this.patch !== 0 || this.prerelease.length === 0) {
            this.minor++;
          }
          this.patch = 0;
          this.prerelease = [];
          break;
        case "patch":
          if (this.prerelease.length === 0) {
            this.patch++;
          }
          this.prerelease = [];
          break;
        // This probably shouldn't be used publicly.
        // 1.0.0 'pre' would become 1.0.0-0 which is the wrong direction.
        case "pre": {
          const base = Number(identifierBase) ? 1 : 0;
          if (this.prerelease.length === 0) {
            this.prerelease = [base];
          } else {
            let i2 = this.prerelease.length;
            while (--i2 >= 0) {
              if (typeof this.prerelease[i2] === "number") {
                this.prerelease[i2]++;
                i2 = -2;
              }
            }
            if (i2 === -1) {
              if (identifier === this.prerelease.join(".") && identifierBase === false) {
                throw new Error("invalid increment argument: identifier already exists");
              }
              this.prerelease.push(base);
            }
          }
          if (identifier) {
            let prerelease = [identifier, base];
            if (identifierBase === false) {
              prerelease = [identifier];
            }
            if (isPrereleaseIdentifier(this.prerelease, identifier)) {
              const prereleaseBase = this.prerelease[identifier.split(".").length];
              if (isNaN(prereleaseBase)) {
                this.prerelease = prerelease;
              }
            } else {
              this.prerelease = prerelease;
            }
          }
          break;
        }
        default:
          throw new Error(`invalid increment argument: ${release}`);
      }
      this.raw = this.format();
      if (this.build.length) {
        this.raw += `+${this.build.join(".")}`;
      }
      return this;
    }
  }
  semver$1 = SemVer;
  return semver$1;
}
var major_1$1;
var hasRequiredMajor$1;
function requireMajor$1() {
  if (hasRequiredMajor$1) return major_1$1;
  hasRequiredMajor$1 = 1;
  const SemVer = requireSemver$1();
  const major2 = (a2, loose) => new SemVer(a2, loose).major;
  major_1$1 = major2;
  return major_1$1;
}
var majorExports = requireMajor$1();
const major = /* @__PURE__ */ getDefaultExportFromCjs(majorExports);
var parse_1$1;
var hasRequiredParse$1;
function requireParse$1() {
  if (hasRequiredParse$1) return parse_1$1;
  hasRequiredParse$1 = 1;
  const SemVer = requireSemver$1();
  const parse = (version, options, throwErrors = false) => {
    if (version instanceof SemVer) {
      return version;
    }
    try {
      return new SemVer(version, options);
    } catch (er) {
      if (!throwErrors) {
        return null;
      }
      throw er;
    }
  };
  parse_1$1 = parse;
  return parse_1$1;
}
var valid_1$1;
var hasRequiredValid$1;
function requireValid$1() {
  if (hasRequiredValid$1) return valid_1$1;
  hasRequiredValid$1 = 1;
  const parse = requireParse$1();
  const valid2 = (version, options) => {
    const v2 = parse(version, options);
    return v2 ? v2.version : null;
  };
  valid_1$1 = valid2;
  return valid_1$1;
}
var validExports = requireValid$1();
const valid = /* @__PURE__ */ getDefaultExportFromCjs(validExports);
/*!
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */
class ProxyBus {
  bus;
  constructor(bus2) {
    if (typeof bus2.getVersion !== "function" || !valid(bus2.getVersion())) {
      console.warn("Proxying an event bus with an unknown or invalid version");
    } else if (major(bus2.getVersion()) !== major(this.getVersion())) {
      console.warn(
        "Proxying an event bus of version " + bus2.getVersion() + " with " + this.getVersion()
      );
    }
    this.bus = bus2;
  }
  getVersion() {
    return "3.3.3";
  }
  subscribe(name, handler) {
    this.bus.subscribe(name, handler);
  }
  unsubscribe(name, handler) {
    this.bus.unsubscribe(name, handler);
  }
  emit(name, ...event) {
    this.bus.emit(name, ...event);
  }
}
/*!
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */
class SimpleBus {
  handlers = /* @__PURE__ */ new Map();
  getVersion() {
    return "3.3.3";
  }
  subscribe(name, handler) {
    this.handlers.set(
      name,
      (this.handlers.get(name) || []).concat(
        handler
      )
    );
  }
  unsubscribe(name, handler) {
    this.handlers.set(
      name,
      (this.handlers.get(name) || []).filter((h2) => h2 !== handler)
    );
  }
  emit(name, ...event) {
    const handlers = this.handlers.get(name) || [];
    handlers.forEach((h2) => {
      try {
        ;
        h2(event[0]);
      } catch (e2) {
        console.error("could not invoke event listener", e2);
      }
    });
  }
}
/*!
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */
let bus = null;
function getBus() {
  if (bus !== null) {
    return bus;
  }
  if (typeof window === "undefined") {
    return new Proxy({}, {
      get: () => {
        return () => console.error(
          "Window not available, EventBus can not be established!"
        );
      }
    });
  }
  if (window.OC?._eventBus && typeof window._nc_event_bus === "undefined") {
    console.warn(
      "found old event bus instance at OC._eventBus. Update your version!"
    );
    window._nc_event_bus = window.OC._eventBus;
  }
  if (typeof window?._nc_event_bus !== "undefined") {
    bus = new ProxyBus(window._nc_event_bus);
  } else {
    bus = window._nc_event_bus = new SimpleBus();
  }
  return bus;
}
function subscribe(name, handler) {
  getBus().subscribe(name, handler);
}
function unsubscribe(name, handler) {
  getBus().unsubscribe(name, handler);
}
function emit(name, ...event) {
  getBus().emit(name, ...event);
}
const linkToRemoteBase = (service) => "/remote.php/" + service;
const generateRemoteUrl = (service, options) => {
  const baseURL = getBaseUrl();
  return baseURL + linkToRemoteBase(service);
};
const _generateUrlPath = (url, params, options) => {
  const allOptions = Object.assign({
    escape: true
  }, {});
  const _build = function(text2, vars) {
    vars = vars || {};
    return text2.replace(
      /{([^{}]*)}/g,
      function(a2, b2) {
        const r2 = vars[b2];
        if (allOptions.escape) {
          return typeof r2 === "string" || typeof r2 === "number" ? encodeURIComponent(r2.toString()) : encodeURIComponent(a2);
        } else {
          return typeof r2 === "string" || typeof r2 === "number" ? r2.toString() : a2;
        }
      }
    );
  };
  if (url.charAt(0) !== "/") {
    url = "/" + url;
  }
  return _build(url, {});
};
const generateUrl = (url, params, options) => {
  const allOptions = Object.assign({
    noRewrite: false
  }, {});
  const baseOrRootURL = getRootUrl();
  if (window?.OC?.config?.modRewriteWorking === true && !allOptions.noRewrite) {
    return baseOrRootURL + _generateUrlPath(url);
  }
  return baseOrRootURL + "/index.php" + _generateUrlPath(url);
};
const getBaseUrl = () => window.location.protocol + "//" + window.location.host + getRootUrl();
function getRootUrl() {
  let webroot = window._oc_webroot;
  if (typeof webroot === "undefined") {
    webroot = location.pathname;
    const pos = webroot.indexOf("/index.php/");
    if (pos !== -1) {
      webroot = webroot.slice(0, pos);
    } else {
      const index = webroot.indexOf("/", 1);
      webroot = webroot.slice(0, index > 0 ? index : void 0);
    }
  }
  return webroot;
}
class ScopedStorage {
  static GLOBAL_SCOPE_VOLATILE = "nextcloud_vol";
  static GLOBAL_SCOPE_PERSISTENT = "nextcloud_per";
  scope;
  wrapped;
  constructor(scope, wrapped, persistent) {
    this.scope = `${persistent ? ScopedStorage.GLOBAL_SCOPE_PERSISTENT : ScopedStorage.GLOBAL_SCOPE_VOLATILE}_${btoa(scope)}_`;
    this.wrapped = wrapped;
  }
  scopeKey(key) {
    return `${this.scope}${key}`;
  }
  setItem(key, value) {
    this.wrapped.setItem(this.scopeKey(key), value);
  }
  getItem(key) {
    return this.wrapped.getItem(this.scopeKey(key));
  }
  removeItem(key) {
    this.wrapped.removeItem(this.scopeKey(key));
  }
  clear() {
    Object.keys(this.wrapped).filter((key) => key.startsWith(this.scope)).map(this.wrapped.removeItem.bind(this.wrapped));
  }
}
class StorageBuilder {
  appId;
  persisted = false;
  clearedOnLogout = false;
  constructor(appId) {
    this.appId = appId;
  }
  persist(persist = true) {
    this.persisted = persist;
    return this;
  }
  clearOnLogout(clear = true) {
    this.clearedOnLogout = clear;
    return this;
  }
  build() {
    return new ScopedStorage(this.appId, this.persisted ? window.localStorage : window.sessionStorage, !this.clearedOnLogout);
  }
}
function getBuilder(appId) {
  return new StorageBuilder(appId);
}
_subscribeToTokenUpdates();
function getRequestToken() {
  if (globalThis._nc_auth_requestToken) {
    return globalThis._nc_auth_requestToken;
  }
  if (globalThis.document) {
    return document.head.dataset.requesttoken ?? null;
  }
  return null;
}
function setRequestToken(token) {
  if (!token || typeof token !== "string") {
    throw new Error("Invalid CSRF token given", { cause: { token } });
  }
  if (globalThis._nc_auth_requestToken === token) {
    return;
  }
  globalThis._nc_auth_requestToken = token;
  if (globalThis.document) {
    document.head.dataset.requesttoken = token;
  }
  emit("csrf-token-update", { token, _internal: true });
}
async function fetchRequestToken() {
  const url = generateUrl("/csrftoken");
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Could not fetch CSRF token from API", { cause: response });
  }
  try {
    const { token } = await response.json();
    setRequestToken(token);
    return token;
  } catch (error) {
    throw new Error("Could not parse CSRF token from API response", { cause: error });
  }
}
function onRequestTokenUpdate(observer2) {
  const wrapper = async ({ token }) => {
    try {
      observer2(token);
    } catch (error) {
      console.error("Error updating CSRF token observer", error);
    }
  };
  subscribe("csrf-token-update", wrapper);
  return () => unsubscribe("csrf-token-update", wrapper);
}
function _subscribeToTokenUpdates() {
  subscribe("csrf-token-update", ({ token, _internal }) => {
    if (!_internal) {
      setRequestToken(token);
    }
  });
}
/*!
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */
getBuilder("public").persist().build();
let currentUser;
function getAttribute(el, attribute) {
  if (el) {
    return el.getAttribute(attribute);
  }
  return null;
}
function getCurrentUser() {
  if (currentUser !== void 0) {
    return currentUser;
  }
  const head = document?.getElementsByTagName("head")[0];
  if (!head) {
    return null;
  }
  const uid = getAttribute(head, "data-user");
  if (uid === null) {
    currentUser = null;
    return currentUser;
  }
  currentUser = {
    uid,
    displayName: getAttribute(head, "data-user-displayname"),
    isAdmin: !!window._oc_isadmin
  };
  return currentUser;
}
function loadState(app, key, fallback) {
  const selector = `#initial-state-${app}-${key}`;
  if (window._nc_initial_state?.has(selector)) {
    return window._nc_initial_state.get(selector);
  } else if (!window._nc_initial_state) {
    window._nc_initial_state = /* @__PURE__ */ new Map();
  }
  const elem = document.querySelector(selector);
  if (elem === null) {
    {
      return fallback;
    }
  }
  try {
    const parsedValue = JSON.parse(atob(elem.value));
    window._nc_initial_state.set(selector, parsedValue);
    return parsedValue;
  } catch (error) {
    console.error("[@nextcloud/initial-state] Could not parse initial state", { key, app, error });
    {
      return fallback;
    }
  }
}
/*!
 * SPDX-FileCopyrightText: 2024 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */
function isPublicShare() {
  return loadState("files_sharing", "isPublic", null) ?? document.querySelector('input#isPublic[type="hidden"][name="isPublic"][value="1"]') !== null;
}
function getSharingToken() {
  return loadState("files_sharing", "sharingToken", null) ?? document.querySelector('input#sharingToken[type="hidden"]')?.value ?? null;
}
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _classPrivateFieldInitSpec(obj, privateMap, value) {
  _checkPrivateRedeclaration(obj, privateMap);
  privateMap.set(obj, value);
}
function _checkPrivateRedeclaration(obj, privateCollection) {
  if (privateCollection.has(obj)) {
    throw new TypeError("Cannot initialize the same private elements twice on an object");
  }
}
function _classPrivateFieldGet(receiver, privateMap) {
  var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get");
  return _classApplyDescriptorGet(receiver, descriptor);
}
function _classApplyDescriptorGet(receiver, descriptor) {
  if (descriptor.get) {
    return descriptor.get.call(receiver);
  }
  return descriptor.value;
}
function _classPrivateFieldSet(receiver, privateMap, value) {
  var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set");
  _classApplyDescriptorSet(receiver, descriptor, value);
  return value;
}
function _classExtractFieldDescriptor(receiver, privateMap, action) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to " + action + " private field on non-instance");
  }
  return privateMap.get(receiver);
}
function _classApplyDescriptorSet(receiver, descriptor, value) {
  if (descriptor.set) {
    descriptor.set.call(receiver, value);
  } else {
    if (!descriptor.writable) {
      throw new TypeError("attempted to set read only private field");
    }
    descriptor.value = value;
  }
}
var toStringTag$1 = typeof Symbol !== "undefined" ? Symbol.toStringTag : "@@toStringTag";
var _internals = /* @__PURE__ */ new WeakMap();
var _promise = /* @__PURE__ */ new WeakMap();
class CancelablePromiseInternal {
  constructor(_ref2) {
    var {
      executor = () => {
      },
      internals = defaultInternals(),
      promise = new Promise((resolve3, reject2) => executor(resolve3, reject2, (onCancel) => {
        internals.onCancelList.push(onCancel);
      }))
    } = _ref2;
    _classPrivateFieldInitSpec(this, _internals, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _promise, {
      writable: true,
      value: void 0
    });
    _defineProperty(this, toStringTag$1, "CancelablePromise");
    this.cancel = this.cancel.bind(this);
    _classPrivateFieldSet(this, _internals, internals);
    _classPrivateFieldSet(this, _promise, promise || new Promise((resolve3, reject2) => executor(resolve3, reject2, (onCancel) => {
      internals.onCancelList.push(onCancel);
    })));
  }
  then(onfulfilled, onrejected) {
    return makeCancelable(_classPrivateFieldGet(this, _promise).then(createCallback(onfulfilled, _classPrivateFieldGet(this, _internals)), createCallback(onrejected, _classPrivateFieldGet(this, _internals))), _classPrivateFieldGet(this, _internals));
  }
  catch(onrejected) {
    return makeCancelable(_classPrivateFieldGet(this, _promise).catch(createCallback(onrejected, _classPrivateFieldGet(this, _internals))), _classPrivateFieldGet(this, _internals));
  }
  finally(onfinally, runWhenCanceled) {
    if (runWhenCanceled) {
      _classPrivateFieldGet(this, _internals).onCancelList.push(onfinally);
    }
    return makeCancelable(_classPrivateFieldGet(this, _promise).finally(createCallback(() => {
      if (onfinally) {
        if (runWhenCanceled) {
          _classPrivateFieldGet(this, _internals).onCancelList = _classPrivateFieldGet(this, _internals).onCancelList.filter((callback) => callback !== onfinally);
        }
        return onfinally();
      }
    }, _classPrivateFieldGet(this, _internals))), _classPrivateFieldGet(this, _internals));
  }
  cancel() {
    _classPrivateFieldGet(this, _internals).isCanceled = true;
    var callbacks = _classPrivateFieldGet(this, _internals).onCancelList;
    _classPrivateFieldGet(this, _internals).onCancelList = [];
    for (var callback of callbacks) {
      if (typeof callback === "function") {
        try {
          callback();
        } catch (err) {
          console.error(err);
        }
      }
    }
  }
  isCanceled() {
    return _classPrivateFieldGet(this, _internals).isCanceled === true;
  }
}
class CancelablePromise extends CancelablePromiseInternal {
  constructor(executor) {
    super({
      executor
    });
  }
}
_defineProperty(CancelablePromise, "all", function all(iterable) {
  return makeAllCancelable(iterable, Promise.all(iterable));
});
_defineProperty(CancelablePromise, "allSettled", function allSettled(iterable) {
  return makeAllCancelable(iterable, Promise.allSettled(iterable));
});
_defineProperty(CancelablePromise, "any", function any(iterable) {
  return makeAllCancelable(iterable, Promise.any(iterable));
});
_defineProperty(CancelablePromise, "race", function race(iterable) {
  return makeAllCancelable(iterable, Promise.race(iterable));
});
_defineProperty(CancelablePromise, "resolve", function resolve(value) {
  return cancelable(Promise.resolve(value));
});
_defineProperty(CancelablePromise, "reject", function reject(reason) {
  return cancelable(Promise.reject(reason));
});
_defineProperty(CancelablePromise, "isCancelable", isCancelablePromise);
function cancelable(promise) {
  return makeCancelable(promise, defaultInternals());
}
function isCancelablePromise(promise) {
  return promise instanceof CancelablePromise || promise instanceof CancelablePromiseInternal;
}
function createCallback(onResult, internals) {
  if (onResult) {
    return (arg) => {
      if (!internals.isCanceled) {
        var result = onResult(arg);
        if (isCancelablePromise(result)) {
          internals.onCancelList.push(result.cancel);
        }
        return result;
      }
      return arg;
    };
  }
}
function makeCancelable(promise, internals) {
  return new CancelablePromiseInternal({
    internals,
    promise
  });
}
function makeAllCancelable(iterable, promise) {
  var internals = defaultInternals();
  internals.onCancelList.push(() => {
    for (var resolvable of iterable) {
      if (isCancelablePromise(resolvable)) {
        resolvable.cancel();
      }
    }
  });
  return new CancelablePromiseInternal({
    internals,
    promise
  });
}
function defaultInternals() {
  return {
    isCanceled: false,
    onCancelList: []
  };
}
const global = globalThis || void 0 || self;
var define_process_env_default$1 = {};
/*! For license information please see index.js.LICENSE.txt */
var t$1 = { 2(t22) {
  function e2(t3, e3, i2) {
    t3 instanceof RegExp && (t3 = n2(t3, i2)), e3 instanceof RegExp && (e3 = n2(e3, i2));
    var s2 = r2(t3, e3, i2);
    return s2 && { start: s2[0], end: s2[1], pre: i2.slice(0, s2[0]), body: i2.slice(s2[0] + t3.length, s2[1]), post: i2.slice(s2[1] + e3.length) };
  }
  function n2(t3, e3) {
    var n3 = e3.match(t3);
    return n3 ? n3[0] : null;
  }
  function r2(t3, e3, n3) {
    var r3, i2, s2, o2, a2, h2 = n3.indexOf(t3), l2 = n3.indexOf(e3, h2 + 1), u2 = h2;
    if (h2 >= 0 && l2 > 0) {
      for (r3 = [], s2 = n3.length; u2 >= 0 && !a2; ) u2 == h2 ? (r3.push(u2), h2 = n3.indexOf(t3, u2 + 1)) : 1 == r3.length ? a2 = [r3.pop(), l2] : ((i2 = r3.pop()) < s2 && (s2 = i2, o2 = l2), l2 = n3.indexOf(e3, u2 + 1)), u2 = h2 < l2 && h2 >= 0 ? h2 : l2;
      r3.length && (a2 = [s2, o2]);
    }
    return a2;
  }
  t22.exports = e2, e2.range = r2;
}, 101(t22, e2, n2) {
  var r2;
  t22 = n2.nmd(t22), (function() {
    var i2 = (t22 && t22.exports, "object" == typeof global && global);
    i2.global !== i2 && i2.window;
    var s2 = function(t3) {
      this.message = t3;
    };
    (s2.prototype = new Error()).name = "InvalidCharacterError";
    var o2 = function(t3) {
      throw new s2(t3);
    }, a2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", h2 = /[\t\n\f\r ]/g, l2 = { encode: function(t3) {
      t3 = String(t3), /[^\0-\xFF]/.test(t3) && o2("The string to be encoded contains characters outside of the Latin1 range.");
      for (var e3, n3, r3, i3, s3 = t3.length % 3, h3 = "", l3 = -1, u2 = t3.length - s3; ++l3 < u2; ) e3 = t3.charCodeAt(l3) << 16, n3 = t3.charCodeAt(++l3) << 8, r3 = t3.charCodeAt(++l3), h3 += a2.charAt((i3 = e3 + n3 + r3) >> 18 & 63) + a2.charAt(i3 >> 12 & 63) + a2.charAt(i3 >> 6 & 63) + a2.charAt(63 & i3);
      return 2 == s3 ? (e3 = t3.charCodeAt(l3) << 8, n3 = t3.charCodeAt(++l3), h3 += a2.charAt((i3 = e3 + n3) >> 10) + a2.charAt(i3 >> 4 & 63) + a2.charAt(i3 << 2 & 63) + "=") : 1 == s3 && (i3 = t3.charCodeAt(l3), h3 += a2.charAt(i3 >> 2) + a2.charAt(i3 << 4 & 63) + "=="), h3;
    }, decode: function(t3) {
      var e3 = (t3 = String(t3).replace(h2, "")).length;
      e3 % 4 == 0 && (e3 = (t3 = t3.replace(/==?$/, "")).length), (e3 % 4 == 1 || /[^+a-zA-Z0-9/]/.test(t3)) && o2("Invalid character: the string to be decoded is not correctly encoded.");
      for (var n3, r3, i3 = 0, s3 = "", l3 = -1; ++l3 < e3; ) r3 = a2.indexOf(t3.charAt(l3)), n3 = i3 % 4 ? 64 * n3 + r3 : r3, i3++ % 4 && (s3 += String.fromCharCode(255 & n3 >> (-2 * i3 & 6)));
      return s3;
    }, version: "1.0.0" };
    void 0 === (r2 = function() {
      return l2;
    }.call(e2, n2, e2, t22)) || (t22.exports = r2);
  })();
}, 172(t22, e2) {
  e2.d = function(t3) {
    if (!t3) return 0;
    for (var e3 = (t3 = t3.toString()).length, n2 = t3.length; n2--; ) {
      var r2 = t3.charCodeAt(n2);
      56320 <= r2 && r2 <= 57343 && n2--, 127 < r2 && r2 <= 2047 ? e3++ : 2047 < r2 && r2 <= 65535 && (e3 += 2);
    }
    return e3;
  };
}, 526(t22) {
  var e2 = { utf8: { stringToBytes: function(t3) {
    return e2.bin.stringToBytes(unescape(encodeURIComponent(t3)));
  }, bytesToString: function(t3) {
    return decodeURIComponent(escape(e2.bin.bytesToString(t3)));
  } }, bin: { stringToBytes: function(t3) {
    for (var e3 = [], n2 = 0; n2 < t3.length; n2++) e3.push(255 & t3.charCodeAt(n2));
    return e3;
  }, bytesToString: function(t3) {
    for (var e3 = [], n2 = 0; n2 < t3.length; n2++) e3.push(String.fromCharCode(t3[n2]));
    return e3.join("");
  } } };
  t22.exports = e2;
}, 298(t22) {
  var e2, n2;
  e2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", n2 = { rotl: function(t3, e3) {
    return t3 << e3 | t3 >>> 32 - e3;
  }, rotr: function(t3, e3) {
    return t3 << 32 - e3 | t3 >>> e3;
  }, endian: function(t3) {
    if (t3.constructor == Number) return 16711935 & n2.rotl(t3, 8) | 4278255360 & n2.rotl(t3, 24);
    for (var e3 = 0; e3 < t3.length; e3++) t3[e3] = n2.endian(t3[e3]);
    return t3;
  }, randomBytes: function(t3) {
    for (var e3 = []; t3 > 0; t3--) e3.push(Math.floor(256 * Math.random()));
    return e3;
  }, bytesToWords: function(t3) {
    for (var e3 = [], n3 = 0, r2 = 0; n3 < t3.length; n3++, r2 += 8) e3[r2 >>> 5] |= t3[n3] << 24 - r2 % 32;
    return e3;
  }, wordsToBytes: function(t3) {
    for (var e3 = [], n3 = 0; n3 < 32 * t3.length; n3 += 8) e3.push(t3[n3 >>> 5] >>> 24 - n3 % 32 & 255);
    return e3;
  }, bytesToHex: function(t3) {
    for (var e3 = [], n3 = 0; n3 < t3.length; n3++) e3.push((t3[n3] >>> 4).toString(16)), e3.push((15 & t3[n3]).toString(16));
    return e3.join("");
  }, hexToBytes: function(t3) {
    for (var e3 = [], n3 = 0; n3 < t3.length; n3 += 2) e3.push(parseInt(t3.substr(n3, 2), 16));
    return e3;
  }, bytesToBase64: function(t3) {
    for (var n3 = [], r2 = 0; r2 < t3.length; r2 += 3) for (var i2 = t3[r2] << 16 | t3[r2 + 1] << 8 | t3[r2 + 2], s2 = 0; s2 < 4; s2++) 8 * r2 + 6 * s2 <= 8 * t3.length ? n3.push(e2.charAt(i2 >>> 6 * (3 - s2) & 63)) : n3.push("=");
    return n3.join("");
  }, base64ToBytes: function(t3) {
    t3 = t3.replace(/[^A-Z0-9+\/]/gi, "");
    for (var n3 = [], r2 = 0, i2 = 0; r2 < t3.length; i2 = ++r2 % 4) 0 != i2 && n3.push((e2.indexOf(t3.charAt(r2 - 1)) & Math.pow(2, -2 * i2 + 8) - 1) << 2 * i2 | e2.indexOf(t3.charAt(r2)) >>> 6 - 2 * i2);
    return n3;
  } }, t22.exports = n2;
}, 135(t22) {
  function e2(t3) {
    return !!t3.constructor && "function" == typeof t3.constructor.isBuffer && t3.constructor.isBuffer(t3);
  }
  t22.exports = function(t3) {
    return null != t3 && (e2(t3) || (function(t42) {
      return "function" == typeof t42.readFloatLE && "function" == typeof t42.slice && e2(t42.slice(0, 0));
    })(t3) || !!t3._isBuffer);
  };
}, 542(t22, e2, n2) {
  !(function() {
    var e3 = n2(298), r2 = n2(526).utf8, i2 = n2(135), s2 = n2(526).bin, o2 = function(t3, n3) {
      t3.constructor == String ? t3 = n3 && "binary" === n3.encoding ? s2.stringToBytes(t3) : r2.stringToBytes(t3) : i2(t3) ? t3 = Array.prototype.slice.call(t3, 0) : Array.isArray(t3) || t3.constructor === Uint8Array || (t3 = t3.toString());
      for (var a2 = e3.bytesToWords(t3), h2 = 8 * t3.length, l2 = 1732584193, u2 = -271733879, c2 = -1732584194, p2 = 271733878, f2 = 0; f2 < a2.length; f2++) a2[f2] = 16711935 & (a2[f2] << 8 | a2[f2] >>> 24) | 4278255360 & (a2[f2] << 24 | a2[f2] >>> 8);
      a2[h2 >>> 5] |= 128 << h2 % 32, a2[14 + (h2 + 64 >>> 9 << 4)] = h2;
      var d2 = o2._ff, g2 = o2._gg, m2 = o2._hh, y2 = o2._ii;
      for (f2 = 0; f2 < a2.length; f2 += 16) {
        var b2 = l2, v2 = u2, w2 = c2, x2 = p2;
        l2 = d2(l2, u2, c2, p2, a2[f2 + 0], 7, -680876936), p2 = d2(p2, l2, u2, c2, a2[f2 + 1], 12, -389564586), c2 = d2(c2, p2, l2, u2, a2[f2 + 2], 17, 606105819), u2 = d2(u2, c2, p2, l2, a2[f2 + 3], 22, -1044525330), l2 = d2(l2, u2, c2, p2, a2[f2 + 4], 7, -176418897), p2 = d2(p2, l2, u2, c2, a2[f2 + 5], 12, 1200080426), c2 = d2(c2, p2, l2, u2, a2[f2 + 6], 17, -1473231341), u2 = d2(u2, c2, p2, l2, a2[f2 + 7], 22, -45705983), l2 = d2(l2, u2, c2, p2, a2[f2 + 8], 7, 1770035416), p2 = d2(p2, l2, u2, c2, a2[f2 + 9], 12, -1958414417), c2 = d2(c2, p2, l2, u2, a2[f2 + 10], 17, -42063), u2 = d2(u2, c2, p2, l2, a2[f2 + 11], 22, -1990404162), l2 = d2(l2, u2, c2, p2, a2[f2 + 12], 7, 1804603682), p2 = d2(p2, l2, u2, c2, a2[f2 + 13], 12, -40341101), c2 = d2(c2, p2, l2, u2, a2[f2 + 14], 17, -1502002290), l2 = g2(l2, u2 = d2(u2, c2, p2, l2, a2[f2 + 15], 22, 1236535329), c2, p2, a2[f2 + 1], 5, -165796510), p2 = g2(p2, l2, u2, c2, a2[f2 + 6], 9, -1069501632), c2 = g2(c2, p2, l2, u2, a2[f2 + 11], 14, 643717713), u2 = g2(u2, c2, p2, l2, a2[f2 + 0], 20, -373897302), l2 = g2(l2, u2, c2, p2, a2[f2 + 5], 5, -701558691), p2 = g2(p2, l2, u2, c2, a2[f2 + 10], 9, 38016083), c2 = g2(c2, p2, l2, u2, a2[f2 + 15], 14, -660478335), u2 = g2(u2, c2, p2, l2, a2[f2 + 4], 20, -405537848), l2 = g2(l2, u2, c2, p2, a2[f2 + 9], 5, 568446438), p2 = g2(p2, l2, u2, c2, a2[f2 + 14], 9, -1019803690), c2 = g2(c2, p2, l2, u2, a2[f2 + 3], 14, -187363961), u2 = g2(u2, c2, p2, l2, a2[f2 + 8], 20, 1163531501), l2 = g2(l2, u2, c2, p2, a2[f2 + 13], 5, -1444681467), p2 = g2(p2, l2, u2, c2, a2[f2 + 2], 9, -51403784), c2 = g2(c2, p2, l2, u2, a2[f2 + 7], 14, 1735328473), l2 = m2(l2, u2 = g2(u2, c2, p2, l2, a2[f2 + 12], 20, -1926607734), c2, p2, a2[f2 + 5], 4, -378558), p2 = m2(p2, l2, u2, c2, a2[f2 + 8], 11, -2022574463), c2 = m2(c2, p2, l2, u2, a2[f2 + 11], 16, 1839030562), u2 = m2(u2, c2, p2, l2, a2[f2 + 14], 23, -35309556), l2 = m2(l2, u2, c2, p2, a2[f2 + 1], 4, -1530992060), p2 = m2(p2, l2, u2, c2, a2[f2 + 4], 11, 1272893353), c2 = m2(c2, p2, l2, u2, a2[f2 + 7], 16, -155497632), u2 = m2(u2, c2, p2, l2, a2[f2 + 10], 23, -1094730640), l2 = m2(l2, u2, c2, p2, a2[f2 + 13], 4, 681279174), p2 = m2(p2, l2, u2, c2, a2[f2 + 0], 11, -358537222), c2 = m2(c2, p2, l2, u2, a2[f2 + 3], 16, -722521979), u2 = m2(u2, c2, p2, l2, a2[f2 + 6], 23, 76029189), l2 = m2(l2, u2, c2, p2, a2[f2 + 9], 4, -640364487), p2 = m2(p2, l2, u2, c2, a2[f2 + 12], 11, -421815835), c2 = m2(c2, p2, l2, u2, a2[f2 + 15], 16, 530742520), l2 = y2(l2, u2 = m2(u2, c2, p2, l2, a2[f2 + 2], 23, -995338651), c2, p2, a2[f2 + 0], 6, -198630844), p2 = y2(p2, l2, u2, c2, a2[f2 + 7], 10, 1126891415), c2 = y2(c2, p2, l2, u2, a2[f2 + 14], 15, -1416354905), u2 = y2(u2, c2, p2, l2, a2[f2 + 5], 21, -57434055), l2 = y2(l2, u2, c2, p2, a2[f2 + 12], 6, 1700485571), p2 = y2(p2, l2, u2, c2, a2[f2 + 3], 10, -1894986606), c2 = y2(c2, p2, l2, u2, a2[f2 + 10], 15, -1051523), u2 = y2(u2, c2, p2, l2, a2[f2 + 1], 21, -2054922799), l2 = y2(l2, u2, c2, p2, a2[f2 + 8], 6, 1873313359), p2 = y2(p2, l2, u2, c2, a2[f2 + 15], 10, -30611744), c2 = y2(c2, p2, l2, u2, a2[f2 + 6], 15, -1560198380), u2 = y2(u2, c2, p2, l2, a2[f2 + 13], 21, 1309151649), l2 = y2(l2, u2, c2, p2, a2[f2 + 4], 6, -145523070), p2 = y2(p2, l2, u2, c2, a2[f2 + 11], 10, -1120210379), c2 = y2(c2, p2, l2, u2, a2[f2 + 2], 15, 718787259), u2 = y2(u2, c2, p2, l2, a2[f2 + 9], 21, -343485551), l2 = l2 + b2 >>> 0, u2 = u2 + v2 >>> 0, c2 = c2 + w2 >>> 0, p2 = p2 + x2 >>> 0;
      }
      return e3.endian([l2, u2, c2, p2]);
    };
    o2._ff = function(t3, e4, n3, r3, i3, s3, o3) {
      var a2 = t3 + (e4 & n3 | ~e4 & r3) + (i3 >>> 0) + o3;
      return (a2 << s3 | a2 >>> 32 - s3) + e4;
    }, o2._gg = function(t3, e4, n3, r3, i3, s3, o3) {
      var a2 = t3 + (e4 & r3 | n3 & ~r3) + (i3 >>> 0) + o3;
      return (a2 << s3 | a2 >>> 32 - s3) + e4;
    }, o2._hh = function(t3, e4, n3, r3, i3, s3, o3) {
      var a2 = t3 + (e4 ^ n3 ^ r3) + (i3 >>> 0) + o3;
      return (a2 << s3 | a2 >>> 32 - s3) + e4;
    }, o2._ii = function(t3, e4, n3, r3, i3, s3, o3) {
      var a2 = t3 + (n3 ^ (e4 | ~r3)) + (i3 >>> 0) + o3;
      return (a2 << s3 | a2 >>> 32 - s3) + e4;
    }, o2._blocksize = 16, o2._digestsize = 16, t22.exports = function(t3, n3) {
      if (null == t3) throw new Error("Illegal argument " + t3);
      var r3 = e3.wordsToBytes(o2(t3, n3));
      return n3 && n3.asBytes ? r3 : n3 && n3.asString ? s2.bytesToString(r3) : e3.bytesToHex(r3);
    };
  })();
}, 285(t22, e2, n2) {
  var r2 = n2(2);
  t22.exports = function(t3, e3) {
    if (!t3) return [];
    var n3 = null == (e3 = e3 || {}).max ? 1 / 0 : e3.max;
    return "{}" === t3.substr(0, 2) && (t3 = "\\{\\}" + t3.substr(2)), m2((function(t42) {
      return t42.split("\\\\").join(i2).split("\\{").join(s2).split("\\}").join(o2).split("\\,").join(a2).split("\\.").join(h2);
    })(t3), n3, true).map(u2);
  };
  var i2 = "\0SLASH" + Math.random() + "\0", s2 = "\0OPEN" + Math.random() + "\0", o2 = "\0CLOSE" + Math.random() + "\0", a2 = "\0COMMA" + Math.random() + "\0", h2 = "\0PERIOD" + Math.random() + "\0";
  function l2(t3) {
    return parseInt(t3, 10) == t3 ? parseInt(t3, 10) : t3.charCodeAt(0);
  }
  function u2(t3) {
    return t3.split(i2).join("\\").split(s2).join("{").split(o2).join("}").split(a2).join(",").split(h2).join(".");
  }
  function c2(t3) {
    if (!t3) return [""];
    var e3 = [], n3 = r2("{", "}", t3);
    if (!n3) return t3.split(",");
    var i3 = n3.pre, s3 = n3.body, o3 = n3.post, a3 = i3.split(",");
    a3[a3.length - 1] += "{" + s3 + "}";
    var h3 = c2(o3);
    return o3.length && (a3[a3.length - 1] += h3.shift(), a3.push.apply(a3, h3)), e3.push.apply(e3, a3), e3;
  }
  function p2(t3) {
    return "{" + t3 + "}";
  }
  function f2(t3) {
    return /^-?0\d/.test(t3);
  }
  function d2(t3, e3) {
    return t3 <= e3;
  }
  function g2(t3, e3) {
    return t3 >= e3;
  }
  function m2(t3, e3, n3) {
    var i3 = [], s3 = r2("{", "}", t3);
    if (!s3) return [t3];
    var a3 = s3.pre, h3 = s3.post.length ? m2(s3.post, e3, false) : [""];
    if (/\$$/.test(s3.pre)) for (var u3 = 0; u3 < h3.length && u3 < e3; u3++) {
      var y2 = a3 + "{" + s3.body + "}" + h3[u3];
      i3.push(y2);
    }
    else {
      var b2, v2, w2 = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(s3.body), x2 = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(s3.body), N2 = w2 || x2, E2 = s3.body.indexOf(",") >= 0;
      if (!N2 && !E2) return s3.post.match(/,(?!,).*\}/) ? m2(t3 = s3.pre + "{" + s3.body + o2 + s3.post, e3, true) : [t3];
      if (N2) b2 = s3.body.split(/\.\./);
      else if (1 === (b2 = c2(s3.body)).length && 1 === (b2 = m2(b2[0], e3, false).map(p2)).length) return h3.map((function(t42) {
        return s3.pre + b2[0] + t42;
      }));
      if (N2) {
        var A2 = l2(b2[0]), S2 = l2(b2[1]), P2 = Math.max(b2[0].length, b2[1].length), T2 = 3 == b2.length ? Math.max(Math.abs(l2(b2[2])), 1) : 1, O2 = d2;
        S2 < A2 && (T2 *= -1, O2 = g2);
        var C2 = b2.some(f2);
        v2 = [];
        for (var _2 = A2; O2(_2, S2); _2 += T2) {
          var $2;
          if (x2) "\\" === ($2 = String.fromCharCode(_2)) && ($2 = "");
          else if ($2 = String(_2), C2) {
            var j2 = P2 - $2.length;
            if (j2 > 0) {
              var I2 = new Array(j2 + 1).join("0");
              $2 = _2 < 0 ? "-" + I2 + $2.slice(1) : I2 + $2;
            }
          }
          v2.push($2);
        }
      } else {
        v2 = [];
        for (var M2 = 0; M2 < b2.length; M2++) v2.push.apply(v2, m2(b2[M2], e3, false));
      }
      for (M2 = 0; M2 < v2.length; M2++) for (u3 = 0; u3 < h3.length && i3.length < e3; u3++) y2 = a3 + v2[M2] + h3[u3], (!n3 || N2 || y2) && i3.push(y2);
    }
    return i3;
  }
}, 829(t22) {
  function e2(t3) {
    return e2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t42) {
      return typeof t42;
    } : function(t42) {
      return t42 && "function" == typeof Symbol && t42.constructor === Symbol && t42 !== Symbol.prototype ? "symbol" : typeof t42;
    }, e2(t3);
  }
  function n2(t3) {
    var e3 = "function" == typeof Map ? /* @__PURE__ */ new Map() : void 0;
    return n2 = function(t42) {
      if (null === t42 || (n3 = t42, -1 === Function.toString.call(n3).indexOf("[native code]"))) return t42;
      var n3;
      if ("function" != typeof t42) throw new TypeError("Super expression must either be null or a function");
      if (void 0 !== e3) {
        if (e3.has(t42)) return e3.get(t42);
        e3.set(t42, o3);
      }
      function o3() {
        return r2(t42, arguments, s2(this).constructor);
      }
      return o3.prototype = Object.create(t42.prototype, { constructor: { value: o3, enumerable: false, writable: true, configurable: true } }), i2(o3, t42);
    }, n2(t3);
  }
  function r2(t3, e3, n3) {
    return r2 = (function() {
      if ("undefined" == typeof Reflect || !Reflect.construct) return false;
      if (Reflect.construct.sham) return false;
      if ("function" == typeof Proxy) return true;
      try {
        return Date.prototype.toString.call(Reflect.construct(Date, [], (function() {
        }))), true;
      } catch (t42) {
        return false;
      }
    })() ? Reflect.construct : function(t42, e4, n4) {
      var r3 = [null];
      r3.push.apply(r3, e4);
      var s3 = new (Function.bind.apply(t42, r3))();
      return n4 && i2(s3, n4.prototype), s3;
    }, r2.apply(null, arguments);
  }
  function i2(t3, e3) {
    return i2 = Object.setPrototypeOf || function(t42, e4) {
      return t42.__proto__ = e4, t42;
    }, i2(t3, e3);
  }
  function s2(t3) {
    return s2 = Object.setPrototypeOf ? Object.getPrototypeOf : function(t42) {
      return t42.__proto__ || Object.getPrototypeOf(t42);
    }, s2(t3);
  }
  var o2 = (function(t3) {
    function n3(t42) {
      var r3;
      return (function(t5, e3) {
        if (!(t5 instanceof e3)) throw new TypeError("Cannot call a class as a function");
      })(this, n3), (r3 = (function(t5, n4) {
        return !n4 || "object" !== e2(n4) && "function" != typeof n4 ? (function(t6) {
          if (void 0 === t6) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return t6;
        })(t5) : n4;
      })(this, s2(n3).call(this, t42))).name = "ObjectPrototypeMutationError", r3;
    }
    return (function(t42, e3) {
      if ("function" != typeof e3 && null !== e3) throw new TypeError("Super expression must either be null or a function");
      t42.prototype = Object.create(e3 && e3.prototype, { constructor: { value: t42, writable: true, configurable: true } }), e3 && i2(t42, e3);
    })(n3, t3), n3;
  })(n2(Error));
  function a2(t3, n3) {
    for (var r3 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : function() {
    }, i3 = n3.split("."), s3 = i3.length, o3 = function(e3) {
      var n4 = i3[e3];
      if (!t3) return { v: void 0 };
      if ("+" === n4) {
        if (Array.isArray(t3)) return { v: t3.map((function(n5, s5) {
          var o4 = i3.slice(e3 + 1);
          return o4.length > 0 ? a2(n5, o4.join("."), r3) : r3(t3, s5, i3, e3);
        })) };
        var s4 = i3.slice(0, e3).join(".");
        throw new Error("Object at wildcard (".concat(s4, ") is not an array"));
      }
      t3 = r3(t3, n4, i3, e3);
    }, h3 = 0; h3 < s3; h3++) {
      var l2 = o3(h3);
      if ("object" === e2(l2)) return l2.v;
    }
    return t3;
  }
  function h2(t3, e3) {
    return t3.length === e3 + 1;
  }
  t22.exports = { set: function(t3, n3, r3) {
    if ("object" != e2(t3) || null === t3) return t3;
    if (void 0 === n3) return t3;
    if ("number" == typeof n3) return t3[n3] = r3, t3[n3];
    try {
      return a2(t3, n3, (function(t42, e3, n4, i3) {
        if (t42 === Reflect.getPrototypeOf({})) throw new o2("Attempting to mutate Object.prototype");
        if (!t42[e3]) {
          var s3 = Number.isInteger(Number(n4[i3 + 1])), a3 = "+" === n4[i3 + 1];
          t42[e3] = s3 || a3 ? [] : {};
        }
        return h2(n4, i3) && (t42[e3] = r3), t42[e3];
      }));
    } catch (e3) {
      if (e3 instanceof o2) throw e3;
      return t3;
    }
  }, get: function(t3, n3) {
    if ("object" != e2(t3) || null === t3) return t3;
    if (void 0 === n3) return t3;
    if ("number" == typeof n3) return t3[n3];
    try {
      return a2(t3, n3, (function(t42, e3) {
        return t42[e3];
      }));
    } catch (e3) {
      return t3;
    }
  }, has: function(t3, n3) {
    var r3 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
    if ("object" != e2(t3) || null === t3) return false;
    if (void 0 === n3) return false;
    if ("number" == typeof n3) return n3 in t3;
    try {
      var i3 = false;
      return a2(t3, n3, (function(t42, e3, n4, s3) {
        if (!h2(n4, s3)) return t42 && t42[e3];
        i3 = r3.own ? t42.hasOwnProperty(e3) : e3 in t42;
      })), i3;
    } catch (t42) {
      return false;
    }
  }, hasOwn: function(t3, e3, n3) {
    return this.has(t3, e3, n3 || { own: true });
  }, isIn: function(t3, n3, r3) {
    var i3 = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
    if ("object" != e2(t3) || null === t3) return false;
    if (void 0 === n3) return false;
    try {
      var s3 = false, o3 = false;
      return a2(t3, n3, (function(t42, n4, i4, a3) {
        return s3 = s3 || t42 === r3 || !!t42 && t42[n4] === r3, o3 = h2(i4, a3) && "object" === e2(t42) && n4 in t42, t42 && t42[n4];
      })), i3.validPath ? s3 && o3 : s3;
    } catch (t42) {
      return false;
    }
  }, ObjectPrototypeMutationError: o2 };
}, 47(t22, e2, n2) {
  var r2 = n2(410), i2 = function(t3) {
    return "string" == typeof t3;
  };
  function s2(t3, e3) {
    for (var n3 = [], r3 = 0; r3 < t3.length; r3++) {
      var i3 = t3[r3];
      i3 && "." !== i3 && (".." === i3 ? n3.length && ".." !== n3[n3.length - 1] ? n3.pop() : e3 && n3.push("..") : n3.push(i3));
    }
    return n3;
  }
  var o2 = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/, a2 = {};
  function h2(t3) {
    return o2.exec(t3).slice(1);
  }
  a2.resolve = function() {
    for (var t3 = "", e3 = false, n3 = arguments.length - 1; n3 >= -1 && !e3; n3--) {
      var r3 = n3 >= 0 ? arguments[n3] : process$1.cwd();
      if (!i2(r3)) throw new TypeError("Arguments to path.resolve must be strings");
      r3 && (t3 = r3 + "/" + t3, e3 = "/" === r3.charAt(0));
    }
    return (e3 ? "/" : "") + (t3 = s2(t3.split("/"), !e3).join("/")) || ".";
  }, a2.normalize = function(t3) {
    var e3 = a2.isAbsolute(t3), n3 = "/" === t3.substr(-1);
    return (t3 = s2(t3.split("/"), !e3).join("/")) || e3 || (t3 = "."), t3 && n3 && (t3 += "/"), (e3 ? "/" : "") + t3;
  }, a2.isAbsolute = function(t3) {
    return "/" === t3.charAt(0);
  }, a2.join = function() {
    for (var t3 = "", e3 = 0; e3 < arguments.length; e3++) {
      var n3 = arguments[e3];
      if (!i2(n3)) throw new TypeError("Arguments to path.join must be strings");
      n3 && (t3 += t3 ? "/" + n3 : n3);
    }
    return a2.normalize(t3);
  }, a2.relative = function(t3, e3) {
    function n3(t42) {
      for (var e4 = 0; e4 < t42.length && "" === t42[e4]; e4++) ;
      for (var n4 = t42.length - 1; n4 >= 0 && "" === t42[n4]; n4--) ;
      return e4 > n4 ? [] : t42.slice(e4, n4 + 1);
    }
    t3 = a2.resolve(t3).substr(1), e3 = a2.resolve(e3).substr(1);
    for (var r3 = n3(t3.split("/")), i3 = n3(e3.split("/")), s3 = Math.min(r3.length, i3.length), o3 = s3, h3 = 0; h3 < s3; h3++) if (r3[h3] !== i3[h3]) {
      o3 = h3;
      break;
    }
    var l2 = [];
    for (h3 = o3; h3 < r3.length; h3++) l2.push("..");
    return (l2 = l2.concat(i3.slice(o3))).join("/");
  }, a2._makeLong = function(t3) {
    return t3;
  }, a2.dirname = function(t3) {
    var e3 = h2(t3), n3 = e3[0], r3 = e3[1];
    return n3 || r3 ? (r3 && (r3 = r3.substr(0, r3.length - 1)), n3 + r3) : ".";
  }, a2.basename = function(t3, e3) {
    var n3 = h2(t3)[2];
    return e3 && n3.substr(-1 * e3.length) === e3 && (n3 = n3.substr(0, n3.length - e3.length)), n3;
  }, a2.extname = function(t3) {
    return h2(t3)[3];
  }, a2.format = function(t3) {
    if (!r2.isObject(t3)) throw new TypeError("Parameter 'pathObject' must be an object, not " + typeof t3);
    var e3 = t3.root || "";
    if (!i2(e3)) throw new TypeError("'pathObject.root' must be a string or undefined, not " + typeof t3.root);
    return (t3.dir ? t3.dir + a2.sep : "") + (t3.base || "");
  }, a2.parse = function(t3) {
    if (!i2(t3)) throw new TypeError("Parameter 'pathString' must be a string, not " + typeof t3);
    var e3 = h2(t3);
    if (!e3 || 4 !== e3.length) throw new TypeError("Invalid path '" + t3 + "'");
    return e3[1] = e3[1] || "", e3[2] = e3[2] || "", e3[3] = e3[3] || "", { root: e3[0], dir: e3[0] + e3[1].slice(0, e3[1].length - 1), base: e3[2], ext: e3[3], name: e3[2].slice(0, e3[2].length - e3[3].length) };
  }, a2.sep = "/", a2.delimiter = ":", t22.exports = a2;
}, 647(t22, e2) {
  var n2 = Object.prototype.hasOwnProperty;
  function r2(t3) {
    try {
      return decodeURIComponent(t3.replace(/\+/g, " "));
    } catch (t42) {
      return null;
    }
  }
  function i2(t3) {
    try {
      return encodeURIComponent(t3);
    } catch (t42) {
      return null;
    }
  }
  e2.stringify = function(t3, e3) {
    e3 = e3 || "";
    var r3, s2, o2 = [];
    for (s2 in "string" != typeof e3 && (e3 = "?"), t3) if (n2.call(t3, s2)) {
      if ((r3 = t3[s2]) || null != r3 && !isNaN(r3) || (r3 = ""), s2 = i2(s2), r3 = i2(r3), null === s2 || null === r3) continue;
      o2.push(s2 + "=" + r3);
    }
    return o2.length ? e3 + o2.join("&") : "";
  }, e2.parse = function(t3) {
    for (var e3, n3 = /([^=?#&]+)=?([^&]*)/g, i3 = {}; e3 = n3.exec(t3); ) {
      var s2 = r2(e3[1]), o2 = r2(e3[2]);
      null === s2 || null === o2 || s2 in i3 || (i3[s2] = o2);
    }
    return i3;
  };
}, 670(t22) {
  t22.exports = function(t3, e2) {
    if (e2 = e2.split(":")[0], !(t3 = +t3)) return false;
    switch (e2) {
      case "http":
      case "ws":
        return 80 !== t3;
      case "https":
      case "wss":
        return 443 !== t3;
      case "ftp":
        return 21 !== t3;
      case "gopher":
        return 70 !== t3;
      case "file":
        return false;
    }
    return 0 !== t3;
  };
}, 737(t22, e2, n2) {
  var r2 = n2(670), i2 = n2(647), s2 = /^[\x00-\x20\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]+/, o2 = /[\n\r\t]/g, a2 = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//, h2 = /:\d+$/, l2 = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\\/]+)?([\S\s]*)/i, u2 = /^[a-zA-Z]:/;
  function c2(t3) {
    return (t3 || "").toString().replace(s2, "");
  }
  var p2 = [["#", "hash"], ["?", "query"], function(t3, e3) {
    return g2(e3.protocol) ? t3.replace(/\\/g, "/") : t3;
  }, ["/", "pathname"], ["@", "auth", 1], [NaN, "host", void 0, 1, 1], [/:(\d*)$/, "port", void 0, 1], [NaN, "hostname", void 0, 1, 1]], f2 = { hash: 1, query: 1 };
  function d2(t3) {
    var e3, n3 = ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {}).location || {}, r3 = {}, i3 = typeof (t3 = t3 || n3);
    if ("blob:" === t3.protocol) r3 = new y2(unescape(t3.pathname), {});
    else if ("string" === i3) for (e3 in r3 = new y2(t3, {}), f2) delete r3[e3];
    else if ("object" === i3) {
      for (e3 in t3) e3 in f2 || (r3[e3] = t3[e3]);
      void 0 === r3.slashes && (r3.slashes = a2.test(t3.href));
    }
    return r3;
  }
  function g2(t3) {
    return "file:" === t3 || "ftp:" === t3 || "http:" === t3 || "https:" === t3 || "ws:" === t3 || "wss:" === t3;
  }
  function m2(t3, e3) {
    t3 = (t3 = c2(t3)).replace(o2, ""), e3 = e3 || {};
    var n3, r3 = l2.exec(t3), i3 = r3[1] ? r3[1].toLowerCase() : "", s3 = !!r3[2], a3 = !!r3[3], h3 = 0;
    return s3 ? a3 ? (n3 = r3[2] + r3[3] + r3[4], h3 = r3[2].length + r3[3].length) : (n3 = r3[2] + r3[4], h3 = r3[2].length) : a3 ? (n3 = r3[3] + r3[4], h3 = r3[3].length) : n3 = r3[4], "file:" === i3 ? h3 >= 2 && (n3 = n3.slice(2)) : g2(i3) ? n3 = r3[4] : i3 ? s3 && (n3 = n3.slice(2)) : h3 >= 2 && g2(e3.protocol) && (n3 = r3[4]), { protocol: i3, slashes: s3 || g2(i3), slashesCount: h3, rest: n3 };
  }
  function y2(t3, e3, n3) {
    if (t3 = (t3 = c2(t3)).replace(o2, ""), !(this instanceof y2)) return new y2(t3, e3, n3);
    var s3, a3, h3, l3, f3, b2, v2 = p2.slice(), w2 = typeof e3, x2 = this, N2 = 0;
    for ("object" !== w2 && "string" !== w2 && (n3 = e3, e3 = null), n3 && "function" != typeof n3 && (n3 = i2.parse), s3 = !(a3 = m2(t3 || "", e3 = d2(e3))).protocol && !a3.slashes, x2.slashes = a3.slashes || s3 && e3.slashes, x2.protocol = a3.protocol || e3.protocol || "", t3 = a3.rest, ("file:" === a3.protocol && (2 !== a3.slashesCount || u2.test(t3)) || !a3.slashes && (a3.protocol || a3.slashesCount < 2 || !g2(x2.protocol))) && (v2[3] = [/(.*)/, "pathname"]); N2 < v2.length; N2++) "function" != typeof (l3 = v2[N2]) ? (h3 = l3[0], b2 = l3[1], h3 != h3 ? x2[b2] = t3 : "string" == typeof h3 ? ~(f3 = "@" === h3 ? t3.lastIndexOf(h3) : t3.indexOf(h3)) && ("number" == typeof l3[2] ? (x2[b2] = t3.slice(0, f3), t3 = t3.slice(f3 + l3[2])) : (x2[b2] = t3.slice(f3), t3 = t3.slice(0, f3))) : (f3 = h3.exec(t3)) && (x2[b2] = f3[1], t3 = t3.slice(0, f3.index)), x2[b2] = x2[b2] || s3 && l3[3] && e3[b2] || "", l3[4] && (x2[b2] = x2[b2].toLowerCase())) : t3 = l3(t3, x2);
    n3 && (x2.query = n3(x2.query)), s3 && e3.slashes && "/" !== x2.pathname.charAt(0) && ("" !== x2.pathname || "" !== e3.pathname) && (x2.pathname = (function(t42, e4) {
      if ("" === t42) return e4;
      for (var n4 = (e4 || "/").split("/").slice(0, -1).concat(t42.split("/")), r3 = n4.length, i3 = n4[r3 - 1], s4 = false, o3 = 0; r3--; ) "." === n4[r3] ? n4.splice(r3, 1) : ".." === n4[r3] ? (n4.splice(r3, 1), o3++) : o3 && (0 === r3 && (s4 = true), n4.splice(r3, 1), o3--);
      return s4 && n4.unshift(""), "." !== i3 && ".." !== i3 || n4.push(""), n4.join("/");
    })(x2.pathname, e3.pathname)), "/" !== x2.pathname.charAt(0) && g2(x2.protocol) && (x2.pathname = "/" + x2.pathname), r2(x2.port, x2.protocol) || (x2.host = x2.hostname, x2.port = ""), x2.username = x2.password = "", x2.auth && (~(f3 = x2.auth.indexOf(":")) ? (x2.username = x2.auth.slice(0, f3), x2.username = encodeURIComponent(decodeURIComponent(x2.username)), x2.password = x2.auth.slice(f3 + 1), x2.password = encodeURIComponent(decodeURIComponent(x2.password))) : x2.username = encodeURIComponent(decodeURIComponent(x2.auth)), x2.auth = x2.password ? x2.username + ":" + x2.password : x2.username), x2.origin = "file:" !== x2.protocol && g2(x2.protocol) && x2.host ? x2.protocol + "//" + x2.host : "null", x2.href = x2.toString();
  }
  y2.prototype = { set: function(t3, e3, n3) {
    var s3 = this;
    switch (t3) {
      case "query":
        "string" == typeof e3 && e3.length && (e3 = (n3 || i2.parse)(e3)), s3[t3] = e3;
        break;
      case "port":
        s3[t3] = e3, r2(e3, s3.protocol) ? e3 && (s3.host = s3.hostname + ":" + e3) : (s3.host = s3.hostname, s3[t3] = "");
        break;
      case "hostname":
        s3[t3] = e3, s3.port && (e3 += ":" + s3.port), s3.host = e3;
        break;
      case "host":
        s3[t3] = e3, h2.test(e3) ? (e3 = e3.split(":"), s3.port = e3.pop(), s3.hostname = e3.join(":")) : (s3.hostname = e3, s3.port = "");
        break;
      case "protocol":
        s3.protocol = e3.toLowerCase(), s3.slashes = !n3;
        break;
      case "pathname":
      case "hash":
        if (e3) {
          var o3 = "pathname" === t3 ? "/" : "#";
          s3[t3] = e3.charAt(0) !== o3 ? o3 + e3 : e3;
        } else s3[t3] = e3;
        break;
      case "username":
      case "password":
        s3[t3] = encodeURIComponent(e3);
        break;
      case "auth":
        var a3 = e3.indexOf(":");
        ~a3 ? (s3.username = e3.slice(0, a3), s3.username = encodeURIComponent(decodeURIComponent(s3.username)), s3.password = e3.slice(a3 + 1), s3.password = encodeURIComponent(decodeURIComponent(s3.password))) : s3.username = encodeURIComponent(decodeURIComponent(e3));
    }
    for (var l3 = 0; l3 < p2.length; l3++) {
      var u3 = p2[l3];
      u3[4] && (s3[u3[1]] = s3[u3[1]].toLowerCase());
    }
    return s3.auth = s3.password ? s3.username + ":" + s3.password : s3.username, s3.origin = "file:" !== s3.protocol && g2(s3.protocol) && s3.host ? s3.protocol + "//" + s3.host : "null", s3.href = s3.toString(), s3;
  }, toString: function(t3) {
    t3 && "function" == typeof t3 || (t3 = i2.stringify);
    var e3, n3 = this, r3 = n3.host, s3 = n3.protocol;
    s3 && ":" !== s3.charAt(s3.length - 1) && (s3 += ":");
    var o3 = s3 + (n3.protocol && n3.slashes || g2(n3.protocol) ? "//" : "");
    return n3.username ? (o3 += n3.username, n3.password && (o3 += ":" + n3.password), o3 += "@") : n3.password ? (o3 += ":" + n3.password, o3 += "@") : "file:" !== n3.protocol && g2(n3.protocol) && !r3 && "/" !== n3.pathname && (o3 += "@"), (":" === r3[r3.length - 1] || h2.test(n3.hostname) && !n3.port) && (r3 += ":"), o3 += r3 + n3.pathname, (e3 = "object" == typeof n3.query ? t3(n3.query) : n3.query) && (o3 += "?" !== e3.charAt(0) ? "?" + e3 : e3), n3.hash && (o3 += n3.hash), o3;
  } }, y2.extractProtocol = m2, y2.location = d2, y2.trimLeft = c2, y2.qs = i2, t22.exports = y2;
}, 410() {
}, 388() {
}, 805() {
}, 345() {
}, 800() {
} }, e = {};
function n$2(r2) {
  var i2 = e[r2];
  if (void 0 !== i2) return i2.exports;
  var s2 = e[r2] = { id: r2, loaded: false, exports: {} };
  return t$1[r2].call(s2.exports, s2, s2.exports, n$2), s2.loaded = true, s2.exports;
}
n$2.n = (t22) => {
  var e2 = t22 && t22.__esModule ? () => t22.default : () => t22;
  return n$2.d(e2, { a: e2 }), e2;
}, n$2.d = (t22, e2) => {
  for (var r2 in e2) n$2.o(e2, r2) && !n$2.o(t22, r2) && Object.defineProperty(t22, r2, { enumerable: true, get: e2[r2] });
}, n$2.o = (t22, e2) => Object.prototype.hasOwnProperty.call(t22, e2), n$2.nmd = (t22) => (t22.paths = [], t22.children || (t22.children = []), t22);
var r$1 = n$2(737);
n$2.n(r$1);
var h$2 = n$2(47);
n$2.n(h$2);
var y$2 = n$2(542);
n$2.n(y$2);
var x$1 = n$2(101);
n$2.n(x$1);
const S$2 = "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope ? self : "undefined" != typeof window ? window : globalThis;
S$2.fetch.bind(S$2);
(function(t22) {
  return t22.Auto = "auto", t22.Digest = "digest", t22.None = "none", t22.Password = "password", t22.Token = "token", t22;
})({});
(function(t22) {
  return t22.DataTypeNoLength = "data-type-no-length", t22.InvalidAuthType = "invalid-auth-type", t22.InvalidOutputFormat = "invalid-output-format", t22.LinkUnsupportedAuthType = "link-unsupported-auth", t22.InvalidUpdateRange = "invalid-update-range", t22.NotSupported = "not-supported", t22;
})({});
n$2(345), n$2(800);
n$2(805);
var tt$2 = n$2(285);
const et$1 = (t22) => {
  if ("string" != typeof t22) throw new TypeError("invalid pattern");
  if (t22.length > 65536) throw new TypeError("pattern is too long");
}, nt$1 = { "[:alnum:]": ["\\p{L}\\p{Nl}\\p{Nd}", true], "[:alpha:]": ["\\p{L}\\p{Nl}", true], "[:ascii:]": ["\\x00-\\x7f", false], "[:blank:]": ["\\p{Zs}\\t", true], "[:cntrl:]": ["\\p{Cc}", true], "[:digit:]": ["\\p{Nd}", true], "[:graph:]": ["\\p{Z}\\p{C}", true, true], "[:lower:]": ["\\p{Ll}", true], "[:print:]": ["\\p{C}", true], "[:punct:]": ["\\p{P}", true], "[:space:]": ["\\p{Z}\\t\\r\\n\\v\\f", true], "[:upper:]": ["\\p{Lu}", true], "[:word:]": ["\\p{L}\\p{Nl}\\p{Nd}\\p{Pc}", true], "[:xdigit:]": ["A-Fa-f0-9", false] }, rt$1 = (t22) => t22.replace(/[[\]\\-]/g, "\\$&"), it$1 = (t22) => t22.join(""), st$1 = (t22, e2) => {
  const n2 = e2;
  if ("[" !== t22.charAt(n2)) throw new Error("not in a brace expression");
  const r2 = [], i2 = [];
  let s2 = n2 + 1, o2 = false, a2 = false, h2 = false, l2 = false, u2 = n2, c2 = "";
  t: for (; s2 < t22.length; ) {
    const e3 = t22.charAt(s2);
    if ("!" !== e3 && "^" !== e3 || s2 !== n2 + 1) {
      if ("]" === e3 && o2 && !h2) {
        u2 = s2 + 1;
        break;
      }
      if (o2 = true, "\\" !== e3 || h2) {
        if ("[" === e3 && !h2) {
          for (const [e4, [o3, h3, l3]] of Object.entries(nt$1)) if (t22.startsWith(e4, s2)) {
            if (c2) return ["$.", false, t22.length - n2, true];
            s2 += e4.length, l3 ? i2.push(o3) : r2.push(o3), a2 = a2 || h3;
            continue t;
          }
        }
        h2 = false, c2 ? (e3 > c2 ? r2.push(rt$1(c2) + "-" + rt$1(e3)) : e3 === c2 && r2.push(rt$1(e3)), c2 = "", s2++) : t22.startsWith("-]", s2 + 1) ? (r2.push(rt$1(e3 + "-")), s2 += 2) : t22.startsWith("-", s2 + 1) ? (c2 = e3, s2 += 2) : (r2.push(rt$1(e3)), s2++);
      } else h2 = true, s2++;
    } else l2 = true, s2++;
  }
  if (u2 < s2) return ["", false, 0, false];
  if (!r2.length && !i2.length) return ["$.", false, t22.length - n2, true];
  if (0 === i2.length && 1 === r2.length && /^\\?.$/.test(r2[0]) && !l2) {
    return [(p2 = 2 === r2[0].length ? r2[0].slice(-1) : r2[0], p2.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")), false, u2 - n2, false];
  }
  var p2;
  const f2 = "[" + (l2 ? "^" : "") + it$1(r2) + "]", d2 = "[" + (l2 ? "" : "^") + it$1(i2) + "]";
  return [r2.length && i2.length ? "(" + f2 + "|" + d2 + ")" : r2.length ? f2 : d2, a2, u2 - n2, true];
}, ot$1 = function(t22) {
  let { windowsPathsNoEscape: e2 = false } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
  return e2 ? t22.replace(/\[([^\/\\])\]/g, "$1") : t22.replace(/((?!\\).|^)\[([^\/\\])\]/g, "$1$2").replace(/\\([^\/])/g, "$1");
};
var at$1;
const ht$1 = /* @__PURE__ */ new Set(["!", "?", "+", "*", "@"]), lt$1 = (t22) => ht$1.has(t22), ut$1 = (t22) => lt$1(t22.type), ct$1 = /* @__PURE__ */ new Map([["!", ["@"]], ["?", ["?", "@"]], ["@", ["@"]], ["*", ["*", "+", "?", "@"]], ["+", ["+", "@"]]]), pt$1 = /* @__PURE__ */ new Map([["!", ["?"]], ["@", ["?"]], ["+", ["?", "*"]]]), ft$1 = /* @__PURE__ */ new Map([["!", ["?", "@"]], ["?", ["?", "@"]], ["@", ["?", "@"]], ["*", ["*", "+", "?", "@"]], ["+", ["+", "@", "?", "*"]]]), dt$1 = /* @__PURE__ */ new Map([["!", /* @__PURE__ */ new Map([["!", "@"]])], ["?", /* @__PURE__ */ new Map([["*", "*"], ["+", "*"]])], ["@", /* @__PURE__ */ new Map([["!", "!"], ["?", "?"], ["@", "@"], ["*", "*"], ["+", "+"]])], ["+", /* @__PURE__ */ new Map([["?", "*"], ["*", "*"]])]]), gt$2 = "(?!\\.)", mt$1 = /* @__PURE__ */ new Set(["[", "."]), yt = /* @__PURE__ */ new Set(["..", "."]), bt = new Set("().*{}+?[]^$\\!"), vt = "[^/]", wt$1 = vt + "*?", xt = vt + "+?";
class Nt {
  type;
  #t;
  #e;
  #n = false;
  #r = [];
  #i;
  #s;
  #o;
  #a = false;
  #h;
  #l;
  #u = false;
  constructor(t22, e2) {
    let n2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
    this.type = t22, t22 && (this.#e = true), this.#i = e2, this.#t = this.#i ? this.#i.#t : this, this.#h = this.#t === this ? n2 : this.#t.#h, this.#o = this.#t === this ? [] : this.#t.#o, "!" !== t22 || this.#t.#a || this.#o.push(this), this.#s = this.#i ? this.#i.#r.length : 0;
  }
  get hasMagic() {
    if (void 0 !== this.#e) return this.#e;
    for (const t22 of this.#r) if ("string" != typeof t22 && (t22.type || t22.hasMagic)) return this.#e = true;
    return this.#e;
  }
  toString() {
    return void 0 !== this.#l ? this.#l : this.type ? this.#l = this.type + "(" + this.#r.map(((t22) => String(t22))).join("|") + ")" : this.#l = this.#r.map(((t22) => String(t22))).join("");
  }
  #c() {
    if (this !== this.#t) throw new Error("should only call on root");
    if (this.#a) return this;
    let t22;
    for (this.toString(), this.#a = true; t22 = this.#o.pop(); ) {
      if ("!" !== t22.type) continue;
      let e2 = t22, n2 = e2.#i;
      for (; n2; ) {
        for (let r2 = e2.#s + 1; !n2.type && r2 < n2.#r.length; r2++) for (const e3 of t22.#r) {
          if ("string" == typeof e3) throw new Error("string part in extglob AST??");
          e3.copyIn(n2.#r[r2]);
        }
        e2 = n2, n2 = e2.#i;
      }
    }
    return this;
  }
  push() {
    for (var t22 = arguments.length, e2 = new Array(t22), n2 = 0; n2 < t22; n2++) e2[n2] = arguments[n2];
    for (const t3 of e2) if ("" !== t3) {
      if ("string" != typeof t3 && !(t3 instanceof at$1 && t3.#i === this)) throw new Error("invalid part: " + t3);
      this.#r.push(t3);
    }
  }
  toJSON() {
    const t22 = null === this.type ? this.#r.slice().map(((t3) => "string" == typeof t3 ? t3 : t3.toJSON())) : [this.type, ...this.#r.map(((t3) => t3.toJSON()))];
    return this.isStart() && !this.type && t22.unshift([]), this.isEnd() && (this === this.#t || this.#t.#a && "!" === this.#i?.type) && t22.push({}), t22;
  }
  isStart() {
    if (this.#t === this) return true;
    if (!this.#i?.isStart()) return false;
    if (0 === this.#s) return true;
    const t22 = this.#i;
    for (let e2 = 0; e2 < this.#s; e2++) {
      const n2 = t22.#r[e2];
      if (!(n2 instanceof at$1 && "!" === n2.type)) return false;
    }
    return true;
  }
  isEnd() {
    if (this.#t === this) return true;
    if ("!" === this.#i?.type) return true;
    if (!this.#i?.isEnd()) return false;
    if (!this.type) return this.#i?.isEnd();
    const t22 = this.#i ? this.#i.#r.length : 0;
    return this.#s === t22 - 1;
  }
  copyIn(t22) {
    "string" == typeof t22 ? this.push(t22) : this.push(t22.clone(this));
  }
  clone(t22) {
    const e2 = new at$1(this.type, t22);
    for (const t3 of this.#r) e2.copyIn(t3);
    return e2;
  }
  static #p(t22, e2, n2, r2, i2) {
    const s2 = r2.maxExtglobRecursion ?? 2;
    let o2 = false, a2 = false, h2 = -1, l2 = false;
    if (null === e2.type) {
      let u3 = n2, c3 = "";
      for (; u3 < t22.length; ) {
        const n3 = t22.charAt(u3++);
        if (o2 || "\\" === n3) o2 = !o2, c3 += n3;
        else if (a2) u3 === h2 + 1 ? "^" !== n3 && "!" !== n3 || (l2 = true) : "]" !== n3 || u3 === h2 + 2 && l2 || (a2 = false), c3 += n3;
        else if ("[" !== n3) if (!r2.noext && lt$1(n3) && "(" === t22.charAt(u3) && i2 <= s2) {
          e2.push(c3), c3 = "";
          const s3 = new at$1(n3, e2);
          u3 = at$1.#p(t22, s3, u3, r2, i2 + 1), e2.push(s3);
        } else c3 += n3;
        else a2 = true, h2 = u3, l2 = false, c3 += n3;
      }
      return e2.push(c3), u3;
    }
    let u2 = n2 + 1, c2 = new at$1(null, e2);
    const p2 = [];
    let f2 = "";
    for (; u2 < t22.length; ) {
      const n3 = t22.charAt(u2++);
      if (o2 || "\\" === n3) o2 = !o2, f2 += n3;
      else if (a2) u2 === h2 + 1 ? "^" !== n3 && "!" !== n3 || (l2 = true) : "]" !== n3 || u2 === h2 + 2 && l2 || (a2 = false), f2 += n3;
      else if ("[" !== n3) if (lt$1(n3) && "(" === t22.charAt(u2) && (i2 <= s2 || e2 && e2.#f(n3))) {
        const s3 = e2 && e2.#f(n3) ? 0 : 1;
        c2.push(f2), f2 = "";
        const o3 = new at$1(n3, c2);
        c2.push(o3), u2 = at$1.#p(t22, o3, u2, r2, i2 + s3);
      } else if ("|" !== n3) {
        if (")" === n3) return "" === f2 && 0 === e2.#r.length && (e2.#u = true), c2.push(f2), f2 = "", e2.push(...p2, c2), u2;
        f2 += n3;
      } else c2.push(f2), f2 = "", p2.push(c2), c2 = new at$1(null, e2);
      else a2 = true, h2 = u2, l2 = false, f2 += n3;
    }
    return e2.type = null, e2.#e = void 0, e2.#r = [t22.substring(n2 - 1)], u2;
  }
  #d(t22) {
    return this.#g(t22, pt$1);
  }
  #g(t22) {
    let e2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : ct$1;
    if (!t22 || "object" != typeof t22 || null !== t22.type || 1 !== t22.#r.length || null === this.type) return false;
    const n2 = t22.#r[0];
    return !(!n2 || "object" != typeof n2 || null === n2.type) && this.#f(n2.type, e2);
  }
  #f(t22) {
    let e2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : ft$1;
    return !!e2.get(this.type)?.includes(t22);
  }
  #m(t22, e2) {
    const n2 = t22.#r[0], r2 = new at$1(null, n2, this.options);
    r2.#r.push(""), n2.push(r2), this.#y(t22, e2);
  }
  #y(t22, e2) {
    const n2 = t22.#r[0];
    this.#r.splice(e2, 1, ...n2.#r);
    for (const t3 of n2.#r) "object" == typeof t3 && (t3.#i = this);
    this.#l = void 0;
  }
  #b(t22) {
    const e2 = dt$1.get(this.type);
    return !!e2?.has(t22);
  }
  #v(t22) {
    if (!t22 || "object" != typeof t22 || null !== t22.type || 1 !== t22.#r.length || null === this.type || 1 !== this.#r.length) return false;
    const e2 = t22.#r[0];
    return !(!e2 || "object" != typeof e2 || null === e2.type) && this.#b(e2.type);
  }
  #w(t22) {
    const e2 = dt$1.get(this.type), n2 = t22.#r[0], r2 = e2?.get(n2.type);
    if (!r2) return false;
    this.#r = n2.#r;
    for (const t3 of this.#r) "object" == typeof t3 && (t3.#i = this);
    this.type = r2, this.#l = void 0, this.#u = false;
  }
  #x() {
    if (ut$1(this)) {
      let t22 = 0, e2 = false;
      do {
        e2 = true;
        for (let t3 = 0; t3 < this.#r.length; t3++) {
          const n2 = this.#r[t3];
          "object" == typeof n2 && (n2.#x(), this.#g(n2) ? (e2 = false, this.#y(n2, t3)) : this.#d(n2) ? (e2 = false, this.#m(n2, t3)) : this.#v(n2) && (e2 = false, this.#w(n2)));
        }
      } while (!e2 && ++t22 < 10);
    } else for (const t22 of this.#r) "object" == typeof t22 && t22.#x();
    this.#l = void 0;
  }
  static fromGlob(t22) {
    let e2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    const n2 = new at$1(null, void 0, e2);
    return at$1.#p(t22, n2, 0, e2, 0), n2;
  }
  toMMPattern() {
    if (this !== this.#t) return this.#t.toMMPattern();
    const t22 = this.toString(), [e2, n2, r2, i2] = this.toRegExpSource();
    if (!(r2 || this.#e || this.#h.nocase && !this.#h.nocaseMagicOnly && t22.toUpperCase() !== t22.toLowerCase())) return n2;
    const s2 = (this.#h.nocase ? "i" : "") + (i2 ? "u" : "");
    return Object.assign(new RegExp(`^${e2}$`, s2), { _src: e2, _glob: t22 });
  }
  get options() {
    return this.#h;
  }
  toRegExpSource(t22) {
    const e2 = t22 ?? !!this.#h.dot;
    if (this.#t === this && (this.#x(), this.#c()), !ut$1(this)) {
      const n3 = this.isStart() && this.isEnd(), r3 = this.#r.map(((e3) => {
        const [r4, i4, s4, o3] = "string" == typeof e3 ? at$1.#N(e3, this.#e, n3) : e3.toRegExpSource(t22);
        return this.#e = this.#e || s4, this.#n = this.#n || o3, r4;
      })).join("");
      let i3 = "";
      if (this.isStart() && "string" == typeof this.#r[0] && (1 !== this.#r.length || !yt.has(this.#r[0]))) {
        const n4 = mt$1, s4 = e2 && n4.has(r3.charAt(0)) || r3.startsWith("\\.") && n4.has(r3.charAt(2)) || r3.startsWith("\\.\\.") && n4.has(r3.charAt(4)), o3 = !e2 && !t22 && n4.has(r3.charAt(0));
        i3 = s4 ? "(?!(?:^|/)\\.\\.?(?:$|/))" : o3 ? gt$2 : "";
      }
      let s3 = "";
      return this.isEnd() && this.#t.#a && "!" === this.#i?.type && (s3 = "(?:$|\\/)"), [i3 + r3 + s3, ot$1(r3), this.#e = !!this.#e, this.#n];
    }
    const n2 = "*" === this.type || "+" === this.type, r2 = "!" === this.type ? "(?:(?!(?:" : "(?:";
    let i2 = this.#E(e2);
    if (this.isStart() && this.isEnd() && !i2 && "!" !== this.type) {
      const t3 = this.toString(), e3 = this;
      return e3.#r = [t3], e3.type = null, e3.#e = void 0, [t3, ot$1(this.toString()), false, false];
    }
    let s2 = !n2 || t22 || e2 ? "" : this.#E(true);
    s2 === i2 && (s2 = ""), s2 && (i2 = `(?:${i2})(?:${s2})*?`);
    let o2 = "";
    return o2 = "!" === this.type && this.#u ? (this.isStart() && !e2 ? gt$2 : "") + xt : r2 + i2 + ("!" === this.type ? "))" + (!this.isStart() || e2 || t22 ? "" : gt$2) + wt$1 + ")" : "@" === this.type ? ")" : "?" === this.type ? ")?" : "+" === this.type && s2 ? ")" : "*" === this.type && s2 ? ")?" : `)${this.type}`), [o2, ot$1(i2), this.#e = !!this.#e, this.#n];
  }
  #E(t22) {
    return this.#r.map(((e2) => {
      if ("string" == typeof e2) throw new Error("string type in extglob ast??");
      const [n2, r2, i2, s2] = e2.toRegExpSource(t22);
      return this.#n = this.#n || s2, n2;
    })).filter(((t3) => !(this.isStart() && this.isEnd() && !t3))).join("|");
  }
  static #N(t22, e2) {
    let n2 = arguments.length > 2 && void 0 !== arguments[2] && arguments[2], r2 = false, i2 = "", s2 = false, o2 = false;
    for (let a2 = 0; a2 < t22.length; a2++) {
      const h2 = t22.charAt(a2);
      if (r2) r2 = false, i2 += (bt.has(h2) ? "\\" : "") + h2, o2 = false;
      else if ("\\" !== h2) {
        if ("[" === h2) {
          const [n3, r3, h3, l2] = st$1(t22, a2);
          if (h3) {
            i2 += n3, s2 = s2 || r3, a2 += h3 - 1, e2 = e2 || l2, o2 = false;
            continue;
          }
        }
        if ("*" !== h2) o2 = false, "?" !== h2 ? i2 += h2.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&") : (i2 += vt, e2 = true);
        else {
          if (o2) continue;
          o2 = true, i2 += n2 && /^[*]+$/.test(t22) ? xt : wt$1, e2 = true;
        }
      } else a2 === t22.length - 1 ? i2 += "\\\\" : r2 = true;
    }
    return [i2, ot$1(t22), !!e2, s2];
  }
}
at$1 = Nt;
const Et = function(t22, e2) {
  let n2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
  return et$1(e2), !(!n2.nocomment && "#" === e2.charAt(0)) && new Xt(e2, n2).match(t22);
}, At = /^\*+([^+@!?\*\[\(]*)$/, St = (t22) => (e2) => !e2.startsWith(".") && e2.endsWith(t22), Pt = (t22) => (e2) => e2.endsWith(t22), Tt = (t22) => (t22 = t22.toLowerCase(), (e2) => !e2.startsWith(".") && e2.toLowerCase().endsWith(t22)), Ot = (t22) => (t22 = t22.toLowerCase(), (e2) => e2.toLowerCase().endsWith(t22)), Ct = /^\*+\.\*+$/, _t = (t22) => !t22.startsWith(".") && t22.includes("."), $t = (t22) => "." !== t22 && ".." !== t22 && t22.includes("."), jt = /^\.\*+$/, It = (t22) => "." !== t22 && ".." !== t22 && t22.startsWith("."), Mt = /^\*+$/, Rt = (t22) => 0 !== t22.length && !t22.startsWith("."), kt = (t22) => 0 !== t22.length && "." !== t22 && ".." !== t22, Lt = /^\?+([^+@!?\*\[\(]*)?$/, Dt = (t22) => {
  let [e2, n2 = ""] = t22;
  const r2 = Wt([e2]);
  return n2 ? (n2 = n2.toLowerCase(), (t3) => r2(t3) && t3.toLowerCase().endsWith(n2)) : r2;
}, Ut = (t22) => {
  let [e2, n2 = ""] = t22;
  const r2 = Bt([e2]);
  return n2 ? (n2 = n2.toLowerCase(), (t3) => r2(t3) && t3.toLowerCase().endsWith(n2)) : r2;
}, Ft = (t22) => {
  let [e2, n2 = ""] = t22;
  const r2 = Bt([e2]);
  return n2 ? (t3) => r2(t3) && t3.endsWith(n2) : r2;
}, Vt = (t22) => {
  let [e2, n2 = ""] = t22;
  const r2 = Wt([e2]);
  return n2 ? (t3) => r2(t3) && t3.endsWith(n2) : r2;
}, Wt = (t22) => {
  let [e2] = t22;
  const n2 = e2.length;
  return (t3) => t3.length === n2 && !t3.startsWith(".");
}, Bt = (t22) => {
  let [e2] = t22;
  const n2 = e2.length;
  return (t3) => t3.length === n2 && "." !== t3 && ".." !== t3;
}, Gt = "object" == typeof process$1 && process$1 ? "object" == typeof define_process_env_default$1 && define_process_env_default$1 && define_process_env_default$1.__MINIMATCH_TESTING_PLATFORM__ || process$1.platform : "posix";
Et.sep = "win32" === Gt ? "\\" : "/";
const zt = /* @__PURE__ */ Symbol("globstar **");
Et.GLOBSTAR = zt, Et.filter = function(t22) {
  let e2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
  return (n2) => Et(n2, t22, e2);
};
const qt = function(t22) {
  let e2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
  return Object.assign({}, t22, e2);
};
Et.defaults = (t22) => {
  if (!t22 || "object" != typeof t22 || !Object.keys(t22).length) return Et;
  const e2 = Et;
  return Object.assign((function(n2, r2) {
    return e2(n2, r2, qt(t22, arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}));
  }), { Minimatch: class extends e2.Minimatch {
    constructor(e3) {
      super(e3, qt(t22, arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}));
    }
    static defaults(n2) {
      return e2.defaults(qt(t22, n2)).Minimatch;
    }
  }, AST: class extends e2.AST {
    constructor(e3, n2) {
      super(e3, n2, qt(t22, arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}));
    }
    static fromGlob(n2) {
      let r2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
      return e2.AST.fromGlob(n2, qt(t22, r2));
    }
  }, unescape: function(n2) {
    let r2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    return e2.unescape(n2, qt(t22, r2));
  }, escape: function(n2) {
    let r2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    return e2.escape(n2, qt(t22, r2));
  }, filter: function(n2) {
    let r2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    return e2.filter(n2, qt(t22, r2));
  }, defaults: (n2) => e2.defaults(qt(t22, n2)), makeRe: function(n2) {
    let r2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    return e2.makeRe(n2, qt(t22, r2));
  }, braceExpand: function(n2) {
    let r2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    return e2.braceExpand(n2, qt(t22, r2));
  }, match: function(n2, r2) {
    let i2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
    return e2.match(n2, r2, qt(t22, i2));
  }, sep: e2.sep, GLOBSTAR: zt });
};
const Ht$1 = function(t22) {
  let e2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
  return et$1(t22), e2.nobrace || !/\{(?:(?!\{).)*\}/.test(t22) ? [t22] : tt$2(t22);
};
Et.braceExpand = Ht$1, Et.makeRe = function(t22) {
  return new Xt(t22, arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}).makeRe();
}, Et.match = function(t22, e2) {
  const n2 = new Xt(e2, arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {});
  return t22 = t22.filter(((t3) => n2.match(t3))), n2.options.nonull && !t22.length && t22.push(e2), t22;
};
const Yt = /[?*]|[+@!]\(.*?\)|\[|\]/;
class Xt {
  options;
  set;
  pattern;
  windowsPathsNoEscape;
  nonegate;
  negate;
  comment;
  empty;
  preserveMultipleSlashes;
  partial;
  globSet;
  globParts;
  nocase;
  isWindows;
  platform;
  windowsNoMagicRoot;
  maxGlobstarRecursion;
  regexp;
  constructor(t22) {
    let e2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    et$1(t22), e2 = e2 || {}, this.options = e2, this.maxGlobstarRecursion = e2.maxGlobstarRecursion ?? 200, this.pattern = t22, this.platform = e2.platform || Gt, this.isWindows = "win32" === this.platform, this.windowsPathsNoEscape = !!e2.windowsPathsNoEscape || false === e2.allowWindowsEscape, this.windowsPathsNoEscape && (this.pattern = this.pattern.replace(/\\/g, "/")), this.preserveMultipleSlashes = !!e2.preserveMultipleSlashes, this.regexp = null, this.negate = false, this.nonegate = !!e2.nonegate, this.comment = false, this.empty = false, this.partial = !!e2.partial, this.nocase = !!this.options.nocase, this.windowsNoMagicRoot = void 0 !== e2.windowsNoMagicRoot ? e2.windowsNoMagicRoot : !(!this.isWindows || !this.nocase), this.globSet = [], this.globParts = [], this.set = [], this.make();
  }
  hasMagic() {
    if (this.options.magicalBraces && this.set.length > 1) return true;
    for (const t22 of this.set) for (const e2 of t22) if ("string" != typeof e2) return true;
    return false;
  }
  debug() {
  }
  make() {
    const t22 = this.pattern, e2 = this.options;
    if (!e2.nocomment && "#" === t22.charAt(0)) return void (this.comment = true);
    if (!t22) return void (this.empty = true);
    this.parseNegate(), this.globSet = [...new Set(this.braceExpand())], e2.debug && (this.debug = function() {
      return console.error(...arguments);
    }), this.debug(this.pattern, this.globSet);
    const n2 = this.globSet.map(((t3) => this.slashSplit(t3)));
    this.globParts = this.preprocess(n2), this.debug(this.pattern, this.globParts);
    let r2 = this.globParts.map(((t3, e3, n3) => {
      if (this.isWindows && this.windowsNoMagicRoot) {
        const e4 = !("" !== t3[0] || "" !== t3[1] || "?" !== t3[2] && Yt.test(t3[2]) || Yt.test(t3[3])), n4 = /^[a-z]:/i.test(t3[0]);
        if (e4) return [...t3.slice(0, 4), ...t3.slice(4).map(((t42) => this.parse(t42)))];
        if (n4) return [t3[0], ...t3.slice(1).map(((t42) => this.parse(t42)))];
      }
      return t3.map(((t42) => this.parse(t42)));
    }));
    if (this.debug(this.pattern, r2), this.set = r2.filter(((t3) => -1 === t3.indexOf(false))), this.isWindows) for (let t3 = 0; t3 < this.set.length; t3++) {
      const e3 = this.set[t3];
      "" === e3[0] && "" === e3[1] && "?" === this.globParts[t3][2] && "string" == typeof e3[3] && /^[a-z]:$/i.test(e3[3]) && (e3[2] = "?");
    }
    this.debug(this.pattern, this.set);
  }
  preprocess(t22) {
    if (this.options.noglobstar) for (let e3 = 0; e3 < t22.length; e3++) for (let n2 = 0; n2 < t22[e3].length; n2++) "**" === t22[e3][n2] && (t22[e3][n2] = "*");
    const { optimizationLevel: e2 = 1 } = this.options;
    return e2 >= 2 ? (t22 = this.firstPhasePreProcess(t22), t22 = this.secondPhasePreProcess(t22)) : t22 = e2 >= 1 ? this.levelOneOptimize(t22) : this.adjascentGlobstarOptimize(t22), t22;
  }
  adjascentGlobstarOptimize(t22) {
    return t22.map(((t3) => {
      let e2 = -1;
      for (; -1 !== (e2 = t3.indexOf("**", e2 + 1)); ) {
        let n2 = e2;
        for (; "**" === t3[n2 + 1]; ) n2++;
        n2 !== e2 && t3.splice(e2, n2 - e2);
      }
      return t3;
    }));
  }
  levelOneOptimize(t22) {
    return t22.map(((t3) => 0 === (t3 = t3.reduce(((t42, e2) => {
      const n2 = t42[t42.length - 1];
      return "**" === e2 && "**" === n2 ? t42 : ".." === e2 && n2 && ".." !== n2 && "." !== n2 && "**" !== n2 ? (t42.pop(), t42) : (t42.push(e2), t42);
    }), [])).length ? [""] : t3));
  }
  levelTwoFileOptimize(t22) {
    Array.isArray(t22) || (t22 = this.slashSplit(t22));
    let e2 = false;
    do {
      if (e2 = false, !this.preserveMultipleSlashes) {
        for (let n3 = 1; n3 < t22.length - 1; n3++) {
          const r2 = t22[n3];
          1 === n3 && "" === r2 && "" === t22[0] || "." !== r2 && "" !== r2 || (e2 = true, t22.splice(n3, 1), n3--);
        }
        "." !== t22[0] || 2 !== t22.length || "." !== t22[1] && "" !== t22[1] || (e2 = true, t22.pop());
      }
      let n2 = 0;
      for (; -1 !== (n2 = t22.indexOf("..", n2 + 1)); ) {
        const r2 = t22[n2 - 1];
        r2 && "." !== r2 && ".." !== r2 && "**" !== r2 && (e2 = true, t22.splice(n2 - 1, 2), n2 -= 2);
      }
    } while (e2);
    return 0 === t22.length ? [""] : t22;
  }
  firstPhasePreProcess(t22) {
    let e2 = false;
    do {
      e2 = false;
      for (let n2 of t22) {
        let r2 = -1;
        for (; -1 !== (r2 = n2.indexOf("**", r2 + 1)); ) {
          let i3 = r2;
          for (; "**" === n2[i3 + 1]; ) i3++;
          i3 > r2 && n2.splice(r2 + 1, i3 - r2);
          let s2 = n2[r2 + 1];
          const o2 = n2[r2 + 2], a2 = n2[r2 + 3];
          if (".." !== s2) continue;
          if (!o2 || "." === o2 || ".." === o2 || !a2 || "." === a2 || ".." === a2) continue;
          e2 = true, n2.splice(r2, 1);
          const h2 = n2.slice(0);
          h2[r2] = "**", t22.push(h2), r2--;
        }
        if (!this.preserveMultipleSlashes) {
          for (let t3 = 1; t3 < n2.length - 1; t3++) {
            const r3 = n2[t3];
            1 === t3 && "" === r3 && "" === n2[0] || "." !== r3 && "" !== r3 || (e2 = true, n2.splice(t3, 1), t3--);
          }
          "." !== n2[0] || 2 !== n2.length || "." !== n2[1] && "" !== n2[1] || (e2 = true, n2.pop());
        }
        let i2 = 0;
        for (; -1 !== (i2 = n2.indexOf("..", i2 + 1)); ) {
          const t3 = n2[i2 - 1];
          if (t3 && "." !== t3 && ".." !== t3 && "**" !== t3) {
            e2 = true;
            const t42 = 1 === i2 && "**" === n2[i2 + 1] ? ["."] : [];
            n2.splice(i2 - 1, 2, ...t42), 0 === n2.length && n2.push(""), i2 -= 2;
          }
        }
      }
    } while (e2);
    return t22;
  }
  secondPhasePreProcess(t22) {
    for (let e2 = 0; e2 < t22.length - 1; e2++) for (let n2 = e2 + 1; n2 < t22.length; n2++) {
      const r2 = this.partsMatch(t22[e2], t22[n2], !this.preserveMultipleSlashes);
      if (r2) {
        t22[e2] = [], t22[n2] = r2;
        break;
      }
    }
    return t22.filter(((t3) => t3.length));
  }
  partsMatch(t22, e2) {
    let n2 = arguments.length > 2 && void 0 !== arguments[2] && arguments[2], r2 = 0, i2 = 0, s2 = [], o2 = "";
    for (; r2 < t22.length && i2 < e2.length; ) if (t22[r2] === e2[i2]) s2.push("b" === o2 ? e2[i2] : t22[r2]), r2++, i2++;
    else if (n2 && "**" === t22[r2] && e2[i2] === t22[r2 + 1]) s2.push(t22[r2]), r2++;
    else if (n2 && "**" === e2[i2] && t22[r2] === e2[i2 + 1]) s2.push(e2[i2]), i2++;
    else if ("*" !== t22[r2] || !e2[i2] || !this.options.dot && e2[i2].startsWith(".") || "**" === e2[i2]) {
      if ("*" !== e2[i2] || !t22[r2] || !this.options.dot && t22[r2].startsWith(".") || "**" === t22[r2]) return false;
      if ("a" === o2) return false;
      o2 = "b", s2.push(e2[i2]), r2++, i2++;
    } else {
      if ("b" === o2) return false;
      o2 = "a", s2.push(t22[r2]), r2++, i2++;
    }
    return t22.length === e2.length && s2;
  }
  parseNegate() {
    if (this.nonegate) return;
    const t22 = this.pattern;
    let e2 = false, n2 = 0;
    for (let r2 = 0; r2 < t22.length && "!" === t22.charAt(r2); r2++) e2 = !e2, n2++;
    n2 && (this.pattern = t22.slice(n2)), this.negate = e2;
  }
  matchOne(t22, e2) {
    let n2 = arguments.length > 2 && void 0 !== arguments[2] && arguments[2], r2 = 0, i2 = 0;
    if (this.isWindows) {
      const n3 = "string" == typeof t22[0] && /^[a-z]:$/i.test(t22[0]), s3 = !n3 && "" === t22[0] && "" === t22[1] && "?" === t22[2] && /^[a-z]:$/i.test(t22[3]), o2 = "string" == typeof e2[0] && /^[a-z]:$/i.test(e2[0]), a2 = s3 ? 3 : n3 ? 0 : void 0, h2 = !o2 && "" === e2[0] && "" === e2[1] && "?" === e2[2] && "string" == typeof e2[3] && /^[a-z]:$/i.test(e2[3]) ? 3 : o2 ? 0 : void 0;
      if ("number" == typeof a2 && "number" == typeof h2) {
        const [n4, s4] = [t22[a2], e2[h2]];
        n4.toLowerCase() === s4.toLowerCase() && (e2[h2] = n4, i2 = h2, r2 = a2);
      }
    }
    const { optimizationLevel: s2 = 1 } = this.options;
    return s2 >= 2 && (t22 = this.levelTwoFileOptimize(t22)), e2.includes(zt) ? this.#A(t22, e2, n2, r2, i2) : this.#S(t22, e2, n2, r2, i2);
  }
  #A(t22, e2, n2, r2, i2) {
    const s2 = e2.indexOf(zt, i2), o2 = e2.lastIndexOf(zt), [a2, h2, l2] = n2 ? [e2.slice(i2, s2), e2.slice(s2 + 1), []] : [e2.slice(i2, s2), e2.slice(s2 + 1, o2), e2.slice(o2 + 1)];
    if (a2.length) {
      const e3 = t22.slice(r2, r2 + a2.length);
      if (!this.#S(e3, a2, n2, 0, 0)) return false;
      r2 += a2.length;
    }
    let u2 = 0;
    if (l2.length) {
      if (l2.length + r2 > t22.length) return false;
      let e3 = t22.length - l2.length;
      if (this.#S(t22, l2, n2, e3, 0)) u2 = l2.length;
      else {
        if ("" !== t22[t22.length - 1] || r2 + l2.length === t22.length) return false;
        if (e3--, !this.#S(t22, l2, n2, e3, 0)) return false;
        u2 = l2.length + 1;
      }
    }
    if (!h2.length) {
      let e3 = !!u2;
      for (let n3 = r2; n3 < t22.length - u2; n3++) {
        const r3 = String(t22[n3]);
        if (e3 = true, "." === r3 || ".." === r3 || !this.options.dot && r3.startsWith(".")) return false;
      }
      return n2 || e3;
    }
    const c2 = [[[], 0]];
    let p2 = c2[0], f2 = 0;
    const d2 = [0];
    for (const t3 of h2) t3 === zt ? (d2.push(f2), p2 = [[], 0], c2.push(p2)) : (p2[0].push(t3), f2++);
    let g2 = c2.length - 1;
    const m2 = t22.length - u2;
    for (const t3 of c2) t3[1] = m2 - (d2[g2--] + t3[0].length);
    return !!this.#P(t22, c2, r2, 0, n2, 0, !!u2);
  }
  #P(t22, e2, n2, r2, i2, s2, o2) {
    const a2 = e2[r2];
    if (!a2) {
      for (let e3 = n2; e3 < t22.length; e3++) {
        o2 = true;
        const n3 = t22[e3];
        if ("." === n3 || ".." === n3 || !this.options.dot && n3.startsWith(".")) return false;
      }
      return o2;
    }
    const [h2, l2] = a2;
    for (; n2 <= l2; ) {
      if (this.#S(t22.slice(0, n2 + h2.length), h2, i2, n2, 0) && s2 < this.maxGlobstarRecursion) {
        const a4 = this.#P(t22, e2, n2 + h2.length, r2 + 1, i2, s2 + 1, o2);
        if (false !== a4) return a4;
      }
      const a3 = t22[n2];
      if ("." === a3 || ".." === a3 || !this.options.dot && a3.startsWith(".")) return false;
      n2++;
    }
    return i2 || null;
  }
  #S(t22, e2, n2, r2, i2) {
    let s2, o2, a2, h2;
    for (s2 = r2, o2 = i2, h2 = t22.length, a2 = e2.length; s2 < h2 && o2 < a2; s2++, o2++) {
      this.debug("matchOne loop");
      let n3, r3 = e2[o2], i3 = t22[s2];
      if (this.debug(e2, r3, i3), false === r3 || r3 === zt) return false;
      if ("string" == typeof r3 ? (n3 = i3 === r3, this.debug("string match", r3, i3, n3)) : (n3 = r3.test(i3), this.debug("pattern match", r3, i3, n3)), !n3) return false;
    }
    if (s2 === h2 && o2 === a2) return true;
    if (s2 === h2) return n2;
    if (o2 === a2) return s2 === h2 - 1 && "" === t22[s2];
    throw new Error("wtf?");
  }
  braceExpand() {
    return Ht$1(this.pattern, this.options);
  }
  parse(t22) {
    et$1(t22);
    const e2 = this.options;
    if ("**" === t22) return zt;
    if ("" === t22) return "";
    let n2, r2 = null;
    (n2 = t22.match(Mt)) ? r2 = e2.dot ? kt : Rt : (n2 = t22.match(At)) ? r2 = (e2.nocase ? e2.dot ? Ot : Tt : e2.dot ? Pt : St)(n2[1]) : (n2 = t22.match(Lt)) ? r2 = (e2.nocase ? e2.dot ? Ut : Dt : e2.dot ? Ft : Vt)(n2) : (n2 = t22.match(Ct)) ? r2 = e2.dot ? $t : _t : (n2 = t22.match(jt)) && (r2 = It);
    const i2 = Nt.fromGlob(t22, this.options).toMMPattern();
    return r2 && "object" == typeof i2 && Reflect.defineProperty(i2, "test", { value: r2 }), i2;
  }
  makeRe() {
    if (this.regexp || false === this.regexp) return this.regexp;
    const t22 = this.set;
    if (!t22.length) return this.regexp = false, this.regexp;
    const e2 = this.options, n2 = e2.noglobstar ? "[^/]*?" : e2.dot ? "(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?" : "(?:(?!(?:\\/|^)\\.).)*?", r2 = new Set(e2.nocase ? ["i"] : []);
    let i2 = t22.map(((t3) => {
      const e3 = t3.map(((t42) => {
        if (t42 instanceof RegExp) for (const e4 of t42.flags.split("")) r2.add(e4);
        return "string" == typeof t42 ? t42.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&") : t42 === zt ? zt : t42._src;
      }));
      return e3.forEach(((t42, r3) => {
        const i3 = e3[r3 + 1], s3 = e3[r3 - 1];
        t42 === zt && s3 !== zt && (void 0 === s3 ? void 0 !== i3 && i3 !== zt ? e3[r3 + 1] = "(?:\\/|" + n2 + "\\/)?" + i3 : e3[r3] = n2 : void 0 === i3 ? e3[r3 - 1] = s3 + "(?:\\/|" + n2 + ")?" : i3 !== zt && (e3[r3 - 1] = s3 + "(?:\\/|\\/" + n2 + "\\/)" + i3, e3[r3 + 1] = zt));
      })), e3.filter(((t42) => t42 !== zt)).join("/");
    })).join("|");
    const [s2, o2] = t22.length > 1 ? ["(?:", ")"] : ["", ""];
    i2 = "^" + s2 + i2 + o2 + "$", this.negate && (i2 = "^(?!" + i2 + ").+$");
    try {
      this.regexp = new RegExp(i2, [...r2].join(""));
    } catch (t3) {
      this.regexp = false;
    }
    return this.regexp;
  }
  slashSplit(t22) {
    return this.preserveMultipleSlashes ? t22.split("/") : this.isWindows && /^\/\/[^\/]+/.test(t22) ? ["", ...t22.split(/\/+/)] : t22.split(/\/+/);
  }
  match(t22) {
    let e2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.partial;
    if (this.debug("match", t22, this.pattern), this.comment) return false;
    if (this.empty) return "" === t22;
    if ("/" === t22 && e2) return true;
    const n2 = this.options;
    this.isWindows && (t22 = t22.split("\\").join("/"));
    const r2 = this.slashSplit(t22);
    this.debug(this.pattern, "split", r2);
    const i2 = this.set;
    this.debug(this.pattern, "set", i2);
    let s2 = r2[r2.length - 1];
    if (!s2) for (let t3 = r2.length - 2; !s2 && t3 >= 0; t3--) s2 = r2[t3];
    for (let t3 = 0; t3 < i2.length; t3++) {
      const o2 = i2[t3];
      let a2 = r2;
      if (n2.matchBase && 1 === o2.length && (a2 = [s2]), this.matchOne(a2, o2, e2)) return !!n2.flipNegate || !this.negate;
    }
    return !n2.flipNegate && this.negate;
  }
  static defaults(t22) {
    return Et.defaults(t22).Minimatch;
  }
}
Et.AST = Nt, Et.Minimatch = Xt, Et.escape = function(t22) {
  let { windowsPathsNoEscape: e2 = false } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
  return e2 ? t22.replace(/[?*()[\]]/g, "[$&]") : t22.replace(/[?*()[\]\\]/g, "\\$&");
}, Et.unescape = ot$1;
new Set("!?\\\\/[]$%{}^&*()<>|+");
var An = n$2(829);
n$2.n(An);
var Pn = (function(t22) {
  return t22.Array = "array", t22.Object = "object", t22.Original = "original", t22;
})(Pn || {});
"undefined" != typeof Symbol ? Symbol.iterator || (Symbol.iterator = /* @__PURE__ */ Symbol("Symbol.iterator")) : "@@iterator";
var qn = n$2(388);
n$2.n(qn);
n$2(172);
var LogLevel = /* @__PURE__ */ ((LogLevel2) => {
  LogLevel2[LogLevel2["Debug"] = 0] = "Debug";
  LogLevel2[LogLevel2["Info"] = 1] = "Info";
  LogLevel2[LogLevel2["Warn"] = 2] = "Warn";
  LogLevel2[LogLevel2["Error"] = 3] = "Error";
  LogLevel2[LogLevel2["Fatal"] = 4] = "Fatal";
  return LogLevel2;
})(LogLevel || {});
class ConsoleLogger {
  context;
  constructor(context) {
    this.context = context || {};
  }
  formatMessage(message, level, context) {
    let msg = "[" + LogLevel[level].toUpperCase() + "] ";
    if (context && context.app) {
      msg += context.app + ": ";
    }
    if (typeof message === "string") return msg + message;
    msg += `Unexpected ${message.name}`;
    if (message.message) msg += ` "${message.message}"`;
    if (level === LogLevel.Debug && message.stack) msg += `

Stack trace:
${message.stack}`;
    return msg;
  }
  log(level, message, context) {
    if (typeof this.context?.level === "number" && level < this.context?.level) {
      return;
    }
    if (typeof message === "object" && context?.error === void 0) {
      context.error = message;
    }
    switch (level) {
      case LogLevel.Debug:
        console.debug(this.formatMessage(message, LogLevel.Debug, context), context);
        break;
      case LogLevel.Info:
        console.info(this.formatMessage(message, LogLevel.Info, context), context);
        break;
      case LogLevel.Warn:
        console.warn(this.formatMessage(message, LogLevel.Warn, context), context);
        break;
      case LogLevel.Error:
        console.error(this.formatMessage(message, LogLevel.Error, context), context);
        break;
      case LogLevel.Fatal:
      default:
        console.error(this.formatMessage(message, LogLevel.Fatal, context), context);
        break;
    }
  }
  debug(message, context) {
    this.log(LogLevel.Debug, message, Object.assign({}, this.context, context));
  }
  info(message, context) {
    this.log(LogLevel.Info, message, Object.assign({}, this.context, context));
  }
  warn(message, context) {
    this.log(LogLevel.Warn, message, Object.assign({}, this.context, context));
  }
  error(message, context) {
    this.log(LogLevel.Error, message, Object.assign({}, this.context, context));
  }
  fatal(message, context) {
    this.log(LogLevel.Fatal, message, Object.assign({}, this.context, context));
  }
}
function buildConsoleLogger(context) {
  return new ConsoleLogger(context);
}
class LoggerBuilder {
  context;
  factory;
  constructor(factory2) {
    this.context = {};
    this.factory = factory2;
  }
  /**
   * Set the app name within the logging context
   *
   * @param appId App name
   */
  setApp(appId) {
    this.context.app = appId;
    return this;
  }
  /**
   * Set the logging level within the logging context
   *
   * @param level Logging level
   */
  setLogLevel(level) {
    this.context.level = level;
    return this;
  }
  /* eslint-disable jsdoc/no-undefined-types */
  /**
   * Set the user id within the logging context
   * @param uid User ID
   * @see {@link detectUser}
   */
  /* eslint-enable jsdoc/no-undefined-types */
  setUid(uid) {
    this.context.uid = uid;
    return this;
  }
  /**
   * Detect the currently logged in user and set the user id within the logging context
   */
  detectUser() {
    const user = getCurrentUser();
    if (user !== null) {
      this.context.uid = user.uid;
    }
    return this;
  }
  /**
   * Detect and use logging level configured in nextcloud config
   */
  detectLogLevel() {
    const self2 = this;
    const onLoaded = () => {
      if (document.readyState === "complete" || document.readyState === "interactive") {
        self2.context.level = window._oc_config?.loglevel ?? LogLevel.Warn;
        if (window._oc_debug) {
          self2.context.level = LogLevel.Debug;
        }
        document.removeEventListener("readystatechange", onLoaded);
      } else {
        document.addEventListener("readystatechange", onLoaded);
      }
    };
    onLoaded();
    return this;
  }
  /** Build a logger using the logging context and factory */
  build() {
    if (this.context.level === void 0) {
      this.detectLogLevel();
    }
    return this.factory(this.context);
  }
}
function getLoggerBuilder() {
  return new LoggerBuilder(buildConsoleLogger);
}
const logger = getLoggerBuilder().setApp("@nextcloud/files").detectUser().build();
var Permission = /* @__PURE__ */ ((Permission2) => {
  Permission2[Permission2["NONE"] = 0] = "NONE";
  Permission2[Permission2["CREATE"] = 4] = "CREATE";
  Permission2[Permission2["READ"] = 1] = "READ";
  Permission2[Permission2["UPDATE"] = 2] = "UPDATE";
  Permission2[Permission2["DELETE"] = 8] = "DELETE";
  Permission2[Permission2["SHARE"] = 16] = "SHARE";
  Permission2[Permission2["ALL"] = 31] = "ALL";
  return Permission2;
})(Permission || {});
function getRootPath() {
  if (isPublicShare()) {
    return `/files/${getSharingToken()}`;
  }
  return `/files/${getCurrentUser()?.uid}`;
}
getRootPath();
function getRemoteURL() {
  const url = generateRemoteUrl("dav");
  if (isPublicShare()) {
    return url.replace("remote.php", "public.php");
  }
  return url;
}
getRemoteURL();
var string_decoder = {};
var safeBuffer = { exports: {} };
var dist = {};
var hasRequiredDist;
function requireDist() {
  if (hasRequiredDist) return dist;
  hasRequiredDist = 1;
  (function(exports) {
    Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
    var buffer2 = {};
    var base64Js2 = {};
    base64Js2.byteLength = byteLength2;
    base64Js2.toByteArray = toByteArray2;
    base64Js2.fromByteArray = fromByteArray2;
    var lookup2 = [];
    var revLookup2 = [];
    var Arr2 = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
    var code2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    for (var i2 = 0, len2 = code2.length; i2 < len2; ++i2) {
      lookup2[i2] = code2[i2];
      revLookup2[code2.charCodeAt(i2)] = i2;
    }
    revLookup2["-".charCodeAt(0)] = 62;
    revLookup2["_".charCodeAt(0)] = 63;
    function getLens2(b64) {
      var len3 = b64.length;
      if (len3 % 4 > 0) {
        throw new Error("Invalid string. Length must be a multiple of 4");
      }
      var validLen = b64.indexOf("=");
      if (validLen === -1) validLen = len3;
      var placeHoldersLen = validLen === len3 ? 0 : 4 - validLen % 4;
      return [validLen, placeHoldersLen];
    }
    function byteLength2(b64) {
      var lens = getLens2(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
    }
    function _byteLength2(b64, validLen, placeHoldersLen) {
      return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
    }
    function toByteArray2(b64) {
      var tmp;
      var lens = getLens2(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      var arr = new Arr2(_byteLength2(b64, validLen, placeHoldersLen));
      var curByte = 0;
      var len3 = placeHoldersLen > 0 ? validLen - 4 : validLen;
      var i3;
      for (i3 = 0; i3 < len3; i3 += 4) {
        tmp = revLookup2[b64.charCodeAt(i3)] << 18 | revLookup2[b64.charCodeAt(i3 + 1)] << 12 | revLookup2[b64.charCodeAt(i3 + 2)] << 6 | revLookup2[b64.charCodeAt(i3 + 3)];
        arr[curByte++] = tmp >> 16 & 255;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = tmp & 255;
      }
      if (placeHoldersLen === 2) {
        tmp = revLookup2[b64.charCodeAt(i3)] << 2 | revLookup2[b64.charCodeAt(i3 + 1)] >> 4;
        arr[curByte++] = tmp & 255;
      }
      if (placeHoldersLen === 1) {
        tmp = revLookup2[b64.charCodeAt(i3)] << 10 | revLookup2[b64.charCodeAt(i3 + 1)] << 4 | revLookup2[b64.charCodeAt(i3 + 2)] >> 2;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = tmp & 255;
      }
      return arr;
    }
    function tripletToBase642(num) {
      return lookup2[num >> 18 & 63] + lookup2[num >> 12 & 63] + lookup2[num >> 6 & 63] + lookup2[num & 63];
    }
    function encodeChunk2(uint8, start, end) {
      var tmp;
      var output = [];
      for (var i3 = start; i3 < end; i3 += 3) {
        tmp = (uint8[i3] << 16 & 16711680) + (uint8[i3 + 1] << 8 & 65280) + (uint8[i3 + 2] & 255);
        output.push(tripletToBase642(tmp));
      }
      return output.join("");
    }
    function fromByteArray2(uint8) {
      var tmp;
      var len3 = uint8.length;
      var extraBytes = len3 % 3;
      var parts = [];
      var maxChunkLength = 16383;
      for (var i3 = 0, len22 = len3 - extraBytes; i3 < len22; i3 += maxChunkLength) {
        parts.push(encodeChunk2(uint8, i3, i3 + maxChunkLength > len22 ? len22 : i3 + maxChunkLength));
      }
      if (extraBytes === 1) {
        tmp = uint8[len3 - 1];
        parts.push(
          lookup2[tmp >> 2] + lookup2[tmp << 4 & 63] + "=="
        );
      } else if (extraBytes === 2) {
        tmp = (uint8[len3 - 2] << 8) + uint8[len3 - 1];
        parts.push(
          lookup2[tmp >> 10] + lookup2[tmp >> 4 & 63] + lookup2[tmp << 2 & 63] + "="
        );
      }
      return parts.join("");
    }
    var ieee7542 = {};
    /*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
    ieee7542.read = function(buffer3, offset2, isLE, mLen, nBytes) {
      var e2, m2;
      var eLen = nBytes * 8 - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var nBits = -7;
      var i3 = isLE ? nBytes - 1 : 0;
      var d2 = isLE ? -1 : 1;
      var s2 = buffer3[offset2 + i3];
      i3 += d2;
      e2 = s2 & (1 << -nBits) - 1;
      s2 >>= -nBits;
      nBits += eLen;
      for (; nBits > 0; e2 = e2 * 256 + buffer3[offset2 + i3], i3 += d2, nBits -= 8) {
      }
      m2 = e2 & (1 << -nBits) - 1;
      e2 >>= -nBits;
      nBits += mLen;
      for (; nBits > 0; m2 = m2 * 256 + buffer3[offset2 + i3], i3 += d2, nBits -= 8) {
      }
      if (e2 === 0) {
        e2 = 1 - eBias;
      } else if (e2 === eMax) {
        return m2 ? NaN : (s2 ? -1 : 1) * Infinity;
      } else {
        m2 = m2 + Math.pow(2, mLen);
        e2 = e2 - eBias;
      }
      return (s2 ? -1 : 1) * m2 * Math.pow(2, e2 - mLen);
    };
    ieee7542.write = function(buffer3, value, offset2, isLE, mLen, nBytes) {
      var e2, m2, c2;
      var eLen = nBytes * 8 - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var rt2 = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
      var i3 = isLE ? 0 : nBytes - 1;
      var d2 = isLE ? 1 : -1;
      var s2 = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
      value = Math.abs(value);
      if (isNaN(value) || value === Infinity) {
        m2 = isNaN(value) ? 1 : 0;
        e2 = eMax;
      } else {
        e2 = Math.floor(Math.log(value) / Math.LN2);
        if (value * (c2 = Math.pow(2, -e2)) < 1) {
          e2--;
          c2 *= 2;
        }
        if (e2 + eBias >= 1) {
          value += rt2 / c2;
        } else {
          value += rt2 * Math.pow(2, 1 - eBias);
        }
        if (value * c2 >= 2) {
          e2++;
          c2 /= 2;
        }
        if (e2 + eBias >= eMax) {
          m2 = 0;
          e2 = eMax;
        } else if (e2 + eBias >= 1) {
          m2 = (value * c2 - 1) * Math.pow(2, mLen);
          e2 = e2 + eBias;
        } else {
          m2 = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
          e2 = 0;
        }
      }
      for (; mLen >= 8; buffer3[offset2 + i3] = m2 & 255, i3 += d2, m2 /= 256, mLen -= 8) {
      }
      e2 = e2 << mLen | m2;
      eLen += mLen;
      for (; eLen > 0; buffer3[offset2 + i3] = e2 & 255, i3 += d2, e2 /= 256, eLen -= 8) {
      }
      buffer3[offset2 + i3 - d2] |= s2 * 128;
    };
    /*!
     * The buffer module from node.js, for the browser.
     *
     * @author   Feross Aboukhadijeh <https://feross.org>
     * @license  MIT
     */
    (function(exports2) {
      const base64 = base64Js2;
      const ieee754$1 = ieee7542;
      const customInspectSymbol = typeof Symbol === "function" && typeof Symbol["for"] === "function" ? Symbol["for"]("nodejs.util.inspect.custom") : null;
      exports2.Buffer = Buffer3;
      exports2.SlowBuffer = SlowBuffer;
      exports2.INSPECT_MAX_BYTES = 50;
      const K_MAX_LENGTH = 2147483647;
      exports2.kMaxLength = K_MAX_LENGTH;
      const { Uint8Array: GlobalUint8Array, ArrayBuffer: GlobalArrayBuffer, SharedArrayBuffer: GlobalSharedArrayBuffer } = globalThis;
      Buffer3.TYPED_ARRAY_SUPPORT = typedArraySupport();
      if (!Buffer3.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") {
        console.error(
          "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
        );
      }
      function typedArraySupport() {
        try {
          const arr = new GlobalUint8Array(1);
          const proto = { foo: function() {
            return 42;
          } };
          Object.setPrototypeOf(proto, GlobalUint8Array.prototype);
          Object.setPrototypeOf(arr, proto);
          return arr.foo() === 42;
        } catch (e2) {
          return false;
        }
      }
      Object.defineProperty(Buffer3.prototype, "parent", {
        enumerable: true,
        get: function() {
          if (!Buffer3.isBuffer(this)) return void 0;
          return this.buffer;
        }
      });
      Object.defineProperty(Buffer3.prototype, "offset", {
        enumerable: true,
        get: function() {
          if (!Buffer3.isBuffer(this)) return void 0;
          return this.byteOffset;
        }
      });
      function createBuffer(length) {
        if (length > K_MAX_LENGTH) {
          throw new RangeError('The value "' + length + '" is invalid for option "size"');
        }
        const buf = new GlobalUint8Array(length);
        Object.setPrototypeOf(buf, Buffer3.prototype);
        return buf;
      }
      function Buffer3(arg, encodingOrOffset, length) {
        if (typeof arg === "number") {
          if (typeof encodingOrOffset === "string") {
            throw new TypeError(
              'The "string" argument must be of type string. Received type number'
            );
          }
          return allocUnsafe(arg);
        }
        return from(arg, encodingOrOffset, length);
      }
      Buffer3.poolSize = 8192;
      function from(value, encodingOrOffset, length) {
        if (typeof value === "string") {
          return fromString(value, encodingOrOffset);
        }
        if (GlobalArrayBuffer.isView(value)) {
          return fromArrayView(value);
        }
        if (value == null) {
          throw new TypeError(
            "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
          );
        }
        if (isInstance(value, GlobalArrayBuffer) || value && isInstance(value.buffer, GlobalArrayBuffer)) {
          return fromArrayBuffer(value, encodingOrOffset, length);
        }
        if (typeof GlobalSharedArrayBuffer !== "undefined" && (isInstance(value, GlobalSharedArrayBuffer) || value && isInstance(value.buffer, GlobalSharedArrayBuffer))) {
          return fromArrayBuffer(value, encodingOrOffset, length);
        }
        if (typeof value === "number") {
          throw new TypeError(
            'The "value" argument must not be of type number. Received type number'
          );
        }
        const valueOf = value.valueOf && value.valueOf();
        if (valueOf != null && valueOf !== value) {
          return Buffer3.from(valueOf, encodingOrOffset, length);
        }
        const b2 = fromObject(value);
        if (b2) return b2;
        if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === "function") {
          return Buffer3.from(value[Symbol.toPrimitive]("string"), encodingOrOffset, length);
        }
        throw new TypeError(
          "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
        );
      }
      Buffer3.from = function(value, encodingOrOffset, length) {
        return from(value, encodingOrOffset, length);
      };
      Object.setPrototypeOf(Buffer3.prototype, GlobalUint8Array.prototype);
      Object.setPrototypeOf(Buffer3, GlobalUint8Array);
      function assertSize(size2) {
        if (typeof size2 !== "number") {
          throw new TypeError('"size" argument must be of type number');
        } else if (size2 < 0) {
          throw new RangeError('The value "' + size2 + '" is invalid for option "size"');
        }
      }
      function alloc(size2, fill, encoding) {
        assertSize(size2);
        if (size2 <= 0) {
          return createBuffer(size2);
        }
        if (fill !== void 0) {
          return typeof encoding === "string" ? createBuffer(size2).fill(fill, encoding) : createBuffer(size2).fill(fill);
        }
        return createBuffer(size2);
      }
      Buffer3.alloc = function(size2, fill, encoding) {
        return alloc(size2, fill, encoding);
      };
      function allocUnsafe(size2) {
        assertSize(size2);
        return createBuffer(size2 < 0 ? 0 : checked(size2) | 0);
      }
      Buffer3.allocUnsafe = function(size2) {
        return allocUnsafe(size2);
      };
      Buffer3.allocUnsafeSlow = function(size2) {
        return allocUnsafe(size2);
      };
      function fromString(string, encoding) {
        if (typeof encoding !== "string" || encoding === "") {
          encoding = "utf8";
        }
        if (!Buffer3.isEncoding(encoding)) {
          throw new TypeError("Unknown encoding: " + encoding);
        }
        const length = byteLength3(string, encoding) | 0;
        let buf = createBuffer(length);
        const actual = buf.write(string, encoding);
        if (actual !== length) {
          buf = buf.slice(0, actual);
        }
        return buf;
      }
      function fromArrayLike(array) {
        const length = array.length < 0 ? 0 : checked(array.length) | 0;
        const buf = createBuffer(length);
        for (let i3 = 0; i3 < length; i3 += 1) {
          buf[i3] = array[i3] & 255;
        }
        return buf;
      }
      function fromArrayView(arrayView) {
        if (isInstance(arrayView, GlobalUint8Array)) {
          const copy = new GlobalUint8Array(arrayView);
          return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength);
        }
        return fromArrayLike(arrayView);
      }
      function fromArrayBuffer(array, byteOffset, length) {
        if (byteOffset < 0 || array.byteLength < byteOffset) {
          throw new RangeError('"offset" is outside of buffer bounds');
        }
        if (array.byteLength < byteOffset + (length || 0)) {
          throw new RangeError('"length" is outside of buffer bounds');
        }
        let buf;
        if (byteOffset === void 0 && length === void 0) {
          buf = new GlobalUint8Array(array);
        } else if (length === void 0) {
          buf = new GlobalUint8Array(array, byteOffset);
        } else {
          buf = new GlobalUint8Array(array, byteOffset, length);
        }
        Object.setPrototypeOf(buf, Buffer3.prototype);
        return buf;
      }
      function fromObject(obj) {
        if (Buffer3.isBuffer(obj)) {
          const len3 = checked(obj.length) | 0;
          const buf = createBuffer(len3);
          if (buf.length === 0) {
            return buf;
          }
          obj.copy(buf, 0, 0, len3);
          return buf;
        }
        if (obj.length !== void 0) {
          if (typeof obj.length !== "number" || numberIsNaN(obj.length)) {
            return createBuffer(0);
          }
          return fromArrayLike(obj);
        }
        if (obj.type === "Buffer" && Array.isArray(obj.data)) {
          return fromArrayLike(obj.data);
        }
      }
      function checked(length) {
        if (length >= K_MAX_LENGTH) {
          throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + K_MAX_LENGTH.toString(16) + " bytes");
        }
        return length | 0;
      }
      function SlowBuffer(length) {
        if (+length != length) {
          length = 0;
        }
        return Buffer3.alloc(+length);
      }
      Buffer3.isBuffer = function isBuffer2(b2) {
        return b2 != null && b2._isBuffer === true && b2 !== Buffer3.prototype;
      };
      Buffer3.compare = function compare(a2, b2) {
        if (isInstance(a2, GlobalUint8Array)) a2 = Buffer3.from(a2, a2.offset, a2.byteLength);
        if (isInstance(b2, GlobalUint8Array)) b2 = Buffer3.from(b2, b2.offset, b2.byteLength);
        if (!Buffer3.isBuffer(a2) || !Buffer3.isBuffer(b2)) {
          throw new TypeError(
            'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
          );
        }
        if (a2 === b2) return 0;
        let x2 = a2.length;
        let y2 = b2.length;
        for (let i3 = 0, len3 = Math.min(x2, y2); i3 < len3; ++i3) {
          if (a2[i3] !== b2[i3]) {
            x2 = a2[i3];
            y2 = b2[i3];
            break;
          }
        }
        if (x2 < y2) return -1;
        if (y2 < x2) return 1;
        return 0;
      };
      Buffer3.isEncoding = function isEncoding(encoding) {
        switch (String(encoding).toLowerCase()) {
          case "hex":
          case "utf8":
          case "utf-8":
          case "ascii":
          case "latin1":
          case "binary":
          case "base64":
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return true;
          default:
            return false;
        }
      };
      Buffer3.concat = function concat(list, length) {
        if (!Array.isArray(list)) {
          throw new TypeError('"list" argument must be an Array of Buffers');
        }
        if (list.length === 0) {
          return Buffer3.alloc(0);
        }
        let i3;
        if (length === void 0) {
          length = 0;
          for (i3 = 0; i3 < list.length; ++i3) {
            length += list[i3].length;
          }
        }
        const buffer3 = Buffer3.allocUnsafe(length);
        let pos = 0;
        for (i3 = 0; i3 < list.length; ++i3) {
          let buf = list[i3];
          if (isInstance(buf, GlobalUint8Array)) {
            if (pos + buf.length > buffer3.length) {
              if (!Buffer3.isBuffer(buf)) buf = Buffer3.from(buf);
              buf.copy(buffer3, pos);
            } else {
              GlobalUint8Array.prototype.set.call(
                buffer3,
                buf,
                pos
              );
            }
          } else if (!Buffer3.isBuffer(buf)) {
            throw new TypeError('"list" argument must be an Array of Buffers');
          } else {
            buf.copy(buffer3, pos);
          }
          pos += buf.length;
        }
        return buffer3;
      };
      function byteLength3(string, encoding) {
        if (Buffer3.isBuffer(string)) {
          return string.length;
        }
        if (GlobalArrayBuffer.isView(string) || isInstance(string, GlobalArrayBuffer)) {
          return string.byteLength;
        }
        if (typeof string !== "string") {
          throw new TypeError(
            'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof string
          );
        }
        const len3 = string.length;
        const mustMatch = arguments.length > 2 && arguments[2] === true;
        if (!mustMatch && len3 === 0) return 0;
        let loweredCase = false;
        for (; ; ) {
          switch (encoding) {
            case "ascii":
            case "latin1":
            case "binary":
              return len3;
            case "utf8":
            case "utf-8":
              return utf8ToBytes(string).length;
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return len3 * 2;
            case "hex":
              return len3 >>> 1;
            case "base64":
              return base64ToBytes(string).length;
            default:
              if (loweredCase) {
                return mustMatch ? -1 : utf8ToBytes(string).length;
              }
              encoding = ("" + encoding).toLowerCase();
              loweredCase = true;
          }
        }
      }
      Buffer3.byteLength = byteLength3;
      function slowToString(encoding, start, end) {
        let loweredCase = false;
        if (start === void 0 || start < 0) {
          start = 0;
        }
        if (start > this.length) {
          return "";
        }
        if (end === void 0 || end > this.length) {
          end = this.length;
        }
        if (end <= 0) {
          return "";
        }
        end >>>= 0;
        start >>>= 0;
        if (end <= start) {
          return "";
        }
        if (!encoding) encoding = "utf8";
        while (true) {
          switch (encoding) {
            case "hex":
              return hexSlice(this, start, end);
            case "utf8":
            case "utf-8":
              return utf8Slice(this, start, end);
            case "ascii":
              return asciiSlice(this, start, end);
            case "latin1":
            case "binary":
              return latin1Slice(this, start, end);
            case "base64":
              return base64Slice(this, start, end);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return utf16leSlice(this, start, end);
            default:
              if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
              encoding = (encoding + "").toLowerCase();
              loweredCase = true;
          }
        }
      }
      Buffer3.prototype._isBuffer = true;
      function swap(b2, n2, m2) {
        const i3 = b2[n2];
        b2[n2] = b2[m2];
        b2[m2] = i3;
      }
      Buffer3.prototype.swap16 = function swap16() {
        const len3 = this.length;
        if (len3 % 2 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 16-bits");
        }
        for (let i3 = 0; i3 < len3; i3 += 2) {
          swap(this, i3, i3 + 1);
        }
        return this;
      };
      Buffer3.prototype.swap32 = function swap32() {
        const len3 = this.length;
        if (len3 % 4 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 32-bits");
        }
        for (let i3 = 0; i3 < len3; i3 += 4) {
          swap(this, i3, i3 + 3);
          swap(this, i3 + 1, i3 + 2);
        }
        return this;
      };
      Buffer3.prototype.swap64 = function swap64() {
        const len3 = this.length;
        if (len3 % 8 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 64-bits");
        }
        for (let i3 = 0; i3 < len3; i3 += 8) {
          swap(this, i3, i3 + 7);
          swap(this, i3 + 1, i3 + 6);
          swap(this, i3 + 2, i3 + 5);
          swap(this, i3 + 3, i3 + 4);
        }
        return this;
      };
      Buffer3.prototype.toString = function toString3() {
        const length = this.length;
        if (length === 0) return "";
        if (arguments.length === 0) return utf8Slice(this, 0, length);
        return slowToString.apply(this, arguments);
      };
      Buffer3.prototype.toLocaleString = Buffer3.prototype.toString;
      Buffer3.prototype.equals = function equals(b2) {
        if (!Buffer3.isBuffer(b2)) throw new TypeError("Argument must be a Buffer");
        if (this === b2) return true;
        return Buffer3.compare(this, b2) === 0;
      };
      Buffer3.prototype.inspect = function inspect() {
        let str = "";
        const max2 = exports2.INSPECT_MAX_BYTES;
        str = this.toString("hex", 0, max2).replace(/(.{2})/g, "$1 ").trim();
        if (this.length > max2) str += " ... ";
        return "<Buffer " + str + ">";
      };
      if (customInspectSymbol) {
        Buffer3.prototype[customInspectSymbol] = Buffer3.prototype.inspect;
      }
      Buffer3.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
        if (isInstance(target, GlobalUint8Array)) {
          target = Buffer3.from(target, target.offset, target.byteLength);
        }
        if (!Buffer3.isBuffer(target)) {
          throw new TypeError(
            'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof target
          );
        }
        if (start === void 0) {
          start = 0;
        }
        if (end === void 0) {
          end = target ? target.length : 0;
        }
        if (thisStart === void 0) {
          thisStart = 0;
        }
        if (thisEnd === void 0) {
          thisEnd = this.length;
        }
        if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
          throw new RangeError("out of range index");
        }
        if (thisStart >= thisEnd && start >= end) {
          return 0;
        }
        if (thisStart >= thisEnd) {
          return -1;
        }
        if (start >= end) {
          return 1;
        }
        start >>>= 0;
        end >>>= 0;
        thisStart >>>= 0;
        thisEnd >>>= 0;
        if (this === target) return 0;
        let x2 = thisEnd - thisStart;
        let y2 = end - start;
        const len3 = Math.min(x2, y2);
        const thisCopy = this.slice(thisStart, thisEnd);
        const targetCopy = target.slice(start, end);
        for (let i3 = 0; i3 < len3; ++i3) {
          if (thisCopy[i3] !== targetCopy[i3]) {
            x2 = thisCopy[i3];
            y2 = targetCopy[i3];
            break;
          }
        }
        if (x2 < y2) return -1;
        if (y2 < x2) return 1;
        return 0;
      };
      function bidirectionalIndexOf(buffer3, val, byteOffset, encoding, dir) {
        if (buffer3.length === 0) return -1;
        if (typeof byteOffset === "string") {
          encoding = byteOffset;
          byteOffset = 0;
        } else if (byteOffset > 2147483647) {
          byteOffset = 2147483647;
        } else if (byteOffset < -2147483648) {
          byteOffset = -2147483648;
        }
        byteOffset = +byteOffset;
        if (numberIsNaN(byteOffset)) {
          byteOffset = dir ? 0 : buffer3.length - 1;
        }
        if (byteOffset < 0) byteOffset = buffer3.length + byteOffset;
        if (byteOffset >= buffer3.length) {
          if (dir) return -1;
          else byteOffset = buffer3.length - 1;
        } else if (byteOffset < 0) {
          if (dir) byteOffset = 0;
          else return -1;
        }
        if (typeof val === "string") {
          val = Buffer3.from(val, encoding);
        }
        if (Buffer3.isBuffer(val)) {
          if (val.length === 0) {
            return -1;
          }
          return arrayIndexOf(buffer3, val, byteOffset, encoding, dir);
        } else if (typeof val === "number") {
          val = val & 255;
          if (typeof GlobalUint8Array.prototype.indexOf === "function") {
            if (dir) {
              return GlobalUint8Array.prototype.indexOf.call(buffer3, val, byteOffset);
            } else {
              return GlobalUint8Array.prototype.lastIndexOf.call(buffer3, val, byteOffset);
            }
          }
          return arrayIndexOf(buffer3, [val], byteOffset, encoding, dir);
        }
        throw new TypeError("val must be string, number or Buffer");
      }
      function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
        let indexSize = 1;
        let arrLength = arr.length;
        let valLength = val.length;
        if (encoding !== void 0) {
          encoding = String(encoding).toLowerCase();
          if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
            if (arr.length < 2 || val.length < 2) {
              return -1;
            }
            indexSize = 2;
            arrLength /= 2;
            valLength /= 2;
            byteOffset /= 2;
          }
        }
        function read(buf, i4) {
          if (indexSize === 1) {
            return buf[i4];
          } else {
            return buf.readUInt16BE(i4 * indexSize);
          }
        }
        let i3;
        if (dir) {
          let foundIndex = -1;
          for (i3 = byteOffset; i3 < arrLength; i3++) {
            if (read(arr, i3) === read(val, foundIndex === -1 ? 0 : i3 - foundIndex)) {
              if (foundIndex === -1) foundIndex = i3;
              if (i3 - foundIndex + 1 === valLength) return foundIndex * indexSize;
            } else {
              if (foundIndex !== -1) i3 -= i3 - foundIndex;
              foundIndex = -1;
            }
          }
        } else {
          if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
          for (i3 = byteOffset; i3 >= 0; i3--) {
            let found = true;
            for (let j = 0; j < valLength; j++) {
              if (read(arr, i3 + j) !== read(val, j)) {
                found = false;
                break;
              }
            }
            if (found) return i3;
          }
        }
        return -1;
      }
      Buffer3.prototype.includes = function includes(val, byteOffset, encoding) {
        return this.indexOf(val, byteOffset, encoding) !== -1;
      };
      Buffer3.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
        return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
      };
      Buffer3.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
        return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
      };
      function hexWrite(buf, string, offset2, length) {
        offset2 = Number(offset2) || 0;
        const remaining = buf.length - offset2;
        if (!length) {
          length = remaining;
        } else {
          length = Number(length);
          if (length > remaining) {
            length = remaining;
          }
        }
        const strLen = string.length;
        if (length > strLen / 2) {
          length = strLen / 2;
        }
        let i3;
        for (i3 = 0; i3 < length; ++i3) {
          const parsed = parseInt(string.substr(i3 * 2, 2), 16);
          if (numberIsNaN(parsed)) return i3;
          buf[offset2 + i3] = parsed;
        }
        return i3;
      }
      function utf8Write(buf, string, offset2, length) {
        return blitBuffer(utf8ToBytes(string, buf.length - offset2), buf, offset2, length);
      }
      function asciiWrite(buf, string, offset2, length) {
        return blitBuffer(asciiToBytes(string), buf, offset2, length);
      }
      function base64Write(buf, string, offset2, length) {
        return blitBuffer(base64ToBytes(string), buf, offset2, length);
      }
      function ucs2Write(buf, string, offset2, length) {
        return blitBuffer(utf16leToBytes(string, buf.length - offset2), buf, offset2, length);
      }
      Buffer3.prototype.write = function write(string, offset2, length, encoding) {
        if (offset2 === void 0) {
          encoding = "utf8";
          length = this.length;
          offset2 = 0;
        } else if (length === void 0 && typeof offset2 === "string") {
          encoding = offset2;
          length = this.length;
          offset2 = 0;
        } else if (isFinite(offset2)) {
          offset2 = offset2 >>> 0;
          if (isFinite(length)) {
            length = length >>> 0;
            if (encoding === void 0) encoding = "utf8";
          } else {
            encoding = length;
            length = void 0;
          }
        } else {
          throw new Error(
            "Buffer.write(string, encoding, offset[, length]) is no longer supported"
          );
        }
        const remaining = this.length - offset2;
        if (length === void 0 || length > remaining) length = remaining;
        if (string.length > 0 && (length < 0 || offset2 < 0) || offset2 > this.length) {
          throw new RangeError("Attempt to write outside buffer bounds");
        }
        if (!encoding) encoding = "utf8";
        let loweredCase = false;
        for (; ; ) {
          switch (encoding) {
            case "hex":
              return hexWrite(this, string, offset2, length);
            case "utf8":
            case "utf-8":
              return utf8Write(this, string, offset2, length);
            case "ascii":
            case "latin1":
            case "binary":
              return asciiWrite(this, string, offset2, length);
            case "base64":
              return base64Write(this, string, offset2, length);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return ucs2Write(this, string, offset2, length);
            default:
              if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
              encoding = ("" + encoding).toLowerCase();
              loweredCase = true;
          }
        }
      };
      Buffer3.prototype.toJSON = function toJSON() {
        return {
          type: "Buffer",
          data: Array.prototype.slice.call(this._arr || this, 0)
        };
      };
      function base64Slice(buf, start, end) {
        if (start === 0 && end === buf.length) {
          return base64.fromByteArray(buf);
        } else {
          return base64.fromByteArray(buf.slice(start, end));
        }
      }
      function utf8Slice(buf, start, end) {
        end = Math.min(buf.length, end);
        const res = [];
        let i3 = start;
        while (i3 < end) {
          const firstByte = buf[i3];
          let codePoint = null;
          let bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
          if (i3 + bytesPerSequence <= end) {
            let secondByte, thirdByte, fourthByte, tempCodePoint;
            switch (bytesPerSequence) {
              case 1:
                if (firstByte < 128) {
                  codePoint = firstByte;
                }
                break;
              case 2:
                secondByte = buf[i3 + 1];
                if ((secondByte & 192) === 128) {
                  tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
                  if (tempCodePoint > 127) {
                    codePoint = tempCodePoint;
                  }
                }
                break;
              case 3:
                secondByte = buf[i3 + 1];
                thirdByte = buf[i3 + 2];
                if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
                  tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
                  if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                    codePoint = tempCodePoint;
                  }
                }
                break;
              case 4:
                secondByte = buf[i3 + 1];
                thirdByte = buf[i3 + 2];
                fourthByte = buf[i3 + 3];
                if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
                  tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
                  if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                    codePoint = tempCodePoint;
                  }
                }
            }
          }
          if (codePoint === null) {
            codePoint = 65533;
            bytesPerSequence = 1;
          } else if (codePoint > 65535) {
            codePoint -= 65536;
            res.push(codePoint >>> 10 & 1023 | 55296);
            codePoint = 56320 | codePoint & 1023;
          }
          res.push(codePoint);
          i3 += bytesPerSequence;
        }
        return decodeCodePointsArray(res);
      }
      const MAX_ARGUMENTS_LENGTH = 4096;
      function decodeCodePointsArray(codePoints) {
        const len3 = codePoints.length;
        if (len3 <= MAX_ARGUMENTS_LENGTH) {
          return String.fromCharCode.apply(String, codePoints);
        }
        let res = "";
        let i3 = 0;
        while (i3 < len3) {
          res += String.fromCharCode.apply(
            String,
            codePoints.slice(i3, i3 += MAX_ARGUMENTS_LENGTH)
          );
        }
        return res;
      }
      function asciiSlice(buf, start, end) {
        let ret = "";
        end = Math.min(buf.length, end);
        for (let i3 = start; i3 < end; ++i3) {
          ret += String.fromCharCode(buf[i3] & 127);
        }
        return ret;
      }
      function latin1Slice(buf, start, end) {
        let ret = "";
        end = Math.min(buf.length, end);
        for (let i3 = start; i3 < end; ++i3) {
          ret += String.fromCharCode(buf[i3]);
        }
        return ret;
      }
      function hexSlice(buf, start, end) {
        const len3 = buf.length;
        if (!start || start < 0) start = 0;
        if (!end || end < 0 || end > len3) end = len3;
        let out = "";
        for (let i3 = start; i3 < end; ++i3) {
          out += hexSliceLookupTable[buf[i3]];
        }
        return out;
      }
      function utf16leSlice(buf, start, end) {
        const bytes = buf.slice(start, end);
        let res = "";
        for (let i3 = 0; i3 < bytes.length - 1; i3 += 2) {
          res += String.fromCharCode(bytes[i3] + bytes[i3 + 1] * 256);
        }
        return res;
      }
      Buffer3.prototype.slice = function slice(start, end) {
        const len3 = this.length;
        start = ~~start;
        end = end === void 0 ? len3 : ~~end;
        if (start < 0) {
          start += len3;
          if (start < 0) start = 0;
        } else if (start > len3) {
          start = len3;
        }
        if (end < 0) {
          end += len3;
          if (end < 0) end = 0;
        } else if (end > len3) {
          end = len3;
        }
        if (end < start) end = start;
        const newBuf = this.subarray(start, end);
        Object.setPrototypeOf(newBuf, Buffer3.prototype);
        return newBuf;
      };
      function checkOffset(offset2, ext, length) {
        if (offset2 % 1 !== 0 || offset2 < 0) throw new RangeError("offset is not uint");
        if (offset2 + ext > length) throw new RangeError("Trying to access beyond buffer length");
      }
      Buffer3.prototype.readUintLE = Buffer3.prototype.readUIntLE = function readUIntLE(offset2, byteLength4, noAssert) {
        offset2 = offset2 >>> 0;
        byteLength4 = byteLength4 >>> 0;
        if (!noAssert) checkOffset(offset2, byteLength4, this.length);
        let val = this[offset2];
        let mul = 1;
        let i3 = 0;
        while (++i3 < byteLength4 && (mul *= 256)) {
          val += this[offset2 + i3] * mul;
        }
        return val;
      };
      Buffer3.prototype.readUintBE = Buffer3.prototype.readUIntBE = function readUIntBE(offset2, byteLength4, noAssert) {
        offset2 = offset2 >>> 0;
        byteLength4 = byteLength4 >>> 0;
        if (!noAssert) {
          checkOffset(offset2, byteLength4, this.length);
        }
        let val = this[offset2 + --byteLength4];
        let mul = 1;
        while (byteLength4 > 0 && (mul *= 256)) {
          val += this[offset2 + --byteLength4] * mul;
        }
        return val;
      };
      Buffer3.prototype.readUint8 = Buffer3.prototype.readUInt8 = function readUInt8(offset2, noAssert) {
        offset2 = offset2 >>> 0;
        if (!noAssert) checkOffset(offset2, 1, this.length);
        return this[offset2];
      };
      Buffer3.prototype.readUint16LE = Buffer3.prototype.readUInt16LE = function readUInt16LE(offset2, noAssert) {
        offset2 = offset2 >>> 0;
        if (!noAssert) checkOffset(offset2, 2, this.length);
        return this[offset2] | this[offset2 + 1] << 8;
      };
      Buffer3.prototype.readUint16BE = Buffer3.prototype.readUInt16BE = function readUInt16BE(offset2, noAssert) {
        offset2 = offset2 >>> 0;
        if (!noAssert) checkOffset(offset2, 2, this.length);
        return this[offset2] << 8 | this[offset2 + 1];
      };
      Buffer3.prototype.readUint32LE = Buffer3.prototype.readUInt32LE = function readUInt32LE(offset2, noAssert) {
        offset2 = offset2 >>> 0;
        if (!noAssert) checkOffset(offset2, 4, this.length);
        return (this[offset2] | this[offset2 + 1] << 8 | this[offset2 + 2] << 16) + this[offset2 + 3] * 16777216;
      };
      Buffer3.prototype.readUint32BE = Buffer3.prototype.readUInt32BE = function readUInt32BE(offset2, noAssert) {
        offset2 = offset2 >>> 0;
        if (!noAssert) checkOffset(offset2, 4, this.length);
        return this[offset2] * 16777216 + (this[offset2 + 1] << 16 | this[offset2 + 2] << 8 | this[offset2 + 3]);
      };
      Buffer3.prototype.readBigUInt64LE = defineBigIntMethod(function readBigUInt64LE(offset2) {
        offset2 = offset2 >>> 0;
        validateNumber(offset2, "offset");
        const first = this[offset2];
        const last = this[offset2 + 7];
        if (first === void 0 || last === void 0) {
          boundsError(offset2, this.length - 8);
        }
        const lo = first + this[++offset2] * 2 ** 8 + this[++offset2] * 2 ** 16 + this[++offset2] * 2 ** 24;
        const hi = this[++offset2] + this[++offset2] * 2 ** 8 + this[++offset2] * 2 ** 16 + last * 2 ** 24;
        return BigInt(lo) + (BigInt(hi) << BigInt(32));
      });
      Buffer3.prototype.readBigUInt64BE = defineBigIntMethod(function readBigUInt64BE(offset2) {
        offset2 = offset2 >>> 0;
        validateNumber(offset2, "offset");
        const first = this[offset2];
        const last = this[offset2 + 7];
        if (first === void 0 || last === void 0) {
          boundsError(offset2, this.length - 8);
        }
        const hi = first * 2 ** 24 + this[++offset2] * 2 ** 16 + this[++offset2] * 2 ** 8 + this[++offset2];
        const lo = this[++offset2] * 2 ** 24 + this[++offset2] * 2 ** 16 + this[++offset2] * 2 ** 8 + last;
        return (BigInt(hi) << BigInt(32)) + BigInt(lo);
      });
      Buffer3.prototype.readIntLE = function readIntLE(offset2, byteLength4, noAssert) {
        offset2 = offset2 >>> 0;
        byteLength4 = byteLength4 >>> 0;
        if (!noAssert) checkOffset(offset2, byteLength4, this.length);
        let val = this[offset2];
        let mul = 1;
        let i3 = 0;
        while (++i3 < byteLength4 && (mul *= 256)) {
          val += this[offset2 + i3] * mul;
        }
        mul *= 128;
        if (val >= mul) val -= Math.pow(2, 8 * byteLength4);
        return val;
      };
      Buffer3.prototype.readIntBE = function readIntBE(offset2, byteLength4, noAssert) {
        offset2 = offset2 >>> 0;
        byteLength4 = byteLength4 >>> 0;
        if (!noAssert) checkOffset(offset2, byteLength4, this.length);
        let i3 = byteLength4;
        let mul = 1;
        let val = this[offset2 + --i3];
        while (i3 > 0 && (mul *= 256)) {
          val += this[offset2 + --i3] * mul;
        }
        mul *= 128;
        if (val >= mul) val -= Math.pow(2, 8 * byteLength4);
        return val;
      };
      Buffer3.prototype.readInt8 = function readInt8(offset2, noAssert) {
        offset2 = offset2 >>> 0;
        if (!noAssert) checkOffset(offset2, 1, this.length);
        if (!(this[offset2] & 128)) return this[offset2];
        return (255 - this[offset2] + 1) * -1;
      };
      Buffer3.prototype.readInt16LE = function readInt16LE(offset2, noAssert) {
        offset2 = offset2 >>> 0;
        if (!noAssert) checkOffset(offset2, 2, this.length);
        const val = this[offset2] | this[offset2 + 1] << 8;
        return val & 32768 ? val | 4294901760 : val;
      };
      Buffer3.prototype.readInt16BE = function readInt16BE(offset2, noAssert) {
        offset2 = offset2 >>> 0;
        if (!noAssert) checkOffset(offset2, 2, this.length);
        const val = this[offset2 + 1] | this[offset2] << 8;
        return val & 32768 ? val | 4294901760 : val;
      };
      Buffer3.prototype.readInt32LE = function readInt32LE(offset2, noAssert) {
        offset2 = offset2 >>> 0;
        if (!noAssert) checkOffset(offset2, 4, this.length);
        return this[offset2] | this[offset2 + 1] << 8 | this[offset2 + 2] << 16 | this[offset2 + 3] << 24;
      };
      Buffer3.prototype.readInt32BE = function readInt32BE(offset2, noAssert) {
        offset2 = offset2 >>> 0;
        if (!noAssert) checkOffset(offset2, 4, this.length);
        return this[offset2] << 24 | this[offset2 + 1] << 16 | this[offset2 + 2] << 8 | this[offset2 + 3];
      };
      Buffer3.prototype.readBigInt64LE = defineBigIntMethod(function readBigInt64LE(offset2) {
        offset2 = offset2 >>> 0;
        validateNumber(offset2, "offset");
        const first = this[offset2];
        const last = this[offset2 + 7];
        if (first === void 0 || last === void 0) {
          boundsError(offset2, this.length - 8);
        }
        const val = this[offset2 + 4] + this[offset2 + 5] * 2 ** 8 + this[offset2 + 6] * 2 ** 16 + (last << 24);
        return (BigInt(val) << BigInt(32)) + BigInt(first + this[++offset2] * 2 ** 8 + this[++offset2] * 2 ** 16 + this[++offset2] * 2 ** 24);
      });
      Buffer3.prototype.readBigInt64BE = defineBigIntMethod(function readBigInt64BE(offset2) {
        offset2 = offset2 >>> 0;
        validateNumber(offset2, "offset");
        const first = this[offset2];
        const last = this[offset2 + 7];
        if (first === void 0 || last === void 0) {
          boundsError(offset2, this.length - 8);
        }
        const val = (first << 24) + // Overflow
        this[++offset2] * 2 ** 16 + this[++offset2] * 2 ** 8 + this[++offset2];
        return (BigInt(val) << BigInt(32)) + BigInt(this[++offset2] * 2 ** 24 + this[++offset2] * 2 ** 16 + this[++offset2] * 2 ** 8 + last);
      });
      Buffer3.prototype.readFloatLE = function readFloatLE(offset2, noAssert) {
        offset2 = offset2 >>> 0;
        if (!noAssert) checkOffset(offset2, 4, this.length);
        return ieee754$1.read(this, offset2, true, 23, 4);
      };
      Buffer3.prototype.readFloatBE = function readFloatBE(offset2, noAssert) {
        offset2 = offset2 >>> 0;
        if (!noAssert) checkOffset(offset2, 4, this.length);
        return ieee754$1.read(this, offset2, false, 23, 4);
      };
      Buffer3.prototype.readDoubleLE = function readDoubleLE(offset2, noAssert) {
        offset2 = offset2 >>> 0;
        if (!noAssert) checkOffset(offset2, 8, this.length);
        return ieee754$1.read(this, offset2, true, 52, 8);
      };
      Buffer3.prototype.readDoubleBE = function readDoubleBE(offset2, noAssert) {
        offset2 = offset2 >>> 0;
        if (!noAssert) checkOffset(offset2, 8, this.length);
        return ieee754$1.read(this, offset2, false, 52, 8);
      };
      function checkInt(buf, value, offset2, ext, max2, min2) {
        if (!Buffer3.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
        if (value > max2 || value < min2) throw new RangeError('"value" argument is out of bounds');
        if (offset2 + ext > buf.length) throw new RangeError("Index out of range");
      }
      Buffer3.prototype.writeUintLE = Buffer3.prototype.writeUIntLE = function writeUIntLE(value, offset2, byteLength4, noAssert) {
        value = +value;
        offset2 = offset2 >>> 0;
        byteLength4 = byteLength4 >>> 0;
        if (!noAssert) {
          const maxBytes = Math.pow(2, 8 * byteLength4) - 1;
          checkInt(this, value, offset2, byteLength4, maxBytes, 0);
        }
        let mul = 1;
        let i3 = 0;
        this[offset2] = value & 255;
        while (++i3 < byteLength4 && (mul *= 256)) {
          this[offset2 + i3] = value / mul & 255;
        }
        return offset2 + byteLength4;
      };
      Buffer3.prototype.writeUintBE = Buffer3.prototype.writeUIntBE = function writeUIntBE(value, offset2, byteLength4, noAssert) {
        value = +value;
        offset2 = offset2 >>> 0;
        byteLength4 = byteLength4 >>> 0;
        if (!noAssert) {
          const maxBytes = Math.pow(2, 8 * byteLength4) - 1;
          checkInt(this, value, offset2, byteLength4, maxBytes, 0);
        }
        let i3 = byteLength4 - 1;
        let mul = 1;
        this[offset2 + i3] = value & 255;
        while (--i3 >= 0 && (mul *= 256)) {
          this[offset2 + i3] = value / mul & 255;
        }
        return offset2 + byteLength4;
      };
      Buffer3.prototype.writeUint8 = Buffer3.prototype.writeUInt8 = function writeUInt8(value, offset2, noAssert) {
        value = +value;
        offset2 = offset2 >>> 0;
        if (!noAssert) checkInt(this, value, offset2, 1, 255, 0);
        this[offset2] = value & 255;
        return offset2 + 1;
      };
      Buffer3.prototype.writeUint16LE = Buffer3.prototype.writeUInt16LE = function writeUInt16LE(value, offset2, noAssert) {
        value = +value;
        offset2 = offset2 >>> 0;
        if (!noAssert) checkInt(this, value, offset2, 2, 65535, 0);
        this[offset2] = value & 255;
        this[offset2 + 1] = value >>> 8;
        return offset2 + 2;
      };
      Buffer3.prototype.writeUint16BE = Buffer3.prototype.writeUInt16BE = function writeUInt16BE(value, offset2, noAssert) {
        value = +value;
        offset2 = offset2 >>> 0;
        if (!noAssert) checkInt(this, value, offset2, 2, 65535, 0);
        this[offset2] = value >>> 8;
        this[offset2 + 1] = value & 255;
        return offset2 + 2;
      };
      Buffer3.prototype.writeUint32LE = Buffer3.prototype.writeUInt32LE = function writeUInt32LE(value, offset2, noAssert) {
        value = +value;
        offset2 = offset2 >>> 0;
        if (!noAssert) checkInt(this, value, offset2, 4, 4294967295, 0);
        this[offset2 + 3] = value >>> 24;
        this[offset2 + 2] = value >>> 16;
        this[offset2 + 1] = value >>> 8;
        this[offset2] = value & 255;
        return offset2 + 4;
      };
      Buffer3.prototype.writeUint32BE = Buffer3.prototype.writeUInt32BE = function writeUInt32BE(value, offset2, noAssert) {
        value = +value;
        offset2 = offset2 >>> 0;
        if (!noAssert) checkInt(this, value, offset2, 4, 4294967295, 0);
        this[offset2] = value >>> 24;
        this[offset2 + 1] = value >>> 16;
        this[offset2 + 2] = value >>> 8;
        this[offset2 + 3] = value & 255;
        return offset2 + 4;
      };
      function wrtBigUInt64LE(buf, value, offset2, min2, max2) {
        checkIntBI(value, min2, max2, buf, offset2, 7);
        let lo = Number(value & BigInt(4294967295));
        buf[offset2++] = lo;
        lo = lo >> 8;
        buf[offset2++] = lo;
        lo = lo >> 8;
        buf[offset2++] = lo;
        lo = lo >> 8;
        buf[offset2++] = lo;
        let hi = Number(value >> BigInt(32) & BigInt(4294967295));
        buf[offset2++] = hi;
        hi = hi >> 8;
        buf[offset2++] = hi;
        hi = hi >> 8;
        buf[offset2++] = hi;
        hi = hi >> 8;
        buf[offset2++] = hi;
        return offset2;
      }
      function wrtBigUInt64BE(buf, value, offset2, min2, max2) {
        checkIntBI(value, min2, max2, buf, offset2, 7);
        let lo = Number(value & BigInt(4294967295));
        buf[offset2 + 7] = lo;
        lo = lo >> 8;
        buf[offset2 + 6] = lo;
        lo = lo >> 8;
        buf[offset2 + 5] = lo;
        lo = lo >> 8;
        buf[offset2 + 4] = lo;
        let hi = Number(value >> BigInt(32) & BigInt(4294967295));
        buf[offset2 + 3] = hi;
        hi = hi >> 8;
        buf[offset2 + 2] = hi;
        hi = hi >> 8;
        buf[offset2 + 1] = hi;
        hi = hi >> 8;
        buf[offset2] = hi;
        return offset2 + 8;
      }
      Buffer3.prototype.writeBigUInt64LE = defineBigIntMethod(function writeBigUInt64LE(value, offset2 = 0) {
        return wrtBigUInt64LE(this, value, offset2, BigInt(0), BigInt("0xffffffffffffffff"));
      });
      Buffer3.prototype.writeBigUInt64BE = defineBigIntMethod(function writeBigUInt64BE(value, offset2 = 0) {
        return wrtBigUInt64BE(this, value, offset2, BigInt(0), BigInt("0xffffffffffffffff"));
      });
      Buffer3.prototype.writeIntLE = function writeIntLE(value, offset2, byteLength4, noAssert) {
        value = +value;
        offset2 = offset2 >>> 0;
        if (!noAssert) {
          const limit = Math.pow(2, 8 * byteLength4 - 1);
          checkInt(this, value, offset2, byteLength4, limit - 1, -limit);
        }
        let i3 = 0;
        let mul = 1;
        let sub = 0;
        this[offset2] = value & 255;
        while (++i3 < byteLength4 && (mul *= 256)) {
          if (value < 0 && sub === 0 && this[offset2 + i3 - 1] !== 0) {
            sub = 1;
          }
          this[offset2 + i3] = (value / mul >> 0) - sub & 255;
        }
        return offset2 + byteLength4;
      };
      Buffer3.prototype.writeIntBE = function writeIntBE(value, offset2, byteLength4, noAssert) {
        value = +value;
        offset2 = offset2 >>> 0;
        if (!noAssert) {
          const limit = Math.pow(2, 8 * byteLength4 - 1);
          checkInt(this, value, offset2, byteLength4, limit - 1, -limit);
        }
        let i3 = byteLength4 - 1;
        let mul = 1;
        let sub = 0;
        this[offset2 + i3] = value & 255;
        while (--i3 >= 0 && (mul *= 256)) {
          if (value < 0 && sub === 0 && this[offset2 + i3 + 1] !== 0) {
            sub = 1;
          }
          this[offset2 + i3] = (value / mul >> 0) - sub & 255;
        }
        return offset2 + byteLength4;
      };
      Buffer3.prototype.writeInt8 = function writeInt8(value, offset2, noAssert) {
        value = +value;
        offset2 = offset2 >>> 0;
        if (!noAssert) checkInt(this, value, offset2, 1, 127, -128);
        if (value < 0) value = 255 + value + 1;
        this[offset2] = value & 255;
        return offset2 + 1;
      };
      Buffer3.prototype.writeInt16LE = function writeInt16LE(value, offset2, noAssert) {
        value = +value;
        offset2 = offset2 >>> 0;
        if (!noAssert) checkInt(this, value, offset2, 2, 32767, -32768);
        this[offset2] = value & 255;
        this[offset2 + 1] = value >>> 8;
        return offset2 + 2;
      };
      Buffer3.prototype.writeInt16BE = function writeInt16BE(value, offset2, noAssert) {
        value = +value;
        offset2 = offset2 >>> 0;
        if (!noAssert) checkInt(this, value, offset2, 2, 32767, -32768);
        this[offset2] = value >>> 8;
        this[offset2 + 1] = value & 255;
        return offset2 + 2;
      };
      Buffer3.prototype.writeInt32LE = function writeInt32LE(value, offset2, noAssert) {
        value = +value;
        offset2 = offset2 >>> 0;
        if (!noAssert) checkInt(this, value, offset2, 4, 2147483647, -2147483648);
        this[offset2] = value & 255;
        this[offset2 + 1] = value >>> 8;
        this[offset2 + 2] = value >>> 16;
        this[offset2 + 3] = value >>> 24;
        return offset2 + 4;
      };
      Buffer3.prototype.writeInt32BE = function writeInt32BE(value, offset2, noAssert) {
        value = +value;
        offset2 = offset2 >>> 0;
        if (!noAssert) checkInt(this, value, offset2, 4, 2147483647, -2147483648);
        if (value < 0) value = 4294967295 + value + 1;
        this[offset2] = value >>> 24;
        this[offset2 + 1] = value >>> 16;
        this[offset2 + 2] = value >>> 8;
        this[offset2 + 3] = value & 255;
        return offset2 + 4;
      };
      Buffer3.prototype.writeBigInt64LE = defineBigIntMethod(function writeBigInt64LE(value, offset2 = 0) {
        return wrtBigUInt64LE(this, value, offset2, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
      });
      Buffer3.prototype.writeBigInt64BE = defineBigIntMethod(function writeBigInt64BE(value, offset2 = 0) {
        return wrtBigUInt64BE(this, value, offset2, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
      });
      function checkIEEE754(buf, value, offset2, ext, max2, min2) {
        if (offset2 + ext > buf.length) throw new RangeError("Index out of range");
        if (offset2 < 0) throw new RangeError("Index out of range");
      }
      function writeFloat(buf, value, offset2, littleEndian, noAssert) {
        value = +value;
        offset2 = offset2 >>> 0;
        if (!noAssert) {
          checkIEEE754(buf, value, offset2, 4);
        }
        ieee754$1.write(buf, value, offset2, littleEndian, 23, 4);
        return offset2 + 4;
      }
      Buffer3.prototype.writeFloatLE = function writeFloatLE(value, offset2, noAssert) {
        return writeFloat(this, value, offset2, true, noAssert);
      };
      Buffer3.prototype.writeFloatBE = function writeFloatBE(value, offset2, noAssert) {
        return writeFloat(this, value, offset2, false, noAssert);
      };
      function writeDouble(buf, value, offset2, littleEndian, noAssert) {
        value = +value;
        offset2 = offset2 >>> 0;
        if (!noAssert) {
          checkIEEE754(buf, value, offset2, 8);
        }
        ieee754$1.write(buf, value, offset2, littleEndian, 52, 8);
        return offset2 + 8;
      }
      Buffer3.prototype.writeDoubleLE = function writeDoubleLE(value, offset2, noAssert) {
        return writeDouble(this, value, offset2, true, noAssert);
      };
      Buffer3.prototype.writeDoubleBE = function writeDoubleBE(value, offset2, noAssert) {
        return writeDouble(this, value, offset2, false, noAssert);
      };
      Buffer3.prototype.copy = function copy(target, targetStart, start, end) {
        if (!Buffer3.isBuffer(target)) throw new TypeError("argument should be a Buffer");
        if (!start) start = 0;
        if (!end && end !== 0) end = this.length;
        if (targetStart >= target.length) targetStart = target.length;
        if (!targetStart) targetStart = 0;
        if (end > 0 && end < start) end = start;
        if (end === start) return 0;
        if (target.length === 0 || this.length === 0) return 0;
        if (targetStart < 0) {
          throw new RangeError("targetStart out of bounds");
        }
        if (start < 0 || start >= this.length) throw new RangeError("Index out of range");
        if (end < 0) throw new RangeError("sourceEnd out of bounds");
        if (end > this.length) end = this.length;
        if (target.length - targetStart < end - start) {
          end = target.length - targetStart + start;
        }
        const len3 = end - start;
        if (this === target && typeof GlobalUint8Array.prototype.copyWithin === "function") {
          this.copyWithin(targetStart, start, end);
        } else {
          GlobalUint8Array.prototype.set.call(
            target,
            this.subarray(start, end),
            targetStart
          );
        }
        return len3;
      };
      Buffer3.prototype.fill = function fill(val, start, end, encoding) {
        if (typeof val === "string") {
          if (typeof start === "string") {
            encoding = start;
            start = 0;
            end = this.length;
          } else if (typeof end === "string") {
            encoding = end;
            end = this.length;
          }
          if (encoding !== void 0 && typeof encoding !== "string") {
            throw new TypeError("encoding must be a string");
          }
          if (typeof encoding === "string" && !Buffer3.isEncoding(encoding)) {
            throw new TypeError("Unknown encoding: " + encoding);
          }
          if (val.length === 1) {
            const code3 = val.charCodeAt(0);
            if (encoding === "utf8" && code3 < 128 || encoding === "latin1") {
              val = code3;
            }
          }
        } else if (typeof val === "number") {
          val = val & 255;
        } else if (typeof val === "boolean") {
          val = Number(val);
        }
        if (start < 0 || this.length < start || this.length < end) {
          throw new RangeError("Out of range index");
        }
        if (end <= start) {
          return this;
        }
        start = start >>> 0;
        end = end === void 0 ? this.length : end >>> 0;
        if (!val) val = 0;
        let i3;
        if (typeof val === "number") {
          for (i3 = start; i3 < end; ++i3) {
            this[i3] = val;
          }
        } else {
          const bytes = Buffer3.isBuffer(val) ? val : Buffer3.from(val, encoding);
          const len3 = bytes.length;
          if (len3 === 0) {
            throw new TypeError('The value "' + val + '" is invalid for argument "value"');
          }
          for (i3 = 0; i3 < end - start; ++i3) {
            this[i3 + start] = bytes[i3 % len3];
          }
        }
        return this;
      };
      const errors = {};
      function E2(sym, getMessage, Base) {
        errors[sym] = class NodeError extends Base {
          constructor() {
            super();
            Object.defineProperty(this, "message", {
              value: getMessage.apply(this, arguments),
              writable: true,
              configurable: true
            });
            this.name = `${this.name} [${sym}]`;
            this.stack;
            delete this.name;
          }
          get code() {
            return sym;
          }
          set code(value) {
            Object.defineProperty(this, "code", {
              configurable: true,
              enumerable: true,
              value,
              writable: true
            });
          }
          toString() {
            return `${this.name} [${sym}]: ${this.message}`;
          }
        };
      }
      E2(
        "ERR_BUFFER_OUT_OF_BOUNDS",
        function(name) {
          if (name) {
            return `${name} is outside of buffer bounds`;
          }
          return "Attempt to access memory outside buffer bounds";
        },
        RangeError
      );
      E2(
        "ERR_INVALID_ARG_TYPE",
        function(name, actual) {
          return `The "${name}" argument must be of type number. Received type ${typeof actual}`;
        },
        TypeError
      );
      E2(
        "ERR_OUT_OF_RANGE",
        function(str, range, input) {
          let msg = `The value of "${str}" is out of range.`;
          let received = input;
          if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
            received = addNumericalSeparator(String(input));
          } else if (typeof input === "bigint") {
            received = String(input);
            if (input > BigInt(2) ** BigInt(32) || input < -(BigInt(2) ** BigInt(32))) {
              received = addNumericalSeparator(received);
            }
            received += "n";
          }
          msg += ` It must be ${range}. Received ${received}`;
          return msg;
        },
        RangeError
      );
      function addNumericalSeparator(val) {
        let res = "";
        let i3 = val.length;
        const start = val[0] === "-" ? 1 : 0;
        for (; i3 >= start + 4; i3 -= 3) {
          res = `_${val.slice(i3 - 3, i3)}${res}`;
        }
        return `${val.slice(0, i3)}${res}`;
      }
      function checkBounds(buf, offset2, byteLength4) {
        validateNumber(offset2, "offset");
        if (buf[offset2] === void 0 || buf[offset2 + byteLength4] === void 0) {
          boundsError(offset2, buf.length - (byteLength4 + 1));
        }
      }
      function checkIntBI(value, min2, max2, buf, offset2, byteLength4) {
        if (value > max2 || value < min2) {
          const n2 = typeof min2 === "bigint" ? "n" : "";
          let range;
          {
            if (min2 === 0 || min2 === BigInt(0)) {
              range = `>= 0${n2} and < 2${n2} ** ${(byteLength4 + 1) * 8}${n2}`;
            } else {
              range = `>= -(2${n2} ** ${(byteLength4 + 1) * 8 - 1}${n2}) and < 2 ** ${(byteLength4 + 1) * 8 - 1}${n2}`;
            }
          }
          throw new errors.ERR_OUT_OF_RANGE("value", range, value);
        }
        checkBounds(buf, offset2, byteLength4);
      }
      function validateNumber(value, name) {
        if (typeof value !== "number") {
          throw new errors.ERR_INVALID_ARG_TYPE(name, "number", value);
        }
      }
      function boundsError(value, length, type) {
        if (Math.floor(value) !== value) {
          validateNumber(value, type);
          throw new errors.ERR_OUT_OF_RANGE("offset", "an integer", value);
        }
        if (length < 0) {
          throw new errors.ERR_BUFFER_OUT_OF_BOUNDS();
        }
        throw new errors.ERR_OUT_OF_RANGE(
          "offset",
          `>= ${0} and <= ${length}`,
          value
        );
      }
      const INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
      function base64clean(str) {
        str = str.split("=")[0];
        str = str.trim().replace(INVALID_BASE64_RE, "");
        if (str.length < 2) return "";
        while (str.length % 4 !== 0) {
          str = str + "=";
        }
        return str;
      }
      function utf8ToBytes(string, units) {
        units = units || Infinity;
        let codePoint;
        const length = string.length;
        let leadSurrogate = null;
        const bytes = [];
        for (let i3 = 0; i3 < length; ++i3) {
          codePoint = string.charCodeAt(i3);
          if (codePoint > 55295 && codePoint < 57344) {
            if (!leadSurrogate) {
              if (codePoint > 56319) {
                if ((units -= 3) > -1) bytes.push(239, 191, 189);
                continue;
              } else if (i3 + 1 === length) {
                if ((units -= 3) > -1) bytes.push(239, 191, 189);
                continue;
              }
              leadSurrogate = codePoint;
              continue;
            }
            if (codePoint < 56320) {
              if ((units -= 3) > -1) bytes.push(239, 191, 189);
              leadSurrogate = codePoint;
              continue;
            }
            codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
          } else if (leadSurrogate) {
            if ((units -= 3) > -1) bytes.push(239, 191, 189);
          }
          leadSurrogate = null;
          if (codePoint < 128) {
            if ((units -= 1) < 0) break;
            bytes.push(codePoint);
          } else if (codePoint < 2048) {
            if ((units -= 2) < 0) break;
            bytes.push(
              codePoint >> 6 | 192,
              codePoint & 63 | 128
            );
          } else if (codePoint < 65536) {
            if ((units -= 3) < 0) break;
            bytes.push(
              codePoint >> 12 | 224,
              codePoint >> 6 & 63 | 128,
              codePoint & 63 | 128
            );
          } else if (codePoint < 1114112) {
            if ((units -= 4) < 0) break;
            bytes.push(
              codePoint >> 18 | 240,
              codePoint >> 12 & 63 | 128,
              codePoint >> 6 & 63 | 128,
              codePoint & 63 | 128
            );
          } else {
            throw new Error("Invalid code point");
          }
        }
        return bytes;
      }
      function asciiToBytes(str) {
        const byteArray = [];
        for (let i3 = 0; i3 < str.length; ++i3) {
          byteArray.push(str.charCodeAt(i3) & 255);
        }
        return byteArray;
      }
      function utf16leToBytes(str, units) {
        let c2, hi, lo;
        const byteArray = [];
        for (let i3 = 0; i3 < str.length; ++i3) {
          if ((units -= 2) < 0) break;
          c2 = str.charCodeAt(i3);
          hi = c2 >> 8;
          lo = c2 % 256;
          byteArray.push(lo);
          byteArray.push(hi);
        }
        return byteArray;
      }
      function base64ToBytes(str) {
        return base64.toByteArray(base64clean(str));
      }
      function blitBuffer(src, dst, offset2, length) {
        let i3;
        for (i3 = 0; i3 < length; ++i3) {
          if (i3 + offset2 >= dst.length || i3 >= src.length) break;
          dst[i3 + offset2] = src[i3];
        }
        return i3;
      }
      function isInstance(obj, type) {
        return obj instanceof type || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type.name;
      }
      function numberIsNaN(obj) {
        return obj !== obj;
      }
      const hexSliceLookupTable = (function() {
        const alphabet = "0123456789abcdef";
        const table = new Array(256);
        for (let i3 = 0; i3 < 16; ++i3) {
          const i16 = i3 * 16;
          for (let j = 0; j < 16; ++j) {
            table[i16 + j] = alphabet[i3] + alphabet[j];
          }
        }
        return table;
      })();
      function defineBigIntMethod(fn) {
        return typeof BigInt === "undefined" ? BufferBigIntNotDefined : fn;
      }
      function BufferBigIntNotDefined() {
        throw new Error("BigInt not supported");
      }
    })(buffer2);
    const Buffer2 = buffer2.Buffer;
    exports.Blob = buffer2.Blob;
    exports.BlobOptions = buffer2.BlobOptions;
    exports.Buffer = buffer2.Buffer;
    exports.File = buffer2.File;
    exports.FileOptions = buffer2.FileOptions;
    exports.INSPECT_MAX_BYTES = buffer2.INSPECT_MAX_BYTES;
    exports.SlowBuffer = buffer2.SlowBuffer;
    exports.TranscodeEncoding = buffer2.TranscodeEncoding;
    exports.atob = buffer2.atob;
    exports.btoa = buffer2.btoa;
    exports.constants = buffer2.constants;
    exports.default = Buffer2;
    exports.isAscii = buffer2.isAscii;
    exports.isUtf8 = buffer2.isUtf8;
    exports.kMaxLength = buffer2.kMaxLength;
    exports.kStringMaxLength = buffer2.kStringMaxLength;
    exports.resolveObjectURL = buffer2.resolveObjectURL;
    exports.transcode = buffer2.transcode;
  })(dist);
  return dist;
}
/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
var hasRequiredSafeBuffer;
function requireSafeBuffer() {
  if (hasRequiredSafeBuffer) return safeBuffer.exports;
  hasRequiredSafeBuffer = 1;
  (function(module, exports) {
    var buffer2 = requireDist();
    var Buffer2 = buffer2.Buffer;
    function copyProps(src, dst) {
      for (var key in src) {
        dst[key] = src[key];
      }
    }
    if (Buffer2.from && Buffer2.alloc && Buffer2.allocUnsafe && Buffer2.allocUnsafeSlow) {
      module.exports = buffer2;
    } else {
      copyProps(buffer2, exports);
      exports.Buffer = SafeBuffer;
    }
    function SafeBuffer(arg, encodingOrOffset, length) {
      return Buffer2(arg, encodingOrOffset, length);
    }
    SafeBuffer.prototype = Object.create(Buffer2.prototype);
    copyProps(Buffer2, SafeBuffer);
    SafeBuffer.from = function(arg, encodingOrOffset, length) {
      if (typeof arg === "number") {
        throw new TypeError("Argument must not be a number");
      }
      return Buffer2(arg, encodingOrOffset, length);
    };
    SafeBuffer.alloc = function(size2, fill, encoding) {
      if (typeof size2 !== "number") {
        throw new TypeError("Argument must be a number");
      }
      var buf = Buffer2(size2);
      if (fill !== void 0) {
        if (typeof encoding === "string") {
          buf.fill(fill, encoding);
        } else {
          buf.fill(fill);
        }
      } else {
        buf.fill(0);
      }
      return buf;
    };
    SafeBuffer.allocUnsafe = function(size2) {
      if (typeof size2 !== "number") {
        throw new TypeError("Argument must be a number");
      }
      return Buffer2(size2);
    };
    SafeBuffer.allocUnsafeSlow = function(size2) {
      if (typeof size2 !== "number") {
        throw new TypeError("Argument must be a number");
      }
      return buffer2.SlowBuffer(size2);
    };
  })(safeBuffer, safeBuffer.exports);
  return safeBuffer.exports;
}
var hasRequiredString_decoder;
function requireString_decoder() {
  if (hasRequiredString_decoder) return string_decoder;
  hasRequiredString_decoder = 1;
  var Buffer2 = requireSafeBuffer().Buffer;
  var isEncoding = Buffer2.isEncoding || function(encoding) {
    encoding = "" + encoding;
    switch (encoding && encoding.toLowerCase()) {
      case "hex":
      case "utf8":
      case "utf-8":
      case "ascii":
      case "binary":
      case "base64":
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
      case "raw":
        return true;
      default:
        return false;
    }
  };
  function _normalizeEncoding(enc) {
    if (!enc) return "utf8";
    var retried;
    while (true) {
      switch (enc) {
        case "utf8":
        case "utf-8":
          return "utf8";
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return "utf16le";
        case "latin1":
        case "binary":
          return "latin1";
        case "base64":
        case "ascii":
        case "hex":
          return enc;
        default:
          if (retried) return;
          enc = ("" + enc).toLowerCase();
          retried = true;
      }
    }
  }
  function normalizeEncoding(enc) {
    var nenc = _normalizeEncoding(enc);
    if (typeof nenc !== "string" && (Buffer2.isEncoding === isEncoding || !isEncoding(enc))) throw new Error("Unknown encoding: " + enc);
    return nenc || enc;
  }
  string_decoder.StringDecoder = StringDecoder;
  function StringDecoder(encoding) {
    this.encoding = normalizeEncoding(encoding);
    var nb;
    switch (this.encoding) {
      case "utf16le":
        this.text = utf16Text;
        this.end = utf16End;
        nb = 4;
        break;
      case "utf8":
        this.fillLast = utf8FillLast;
        nb = 4;
        break;
      case "base64":
        this.text = base64Text;
        this.end = base64End;
        nb = 3;
        break;
      default:
        this.write = simpleWrite;
        this.end = simpleEnd;
        return;
    }
    this.lastNeed = 0;
    this.lastTotal = 0;
    this.lastChar = Buffer2.allocUnsafe(nb);
  }
  StringDecoder.prototype.write = function(buf) {
    if (buf.length === 0) return "";
    var r2;
    var i2;
    if (this.lastNeed) {
      r2 = this.fillLast(buf);
      if (r2 === void 0) return "";
      i2 = this.lastNeed;
      this.lastNeed = 0;
    } else {
      i2 = 0;
    }
    if (i2 < buf.length) return r2 ? r2 + this.text(buf, i2) : this.text(buf, i2);
    return r2 || "";
  };
  StringDecoder.prototype.end = utf8End;
  StringDecoder.prototype.text = utf8Text;
  StringDecoder.prototype.fillLast = function(buf) {
    if (this.lastNeed <= buf.length) {
      buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
      return this.lastChar.toString(this.encoding, 0, this.lastTotal);
    }
    buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
    this.lastNeed -= buf.length;
  };
  function utf8CheckByte(byte) {
    if (byte <= 127) return 0;
    else if (byte >> 5 === 6) return 2;
    else if (byte >> 4 === 14) return 3;
    else if (byte >> 3 === 30) return 4;
    return byte >> 6 === 2 ? -1 : -2;
  }
  function utf8CheckIncomplete(self2, buf, i2) {
    var j = buf.length - 1;
    if (j < i2) return 0;
    var nb = utf8CheckByte(buf[j]);
    if (nb >= 0) {
      if (nb > 0) self2.lastNeed = nb - 1;
      return nb;
    }
    if (--j < i2 || nb === -2) return 0;
    nb = utf8CheckByte(buf[j]);
    if (nb >= 0) {
      if (nb > 0) self2.lastNeed = nb - 2;
      return nb;
    }
    if (--j < i2 || nb === -2) return 0;
    nb = utf8CheckByte(buf[j]);
    if (nb >= 0) {
      if (nb > 0) {
        if (nb === 2) nb = 0;
        else self2.lastNeed = nb - 3;
      }
      return nb;
    }
    return 0;
  }
  function utf8CheckExtraBytes(self2, buf, p2) {
    if ((buf[0] & 192) !== 128) {
      self2.lastNeed = 0;
      return "�";
    }
    if (self2.lastNeed > 1 && buf.length > 1) {
      if ((buf[1] & 192) !== 128) {
        self2.lastNeed = 1;
        return "�";
      }
      if (self2.lastNeed > 2 && buf.length > 2) {
        if ((buf[2] & 192) !== 128) {
          self2.lastNeed = 2;
          return "�";
        }
      }
    }
  }
  function utf8FillLast(buf) {
    var p2 = this.lastTotal - this.lastNeed;
    var r2 = utf8CheckExtraBytes(this, buf);
    if (r2 !== void 0) return r2;
    if (this.lastNeed <= buf.length) {
      buf.copy(this.lastChar, p2, 0, this.lastNeed);
      return this.lastChar.toString(this.encoding, 0, this.lastTotal);
    }
    buf.copy(this.lastChar, p2, 0, buf.length);
    this.lastNeed -= buf.length;
  }
  function utf8Text(buf, i2) {
    var total = utf8CheckIncomplete(this, buf, i2);
    if (!this.lastNeed) return buf.toString("utf8", i2);
    this.lastTotal = total;
    var end = buf.length - (total - this.lastNeed);
    buf.copy(this.lastChar, 0, end);
    return buf.toString("utf8", i2, end);
  }
  function utf8End(buf) {
    var r2 = buf && buf.length ? this.write(buf) : "";
    if (this.lastNeed) return r2 + "�";
    return r2;
  }
  function utf16Text(buf, i2) {
    if ((buf.length - i2) % 2 === 0) {
      var r2 = buf.toString("utf16le", i2);
      if (r2) {
        var c2 = r2.charCodeAt(r2.length - 1);
        if (c2 >= 55296 && c2 <= 56319) {
          this.lastNeed = 2;
          this.lastTotal = 4;
          this.lastChar[0] = buf[buf.length - 2];
          this.lastChar[1] = buf[buf.length - 1];
          return r2.slice(0, -1);
        }
      }
      return r2;
    }
    this.lastNeed = 1;
    this.lastTotal = 2;
    this.lastChar[0] = buf[buf.length - 1];
    return buf.toString("utf16le", i2, buf.length - 1);
  }
  function utf16End(buf) {
    var r2 = buf && buf.length ? this.write(buf) : "";
    if (this.lastNeed) {
      var end = this.lastTotal - this.lastNeed;
      return r2 + this.lastChar.toString("utf16le", 0, end);
    }
    return r2;
  }
  function base64Text(buf, i2) {
    var n2 = (buf.length - i2) % 3;
    if (n2 === 0) return buf.toString("base64", i2);
    this.lastNeed = 3 - n2;
    this.lastTotal = 3;
    if (n2 === 1) {
      this.lastChar[0] = buf[buf.length - 1];
    } else {
      this.lastChar[0] = buf[buf.length - 2];
      this.lastChar[1] = buf[buf.length - 1];
    }
    return buf.toString("base64", i2, buf.length - n2);
  }
  function base64End(buf) {
    var r2 = buf && buf.length ? this.write(buf) : "";
    if (this.lastNeed) return r2 + this.lastChar.toString("base64", 0, 3 - this.lastNeed);
    return r2;
  }
  function simpleWrite(buf) {
    return buf.toString(this.encoding);
  }
  function simpleEnd(buf) {
    return buf && buf.length ? this.write(buf) : "";
  }
  return string_decoder;
}
var string_decoderExports = requireString_decoder();
const require$$1 = /* @__PURE__ */ getDefaultExportFromCjs(string_decoderExports);
/*! @license DOMPurify 3.4.11 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.4.11/LICENSE */
function _arrayLikeToArray(r2, a2) {
  (null == a2 || a2 > r2.length) && (a2 = r2.length);
  for (var e2 = 0, n2 = Array(a2); e2 < a2; e2++) n2[e2] = r2[e2];
  return n2;
}
function _arrayWithHoles(r2) {
  if (Array.isArray(r2)) return r2;
}
function _iterableToArrayLimit(r2, l2) {
  var t3 = null == r2 ? null : "undefined" != typeof Symbol && r2[Symbol.iterator] || r2["@@iterator"];
  if (null != t3) {
    var e2, n2, i2, u2, a2 = [], f2 = true, o2 = false;
    try {
      if (i2 = (t3 = t3.call(r2)).next, 0 === l2) ;
      else for (; !(f2 = (e2 = i2.call(t3)).done) && (a2.push(e2.value), a2.length !== l2); f2 = true) ;
    } catch (r3) {
      o2 = true, n2 = r3;
    } finally {
      try {
        if (!f2 && null != t3.return && (u2 = t3.return(), Object(u2) !== u2)) return;
      } finally {
        if (o2) throw n2;
      }
    }
    return a2;
  }
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _slicedToArray(r2, e2) {
  return _arrayWithHoles(r2) || _iterableToArrayLimit(r2, e2) || _unsupportedIterableToArray(r2, e2) || _nonIterableRest();
}
function _unsupportedIterableToArray(r2, a2) {
  if (r2) {
    if ("string" == typeof r2) return _arrayLikeToArray(r2, a2);
    var t3 = {}.toString.call(r2).slice(8, -1);
    return "Object" === t3 && r2.constructor && (t3 = r2.constructor.name), "Map" === t3 || "Set" === t3 ? Array.from(r2) : "Arguments" === t3 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t3) ? _arrayLikeToArray(r2, a2) : void 0;
  }
}
const entries = Object.entries, setPrototypeOf = Object.setPrototypeOf, isFrozen = Object.isFrozen, getPrototypeOf$1 = Object.getPrototypeOf, getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
let freeze = Object.freeze, seal = Object.seal, create$1 = Object.create;
let _ref = typeof Reflect !== "undefined" && Reflect, apply$1 = _ref.apply, construct = _ref.construct;
if (!freeze) {
  freeze = function freeze2(x2) {
    return x2;
  };
}
if (!seal) {
  seal = function seal2(x2) {
    return x2;
  };
}
if (!apply$1) {
  apply$1 = function apply2(func, thisArg) {
    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }
    return func.apply(thisArg, args);
  };
}
if (!construct) {
  construct = function construct2(Func) {
    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }
    return new Func(...args);
  };
}
const arrayForEach = unapply(Array.prototype.forEach);
const arrayLastIndexOf = unapply(Array.prototype.lastIndexOf);
const arrayPop = unapply(Array.prototype.pop);
const arrayPush = unapply(Array.prototype.push);
const arraySplice = unapply(Array.prototype.splice);
const arrayIsArray = Array.isArray;
const stringToLowerCase = unapply(String.prototype.toLowerCase);
const stringToString = unapply(String.prototype.toString);
const stringMatch = unapply(String.prototype.match);
const stringReplace = unapply(String.prototype.replace);
const stringIndexOf = unapply(String.prototype.indexOf);
const stringTrim = unapply(String.prototype.trim);
const numberToString = unapply(Number.prototype.toString);
const booleanToString = unapply(Boolean.prototype.toString);
const bigintToString = typeof BigInt === "undefined" ? null : unapply(BigInt.prototype.toString);
const symbolToString = typeof Symbol === "undefined" ? null : unapply(Symbol.prototype.toString);
const objectHasOwnProperty = unapply(Object.prototype.hasOwnProperty);
const objectToString$1 = unapply(Object.prototype.toString);
const regExpTest = unapply(RegExp.prototype.test);
const typeErrorCreate = unconstruct(TypeError);
function unapply(func) {
  return function(thisArg) {
    if (thisArg instanceof RegExp) {
      thisArg.lastIndex = 0;
    }
    for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      args[_key3 - 1] = arguments[_key3];
    }
    return apply$1(func, thisArg, args);
  };
}
function unconstruct(Func) {
  return function() {
    for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }
    return construct(Func, args);
  };
}
function addToSet(set, array) {
  let transformCaseFunc = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : stringToLowerCase;
  if (setPrototypeOf) {
    setPrototypeOf(set, null);
  }
  if (!arrayIsArray(array)) {
    return set;
  }
  let l2 = array.length;
  while (l2--) {
    let element = array[l2];
    if (typeof element === "string") {
      const lcElement = transformCaseFunc(element);
      if (lcElement !== element) {
        if (!isFrozen(array)) {
          array[l2] = lcElement;
        }
        element = lcElement;
      }
    }
    set[element] = true;
  }
  return set;
}
function cleanArray(array) {
  for (let index = 0; index < array.length; index++) {
    const isPropertyExist = objectHasOwnProperty(array, index);
    if (!isPropertyExist) {
      array[index] = null;
    }
  }
  return array;
}
function clone(object) {
  const newObject = create$1(null);
  for (const _ref2 of entries(object)) {
    var _ref3 = _slicedToArray(_ref2, 2);
    const property = _ref3[0];
    const value = _ref3[1];
    const isPropertyExist = objectHasOwnProperty(object, property);
    if (isPropertyExist) {
      if (arrayIsArray(value)) {
        newObject[property] = cleanArray(value);
      } else if (value && typeof value === "object" && value.constructor === Object) {
        newObject[property] = clone(value);
      } else {
        newObject[property] = value;
      }
    }
  }
  return newObject;
}
function stringifyValue(value) {
  switch (typeof value) {
    case "string": {
      return value;
    }
    case "number": {
      return numberToString(value);
    }
    case "boolean": {
      return booleanToString(value);
    }
    case "bigint": {
      return bigintToString ? bigintToString(value) : "0";
    }
    case "symbol": {
      return symbolToString ? symbolToString(value) : "Symbol()";
    }
    case "undefined": {
      return objectToString$1(value);
    }
    case "function":
    case "object": {
      if (value === null) {
        return objectToString$1(value);
      }
      const valueAsRecord = value;
      const valueToString = lookupGetter(valueAsRecord, "toString");
      if (typeof valueToString === "function") {
        const stringified = valueToString(valueAsRecord);
        return typeof stringified === "string" ? stringified : objectToString$1(stringified);
      }
      return objectToString$1(value);
    }
    default: {
      return objectToString$1(value);
    }
  }
}
function lookupGetter(object, prop) {
  while (object !== null) {
    const desc = getOwnPropertyDescriptor(object, prop);
    if (desc) {
      if (desc.get) {
        return unapply(desc.get);
      }
      if (typeof desc.value === "function") {
        return unapply(desc.value);
      }
    }
    object = getPrototypeOf$1(object);
  }
  function fallbackValue() {
    return null;
  }
  return fallbackValue;
}
function isRegex(value) {
  try {
    regExpTest(value, "");
    return true;
  } catch (_unused) {
    return false;
  }
}
const html$1 = freeze(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "search", "section", "select", "shadow", "slot", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]);
const svg$1 = freeze(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "enterkeyhint", "exportparts", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "inputmode", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "part", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]);
const svgFilters = freeze(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]);
const svgDisallowed = freeze(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]);
const mathMl$1 = freeze(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]);
const mathMlDisallowed = freeze(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]);
const text = freeze(["#text"]);
const html = freeze(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "command", "commandfor", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "exportparts", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inert", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "part", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "slot", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns"]);
const svg = freeze(["accent-height", "accumulate", "additive", "alignment-baseline", "amplitude", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "exponent", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "intercept", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "mask-type", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "slope", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "tablevalues", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]);
const mathMl = freeze(["accent", "accentunder", "align", "bevelled", "close", "columnalign", "columnlines", "columnspacing", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lquote", "lspace", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]);
const xml = freeze(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]);
const MUSTACHE_EXPR = seal(/{{[\w\W]*|^[\w\W]*}}/g);
const ERB_EXPR = seal(/<%[\w\W]*|^[\w\W]*%>/g);
const TMPLIT_EXPR = seal(/\${[\w\W]*/g);
const DATA_ATTR = seal(/^data-[\-\w.\u00B7-\uFFFF]+$/);
const ARIA_ATTR = seal(/^aria-[\-\w]+$/);
const IS_ALLOWED_URI = seal(
  /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  // eslint-disable-line no-useless-escape
);
const IS_SCRIPT_OR_DATA = seal(/^(?:\w+script|data):/i);
const ATTR_WHITESPACE = seal(
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
  // eslint-disable-line no-control-regex
);
const DOCTYPE_NAME = seal(/^html$/i);
const CUSTOM_ELEMENT = seal(/^[a-z][.\w]*(-[.\w]+)+$/i);
const ELEMENT_MARKUP_PROBE = seal(/<[/\w!]/g);
const COMMENT_MARKUP_PROBE = seal(/<[/\w]/g);
const FALLBACK_TAG_CLOSE = seal(/<\/no(script|embed|frames)/i);
const SELF_CLOSING_TAG = seal(/\/>/i);
const NODE_TYPE = {
  element: 1,
  attribute: 2,
  text: 3,
  cdataSection: 4,
  entityReference: 5,
  // Deprecated
  entityNode: 6,
  // Deprecated
  processingInstruction: 7,
  comment: 8,
  document: 9,
  documentType: 10,
  documentFragment: 11,
  notation: 12
  // Deprecated
};
const getGlobal$1 = function getGlobal() {
  return typeof window === "undefined" ? null : window;
};
const _createTrustedTypesPolicy = function _createTrustedTypesPolicy2(trustedTypes, purifyHostElement) {
  if (typeof trustedTypes !== "object" || typeof trustedTypes.createPolicy !== "function") {
    return null;
  }
  let suffix = null;
  const ATTR_NAME = "data-tt-policy-suffix";
  if (purifyHostElement && purifyHostElement.hasAttribute(ATTR_NAME)) {
    suffix = purifyHostElement.getAttribute(ATTR_NAME);
  }
  const policyName = "dompurify" + (suffix ? "#" + suffix : "");
  try {
    return trustedTypes.createPolicy(policyName, {
      createHTML(html2) {
        return html2;
      },
      createScriptURL(scriptUrl) {
        return scriptUrl;
      }
    });
  } catch (_2) {
    console.warn("TrustedTypes policy " + policyName + " could not be created.");
    return null;
  }
};
const _createHooksMap = function _createHooksMap2() {
  return {
    afterSanitizeAttributes: [],
    afterSanitizeElements: [],
    afterSanitizeShadowDOM: [],
    beforeSanitizeAttributes: [],
    beforeSanitizeElements: [],
    beforeSanitizeShadowDOM: [],
    uponSanitizeAttribute: [],
    uponSanitizeElement: [],
    uponSanitizeShadowNode: []
  };
};
const _resolveSetOption = function _resolveSetOption2(cfg, key, fallback, options) {
  return objectHasOwnProperty(cfg, key) && arrayIsArray(cfg[key]) ? addToSet(options.base ? clone(options.base) : {}, cfg[key], options.transform) : fallback;
};
function createDOMPurify() {
  let window2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : getGlobal$1();
  const DOMPurify = (root) => createDOMPurify(root);
  DOMPurify.version = "3.4.11";
  DOMPurify.removed = [];
  if (!window2 || !window2.document || window2.document.nodeType !== NODE_TYPE.document || !window2.Element) {
    DOMPurify.isSupported = false;
    return DOMPurify;
  }
  let document2 = window2.document;
  const originalDocument = document2;
  const currentScript = originalDocument.currentScript;
  window2.DocumentFragment;
  const HTMLTemplateElement = window2.HTMLTemplateElement, Node2 = window2.Node, Element = window2.Element, NodeFilter = window2.NodeFilter, _window$NamedNodeMap = window2.NamedNodeMap;
  _window$NamedNodeMap === void 0 ? window2.NamedNodeMap || window2.MozNamedAttrMap : _window$NamedNodeMap;
  window2.HTMLFormElement;
  const DOMParser = window2.DOMParser, trustedTypes = window2.trustedTypes;
  const ElementPrototype = Element.prototype;
  const cloneNode = lookupGetter(ElementPrototype, "cloneNode");
  const remove = lookupGetter(ElementPrototype, "remove");
  const getNextSibling = lookupGetter(ElementPrototype, "nextSibling");
  const getChildNodes = lookupGetter(ElementPrototype, "childNodes");
  const getParentNode = lookupGetter(ElementPrototype, "parentNode");
  const getShadowRoot = lookupGetter(ElementPrototype, "shadowRoot");
  const getAttributes = lookupGetter(ElementPrototype, "attributes");
  const getNodeType = Node2 && Node2.prototype ? lookupGetter(Node2.prototype, "nodeType") : null;
  const getNodeName = Node2 && Node2.prototype ? lookupGetter(Node2.prototype, "nodeName") : null;
  if (typeof HTMLTemplateElement === "function") {
    const template = document2.createElement("template");
    if (template.content && template.content.ownerDocument) {
      document2 = template.content.ownerDocument;
    }
  }
  let trustedTypesPolicy;
  let emptyHTML = "";
  let defaultTrustedTypesPolicy;
  let defaultTrustedTypesPolicyResolved = false;
  let IN_TRUSTED_TYPES_POLICY = 0;
  const _assertNotInTrustedTypesPolicy = function _assertNotInTrustedTypesPolicy2() {
    if (IN_TRUSTED_TYPES_POLICY > 0) {
      throw typeErrorCreate('A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the "DOMPurify and Trusted Types" section of the README.');
    }
  };
  const _createTrustedHTML = function _createTrustedHTML2(html2) {
    _assertNotInTrustedTypesPolicy();
    IN_TRUSTED_TYPES_POLICY++;
    try {
      return trustedTypesPolicy.createHTML(html2);
    } finally {
      IN_TRUSTED_TYPES_POLICY--;
    }
  };
  const _createTrustedScriptURL = function _createTrustedScriptURL2(scriptUrl) {
    _assertNotInTrustedTypesPolicy();
    IN_TRUSTED_TYPES_POLICY++;
    try {
      return trustedTypesPolicy.createScriptURL(scriptUrl);
    } finally {
      IN_TRUSTED_TYPES_POLICY--;
    }
  };
  const _getDefaultTrustedTypesPolicy = function _getDefaultTrustedTypesPolicy2() {
    if (!defaultTrustedTypesPolicyResolved) {
      defaultTrustedTypesPolicy = _createTrustedTypesPolicy(trustedTypes, currentScript);
      defaultTrustedTypesPolicyResolved = true;
    }
    return defaultTrustedTypesPolicy;
  };
  const _document = document2, implementation = _document.implementation, createNodeIterator = _document.createNodeIterator, createDocumentFragment = _document.createDocumentFragment, getElementsByTagName = _document.getElementsByTagName;
  const importNode = originalDocument.importNode;
  let hooks = _createHooksMap();
  DOMPurify.isSupported = typeof entries === "function" && typeof getParentNode === "function" && implementation && implementation.createHTMLDocument !== void 0;
  const MUSTACHE_EXPR$1 = MUSTACHE_EXPR, ERB_EXPR$1 = ERB_EXPR, TMPLIT_EXPR$1 = TMPLIT_EXPR, DATA_ATTR$1 = DATA_ATTR, ARIA_ATTR$1 = ARIA_ATTR, IS_SCRIPT_OR_DATA$1 = IS_SCRIPT_OR_DATA, ATTR_WHITESPACE$1 = ATTR_WHITESPACE, CUSTOM_ELEMENT$1 = CUSTOM_ELEMENT;
  let IS_ALLOWED_URI$1 = IS_ALLOWED_URI;
  let ALLOWED_TAGS = null;
  const DEFAULT_ALLOWED_TAGS = addToSet({}, [...html$1, ...svg$1, ...svgFilters, ...mathMl$1, ...text]);
  let ALLOWED_ATTR = null;
  const DEFAULT_ALLOWED_ATTR = addToSet({}, [...html, ...svg, ...mathMl, ...xml]);
  let CUSTOM_ELEMENT_HANDLING = Object.seal(create$1(null, {
    tagNameCheck: {
      writable: true,
      configurable: false,
      enumerable: true,
      value: null
    },
    attributeNameCheck: {
      writable: true,
      configurable: false,
      enumerable: true,
      value: null
    },
    allowCustomizedBuiltInElements: {
      writable: true,
      configurable: false,
      enumerable: true,
      value: false
    }
  }));
  let FORBID_TAGS = null;
  let FORBID_ATTR = null;
  const EXTRA_ELEMENT_HANDLING = Object.seal(create$1(null, {
    tagCheck: {
      writable: true,
      configurable: false,
      enumerable: true,
      value: null
    },
    attributeCheck: {
      writable: true,
      configurable: false,
      enumerable: true,
      value: null
    }
  }));
  let ALLOW_ARIA_ATTR = true;
  let ALLOW_DATA_ATTR = true;
  let ALLOW_UNKNOWN_PROTOCOLS = false;
  let ALLOW_SELF_CLOSE_IN_ATTR = true;
  let SAFE_FOR_TEMPLATES = false;
  let SAFE_FOR_XML = true;
  let WHOLE_DOCUMENT = false;
  let SET_CONFIG = false;
  let SET_CONFIG_ALLOWED_TAGS = null;
  let SET_CONFIG_ALLOWED_ATTR = null;
  let FORCE_BODY = false;
  let RETURN_DOM = false;
  let RETURN_DOM_FRAGMENT = false;
  let RETURN_TRUSTED_TYPE = false;
  let SANITIZE_DOM = true;
  let SANITIZE_NAMED_PROPS = false;
  const SANITIZE_NAMED_PROPS_PREFIX = "user-content-";
  let KEEP_CONTENT = true;
  let IN_PLACE = false;
  let USE_PROFILES = {};
  let FORBID_CONTENTS = null;
  const DEFAULT_FORBID_CONTENTS = addToSet({}, [
    "annotation-xml",
    "audio",
    "colgroup",
    "desc",
    "foreignobject",
    "head",
    "iframe",
    "math",
    "mi",
    "mn",
    "mo",
    "ms",
    "mtext",
    "noembed",
    "noframes",
    "noscript",
    "plaintext",
    "script",
    // <selectedcontent> mirrors the selected <option>'s subtree, cloned by
    // the UA (customizable <select>) — including any on* handlers — and the
    // engine re-mirrors synchronously whenever a removal changes which
    // option/selectedcontent is current, even inside DOMPurify's inert
    // DOMParser document. Hoisting its children on removal re-inserts a fresh
    // mirror target ahead of the walk, which the engine refills, looping
    // forever (DoS) and amplifying output. Dropping its content on removal
    // (rather than hoisting) breaks that cascade; the content is a duplicate
    // of the option, which is sanitized on its own. See campaign-3 F1/F6.
    "selectedcontent",
    "style",
    "svg",
    "template",
    "thead",
    "title",
    "video",
    "xmp"
  ]);
  let DATA_URI_TAGS = null;
  const DEFAULT_DATA_URI_TAGS = addToSet({}, ["audio", "video", "img", "source", "image", "track"]);
  let URI_SAFE_ATTRIBUTES = null;
  const DEFAULT_URI_SAFE_ATTRIBUTES = addToSet({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]);
  const MATHML_NAMESPACE = "http://www.w3.org/1998/Math/MathML";
  const SVG_NAMESPACE = "http://www.w3.org/2000/svg";
  const HTML_NAMESPACE = "http://www.w3.org/1999/xhtml";
  let NAMESPACE = HTML_NAMESPACE;
  let IS_EMPTY_INPUT = false;
  let ALLOWED_NAMESPACES = null;
  const DEFAULT_ALLOWED_NAMESPACES = addToSet({}, [MATHML_NAMESPACE, SVG_NAMESPACE, HTML_NAMESPACE], stringToString);
  const DEFAULT_MATHML_TEXT_INTEGRATION_POINTS = freeze(["mi", "mo", "mn", "ms", "mtext"]);
  let MATHML_TEXT_INTEGRATION_POINTS = addToSet({}, DEFAULT_MATHML_TEXT_INTEGRATION_POINTS);
  const DEFAULT_HTML_INTEGRATION_POINTS = freeze(["annotation-xml"]);
  let HTML_INTEGRATION_POINTS = addToSet({}, DEFAULT_HTML_INTEGRATION_POINTS);
  const COMMON_SVG_AND_HTML_ELEMENTS = addToSet({}, ["title", "style", "font", "a", "script"]);
  let PARSER_MEDIA_TYPE = null;
  const SUPPORTED_PARSER_MEDIA_TYPES = ["application/xhtml+xml", "text/html"];
  const DEFAULT_PARSER_MEDIA_TYPE = "text/html";
  let transformCaseFunc = null;
  let CONFIG = null;
  const formElement = document2.createElement("form");
  const isRegexOrFunction = function isRegexOrFunction2(testValue) {
    return testValue instanceof RegExp || testValue instanceof Function;
  };
  const _parseConfig = function _parseConfig2() {
    let cfg = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (CONFIG && CONFIG === cfg) {
      return;
    }
    if (!cfg || typeof cfg !== "object") {
      cfg = {};
    }
    cfg = clone(cfg);
    PARSER_MEDIA_TYPE = // eslint-disable-next-line unicorn/prefer-includes
    SUPPORTED_PARSER_MEDIA_TYPES.indexOf(cfg.PARSER_MEDIA_TYPE) === -1 ? DEFAULT_PARSER_MEDIA_TYPE : cfg.PARSER_MEDIA_TYPE;
    transformCaseFunc = PARSER_MEDIA_TYPE === "application/xhtml+xml" ? stringToString : stringToLowerCase;
    ALLOWED_TAGS = _resolveSetOption(cfg, "ALLOWED_TAGS", DEFAULT_ALLOWED_TAGS, {
      transform: transformCaseFunc
    });
    ALLOWED_ATTR = _resolveSetOption(cfg, "ALLOWED_ATTR", DEFAULT_ALLOWED_ATTR, {
      transform: transformCaseFunc
    });
    ALLOWED_NAMESPACES = _resolveSetOption(cfg, "ALLOWED_NAMESPACES", DEFAULT_ALLOWED_NAMESPACES, {
      transform: stringToString
    });
    URI_SAFE_ATTRIBUTES = _resolveSetOption(cfg, "ADD_URI_SAFE_ATTR", DEFAULT_URI_SAFE_ATTRIBUTES, {
      transform: transformCaseFunc,
      base: DEFAULT_URI_SAFE_ATTRIBUTES
    });
    DATA_URI_TAGS = _resolveSetOption(cfg, "ADD_DATA_URI_TAGS", DEFAULT_DATA_URI_TAGS, {
      transform: transformCaseFunc,
      base: DEFAULT_DATA_URI_TAGS
    });
    FORBID_CONTENTS = _resolveSetOption(cfg, "FORBID_CONTENTS", DEFAULT_FORBID_CONTENTS, {
      transform: transformCaseFunc
    });
    FORBID_TAGS = _resolveSetOption(cfg, "FORBID_TAGS", clone({}), {
      transform: transformCaseFunc
    });
    FORBID_ATTR = _resolveSetOption(cfg, "FORBID_ATTR", clone({}), {
      transform: transformCaseFunc
    });
    USE_PROFILES = objectHasOwnProperty(cfg, "USE_PROFILES") ? cfg.USE_PROFILES && typeof cfg.USE_PROFILES === "object" ? clone(cfg.USE_PROFILES) : cfg.USE_PROFILES : false;
    ALLOW_ARIA_ATTR = cfg.ALLOW_ARIA_ATTR !== false;
    ALLOW_DATA_ATTR = cfg.ALLOW_DATA_ATTR !== false;
    ALLOW_UNKNOWN_PROTOCOLS = cfg.ALLOW_UNKNOWN_PROTOCOLS || false;
    ALLOW_SELF_CLOSE_IN_ATTR = cfg.ALLOW_SELF_CLOSE_IN_ATTR !== false;
    SAFE_FOR_TEMPLATES = cfg.SAFE_FOR_TEMPLATES || false;
    SAFE_FOR_XML = cfg.SAFE_FOR_XML !== false;
    WHOLE_DOCUMENT = cfg.WHOLE_DOCUMENT || false;
    RETURN_DOM = cfg.RETURN_DOM || false;
    RETURN_DOM_FRAGMENT = cfg.RETURN_DOM_FRAGMENT || false;
    RETURN_TRUSTED_TYPE = cfg.RETURN_TRUSTED_TYPE || false;
    FORCE_BODY = cfg.FORCE_BODY || false;
    SANITIZE_DOM = cfg.SANITIZE_DOM !== false;
    SANITIZE_NAMED_PROPS = cfg.SANITIZE_NAMED_PROPS || false;
    KEEP_CONTENT = cfg.KEEP_CONTENT !== false;
    IN_PLACE = cfg.IN_PLACE || false;
    IS_ALLOWED_URI$1 = isRegex(cfg.ALLOWED_URI_REGEXP) ? cfg.ALLOWED_URI_REGEXP : IS_ALLOWED_URI;
    NAMESPACE = typeof cfg.NAMESPACE === "string" ? cfg.NAMESPACE : HTML_NAMESPACE;
    MATHML_TEXT_INTEGRATION_POINTS = objectHasOwnProperty(cfg, "MATHML_TEXT_INTEGRATION_POINTS") && cfg.MATHML_TEXT_INTEGRATION_POINTS && typeof cfg.MATHML_TEXT_INTEGRATION_POINTS === "object" ? clone(cfg.MATHML_TEXT_INTEGRATION_POINTS) : addToSet({}, DEFAULT_MATHML_TEXT_INTEGRATION_POINTS);
    HTML_INTEGRATION_POINTS = objectHasOwnProperty(cfg, "HTML_INTEGRATION_POINTS") && cfg.HTML_INTEGRATION_POINTS && typeof cfg.HTML_INTEGRATION_POINTS === "object" ? clone(cfg.HTML_INTEGRATION_POINTS) : addToSet({}, DEFAULT_HTML_INTEGRATION_POINTS);
    const customElementHandling = objectHasOwnProperty(cfg, "CUSTOM_ELEMENT_HANDLING") && cfg.CUSTOM_ELEMENT_HANDLING && typeof cfg.CUSTOM_ELEMENT_HANDLING === "object" ? clone(cfg.CUSTOM_ELEMENT_HANDLING) : create$1(null);
    CUSTOM_ELEMENT_HANDLING = create$1(null);
    if (objectHasOwnProperty(customElementHandling, "tagNameCheck") && isRegexOrFunction(customElementHandling.tagNameCheck)) {
      CUSTOM_ELEMENT_HANDLING.tagNameCheck = customElementHandling.tagNameCheck;
    }
    if (objectHasOwnProperty(customElementHandling, "attributeNameCheck") && isRegexOrFunction(customElementHandling.attributeNameCheck)) {
      CUSTOM_ELEMENT_HANDLING.attributeNameCheck = customElementHandling.attributeNameCheck;
    }
    if (objectHasOwnProperty(customElementHandling, "allowCustomizedBuiltInElements") && typeof customElementHandling.allowCustomizedBuiltInElements === "boolean") {
      CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements = customElementHandling.allowCustomizedBuiltInElements;
    }
    seal(CUSTOM_ELEMENT_HANDLING);
    if (SAFE_FOR_TEMPLATES) {
      ALLOW_DATA_ATTR = false;
    }
    if (RETURN_DOM_FRAGMENT) {
      RETURN_DOM = true;
    }
    if (USE_PROFILES) {
      ALLOWED_TAGS = addToSet({}, text);
      ALLOWED_ATTR = create$1(null);
      if (USE_PROFILES.html === true) {
        addToSet(ALLOWED_TAGS, html$1);
        addToSet(ALLOWED_ATTR, html);
      }
      if (USE_PROFILES.svg === true) {
        addToSet(ALLOWED_TAGS, svg$1);
        addToSet(ALLOWED_ATTR, svg);
        addToSet(ALLOWED_ATTR, xml);
      }
      if (USE_PROFILES.svgFilters === true) {
        addToSet(ALLOWED_TAGS, svgFilters);
        addToSet(ALLOWED_ATTR, svg);
        addToSet(ALLOWED_ATTR, xml);
      }
      if (USE_PROFILES.mathMl === true) {
        addToSet(ALLOWED_TAGS, mathMl$1);
        addToSet(ALLOWED_ATTR, mathMl);
        addToSet(ALLOWED_ATTR, xml);
      }
    }
    EXTRA_ELEMENT_HANDLING.tagCheck = null;
    EXTRA_ELEMENT_HANDLING.attributeCheck = null;
    if (objectHasOwnProperty(cfg, "ADD_TAGS")) {
      if (typeof cfg.ADD_TAGS === "function") {
        EXTRA_ELEMENT_HANDLING.tagCheck = cfg.ADD_TAGS;
      } else if (arrayIsArray(cfg.ADD_TAGS)) {
        if (ALLOWED_TAGS === DEFAULT_ALLOWED_TAGS) {
          ALLOWED_TAGS = clone(ALLOWED_TAGS);
        }
        addToSet(ALLOWED_TAGS, cfg.ADD_TAGS, transformCaseFunc);
      }
    }
    if (objectHasOwnProperty(cfg, "ADD_ATTR")) {
      if (typeof cfg.ADD_ATTR === "function") {
        EXTRA_ELEMENT_HANDLING.attributeCheck = cfg.ADD_ATTR;
      } else if (arrayIsArray(cfg.ADD_ATTR)) {
        if (ALLOWED_ATTR === DEFAULT_ALLOWED_ATTR) {
          ALLOWED_ATTR = clone(ALLOWED_ATTR);
        }
        addToSet(ALLOWED_ATTR, cfg.ADD_ATTR, transformCaseFunc);
      }
    }
    if (objectHasOwnProperty(cfg, "ADD_URI_SAFE_ATTR") && arrayIsArray(cfg.ADD_URI_SAFE_ATTR)) {
      addToSet(URI_SAFE_ATTRIBUTES, cfg.ADD_URI_SAFE_ATTR, transformCaseFunc);
    }
    if (objectHasOwnProperty(cfg, "FORBID_CONTENTS") && arrayIsArray(cfg.FORBID_CONTENTS)) {
      if (FORBID_CONTENTS === DEFAULT_FORBID_CONTENTS) {
        FORBID_CONTENTS = clone(FORBID_CONTENTS);
      }
      addToSet(FORBID_CONTENTS, cfg.FORBID_CONTENTS, transformCaseFunc);
    }
    if (objectHasOwnProperty(cfg, "ADD_FORBID_CONTENTS") && arrayIsArray(cfg.ADD_FORBID_CONTENTS)) {
      if (FORBID_CONTENTS === DEFAULT_FORBID_CONTENTS) {
        FORBID_CONTENTS = clone(FORBID_CONTENTS);
      }
      addToSet(FORBID_CONTENTS, cfg.ADD_FORBID_CONTENTS, transformCaseFunc);
    }
    if (KEEP_CONTENT) {
      ALLOWED_TAGS["#text"] = true;
    }
    if (WHOLE_DOCUMENT) {
      addToSet(ALLOWED_TAGS, ["html", "head", "body"]);
    }
    if (ALLOWED_TAGS.table) {
      addToSet(ALLOWED_TAGS, ["tbody"]);
      delete FORBID_TAGS.tbody;
    }
    if (cfg.TRUSTED_TYPES_POLICY) {
      if (typeof cfg.TRUSTED_TYPES_POLICY.createHTML !== "function") {
        throw typeErrorCreate('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
      }
      if (typeof cfg.TRUSTED_TYPES_POLICY.createScriptURL !== "function") {
        throw typeErrorCreate('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
      }
      const previousTrustedTypesPolicy = trustedTypesPolicy;
      trustedTypesPolicy = cfg.TRUSTED_TYPES_POLICY;
      try {
        emptyHTML = _createTrustedHTML("");
      } catch (error) {
        trustedTypesPolicy = previousTrustedTypesPolicy;
        throw error;
      }
    } else if (cfg.TRUSTED_TYPES_POLICY === null) {
      trustedTypesPolicy = void 0;
      emptyHTML = "";
    } else {
      if (trustedTypesPolicy === void 0) {
        trustedTypesPolicy = _getDefaultTrustedTypesPolicy();
      }
      if (trustedTypesPolicy && typeof emptyHTML === "string") {
        emptyHTML = _createTrustedHTML("");
      }
    }
    if (freeze) {
      freeze(cfg);
    }
    CONFIG = cfg;
  };
  const ALL_SVG_TAGS = addToSet({}, [...svg$1, ...svgFilters, ...svgDisallowed]);
  const ALL_MATHML_TAGS = addToSet({}, [...mathMl$1, ...mathMlDisallowed]);
  const _checkSvgNamespace = function _checkSvgNamespace2(tagName, parent, parentTagName) {
    if (parent.namespaceURI === HTML_NAMESPACE) {
      return tagName === "svg";
    }
    if (parent.namespaceURI === MATHML_NAMESPACE) {
      return tagName === "svg" && (parentTagName === "annotation-xml" || MATHML_TEXT_INTEGRATION_POINTS[parentTagName]);
    }
    return Boolean(ALL_SVG_TAGS[tagName]);
  };
  const _checkMathMlNamespace = function _checkMathMlNamespace2(tagName, parent, parentTagName) {
    if (parent.namespaceURI === HTML_NAMESPACE) {
      return tagName === "math";
    }
    if (parent.namespaceURI === SVG_NAMESPACE) {
      return tagName === "math" && HTML_INTEGRATION_POINTS[parentTagName];
    }
    return Boolean(ALL_MATHML_TAGS[tagName]);
  };
  const _checkHtmlNamespace = function _checkHtmlNamespace2(tagName, parent, parentTagName) {
    if (parent.namespaceURI === SVG_NAMESPACE && !HTML_INTEGRATION_POINTS[parentTagName]) {
      return false;
    }
    if (parent.namespaceURI === MATHML_NAMESPACE && !MATHML_TEXT_INTEGRATION_POINTS[parentTagName]) {
      return false;
    }
    return !ALL_MATHML_TAGS[tagName] && (COMMON_SVG_AND_HTML_ELEMENTS[tagName] || !ALL_SVG_TAGS[tagName]);
  };
  const _checkValidNamespace = function _checkValidNamespace2(element) {
    let parent = getParentNode(element);
    if (!parent || !parent.tagName) {
      parent = {
        namespaceURI: NAMESPACE,
        tagName: "template"
      };
    }
    const tagName = stringToLowerCase(element.tagName);
    const parentTagName = stringToLowerCase(parent.tagName);
    if (!ALLOWED_NAMESPACES[element.namespaceURI]) {
      return false;
    }
    if (element.namespaceURI === SVG_NAMESPACE) {
      return _checkSvgNamespace(tagName, parent, parentTagName);
    }
    if (element.namespaceURI === MATHML_NAMESPACE) {
      return _checkMathMlNamespace(tagName, parent, parentTagName);
    }
    if (element.namespaceURI === HTML_NAMESPACE) {
      return _checkHtmlNamespace(tagName, parent, parentTagName);
    }
    if (PARSER_MEDIA_TYPE === "application/xhtml+xml" && ALLOWED_NAMESPACES[element.namespaceURI]) {
      return true;
    }
    return false;
  };
  const _forceRemove = function _forceRemove2(node) {
    arrayPush(DOMPurify.removed, {
      element: node
    });
    try {
      getParentNode(node).removeChild(node);
    } catch (_2) {
      remove(node);
      if (!getParentNode(node)) {
        throw typeErrorCreate("a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place");
      }
    }
  };
  const _neutralizeRoot = function _neutralizeRoot2(root) {
    const childNodes = getChildNodes(root);
    if (childNodes) {
      const snapshot = [];
      arrayForEach(childNodes, (child) => {
        arrayPush(snapshot, child);
      });
      arrayForEach(snapshot, (child) => {
        try {
          remove(child);
        } catch (_2) {
        }
      });
    }
    const attributes = getAttributes(root);
    if (attributes) {
      for (let i2 = attributes.length - 1; i2 >= 0; --i2) {
        const attribute = attributes[i2];
        const name = attribute && attribute.name;
        if (typeof name === "string") {
          try {
            root.removeAttribute(name);
          } catch (_2) {
          }
        }
      }
    }
  };
  const _removeAttribute = function _removeAttribute2(name, element) {
    try {
      arrayPush(DOMPurify.removed, {
        attribute: element.getAttributeNode(name),
        from: element
      });
    } catch (_2) {
      arrayPush(DOMPurify.removed, {
        attribute: null,
        from: element
      });
    }
    element.removeAttribute(name);
    if (name === "is") {
      if (RETURN_DOM || RETURN_DOM_FRAGMENT) {
        try {
          _forceRemove(element);
        } catch (_2) {
        }
      } else {
        try {
          element.setAttribute(name, "");
        } catch (_2) {
        }
      }
    }
  };
  const _stripDisallowedAttributes = function _stripDisallowedAttributes2(element) {
    const attributes = getAttributes(element);
    if (!attributes) {
      return;
    }
    for (let i2 = attributes.length - 1; i2 >= 0; --i2) {
      const attribute = attributes[i2];
      const name = attribute && attribute.name;
      if (typeof name !== "string" || ALLOWED_ATTR[transformCaseFunc(name)]) {
        continue;
      }
      try {
        element.removeAttribute(name);
      } catch (_2) {
      }
    }
  };
  const _neutralizeSubtree = function _neutralizeSubtree2(root) {
    const stack = [root];
    while (stack.length > 0) {
      const node = stack.pop();
      const nodeType = getNodeType ? getNodeType(node) : node.nodeType;
      if (nodeType === NODE_TYPE.element) {
        _stripDisallowedAttributes(node);
      }
      const childNodes = getChildNodes(node);
      if (childNodes) {
        for (let i2 = childNodes.length - 1; i2 >= 0; --i2) {
          stack.push(childNodes[i2]);
        }
      }
    }
  };
  const _initDocument = function _initDocument2(dirty) {
    let doc = null;
    let leadingWhitespace = null;
    if (FORCE_BODY) {
      dirty = "<remove></remove>" + dirty;
    } else {
      const matches = stringMatch(dirty, /^[\r\n\t ]+/);
      leadingWhitespace = matches && matches[0];
    }
    if (PARSER_MEDIA_TYPE === "application/xhtml+xml" && NAMESPACE === HTML_NAMESPACE) {
      dirty = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + dirty + "</body></html>";
    }
    const dirtyPayload = trustedTypesPolicy ? _createTrustedHTML(dirty) : dirty;
    if (NAMESPACE === HTML_NAMESPACE) {
      try {
        doc = new DOMParser().parseFromString(dirtyPayload, PARSER_MEDIA_TYPE);
      } catch (_2) {
      }
    }
    if (!doc || !doc.documentElement) {
      doc = implementation.createDocument(NAMESPACE, "template", null);
      try {
        doc.documentElement.innerHTML = IS_EMPTY_INPUT ? emptyHTML : dirtyPayload;
      } catch (_2) {
      }
    }
    const body = doc.body || doc.documentElement;
    if (dirty && leadingWhitespace) {
      body.insertBefore(document2.createTextNode(leadingWhitespace), body.childNodes[0] || null);
    }
    if (NAMESPACE === HTML_NAMESPACE) {
      return getElementsByTagName.call(doc, WHOLE_DOCUMENT ? "html" : "body")[0];
    }
    return WHOLE_DOCUMENT ? doc.documentElement : body;
  };
  const _createNodeIterator = function _createNodeIterator2(root) {
    return createNodeIterator.call(
      root.ownerDocument || root,
      root,
      // eslint-disable-next-line no-bitwise
      NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT | NodeFilter.SHOW_TEXT | NodeFilter.SHOW_PROCESSING_INSTRUCTION | NodeFilter.SHOW_CDATA_SECTION,
      null
    );
  };
  const _stripTemplateExpressions = function _stripTemplateExpressions2(value) {
    value = stringReplace(value, MUSTACHE_EXPR$1, " ");
    value = stringReplace(value, ERB_EXPR$1, " ");
    value = stringReplace(value, TMPLIT_EXPR$1, " ");
    return value;
  };
  const _scrubTemplateExpressions2 = function _scrubTemplateExpressions(node) {
    var _node$querySelectorAl;
    node.normalize();
    const walker = createNodeIterator.call(
      node.ownerDocument || node,
      node,
      // eslint-disable-next-line no-bitwise
      NodeFilter.SHOW_TEXT | NodeFilter.SHOW_COMMENT | NodeFilter.SHOW_CDATA_SECTION | NodeFilter.SHOW_PROCESSING_INSTRUCTION,
      null
    );
    let currentNode = walker.nextNode();
    while (currentNode) {
      currentNode.data = _stripTemplateExpressions(currentNode.data);
      currentNode = walker.nextNode();
    }
    const templates = (_node$querySelectorAl = node.querySelectorAll) === null || _node$querySelectorAl === void 0 ? void 0 : _node$querySelectorAl.call(node, "template");
    if (templates) {
      arrayForEach(templates, (tmpl) => {
        if (_isDocumentFragment(tmpl.content)) {
          _scrubTemplateExpressions2(tmpl.content);
        }
      });
    }
  };
  const _isClobbered = function _isClobbered2(element) {
    const realTagName = getNodeName ? getNodeName(element) : null;
    if (typeof realTagName !== "string") {
      return false;
    }
    if (transformCaseFunc(realTagName) !== "form") {
      return false;
    }
    return typeof element.nodeName !== "string" || typeof element.textContent !== "string" || typeof element.removeChild !== "function" || // Realm-safe NamedNodeMap detection: equality against the cached
    // prototype getter. Clobbered .attributes (e.g. <input name="attributes">)
    // makes the direct read diverge from the cached read; a clean form
    // (same-realm OR foreign-realm) has both reads pointing at the same
    // canonical NamedNodeMap.
    element.attributes !== getAttributes(element) || typeof element.removeAttribute !== "function" || typeof element.setAttribute !== "function" || typeof element.namespaceURI !== "string" || typeof element.insertBefore !== "function" || typeof element.hasChildNodes !== "function" || // NodeType clobbering probe. Cached Node.prototype.nodeType getter
    // returns the integer 1 for any Element regardless of realm; direct
    // read on a clobbered form (e.g. <input name="nodeType">) returns
    // the named child element. Cheap addition — nodeType is read from
    // an internal slot, no serialization cost — and removes a residual
    // clobbering surface used by several mXSS / PI / comment branches
    // in _sanitizeElements that compare currentNode.nodeType directly.
    element.nodeType !== getNodeType(element) || // HTMLFormElement has [LegacyOverrideBuiltIns]: a descendant named
    // "childNodes" shadows the prototype getter. Direct reads of
    // form.childNodes from a clobbered form return the named child
    // instead of the real NodeList, so any walk that reads it directly
    // skips the form's real children. Compare the direct read to the
    // cached Node.prototype getter — when the form's named-property
    // getter intercepts the read, the two values differ and we flag
    // the form. This catches every clobbering child type (input,
    // select, etc.) regardless of whether the named child happens to
    // carry a numeric .length, which a typeof-based probe would miss
    // (e.g. HTMLSelectElement.length is a defined unsigned-long).
    element.childNodes !== getChildNodes(element);
  };
  const _isDocumentFragment = function _isDocumentFragment2(value) {
    if (!getNodeType || typeof value !== "object" || value === null) {
      return false;
    }
    try {
      return getNodeType(value) === NODE_TYPE.documentFragment;
    } catch (_2) {
      return false;
    }
  };
  const _isNode = function _isNode2(value) {
    if (!getNodeType || typeof value !== "object" || value === null) {
      return false;
    }
    try {
      return typeof getNodeType(value) === "number";
    } catch (_2) {
      return false;
    }
  };
  function _executeHooks(hooks2, currentNode, data) {
    if (hooks2.length === 0) {
      return;
    }
    arrayForEach(hooks2, (hook) => {
      hook.call(DOMPurify, currentNode, data, CONFIG);
    });
  }
  const _isUnsafeNode = function _isUnsafeNode2(currentNode, tagName) {
    if (SAFE_FOR_XML && currentNode.hasChildNodes() && !_isNode(currentNode.firstElementChild) && regExpTest(ELEMENT_MARKUP_PROBE, currentNode.textContent) && regExpTest(ELEMENT_MARKUP_PROBE, currentNode.innerHTML)) {
      return true;
    }
    if (SAFE_FOR_XML && currentNode.namespaceURI === HTML_NAMESPACE && tagName === "style" && _isNode(currentNode.firstElementChild)) {
      return true;
    }
    if (currentNode.nodeType === NODE_TYPE.processingInstruction) {
      return true;
    }
    if (SAFE_FOR_XML && currentNode.nodeType === NODE_TYPE.comment && regExpTest(COMMENT_MARKUP_PROBE, currentNode.data)) {
      return true;
    }
    return false;
  };
  const _sanitizeDisallowedNode = function _sanitizeDisallowedNode2(currentNode, tagName) {
    if (!FORBID_TAGS[tagName] && _isBasicCustomElement(tagName)) {
      if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, tagName)) {
        return false;
      }
      if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(tagName)) {
        return false;
      }
    }
    if (KEEP_CONTENT && !FORBID_CONTENTS[tagName]) {
      const parentNode = getParentNode(currentNode);
      const childNodes = getChildNodes(currentNode);
      if (childNodes && parentNode) {
        const childCount = childNodes.length;
        for (let i2 = childCount - 1; i2 >= 0; --i2) {
          const hoisted = IN_PLACE ? childNodes[i2] : cloneNode(childNodes[i2], true);
          parentNode.insertBefore(hoisted, getNextSibling(currentNode));
        }
      }
    }
    _forceRemove(currentNode);
    return true;
  };
  const _sanitizeElements = function _sanitizeElements2(currentNode) {
    _executeHooks(hooks.beforeSanitizeElements, currentNode, null);
    if (_isClobbered(currentNode)) {
      _forceRemove(currentNode);
      return true;
    }
    const tagName = transformCaseFunc(getNodeName ? getNodeName(currentNode) : currentNode.nodeName);
    _executeHooks(hooks.uponSanitizeElement, currentNode, {
      tagName,
      allowedTags: ALLOWED_TAGS
    });
    if (_isUnsafeNode(currentNode, tagName)) {
      _forceRemove(currentNode);
      return true;
    }
    if (FORBID_TAGS[tagName] || !(EXTRA_ELEMENT_HANDLING.tagCheck instanceof Function && EXTRA_ELEMENT_HANDLING.tagCheck(tagName)) && !ALLOWED_TAGS[tagName]) {
      return _sanitizeDisallowedNode(currentNode, tagName);
    }
    const nt2 = getNodeType ? getNodeType(currentNode) : currentNode.nodeType;
    if (nt2 === NODE_TYPE.element && !_checkValidNamespace(currentNode)) {
      _forceRemove(currentNode);
      return true;
    }
    if ((tagName === "noscript" || tagName === "noembed" || tagName === "noframes") && regExpTest(FALLBACK_TAG_CLOSE, currentNode.innerHTML)) {
      _forceRemove(currentNode);
      return true;
    }
    if (SAFE_FOR_TEMPLATES && currentNode.nodeType === NODE_TYPE.text) {
      const content = _stripTemplateExpressions(currentNode.textContent);
      if (currentNode.textContent !== content) {
        arrayPush(DOMPurify.removed, {
          element: currentNode.cloneNode()
        });
        currentNode.textContent = content;
      }
    }
    _executeHooks(hooks.afterSanitizeElements, currentNode, null);
    return false;
  };
  const _isValidAttribute = function _isValidAttribute2(lcTag, lcName, value) {
    if (FORBID_ATTR[lcName]) {
      return false;
    }
    if (SANITIZE_DOM && (lcName === "id" || lcName === "name") && (value in document2 || value in formElement)) {
      return false;
    }
    const nameIsPermitted = ALLOWED_ATTR[lcName] || EXTRA_ELEMENT_HANDLING.attributeCheck instanceof Function && EXTRA_ELEMENT_HANDLING.attributeCheck(lcName, lcTag);
    if (ALLOW_DATA_ATTR && regExpTest(DATA_ATTR$1, lcName)) ;
    else if (ALLOW_ARIA_ATTR && regExpTest(ARIA_ATTR$1, lcName)) ;
    else if (!nameIsPermitted) {
      if (
        // First condition does a very basic check if a) it's basically a valid custom element tagname AND
        // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
        // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
        _isBasicCustomElement(lcTag) && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, lcTag) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(lcTag)) && (CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.attributeNameCheck, lcName) || CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.attributeNameCheck(lcName, lcTag)) || // Alternative, second condition checks if it's an `is`-attribute, AND
        // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
        lcName === "is" && CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, value) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(value))
      ) ;
      else {
        return false;
      }
    } else if (URI_SAFE_ATTRIBUTES[lcName]) ;
    else if (regExpTest(IS_ALLOWED_URI$1, stringReplace(value, ATTR_WHITESPACE$1, ""))) ;
    else if ((lcName === "src" || lcName === "xlink:href" || lcName === "href") && lcTag !== "script" && stringIndexOf(value, "data:") === 0 && DATA_URI_TAGS[lcTag]) ;
    else if (ALLOW_UNKNOWN_PROTOCOLS && !regExpTest(IS_SCRIPT_OR_DATA$1, stringReplace(value, ATTR_WHITESPACE$1, ""))) ;
    else if (value) {
      return false;
    } else ;
    return true;
  };
  const RESERVED_CUSTOM_ELEMENT_NAMES = addToSet({}, ["annotation-xml", "color-profile", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "missing-glyph"]);
  const _isBasicCustomElement = function _isBasicCustomElement2(tagName) {
    return !RESERVED_CUSTOM_ELEMENT_NAMES[stringToLowerCase(tagName)] && regExpTest(CUSTOM_ELEMENT$1, tagName);
  };
  const _applyTrustedTypesToAttribute = function _applyTrustedTypesToAttribute2(lcTag, lcName, namespaceURI, value) {
    if (trustedTypesPolicy && typeof trustedTypes === "object" && typeof trustedTypes.getAttributeType === "function" && !namespaceURI) {
      switch (trustedTypes.getAttributeType(lcTag, lcName)) {
        case "TrustedHTML": {
          return _createTrustedHTML(value);
        }
        case "TrustedScriptURL": {
          return _createTrustedScriptURL(value);
        }
      }
    }
    return value;
  };
  const _setAttributeValue = function _setAttributeValue2(currentNode, name, namespaceURI, value) {
    try {
      if (namespaceURI) {
        currentNode.setAttributeNS(namespaceURI, name, value);
      } else {
        currentNode.setAttribute(name, value);
      }
      if (_isClobbered(currentNode)) {
        _forceRemove(currentNode);
      } else {
        arrayPop(DOMPurify.removed);
      }
    } catch (_2) {
      _removeAttribute(name, currentNode);
    }
  };
  const _sanitizeAttributes = function _sanitizeAttributes2(currentNode) {
    _executeHooks(hooks.beforeSanitizeAttributes, currentNode, null);
    const attributes = currentNode.attributes;
    if (!attributes || _isClobbered(currentNode)) {
      return;
    }
    const hookEvent = {
      attrName: "",
      attrValue: "",
      keepAttr: true,
      allowedAttributes: ALLOWED_ATTR,
      forceKeepAttr: void 0
    };
    let l2 = attributes.length;
    const lcTag = transformCaseFunc(currentNode.nodeName);
    while (l2--) {
      const attr = attributes[l2];
      const name = attr.name, namespaceURI = attr.namespaceURI, attrValue = attr.value;
      const lcName = transformCaseFunc(name);
      const initValue = attrValue;
      let value = name === "value" ? initValue : stringTrim(initValue);
      hookEvent.attrName = lcName;
      hookEvent.attrValue = value;
      hookEvent.keepAttr = true;
      hookEvent.forceKeepAttr = void 0;
      _executeHooks(hooks.uponSanitizeAttribute, currentNode, hookEvent);
      value = hookEvent.attrValue;
      if (SANITIZE_NAMED_PROPS && (lcName === "id" || lcName === "name") && stringIndexOf(value, SANITIZE_NAMED_PROPS_PREFIX) !== 0) {
        _removeAttribute(name, currentNode);
        value = SANITIZE_NAMED_PROPS_PREFIX + value;
      }
      if (SAFE_FOR_XML && regExpTest(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i, value)) {
        _removeAttribute(name, currentNode);
        continue;
      }
      if (lcName === "attributename" && stringMatch(value, "href")) {
        _removeAttribute(name, currentNode);
        continue;
      }
      if (hookEvent.forceKeepAttr) {
        continue;
      }
      if (!hookEvent.keepAttr) {
        _removeAttribute(name, currentNode);
        continue;
      }
      if (!ALLOW_SELF_CLOSE_IN_ATTR && regExpTest(SELF_CLOSING_TAG, value)) {
        _removeAttribute(name, currentNode);
        continue;
      }
      if (SAFE_FOR_TEMPLATES) {
        value = _stripTemplateExpressions(value);
      }
      if (!_isValidAttribute(lcTag, lcName, value)) {
        _removeAttribute(name, currentNode);
        continue;
      }
      value = _applyTrustedTypesToAttribute(lcTag, lcName, namespaceURI, value);
      if (value !== initValue) {
        _setAttributeValue(currentNode, name, namespaceURI, value);
      }
    }
    _executeHooks(hooks.afterSanitizeAttributes, currentNode, null);
  };
  const _sanitizeShadowDOM2 = function _sanitizeShadowDOM(fragment) {
    let shadowNode = null;
    const shadowIterator = _createNodeIterator(fragment);
    _executeHooks(hooks.beforeSanitizeShadowDOM, fragment, null);
    while (shadowNode = shadowIterator.nextNode()) {
      _executeHooks(hooks.uponSanitizeShadowNode, shadowNode, null);
      _sanitizeElements(shadowNode);
      _sanitizeAttributes(shadowNode);
      if (_isDocumentFragment(shadowNode.content)) {
        _sanitizeShadowDOM2(shadowNode.content);
      }
      const shadowNodeType = getNodeType ? getNodeType(shadowNode) : shadowNode.nodeType;
      if (shadowNodeType === NODE_TYPE.element) {
        const innerSr = getShadowRoot(shadowNode);
        if (_isDocumentFragment(innerSr)) {
          _sanitizeAttachedShadowRoots(innerSr);
          _sanitizeShadowDOM2(innerSr);
        }
      }
    }
    _executeHooks(hooks.afterSanitizeShadowDOM, fragment, null);
  };
  const _sanitizeAttachedShadowRoots = function _sanitizeAttachedShadowRoots2(root) {
    const stack = [{
      node: root,
      shadow: null
    }];
    while (stack.length > 0) {
      const item = stack.pop();
      if (item.shadow) {
        _sanitizeShadowDOM2(item.shadow);
        continue;
      }
      const node = item.node;
      const nodeType = getNodeType ? getNodeType(node) : node.nodeType;
      const isElement = nodeType === NODE_TYPE.element;
      const childNodes = getChildNodes(node);
      if (childNodes) {
        for (let i2 = childNodes.length - 1; i2 >= 0; --i2) {
          stack.push({
            node: childNodes[i2],
            shadow: null
          });
        }
      }
      if (isElement) {
        const rootName = getNodeName ? getNodeName(node) : null;
        if (typeof rootName === "string" && transformCaseFunc(rootName) === "template") {
          const content = node.content;
          if (_isDocumentFragment(content)) {
            stack.push({
              node: content,
              shadow: null
            });
          }
        }
      }
      if (isElement) {
        const sr = getShadowRoot(node);
        if (_isDocumentFragment(sr)) {
          stack.push({
            node: null,
            shadow: sr
          }, {
            node: sr,
            shadow: null
          });
        }
      }
    }
  };
  DOMPurify.sanitize = function(dirty) {
    let cfg = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    let body = null;
    let importedNode = null;
    let currentNode = null;
    let returnNode = null;
    IS_EMPTY_INPUT = !dirty;
    if (IS_EMPTY_INPUT) {
      dirty = "<!-->";
    }
    if (typeof dirty !== "string" && !_isNode(dirty)) {
      dirty = stringifyValue(dirty);
      if (typeof dirty !== "string") {
        throw typeErrorCreate("dirty is not a string, aborting");
      }
    }
    if (!DOMPurify.isSupported) {
      return dirty;
    }
    if (SET_CONFIG) {
      ALLOWED_TAGS = SET_CONFIG_ALLOWED_TAGS;
      ALLOWED_ATTR = SET_CONFIG_ALLOWED_ATTR;
    } else {
      _parseConfig(cfg);
    }
    if (hooks.uponSanitizeElement.length > 0 || hooks.uponSanitizeAttribute.length > 0) {
      ALLOWED_TAGS = clone(ALLOWED_TAGS);
    }
    if (hooks.uponSanitizeAttribute.length > 0) {
      ALLOWED_ATTR = clone(ALLOWED_ATTR);
    }
    DOMPurify.removed = [];
    const inPlace = IN_PLACE && typeof dirty !== "string" && _isNode(dirty);
    if (inPlace) {
      const nn = getNodeName ? getNodeName(dirty) : dirty.nodeName;
      if (typeof nn === "string") {
        const tagName = transformCaseFunc(nn);
        if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) {
          throw typeErrorCreate("root node is forbidden and cannot be sanitized in-place");
        }
      }
      if (_isClobbered(dirty)) {
        throw typeErrorCreate("root node is clobbered and cannot be sanitized in-place");
      }
      try {
        _sanitizeAttachedShadowRoots(dirty);
      } catch (error) {
        _neutralizeRoot(dirty);
        throw error;
      }
    } else if (_isNode(dirty)) {
      body = _initDocument("<!---->");
      importedNode = body.ownerDocument.importNode(dirty, true);
      if (importedNode.nodeType === NODE_TYPE.element && importedNode.nodeName === "BODY") {
        body = importedNode;
      } else if (importedNode.nodeName === "HTML") {
        body = importedNode;
      } else {
        body.appendChild(importedNode);
      }
      _sanitizeAttachedShadowRoots(importedNode);
    } else {
      if (!RETURN_DOM && !SAFE_FOR_TEMPLATES && !WHOLE_DOCUMENT && // eslint-disable-next-line unicorn/prefer-includes
      dirty.indexOf("<") === -1) {
        return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? _createTrustedHTML(dirty) : dirty;
      }
      body = _initDocument(dirty);
      if (!body) {
        return RETURN_DOM ? null : RETURN_TRUSTED_TYPE ? emptyHTML : "";
      }
    }
    if (body && FORCE_BODY) {
      _forceRemove(body.firstChild);
    }
    const nodeIterator = _createNodeIterator(inPlace ? dirty : body);
    try {
      while (currentNode = nodeIterator.nextNode()) {
        _sanitizeElements(currentNode);
        _sanitizeAttributes(currentNode);
        if (_isDocumentFragment(currentNode.content)) {
          _sanitizeShadowDOM2(currentNode.content);
        }
      }
    } catch (error) {
      if (inPlace) {
        _neutralizeRoot(dirty);
      }
      throw error;
    }
    if (inPlace) {
      arrayForEach(DOMPurify.removed, (entry) => {
        if (entry.element) {
          _neutralizeSubtree(entry.element);
        }
      });
      if (SAFE_FOR_TEMPLATES) {
        _scrubTemplateExpressions2(dirty);
      }
      return dirty;
    }
    if (RETURN_DOM) {
      if (SAFE_FOR_TEMPLATES) {
        _scrubTemplateExpressions2(body);
      }
      if (RETURN_DOM_FRAGMENT) {
        returnNode = createDocumentFragment.call(body.ownerDocument);
        while (body.firstChild) {
          returnNode.appendChild(body.firstChild);
        }
      } else {
        returnNode = body;
      }
      if (ALLOWED_ATTR.shadowroot || ALLOWED_ATTR.shadowrootmode) {
        returnNode = importNode.call(originalDocument, returnNode, true);
      }
      return returnNode;
    }
    let serializedHTML = WHOLE_DOCUMENT ? body.outerHTML : body.innerHTML;
    if (WHOLE_DOCUMENT && ALLOWED_TAGS["!doctype"] && body.ownerDocument && body.ownerDocument.doctype && body.ownerDocument.doctype.name && regExpTest(DOCTYPE_NAME, body.ownerDocument.doctype.name)) {
      serializedHTML = "<!DOCTYPE " + body.ownerDocument.doctype.name + ">\n" + serializedHTML;
    }
    if (SAFE_FOR_TEMPLATES) {
      serializedHTML = _stripTemplateExpressions(serializedHTML);
    }
    return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? _createTrustedHTML(serializedHTML) : serializedHTML;
  };
  DOMPurify.setConfig = function() {
    let cfg = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    _parseConfig(cfg);
    SET_CONFIG = true;
    SET_CONFIG_ALLOWED_TAGS = ALLOWED_TAGS;
    SET_CONFIG_ALLOWED_ATTR = ALLOWED_ATTR;
  };
  DOMPurify.clearConfig = function() {
    CONFIG = null;
    SET_CONFIG = false;
    SET_CONFIG_ALLOWED_TAGS = null;
    SET_CONFIG_ALLOWED_ATTR = null;
    trustedTypesPolicy = defaultTrustedTypesPolicy;
    emptyHTML = "";
  };
  DOMPurify.isValidAttribute = function(tag, attr, value) {
    if (!CONFIG) {
      _parseConfig({});
    }
    const lcTag = transformCaseFunc(tag);
    const lcName = transformCaseFunc(attr);
    return _isValidAttribute(lcTag, lcName, value);
  };
  DOMPurify.addHook = function(entryPoint, hookFunction) {
    if (typeof hookFunction !== "function") {
      return;
    }
    if (!objectHasOwnProperty(hooks, entryPoint)) {
      return;
    }
    arrayPush(hooks[entryPoint], hookFunction);
  };
  DOMPurify.removeHook = function(entryPoint, hookFunction) {
    if (!objectHasOwnProperty(hooks, entryPoint)) {
      return void 0;
    }
    if (hookFunction !== void 0) {
      const index = arrayLastIndexOf(hooks[entryPoint], hookFunction);
      return index === -1 ? void 0 : arraySplice(hooks[entryPoint], index, 1)[0];
    }
    return arrayPop(hooks[entryPoint]);
  };
  DOMPurify.removeHooks = function(entryPoint) {
    if (!objectHasOwnProperty(hooks, entryPoint)) {
      return;
    }
    hooks[entryPoint] = [];
  };
  DOMPurify.removeAllHooks = function() {
    hooks = _createHooksMap();
  };
  return DOMPurify;
}
var purify = createDOMPurify();
/*!
 * escape-html
 * Copyright(c) 2012-2013 TJ Holowaychuk
 * Copyright(c) 2015 Andreas Lubbe
 * Copyright(c) 2015 Tiancheng "Timothy" Gu
 * MIT Licensed
 */
var escapeHtml_1;
var hasRequiredEscapeHtml;
function requireEscapeHtml() {
  if (hasRequiredEscapeHtml) return escapeHtml_1;
  hasRequiredEscapeHtml = 1;
  var matchHtmlRegExp = /["'&<>]/;
  escapeHtml_1 = escapeHtml;
  function escapeHtml(string) {
    var str = "" + string;
    var match = matchHtmlRegExp.exec(str);
    if (!match) {
      return str;
    }
    var escape2;
    var html2 = "";
    var index = 0;
    var lastIndex = 0;
    for (index = match.index; index < str.length; index++) {
      switch (str.charCodeAt(index)) {
        case 34:
          escape2 = "&quot;";
          break;
        case 38:
          escape2 = "&amp;";
          break;
        case 39:
          escape2 = "&#39;";
          break;
        case 60:
          escape2 = "&lt;";
          break;
        case 62:
          escape2 = "&gt;";
          break;
        default:
          continue;
      }
      if (lastIndex !== index) {
        html2 += str.substring(lastIndex, index);
      }
      lastIndex = index + 1;
      html2 += escape2;
    }
    return lastIndex !== index ? html2 + str.substring(lastIndex, index) : html2;
  }
  return escapeHtml_1;
}
var escapeHtmlExports = requireEscapeHtml();
const escapeHTML = /* @__PURE__ */ getDefaultExportFromCjs(escapeHtmlExports);
function getLanguage() {
  return globalThis._nc_l10n_language;
}
globalThis._nc_l10n_locale ??= typeof document !== "undefined" && document.documentElement.dataset.locale || Intl.DateTimeFormat().resolvedOptions().locale.replaceAll(/-/g, "_");
globalThis._nc_l10n_language ??= typeof document !== "undefined" && document.documentElement.lang || (globalThis.navigator?.language ?? "en");
function getAppTranslations(appId) {
  return {
    translations: globalThis._oc_l10n_registry_translations[appId] ?? {},
    pluralFunction: globalThis._oc_l10n_registry_plural_functions[appId] ?? ((number) => number)
  };
}
globalThis._oc_l10n_registry_translations ??= {};
globalThis._oc_l10n_registry_plural_functions ??= {};
/*!
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */
function translate(app, text2, placeholdersOrNumber, optionsOrNumber, options) {
  const vars = typeof placeholdersOrNumber === "object" ? placeholdersOrNumber : void 0;
  const number = typeof optionsOrNumber === "number" ? optionsOrNumber : typeof placeholdersOrNumber === "number" ? placeholdersOrNumber : void 0;
  const allOptions = {
    // defaults
    escape: true,
    sanitize: true,
    // overwrite with user config
    ...typeof options === "object" ? options : typeof optionsOrNumber === "object" ? optionsOrNumber : {}
  };
  const identity = (value) => value;
  const optSanitize = (allOptions.sanitize ? purify.sanitize : identity) || identity;
  const optEscape = allOptions.escape ? escapeHTML : identity;
  const isValidReplacement = (value) => typeof value === "string" || typeof value === "number";
  const _build = (text22, vars2, number2) => {
    return text22.replace(/%n/g, "" + number2).replace(/{([^{}]*)}/g, (match, key) => {
      if (vars2 === void 0 || !(key in vars2)) {
        return optEscape(match);
      }
      const replacement = vars2[key];
      if (isValidReplacement(replacement)) {
        return optEscape(`${replacement}`);
      } else if (typeof replacement === "object" && isValidReplacement(replacement.value)) {
        const escape2 = replacement.escape !== false ? escapeHTML : identity;
        return escape2(`${replacement.value}`);
      } else {
        return optEscape(match);
      }
    });
  };
  const bundle = options?.bundle ?? getAppTranslations(app);
  let translation = bundle.translations[text2] || text2;
  translation = Array.isArray(translation) ? translation[0] : translation;
  if (typeof vars === "object" || number !== void 0) {
    return optSanitize(_build(
      translation,
      vars,
      number
    ));
  } else {
    return optSanitize(translation);
  }
}
function translatePlural(app, textSingular, textPlural, number, vars, options) {
  const identifier = "_" + textSingular + "_::_" + textPlural + "_";
  const bundle = options?.bundle ?? getAppTranslations(app);
  const value = bundle.translations[identifier];
  if (typeof value !== "undefined") {
    const translation = value;
    if (Array.isArray(translation)) {
      const plural = bundle.pluralFunction(number);
      return translate(app, translation[plural], vars, number, options);
    }
  }
  if (number === 1) {
    return translate(app, textSingular, vars, number, options);
  } else {
    return translate(app, textPlural, vars, number, options);
  }
}
function getPlural(number, language = getLanguage()) {
  if (language === "pt-BR") {
    language = "xbr";
  }
  if (language.length > 3) {
    language = language.substring(0, language.lastIndexOf("-"));
  }
  switch (language) {
    case "az":
    case "bo":
    case "dz":
    case "id":
    case "ja":
    case "jv":
    case "ka":
    case "km":
    case "kn":
    case "ko":
    case "ms":
    case "th":
    case "tr":
    case "vi":
    case "zh":
      return 0;
    case "af":
    case "bn":
    case "bg":
    case "ca":
    case "da":
    case "de":
    case "el":
    case "en":
    case "eo":
    case "es":
    case "et":
    case "eu":
    case "fa":
    case "fi":
    case "fo":
    case "fur":
    case "fy":
    case "gl":
    case "gu":
    case "ha":
    case "he":
    case "hu":
    case "is":
    case "it":
    case "ku":
    case "lb":
    case "ml":
    case "mn":
    case "mr":
    case "nah":
    case "nb":
    case "ne":
    case "nl":
    case "nn":
    case "no":
    case "oc":
    case "om":
    case "or":
    case "pa":
    case "pap":
    case "ps":
    case "pt":
    case "so":
    case "sq":
    case "sv":
    case "sw":
    case "ta":
    case "te":
    case "tk":
    case "ur":
    case "zu":
      return number === 1 ? 0 : 1;
    case "am":
    case "bh":
    case "fil":
    case "fr":
    case "gun":
    case "hi":
    case "hy":
    case "ln":
    case "mg":
    case "nso":
    case "xbr":
    case "ti":
    case "wa":
      return number === 0 || number === 1 ? 0 : 1;
    case "be":
    case "bs":
    case "hr":
    case "ru":
    case "sh":
    case "sr":
    case "uk":
      return number % 10 === 1 && number % 100 !== 11 ? 0 : number % 10 >= 2 && number % 10 <= 4 && (number % 100 < 10 || number % 100 >= 20) ? 1 : 2;
    case "cs":
    case "sk":
      return number === 1 ? 0 : number >= 2 && number <= 4 ? 1 : 2;
    case "ga":
      return number === 1 ? 0 : number === 2 ? 1 : 2;
    case "lt":
      return number % 10 === 1 && number % 100 !== 11 ? 0 : number % 10 >= 2 && (number % 100 < 10 || number % 100 >= 20) ? 1 : 2;
    case "sl":
      return number % 100 === 1 ? 0 : number % 100 === 2 ? 1 : number % 100 === 3 || number % 100 === 4 ? 2 : 3;
    case "mk":
      return number % 10 === 1 ? 0 : 1;
    case "mt":
      return number === 1 ? 0 : number === 0 || number % 100 > 1 && number % 100 < 11 ? 1 : number % 100 > 10 && number % 100 < 20 ? 2 : 3;
    case "lv":
      return number === 0 ? 0 : number % 10 === 1 && number % 100 !== 11 ? 1 : 2;
    case "pl":
      return number === 1 ? 0 : number % 10 >= 2 && number % 10 <= 4 && (number % 100 < 12 || number % 100 > 14) ? 1 : 2;
    case "cy":
      return number === 1 ? 0 : number === 2 ? 1 : number === 8 || number === 11 ? 2 : 3;
    case "ro":
      return number === 1 ? 0 : number === 0 || number % 100 > 0 && number % 100 < 20 ? 1 : 2;
    case "ar":
      return number === 0 ? 0 : number === 1 ? 1 : number === 2 ? 2 : number % 100 >= 3 && number % 100 <= 10 ? 3 : number % 100 >= 11 && number % 100 <= 99 ? 4 : 5;
    default:
      return 0;
  }
}
var define_process_env_default = {};
var DefaultType = /* @__PURE__ */ ((DefaultType2) => {
  DefaultType2["DEFAULT"] = "default";
  DefaultType2["HIDDEN"] = "hidden";
  return DefaultType2;
})(DefaultType || {});
class FileAction {
  _action;
  constructor(action) {
    this.validateAction(action);
    this._action = action;
  }
  get id() {
    return this._action.id;
  }
  get displayName() {
    return this._action.displayName;
  }
  get title() {
    return this._action.title;
  }
  get iconSvgInline() {
    return this._action.iconSvgInline;
  }
  get enabled() {
    return this._action.enabled;
  }
  get exec() {
    return this._action.exec;
  }
  get execBatch() {
    return this._action.execBatch;
  }
  get hotkey() {
    return this._action.hotkey;
  }
  get order() {
    return this._action.order;
  }
  get parent() {
    return this._action.parent;
  }
  get default() {
    return this._action.default;
  }
  get destructive() {
    return this._action.destructive;
  }
  get inline() {
    return this._action.inline;
  }
  get renderInline() {
    return this._action.renderInline;
  }
  validateAction(action) {
    if (!action.id || typeof action.id !== "string") {
      throw new Error("Invalid id");
    }
    if (!action.displayName || typeof action.displayName !== "function") {
      throw new Error("Invalid displayName function");
    }
    if ("title" in action && typeof action.title !== "function") {
      throw new Error("Invalid title function");
    }
    if (!action.iconSvgInline || typeof action.iconSvgInline !== "function") {
      throw new Error("Invalid iconSvgInline function");
    }
    if (!action.exec || typeof action.exec !== "function") {
      throw new Error("Invalid exec function");
    }
    if ("enabled" in action && typeof action.enabled !== "function") {
      throw new Error("Invalid enabled function");
    }
    if ("execBatch" in action && typeof action.execBatch !== "function") {
      throw new Error("Invalid execBatch function");
    }
    if ("order" in action && typeof action.order !== "number") {
      throw new Error("Invalid order");
    }
    if (action.destructive !== void 0 && typeof action.destructive !== "boolean") {
      throw new Error("Invalid destructive flag");
    }
    if ("parent" in action && typeof action.parent !== "string") {
      throw new Error("Invalid parent");
    }
    if (action.default && !Object.values(DefaultType).includes(action.default)) {
      throw new Error("Invalid default");
    }
    if ("inline" in action && typeof action.inline !== "function") {
      throw new Error("Invalid inline function");
    }
    if ("renderInline" in action && typeof action.renderInline !== "function") {
      throw new Error("Invalid renderInline function");
    }
    if ("hotkey" in action && action.hotkey !== void 0) {
      if (typeof action.hotkey !== "object") {
        throw new Error("Invalid hotkey configuration");
      }
      if (typeof action.hotkey.key !== "string" || !action.hotkey.key) {
        throw new Error("Missing or invalid hotkey key");
      }
      if (typeof action.hotkey.description !== "string" || !action.hotkey.description) {
        throw new Error("Missing or invalid hotkey description");
      }
    }
  }
}
const registerFileAction = function(action) {
  if (typeof window._nc_fileactions === "undefined") {
    window._nc_fileactions = [];
    logger.debug("FileActions initialized");
  }
  if (window._nc_fileactions.find((search) => search.id === action.id)) {
    logger.error(`FileAction ${action.id} already registered`, { action });
    return;
  }
  window._nc_fileactions.push(action);
};
var debug_1;
var hasRequiredDebug;
function requireDebug() {
  if (hasRequiredDebug) return debug_1;
  hasRequiredDebug = 1;
  const debug = typeof process$1 === "object" && define_process_env_default && define_process_env_default.NODE_DEBUG && /\bsemver\b/i.test(define_process_env_default.NODE_DEBUG) ? (...args) => console.error("SEMVER", ...args) : () => {
  };
  debug_1 = debug;
  return debug_1;
}
var constants;
var hasRequiredConstants;
function requireConstants() {
  if (hasRequiredConstants) return constants;
  hasRequiredConstants = 1;
  const SEMVER_SPEC_VERSION = "2.0.0";
  const MAX_LENGTH = 256;
  const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
  9007199254740991;
  const MAX_SAFE_COMPONENT_LENGTH = 16;
  const MAX_SAFE_BUILD_LENGTH = MAX_LENGTH - 6;
  const RELEASE_TYPES = [
    "major",
    "premajor",
    "minor",
    "preminor",
    "patch",
    "prepatch",
    "prerelease"
  ];
  constants = {
    MAX_LENGTH,
    MAX_SAFE_COMPONENT_LENGTH,
    MAX_SAFE_BUILD_LENGTH,
    MAX_SAFE_INTEGER,
    RELEASE_TYPES,
    SEMVER_SPEC_VERSION,
    FLAG_INCLUDE_PRERELEASE: 1,
    FLAG_LOOSE: 2
  };
  return constants;
}
var re$1 = { exports: {} };
var hasRequiredRe;
function requireRe() {
  if (hasRequiredRe) return re$1.exports;
  hasRequiredRe = 1;
  (function(module, exports) {
    const {
      MAX_SAFE_COMPONENT_LENGTH,
      MAX_SAFE_BUILD_LENGTH,
      MAX_LENGTH
    } = requireConstants();
    const debug = requireDebug();
    exports = module.exports = {};
    const re2 = exports.re = [];
    const safeRe = exports.safeRe = [];
    const src = exports.src = [];
    const safeSrc = exports.safeSrc = [];
    const t22 = exports.t = {};
    let R2 = 0;
    const LETTERDASHNUMBER = "[a-zA-Z0-9-]";
    const safeRegexReplacements = [
      ["\\s", 1],
      ["\\d", MAX_LENGTH],
      [LETTERDASHNUMBER, MAX_SAFE_BUILD_LENGTH]
    ];
    const makeSafeRegex = (value) => {
      for (const [token, max2] of safeRegexReplacements) {
        value = value.split(`${token}*`).join(`${token}{0,${max2}}`).split(`${token}+`).join(`${token}{1,${max2}}`);
      }
      return value;
    };
    const createToken = (name, value, isGlobal) => {
      const safe = makeSafeRegex(value);
      const index = R2++;
      debug(name, index, value);
      t22[name] = index;
      src[index] = value;
      safeSrc[index] = safe;
      re2[index] = new RegExp(value, isGlobal ? "g" : void 0);
      safeRe[index] = new RegExp(safe, isGlobal ? "g" : void 0);
    };
    createToken("NUMERICIDENTIFIER", "0|[1-9]\\d*");
    createToken("NUMERICIDENTIFIERLOOSE", "\\d+");
    createToken("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${LETTERDASHNUMBER}*`);
    createToken("MAINVERSION", `(${src[t22.NUMERICIDENTIFIER]})\\.(${src[t22.NUMERICIDENTIFIER]})\\.(${src[t22.NUMERICIDENTIFIER]})`);
    createToken("MAINVERSIONLOOSE", `(${src[t22.NUMERICIDENTIFIERLOOSE]})\\.(${src[t22.NUMERICIDENTIFIERLOOSE]})\\.(${src[t22.NUMERICIDENTIFIERLOOSE]})`);
    createToken("PRERELEASEIDENTIFIER", `(?:${src[t22.NONNUMERICIDENTIFIER]}|${src[t22.NUMERICIDENTIFIER]})`);
    createToken("PRERELEASEIDENTIFIERLOOSE", `(?:${src[t22.NONNUMERICIDENTIFIER]}|${src[t22.NUMERICIDENTIFIERLOOSE]})`);
    createToken("PRERELEASE", `(?:-(${src[t22.PRERELEASEIDENTIFIER]}(?:\\.${src[t22.PRERELEASEIDENTIFIER]})*))`);
    createToken("PRERELEASELOOSE", `(?:-?(${src[t22.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${src[t22.PRERELEASEIDENTIFIERLOOSE]})*))`);
    createToken("BUILDIDENTIFIER", `${LETTERDASHNUMBER}+`);
    createToken("BUILD", `(?:\\+(${src[t22.BUILDIDENTIFIER]}(?:\\.${src[t22.BUILDIDENTIFIER]})*))`);
    createToken("FULLPLAIN", `v?${src[t22.MAINVERSION]}${src[t22.PRERELEASE]}?${src[t22.BUILD]}?`);
    createToken("FULL", `^${src[t22.FULLPLAIN]}$`);
    createToken("LOOSEPLAIN", `[v=\\s]*${src[t22.MAINVERSIONLOOSE]}${src[t22.PRERELEASELOOSE]}?${src[t22.BUILD]}?`);
    createToken("LOOSE", `^${src[t22.LOOSEPLAIN]}$`);
    createToken("GTLT", "((?:<|>)?=?)");
    createToken("XRANGEIDENTIFIERLOOSE", `${src[t22.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`);
    createToken("XRANGEIDENTIFIER", `${src[t22.NUMERICIDENTIFIER]}|x|X|\\*`);
    createToken("XRANGEPLAIN", `[v=\\s]*(${src[t22.XRANGEIDENTIFIER]})(?:\\.(${src[t22.XRANGEIDENTIFIER]})(?:\\.(${src[t22.XRANGEIDENTIFIER]})(?:${src[t22.PRERELEASE]})?${src[t22.BUILD]}?)?)?`);
    createToken("XRANGEPLAINLOOSE", `[v=\\s]*(${src[t22.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t22.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t22.XRANGEIDENTIFIERLOOSE]})(?:${src[t22.PRERELEASELOOSE]})?${src[t22.BUILD]}?)?)?`);
    createToken("XRANGE", `^${src[t22.GTLT]}\\s*${src[t22.XRANGEPLAIN]}$`);
    createToken("XRANGELOOSE", `^${src[t22.GTLT]}\\s*${src[t22.XRANGEPLAINLOOSE]}$`);
    createToken("COERCEPLAIN", `${"(^|[^\\d])(\\d{1,"}${MAX_SAFE_COMPONENT_LENGTH}})(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?`);
    createToken("COERCE", `${src[t22.COERCEPLAIN]}(?:$|[^\\d])`);
    createToken("COERCEFULL", src[t22.COERCEPLAIN] + `(?:${src[t22.PRERELEASE]})?(?:${src[t22.BUILD]})?(?:$|[^\\d])`);
    createToken("COERCERTL", src[t22.COERCE], true);
    createToken("COERCERTLFULL", src[t22.COERCEFULL], true);
    createToken("LONETILDE", "(?:~>?)");
    createToken("TILDETRIM", `(\\s*)${src[t22.LONETILDE]}\\s+`, true);
    exports.tildeTrimReplace = "$1~";
    createToken("TILDE", `^${src[t22.LONETILDE]}${src[t22.XRANGEPLAIN]}$`);
    createToken("TILDELOOSE", `^${src[t22.LONETILDE]}${src[t22.XRANGEPLAINLOOSE]}$`);
    createToken("LONECARET", "(?:\\^)");
    createToken("CARETTRIM", `(\\s*)${src[t22.LONECARET]}\\s+`, true);
    exports.caretTrimReplace = "$1^";
    createToken("CARET", `^${src[t22.LONECARET]}${src[t22.XRANGEPLAIN]}$`);
    createToken("CARETLOOSE", `^${src[t22.LONECARET]}${src[t22.XRANGEPLAINLOOSE]}$`);
    createToken("COMPARATORLOOSE", `^${src[t22.GTLT]}\\s*(${src[t22.LOOSEPLAIN]})$|^$`);
    createToken("COMPARATOR", `^${src[t22.GTLT]}\\s*(${src[t22.FULLPLAIN]})$|^$`);
    createToken("COMPARATORTRIM", `(\\s*)${src[t22.GTLT]}\\s*(${src[t22.LOOSEPLAIN]}|${src[t22.XRANGEPLAIN]})`, true);
    exports.comparatorTrimReplace = "$1$2$3";
    createToken("HYPHENRANGE", `^\\s*(${src[t22.XRANGEPLAIN]})\\s+-\\s+(${src[t22.XRANGEPLAIN]})\\s*$`);
    createToken("HYPHENRANGELOOSE", `^\\s*(${src[t22.XRANGEPLAINLOOSE]})\\s+-\\s+(${src[t22.XRANGEPLAINLOOSE]})\\s*$`);
    createToken("STAR", "(<|>)?=?\\s*\\*");
    createToken("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$");
    createToken("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
  })(re$1, re$1.exports);
  return re$1.exports;
}
var parseOptions_1;
var hasRequiredParseOptions;
function requireParseOptions() {
  if (hasRequiredParseOptions) return parseOptions_1;
  hasRequiredParseOptions = 1;
  const looseOption = Object.freeze({ loose: true });
  const emptyOpts = Object.freeze({});
  const parseOptions = (options) => {
    if (!options) {
      return emptyOpts;
    }
    if (typeof options !== "object") {
      return looseOption;
    }
    return options;
  };
  parseOptions_1 = parseOptions;
  return parseOptions_1;
}
var identifiers;
var hasRequiredIdentifiers;
function requireIdentifiers() {
  if (hasRequiredIdentifiers) return identifiers;
  hasRequiredIdentifiers = 1;
  const numeric = /^[0-9]+$/;
  const compareIdentifiers = (a2, b2) => {
    if (typeof a2 === "number" && typeof b2 === "number") {
      return a2 === b2 ? 0 : a2 < b2 ? -1 : 1;
    }
    const anum = numeric.test(a2);
    const bnum = numeric.test(b2);
    if (anum && bnum) {
      a2 = +a2;
      b2 = +b2;
    }
    return a2 === b2 ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a2 < b2 ? -1 : 1;
  };
  const rcompareIdentifiers = (a2, b2) => compareIdentifiers(b2, a2);
  identifiers = {
    compareIdentifiers,
    rcompareIdentifiers
  };
  return identifiers;
}
var semver;
var hasRequiredSemver;
function requireSemver() {
  if (hasRequiredSemver) return semver;
  hasRequiredSemver = 1;
  const debug = requireDebug();
  const { MAX_LENGTH, MAX_SAFE_INTEGER } = requireConstants();
  const { safeRe: re2, t: t22 } = requireRe();
  const parseOptions = requireParseOptions();
  const { compareIdentifiers } = requireIdentifiers();
  class SemVer {
    constructor(version, options) {
      options = parseOptions(options);
      if (version instanceof SemVer) {
        if (version.loose === !!options.loose && version.includePrerelease === !!options.includePrerelease) {
          return version;
        } else {
          version = version.version;
        }
      } else if (typeof version !== "string") {
        throw new TypeError(`Invalid version. Must be a string. Got type "${typeof version}".`);
      }
      if (version.length > MAX_LENGTH) {
        throw new TypeError(
          `version is longer than ${MAX_LENGTH} characters`
        );
      }
      debug("SemVer", version, options);
      this.options = options;
      this.loose = !!options.loose;
      this.includePrerelease = !!options.includePrerelease;
      const m2 = version.trim().match(options.loose ? re2[t22.LOOSE] : re2[t22.FULL]);
      if (!m2) {
        throw new TypeError(`Invalid Version: ${version}`);
      }
      this.raw = version;
      this.major = +m2[1];
      this.minor = +m2[2];
      this.patch = +m2[3];
      if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
        throw new TypeError("Invalid major version");
      }
      if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
        throw new TypeError("Invalid minor version");
      }
      if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
        throw new TypeError("Invalid patch version");
      }
      if (!m2[4]) {
        this.prerelease = [];
      } else {
        this.prerelease = m2[4].split(".").map((id) => {
          if (/^[0-9]+$/.test(id)) {
            const num = +id;
            if (num >= 0 && num < MAX_SAFE_INTEGER) {
              return num;
            }
          }
          return id;
        });
      }
      this.build = m2[5] ? m2[5].split(".") : [];
      this.format();
    }
    format() {
      this.version = `${this.major}.${this.minor}.${this.patch}`;
      if (this.prerelease.length) {
        this.version += `-${this.prerelease.join(".")}`;
      }
      return this.version;
    }
    toString() {
      return this.version;
    }
    compare(other) {
      debug("SemVer.compare", this.version, this.options, other);
      if (!(other instanceof SemVer)) {
        if (typeof other === "string" && other === this.version) {
          return 0;
        }
        other = new SemVer(other, this.options);
      }
      if (other.version === this.version) {
        return 0;
      }
      return this.compareMain(other) || this.comparePre(other);
    }
    compareMain(other) {
      if (!(other instanceof SemVer)) {
        other = new SemVer(other, this.options);
      }
      if (this.major < other.major) {
        return -1;
      }
      if (this.major > other.major) {
        return 1;
      }
      if (this.minor < other.minor) {
        return -1;
      }
      if (this.minor > other.minor) {
        return 1;
      }
      if (this.patch < other.patch) {
        return -1;
      }
      if (this.patch > other.patch) {
        return 1;
      }
      return 0;
    }
    comparePre(other) {
      if (!(other instanceof SemVer)) {
        other = new SemVer(other, this.options);
      }
      if (this.prerelease.length && !other.prerelease.length) {
        return -1;
      } else if (!this.prerelease.length && other.prerelease.length) {
        return 1;
      } else if (!this.prerelease.length && !other.prerelease.length) {
        return 0;
      }
      let i2 = 0;
      do {
        const a2 = this.prerelease[i2];
        const b2 = other.prerelease[i2];
        debug("prerelease compare", i2, a2, b2);
        if (a2 === void 0 && b2 === void 0) {
          return 0;
        } else if (b2 === void 0) {
          return 1;
        } else if (a2 === void 0) {
          return -1;
        } else if (a2 === b2) {
          continue;
        } else {
          return compareIdentifiers(a2, b2);
        }
      } while (++i2);
    }
    compareBuild(other) {
      if (!(other instanceof SemVer)) {
        other = new SemVer(other, this.options);
      }
      let i2 = 0;
      do {
        const a2 = this.build[i2];
        const b2 = other.build[i2];
        debug("build compare", i2, a2, b2);
        if (a2 === void 0 && b2 === void 0) {
          return 0;
        } else if (b2 === void 0) {
          return 1;
        } else if (a2 === void 0) {
          return -1;
        } else if (a2 === b2) {
          continue;
        } else {
          return compareIdentifiers(a2, b2);
        }
      } while (++i2);
    }
    // preminor will bump the version up to the next minor release, and immediately
    // down to pre-release. premajor and prepatch work the same way.
    inc(release, identifier, identifierBase) {
      if (release.startsWith("pre")) {
        if (!identifier && identifierBase === false) {
          throw new Error("invalid increment argument: identifier is empty");
        }
        if (identifier) {
          const match = `-${identifier}`.match(this.options.loose ? re2[t22.PRERELEASELOOSE] : re2[t22.PRERELEASE]);
          if (!match || match[1] !== identifier) {
            throw new Error(`invalid identifier: ${identifier}`);
          }
        }
      }
      switch (release) {
        case "premajor":
          this.prerelease.length = 0;
          this.patch = 0;
          this.minor = 0;
          this.major++;
          this.inc("pre", identifier, identifierBase);
          break;
        case "preminor":
          this.prerelease.length = 0;
          this.patch = 0;
          this.minor++;
          this.inc("pre", identifier, identifierBase);
          break;
        case "prepatch":
          this.prerelease.length = 0;
          this.inc("patch", identifier, identifierBase);
          this.inc("pre", identifier, identifierBase);
          break;
        // If the input is a non-prerelease version, this acts the same as
        // prepatch.
        case "prerelease":
          if (this.prerelease.length === 0) {
            this.inc("patch", identifier, identifierBase);
          }
          this.inc("pre", identifier, identifierBase);
          break;
        case "release":
          if (this.prerelease.length === 0) {
            throw new Error(`version ${this.raw} is not a prerelease`);
          }
          this.prerelease.length = 0;
          break;
        case "major":
          if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) {
            this.major++;
          }
          this.minor = 0;
          this.patch = 0;
          this.prerelease = [];
          break;
        case "minor":
          if (this.patch !== 0 || this.prerelease.length === 0) {
            this.minor++;
          }
          this.patch = 0;
          this.prerelease = [];
          break;
        case "patch":
          if (this.prerelease.length === 0) {
            this.patch++;
          }
          this.prerelease = [];
          break;
        // This probably shouldn't be used publicly.
        // 1.0.0 'pre' would become 1.0.0-0 which is the wrong direction.
        case "pre": {
          const base = Number(identifierBase) ? 1 : 0;
          if (this.prerelease.length === 0) {
            this.prerelease = [base];
          } else {
            let i2 = this.prerelease.length;
            while (--i2 >= 0) {
              if (typeof this.prerelease[i2] === "number") {
                this.prerelease[i2]++;
                i2 = -2;
              }
            }
            if (i2 === -1) {
              if (identifier === this.prerelease.join(".") && identifierBase === false) {
                throw new Error("invalid increment argument: identifier already exists");
              }
              this.prerelease.push(base);
            }
          }
          if (identifier) {
            let prerelease = [identifier, base];
            if (identifierBase === false) {
              prerelease = [identifier];
            }
            if (compareIdentifiers(this.prerelease[0], identifier) === 0) {
              if (isNaN(this.prerelease[1])) {
                this.prerelease = prerelease;
              }
            } else {
              this.prerelease = prerelease;
            }
          }
          break;
        }
        default:
          throw new Error(`invalid increment argument: ${release}`);
      }
      this.raw = this.format();
      if (this.build.length) {
        this.raw += `+${this.build.join(".")}`;
      }
      return this;
    }
  }
  semver = SemVer;
  return semver;
}
var major_1;
var hasRequiredMajor;
function requireMajor() {
  if (hasRequiredMajor) return major_1;
  hasRequiredMajor = 1;
  const SemVer = requireSemver();
  const major2 = (a2, loose) => new SemVer(a2, loose).major;
  major_1 = major2;
  return major_1;
}
requireMajor();
var parse_1;
var hasRequiredParse;
function requireParse() {
  if (hasRequiredParse) return parse_1;
  hasRequiredParse = 1;
  const SemVer = requireSemver();
  const parse = (version, options, throwErrors = false) => {
    if (version instanceof SemVer) {
      return version;
    }
    try {
      return new SemVer(version, options);
    } catch (er) {
      if (!throwErrors) {
        return null;
      }
      throw er;
    }
  };
  parse_1 = parse;
  return parse_1;
}
var valid_1;
var hasRequiredValid;
function requireValid() {
  if (hasRequiredValid) return valid_1;
  hasRequiredValid = 1;
  const parse = requireParse();
  const valid2 = (version, options) => {
    const v2 = parse(version, options);
    return v2 ? v2.version : null;
  };
  valid_1 = valid2;
  return valid_1;
}
requireValid();
var sax$1 = {};
var hasRequiredSax;
function requireSax() {
  if (hasRequiredSax) return sax$1;
  hasRequiredSax = 1;
  (function(exports) {
    (function(sax2) {
      sax2.parser = function(strict, opt) {
        return new SAXParser(strict, opt);
      };
      sax2.SAXParser = SAXParser;
      sax2.SAXStream = SAXStream;
      sax2.createStream = createStream;
      sax2.MAX_BUFFER_LENGTH = 64 * 1024;
      var buffers = [
        "comment",
        "sgmlDecl",
        "textNode",
        "tagName",
        "doctype",
        "procInstName",
        "procInstBody",
        "entity",
        "attribName",
        "attribValue",
        "cdata",
        "script"
      ];
      sax2.EVENTS = [
        "text",
        "processinginstruction",
        "sgmldeclaration",
        "doctype",
        "comment",
        "opentagstart",
        "attribute",
        "opentag",
        "closetag",
        "opencdata",
        "cdata",
        "closecdata",
        "error",
        "end",
        "ready",
        "script",
        "opennamespace",
        "closenamespace"
      ];
      function SAXParser(strict, opt) {
        if (!(this instanceof SAXParser)) {
          return new SAXParser(strict, opt);
        }
        var parser = this;
        clearBuffers(parser);
        parser.q = parser.c = "";
        parser.bufferCheckPosition = sax2.MAX_BUFFER_LENGTH;
        parser.opt = opt || {};
        parser.opt.lowercase = parser.opt.lowercase || parser.opt.lowercasetags;
        parser.looseCase = parser.opt.lowercase ? "toLowerCase" : "toUpperCase";
        parser.tags = [];
        parser.closed = parser.closedRoot = parser.sawRoot = false;
        parser.tag = parser.error = null;
        parser.strict = !!strict;
        parser.noscript = !!(strict || parser.opt.noscript);
        parser.state = S2.BEGIN;
        parser.strictEntities = parser.opt.strictEntities;
        parser.ENTITIES = parser.strictEntities ? Object.create(sax2.XML_ENTITIES) : Object.create(sax2.ENTITIES);
        parser.attribList = [];
        if (parser.opt.xmlns) {
          parser.ns = Object.create(rootNS);
        }
        if (parser.opt.unquotedAttributeValues === void 0) {
          parser.opt.unquotedAttributeValues = !strict;
        }
        parser.trackPosition = parser.opt.position !== false;
        if (parser.trackPosition) {
          parser.position = parser.line = parser.column = 0;
        }
        emit2(parser, "onready");
      }
      if (!Object.create) {
        Object.create = function(o2) {
          function F2() {
          }
          F2.prototype = o2;
          var newf = new F2();
          return newf;
        };
      }
      if (!Object.keys) {
        Object.keys = function(o2) {
          var a2 = [];
          for (var i2 in o2) if (o2.hasOwnProperty(i2)) a2.push(i2);
          return a2;
        };
      }
      function checkBufferLength(parser) {
        var maxAllowed = Math.max(sax2.MAX_BUFFER_LENGTH, 10);
        var maxActual = 0;
        for (var i2 = 0, l2 = buffers.length; i2 < l2; i2++) {
          var len2 = parser[buffers[i2]].length;
          if (len2 > maxAllowed) {
            switch (buffers[i2]) {
              case "textNode":
                closeText(parser);
                break;
              case "cdata":
                emitNode(parser, "oncdata", parser.cdata);
                parser.cdata = "";
                break;
              case "script":
                emitNode(parser, "onscript", parser.script);
                parser.script = "";
                break;
              default:
                error(parser, "Max buffer length exceeded: " + buffers[i2]);
            }
          }
          maxActual = Math.max(maxActual, len2);
        }
        var m2 = sax2.MAX_BUFFER_LENGTH - maxActual;
        parser.bufferCheckPosition = m2 + parser.position;
      }
      function clearBuffers(parser) {
        for (var i2 = 0, l2 = buffers.length; i2 < l2; i2++) {
          parser[buffers[i2]] = "";
        }
      }
      function flushBuffers(parser) {
        closeText(parser);
        if (parser.cdata !== "") {
          emitNode(parser, "oncdata", parser.cdata);
          parser.cdata = "";
        }
        if (parser.script !== "") {
          emitNode(parser, "onscript", parser.script);
          parser.script = "";
        }
      }
      SAXParser.prototype = {
        end: function() {
          end(this);
        },
        write,
        resume: function() {
          this.error = null;
          return this;
        },
        close: function() {
          return this.write(null);
        },
        flush: function() {
          flushBuffers(this);
        }
      };
      var Stream;
      try {
        Stream = require("stream").Stream;
      } catch (ex) {
        Stream = function() {
        };
      }
      if (!Stream) Stream = function() {
      };
      var streamWraps = sax2.EVENTS.filter(function(ev) {
        return ev !== "error" && ev !== "end";
      });
      function createStream(strict, opt) {
        return new SAXStream(strict, opt);
      }
      function SAXStream(strict, opt) {
        if (!(this instanceof SAXStream)) {
          return new SAXStream(strict, opt);
        }
        Stream.apply(this);
        this._parser = new SAXParser(strict, opt);
        this.writable = true;
        this.readable = true;
        var me = this;
        this._parser.onend = function() {
          me.emit("end");
        };
        this._parser.onerror = function(er) {
          me.emit("error", er);
          me._parser.error = null;
        };
        this._decoder = null;
        streamWraps.forEach(function(ev) {
          Object.defineProperty(me, "on" + ev, {
            get: function() {
              return me._parser["on" + ev];
            },
            set: function(h2) {
              if (!h2) {
                me.removeAllListeners(ev);
                me._parser["on" + ev] = h2;
                return h2;
              }
              me.on(ev, h2);
            },
            enumerable: true,
            configurable: false
          });
        });
      }
      SAXStream.prototype = Object.create(Stream.prototype, {
        constructor: {
          value: SAXStream
        }
      });
      SAXStream.prototype.write = function(data) {
        if (typeof Buffer === "function" && typeof Buffer.isBuffer === "function" && Buffer.isBuffer(data)) {
          if (!this._decoder) {
            var SD = require$$1.StringDecoder;
            this._decoder = new SD("utf8");
          }
          data = this._decoder.write(data);
        }
        this._parser.write(data.toString());
        this.emit("data", data);
        return true;
      };
      SAXStream.prototype.end = function(chunk) {
        if (chunk && chunk.length) {
          this.write(chunk);
        }
        this._parser.end();
        return true;
      };
      SAXStream.prototype.on = function(ev, handler) {
        var me = this;
        if (!me._parser["on" + ev] && streamWraps.indexOf(ev) !== -1) {
          me._parser["on" + ev] = function() {
            var args = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
            args.splice(0, 0, ev);
            me.emit.apply(me, args);
          };
        }
        return Stream.prototype.on.call(me, ev, handler);
      };
      var CDATA = "[CDATA[";
      var DOCTYPE = "DOCTYPE";
      var XML_NAMESPACE = "http://www.w3.org/XML/1998/namespace";
      var XMLNS_NAMESPACE = "http://www.w3.org/2000/xmlns/";
      var rootNS = { xml: XML_NAMESPACE, xmlns: XMLNS_NAMESPACE };
      var nameStart = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/;
      var nameBody = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;
      var entityStart = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/;
      var entityBody = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;
      function isWhitespace(c2) {
        return c2 === " " || c2 === "\n" || c2 === "\r" || c2 === "	";
      }
      function isQuote(c2) {
        return c2 === '"' || c2 === "'";
      }
      function isAttribEnd(c2) {
        return c2 === ">" || isWhitespace(c2);
      }
      function isMatch(regex, c2) {
        return regex.test(c2);
      }
      function notMatch(regex, c2) {
        return !isMatch(regex, c2);
      }
      var S2 = 0;
      sax2.STATE = {
        BEGIN: S2++,
        // leading byte order mark or whitespace
        BEGIN_WHITESPACE: S2++,
        // leading whitespace
        TEXT: S2++,
        // general stuff
        TEXT_ENTITY: S2++,
        // &amp and such.
        OPEN_WAKA: S2++,
        // <
        SGML_DECL: S2++,
        // <!BLARG
        SGML_DECL_QUOTED: S2++,
        // <!BLARG foo "bar
        DOCTYPE: S2++,
        // <!DOCTYPE
        DOCTYPE_QUOTED: S2++,
        // <!DOCTYPE "//blah
        DOCTYPE_DTD: S2++,
        // <!DOCTYPE "//blah" [ ...
        DOCTYPE_DTD_QUOTED: S2++,
        // <!DOCTYPE "//blah" [ "foo
        COMMENT_STARTING: S2++,
        // <!-
        COMMENT: S2++,
        // <!--
        COMMENT_ENDING: S2++,
        // <!-- blah -
        COMMENT_ENDED: S2++,
        // <!-- blah --
        CDATA: S2++,
        // <![CDATA[ something
        CDATA_ENDING: S2++,
        // ]
        CDATA_ENDING_2: S2++,
        // ]]
        PROC_INST: S2++,
        // <?hi
        PROC_INST_BODY: S2++,
        // <?hi there
        PROC_INST_ENDING: S2++,
        // <?hi "there" ?
        OPEN_TAG: S2++,
        // <strong
        OPEN_TAG_SLASH: S2++,
        // <strong /
        ATTRIB: S2++,
        // <a
        ATTRIB_NAME: S2++,
        // <a foo
        ATTRIB_NAME_SAW_WHITE: S2++,
        // <a foo _
        ATTRIB_VALUE: S2++,
        // <a foo=
        ATTRIB_VALUE_QUOTED: S2++,
        // <a foo="bar
        ATTRIB_VALUE_CLOSED: S2++,
        // <a foo="bar"
        ATTRIB_VALUE_UNQUOTED: S2++,
        // <a foo=bar
        ATTRIB_VALUE_ENTITY_Q: S2++,
        // <foo bar="&quot;"
        ATTRIB_VALUE_ENTITY_U: S2++,
        // <foo bar=&quot
        CLOSE_TAG: S2++,
        // </a
        CLOSE_TAG_SAW_WHITE: S2++,
        // </a   >
        SCRIPT: S2++,
        // <script> ...
        SCRIPT_ENDING: S2++
        // <script> ... <
      };
      sax2.XML_ENTITIES = {
        "amp": "&",
        "gt": ">",
        "lt": "<",
        "quot": '"',
        "apos": "'"
      };
      sax2.ENTITIES = {
        "amp": "&",
        "gt": ">",
        "lt": "<",
        "quot": '"',
        "apos": "'",
        "AElig": 198,
        "Aacute": 193,
        "Acirc": 194,
        "Agrave": 192,
        "Aring": 197,
        "Atilde": 195,
        "Auml": 196,
        "Ccedil": 199,
        "ETH": 208,
        "Eacute": 201,
        "Ecirc": 202,
        "Egrave": 200,
        "Euml": 203,
        "Iacute": 205,
        "Icirc": 206,
        "Igrave": 204,
        "Iuml": 207,
        "Ntilde": 209,
        "Oacute": 211,
        "Ocirc": 212,
        "Ograve": 210,
        "Oslash": 216,
        "Otilde": 213,
        "Ouml": 214,
        "THORN": 222,
        "Uacute": 218,
        "Ucirc": 219,
        "Ugrave": 217,
        "Uuml": 220,
        "Yacute": 221,
        "aacute": 225,
        "acirc": 226,
        "aelig": 230,
        "agrave": 224,
        "aring": 229,
        "atilde": 227,
        "auml": 228,
        "ccedil": 231,
        "eacute": 233,
        "ecirc": 234,
        "egrave": 232,
        "eth": 240,
        "euml": 235,
        "iacute": 237,
        "icirc": 238,
        "igrave": 236,
        "iuml": 239,
        "ntilde": 241,
        "oacute": 243,
        "ocirc": 244,
        "ograve": 242,
        "oslash": 248,
        "otilde": 245,
        "ouml": 246,
        "szlig": 223,
        "thorn": 254,
        "uacute": 250,
        "ucirc": 251,
        "ugrave": 249,
        "uuml": 252,
        "yacute": 253,
        "yuml": 255,
        "copy": 169,
        "reg": 174,
        "nbsp": 160,
        "iexcl": 161,
        "cent": 162,
        "pound": 163,
        "curren": 164,
        "yen": 165,
        "brvbar": 166,
        "sect": 167,
        "uml": 168,
        "ordf": 170,
        "laquo": 171,
        "not": 172,
        "shy": 173,
        "macr": 175,
        "deg": 176,
        "plusmn": 177,
        "sup1": 185,
        "sup2": 178,
        "sup3": 179,
        "acute": 180,
        "micro": 181,
        "para": 182,
        "middot": 183,
        "cedil": 184,
        "ordm": 186,
        "raquo": 187,
        "frac14": 188,
        "frac12": 189,
        "frac34": 190,
        "iquest": 191,
        "times": 215,
        "divide": 247,
        "OElig": 338,
        "oelig": 339,
        "Scaron": 352,
        "scaron": 353,
        "Yuml": 376,
        "fnof": 402,
        "circ": 710,
        "tilde": 732,
        "Alpha": 913,
        "Beta": 914,
        "Gamma": 915,
        "Delta": 916,
        "Epsilon": 917,
        "Zeta": 918,
        "Eta": 919,
        "Theta": 920,
        "Iota": 921,
        "Kappa": 922,
        "Lambda": 923,
        "Mu": 924,
        "Nu": 925,
        "Xi": 926,
        "Omicron": 927,
        "Pi": 928,
        "Rho": 929,
        "Sigma": 931,
        "Tau": 932,
        "Upsilon": 933,
        "Phi": 934,
        "Chi": 935,
        "Psi": 936,
        "Omega": 937,
        "alpha": 945,
        "beta": 946,
        "gamma": 947,
        "delta": 948,
        "epsilon": 949,
        "zeta": 950,
        "eta": 951,
        "theta": 952,
        "iota": 953,
        "kappa": 954,
        "lambda": 955,
        "mu": 956,
        "nu": 957,
        "xi": 958,
        "omicron": 959,
        "pi": 960,
        "rho": 961,
        "sigmaf": 962,
        "sigma": 963,
        "tau": 964,
        "upsilon": 965,
        "phi": 966,
        "chi": 967,
        "psi": 968,
        "omega": 969,
        "thetasym": 977,
        "upsih": 978,
        "piv": 982,
        "ensp": 8194,
        "emsp": 8195,
        "thinsp": 8201,
        "zwnj": 8204,
        "zwj": 8205,
        "lrm": 8206,
        "rlm": 8207,
        "ndash": 8211,
        "mdash": 8212,
        "lsquo": 8216,
        "rsquo": 8217,
        "sbquo": 8218,
        "ldquo": 8220,
        "rdquo": 8221,
        "bdquo": 8222,
        "dagger": 8224,
        "Dagger": 8225,
        "bull": 8226,
        "hellip": 8230,
        "permil": 8240,
        "prime": 8242,
        "Prime": 8243,
        "lsaquo": 8249,
        "rsaquo": 8250,
        "oline": 8254,
        "frasl": 8260,
        "euro": 8364,
        "image": 8465,
        "weierp": 8472,
        "real": 8476,
        "trade": 8482,
        "alefsym": 8501,
        "larr": 8592,
        "uarr": 8593,
        "rarr": 8594,
        "darr": 8595,
        "harr": 8596,
        "crarr": 8629,
        "lArr": 8656,
        "uArr": 8657,
        "rArr": 8658,
        "dArr": 8659,
        "hArr": 8660,
        "forall": 8704,
        "part": 8706,
        "exist": 8707,
        "empty": 8709,
        "nabla": 8711,
        "isin": 8712,
        "notin": 8713,
        "ni": 8715,
        "prod": 8719,
        "sum": 8721,
        "minus": 8722,
        "lowast": 8727,
        "radic": 8730,
        "prop": 8733,
        "infin": 8734,
        "ang": 8736,
        "and": 8743,
        "or": 8744,
        "cap": 8745,
        "cup": 8746,
        "int": 8747,
        "there4": 8756,
        "sim": 8764,
        "cong": 8773,
        "asymp": 8776,
        "ne": 8800,
        "equiv": 8801,
        "le": 8804,
        "ge": 8805,
        "sub": 8834,
        "sup": 8835,
        "nsub": 8836,
        "sube": 8838,
        "supe": 8839,
        "oplus": 8853,
        "otimes": 8855,
        "perp": 8869,
        "sdot": 8901,
        "lceil": 8968,
        "rceil": 8969,
        "lfloor": 8970,
        "rfloor": 8971,
        "lang": 9001,
        "rang": 9002,
        "loz": 9674,
        "spades": 9824,
        "clubs": 9827,
        "hearts": 9829,
        "diams": 9830
      };
      Object.keys(sax2.ENTITIES).forEach(function(key) {
        var e2 = sax2.ENTITIES[key];
        var s3 = typeof e2 === "number" ? String.fromCharCode(e2) : e2;
        sax2.ENTITIES[key] = s3;
      });
      for (var s2 in sax2.STATE) {
        sax2.STATE[sax2.STATE[s2]] = s2;
      }
      S2 = sax2.STATE;
      function emit2(parser, event, data) {
        parser[event] && parser[event](data);
      }
      function emitNode(parser, nodeType, data) {
        if (parser.textNode) closeText(parser);
        emit2(parser, nodeType, data);
      }
      function closeText(parser) {
        parser.textNode = textopts(parser.opt, parser.textNode);
        if (parser.textNode) emit2(parser, "ontext", parser.textNode);
        parser.textNode = "";
      }
      function textopts(opt, text2) {
        if (opt.trim) text2 = text2.trim();
        if (opt.normalize) text2 = text2.replace(/\s+/g, " ");
        return text2;
      }
      function error(parser, er) {
        closeText(parser);
        if (parser.trackPosition) {
          er += "\nLine: " + parser.line + "\nColumn: " + parser.column + "\nChar: " + parser.c;
        }
        er = new Error(er);
        parser.error = er;
        emit2(parser, "onerror", er);
        return parser;
      }
      function end(parser) {
        if (parser.sawRoot && !parser.closedRoot) strictFail(parser, "Unclosed root tag");
        if (parser.state !== S2.BEGIN && parser.state !== S2.BEGIN_WHITESPACE && parser.state !== S2.TEXT) {
          error(parser, "Unexpected end");
        }
        closeText(parser);
        parser.c = "";
        parser.closed = true;
        emit2(parser, "onend");
        SAXParser.call(parser, parser.strict, parser.opt);
        return parser;
      }
      function strictFail(parser, message) {
        if (typeof parser !== "object" || !(parser instanceof SAXParser)) {
          throw new Error("bad call to strictFail");
        }
        if (parser.strict) {
          error(parser, message);
        }
      }
      function newTag(parser) {
        if (!parser.strict) parser.tagName = parser.tagName[parser.looseCase]();
        var parent = parser.tags[parser.tags.length - 1] || parser;
        var tag = parser.tag = { name: parser.tagName, attributes: {} };
        if (parser.opt.xmlns) {
          tag.ns = parent.ns;
        }
        parser.attribList.length = 0;
        emitNode(parser, "onopentagstart", tag);
      }
      function qname(name, attribute) {
        var i2 = name.indexOf(":");
        var qualName = i2 < 0 ? ["", name] : name.split(":");
        var prefix = qualName[0];
        var local = qualName[1];
        if (attribute && name === "xmlns") {
          prefix = "xmlns";
          local = "";
        }
        return { prefix, local };
      }
      function attrib(parser) {
        if (!parser.strict) {
          parser.attribName = parser.attribName[parser.looseCase]();
        }
        if (parser.attribList.indexOf(parser.attribName) !== -1 || parser.tag.attributes.hasOwnProperty(parser.attribName)) {
          parser.attribName = parser.attribValue = "";
          return;
        }
        if (parser.opt.xmlns) {
          var qn2 = qname(parser.attribName, true);
          var prefix = qn2.prefix;
          var local = qn2.local;
          if (prefix === "xmlns") {
            if (local === "xml" && parser.attribValue !== XML_NAMESPACE) {
              strictFail(
                parser,
                "xml: prefix must be bound to " + XML_NAMESPACE + "\nActual: " + parser.attribValue
              );
            } else if (local === "xmlns" && parser.attribValue !== XMLNS_NAMESPACE) {
              strictFail(
                parser,
                "xmlns: prefix must be bound to " + XMLNS_NAMESPACE + "\nActual: " + parser.attribValue
              );
            } else {
              var tag = parser.tag;
              var parent = parser.tags[parser.tags.length - 1] || parser;
              if (tag.ns === parent.ns) {
                tag.ns = Object.create(parent.ns);
              }
              tag.ns[local] = parser.attribValue;
            }
          }
          parser.attribList.push([parser.attribName, parser.attribValue]);
        } else {
          parser.tag.attributes[parser.attribName] = parser.attribValue;
          emitNode(parser, "onattribute", {
            name: parser.attribName,
            value: parser.attribValue
          });
        }
        parser.attribName = parser.attribValue = "";
      }
      function openTag(parser, selfClosing) {
        if (parser.opt.xmlns) {
          var tag = parser.tag;
          var qn2 = qname(parser.tagName);
          tag.prefix = qn2.prefix;
          tag.local = qn2.local;
          tag.uri = tag.ns[qn2.prefix] || "";
          if (tag.prefix && !tag.uri) {
            strictFail(parser, "Unbound namespace prefix: " + JSON.stringify(parser.tagName));
            tag.uri = qn2.prefix;
          }
          var parent = parser.tags[parser.tags.length - 1] || parser;
          if (tag.ns && parent.ns !== tag.ns) {
            Object.keys(tag.ns).forEach(function(p2) {
              emitNode(parser, "onopennamespace", {
                prefix: p2,
                uri: tag.ns[p2]
              });
            });
          }
          for (var i2 = 0, l2 = parser.attribList.length; i2 < l2; i2++) {
            var nv = parser.attribList[i2];
            var name = nv[0];
            var value = nv[1];
            var qualName = qname(name, true);
            var prefix = qualName.prefix;
            var local = qualName.local;
            var uri = prefix === "" ? "" : tag.ns[prefix] || "";
            var a2 = {
              name,
              value,
              prefix,
              local,
              uri
            };
            if (prefix && prefix !== "xmlns" && !uri) {
              strictFail(parser, "Unbound namespace prefix: " + JSON.stringify(prefix));
              a2.uri = prefix;
            }
            parser.tag.attributes[name] = a2;
            emitNode(parser, "onattribute", a2);
          }
          parser.attribList.length = 0;
        }
        parser.tag.isSelfClosing = !!selfClosing;
        parser.sawRoot = true;
        parser.tags.push(parser.tag);
        emitNode(parser, "onopentag", parser.tag);
        if (!selfClosing) {
          if (!parser.noscript && parser.tagName.toLowerCase() === "script") {
            parser.state = S2.SCRIPT;
          } else {
            parser.state = S2.TEXT;
          }
          parser.tag = null;
          parser.tagName = "";
        }
        parser.attribName = parser.attribValue = "";
        parser.attribList.length = 0;
      }
      function closeTag(parser) {
        if (!parser.tagName) {
          strictFail(parser, "Weird empty close tag.");
          parser.textNode += "</>";
          parser.state = S2.TEXT;
          return;
        }
        if (parser.script) {
          if (parser.tagName !== "script") {
            parser.script += "</" + parser.tagName + ">";
            parser.tagName = "";
            parser.state = S2.SCRIPT;
            return;
          }
          emitNode(parser, "onscript", parser.script);
          parser.script = "";
        }
        var t22 = parser.tags.length;
        var tagName = parser.tagName;
        if (!parser.strict) {
          tagName = tagName[parser.looseCase]();
        }
        var closeTo = tagName;
        while (t22--) {
          var close = parser.tags[t22];
          if (close.name !== closeTo) {
            strictFail(parser, "Unexpected close tag");
          } else {
            break;
          }
        }
        if (t22 < 0) {
          strictFail(parser, "Unmatched closing tag: " + parser.tagName);
          parser.textNode += "</" + parser.tagName + ">";
          parser.state = S2.TEXT;
          return;
        }
        parser.tagName = tagName;
        var s3 = parser.tags.length;
        while (s3-- > t22) {
          var tag = parser.tag = parser.tags.pop();
          parser.tagName = parser.tag.name;
          emitNode(parser, "onclosetag", parser.tagName);
          var x2 = {};
          for (var i2 in tag.ns) {
            x2[i2] = tag.ns[i2];
          }
          var parent = parser.tags[parser.tags.length - 1] || parser;
          if (parser.opt.xmlns && tag.ns !== parent.ns) {
            Object.keys(tag.ns).forEach(function(p2) {
              var n2 = tag.ns[p2];
              emitNode(parser, "onclosenamespace", { prefix: p2, uri: n2 });
            });
          }
        }
        if (t22 === 0) parser.closedRoot = true;
        parser.tagName = parser.attribValue = parser.attribName = "";
        parser.attribList.length = 0;
        parser.state = S2.TEXT;
      }
      function parseEntity(parser) {
        var entity = parser.entity;
        var entityLC = entity.toLowerCase();
        var num;
        var numStr = "";
        if (parser.ENTITIES[entity]) {
          return parser.ENTITIES[entity];
        }
        if (parser.ENTITIES[entityLC]) {
          return parser.ENTITIES[entityLC];
        }
        entity = entityLC;
        if (entity.charAt(0) === "#") {
          if (entity.charAt(1) === "x") {
            entity = entity.slice(2);
            num = parseInt(entity, 16);
            numStr = num.toString(16);
          } else {
            entity = entity.slice(1);
            num = parseInt(entity, 10);
            numStr = num.toString(10);
          }
        }
        entity = entity.replace(/^0+/, "");
        if (isNaN(num) || numStr.toLowerCase() !== entity) {
          strictFail(parser, "Invalid character entity");
          return "&" + parser.entity + ";";
        }
        return String.fromCodePoint(num);
      }
      function beginWhiteSpace(parser, c2) {
        if (c2 === "<") {
          parser.state = S2.OPEN_WAKA;
          parser.startTagPosition = parser.position;
        } else if (!isWhitespace(c2)) {
          strictFail(parser, "Non-whitespace before first tag.");
          parser.textNode = c2;
          parser.state = S2.TEXT;
        }
      }
      function charAt(chunk, i2) {
        var result = "";
        if (i2 < chunk.length) {
          result = chunk.charAt(i2);
        }
        return result;
      }
      function write(chunk) {
        var parser = this;
        if (this.error) {
          throw this.error;
        }
        if (parser.closed) {
          return error(
            parser,
            "Cannot write after close. Assign an onready handler."
          );
        }
        if (chunk === null) {
          return end(parser);
        }
        if (typeof chunk === "object") {
          chunk = chunk.toString();
        }
        var i2 = 0;
        var c2 = "";
        while (true) {
          c2 = charAt(chunk, i2++);
          parser.c = c2;
          if (!c2) {
            break;
          }
          if (parser.trackPosition) {
            parser.position++;
            if (c2 === "\n") {
              parser.line++;
              parser.column = 0;
            } else {
              parser.column++;
            }
          }
          switch (parser.state) {
            case S2.BEGIN:
              parser.state = S2.BEGIN_WHITESPACE;
              if (c2 === "\uFEFF") {
                continue;
              }
              beginWhiteSpace(parser, c2);
              continue;
            case S2.BEGIN_WHITESPACE:
              beginWhiteSpace(parser, c2);
              continue;
            case S2.TEXT:
              if (parser.sawRoot && !parser.closedRoot) {
                var starti = i2 - 1;
                while (c2 && c2 !== "<" && c2 !== "&") {
                  c2 = charAt(chunk, i2++);
                  if (c2 && parser.trackPosition) {
                    parser.position++;
                    if (c2 === "\n") {
                      parser.line++;
                      parser.column = 0;
                    } else {
                      parser.column++;
                    }
                  }
                }
                parser.textNode += chunk.substring(starti, i2 - 1);
              }
              if (c2 === "<" && !(parser.sawRoot && parser.closedRoot && !parser.strict)) {
                parser.state = S2.OPEN_WAKA;
                parser.startTagPosition = parser.position;
              } else {
                if (!isWhitespace(c2) && (!parser.sawRoot || parser.closedRoot)) {
                  strictFail(parser, "Text data outside of root node.");
                }
                if (c2 === "&") {
                  parser.state = S2.TEXT_ENTITY;
                } else {
                  parser.textNode += c2;
                }
              }
              continue;
            case S2.SCRIPT:
              if (c2 === "<") {
                parser.state = S2.SCRIPT_ENDING;
              } else {
                parser.script += c2;
              }
              continue;
            case S2.SCRIPT_ENDING:
              if (c2 === "/") {
                parser.state = S2.CLOSE_TAG;
              } else {
                parser.script += "<" + c2;
                parser.state = S2.SCRIPT;
              }
              continue;
            case S2.OPEN_WAKA:
              if (c2 === "!") {
                parser.state = S2.SGML_DECL;
                parser.sgmlDecl = "";
              } else if (isWhitespace(c2)) ;
              else if (isMatch(nameStart, c2)) {
                parser.state = S2.OPEN_TAG;
                parser.tagName = c2;
              } else if (c2 === "/") {
                parser.state = S2.CLOSE_TAG;
                parser.tagName = "";
              } else if (c2 === "?") {
                parser.state = S2.PROC_INST;
                parser.procInstName = parser.procInstBody = "";
              } else {
                strictFail(parser, "Unencoded <");
                if (parser.startTagPosition + 1 < parser.position) {
                  var pad = parser.position - parser.startTagPosition;
                  c2 = new Array(pad).join(" ") + c2;
                }
                parser.textNode += "<" + c2;
                parser.state = S2.TEXT;
              }
              continue;
            case S2.SGML_DECL:
              if (parser.sgmlDecl + c2 === "--") {
                parser.state = S2.COMMENT;
                parser.comment = "";
                parser.sgmlDecl = "";
                continue;
              }
              if (parser.doctype && parser.doctype !== true && parser.sgmlDecl) {
                parser.state = S2.DOCTYPE_DTD;
                parser.doctype += "<!" + parser.sgmlDecl + c2;
                parser.sgmlDecl = "";
              } else if ((parser.sgmlDecl + c2).toUpperCase() === CDATA) {
                emitNode(parser, "onopencdata");
                parser.state = S2.CDATA;
                parser.sgmlDecl = "";
                parser.cdata = "";
              } else if ((parser.sgmlDecl + c2).toUpperCase() === DOCTYPE) {
                parser.state = S2.DOCTYPE;
                if (parser.doctype || parser.sawRoot) {
                  strictFail(
                    parser,
                    "Inappropriately located doctype declaration"
                  );
                }
                parser.doctype = "";
                parser.sgmlDecl = "";
              } else if (c2 === ">") {
                emitNode(parser, "onsgmldeclaration", parser.sgmlDecl);
                parser.sgmlDecl = "";
                parser.state = S2.TEXT;
              } else if (isQuote(c2)) {
                parser.state = S2.SGML_DECL_QUOTED;
                parser.sgmlDecl += c2;
              } else {
                parser.sgmlDecl += c2;
              }
              continue;
            case S2.SGML_DECL_QUOTED:
              if (c2 === parser.q) {
                parser.state = S2.SGML_DECL;
                parser.q = "";
              }
              parser.sgmlDecl += c2;
              continue;
            case S2.DOCTYPE:
              if (c2 === ">") {
                parser.state = S2.TEXT;
                emitNode(parser, "ondoctype", parser.doctype);
                parser.doctype = true;
              } else {
                parser.doctype += c2;
                if (c2 === "[") {
                  parser.state = S2.DOCTYPE_DTD;
                } else if (isQuote(c2)) {
                  parser.state = S2.DOCTYPE_QUOTED;
                  parser.q = c2;
                }
              }
              continue;
            case S2.DOCTYPE_QUOTED:
              parser.doctype += c2;
              if (c2 === parser.q) {
                parser.q = "";
                parser.state = S2.DOCTYPE;
              }
              continue;
            case S2.DOCTYPE_DTD:
              if (c2 === "]") {
                parser.doctype += c2;
                parser.state = S2.DOCTYPE;
              } else if (c2 === "<") {
                parser.state = S2.OPEN_WAKA;
                parser.startTagPosition = parser.position;
              } else if (isQuote(c2)) {
                parser.doctype += c2;
                parser.state = S2.DOCTYPE_DTD_QUOTED;
                parser.q = c2;
              } else {
                parser.doctype += c2;
              }
              continue;
            case S2.DOCTYPE_DTD_QUOTED:
              parser.doctype += c2;
              if (c2 === parser.q) {
                parser.state = S2.DOCTYPE_DTD;
                parser.q = "";
              }
              continue;
            case S2.COMMENT:
              if (c2 === "-") {
                parser.state = S2.COMMENT_ENDING;
              } else {
                parser.comment += c2;
              }
              continue;
            case S2.COMMENT_ENDING:
              if (c2 === "-") {
                parser.state = S2.COMMENT_ENDED;
                parser.comment = textopts(parser.opt, parser.comment);
                if (parser.comment) {
                  emitNode(parser, "oncomment", parser.comment);
                }
                parser.comment = "";
              } else {
                parser.comment += "-" + c2;
                parser.state = S2.COMMENT;
              }
              continue;
            case S2.COMMENT_ENDED:
              if (c2 !== ">") {
                strictFail(parser, "Malformed comment");
                parser.comment += "--" + c2;
                parser.state = S2.COMMENT;
              } else if (parser.doctype && parser.doctype !== true) {
                parser.state = S2.DOCTYPE_DTD;
              } else {
                parser.state = S2.TEXT;
              }
              continue;
            case S2.CDATA:
              if (c2 === "]") {
                parser.state = S2.CDATA_ENDING;
              } else {
                parser.cdata += c2;
              }
              continue;
            case S2.CDATA_ENDING:
              if (c2 === "]") {
                parser.state = S2.CDATA_ENDING_2;
              } else {
                parser.cdata += "]" + c2;
                parser.state = S2.CDATA;
              }
              continue;
            case S2.CDATA_ENDING_2:
              if (c2 === ">") {
                if (parser.cdata) {
                  emitNode(parser, "oncdata", parser.cdata);
                }
                emitNode(parser, "onclosecdata");
                parser.cdata = "";
                parser.state = S2.TEXT;
              } else if (c2 === "]") {
                parser.cdata += "]";
              } else {
                parser.cdata += "]]" + c2;
                parser.state = S2.CDATA;
              }
              continue;
            case S2.PROC_INST:
              if (c2 === "?") {
                parser.state = S2.PROC_INST_ENDING;
              } else if (isWhitespace(c2)) {
                parser.state = S2.PROC_INST_BODY;
              } else {
                parser.procInstName += c2;
              }
              continue;
            case S2.PROC_INST_BODY:
              if (!parser.procInstBody && isWhitespace(c2)) {
                continue;
              } else if (c2 === "?") {
                parser.state = S2.PROC_INST_ENDING;
              } else {
                parser.procInstBody += c2;
              }
              continue;
            case S2.PROC_INST_ENDING:
              if (c2 === ">") {
                emitNode(parser, "onprocessinginstruction", {
                  name: parser.procInstName,
                  body: parser.procInstBody
                });
                parser.procInstName = parser.procInstBody = "";
                parser.state = S2.TEXT;
              } else {
                parser.procInstBody += "?" + c2;
                parser.state = S2.PROC_INST_BODY;
              }
              continue;
            case S2.OPEN_TAG:
              if (isMatch(nameBody, c2)) {
                parser.tagName += c2;
              } else {
                newTag(parser);
                if (c2 === ">") {
                  openTag(parser);
                } else if (c2 === "/") {
                  parser.state = S2.OPEN_TAG_SLASH;
                } else {
                  if (!isWhitespace(c2)) {
                    strictFail(parser, "Invalid character in tag name");
                  }
                  parser.state = S2.ATTRIB;
                }
              }
              continue;
            case S2.OPEN_TAG_SLASH:
              if (c2 === ">") {
                openTag(parser, true);
                closeTag(parser);
              } else {
                strictFail(parser, "Forward-slash in opening tag not followed by >");
                parser.state = S2.ATTRIB;
              }
              continue;
            case S2.ATTRIB:
              if (isWhitespace(c2)) {
                continue;
              } else if (c2 === ">") {
                openTag(parser);
              } else if (c2 === "/") {
                parser.state = S2.OPEN_TAG_SLASH;
              } else if (isMatch(nameStart, c2)) {
                parser.attribName = c2;
                parser.attribValue = "";
                parser.state = S2.ATTRIB_NAME;
              } else {
                strictFail(parser, "Invalid attribute name");
              }
              continue;
            case S2.ATTRIB_NAME:
              if (c2 === "=") {
                parser.state = S2.ATTRIB_VALUE;
              } else if (c2 === ">") {
                strictFail(parser, "Attribute without value");
                parser.attribValue = parser.attribName;
                attrib(parser);
                openTag(parser);
              } else if (isWhitespace(c2)) {
                parser.state = S2.ATTRIB_NAME_SAW_WHITE;
              } else if (isMatch(nameBody, c2)) {
                parser.attribName += c2;
              } else {
                strictFail(parser, "Invalid attribute name");
              }
              continue;
            case S2.ATTRIB_NAME_SAW_WHITE:
              if (c2 === "=") {
                parser.state = S2.ATTRIB_VALUE;
              } else if (isWhitespace(c2)) {
                continue;
              } else {
                strictFail(parser, "Attribute without value");
                parser.tag.attributes[parser.attribName] = "";
                parser.attribValue = "";
                emitNode(parser, "onattribute", {
                  name: parser.attribName,
                  value: ""
                });
                parser.attribName = "";
                if (c2 === ">") {
                  openTag(parser);
                } else if (isMatch(nameStart, c2)) {
                  parser.attribName = c2;
                  parser.state = S2.ATTRIB_NAME;
                } else {
                  strictFail(parser, "Invalid attribute name");
                  parser.state = S2.ATTRIB;
                }
              }
              continue;
            case S2.ATTRIB_VALUE:
              if (isWhitespace(c2)) {
                continue;
              } else if (isQuote(c2)) {
                parser.q = c2;
                parser.state = S2.ATTRIB_VALUE_QUOTED;
              } else {
                if (!parser.opt.unquotedAttributeValues) {
                  error(parser, "Unquoted attribute value");
                }
                parser.state = S2.ATTRIB_VALUE_UNQUOTED;
                parser.attribValue = c2;
              }
              continue;
            case S2.ATTRIB_VALUE_QUOTED:
              if (c2 !== parser.q) {
                if (c2 === "&") {
                  parser.state = S2.ATTRIB_VALUE_ENTITY_Q;
                } else {
                  parser.attribValue += c2;
                }
                continue;
              }
              attrib(parser);
              parser.q = "";
              parser.state = S2.ATTRIB_VALUE_CLOSED;
              continue;
            case S2.ATTRIB_VALUE_CLOSED:
              if (isWhitespace(c2)) {
                parser.state = S2.ATTRIB;
              } else if (c2 === ">") {
                openTag(parser);
              } else if (c2 === "/") {
                parser.state = S2.OPEN_TAG_SLASH;
              } else if (isMatch(nameStart, c2)) {
                strictFail(parser, "No whitespace between attributes");
                parser.attribName = c2;
                parser.attribValue = "";
                parser.state = S2.ATTRIB_NAME;
              } else {
                strictFail(parser, "Invalid attribute name");
              }
              continue;
            case S2.ATTRIB_VALUE_UNQUOTED:
              if (!isAttribEnd(c2)) {
                if (c2 === "&") {
                  parser.state = S2.ATTRIB_VALUE_ENTITY_U;
                } else {
                  parser.attribValue += c2;
                }
                continue;
              }
              attrib(parser);
              if (c2 === ">") {
                openTag(parser);
              } else {
                parser.state = S2.ATTRIB;
              }
              continue;
            case S2.CLOSE_TAG:
              if (!parser.tagName) {
                if (isWhitespace(c2)) {
                  continue;
                } else if (notMatch(nameStart, c2)) {
                  if (parser.script) {
                    parser.script += "</" + c2;
                    parser.state = S2.SCRIPT;
                  } else {
                    strictFail(parser, "Invalid tagname in closing tag.");
                  }
                } else {
                  parser.tagName = c2;
                }
              } else if (c2 === ">") {
                closeTag(parser);
              } else if (isMatch(nameBody, c2)) {
                parser.tagName += c2;
              } else if (parser.script) {
                parser.script += "</" + parser.tagName;
                parser.tagName = "";
                parser.state = S2.SCRIPT;
              } else {
                if (!isWhitespace(c2)) {
                  strictFail(parser, "Invalid tagname in closing tag");
                }
                parser.state = S2.CLOSE_TAG_SAW_WHITE;
              }
              continue;
            case S2.CLOSE_TAG_SAW_WHITE:
              if (isWhitespace(c2)) {
                continue;
              }
              if (c2 === ">") {
                closeTag(parser);
              } else {
                strictFail(parser, "Invalid characters in closing tag");
              }
              continue;
            case S2.TEXT_ENTITY:
            case S2.ATTRIB_VALUE_ENTITY_Q:
            case S2.ATTRIB_VALUE_ENTITY_U:
              var returnState;
              var buffer2;
              switch (parser.state) {
                case S2.TEXT_ENTITY:
                  returnState = S2.TEXT;
                  buffer2 = "textNode";
                  break;
                case S2.ATTRIB_VALUE_ENTITY_Q:
                  returnState = S2.ATTRIB_VALUE_QUOTED;
                  buffer2 = "attribValue";
                  break;
                case S2.ATTRIB_VALUE_ENTITY_U:
                  returnState = S2.ATTRIB_VALUE_UNQUOTED;
                  buffer2 = "attribValue";
                  break;
              }
              if (c2 === ";") {
                var parsedEntity = parseEntity(parser);
                if (parser.opt.unparsedEntities && !Object.values(sax2.XML_ENTITIES).includes(parsedEntity)) {
                  parser.entity = "";
                  parser.state = returnState;
                  parser.write(parsedEntity);
                } else {
                  parser[buffer2] += parsedEntity;
                  parser.entity = "";
                  parser.state = returnState;
                }
              } else if (isMatch(parser.entity.length ? entityBody : entityStart, c2)) {
                parser.entity += c2;
              } else {
                strictFail(parser, "Invalid character in entity name");
                parser[buffer2] += "&" + parser.entity + c2;
                parser.entity = "";
                parser.state = returnState;
              }
              continue;
            default: {
              throw new Error(parser, "Unknown state: " + parser.state);
            }
          }
        }
        if (parser.position >= parser.bufferCheckPosition) {
          checkBufferLength(parser);
        }
        return parser;
      }
      /*! http://mths.be/fromcodepoint v0.1.0 by @mathias */
      if (!String.fromCodePoint) {
        (function() {
          var stringFromCharCode = String.fromCharCode;
          var floor = Math.floor;
          var fromCodePoint = function() {
            var MAX_SIZE = 16384;
            var codeUnits = [];
            var highSurrogate;
            var lowSurrogate;
            var index = -1;
            var length = arguments.length;
            if (!length) {
              return "";
            }
            var result = "";
            while (++index < length) {
              var codePoint = Number(arguments[index]);
              if (!isFinite(codePoint) || // `NaN`, `+Infinity`, or `-Infinity`
              codePoint < 0 || // not a valid Unicode code point
              codePoint > 1114111 || // not a valid Unicode code point
              floor(codePoint) !== codePoint) {
                throw RangeError("Invalid code point: " + codePoint);
              }
              if (codePoint <= 65535) {
                codeUnits.push(codePoint);
              } else {
                codePoint -= 65536;
                highSurrogate = (codePoint >> 10) + 55296;
                lowSurrogate = codePoint % 1024 + 56320;
                codeUnits.push(highSurrogate, lowSurrogate);
              }
              if (index + 1 === length || codeUnits.length > MAX_SIZE) {
                result += stringFromCharCode.apply(null, codeUnits);
                codeUnits.length = 0;
              }
            }
            return result;
          };
          if (Object.defineProperty) {
            Object.defineProperty(String, "fromCodePoint", {
              value: fromCodePoint,
              configurable: true,
              writable: true
            });
          } else {
            String.fromCodePoint = fromCodePoint;
          }
        })();
      }
    })(exports);
  })(sax$1);
  return sax$1;
}
requireSax();
/**
* @vue/shared v3.5.39
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
// @__NO_SIDE_EFFECTS__
function makeMap(str) {
  const map = /* @__PURE__ */ Object.create(null);
  for (const key of str.split(",")) map[key] = 1;
  return (val) => val in map;
}
const EMPTY_ARR = [];
const isOn = (key) => key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110 && // uppercase letter
(key.charCodeAt(2) > 122 || key.charCodeAt(2) < 97);
const isModelListener = (key) => key.startsWith("onUpdate:");
const extend$1 = Object.assign;
const hasOwnProperty$2 = Object.prototype.hasOwnProperty;
const hasOwn = (val, key) => hasOwnProperty$2.call(val, key);
const isArray$1 = Array.isArray;
const isMap = (val) => toTypeString(val) === "[object Map]";
const isFunction$2 = (val) => typeof val === "function";
const isString$1 = (val) => typeof val === "string";
const isSymbol = (val) => typeof val === "symbol";
const isObject$1 = (val) => val !== null && typeof val === "object";
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const toRawType = (value) => {
  return toTypeString(value).slice(8, -1);
};
const isIntegerKey = (key) => isString$1(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
const cacheStringFunction = (fn) => {
  const cache = /* @__PURE__ */ Object.create(null);
  return ((str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  });
};
const camelizeRE = /-\w/g;
const camelize = cacheStringFunction(
  (str) => {
    return str.replace(camelizeRE, (c2) => c2.slice(1).toUpperCase());
  }
);
const hyphenateRE = /\B([A-Z])/g;
const hyphenate = cacheStringFunction(
  (str) => str.replace(hyphenateRE, "-$1").toLowerCase()
);
const capitalize = cacheStringFunction((str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
});
const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
let _globalThis;
const getGlobalThis = () => {
  return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
};
function normalizeStyle(value) {
  if (isArray$1(value)) {
    const res = {};
    for (let i2 = 0; i2 < value.length; i2++) {
      const item = value[i2];
      const normalized = isString$1(item) ? parseStringStyle(item) : normalizeStyle(item);
      if (normalized) {
        for (const key in normalized) {
          res[key] = normalized[key];
        }
      }
    }
    return res;
  } else if (isString$1(value) || isObject$1(value)) {
    return value;
  }
}
const listDelimiterRE = /;(?![^(]*\))/g;
const propertyDelimiterRE = /:([^]+)/;
const styleCommentRE = /\/\*[^]*?\*\//g;
function parseStringStyle(cssText) {
  const ret = {};
  cssText.replace(styleCommentRE, "").split(listDelimiterRE).forEach((item) => {
    if (item) {
      const tmp = item.split(propertyDelimiterRE);
      tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return ret;
}
function normalizeClass(value) {
  let res = "";
  if (isString$1(value)) {
    res = value;
  } else if (isArray$1(value)) {
    for (let i2 = 0; i2 < value.length; i2++) {
      const normalized = normalizeClass(value[i2]);
      if (normalized) {
        res += normalized + " ";
      }
    }
  } else if (isObject$1(value)) {
    for (const name in value) {
      if (value[name]) {
        res += name + " ";
      }
    }
  }
  return res.trim();
}
function normalizeProps(props) {
  if (!props) return null;
  let { class: klass, style } = props;
  if (klass && !isString$1(klass)) {
    props.class = normalizeClass(klass);
  }
  if (style) {
    props.style = normalizeStyle(style);
  }
  return props;
}
/**
* @vue/reactivity v3.5.39
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let activeSub;
let batchDepth = 0;
let batchedSub;
function startBatch() {
  batchDepth++;
}
function endBatch() {
  if (--batchDepth > 0) {
    return;
  }
  let error;
  while (batchedSub) {
    let e2 = batchedSub;
    batchedSub = void 0;
    while (e2) {
      const next = e2.next;
      e2.next = void 0;
      e2.flags &= -9;
      if (e2.flags & 1) {
        try {
          ;
          e2.trigger();
        } catch (err) {
          if (!error) error = err;
        }
      }
      e2 = next;
    }
  }
  if (error) throw error;
}
let shouldTrack = true;
const trackStack = [];
function pauseTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = false;
}
function resetTracking() {
  const last = trackStack.pop();
  shouldTrack = last === void 0 ? true : last;
}
class Dep {
  // TODO isolatedDeclarations "__v_skip"
  constructor(computed2) {
    this.computed = computed2;
    this.version = 0;
    this.activeLink = void 0;
    this.subs = void 0;
    this.map = void 0;
    this.key = void 0;
    this.sc = 0;
    this.__v_skip = true;
  }
  track(debugInfo) {
    {
      return;
    }
  }
  trigger(debugInfo) {
    this.version++;
    this.notify(debugInfo);
  }
  notify(debugInfo) {
    startBatch();
    try {
      if (false) ;
      for (let link = this.subs; link; link = link.prevSub) {
        if (link.sub.notify()) {
          ;
          link.sub.dep.notify();
        }
      }
    } finally {
      endBatch();
    }
  }
}
const targetMap = /* @__PURE__ */ new WeakMap();
const ITERATE_KEY = /* @__PURE__ */ Symbol(
  ""
);
const MAP_KEY_ITERATE_KEY = /* @__PURE__ */ Symbol(
  ""
);
const ARRAY_ITERATE_KEY = /* @__PURE__ */ Symbol(
  ""
);
function track(target, type, key) {
  if (shouldTrack && activeSub) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, dep = new Dep());
      dep.map = depsMap;
      dep.key = key;
    }
    {
      dep.track();
    }
  }
}
function trigger(target, type, key, newValue, oldValue, oldTarget) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    return;
  }
  const run = (dep) => {
    if (dep) {
      {
        dep.trigger();
      }
    }
  };
  startBatch();
  if (type === "clear") {
    depsMap.forEach(run);
  } else {
    const targetIsArray = isArray$1(target);
    const isArrayIndex = targetIsArray && isIntegerKey(key);
    if (targetIsArray && key === "length") {
      const newLength = Number(newValue);
      depsMap.forEach((dep, key2) => {
        if (key2 === "length" || key2 === ARRAY_ITERATE_KEY || !isSymbol(key2) && key2 >= newLength) {
          run(dep);
        }
      });
    } else {
      if (key !== void 0 || depsMap.has(void 0)) {
        run(depsMap.get(key));
      }
      if (isArrayIndex) {
        run(depsMap.get(ARRAY_ITERATE_KEY));
      }
      switch (type) {
        case "add":
          if (!targetIsArray) {
            run(depsMap.get(ITERATE_KEY));
            if (isMap(target)) {
              run(depsMap.get(MAP_KEY_ITERATE_KEY));
            }
          } else if (isArrayIndex) {
            run(depsMap.get("length"));
          }
          break;
        case "delete":
          if (!targetIsArray) {
            run(depsMap.get(ITERATE_KEY));
            if (isMap(target)) {
              run(depsMap.get(MAP_KEY_ITERATE_KEY));
            }
          }
          break;
        case "set":
          if (isMap(target)) {
            run(depsMap.get(ITERATE_KEY));
          }
          break;
      }
    }
  }
  endBatch();
}
function reactiveReadArray(array) {
  const raw = /* @__PURE__ */ toRaw(array);
  if (raw === array) return raw;
  track(raw, "iterate", ARRAY_ITERATE_KEY);
  return /* @__PURE__ */ isShallow(array) ? raw : raw.map(toReactive);
}
function shallowReadArray(arr) {
  track(arr = /* @__PURE__ */ toRaw(arr), "iterate", ARRAY_ITERATE_KEY);
  return arr;
}
function toWrapped(target, item) {
  if (/* @__PURE__ */ isReadonly(target)) {
    return /* @__PURE__ */ isReactive(target) ? toReadonly(toReactive(item)) : toReadonly(item);
  }
  return toReactive(item);
}
const arrayInstrumentations = {
  __proto__: null,
  [Symbol.iterator]() {
    return iterator$1(this, Symbol.iterator, (item) => toWrapped(this, item));
  },
  concat(...args) {
    return reactiveReadArray(this).concat(
      ...args.map((x2) => isArray$1(x2) ? reactiveReadArray(x2) : x2)
    );
  },
  entries() {
    return iterator$1(this, "entries", (value) => {
      value[1] = toWrapped(this, value[1]);
      return value;
    });
  },
  every(fn, thisArg) {
    return apply(this, "every", fn, thisArg, void 0, arguments);
  },
  filter(fn, thisArg) {
    return apply(
      this,
      "filter",
      fn,
      thisArg,
      (v2) => v2.map((item) => toWrapped(this, item)),
      arguments
    );
  },
  find(fn, thisArg) {
    return apply(
      this,
      "find",
      fn,
      thisArg,
      (item) => toWrapped(this, item),
      arguments
    );
  },
  findIndex(fn, thisArg) {
    return apply(this, "findIndex", fn, thisArg, void 0, arguments);
  },
  findLast(fn, thisArg) {
    return apply(
      this,
      "findLast",
      fn,
      thisArg,
      (item) => toWrapped(this, item),
      arguments
    );
  },
  findLastIndex(fn, thisArg) {
    return apply(this, "findLastIndex", fn, thisArg, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(fn, thisArg) {
    return apply(this, "forEach", fn, thisArg, void 0, arguments);
  },
  includes(...args) {
    return searchProxy(this, "includes", args);
  },
  indexOf(...args) {
    return searchProxy(this, "indexOf", args);
  },
  join(separator) {
    return reactiveReadArray(this).join(separator);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...args) {
    return searchProxy(this, "lastIndexOf", args);
  },
  map(fn, thisArg) {
    return apply(this, "map", fn, thisArg, void 0, arguments);
  },
  pop() {
    return noTracking(this, "pop");
  },
  push(...args) {
    return noTracking(this, "push", args);
  },
  reduce(fn, ...args) {
    return reduce(this, "reduce", fn, args);
  },
  reduceRight(fn, ...args) {
    return reduce(this, "reduceRight", fn, args);
  },
  shift() {
    return noTracking(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(fn, thisArg) {
    return apply(this, "some", fn, thisArg, void 0, arguments);
  },
  splice(...args) {
    return noTracking(this, "splice", args);
  },
  toReversed() {
    return reactiveReadArray(this).toReversed();
  },
  toSorted(comparer) {
    return reactiveReadArray(this).toSorted(comparer);
  },
  toSpliced(...args) {
    return reactiveReadArray(this).toSpliced(...args);
  },
  unshift(...args) {
    return noTracking(this, "unshift", args);
  },
  values() {
    return iterator$1(this, "values", (item) => toWrapped(this, item));
  }
};
function iterator$1(self2, method, wrapValue) {
  const arr = shallowReadArray(self2);
  const iter = arr[method]();
  if (arr !== self2 && !/* @__PURE__ */ isShallow(self2)) {
    iter._next = iter.next;
    iter.next = () => {
      const result = iter._next();
      if (!result.done) {
        result.value = wrapValue(result.value);
      }
      return result;
    };
  }
  return iter;
}
const arrayProto = Array.prototype;
function apply(self2, method, fn, thisArg, wrappedRetFn, args) {
  const arr = shallowReadArray(self2);
  const needsWrap = arr !== self2 && !/* @__PURE__ */ isShallow(self2);
  const methodFn = arr[method];
  if (methodFn !== arrayProto[method]) {
    const result2 = methodFn.apply(self2, args);
    return needsWrap ? toReactive(result2) : result2;
  }
  let wrappedFn = fn;
  if (arr !== self2) {
    if (needsWrap) {
      wrappedFn = function(item, index) {
        return fn.call(this, toWrapped(self2, item), index, self2);
      };
    } else if (fn.length > 2) {
      wrappedFn = function(item, index) {
        return fn.call(this, item, index, self2);
      };
    }
  }
  const result = methodFn.call(arr, wrappedFn, thisArg);
  return needsWrap && wrappedRetFn ? wrappedRetFn(result) : result;
}
function reduce(self2, method, fn, args) {
  const arr = shallowReadArray(self2);
  const needsWrap = arr !== self2 && !/* @__PURE__ */ isShallow(self2);
  let wrappedFn = fn;
  let wrapInitialAccumulator = false;
  if (arr !== self2) {
    if (needsWrap) {
      wrapInitialAccumulator = args.length === 0;
      wrappedFn = function(acc, item, index) {
        if (wrapInitialAccumulator) {
          wrapInitialAccumulator = false;
          acc = toWrapped(self2, acc);
        }
        return fn.call(this, acc, toWrapped(self2, item), index, self2);
      };
    } else if (fn.length > 3) {
      wrappedFn = function(acc, item, index) {
        return fn.call(this, acc, item, index, self2);
      };
    }
  }
  const result = arr[method](wrappedFn, ...args);
  return wrapInitialAccumulator ? toWrapped(self2, result) : result;
}
function searchProxy(self2, method, args) {
  const arr = /* @__PURE__ */ toRaw(self2);
  track(arr, "iterate", ARRAY_ITERATE_KEY);
  const res = arr[method](...args);
  if ((res === -1 || res === false) && /* @__PURE__ */ isProxy(args[0])) {
    args[0] = /* @__PURE__ */ toRaw(args[0]);
    return arr[method](...args);
  }
  return res;
}
function noTracking(self2, method, args = []) {
  pauseTracking();
  startBatch();
  const res = (/* @__PURE__ */ toRaw(self2))[method].apply(self2, args);
  endBatch();
  resetTracking();
  return res;
}
const isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
const builtInSymbols = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((key) => key !== "arguments" && key !== "caller").map((key) => Symbol[key]).filter(isSymbol)
);
function hasOwnProperty$1(key) {
  if (!isSymbol(key)) key = String(key);
  const obj = /* @__PURE__ */ toRaw(this);
  track(obj, "has", key);
  return obj.hasOwnProperty(key);
}
class BaseReactiveHandler {
  constructor(_isReadonly = false, _isShallow = false) {
    this._isReadonly = _isReadonly;
    this._isShallow = _isShallow;
  }
  get(target, key, receiver) {
    if (key === "__v_skip") return target["__v_skip"];
    const isReadonly2 = this._isReadonly, isShallow2 = this._isShallow;
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_isShallow") {
      return isShallow2;
    } else if (key === "__v_raw") {
      if (receiver === (isReadonly2 ? isShallow2 ? shallowReadonlyMap : readonlyMap : isShallow2 ? shallowReactiveMap : reactiveMap).get(target) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(target) === Object.getPrototypeOf(receiver)) {
        return target;
      }
      return;
    }
    const targetIsArray = isArray$1(target);
    if (!isReadonly2) {
      let fn;
      if (targetIsArray && (fn = arrayInstrumentations[key])) {
        return fn;
      }
      if (key === "hasOwnProperty") {
        return hasOwnProperty$1;
      }
    }
    const res = Reflect.get(
      target,
      key,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ isRef(target) ? target : receiver
    );
    if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
      return res;
    }
    if (!isReadonly2) {
      track(target, "get", key);
    }
    if (isShallow2) {
      return res;
    }
    if (/* @__PURE__ */ isRef(res)) {
      const value = targetIsArray && isIntegerKey(key) ? res : res.value;
      return isReadonly2 && isObject$1(value) ? /* @__PURE__ */ readonly(value) : value;
    }
    if (isObject$1(res)) {
      return isReadonly2 ? /* @__PURE__ */ readonly(res) : /* @__PURE__ */ reactive(res);
    }
    return res;
  }
}
class MutableReactiveHandler extends BaseReactiveHandler {
  constructor(isShallow2 = false) {
    super(false, isShallow2);
  }
  set(target, key, value, receiver) {
    let oldValue = target[key];
    const isArrayWithIntegerKey = isArray$1(target) && isIntegerKey(key);
    if (!this._isShallow) {
      const isOldValueReadonly = /* @__PURE__ */ isReadonly(oldValue);
      if (!/* @__PURE__ */ isShallow(value) && !/* @__PURE__ */ isReadonly(value)) {
        oldValue = /* @__PURE__ */ toRaw(oldValue);
        value = /* @__PURE__ */ toRaw(value);
      }
      if (!isArrayWithIntegerKey && /* @__PURE__ */ isRef(oldValue) && !/* @__PURE__ */ isRef(value)) {
        if (isOldValueReadonly) {
          return true;
        } else {
          oldValue.value = value;
          return true;
        }
      }
    }
    const hadKey = isArrayWithIntegerKey ? Number(key) < target.length : hasOwn(target, key);
    const result = Reflect.set(
      target,
      key,
      value,
      /* @__PURE__ */ isRef(target) ? target : receiver
    );
    if (target === /* @__PURE__ */ toRaw(receiver) && result) {
      if (!hadKey) {
        trigger(target, "add", key, value);
      } else if (hasChanged(value, oldValue)) {
        trigger(target, "set", key, value);
      }
    }
    return result;
  }
  deleteProperty(target, key) {
    const hadKey = hasOwn(target, key);
    target[key];
    const result = Reflect.deleteProperty(target, key);
    if (result && hadKey) {
      trigger(target, "delete", key, void 0);
    }
    return result;
  }
  has(target, key) {
    const result = Reflect.has(target, key);
    if (!isSymbol(key) || !builtInSymbols.has(key)) {
      track(target, "has", key);
    }
    return result;
  }
  ownKeys(target) {
    track(
      target,
      "iterate",
      isArray$1(target) ? "length" : ITERATE_KEY
    );
    return Reflect.ownKeys(target);
  }
}
class ReadonlyReactiveHandler extends BaseReactiveHandler {
  constructor(isShallow2 = false) {
    super(true, isShallow2);
  }
  set(target, key) {
    return true;
  }
  deleteProperty(target, key) {
    return true;
  }
}
const mutableHandlers = /* @__PURE__ */ new MutableReactiveHandler();
const readonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler();
const toShallow = (value) => value;
const getProto = (v2) => Reflect.getPrototypeOf(v2);
function createIterableMethod(method, isReadonly2, isShallow2) {
  return function(...args) {
    const target = this["__v_raw"];
    const rawTarget = /* @__PURE__ */ toRaw(target);
    const targetIsMap = isMap(rawTarget);
    const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
    const isKeyOnly = method === "keys" && targetIsMap;
    const innerIterator = target[method](...args);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(
      rawTarget,
      "iterate",
      isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY
    );
    return extend$1(
      // inheriting all iterator properties
      Object.create(innerIterator),
      {
        // iterator protocol
        next() {
          const { value, done } = innerIterator.next();
          return done ? { value, done } : {
            value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
            done
          };
        }
      }
    );
  };
}
function createReadonlyMethod(type) {
  return function(...args) {
    return type === "delete" ? false : type === "clear" ? void 0 : this;
  };
}
function createInstrumentations(readonly2, shallow) {
  const instrumentations = {
    get(key) {
      const target = this["__v_raw"];
      const rawTarget = /* @__PURE__ */ toRaw(target);
      const rawKey = /* @__PURE__ */ toRaw(key);
      if (!readonly2) {
        if (hasChanged(key, rawKey)) {
          track(rawTarget, "get", key);
        }
        track(rawTarget, "get", rawKey);
      }
      const { has } = getProto(rawTarget);
      const wrap = shallow ? toShallow : readonly2 ? toReadonly : toReactive;
      if (has.call(rawTarget, key)) {
        return wrap(target.get(key));
      } else if (has.call(rawTarget, rawKey)) {
        return wrap(target.get(rawKey));
      } else if (target !== rawTarget) {
        target.get(key);
      }
    },
    get size() {
      const target = this["__v_raw"];
      !readonly2 && track(/* @__PURE__ */ toRaw(target), "iterate", ITERATE_KEY);
      return target.size;
    },
    has(key) {
      const target = this["__v_raw"];
      const rawTarget = /* @__PURE__ */ toRaw(target);
      const rawKey = /* @__PURE__ */ toRaw(key);
      if (!readonly2) {
        if (hasChanged(key, rawKey)) {
          track(rawTarget, "has", key);
        }
        track(rawTarget, "has", rawKey);
      }
      return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
    },
    forEach(callback, thisArg) {
      const observed = this;
      const target = observed["__v_raw"];
      const rawTarget = /* @__PURE__ */ toRaw(target);
      const wrap = shallow ? toShallow : readonly2 ? toReadonly : toReactive;
      !readonly2 && track(rawTarget, "iterate", ITERATE_KEY);
      return target.forEach((value, key) => {
        return callback.call(thisArg, wrap(value), wrap(key), observed);
      });
    }
  };
  extend$1(
    instrumentations,
    readonly2 ? {
      add: createReadonlyMethod("add"),
      set: createReadonlyMethod("set"),
      delete: createReadonlyMethod("delete"),
      clear: createReadonlyMethod("clear")
    } : {
      add(value) {
        const target = /* @__PURE__ */ toRaw(this);
        const proto = getProto(target);
        const rawValue = /* @__PURE__ */ toRaw(value);
        const valueToAdd = !shallow && !/* @__PURE__ */ isShallow(value) && !/* @__PURE__ */ isReadonly(value) ? rawValue : value;
        const hadKey = proto.has.call(target, valueToAdd) || hasChanged(value, valueToAdd) && proto.has.call(target, value) || hasChanged(rawValue, valueToAdd) && proto.has.call(target, rawValue);
        if (!hadKey) {
          target.add(valueToAdd);
          trigger(target, "add", valueToAdd, valueToAdd);
        }
        return this;
      },
      set(key, value) {
        if (!shallow && !/* @__PURE__ */ isShallow(value) && !/* @__PURE__ */ isReadonly(value)) {
          value = /* @__PURE__ */ toRaw(value);
        }
        const target = /* @__PURE__ */ toRaw(this);
        const { has, get } = getProto(target);
        let hadKey = has.call(target, key);
        if (!hadKey) {
          key = /* @__PURE__ */ toRaw(key);
          hadKey = has.call(target, key);
        }
        const oldValue = get.call(target, key);
        target.set(key, value);
        if (!hadKey) {
          trigger(target, "add", key, value);
        } else if (hasChanged(value, oldValue)) {
          trigger(target, "set", key, value);
        }
        return this;
      },
      delete(key) {
        const target = /* @__PURE__ */ toRaw(this);
        const { has, get } = getProto(target);
        let hadKey = has.call(target, key);
        if (!hadKey) {
          key = /* @__PURE__ */ toRaw(key);
          hadKey = has.call(target, key);
        }
        get ? get.call(target, key) : void 0;
        const result = target.delete(key);
        if (hadKey) {
          trigger(target, "delete", key, void 0);
        }
        return result;
      },
      clear() {
        const target = /* @__PURE__ */ toRaw(this);
        const hadItems = target.size !== 0;
        const result = target.clear();
        if (hadItems) {
          trigger(
            target,
            "clear",
            void 0,
            void 0
          );
        }
        return result;
      }
    }
  );
  const iteratorMethods = [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ];
  iteratorMethods.forEach((method) => {
    instrumentations[method] = createIterableMethod(method, readonly2, shallow);
  });
  return instrumentations;
}
function createInstrumentationGetter(isReadonly2, shallow) {
  const instrumentations = createInstrumentations(isReadonly2, shallow);
  return (target, key, receiver) => {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_raw") {
      return target;
    }
    return Reflect.get(
      hasOwn(instrumentations, key) && key in target ? instrumentations : target,
      key,
      receiver
    );
  };
}
const mutableCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, false)
};
const readonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, false)
};
const reactiveMap = /* @__PURE__ */ new WeakMap();
const shallowReactiveMap = /* @__PURE__ */ new WeakMap();
const readonlyMap = /* @__PURE__ */ new WeakMap();
const shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
function targetTypeMap(rawType) {
  switch (rawType) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
// @__NO_SIDE_EFFECTS__
function reactive(target) {
  if (/* @__PURE__ */ isReadonly(target)) {
    return target;
  }
  return createReactiveObject(
    target,
    false,
    mutableHandlers,
    mutableCollectionHandlers,
    reactiveMap
  );
}
// @__NO_SIDE_EFFECTS__
function readonly(target) {
  return createReactiveObject(
    target,
    true,
    readonlyHandlers,
    readonlyCollectionHandlers,
    readonlyMap
  );
}
function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
  if (!isObject$1(target)) {
    return target;
  }
  if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) {
    return target;
  }
  if (target["__v_skip"] || !Object.isExtensible(target)) {
    return target;
  }
  const existingProxy = proxyMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }
  const targetType = targetTypeMap(toRawType(target));
  if (targetType === 0) {
    return target;
  }
  const proxy = new Proxy(
    target,
    targetType === 2 ? collectionHandlers : baseHandlers
  );
  proxyMap.set(target, proxy);
  return proxy;
}
// @__NO_SIDE_EFFECTS__
function isReactive(value) {
  if (/* @__PURE__ */ isReadonly(value)) {
    return /* @__PURE__ */ isReactive(value["__v_raw"]);
  }
  return !!(value && value["__v_isReactive"]);
}
// @__NO_SIDE_EFFECTS__
function isReadonly(value) {
  return !!(value && value["__v_isReadonly"]);
}
// @__NO_SIDE_EFFECTS__
function isShallow(value) {
  return !!(value && value["__v_isShallow"]);
}
// @__NO_SIDE_EFFECTS__
function isProxy(value) {
  return value ? !!value["__v_raw"] : false;
}
// @__NO_SIDE_EFFECTS__
function toRaw(observed) {
  const raw = observed && observed["__v_raw"];
  return raw ? /* @__PURE__ */ toRaw(raw) : observed;
}
const toReactive = (value) => isObject$1(value) ? /* @__PURE__ */ reactive(value) : value;
const toReadonly = (value) => isObject$1(value) ? /* @__PURE__ */ readonly(value) : value;
// @__NO_SIDE_EFFECTS__
function isRef(r2) {
  return r2 ? r2["__v_isRef"] === true : false;
}
// @__NO_SIDE_EFFECTS__
function ref(value) {
  return createRef(value, false);
}
function createRef(rawValue, shallow) {
  if (/* @__PURE__ */ isRef(rawValue)) {
    return rawValue;
  }
  return new RefImpl(rawValue, shallow);
}
class RefImpl {
  constructor(value, isShallow2) {
    this.dep = new Dep();
    this["__v_isRef"] = true;
    this["__v_isShallow"] = false;
    this._rawValue = isShallow2 ? value : /* @__PURE__ */ toRaw(value);
    this._value = isShallow2 ? value : toReactive(value);
    this["__v_isShallow"] = isShallow2;
  }
  get value() {
    {
      this.dep.track();
    }
    return this._value;
  }
  set value(newValue) {
    const oldValue = this._rawValue;
    const useDirectValue = this["__v_isShallow"] || /* @__PURE__ */ isShallow(newValue) || /* @__PURE__ */ isReadonly(newValue);
    newValue = useDirectValue ? newValue : /* @__PURE__ */ toRaw(newValue);
    if (hasChanged(newValue, oldValue)) {
      this._rawValue = newValue;
      this._value = useDirectValue ? newValue : toReactive(newValue);
      {
        this.dep.trigger();
      }
    }
  }
}
/**
* @vue/runtime-core v3.5.39
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
const resolvedPromise = /* @__PURE__ */ Promise.resolve();
function nextTick(fn) {
  const p2 = resolvedPromise;
  return fn ? p2.then(this ? fn.bind(this) : fn) : p2;
}
let currentRenderingInstance = null;
let currentScopeId = null;
function setCurrentRenderingInstance(instance) {
  const prev = currentRenderingInstance;
  currentRenderingInstance = instance;
  currentScopeId = instance && instance.type.__scopeId || null;
  return prev;
}
function pushScopeId(id) {
  currentScopeId = id;
}
function popScopeId() {
  currentScopeId = null;
}
const withScopeId = (_id) => withCtx;
function withCtx(fn, ctx = currentRenderingInstance, isNonScopedSlot) {
  if (!ctx) return fn;
  if (fn._n) {
    return fn;
  }
  const renderFnWithContext = (...args) => {
    if (renderFnWithContext._d) {
      setBlockTracking(-1);
    }
    const prevInstance = setCurrentRenderingInstance(ctx);
    let res;
    try {
      res = fn(...args);
    } finally {
      setCurrentRenderingInstance(prevInstance);
      if (renderFnWithContext._d) {
        setBlockTracking(1);
      }
    }
    return res;
  };
  renderFnWithContext._n = true;
  renderFnWithContext._c = true;
  renderFnWithContext._d = true;
  return renderFnWithContext;
}
const isTeleport = (type) => type.__isTeleport;
function setTransitionHooks(vnode, hooks) {
  if (vnode.shapeFlag & 6 && vnode.component) {
    vnode.transition = hooks;
    setTransitionHooks(vnode.component.subTree, hooks);
  } else if (vnode.shapeFlag & 128) {
    vnode.ssContent.transition = hooks.clone(vnode.ssContent);
    vnode.ssFallback.transition = hooks.clone(vnode.ssFallback);
  } else {
    vnode.transition = hooks;
  }
}
// @__NO_SIDE_EFFECTS__
function defineComponent(options, extraOptions) {
  return isFunction$2(options) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    /* @__PURE__ */ (() => extend$1({ name: options.name }, extraOptions, { setup: options }))()
  ) : options;
}
getGlobalThis().requestIdleCallback || ((cb) => setTimeout(cb, 1));
getGlobalThis().cancelIdleCallback || ((id) => clearTimeout(id));
const isAsyncWrapper = (i2) => !!i2.type.__asyncLoader;
const COMPONENTS = "components";
function resolveComponent(name, maybeSelfReference) {
  return resolveAsset(COMPONENTS, name, true, maybeSelfReference) || name;
}
const NULL_DYNAMIC_COMPONENT = /* @__PURE__ */ Symbol.for("v-ndc");
function resolveAsset(type, name, warnMissing = true, maybeSelfReference = false) {
  const instance = currentRenderingInstance || currentInstance;
  if (instance) {
    const Component = instance.type;
    {
      const selfName = getComponentName(
        Component,
        false
      );
      if (selfName && (selfName === name || selfName === camelize(name) || selfName === capitalize(camelize(name)))) {
        return Component;
      }
    }
    const res = (
      // local registration
      // check instance[type] first which is resolved for options API
      resolve2(instance[type] || Component[type], name) || // global registration
      resolve2(instance.appContext[type], name)
    );
    if (!res && maybeSelfReference) {
      return Component;
    }
    return res;
  }
}
function resolve2(registry, name) {
  return registry && (registry[name] || registry[camelize(name)] || registry[capitalize(camelize(name))]);
}
function renderSlot(slots, name, props = {}, fallback, noSlotted) {
  if (currentRenderingInstance.ce || currentRenderingInstance.parent && isAsyncWrapper(currentRenderingInstance.parent) && currentRenderingInstance.parent.ce) {
    const hasProps = Object.keys(props).length > 0;
    if (name !== "default") props.name = name;
    return openBlock(), createBlock(
      Fragment,
      null,
      [createVNode("slot", props, fallback)],
      hasProps ? -2 : 64
    );
  }
  let slot = slots[name];
  if (slot && slot._c) {
    slot._d = false;
  }
  openBlock();
  const validSlotContent = slot && ensureValidVNode(slot(props));
  const slotKey = props.key || // slot content array of a dynamic conditional slot may have a branch
  // key attached in the `createSlots` helper, respect that
  validSlotContent && validSlotContent.key;
  const rendered = createBlock(
    Fragment,
    {
      key: (slotKey && !isSymbol(slotKey) ? slotKey : `_${name}`) + // #7256 force differentiate fallback content from actual content
      (!validSlotContent && fallback ? "_fb" : "")
    },
    validSlotContent || [],
    validSlotContent && slots._ === 1 ? 64 : -2
  );
  if (rendered.scopeId) {
    rendered.slotScopeIds = [rendered.scopeId + "-s"];
  }
  if (slot && slot._c) {
    slot._d = true;
  }
  return rendered;
}
function ensureValidVNode(vnodes) {
  return vnodes.some((child) => {
    if (!isVNode(child)) return true;
    if (child.type === Comment) return false;
    if (child.type === Fragment && !ensureValidVNode(child.children))
      return false;
    return true;
  }) ? vnodes : null;
}
const internalObjectProto = {};
const isInternalObject = (obj) => Object.getPrototypeOf(obj) === internalObjectProto;
const isSuspense = (type) => type.__isSuspense;
const Fragment = /* @__PURE__ */ Symbol.for("v-fgt");
const Text = /* @__PURE__ */ Symbol.for("v-txt");
const Comment = /* @__PURE__ */ Symbol.for("v-cmt");
const blockStack = [];
let currentBlock = null;
function openBlock(disableTracking = false) {
  blockStack.push(currentBlock = disableTracking ? null : []);
}
function closeBlock() {
  blockStack.pop();
  currentBlock = blockStack[blockStack.length - 1] || null;
}
let isBlockTreeEnabled = 1;
function setBlockTracking(value, inVOnce = false) {
  isBlockTreeEnabled += value;
  if (value < 0 && currentBlock && inVOnce) {
    currentBlock.hasOnce = true;
  }
}
function setupBlock(vnode) {
  vnode.dynamicChildren = isBlockTreeEnabled > 0 ? currentBlock || EMPTY_ARR : null;
  closeBlock();
  if (isBlockTreeEnabled > 0 && currentBlock) {
    currentBlock.push(vnode);
  }
  return vnode;
}
function createElementBlock(type, props, children, patchFlag, dynamicProps, shapeFlag) {
  return setupBlock(
    createBaseVNode(
      type,
      props,
      children,
      patchFlag,
      dynamicProps,
      shapeFlag,
      true
    )
  );
}
function createBlock(type, props, children, patchFlag, dynamicProps) {
  return setupBlock(
    createVNode(
      type,
      props,
      children,
      patchFlag,
      dynamicProps,
      true
    )
  );
}
function isVNode(value) {
  return value ? value.__v_isVNode === true : false;
}
const normalizeKey = ({ key }) => key != null ? key : null;
const normalizeRef = ({
  ref: ref3,
  ref_key,
  ref_for
}) => {
  if (typeof ref3 === "number") {
    ref3 = "" + ref3;
  }
  return ref3 != null ? isString$1(ref3) || /* @__PURE__ */ isRef(ref3) || isFunction$2(ref3) ? { i: currentRenderingInstance, r: ref3, k: ref_key, f: !!ref_for } : ref3 : null;
};
function createBaseVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, shapeFlag = type === Fragment ? 0 : 1, isBlockNode = false, needFullChildrenNormalization = false) {
  const vnode = {
    __v_isVNode: true,
    __v_skip: true,
    type,
    props,
    key: props && normalizeKey(props),
    ref: props && normalizeRef(props),
    scopeId: currentScopeId,
    slotScopeIds: null,
    children,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag,
    patchFlag,
    dynamicProps,
    dynamicChildren: null,
    appContext: null,
    ctx: currentRenderingInstance
  };
  if (needFullChildrenNormalization) {
    normalizeChildren(vnode, children);
    if (shapeFlag & 128) {
      type.normalize(vnode);
    }
  } else if (children) {
    vnode.shapeFlag |= isString$1(children) ? 8 : 16;
  }
  if (isBlockTreeEnabled > 0 && // avoid a block node from tracking itself
  !isBlockNode && // has current parent block
  currentBlock && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (vnode.patchFlag > 0 || shapeFlag & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  vnode.patchFlag !== 32) {
    currentBlock.push(vnode);
  }
  return vnode;
}
const createVNode = _createVNode;
function _createVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, isBlockNode = false) {
  if (!type || type === NULL_DYNAMIC_COMPONENT) {
    type = Comment;
  }
  if (isVNode(type)) {
    const cloned = cloneVNode(
      type,
      props,
      true
      /* mergeRef: true */
    );
    if (children) {
      normalizeChildren(cloned, children);
    }
    if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock) {
      if (cloned.shapeFlag & 6) {
        currentBlock[currentBlock.indexOf(type)] = cloned;
      } else {
        currentBlock.push(cloned);
      }
    }
    cloned.patchFlag = -2;
    return cloned;
  }
  if (isClassComponent(type)) {
    type = type.__vccOpts;
  }
  if (props) {
    props = guardReactiveProps(props);
    let { class: klass, style } = props;
    if (klass && !isString$1(klass)) {
      props.class = normalizeClass(klass);
    }
    if (isObject$1(style)) {
      if (/* @__PURE__ */ isProxy(style) && !isArray$1(style)) {
        style = extend$1({}, style);
      }
      props.style = normalizeStyle(style);
    }
  }
  const shapeFlag = isString$1(type) ? 1 : isSuspense(type) ? 128 : isTeleport(type) ? 64 : isObject$1(type) ? 4 : isFunction$2(type) ? 2 : 0;
  return createBaseVNode(
    type,
    props,
    children,
    patchFlag,
    dynamicProps,
    shapeFlag,
    isBlockNode,
    true
  );
}
function guardReactiveProps(props) {
  if (!props) return null;
  return /* @__PURE__ */ isProxy(props) || isInternalObject(props) ? extend$1({}, props) : props;
}
function cloneVNode(vnode, extraProps, mergeRef = false, cloneTransition = false) {
  const { props, ref: ref3, patchFlag, children, transition } = vnode;
  const mergedProps = extraProps ? mergeProps(props || {}, extraProps) : props;
  const cloned = {
    __v_isVNode: true,
    __v_skip: true,
    type: vnode.type,
    props: mergedProps,
    key: mergedProps && normalizeKey(mergedProps),
    ref: extraProps && extraProps.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      mergeRef && ref3 ? isArray$1(ref3) ? ref3.concat(normalizeRef(extraProps)) : [ref3, normalizeRef(extraProps)] : normalizeRef(extraProps)
    ) : ref3,
    scopeId: vnode.scopeId,
    slotScopeIds: vnode.slotScopeIds,
    children,
    target: vnode.target,
    targetStart: vnode.targetStart,
    targetAnchor: vnode.targetAnchor,
    staticCount: vnode.staticCount,
    shapeFlag: vnode.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: extraProps && vnode.type !== Fragment ? patchFlag === -1 ? 16 : patchFlag | 16 : patchFlag,
    dynamicProps: vnode.dynamicProps,
    dynamicChildren: vnode.dynamicChildren,
    appContext: vnode.appContext,
    dirs: vnode.dirs,
    transition,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: vnode.component,
    suspense: vnode.suspense,
    ssContent: vnode.ssContent && cloneVNode(vnode.ssContent),
    ssFallback: vnode.ssFallback && cloneVNode(vnode.ssFallback),
    placeholder: vnode.placeholder,
    el: vnode.el,
    anchor: vnode.anchor,
    ctx: vnode.ctx,
    ce: vnode.ce
  };
  if (transition && cloneTransition) {
    setTransitionHooks(
      cloned,
      transition.clone(cloned)
    );
  }
  return cloned;
}
function createTextVNode(text2 = " ", flag = 0) {
  return createVNode(Text, null, text2, flag);
}
function createCommentVNode(text2 = "", asBlock = false) {
  return asBlock ? (openBlock(), createBlock(Comment, null, text2)) : createVNode(Comment, null, text2);
}
function normalizeChildren(vnode, children) {
  let type = 0;
  const { shapeFlag } = vnode;
  if (children == null) {
    children = null;
  } else if (isArray$1(children)) {
    type = 16;
  } else if (typeof children === "object") {
    if (shapeFlag & (1 | 64)) {
      const slot = children.default;
      if (slot) {
        slot._c && (slot._d = false);
        normalizeChildren(vnode, slot());
        slot._c && (slot._d = true);
      }
      return;
    } else {
      type = 32;
      const slotFlag = children._;
      if (!slotFlag && !isInternalObject(children)) {
        children._ctx = currentRenderingInstance;
      } else if (slotFlag === 3 && currentRenderingInstance) {
        if (currentRenderingInstance.slots._ === 1) {
          children._ = 1;
        } else {
          children._ = 2;
          vnode.patchFlag |= 1024;
        }
      }
    }
  } else if (isFunction$2(children)) {
    if (shapeFlag & (1 | 64)) {
      normalizeChildren(vnode, { default: children });
      return;
    }
    children = { default: children, _ctx: currentRenderingInstance };
    type = 32;
  } else {
    children = String(children);
    if (shapeFlag & 64) {
      type = 16;
      children = [createTextVNode(children)];
    } else {
      type = 8;
    }
  }
  vnode.children = children;
  vnode.shapeFlag |= type;
}
function mergeProps(...args) {
  const ret = {};
  for (let i2 = 0; i2 < args.length; i2++) {
    const toMerge = args[i2];
    for (const key in toMerge) {
      if (key === "class") {
        if (ret.class !== toMerge.class) {
          ret.class = normalizeClass([ret.class, toMerge.class]);
        }
      } else if (key === "style") {
        ret.style = normalizeStyle([ret.style, toMerge.style]);
      } else if (isOn(key)) {
        const existing = ret[key];
        const incoming = toMerge[key];
        if (incoming && existing !== incoming && !(isArray$1(existing) && existing.includes(incoming))) {
          ret[key] = existing ? [].concat(existing, incoming) : incoming;
        } else if (incoming == null && existing == null && // mergeProps({ 'onUpdate:modelValue': undefined }) should not retain
        // the model listener.
        !isModelListener(key)) {
          ret[key] = incoming;
        }
      } else if (key !== "") {
        ret[key] = toMerge[key];
      }
    }
  }
  return ret;
}
let currentInstance = null;
{
  const g2 = getGlobalThis();
  const registerGlobalSetter = (key, setter) => {
    let setters;
    if (!(setters = g2[key])) setters = g2[key] = [];
    setters.push(setter);
    return (v2) => {
      if (setters.length > 1) setters.forEach((set) => set(v2));
      else setters[0](v2);
    };
  };
  registerGlobalSetter(
    `__VUE_INSTANCE_SETTERS__`,
    (v2) => currentInstance = v2
  );
  registerGlobalSetter(
    `__VUE_SSR_SETTERS__`,
    (v2) => v2
  );
}
function getComponentName(Component, includeInferred = true) {
  return isFunction$2(Component) ? Component.displayName || Component.name : Component.name || includeInferred && Component.__name;
}
function isClassComponent(value) {
  return isFunction$2(value) && "__vccOpts" in value;
}
/**
* @vue/runtime-dom v3.5.39
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let policy = void 0;
const tt$1 = typeof window !== "undefined" && window.trustedTypes;
if (tt$1) {
  try {
    policy = /* @__PURE__ */ tt$1.createPolicy("vue", {
      createHTML: (val) => val
    });
  } catch (e2) {
  }
}
const keyNames = {
  esc: "escape",
  space: " ",
  up: "arrow-up",
  left: "arrow-left",
  right: "arrow-right",
  down: "arrow-down",
  delete: "backspace"
};
const withKeys = (fn, modifiers) => {
  const cache = fn._withKeys || (fn._withKeys = {});
  const cacheKey = modifiers.join(".");
  return cache[cacheKey] || (cache[cacheKey] = ((event) => {
    if (!("key" in event)) {
      return;
    }
    const eventKey = hyphenate(event.key);
    if (modifiers.some(
      (k2) => k2 === eventKey || keyNames[k2] === eventKey
    )) {
      return fn(event);
    }
  }));
};
/*!
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */
class GettextWrapper {
  bundle;
  constructor(pluralFunction) {
    this.bundle = {
      pluralFunction,
      translations: {}
    };
  }
  /**
   * Append new translations to the wrapper.
   *
   * This is useful if translations should be added on demand,
   * e.g. depending on component usage.
   *
   * @param bundle - The new translation bundle to append
   */
  addTranslations(bundle) {
    const dict = Object.values(bundle.translations[""] ?? {}).map(({ msgid, msgid_plural: msgidPlural, msgstr }) => {
      if (msgidPlural !== void 0) {
        return [`_${msgid}_::_${msgidPlural}_`, msgstr];
      }
      return [msgid, msgstr[0]];
    });
    this.bundle.translations = {
      ...this.bundle.translations,
      ...Object.fromEntries(dict)
    };
  }
  /**
   * Get translated string (singular form), optionally with placeholders
   *
   * @param original original string to translate
   * @param placeholders map of placeholder key to value
   */
  gettext(original, placeholders = {}) {
    return translate("", original, placeholders, void 0, { bundle: this.bundle });
  }
  /**
   * Get translated string with plural forms
   *
   * @param singular Singular text form
   * @param plural Plural text form to be used if `count` requires it
   * @param count The number to insert into the text
   * @param placeholders optional map of placeholder key to value
   */
  ngettext(singular, plural, count, placeholders = {}) {
    return translatePlural("", singular, plural, count, placeholders, { bundle: this.bundle });
  }
}
class GettextBuilder {
  debug = false;
  language = "en";
  translations = {};
  setLanguage(language) {
    this.language = language;
    return this;
  }
  /**
   * Try to detect locale from context with `en` as fallback value
   * This only works within a Nextcloud page context.
   *
   * @deprecated use `detectLanguage` instead.
   */
  detectLocale() {
    return this.detectLanguage();
  }
  /**
   * Try to detect locale from context with `en` as fallback value.
   * This only works within a Nextcloud page context.
   */
  detectLanguage() {
    return this.setLanguage(getLanguage().replace("-", "_"));
  }
  /**
   * Register a new translation bundle for a specified language.
   *
   * Please note that existing translations for that language will be overwritten.
   *
   * @param language - Language this is the translation for
   * @param data - The translation bundle
   */
  addTranslation(language, data) {
    this.translations[language] = data;
    return this;
  }
  enableDebugMode() {
    this.debug = true;
    return this;
  }
  build() {
    if (this.debug) {
      console.debug(`Creating gettext instance for language ${this.language}`);
    }
    const wrapper = new GettextWrapper((n2) => getPlural(n2, this.language));
    if (this.language in this.translations) {
      wrapper.addTranslations(this.translations[this.language]);
    }
    return wrapper;
  }
}
function getGettextBuilder() {
  return new GettextBuilder();
}
var toastify$1 = { exports: {} };
/*!
 * Toastify js 1.12.0
 * https://github.com/apvarun/toastify-js
 * @license MIT licensed
 *
 * Copyright (C) 2018 Varun A P
 */
var toastify = toastify$1.exports;
var hasRequiredToastify;
function requireToastify() {
  if (hasRequiredToastify) return toastify$1.exports;
  hasRequiredToastify = 1;
  (function(module) {
    (function(root, factory2) {
      if (module.exports) {
        module.exports = factory2();
      } else {
        root.Toastify = factory2();
      }
    })(toastify, function(global2) {
      var Toastify2 = function(options) {
        return new Toastify2.lib.init(options);
      }, version = "1.12.0";
      Toastify2.defaults = {
        oldestFirst: true,
        text: "Toastify is awesome!",
        node: void 0,
        duration: 3e3,
        selector: void 0,
        callback: function() {
        },
        destination: void 0,
        newWindow: false,
        close: false,
        gravity: "toastify-top",
        positionLeft: false,
        position: "",
        backgroundColor: "",
        avatar: "",
        className: "",
        stopOnFocus: true,
        onClick: function() {
        },
        offset: { x: 0, y: 0 },
        escapeMarkup: true,
        ariaLive: "polite",
        style: { background: "" }
      };
      Toastify2.lib = Toastify2.prototype = {
        toastify: version,
        constructor: Toastify2,
        // Initializing the object with required parameters
        init: function(options) {
          if (!options) {
            options = {};
          }
          this.options = {};
          this.toastElement = null;
          this.options.text = options.text || Toastify2.defaults.text;
          this.options.node = options.node || Toastify2.defaults.node;
          this.options.duration = options.duration === 0 ? 0 : options.duration || Toastify2.defaults.duration;
          this.options.selector = options.selector || Toastify2.defaults.selector;
          this.options.callback = options.callback || Toastify2.defaults.callback;
          this.options.destination = options.destination || Toastify2.defaults.destination;
          this.options.newWindow = options.newWindow || Toastify2.defaults.newWindow;
          this.options.close = options.close || Toastify2.defaults.close;
          this.options.gravity = options.gravity === "bottom" ? "toastify-bottom" : Toastify2.defaults.gravity;
          this.options.positionLeft = options.positionLeft || Toastify2.defaults.positionLeft;
          this.options.position = options.position || Toastify2.defaults.position;
          this.options.backgroundColor = options.backgroundColor || Toastify2.defaults.backgroundColor;
          this.options.avatar = options.avatar || Toastify2.defaults.avatar;
          this.options.className = options.className || Toastify2.defaults.className;
          this.options.stopOnFocus = options.stopOnFocus === void 0 ? Toastify2.defaults.stopOnFocus : options.stopOnFocus;
          this.options.onClick = options.onClick || Toastify2.defaults.onClick;
          this.options.offset = options.offset || Toastify2.defaults.offset;
          this.options.escapeMarkup = options.escapeMarkup !== void 0 ? options.escapeMarkup : Toastify2.defaults.escapeMarkup;
          this.options.ariaLive = options.ariaLive || Toastify2.defaults.ariaLive;
          this.options.style = options.style || Toastify2.defaults.style;
          if (options.backgroundColor) {
            this.options.style.background = options.backgroundColor;
          }
          return this;
        },
        // Building the DOM element
        buildToast: function() {
          if (!this.options) {
            throw "Toastify is not initialized";
          }
          var divElement = document.createElement("div");
          divElement.className = "toastify on " + this.options.className;
          if (!!this.options.position) {
            divElement.className += " toastify-" + this.options.position;
          } else {
            if (this.options.positionLeft === true) {
              divElement.className += " toastify-left";
              console.warn("Property `positionLeft` will be depreciated in further versions. Please use `position` instead.");
            } else {
              divElement.className += " toastify-right";
            }
          }
          divElement.className += " " + this.options.gravity;
          if (this.options.backgroundColor) {
            console.warn('DEPRECATION NOTICE: "backgroundColor" is being deprecated. Please use the "style.background" property.');
          }
          for (var property in this.options.style) {
            divElement.style[property] = this.options.style[property];
          }
          if (this.options.ariaLive) {
            divElement.setAttribute("aria-live", this.options.ariaLive);
          }
          if (this.options.node && this.options.node.nodeType === Node.ELEMENT_NODE) {
            divElement.appendChild(this.options.node);
          } else {
            if (this.options.escapeMarkup) {
              divElement.innerText = this.options.text;
            } else {
              divElement.innerHTML = this.options.text;
            }
            if (this.options.avatar !== "") {
              var avatarElement = document.createElement("img");
              avatarElement.src = this.options.avatar;
              avatarElement.className = "toastify-avatar";
              if (this.options.position == "left" || this.options.positionLeft === true) {
                divElement.appendChild(avatarElement);
              } else {
                divElement.insertAdjacentElement("afterbegin", avatarElement);
              }
            }
          }
          if (this.options.close === true) {
            var closeElement = document.createElement("button");
            closeElement.type = "button";
            closeElement.setAttribute("aria-label", "Close");
            closeElement.className = "toast-close";
            closeElement.innerHTML = "&#10006;";
            closeElement.addEventListener(
              "click",
              function(event) {
                event.stopPropagation();
                this.removeElement(this.toastElement);
                window.clearTimeout(this.toastElement.timeOutValue);
              }.bind(this)
            );
            var width = window.innerWidth > 0 ? window.innerWidth : screen.width;
            if ((this.options.position == "left" || this.options.positionLeft === true) && width > 360) {
              divElement.insertAdjacentElement("afterbegin", closeElement);
            } else {
              divElement.appendChild(closeElement);
            }
          }
          if (this.options.stopOnFocus && this.options.duration > 0) {
            var self2 = this;
            divElement.addEventListener(
              "mouseover",
              function(event) {
                window.clearTimeout(divElement.timeOutValue);
              }
            );
            divElement.addEventListener(
              "mouseleave",
              function() {
                divElement.timeOutValue = window.setTimeout(
                  function() {
                    self2.removeElement(divElement);
                  },
                  self2.options.duration
                );
              }
            );
          }
          if (typeof this.options.destination !== "undefined") {
            divElement.addEventListener(
              "click",
              function(event) {
                event.stopPropagation();
                if (this.options.newWindow === true) {
                  window.open(this.options.destination, "_blank");
                } else {
                  window.location = this.options.destination;
                }
              }.bind(this)
            );
          }
          if (typeof this.options.onClick === "function" && typeof this.options.destination === "undefined") {
            divElement.addEventListener(
              "click",
              function(event) {
                event.stopPropagation();
                this.options.onClick();
              }.bind(this)
            );
          }
          if (typeof this.options.offset === "object") {
            var x2 = getAxisOffsetAValue("x", this.options);
            var y2 = getAxisOffsetAValue("y", this.options);
            var xOffset = this.options.position == "left" ? x2 : "-" + x2;
            var yOffset = this.options.gravity == "toastify-top" ? y2 : "-" + y2;
            divElement.style.transform = "translate(" + xOffset + "," + yOffset + ")";
          }
          return divElement;
        },
        // Displaying the toast
        showToast: function() {
          this.toastElement = this.buildToast();
          var rootElement;
          if (typeof this.options.selector === "string") {
            rootElement = document.getElementById(this.options.selector);
          } else if (this.options.selector instanceof HTMLElement || typeof ShadowRoot !== "undefined" && this.options.selector instanceof ShadowRoot) {
            rootElement = this.options.selector;
          } else {
            rootElement = document.body;
          }
          if (!rootElement) {
            throw "Root element is not defined";
          }
          var elementToInsert = Toastify2.defaults.oldestFirst ? rootElement.firstChild : rootElement.lastChild;
          rootElement.insertBefore(this.toastElement, elementToInsert);
          Toastify2.reposition();
          if (this.options.duration > 0) {
            this.toastElement.timeOutValue = window.setTimeout(
              function() {
                this.removeElement(this.toastElement);
              }.bind(this),
              this.options.duration
            );
          }
          return this;
        },
        hideToast: function() {
          if (this.toastElement.timeOutValue) {
            clearTimeout(this.toastElement.timeOutValue);
          }
          this.removeElement(this.toastElement);
        },
        // Removing the element from the DOM
        removeElement: function(toastElement) {
          toastElement.className = toastElement.className.replace(" on", "");
          window.setTimeout(
            function() {
              if (this.options.node && this.options.node.parentNode) {
                this.options.node.parentNode.removeChild(this.options.node);
              }
              if (toastElement.parentNode) {
                toastElement.parentNode.removeChild(toastElement);
              }
              this.options.callback.call(toastElement);
              Toastify2.reposition();
            }.bind(this),
            400
          );
        }
      };
      Toastify2.reposition = function() {
        var topLeftOffsetSize = {
          top: 15,
          bottom: 15
        };
        var topRightOffsetSize = {
          top: 15,
          bottom: 15
        };
        var offsetSize = {
          top: 15,
          bottom: 15
        };
        var allToasts = document.getElementsByClassName("toastify");
        var classUsed;
        for (var i2 = 0; i2 < allToasts.length; i2++) {
          if (containsClass(allToasts[i2], "toastify-top") === true) {
            classUsed = "toastify-top";
          } else {
            classUsed = "toastify-bottom";
          }
          var height = allToasts[i2].offsetHeight;
          classUsed = classUsed.substr(9, classUsed.length - 1);
          var offset2 = 15;
          var width = window.innerWidth > 0 ? window.innerWidth : screen.width;
          if (width <= 360) {
            allToasts[i2].style[classUsed] = offsetSize[classUsed] + "px";
            offsetSize[classUsed] += height + offset2;
          } else {
            if (containsClass(allToasts[i2], "toastify-left") === true) {
              allToasts[i2].style[classUsed] = topLeftOffsetSize[classUsed] + "px";
              topLeftOffsetSize[classUsed] += height + offset2;
            } else {
              allToasts[i2].style[classUsed] = topRightOffsetSize[classUsed] + "px";
              topRightOffsetSize[classUsed] += height + offset2;
            }
          }
        }
        return this;
      };
      function getAxisOffsetAValue(axis, options) {
        if (options.offset[axis]) {
          if (isNaN(options.offset[axis])) {
            return options.offset[axis];
          } else {
            return options.offset[axis] + "px";
          }
        }
        return "0px";
      }
      function containsClass(elem, yourClass) {
        if (!elem || typeof yourClass !== "string") {
          return false;
        } else if (elem.className && elem.className.trim().split(/\s+/gi).indexOf(yourClass) > -1) {
          return true;
        } else {
          return false;
        }
      }
      Toastify2.lib.init.prototype = Toastify2.lib;
      return Toastify2;
    });
  })(toastify$1);
  return toastify$1.exports;
}
var toastifyExports = requireToastify();
const Toastify = /* @__PURE__ */ getDefaultExportFromCjs(toastifyExports);
window._nc_vue_element_id = window._nc_vue_element_id ?? 0;
/*!
 * SPDX-FileCopyrightText: Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
const gettext = getGettextBuilder().detectLanguage().build();
const t = (...args) => gettext.gettext(...args);
function register(...chunks) {
  for (const chunk of chunks) {
    if (chunk.registered) {
      continue;
    }
    for (const { l: language, t: translations } of chunk) {
      if (language !== getLanguage() || !translations) {
        continue;
      }
      const decompressed = Object.fromEntries(Object.entries(translations).map(([id, value]) => [
        id,
        {
          msgid: id,
          msgid_plural: value.p,
          msgstr: value.v
        }
      ]));
      gettext.addTranslations({
        translations: {
          "": decompressed
        }
      });
    }
    chunk.registered = true;
  }
}
const t2 = [{ "l": "ar", "t": { "a few seconds ago": { "v": ["منذ عدة ثوانٍ"] }, "sec. ago": { "v": ["ثانية مضت"] }, "seconds ago": { "v": ["ثوانٍ مضت"] } } }, { "l": "ast", "t": { "a few seconds ago": { "v": ["hai unos segundos"] }, "sec. ago": { "v": ["hai segs"] }, "seconds ago": { "v": ["hai segundos"] } } }, { "l": "br", "t": {} }, { "l": "ca", "t": {} }, { "l": "cs", "t": { "a few seconds ago": { "v": ["před několika sekundami"] }, "sec. ago": { "v": ["sek. před"] }, "seconds ago": { "v": ["sekund předtím"] } } }, { "l": "cs-CZ", "t": { "a few seconds ago": { "v": ["před několika sekundami"] }, "sec. ago": { "v": ["sek. před"] }, "seconds ago": { "v": ["sekund předtím"] } } }, { "l": "da", "t": { "a few seconds ago": { "v": ["et par sekunder siden"] }, "sec. ago": { "v": ["sek. siden"] }, "seconds ago": { "v": ["sekunder siden"] } } }, { "l": "de", "t": { "a few seconds ago": { "v": ["vor ein paar Sekunden"] }, "sec. ago": { "v": ["Sek. zuvor"] }, "seconds ago": { "v": ["Sekunden zuvor"] } } }, { "l": "de-DE", "t": { "a few seconds ago": { "v": ["vor ein paar Sekunden"] }, "sec. ago": { "v": ["Sek. zuvor"] }, "seconds ago": { "v": ["Sekunden zuvor"] } } }, { "l": "el", "t": { "a few seconds ago": { "v": ["πριν λίγα δευτερόλεπτα"] }, "sec. ago": { "v": ["δευτ. πριν"] }, "seconds ago": { "v": ["δευτερόλεπτα πριν"] } } }, { "l": "en-GB", "t": { "a few seconds ago": { "v": ["a few seconds ago"] }, "sec. ago": { "v": ["sec. ago"] }, "seconds ago": { "v": ["seconds ago"] } } }, { "l": "eo", "t": {} }, { "l": "es", "t": { "a few seconds ago": { "v": ["hace unos pocos segundos"] }, "sec. ago": { "v": ["hace segundos"] }, "seconds ago": { "v": ["segundos atrás"] } } }, { "l": "es-AR", "t": { "a few seconds ago": { "v": ["hace unos segundos"] }, "sec. ago": { "v": ["seg. atrás"] }, "seconds ago": { "v": ["segundos atrás"] } } }, { "l": "es-EC", "t": { "a few seconds ago": { "v": ["hace unos segundos"] }, "sec. ago": { "v": ["hace segundos"] }, "seconds ago": { "v": ["Segundos atrás"] } } }, { "l": "es-MX", "t": { "a few seconds ago": { "v": ["hace unos segundos"] }, "sec. ago": { "v": ["seg. atrás"] }, "seconds ago": { "v": ["segundos atrás"] } } }, { "l": "et-EE", "t": { "a few seconds ago": { "v": ["mõni sekund tagasi"] }, "sec. ago": { "v": ["sek. tagasi"] }, "seconds ago": { "v": ["sekundit tagasi"] } } }, { "l": "eu", "t": { "a few seconds ago": { "v": ["duela segundo batzuk"] }, "sec. ago": { "v": ["duela seg."] }, "seconds ago": { "v": ["duela segundo"] } } }, { "l": "fa", "t": { "a few seconds ago": { "v": ["چند ثانیه پیش"] }, "sec. ago": { "v": ["چند ثانیه پیش"] }, "seconds ago": { "v": ["چند ثانیه پیش"] } } }, { "l": "fi", "t": { "a few seconds ago": { "v": ["muutamia sekunteja sitten"] }, "sec. ago": { "v": ["sek. sitten"] }, "seconds ago": { "v": ["sekunteja sitten"] } } }, { "l": "fr", "t": { "a few seconds ago": { "v": ["il y a quelques instants"] }, "sec. ago": { "v": ["il y a qq. sec."] }, "seconds ago": { "v": ["il y a quelques secondes"] } } }, { "l": "ga", "t": { "a few seconds ago": { "v": ["cúpla soicind ó shin"] }, "sec. ago": { "v": ["soic. ó shin"] }, "seconds ago": { "v": ["soicind ó shin"] } } }, { "l": "gl", "t": { "a few seconds ago": { "v": ["hai uns segundos"] }, "sec. ago": { "v": ["segs. atrás"] }, "seconds ago": { "v": ["segundos atrás"] } } }, { "l": "he", "t": { "a few seconds ago": { "v": ["לפני מספר שניות"] }, "sec. ago": { "v": ["לפני מספר שניות"] }, "seconds ago": { "v": ["לפני מס׳ שניות"] } } }, { "l": "hr", "t": { "a few seconds ago": { "v": ["prije nekoliko sekundi"] }, "sec. ago": { "v": ["prije nek. sek."] }, "seconds ago": { "v": ["prije nek. sek."] } } }, { "l": "hu", "t": { "a few seconds ago": { "v": ["néhány másodperce"] }, "sec. ago": { "v": ["másodperce"] }, "seconds ago": { "v": ["másodperce"] } } }, { "l": "id", "t": { "a few seconds ago": { "v": ["beberapa detik yang lalu"] }, "sec. ago": { "v": ["dtk. yang lalu"] }, "seconds ago": { "v": ["beberapa detik lalu"] } } }, { "l": "is", "t": { "a few seconds ago": { "v": ["fyrir örfáum sekúndum síðan"] }, "sec. ago": { "v": ["sek. síðan"] }, "seconds ago": { "v": ["sekúndum síðan"] } } }, { "l": "it", "t": { "a few seconds ago": { "v": ["pochi secondi fa"] }, "sec. ago": { "v": ["sec. fa"] }, "seconds ago": { "v": ["secondi fa"] } } }, { "l": "ja", "t": { "a few seconds ago": { "v": ["数秒前"] }, "sec. ago": { "v": ["秒前"] }, "seconds ago": { "v": ["数秒前"] } } }, { "l": "ja-JP", "t": { "a few seconds ago": { "v": ["数秒前"] }, "sec. ago": { "v": ["秒前"] }, "seconds ago": { "v": ["数秒前"] } } }, { "l": "ko", "t": { "a few seconds ago": { "v": ["방금 전"] }, "sec. ago": { "v": ["몇 초 전"] }, "seconds ago": { "v": ["초 전"] } } }, { "l": "lo", "t": { "a few seconds ago": { "v": ["ສອງສາມວິນາທີກ່ອນ"] }, "sec. ago": { "v": ["ວິ. ກ່ອນ"] }, "seconds ago": { "v": ["ວິນາທີກ່ອນ"] } } }, { "l": "lt-LT", "t": { "a few seconds ago": { "v": ["prieš keletą sekundžių"] }, "sec. ago": { "v": ["prieš sek."] }, "seconds ago": { "v": ["prieš sekundes"] } } }, { "l": "lv", "t": {} }, { "l": "mk", "t": { "a few seconds ago": { "v": ["пред неколку секунди"] }, "sec. ago": { "v": ["секунда"] }, "seconds ago": { "v": ["секунди"] } } }, { "l": "mn", "t": { "a few seconds ago": { "v": ["хэдхэн секундын өмнө"] }, "sec. ago": { "v": ["сек. өмнө"] }, "seconds ago": { "v": ["секундын өмнө"] } } }, { "l": "my", "t": {} }, { "l": "nb", "t": { "a few seconds ago": { "v": ["noen få sekunder siden"] }, "sec. ago": { "v": ["sek. siden"] }, "seconds ago": { "v": ["sekunder siden"] } } }, { "l": "nl", "t": { "a few seconds ago": { "v": ["enkele seconden geleden"] }, "sec. ago": { "v": ["sec. geleden"] }, "seconds ago": { "v": ["seconden geleden"] } } }, { "l": "oc", "t": {} }, { "l": "pl", "t": { "a few seconds ago": { "v": ["kilka sekund temu"] }, "sec. ago": { "v": ["sek. temu"] }, "seconds ago": { "v": ["sekund temu"] } } }, { "l": "pt-BR", "t": { "a few seconds ago": { "v": ["há alguns segundos"] }, "sec. ago": { "v": ["seg. atrás"] }, "seconds ago": { "v": ["segundos atrás"] } } }, { "l": "pt-PT", "t": { "a few seconds ago": { "v": ["há alguns segundos"] }, "sec. ago": { "v": ["seg. atrás"] }, "seconds ago": { "v": ["segundos atrás"] } } }, { "l": "ro", "t": { "a few seconds ago": { "v": ["acum câteva secunde"] }, "sec. ago": { "v": ["sec. în urmă"] }, "seconds ago": { "v": ["secunde în urmă"] } } }, { "l": "ru", "t": { "a few seconds ago": { "v": ["несколько секунд назад"] }, "sec. ago": { "v": ["сек. назад"] }, "seconds ago": { "v": ["секунд назад"] } } }, { "l": "sk", "t": { "a few seconds ago": { "v": ["pred chvíľou"] }, "sec. ago": { "v": ["pred pár sekundami"] }, "seconds ago": { "v": ["pred sekundami"] } } }, { "l": "sl", "t": {} }, { "l": "sr", "t": { "a few seconds ago": { "v": ["пре неколико секунди"] }, "sec. ago": { "v": ["сек. раније"] }, "seconds ago": { "v": ["секунди раније"] } } }, { "l": "sv", "t": { "a few seconds ago": { "v": ["några sekunder sedan"] }, "sec. ago": { "v": ["sek. sedan"] }, "seconds ago": { "v": ["sekunder sedan"] } } }, { "l": "tr", "t": { "a few seconds ago": { "v": ["birkaç saniye önce"] }, "sec. ago": { "v": ["sn. önce"] }, "seconds ago": { "v": ["saniye önce"] } } }, { "l": "uk", "t": { "a few seconds ago": { "v": ["декілька секунд тому"] }, "sec. ago": { "v": ["с тому"] }, "seconds ago": { "v": ["с тому"] } } }, { "l": "uz", "t": { "a few seconds ago": { "v": ["bir necha soniya oldin"] }, "sec. ago": { "v": ["sek. oldin"] }, "seconds ago": { "v": ["soniyalar oldin"] } } }, { "l": "zh-CN", "t": { "a few seconds ago": { "v": ["几秒前"] }, "sec. ago": { "v": ["几秒前"] }, "seconds ago": { "v": ["几秒前"] } } }, { "l": "zh-HK", "t": { "a few seconds ago": { "v": ["幾秒前"] }, "sec. ago": { "v": ["秒前"] }, "seconds ago": { "v": ["秒前"] } } }, { "l": "zh-TW", "t": { "a few seconds ago": { "v": ["幾秒前"] }, "sec. ago": { "v": ["秒前"] }, "seconds ago": { "v": ["秒前"] } } }];
const t4 = [{ "l": "ar", "t": { "Actions": { "v": ["إجراءات"] } } }, { "l": "ast", "t": { "Actions": { "v": ["Aiciones"] } } }, { "l": "br", "t": { "Actions": { "v": ["Oberioù"] } } }, { "l": "ca", "t": { "Actions": { "v": ["Accions"] } } }, { "l": "cs", "t": { "Actions": { "v": ["Akce"] } } }, { "l": "cs-CZ", "t": { "Actions": { "v": ["Akce"] } } }, { "l": "da", "t": { "Actions": { "v": ["Handlinger"] } } }, { "l": "de", "t": { "Actions": { "v": ["Aktionen"] } } }, { "l": "de-DE", "t": { "Actions": { "v": ["Aktionen"] } } }, { "l": "el", "t": { "Actions": { "v": ["Ενέργειες"] } } }, { "l": "en-GB", "t": { "Actions": { "v": ["Actions"] } } }, { "l": "eo", "t": { "Actions": { "v": ["Agoj"] } } }, { "l": "es", "t": { "Actions": { "v": ["Acciones"] } } }, { "l": "es-AR", "t": { "Actions": { "v": ["Acciones"] } } }, { "l": "es-EC", "t": { "Actions": { "v": ["Acciones"] } } }, { "l": "es-MX", "t": { "Actions": { "v": ["Acciones"] } } }, { "l": "et-EE", "t": { "Actions": { "v": ["Tegevus"] } } }, { "l": "eu", "t": { "Actions": { "v": ["Ekintzak"] } } }, { "l": "fa", "t": { "Actions": { "v": ["کنش‌ها"] } } }, { "l": "fi", "t": { "Actions": { "v": ["Toiminnot"] } } }, { "l": "fr", "t": { "Actions": { "v": ["Actions"] } } }, { "l": "ga", "t": { "Actions": { "v": ["Gníomhartha"] } } }, { "l": "gl", "t": { "Actions": { "v": ["Accións"] } } }, { "l": "he", "t": { "Actions": { "v": ["פעולות"] } } }, { "l": "hr", "t": { "Actions": { "v": ["Radnje"] } } }, { "l": "hu", "t": { "Actions": { "v": ["Műveletek"] } } }, { "l": "id", "t": { "Actions": { "v": ["Tindakan"] } } }, { "l": "is", "t": { "Actions": { "v": ["Aðgerðir"] } } }, { "l": "it", "t": { "Actions": { "v": ["Azioni"] } } }, { "l": "ja", "t": { "Actions": { "v": ["操作"] } } }, { "l": "ja-JP", "t": { "Actions": { "v": ["操作"] } } }, { "l": "ko", "t": { "Actions": { "v": ["동작"] } } }, { "l": "lo", "t": { "Actions": { "v": ["ການກະທຳ"] } } }, { "l": "lt-LT", "t": { "Actions": { "v": ["Veiksmai"] } } }, { "l": "lv", "t": {} }, { "l": "mk", "t": { "Actions": { "v": ["Акции"] } } }, { "l": "mn", "t": { "Actions": { "v": ["Үйлдлүүд"] } } }, { "l": "my", "t": { "Actions": { "v": ["လုပ်ဆောင်ချက်များ"] } } }, { "l": "nb", "t": { "Actions": { "v": ["Handlinger"] } } }, { "l": "nl", "t": { "Actions": { "v": ["Acties"] } } }, { "l": "oc", "t": { "Actions": { "v": ["Accions"] } } }, { "l": "pl", "t": { "Actions": { "v": ["Działania"] } } }, { "l": "pt-BR", "t": { "Actions": { "v": ["Ações"] } } }, { "l": "pt-PT", "t": { "Actions": { "v": ["Ações"] } } }, { "l": "ro", "t": { "Actions": { "v": ["Acțiuni"] } } }, { "l": "ru", "t": { "Actions": { "v": ["Действия "] } } }, { "l": "sk", "t": { "Actions": { "v": ["Akcie"] } } }, { "l": "sl", "t": { "Actions": { "v": ["Dejanja"] } } }, { "l": "sr", "t": { "Actions": { "v": ["Радње"] } } }, { "l": "sv", "t": { "Actions": { "v": ["Åtgärder"] } } }, { "l": "tr", "t": { "Actions": { "v": ["İşlemler"] } } }, { "l": "uk", "t": { "Actions": { "v": ["Дії"] } } }, { "l": "uz", "t": { "Actions": { "v": ["Harakatlar"] } } }, { "l": "zh-CN", "t": { "Actions": { "v": ["行为"] } } }, { "l": "zh-HK", "t": { "Actions": { "v": ["動作"] } } }, { "l": "zh-TW", "t": { "Actions": { "v": ["動作"] } } }];
const t19 = [{ "l": "ar", "t": { "Close": { "v": ["إغلاق"] } } }, { "l": "ast", "t": { "Close": { "v": ["Zarrar"] } } }, { "l": "br", "t": { "Close": { "v": ["Serriñ"] } } }, { "l": "ca", "t": { "Close": { "v": ["Tanca"] } } }, { "l": "cs", "t": { "Close": { "v": ["Zavřít"] } } }, { "l": "cs-CZ", "t": { "Close": { "v": ["Zavřít"] } } }, { "l": "da", "t": { "Close": { "v": ["Luk"] } } }, { "l": "de", "t": { "Close": { "v": ["Schließen"] } } }, { "l": "de-DE", "t": { "Close": { "v": ["Schließen"] } } }, { "l": "el", "t": { "Close": { "v": ["Κλείσιμο"] } } }, { "l": "en-GB", "t": { "Close": { "v": ["Close"] } } }, { "l": "eo", "t": { "Close": { "v": ["Fermu"] } } }, { "l": "es", "t": { "Close": { "v": ["Cerrar"] } } }, { "l": "es-AR", "t": { "Close": { "v": ["Cerrar"] } } }, { "l": "es-EC", "t": { "Close": { "v": ["Cerrar"] } } }, { "l": "es-MX", "t": { "Close": { "v": ["Cerrar"] } } }, { "l": "et-EE", "t": { "Close": { "v": ["Sulge"] } } }, { "l": "eu", "t": { "Close": { "v": ["Itxi"] } } }, { "l": "fa", "t": { "Close": { "v": ["بستن"] } } }, { "l": "fi", "t": { "Close": { "v": ["Sulje"] } } }, { "l": "fr", "t": { "Close": { "v": ["Fermer"] } } }, { "l": "ga", "t": { "Close": { "v": ["Dún"] } } }, { "l": "gl", "t": { "Close": { "v": ["Pechar"] } } }, { "l": "he", "t": { "Close": { "v": ["סגירה"] } } }, { "l": "hr", "t": { "Close": { "v": ["Zatvori"] } } }, { "l": "hu", "t": { "Close": { "v": ["Bezárás"] } } }, { "l": "id", "t": { "Close": { "v": ["Tutup"] } } }, { "l": "is", "t": { "Close": { "v": ["Loka"] } } }, { "l": "it", "t": { "Close": { "v": ["Chiudi"] } } }, { "l": "ja", "t": { "Close": { "v": ["閉じる"] } } }, { "l": "ja-JP", "t": { "Close": { "v": ["閉じる"] } } }, { "l": "ko", "t": { "Close": { "v": ["닫기"] } } }, { "l": "lo", "t": { "Close": { "v": ["ປິດ"] } } }, { "l": "lt-LT", "t": { "Close": { "v": ["Užverti"] } } }, { "l": "lv", "t": { "Close": { "v": ["Aizvērt"] } } }, { "l": "mk", "t": { "Close": { "v": ["Затвори"] } } }, { "l": "mn", "t": { "Close": { "v": ["Хаах"] } } }, { "l": "my", "t": { "Close": { "v": ["ပိတ်ရန်"] } } }, { "l": "nb", "t": { "Close": { "v": ["Lukk"] } } }, { "l": "nl", "t": { "Close": { "v": ["Sluiten"] } } }, { "l": "oc", "t": { "Close": { "v": ["Tampar"] } } }, { "l": "pl", "t": { "Close": { "v": ["Zamknij"] } } }, { "l": "pt-BR", "t": { "Close": { "v": ["Fechar"] } } }, { "l": "pt-PT", "t": { "Close": { "v": ["Fechar"] } } }, { "l": "ro", "t": { "Close": { "v": ["Închideți"] } } }, { "l": "ru", "t": { "Close": { "v": ["Закрыть"] } } }, { "l": "sk", "t": { "Close": { "v": ["Zavrieť"] } } }, { "l": "sl", "t": { "Close": { "v": ["Zapri"] } } }, { "l": "sr", "t": { "Close": { "v": ["Затвори"] } } }, { "l": "sv", "t": { "Close": { "v": ["Stäng"] } } }, { "l": "tr", "t": { "Close": { "v": ["Kapat"] } } }, { "l": "uk", "t": { "Close": { "v": ["Закрити"] } } }, { "l": "uz", "t": { "Close": { "v": ["Yopish"] } } }, { "l": "zh-CN", "t": { "Close": { "v": ["关闭"] } } }, { "l": "zh-HK", "t": { "Close": { "v": ["關閉"] } } }, { "l": "zh-TW", "t": { "Close": { "v": ["關閉"] } } }];
const t33 = [{ "l": "ar", "t": { "Loading …": { "v": ["التحميل جارٍ ..."] } } }, { "l": "ast", "t": {} }, { "l": "br", "t": {} }, { "l": "ca", "t": {} }, { "l": "cs", "t": { "Loading …": { "v": ["Načítání …"] } } }, { "l": "cs-CZ", "t": {} }, { "l": "da", "t": { "Loading …": { "v": ["Indlæser ..."] } } }, { "l": "de", "t": { "Loading …": { "v": ["Wird geladen …"] } } }, { "l": "de-DE", "t": { "Loading …": { "v": ["Wird geladen …"] } } }, { "l": "el", "t": { "Loading …": { "v": ["Φόρτωση  …"] } } }, { "l": "en-GB", "t": { "Loading …": { "v": ["Loading …"] } } }, { "l": "eo", "t": {} }, { "l": "es", "t": {} }, { "l": "es-AR", "t": {} }, { "l": "es-EC", "t": {} }, { "l": "es-MX", "t": {} }, { "l": "et-EE", "t": { "Loading …": { "v": ["Laadin…"] } } }, { "l": "eu", "t": {} }, { "l": "fa", "t": { "Loading …": { "v": ["در حال بارگذاری ..."] } } }, { "l": "fi", "t": { "Loading …": { "v": ["Ladataan ..."] } } }, { "l": "fr", "t": { "Loading …": { "v": ["Chargement..."] } } }, { "l": "ga", "t": { "Loading …": { "v": ["Ag lódáil …"] } } }, { "l": "gl", "t": { "Loading …": { "v": ["Cargando…"] } } }, { "l": "he", "t": {} }, { "l": "hr", "t": { "Loading …": { "v": ["Učitavanje …"] } } }, { "l": "hu", "t": { "Loading …": { "v": ["Betöltés…"] } } }, { "l": "id", "t": { "Loading …": { "v": ["Memuat …"] } } }, { "l": "is", "t": { "Loading …": { "v": ["Hleð inn …"] } } }, { "l": "it", "t": {} }, { "l": "ja", "t": { "Loading …": { "v": ["読み込み中 …"] } } }, { "l": "ja-JP", "t": {} }, { "l": "ko", "t": { "Loading …": { "v": ["로딩 중 ..."] } } }, { "l": "lo", "t": { "Loading …": { "v": ["ກຳລັງໂຫຼດ…"] } } }, { "l": "lt-LT", "t": { "Loading …": { "v": ["Įkeliama …"] } } }, { "l": "lv", "t": {} }, { "l": "mk", "t": { "Loading …": { "v": ["Вчитување …"] } } }, { "l": "mn", "t": { "Loading …": { "v": ["Ачаалж байна …"] } } }, { "l": "my", "t": {} }, { "l": "nb", "t": { "Loading …": { "v": ["Laster inn..."] } } }, { "l": "nl", "t": { "Loading …": { "v": ["Laden …"] } } }, { "l": "oc", "t": {} }, { "l": "pl", "t": { "Loading …": { "v": ["Wczytywanie…"] } } }, { "l": "pt-BR", "t": { "Loading …": { "v": ["Carregando …"] } } }, { "l": "pt-PT", "t": { "Loading …": { "v": ["A carregar..."] } } }, { "l": "ro", "t": {} }, { "l": "ru", "t": { "Loading …": { "v": ["Загрузка …"] } } }, { "l": "sk", "t": { "Loading …": { "v": ["Nahrávam ..."] } } }, { "l": "sl", "t": {} }, { "l": "sr", "t": { "Loading …": { "v": ["Учитава се…"] } } }, { "l": "sv", "t": { "Loading …": { "v": ["Laddar …"] } } }, { "l": "tr", "t": { "Loading …": { "v": ["Yükleniyor…"] } } }, { "l": "uk", "t": { "Loading …": { "v": ["Завантаження …"] } } }, { "l": "uz", "t": { "Loading …": { "v": ["Yuklanmoqda..."] } } }, { "l": "zh-CN", "t": { "Loading …": { "v": ["加载中..."] } } }, { "l": "zh-HK", "t": { "Loading …": { "v": ["加載中 …"] } } }, { "l": "zh-TW", "t": { "Loading …": { "v": ["載入中......"] } } }];
const t36 = [{ "l": "ar", "t": { "Next": { "v": ["التالي"] }, "Pause slideshow": { "v": ["تجميد عرض الشرائح"] }, "Previous": { "v": ["السابق"] }, "Start slideshow": { "v": ["إبدإ العرض"] } } }, { "l": "ast", "t": { "Next": { "v": ["Siguiente"] }, "Pause slideshow": { "v": ["Posar la presentación de diapositives"] }, "Previous": { "v": ["Anterior"] }, "Start slideshow": { "v": ["Aniciar la presentación de diapositives"] } } }, { "l": "br", "t": { "Next": { "v": ["Da heul"] }, "Pause slideshow": { "v": ["Arsav an diaporama"] }, "Previous": { "v": ["A-raok"] }, "Start slideshow": { "v": ["Kregiñ an diaporama"] } } }, { "l": "ca", "t": { "Next": { "v": ["Següent"] }, "Pause slideshow": { "v": ["Atura la presentació"] }, "Previous": { "v": ["Anterior"] }, "Start slideshow": { "v": ["Inicia la presentació"] } } }, { "l": "cs", "t": { "Next": { "v": ["Následující"] }, "Pause slideshow": { "v": ["Pozastavit prezentaci"] }, "Previous": { "v": ["Předchozí"] }, "Start slideshow": { "v": ["Spustit prezentaci"] } } }, { "l": "cs-CZ", "t": { "Next": { "v": ["Následující"] }, "Pause slideshow": { "v": ["Pozastavit prezentaci"] }, "Previous": { "v": ["Předchozí"] }, "Start slideshow": { "v": ["Spustit prezentaci"] } } }, { "l": "da", "t": { "Next": { "v": ["Videre"] }, "Pause slideshow": { "v": ["Suspender fremvisning"] }, "Previous": { "v": ["Forrige"] }, "Start slideshow": { "v": ["Start fremvisning"] } } }, { "l": "de", "t": { "Next": { "v": ["Weiter"] }, "Pause slideshow": { "v": ["Diashow pausieren"] }, "Previous": { "v": ["Vorherige"] }, "Start slideshow": { "v": ["Diashow starten"] } } }, { "l": "de-DE", "t": { "Next": { "v": ["Weiter"] }, "Pause slideshow": { "v": ["Diashow pausieren"] }, "Previous": { "v": ["Vorherige"] }, "Start slideshow": { "v": ["Diashow starten"] } } }, { "l": "el", "t": { "Next": { "v": ["Επόμενο"] }, "Pause slideshow": { "v": ["Παύση προβολής διαφανειών"] }, "Previous": { "v": ["Προηγούμενο"] }, "Start slideshow": { "v": ["Έναρξη προβολής διαφανειών"] } } }, { "l": "en-GB", "t": { "Next": { "v": ["Next"] }, "Pause slideshow": { "v": ["Pause slideshow"] }, "Previous": { "v": ["Previous"] }, "Start slideshow": { "v": ["Start slideshow"] } } }, { "l": "eo", "t": { "Next": { "v": ["Sekva"] }, "Pause slideshow": { "v": ["Payzi bildprezenton"] }, "Previous": { "v": ["Antaŭa"] }, "Start slideshow": { "v": ["Komenci bildprezenton"] } } }, { "l": "es", "t": { "Next": { "v": ["Siguiente"] }, "Pause slideshow": { "v": ["Pausar la presentación "] }, "Previous": { "v": ["Anterior"] }, "Start slideshow": { "v": ["Iniciar la presentación"] } } }, { "l": "es-AR", "t": { "Next": { "v": ["Siguiente"] }, "Pause slideshow": { "v": ["Pausar la presentación "] }, "Previous": { "v": ["Anterior"] }, "Start slideshow": { "v": ["Iniciar la presentación"] } } }, { "l": "es-EC", "t": { "Next": { "v": ["Siguiente"] }, "Pause slideshow": { "v": ["Pausar presentación de diapositivas"] }, "Previous": { "v": ["Anterior"] }, "Start slideshow": { "v": ["Iniciar presentación de diapositivas"] } } }, { "l": "es-MX", "t": { "Next": { "v": ["Siguiente"] }, "Pause slideshow": { "v": ["Pausar presentación de diapositivas"] }, "Previous": { "v": ["Anterior"] }, "Start slideshow": { "v": ["Iniciar presentación de diapositivas"] } } }, { "l": "et-EE", "t": { "Next": { "v": ["Edasi"] }, "Pause slideshow": { "v": ["Slaidiesitluse paus"] }, "Previous": { "v": ["Eelmine"] }, "Start slideshow": { "v": ["Alusta slaidiesitust"] } } }, { "l": "eu", "t": { "Next": { "v": ["Hurrengoa"] }, "Pause slideshow": { "v": ["Pausatu diaporama"] }, "Previous": { "v": ["Aurrekoa"] }, "Start slideshow": { "v": ["Hasi diaporama"] } } }, { "l": "fa", "t": { "Next": { "v": ["بعدی"] }, "Pause slideshow": { "v": ["توقف نمایش اسلاید"] }, "Previous": { "v": ["قبلی"] }, "Start slideshow": { "v": ["شروع نمایش اسلاید"] } } }, { "l": "fi", "t": { "Next": { "v": ["Seuraava"] }, "Pause slideshow": { "v": ["Keskeytä diaesitys"] }, "Previous": { "v": ["Edellinen"] }, "Start slideshow": { "v": ["Aloita diaesitys"] } } }, { "l": "fr", "t": { "Next": { "v": ["Suivant"] }, "Pause slideshow": { "v": ["Mettre le diaporama en pause"] }, "Previous": { "v": ["Précédent"] }, "Start slideshow": { "v": ["Démarrer le diaporama"] } } }, { "l": "ga", "t": { "Next": { "v": ["Ar aghaidh"] }, "Pause slideshow": { "v": ["Cuir taispeántas sleamhnán ar sos"] }, "Previous": { "v": ["Roimhe Seo"] }, "Start slideshow": { "v": ["Tosaigh taispeántas sleamhnán"] } } }, { "l": "gl", "t": { "Next": { "v": ["Seguinte"] }, "Pause slideshow": { "v": ["Pausar o diaporama"] }, "Previous": { "v": ["Anterir"] }, "Start slideshow": { "v": ["Iniciar o diaporama"] } } }, { "l": "he", "t": { "Next": { "v": ["הבא"] }, "Pause slideshow": { "v": ["השהיית מצגת"] }, "Previous": { "v": ["הקודם"] }, "Start slideshow": { "v": ["התחלת המצגת"] } } }, { "l": "hr", "t": { "Next": { "v": ["Sljedeće"] }, "Pause slideshow": { "v": ["Pauziraj dijaprojekciju"] }, "Previous": { "v": ["Prethodno"] }, "Start slideshow": { "v": ["Pokreni dijaprojekciju"] } } }, { "l": "hu", "t": { "Next": { "v": ["Következő"] }, "Pause slideshow": { "v": ["Diavetítés szüneteltetése"] }, "Previous": { "v": ["Előző"] }, "Start slideshow": { "v": ["Diavetítés indítása"] } } }, { "l": "id", "t": { "Next": { "v": ["Selanjutnya"] }, "Pause slideshow": { "v": ["Jeda tayangan slide"] }, "Previous": { "v": ["Sebelumnya"] }, "Start slideshow": { "v": ["Mulai salindia"] } } }, { "l": "is", "t": { "Next": { "v": ["Næsta"] }, "Pause slideshow": { "v": ["Gera hlé á skyggnusýningu"] }, "Previous": { "v": ["Fyrri"] }, "Start slideshow": { "v": ["Byrja skyggnusýningu"] } } }, { "l": "it", "t": { "Next": { "v": ["Successivo"] }, "Pause slideshow": { "v": ["Presentazione in pausa"] }, "Previous": { "v": ["Precedente"] }, "Start slideshow": { "v": ["Avvia presentazione"] } } }, { "l": "ja", "t": { "Next": { "v": ["次"] }, "Pause slideshow": { "v": ["スライドショーを一時停止"] }, "Previous": { "v": ["前"] }, "Start slideshow": { "v": ["スライドショーを開始"] } } }, { "l": "ja-JP", "t": { "Next": { "v": ["次"] }, "Pause slideshow": { "v": ["スライドショーを一時停止"] }, "Previous": { "v": ["前"] }, "Start slideshow": { "v": ["スライドショーを開始"] } } }, { "l": "ko", "t": { "Next": { "v": ["다음"] }, "Pause slideshow": { "v": ["슬라이드쇼 일시정지"] }, "Previous": { "v": ["이전"] }, "Start slideshow": { "v": ["슬라이드쇼 시작"] } } }, { "l": "lo", "t": { "Next": { "v": ["ຕໍ່ໄປ"] }, "Pause slideshow": { "v": ["ຢຸດສະໄລ້ໂຊຊົ່ວຄາວ"] }, "Previous": { "v": ["ກ່ອນໜ້າ"] }, "Start slideshow": { "v": ["ເລີ່ມສະໄລ້ໂຊ"] } } }, { "l": "lt-LT", "t": { "Next": { "v": ["Kitas"] }, "Pause slideshow": { "v": ["Pristabdyti skaidrių rodymą"] }, "Previous": { "v": ["Ankstesnis"] }, "Start slideshow": { "v": ["Pradėti skaidrių rodymą"] } } }, { "l": "lv", "t": { "Next": { "v": ["Nākamais"] }, "Pause slideshow": { "v": ["Pauzēt slaidrādi"] }, "Previous": { "v": ["Iepriekšējais"] }, "Start slideshow": { "v": ["Sākt slaidrādi"] } } }, { "l": "mk", "t": { "Next": { "v": ["Следно"] }, "Pause slideshow": { "v": ["Пузирај слајдшоу"] }, "Previous": { "v": ["Предходно"] }, "Start slideshow": { "v": ["Стартувај слајдшоу"] } } }, { "l": "mn", "t": { "Next": { "v": ["Дараах"] }, "Pause slideshow": { "v": ["Слайд шоуг түр зогсоох"] }, "Previous": { "v": ["Өмнөх"] }, "Start slideshow": { "v": ["Слайд шоуг эхлүүлэх"] } } }, { "l": "my", "t": { "Next": { "v": ["နောက်သို့ဆက်ရန်"] }, "Pause slideshow": { "v": ["စလိုက်ရှိုး ခေတ္တရပ်ရန်"] }, "Previous": { "v": ["ယခင်"] }, "Start slideshow": { "v": ["စလိုက်ရှိုးအား စတင်ရန်"] } } }, { "l": "nb", "t": { "Next": { "v": ["Neste"] }, "Pause slideshow": { "v": ["Pause lysbildefremvisning"] }, "Previous": { "v": ["Forrige"] }, "Start slideshow": { "v": ["Start lysbildefremvisning"] } } }, { "l": "nl", "t": { "Next": { "v": ["Volgende"] }, "Pause slideshow": { "v": ["Diavoorstelling pauzeren"] }, "Previous": { "v": ["Vorige"] }, "Start slideshow": { "v": ["Diavoorstelling starten"] } } }, { "l": "oc", "t": { "Next": { "v": ["Seguent"] }, "Pause slideshow": { "v": ["Metre en pausa lo diaporama"] }, "Previous": { "v": ["Precedent"] }, "Start slideshow": { "v": ["Lançar lo diaporama"] } } }, { "l": "pl", "t": { "Next": { "v": ["Następny"] }, "Pause slideshow": { "v": ["Wstrzymaj pokaz slajdów"] }, "Previous": { "v": ["Poprzedni"] }, "Start slideshow": { "v": ["Rozpocznij pokaz slajdów"] } } }, { "l": "pt-BR", "t": { "Next": { "v": ["Próximo"] }, "Pause slideshow": { "v": ["Pausar apresentação de slides"] }, "Previous": { "v": ["Anterior"] }, "Start slideshow": { "v": ["Iniciar apresentação de slides"] } } }, { "l": "pt-PT", "t": { "Next": { "v": ["Seguinte"] }, "Pause slideshow": { "v": ["Pausar diaporama"] }, "Previous": { "v": ["Anterior"] }, "Start slideshow": { "v": ["Iniciar diaporama"] } } }, { "l": "ro", "t": { "Next": { "v": ["Următorul"] }, "Pause slideshow": { "v": ["Pauză prezentare de diapozitive"] }, "Previous": { "v": ["Anterior"] }, "Start slideshow": { "v": ["Începeți prezentarea de diapozitive"] } } }, { "l": "ru", "t": { "Next": { "v": ["Следующее"] }, "Pause slideshow": { "v": ["Приостановить показ слйдов"] }, "Previous": { "v": ["Предыдущее"] }, "Start slideshow": { "v": ["Начать показ слайдов"] } } }, { "l": "sk", "t": { "Next": { "v": ["Ďalej"] }, "Pause slideshow": { "v": ["Pozastaviť prezentáciu"] }, "Previous": { "v": ["Predchádzajúce"] }, "Start slideshow": { "v": ["Začať prezentáciu"] } } }, { "l": "sl", "t": { "Next": { "v": ["Naslednji"] }, "Pause slideshow": { "v": ["Ustavi predstavitev"] }, "Previous": { "v": ["Predhodni"] }, "Start slideshow": { "v": ["Začni predstavitev"] } } }, { "l": "sr", "t": { "Next": { "v": ["Следеће"] }, "Pause slideshow": { "v": ["Паузирај слајд шоу"] }, "Previous": { "v": ["Претходно"] }, "Start slideshow": { "v": ["Покрени слајд шоу"] } } }, { "l": "sv", "t": { "Next": { "v": ["Nästa"] }, "Pause slideshow": { "v": ["Pausa bildspelet"] }, "Previous": { "v": ["Föregående"] }, "Start slideshow": { "v": ["Starta bildspelet"] } } }, { "l": "tr", "t": { "Next": { "v": ["Sonraki"] }, "Pause slideshow": { "v": ["Slayt sunumunu duraklat"] }, "Previous": { "v": ["Önceki"] }, "Start slideshow": { "v": ["Slayt sunumunu başlat"] } } }, { "l": "uk", "t": { "Next": { "v": ["Вперед"] }, "Pause slideshow": { "v": ["Пауза у показі слайдів"] }, "Previous": { "v": ["Назад"] }, "Start slideshow": { "v": ["Почати показ слайдів"] } } }, { "l": "uz", "t": { "Next": { "v": ["Keyingi"] }, "Pause slideshow": { "v": ["Slayd-shouni to'xtatib turish"] }, "Previous": { "v": ["Oldingi"] }, "Start slideshow": { "v": ["Slayd-shouni boshlash"] } } }, { "l": "zh-CN", "t": { "Next": { "v": ["下一个"] }, "Pause slideshow": { "v": ["暂停幻灯片"] }, "Previous": { "v": ["上一个"] }, "Start slideshow": { "v": ["开始幻灯片"] } } }, { "l": "zh-HK", "t": { "Next": { "v": ["下一個"] }, "Pause slideshow": { "v": ["暫停幻燈片"] }, "Previous": { "v": ["上一個"] }, "Start slideshow": { "v": ["開始幻燈片"] } } }, { "l": "zh-TW", "t": { "Next": { "v": ["下一個"] }, "Pause slideshow": { "v": ["暫停幻燈片"] }, "Previous": { "v": ["上一個"] }, "Start slideshow": { "v": ["開始幻燈片"] } } }];
const [majorVersion] = window.OC?.config?.version?.split(".") ?? [];
register(t33);
const sides = ["top", "right", "bottom", "left"];
const alignments = ["start", "end"];
const placements = /* @__PURE__ */ sides.reduce((acc, side) => acc.concat(side, side + "-" + alignments[0], side + "-" + alignments[1]), []);
const min = Math.min;
const max = Math.max;
const oppositeSideMap = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function clamp(start, value, end) {
  return max(start, min(value, end));
}
function evaluate(value, param) {
  return typeof value === "function" ? value(param) : value;
}
function getSide(placement) {
  return placement.split("-")[0];
}
function getAlignment(placement) {
  return placement.split("-")[1];
}
function getOppositeAxis(axis) {
  return axis === "x" ? "y" : "x";
}
function getAxisLength(axis) {
  return axis === "y" ? "height" : "width";
}
function getSideAxis(placement) {
  const firstChar = placement[0];
  return firstChar === "t" || firstChar === "b" ? "y" : "x";
}
function getAlignmentAxis(placement) {
  return getOppositeAxis(getSideAxis(placement));
}
function getAlignmentSides(placement, rects, rtl) {
  if (rtl === void 0) {
    rtl = false;
  }
  const alignment = getAlignment(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const length = getAxisLength(alignmentAxis);
  let mainAlignmentSide = alignmentAxis === "x" ? alignment === (rtl ? "end" : "start") ? "right" : "left" : alignment === "start" ? "bottom" : "top";
  if (rects.reference[length] > rects.floating[length]) {
    mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
  }
  return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
}
function getExpandedPlacements(placement) {
  const oppositePlacement = getOppositePlacement(placement);
  return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
}
function getOppositeAlignmentPlacement(placement) {
  return placement.includes("start") ? placement.replace("start", "end") : placement.replace("end", "start");
}
const lrPlacement = ["left", "right"];
const rlPlacement = ["right", "left"];
const tbPlacement = ["top", "bottom"];
const btPlacement = ["bottom", "top"];
function getSideList(side, isStart, rtl) {
  switch (side) {
    case "top":
    case "bottom":
      if (rtl) return isStart ? rlPlacement : lrPlacement;
      return isStart ? lrPlacement : rlPlacement;
    case "left":
    case "right":
      return isStart ? tbPlacement : btPlacement;
    default:
      return [];
  }
}
function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
  const alignment = getAlignment(placement);
  let list = getSideList(getSide(placement), direction === "start", rtl);
  if (alignment) {
    list = list.map((side) => side + "-" + alignment);
    if (flipAlignment) {
      list = list.concat(list.map(getOppositeAlignmentPlacement));
    }
  }
  return list;
}
function getOppositePlacement(placement) {
  const side = getSide(placement);
  return oppositeSideMap[side] + placement.slice(side.length);
}
function expandPaddingObject(padding) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...padding
  };
}
function getPaddingObject(padding) {
  return typeof padding !== "number" ? expandPaddingObject(padding) : {
    top: padding,
    right: padding,
    bottom: padding,
    left: padding
  };
}
function rectToClientRect(rect) {
  const {
    x: x2,
    y: y2,
    width,
    height
  } = rect;
  return {
    width,
    height,
    top: y2,
    left: x2,
    right: x2 + width,
    bottom: y2 + height,
    x: x2,
    y: y2
  };
}
function computeCoordsFromPlacement(_ref2, placement, rtl) {
  let {
    reference,
    floating
  } = _ref2;
  const sideAxis = getSideAxis(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const alignLength = getAxisLength(alignmentAxis);
  const side = getSide(placement);
  const isVertical = sideAxis === "y";
  const commonX = reference.x + reference.width / 2 - floating.width / 2;
  const commonY = reference.y + reference.height / 2 - floating.height / 2;
  const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
  let coords;
  switch (side) {
    case "top":
      coords = {
        x: commonX,
        y: reference.y - floating.height
      };
      break;
    case "bottom":
      coords = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;
    case "right":
      coords = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;
    case "left":
      coords = {
        x: reference.x - floating.width,
        y: commonY
      };
      break;
    default:
      coords = {
        x: reference.x,
        y: reference.y
      };
  }
  switch (getAlignment(placement)) {
    case "start":
      coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
      break;
    case "end":
      coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
      break;
  }
  return coords;
}
async function detectOverflow(state, options) {
  var _await$platform$isEle;
  if (options === void 0) {
    options = {};
  }
  const {
    x: x2,
    y: y2,
    platform: platform2,
    rects,
    elements,
    strategy
  } = state;
  const {
    boundary = "clippingAncestors",
    rootBoundary = "viewport",
    elementContext = "floating",
    altBoundary = false,
    padding = 0
  } = evaluate(options, state);
  const paddingObject = getPaddingObject(padding);
  const altContext = elementContext === "floating" ? "reference" : "floating";
  const element = elements[altBoundary ? altContext : elementContext];
  const clippingClientRect = rectToClientRect(await platform2.getClippingRect({
    element: ((_await$platform$isEle = await (platform2.isElement == null ? void 0 : platform2.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || await (platform2.getDocumentElement == null ? void 0 : platform2.getDocumentElement(elements.floating)),
    boundary,
    rootBoundary,
    strategy
  }));
  const rect = elementContext === "floating" ? {
    x: x2,
    y: y2,
    width: rects.floating.width,
    height: rects.floating.height
  } : rects.reference;
  const offsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(elements.floating));
  const offsetScale = await (platform2.isElement == null ? void 0 : platform2.isElement(offsetParent)) ? await (platform2.getScale == null ? void 0 : platform2.getScale(offsetParent)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  };
  const elementClientRect = rectToClientRect(platform2.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform2.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements,
    rect,
    offsetParent,
    strategy
  }) : rect);
  return {
    top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
    bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
    left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
    right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
  };
}
const MAX_RESET_COUNT = 50;
const computePosition = async (reference, floating, config) => {
  const {
    placement = "bottom",
    strategy = "absolute",
    middleware = [],
    platform: platform2
  } = config;
  const platformWithDetectOverflow = platform2.detectOverflow ? platform2 : {
    ...platform2,
    detectOverflow
  };
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(floating));
  let rects = await platform2.getElementRects({
    reference,
    floating,
    strategy
  });
  let {
    x: x2,
    y: y2
  } = computeCoordsFromPlacement(rects, placement, rtl);
  let statefulPlacement = placement;
  let resetCount = 0;
  const middlewareData = {};
  for (let i2 = 0; i2 < middleware.length; i2++) {
    const currentMiddleware = middleware[i2];
    if (!currentMiddleware) {
      continue;
    }
    const {
      name,
      fn
    } = currentMiddleware;
    const {
      x: nextX,
      y: nextY,
      data,
      reset
    } = await fn({
      x: x2,
      y: y2,
      initialPlacement: placement,
      placement: statefulPlacement,
      strategy,
      middlewareData,
      rects,
      platform: platformWithDetectOverflow,
      elements: {
        reference,
        floating
      }
    });
    x2 = nextX != null ? nextX : x2;
    y2 = nextY != null ? nextY : y2;
    middlewareData[name] = {
      ...middlewareData[name],
      ...data
    };
    if (reset && resetCount < MAX_RESET_COUNT) {
      resetCount++;
      if (typeof reset === "object") {
        if (reset.placement) {
          statefulPlacement = reset.placement;
        }
        if (reset.rects) {
          rects = reset.rects === true ? await platform2.getElementRects({
            reference,
            floating,
            strategy
          }) : reset.rects;
        }
        ({
          x: x2,
          y: y2
        } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
      }
      i2 = -1;
    }
  }
  return {
    x: x2,
    y: y2,
    placement: statefulPlacement,
    strategy,
    middlewareData
  };
};
const arrow = (options) => ({
  name: "arrow",
  options,
  async fn(state) {
    const {
      x: x2,
      y: y2,
      placement,
      rects,
      platform: platform2,
      elements,
      middlewareData
    } = state;
    const {
      element,
      padding = 0
    } = evaluate(options, state) || {};
    if (element == null) {
      return {};
    }
    const paddingObject = getPaddingObject(padding);
    const coords = {
      x: x2,
      y: y2
    };
    const axis = getAlignmentAxis(placement);
    const length = getAxisLength(axis);
    const arrowDimensions = await platform2.getDimensions(element);
    const isYAxis = axis === "y";
    const minProp = isYAxis ? "top" : "left";
    const maxProp = isYAxis ? "bottom" : "right";
    const clientProp = isYAxis ? "clientHeight" : "clientWidth";
    const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
    const startDiff = coords[axis] - rects.reference[axis];
    const arrowOffsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(element));
    let clientSize = arrowOffsetParent ? arrowOffsetParent[clientProp] : 0;
    if (!clientSize || !await (platform2.isElement == null ? void 0 : platform2.isElement(arrowOffsetParent))) {
      clientSize = elements.floating[clientProp] || rects.floating[length];
    }
    const centerToReference = endDiff / 2 - startDiff / 2;
    const largestPossiblePadding = clientSize / 2 - arrowDimensions[length] / 2 - 1;
    const minPadding = min(paddingObject[minProp], largestPossiblePadding);
    const maxPadding = min(paddingObject[maxProp], largestPossiblePadding);
    const min$1 = minPadding;
    const max2 = clientSize - arrowDimensions[length] - maxPadding;
    const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
    const offset2 = clamp(min$1, center, max2);
    const shouldAddOffset = !middlewareData.arrow && getAlignment(placement) != null && center !== offset2 && rects.reference[length] / 2 - (center < min$1 ? minPadding : maxPadding) - arrowDimensions[length] / 2 < 0;
    const alignmentOffset = shouldAddOffset ? center < min$1 ? center - min$1 : center - max2 : 0;
    return {
      [axis]: coords[axis] + alignmentOffset,
      data: {
        [axis]: offset2,
        centerOffset: center - offset2 - alignmentOffset,
        ...shouldAddOffset && {
          alignmentOffset
        }
      },
      reset: shouldAddOffset
    };
  }
});
function getPlacementList(alignment, autoAlignment, allowedPlacements) {
  const allowedPlacementsSortedByAlignment = alignment ? [...allowedPlacements.filter((placement) => getAlignment(placement) === alignment), ...allowedPlacements.filter((placement) => getAlignment(placement) !== alignment)] : allowedPlacements.filter((placement) => getSide(placement) === placement);
  return allowedPlacementsSortedByAlignment.filter((placement) => {
    if (alignment) {
      return getAlignment(placement) === alignment || (autoAlignment ? getOppositeAlignmentPlacement(placement) !== placement : false);
    }
    return true;
  });
}
const autoPlacement = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "autoPlacement",
    options,
    async fn(state) {
      var _middlewareData$autoP, _middlewareData$autoP2, _placementsThatFitOnE;
      const {
        rects,
        middlewareData,
        placement,
        platform: platform2,
        elements
      } = state;
      const {
        crossAxis = false,
        alignment,
        allowedPlacements = placements,
        autoAlignment = true,
        ...detectOverflowOptions
      } = evaluate(options, state);
      const placements$1 = alignment !== void 0 || allowedPlacements === placements ? getPlacementList(alignment || null, autoAlignment, allowedPlacements) : allowedPlacements;
      const overflow = await platform2.detectOverflow(state, detectOverflowOptions);
      const currentIndex = ((_middlewareData$autoP = middlewareData.autoPlacement) == null ? void 0 : _middlewareData$autoP.index) || 0;
      const currentPlacement = placements$1[currentIndex];
      if (currentPlacement == null) {
        return {};
      }
      const alignmentSides = getAlignmentSides(currentPlacement, rects, await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating)));
      if (placement !== currentPlacement) {
        return {
          reset: {
            placement: placements$1[0]
          }
        };
      }
      const currentOverflows = [overflow[getSide(currentPlacement)], overflow[alignmentSides[0]], overflow[alignmentSides[1]]];
      const allOverflows = [...((_middlewareData$autoP2 = middlewareData.autoPlacement) == null ? void 0 : _middlewareData$autoP2.overflows) || [], {
        placement: currentPlacement,
        overflows: currentOverflows
      }];
      const nextPlacement = placements$1[currentIndex + 1];
      if (nextPlacement) {
        return {
          data: {
            index: currentIndex + 1,
            overflows: allOverflows
          },
          reset: {
            placement: nextPlacement
          }
        };
      }
      const placementsSortedByMostSpace = allOverflows.map((d2) => {
        const alignment2 = getAlignment(d2.placement);
        return [d2.placement, alignment2 && crossAxis ? (
          // Check along the mainAxis and main crossAxis side.
          d2.overflows.slice(0, 2).reduce((acc, v2) => acc + v2, 0)
        ) : (
          // Check only the mainAxis.
          d2.overflows[0]
        ), d2.overflows];
      }).sort((a2, b2) => a2[1] - b2[1]);
      const placementsThatFitOnEachSide = placementsSortedByMostSpace.filter((d2) => d2[2].slice(
        0,
        // Aligned placements should not check their opposite crossAxis
        // side.
        getAlignment(d2[0]) ? 2 : 3
      ).every((v2) => v2 <= 0));
      const resetPlacement = ((_placementsThatFitOnE = placementsThatFitOnEachSide[0]) == null ? void 0 : _placementsThatFitOnE[0]) || placementsSortedByMostSpace[0][0];
      if (resetPlacement !== placement) {
        return {
          data: {
            index: currentIndex + 1,
            overflows: allOverflows
          },
          reset: {
            placement: resetPlacement
          }
        };
      }
      return {};
    }
  };
};
const flip = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "flip",
    options,
    async fn(state) {
      var _middlewareData$arrow, _middlewareData$flip;
      const {
        placement,
        middlewareData,
        rects,
        initialPlacement,
        platform: platform2,
        elements
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true,
        fallbackPlacements: specifiedFallbackPlacements,
        fallbackStrategy = "bestFit",
        fallbackAxisSideDirection = "none",
        flipAlignment = true,
        ...detectOverflowOptions
      } = evaluate(options, state);
      if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      const side = getSide(placement);
      const initialSideAxis = getSideAxis(initialPlacement);
      const isBasePlacement = getSide(initialPlacement) === initialPlacement;
      const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
      const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
      const hasFallbackAxisSideDirection = fallbackAxisSideDirection !== "none";
      if (!specifiedFallbackPlacements && hasFallbackAxisSideDirection) {
        fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
      }
      const placements2 = [initialPlacement, ...fallbackPlacements];
      const overflow = await platform2.detectOverflow(state, detectOverflowOptions);
      const overflows = [];
      let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
      if (checkMainAxis) {
        overflows.push(overflow[side]);
      }
      if (checkCrossAxis) {
        const sides2 = getAlignmentSides(placement, rects, rtl);
        overflows.push(overflow[sides2[0]], overflow[sides2[1]]);
      }
      overflowsData = [...overflowsData, {
        placement,
        overflows
      }];
      if (!overflows.every((side2) => side2 <= 0)) {
        var _middlewareData$flip2, _overflowsData$filter;
        const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
        const nextPlacement = placements2[nextIndex];
        if (nextPlacement) {
          const ignoreCrossAxisOverflow = checkCrossAxis === "alignment" ? initialSideAxis !== getSideAxis(nextPlacement) : false;
          if (!ignoreCrossAxisOverflow || // We leave the current main axis only if every placement on that axis
          // overflows the main axis.
          overflowsData.every((d2) => getSideAxis(d2.placement) === initialSideAxis ? d2.overflows[0] > 0 : true)) {
            return {
              data: {
                index: nextIndex,
                overflows: overflowsData
              },
              reset: {
                placement: nextPlacement
              }
            };
          }
        }
        let resetPlacement = (_overflowsData$filter = overflowsData.filter((d2) => d2.overflows[0] <= 0).sort((a2, b2) => a2.overflows[1] - b2.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;
        if (!resetPlacement) {
          switch (fallbackStrategy) {
            case "bestFit": {
              var _overflowsData$filter2;
              const placement2 = (_overflowsData$filter2 = overflowsData.filter((d2) => {
                if (hasFallbackAxisSideDirection) {
                  const currentSideAxis = getSideAxis(d2.placement);
                  return currentSideAxis === initialSideAxis || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  currentSideAxis === "y";
                }
                return true;
              }).map((d2) => [d2.placement, d2.overflows.filter((overflow2) => overflow2 > 0).reduce((acc, overflow2) => acc + overflow2, 0)]).sort((a2, b2) => a2[1] - b2[1])[0]) == null ? void 0 : _overflowsData$filter2[0];
              if (placement2) {
                resetPlacement = placement2;
              }
              break;
            }
            case "initialPlacement":
              resetPlacement = initialPlacement;
              break;
          }
        }
        if (placement !== resetPlacement) {
          return {
            reset: {
              placement: resetPlacement
            }
          };
        }
      }
      return {};
    }
  };
};
const originSides = /* @__PURE__ */ new Set(["left", "top"]);
async function convertValueToCoords(state, options) {
  const {
    placement,
    platform: platform2,
    elements
  } = state;
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
  const side = getSide(placement);
  const alignment = getAlignment(placement);
  const isVertical = getSideAxis(placement) === "y";
  const mainAxisMulti = originSides.has(side) ? -1 : 1;
  const crossAxisMulti = rtl && isVertical ? -1 : 1;
  const rawValue = evaluate(options, state);
  let {
    mainAxis,
    crossAxis,
    alignmentAxis
  } = typeof rawValue === "number" ? {
    mainAxis: rawValue,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: rawValue.mainAxis || 0,
    crossAxis: rawValue.crossAxis || 0,
    alignmentAxis: rawValue.alignmentAxis
  };
  if (alignment && typeof alignmentAxis === "number") {
    crossAxis = alignment === "end" ? alignmentAxis * -1 : alignmentAxis;
  }
  return isVertical ? {
    x: crossAxis * crossAxisMulti,
    y: mainAxis * mainAxisMulti
  } : {
    x: mainAxis * mainAxisMulti,
    y: crossAxis * crossAxisMulti
  };
}
const offset = function(options) {
  if (options === void 0) {
    options = 0;
  }
  return {
    name: "offset",
    options,
    async fn(state) {
      var _middlewareData$offse, _middlewareData$arrow;
      const {
        x: x2,
        y: y2,
        placement,
        middlewareData
      } = state;
      const diffCoords = await convertValueToCoords(state, options);
      if (placement === ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse.placement) && (_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      return {
        x: x2 + diffCoords.x,
        y: y2 + diffCoords.y,
        data: {
          ...diffCoords,
          placement
        }
      };
    }
  };
};
const shift = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "shift",
    options,
    async fn(state) {
      const {
        x: x2,
        y: y2,
        placement,
        platform: platform2
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = false,
        limiter = {
          fn: (_ref2) => {
            let {
              x: x3,
              y: y3
            } = _ref2;
            return {
              x: x3,
              y: y3
            };
          }
        },
        ...detectOverflowOptions
      } = evaluate(options, state);
      const coords = {
        x: x2,
        y: y2
      };
      const overflow = await platform2.detectOverflow(state, detectOverflowOptions);
      const crossAxis = getSideAxis(getSide(placement));
      const mainAxis = getOppositeAxis(crossAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];
      if (checkMainAxis) {
        const minSide = mainAxis === "y" ? "top" : "left";
        const maxSide = mainAxis === "y" ? "bottom" : "right";
        const min2 = mainAxisCoord + overflow[minSide];
        const max2 = mainAxisCoord - overflow[maxSide];
        mainAxisCoord = clamp(min2, mainAxisCoord, max2);
      }
      if (checkCrossAxis) {
        const minSide = crossAxis === "y" ? "top" : "left";
        const maxSide = crossAxis === "y" ? "bottom" : "right";
        const min2 = crossAxisCoord + overflow[minSide];
        const max2 = crossAxisCoord - overflow[maxSide];
        crossAxisCoord = clamp(min2, crossAxisCoord, max2);
      }
      const limitedCoords = limiter.fn({
        ...state,
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      });
      return {
        ...limitedCoords,
        data: {
          x: limitedCoords.x - x2,
          y: limitedCoords.y - y2,
          enabled: {
            [mainAxis]: checkMainAxis,
            [crossAxis]: checkCrossAxis
          }
        }
      };
    }
  };
};
const size = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "size",
    options,
    async fn(state) {
      var _state$middlewareData, _state$middlewareData2;
      const {
        placement,
        rects,
        platform: platform2,
        elements
      } = state;
      const {
        apply: apply2 = () => {
        },
        ...detectOverflowOptions
      } = evaluate(options, state);
      const overflow = await platform2.detectOverflow(state, detectOverflowOptions);
      const side = getSide(placement);
      const alignment = getAlignment(placement);
      const isYAxis = getSideAxis(placement) === "y";
      const {
        width,
        height
      } = rects.floating;
      let heightSide;
      let widthSide;
      if (side === "top" || side === "bottom") {
        heightSide = side;
        widthSide = alignment === (await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating)) ? "start" : "end") ? "left" : "right";
      } else {
        widthSide = side;
        heightSide = alignment === "end" ? "top" : "bottom";
      }
      const maximumClippingHeight = height - overflow.top - overflow.bottom;
      const maximumClippingWidth = width - overflow.left - overflow.right;
      const overflowAvailableHeight = min(height - overflow[heightSide], maximumClippingHeight);
      const overflowAvailableWidth = min(width - overflow[widthSide], maximumClippingWidth);
      const noShift = !state.middlewareData.shift;
      let availableHeight = overflowAvailableHeight;
      let availableWidth = overflowAvailableWidth;
      if ((_state$middlewareData = state.middlewareData.shift) != null && _state$middlewareData.enabled.x) {
        availableWidth = maximumClippingWidth;
      }
      if ((_state$middlewareData2 = state.middlewareData.shift) != null && _state$middlewareData2.enabled.y) {
        availableHeight = maximumClippingHeight;
      }
      if (noShift && !alignment) {
        const xMin = max(overflow.left, 0);
        const xMax = max(overflow.right, 0);
        const yMin = max(overflow.top, 0);
        const yMax = max(overflow.bottom, 0);
        if (isYAxis) {
          availableWidth = width - 2 * (xMin !== 0 || xMax !== 0 ? xMin + xMax : max(overflow.left, overflow.right));
        } else {
          availableHeight = height - 2 * (yMin !== 0 || yMax !== 0 ? yMin + yMax : max(overflow.top, overflow.bottom));
        }
      }
      await apply2({
        ...state,
        availableWidth,
        availableHeight
      });
      const nextDimensions = await platform2.getDimensions(elements.floating);
      if (width !== nextDimensions.width || height !== nextDimensions.height) {
        return {
          reset: {
            rects: true
          }
        };
      }
      return {};
    }
  };
};
function n$1(t3) {
  var e2;
  return (null == (e2 = t3.ownerDocument) ? void 0 : e2.defaultView) || window;
}
function o(t3) {
  return n$1(t3).getComputedStyle(t3);
}
const i = Math.min, r = Math.max, l = Math.round;
function c$1(t3) {
  const e2 = o(t3);
  let n2 = parseFloat(e2.width), i2 = parseFloat(e2.height);
  const r2 = t3.offsetWidth, c2 = t3.offsetHeight, s2 = l(n2) !== r2 || l(i2) !== c2;
  return s2 && (n2 = r2, i2 = c2), { width: n2, height: i2, fallback: s2 };
}
function s(t3) {
  return h$1(t3) ? (t3.nodeName || "").toLowerCase() : "";
}
let f;
function u() {
  if (f) return f;
  const t3 = navigator.userAgentData;
  return t3 && Array.isArray(t3.brands) ? (f = t3.brands.map(((t5) => t5.brand + "/" + t5.version)).join(" "), f) : navigator.userAgent;
}
function a(t3) {
  return t3 instanceof n$1(t3).HTMLElement;
}
function d$1(t3) {
  return t3 instanceof n$1(t3).Element;
}
function h$1(t3) {
  return t3 instanceof n$1(t3).Node;
}
function p(t3) {
  if ("undefined" == typeof ShadowRoot) return false;
  return t3 instanceof n$1(t3).ShadowRoot || t3 instanceof ShadowRoot;
}
function g$1(t3) {
  const { overflow: e2, overflowX: n2, overflowY: i2, display: r2 } = o(t3);
  return /auto|scroll|overlay|hidden|clip/.test(e2 + i2 + n2) && !["inline", "contents"].includes(r2);
}
function m$1(t3) {
  return ["table", "td", "th"].includes(s(t3));
}
function y$1(t3) {
  const e2 = /firefox/i.test(u()), n2 = o(t3), i2 = n2.backdropFilter || n2.WebkitBackdropFilter;
  return "none" !== n2.transform || "none" !== n2.perspective || !!i2 && "none" !== i2 || e2 && "filter" === n2.willChange || e2 && !!n2.filter && "none" !== n2.filter || ["transform", "perspective"].some(((t5) => n2.willChange.includes(t5))) || ["paint", "layout", "strict", "content"].some(((t5) => {
    const e3 = n2.contain;
    return null != e3 && e3.includes(t5);
  }));
}
function x() {
  return !/^((?!chrome|android).)*safari/i.test(u());
}
function w(t3) {
  return ["html", "body", "#document"].includes(s(t3));
}
function v(t3) {
  return d$1(t3) ? t3 : t3.contextElement;
}
const b = { x: 1, y: 1 };
function L(t3) {
  const e2 = v(t3);
  if (!a(e2)) return b;
  const n2 = e2.getBoundingClientRect(), { width: o2, height: i2, fallback: r2 } = c$1(e2);
  let s2 = (r2 ? l(n2.width) : n2.width) / o2, f2 = (r2 ? l(n2.height) : n2.height) / i2;
  return s2 && Number.isFinite(s2) || (s2 = 1), f2 && Number.isFinite(f2) || (f2 = 1), { x: s2, y: f2 };
}
function E$1(t3, e2, o2, i2) {
  var r2, l2;
  void 0 === e2 && (e2 = false), void 0 === o2 && (o2 = false);
  const c2 = t3.getBoundingClientRect(), s2 = v(t3);
  let f2 = b;
  e2 && (i2 ? d$1(i2) && (f2 = L(i2)) : f2 = L(t3));
  const u2 = s2 ? n$1(s2) : window, a2 = !x() && o2;
  let h2 = (c2.left + (a2 && (null == (r2 = u2.visualViewport) ? void 0 : r2.offsetLeft) || 0)) / f2.x, p2 = (c2.top + (a2 && (null == (l2 = u2.visualViewport) ? void 0 : l2.offsetTop) || 0)) / f2.y, g2 = c2.width / f2.x, m2 = c2.height / f2.y;
  if (s2) {
    const t5 = n$1(s2), e3 = i2 && d$1(i2) ? n$1(i2) : i2;
    let o3 = t5.frameElement;
    for (; o3 && i2 && e3 !== t5; ) {
      const t6 = L(o3), e4 = o3.getBoundingClientRect(), i3 = getComputedStyle(o3);
      e4.x += (o3.clientLeft + parseFloat(i3.paddingLeft)) * t6.x, e4.y += (o3.clientTop + parseFloat(i3.paddingTop)) * t6.y, h2 *= t6.x, p2 *= t6.y, g2 *= t6.x, m2 *= t6.y, h2 += e4.x, p2 += e4.y, o3 = n$1(o3).frameElement;
    }
  }
  return { width: g2, height: m2, top: p2, right: h2 + g2, bottom: p2 + m2, left: h2, x: h2, y: p2 };
}
function R(t3) {
  return ((h$1(t3) ? t3.ownerDocument : t3.document) || window.document).documentElement;
}
function T(t3) {
  return d$1(t3) ? { scrollLeft: t3.scrollLeft, scrollTop: t3.scrollTop } : { scrollLeft: t3.pageXOffset, scrollTop: t3.pageYOffset };
}
function C$1(t3) {
  return E$1(R(t3)).left + T(t3).scrollLeft;
}
function F(t3) {
  if ("html" === s(t3)) return t3;
  const e2 = t3.assignedSlot || t3.parentNode || p(t3) && t3.host || R(t3);
  return p(e2) ? e2.host : e2;
}
function W(t3) {
  const e2 = F(t3);
  return w(e2) ? e2.ownerDocument.body : a(e2) && g$1(e2) ? e2 : W(e2);
}
function D(t3, e2) {
  var o2;
  void 0 === e2 && (e2 = []);
  const i2 = W(t3), r2 = i2 === (null == (o2 = t3.ownerDocument) ? void 0 : o2.body), l2 = n$1(i2);
  return r2 ? e2.concat(l2, l2.visualViewport || [], g$1(i2) ? i2 : []) : e2.concat(i2, D(i2));
}
function S$1(e2, i2, l2) {
  return "viewport" === i2 ? rectToClientRect((function(t3, e3) {
    const o2 = n$1(t3), i3 = R(t3), r2 = o2.visualViewport;
    let l3 = i3.clientWidth, c2 = i3.clientHeight, s2 = 0, f2 = 0;
    if (r2) {
      l3 = r2.width, c2 = r2.height;
      const t5 = x();
      (t5 || !t5 && "fixed" === e3) && (s2 = r2.offsetLeft, f2 = r2.offsetTop);
    }
    return { width: l3, height: c2, x: s2, y: f2 };
  })(e2, l2)) : d$1(i2) ? rectToClientRect((function(t3, e3) {
    const n2 = E$1(t3, true, "fixed" === e3), o2 = n2.top + t3.clientTop, i3 = n2.left + t3.clientLeft, r2 = a(t3) ? L(t3) : { x: 1, y: 1 };
    return { width: t3.clientWidth * r2.x, height: t3.clientHeight * r2.y, x: i3 * r2.x, y: o2 * r2.y };
  })(i2, l2)) : rectToClientRect((function(t3) {
    const e3 = R(t3), n2 = T(t3), i3 = t3.ownerDocument.body, l3 = r(e3.scrollWidth, e3.clientWidth, i3.scrollWidth, i3.clientWidth), c2 = r(e3.scrollHeight, e3.clientHeight, i3.scrollHeight, i3.clientHeight);
    let s2 = -n2.scrollLeft + C$1(t3);
    const f2 = -n2.scrollTop;
    return "rtl" === o(i3).direction && (s2 += r(e3.clientWidth, i3.clientWidth) - l3), { width: l3, height: c2, x: s2, y: f2 };
  })(R(e2)));
}
function A(t3) {
  return a(t3) && "fixed" !== o(t3).position ? t3.offsetParent : null;
}
function H(t3) {
  const e2 = n$1(t3);
  let i2 = A(t3);
  for (; i2 && m$1(i2) && "static" === o(i2).position; ) i2 = A(i2);
  return i2 && ("html" === s(i2) || "body" === s(i2) && "static" === o(i2).position && !y$1(i2)) ? e2 : i2 || (function(t5) {
    let e3 = F(t5);
    for (; a(e3) && !w(e3); ) {
      if (y$1(e3)) return e3;
      e3 = F(e3);
    }
    return null;
  })(t3) || e2;
}
function O(t3, e2, n2) {
  const o2 = a(e2), i2 = R(e2), r2 = E$1(t3, true, "fixed" === n2, e2);
  let l2 = { scrollLeft: 0, scrollTop: 0 };
  const c2 = { x: 0, y: 0 };
  if (o2 || !o2 && "fixed" !== n2) if (("body" !== s(e2) || g$1(i2)) && (l2 = T(e2)), a(e2)) {
    const t5 = E$1(e2, true);
    c2.x = t5.x + e2.clientLeft, c2.y = t5.y + e2.clientTop;
  } else i2 && (c2.x = C$1(i2));
  return { x: r2.left + l2.scrollLeft - c2.x, y: r2.top + l2.scrollTop - c2.y, width: r2.width, height: r2.height };
}
const P = { getClippingRect: function(t3) {
  let { element: e2, boundary: n2, rootBoundary: l2, strategy: c2 } = t3;
  const f2 = "clippingAncestors" === n2 ? (function(t5, e3) {
    const n3 = e3.get(t5);
    if (n3) return n3;
    let i2 = D(t5).filter(((t6) => d$1(t6) && "body" !== s(t6))), r2 = null;
    const l3 = "fixed" === o(t5).position;
    let c3 = l3 ? F(t5) : t5;
    for (; d$1(c3) && !w(c3); ) {
      const t6 = o(c3), e4 = y$1(c3);
      (l3 ? e4 || r2 : e4 || "static" !== t6.position || !r2 || !["absolute", "fixed"].includes(r2.position)) ? r2 = t6 : i2 = i2.filter(((t7) => t7 !== c3)), c3 = F(c3);
    }
    return e3.set(t5, i2), i2;
  })(e2, this._c) : [].concat(n2), u2 = [...f2, l2], a2 = u2[0], h2 = u2.reduce(((t5, n3) => {
    const o2 = S$1(e2, n3, c2);
    return t5.top = r(o2.top, t5.top), t5.right = i(o2.right, t5.right), t5.bottom = i(o2.bottom, t5.bottom), t5.left = r(o2.left, t5.left), t5;
  }), S$1(e2, a2, c2));
  return { width: h2.right - h2.left, height: h2.bottom - h2.top, x: h2.left, y: h2.top };
}, convertOffsetParentRelativeRectToViewportRelativeRect: function(t3) {
  let { rect: e2, offsetParent: n2, strategy: o2 } = t3;
  const i2 = a(n2), r2 = R(n2);
  if (n2 === r2) return e2;
  let l2 = { scrollLeft: 0, scrollTop: 0 }, c2 = { x: 1, y: 1 };
  const f2 = { x: 0, y: 0 };
  if ((i2 || !i2 && "fixed" !== o2) && (("body" !== s(n2) || g$1(r2)) && (l2 = T(n2)), a(n2))) {
    const t5 = E$1(n2);
    c2 = L(n2), f2.x = t5.x + n2.clientLeft, f2.y = t5.y + n2.clientTop;
  }
  return { width: e2.width * c2.x, height: e2.height * c2.y, x: e2.x * c2.x - l2.scrollLeft * c2.x + f2.x, y: e2.y * c2.y - l2.scrollTop * c2.y + f2.y };
}, isElement: d$1, getDimensions: function(t3) {
  return a(t3) ? c$1(t3) : t3.getBoundingClientRect();
}, getOffsetParent: H, getDocumentElement: R, getScale: L, async getElementRects(t3) {
  let { reference: e2, floating: n2, strategy: o2 } = t3;
  const i2 = this.getOffsetParent || H, r2 = this.getDimensions;
  return { reference: O(e2, await i2(n2), o2), floating: { x: 0, y: 0, ...await r2(n2) } };
}, getClientRects: (t3) => Array.from(t3.getClientRects()), isRTL: (t3) => "rtl" === o(t3).direction };
const B$1 = (t3, n2, o2) => {
  const i2 = /* @__PURE__ */ new Map(), r2 = { platform: P, ...o2 }, l2 = { ...r2.platform, _c: i2 };
  return computePosition(t3, n2, { ...r2, platform: l2 });
};
const h = {
  // Disable popper components
  disabled: false,
  // Default position offset along main axis (px)
  distance: 5,
  // Default position offset along cross axis (px)
  skidding: 0,
  // Default container where the tooltip will be appended
  container: "body",
  // Element used to compute position and size boundaries
  boundary: void 0,
  // Skip delay & CSS transitions when another popper is shown, so that the popper appear to instanly move to the new position.
  instantMove: false,
  // Auto destroy tooltip DOM nodes (ms)
  disposeTimeout: 150,
  // Triggers on the popper itself
  popperTriggers: [],
  // Positioning strategy
  strategy: "absolute",
  // Prevent overflow
  preventOverflow: true,
  // Flip to the opposite placement if needed
  flip: true,
  // Shift on the cross axis to prevent the popper from overflowing
  shift: true,
  // Overflow padding (px)
  overflowPadding: 0,
  // Arrow padding (px)
  arrowPadding: 0,
  // Compute arrow overflow (useful to hide it)
  arrowOverflow: true,
  /**
   * By default, compute autohide on 'click'.
   */
  autoHideOnMousedown: false,
  // Themes
  themes: {
    tooltip: {
      // Default tooltip placement relative to target element
      placement: "top",
      // Default events that trigger the tooltip
      triggers: ["hover", "focus", "touch"],
      // Close tooltip on click on tooltip target
      hideTriggers: (e2) => [...e2, "click"],
      // Delay (ms)
      delay: {
        show: 200,
        hide: 0
      },
      // Update popper on content resize
      handleResize: false,
      // Enable HTML content in directive
      html: false,
      // Displayed when tooltip content is loading
      loadingContent: "..."
    },
    dropdown: {
      // Default dropdown placement relative to target element
      placement: "bottom",
      // Default events that trigger the dropdown
      triggers: ["click"],
      // Delay (ms)
      delay: 0,
      // Update popper on content resize
      handleResize: true,
      // Hide on clock outside
      autoHide: true
    },
    menu: {
      $extend: "dropdown",
      triggers: ["hover", "focus"],
      popperTriggers: ["hover"],
      delay: {
        show: 0,
        hide: 400
      }
    }
  }
};
function S(e2, t3) {
  let o2 = h.themes[e2] || {}, i2;
  do
    i2 = o2[t3], typeof i2 > "u" ? o2.$extend ? o2 = h.themes[o2.$extend] || {} : (o2 = null, i2 = h[t3]) : o2 = null;
  while (o2);
  return i2;
}
function Ze(e2) {
  const t3 = [e2];
  let o2 = h.themes[e2] || {};
  do
    o2.$extend && !o2.$resetCss ? (t3.push(o2.$extend), o2 = h.themes[o2.$extend] || {}) : o2 = null;
  while (o2);
  return t3.map((i2) => `v-popper--theme-${i2}`);
}
function re(e2) {
  const t3 = [e2];
  let o2 = h.themes[e2] || {};
  do
    o2.$extend ? (t3.push(o2.$extend), o2 = h.themes[o2.$extend] || {}) : o2 = null;
  while (o2);
  return t3;
}
let $ = false;
if (typeof window < "u") {
  $ = false;
  try {
    const e2 = Object.defineProperty({}, "passive", {
      get() {
        $ = true;
      }
    });
    window.addEventListener("test", null, e2);
  } catch {
  }
}
let _e = false;
typeof window < "u" && typeof navigator < "u" && (_e = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream);
const Te = ["auto", "top", "bottom", "left", "right"].reduce((e2, t3) => e2.concat([
  t3,
  `${t3}-start`,
  `${t3}-end`
]), []), pe = {
  hover: "mouseenter",
  focus: "focus",
  click: "click",
  touch: "touchstart",
  pointer: "pointerdown"
}, ae = {
  hover: "mouseleave",
  focus: "blur",
  click: "click",
  touch: "touchend",
  pointer: "pointerup"
};
function de(e2, t3) {
  const o2 = e2.indexOf(t3);
  o2 !== -1 && e2.splice(o2, 1);
}
function G$1() {
  return new Promise((e2) => requestAnimationFrame(() => {
    requestAnimationFrame(e2);
  }));
}
const d = [];
let g = null;
const le = {};
function he(e2) {
  let t3 = le[e2];
  return t3 || (t3 = le[e2] = []), t3;
}
let Y = function() {
};
typeof window < "u" && (Y = window.Element);
function n(e2) {
  return function(t3) {
    return S(t3.theme, e2);
  };
}
const q = "__floating-vue__popper", Q = () => /* @__PURE__ */ defineComponent({
  name: "VPopper",
  provide() {
    return {
      [q]: {
        parentPopper: this
      }
    };
  },
  inject: {
    [q]: { default: null }
  },
  props: {
    theme: {
      type: String,
      required: true
    },
    targetNodes: {
      type: Function,
      required: true
    },
    referenceNode: {
      type: Function,
      default: null
    },
    popperNode: {
      type: Function,
      required: true
    },
    shown: {
      type: Boolean,
      default: false
    },
    showGroup: {
      type: String,
      default: null
    },
    // eslint-disable-next-line vue/require-prop-types
    ariaId: {
      default: null
    },
    disabled: {
      type: Boolean,
      default: n("disabled")
    },
    positioningDisabled: {
      type: Boolean,
      default: n("positioningDisabled")
    },
    placement: {
      type: String,
      default: n("placement"),
      validator: (e2) => Te.includes(e2)
    },
    delay: {
      type: [String, Number, Object],
      default: n("delay")
    },
    distance: {
      type: [Number, String],
      default: n("distance")
    },
    skidding: {
      type: [Number, String],
      default: n("skidding")
    },
    triggers: {
      type: Array,
      default: n("triggers")
    },
    showTriggers: {
      type: [Array, Function],
      default: n("showTriggers")
    },
    hideTriggers: {
      type: [Array, Function],
      default: n("hideTriggers")
    },
    popperTriggers: {
      type: Array,
      default: n("popperTriggers")
    },
    popperShowTriggers: {
      type: [Array, Function],
      default: n("popperShowTriggers")
    },
    popperHideTriggers: {
      type: [Array, Function],
      default: n("popperHideTriggers")
    },
    container: {
      type: [String, Object, Y, Boolean],
      default: n("container")
    },
    boundary: {
      type: [String, Y],
      default: n("boundary")
    },
    strategy: {
      type: String,
      validator: (e2) => ["absolute", "fixed"].includes(e2),
      default: n("strategy")
    },
    autoHide: {
      type: [Boolean, Function],
      default: n("autoHide")
    },
    handleResize: {
      type: Boolean,
      default: n("handleResize")
    },
    instantMove: {
      type: Boolean,
      default: n("instantMove")
    },
    eagerMount: {
      type: Boolean,
      default: n("eagerMount")
    },
    popperClass: {
      type: [String, Array, Object],
      default: n("popperClass")
    },
    computeTransformOrigin: {
      type: Boolean,
      default: n("computeTransformOrigin")
    },
    /**
     * @deprecated
     */
    autoMinSize: {
      type: Boolean,
      default: n("autoMinSize")
    },
    autoSize: {
      type: [Boolean, String],
      default: n("autoSize")
    },
    /**
     * @deprecated
     */
    autoMaxSize: {
      type: Boolean,
      default: n("autoMaxSize")
    },
    autoBoundaryMaxSize: {
      type: Boolean,
      default: n("autoBoundaryMaxSize")
    },
    preventOverflow: {
      type: Boolean,
      default: n("preventOverflow")
    },
    overflowPadding: {
      type: [Number, String],
      default: n("overflowPadding")
    },
    arrowPadding: {
      type: [Number, String],
      default: n("arrowPadding")
    },
    arrowOverflow: {
      type: Boolean,
      default: n("arrowOverflow")
    },
    flip: {
      type: Boolean,
      default: n("flip")
    },
    shift: {
      type: Boolean,
      default: n("shift")
    },
    shiftCrossAxis: {
      type: Boolean,
      default: n("shiftCrossAxis")
    },
    noAutoFocus: {
      type: Boolean,
      default: n("noAutoFocus")
    },
    disposeTimeout: {
      type: Number,
      default: n("disposeTimeout")
    }
  },
  emits: {
    show: () => true,
    hide: () => true,
    "update:shown": (e2) => true,
    "apply-show": () => true,
    "apply-hide": () => true,
    "close-group": () => true,
    "close-directive": () => true,
    "auto-hide": () => true,
    resize: () => true
  },
  data() {
    return {
      isShown: false,
      isMounted: false,
      skipTransition: false,
      classes: {
        showFrom: false,
        showTo: false,
        hideFrom: false,
        hideTo: true
      },
      result: {
        x: 0,
        y: 0,
        placement: "",
        strategy: this.strategy,
        arrow: {
          x: 0,
          y: 0,
          centerOffset: 0
        },
        transformOrigin: null
      },
      randomId: `popper_${[Math.random(), Date.now()].map((e2) => e2.toString(36).substring(2, 10)).join("_")}`,
      shownChildren: /* @__PURE__ */ new Set(),
      lastAutoHide: true,
      pendingHide: false,
      containsGlobalTarget: false,
      isDisposed: true,
      mouseDownContains: false
    };
  },
  computed: {
    popperId() {
      return this.ariaId != null ? this.ariaId : this.randomId;
    },
    shouldMountContent() {
      return this.eagerMount || this.isMounted;
    },
    slotData() {
      return {
        popperId: this.popperId,
        isShown: this.isShown,
        shouldMountContent: this.shouldMountContent,
        skipTransition: this.skipTransition,
        autoHide: typeof this.autoHide == "function" ? this.lastAutoHide : this.autoHide,
        show: this.show,
        hide: this.hide,
        handleResize: this.handleResize,
        onResize: this.onResize,
        classes: {
          ...this.classes,
          popperClass: this.popperClass
        },
        result: this.positioningDisabled ? null : this.result,
        attrs: this.$attrs
      };
    },
    parentPopper() {
      var e2;
      return (e2 = this[q]) == null ? void 0 : e2.parentPopper;
    },
    hasPopperShowTriggerHover() {
      var e2, t3;
      return ((e2 = this.popperTriggers) == null ? void 0 : e2.includes("hover")) || ((t3 = this.popperShowTriggers) == null ? void 0 : t3.includes("hover"));
    }
  },
  watch: {
    shown: "$_autoShowHide",
    disabled(e2) {
      e2 ? this.dispose() : this.init();
    },
    async container() {
      this.isShown && (this.$_ensureTeleport(), await this.$_computePosition());
    },
    triggers: {
      handler: "$_refreshListeners",
      deep: true
    },
    positioningDisabled: "$_refreshListeners",
    ...[
      "placement",
      "distance",
      "skidding",
      "boundary",
      "strategy",
      "overflowPadding",
      "arrowPadding",
      "preventOverflow",
      "shift",
      "shiftCrossAxis",
      "flip"
    ].reduce((e2, t3) => (e2[t3] = "$_computePosition", e2), {})
  },
  created() {
    this.autoMinSize && console.warn('[floating-vue] `autoMinSize` option is deprecated. Use `autoSize="min"` instead.'), this.autoMaxSize && console.warn("[floating-vue] `autoMaxSize` option is deprecated. Use `autoBoundaryMaxSize` instead.");
  },
  mounted() {
    this.init(), this.$_detachPopperNode();
  },
  activated() {
    this.$_autoShowHide();
  },
  deactivated() {
    this.hide();
  },
  beforeUnmount() {
    this.dispose();
  },
  methods: {
    show({ event: e2 = null, skipDelay: t3 = false, force: o2 = false } = {}) {
      var i2, s2;
      (i2 = this.parentPopper) != null && i2.lockedChild && this.parentPopper.lockedChild !== this || (this.pendingHide = false, (o2 || !this.disabled) && (((s2 = this.parentPopper) == null ? void 0 : s2.lockedChild) === this && (this.parentPopper.lockedChild = null), this.$_scheduleShow(e2, t3), this.$emit("show"), this.$_showFrameLocked = true, requestAnimationFrame(() => {
        this.$_showFrameLocked = false;
      })), this.$emit("update:shown", true));
    },
    hide({ event: e2 = null, skipDelay: t3 = false } = {}) {
      var o2;
      if (!this.$_hideInProgress) {
        if (this.shownChildren.size > 0) {
          this.pendingHide = true;
          return;
        }
        if (this.hasPopperShowTriggerHover && this.$_isAimingPopper()) {
          this.parentPopper && (this.parentPopper.lockedChild = this, clearTimeout(this.parentPopper.lockedChildTimer), this.parentPopper.lockedChildTimer = setTimeout(() => {
            this.parentPopper.lockedChild === this && (this.parentPopper.lockedChild.hide({ skipDelay: t3 }), this.parentPopper.lockedChild = null);
          }, 1e3));
          return;
        }
        ((o2 = this.parentPopper) == null ? void 0 : o2.lockedChild) === this && (this.parentPopper.lockedChild = null), this.pendingHide = false, this.$_scheduleHide(e2, t3), this.$emit("hide"), this.$emit("update:shown", false);
      }
    },
    init() {
      var e2;
      this.isDisposed && (this.isDisposed = false, this.isMounted = false, this.$_events = [], this.$_preventShow = false, this.$_referenceNode = ((e2 = this.referenceNode) == null ? void 0 : e2.call(this)) ?? this.$el, this.$_targetNodes = this.targetNodes().filter((t3) => t3.nodeType === t3.ELEMENT_NODE), this.$_popperNode = this.popperNode(), this.$_innerNode = this.$_popperNode.querySelector(".v-popper__inner"), this.$_arrowNode = this.$_popperNode.querySelector(".v-popper__arrow-container"), this.$_swapTargetAttrs("title", "data-original-title"), this.$_detachPopperNode(), this.triggers.length && this.$_addEventListeners(), this.shown && this.show());
    },
    dispose() {
      this.isDisposed || (this.isDisposed = true, this.$_removeEventListeners(), this.hide({ skipDelay: true }), this.$_detachPopperNode(), this.isMounted = false, this.isShown = false, this.$_updateParentShownChildren(false), this.$_swapTargetAttrs("data-original-title", "title"));
    },
    async onResize() {
      this.isShown && (await this.$_computePosition(), this.$emit("resize"));
    },
    async $_computePosition() {
      if (this.isDisposed || this.positioningDisabled)
        return;
      const e2 = {
        strategy: this.strategy,
        middleware: []
      };
      (this.distance || this.skidding) && e2.middleware.push(offset({
        mainAxis: this.distance,
        crossAxis: this.skidding
      }));
      const t3 = this.placement.startsWith("auto");
      if (t3 ? e2.middleware.push(autoPlacement({
        alignment: this.placement.split("-")[1] ?? ""
      })) : e2.placement = this.placement, this.preventOverflow && (this.shift && e2.middleware.push(shift({
        padding: this.overflowPadding,
        boundary: this.boundary,
        crossAxis: this.shiftCrossAxis
      })), !t3 && this.flip && e2.middleware.push(flip({
        padding: this.overflowPadding,
        boundary: this.boundary
      }))), e2.middleware.push(arrow({
        element: this.$_arrowNode,
        padding: this.arrowPadding
      })), this.arrowOverflow && e2.middleware.push({
        name: "arrowOverflow",
        fn: ({ placement: i2, rects: s2, middlewareData: r2 }) => {
          let p2;
          const { centerOffset: a2 } = r2.arrow;
          return i2.startsWith("top") || i2.startsWith("bottom") ? p2 = Math.abs(a2) > s2.reference.width / 2 : p2 = Math.abs(a2) > s2.reference.height / 2, {
            data: {
              overflow: p2
            }
          };
        }
      }), this.autoMinSize || this.autoSize) {
        const i2 = this.autoSize ? this.autoSize : this.autoMinSize ? "min" : null;
        e2.middleware.push({
          name: "autoSize",
          fn: ({ rects: s2, placement: r2, middlewareData: p2 }) => {
            var u2;
            if ((u2 = p2.autoSize) != null && u2.skip)
              return {};
            let a2, l2;
            return r2.startsWith("top") || r2.startsWith("bottom") ? a2 = s2.reference.width : l2 = s2.reference.height, this.$_innerNode.style[i2 === "min" ? "minWidth" : i2 === "max" ? "maxWidth" : "width"] = a2 != null ? `${a2}px` : null, this.$_innerNode.style[i2 === "min" ? "minHeight" : i2 === "max" ? "maxHeight" : "height"] = l2 != null ? `${l2}px` : null, {
              data: {
                skip: true
              },
              reset: {
                rects: true
              }
            };
          }
        });
      }
      (this.autoMaxSize || this.autoBoundaryMaxSize) && (this.$_innerNode.style.maxWidth = null, this.$_innerNode.style.maxHeight = null, e2.middleware.push(size({
        boundary: this.boundary,
        padding: this.overflowPadding,
        apply: ({ availableWidth: i2, availableHeight: s2 }) => {
          this.$_innerNode.style.maxWidth = i2 != null ? `${i2}px` : null, this.$_innerNode.style.maxHeight = s2 != null ? `${s2}px` : null;
        }
      })));
      const o2 = await B$1(this.$_referenceNode, this.$_popperNode, e2);
      Object.assign(this.result, {
        x: o2.x,
        y: o2.y,
        placement: o2.placement,
        strategy: o2.strategy,
        arrow: {
          ...o2.middlewareData.arrow,
          ...o2.middlewareData.arrowOverflow
        }
      });
    },
    $_scheduleShow(e2, t3 = false) {
      if (this.$_updateParentShownChildren(true), this.$_hideInProgress = false, clearTimeout(this.$_scheduleTimer), g && this.instantMove && g.instantMove && g !== this.parentPopper) {
        g.$_applyHide(true), this.$_applyShow(true);
        return;
      }
      t3 ? this.$_applyShow() : this.$_scheduleTimer = setTimeout(this.$_applyShow.bind(this), this.$_computeDelay("show"));
    },
    $_scheduleHide(e2, t3 = false) {
      if (this.shownChildren.size > 0) {
        this.pendingHide = true;
        return;
      }
      this.$_updateParentShownChildren(false), this.$_hideInProgress = true, clearTimeout(this.$_scheduleTimer), this.isShown && (g = this), t3 ? this.$_applyHide() : this.$_scheduleTimer = setTimeout(this.$_applyHide.bind(this), this.$_computeDelay("hide"));
    },
    $_computeDelay(e2) {
      const t3 = this.delay;
      return parseInt(t3 && t3[e2] || t3 || 0);
    },
    async $_applyShow(e2 = false) {
      clearTimeout(this.$_disposeTimer), clearTimeout(this.$_scheduleTimer), this.skipTransition = e2, !this.isShown && (this.$_ensureTeleport(), await G$1(), await this.$_computePosition(), await this.$_applyShowEffect(), this.positioningDisabled || this.$_registerEventListeners([
        ...D(this.$_referenceNode),
        ...D(this.$_popperNode)
      ], "scroll", () => {
        this.$_computePosition();
      }));
    },
    async $_applyShowEffect() {
      if (this.$_hideInProgress)
        return;
      if (this.computeTransformOrigin) {
        const t3 = this.$_referenceNode.getBoundingClientRect(), o2 = this.$_popperNode.querySelector(".v-popper__wrapper"), i2 = o2.parentNode.getBoundingClientRect(), s2 = t3.x + t3.width / 2 - (i2.left + o2.offsetLeft), r2 = t3.y + t3.height / 2 - (i2.top + o2.offsetTop);
        this.result.transformOrigin = `${s2}px ${r2}px`;
      }
      this.isShown = true, this.$_applyAttrsToTarget({
        "aria-describedby": this.popperId,
        "data-popper-shown": ""
      });
      const e2 = this.showGroup;
      if (e2) {
        let t3;
        for (let o2 = 0; o2 < d.length; o2++)
          t3 = d[o2], t3.showGroup !== e2 && (t3.hide(), t3.$emit("close-group"));
      }
      d.push(this), document.body.classList.add("v-popper--some-open");
      for (const t3 of re(this.theme))
        he(t3).push(this), document.body.classList.add(`v-popper--some-open--${t3}`);
      this.$emit("apply-show"), this.classes.showFrom = true, this.classes.showTo = false, this.classes.hideFrom = false, this.classes.hideTo = false, await G$1(), this.classes.showFrom = false, this.classes.showTo = true, this.noAutoFocus || this.$_popperNode.focus();
    },
    async $_applyHide(e2 = false) {
      if (this.shownChildren.size > 0) {
        this.pendingHide = true, this.$_hideInProgress = false;
        return;
      }
      if (clearTimeout(this.$_scheduleTimer), !this.isShown)
        return;
      this.skipTransition = e2, de(d, this), d.length === 0 && document.body.classList.remove("v-popper--some-open");
      for (const o2 of re(this.theme)) {
        const i2 = he(o2);
        de(i2, this), i2.length === 0 && document.body.classList.remove(`v-popper--some-open--${o2}`);
      }
      g === this && (g = null), this.isShown = false, this.$_applyAttrsToTarget({
        "aria-describedby": void 0,
        "data-popper-shown": void 0
      }), clearTimeout(this.$_disposeTimer);
      const t3 = this.disposeTimeout;
      t3 !== null && (this.$_disposeTimer = setTimeout(() => {
        this.$_popperNode && (this.$_detachPopperNode(), this.isMounted = false);
      }, t3)), this.$_removeEventListeners("scroll"), this.$emit("apply-hide"), this.classes.showFrom = false, this.classes.showTo = false, this.classes.hideFrom = true, this.classes.hideTo = false, await G$1(), this.classes.hideFrom = false, this.classes.hideTo = true;
    },
    $_autoShowHide() {
      this.shown ? this.show() : this.hide();
    },
    $_ensureTeleport() {
      if (this.isDisposed)
        return;
      let e2 = this.container;
      if (typeof e2 == "string" ? e2 = window.document.querySelector(e2) : e2 === false && (e2 = this.$_targetNodes[0].parentNode), !e2)
        throw new Error("No container for popover: " + this.container);
      e2.appendChild(this.$_popperNode), this.isMounted = true;
    },
    $_addEventListeners() {
      const e2 = (o2) => {
        this.isShown && !this.$_hideInProgress || (o2.usedByTooltip = true, !this.$_preventShow && this.show({ event: o2 }));
      };
      this.$_registerTriggerListeners(this.$_targetNodes, pe, this.triggers, this.showTriggers, e2), this.$_registerTriggerListeners([this.$_popperNode], pe, this.popperTriggers, this.popperShowTriggers, e2);
      const t3 = (o2) => {
        o2.usedByTooltip || this.hide({ event: o2 });
      };
      this.$_registerTriggerListeners(this.$_targetNodes, ae, this.triggers, this.hideTriggers, t3), this.$_registerTriggerListeners([this.$_popperNode], ae, this.popperTriggers, this.popperHideTriggers, t3);
    },
    $_registerEventListeners(e2, t3, o2) {
      this.$_events.push({ targetNodes: e2, eventType: t3, handler: o2 }), e2.forEach((i2) => i2.addEventListener(t3, o2, $ ? {
        passive: true
      } : void 0));
    },
    $_registerTriggerListeners(e2, t3, o2, i2, s2) {
      let r2 = o2;
      i2 != null && (r2 = typeof i2 == "function" ? i2(r2) : i2), r2.forEach((p2) => {
        const a2 = t3[p2];
        a2 && this.$_registerEventListeners(e2, a2, s2);
      });
    },
    $_removeEventListeners(e2) {
      const t3 = [];
      this.$_events.forEach((o2) => {
        const { targetNodes: i2, eventType: s2, handler: r2 } = o2;
        !e2 || e2 === s2 ? i2.forEach((p2) => p2.removeEventListener(s2, r2)) : t3.push(o2);
      }), this.$_events = t3;
    },
    $_refreshListeners() {
      this.isDisposed || (this.$_removeEventListeners(), this.$_addEventListeners());
    },
    $_handleGlobalClose(e2, t3 = false) {
      this.$_showFrameLocked || (this.hide({ event: e2 }), e2.closePopover ? this.$emit("close-directive") : this.$emit("auto-hide"), t3 && (this.$_preventShow = true, setTimeout(() => {
        this.$_preventShow = false;
      }, 300)));
    },
    $_detachPopperNode() {
      this.$_popperNode.parentNode && this.$_popperNode.parentNode.removeChild(this.$_popperNode);
    },
    $_swapTargetAttrs(e2, t3) {
      for (const o2 of this.$_targetNodes) {
        const i2 = o2.getAttribute(e2);
        i2 && (o2.removeAttribute(e2), o2.setAttribute(t3, i2));
      }
    },
    $_applyAttrsToTarget(e2) {
      for (const t3 of this.$_targetNodes)
        for (const o2 in e2) {
          const i2 = e2[o2];
          i2 == null ? t3.removeAttribute(o2) : t3.setAttribute(o2, i2);
        }
    },
    $_updateParentShownChildren(e2) {
      let t3 = this.parentPopper;
      for (; t3; )
        e2 ? t3.shownChildren.add(this.randomId) : (t3.shownChildren.delete(this.randomId), t3.pendingHide && t3.hide()), t3 = t3.parentPopper;
    },
    $_isAimingPopper() {
      const e2 = this.$_referenceNode.getBoundingClientRect();
      if (y >= e2.left && y <= e2.right && _ >= e2.top && _ <= e2.bottom) {
        const t3 = this.$_popperNode.getBoundingClientRect(), o2 = y - c, i2 = _ - m, r2 = t3.left + t3.width / 2 - c + (t3.top + t3.height / 2) - m + t3.width + t3.height, p2 = c + o2 * r2, a2 = m + i2 * r2;
        return C(c, m, p2, a2, t3.left, t3.top, t3.left, t3.bottom) || // Left edge
        C(c, m, p2, a2, t3.left, t3.top, t3.right, t3.top) || // Top edge
        C(c, m, p2, a2, t3.right, t3.top, t3.right, t3.bottom) || // Right edge
        C(c, m, p2, a2, t3.left, t3.bottom, t3.right, t3.bottom);
      }
      return false;
    }
  },
  render() {
    return this.$slots.default(this.slotData);
  }
});
if (typeof document < "u" && typeof window < "u") {
  if (_e) {
    const e2 = $ ? {
      passive: true,
      capture: true
    } : true;
    document.addEventListener("touchstart", (t3) => ue(t3), e2), document.addEventListener("touchend", (t3) => fe(t3, true), e2);
  } else
    window.addEventListener("mousedown", (e2) => ue(e2), true), window.addEventListener("click", (e2) => fe(e2, false), true);
  window.addEventListener("resize", tt);
}
function ue(e2, t3) {
  for (let o2 = 0; o2 < d.length; o2++) {
    const i2 = d[o2];
    try {
      i2.mouseDownContains = i2.popperNode().contains(e2.target);
    } catch {
    }
  }
}
function fe(e2, t3) {
  Pe(e2, t3);
}
function Pe(e2, t3) {
  const o2 = {};
  for (let i2 = d.length - 1; i2 >= 0; i2--) {
    const s2 = d[i2];
    try {
      const r2 = s2.containsGlobalTarget = s2.mouseDownContains || s2.popperNode().contains(e2.target);
      s2.pendingHide = false, requestAnimationFrame(() => {
        if (s2.pendingHide = false, !o2[s2.randomId] && ce(s2, r2, e2)) {
          if (s2.$_handleGlobalClose(e2, t3), !e2.closeAllPopover && e2.closePopover && r2) {
            let a2 = s2.parentPopper;
            for (; a2; )
              o2[a2.randomId] = true, a2 = a2.parentPopper;
            return;
          }
          let p2 = s2.parentPopper;
          for (; p2 && ce(p2, p2.containsGlobalTarget, e2); ) {
            p2.$_handleGlobalClose(e2, t3);
            p2 = p2.parentPopper;
          }
        }
      });
    } catch {
    }
  }
}
function ce(e2, t3, o2) {
  return o2.closeAllPopover || o2.closePopover && t3 || et(e2, o2) && !t3;
}
function et(e2, t3) {
  if (typeof e2.autoHide == "function") {
    const o2 = e2.autoHide(t3);
    return e2.lastAutoHide = o2, o2;
  }
  return e2.autoHide;
}
function tt() {
  for (let e2 = 0; e2 < d.length; e2++)
    d[e2].$_computePosition();
}
let c = 0, m = 0, y = 0, _ = 0;
typeof window < "u" && window.addEventListener("mousemove", (e2) => {
  c = y, m = _, y = e2.clientX, _ = e2.clientY;
}, $ ? {
  passive: true
} : void 0);
function C(e2, t3, o2, i2, s2, r2, p2, a2) {
  const l2 = ((p2 - s2) * (t3 - r2) - (a2 - r2) * (e2 - s2)) / ((a2 - r2) * (o2 - e2) - (p2 - s2) * (i2 - t3)), u2 = ((o2 - e2) * (t3 - r2) - (i2 - t3) * (e2 - s2)) / ((a2 - r2) * (o2 - e2) - (p2 - s2) * (i2 - t3));
  return l2 >= 0 && l2 <= 1 && u2 >= 0 && u2 <= 1;
}
const ot = {
  extends: Q()
}, B = (e2, t3) => {
  const o2 = e2.__vccOpts || e2;
  for (const [i2, s2] of t3)
    o2[i2] = s2;
  return o2;
};
function it(e2, t3, o2, i2, s2, r2) {
  return openBlock(), createElementBlock("div", {
    ref: "reference",
    class: normalizeClass(["v-popper", {
      "v-popper--shown": e2.slotData.isShown
    }])
  }, [
    renderSlot(e2.$slots, "default", normalizeProps(guardReactiveProps(e2.slotData)))
  ], 2);
}
const st = /* @__PURE__ */ B(ot, [["render", it]]);
function nt() {
  var e2 = window.navigator.userAgent, t3 = e2.indexOf("MSIE ");
  if (t3 > 0)
    return parseInt(e2.substring(t3 + 5, e2.indexOf(".", t3)), 10);
  var o2 = e2.indexOf("Trident/");
  if (o2 > 0) {
    var i2 = e2.indexOf("rv:");
    return parseInt(e2.substring(i2 + 3, e2.indexOf(".", i2)), 10);
  }
  var s2 = e2.indexOf("Edge/");
  return s2 > 0 ? parseInt(e2.substring(s2 + 5, e2.indexOf(".", s2)), 10) : -1;
}
let z;
function X() {
  X.init || (X.init = true, z = nt() !== -1);
}
var E = {
  name: "ResizeObserver",
  props: {
    emitOnMount: {
      type: Boolean,
      default: false
    },
    ignoreWidth: {
      type: Boolean,
      default: false
    },
    ignoreHeight: {
      type: Boolean,
      default: false
    }
  },
  emits: [
    "notify"
  ],
  mounted() {
    X(), nextTick(() => {
      this._w = this.$el.offsetWidth, this._h = this.$el.offsetHeight, this.emitOnMount && this.emitSize();
    });
    const e2 = document.createElement("object");
    this._resizeObject = e2, e2.setAttribute("aria-hidden", "true"), e2.setAttribute("tabindex", -1), e2.onload = this.addResizeHandlers, e2.type = "text/html", z && this.$el.appendChild(e2), e2.data = "about:blank", z || this.$el.appendChild(e2);
  },
  beforeUnmount() {
    this.removeResizeHandlers();
  },
  methods: {
    compareAndNotify() {
      (!this.ignoreWidth && this._w !== this.$el.offsetWidth || !this.ignoreHeight && this._h !== this.$el.offsetHeight) && (this._w = this.$el.offsetWidth, this._h = this.$el.offsetHeight, this.emitSize());
    },
    emitSize() {
      this.$emit("notify", {
        width: this._w,
        height: this._h
      });
    },
    addResizeHandlers() {
      this._resizeObject.contentDocument.defaultView.addEventListener("resize", this.compareAndNotify), this.compareAndNotify();
    },
    removeResizeHandlers() {
      this._resizeObject && this._resizeObject.onload && (!z && this._resizeObject.contentDocument && this._resizeObject.contentDocument.defaultView.removeEventListener("resize", this.compareAndNotify), this.$el.removeChild(this._resizeObject), this._resizeObject.onload = null, this._resizeObject = null);
    }
  }
};
const rt = /* @__PURE__ */ withScopeId();
pushScopeId("data-v-b329ee4c");
const pt = {
  class: "resize-observer",
  tabindex: "-1"
};
popScopeId();
const at = /* @__PURE__ */ rt((e2, t3, o2, i2, s2, r2) => (openBlock(), createBlock("div", pt)));
E.render = at;
E.__scopeId = "data-v-b329ee4c";
E.__file = "src/components/ResizeObserver.vue";
const Z = (e2 = "theme") => ({
  computed: {
    themeClass() {
      return Ze(this[e2]);
    }
  }
}), dt = /* @__PURE__ */ defineComponent({
  name: "VPopperContent",
  components: {
    ResizeObserver: E
  },
  mixins: [
    Z()
  ],
  props: {
    popperId: String,
    theme: String,
    shown: Boolean,
    mounted: Boolean,
    skipTransition: Boolean,
    autoHide: Boolean,
    handleResize: Boolean,
    classes: Object,
    result: Object
  },
  emits: [
    "hide",
    "resize"
  ],
  methods: {
    toPx(e2) {
      return e2 != null && !isNaN(e2) ? `${e2}px` : null;
    }
  }
}), lt = ["id", "aria-hidden", "tabindex", "data-popper-placement"], ht = {
  ref: "inner",
  class: "v-popper__inner"
}, ut = /* @__PURE__ */ createBaseVNode("div", { class: "v-popper__arrow-outer" }, null, -1), ft = /* @__PURE__ */ createBaseVNode("div", { class: "v-popper__arrow-inner" }, null, -1), ct = [
  ut,
  ft
];
function mt(e2, t3, o2, i2, s2, r2) {
  const p2 = resolveComponent("ResizeObserver");
  return openBlock(), createElementBlock("div", {
    id: e2.popperId,
    ref: "popover",
    class: normalizeClass(["v-popper__popper", [
      e2.themeClass,
      e2.classes.popperClass,
      {
        "v-popper__popper--shown": e2.shown,
        "v-popper__popper--hidden": !e2.shown,
        "v-popper__popper--show-from": e2.classes.showFrom,
        "v-popper__popper--show-to": e2.classes.showTo,
        "v-popper__popper--hide-from": e2.classes.hideFrom,
        "v-popper__popper--hide-to": e2.classes.hideTo,
        "v-popper__popper--skip-transition": e2.skipTransition,
        "v-popper__popper--arrow-overflow": e2.result && e2.result.arrow.overflow,
        "v-popper__popper--no-positioning": !e2.result
      }
    ]]),
    style: normalizeStyle(e2.result ? {
      position: e2.result.strategy,
      transform: `translate3d(${Math.round(e2.result.x)}px,${Math.round(e2.result.y)}px,0)`
    } : void 0),
    "aria-hidden": e2.shown ? "false" : "true",
    tabindex: e2.autoHide ? 0 : void 0,
    "data-popper-placement": e2.result ? e2.result.placement : void 0,
    onKeyup: t3[2] || (t3[2] = withKeys((a2) => e2.autoHide && e2.$emit("hide"), ["esc"]))
  }, [
    createBaseVNode("div", {
      class: "v-popper__backdrop",
      onClick: t3[0] || (t3[0] = (a2) => e2.autoHide && e2.$emit("hide"))
    }),
    createBaseVNode("div", {
      class: "v-popper__wrapper",
      style: normalizeStyle(e2.result ? {
        transformOrigin: e2.result.transformOrigin
      } : void 0)
    }, [
      createBaseVNode("div", ht, [
        e2.mounted ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
          createBaseVNode("div", null, [
            renderSlot(e2.$slots, "default")
          ]),
          e2.handleResize ? (openBlock(), createBlock(p2, {
            key: 0,
            onNotify: t3[1] || (t3[1] = (a2) => e2.$emit("resize", a2))
          })) : createCommentVNode("", true)
        ], 64)) : createCommentVNode("", true)
      ], 512),
      createBaseVNode("div", {
        ref: "arrow",
        class: "v-popper__arrow-container",
        style: normalizeStyle(e2.result ? {
          left: e2.toPx(e2.result.arrow.x),
          top: e2.toPx(e2.result.arrow.y)
        } : void 0)
      }, ct, 4)
    ], 4)
  ], 46, lt);
}
const ee = /* @__PURE__ */ B(dt, [["render", mt]]), te = {
  methods: {
    show(...e2) {
      return this.$refs.popper.show(...e2);
    },
    hide(...e2) {
      return this.$refs.popper.hide(...e2);
    },
    dispose(...e2) {
      return this.$refs.popper.dispose(...e2);
    },
    onResize(...e2) {
      return this.$refs.popper.onResize(...e2);
    }
  }
};
let K = function() {
};
typeof window < "u" && (K = window.Element);
const gt$1 = /* @__PURE__ */ defineComponent({
  name: "VPopperWrapper",
  components: {
    Popper: st,
    PopperContent: ee
  },
  mixins: [
    te,
    Z("finalTheme")
  ],
  props: {
    theme: {
      type: String,
      default: null
    },
    referenceNode: {
      type: Function,
      default: null
    },
    shown: {
      type: Boolean,
      default: false
    },
    showGroup: {
      type: String,
      default: null
    },
    // eslint-disable-next-line vue/require-prop-types
    ariaId: {
      default: null
    },
    disabled: {
      type: Boolean,
      default: void 0
    },
    positioningDisabled: {
      type: Boolean,
      default: void 0
    },
    placement: {
      type: String,
      default: void 0
    },
    delay: {
      type: [String, Number, Object],
      default: void 0
    },
    distance: {
      type: [Number, String],
      default: void 0
    },
    skidding: {
      type: [Number, String],
      default: void 0
    },
    triggers: {
      type: Array,
      default: void 0
    },
    showTriggers: {
      type: [Array, Function],
      default: void 0
    },
    hideTriggers: {
      type: [Array, Function],
      default: void 0
    },
    popperTriggers: {
      type: Array,
      default: void 0
    },
    popperShowTriggers: {
      type: [Array, Function],
      default: void 0
    },
    popperHideTriggers: {
      type: [Array, Function],
      default: void 0
    },
    container: {
      type: [String, Object, K, Boolean],
      default: void 0
    },
    boundary: {
      type: [String, K],
      default: void 0
    },
    strategy: {
      type: String,
      default: void 0
    },
    autoHide: {
      type: [Boolean, Function],
      default: void 0
    },
    handleResize: {
      type: Boolean,
      default: void 0
    },
    instantMove: {
      type: Boolean,
      default: void 0
    },
    eagerMount: {
      type: Boolean,
      default: void 0
    },
    popperClass: {
      type: [String, Array, Object],
      default: void 0
    },
    computeTransformOrigin: {
      type: Boolean,
      default: void 0
    },
    /**
     * @deprecated
     */
    autoMinSize: {
      type: Boolean,
      default: void 0
    },
    autoSize: {
      type: [Boolean, String],
      default: void 0
    },
    /**
     * @deprecated
     */
    autoMaxSize: {
      type: Boolean,
      default: void 0
    },
    autoBoundaryMaxSize: {
      type: Boolean,
      default: void 0
    },
    preventOverflow: {
      type: Boolean,
      default: void 0
    },
    overflowPadding: {
      type: [Number, String],
      default: void 0
    },
    arrowPadding: {
      type: [Number, String],
      default: void 0
    },
    arrowOverflow: {
      type: Boolean,
      default: void 0
    },
    flip: {
      type: Boolean,
      default: void 0
    },
    shift: {
      type: Boolean,
      default: void 0
    },
    shiftCrossAxis: {
      type: Boolean,
      default: void 0
    },
    noAutoFocus: {
      type: Boolean,
      default: void 0
    },
    disposeTimeout: {
      type: Number,
      default: void 0
    }
  },
  emits: {
    show: () => true,
    hide: () => true,
    "update:shown": (e2) => true,
    "apply-show": () => true,
    "apply-hide": () => true,
    "close-group": () => true,
    "close-directive": () => true,
    "auto-hide": () => true,
    resize: () => true
  },
  computed: {
    finalTheme() {
      return this.theme ?? this.$options.vPopperTheme;
    }
  },
  methods: {
    getTargetNodes() {
      return Array.from(this.$el.children).filter((e2) => e2 !== this.$refs.popperContent.$el);
    }
  }
});
function wt(e2, t3, o2, i2, s2, r2) {
  const p2 = resolveComponent("PopperContent"), a2 = resolveComponent("Popper");
  return openBlock(), createBlock(a2, mergeProps({ ref: "popper" }, e2.$props, {
    theme: e2.finalTheme,
    "target-nodes": e2.getTargetNodes,
    "popper-node": () => e2.$refs.popperContent.$el,
    class: [
      e2.themeClass
    ],
    onShow: t3[0] || (t3[0] = () => e2.$emit("show")),
    onHide: t3[1] || (t3[1] = () => e2.$emit("hide")),
    "onUpdate:shown": t3[2] || (t3[2] = (l2) => e2.$emit("update:shown", l2)),
    onApplyShow: t3[3] || (t3[3] = () => e2.$emit("apply-show")),
    onApplyHide: t3[4] || (t3[4] = () => e2.$emit("apply-hide")),
    onCloseGroup: t3[5] || (t3[5] = () => e2.$emit("close-group")),
    onCloseDirective: t3[6] || (t3[6] = () => e2.$emit("close-directive")),
    onAutoHide: t3[7] || (t3[7] = () => e2.$emit("auto-hide")),
    onResize: t3[8] || (t3[8] = () => e2.$emit("resize"))
  }), {
    default: withCtx(({
      popperId: l2,
      isShown: u2,
      shouldMountContent: L2,
      skipTransition: D2,
      autoHide: I,
      show: F2,
      hide: v2,
      handleResize: R2,
      onResize: j,
      classes: V,
      result: Ee
    }) => [
      renderSlot(e2.$slots, "default", {
        shown: u2,
        show: F2,
        hide: v2
      }),
      createVNode(p2, {
        ref: "popperContent",
        "popper-id": l2,
        theme: e2.finalTheme,
        shown: u2,
        mounted: L2,
        "skip-transition": D2,
        "auto-hide": I,
        "handle-resize": R2,
        classes: V,
        result: Ee,
        onHide: v2,
        onResize: j
      }, {
        default: withCtx(() => [
          renderSlot(e2.$slots, "popper", {
            shown: u2,
            hide: v2
          })
        ]),
        _: 2
      }, 1032, ["popper-id", "theme", "shown", "mounted", "skip-transition", "auto-hide", "handle-resize", "classes", "result", "onHide", "onResize"])
    ]),
    _: 3
  }, 16, ["theme", "target-nodes", "popper-node", "class"]);
}
const k = /* @__PURE__ */ B(gt$1, [["render", wt]]);
({
  ...k
});
({
  ...k
});
({
  ...k
});
/* @__PURE__ */ defineComponent({
  name: "VTooltipDirective",
  components: {
    Popper: Q(),
    PopperContent: ee
  },
  mixins: [
    te
  ],
  inheritAttrs: false,
  props: {
    theme: {
      type: String,
      default: "tooltip"
    },
    html: {
      type: Boolean,
      default: (e2) => S(e2.theme, "html")
    },
    content: {
      type: [String, Number, Function],
      default: null
    },
    loadingContent: {
      type: String,
      default: (e2) => S(e2.theme, "loadingContent")
    },
    targetNodes: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      asyncContent: null
    };
  },
  computed: {
    isContentAsync() {
      return typeof this.content == "function";
    },
    loading() {
      return this.isContentAsync && this.asyncContent == null;
    },
    finalContent() {
      return this.isContentAsync ? this.loading ? this.loadingContent : this.asyncContent : this.content;
    }
  },
  watch: {
    content: {
      handler() {
        this.fetchContent(true);
      },
      immediate: true
    },
    async finalContent() {
      await this.$nextTick(), this.$refs.popper.onResize();
    }
  },
  created() {
    this.$_fetchId = 0;
  },
  methods: {
    fetchContent(e2) {
      if (typeof this.content == "function" && this.$_isShown && (e2 || !this.$_loading && this.asyncContent == null)) {
        this.asyncContent = null, this.$_loading = true;
        const t3 = ++this.$_fetchId, o2 = this.content(this);
        o2.then ? o2.then((i2) => this.onResult(t3, i2)) : this.onResult(t3, o2);
      }
    },
    onResult(e2, t3) {
      e2 === this.$_fetchId && (this.$_loading = false, this.asyncContent = t3);
    },
    onShow() {
      this.$_isShown = true, this.fetchContent();
    },
    onHide() {
      this.$_isShown = false;
    }
  }
});
const Ht = h;
getLoggerBuilder().detectUser().setApp("@nextcloud/vue").build();
const theme = "nc-popover-9";
Ht.themes[theme] = structuredClone(Ht.themes.dropdown);
register(t4);
({
  props: {
    /**
     * Aria label for the actions menu.
     *
     * If `menuName` is defined this will not be used to prevent
     * any accessible name conflicts. This ensures that the
     * element can be activated via voice input.
     */
    ariaLabel: {
      default: t("Actions")
    }
  }
});
register(t2);
({
  long: t("a few seconds ago"),
  short: t("seconds ago"),
  // FOR TRANSLATORS: Shorter version of 'a few seconds ago'
  narrow: t("sec. ago")
  // FOR TRANSLATORS: If possible in your language an even shorter version of 'a few seconds ago'
});
window.OCP?.Accessibility?.disableKeyboardShortcuts?.();
function checkIfDarkTheme(el = document.body) {
  const backgroundInvertIfDark = window.getComputedStyle(el).getPropertyValue("--background-invert-if-dark");
  if (backgroundInvertIfDark !== void 0) {
    return backgroundInvertIfDark === "invert(100%)";
  }
  return false;
}
checkIfDarkTheme();
const isFullscreen = /* @__PURE__ */ ref(checkIfIsFullscreen());
window.addEventListener("resize", () => {
  isFullscreen.value = checkIfIsFullscreen();
});
function checkIfIsFullscreen() {
  return window.outerHeight === window.screen.height;
}
const MOBILE_BREAKPOINT = 1024;
const MOBILE_SMALL_BREAKPOINT = MOBILE_BREAKPOINT / 2;
const isLessThanBreakpoint = (breakpoint) => document.documentElement.clientWidth < breakpoint;
const isMobile = /* @__PURE__ */ ref(isLessThanBreakpoint(MOBILE_BREAKPOINT));
const isSmallMobile = /* @__PURE__ */ ref(isLessThanBreakpoint(MOBILE_SMALL_BREAKPOINT));
window.addEventListener("resize", () => {
  isMobile.value = isLessThanBreakpoint(MOBILE_BREAKPOINT);
  isSmallMobile.value = isLessThanBreakpoint(MOBILE_SMALL_BREAKPOINT);
}, { passive: true });
register(t19, t36);
const gtBuilder = getGettextBuilder().detectLanguage();
for (const data of [{ "language": "ar", "translations": [{ "msgid": '"{name}" is an invalid folder name.', "msgstr": ['"{name}" لا يصلح كاسم مجلد.'] }, { "msgid": '"{name}" is not an allowed folder name', "msgstr": ['"{name}" غير مسموح به كاسم مجلد'] }, { "msgid": '"/" is not allowed inside a folder name.', "msgstr": ['"/" غير مسموح به داخل اسم مجلد.'] }, { "msgid": "All files", "msgstr": ["كل الملفات"] }, { "msgid": "Choose", "msgstr": ["إختَر"] }, { "msgid": "Choose {file}", "msgstr": ["إختر {file}"] }, { "msgid": "Choose %n file", "msgid_plural": "Choose %n files", "msgstr": ["إختَر %n ملف", "إختَر %n ملف", "إختَر %n ملف", "إختَر %n ملفات", "إختَر %n ملف", "إختر %n ملف"] }, { "msgid": "Copy", "msgstr": ["نسخ"] }, { "msgid": "Copy to {target}", "msgstr": ["نسخ إلى {target}"] }, { "msgid": "Could not create the new folder", "msgstr": ["تعذّر إنشاء المجلد الجديد"] }, { "msgid": "Could not load files settings", "msgstr": ["يتعذّر تحميل إعدادات الملفات"] }, { "msgid": "Could not load files views", "msgstr": ["تعذر تحميل عرض الملفات"] }, { "msgid": "Create directory", "msgstr": ["إنشاء مجلد"] }, { "msgid": "Current view selector", "msgstr": ["محدد العرض الحالي"] }, { "msgid": "Favorites", "msgstr": ["المفضلة"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["الملفات والمجلدات التي تحددها كمفضلة ستظهر هنا."] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["الملفات و المجلدات التي قمت مؤخراً بتعديلها سوف تظهر هنا."] }, { "msgid": "Filter file list", "msgstr": ["تصفية قائمة الملفات"] }, { "msgid": "Folder name cannot be empty.", "msgstr": ["اسم المجلد لا يمكن أن يكون فارغاً."] }, { "msgid": "Home", "msgstr": ["البداية"] }, { "msgid": "Modified", "msgstr": ["التعديل"] }, { "msgid": "Move", "msgstr": ["نقل"] }, { "msgid": "Move to {target}", "msgstr": ["نقل إلى {target}"] }, { "msgid": "Name", "msgstr": ["الاسم"] }, { "msgid": "New", "msgstr": ["جديد"] }, { "msgid": "New folder", "msgstr": ["مجلد جديد"] }, { "msgid": "New folder name", "msgstr": ["اسم المجلد الجديد"] }, { "msgid": "No files in here", "msgstr": ["لا توجد ملفات هنا"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["لا توجد ملفات تتطابق مع عامل التصفية الذي وضعته"] }, { "msgid": "No matching files", "msgstr": ["لا توجد ملفات مطابقة"] }, { "msgid": "Recent", "msgstr": ["الحالي"] }, { "msgid": "Select all entries", "msgstr": ["حدد جميع الإدخالات"] }, { "msgid": "Select entry", "msgstr": ["إختَر المدخل"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["إختر سطر الـ {nodename}"] }, { "msgid": "Size", "msgstr": ["الحجم"] }, { "msgid": "Undo", "msgstr": ["تراجع"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["قم برفع بعض المحتوى أو المزامنة مع أجهزتك!"] }] }, { "language": "ast", "translations": [{ "msgid": '"{name}" is an invalid folder name.', "msgstr": ["«{name}» ye un nome de carpeta inválidu."] }, { "msgid": '"{name}" is not an allowed folder name', "msgstr": ["«{name}» ye un nome de carpeta inválidu"] }, { "msgid": '"/" is not allowed inside a folder name.', "msgstr": ["Nun se permite'l caráuter «/» dientro'l nome de les carpetes."] }, { "msgid": "All files", "msgstr": ["Tolos ficheros"] }, { "msgid": "Choose", "msgstr": ["Escoyer"] }, { "msgid": "Choose {file}", "msgstr": ["Escoyer «{ficheru}»"] }, { "msgid": "Choose %n file", "msgid_plural": "Choose %n files", "msgstr": ["Escoyer %n ficheru", "Escoyer %n ficheros"] }, { "msgid": "Copy", "msgstr": ["Copiar"] }, { "msgid": "Copy to {target}", "msgstr": ["Copiar en: {target}"] }, { "msgid": "Could not create the new folder", "msgstr": ["Nun se pudo crear la carpeta"] }, { "msgid": "Could not load files settings", "msgstr": ["Nun se pudo cargar la configuración de los ficheros"] }, { "msgid": "Could not load files views", "msgstr": ["Nun se pudieron cargar les vistes de los ficheros"] }, { "msgid": "Create directory", "msgstr": ["Crear un direutoriu"] }, { "msgid": "Current view selector", "msgstr": ["Selector de la vista actual"] }, { "msgid": "Favorites", "msgstr": ["Favoritos"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["Equí apaecen los ficheros y les carpetes que metas en Favoritos."] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["Equí apaecen los fichero y les carpetes que modificares apocayá."] }, { "msgid": "Filter file list", "msgstr": ["Peñerar la llista de ficheros"] }, { "msgid": "Folder name cannot be empty.", "msgstr": ["El nome de la carpeta nun pue tar baleru."] }, { "msgid": "Home", "msgstr": ["Aniciu"] }, { "msgid": "Modified", "msgstr": ["Modificóse"] }, { "msgid": "Move", "msgstr": ["Mover"] }, { "msgid": "Move to {target}", "msgstr": ["Mover a {target}"] }, { "msgid": "Name", "msgstr": ["Nome"] }, { "msgid": "New", "msgstr": ["Nuevu"] }, { "msgid": "New folder", "msgstr": ["Carpeta nueva"] }, { "msgid": "New folder name", "msgstr": ["Nome de carpeta nuevu"] }, { "msgid": "No files in here", "msgstr": ["Equí nun hai nengún ficheru"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["Nun s'atopó nengún ficheru que concasare cola peñera."] }, { "msgid": "No matching files", "msgstr": ["Nun hai nengún ficheru que concase"] }, { "msgid": "Recent", "msgstr": ["De recién"] }, { "msgid": "Select all entries", "msgstr": ["Seleicionar toles entraes"] }, { "msgid": "Select entry", "msgstr": ["Seleicionar la entrada"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["Seleicionar la filera de: {nodename}"] }, { "msgid": "Size", "msgstr": ["Tamañu"] }, { "msgid": "Undo", "msgstr": ["Desfacer"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["¡Xubi dalgún elementu o sincroniza colos tos preseos!"] }] }, { "language": "ca", "translations": [{ "msgid": '"{char}" is not allowed inside a name.', "msgstr": [`No és permès d'usar el caràcter "{char}" en un nom.`] }, { "msgid": '"{extension}" is not an allowed name.', "msgstr": ['"{extension}" no és un nom permès.'] }, { "msgid": '"{name}" is an invalid folder name.', "msgstr": ['"{name}" no és vàlid com a nom de carpeta.'] }, { "msgid": '"{name}" is not an allowed folder name', "msgstr": ['"{name}" no és vàlid com a nom de carpeta'] }, { "msgid": '"{segment}" is a reserved name and not allowed.', "msgstr": ['"{segment}" és un mot reservat i no està permès com a nom.'] }, { "msgid": '"/" is not allowed inside a folder name.', "msgstr": [`"/" no està permès en el nom d'una carpeta.`] }, { "msgid": "%n file conflict", "msgid_plural": "%n files conflict", "msgstr": ["%n conflicte de fitxers", "%n conflictes de fitxers"] }, { "msgid": "%n file conflict in {dirname}", "msgid_plural": "%n file conflicts in {dirname}", "msgstr": ["%n onflicte de fitxers a {dirname}", "%n conflictes de fitxers a {dirname}"] }, { "msgid": "All files", "msgstr": ["Tots els fitxers"] }, { "msgid": "Cancel", "msgstr": ["Cancel·lar"] }, { "msgid": "Cancel the entire operation", "msgstr": ["Cancel·lar tota l'operació"] }, { "msgid": "Choose", "msgstr": ["Tria"] }, { "msgid": "Choose {file}", "msgstr": ["Tria {file}"] }, { "msgid": "Choose %n file", "msgid_plural": "Choose %n files", "msgstr": ["Tria %n fitxer", "Tria %n fitxers"] }, { "msgid": "Confirm", "msgstr": ["Confirma"] }, { "msgid": "Continue", "msgstr": ["Continuar"] }, { "msgid": "Copy", "msgstr": ["Copia"] }, { "msgid": "Copy to {target}", "msgstr": ["Copia a {target}"] }, { "msgid": "Could not create the new folder", "msgstr": ["No s'ha pogut crear la carpeta nova"] }, { "msgid": "Could not load files settings", "msgstr": ["No es poden carregar fitxers de configuració"] }, { "msgid": "Could not load files views", "msgstr": ["No es poden carregar fitxers de vistes"] }, { "msgid": "Create directory", "msgstr": ["Crea un directori"] }, { "msgid": "Current view selector", "msgstr": ["Selector de visualització actual"] }, { "msgid": "Enter your name", "msgstr": ["Escriviu el vostre nom"] }, { "msgid": "Existing version", "msgstr": ["Versió existent"] }, { "msgid": "Failed to set nickname.", "msgstr": ["No s'ha pogut desar el sobrenom."] }, { "msgid": "Favorites", "msgstr": ["Preferits"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["Els fitxers i les carpetes que marqueu com a favorits es mostraran aquí."] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["Els fitxers i les carpetes recentment modificats es mostraran aquí."] }, { "msgid": "Filter file list", "msgstr": ["Filtrar llistat de fitxers"] }, { "msgid": "Folder name cannot be empty.", "msgstr": ["El nom de la carpeta no pot estar buit."] }, { "msgid": "Guest identification", "msgstr": ["Identificació com a convidat"] }, { "msgid": "Home", "msgstr": ["Inici"] }, { "msgid": "If you select both versions, the incoming file will have a number added to its name.", "msgstr": ["Si seleccioneu les dues versions, el fitxer entrant tindrà un número afegit al seu nom."] }, { "msgid": "Invalid name.", "msgstr": ["Nom no vàlid."] }, { "msgid": "Last modified date unknown", "msgstr": ["Data de l'última modificació desconeguda"] }, { "msgid": "Modified", "msgstr": ["Data de modificació"] }, { "msgid": "Move", "msgstr": ["Desplaça"] }, { "msgid": "Move to {target}", "msgstr": ["Desplaça a {target}"] }, { "msgid": "Name", "msgstr": ["Nom"] }, { "msgid": "Names may be at most 64 characters long.", "msgstr": ["Els noms poden tenir com a màxim 64 caràcters."] }, { "msgid": "Names must not be empty.", "msgstr": ["Els noms no poden ser buits."] }, { "msgid": 'Names must not end with "{extension}".', "msgstr": [`Els noms no poden acabar amb l'extensió "{extension}".`] }, { "msgid": "Names must not start with a dot.", "msgstr": ["Els noms no poden començar amb un punt."] }, { "msgid": "New", "msgstr": ["Crea"] }, { "msgid": "New folder", "msgstr": ["Carpeta nova"] }, { "msgid": "New folder name", "msgstr": ["Nom de la carpeta nova"] }, { "msgid": "New version", "msgstr": ["Nova versió"] }, { "msgid": "No files in here", "msgstr": ["No hi ha cap fitxer"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["No s'ha trobat cap fitxer que coincideixi amb el filtre."] }, { "msgid": "No matching files", "msgstr": ["No hi ha cap fitxer que coincideixi"] }, { "msgid": "Please enter a name with at least 2 characters.", "msgstr": ["Si us plau, escriu un nom amb 2 caràcters com a mínim."] }, { "msgid": "Recent", "msgstr": ["Recents"] }, { "msgid": "Select all checkboxes", "msgstr": ["Selecciona totes les caselles de selecció"] }, { "msgid": "Select all entries", "msgstr": ["Selecciona totes les entrades"] }, { "msgid": "Select all existing files", "msgstr": ["Selecciona tots els fitxers existents"] }, { "msgid": "Select all new files", "msgstr": ["Selecciona tots els fitxers nous"] }, { "msgid": "Select entry", "msgstr": ["Selecciona l'entrada"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["Selecciona la fila per a {nodename}"] }, { "msgid": "Size", "msgstr": ["Mida"] }, { "msgid": "Skip %n file", "msgid_plural": "Skip %n files", "msgstr": ["Omet %n fitxer", "Omet %n fitxers"] }, { "msgid": "Skip this file", "msgstr": ["Omet aquest fitxer"] }, { "msgid": "Submit name", "msgstr": ["Entreu el nom"] }, { "msgid": "Undo", "msgstr": ["Desfés"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["Pugeu contingut o sincronitzeu-lo amb els vostres dispositius!"] }, { "msgid": "When an incoming folder is selected, any conflicting files within it will also be overwritten.", "msgstr": ["Quan es selecciona una carpeta entrant, també se sobreescriuran els fitxers que hi entrin en conflicte."] }, { "msgid": "When an incoming folder is selected, the content is written into the existing folder and a recursive conflict resolution is performed.", "msgstr": ["Quan es selecciona una carpeta entrant, el contingut s'escriu a la carpeta existent i es realitza una resolució recursiva de conflictes."] }, { "msgid": "Which files do you want to keep?", "msgstr": ["Quins fitxers voleu conservar?"] }, { "msgid": "You are currently identified as {nickname}.", "msgstr": ["Actualment se us mostra com a {nickname}."] }, { "msgid": "You are currently not identified.", "msgstr": ["Actualment no esteu identificat."] }, { "msgid": "You cannot leave the name empty.", "msgstr": ["No podeu deixar el nom buit."] }, { "msgid": "You need to choose at least one conflict solution", "msgstr": ["Heu de triar com a mínim una solució de conflicte"] }, { "msgid": "You need to select at least one version of each file to continue.", "msgstr": ["Heu de seleccionar com a mínim una versió de cada fitxer per continuar."] }] }, { "language": "cs_CZ", "translations": [{ "msgid": '"{char}" is not allowed inside a folder name.', "msgstr": ["znak „{char}“ není možné použít uvnitř názvu složky."] }, { "msgid": '"{char}" is not allowed inside a name.', "msgstr": ["„{char}“ není možné použít uvnitř názvu."] }, { "msgid": '"{extension}" is not an allowed name.', "msgstr": ["„{extension}“ není možné použít jako název."] }, { "msgid": '"{segment}" is a reserved name and not allowed for folder names.', "msgstr": ["„{segment}“ je vyhrazeným názvem a není možné ho používat pro názvy složek."] }, { "msgid": '"{segment}" is a reserved name and not allowed.', "msgstr": ["„{segment}“ je vyhrazeným názvem a není možné ho použít."] }, { "msgid": "%n file conflict", "msgid_plural": "%n files conflict", "msgstr": ["%n kolize souboru", "%n kolize souborů", "%n kolizí souborů", "%n kolize souborů"] }, { "msgid": "%n file conflict in {dirname}", "msgid_plural": "%n file conflicts in {dirname}", "msgstr": ["%n kolize souborů v {dirname}", "%n kolize souborů v {dirname}", "%n kolizí souborů v {dirname}", "%n kolize souborů v {dirname}"] }, { "msgid": "All files", "msgstr": ["Veškeré soubory"] }, { "msgid": "Cancel", "msgstr": ["Storno"] }, { "msgid": "Cancel the entire operation", "msgstr": ["Zrušit celou operaci"] }, { "msgid": "Choose", "msgstr": ["Zvolit"] }, { "msgid": "Choose {file}", "msgstr": ["Zvolit {file}"] }, { "msgid": "Choose %n file", "msgid_plural": "Choose %n files", "msgstr": ["Zvolte %n soubor", "Zvolte %n soubory", "Zvolte %n souborů", "Zvolte %n soubory"] }, { "msgid": "Confirm", "msgstr": ["Potvrdit"] }, { "msgid": "Continue", "msgstr": ["Pokračovat"] }, { "msgid": "Copy", "msgstr": ["Zkopírovat"] }, { "msgid": "Copy to {target}", "msgstr": ["Zkopírovat do {target}"] }, { "msgid": "Could not create the new folder", "msgstr": ["Novou složku se nepodařilo vytvořit"] }, { "msgid": "Could not load files settings", "msgstr": ["Nepodařilo se načíst nastavení pro soubory"] }, { "msgid": "Could not load files views", "msgstr": ["Nepodařilo se načíst pohledy souborů"] }, { "msgid": "Create directory", "msgstr": ["Vytvořit složku"] }, { "msgid": "Current view selector", "msgstr": ["Výběr stávajícího zobrazení"] }, { "msgid": "Enter your name", "msgstr": ["Zadejte své jméno"] }, { "msgid": "Existing version", "msgstr": ["Existující verze"] }, { "msgid": "Failed to set nickname.", "msgstr": ["Nepodařilo se nastavit přezdívku."] }, { "msgid": "Favorites", "msgstr": ["Oblíbené"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["Zde se zobrazí soubory a složky, které označíte jako oblíbené."] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["Zde se zobrazí soubory a složky, které jste nedávno pozměnili."] }, { "msgid": "Filter file list", "msgstr": ["Filtrovat seznam souborů"] }, { "msgid": 'Folder names must not end with "{extension}".', "msgstr": ["Názvy složek nemohou končit na „{extension}“."] }, { "msgid": "Guest identification", "msgstr": ["Identifikace hosta"] }, { "msgid": "Home", "msgstr": ["Domů"] }, { "msgid": "If you select both versions, the incoming file will have a number added to its name.", "msgstr": ["Pokud vyberete obě verze, pak k názvu příchozího souboru bude přidáno číslo."] }, { "msgid": "Invalid folder name.", "msgstr": ["Neplatný název složky."] }, { "msgid": "Invalid name.", "msgstr": ["Neplatný název."] }, { "msgid": "Last modified date unknown", "msgstr": ["Datum poslední změny neznámé"] }, { "msgid": "Modified", "msgstr": ["Změněno"] }, { "msgid": "Move", "msgstr": ["Přesounout"] }, { "msgid": "Move to {target}", "msgstr": ["Přesunout do {target}"] }, { "msgid": "Name", "msgstr": ["Název"] }, { "msgid": "Names may be at most 64 characters long.", "msgstr": ["Je třeba, aby délka jmen nepřesahovala 64 znaků."] }, { "msgid": "Names must not be empty.", "msgstr": ["Názvy je třeba vyplnit."] }, { "msgid": 'Names must not end with "{extension}".', "msgstr": ["Názvy nemohou končit na „{extension}“."] }, { "msgid": "Names must not start with a dot.", "msgstr": ["Názvy nemohou začínat tečkou."] }, { "msgid": "New", "msgstr": ["Nové"] }, { "msgid": "New folder", "msgstr": ["Nová složka"] }, { "msgid": "New folder name", "msgstr": ["Název pro novou složku"] }, { "msgid": "New version", "msgstr": ["Nová verze"] }, { "msgid": "No files in here", "msgstr": ["Nejsou zde žádné soubory"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["Nenalezeny žádné soubory odpovídající vašemu filtru"] }, { "msgid": "No matching files", "msgstr": ["Žádné odpovídající soubory"] }, { "msgid": "Please enter a name with at least 2 characters.", "msgstr": ["Zadejte jméno dlouhé alespoň 2 znaky."] }, { "msgid": "Recent", "msgstr": ["Nedávné"] }, { "msgid": "Select all checkboxes", "msgstr": ["Vybrat všechny zaškrtávací kolonky"] }, { "msgid": "Select all entries", "msgstr": ["Vybrat všechny položky"] }, { "msgid": "Select all existing files", "msgstr": ["Vybrat všechny existující soubory"] }, { "msgid": "Select all new files", "msgstr": ["Vybrat všechny nové soubory"] }, { "msgid": "Select entry", "msgstr": ["Vybrat položku"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["Vybrat řádek pro {nodename}"] }, { "msgid": "Size", "msgstr": ["Velikost"] }, { "msgid": "Skip %n file", "msgid_plural": "Skip %n files", "msgstr": ["Přeskočit %n soubor", "Přeskočit %n soubory", "Přeskočit %n souborů", "Přeskočit %n soubory"] }, { "msgid": "Skip this file", "msgstr": ["Přeskočit tento soubor"] }, { "msgid": "Submit name", "msgstr": ["Odeslat jméno"] }, { "msgid": "Undo", "msgstr": ["Zpět"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["Nahrajte sem nějaký obsah nebo proveďte synchronizaci se svými zařízeními!"] }, { "msgid": "When an incoming folder is selected, any conflicting files within it will also be overwritten.", "msgstr": ["Pokud je vybrána příchozí složka, budou v ní také přepsány jakékoli kolidující soubory."] }, { "msgid": "When an incoming folder is selected, the content is written into the existing folder and a recursive conflict resolution is performed.", "msgstr": ["Pokud je vybrána příchozí složka, je obsah zapsán do existující složky a je provedeno rekurzivní vyřešení kolizí."] }, { "msgid": "Which files do you want to keep?", "msgstr": ["Které soubory chcete ponechat?"] }, { "msgid": "You are currently identified as {nickname}.", "msgstr": ["V tuto chvíli jste identifikováni jako {nickname}."] }, { "msgid": "You are currently not identified.", "msgstr": ["V tuto chvíli nejste identifikovaní."] }, { "msgid": "You cannot leave the name empty.", "msgstr": ["Jméno nelze ponechat nevyplněné."] }, { "msgid": "You need to choose at least one conflict solution", "msgstr": ["Je třeba zvolit alespoň jedno z řešení kolize"] }, { "msgid": "You need to select at least one version of each file to continue.", "msgstr": ["Aby bylo možné pokračovat, je třeba vybrat alespoň jednu verzi od každého souboru."] }] }, { "language": "da", "translations": [{ "msgid": '"{char}" is not allowed inside a name.', "msgstr": ['"{char}" er ikke tilladt i et navn.'] }, { "msgid": '"{extension}" is not an allowed name.', "msgstr": ['"{extension}" er ikke tilladt i et navn.'] }, { "msgid": '"{name}" is an invalid folder name.', "msgstr": ['"{name}" er et ugyldigt mappenavn.'] }, { "msgid": '"{name}" is not an allowed folder name', "msgstr": ['"{name}" er ikke et tilladt mappenavn'] }, { "msgid": '"{segment}" is a reserved name and not allowed.', "msgstr": ['"{segment}" er et reserveret navn og er derfor ikke tilladt.'] }, { "msgid": '"/" is not allowed inside a folder name.', "msgstr": ['"/" er ikke tilladt i et mappenavn.'] }, { "msgid": "%n file conflict", "msgid_plural": "%n files conflict", "msgstr": ["%n filkonflikt", "%n filer konflikter"] }, { "msgid": "%n file conflict in {dirname}", "msgid_plural": "%n file conflicts in {dirname}", "msgstr": ["%n filkonflikt i {dirname}", "%n filkonflikter i {dirname}"] }, { "msgid": "All files", "msgstr": ["Alle filer"] }, { "msgid": "Cancel", "msgstr": ["Fortryd"] }, { "msgid": "Cancel the entire operation", "msgstr": ["Annullér hele operationen"] }, { "msgid": "Choose", "msgstr": ["Vælg"] }, { "msgid": "Choose {file}", "msgstr": ["Vælg {file}"] }, { "msgid": "Choose %n file", "msgid_plural": "Choose %n files", "msgstr": ["Vælg %n fil", "Vælg %n filer"] }, { "msgid": "Confirm", "msgstr": ["Bekræft"] }, { "msgid": "Continue", "msgstr": ["Fortsæt"] }, { "msgid": "Copy", "msgstr": ["Kopier"] }, { "msgid": "Copy to {target}", "msgstr": ["Kopier til {target}"] }, { "msgid": "Could not create the new folder", "msgstr": ["Kunne ikke oprette den nye mappe"] }, { "msgid": "Could not load files settings", "msgstr": ["Filindstillingerne kunne ikke indlæses"] }, { "msgid": "Could not load files views", "msgstr": ["Kunne ikke indlæse filvisninger"] }, { "msgid": "Create directory", "msgstr": ["Opret mappe"] }, { "msgid": "Current view selector", "msgstr": ["Aktuel visningsvælger"] }, { "msgid": "Enter your name", "msgstr": ["Indtast dit navn"] }, { "msgid": "Existing version", "msgstr": ["Eksisterende version"] }, { "msgid": "Failed to set nickname.", "msgstr": ["Forsøg på at gemme kaldenavn mislykkedes."] }, { "msgid": "Favorites", "msgstr": ["Favoritter"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["Filer og mapper, du markerer som foretrukne, vises her."] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["Filer og mapper, du for nylig har ændret, vises her."] }, { "msgid": "Filter file list", "msgstr": ["Filtrer fil liste"] }, { "msgid": "Folder name cannot be empty.", "msgstr": ["Mappenavnet må ikke være tomt."] }, { "msgid": "Guest identification", "msgstr": ["Gæsteidentifikation"] }, { "msgid": "Home", "msgstr": ["Hjem"] }, { "msgid": "If you select both versions, the incoming file will have a number added to its name.", "msgstr": ["Hvis du vælger begge versioner, vil den indkommende fil have et nummer tilføjet til sit navn."] }, { "msgid": "Invalid name.", "msgstr": ["Ugyldigt navn."] }, { "msgid": "Last modified date unknown", "msgstr": ["Senest ændret dato ukendt"] }, { "msgid": "Modified", "msgstr": ["Ændret"] }, { "msgid": "Move", "msgstr": ["Flyt"] }, { "msgid": "Move to {target}", "msgstr": ["Flyt til {target}"] }, { "msgid": "Name", "msgstr": ["Navn"] }, { "msgid": "Names may be at most 64 characters long.", "msgstr": ["Navne kan højst være 64 tegn lange."] }, { "msgid": "Names must not be empty.", "msgstr": ["Navne kan ikke være tomt."] }, { "msgid": 'Names must not end with "{extension}".', "msgstr": ['Navne må ikke ende på "{extension}".'] }, { "msgid": "Names must not start with a dot.", "msgstr": ["Navne skal starte med et punktum."] }, { "msgid": "New", "msgstr": ["Ny"] }, { "msgid": "New folder", "msgstr": ["Ny mappe"] }, { "msgid": "New folder name", "msgstr": ["Ny mappe navn"] }, { "msgid": "New version", "msgstr": ["Ny version"] }, { "msgid": "No files in here", "msgstr": ["Ingen filer here"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["Der blev ikke fundet nogen filer, der matcher dit filter."] }, { "msgid": "No matching files", "msgstr": ["Ingen matchende filer"] }, { "msgid": "Please enter a name with at least 2 characters.", "msgstr": ["Indtast et navn med mindst 2 tegn."] }, { "msgid": "Recent", "msgstr": ["Seneste"] }, { "msgid": "Select all checkboxes", "msgstr": ["Markér alle afkrydsningsfelter"] }, { "msgid": "Select all entries", "msgstr": ["Vælg alle poster"] }, { "msgid": "Select all existing files", "msgstr": ["Vælg alle eksisterende filer"] }, { "msgid": "Select all new files", "msgstr": ["Vælg alle nye filer"] }, { "msgid": "Select entry", "msgstr": ["Vælg post"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["Vælg rækken for {nodenavn}"] }, { "msgid": "Size", "msgstr": ["Størelse"] }, { "msgid": "Skip %n file", "msgid_plural": "Skip %n files", "msgstr": ["Spring %n fil over", "Spring %n filer over"] }, { "msgid": "Skip this file", "msgstr": ["Spring denne fil over"] }, { "msgid": "Submit name", "msgstr": ["Indsend navn"] }, { "msgid": "Undo", "msgstr": ["Fortryd"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["Upload noget indhold eller synkroniser med dine enheder!"] }, { "msgid": "When an incoming folder is selected, any conflicting files within it will also be overwritten.", "msgstr": ["Når en indkommende mappe er valgt, vil eventuelle modstridende filer i det også blive overskrevet."] }, { "msgid": "When an incoming folder is selected, the content is written into the existing folder and a recursive conflict resolution is performed.", "msgstr": ["Når en indkommende mappe er valgt, er indholdet skrevet ind i den eksisterende mappe og en rekursiv konfliktløsning udføres."] }, { "msgid": "Which files do you want to keep?", "msgstr": ["Hvilke filer vil du have?"] }, { "msgid": "You are currently identified as {nickname}.", "msgstr": ["Du er i øjeblikket identificeret som {nickname}."] }, { "msgid": "You are currently not identified.", "msgstr": ["Du er ikke identificeret."] }, { "msgid": "You cannot leave the name empty.", "msgstr": ["Du kan ikke efterlade navnet tomt."] }, { "msgid": "You need to choose at least one conflict solution", "msgstr": ["Du skal vælge mindst én konfliktløsning"] }, { "msgid": "You need to select at least one version of each file to continue.", "msgstr": ["Du skal vælge mindst én version af hver fil for at fortsætte."] }] }, { "language": "de", "translations": [{ "msgid": '"{char}" is not allowed inside a folder name.', "msgstr": ['"{char}" ist innerhalb eines Ordnernamens nicht zulässig.'] }, { "msgid": '"{char}" is not allowed inside a name.', "msgstr": ['"{char}" ist innerhalb eines Namens nicht zulässig.'] }, { "msgid": '"{extension}" is not an allowed name.', "msgstr": ['"{extension}" ist kein zulässiger Name.'] }, { "msgid": '"{segment}" is a reserved name and not allowed for folder names.', "msgstr": ['"{segment}" ist ein reservierter Name und nicht zulässig für Ordnernamen.'] }, { "msgid": '"{segment}" is a reserved name and not allowed.', "msgstr": ['"{segment}" ist ein reservierter Name und nicht zulässig.'] }, { "msgid": "%n file conflict", "msgid_plural": "%n files conflict", "msgstr": ["%n Dateikonflikt", "%n Dateikonflikte"] }, { "msgid": "%n file conflict in {dirname}", "msgid_plural": "%n file conflicts in {dirname}", "msgstr": ["%n Dateikonflikt in {dirname}", "%n Dateikonflikte in {dirname}"] }, { "msgid": "All files", "msgstr": ["Alle Dateien"] }, { "msgid": "Cancel", "msgstr": ["Abbrechen"] }, { "msgid": "Cancel the entire operation", "msgstr": ["Den gesamten Vorgang abbrechen"] }, { "msgid": "Choose", "msgstr": ["Auswählen"] }, { "msgid": "Choose {file}", "msgstr": ["{file} auswählen"] }, { "msgid": "Choose %n file", "msgid_plural": "Choose %n files", "msgstr": ["%n Datei auswählen", "%n Dateien auswählen"] }, { "msgid": "Confirm", "msgstr": ["Bestätigen"] }, { "msgid": "Continue", "msgstr": ["Fortsetzen"] }, { "msgid": "Copy", "msgstr": ["Kopieren"] }, { "msgid": "Copy to {target}", "msgstr": ["Nach {target} kopieren"] }, { "msgid": "Could not create the new folder", "msgstr": ["Der neue Ordner konnte nicht erstellt werden"] }, { "msgid": "Could not load files settings", "msgstr": ["Dateieinstellungen konnten nicht geladen werden"] }, { "msgid": "Could not load files views", "msgstr": ["Dateiansichten konnten nicht geladen werden"] }, { "msgid": "Create directory", "msgstr": ["Verzeichnis erstellen"] }, { "msgid": "Current view selector", "msgstr": ["Aktuelle Ansichtsauswahl"] }, { "msgid": "Enter your name", "msgstr": ["Gib deinen Namen ein"] }, { "msgid": "Existing version", "msgstr": ["Vorhandene Version"] }, { "msgid": "Failed to set nickname.", "msgstr": ["Spitzname konnte nicht gespeichert werden."] }, { "msgid": "Favorites", "msgstr": ["Favoriten"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["Dateien und Ordner, die du als Favorit markierst, werden hier angezeigt."] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["Dateien und Ordner, die du kürzlich geändert hast, werden hier angezeigt."] }, { "msgid": "Filter file list", "msgstr": ["Dateiliste filtern"] }, { "msgid": 'Folder names must not end with "{extension}".', "msgstr": ['Ordnernamen dürfen nicht mit "{extension}" enden.'] }, { "msgid": "Guest identification", "msgstr": ["Gast-Identifikation"] }, { "msgid": "Home", "msgstr": ["Home"] }, { "msgid": "If you select both versions, the incoming file will have a number added to its name.", "msgstr": ["Wenn beide Versionen ausgewählt werden, wird dem Namen der eingehenden Datei eine Nummer hinzugefügt."] }, { "msgid": "Invalid folder name.", "msgstr": ["Ungültiger Ordnername."] }, { "msgid": "Invalid name.", "msgstr": ["Ungültiger Name."] }, { "msgid": "Last modified date unknown", "msgstr": ["Datum der letzten Änderung unbekannt"] }, { "msgid": "Modified", "msgstr": ["Geändert"] }, { "msgid": "Move", "msgstr": ["Verschieben"] }, { "msgid": "Move to {target}", "msgstr": ["Nach {target} verschieben"] }, { "msgid": "Name", "msgstr": ["Name"] }, { "msgid": "Names may be at most 64 characters long.", "msgstr": ["Namen dürfen maximal 64 Zeichen lang sein."] }, { "msgid": "Names must not be empty.", "msgstr": ["Namen dürfen nicht leer sein."] }, { "msgid": 'Names must not end with "{extension}".', "msgstr": ['Namen dürfen nicht mit "{extension}" enden.'] }, { "msgid": "Names must not start with a dot.", "msgstr": ["Namen dürfen nicht mit einem Punkt beginnen."] }, { "msgid": "New", "msgstr": ["Neu"] }, { "msgid": "New folder", "msgstr": ["Neuer Ordner"] }, { "msgid": "New folder name", "msgstr": ["Neuer Ordnername"] }, { "msgid": "New version", "msgstr": ["Neue Version"] }, { "msgid": "No files in here", "msgstr": ["Hier sind keine Dateien"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["Es wurden keine Dateien gefunden, die deinem Filter entsprechen."] }, { "msgid": "No matching files", "msgstr": ["Keine passenden Dateien"] }, { "msgid": "Please enter a name with at least 2 characters.", "msgstr": ["Bitte einen Namen mit mindestens zwei Zeichen eingeben."] }, { "msgid": "Recent", "msgstr": ["Neueste"] }, { "msgid": "Select all checkboxes", "msgstr": ["Alle Kontrollkästchen aktivieren"] }, { "msgid": "Select all entries", "msgstr": ["Alle Einträge auswählen"] }, { "msgid": "Select all existing files", "msgstr": ["Alle vorhandenen Dateien auswählen"] }, { "msgid": "Select all new files", "msgstr": ["Alle neuen Dateien auswählen"] }, { "msgid": "Select entry", "msgstr": ["Eintrag auswählen"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["Die Zeile für {nodename} auswählen."] }, { "msgid": "Size", "msgstr": ["Größe"] }, { "msgid": "Skip %n file", "msgid_plural": "Skip %n files", "msgstr": ["%n Datei überspringen", "%n Dateien überspringen"] }, { "msgid": "Skip this file", "msgstr": ["Diese Datei überspringen"] }, { "msgid": "Submit name", "msgstr": ["Namen senden"] }, { "msgid": "Undo", "msgstr": ["Rückgängig machen"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["Lade Inhalte hoch oder synchronisiere diese mit deinen Geräten!"] }, { "msgid": "When an incoming folder is selected, any conflicting files within it will also be overwritten.", "msgstr": ["Wenn ein eingehender Ordner ausgewählt wird, werden auch alle darin enthaltenen Dateien mit Konflikten überschrieben."] }, { "msgid": "When an incoming folder is selected, the content is written into the existing folder and a recursive conflict resolution is performed.", "msgstr": ["Bei Auswahl eines eingehenden Ordners wird der Inhalt in den vorhandenen Ordner geschrieben und eine rekursive Konfliktlösung durchgeführt."] }, { "msgid": "Which files do you want to keep?", "msgstr": ["Welche Dateien sollen behalten werden?"] }, { "msgid": "You are currently identified as {nickname}.", "msgstr": ["Du bist derzeit als {nickname} identifiziert."] }, { "msgid": "You are currently not identified.", "msgstr": ["Du bist momentan nicht identifiziert."] }, { "msgid": "You cannot leave the name empty.", "msgstr": ["Du kannst den Namen nicht leer lassen."] }, { "msgid": "You need to choose at least one conflict solution", "msgstr": ["Es muss mindestens eine Konfliktlösung gewählt werden"] }, { "msgid": "You need to select at least one version of each file to continue.", "msgstr": ["Es muss mindestens eine Version jeder Datei ausgewählt werden, um fortzufahren."] }] }, { "language": "de_DE", "translations": [{ "msgid": '"{char}" is not allowed inside a folder name.', "msgstr": ['"{char}" ist innerhalb eines Ordnernamens nicht zulässig.'] }, { "msgid": '"{char}" is not allowed inside a name.', "msgstr": ['"{char}" ist innerhalb eines Namens nicht zulässig.'] }, { "msgid": '"{extension}" is not an allowed name.', "msgstr": ['"{extension}" ist kein zulässiger Name.'] }, { "msgid": '"{segment}" is a reserved name and not allowed for folder names.', "msgstr": ['"{segment}" ist ein reservierter Name und nicht zulässig für Ordnernamen.'] }, { "msgid": '"{segment}" is a reserved name and not allowed.', "msgstr": ['"{segment}" ist ein reservierter Name und nicht zulässig.'] }, { "msgid": "%n file conflict", "msgid_plural": "%n files conflict", "msgstr": ["%n Dateikonflikt", "%n Dateikonflikte"] }, { "msgid": "%n file conflict in {dirname}", "msgid_plural": "%n file conflicts in {dirname}", "msgstr": ["%n Dateikonflikt in {dirname}", "%n Dateikonflikte in {dirname}"] }, { "msgid": "All files", "msgstr": ["Alle Dateien"] }, { "msgid": "Cancel", "msgstr": ["Abbrechen"] }, { "msgid": "Cancel the entire operation", "msgstr": ["Den gesamten Vorgang abbrechen"] }, { "msgid": "Choose", "msgstr": ["Auswählen"] }, { "msgid": "Choose {file}", "msgstr": ["{file} auswählen"] }, { "msgid": "Choose %n file", "msgid_plural": "Choose %n files", "msgstr": ["%n Datei auswählen", "%n Dateien auswählen"] }, { "msgid": "Confirm", "msgstr": ["Bestätigen"] }, { "msgid": "Continue", "msgstr": ["Fortsetzen"] }, { "msgid": "Copy", "msgstr": ["Kopieren"] }, { "msgid": "Copy to {target}", "msgstr": ["Nach {target} kopieren"] }, { "msgid": "Could not create the new folder", "msgstr": ["Der neue Ordner konnte nicht erstellt werden"] }, { "msgid": "Could not load files settings", "msgstr": ["Dateieinstellungen konnten nicht geladen werden"] }, { "msgid": "Could not load files views", "msgstr": ["Dateiansichten konnten nicht geladen werden"] }, { "msgid": "Create directory", "msgstr": ["Verzeichnis erstellen"] }, { "msgid": "Current view selector", "msgstr": ["Aktuelle Ansichtsauswahl"] }, { "msgid": "Enter your name", "msgstr": ["Geben Sie Ihren Namen ein"] }, { "msgid": "Existing version", "msgstr": ["Vorhandene Version"] }, { "msgid": "Failed to set nickname.", "msgstr": ["Spitzname konnte nicht gespeichert werden."] }, { "msgid": "Favorites", "msgstr": ["Favoriten"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["Dateien und Ordner, die Sie als Favorit markieren, werden hier angezeigt."] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["Dateien und Ordner, die Sie kürzlich geändert haben, werden hier angezeigt."] }, { "msgid": "Filter file list", "msgstr": ["Dateiliste filtern"] }, { "msgid": 'Folder names must not end with "{extension}".', "msgstr": ['Ordnernamen dürfen nicht mit "{extension}" enden.'] }, { "msgid": "Guest identification", "msgstr": ["Gast-Identifikation"] }, { "msgid": "Home", "msgstr": ["Home"] }, { "msgid": "If you select both versions, the incoming file will have a number added to its name.", "msgstr": ["Wenn beide Versionen ausgewählt werden, wird dem Namen der eingehenden Datei eine Nummer hinzugefügt."] }, { "msgid": "Invalid folder name.", "msgstr": ["Ungültiger Ordnername."] }, { "msgid": "Invalid name.", "msgstr": ["Ungültiger Name."] }, { "msgid": "Last modified date unknown", "msgstr": ["Datum der letzten Änderung unbekannt"] }, { "msgid": "Modified", "msgstr": ["Geändert"] }, { "msgid": "Move", "msgstr": ["Verschieben"] }, { "msgid": "Move to {target}", "msgstr": ["Nach {target} verschieben"] }, { "msgid": "Name", "msgstr": ["Name"] }, { "msgid": "Names may be at most 64 characters long.", "msgstr": ["Namen dürfen maximal 64 Zeichen lang sein."] }, { "msgid": "Names must not be empty.", "msgstr": ["Namen dürfen nicht leer sein."] }, { "msgid": 'Names must not end with "{extension}".', "msgstr": ['Namen dürfen nicht mit "{extension}" enden.'] }, { "msgid": "Names must not start with a dot.", "msgstr": ["Namen dürfen nicht mit einem Punkt beginnen."] }, { "msgid": "New", "msgstr": ["Neu"] }, { "msgid": "New folder", "msgstr": ["Neuer Ordner"] }, { "msgid": "New folder name", "msgstr": ["Neuer Ordnername"] }, { "msgid": "New version", "msgstr": ["Neue Version"] }, { "msgid": "No files in here", "msgstr": ["Hier sind keine Dateien"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["Es wurden keine Dateien gefunden, die Ihrem Filter entsprechen."] }, { "msgid": "No matching files", "msgstr": ["Keine passenden Dateien"] }, { "msgid": "Please enter a name with at least 2 characters.", "msgstr": ["Bitte einen Namen mit mindestens zwei Zeichen eingeben."] }, { "msgid": "Recent", "msgstr": ["Neueste"] }, { "msgid": "Select all checkboxes", "msgstr": ["Alle Kontrollkästchen aktivieren"] }, { "msgid": "Select all entries", "msgstr": ["Alle Einträge auswählen"] }, { "msgid": "Select all existing files", "msgstr": ["Alle vorhandenen Dateien auswählen"] }, { "msgid": "Select all new files", "msgstr": ["Alle neuen Dateien auswählen"] }, { "msgid": "Select entry", "msgstr": ["Eintrag auswählen"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["Die Zeile für {nodename} auswählen."] }, { "msgid": "Size", "msgstr": ["Größe"] }, { "msgid": "Skip %n file", "msgid_plural": "Skip %n files", "msgstr": ["%n Datei überspringen", "%n Dateien überspringen"] }, { "msgid": "Skip this file", "msgstr": ["Diese Datei überspringen"] }, { "msgid": "Submit name", "msgstr": ["Namen senden"] }, { "msgid": "Undo", "msgstr": ["Rückgängig machen"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["Laden Sie Inhalte hoch oder synchronisieren Sie diese mit Ihren Geräten!"] }, { "msgid": "When an incoming folder is selected, any conflicting files within it will also be overwritten.", "msgstr": ["Wenn ein eingehender Ordner ausgewählt wird, werden auch alle darin enthaltenen Dateien mit Konflikten überschrieben."] }, { "msgid": "When an incoming folder is selected, the content is written into the existing folder and a recursive conflict resolution is performed.", "msgstr": ["Bei Auswahl eines eingehenden Ordners wird der Inhalt in den vorhandenen Ordner geschrieben und eine rekursive Konfliktlösung durchgeführt."] }, { "msgid": "Which files do you want to keep?", "msgstr": ["Welche Dateien sollen behalten werden?"] }, { "msgid": "You are currently identified as {nickname}.", "msgstr": ["Sie sind derzeit als {nickname} identifiziert."] }, { "msgid": "You are currently not identified.", "msgstr": ["Sie sind momentan nicht identifiziert."] }, { "msgid": "You cannot leave the name empty.", "msgstr": ["Sie können den Namen nicht leer lassen."] }, { "msgid": "You need to choose at least one conflict solution", "msgstr": ["Es muss mindestens eine Konfliktlösung gewählt werden"] }, { "msgid": "You need to select at least one version of each file to continue.", "msgstr": ["Es muss mindestens eine Version jeder Datei ausgewählt werden, um fortzufahren."] }] }, { "language": "el", "translations": [{ "msgid": '"{char}" is not allowed inside a folder name.', "msgstr": ["Το «{char}» δεν επιτρέπεται μέσα σε όνομα φακέλου."] }, { "msgid": '"{char}" is not allowed inside a name.', "msgstr": ['"{char}" δεν επιτρέπεται μέσα σε ένα όνομα.'] }, { "msgid": '"{extension}" is not an allowed name.', "msgstr": ['"{extension}" δεν είναι επιτρεπτό όνομα.'] }, { "msgid": '"{segment}" is a reserved name and not allowed for folder names.', "msgstr": ["Το «{segment}» είναι ένα δεσμευμένο όνομα και δεν επιτρέπεται για ονόματα φακέλων."] }, { "msgid": '"{segment}" is a reserved name and not allowed.', "msgstr": ['"{segment}" είναι ένα δεσμευμένο όνομα και δεν επιτρέπεται.'] }, { "msgid": "%n file conflict", "msgid_plural": "%n files conflict", "msgstr": ["%n σύγκρουση αρχείου", "%n σύγκρουση αρχείων"] }, { "msgid": "%n file conflict in {dirname}", "msgid_plural": "%n file conflicts in {dirname}", "msgstr": ["%n σύγκρουση αρχείου στο {dirname}", "%n σύγκρουση αρχείων στο {dirname}"] }, { "msgid": "All files", "msgstr": ["Όλα τα αρχεία"] }, { "msgid": "Cancel", "msgstr": ["Ακύρωση"] }, { "msgid": "Cancel the entire operation", "msgstr": ["Ακύρωση όλης της διαδικασίας"] }, { "msgid": "Choose", "msgstr": ["Επιλογή"] }, { "msgid": "Choose {file}", "msgstr": ["Επιλέξτε {file}"] }, { "msgid": "Choose %n file", "msgid_plural": "Choose %n files", "msgstr": ["Επιλέξτε %n αρχείο", "Επιλέξτε %n αρχεία"] }, { "msgid": "Confirm", "msgstr": ["Επιβεβαίωση"] }, { "msgid": "Continue", "msgstr": ["Συνέχεια"] }, { "msgid": "Copy", "msgstr": ["Αντιγραφή"] }, { "msgid": "Copy to {target}", "msgstr": ["Αντιγραφή στο {target}"] }, { "msgid": "Could not create the new folder", "msgstr": ["Αδυναμία δημιουργίας νέου φακέλου"] }, { "msgid": "Could not load files settings", "msgstr": ["Αδυναμία φόρτωσης ρυθμίσεων αρχείων"] }, { "msgid": "Could not load files views", "msgstr": ["Αδυναμία φόρτωσης προβολών αρχείων"] }, { "msgid": "Create directory", "msgstr": ["Δημιουργία καταλόγου"] }, { "msgid": "Current view selector", "msgstr": ["Επιλογέας τρέχουσας προβολής"] }, { "msgid": "Enter your name", "msgstr": ["Εισάγετε το όνομά σας"] }, { "msgid": "Existing version", "msgstr": ["Υφιστάμενη έκδοση"] }, { "msgid": "Failed to set nickname.", "msgstr": ["Αποτυχία στην ρύθμιση του ψευδώνυμου."] }, { "msgid": "Favorites", "msgstr": ["Αγαπημένα"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["Τα αρχεία και οι φάκελοι που επισημάνετε ως αγαπημένα θα εμφανίζονται εδώ."] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["Τα αρχεία και οι φάκελοι που τροποποιήσατε πρόσφατα θα εμφανίζονται εδώ."] }, { "msgid": "Filter file list", "msgstr": ["Φιλτράρισμα λίστας αρχείων"] }, { "msgid": 'Folder names must not end with "{extension}".', "msgstr": ["Τα ονόματα των φακέλων δεν πρέπει να τελειώνουν με «{extension}»."] }, { "msgid": "Guest identification", "msgstr": ["Ταυτοποίηση επισκέπτη"] }, { "msgid": "Home", "msgstr": ["Αρχική"] }, { "msgid": "If you select both versions, the incoming file will have a number added to its name.", "msgstr": ["Εάν επιλέξετε και τις δύο εκδόσεις, στο όνομα του εισερχόμενου αρχείου θα προστεθεί ένας αριθμός."] }, { "msgid": "Invalid folder name.", "msgstr": ["Μη έγκυρο όνομα φακέλου."] }, { "msgid": "Invalid name.", "msgstr": ["Μη έγκυρο όνομα."] }, { "msgid": "Last modified date unknown", "msgstr": ["Άγνωστη ημερομηνία τελευταίας τροποποίησης"] }, { "msgid": "Modified", "msgstr": ["Τροποποιήθηκε"] }, { "msgid": "Move", "msgstr": ["Μετακίνηση"] }, { "msgid": "Move to {target}", "msgstr": ["Μετακίνηση στο {target}"] }, { "msgid": "Name", "msgstr": ["Όνομα"] }, { "msgid": "Names may be at most 64 characters long.", "msgstr": ["Τα ονόματα μπορούν να έχουν μέγιστο μήκος 64 χαρακτήρες."] }, { "msgid": "Names must not be empty.", "msgstr": ["Τα ονόματα δεν πρέπει να είναι κενά."] }, { "msgid": 'Names must not end with "{extension}".', "msgstr": ['Τα ονόματα δεν πρέπει να τελειώνουν με "{extension}".'] }, { "msgid": "Names must not start with a dot.", "msgstr": ["Τα ονόματα δεν πρέπει να ξεκινούν με τελεία."] }, { "msgid": "New", "msgstr": ["Νέο"] }, { "msgid": "New folder", "msgstr": ["Νέος φάκελος"] }, { "msgid": "New folder name", "msgstr": ["Όνομα νέου φακέλου"] }, { "msgid": "New version", "msgstr": ["Νέα έκδοση"] }, { "msgid": "No files in here", "msgstr": ["Δεν υπάρχουν αρχεία εδώ"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["Δεν βρέθηκαν αρχεία που να ταιριάζουν με το φίλτρο σας."] }, { "msgid": "No matching files", "msgstr": ["Κανένα αρχείο δεν ταιριάζει"] }, { "msgid": "Please enter a name with at least 2 characters.", "msgstr": ["Παρακαλώ εισάγετε ένα όνομα με τουλάχιστον 2 χαρακτήρες."] }, { "msgid": "Recent", "msgstr": ["Πρόσφατα"] }, { "msgid": "Select all checkboxes", "msgstr": ["Επιλέξτε όλα τα πλαίσια ελέγχου"] }, { "msgid": "Select all entries", "msgstr": ["Επιλογή όλων των καταχωρήσεων"] }, { "msgid": "Select all existing files", "msgstr": ["Επιλογή όλων των υπάρχοντων αρχείων"] }, { "msgid": "Select all new files", "msgstr": ["Επιλογή όλων των νέων αρχείων"] }, { "msgid": "Select entry", "msgstr": ["Επιλογή εγγραφής"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["Επιλέξτε τη γραμμή για το {nodename}"] }, { "msgid": "Size", "msgstr": ["Μέγεθος"] }, { "msgid": "Skip %n file", "msgid_plural": "Skip %n files", "msgstr": ["Παράλειψη ενός αρχείου", "Παράλειψη %n αρχείων"] }, { "msgid": "Skip this file", "msgstr": ["Παράλειψη αυτού το αρχείου"] }, { "msgid": "Submit name", "msgstr": ["Υποβολή ονόματος"] }, { "msgid": "Undo", "msgstr": ["Αναίρεση"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["Ανεβάστε κάποιο περιεχόμενο ή συγχρονίστε με τις συσκευές σας!"] }, { "msgid": "When an incoming folder is selected, any conflicting files within it will also be overwritten.", "msgstr": ["Όταν επιλέγεται ένας φάκελος εισερχομένων, όλα τα αρχεία που βρίσκονται σε σύγκρουση μέσα σε αυτόν θα αντικατασταθούν επίσης."] }, { "msgid": "When an incoming folder is selected, the content is written into the existing folder and a recursive conflict resolution is performed.", "msgstr": ["Όταν επιλέγεται ένας φάκελος εισερχομένων, το περιεχόμενο εγγράφεται στον υπάρχοντα φάκελο και εκτελείται μια αναδρομική επίλυση σύγκρουσης."] }, { "msgid": "Which files do you want to keep?", "msgstr": ["Ποια αρχεία θέλετε να διατηρήσετε;"] }, { "msgid": "You are currently identified as {nickname}.", "msgstr": ["Αυτή τη στιγμή έχετε αναγνωριστεί ως {nickname}."] }, { "msgid": "You are currently not identified.", "msgstr": ["Δεν έχετε ταυτοποιηθεί."] }, { "msgid": "You cannot leave the name empty.", "msgstr": ["Δεν μπορείτε να αφήσετε το όνομα κενό."] }, { "msgid": "You need to choose at least one conflict solution", "msgstr": ["Πρέπει να επιλέξετε τουλάχιστον μία λύση σύγκρουσης"] }, { "msgid": "You need to select at least one version of each file to continue.", "msgstr": ["Πρέπει να επιλέξετε τουλάχιστον μία έκδοση από κάθε αρχείο για να συνεχίσετε."] }] }, { "language": "en_GB", "translations": [{ "msgid": '"{char}" is not allowed inside a folder name.', "msgstr": ['"{char}" is not allowed inside a folder name.'] }, { "msgid": '"{char}" is not allowed inside a name.', "msgstr": ['"{char}" is not allowed inside a name.'] }, { "msgid": '"{extension}" is not an allowed name.', "msgstr": ['"{extension}" is not an allowed name.'] }, { "msgid": '"{segment}" is a reserved name and not allowed for folder names.', "msgstr": ['"{segment}" is a reserved name and cannot be used for folder names.'] }, { "msgid": '"{segment}" is a reserved name and not allowed.', "msgstr": ['"{segment}" is a reserved name and not allowed.'] }, { "msgid": "%n file conflict", "msgid_plural": "%n files conflict", "msgstr": ["%n file conflict", "%n files conflict"] }, { "msgid": "%n file conflict in {dirname}", "msgid_plural": "%n file conflicts in {dirname}", "msgstr": ["%n file conflict in {dirname}", "%n file conflicts in {dirname}"] }, { "msgid": "All files", "msgstr": ["All files"] }, { "msgid": "Cancel", "msgstr": ["Cancel"] }, { "msgid": "Cancel the entire operation", "msgstr": ["Cancel the entire operation"] }, { "msgid": "Choose", "msgstr": ["Choose"] }, { "msgid": "Choose {file}", "msgstr": ["Choose {file}"] }, { "msgid": "Choose %n file", "msgid_plural": "Choose %n files", "msgstr": ["Choose %n file", "Choose %n files"] }, { "msgid": "Confirm", "msgstr": ["Confirm"] }, { "msgid": "Continue", "msgstr": ["Continue"] }, { "msgid": "Copy", "msgstr": ["Copy"] }, { "msgid": "Copy to {target}", "msgstr": ["Copy to {target}"] }, { "msgid": "Could not create the new folder", "msgstr": ["Could not create the new folder"] }, { "msgid": "Could not load files settings", "msgstr": ["Could not load files settings"] }, { "msgid": "Could not load files views", "msgstr": ["Could not load files views"] }, { "msgid": "Create directory", "msgstr": ["Create directory"] }, { "msgid": "Current view selector", "msgstr": ["Current view selector"] }, { "msgid": "Enter your name", "msgstr": ["Enter your name"] }, { "msgid": "Existing version", "msgstr": ["Existing version"] }, { "msgid": "Failed to set nickname.", "msgstr": ["Failed to set nickname."] }, { "msgid": "Favorites", "msgstr": ["Favourites"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["Files and folders you mark as favourite will show up here."] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["Files and folders you recently modified will show up here."] }, { "msgid": "Filter file list", "msgstr": ["Filter file list"] }, { "msgid": 'Folder names must not end with "{extension}".', "msgstr": ['Folder names must not end with "{extension}".'] }, { "msgid": "Guest identification", "msgstr": ["Guest identification"] }, { "msgid": "Home", "msgstr": ["Home"] }, { "msgid": "If you select both versions, the incoming file will have a number added to its name.", "msgstr": ["If you select both versions, the incoming file will have a number added to its name."] }, { "msgid": "Invalid folder name.", "msgstr": ["Invalid folder name."] }, { "msgid": "Invalid name.", "msgstr": ["Invalid name."] }, { "msgid": "Last modified date unknown", "msgstr": ["Last modified date unknown"] }, { "msgid": "Modified", "msgstr": ["Modified"] }, { "msgid": "Move", "msgstr": ["Move"] }, { "msgid": "Move to {target}", "msgstr": ["Move to {target}"] }, { "msgid": "Name", "msgstr": ["Name"] }, { "msgid": "Names may be at most 64 characters long.", "msgstr": ["Names may be at most 64 characters long."] }, { "msgid": "Names must not be empty.", "msgstr": ["Names must not be empty."] }, { "msgid": 'Names must not end with "{extension}".', "msgstr": ['Names must not end with "{extension}".'] }, { "msgid": "Names must not start with a dot.", "msgstr": ["Names must not start with a dot."] }, { "msgid": "New", "msgstr": ["New"] }, { "msgid": "New folder", "msgstr": ["New folder"] }, { "msgid": "New folder name", "msgstr": ["New folder name"] }, { "msgid": "New version", "msgstr": ["New version"] }, { "msgid": "No files in here", "msgstr": ["No files in here"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["No files matching your filter were found."] }, { "msgid": "No matching files", "msgstr": ["No matching files"] }, { "msgid": "Please enter a name with at least 2 characters.", "msgstr": ["Please enter a name with at least 2 characters."] }, { "msgid": "Recent", "msgstr": ["Recent"] }, { "msgid": "Select all checkboxes", "msgstr": ["Select all checkboxes"] }, { "msgid": "Select all entries", "msgstr": ["Select all entries"] }, { "msgid": "Select all existing files", "msgstr": ["Select all existing files"] }, { "msgid": "Select all new files", "msgstr": ["Select all new files"] }, { "msgid": "Select entry", "msgstr": ["Select entry"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["Select the row for {nodename}"] }, { "msgid": "Size", "msgstr": ["Size"] }, { "msgid": "Skip %n file", "msgid_plural": "Skip %n files", "msgstr": ["Skip %n file", "Skip %n files"] }, { "msgid": "Skip this file", "msgstr": ["Skip this file"] }, { "msgid": "Submit name", "msgstr": ["Submit name"] }, { "msgid": "Undo", "msgstr": ["Undo"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["Upload some content or sync with your devices!"] }, { "msgid": "When an incoming folder is selected, any conflicting files within it will also be overwritten.", "msgstr": ["When an incoming folder is selected, any conflicting files within it will also be overwritten."] }, { "msgid": "When an incoming folder is selected, the content is written into the existing folder and a recursive conflict resolution is performed.", "msgstr": ["When an incoming folder is selected, the content is written into the existing folder and a recursive conflict resolution is performed."] }, { "msgid": "Which files do you want to keep?", "msgstr": ["Which files do you want to keep?"] }, { "msgid": "You are currently identified as {nickname}.", "msgstr": ["You are currently identified as {nickname}."] }, { "msgid": "You are currently not identified.", "msgstr": ["You are currently not identified."] }, { "msgid": "You cannot leave the name empty.", "msgstr": ["You cannot leave the name empty."] }, { "msgid": "You need to choose at least one conflict solution", "msgstr": ["You need to choose at least one conflict solution"] }, { "msgid": "You need to select at least one version of each file to continue.", "msgstr": ["You need to select at least one version of each file to continue."] }] }, { "language": "es", "translations": [{ "msgid": '"{char}" is not allowed inside a name.', "msgstr": ['"{char}" no está permitido dentro de un nombre.'] }, { "msgid": '"{extension}" is not an allowed name.', "msgstr": ['"{extension}" no es un nombre permitido.'] }, { "msgid": '"{name}" is an invalid folder name.', "msgstr": ['"{name}" es un nombre de carpeta no válido.'] }, { "msgid": '"{name}" is not an allowed folder name', "msgstr": ['"{name}" no es un nombre de carpeta permitido'] }, { "msgid": '"{segment}" is a reserved name and not allowed.', "msgstr": ['"{segment}" es un nombre reservado y no está permitido.'] }, { "msgid": '"/" is not allowed inside a folder name.', "msgstr": ['"/" no está permitido dentro del nombre de una carpeta.'] }, { "msgid": "All files", "msgstr": ["Todos los archivos"] }, { "msgid": "Cancel", "msgstr": ["Cancelar"] }, { "msgid": "Choose", "msgstr": ["Seleccionar"] }, { "msgid": "Choose {file}", "msgstr": ["Seleccionar {file}"] }, { "msgid": "Choose %n file", "msgid_plural": "Choose %n files", "msgstr": ["Elige %n archivo", "Elige %n archivos", "Seleccione %n archivos"] }, { "msgid": "Copy", "msgstr": ["Copiar"] }, { "msgid": "Copy to {target}", "msgstr": ["Copiar a {target}"] }, { "msgid": "Could not create the new folder", "msgstr": ["No se pudo crear la nueva carpeta"] }, { "msgid": "Could not load files settings", "msgstr": ["No se pudieron cargar los ajustes de archivos"] }, { "msgid": "Could not load files views", "msgstr": ["No se pudieron cargar las vistas de los archivos"] }, { "msgid": "Create directory", "msgstr": ["Crear directorio"] }, { "msgid": "Current view selector", "msgstr": ["Selector de vista actual"] }, { "msgid": "Enter your name", "msgstr": ["Ingrese su nombre"] }, { "msgid": "Failed to set nickname.", "msgstr": ["Fallo al establecer apodo."] }, { "msgid": "Favorites", "msgstr": ["Favoritos"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["Los archivos y carpetas que marque como favoritos aparecerán aquí."] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["Los archivos y carpetas que modificó recientemente aparecerán aquí."] }, { "msgid": "Filter file list", "msgstr": ["Filtrar lista de archivos"] }, { "msgid": "Folder name cannot be empty.", "msgstr": ["El nombre de la carpeta no puede estar vacío."] }, { "msgid": "Guest identification", "msgstr": ["Identificación de invitado"] }, { "msgid": "Home", "msgstr": ["Inicio"] }, { "msgid": "Invalid name.", "msgstr": ["Nombre inválido."] }, { "msgid": "Modified", "msgstr": ["Modificado"] }, { "msgid": "Move", "msgstr": ["Mover"] }, { "msgid": "Move to {target}", "msgstr": ["Mover a {target}"] }, { "msgid": "Name", "msgstr": ["Nombre"] }, { "msgid": "Names must not be empty.", "msgstr": ["Los nombres no deben estar vacíos."] }, { "msgid": 'Names must not end with "{extension}".', "msgstr": ['Los nombres no deben terminar con "{extension}".'] }, { "msgid": "Names must not start with a dot.", "msgstr": ["Los nombres no deben iniciar con un punto."] }, { "msgid": "New", "msgstr": ["Nuevo"] }, { "msgid": "New folder", "msgstr": [" Nueva carpeta"] }, { "msgid": "New folder name", "msgstr": ["Nuevo nombre de carpeta"] }, { "msgid": "No files in here", "msgstr": ["No hay archivos aquí"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["No se encontraron archivos que coincidiesen con su filtro."] }, { "msgid": "No matching files", "msgstr": ["No hay archivos coincidentes"] }, { "msgid": "Please enter a name with at least 2 characters.", "msgstr": ["Por favor, ingrese un nombre con al menos 2 caracteres."] }, { "msgid": "Recent", "msgstr": ["Reciente"] }, { "msgid": "Select all entries", "msgstr": ["Seleccionar todas las entradas"] }, { "msgid": "Select entry", "msgstr": ["Seleccionar entrada"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["Seleccione la fila para {nodename}"] }, { "msgid": "Size", "msgstr": ["Tamaño"] }, { "msgid": "Submit name", "msgstr": ["Enviar nombre"] }, { "msgid": "Undo", "msgstr": ["Deshacer"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["¡Cargue algún contenido o sincronice con sus dispositivos!"] }, { "msgid": "You are currently identified as {nickname}.", "msgstr": ["Ud. se encuentra identificado actualmente como {nickname}."] }, { "msgid": "You are currently not identified.", "msgstr": ["Ud. no se encuentra identificado actualmente."] }, { "msgid": "You cannot leave the name empty.", "msgstr": ["No puede dejar el nombre vacío."] }] }, { "language": "es_AR", "translations": [{ "msgid": '"{name}" is an invalid folder name.', "msgstr": ['"{name}" es un nombre de carpeta inválido.'] }, { "msgid": '"{name}" is not an allowed folder name', "msgstr": ['"{name}" no es un nombre de carpeta permitido'] }, { "msgid": '"/" is not allowed inside a folder name.', "msgstr": ['"/" no está permitido en el nombre de una carpeta.'] }, { "msgid": "All files", "msgstr": ["Todos los archivos"] }, { "msgid": "Choose", "msgstr": ["Elegir"] }, { "msgid": "Choose {file}", "msgstr": ["Elija {file}"] }, { "msgid": "Choose %n file", "msgid_plural": "Choose %n files", "msgstr": ["Elija %n archivo", "Elija %n archivos", "Elija %n archivos"] }, { "msgid": "Copy", "msgstr": ["Copiar"] }, { "msgid": "Copy to {target}", "msgstr": ["Copiar a {target}"] }, { "msgid": "Could not create the new folder", "msgstr": ["No se pudo crear la nueva carpeta"] }, { "msgid": "Could not load files settings", "msgstr": ["No se pudo cargar la configuración de archivos"] }, { "msgid": "Could not load files views", "msgstr": ["No se pudieron cargar las vistas de los archivos"] }, { "msgid": "Create directory", "msgstr": ["Crear directorio"] }, { "msgid": "Current view selector", "msgstr": ["Selector de vista actual"] }, { "msgid": "Favorites", "msgstr": ["Favoritos"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["Los archivos y carpetas que marque como favoritos aparecerán aquí."] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["Los archivos y carpetas que modificó recientemente aparecerán aquí."] }, { "msgid": "Filter file list", "msgstr": ["Filtrar lista de archivos"] }, { "msgid": "Folder name cannot be empty.", "msgstr": ["El nombre de la carpeta no puede estar vacío."] }, { "msgid": "Home", "msgstr": ["Inicio"] }, { "msgid": "Modified", "msgstr": ["Modificado"] }, { "msgid": "Move", "msgstr": ["Mover"] }, { "msgid": "Move to {target}", "msgstr": ["Mover a {target}"] }, { "msgid": "Name", "msgstr": ["Nombre"] }, { "msgid": "New", "msgstr": ["Nuevo"] }, { "msgid": "New folder", "msgstr": ["Nueva carpeta"] }, { "msgid": "New folder name", "msgstr": ["Nombre de nueva carpeta"] }, { "msgid": "No files in here", "msgstr": ["No hay archivos aquí"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["No se encontraron archivos que coincidan con su filtro."] }, { "msgid": "No matching files", "msgstr": ["No hay archivos coincidentes"] }, { "msgid": "Recent", "msgstr": ["Reciente"] }, { "msgid": "Select all entries", "msgstr": ["Seleccionar todas las entradas"] }, { "msgid": "Select entry", "msgstr": ["Seleccionar entrada"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["Seleccione la fila para {nodename}"] }, { "msgid": "Size", "msgstr": ["Tamaño"] }, { "msgid": "Undo", "msgstr": ["Deshacer"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["¡Cargue algún contenido o sincronice con sus dispositivos!"] }] }, { "language": "es_MX", "translations": [{ "msgid": '"{char}" is not allowed inside a folder name.', "msgstr": ['"{char}" no está permitido dentro de un nombre de carpeta'] }, { "msgid": '"{char}" is not allowed inside a name.', "msgstr": ['"{char}" no está permitido dentro de un nombre'] }, { "msgid": '"{extension}" is not an allowed name.', "msgstr": ['"{extension}" no es un nombre permitido'] }, { "msgid": '"{segment}" is a reserved name and not allowed for folder names.', "msgstr": ['"{segment}" es un nombre reservado y no está permitido para nombres de carpetas'] }, { "msgid": '"{segment}" is a reserved name and not allowed.', "msgstr": ['"{segment}" es un nombre reservado y no está permitido'] }, { "msgid": "%n file conflict", "msgid_plural": "%n files conflict", "msgstr": ["%n conflicto de archivo", "%n conflicto de archivos", "%n conflicto de archivos"] }, { "msgid": "%n file conflict in {dirname}", "msgid_plural": "%n file conflicts in {dirname}", "msgstr": ["%n conflicto de archivo en {dirname}", "%n conflictos de archivo en {dirname}", "%n conflictos de archivo en {dirname}"] }, { "msgid": "All files", "msgstr": ["Todos los archivos"] }, { "msgid": "Cancel", "msgstr": ["Cancelar"] }, { "msgid": "Cancel the entire operation", "msgstr": ["Cancelar la operación completa"] }, { "msgid": "Choose", "msgstr": ["Seleccionar"] }, { "msgid": "Choose {file}", "msgstr": ["Seleccionar {file}"] }, { "msgid": "Choose %n file", "msgid_plural": "Choose %n files", "msgstr": ["Seleccionar %n archivo", "Seleccionar %n archivos", "Seleccionar %n archivos"] }, { "msgid": "Confirm", "msgstr": ["Confirmar"] }, { "msgid": "Continue", "msgstr": ["Continuar"] }, { "msgid": "Copy", "msgstr": ["Copiar"] }, { "msgid": "Copy to {target}", "msgstr": ["Copiar a {target}"] }, { "msgid": "Could not create the new folder", "msgstr": ["No se pudo crear la nueva carpeta"] }, { "msgid": "Could not load files settings", "msgstr": ["No se pudo cargar la configuración de archivos"] }, { "msgid": "Could not load files views", "msgstr": ["No se pudieron cargar las vistas de los archivos"] }, { "msgid": "Create directory", "msgstr": ["Crear carpeta"] }, { "msgid": "Current view selector", "msgstr": ["Selector de vista actual"] }, { "msgid": "Enter your name", "msgstr": ["Ingresa tu nombre"] }, { "msgid": "Existing version", "msgstr": ["Versión existente"] }, { "msgid": "Failed to set nickname.", "msgstr": ["No se pudo establecer el nickname"] }, { "msgid": "Favorites", "msgstr": ["Favoritos"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["Los archivos y carpetas que marque como favoritos aparecerán aquí."] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["Los archivos y carpetas que modificó recientemente aparecerán aquí."] }, { "msgid": "Filter file list", "msgstr": ["Filtrar lista de archivos"] }, { "msgid": 'Folder names must not end with "{extension}".', "msgstr": ['Los nombres para carpeta no deben terminar con "{extension}"'] }, { "msgid": "Guest identification", "msgstr": ["Identificación de invitado"] }, { "msgid": "Home", "msgstr": ["Inicio"] }, { "msgid": "If you select both versions, the incoming file will have a number added to its name.", "msgstr": ["Si seleccionas ambas versiones, se le agregará al archivo que se está descargando, un número a su nombre."] }, { "msgid": "Invalid folder name.", "msgstr": ["Nombre de carpeta no válido"] }, { "msgid": "Invalid name.", "msgstr": ["Nombre no válido"] }, { "msgid": "Last modified date unknown", "msgstr": ["Última fecha de modificación desconocida"] }, { "msgid": "Modified", "msgstr": ["Modificado"] }, { "msgid": "Move", "msgstr": ["Mover"] }, { "msgid": "Move to {target}", "msgstr": ["Mover a {target}"] }, { "msgid": "Name", "msgstr": ["Nombre"] }, { "msgid": "Names may be at most 64 characters long.", "msgstr": ["Los nombres pueden tener como máximo 64 caracteres."] }, { "msgid": "Names must not be empty.", "msgstr": ["Los nombres no deben estar vacíos."] }, { "msgid": 'Names must not end with "{extension}".', "msgstr": ['Los nombres no deben terminar con "{extension}"'] }, { "msgid": "Names must not start with a dot.", "msgstr": ["Los nombres no deben comenzar con un punto."] }, { "msgid": "New", "msgstr": ["Nuevo"] }, { "msgid": "New folder", "msgstr": ["Nueva carpeta"] }, { "msgid": "New folder name", "msgstr": ["Nombre de nueva carpeta"] }, { "msgid": "New version", "msgstr": ["Versión nueva"] }, { "msgid": "No files in here", "msgstr": ["No hay archivos aquí"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["No se encontraron archivos que coincidan con su filtro."] }, { "msgid": "No matching files", "msgstr": ["No hay archivos coincidentes"] }, { "msgid": "Please enter a name with at least 2 characters.", "msgstr": ["Por favor ingrese un nombre con al menos 2 caracteres."] }, { "msgid": "Recent", "msgstr": ["Reciente"] }, { "msgid": "Select all checkboxes", "msgstr": ["Seleccione todas las casillas de verificación"] }, { "msgid": "Select all entries", "msgstr": ["Seleccionar todas las entradas"] }, { "msgid": "Select all existing files", "msgstr": ["Seleccione todos los archivos que aparecen"] }, { "msgid": "Select all new files", "msgstr": ["Seleccione todos los archivos nuevos"] }, { "msgid": "Select entry", "msgstr": ["Seleccionar entrada"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["Seleccione la fila para {nodename}"] }, { "msgid": "Size", "msgstr": ["Tamaño"] }, { "msgid": "Skip %n file", "msgid_plural": "Skip %n files", "msgstr": ["Omitir %n archivo", "Omitir %n archivos", "Omitir %n archivos"] }, { "msgid": "Skip this file", "msgstr": ["Omitir este archivo"] }, { "msgid": "Submit name", "msgstr": ["Enviar nombre"] }, { "msgid": "Undo", "msgstr": ["Deshacer"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["¡Suba algún contenido o sincronice con sus dispositivos!"] }, { "msgid": "When an incoming folder is selected, any conflicting files within it will also be overwritten.", "msgstr": ["Cuando se selecciona una carpeta en descarga, cualquier archivo conflictivo que contenga también se sobrescribirá."] }, { "msgid": "When an incoming folder is selected, the content is written into the existing folder and a recursive conflict resolution is performed.", "msgstr": ["Cuando se selecciona una carpeta en descarga, el contenido se escribe en la carpeta existente y se realiza una resolución de conflicto recursiva."] }, { "msgid": "Which files do you want to keep?", "msgstr": ["¿Qué archivos deseas conservar?"] }, { "msgid": "You are currently identified as {nickname}.", "msgstr": ["Actualmente estás identificado como {nickname}"] }, { "msgid": "You are currently not identified.", "msgstr": ["No estás identificado actualmente."] }, { "msgid": "You cannot leave the name empty.", "msgstr": ["No puedes dejar el nombre vacío."] }, { "msgid": "You need to choose at least one conflict solution", "msgstr": ["Necesitas elegir al menos una solución al conflicto."] }, { "msgid": "You need to select at least one version of each file to continue.", "msgstr": ["Necesitas seleccionar al menos una versión de cada archivo para continuar."] }] }, { "language": "et_EE", "translations": [{ "msgid": '"{char}" is not allowed inside a folder name.', "msgstr": ["„{char}“ pole kausta nimes lubatud."] }, { "msgid": '"{char}" is not allowed inside a name.', "msgstr": ["„{char}“ pole nimes lubatud."] }, { "msgid": '"{extension}" is not an allowed name.', "msgstr": ["„{extension}“ pole lubatud nimi."] }, { "msgid": '"{segment}" is a reserved name and not allowed for folder names.', "msgstr": ["„{segment}“ on reserveeritud nimi ja pole kausta nimes lubatud."] }, { "msgid": '"{segment}" is a reserved name and not allowed.', "msgstr": ["„{segment}“ on reserveeritud nimi ja pole kasutamiseks lubatud."] }, { "msgid": "%n file conflict", "msgid_plural": "%n files conflict", "msgstr": ["%n fail on vastuolus", "%n faili on omavahel vastuolus"] }, { "msgid": "%n file conflict in {dirname}", "msgid_plural": "%n file conflicts in {dirname}", "msgstr": ["%n fail on {dirname} kaustas vastuolus", "%n faili on omavahel {dirname} kaustas vastuolus"] }, { "msgid": "All files", "msgstr": ["Kõik failid"] }, { "msgid": "Cancel", "msgstr": ["Katkesta"] }, { "msgid": "Cancel the entire operation", "msgstr": ["Katkesta kogu tegevus"] }, { "msgid": "Choose", "msgstr": ["Tee valik"] }, { "msgid": "Choose {file}", "msgstr": ["Vali {file} fail"] }, { "msgid": "Choose %n file", "msgid_plural": "Choose %n files", "msgstr": ["Vali %n fail", "Vali %n faili"] }, { "msgid": "Confirm", "msgstr": ["Kinnita"] }, { "msgid": "Continue", "msgstr": ["Jätka"] }, { "msgid": "Copy", "msgstr": ["Kopeeri"] }, { "msgid": "Copy to {target}", "msgstr": ["Kopeeri sihtkohta „{target}“"] }, { "msgid": "Could not create the new folder", "msgstr": ["Uut kausta ei saanud luua"] }, { "msgid": "Could not load files settings", "msgstr": ["Failide seadistusi ei õnnestunud laadida"] }, { "msgid": "Could not load files views", "msgstr": ["Failide vaatamiskordi ei õnnestunud laadida"] }, { "msgid": "Create directory", "msgstr": ["Loo kaust"] }, { "msgid": "Current view selector", "msgstr": ["Praeguse vaate valija"] }, { "msgid": "Enter your name", "msgstr": ["Sisesta oma nimi"] }, { "msgid": "Existing version", "msgstr": ["Olemasolev versioon"] }, { "msgid": "Failed to set nickname.", "msgstr": ["Hüüdnime ei õnnestunud lisada"] }, { "msgid": "Favorites", "msgstr": ["Lemmikud"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["Failid ja kaustad, mida märgistad lemmikuks, kuvatakse siin."] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["Siin kuvatakse hiljuti muudetud failid ja kaustad."] }, { "msgid": "Filter file list", "msgstr": ["Filtreeri faililoendit"] }, { "msgid": 'Folder names must not end with "{extension}".', "msgstr": ["Kausta nime lõpus ei tohi olla „{extension}“."] }, { "msgid": "Guest identification", "msgstr": ["Külalise tuvastamine"] }, { "msgid": "Home", "msgstr": ["Avaleht"] }, { "msgid": "If you select both versions, the incoming file will have a number added to its name.", "msgstr": ["Kui valid mõlemad versioonid, siis uue faili nimele lisatakse number."] }, { "msgid": "Invalid folder name.", "msgstr": ["Vigane kausta nimi."] }, { "msgid": "Invalid name.", "msgstr": ["Vigane nimi."] }, { "msgid": "Last modified date unknown", "msgstr": ["Viimase muutmise kuupäev pole teada"] }, { "msgid": "Modified", "msgstr": ["Muudetud"] }, { "msgid": "Move", "msgstr": ["Teisalda"] }, { "msgid": "Move to {target}", "msgstr": ["Teisalda kausta „{target}“"] }, { "msgid": "Name", "msgstr": ["Nimi"] }, { "msgid": "Names may be at most 64 characters long.", "msgstr": ["Nimed võivad olla vaid kuni 64 tähemärki pikad."] }, { "msgid": "Names must not be empty.", "msgstr": ["Nimi ei saa olla tühi."] }, { "msgid": 'Names must not end with "{extension}".', "msgstr": ["Nime lõpus ei tohi olla „{extension}“."] }, { "msgid": "Names must not start with a dot.", "msgstr": ["Nime alguses ei tohi olla punkt."] }, { "msgid": "New", "msgstr": ["Uus"] }, { "msgid": "New folder", "msgstr": ["Uus kaust"] }, { "msgid": "New folder name", "msgstr": ["Uue kausta nimi"] }, { "msgid": "New version", "msgstr": ["Uus versioon"] }, { "msgid": "No files in here", "msgstr": ["Siin puuduvad failid"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["Sinu filtrile vastavaid faile ei leidunud."] }, { "msgid": "No matching files", "msgstr": ["Puuduvad sobivad failid"] }, { "msgid": "Please enter a name with at least 2 characters.", "msgstr": ["Palun sisesta vähemalt 2 tähemärki pikk nimi."] }, { "msgid": "Recent", "msgstr": ["Hiljutine"] }, { "msgid": "Select all checkboxes", "msgstr": ["Vali kõik märkeruudud"] }, { "msgid": "Select all entries", "msgstr": ["Vali kõik kirjed"] }, { "msgid": "Select all existing files", "msgstr": ["Vali kõik olemasolevad failid"] }, { "msgid": "Select all new files", "msgstr": ["Vali kõik uued failid"] }, { "msgid": "Select entry", "msgstr": ["Vali kirje"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["Vali rida „{nodename}“ jaoks"] }, { "msgid": "Size", "msgstr": ["Suurus"] }, { "msgid": "Skip %n file", "msgid_plural": "Skip %n files", "msgstr": ["Jäta %n fail vahele", "Jäta %n faili vahele"] }, { "msgid": "Skip this file", "msgstr": ["Jäta see fail vahele"] }, { "msgid": "Submit name", "msgstr": ["Lisa nimi"] }, { "msgid": "Undo", "msgstr": ["Tühista"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["Lisa mingit sisu või sünkrooni see oma seadmetest!"] }, { "msgid": "When an incoming folder is selected, any conflicting files within it will also be overwritten.", "msgstr": ["Kui uute failide kaust on valitud, siis kõik seal leiduvad vastuolus failid saavad üle kirjutatud."] }, { "msgid": "When an incoming folder is selected, the content is written into the existing folder and a recursive conflict resolution is performed.", "msgstr": ["Kui uute failide kaust on valitud, siis sisu kirjutatakse olemasolevasse kausta ja korraldatakse rekursiivne failikonfliktide lahendamine."] }, { "msgid": "Which files do you want to keep?", "msgstr": ["Missugused failid tahaksid alles jätta?"] }, { "msgid": "You are currently identified as {nickname}.", "msgstr": ["Sa oled hetkel tuvastatav kui {nickname}.."] }, { "msgid": "You are currently not identified.", "msgstr": ["Sa oled hetkel tuvastamata."] }, { "msgid": "You cannot leave the name empty.", "msgstr": ["Sa ei saa jätte nime tühjaks."] }, { "msgid": "You need to choose at least one conflict solution", "msgstr": ["Sa pead valima vähemalt ühe failikonflikti lahenduse."] }, { "msgid": "You need to select at least one version of each file to continue.", "msgstr": ["Jätkamaks pead valima igast failist vähemalt ühe versiooni."] }] }, { "language": "fa", "translations": [{ "msgid": '"{name}" is an invalid folder name.', "msgstr": ["{name} نام پوشه معتبر نیست"] }, { "msgid": '"{name}" is not an allowed folder name', "msgstr": ["{name} نام پوشه مجاز نیست"] }, { "msgid": '"/" is not allowed inside a folder name.', "msgstr": ['"/" نمی‌تواند در نام پوشه استفاده شود.'] }, { "msgid": "All files", "msgstr": ["همه فایل‌ها"] }, { "msgid": "Cancel", "msgstr": ["لغو"] }, { "msgid": "Choose", "msgstr": ["انتخاب"] }, { "msgid": "Choose {file}", "msgstr": ["انتخاب {file}"] }, { "msgid": "Choose %n file", "msgid_plural": "Choose %n files", "msgstr": ["انتخاب %n فایل", "انتخاب %n فایل"] }, { "msgid": "Copy", "msgstr": ["رونوشت"] }, { "msgid": "Copy to {target}", "msgstr": ["رونوشت از {target}"] }, { "msgid": "Could not create the new folder", "msgstr": ["پوشه جدید ایجاد نشد"] }, { "msgid": "Could not load files settings", "msgstr": ["تنظیمات فایل باز نشد"] }, { "msgid": "Could not load files views", "msgstr": ["نمای فایل‌ها بارگیری نشد"] }, { "msgid": "Create directory", "msgstr": ["ایجاد فهرست"] }, { "msgid": "Current view selector", "msgstr": ["انتخابگر نماگر فعلی"] }, { "msgid": "Enter your name", "msgstr": ["نام خود را وارد کنید"] }, { "msgid": "Failed to set nickname.", "msgstr": ["تنظیم نام مستعار ناموفق بود."] }, { "msgid": "Favorites", "msgstr": ["علایق"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["فایل‌ها و پوشه‌هایی که به‌عنوان مورد علاقه علامت‌گذاری می‌کنید در اینجا نشان داده می‌شوند."] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["فایل‌ها و پوشه‌هایی که اخیراً تغییر داده‌اید در اینجا نمایش داده می‌شوند."] }, { "msgid": "Filter file list", "msgstr": ["فیلتر لیست فایل"] }, { "msgid": "Folder name cannot be empty.", "msgstr": ["نام پوشه نمی تواند خالی باشد."] }, { "msgid": "Guest identification", "msgstr": ["شناسایی مهمان"] }, { "msgid": "Home", "msgstr": ["خانه"] }, { "msgid": "Modified", "msgstr": ["اصلاح شده"] }, { "msgid": "Move", "msgstr": ["انتقال"] }, { "msgid": "Move to {target}", "msgstr": ["انتقال به {target}"] }, { "msgid": "Name", "msgstr": ["نام"] }, { "msgid": "New", "msgstr": ["جدید"] }, { "msgid": "New folder", "msgstr": ["پوشه جدید"] }, { "msgid": "New folder name", "msgstr": ["نام پوشه جدید"] }, { "msgid": "No files in here", "msgstr": ["فایلی اینجا نیست"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["هیچ فایلی مطابق با فیلتر شما یافت نشد."] }, { "msgid": "No matching files", "msgstr": ["فایل منطبقی وجود ندارد"] }, { "msgid": "Please enter a name with at least 2 characters.", "msgstr": ["لطفاً نامی با حداقل ۲ کاراکتر وارد کنید."] }, { "msgid": "Recent", "msgstr": ["اخیر"] }, { "msgid": "Select all entries", "msgstr": ["انتخاب همه ورودی ها"] }, { "msgid": "Select entry", "msgstr": ["انتخاب ورودی"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["انتخاب ردیف برای {nodename}"] }, { "msgid": "Size", "msgstr": ["اندازه"] }, { "msgid": "Submit name", "msgstr": ["ارسال نام"] }, { "msgid": "Undo", "msgstr": ["بازگردانی"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["مقداری محتوا آپلود کنید یا با دستگاه های خود همگام سازی کنید!"] }, { "msgid": "You are currently not identified.", "msgstr": ["شما در حال حاضر شناسایی نشده‌اید."] }, { "msgid": "You cannot leave the name empty.", "msgstr": ["نمی‌توانید نام را خالی بگذارید."] }] }, { "language": "fi_FI", "translations": [{ "msgid": '"{char}" is not allowed inside a name.', "msgstr": ['"{char}" ei ole sallittu nimessä.'] }, { "msgid": '"{extension}" is not an allowed name.', "msgstr": ['"{extension}" ei ole sallittu nimi.'] }, { "msgid": '"{name}" is an invalid folder name.', "msgstr": ['"{name}" on virheellinen kansion nimi.'] }, { "msgid": '"{name}" is not an allowed folder name', "msgstr": ['"{name}" ei ole sallittu kansion nimi'] }, { "msgid": '"{segment}" is a reserved name and not allowed.', "msgstr": ['"{segment}" on varattu nimi eikä se ole sallittu.'] }, { "msgid": '"/" is not allowed inside a folder name.', "msgstr": ['"/" ei ole sallittu kansion nimessä.'] }, { "msgid": "All files", "msgstr": ["Kaikki tiedostot"] }, { "msgid": "Cancel", "msgstr": ["Peruuta"] }, { "msgid": "Choose", "msgstr": ["Valitse"] }, { "msgid": "Choose {file}", "msgstr": ["Valitse {file}"] }, { "msgid": "Choose %n file", "msgid_plural": "Choose %n files", "msgstr": ["Valitse %n tiedosto", "Valitse %n tiedostoa"] }, { "msgid": "Copy", "msgstr": ["Kopioi"] }, { "msgid": "Copy to {target}", "msgstr": ["Kopioi sijaintiin {target}"] }, { "msgid": "Could not create the new folder", "msgstr": ["Uutta kansiota ei voitu luoda"] }, { "msgid": "Could not load files settings", "msgstr": ["Tiedoston asetuksia ei saa ladattua"] }, { "msgid": "Could not load files views", "msgstr": ["Tiedoston näkymiä ei saa ladattua"] }, { "msgid": "Create directory", "msgstr": ["Luo kansio"] }, { "msgid": "Current view selector", "msgstr": ["Nykyisen näkymän valinta"] }, { "msgid": "Enter your name", "msgstr": ["Kirjoita nimesi"] }, { "msgid": "Failed to set nickname.", "msgstr": ["Kutsumanimen asettaminen epäonnistui."] }, { "msgid": "Favorites", "msgstr": ["Suosikit"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["Tiedostot ja kansiot, jotka merkitset suosikkeihisi, näkyvät täällä."] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["Tiedostot ja kansiot, joita muokkasit äskettäin, näkyvät täällä."] }, { "msgid": "Filter file list", "msgstr": ["Suodata tiedostolistaa"] }, { "msgid": "Folder name cannot be empty.", "msgstr": ["Kansion nimi ei voi olla tyhjä."] }, { "msgid": "Guest identification", "msgstr": ["Vieraan tunnistaminen"] }, { "msgid": "Home", "msgstr": ["Koti"] }, { "msgid": "Invalid name.", "msgstr": ["Virheellinen nimi."] }, { "msgid": "Modified", "msgstr": ["Muokattu"] }, { "msgid": "Move", "msgstr": ["Siirrä"] }, { "msgid": "Move to {target}", "msgstr": ["Siirrä sijaintiin {target}"] }, { "msgid": "Name", "msgstr": ["Nimi"] }, { "msgid": "Names may be at most 64 characters long.", "msgstr": ["Nimissä voi olla enintään 64 merkkiä."] }, { "msgid": "Names must not be empty.", "msgstr": ["Nimet eivät saa olla tyhjiä."] }, { "msgid": 'Names must not end with "{extension}".', "msgstr": ['Nimet eivät saa päättyä sanaan "{extension}".'] }, { "msgid": "Names must not start with a dot.", "msgstr": ["Nimet eivät saa alkaa pisteellä."] }, { "msgid": "New", "msgstr": ["Uusi"] }, { "msgid": "New folder", "msgstr": ["Uusi kansio"] }, { "msgid": "New folder name", "msgstr": ["Uuden kansion nimi"] }, { "msgid": "No files in here", "msgstr": ["Täällä ei ole tiedostoja"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["Suodatinta vastaavia tiedostoja ei löytynyt."] }, { "msgid": "No matching files", "msgstr": ["Ei vastaavia tiedostoja"] }, { "msgid": "Please enter a name with at least 2 characters.", "msgstr": ["Kirjoita vähintään kaksi merkkiä sisältävä nimi."] }, { "msgid": "Recent", "msgstr": ["Viimeisimmät"] }, { "msgid": "Select all entries", "msgstr": ["Valitse kaikki tietueet"] }, { "msgid": "Select entry", "msgstr": ["Valitse tietue"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["Valitse rivi {nodename}:lle"] }, { "msgid": "Size", "msgstr": ["Koko"] }, { "msgid": "Submit name", "msgstr": ["Lähetä nimi"] }, { "msgid": "Undo", "msgstr": ["Kumoa"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["Lähetä jotain sisältöä tai synkronoi laitteidesi kanssa!"] }, { "msgid": "You are currently identified as {nickname}.", "msgstr": ["Sinut tunnetaan tällä hetkellä nimellä {nickname}."] }, { "msgid": "You are currently not identified.", "msgstr": ["Sinua ei ole tunnistettu."] }, { "msgid": "You cannot leave the name empty.", "msgstr": ["Nimeä ei voi jättää tyhjäksi."] }] }, { "language": "fr", "translations": [{ "msgid": '"{char}" is not allowed inside a folder name.', "msgstr": [`"{char}" n'est pas autorisé dans un nom de dossier.`] }, { "msgid": '"{char}" is not allowed inside a name.', "msgstr": [`"{char}" n'est pas autorisé dans un nom.`] }, { "msgid": '"{extension}" is not an allowed name.', "msgstr": [`"{extension}" n'est pas un nom autorisé.`] }, { "msgid": '"{segment}" is a reserved name and not allowed for folder names.', "msgstr": [`"{segment}" est un nom réservé et n'est pas autorisé pour un nom de dossier.`] }, { "msgid": '"{segment}" is a reserved name and not allowed.', "msgstr": [`"{segment}" est un nom réservé et n'est pas autorisé.`] }, { "msgid": "%n file conflict", "msgid_plural": "%n files conflict", "msgstr": ["%n conflit de fichier", "%n conflit de fichiers", "%n conflit de fichiers"] }, { "msgid": "%n file conflict in {dirname}", "msgid_plural": "%n file conflicts in {dirname}", "msgstr": ["%nconflit de fichier dans {dirname}", "%n conflit de fichiers dans {dirname}", "%nconflit de fichiers dans {dirname}"] }, { "msgid": "All files", "msgstr": ["Tous les fichiers"] }, { "msgid": "Cancel", "msgstr": ["Annuler"] }, { "msgid": "Cancel the entire operation", "msgstr": ["Tout annuler "] }, { "msgid": "Choose", "msgstr": ["Choisir"] }, { "msgid": "Choose {file}", "msgstr": ["Choisir {file}"] }, { "msgid": "Choose %n file", "msgid_plural": "Choose %n files", "msgstr": ["Choisir %n fichier", "Choisir %n fichiers", "Choisir %n fichiers "] }, { "msgid": "Confirm", "msgstr": ["Confirmer"] }, { "msgid": "Continue", "msgstr": ["Continuer"] }, { "msgid": "Copy", "msgstr": ["Copier"] }, { "msgid": "Copy to {target}", "msgstr": ["Copier vers {target}"] }, { "msgid": "Could not create the new folder", "msgstr": ["Impossible de créer le nouveau dossier"] }, { "msgid": "Could not load files settings", "msgstr": ["Les paramètres des fichiers n'ont pas pu être chargés"] }, { "msgid": "Could not load files views", "msgstr": ["Impossible de charger les vues des fichiers"] }, { "msgid": "Create directory", "msgstr": ["Créer un répertoire"] }, { "msgid": "Current view selector", "msgstr": ["Sélecteur d'affichage actuel"] }, { "msgid": "Enter your name", "msgstr": ["Entrez votre nom"] }, { "msgid": "Existing version", "msgstr": ["Version actuelle "] }, { "msgid": "Failed to set nickname.", "msgstr": ["Échec de définition du surnom."] }, { "msgid": "Favorites", "msgstr": ["Favoris"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["Les fichiers et répertoires marqués en favoris apparaîtront ici."] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["Les fichiers et répertoires modifiés récemment apparaîtront ici."] }, { "msgid": "Filter file list", "msgstr": ["Filtrer la liste des fichiers"] }, { "msgid": 'Folder names must not end with "{extension}".', "msgstr": ['Les noms de dossiers ne doivent pas se terminer par "{extension}".'] }, { "msgid": "Guest identification", "msgstr": ["Identification d'invité"] }, { "msgid": "Home", "msgstr": ["Accueil"] }, { "msgid": "If you select both versions, the incoming file will have a number added to its name.", "msgstr": ["Si vous conservez les deux versions, le fichier reçu sera renommé avec un numéro."] }, { "msgid": "Invalid folder name.", "msgstr": ["Nom de dossier invalide."] }, { "msgid": "Invalid name.", "msgstr": ["Nom invalide."] }, { "msgid": "Last modified date unknown", "msgstr": ["Date de modification inconnue"] }, { "msgid": "Modified", "msgstr": ["Modifié"] }, { "msgid": "Move", "msgstr": ["Déplacer"] }, { "msgid": "Move to {target}", "msgstr": ["Déplacer vers {target}"] }, { "msgid": "Name", "msgstr": ["Nom"] }, { "msgid": "Names may be at most 64 characters long.", "msgstr": ["Les noms peuvent comporter au maximum 64 caractères."] }, { "msgid": "Names must not be empty.", "msgstr": ["Les noms ne peuvent pas être vides."] }, { "msgid": 'Names must not end with "{extension}".', "msgstr": ['Les noms ne doivent pas se terminer par "{extension}".'] }, { "msgid": "Names must not start with a dot.", "msgstr": ["Les noms ne peuvent pas commencer par un point."] }, { "msgid": "New", "msgstr": ["Nouveau"] }, { "msgid": "New folder", "msgstr": ["Nouveau dossier"] }, { "msgid": "New folder name", "msgstr": ["Nom du nouveau dossier"] }, { "msgid": "New version", "msgstr": ["Nouvelle version"] }, { "msgid": "No files in here", "msgstr": ["Aucun fichier ici"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["Aucun fichier trouvé correspondant à votre filtre."] }, { "msgid": "No matching files", "msgstr": ["Aucun fichier correspondant"] }, { "msgid": "Please enter a name with at least 2 characters.", "msgstr": ["Veuillez entrer un nom avec au moins 2 caractères."] }, { "msgid": "Recent", "msgstr": ["Récents"] }, { "msgid": "Select all checkboxes", "msgstr": ["Sélectionner toutes les cases à cocher"] }, { "msgid": "Select all entries", "msgstr": ["Tout sélectionner"] }, { "msgid": "Select all existing files", "msgstr": ["Sélectionner tous les fichiers existants"] }, { "msgid": "Select all new files", "msgstr": ["Sélectionner tous les nouveaux fichiers"] }, { "msgid": "Select entry", "msgstr": ["Sélectionner une entrée"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["Sélectionner la ligne correspondant à {nodename}"] }, { "msgid": "Size", "msgstr": ["Taille"] }, { "msgid": "Skip %n file", "msgid_plural": "Skip %n files", "msgstr": ["Ignorer %n fichier", "Ignorer %n fichiers ", "Ignorer %n fichiers "] }, { "msgid": "Skip this file", "msgstr": ["Ignorer ce fichier"] }, { "msgid": "Submit name", "msgstr": ["Envoyer le nom"] }, { "msgid": "Undo", "msgstr": ["Annuler"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["Chargez du contenu ou synchronisez avec vos équipements !"] }, { "msgid": "When an incoming folder is selected, any conflicting files within it will also be overwritten.", "msgstr": ["En sélectionnant un dossier entrant, les fichiers en conflit qu’il contient seront automatiquement écrasés."] }, { "msgid": "When an incoming folder is selected, the content is written into the existing folder and a recursive conflict resolution is performed.", "msgstr": ["Lorsque vous sélectionnez un dossier entrant, son contenu est ajouté au dossier existant et les conflits sont résolus automatiquement."] }, { "msgid": "Which files do you want to keep?", "msgstr": ["Quels fichiers souhaitez-vous conserver ?"] }, { "msgid": "You are currently identified as {nickname}.", "msgstr": ["Vous êtes actuellement identifié comme {nickname}."] }, { "msgid": "You are currently not identified.", "msgstr": ["Vous n'êtes pas identifié actuellement."] }, { "msgid": "You cannot leave the name empty.", "msgstr": ["Vous ne pouvez pas laisser le nom vide."] }, { "msgid": "You need to choose at least one conflict solution", "msgstr": ["Vous devez choisir au moins une option pour résoudre le conflit"] }, { "msgid": "You need to select at least one version of each file to continue.", "msgstr": ["Sélectionnez au moins une version de chaque fichier pour continuer."] }] }, { "language": "ga", "translations": [{ "msgid": '"{char}" is not allowed inside a folder name.', "msgstr": [`Ní cheadaítear "{char}" laistigh d'ainm fillteáin.`] }, { "msgid": '"{char}" is not allowed inside a name.', "msgstr": [`Ní cheadaítear "{char}" laistigh d'ainm.`] }, { "msgid": '"{extension}" is not an allowed name.', "msgstr": ['Ní ainm ceadaithe é "{extension}".'] }, { "msgid": '"{segment}" is a reserved name and not allowed for folder names.', "msgstr": [`Is ainm curtha in áirithe é "{segment}" agus ní cheadaítear é d'ainmneacha fillteán.`] }, { "msgid": '"{segment}" is a reserved name and not allowed.', "msgstr": ['Is ainm curtha in áirithe é "{segment}" agus ní cheadaítear é.'] }, { "msgid": "%n file conflict", "msgid_plural": "%n files conflict", "msgstr": ["%n coimhlint comhaid", "%n coimhlint comhad", "%n coimhlint comhad", "%n coimhlint comhad", "%n coimhlint comhad"] }, { "msgid": "%n file conflict in {dirname}", "msgid_plural": "%n file conflicts in {dirname}", "msgstr": ["%n coimhlint comhaid i {dirname}", "%n coimhlintí comhaid i {dirname}", "%n coimhlintí comhaid i {dirname}", "%n coimhlintí comhaid i {dirname}", "%n coimhlintí comhaid i {dirname}"] }, { "msgid": "All files", "msgstr": ["Gach comhad"] }, { "msgid": "Cancel", "msgstr": ["Cealaigh"] }, { "msgid": "Cancel the entire operation", "msgstr": ["Cealaigh an oibríocht ar fad"] }, { "msgid": "Choose", "msgstr": ["Roghnaigh"] }, { "msgid": "Choose {file}", "msgstr": ["Roghnaigh {file}"] }, { "msgid": "Choose %n file", "msgid_plural": "Choose %n files", "msgstr": ["Roghnaigh %n comhad", "Roghnaigh %n comhaid", "Roghnaigh %n comhaid", "Roghnaigh %n comhaid", "Roghnaigh %n comhaid"] }, { "msgid": "Confirm", "msgstr": ["Deimhnigh"] }, { "msgid": "Continue", "msgstr": ["Lean ar aghaidh"] }, { "msgid": "Copy", "msgstr": ["Cóip"] }, { "msgid": "Copy to {target}", "msgstr": ["Cóipeáil chuig {target}"] }, { "msgid": "Could not create the new folder", "msgstr": ["Níorbh fhéidir an fillteán nua a chruthú"] }, { "msgid": "Could not load files settings", "msgstr": ["Níorbh fhéidir socruithe comhaid a lódáil"] }, { "msgid": "Could not load files views", "msgstr": ["Níorbh fhéidir radhairc comhad a lódáil"] }, { "msgid": "Create directory", "msgstr": ["Cruthaigh eolaire"] }, { "msgid": "Current view selector", "msgstr": ["Roghnóir amhairc reatha"] }, { "msgid": "Enter your name", "msgstr": ["Cuir isteach d'ainm"] }, { "msgid": "Existing version", "msgstr": ["Leagan atá ann cheana féin"] }, { "msgid": "Failed to set nickname.", "msgstr": ["Theip ar leasainm a shocrú."] }, { "msgid": "Favorites", "msgstr": ["Ceanáin"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["Taispeánfar comhaid agus fillteáin a mharcálann tú mar is fearr leat anseo."] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["Taispeánfar comhaid agus fillteáin a d'athraigh tú le déanaí anseo."] }, { "msgid": "Filter file list", "msgstr": ["Scag liosta comhad"] }, { "msgid": 'Folder names must not end with "{extension}".', "msgstr": ['Ní féidir ainmneacha fillteán a chríochnú le "{extension}".'] }, { "msgid": "Guest identification", "msgstr": ["Aitheantas aoi"] }, { "msgid": "Home", "msgstr": ["Baile"] }, { "msgid": "If you select both versions, the incoming file will have a number added to its name.", "msgstr": ["Má roghnaíonn tú an dá leagan, cuirfear uimhir le hainm an chomhaid atá ag teacht isteach."] }, { "msgid": "Invalid folder name.", "msgstr": ["Ainm fillteáin neamhbhailí."] }, { "msgid": "Invalid name.", "msgstr": ["Ainm neamhbhailí."] }, { "msgid": "Last modified date unknown", "msgstr": ["Dáta an athraithe dheireanaigh anaithnid"] }, { "msgid": "Modified", "msgstr": ["Athraithe"] }, { "msgid": "Move", "msgstr": ["Bog"] }, { "msgid": "Move to {target}", "msgstr": ["Bog go{target}"] }, { "msgid": "Name", "msgstr": ["Ainm"] }, { "msgid": "Names may be at most 64 characters long.", "msgstr": ["Ní fhéadfaidh ainmneacha a bheith níos mó ná 64 carachtar ar fhad."] }, { "msgid": "Names must not be empty.", "msgstr": ["Ní féidir ainmneacha a bheith folamh."] }, { "msgid": 'Names must not end with "{extension}".', "msgstr": ['Ní féidir ainmneacha a chríochnú le "{extension}".'] }, { "msgid": "Names must not start with a dot.", "msgstr": ["Ní mór ainmneacha a bheith ag tosú le ponc."] }, { "msgid": "New", "msgstr": ["Nua"] }, { "msgid": "New folder", "msgstr": ["Fillteán nua"] }, { "msgid": "New folder name", "msgstr": ["Ainm fillteáin nua"] }, { "msgid": "New version", "msgstr": ["Leagan nua"] }, { "msgid": "No files in here", "msgstr": ["Níl aon chomhaid istigh anseo"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["Níor aimsíodh aon chomhad a tháinig le do scagaire."] }, { "msgid": "No matching files", "msgstr": ["Gan comhaid meaitseála"] }, { "msgid": "Please enter a name with at least 2 characters.", "msgstr": ["Cuir isteach ainm ina bhfuil 2 charachtar ar a laghad."] }, { "msgid": "Recent", "msgstr": ["le déanaí"] }, { "msgid": "Select all checkboxes", "msgstr": ["Roghnaigh na boscaí seiceála go léir"] }, { "msgid": "Select all entries", "msgstr": ["Roghnaigh gach iontráil"] }, { "msgid": "Select all existing files", "msgstr": ["Roghnaigh na comhaid uile atá ann cheana"] }, { "msgid": "Select all new files", "msgstr": ["Roghnaigh gach comhad nua"] }, { "msgid": "Select entry", "msgstr": ["Roghnaigh iontráil"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["Roghnaigh an ró do {nodename}"] }, { "msgid": "Size", "msgstr": ["Méid"] }, { "msgid": "Skip %n file", "msgid_plural": "Skip %n files", "msgstr": ["Léim %n comhad", "Léim %n comhaid", "Léim %n comhaid", "Léim %n comhaid", "Léim %n comhaid"] }, { "msgid": "Skip this file", "msgstr": ["Scipeáil an comhad seo"] }, { "msgid": "Submit name", "msgstr": ["Cuir isteach ainm"] }, { "msgid": "Undo", "msgstr": ["Cealaigh"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["Uaslódáil roinnt ábhair nó sioncronaigh le do ghléasanna!"] }, { "msgid": "When an incoming folder is selected, any conflicting files within it will also be overwritten.", "msgstr": ["Nuair a roghnaítear fillteán isteach, déanfar aon chomhaid choimhlinteacha ann a athscríobh freisin."] }, { "msgid": "When an incoming folder is selected, the content is written into the existing folder and a recursive conflict resolution is performed.", "msgstr": ["Nuair a roghnaítear fillteán isteach, scríobhtar an t-ábhar isteach sa fhillteán atá ann cheana féin agus déantar réiteach coinbhleachta athchúrsach."] }, { "msgid": "Which files do you want to keep?", "msgstr": ["Cé na comhaid ar mhaith leat a choinneáil?"] }, { "msgid": "You are currently identified as {nickname}.", "msgstr": ["Is é {nickname} an ainm atá ort faoi láthair."] }, { "msgid": "You are currently not identified.", "msgstr": ["Níl aitheantas tugtha duit faoi láthair."] }, { "msgid": "You cannot leave the name empty.", "msgstr": ["Ní féidir leat an t-ainm a fhágáil folamh."] }, { "msgid": "You need to choose at least one conflict solution", "msgstr": ["Ní mór duit réiteach coinbhleachta amháin ar a laghad a roghnú"] }, { "msgid": "You need to select at least one version of each file to continue.", "msgstr": ["Ní mór duit leagan amháin ar a laghad de gach comhad a roghnú le leanúint ar aghaidh."] }] }, { "language": "gl", "translations": [{ "msgid": '"{char}" is not allowed inside a folder name.', "msgstr": ["«{char}» non está permitido no nome dun cartafol."] }, { "msgid": '"{char}" is not allowed inside a name.', "msgstr": ["«{char}» non está permitido dentro dun nome."] }, { "msgid": '"{extension}" is not an allowed name.', "msgstr": ["«{extension}» non é un nome permitido."] }, { "msgid": '"{segment}" is a reserved name and not allowed for folder names.', "msgstr": ["«{segment}» é un nome reservado e non está permitido para nomes de cartafoles."] }, { "msgid": '"{segment}" is a reserved name and not allowed.', "msgstr": ["«{segment}» é un nome reservado e non está permitido."] }, { "msgid": "%n file conflict", "msgid_plural": "%n files conflict", "msgstr": ["%n ficheiro en conflito", "%n ficheiros en conflito"] }, { "msgid": "%n file conflict in {dirname}", "msgid_plural": "%n file conflicts in {dirname}", "msgstr": ["%n ficheiro en conflito en {dirname}", "%n ficheiros en conflito en {dirname}"] }, { "msgid": "All files", "msgstr": ["Todos os ficheiros"] }, { "msgid": "Cancel", "msgstr": ["Cancelar"] }, { "msgid": "Cancel the entire operation", "msgstr": ["Cancelar toda a operación"] }, { "msgid": "Choose", "msgstr": ["Escoller"] }, { "msgid": "Choose {file}", "msgstr": ["Escoller {file}"] }, { "msgid": "Choose %n file", "msgid_plural": "Choose %n files", "msgstr": ["Escoller %n ficheiro", "Escoller %n ficheiros"] }, { "msgid": "Confirm", "msgstr": ["Confirmar"] }, { "msgid": "Continue", "msgstr": ["Continuar"] }, { "msgid": "Copy", "msgstr": ["Copiar"] }, { "msgid": "Copy to {target}", "msgstr": ["Copiar en  {target}"] }, { "msgid": "Could not create the new folder", "msgstr": ["Non foi posíbel crear o novo cartafol"] }, { "msgid": "Could not load files settings", "msgstr": ["Non foi posíbel cargar os axustes dos ficheiros"] }, { "msgid": "Could not load files views", "msgstr": ["Non foi posíbel cargar as vistas dos ficheiros"] }, { "msgid": "Create directory", "msgstr": ["Crear un directorio"] }, { "msgid": "Current view selector", "msgstr": ["Selector de vista actual"] }, { "msgid": "Enter your name", "msgstr": ["Introduza o seu nome"] }, { "msgid": "Existing version", "msgstr": ["Versión existente"] }, { "msgid": "Failed to set nickname.", "msgstr": ["Produciuse un fallo ao definir o alcume."] }, { "msgid": "Favorites", "msgstr": ["Favoritos"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["Os ficheiros e cartafoles que marque como favoritos aparecerán aquí."] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["Os ficheiros e cartafoles que modificou recentemente aparecerán aquí."] }, { "msgid": "Filter file list", "msgstr": ["Filtrar a lista de ficheiros"] }, { "msgid": 'Folder names must not end with "{extension}".', "msgstr": ["Os nomes de cartafol non deben rematar en «{extension}»."] }, { "msgid": "Guest identification", "msgstr": ["Identificación do convidado"] }, { "msgid": "Home", "msgstr": ["Inicio"] }, { "msgid": "If you select both versions, the incoming file will have a number added to its name.", "msgstr": ["Se selecciona ambas as versións, o ficheiro entrante terá un número engadido ao seu nome."] }, { "msgid": "Invalid folder name.", "msgstr": ["O nome de cartafol non é válido."] }, { "msgid": "Invalid name.", "msgstr": ["Nome incorrecto"] }, { "msgid": "Last modified date unknown", "msgstr": ["Data da última modificación descoñecida"] }, { "msgid": "Modified", "msgstr": ["Modificado"] }, { "msgid": "Move", "msgstr": ["Mover"] }, { "msgid": "Move to {target}", "msgstr": ["Mover cara a {target}"] }, { "msgid": "Name", "msgstr": ["Nome"] }, { "msgid": "Names may be at most 64 characters long.", "msgstr": ["Os nomes poden ter unha lonxitude máxima de 64 caracteres."] }, { "msgid": "Names must not be empty.", "msgstr": ["Os nomes non deben estar baleiros."] }, { "msgid": 'Names must not end with "{extension}".', "msgstr": ["Os nomes non deben rematar en «{extension}»."] }, { "msgid": "Names must not start with a dot.", "msgstr": ["Os nomes non deben comezar cun punto."] }, { "msgid": "New", "msgstr": ["Novo"] }, { "msgid": "New folder", "msgstr": ["Novo cartafol"] }, { "msgid": "New folder name", "msgstr": ["Novo nome do cartafol"] }, { "msgid": "New version", "msgstr": ["Nova versión"] }, { "msgid": "No files in here", "msgstr": ["Aquí non hai ficheiros"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["Non se atopou ningún ficheiro que coincida co filtro."] }, { "msgid": "No matching files", "msgstr": ["Non hai ficheiros coincidentes"] }, { "msgid": "Please enter a name with at least 2 characters.", "msgstr": ["Introduza un nome con polo menos 2 caracteres."] }, { "msgid": "Recent", "msgstr": ["Recente"] }, { "msgid": "Select all checkboxes", "msgstr": ["Seleccionar todas as caixas"] }, { "msgid": "Select all entries", "msgstr": ["Seleccionar todas as entradas"] }, { "msgid": "Select all existing files", "msgstr": ["Seleccionar todos os ficheiros existentes"] }, { "msgid": "Select all new files", "msgstr": ["Seleccionar todos os ficheiros novos"] }, { "msgid": "Select entry", "msgstr": ["Seleccionar a entrada"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["Seleccionar a fila para {nodename}"] }, { "msgid": "Size", "msgstr": ["Tamaño"] }, { "msgid": "Skip %n file", "msgid_plural": "Skip %n files", "msgstr": ["Omitir %n ficheiro", "Omitir %n ficheiros"] }, { "msgid": "Skip this file", "msgstr": ["Omitir este ficheiro"] }, { "msgid": "Submit name", "msgstr": ["Enviar o nome"] }, { "msgid": "Undo", "msgstr": ["Desfacer"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["Enviar algún contido ou sincronizalo cos seus dispositivos!"] }, { "msgid": "When an incoming folder is selected, any conflicting files within it will also be overwritten.", "msgstr": ["Cando se selecciona un cartafol entrante, todos os ficheiros conflitivos dentro dela tamén serán sobrescritos."] }, { "msgid": "When an incoming folder is selected, the content is written into the existing folder and a recursive conflict resolution is performed.", "msgstr": ["Cando se selecciona un cartafol entrante, o contido escríbese no cartafol existente e realízase unha resolución recursiva de conflitos."] }, { "msgid": "Which files do you want to keep?", "msgstr": ["Que ficheiros quere conservar?"] }, { "msgid": "You are currently identified as {nickname}.", "msgstr": ["Vde. está identificado actualmente como {nickname}."] }, { "msgid": "You are currently not identified.", "msgstr": ["Vde. non está identificado actualmente."] }, { "msgid": "You cannot leave the name empty.", "msgstr": ["Vde. non pode deixar o nome baleiro."] }, { "msgid": "You need to choose at least one conflict solution", "msgstr": ["É necesario escoller polo menos unha solución de conflito"] }, { "msgid": "You need to select at least one version of each file to continue.", "msgstr": ["É necesario seleccionar polo menos unha versión de cada ficheiro para continuar."] }] }, { "language": "hr", "translations": [{ "msgid": '"{char}" is not allowed inside a folder name.', "msgstr": ["Znak „{char}” nije dopušten u nazivu mape."] }, { "msgid": '"{char}" is not allowed inside a name.', "msgstr": ["Znak „{char}” nije dopušten u nazivu."] }, { "msgid": '"{extension}" is not an allowed name.', "msgstr": ['"{extension}" nije dopušten u nazivu.'] }, { "msgid": '"{segment}" is a reserved name and not allowed for folder names.', "msgstr": ['"{segment}" je rezervirana riječ i nije dopušten u nazivu mape.'] }, { "msgid": '"{segment}" is a reserved name and not allowed.', "msgstr": ['"{segment}" je rezervirana riječ i nije dopušten.'] }, { "msgid": "%n file conflict", "msgid_plural": "%n files conflict", "msgstr": ["Sukobljava se %n datoteka", "Sukobljava se %n datoteke", "Sukobljava se %n datoteke"] }, { "msgid": "%n file conflict in {dirname}", "msgid_plural": "%n file conflicts in {dirname}", "msgstr": ["%n sukob datoteka u {dirname}", "%n sukoba datoteka u {dirname}", "%n sukoba datoteka u {dirname}"] }, { "msgid": "All files", "msgstr": ["Sve datoteke"] }, { "msgid": "Cancel", "msgstr": ["Odustani"] }, { "msgid": "Cancel the entire operation", "msgstr": ["Odustani od cijele operacije"] }, { "msgid": "Choose", "msgstr": ["Odaberi"] }, { "msgid": "Choose {file}", "msgstr": ["Odaberi {file}"] }, { "msgid": "Choose %n file", "msgid_plural": "Choose %n files", "msgstr": ["Odaberi %n datoteku", "Odaberi %n datoteka", "Odaberi %n datoteke"] }, { "msgid": "Confirm", "msgstr": ["Potvrdi"] }, { "msgid": "Continue", "msgstr": ["Nastavi"] }, { "msgid": "Copy", "msgstr": ["Kopiraj"] }, { "msgid": "Copy to {target}", "msgstr": ["Kopiraj u {target}"] }, { "msgid": "Could not create the new folder", "msgstr": ["Nije moguće stvoriti novu mapu"] }, { "msgid": "Could not load files settings", "msgstr": ["Nije moguće učitati postavke datoteka"] }, { "msgid": "Could not load files views", "msgstr": ["Nije moguće učitati prikaze datoteka"] }, { "msgid": "Create directory", "msgstr": ["Stvori mapu"] }, { "msgid": "Current view selector", "msgstr": ["Odabir trenutačnog prikaza"] }, { "msgid": "Enter your name", "msgstr": ["Unesite vaše ime"] }, { "msgid": "Existing version", "msgstr": ["Postojeća verzija"] }, { "msgid": "Failed to set nickname.", "msgstr": ["Neuspjelo postavljanje nadimka."] }, { "msgid": "Favorites", "msgstr": ["Favoriti"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["Ovdje se prikazuju datoteke i mape koje ste označili kao favoriti."] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["Ovdje se prikazuju datoteke i mape koje ste nedavno ažurirali."] }, { "msgid": "Filter file list", "msgstr": ["Filtriranje liste datoteka"] }, { "msgid": 'Folder names must not end with "{extension}".', "msgstr": ['Nazivi mapa ne smiju završiti sa "{extension}".'] }, { "msgid": "Guest identification", "msgstr": ["Identifikacija gosta"] }, { "msgid": "Home", "msgstr": ["Naslovna"] }, { "msgid": "If you select both versions, the incoming file will have a number added to its name.", "msgstr": ["Ako odaberete obje verzije, dolaznoj datoteci bit će dodan broj u nazivu."] }, { "msgid": "Invalid folder name.", "msgstr": ["Neispavan naziv mape."] }, { "msgid": "Invalid name.", "msgstr": ["Neispravan naziv."] }, { "msgid": "Last modified date unknown", "msgstr": ["Nepoznat datum zadnjeg ažuriranja"] }, { "msgid": "Modified", "msgstr": ["Ažurirano"] }, { "msgid": "Move", "msgstr": ["Premjesti"] }, { "msgid": "Move to {target}", "msgstr": ["Premjesti u {target}"] }, { "msgid": "Name", "msgstr": ["Naziv"] }, { "msgid": "Names may be at most 64 characters long.", "msgstr": ["Nazivi mogu imati najviše 64 znaka."] }, { "msgid": "Names must not be empty.", "msgstr": ["Nazivi ne smiju biti prazni."] }, { "msgid": 'Names must not end with "{extension}".', "msgstr": ['Nazivi ne smiju završiti sa "{extension}".'] }, { "msgid": "Names must not start with a dot.", "msgstr": ["Nazivi ne smiju započinjati točkom."] }, { "msgid": "New", "msgstr": ["Novo"] }, { "msgid": "New folder", "msgstr": ["Nova mapa"] }, { "msgid": "New folder name", "msgstr": ["Novi naziv mape"] }, { "msgid": "New version", "msgstr": ["Nova verzija"] }, { "msgid": "No files in here", "msgstr": ["Ovdje nema datoteka"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["Nisu pronađene datoteke koje odgovaraju vašem filtru."] }, { "msgid": "No matching files", "msgstr": ["Nema odgovarajućih datoteka."] }, { "msgid": "Please enter a name with at least 2 characters.", "msgstr": ["Unesite naziv s najmanje 2 znaka."] }, { "msgid": "Recent", "msgstr": ["Nedavno"] }, { "msgid": "Select all checkboxes", "msgstr": ["Označi sve potvrdne okvire"] }, { "msgid": "Select all entries", "msgstr": ["Označi sve stavke"] }, { "msgid": "Select all existing files", "msgstr": ["Označi sve postojeće datoteke"] }, { "msgid": "Select all new files", "msgstr": ["Označi sve nove datoteke"] }, { "msgid": "Select entry", "msgstr": ["Označi stavku"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["Označi red za{nodename}"] }, { "msgid": "Size", "msgstr": ["Veličina"] }, { "msgid": "Skip %n file", "msgid_plural": "Skip %n files", "msgstr": ["Preskoči %n datoteku", "Preskoči %n datoteke", "Preskoči %n datoteke"] }, { "msgid": "Skip this file", "msgstr": ["Preskoči ovu datoteku"] }, { "msgid": "Submit name", "msgstr": ["Pošalji naziv"] }, { "msgid": "Undo", "msgstr": ["Poništi"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["Prenesite neki sadržaj ili sinkronizirajte sa svojim uređajima!"] }, { "msgid": "When an incoming folder is selected, any conflicting files within it will also be overwritten.", "msgstr": ["Kada je odabrana dolazna mapa, sve datoteke unutar nje koje su u sukobu također će biti prepisane."] }, { "msgid": "When an incoming folder is selected, the content is written into the existing folder and a recursive conflict resolution is performed.", "msgstr": ["Kada je odabrana dolazna mapa, sadržaj se upisuje u postojeću mapu i provodi se rekurzivno rješavanje sukoba."] }, { "msgid": "Which files do you want to keep?", "msgstr": ["Koje datoteke želite zadržati?"] }, { "msgid": "You are currently identified as {nickname}.", "msgstr": ["Trenutno ste identificirani kao {nickname}."] }, { "msgid": "You are currently not identified.", "msgstr": ["Trenutno niste identificirani."] }, { "msgid": "You cannot leave the name empty.", "msgstr": ["Ne možete ostaviti naziv prazan."] }, { "msgid": "You need to choose at least one conflict solution", "msgstr": ["Morate odabrati barem jedno rješenje sukoba"] }, { "msgid": "You need to select at least one version of each file to continue.", "msgstr": ["Morate odabrati barem jednu verziju svake datoteke kako biste nastavili."] }] }, { "language": "hu_HU", "translations": [{ "msgid": '"{char}" is not allowed inside a folder name.', "msgstr": ["A(z) „{char}” nem engedélyezett egy mappanévben."] }, { "msgid": '"{char}" is not allowed inside a name.', "msgstr": ["A(z) „{char}” nem engedélyezett egy névben."] }, { "msgid": '"{extension}" is not an allowed name.', "msgstr": ["A(z) „{extension}” nem engedélyezett név."] }, { "msgid": '"{segment}" is a reserved name and not allowed for folder names.', "msgstr": ["A(z) „{segment}” foglalt név, és nem engedélyezett a mappanevekben."] }, { "msgid": '"{segment}" is a reserved name and not allowed.', "msgstr": ["A(z) „{segment}” foglalt név, és nem engedélyezett."] }, { "msgid": "%n file conflict", "msgid_plural": "%n files conflict", "msgstr": ["%n ütköző fájl", "%n ütköző fájl"] }, { "msgid": "%n file conflict in {dirname}", "msgid_plural": "%n file conflicts in {dirname}", "msgstr": ["%n ütköző fájl ebben: {dirname}", "%n ütköző fájl ebben: {dirname}"] }, { "msgid": "All files", "msgstr": ["Összes fájl"] }, { "msgid": "Cancel", "msgstr": ["Mégse"] }, { "msgid": "Cancel the entire operation", "msgstr": ["Egész művelet megszakítása"] }, { "msgid": "Choose", "msgstr": ["Kiválasztás"] }, { "msgid": "Choose {file}", "msgstr": ["{file} kiválasztása"] }, { "msgid": "Choose %n file", "msgid_plural": "Choose %n files", "msgstr": ["%n fájl kiválasztása", "%n fájl kiválasztása"] }, { "msgid": "Confirm", "msgstr": ["Megerősítés"] }, { "msgid": "Continue", "msgstr": ["Folytatás"] }, { "msgid": "Copy", "msgstr": ["Másolás"] }, { "msgid": "Copy to {target}", "msgstr": ["Másolás ide: {target}"] }, { "msgid": "Could not create the new folder", "msgstr": ["Nem lehet létrehozni az új mappát"] }, { "msgid": "Could not load files settings", "msgstr": ["Nem lehet betölteni a fájlok beállításait"] }, { "msgid": "Could not load files views", "msgstr": ["Nem lehet betölteni a fájlok nézeteit"] }, { "msgid": "Create directory", "msgstr": ["Mappa létrehozása"] }, { "msgid": "Current view selector", "msgstr": ["Jelenlegi nézet választója"] }, { "msgid": "Enter your name", "msgstr": ["Adja meg a nevét"] }, { "msgid": "Existing version", "msgstr": ["Meglévő verzió"] }, { "msgid": "Failed to set nickname.", "msgstr": ["Nem sikerült a becenév beállítása."] }, { "msgid": "Favorites", "msgstr": ["Kedvencek"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["A kedvencként megjelölt fájlok és mappák itt jelennek meg."] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["A nemrég módosított fájlok és mappák itt jelennek meg."] }, { "msgid": "Filter file list", "msgstr": ["Fájllista szűrése"] }, { "msgid": 'Folder names must not end with "{extension}".', "msgstr": ["A mappanevek nem végződhetnek ezzel: „{extension}”."] }, { "msgid": "Guest identification", "msgstr": ["Vendégazonosítás"] }, { "msgid": "Home", "msgstr": ["Kezdőlap"] }, { "msgid": "If you select both versions, the incoming file will have a number added to its name.", "msgstr": ["Ha mindkét verziót választja, akkor a bejövő fájl nevéhez egy szám lesz hozzáfűzve."] }, { "msgid": "Invalid folder name.", "msgstr": ["Érvénytelen mappanév."] }, { "msgid": "Invalid name.", "msgstr": ["Érvénytelen név."] }, { "msgid": "Last modified date unknown", "msgstr": ["Legutóbbi módosítás ideje ismeretlen"] }, { "msgid": "Modified", "msgstr": ["Módosítva"] }, { "msgid": "Move", "msgstr": ["Áthelyezés"] }, { "msgid": "Move to {target}", "msgstr": ["Áthelyezés ide: {target}"] }, { "msgid": "Name", "msgstr": ["Név"] }, { "msgid": "Names may be at most 64 characters long.", "msgstr": ["A nevek legfeljebb 64 karakter hosszúak lehetnek."] }, { "msgid": "Names must not be empty.", "msgstr": ["A nevek nem lehetnek üresek."] }, { "msgid": 'Names must not end with "{extension}".', "msgstr": ["A nevek nem végződhetnek ezzel: „{extension}”."] }, { "msgid": "Names must not start with a dot.", "msgstr": ["A nevek nem kezdődhetnek ponttal."] }, { "msgid": "New", "msgstr": ["Új"] }, { "msgid": "New folder", "msgstr": ["Új mappa"] }, { "msgid": "New folder name", "msgstr": ["Új mappa neve"] }, { "msgid": "New version", "msgstr": ["Új verzió"] }, { "msgid": "No files in here", "msgstr": ["Itt nincsenek fájlok"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["Nincs a szűrési feltételeknek megfelelő fájl."] }, { "msgid": "No matching files", "msgstr": ["Nincs ilyen fájl"] }, { "msgid": "Please enter a name with at least 2 characters.", "msgstr": ["Legalább 2 karakteres nevet adjon meg."] }, { "msgid": "Recent", "msgstr": ["Legutóbbi"] }, { "msgid": "Select all checkboxes", "msgstr": ["Összes jelölőmező bepipálása"] }, { "msgid": "Select all entries", "msgstr": ["Összes bejegyzés kijelölése"] }, { "msgid": "Select all existing files", "msgstr": ["Összes meglévő fájl kijelölése"] }, { "msgid": "Select all new files", "msgstr": ["Összes új fájl kijelölése"] }, { "msgid": "Select entry", "msgstr": ["Bejegyzés kijelölése"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["Válasszon sort a következőnek: {nodename}"] }, { "msgid": "Size", "msgstr": ["Méret"] }, { "msgid": "Skip %n file", "msgid_plural": "Skip %n files", "msgstr": ["%n fájl kihagyása", "%n fájl kihagyása"] }, { "msgid": "Skip this file", "msgstr": ["Fájl kihagyása"] }, { "msgid": "Submit name", "msgstr": ["Név beküldése"] }, { "msgid": "Undo", "msgstr": ["Visszavonás"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["Töltsön fel tartalmat, vagy szinkronizáljon az eszközeivel!"] }, { "msgid": "When an incoming folder is selected, any conflicting files within it will also be overwritten.", "msgstr": ["Ha egy bejövő mappa van kijelölve, akkor a benne lévő ütköző fájlok is felül lesznek írva."] }, { "msgid": "When an incoming folder is selected, the content is written into the existing folder and a recursive conflict resolution is performed.", "msgstr": ["Ha egy bejövő mappa van kijelölve, akkor a tartalom a meglévő mappába lesz írva, és rekurzív ütközéskezelés lesz végezve."] }, { "msgid": "Which files do you want to keep?", "msgstr": ["Mely fájlokat akarja megtartani?"] }, { "msgid": "You are currently identified as {nickname}.", "msgstr": ["Jelenleg ekként van azonosítva: {nickname}."] }, { "msgid": "You are currently not identified.", "msgstr": ["Jelenleg nincs azonosítva."] }, { "msgid": "You cannot leave the name empty.", "msgstr": ["A nevet nem hagyhatja üresen."] }, { "msgid": "You need to choose at least one conflict solution", "msgstr": ["Legalább egy ütközéskezelési megoldást kell választania"] }, { "msgid": "You need to select at least one version of each file to continue.", "msgstr": ["A folytatáshoz az összes fájlnak legalább egy verzióját ki kell választania."] }] }, { "language": "hy", "translations": [{ "msgid": '"{name}" is an invalid folder name.', "msgstr": ["{name} սխալ թղթապանակի անվանում է"] }, { "msgid": '"{name}" is not an allowed folder name', "msgstr": ["{name} համարվում է անթույլատրելի թղթապանակի անվանում"] }, { "msgid": '"/" is not allowed inside a folder name.', "msgstr": ["/ չի թույլատրվում օգտագործել անվանման մեջ"] }, { "msgid": "All files", "msgstr": ["Բոլոր ֆայլերը"] }, { "msgid": "Choose", "msgstr": ["Ընտրել"] }, { "msgid": "Choose {file}", "msgstr": ["Ընտրել {file}"] }, { "msgid": "Choose %n file", "msgid_plural": "Choose %n files", "msgstr": ["Ընտրել %n ֆայլ", "Ընտրել %n ֆայլեր"] }, { "msgid": "Copy", "msgstr": ["Պատճենել"] }, { "msgid": "Copy to {target}", "msgstr": ["Պատճենել {target}"] }, { "msgid": "Could not create the new folder", "msgstr": ["Չստացվեց ստեղծել նոր թղթապանակը"] }, { "msgid": "Could not load files settings", "msgstr": ["Չստացվեց բեռնել ֆայլի կարգավորումները"] }, { "msgid": "Could not load files views", "msgstr": ["Չստացվեց բեռնել ֆայլերի դիտումները"] }, { "msgid": "Create directory", "msgstr": ["Ստեղծել դիրեկտորիա"] }, { "msgid": "Current view selector", "msgstr": ["Ընթացիկ դիտման ընտրիչ"] }, { "msgid": "Favorites", "msgstr": ["Նախընտրելիներ"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["Այստեղ կցուցադրվեն այն ֆայլերն ու պանակները, որոնք դուք նշել եք որպես նախընտրելիներ:"] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["Այստեղ կցուցադրվեն այն ֆայլերն ու պանակները, որոնք վերջերս փոխել եք:"] }, { "msgid": "Filter file list", "msgstr": ["Ֆիլտրել ֆայլերի ցուցակը"] }, { "msgid": "Folder name cannot be empty.", "msgstr": ["Թղթապանակի անունը չի կարող դատարկ լինել:"] }, { "msgid": "Home", "msgstr": ["Սկիզբ"] }, { "msgid": "Modified", "msgstr": ["Փոփոխված"] }, { "msgid": "Move", "msgstr": ["Տեղափոխել"] }, { "msgid": "Move to {target}", "msgstr": ["Տեղափոխել {target}"] }, { "msgid": "Name", "msgstr": ["Անուն"] }, { "msgid": "New", "msgstr": ["Նոր"] }, { "msgid": "New folder", "msgstr": ["Նոր թղթապանակ"] }, { "msgid": "New folder name", "msgstr": ["Նոր թղթապանակի անվանում"] }, { "msgid": "No files in here", "msgstr": ["Այստեղ չկան ֆայլեր"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["Ձեր ֆիլտրին համապատասխանող ֆայլերը չեն գտնվել:"] }, { "msgid": "No matching files", "msgstr": ["Չկան համապատասխան ֆայլեր"] }, { "msgid": "Recent", "msgstr": ["Վերջին"] }, { "msgid": "Select all entries", "msgstr": ["Ընտրել բոլոր գրառումները"] }, { "msgid": "Select entry", "msgstr": ["Ընտրել բոլոր գրառումը"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["Ընտրեք տողը {nodename}-ի համար "] }, { "msgid": "Size", "msgstr": ["Չափ"] }, { "msgid": "Undo", "msgstr": ["Ետարկել"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["Ներբեռնեք որոշ բովանդակություն կամ համաժամացրեք այն ձեր սարքերի հետ:"] }] }, { "language": "id", "translations": [{ "msgid": '"{char}" is not allowed inside a folder name.', "msgstr": ['"{char}" tidak diizinkan di dalam nama folder.'] }, { "msgid": '"{char}" is not allowed inside a name.', "msgstr": ['"{char}" tidak diizinkan di dalam nama.'] }, { "msgid": '"{extension}" is not an allowed name.', "msgstr": ['"{extension}" bukan nama yang diizinkan.'] }, { "msgid": '"{segment}" is a reserved name and not allowed for folder names.', "msgstr": ['"{segment}" adalah nama yang dicadangkan dan tidak diizinkan untuk nama folder.'] }, { "msgid": '"{segment}" is a reserved name and not allowed.', "msgstr": ['"{segment}" adalah nama yang dicadangkan dan tidak diizinkan.'] }, { "msgid": "%n file conflict", "msgid_plural": "%n files conflict", "msgstr": ["%n konflik file"] }, { "msgid": "%n file conflict in {dirname}", "msgid_plural": "%n file conflicts in {dirname}", "msgstr": ["%n konflik file di {dirname}"] }, { "msgid": "All files", "msgstr": ["Semua berkas"] }, { "msgid": "Cancel", "msgstr": ["Batal"] }, { "msgid": "Cancel the entire operation", "msgstr": ["Batalkan seluruh operasi"] }, { "msgid": "Choose", "msgstr": ["Pilih"] }, { "msgid": "Choose {file}", "msgstr": ["Pilih {file}"] }, { "msgid": "Choose %n file", "msgid_plural": "Choose %n files", "msgstr": ["Pilih %n file"] }, { "msgid": "Confirm", "msgstr": ["Konfirmasi"] }, { "msgid": "Continue", "msgstr": ["Lanjutkan"] }, { "msgid": "Copy", "msgstr": ["Salin"] }, { "msgid": "Copy to {target}", "msgstr": ["Salin ke {target}"] }, { "msgid": "Could not create the new folder", "msgstr": ["Tidak dapat membuat folder baru"] }, { "msgid": "Could not load files settings", "msgstr": ["Tidak dapat memuat pengaturan file"] }, { "msgid": "Could not load files views", "msgstr": ["Tidak dapat memuat tampilan file"] }, { "msgid": "Create directory", "msgstr": ["Buat direktori"] }, { "msgid": "Current view selector", "msgstr": ["Pemilih tampilan saat ini"] }, { "msgid": "Enter your name", "msgstr": ["Masukkan nama Anda"] }, { "msgid": "Existing version", "msgstr": ["Versi yang ada"] }, { "msgid": "Failed to set nickname.", "msgstr": ["Gagal menetapkan nama panggilan."] }, { "msgid": "Favorites", "msgstr": ["Favorit"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["Berkas dan folder yang Anda tandai sebagai favorit akan muncul di sini."] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["Berkas dan folder yang Anda ubah baru-baru ini akan muncul di sini."] }, { "msgid": "Filter file list", "msgstr": ["Saring daftar berkas"] }, { "msgid": 'Folder names must not end with "{extension}".', "msgstr": ['Nama folder tidak boleh diakhiri dengan "{extension}".'] }, { "msgid": "Guest identification", "msgstr": ["Identifikasi tamu"] }, { "msgid": "Home", "msgstr": ["Beranda"] }, { "msgid": "If you select both versions, the incoming file will have a number added to its name.", "msgstr": ["Jika Anda memilih kedua versi, file yang masuk akan ditambahkan angka pada namanya."] }, { "msgid": "Invalid folder name.", "msgstr": ["Nama folder tidak valid."] }, { "msgid": "Invalid name.", "msgstr": ["Nama tidak valid."] }, { "msgid": "Last modified date unknown", "msgstr": ["Tanggal modifikasi terakhir tidak diketahui"] }, { "msgid": "Modified", "msgstr": ["Diubah"] }, { "msgid": "Move", "msgstr": ["Pindahkan"] }, { "msgid": "Move to {target}", "msgstr": ["Pindahkan ke {target}"] }, { "msgid": "Name", "msgstr": ["Nama"] }, { "msgid": "Names may be at most 64 characters long.", "msgstr": ["Panjang nama maksimal 64 karakter."] }, { "msgid": "Names must not be empty.", "msgstr": ["Nama tidak boleh kosong."] }, { "msgid": 'Names must not end with "{extension}".', "msgstr": ['Nama tidak boleh diakhiri dengan "{extension}".'] }, { "msgid": "Names must not start with a dot.", "msgstr": ["Nama tidak boleh diawali dengan titik."] }, { "msgid": "New", "msgstr": ["Baru"] }, { "msgid": "New folder", "msgstr": ["Folder baru"] }, { "msgid": "New folder name", "msgstr": ["Nama folder baru"] }, { "msgid": "New version", "msgstr": ["Versi baru"] }, { "msgid": "No files in here", "msgstr": ["Tidak ada berkas di sini"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["Tidak ada berkas yang cocok dengan penyaringan Anda."] }, { "msgid": "No matching files", "msgstr": ["Tidak ada berkas yang cocok"] }, { "msgid": "Please enter a name with at least 2 characters.", "msgstr": ["Silakan masukkan nama dengan minimal 2 karakter."] }, { "msgid": "Recent", "msgstr": ["Terkini"] }, { "msgid": "Select all checkboxes", "msgstr": ["Pilih semua kotak centang"] }, { "msgid": "Select all entries", "msgstr": ["Pilih semua entri"] }, { "msgid": "Select all existing files", "msgstr": ["Pilih semua file yang ada"] }, { "msgid": "Select all new files", "msgstr": ["Pilih semua file baru"] }, { "msgid": "Select entry", "msgstr": ["Pilih entri"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["Pilih baris untuk {nodename}"] }, { "msgid": "Size", "msgstr": ["Ukuran"] }, { "msgid": "Skip %n file", "msgid_plural": "Skip %n files", "msgstr": ["Lewati %n file"] }, { "msgid": "Skip this file", "msgstr": ["Lewati file ini"] }, { "msgid": "Submit name", "msgstr": ["Kirim nama"] }, { "msgid": "Undo", "msgstr": ["Tidak jadi"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["Unggah beberapa konten atau sinkronkan dengan perangkat Anda!"] }, { "msgid": "When an incoming folder is selected, any conflicting files within it will also be overwritten.", "msgstr": ["Saat folder yang masuk dipilih, semua file yang konflik di dalamnya juga akan ditimpa."] }, { "msgid": "When an incoming folder is selected, the content is written into the existing folder and a recursive conflict resolution is performed.", "msgstr": ["Saat folder yang masuk dipilih, konten ditulis ke dalam folder yang ada dan penyelesaian konflik rekursif dilakukan."] }, { "msgid": "Which files do you want to keep?", "msgstr": ["File mana yang ingin Anda pertahankan?"] }, { "msgid": "You are currently identified as {nickname}.", "msgstr": ["Saat ini Anda teridentifikasi sebagai {nickname}."] }, { "msgid": "You are currently not identified.", "msgstr": ["Saat ini Anda tidak teridentifikasi."] }, { "msgid": "You cannot leave the name empty.", "msgstr": ["Anda tidak dapat membiarkan nama kosong."] }, { "msgid": "You need to choose at least one conflict solution", "msgstr": ["Anda perlu memilih setidaknya satu solusi konflik"] }, { "msgid": "You need to select at least one version of each file to continue.", "msgstr": ["Anda perlu memilih setidaknya satu versi dari setiap file untuk melanjutkan."] }] }, { "language": "is", "translations": [{ "msgid": '"{name}" is an invalid folder name.', "msgstr": ['"{name}" er ógilt möppuheiti.'] }, { "msgid": '"{name}" is not an allowed folder name', "msgstr": ['"{name}" er ekki leyfilegt möppuheiti'] }, { "msgid": '"/" is not allowed inside a folder name.', "msgstr": ['"/" er er ekki leyfilegt innan í skráarheiti.'] }, { "msgid": "All files", "msgstr": ["Allar skrár"] }, { "msgid": "Choose", "msgstr": ["Veldu"] }, { "msgid": "Choose {file}", "msgstr": ["Veldu {file}"] }, { "msgid": "Choose %n file", "msgid_plural": "Choose %n files", "msgstr": ["Veldu %n skrá", "Veldu %n skrár"] }, { "msgid": "Copy", "msgstr": ["Afrita"] }, { "msgid": "Copy to {target}", "msgstr": ["Afrita í {target}"] }, { "msgid": "Could not create the new folder", "msgstr": ["Get ekki búið til nýju möppuna"] }, { "msgid": "Could not load files settings", "msgstr": ["Tókst ekki að hlaða inn stillingum skráa"] }, { "msgid": "Could not load files views", "msgstr": ["Tókst ekki að hlaða inn sýnum skráa"] }, { "msgid": "Create directory", "msgstr": ["Búa til möppu"] }, { "msgid": "Current view selector", "msgstr": ["Núverandi val sýnar"] }, { "msgid": "Favorites", "msgstr": ["Eftirlæti"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["Skrár og möppur sem þú merkir sem eftirlæti birtast hér."] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["Skrár og möppur sem þú breyttir nýlega birtast hér."] }, { "msgid": "Filter file list", "msgstr": ["Sía skráalista"] }, { "msgid": "Folder name cannot be empty.", "msgstr": ["Möppuheiti má ekki vera tómt."] }, { "msgid": "Home", "msgstr": ["Heim"] }, { "msgid": "Modified", "msgstr": ["Breytt"] }, { "msgid": "Move", "msgstr": ["Færa"] }, { "msgid": "Move to {target}", "msgstr": ["Færa í {target}"] }, { "msgid": "Name", "msgstr": ["Heiti"] }, { "msgid": "New", "msgstr": ["Nýtt"] }, { "msgid": "New folder", "msgstr": ["Ný mappa"] }, { "msgid": "New folder name", "msgstr": ["Heiti nýrrar möppu"] }, { "msgid": "No files in here", "msgstr": ["Engar skrár hér"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["Engar skrár fundust sem passa við síuna."] }, { "msgid": "No matching files", "msgstr": ["Engar samsvarandi skrár"] }, { "msgid": "Recent", "msgstr": ["Nýlegt"] }, { "msgid": "Select all entries", "msgstr": ["Velja allar færslur"] }, { "msgid": "Select entry", "msgstr": ["Velja færslu"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["Veldu röðina fyrir {nodename}"] }, { "msgid": "Size", "msgstr": ["Stærð"] }, { "msgid": "Undo", "msgstr": ["Afturkalla"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["Sendu inn eitthvað efni eða samstilltu við tækin þín!"] }] }, { "language": "it", "translations": [{ "msgid": '"{char}" is not allowed inside a folder name.', "msgstr": [`"{char}" non è consentito all'interno di un nome di cartella.`] }, { "msgid": '"{char}" is not allowed inside a name.', "msgstr": [`"{char}" non è consentito all'interno di un nome.`] }, { "msgid": '"{extension}" is not an allowed name.', "msgstr": ['"{extension}"  non è un nome consentito'] }, { "msgid": '"{segment}" is a reserved name and not allowed for folder names.', "msgstr": ['"{segment}"  è un nome riservato e non consentito per i nomi delle cartelle.'] }, { "msgid": '"{segment}" is a reserved name and not allowed.', "msgstr": ['"{segment}"  è un nome riservato e non consentito.'] }, { "msgid": "%n file conflict", "msgid_plural": "%n files conflict", "msgstr": ["%n file in conflitto", "%n file in conflitto", "%n file in conflitto"] }, { "msgid": "%n file conflict in {dirname}", "msgid_plural": "%n file conflicts in {dirname}", "msgstr": ["%n file in conflitto in {dirname}", "%n file in conflitto in {dirname}", "%n file in conflitto in {dirname}"] }, { "msgid": "All files", "msgstr": ["Tutti i file"] }, { "msgid": "Cancel", "msgstr": ["Annulla"] }, { "msgid": "Cancel the entire operation", "msgstr": ["Annulla l'intera operazione"] }, { "msgid": "Choose", "msgstr": ["Scegli"] }, { "msgid": "Choose {file}", "msgstr": ["Scegli {file}"] }, { "msgid": "Choose %n file", "msgid_plural": "Choose %n files", "msgstr": ["Scegli %n file", "Scegli %n file", "Scegli %n file"] }, { "msgid": "Confirm", "msgstr": ["Conferma"] }, { "msgid": "Continue", "msgstr": ["Continua"] }, { "msgid": "Copy", "msgstr": ["Copia"] }, { "msgid": "Copy to {target}", "msgstr": ["Copia in {target}"] }, { "msgid": "Could not create the new folder", "msgstr": ["Impossibile creare la nuova cartella"] }, { "msgid": "Could not load files settings", "msgstr": ["Impossibile caricare le impostazioni dei file"] }, { "msgid": "Could not load files views", "msgstr": ["Impossibile caricare le visualizzazioni dei file"] }, { "msgid": "Create directory", "msgstr": ["Crea cartella"] }, { "msgid": "Current view selector", "msgstr": ["Selettore della vista attuale"] }, { "msgid": "Enter your name", "msgstr": ["Inserisci il tuo nome"] }, { "msgid": "Existing version", "msgstr": ["Versione esistente"] }, { "msgid": "Failed to set nickname.", "msgstr": ["Impossibile impostare lo pseudonimo."] }, { "msgid": "Favorites", "msgstr": ["Preferiti"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["I file e le cartelle contrassegnate come preferite saranno mostrate qui."] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["I file e le cartelle che hai modificato di recente saranno mostrate qui."] }, { "msgid": "Filter file list", "msgstr": ["Filtra l'elenco dei file"] }, { "msgid": 'Folder names must not end with "{extension}".', "msgstr": ['I nomi delle cartelle devono finire con "{extension}".'] }, { "msgid": "Guest identification", "msgstr": ["Identificazione ospiti"] }, { "msgid": "Home", "msgstr": ["Home"] }, { "msgid": "If you select both versions, the incoming file will have a number added to its name.", "msgstr": ["Se selezioni entrambe le versioni, al nome del file in arrivo verrà aggiunto un numero."] }, { "msgid": "Invalid folder name.", "msgstr": ["Nome cartella non valido."] }, { "msgid": "Invalid name.", "msgstr": ["Nome non valido."] }, { "msgid": "Last modified date unknown", "msgstr": ["Data di ultima modifica sconosciuta"] }, { "msgid": "Modified", "msgstr": ["Modificato"] }, { "msgid": "Move", "msgstr": ["Sposta"] }, { "msgid": "Move to {target}", "msgstr": ["Sposta in {target}"] }, { "msgid": "Name", "msgstr": ["Nome"] }, { "msgid": "Names may be at most 64 characters long.", "msgstr": ["I nomi dovrebbero avere una lunghezza massima di 64 caratteri."] }, { "msgid": "Names must not be empty.", "msgstr": ["I nomi non devono essere vuoti."] }, { "msgid": 'Names must not end with "{extension}".', "msgstr": ['I nomi devono finire con "{extension}".'] }, { "msgid": "Names must not start with a dot.", "msgstr": ["I nomi non possono iniziare con un punto."] }, { "msgid": "New", "msgstr": ["Nuovo"] }, { "msgid": "New folder", "msgstr": ["Nuova cartella"] }, { "msgid": "New folder name", "msgstr": ["Nome della nuova cartella"] }, { "msgid": "New version", "msgstr": ["Nuova versione"] }, { "msgid": "No files in here", "msgstr": ["Nessun file qui"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["Nessun file che corrisponde al tuo filtro è stato trovato."] }, { "msgid": "No matching files", "msgstr": ["Nessun file corrispondente"] }, { "msgid": "Please enter a name with at least 2 characters.", "msgstr": ["Digita un nome con almeno 2 caratteri."] }, { "msgid": "Recent", "msgstr": ["Recente"] }, { "msgid": "Select all checkboxes", "msgstr": ["Seleziona tutte le caselle"] }, { "msgid": "Select all entries", "msgstr": ["Scegli tutte le voci"] }, { "msgid": "Select all existing files", "msgstr": ["Seleziona tutti i file esistenti"] }, { "msgid": "Select all new files", "msgstr": ["Seleziona tutti i nuovi file"] }, { "msgid": "Select entry", "msgstr": ["Seleziona la voce"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["Seleziona la riga per {nodename}"] }, { "msgid": "Size", "msgstr": ["Dimensioni"] }, { "msgid": "Skip %n file", "msgid_plural": "Skip %n files", "msgstr": ["Salta %n file", "Salta %n file", "Salta %n file"] }, { "msgid": "Skip this file", "msgstr": ["Salta questo file"] }, { "msgid": "Submit name", "msgstr": ["Invia nome"] }, { "msgid": "Undo", "msgstr": ["Annulla"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["Carica qualche contenuto o sincronizza con i tuoi dispositivi!"] }, { "msgid": "When an incoming folder is selected, any conflicting files within it will also be overwritten.", "msgstr": ["Quando si seleziona una cartella in arrivo, anche tutti i file in conflitto al suo interno saranno sovrascritti."] }, { "msgid": "When an incoming folder is selected, the content is written into the existing folder and a recursive conflict resolution is performed.", "msgstr": ["Quando si seleziona una cartella in arrivo, il contenuto viene scritto nella cartella esistente e viene eseguita una risoluzione ricorsiva dei conflitti."] }, { "msgid": "Which files do you want to keep?", "msgstr": ["Quali file vuoi conservare?"] }, { "msgid": "You are currently identified as {nickname}.", "msgstr": ["Sei attualmente identificato come {nickname}."] }, { "msgid": "You are currently not identified.", "msgstr": ["Attualmente non sei identificato."] }, { "msgid": "You cannot leave the name empty.", "msgstr": ["Non puoi lasciare il nome vuoto."] }, { "msgid": "You need to choose at least one conflict solution", "msgstr": ["Devi scegliere almeno una soluzione al conflitto"] }, { "msgid": "You need to select at least one version of each file to continue.", "msgstr": ["Per continuare, è necessario selezionare almeno una versione di ciascun file."] }] }, { "language": "ja_JP", "translations": [{ "msgid": '"{char}" is not allowed inside a folder name.', "msgstr": ['フォルダー名に "{char}" を使用することはできません。'] }, { "msgid": '"{char}" is not allowed inside a name.', "msgstr": ['名前に "{char}" を使用することはできません。'] }, { "msgid": '"{extension}" is not an allowed name.', "msgstr": ['"{extension}" は許可された名前ではありません。'] }, { "msgid": '"{segment}" is a reserved name and not allowed for folder names.', "msgstr": ['"{segment}" は予約名のため、使用できません。'] }, { "msgid": '"{segment}" is a reserved name and not allowed.', "msgstr": ['"{segment}" は予約名のため、使用できません。'] }, { "msgid": "%n file conflict", "msgid_plural": "%n files conflict", "msgstr": ["%nファイルが競合しています"] }, { "msgid": "%n file conflict in {dirname}", "msgid_plural": "%n file conflicts in {dirname}", "msgstr": ["%nディレクトリ{dirname}内のファイル競合"] }, { "msgid": "All files", "msgstr": ["すべてのファイル"] }, { "msgid": "Cancel", "msgstr": ["キャンセル"] }, { "msgid": "Cancel the entire operation", "msgstr": ["すべての操作をキャンセル"] }, { "msgid": "Choose", "msgstr": ["選択"] }, { "msgid": "Choose {file}", "msgstr": ["{file} を選択"] }, { "msgid": "Choose %n file", "msgid_plural": "Choose %n files", "msgstr": ["%n 個のファイルを選択"] }, { "msgid": "Confirm", "msgstr": ["確認"] }, { "msgid": "Continue", "msgstr": ["続行"] }, { "msgid": "Copy", "msgstr": ["コピー"] }, { "msgid": "Copy to {target}", "msgstr": ["{target} にコピー"] }, { "msgid": "Could not create the new folder", "msgstr": ["新しいフォルダーを作成できませんでした"] }, { "msgid": "Could not load files settings", "msgstr": ["ファイル設定を読み込めませんでした"] }, { "msgid": "Could not load files views", "msgstr": ["ファイルビューを読み込めませんでした"] }, { "msgid": "Create directory", "msgstr": ["ディレクトリを作成"] }, { "msgid": "Current view selector", "msgstr": ["現在のビュー選択"] }, { "msgid": "Enter your name", "msgstr": ["名前を入力してください"] }, { "msgid": "Existing version", "msgstr": ["現行バージョン"] }, { "msgid": "Failed to set nickname.", "msgstr": ["ニックネームの設定に失敗しました。"] }, { "msgid": "Favorites", "msgstr": ["お気に入り"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["お気に入りとしてマークしたファイルとフォルダーがここに表示されます。"] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["最近変更したファイルとフォルダーがここに表示されます。"] }, { "msgid": "Filter file list", "msgstr": ["ファイルのリストをフィルター"] }, { "msgid": 'Folder names must not end with "{extension}".', "msgstr": ['フォルダー名の末尾に "{extension}" を使用できません。'] }, { "msgid": "Guest identification", "msgstr": ["ゲスト識別"] }, { "msgid": "Home", "msgstr": ["ホーム"] }, { "msgid": "If you select both versions, the incoming file will have a number added to its name.", "msgstr": ["両方のバージョンを選択した場合、受信ファイル名には番号が追加されます。"] }, { "msgid": "Invalid folder name.", "msgstr": ["フォルダー名が無効です。"] }, { "msgid": "Invalid name.", "msgstr": ["無効な名前です。"] }, { "msgid": "Last modified date unknown", "msgstr": ["最終更新日不明"] }, { "msgid": "Modified", "msgstr": ["変更済み"] }, { "msgid": "Move", "msgstr": ["移動"] }, { "msgid": "Move to {target}", "msgstr": ["{target} に移動"] }, { "msgid": "Name", "msgstr": ["名前"] }, { "msgid": "Names may be at most 64 characters long.", "msgstr": ["名前は最大64文字です。"] }, { "msgid": "Names must not be empty.", "msgstr": ["名前は空にできません。"] }, { "msgid": 'Names must not end with "{extension}".', "msgstr": ['名前の末尾に "{extension}" を使用できません。'] }, { "msgid": "Names must not start with a dot.", "msgstr": ["ドットで始まる名前は使用できません。"] }, { "msgid": "New", "msgstr": ["新規作成"] }, { "msgid": "New folder", "msgstr": ["新しいフォルダー"] }, { "msgid": "New folder name", "msgstr": ["新しいフォルダーの名前"] }, { "msgid": "New version", "msgstr": ["新バージョン"] }, { "msgid": "No files in here", "msgstr": ["ファイルがありません"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["フィルターに一致するファイルは見つかりませんでした。"] }, { "msgid": "No matching files", "msgstr": ["一致するファイルはありません"] }, { "msgid": "Please enter a name with at least 2 characters.", "msgstr": ["名前は2文字以上を入力してください。"] }, { "msgid": "Recent", "msgstr": ["最近"] }, { "msgid": "Select all checkboxes", "msgstr": ["すべてのチェックボックスを選択"] }, { "msgid": "Select all entries", "msgstr": ["すべてのエントリを選択"] }, { "msgid": "Select all existing files", "msgstr": ["既存のファイルをすべて選択"] }, { "msgid": "Select all new files", "msgstr": ["すべての新規ファイルを選択"] }, { "msgid": "Select entry", "msgstr": ["エントリを選択"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["{nodename} の行を選択"] }, { "msgid": "Size", "msgstr": ["サイズ"] }, { "msgid": "Skip %n file", "msgid_plural": "Skip %n files", "msgstr": ["%n 個のファイルをスキップ"] }, { "msgid": "Skip this file", "msgstr": ["このファイルをスキップ"] }, { "msgid": "Submit name", "msgstr": ["名前を送信する"] }, { "msgid": "Undo", "msgstr": ["元に戻す"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["コンテンツをアップロードするか、デバイスと同期してください！"] }, { "msgid": "When an incoming folder is selected, any conflicting files within it will also be overwritten.", "msgstr": ["受信フォルダーを選択すると、そのフォルダー内の競合ファイルも上書きされます。"] }, { "msgid": "When an incoming folder is selected, the content is written into the existing folder and a recursive conflict resolution is performed.", "msgstr": ["受信フォルダーを選択すると、内容は既存のフォルダーに書き込まれ、再帰的な競合解決が実行されます。"] }, { "msgid": "Which files do you want to keep?", "msgstr": ["どのファイルを残しますか？"] }, { "msgid": "You are currently identified as {nickname}.", "msgstr": ["現在、{nickname}として識別されています。"] }, { "msgid": "You are currently not identified.", "msgstr": ["現在あなたは識別されていません。"] }, { "msgid": "You cannot leave the name empty.", "msgstr": ["名前を空にすることはできません。"] }, { "msgid": "You need to choose at least one conflict solution", "msgstr": ["少なくとも1つの競合ソリューションを選択する必要があります"] }, { "msgid": "You need to select at least one version of each file to continue.", "msgstr": ["続行するには、各ファイルのバージョンを少なくとも1つ選択する必要があります。"] }] }, { "language": "ko", "translations": [{ "msgid": '"{char}" is not allowed inside a folder name.', "msgstr": ["문자 '{char}'은(는) 폴더 이름에 사용할 수 없습니다."] }, { "msgid": '"{char}" is not allowed inside a name.', "msgstr": ["문자 '{char}'은(는) 이름에 사용할 수 없습니다."] }, { "msgid": '"{extension}" is not an allowed name.', "msgstr": ["'{extension}'은(는) 사용 불가능한 이름입니다."] }, { "msgid": '"{segment}" is a reserved name and not allowed for folder names.', "msgstr": ["'{segment}'은(는) 예약된 이름이므로 폴더 이름으로 사용할 수 없습니다."] }, { "msgid": '"{segment}" is a reserved name and not allowed.', "msgstr": ["'{segment}'은(는) 예약된 이름이므로 사용할 수 없습니다."] }, { "msgid": "%n file conflict", "msgid_plural": "%n files conflict", "msgstr": ["%n개의 파일이 충돌함"] }, { "msgid": "%n file conflict in {dirname}", "msgid_plural": "%n file conflicts in {dirname}", "msgstr": ["{dirname}에서 %n개의 파일이 충돌함"] }, { "msgid": "All files", "msgstr": ["모든 파일"] }, { "msgid": "Cancel", "msgstr": ["취소"] }, { "msgid": "Cancel the entire operation", "msgstr": ["전체 작업 취소"] }, { "msgid": "Choose", "msgstr": ["선택"] }, { "msgid": "Choose {file}", "msgstr": ["{file} 선택"] }, { "msgid": "Choose %n file", "msgid_plural": "Choose %n files", "msgstr": ["파일 %n개 선택"] }, { "msgid": "Confirm", "msgstr": ["확인"] }, { "msgid": "Continue", "msgstr": ["계속"] }, { "msgid": "Copy", "msgstr": ["복사"] }, { "msgid": "Copy to {target}", "msgstr": ["{target}(으)로 복사"] }, { "msgid": "Could not create the new folder", "msgstr": ["새 폴더를 만들 수 없음"] }, { "msgid": "Could not load files settings", "msgstr": ["파일 설정을 불러오지 못함"] }, { "msgid": "Could not load files views", "msgstr": ["파일 보기를 불러오지 못함"] }, { "msgid": "Create directory", "msgstr": ["디렉토리 만들기"] }, { "msgid": "Current view selector", "msgstr": ["현재 보기 방식"] }, { "msgid": "Enter your name", "msgstr": ["이름을 입력하세요"] }, { "msgid": "Existing version", "msgstr": ["기존 버전"] }, { "msgid": "Failed to set nickname.", "msgstr": ["닉네임을 설정하지 못했습니다.\n "] }, { "msgid": "Favorites", "msgstr": ["즐겨찾기"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["즐겨찾기 한 파일 및 폴더가 이곳에 표시됩니다."] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["최근 수정된 파일 및 폴더가 이곳에 표시됩니다."] }, { "msgid": "Filter file list", "msgstr": ["파일 목록 필터링"] }, { "msgid": 'Folder names must not end with "{extension}".', "msgstr": ["폴더 이름은 '{extension}'(으)로 끝날 수 없습니다."] }, { "msgid": "Guest identification", "msgstr": ["게스트 확인"] }, { "msgid": "Home", "msgstr": ["홈"] }, { "msgid": "If you select both versions, the incoming file will have a number added to its name.", "msgstr": ["두 버전을 모두 선택할 경우 새로 추가되는 파일의 이름에 숫자가 붙게 됩니다."] }, { "msgid": "Invalid folder name.", "msgstr": ["잘못된 폴더 이름입니다."] }, { "msgid": "Invalid name.", "msgstr": ["잘못된 이름입니다. "] }, { "msgid": "Last modified date unknown", "msgstr": ["최근 수정일 알 수 없음"] }, { "msgid": "Modified", "msgstr": ["수정됨"] }, { "msgid": "Move", "msgstr": ["이동"] }, { "msgid": "Move to {target}", "msgstr": ["{target}(으)로 이동"] }, { "msgid": "Name", "msgstr": ["이름"] }, { "msgid": "Names may be at most 64 characters long.", "msgstr": ["이름은 최대 64글자까지 지정할 수 있습니다."] }, { "msgid": "Names must not be empty.", "msgstr": ["이름은 비어 있을 수 없습니다."] }, { "msgid": 'Names must not end with "{extension}".', "msgstr": ["이름은 '{extension}'(으)로 끝날 수 없습니다."] }, { "msgid": "Names must not start with a dot.", "msgstr": ["이름은 마침표로 시작될 수 없습니다."] }, { "msgid": "New", "msgstr": ["새로 만들기"] }, { "msgid": "New folder", "msgstr": ["새 폴더"] }, { "msgid": "New folder name", "msgstr": ["새 폴더명"] }, { "msgid": "New version", "msgstr": ["새로운 버전"] }, { "msgid": "No files in here", "msgstr": ["파일이 없습니다"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["선택된 필터에 해당하는 파일이 없습니다."] }, { "msgid": "No matching files", "msgstr": ["해당하는 파일 없음"] }, { "msgid": "Please enter a name with at least 2 characters.", "msgstr": ["최소 두 글자 이상의 이름을 입력해주세요."] }, { "msgid": "Recent", "msgstr": ["최근"] }, { "msgid": "Select all checkboxes", "msgstr": ["체크박스 모두 선택"] }, { "msgid": "Select all entries", "msgstr": ["모두 선택"] }, { "msgid": "Select all existing files", "msgstr": ["기존 파일 모두 선택"] }, { "msgid": "Select all new files", "msgstr": ["새 파일 모두 선택"] }, { "msgid": "Select entry", "msgstr": ["항목 선택"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["{nodename}의 행 선택"] }, { "msgid": "Size", "msgstr": ["크기"] }, { "msgid": "Skip %n file", "msgid_plural": "Skip %n files", "msgstr": ["%n개 파일 건너뛰기"] }, { "msgid": "Skip this file", "msgstr": ["이 파일 건너뛰기"] }, { "msgid": "Submit name", "msgstr": ["이름 제출"] }, { "msgid": "Undo", "msgstr": ["되돌리기"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["기기에서 파일을 업로드 또는 동기화하세요!"] }, { "msgid": "When an incoming folder is selected, any conflicting files within it will also be overwritten.", "msgstr": ["새 폴더를 선택할 경우, 해당 폴더 내의 충돌 파일들도 덮어쓰기 됩니다."] }, { "msgid": "When an incoming folder is selected, the content is written into the existing folder and a recursive conflict resolution is performed.", "msgstr": ["새 폴더를 선택할 경우 내용물이 기존 폴더에 기록되며 재귀적 충돌 해결이 수행됩니다."] }, { "msgid": "Which files do you want to keep?", "msgstr": ["어떤 파일들을 유지하시겠습니까?"] }, { "msgid": "You are currently identified as {nickname}.", "msgstr": ["{nickname}(으)로 인증된 상태 입니다."] }, { "msgid": "You are currently not identified.", "msgstr": ["현재 인증 정보가 없습니다."] }, { "msgid": "You cannot leave the name empty.", "msgstr": ["이름은 비워 둘 수 없습니다. "] }, { "msgid": "You need to choose at least one conflict solution", "msgstr": ["최소한 하나의 충돌 해결 방안을 선택해야 합니다."] }, { "msgid": "You need to select at least one version of each file to continue.", "msgstr": ["계속하기 위해서는 한 파일에 최소 하나의 버전을 선택해야 합니다."] }] }, { "language": "lb", "translations": [{ "msgid": '"{name}" is an invalid folder name.', "msgstr": ["{name} ass en ongëlteg Dossier"] }, { "msgid": '"{name}" is not an allowed folder name', "msgstr": ["{name} ass net en erlaabten Dossiernumm"] }, { "msgid": '"/" is not allowed inside a folder name.', "msgstr": ['"/" ass net an engem Dossier Numm erlaabt'] }, { "msgid": "All files", "msgstr": ["All Dateien"] }, { "msgid": "Choose", "msgstr": ["Wielt"] }, { "msgid": "Choose {file}", "msgstr": ["Wielt {file}"] }, { "msgid": "Choose %n file", "msgid_plural": "Choose %n files", "msgstr": ["Wielt %n Fichieren", "Wielt %n Fichier"] }, { "msgid": "Copy", "msgstr": ["Kopie"] }, { "msgid": "Copy to {target}", "msgstr": ["Kopie op {target}"] }, { "msgid": "Could not create the new folder", "msgstr": ["Konnt den neien Dossier net erstellen"] }, { "msgid": "Could not load files settings", "msgstr": ["Konnt d'Dateienastellungen net lueden"] }, { "msgid": "Could not load files views", "msgstr": ["Konnt d'Dateien net lueden"] }, { "msgid": "Create directory", "msgstr": ["Erstellt Verzeechnes"] }, { "msgid": "Current view selector", "msgstr": ["Aktuell Vue selector"] }, { "msgid": "Favorites", "msgstr": ["Favoritten"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["Dateien an Ordner, déi Dir als Favorit markéiert, ginn hei gewisen"] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["Dateien an Ordner déi Dir viru kuerzem geännert hutt ginn hei op"] }, { "msgid": "Filter file list", "msgstr": ["Filter Datei Lëscht"] }, { "msgid": "Folder name cannot be empty.", "msgstr": ["Dossier Numm kann net eidel sinn"] }, { "msgid": "Home", "msgstr": ["Wëllkomm"] }, { "msgid": "Modified", "msgstr": ["Geännert"] }, { "msgid": "Move", "msgstr": ["Plënne"] }, { "msgid": "Move to {target}", "msgstr": ["Plënneren {target}"] }, { "msgid": "Name", "msgstr": ["Numm"] }, { "msgid": "New", "msgstr": ["Nei"] }, { "msgid": "New folder", "msgstr": ["Neien dossier"] }, { "msgid": "New folder name", "msgstr": ["Neien dossier numm"] }, { "msgid": "No files in here", "msgstr": ["Kee fichier hei"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["Kee fichier deen äre filter passt gouf fonnt"] }, { "msgid": "No matching files", "msgstr": ["Keng passende dateien"] }, { "msgid": "Recent", "msgstr": ["Rezent"] }, { "msgid": "Select all entries", "msgstr": ["Wielt all entréen"] }, { "msgid": "Select entry", "msgstr": ["Wielt entrée"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["Wielt d'zeil fir {nodename}"] }, { "msgid": "Size", "msgstr": ["Gréisst"] }, { "msgid": "Undo", "msgstr": ["Undoen"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["Luet en inhalt erop oder synchroniséiert mat ären apparater"] }] }, { "language": "lo", "translations": [{ "msgid": '"{char}" is not allowed inside a folder name.', "msgstr": ['"{char}" ບໍ່ອະນຸຍາດໃຫ້ມີຢູ່ໃນຊື່ໂຟນເດີ.'] }, { "msgid": '"{char}" is not allowed inside a name.', "msgstr": ['ບໍ່ອະນຸຍາດໃຫ້ມີ "{char}" ພາຍໃນຊື່.'] }, { "msgid": '"{extension}" is not an allowed name.', "msgstr": ['"{extension}" ບໍ່ແມ່ນຊື່ທີ່ໄດ້ຮັບອະນຸຍາດ.'] }, { "msgid": '"{segment}" is a reserved name and not allowed for folder names.', "msgstr": ['"{segment}" ແມ່ນຊື່ທີ່ສະຫງວນໄວ້ ແລະ ບໍ່ອະນຸຍາດໃຫ້ໃຊ້ເປັນຊື່ໂຟນເດີ.'] }, { "msgid": '"{segment}" is a reserved name and not allowed.', "msgstr": ['"{segment}" ແມ່ນຊື່ທີ່ສະຫງວນໄວ້ ແລະ ບໍ່ໄດ້ຮັບອະນຸຍາດ.'] }, { "msgid": "%n file conflict", "msgid_plural": "%n files conflict", "msgstr": ["ໄຟລ໌ຂັດກັນ %n ລາຍການ"] }, { "msgid": "%n file conflict in {dirname}", "msgid_plural": "%n file conflicts in {dirname}", "msgstr": ["ໄຟລ໌ຂັດກັນ %n ລາຍການໃນ {dirname}"] }, { "msgid": "All files", "msgstr": ["ໄຟລ໌ທັງໝົດ"] }, { "msgid": "Cancel", "msgstr": ["ຍົກເລີກ"] }, { "msgid": "Cancel the entire operation", "msgstr": ["ຍົກເລີກການດຳເນີນການທັງໝົດ"] }, { "msgid": "Choose", "msgstr": ["ເລືອກ"] }, { "msgid": "Choose {file}", "msgstr": ["ເລືອກ {file}"] }, { "msgid": "Choose %n file", "msgid_plural": "Choose %n files", "msgstr": ["ເລືອກ %n ໄຟລ໌"] }, { "msgid": "Confirm", "msgstr": ["ຢືນຢັນ"] }, { "msgid": "Continue", "msgstr": ["ດຳເນີນການຕໍ່"] }, { "msgid": "Copy", "msgstr": ["ຄັດລອກ"] }, { "msgid": "Copy to {target}", "msgstr": ["ຄັດລອກໄປທີ່ {target}"] }, { "msgid": "Could not create the new folder", "msgstr": ["ບໍ່ສາມາດສ້າງໂຟນເດີໃໝ່ໄດ້"] }, { "msgid": "Could not load files settings", "msgstr": ["ບໍ່ສາມາດໂຫຼດການຕັ້ງຄ່າໄຟລ໌ໄດ້"] }, { "msgid": "Could not load files views", "msgstr": ["ບໍ່ສາມາດໂຫຼດມຸມມອງໄຟລ໌ໄດ້"] }, { "msgid": "Create directory", "msgstr": ["ສ້າງໄດເຣັກທໍຣີ"] }, { "msgid": "Current view selector", "msgstr": ["ຕົວເລືອກມຸມມອງປັດຈຸບັນ"] }, { "msgid": "Enter your name", "msgstr": ["ປ້ອນຊື່ຂອງທ່ານ"] }, { "msgid": "Existing version", "msgstr": ["ເວີຊັນທີ່ມີຢູ່"] }, { "msgid": "Failed to set nickname.", "msgstr": ["ຕັ້ງຊື່ຫຼິ້ນບໍ່ສຳເລັດ."] }, { "msgid": "Favorites", "msgstr": ["ລາຍການທີ່ມັກ"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["ໄຟລ໌ ແລະ ໂຟນເດີທີ່ທ່ານໝາຍວ່າເປັນລາຍການທີ່ມັກຈະສະແດງຢູ່ບ່ອນນີ້."] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["ໄຟລ໌ ແລະ ໂຟນເດີທີ່ທ່ານແກ້ໄຂລ່າສຸດຈະສະແດງຢູ່ບ່ອນນີ້."] }, { "msgid": "Filter file list", "msgstr": ["ກັ່ນຕອງລາຍການໄຟລ໌"] }, { "msgid": 'Folder names must not end with "{extension}".', "msgstr": ['ຊື່ໂຟນເດີຕ້ອງບໍ່ລົງທ້າຍດ້ວຍ "{extension}".'] }, { "msgid": "Guest identification", "msgstr": ["ການລະບຸຕົວຕົນຂອງແຂກ"] }, { "msgid": "Home", "msgstr": ["ໜ້າຫຼັກ"] }, { "msgid": "If you select both versions, the incoming file will have a number added to its name.", "msgstr": ["ຖ້າທ່ານເລືອກທັງສອງເວີຊັນ, ໄຟລ໌ທີ່ເຂົ້າມາຈະມີຕົວເລກເພີ່ມໃສ່ຊື່ຂອງມັນ."] }, { "msgid": "Invalid folder name.", "msgstr": ["ຊື່ໂຟນເດີບໍ່ຖືກຕ້ອງ."] }, { "msgid": "Invalid name.", "msgstr": ["ຊື່ບໍ່ຖືກຕ້ອງ."] }, { "msgid": "Last modified date unknown", "msgstr": ["ບໍ່ຮູ້ວັນທີແກ້ໄຂລ່າສຸດ"] }, { "msgid": "Modified", "msgstr": ["ແກ້ໄຂເມື່ອ"] }, { "msgid": "Move", "msgstr": ["ຍ້າຍ"] }, { "msgid": "Move to {target}", "msgstr": ["ຍ້າຍໄປທີ່ {target}"] }, { "msgid": "Name", "msgstr": ["ຊື່"] }, { "msgid": "Names may be at most 64 characters long.", "msgstr": ["ຊື່ອາດມີຄວາມຍາວສູງສຸດ 64 ຕົວອັກສອນ."] }, { "msgid": "Names must not be empty.", "msgstr": ["ຊື່ຕ້ອງບໍ່ຫວ່າງເປົ່າ."] }, { "msgid": 'Names must not end with "{extension}".', "msgstr": ['ຊື່ຕ້ອງບໍ່ລົງທ້າຍດ້ວຍ "{extension}".'] }, { "msgid": "Names must not start with a dot.", "msgstr": ["ຊື່ຕ້ອງບໍ່ຂຶ້ນຕົ້ນດ້ວຍຈຸດ."] }, { "msgid": "New", "msgstr": ["ໃໝ່"] }, { "msgid": "New folder", "msgstr": ["ໂຟນເດີໃໝ່"] }, { "msgid": "New folder name", "msgstr": ["ຊື່ໂຟນເດີໃໝ່"] }, { "msgid": "New version", "msgstr": ["ເວີຊັນໃໝ່"] }, { "msgid": "No files in here", "msgstr": ["ບໍ່ມີໄຟລ໌ຢູ່ບ່ອນນີ້"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["ບໍ່ພົບໄຟລ໌ທີ່ກົງກັບການກັ່ນຕອງຂອງທ່ານ."] }, { "msgid": "No matching files", "msgstr": ["ບໍ່ມີໄຟລ໌ທີ່ກົງກັນ"] }, { "msgid": "Please enter a name with at least 2 characters.", "msgstr": ["ກະລຸນາປ້ອນຊື່ທີ່ມີຢ່າງໜ້ອຍ 2 ຕົວອັກສອນ."] }, { "msgid": "Recent", "msgstr": ["ລ່າສຸດ"] }, { "msgid": "Select all checkboxes", "msgstr": ["ເລືອກກ່ອງໝາຍທັງໝົດ"] }, { "msgid": "Select all entries", "msgstr": ["ເລືອກທຸກລາຍການ"] }, { "msgid": "Select all existing files", "msgstr": ["ເລືອກໄຟລ໌ທີ່ມີຢູ່ທັງໝົດ"] }, { "msgid": "Select all new files", "msgstr": ["ເລືອກໄຟລ໌ໃໝ່ທັງໝົດ"] }, { "msgid": "Select entry", "msgstr": ["ເລືອກລາຍການ"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["ເລືອກແຖວສຳລັບ {nodename}"] }, { "msgid": "Size", "msgstr": ["ຂະໜາດ"] }, { "msgid": "Skip %n file", "msgid_plural": "Skip %n files", "msgstr": ["ຂ້າມ %n ໄຟລ໌"] }, { "msgid": "Skip this file", "msgstr": ["ຂ້າມໄຟລ໌ນີ້"] }, { "msgid": "Submit name", "msgstr": ["ສົ່ງຊື່"] }, { "msgid": "Undo", "msgstr": ["ເອົາຄືນ"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["ອັບໂຫຼດເນື້ອຫາ ຫຼື ຊິງຄ໌ກັບອຸປະກອນຂອງທ່ານ!"] }, { "msgid": "When an incoming folder is selected, any conflicting files within it will also be overwritten.", "msgstr": ["ເມື່ອເລືອກໂຟນເດີທີ່ເຂົ້າມາ, ໄຟລ໌ໃດໆທີ່ຂັດກັນພາຍໃນໂຟນເດີນັ້ນກໍຈະຖືກຂຽນທັບເຊັ່ນກັນ."] }, { "msgid": "When an incoming folder is selected, the content is written into the existing folder and a recursive conflict resolution is performed.", "msgstr": ["ເມື່ອເລືອກໂຟນເດີທີ່ເຂົ້າມາ, ເນື້ອຫາຈະຖືກຂຽນລົງໃນໂຟນເດີທີ່ມີຢູ່ ແລະ ຈະມີການແກ້ໄຂຂໍ້ຂັດແຍ່ງແບບຕໍ່ເນື່ອງ."] }, { "msgid": "Which files do you want to keep?", "msgstr": ["ທ່ານຕ້ອງການເກັບໄຟລ໌ໃດໄວ້?"] }, { "msgid": "You are currently identified as {nickname}.", "msgstr": ["ຕອນນີ້ທ່ານຖືກລະບຸວ່າເປັນ {nickname}."] }, { "msgid": "You are currently not identified.", "msgstr": ["ຕອນນີ້ທ່ານຍັງບໍ່ໄດ້ຖືກລະບຸຕົວຕົນ."] }, { "msgid": "You cannot leave the name empty.", "msgstr": ["ທ່ານບໍ່ສາມາດປະຊື່ໃຫ້ຫວ່າງເປົ່າໄດ້."] }, { "msgid": "You need to choose at least one conflict solution", "msgstr": ["ທ່ານຈຳເປັນຕ້ອງເລືອກວິທີແກ້ໄຂຂໍ້ຂັດແຍ່ງຢ່າງໜ້ອຍໜຶ່ງຢ່າງ"] }, { "msgid": "You need to select at least one version of each file to continue.", "msgstr": ["ທ່ານຈຳເປັນຕ້ອງເລືອກຢ່າງໜ້ອຍໜຶ່ງເວີຊັນຂອງແຕ່ລະໄຟລ໌ເພື່ອດຳເນີນການຕໍ່."] }] }, { "language": "lt_LT", "translations": [{ "msgid": '"{char}" is not allowed inside a folder name.', "msgstr": ["„{char}“ negalima naudoti aplanko pavadinime."] }, { "msgid": '"{char}" is not allowed inside a name.', "msgstr": ["„{char}“ negalima naudoti vardo sudėtyje."] }, { "msgid": '"{extension}" is not an allowed name.', "msgstr": ["„{extension}“ nėra leidžiamas vardas."] }, { "msgid": '"{segment}" is a reserved name and not allowed for folder names.', "msgstr": ["„{segment}“ yra rezervuotas vardas, kurio negalima naudoti aplankų pavadinimuose."] }, { "msgid": '"{segment}" is a reserved name and not allowed.', "msgstr": ["„{segment}“ yra rezervuotas vardas, todėl jo naudoti negalima."] }, { "msgid": "%n file conflict", "msgid_plural": "%n files conflict", "msgstr": ["%n  failo konfliktas", "%n  failų konfliktas", "%n  failų konfliktas", "%n  failų konfliktas"] }, { "msgid": "%n file conflict in {dirname}", "msgid_plural": "%n file conflicts in {dirname}", "msgstr": ["%n  failo konfliktas {dirname}", "%n  failų konfliktas {dirname}", "%n  failų konfliktas {dirname}", "%n  failų konfliktas {dirname}"] }, { "msgid": "All files", "msgstr": ["Visi failai"] }, { "msgid": "Cancel", "msgstr": ["Atsisakyti"] }, { "msgid": "Cancel the entire operation", "msgstr": ["Atsisakyti visos operacijos"] }, { "msgid": "Choose", "msgstr": ["Pasirinkti"] }, { "msgid": "Choose {file}", "msgstr": ["Pasirinkti {file}"] }, { "msgid": "Choose %n file", "msgid_plural": "Choose %n files", "msgstr": ["Pasirinkti %n failą", "Pasirinkti %n failus", "Pasirinkti %n failų", "Pasirinkti %n failą"] }, { "msgid": "Confirm", "msgstr": ["Patvirtinti"] }, { "msgid": "Continue", "msgstr": ["Tęsti"] }, { "msgid": "Copy", "msgstr": ["Kopijuoti"] }, { "msgid": "Copy to {target}", "msgstr": ["Kopijuoti į {target}"] }, { "msgid": "Could not create the new folder", "msgstr": ["Nepavyko sukurti naujo aplanko"] }, { "msgid": "Could not load files settings", "msgstr": ["Nepavyko įkelti failų nustatymų"] }, { "msgid": "Could not load files views", "msgstr": ["Nepavyko įkelti failų peržiūrų"] }, { "msgid": "Create directory", "msgstr": ["Sukurti katalogą"] }, { "msgid": "Current view selector", "msgstr": ["Dabartinis peržiūros pasirinkimas"] }, { "msgid": "Enter your name", "msgstr": ["Įrašykite savo vardą"] }, { "msgid": "Existing version", "msgstr": ["Esama versija"] }, { "msgid": "Failed to set nickname.", "msgstr": ["Nepavyko nustatyti slapyvardžio"] }, { "msgid": "Favorites", "msgstr": ["Populiariausi"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["Failai ir aplankai, kuriuos pažymėsite kaip mėgstamiausius, bus rodomi čia."] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["Čia bus rodomi failai ir aplankai, kuriuos neseniai pakeitėte."] }, { "msgid": "Filter file list", "msgstr": ["Filtruoti failų sąrašą"] }, { "msgid": 'Folder names must not end with "{extension}".', "msgstr": ["Aplankų pavadinimai neturi baigtis simboliu „{extension}“."] }, { "msgid": "Guest identification", "msgstr": ["Svečio identifikacija"] }, { "msgid": "Home", "msgstr": ["Pradžia"] }, { "msgid": "If you select both versions, the incoming file will have a number added to its name.", "msgstr": ["Jei pasirinksite abi versijas, prie gaunamo failo pavadinimo bus pridėtas numeris."] }, { "msgid": "Invalid folder name.", "msgstr": ["Netinkamas aplanko pavadinimas."] }, { "msgid": "Invalid name.", "msgstr": ["Netinkamas pavadinimas."] }, { "msgid": "Last modified date unknown", "msgstr": ["Paskutinio atnaujinimo data nežinoma"] }, { "msgid": "Modified", "msgstr": ["Pakeista"] }, { "msgid": "Move", "msgstr": ["Perkelti"] }, { "msgid": "Move to {target}", "msgstr": ["Perkelti į {target}"] }, { "msgid": "Name", "msgstr": ["Vardas"] }, { "msgid": "Names may be at most 64 characters long.", "msgstr": ["Vardų ilgis negali viršyti 64 simbolių."] }, { "msgid": "Names must not be empty.", "msgstr": ["Pavadinimai negali būti tušti."] }, { "msgid": 'Names must not end with "{extension}".', "msgstr": ["Vardai neturi baigtis simboliu „{extension}“."] }, { "msgid": "Names must not start with a dot.", "msgstr": ["Vardai negali prasidėti tašku."] }, { "msgid": "New", "msgstr": ["Naujas"] }, { "msgid": "New folder", "msgstr": ["Naujas aplankas"] }, { "msgid": "New folder name", "msgstr": ["Naujas aplanko pavadinimas"] }, { "msgid": "New version", "msgstr": ["Nauja versija"] }, { "msgid": "No files in here", "msgstr": ["Čia failų nėra"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["Nepavyko rasti failų pagal filtro nustatymus"] }, { "msgid": "No matching files", "msgstr": ["Nėra atitinkančių failų"] }, { "msgid": "Please enter a name with at least 2 characters.", "msgstr": ["Įrašykite vardą iš mažiausiai dviejų ženklų."] }, { "msgid": "Recent", "msgstr": ["Nauji"] }, { "msgid": "Select all checkboxes", "msgstr": ["Pažymėti visus langelius"] }, { "msgid": "Select all entries", "msgstr": ["Žymėti visus įrašus"] }, { "msgid": "Select all existing files", "msgstr": ["Pažymėti visus esamus failus"] }, { "msgid": "Select all new files", "msgstr": ["Pažymėti visus naujus failus"] }, { "msgid": "Select entry", "msgstr": ["Žymėti įrašą"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["Pasirinkite eilutę {nodename}"] }, { "msgid": "Size", "msgstr": ["Dydis"] }, { "msgid": "Skip %n file", "msgid_plural": "Skip %n files", "msgstr": ["Praleisti %n failą", "Praleisti %n failus", "Praleisti %n failų", "Praleisti %n failą"] }, { "msgid": "Skip this file", "msgstr": ["Praleisti šį failą"] }, { "msgid": "Submit name", "msgstr": ["Pateikti pavadinimą"] }, { "msgid": "Undo", "msgstr": ["Atšaukti"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["Įkelkite turinio arba sinchronizuokite su savo įrenginiais!"] }, { "msgid": "When an incoming folder is selected, any conflicting files within it will also be overwritten.", "msgstr": ["Pasirinkus įeinančių failų aplanką, jame esantys failai, su kuriais kyla konfliktas, taip pat bus perrašyti."] }, { "msgid": "When an incoming folder is selected, the content is written into the existing folder and a recursive conflict resolution is performed.", "msgstr": ["Pasirinkus įeinančių failų aplanką, jo turinys įrašomas į esamą aplanką ir atliekamas rekursyvus konfliktų sprendimas."] }, { "msgid": "Which files do you want to keep?", "msgstr": ["Kokius failus norite išsaugoti?"] }, { "msgid": "You are currently identified as {nickname}.", "msgstr": ["Šiuo metu esate identifikuotas kaip {nickname}."] }, { "msgid": "You are currently not identified.", "msgstr": ["Šiuo metu nesate identifikuotas."] }, { "msgid": "You cannot leave the name empty.", "msgstr": ["Negalite palikti tuščio vardo lauko."] }, { "msgid": "You need to choose at least one conflict solution", "msgstr": ["Turite pasirinkti bent vieną konflikto sprendimo būdą"] }, { "msgid": "You need to select at least one version of each file to continue.", "msgstr": ["Norėdami tęsti, turite pasirinkti bent vieną kiekvieno failo versiją."] }] }, { "language": "lv", "translations": [{ "msgid": '"{name}" is an invalid folder name.', "msgstr": ['"{name}" nav derīgs mapes nosaukums.'] }, { "msgid": '"{name}" is not an allowed folder name', "msgstr": ['"{name}" nav atļauts mapes nosaukums'] }, { "msgid": '"/" is not allowed inside a folder name.', "msgstr": ['"/" nav atļauts mapes nosaukuma izmantošanā.'] }, { "msgid": "All files", "msgstr": ["Visas datnes"] }, { "msgid": "Choose", "msgstr": ["Izvēlieties"] }, { "msgid": "Choose {file}", "msgstr": ["Izvēlieties {file}"] }, { "msgid": "Choose %n file", "msgid_plural": "Choose %n files", "msgstr": ["Izvēlēties %n datņu", "Izvēlēties %n datni", "Izvēlēties %n datnes"] }, { "msgid": "Copy", "msgstr": ["Kopēt"] }, { "msgid": "Copy to {target}", "msgstr": ["Kopēt uz {target}"] }, { "msgid": "Could not create the new folder", "msgstr": ["Nevarēja izveidot jaunu mapi"] }, { "msgid": "Could not load files settings", "msgstr": ["Nevarēja ielādēt datņu iestatījumus"] }, { "msgid": "Could not load files views", "msgstr": ["Nevarēja ielādēt datņu apskatījumus"] }, { "msgid": "Create directory", "msgstr": ["Izveidot direktoriju"] }, { "msgid": "Current view selector", "msgstr": ["Pašreizēja skata atlasītājs"] }, { "msgid": "Favorites", "msgstr": ["Favorīti"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["Šeit parādīsies datnes un mapes, kas tiks atzīmētas kā iecienītas."] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["Šeit parādīsies datnes un mapes, kuras nesen tika izmainītas."] }, { "msgid": "Filter file list", "msgstr": ["Atlasīt datņu sarakstu"] }, { "msgid": "Folder name cannot be empty.", "msgstr": ["Mapes nosaukums nevar būt tukšs."] }, { "msgid": "Home", "msgstr": ["Sākums"] }, { "msgid": "Modified", "msgstr": ["Izmaninīta"] }, { "msgid": "Move", "msgstr": ["Pārvietot"] }, { "msgid": "Move to {target}", "msgstr": ["Pārvietot uz {target}"] }, { "msgid": "Name", "msgstr": ["Nosaukums"] }, { "msgid": "New", "msgstr": ["Jauns"] }, { "msgid": "New folder", "msgstr": ["Jauna mape"] }, { "msgid": "New folder name", "msgstr": ["Jaunas mapes nosaukums"] }, { "msgid": "No files in here", "msgstr": ["Šeit nav datņu"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["Netika atrasta neviena datne, kas atbilst atlasei."] }, { "msgid": "No matching files", "msgstr": ["Nav atbilstošu datņu"] }, { "msgid": "Recent", "msgstr": ["Nesenās"] }, { "msgid": "Select all entries", "msgstr": ["Atlasīt visus ierakstus"] }, { "msgid": "Select entry", "msgstr": ["Atlasīt ierakstu"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["Atlasīt rindu {nodename}"] }, { "msgid": "Size", "msgstr": ["Izmērs"] }, { "msgid": "Undo", "msgstr": ["Atsaukt"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["Augšupielādē kādu saturu vai sinhronizē savās iekārtās!"] }] }, { "language": "mk", "translations": [{ "msgid": '"{char}" is not allowed inside a folder name.', "msgstr": ['"{char}" не е дозволен во име на папка.'] }, { "msgid": '"{char}" is not allowed inside a name.', "msgstr": ['"{char}" не е дозволено во име.'] }, { "msgid": '"{extension}" is not an allowed name.', "msgstr": ['"{extension}" не е дозволено име.'] }, { "msgid": '"{segment}" is a reserved name and not allowed for folder names.', "msgstr": ['"{segment}" е резервирано име и не е дозволено за име на папка.'] }, { "msgid": '"{segment}" is a reserved name and not allowed.', "msgstr": ['"{segment}" е резервирано име и не е дозволено.'] }, { "msgid": "%n file conflict", "msgid_plural": "%n files conflict", "msgstr": ["%n конфликт со датотекa", "%n конфликти со датотеки"] }, { "msgid": "%n file conflict in {dirname}", "msgid_plural": "%n file conflicts in {dirname}", "msgstr": ["%n конфликт со датотека во {dirname}", "%n конфликти со датотеки vo {dirname}"] }, { "msgid": "All files", "msgstr": ["Сите датотеки"] }, { "msgid": "Cancel", "msgstr": ["Откажи"] }, { "msgid": "Cancel the entire operation", "msgstr": ["Прекини ја целата операција"] }, { "msgid": "Choose", "msgstr": ["Избери"] }, { "msgid": "Choose {file}", "msgstr": ["Избери {file}"] }, { "msgid": "Choose %n file", "msgid_plural": "Choose %n files", "msgstr": ["Избери %n датотека", "Избери %n датотеки"] }, { "msgid": "Confirm", "msgstr": ["Потврди"] }, { "msgid": "Continue", "msgstr": ["Продолжи"] }, { "msgid": "Copy", "msgstr": ["Копирај"] }, { "msgid": "Copy to {target}", "msgstr": ["Копирај во {target}"] }, { "msgid": "Could not create the new folder", "msgstr": ["Неможе да се креира нова папка"] }, { "msgid": "Could not load files settings", "msgstr": ["Неможе да се вчиаат параметрите за датотеките"] }, { "msgid": "Could not load files views", "msgstr": ["Неможе да се вчитаат погледите за датотеките"] }, { "msgid": "Create directory", "msgstr": ["Креирај папка"] }, { "msgid": "Current view selector", "msgstr": ["Избирач на тековен приказ"] }, { "msgid": "Enter your name", "msgstr": ["Внесете го вашето име"] }, { "msgid": "Existing version", "msgstr": ["Моментална верзија"] }, { "msgid": "Failed to set nickname.", "msgstr": ["Неуспешно поставување прекар."] }, { "msgid": "Favorites", "msgstr": ["Фаворити"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["Датотеките и папките кој ќе ги означите за омилени ќе се појават овде."] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["Датотеките и папките кој неодамна сте ги измениле ќе се појават овде."] }, { "msgid": "Filter file list", "msgstr": ["Филтрирај листа на датотеки"] }, { "msgid": 'Folder names must not end with "{extension}".', "msgstr": ['Имињата на папките неможе да завршуваат со "{extension}".'] }, { "msgid": "Guest identification", "msgstr": ["Гостинска идентификација"] }, { "msgid": "Home", "msgstr": ["Почетна"] }, { "msgid": "If you select both versions, the incoming file will have a number added to its name.", "msgstr": ["Ако ги избереш двете верзии, влезната датотека ќе добие број додаден на нејзиното име."] }, { "msgid": "Invalid folder name.", "msgstr": ["Невалидно име на папка."] }, { "msgid": "Invalid name.", "msgstr": ["Невалидно име."] }, { "msgid": "Last modified date unknown", "msgstr": ["Датумот на последна измена е непознат"] }, { "msgid": "Modified", "msgstr": ["Променето"] }, { "msgid": "Move", "msgstr": ["Премести"] }, { "msgid": "Move to {target}", "msgstr": ["Премести во {target}"] }, { "msgid": "Name", "msgstr": ["Име"] }, { "msgid": "Names may be at most 64 characters long.", "msgstr": ["Имињата можат да бидат најмногу со 64 карактери."] }, { "msgid": "Names must not be empty.", "msgstr": ["Имињата неможе да бидат празни."] }, { "msgid": 'Names must not end with "{extension}".', "msgstr": ['Имињата неможе да завршуваат со "{extension}".'] }, { "msgid": "Names must not start with a dot.", "msgstr": ["Имињата неможе да започнуваат со точка."] }, { "msgid": "New", "msgstr": ["Нова"] }, { "msgid": "New folder", "msgstr": ["Нова папка"] }, { "msgid": "New folder name", "msgstr": ["Ново име на папка"] }, { "msgid": "New version", "msgstr": ["Нова верзија"] }, { "msgid": "No files in here", "msgstr": ["Овде нема датотеки"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["Не се пронајдени датотеки што одговараат на вашиот филтер."] }, { "msgid": "No matching files", "msgstr": ["Нема датотеки што се совпаѓаат"] }, { "msgid": "Please enter a name with at least 2 characters.", "msgstr": ["Внесете име со најмалку 2 карактери."] }, { "msgid": "Recent", "msgstr": ["Неодамнешни"] }, { "msgid": "Select all checkboxes", "msgstr": ["Избери ги сите полиња за избор"] }, { "msgid": "Select all entries", "msgstr": ["Изберете ги сите записи"] }, { "msgid": "Select all existing files", "msgstr": ["Изберете ги сите постоечки датотеки"] }, { "msgid": "Select all new files", "msgstr": ["Изберете ги сите нови датотеки"] }, { "msgid": "Select entry", "msgstr": ["Избери запис"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["Избери ред за {nodename}"] }, { "msgid": "Size", "msgstr": ["Големина"] }, { "msgid": "Skip %n file", "msgid_plural": "Skip %n files", "msgstr": ["Прескокни %n датотека", "Прескокни %n датотеки"] }, { "msgid": "Skip this file", "msgstr": ["Прескокни ја оваа датотека"] }, { "msgid": "Submit name", "msgstr": ["Испрати име"] }, { "msgid": "Undo", "msgstr": ["Врати"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["Прикачи содржина или синхронизирај со ваши уреди!"] }, { "msgid": "When an incoming folder is selected, any conflicting files within it will also be overwritten.", "msgstr": ["Кога е избрана влезна папка, сите конфликтни датотеки во неа исто така ќе бидат препишани."] }, { "msgid": "When an incoming folder is selected, the content is written into the existing folder and a recursive conflict resolution is performed.", "msgstr": ["Кога е избрана влезна папка, содржината се запишува во постоечката папка и се извршува рекурсивно решавање на конфликти."] }, { "msgid": "Which files do you want to keep?", "msgstr": ["Кој датотеки сакаш да ги зачуваш?"] }, { "msgid": "You are currently identified as {nickname}.", "msgstr": ["Моментално сте идентификувани како {nickname}."] }, { "msgid": "You are currently not identified.", "msgstr": ["Моментално не сте идентификувани."] }, { "msgid": "You cannot leave the name empty.", "msgstr": ["Не можете да го оставите името празно."] }, { "msgid": "You need to choose at least one conflict solution", "msgstr": ["Треба да избереш најмалку едно решение за конфликт"] }, { "msgid": "You need to select at least one version of each file to continue.", "msgstr": ["Треба да избереш најмалку една верзија за секоја датотека за да продолжи."] }] }, { "language": "ms_MY", "translations": [{ "msgid": '"{name}" is an invalid folder name.', "msgstr": ['"{name}" adalah nama folder yang tidak sesuai '] }, { "msgid": '"{name}" is not an allowed folder name', "msgstr": ['"{name}" nama folder yang tidak dibenarkan'] }, { "msgid": '"/" is not allowed inside a folder name.', "msgstr": ['"/" tidak dibenarkan dalam nama folder'] }, { "msgid": "All files", "msgstr": ["Semua fail"] }, { "msgid": "Choose", "msgstr": ["Pilih"] }, { "msgid": "Choose {file}", "msgstr": ["Pilih {file}"] }, { "msgid": "Choose %n file", "msgid_plural": "Choose %n files", "msgstr": ["Pilih fail %n"] }, { "msgid": "Copy", "msgstr": ["menyalin"] }, { "msgid": "Copy to {target}", "msgstr": ["menyalin ke {target}"] }, { "msgid": "Could not create the new folder", "msgstr": ["Tidak dapat mewujudkan folder baharu"] }, { "msgid": "Could not load files settings", "msgstr": ["Tidak dapat memuatkan tetapan fail"] }, { "msgid": "Could not load files views", "msgstr": ["Tidak dapat memuatkan paparan fail"] }, { "msgid": "Create directory", "msgstr": ["mewujudkan direktori"] }, { "msgid": "Current view selector", "msgstr": ["pemilih pandangan semasa"] }, { "msgid": "Favorites", "msgstr": ["Pilihan"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["Fail dan folder yang anda tanda sebagai pilihan akan dipaparkan di sini."] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["Fail dan folder yang anda telah ubah suai baru-baru ini dipaparkan di sini."] }, { "msgid": "Filter file list", "msgstr": ["Menapis senarai fail"] }, { "msgid": "Folder name cannot be empty.", "msgstr": ["Nama folder tidak boleh kosong."] }, { "msgid": "Home", "msgstr": ["Utama"] }, { "msgid": "Modified", "msgstr": ["Ubah suai"] }, { "msgid": "Move", "msgstr": ["pindah"] }, { "msgid": "Move to {target}", "msgstr": ["pindah ke {target}"] }, { "msgid": "Name", "msgstr": ["Nama"] }, { "msgid": "New", "msgstr": ["Baru"] }, { "msgid": "New folder", "msgstr": ["Folder Baharu"] }, { "msgid": "New folder name", "msgstr": ["Nama folder baharu"] }, { "msgid": "No files in here", "msgstr": ["Tiada fail di sini"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["Tiada fail yang sepadan dengan tapisan anda."] }, { "msgid": "No matching files", "msgstr": ["Tiada fail yang sepadan"] }, { "msgid": "Recent", "msgstr": ["baru-baru ini"] }, { "msgid": "Select all entries", "msgstr": ["Pilih semua entri"] }, { "msgid": "Select entry", "msgstr": ["Pilih entri"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["memilih baris {nodename}"] }, { "msgid": "Size", "msgstr": ["Saiz"] }, { "msgid": "Undo", "msgstr": ["buat asal"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["Muat naik beberapa kandungan atau selaras dengan peranti anda!"] }] }, { "language": "nb_NO", "translations": [{ "msgid": '"{char}" is not allowed inside a name.', "msgstr": ['"{char}" er ikke tillatt i et navn.'] }, { "msgid": '"{extension}" is not an allowed name.', "msgstr": ['"{extension}" er ikke et tillatt navn.'] }, { "msgid": '"{name}" is an invalid folder name.', "msgstr": ["«{name}» er ikke et gyldig mappenavn."] }, { "msgid": '"{name}" is not an allowed folder name', "msgstr": ["«{name}» er ikke et tillatt mappenavn."] }, { "msgid": '"{segment}" is a reserved name and not allowed.', "msgstr": ['"{segment}" er et reservert navn og er ikke tillatt.'] }, { "msgid": '"/" is not allowed inside a folder name.', "msgstr": ['"/" er ikke tillatt inne i et mappenavn.'] }, { "msgid": "All files", "msgstr": ["Alle filer"] }, { "msgid": "Cancel", "msgstr": ["Avbryt"] }, { "msgid": "Choose", "msgstr": ["Velg"] }, { "msgid": "Choose {file}", "msgstr": ["Velg {file}"] }, { "msgid": "Choose %n file", "msgid_plural": "Choose %n files", "msgstr": ["Velg %n fil", "Velg %n filer"] }, { "msgid": "Copy", "msgstr": ["Kopier"] }, { "msgid": "Copy to {target}", "msgstr": ["Kopier til {target}"] }, { "msgid": "Could not create the new folder", "msgstr": ["Kunne ikke opprette den nye mappen"] }, { "msgid": "Could not load files settings", "msgstr": ["Kunne ikke laste filinnstillinger"] }, { "msgid": "Could not load files views", "msgstr": ["Kunne ikke laste filvisninger"] }, { "msgid": "Create directory", "msgstr": ["Opprett mappe"] }, { "msgid": "Current view selector", "msgstr": ["Nåværende visningsvelger"] }, { "msgid": "Enter your name", "msgstr": ["Skriv inn navnet ditt"] }, { "msgid": "Failed to set nickname.", "msgstr": ["Kunne ikke lagre kallenavnet."] }, { "msgid": "Favorites", "msgstr": ["Favoritter"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["Filer og mapper du markerer som favoritter vil vises her."] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["Filer og mapper du nylig har endret, vil vises her."] }, { "msgid": "Filter file list", "msgstr": ["Filtrer filliste"] }, { "msgid": "Folder name cannot be empty.", "msgstr": ["Mappenavn kan ikke være tomt."] }, { "msgid": "Guest identification", "msgstr": ["Gjesteidentifikasjon"] }, { "msgid": "Home", "msgstr": ["Hjem"] }, { "msgid": "Invalid name.", "msgstr": ["Ugyldig navn."] }, { "msgid": "Modified", "msgstr": ["Modifisert"] }, { "msgid": "Move", "msgstr": ["Flytt"] }, { "msgid": "Move to {target}", "msgstr": ["Flytt til {target}"] }, { "msgid": "Name", "msgstr": ["Navn"] }, { "msgid": "Names must not be empty.", "msgstr": ["Navn kan ikke være tomme."] }, { "msgid": 'Names must not end with "{extension}".', "msgstr": ['Navn kan ikke ende med "{extension}".'] }, { "msgid": "Names must not start with a dot.", "msgstr": ["Navn kan ikke starte med et punktum."] }, { "msgid": "New", "msgstr": ["Ny"] }, { "msgid": "New folder", "msgstr": ["Ny mappe"] }, { "msgid": "New folder name", "msgstr": ["Nytt mappenavn"] }, { "msgid": "No files in here", "msgstr": ["Ingen filer her"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["Ingen filer funnet med ditt filter."] }, { "msgid": "No matching files", "msgstr": ["Ingen filer samsvarer"] }, { "msgid": "Please enter a name with at least 2 characters.", "msgstr": ["Vennligst angi et navn som har minst 2 tegn."] }, { "msgid": "Recent", "msgstr": ["Nylige"] }, { "msgid": "Select all entries", "msgstr": ["Velg alle oppføringer"] }, { "msgid": "Select entry", "msgstr": ["Velg oppføring"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["Velg raden for {nodename}"] }, { "msgid": "Size", "msgstr": ["Størrelse"] }, { "msgid": "Submit name", "msgstr": ["Bekreft navn"] }, { "msgid": "Undo", "msgstr": ["Angre"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["Last opp innhold eller synkroniser med enhetene dine!"] }, { "msgid": "You are currently identified as {nickname}.", "msgstr": ["Du er akkurat nå identifisert som {nickname}."] }, { "msgid": "You are currently not identified.", "msgstr": ["Du er akkurat nå ikke identifisert."] }, { "msgid": "You cannot leave the name empty.", "msgstr": ["Du kan ikke la navnet være blankt."] }] }, { "language": "nl", "translations": [{ "msgid": '"{char}" is not allowed inside a folder name.', "msgstr": ["{char}is niet toegestaan in een mapnaam."] }, { "msgid": '"{char}" is not allowed inside a name.', "msgstr": ['"{char}" kan niet gebruikt worden in de benaming.'] }, { "msgid": '"{extension}" is not an allowed name.', "msgstr": ['"{extension}" is geen toegestane naam.'] }, { "msgid": '"{segment}" is a reserved name and not allowed for folder names.', "msgstr": ['"{segment}" is een gereserveerde naam en niet toegestaan in mapnamen.'] }, { "msgid": '"{segment}" is a reserved name and not allowed.', "msgstr": ['"{segment}" is een gereserveerde naam en niet toegestaan.'] }, { "msgid": "%n file conflict", "msgid_plural": "%n files conflict", "msgstr": ["%n bestanden conflicteren", "%nbestand bestanden conflicteren"] }, { "msgid": "%n file conflict in {dirname}", "msgid_plural": "%n file conflicts in {dirname}", "msgstr": ["%n bestand conflicteerd in {dirname}", "%nbestanden conflicteert in {dirname}"] }, { "msgid": "All files", "msgstr": ["Alle bestanden"] }, { "msgid": "Cancel", "msgstr": ["Annuleren"] }, { "msgid": "Cancel the entire operation", "msgstr": ["Annuleer de hele bewerking"] }, { "msgid": "Choose", "msgstr": ["Kiezen"] }, { "msgid": "Choose {file}", "msgstr": ["Kies {file}"] }, { "msgid": "Choose %n file", "msgid_plural": "Choose %n files", "msgstr": ["Kies %n bestand", "Kies %n bestanden"] }, { "msgid": "Confirm", "msgstr": ["Bevestigen"] }, { "msgid": "Continue", "msgstr": ["Doorgaan"] }, { "msgid": "Copy", "msgstr": ["Kopiëren"] }, { "msgid": "Copy to {target}", "msgstr": ["Kopiëren naar {target}"] }, { "msgid": "Could not create the new folder", "msgstr": ["Kon de nieuwe map niet maken"] }, { "msgid": "Could not load files settings", "msgstr": ["Kon de bestandsinstellingen niet laden"] }, { "msgid": "Could not load files views", "msgstr": ["Kon de bestandsweergaves niet laden"] }, { "msgid": "Create directory", "msgstr": ["Map aanmaken"] }, { "msgid": "Current view selector", "msgstr": ["Huidige weergave keuze"] }, { "msgid": "Enter your name", "msgstr": ["Voer je naam in"] }, { "msgid": "Existing version", "msgstr": ["Bestaande versie"] }, { "msgid": "Failed to set nickname.", "msgstr": ["Kon geen bijnaam instellen."] }, { "msgid": "Favorites", "msgstr": ["Favorieten"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["Bestanden en mappen die je als favoriet markeert, verschijnen hier."] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["Bestanden en mappen die je recentelijk hebt gewijzigd, verschijnen hier."] }, { "msgid": "Filter file list", "msgstr": ["Bestandslijst filteren"] }, { "msgid": 'Folder names must not end with "{extension}".', "msgstr": ['Mapnamen mogen niet eindigen op "{extension}".'] }, { "msgid": "Guest identification", "msgstr": ["Gastenidentificatie"] }, { "msgid": "Home", "msgstr": ["Thuis"] }, { "msgid": "If you select both versions, the incoming file will have a number added to its name.", "msgstr": ["Als u beide versies selecteert wordt een nummer toegevoegd aan de naam van het binnenkomende bestand."] }, { "msgid": "Invalid folder name.", "msgstr": ["Ongeldige mapnaam."] }, { "msgid": "Invalid name.", "msgstr": ["Ongeldige naam."] }, { "msgid": "Last modified date unknown", "msgstr": ["Laatste wijzigingsdatum onbekend"] }, { "msgid": "Modified", "msgstr": ["Gewijzigd"] }, { "msgid": "Move", "msgstr": ["Verplaatsen"] }, { "msgid": "Move to {target}", "msgstr": ["Verplaatsen naar {target}"] }, { "msgid": "Name", "msgstr": ["Naam"] }, { "msgid": "Names may be at most 64 characters long.", "msgstr": ["Namen mogen maximaal 64 tekens lang zijn."] }, { "msgid": "Names must not be empty.", "msgstr": ["Namen mogen niet leeg zijn."] }, { "msgid": 'Names must not end with "{extension}".', "msgstr": ['Namen mogen niet eindigen met "{extension}".'] }, { "msgid": "Names must not start with a dot.", "msgstr": ["Namen mogen niet begonnen met een punt."] }, { "msgid": "New", "msgstr": ["Nieuw"] }, { "msgid": "New folder", "msgstr": ["Nieuwe map"] }, { "msgid": "New folder name", "msgstr": ["Nieuwe mapnaam"] }, { "msgid": "New version", "msgstr": ["Nieuwe versie"] }, { "msgid": "No files in here", "msgstr": ["Geen bestanden hier"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["Geen bestanden gevonden die voldoen aan je filter."] }, { "msgid": "No matching files", "msgstr": ["Geen overeenkomende bestanden"] }, { "msgid": "Please enter a name with at least 2 characters.", "msgstr": ["Voer een naam in met minimaal 2 tekens."] }, { "msgid": "Recent", "msgstr": ["Recent"] }, { "msgid": "Select all checkboxes", "msgstr": ["Selecteer alle aanvinkopties"] }, { "msgid": "Select all entries", "msgstr": ["Alle invoer selecteren"] }, { "msgid": "Select all existing files", "msgstr": ["Selecteer alle bestaande bestanden"] }, { "msgid": "Select all new files", "msgstr": ["Selecteer alle nieuwe bestanden"] }, { "msgid": "Select entry", "msgstr": ["Invoer selecteren"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["Selecteer de rij voor {nodename}"] }, { "msgid": "Size", "msgstr": ["Grootte"] }, { "msgid": "Skip %n file", "msgid_plural": "Skip %n files", "msgstr": ["Sla %n bestand over", "Sla %n bestanden over"] }, { "msgid": "Skip this file", "msgstr": ["Sla dit bestand over"] }, { "msgid": "Submit name", "msgstr": ["Naam indienen"] }, { "msgid": "Undo", "msgstr": ["Ongedaan maken"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["Upload inhoud of synchroniseer met je apparaten!"] }, { "msgid": "When an incoming folder is selected, any conflicting files within it will also be overwritten.", "msgstr": ["Als een inkomende map wordt geselecteerd, worden alle conflicterende bestanden daarin overschreven."] }, { "msgid": "When an incoming folder is selected, the content is written into the existing folder and a recursive conflict resolution is performed.", "msgstr": ["Als een inkomende map wordt geselecteerd, wordt de inhoud naar de bestaande map geschreven en wordt een recursieve conflict-oplossing uitgevoerd."] }, { "msgid": "Which files do you want to keep?", "msgstr": ["Welke bestanden wilt u bewaren?"] }, { "msgid": "You are currently identified as {nickname}.", "msgstr": ["Je wordt momenteel geïdentificeerd als {nickname}."] }, { "msgid": "You are currently not identified.", "msgstr": ["Je bent momenteel niet geïdentificeerd."] }, { "msgid": "You cannot leave the name empty.", "msgstr": ["Je kunt de naam niet leeg laten."] }, { "msgid": "You need to choose at least one conflict solution", "msgstr": ["U moet in elk geval een conflictoplossing kiezen"] }, { "msgid": "You need to select at least one version of each file to continue.", "msgstr": ["U moet minstens een versie van elk bestand kiezen om door te gaan. "] }] }, { "language": "pl", "translations": [{ "msgid": '"{char}" is not allowed inside a folder name.', "msgstr": ['Znak "{char}" nie jest dozwolony w nazwie folderu.'] }, { "msgid": '"{char}" is not allowed inside a name.', "msgstr": ['"{char}" nie jest dozwolone w nazwie.'] }, { "msgid": '"{extension}" is not an allowed name.', "msgstr": ['"{extension}" nie jest dozwoloną nazwą.'] }, { "msgid": '"{segment}" is a reserved name and not allowed for folder names.', "msgstr": ['"{segment}" jest nazwą zastrzeżoną i nie jest dozwolona jako nazwa folderu.'] }, { "msgid": '"{segment}" is a reserved name and not allowed.', "msgstr": ['"{segment}" jest zastrzeżoną nazwą i nie jest dozwolone.'] }, { "msgid": "%n file conflict", "msgid_plural": "%n files conflict", "msgstr": ["Konflikt pliku", "Konflikt %n plików", "Konflikt %n plików", "Konflikt %n plików"] }, { "msgid": "%n file conflict in {dirname}", "msgid_plural": "%n file conflicts in {dirname}", "msgstr": ["%n konfliktów pliku w {dirname}", "%n konfliktów plików w {dirname}", "%n konfliktów plików w {dirname}", "%n konfliktów plików w {dirname}"] }, { "msgid": "All files", "msgstr": ["Wszystkie pliki"] }, { "msgid": "Cancel", "msgstr": ["Anuluj"] }, { "msgid": "Cancel the entire operation", "msgstr": ["Anuluj całą operację"] }, { "msgid": "Choose", "msgstr": ["Wybierz"] }, { "msgid": "Choose {file}", "msgstr": ["Wybierz {file}"] }, { "msgid": "Choose %n file", "msgid_plural": "Choose %n files", "msgstr": ["Wybierz %n plik", "Wybierz %n pliki", "Wybierz %n plików", "Wybierz %n plików"] }, { "msgid": "Confirm", "msgstr": ["Potwierdź"] }, { "msgid": "Continue", "msgstr": ["Kontynuuj"] }, { "msgid": "Copy", "msgstr": ["Kopiuj"] }, { "msgid": "Copy to {target}", "msgstr": ["Skopiuj do {target}"] }, { "msgid": "Could not create the new folder", "msgstr": ["Nie można utworzyć nowego folderu"] }, { "msgid": "Could not load files settings", "msgstr": ["Nie można wczytać ustawień plików"] }, { "msgid": "Could not load files views", "msgstr": ["Nie można wczytać widoków plików"] }, { "msgid": "Create directory", "msgstr": ["Utwórz katalog"] }, { "msgid": "Current view selector", "msgstr": ["Bieżący selektor widoku"] }, { "msgid": "Enter your name", "msgstr": ["Wprowadź nazwę"] }, { "msgid": "Existing version", "msgstr": ["Istniejąca wersja"] }, { "msgid": "Failed to set nickname.", "msgstr": ["Nie udało się utworzyć pseudonimu."] }, { "msgid": "Favorites", "msgstr": ["Ulubione"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["Pliki i foldery które oznaczysz jako ulubione będą wyświetlały się tutaj"] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["Pliki i foldery które ostatnio modyfikowałeś będą wyświetlały się tutaj"] }, { "msgid": "Filter file list", "msgstr": ["Filtruj listę plików"] }, { "msgid": 'Folder names must not end with "{extension}".', "msgstr": ['Nazwy folderów nie mogą kończyć się na "{extension}".'] }, { "msgid": "Guest identification", "msgstr": ["Identyfikacja gościa"] }, { "msgid": "Home", "msgstr": ["Strona główna"] }, { "msgid": "If you select both versions, the incoming file will have a number added to its name.", "msgstr": ["Jeśli wybierzesz obie wersje, do nazwy przychodzącego pliku zostanie dodany numer."] }, { "msgid": "Invalid folder name.", "msgstr": ["Nieprawidłowa nazwa folderu."] }, { "msgid": "Invalid name.", "msgstr": ["Nieprawidłowa nazwa."] }, { "msgid": "Last modified date unknown", "msgstr": ["Data ostatniej modyfikacji nieznana"] }, { "msgid": "Modified", "msgstr": ["Zmodyfikowano"] }, { "msgid": "Move", "msgstr": ["Przenieś"] }, { "msgid": "Move to {target}", "msgstr": ["Przejdź do {target}"] }, { "msgid": "Name", "msgstr": ["Nazwa"] }, { "msgid": "Names may be at most 64 characters long.", "msgstr": ["Nazwy mogą mieć maksymalnie 64 znaki."] }, { "msgid": "Names must not be empty.", "msgstr": ["Nazwy nie mogą być puste."] }, { "msgid": 'Names must not end with "{extension}".', "msgstr": ['Nazwy nie mogą kończyć się na "{extension}".'] }, { "msgid": "Names must not start with a dot.", "msgstr": ["Nazwy nie mogą zaczynać się od kropki."] }, { "msgid": "New", "msgstr": ["Nowy"] }, { "msgid": "New folder", "msgstr": ["Nowy folder"] }, { "msgid": "New folder name", "msgstr": ["Nowa nazwa folderu"] }, { "msgid": "New version", "msgstr": ["Nowa wersja"] }, { "msgid": "No files in here", "msgstr": ["Brak plików"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["Nie znaleziono plików spełniających warunki filtru"] }, { "msgid": "No matching files", "msgstr": ["Brak pasujących plików"] }, { "msgid": "Please enter a name with at least 2 characters.", "msgstr": ["Wprowadź nazwę zawierającą minimum 2 znaki."] }, { "msgid": "Recent", "msgstr": ["Ostatni"] }, { "msgid": "Select all checkboxes", "msgstr": ["Zaznacz wszystkie pola wyboru"] }, { "msgid": "Select all entries", "msgstr": ["Wybierz wszystkie wpisy"] }, { "msgid": "Select all existing files", "msgstr": ["Zaznacz wszystkie istniejące pliki"] }, { "msgid": "Select all new files", "msgstr": ["Zaznacz wszystkie nowe pliki"] }, { "msgid": "Select entry", "msgstr": ["Wybierz wpis"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["Wybierz wiersz dla {nodename}"] }, { "msgid": "Size", "msgstr": ["Rozmiar"] }, { "msgid": "Skip %n file", "msgid_plural": "Skip %n files", "msgstr": ["Pomiń %n plik", "Pomiń %n plików", "Pomiń %n plików", "Pomiń %n plików"] }, { "msgid": "Skip this file", "msgstr": ["Pomiń ten plik"] }, { "msgid": "Submit name", "msgstr": ["Zatwierdź nazwę"] }, { "msgid": "Undo", "msgstr": ["Cofnij"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["Wyślij zawartość lub zsynchronizuj ze swoimi urządzeniami!"] }, { "msgid": "When an incoming folder is selected, any conflicting files within it will also be overwritten.", "msgstr": ["Po wybraniu przychodzącego folderu wszystkie konfliktujące pliki w jego obrębie również zostaną nadpisane."] }, { "msgid": "When an incoming folder is selected, the content is written into the existing folder and a recursive conflict resolution is performed.", "msgstr": ["Po wybraniu przychodzącego folderu jego zawartość zostanie zapisana w istniejącym folderze i zostanie przeprowadzone rekursywne rozwiązywanie konfliktów."] }, { "msgid": "Which files do you want to keep?", "msgstr": ["Które pliki chcesz zachować?"] }, { "msgid": "You are currently identified as {nickname}.", "msgstr": ["Obecnie jesteś zidentyfikowany jako {nickname}."] }, { "msgid": "You are currently not identified.", "msgstr": ["Użytkownik nie został uwierzytelniony."] }, { "msgid": "You cannot leave the name empty.", "msgstr": ["Nazwa nie może być pusta."] }, { "msgid": "You need to choose at least one conflict solution", "msgstr": ["Musisz wybrać co najmniej jedno rozwiązanie konfliktu"] }, { "msgid": "You need to select at least one version of each file to continue.", "msgstr": ["Aby kontynuować, musisz wybrać co najmniej jedną wersję każdego pliku."] }] }, { "language": "pt_BR", "translations": [{ "msgid": '"{char}" is not allowed inside a folder name.', "msgstr": ['"{char}" não é permitido dentro de um nome de pasta.'] }, { "msgid": '"{char}" is not allowed inside a name.', "msgstr": ['"{char}" não é permitido dentro de um nome.'] }, { "msgid": '"{extension}" is not an allowed name.', "msgstr": ['"{extension}" não é um nome permitido.'] }, { "msgid": '"{segment}" is a reserved name and not allowed for folder names.', "msgstr": ['"{segment}" é um nome reservado e não permitido para nomes de pasta.'] }, { "msgid": '"{segment}" is a reserved name and not allowed.', "msgstr": ['"{segment}" é um nome reservado e não permitido.'] }, { "msgid": "%n file conflict", "msgid_plural": "%n files conflict", "msgstr": ["%n arquivo conflita", "%n de arquivos conflitam", "%n arquivos conflitam"] }, { "msgid": "%n file conflict in {dirname}", "msgid_plural": "%n file conflicts in {dirname}", "msgstr": ["%n conflito de arquivo em {dirname}", "%n de conflitos de arquivos em {dirname}", "%n conflitos de arquivos em {dirname}"] }, { "msgid": "All files", "msgstr": ["Todos os arquivos"] }, { "msgid": "Cancel", "msgstr": ["Cancelar"] }, { "msgid": "Cancel the entire operation", "msgstr": ["Cancelar toda a operação"] }, { "msgid": "Choose", "msgstr": ["Escolher"] }, { "msgid": "Choose {file}", "msgstr": ["Escolher {file}"] }, { "msgid": "Choose %n file", "msgid_plural": "Choose %n files", "msgstr": ["Escolher %n arquivo", "Escolher %n arquivos", "Escolher %n arquivos"] }, { "msgid": "Confirm", "msgstr": ["Confirmar"] }, { "msgid": "Continue", "msgstr": ["Continuar"] }, { "msgid": "Copy", "msgstr": ["Copiar"] }, { "msgid": "Copy to {target}", "msgstr": ["Copiar para {target}"] }, { "msgid": "Could not create the new folder", "msgstr": ["Não foi possível criar a nova pasta"] }, { "msgid": "Could not load files settings", "msgstr": ["Não foi possível carregar configurações de arquivos"] }, { "msgid": "Could not load files views", "msgstr": ["Não foi possível carregar visualições de arquivos"] }, { "msgid": "Create directory", "msgstr": ["Criar diretório"] }, { "msgid": "Current view selector", "msgstr": ["Seletor de visualização atual"] }, { "msgid": "Enter your name", "msgstr": ["Digite seu nome"] }, { "msgid": "Existing version", "msgstr": ["Versão existente"] }, { "msgid": "Failed to set nickname.", "msgstr": ["Falha ao definir apelido."] }, { "msgid": "Favorites", "msgstr": ["Favoritos"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["Os arquivos e pastas que você marca como favoritos aparecerão aqui."] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["Arquivos e pastas que você modificou recentemente aparecerão aqui."] }, { "msgid": "Filter file list", "msgstr": ["Filtrar lista de arquivos"] }, { "msgid": 'Folder names must not end with "{extension}".', "msgstr": ['Nomes de pasta não podem terminar com "{extension}".'] }, { "msgid": "Guest identification", "msgstr": ["Identificação de convidados"] }, { "msgid": "Home", "msgstr": ["Início"] }, { "msgid": "If you select both versions, the incoming file will have a number added to its name.", "msgstr": ["Se você selecionar ambas as versões, um número será adicionado ao nome do arquivo recebido."] }, { "msgid": "Invalid folder name.", "msgstr": ["Nome de pasta inválido."] }, { "msgid": "Invalid name.", "msgstr": ["Nome inválido."] }, { "msgid": "Last modified date unknown", "msgstr": ["Data da última modificação desconhecida"] }, { "msgid": "Modified", "msgstr": ["Modificado"] }, { "msgid": "Move", "msgstr": ["Mover"] }, { "msgid": "Move to {target}", "msgstr": ["Mover para {target}"] }, { "msgid": "Name", "msgstr": ["Nome"] }, { "msgid": "Names may be at most 64 characters long.", "msgstr": ["Os nomes podem ter no máximo 64 caracteres."] }, { "msgid": "Names must not be empty.", "msgstr": ["Nomes não podem estar vazios."] }, { "msgid": 'Names must not end with "{extension}".', "msgstr": ['Nomes não podem terminar com "{extension}".'] }, { "msgid": "Names must not start with a dot.", "msgstr": ["Nomes não podem começar com um ponto."] }, { "msgid": "New", "msgstr": ["Novo"] }, { "msgid": "New folder", "msgstr": ["Nova pasta"] }, { "msgid": "New folder name", "msgstr": ["Novo nome de pasta"] }, { "msgid": "New version", "msgstr": ["Nova versão"] }, { "msgid": "No files in here", "msgstr": ["Nenhum arquivo aqui"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["Nenhum arquivo correspondente ao seu filtro foi encontrado."] }, { "msgid": "No matching files", "msgstr": ["Nenhum arquivo correspondente"] }, { "msgid": "Please enter a name with at least 2 characters.", "msgstr": ["Digite um nome com pelo menos 2 caracteres."] }, { "msgid": "Recent", "msgstr": ["Recente"] }, { "msgid": "Select all checkboxes", "msgstr": ["Selecione todas as caixas de seleção"] }, { "msgid": "Select all entries", "msgstr": ["Selecionar todas as entradas"] }, { "msgid": "Select all existing files", "msgstr": ["Selecione todos os arquivos existentes"] }, { "msgid": "Select all new files", "msgstr": ["Selecione todos os novos arquivos"] }, { "msgid": "Select entry", "msgstr": ["Selecionar entrada"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["Selecionar a linha para {nodename}"] }, { "msgid": "Size", "msgstr": ["Tamanho"] }, { "msgid": "Skip %n file", "msgid_plural": "Skip %n files", "msgstr": ["Ignorar %n arquivo", "Ignorar %n de arquivos", "Ignorar %n arquivos"] }, { "msgid": "Skip this file", "msgstr": ["Ignorar este arquivo"] }, { "msgid": "Submit name", "msgstr": ["Enviar nome"] }, { "msgid": "Undo", "msgstr": ["Desfazer"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["Faça upload de algum conteúdo ou sincronize com seus dispositivos!"] }, { "msgid": "When an incoming folder is selected, any conflicting files within it will also be overwritten.", "msgstr": ["Ao selecionar uma pasta de entrada, quaisquer arquivos conflitantes dentro dela também serão sobrescritos."] }, { "msgid": "When an incoming folder is selected, the content is written into the existing folder and a recursive conflict resolution is performed.", "msgstr": ["Quando uma pasta de entrada é selecionada, o conteúdo é gravado na pasta existente e uma resolução recursiva de conflitos é realizada."] }, { "msgid": "Which files do you want to keep?", "msgstr": ["Quais arquivos você deseja manter?"] }, { "msgid": "You are currently identified as {nickname}.", "msgstr": ["Você está atualmente identificado como {nickname}."] }, { "msgid": "You are currently not identified.", "msgstr": ["No momento, você não está identificado."] }, { "msgid": "You cannot leave the name empty.", "msgstr": ["Você não pode deixar o nome vazio."] }, { "msgid": "You need to choose at least one conflict solution", "msgstr": ["Você precisa escolher pelo menos uma solução para o conflito"] }, { "msgid": "You need to select at least one version of each file to continue.", "msgstr": ["Você precisa selecionar pelo menos uma versão de cada arquivo para continuar."] }] }, { "language": "pt_PT", "translations": [{ "msgid": '"{char}" is not allowed inside a folder name.', "msgstr": ['"{char}" não é permitido dentro de um nome de pasta.'] }, { "msgid": '"{char}" is not allowed inside a name.', "msgstr": ['"{char}" não é permitido dentro de um nome.'] }, { "msgid": '"{extension}" is not an allowed name.', "msgstr": ['"{extension}" não é um nome permitido.'] }, { "msgid": '"{segment}" is a reserved name and not allowed for folder names.', "msgstr": ['"{segment}" é um nome reservado e não é permitido para nomes de pasta.'] }, { "msgid": '"{segment}" is a reserved name and not allowed.', "msgstr": ['"{segment}" é um nome reservado e não é permitido.'] }, { "msgid": "%n file conflict", "msgid_plural": "%n files conflict", "msgstr": ["%n ficheiro em conflito", "%n ficheiros em conflito", "%n ficheiros em conflito"] }, { "msgid": "%n file conflict in {dirname}", "msgid_plural": "%n file conflicts in {dirname}", "msgstr": ["%n ficheiro em conflito em {dirname}", "%n ficheiros em conflito em {dirname}", "%n ficheiros em conflito em {dirname}"] }, { "msgid": "All files", "msgstr": ["Todos os ficheiros"] }, { "msgid": "Cancel", "msgstr": ["Cancelar"] }, { "msgid": "Cancel the entire operation", "msgstr": ["Cancelar toda a operação"] }, { "msgid": "Choose", "msgstr": ["Escolher"] }, { "msgid": "Choose {file}", "msgstr": ["Escolher {file}"] }, { "msgid": "Choose %n file", "msgid_plural": "Choose %n files", "msgstr": ["Escolha %n ficheiro", "Escolha %n ficheiros", "Escolha %n ficheiros"] }, { "msgid": "Confirm", "msgstr": ["Confirmar"] }, { "msgid": "Continue", "msgstr": ["Continuar"] }, { "msgid": "Copy", "msgstr": ["Copiar"] }, { "msgid": "Copy to {target}", "msgstr": ["Copiar para {target}"] }, { "msgid": "Could not create the new folder", "msgstr": ["Não foi possível criar a nova pasta "] }, { "msgid": "Could not load files settings", "msgstr": ["Não foi possível carregar as definições dos ficheiros"] }, { "msgid": "Could not load files views", "msgstr": ["Não foi possível carregar as visualizações dos ficheiros"] }, { "msgid": "Create directory", "msgstr": ["Criar pasta"] }, { "msgid": "Current view selector", "msgstr": ["Seletor de visualização atual"] }, { "msgid": "Enter your name", "msgstr": ["Introduza o seu nome"] }, { "msgid": "Existing version", "msgstr": ["Versão existente"] }, { "msgid": "Failed to set nickname.", "msgstr": ["Falha ao definir o nome alternativo."] }, { "msgid": "Favorites", "msgstr": ["Favoritos"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["Os ficheiros e as pastas que marcar como favoritos aparecerão aqui."] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["Os ficheiros e as pastas que modificou recentemente aparecerão aqui."] }, { "msgid": "Filter file list", "msgstr": ["Filtrar lista de ficheiros"] }, { "msgid": 'Folder names must not end with "{extension}".', "msgstr": ['Nomes de pasta não podem terminar em "{extension}".'] }, { "msgid": "Guest identification", "msgstr": ["Identificação de convidado"] }, { "msgid": "Home", "msgstr": ["Início"] }, { "msgid": "If you select both versions, the incoming file will have a number added to its name.", "msgstr": ["Se você selecionar ambas as versões, um número será adicionado ao nome do ficheiro recebido."] }, { "msgid": "Invalid folder name.", "msgstr": ["Nome de pasta inválido."] }, { "msgid": "Invalid name.", "msgstr": ["Nome inválido."] }, { "msgid": "Last modified date unknown", "msgstr": ["Data da última modificação desconhecida"] }, { "msgid": "Modified", "msgstr": ["Modificado"] }, { "msgid": "Move", "msgstr": ["Mover"] }, { "msgid": "Move to {target}", "msgstr": ["Mover para {target}"] }, { "msgid": "Name", "msgstr": ["Nome"] }, { "msgid": "Names may be at most 64 characters long.", "msgstr": ["Os nomes podem ter no máximo 64 caracteres."] }, { "msgid": "Names must not be empty.", "msgstr": ["O nome não pode ficar em branco."] }, { "msgid": 'Names must not end with "{extension}".', "msgstr": ['Nomes não podem terminar em "{extension}".'] }, { "msgid": "Names must not start with a dot.", "msgstr": ["Os nomes não podem começar por um ponto."] }, { "msgid": "New", "msgstr": ["Novo"] }, { "msgid": "New folder", "msgstr": ["Nova pasta"] }, { "msgid": "New folder name", "msgstr": ["Novo nome da pasta"] }, { "msgid": "New version", "msgstr": ["Nova versão"] }, { "msgid": "No files in here", "msgstr": ["Sem ficheiros aqui"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["Não foi encontrado nenhum ficheiro correspondente ao seu filtro."] }, { "msgid": "No matching files", "msgstr": ["Nenhum ficheiro correspondente"] }, { "msgid": "Please enter a name with at least 2 characters.", "msgstr": ["Introduza um nome com, pelo menos, 2 caracteres."] }, { "msgid": "Recent", "msgstr": ["Recentes"] }, { "msgid": "Select all checkboxes", "msgstr": ["Selecione todas as caixas de seleção"] }, { "msgid": "Select all entries", "msgstr": ["Selecionar todas as entradas"] }, { "msgid": "Select all existing files", "msgstr": ["Selecione todos os ficheiros existentes"] }, { "msgid": "Select all new files", "msgstr": ["Selecione todos os novos ficheiros"] }, { "msgid": "Select entry", "msgstr": ["Selecionar entrada"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["Selecione a linha para {nodename}"] }, { "msgid": "Size", "msgstr": ["Tamanho"] }, { "msgid": "Skip %n file", "msgid_plural": "Skip %n files", "msgstr": ["Ignorar %n ficheiro", "Ignorar %n ficheiros", "Ignorar %n ficheiros"] }, { "msgid": "Skip this file", "msgstr": ["Ignorar este ficheiro"] }, { "msgid": "Submit name", "msgstr": ["Submeter nome"] }, { "msgid": "Undo", "msgstr": ["Anular"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["Envie algum conteúdo ou sincronize com os seus dispositivos!"] }, { "msgid": "When an incoming folder is selected, any conflicting files within it will also be overwritten.", "msgstr": ["Ao selecionar uma pasta de entrada, quaisquer ficheiros conflituantes dentro da mesma serão também sobrescritos."] }, { "msgid": "When an incoming folder is selected, the content is written into the existing folder and a recursive conflict resolution is performed.", "msgstr": ["Quando uma pasta de entrada é selecionada, o conteúdo é gravado na pasta existente e é realizada uma resolução recursiva de conflitos."] }, { "msgid": "Which files do you want to keep?", "msgstr": ["Quais os ficheiros que deseja manter?"] }, { "msgid": "You are currently identified as {nickname}.", "msgstr": ["Atualmente está identificado como {nickname}."] }, { "msgid": "You are currently not identified.", "msgstr": ["Atualmente, não está identificado."] }, { "msgid": "You cannot leave the name empty.", "msgstr": ["Não pode deixar o nome em branco."] }, { "msgid": "You need to choose at least one conflict solution", "msgstr": ["É preciso escolher pelo menos uma solução para o conflito."] }, { "msgid": "You need to select at least one version of each file to continue.", "msgstr": ["É necessário selecionar pelo menos uma versão de cada ficheiro para continuar."] }] }, { "language": "ro", "translations": [{ "msgid": '"{name}" is an invalid folder name.', "msgstr": ['"{name}" este un nume de director invalid.'] }, { "msgid": '"{name}" is not an allowed folder name', "msgstr": ['"{name}" nu este un nume de director permis'] }, { "msgid": '"/" is not allowed inside a folder name.', "msgstr": ['"/" nu este permis în numele unui director.'] }, { "msgid": "All files", "msgstr": ["Toate fișierele"] }, { "msgid": "Choose", "msgstr": ["Alege"] }, { "msgid": "Choose {file}", "msgstr": ["Alege {file}"] }, { "msgid": "Choose %n file", "msgid_plural": "Choose %n files", "msgstr": ["Alege %n fișier", "Alege %n fișiere", "Alege %n fișiere"] }, { "msgid": "Copy", "msgstr": ["Copiază"] }, { "msgid": "Copy to {target}", "msgstr": ["Copiază în {target}"] }, { "msgid": "Could not create the new folder", "msgstr": ["Nu s-a putut crea noul director"] }, { "msgid": "Could not load files settings", "msgstr": ["Nu s-au putut încărca setările fișierelor"] }, { "msgid": "Could not load files views", "msgstr": ["Nu s-au putut încărca vizualizările fișierelor"] }, { "msgid": "Create directory", "msgstr": ["Creează director"] }, { "msgid": "Current view selector", "msgstr": ["Selectorul curent al vizualizării"] }, { "msgid": "Favorites", "msgstr": ["Favorite"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["Fișiere și directoare pe care le marcați ca favorite vor apărea aici."] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["Fișiere și directoare pe care le-ați modificat recent vor apărea aici."] }, { "msgid": "Filter file list", "msgstr": ["Filtrează lista de fișiere"] }, { "msgid": "Folder name cannot be empty.", "msgstr": ["Numele de director nu poate fi necompletat."] }, { "msgid": "Home", "msgstr": ["Acasă"] }, { "msgid": "Modified", "msgstr": ["Modificat"] }, { "msgid": "Move", "msgstr": ["Mută"] }, { "msgid": "Move to {target}", "msgstr": ["Mută către {target}"] }, { "msgid": "Name", "msgstr": ["Nume"] }, { "msgid": "New", "msgstr": ["Nou"] }, { "msgid": "New folder", "msgstr": ["Director nou"] }, { "msgid": "New folder name", "msgstr": ["Numele noului director"] }, { "msgid": "No files in here", "msgstr": ["Nu există fișiere"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["Nu există fișiere potrivite pentru filtrul selectat"] }, { "msgid": "No matching files", "msgstr": ["Nu există fișiere potrivite"] }, { "msgid": "Recent", "msgstr": ["Recente"] }, { "msgid": "Select all entries", "msgstr": ["Selectează toate înregistrările"] }, { "msgid": "Select entry", "msgstr": ["Selectează înregistrarea"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["Selectează rândul pentru {nodename}"] }, { "msgid": "Size", "msgstr": ["Mărime"] }, { "msgid": "Undo", "msgstr": ["Anulează"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["Încărcați conținut sau sincronizați cu dispozitivele dumneavoastră!"] }] }, { "language": "ru", "translations": [{ "msgid": '"{char}" is not allowed inside a folder name.', "msgstr": ['"{char}" не допускается в названии папки.'] }, { "msgid": '"{char}" is not allowed inside a name.', "msgstr": ['"{char}" не допускается внутри имени.'] }, { "msgid": '"{extension}" is not an allowed name.', "msgstr": ['"{extension}" это не допустимое имя.'] }, { "msgid": '"{segment}" is a reserved name and not allowed for folder names.', "msgstr": ['"{segment}" это зарезервированное имя и не допустимо для имени папки.'] }, { "msgid": '"{segment}" is a reserved name and not allowed.', "msgstr": ['"{segment}" это зарезервированное имя и не допустимо.'] }, { "msgid": "%n file conflict", "msgid_plural": "%n files conflict", "msgstr": ["%n конфликт файла", "%n конфликта файлов", "%n конфликтов файлов", "%n конфликтов файлов"] }, { "msgid": "%n file conflict in {dirname}", "msgid_plural": "%n file conflicts in {dirname}", "msgstr": ["%n конфликт файлов в {dirname}", "%n конфликта файлов в {dirname}", "%n конфликтов файлов в {dirname}", "%n конфликтов файлов в {dirname}"] }, { "msgid": "All files", "msgstr": ["Все файлы"] }, { "msgid": "Cancel", "msgstr": ["Отмена"] }, { "msgid": "Cancel the entire operation", "msgstr": ["Отмена операции"] }, { "msgid": "Choose", "msgstr": ["Выбрать"] }, { "msgid": "Choose {file}", "msgstr": ["Выбрать «{file}»"] }, { "msgid": "Choose %n file", "msgid_plural": "Choose %n files", "msgstr": ["Выбрать %n файл", "Выбрать %n файла", "Выбрать %n файлов", "Выбрать %n файлов"] }, { "msgid": "Confirm", "msgstr": ["Подтвердить"] }, { "msgid": "Continue", "msgstr": ["Продолжить"] }, { "msgid": "Copy", "msgstr": ["Копировать"] }, { "msgid": "Copy to {target}", "msgstr": ["Копировать в «{target}»"] }, { "msgid": "Could not create the new folder", "msgstr": ["Не удалось создать новую папку"] }, { "msgid": "Could not load files settings", "msgstr": ["Не удалось загрузить настройки файлов"] }, { "msgid": "Could not load files views", "msgstr": ["Не удалось загрузить конфигурацию просмотра файлов"] }, { "msgid": "Create directory", "msgstr": ["Создать папку"] }, { "msgid": "Current view selector", "msgstr": ["Переключатель текущего вида"] }, { "msgid": "Enter your name", "msgstr": ["Введите ваше имя"] }, { "msgid": "Existing version", "msgstr": ["Текущая версия"] }, { "msgid": "Failed to set nickname.", "msgstr": ["Не удалось задать никнейм."] }, { "msgid": "Favorites", "msgstr": ["Избранное"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["Здесь будут отображаться файлы и папки, которые вы пометили как избранные."] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["Здесь будут отображаться файлы и папки, которые вы недавно изменили."] }, { "msgid": "Filter file list", "msgstr": ["Фильтровать список файлов"] }, { "msgid": 'Folder names must not end with "{extension}".', "msgstr": ['Имена папок не могут оканчиваться на "{extension}".'] }, { "msgid": "Guest identification", "msgstr": ["Гостевая идентификация"] }, { "msgid": "Home", "msgstr": ["Домой"] }, { "msgid": "If you select both versions, the incoming file will have a number added to its name.", "msgstr": ["Если вы выберете обе версии, к имени входящего файла будет добавлен номер."] }, { "msgid": "Invalid folder name.", "msgstr": ["Недопустимое имя папки."] }, { "msgid": "Invalid name.", "msgstr": ["Неверное имя."] }, { "msgid": "Last modified date unknown", "msgstr": ["Дата последнего изменения неизвестна"] }, { "msgid": "Modified", "msgstr": ["Изменен"] }, { "msgid": "Move", "msgstr": ["Переместить"] }, { "msgid": "Move to {target}", "msgstr": ["Переместить в «{target}»"] }, { "msgid": "Name", "msgstr": ["Имя"] }, { "msgid": "Names may be at most 64 characters long.", "msgstr": ["Имена не могут быть длинее 64 символов."] }, { "msgid": "Names must not be empty.", "msgstr": ["Имена не могут быть пустыми."] }, { "msgid": 'Names must not end with "{extension}".', "msgstr": ['Имена не могут оканчиваться на "{extension}".'] }, { "msgid": "Names must not start with a dot.", "msgstr": ["Имена должны начинаться с точки."] }, { "msgid": "New", "msgstr": ["Новый"] }, { "msgid": "New folder", "msgstr": ["Новая папка"] }, { "msgid": "New folder name", "msgstr": ["Имя новой папки"] }, { "msgid": "New version", "msgstr": ["Новая версия"] }, { "msgid": "No files in here", "msgstr": ["Здесь нет файлов"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["Файлы, соответствующие вашему фильтру, не найдены."] }, { "msgid": "No matching files", "msgstr": ["Нет подходящих файлов"] }, { "msgid": "Please enter a name with at least 2 characters.", "msgstr": ["Введите имя длиной не менее 2 символов."] }, { "msgid": "Recent", "msgstr": ["Недавний"] }, { "msgid": "Select all checkboxes", "msgstr": ["Выбрать все флажки"] }, { "msgid": "Select all entries", "msgstr": ["Выбрать все записи"] }, { "msgid": "Select all existing files", "msgstr": ["Выбрать все существующие файлы"] }, { "msgid": "Select all new files", "msgstr": ["Выбрать все новые файлы"] }, { "msgid": "Select entry", "msgstr": ["Выбрать запись"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["Выбрать строку для «{nodename}»"] }, { "msgid": "Size", "msgstr": ["Размер"] }, { "msgid": "Skip %n file", "msgid_plural": "Skip %n files", "msgstr": ["Пропустить %n файл", "Пропустить %n файла", "Пропустить %n файлов", "Пропустить %n файлов"] }, { "msgid": "Skip this file", "msgstr": ["Пропустить файл"] }, { "msgid": "Submit name", "msgstr": ["Отправить имя"] }, { "msgid": "Undo", "msgstr": ["Отменить"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["Загрузите контент или синхронизируйте его со своими устройствами!"] }, { "msgid": "When an incoming folder is selected, any conflicting files within it will also be overwritten.", "msgstr": ["Когда выбрана входящая папка, все конфликтующие файлы в ней также будут перезаписаны."] }, { "msgid": "When an incoming folder is selected, the content is written into the existing folder and a recursive conflict resolution is performed.", "msgstr": ["Когда выбрана входящая папка, содержимое записывается в существующую папку и выполняется рекурсивное разрешение конфликтов."] }, { "msgid": "Which files do you want to keep?", "msgstr": ["Какие файлы вы хотите сохранить?"] }, { "msgid": "You are currently identified as {nickname}.", "msgstr": ["Вы идентифицированы как {nickname}."] }, { "msgid": "You are currently not identified.", "msgstr": ["В данный момент вы не идентифицированы."] }, { "msgid": "You cannot leave the name empty.", "msgstr": ["Вы не можете оставить имя пустым."] }, { "msgid": "You need to choose at least one conflict solution", "msgstr": ["Вам нужно выбрать хотя бы одно решение конфликта"] }, { "msgid": "You need to select at least one version of each file to continue.", "msgstr": ["Для продолжения вам нужно выбрать хотя бы одну версию каждого файла."] }] }, { "language": "sk_SK", "translations": [{ "msgid": '"{char}" is not allowed inside a folder name.', "msgstr": ['"{char}" nie je povolené v názve priečinka.'] }, { "msgid": '"{char}" is not allowed inside a name.', "msgstr": ['"{char}" nie je povolené v rámci mena.'] }, { "msgid": '"{extension}" is not an allowed name.', "msgstr": ['"{extension}" nie je povolený názov.'] }, { "msgid": '"{segment}" is a reserved name and not allowed for folder names.', "msgstr": ["„{segment}“ je rezervované meno a nie je povolené na názvy priečinkov."] }, { "msgid": '"{segment}" is a reserved name and not allowed.', "msgstr": ['"{segment}" je rezervované meno a nie je povolené.'] }, { "msgid": "%n file conflict", "msgid_plural": "%n files conflict", "msgstr": ["%n konflikt súborov", "%n konflikty súborov", "%n konfliktov súborov", "%n konflikty súborov"] }, { "msgid": "%n file conflict in {dirname}", "msgid_plural": "%n file conflicts in {dirname}", "msgstr": ["%n konflikt súborov v {dirname}", "%n konflikty súborov v {dirname}", "%n konfliktov súborov v {dirname}", "%n konfliktov súborov v {dirname}"] }, { "msgid": "All files", "msgstr": ["Všetky súbory"] }, { "msgid": "Cancel", "msgstr": ["Zrušiť"] }, { "msgid": "Cancel the entire operation", "msgstr": ["Zrušiť celú operáciu"] }, { "msgid": "Choose", "msgstr": ["Vybrať"] }, { "msgid": "Choose {file}", "msgstr": ["Vybrať {súbor}"] }, { "msgid": "Choose %n file", "msgid_plural": "Choose %n files", "msgstr": ["Vybraný %n súbor", "Vybrané %n súbory", "Vybraných %n súborov", "Vybraných %n súborov"] }, { "msgid": "Confirm", "msgstr": ["Potvrdiť"] }, { "msgid": "Continue", "msgstr": ["Pokračovať"] }, { "msgid": "Copy", "msgstr": ["Kopírovať"] }, { "msgid": "Copy to {target}", "msgstr": ["Kopírovať do {umiestnenia}"] }, { "msgid": "Could not create the new folder", "msgstr": ["Nepodarilo sa vytvoriť nový priečinok"] }, { "msgid": "Could not load files settings", "msgstr": ["Nepodarilo sa načítať nastavenia súborov"] }, { "msgid": "Could not load files views", "msgstr": ["Nepodarilo sa načítať pohľady súborov"] }, { "msgid": "Create directory", "msgstr": ["Vytvoriť adresár"] }, { "msgid": "Current view selector", "msgstr": ["Výber aktuálneho zobrazenia"] }, { "msgid": "Enter your name", "msgstr": ["Zadajte svoje meno"] }, { "msgid": "Existing version", "msgstr": ["Existujúca verzia"] }, { "msgid": "Failed to set nickname.", "msgstr": ["Nepodarilo sa nastaviť prezývku."] }, { "msgid": "Favorites", "msgstr": ["Obľúbené"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["Tu sa zobrazia súbory a priečinky, ktoré označíte ako obľúbené."] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["Tu sa zobrazia súbory a priečinky, ktoré ste nedávno upravili."] }, { "msgid": "Filter file list", "msgstr": ["Filtrovať zoznam súborov"] }, { "msgid": 'Folder names must not end with "{extension}".', "msgstr": ['Názvy priečinkov nesmú končiť na "{extension}".'] }, { "msgid": "Guest identification", "msgstr": ["Identifikácia hosťa"] }, { "msgid": "Home", "msgstr": ["Domov"] }, { "msgid": "If you select both versions, the incoming file will have a number added to its name.", "msgstr": ["Ak vyberiete obe verzie, prichádzajúci súbor bude mať k svojmu názvu pridané číslo."] }, { "msgid": "Invalid folder name.", "msgstr": ["Neplatný názov priečinka."] }, { "msgid": "Invalid name.", "msgstr": ["Neplatné meno."] }, { "msgid": "Last modified date unknown", "msgstr": ["Posledná zmena dátumu neznáma"] }, { "msgid": "Modified", "msgstr": ["Upravené"] }, { "msgid": "Move", "msgstr": ["Prejsť"] }, { "msgid": "Move to {target}", "msgstr": ["Prejsť na {umiestnenie}"] }, { "msgid": "Name", "msgstr": ["Názov"] }, { "msgid": "Names may be at most 64 characters long.", "msgstr": ["Mená môžu mať maximálne 64 znakov."] }, { "msgid": "Names must not be empty.", "msgstr": ["Mená nesmú byť prázdne."] }, { "msgid": 'Names must not end with "{extension}".', "msgstr": ['Mená nesmú končiť "{extension}".'] }, { "msgid": "Names must not start with a dot.", "msgstr": ["Mená nesmú začínať bodkou."] }, { "msgid": "New", "msgstr": ["Pridať"] }, { "msgid": "New folder", "msgstr": ["Pridať priečinok"] }, { "msgid": "New folder name", "msgstr": ["Pridať názov priečinka"] }, { "msgid": "New version", "msgstr": ["Nová verzia"] }, { "msgid": "No files in here", "msgstr": ["Nie sú tu žiadne súbory"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["Nenašli sa žiadne súbory zodpovedajúce vášmu filtru."] }, { "msgid": "No matching files", "msgstr": ["Žiadne zodpovedajúce súbory"] }, { "msgid": "Please enter a name with at least 2 characters.", "msgstr": ["Zadajte meno s aspoň 2 znakmi."] }, { "msgid": "Recent", "msgstr": ["Nedávne"] }, { "msgid": "Select all checkboxes", "msgstr": ["Vyberte všetky zaškrtávacie políčka"] }, { "msgid": "Select all entries", "msgstr": ["Vybrať všetky položky"] }, { "msgid": "Select all existing files", "msgstr": ["Vybrať všetky existujúce súbory"] }, { "msgid": "Select all new files", "msgstr": ["Vybrať všetky nové súbory"] }, { "msgid": "Select entry", "msgstr": ["Vybrať položku"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["Vyberte riadok pre {názov uzla}"] }, { "msgid": "Size", "msgstr": ["Veľkosť"] }, { "msgid": "Skip %n file", "msgid_plural": "Skip %n files", "msgstr": ["Preskočiť %n súbor", "Preskočiť %n súbory", "Preskočiť %n súborov", "Preskočiť %n súbory"] }, { "msgid": "Skip this file", "msgstr": ["Preskočiť tento súbor"] }, { "msgid": "Submit name", "msgstr": ["Zadať meno"] }, { "msgid": "Undo", "msgstr": ["Späť"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["Nahrajte nejaký obsah alebo synchronizujte so svojimi zariadeniami!"] }, { "msgid": "When an incoming folder is selected, any conflicting files within it will also be overwritten.", "msgstr": ["Keď je vybraná prichádzajúca složka, všetky konfliktné súbory v nej budú taktiež prepísané."] }, { "msgid": "When an incoming folder is selected, the content is written into the existing folder and a recursive conflict resolution is performed.", "msgstr": ["Keď je vybraná prichádzajúca zložka, obsah sa zapíše do existujúcej zložky a vykoná sa rekurzívne riešenie konfliktov."] }, { "msgid": "Which files do you want to keep?", "msgstr": ["Ktoré súbory chcete zachovať?"] }, { "msgid": "You are currently identified as {nickname}.", "msgstr": ["Momentálne ste identifikovaný ako {nickname}."] }, { "msgid": "You are currently not identified.", "msgstr": ["Momentálne nie ste identifikovaný."] }, { "msgid": "You cannot leave the name empty.", "msgstr": ["Nemôžete nechať meno prázdne."] }, { "msgid": "You need to choose at least one conflict solution", "msgstr": ["Musíte si vybrať aspoň jedno riešenie konfliktu."] }, { "msgid": "You need to select at least one version of each file to continue.", "msgstr": ["Musíte vybrať aspoň jednu verziu každého súboru, aby ste mohli pokračovať."] }] }, { "language": "sl", "translations": [{ "msgid": '"{name}" is an invalid folder name.', "msgstr": ["{name} je neveljavno ime mape."] }, { "msgid": '"{name}" is not an allowed folder name', "msgstr": ["{name} ni dovoljeno ime mape"] }, { "msgid": '"/" is not allowed inside a folder name.', "msgstr": ['"/" ni dovoljen v imenu mape.'] }, { "msgid": "All files", "msgstr": ["Vse datoteke"] }, { "msgid": "Choose", "msgstr": ["Izberi"] }, { "msgid": "Choose {file}", "msgstr": ["Izberi {file}"] }, { "msgid": "Choose %n file", "msgid_plural": "Choose %n files", "msgstr": ["Izberi %n datoteko", "Izberi %n datoteki", "Izberi %n datotek", "Izberi %n datotek"] }, { "msgid": "Copy", "msgstr": ["Kopiraj"] }, { "msgid": "Copy to {target}", "msgstr": ["Kopiraj v {target}"] }, { "msgid": "Could not create the new folder", "msgstr": ["Nisem mogel ustvariti nove mape"] }, { "msgid": "Could not load files settings", "msgstr": ["NIsem mogel naložiti nastavitev datotek"] }, { "msgid": "Could not load files views", "msgstr": ["Nisem mogel naložiti pogledov datotek"] }, { "msgid": "Create directory", "msgstr": ["Ustvari mapo"] }, { "msgid": "Current view selector", "msgstr": ["Izbirnik trenutnega pogleda"] }, { "msgid": "Favorites", "msgstr": ["Priljubljene"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["Datoteke in mape ki jih označite kot priljubljene se bodo prikazale tukaj."] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["Daoteke in mape ki ste jih pred kratkim spremenili se bodo prikazale tukaj."] }, { "msgid": "Filter file list", "msgstr": ["Filtriraj seznam datotek"] }, { "msgid": "Folder name cannot be empty.", "msgstr": ["Ime mape ne more biti prazno"] }, { "msgid": "Home", "msgstr": ["Domov"] }, { "msgid": "Modified", "msgstr": ["Spremenjeno"] }, { "msgid": "Move", "msgstr": ["Premakni"] }, { "msgid": "Move to {target}", "msgstr": ["Premakni v {target}"] }, { "msgid": "Name", "msgstr": ["Ime"] }, { "msgid": "New", "msgstr": ["Nov"] }, { "msgid": "New folder", "msgstr": ["Nova mapa"] }, { "msgid": "New folder name", "msgstr": ["Novo ime mape"] }, { "msgid": "No files in here", "msgstr": ["Tukaj ni datotek"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["Ni bilo najdenih ujemajočih datotek glede na vaš filter."] }, { "msgid": "No matching files", "msgstr": ["Ni ujemajočih datotek"] }, { "msgid": "Recent", "msgstr": ["Nedavne"] }, { "msgid": "Select all entries", "msgstr": ["Izberi vse vnose"] }, { "msgid": "Select entry", "msgstr": ["Izberi vnos"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["Izberi vrstico za {nodename}"] }, { "msgid": "Size", "msgstr": ["Velikost"] }, { "msgid": "Undo", "msgstr": ["Razveljavi"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["Naloži nekaj vsebine ali sinhroniziraj s svojimi napravami!"] }] }, { "language": "sr", "translations": [{ "msgid": '"{char}" is not allowed inside a name.', "msgstr": ["„{char}” није дозвољено унутар имена."] }, { "msgid": '"{extension}" is not an allowed name.', "msgstr": ["„{extension}” није дозвољено име."] }, { "msgid": '"{name}" is an invalid folder name.', "msgstr": ["„{name}” није исправно име фолдера."] }, { "msgid": '"{name}" is not an allowed folder name', "msgstr": ["„{name}” није дозвољено име за фолдер."] }, { "msgid": '"{segment}" is a reserved name and not allowed.', "msgstr": ["„{segment}” је резервисано име и није дозвољено."] }, { "msgid": '"/" is not allowed inside a folder name.', "msgstr": ["„/” није дозвољено унутар имена фолдера."] }, { "msgid": "All files", "msgstr": ["Сви фајлови"] }, { "msgid": "Cancel", "msgstr": ["Откажи"] }, { "msgid": "Choose", "msgstr": ["Изаберите"] }, { "msgid": "Choose {file}", "msgstr": ["Изаберите {file}"] }, { "msgid": "Choose %n file", "msgid_plural": "Choose %n files", "msgstr": ["Изаберите %n фајл", "Изаберите %n фајла", "Изаберите %n фајлова"] }, { "msgid": "Copy", "msgstr": ["Копирај"] }, { "msgid": "Copy to {target}", "msgstr": ["Копирај у {target}"] }, { "msgid": "Could not create the new folder", "msgstr": ["Није могао да се креира нови фолдер"] }, { "msgid": "Could not load files settings", "msgstr": ["Не могу да се учитају подешавања фајлова"] }, { "msgid": "Could not load files views", "msgstr": ["Не могу да се учитају прикази фајлова"] }, { "msgid": "Create directory", "msgstr": ["Креирај директоријум"] }, { "msgid": "Current view selector", "msgstr": ["Бирач тренутног приказа"] }, { "msgid": "Enter your name", "msgstr": ["Унесите своје име"] }, { "msgid": "Failed to set nickname.", "msgstr": ["Није успело постављање надимка."] }, { "msgid": "Favorites", "msgstr": ["Омиљено"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["Овде ће се појавити фајлови и фолдери које сте означили као омиљене."] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["Овде ће се појавити фајлови и фолдери који се се недавно изменили."] }, { "msgid": "Filter file list", "msgstr": ["Фитрирање листе фајлова"] }, { "msgid": "Folder name cannot be empty.", "msgstr": ["Име фолдера не може бити празно."] }, { "msgid": "Guest identification", "msgstr": ["Идентификација госта"] }, { "msgid": "Home", "msgstr": ["Почетак"] }, { "msgid": "Invalid name.", "msgstr": ["Неисправно име."] }, { "msgid": "Modified", "msgstr": ["Измењено"] }, { "msgid": "Move", "msgstr": ["Премести"] }, { "msgid": "Move to {target}", "msgstr": ["Премести у {target}"] }, { "msgid": "Name", "msgstr": ["Име"] }, { "msgid": "Names may be at most 64 characters long.", "msgstr": ["Највећа дужина имена може бити 64 карактера."] }, { "msgid": "Names must not be empty.", "msgstr": ["Имена не смеју да буду празна."] }, { "msgid": 'Names must not end with "{extension}".', "msgstr": ["Имена не смеју да се завршавају на „{extension}”."] }, { "msgid": "Names must not start with a dot.", "msgstr": ["Имена не смеју да почињу тачком."] }, { "msgid": "New", "msgstr": ["Ново"] }, { "msgid": "New folder", "msgstr": ["Нови фолдер"] }, { "msgid": "New folder name", "msgstr": ["Име новог фолдера"] }, { "msgid": "No files in here", "msgstr": ["Овде нема фајлова"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["Није пронађен ниједан фајл који задовољава ваш филтер."] }, { "msgid": "No matching files", "msgstr": ["Нема таквих фајлова"] }, { "msgid": "Please enter a name with at least 2 characters.", "msgstr": ["Молимо вас да унесете име од барем два карактера."] }, { "msgid": "Recent", "msgstr": ["Скорашње"] }, { "msgid": "Select all entries", "msgstr": ["Изаберите све ставке"] }, { "msgid": "Select entry", "msgstr": ["Изаберите ставку"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["Изаберите ред за {nodename}"] }, { "msgid": "Size", "msgstr": ["Величина"] }, { "msgid": "Submit name", "msgstr": ["Предај име"] }, { "msgid": "Undo", "msgstr": ["Поништи"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["Отпремите нешто или синхронизујте са својим уређајима!"] }, { "msgid": "You are currently identified as {nickname}.", "msgstr": ["Тренутно се идентификујете као {nickname}."] }, { "msgid": "You are currently not identified.", "msgstr": ["Тренутно немате идентификацију."] }, { "msgid": "You cannot leave the name empty.", "msgstr": ["Име не можете да оставите празно."] }] }, { "language": "sr@latin", "translations": [{ "msgid": '"{name}" is an invalid folder name.', "msgstr": ["„{name}” je neispravan naziv foldera."] }, { "msgid": '"{name}" is not an allowed folder name', "msgstr": ["„{name}” je nedozvoljen naziv foldera."] }, { "msgid": '"/" is not allowed inside a folder name.', "msgstr": ["„/” se ne može koristiti unutar naziva foldera."] }, { "msgid": "All files", "msgstr": ["Svi fajlovi"] }, { "msgid": "Choose", "msgstr": ["Izaberite"] }, { "msgid": "Choose {file}", "msgstr": ["Izaberite {file}"] }, { "msgid": "Choose %n file", "msgid_plural": "Choose %n files", "msgstr": ["Izaberite %n fajl", "Izaberite %n fajla", "Izaberite %n fajlova"] }, { "msgid": "Copy", "msgstr": ["Kopiraj"] }, { "msgid": "Copy to {target}", "msgstr": ["Kopiraj u {target}"] }, { "msgid": "Could not create the new folder", "msgstr": ["Neuspešno kreiranje novog foldera"] }, { "msgid": "Could not load files settings", "msgstr": ["Neuspešno učitavanje podešavanja fajlova"] }, { "msgid": "Could not load files views", "msgstr": ["Neuspešno učitavanje prikaza fajlova"] }, { "msgid": "Create directory", "msgstr": ["Kreiraj direktorijum"] }, { "msgid": "Current view selector", "msgstr": ["Birač trenutnog prikaza"] }, { "msgid": "Favorites", "msgstr": ["Omiljeno"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["Lista omiljenih fajlova i foldera."] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["Lista fajlova i foldera sa skorašnjim izmenama."] }, { "msgid": "Filter file list", "msgstr": ["Fitriranje liste fajlova"] }, { "msgid": "Folder name cannot be empty.", "msgstr": ["Naziv foldera ne može biti prazan."] }, { "msgid": "Home", "msgstr": ["Početak"] }, { "msgid": "Modified", "msgstr": ["Izmenjeno"] }, { "msgid": "Move", "msgstr": ["Premesti"] }, { "msgid": "Move to {target}", "msgstr": ["Premesti u {target}"] }, { "msgid": "Name", "msgstr": ["Naziv"] }, { "msgid": "New", "msgstr": ["Novo"] }, { "msgid": "New folder", "msgstr": ["Novi folder"] }, { "msgid": "New folder name", "msgstr": ["Naziv novog foldera"] }, { "msgid": "No files in here", "msgstr": ["Bez fajlova"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["Nema fajlova koji zadovoljavaju uslove filtera."] }, { "msgid": "No matching files", "msgstr": ["Nema takvih fajlova"] }, { "msgid": "Recent", "msgstr": ["Skorašnje"] }, { "msgid": "Select all entries", "msgstr": ["Izaberite sve stavke"] }, { "msgid": "Select entry", "msgstr": ["Izaberite stavku"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["Izaberite red za {nodename}"] }, { "msgid": "Size", "msgstr": ["Veličina"] }, { "msgid": "Undo", "msgstr": ["Vrati"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["Otpremite sadržaj ili sinhronizujte sa svojim uređajima!"] }] }, { "language": "sv", "translations": [{ "msgid": '"{char}" is not allowed inside a folder name.', "msgstr": ['"{char}" är inte tillåtet i ett mappnamn.'] }, { "msgid": '"{char}" is not allowed inside a name.', "msgstr": ['"{char}" är inte tillåtet i ett namn.'] }, { "msgid": '"{extension}" is not an allowed name.', "msgstr": ['"{extension}" är inte ett tillåtet namn.'] }, { "msgid": '"{segment}" is a reserved name and not allowed for folder names.', "msgstr": ['"{segment}" är ett reserverat namn och inte tillåtet mappnamn.'] }, { "msgid": '"{segment}" is a reserved name and not allowed.', "msgstr": ['"{segment}" är ett reserverat namn och inte tillåtet.'] }, { "msgid": "%n file conflict", "msgid_plural": "%n files conflict", "msgstr": ["%n fil är i konflikt", "%n filer är i konflikt"] }, { "msgid": "%n file conflict in {dirname}", "msgid_plural": "%n file conflicts in {dirname}", "msgstr": ["%n fil är i konflikt i {dirname}", "%n filer är i konflikt i {dirname}"] }, { "msgid": "All files", "msgstr": ["Alla filer"] }, { "msgid": "Cancel", "msgstr": ["Avbryt"] }, { "msgid": "Cancel the entire operation", "msgstr": ["Avbryt hela operationen"] }, { "msgid": "Choose", "msgstr": ["Välj"] }, { "msgid": "Choose {file}", "msgstr": ["Välj {file}"] }, { "msgid": "Choose %n file", "msgid_plural": "Choose %n files", "msgstr": ["Välj %n fil", "Välj %n filer"] }, { "msgid": "Confirm", "msgstr": ["Bekräfta"] }, { "msgid": "Continue", "msgstr": ["Fortsätt"] }, { "msgid": "Copy", "msgstr": ["Kopiera"] }, { "msgid": "Copy to {target}", "msgstr": ["Kopiera till {target}"] }, { "msgid": "Could not create the new folder", "msgstr": ["Kunde inte skapa den nya mappen"] }, { "msgid": "Could not load files settings", "msgstr": ["Kunde inte ladda filinställningar"] }, { "msgid": "Could not load files views", "msgstr": ["Kunde inte ladda filvyer"] }, { "msgid": "Create directory", "msgstr": ["Skapa katalog"] }, { "msgid": "Current view selector", "msgstr": ["Aktuell vyväljare"] }, { "msgid": "Enter your name", "msgstr": ["Ange ditt namn"] }, { "msgid": "Existing version", "msgstr": ["Nuvarande version"] }, { "msgid": "Failed to set nickname.", "msgstr": ["Kunde inte ställa in smeknamn."] }, { "msgid": "Favorites", "msgstr": ["Favoriter"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["Filer och mappar som du markerar som favorit kommer att visas här."] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["Filer och mappar som du nyligen ändrat kommer att visas här."] }, { "msgid": "Filter file list", "msgstr": ["Filtrera fillistan"] }, { "msgid": 'Folder names must not end with "{extension}".', "msgstr": ['Mappnamn får inte sluta med "{extension}".'] }, { "msgid": "Guest identification", "msgstr": ["Gästidentifiering"] }, { "msgid": "Home", "msgstr": ["Hem"] }, { "msgid": "If you select both versions, the incoming file will have a number added to its name.", "msgstr": ["Om du väljer båda versionerna kommer den inkommande filen att få ett nummer tillagt i sitt namn."] }, { "msgid": "Invalid folder name.", "msgstr": ["Ogiltigt mappnamn."] }, { "msgid": "Invalid name.", "msgstr": ["Ogiltigt namn."] }, { "msgid": "Last modified date unknown", "msgstr": ["Senaste ändringsdatum okänt"] }, { "msgid": "Modified", "msgstr": ["Ändrad"] }, { "msgid": "Move", "msgstr": ["Flytta"] }, { "msgid": "Move to {target}", "msgstr": ["Flytta till {target}"] }, { "msgid": "Name", "msgstr": ["Namn"] }, { "msgid": "Names may be at most 64 characters long.", "msgstr": ["Namnen kan vara högst 64 tecken långa."] }, { "msgid": "Names must not be empty.", "msgstr": ["Namn får inte vara tomt."] }, { "msgid": 'Names must not end with "{extension}".', "msgstr": ['Namn får inte sluta med "{extension}".'] }, { "msgid": "Names must not start with a dot.", "msgstr": ["Namn får inte börja med en punkt."] }, { "msgid": "New", "msgstr": ["Ny"] }, { "msgid": "New folder", "msgstr": ["Ny mapp"] }, { "msgid": "New folder name", "msgstr": ["Nytt mappnamn"] }, { "msgid": "New version", "msgstr": ["Ny version"] }, { "msgid": "No files in here", "msgstr": ["Inga filer här"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["Inga filer som matchar ditt filter hittades."] }, { "msgid": "No matching files", "msgstr": ["Inga matchande filer"] }, { "msgid": "Please enter a name with at least 2 characters.", "msgstr": ["Ange ett namn med minst 2 tecken."] }, { "msgid": "Recent", "msgstr": ["Nyligen"] }, { "msgid": "Select all checkboxes", "msgstr": ["Markera alla kryssrutor"] }, { "msgid": "Select all entries", "msgstr": ["Välj alla poster"] }, { "msgid": "Select all existing files", "msgstr": ["Välj alla befintliga filer"] }, { "msgid": "Select all new files", "msgstr": ["Välj alla nya filer"] }, { "msgid": "Select entry", "msgstr": ["Välj post"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["Välj raden för {nodename}"] }, { "msgid": "Size", "msgstr": ["Storlek"] }, { "msgid": "Skip %n file", "msgid_plural": "Skip %n files", "msgstr": ["Hoppa över %n fil", "Hoppa över %n filer"] }, { "msgid": "Skip this file", "msgstr": ["Hoppa över den här filen"] }, { "msgid": "Submit name", "msgstr": ["Skicka namn"] }, { "msgid": "Undo", "msgstr": ["Ångra"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["Ladda upp lite innehåll eller synkronisera med dina enheter!"] }, { "msgid": "When an incoming folder is selected, any conflicting files within it will also be overwritten.", "msgstr": ["När en inkommande mapp väljs kommer eventuella konflikterande filer i den också att skrivas över."] }, { "msgid": "When an incoming folder is selected, the content is written into the existing folder and a recursive conflict resolution is performed.", "msgstr": ["När en inkommande mapp väljs skrivs innehållet in i den befintliga mappen och en rekursiv konfliktlösning utförs."] }, { "msgid": "Which files do you want to keep?", "msgstr": ["Vilka filer vill du behålla?"] }, { "msgid": "You are currently identified as {nickname}.", "msgstr": ["Du är för närvarande identifierad som {nickname}."] }, { "msgid": "You are currently not identified.", "msgstr": ["Du är för närvarande inte identifierad."] }, { "msgid": "You cannot leave the name empty.", "msgstr": ["Du kan inte lämna namnet tomt."] }, { "msgid": "You need to choose at least one conflict solution", "msgstr": ["Du måste välja minst en konfliktlösning"] }, { "msgid": "You need to select at least one version of each file to continue.", "msgstr": ["Du måste välja minst en version av varje fil för att fortsätta."] }] }, { "language": "tr", "translations": [{ "msgid": '"{char}" is not allowed inside a folder name.', "msgstr": ['"{char}" karakteri bir klasör adında kullanılamaz.'] }, { "msgid": '"{char}" is not allowed inside a name.', "msgstr": ['Bir ad içinde "{char}" karakteri kullanılamaz.'] }, { "msgid": '"{extension}" is not an allowed name.', "msgstr": ['"{extension}" adına izin verilmiyor.'] }, { "msgid": '"{segment}" is a reserved name and not allowed for folder names.', "msgstr": ['"{segment}" adı sistem için ayrılmış olduğundan klasör adlarında kullanılamaz.'] }, { "msgid": '"{segment}" is a reserved name and not allowed.', "msgstr": ['"{segment}" adı sistem için ayrılmış olduğundan kullanılamaz.'] }, { "msgid": "%n file conflict", "msgid_plural": "%n files conflict", "msgstr": ["%n dosya çakışıyor", "%n dosya çakışıyor"] }, { "msgid": "%n file conflict in {dirname}", "msgid_plural": "%n file conflicts in {dirname}", "msgstr": ["{dirname} içindeki %n dosya çakışıyor", "{dirname} içindeki %n dosya çakışıyor"] }, { "msgid": "All files", "msgstr": ["Tüm dosyalar"] }, { "msgid": "Cancel", "msgstr": ["İptal"] }, { "msgid": "Cancel the entire operation", "msgstr": ["Tüm işlemi iptal et"] }, { "msgid": "Choose", "msgstr": ["Seçin"] }, { "msgid": "Choose {file}", "msgstr": ["{file} seçin"] }, { "msgid": "Choose %n file", "msgid_plural": "Choose %n files", "msgstr": ["%n dosya seçin", "%n dosya seçin"] }, { "msgid": "Confirm", "msgstr": ["Onayla"] }, { "msgid": "Continue", "msgstr": ["İlerle"] }, { "msgid": "Copy", "msgstr": ["Kopyala"] }, { "msgid": "Copy to {target}", "msgstr": ["{target} üzerine kopyala"] }, { "msgid": "Could not create the new folder", "msgstr": ["Yeni klasör oluşturulamadı"] }, { "msgid": "Could not load files settings", "msgstr": ["Dosyalar uygulamasının ayarları yüklenemedi"] }, { "msgid": "Could not load files views", "msgstr": ["Dosyalar uygulamasının görünümleri yüklenemedi"] }, { "msgid": "Create directory", "msgstr": ["Klasör oluştur"] }, { "msgid": "Current view selector", "msgstr": ["Geçerli görünüm seçici"] }, { "msgid": "Enter your name", "msgstr": ["Adınızı yazın"] }, { "msgid": "Existing version", "msgstr": ["Var olan sürüm"] }, { "msgid": "Failed to set nickname.", "msgstr": ["Takma ad ayarlanamadı."] }, { "msgid": "Favorites", "msgstr": ["Sık kullanılanlar"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["Sık kullanılan olarak seçtiğiniz dosyalar burada görüntülenir."] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["Son zamanlarda değiştirdiğiniz dosya ve klasörler burada görüntülenir."] }, { "msgid": "Filter file list", "msgstr": ["Dosya listesini süz"] }, { "msgid": 'Folder names must not end with "{extension}".', "msgstr": ['Klasör adları "{extension}" ile bitemez.'] }, { "msgid": "Guest identification", "msgstr": ["Konuk kimliği"] }, { "msgid": "Home", "msgstr": ["Giriş"] }, { "msgid": "If you select both versions, the incoming file will have a number added to its name.", "msgstr": ["İki sürümü de seçerseniz, gelen dosyanın adına bir sayı eklenir."] }, { "msgid": "Invalid folder name.", "msgstr": ["Klasör adı geçersiz."] }, { "msgid": "Invalid name.", "msgstr": ["Ad geçersiz."] }, { "msgid": "Last modified date unknown", "msgstr": ["Son değiştirilme tarihi bilinmiyor."] }, { "msgid": "Modified", "msgstr": ["Değiştirilme"] }, { "msgid": "Move", "msgstr": ["Taşı"] }, { "msgid": "Move to {target}", "msgstr": ["{target} üzerine taşı"] }, { "msgid": "Name", "msgstr": ["Ad"] }, { "msgid": "Names may be at most 64 characters long.", "msgstr": ["Adlar en fazla 64 karakter uzunluğunda olabilir."] }, { "msgid": "Names must not be empty.", "msgstr": ["Ad boş olamaz."] }, { "msgid": 'Names must not end with "{extension}".', "msgstr": ['Ad "{extension}" ile bitemez.'] }, { "msgid": "Names must not start with a dot.", "msgstr": ["Ad nokta karakteri ile başlayamaz."] }, { "msgid": "New", "msgstr": ["Yeni"] }, { "msgid": "New folder", "msgstr": ["Yeni klasör"] }, { "msgid": "New folder name", "msgstr": ["Yeni klasör adı"] }, { "msgid": "New version", "msgstr": ["Yeni sürüm"] }, { "msgid": "No files in here", "msgstr": ["Burada herhangi bir dosya yok"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["Süzgece uyan bir dosya bulunamadı."] }, { "msgid": "No matching files", "msgstr": ["Eşleşen bir dosya yok"] }, { "msgid": "Please enter a name with at least 2 characters.", "msgstr": ["Ad en az 2 karakter uzunluğunda olmalıdır."] }, { "msgid": "Recent", "msgstr": ["Son kullanılanlar"] }, { "msgid": "Select all checkboxes", "msgstr": ["Tüm kutuları işaretle"] }, { "msgid": "Select all entries", "msgstr": ["Tüm kayıtları seç"] }, { "msgid": "Select all existing files", "msgstr": ["Tüm var olan dosyaları seç"] }, { "msgid": "Select all new files", "msgstr": ["Tüm yeni dosyaları seç"] }, { "msgid": "Select entry", "msgstr": ["Kaydı seç"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["{nodename} satırını seçin"] }, { "msgid": "Size", "msgstr": ["Boyut"] }, { "msgid": "Skip %n file", "msgid_plural": "Skip %n files", "msgstr": ["%n dosyayı atla", "%n dosyayı atla"] }, { "msgid": "Skip this file", "msgstr": ["Bu dosyayı atla"] }, { "msgid": "Submit name", "msgstr": ["Adı gönder"] }, { "msgid": "Undo", "msgstr": ["Geri al"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["Bazı içerikler yükleyin ya da aygıtlarınızla eşitleyin!"] }, { "msgid": "When an incoming folder is selected, any conflicting files within it will also be overwritten.", "msgstr": ["Bir gelen klasör seçildiğinde, içindeki çakışan dosyaların da üzerine yazılır."] }, { "msgid": "When an incoming folder is selected, the content is written into the existing folder and a recursive conflict resolution is performed.", "msgstr": ["Bir gelen klasör seçildiğinde, içerik var olan klasöre yazılır ve alt klasörlerle bir çakışma çözümü uygulanır."] }, { "msgid": "Which files do you want to keep?", "msgstr": ["Hangi dosyaları tutmak istiyorsunuz?"] }, { "msgid": "You are currently identified as {nickname}.", "msgstr": ["{nickname} olarak tanınıyorsunuz."] }, { "msgid": "You are currently not identified.", "msgstr": ["Henüz kendinizi tanıtmadınız."] }, { "msgid": "You cannot leave the name empty.", "msgstr": ["Ad boş bırakılamaz."] }, { "msgid": "You need to choose at least one conflict solution", "msgstr": ["En az bir çakışma çözümü seçmelisiniz"] }, { "msgid": "You need to select at least one version of each file to continue.", "msgstr": ["İlerlemek için her dosaynın en az bir sürümünü seçmelisiniz."] }] }, { "language": "uk", "translations": [{ "msgid": '"{char}" is not allowed inside a folder name.', "msgstr": ["{char} не дозволено всередині назви каталогу."] }, { "msgid": '"{char}" is not allowed inside a name.', "msgstr": ['"{char}" не дозволено всередині імени.'] }, { "msgid": '"{extension}" is not an allowed name.', "msgstr": [`"{extension}" недозволене ім'я.`] }, { "msgid": '"{segment}" is a reserved name and not allowed for folder names.', "msgstr": ["{segment} є зарезервованим ім'ям і не дозволено для назви каталогу."] }, { "msgid": '"{segment}" is a reserved name and not allowed.', "msgstr": [`"{segment}" зарезервоване ім'я і не дозволено для використання.`] }, { "msgid": "%n file conflict", "msgid_plural": "%n files conflict", "msgstr": ["%n конфлікт файлів", "%n конфлікти файлів", "%n конфліктів файлів", "%n конфліктів файлів"] }, { "msgid": "%n file conflict in {dirname}", "msgid_plural": "%n file conflicts in {dirname}", "msgstr": ["%n конфлікт файлів у каталозі {dirname}", "%n конфлікти файлів у каталозі {dirname}", "%n конфліктів файлів у каталозі {dirname}", "%n конфліктів файлів у каталозі {dirname}"] }, { "msgid": "All files", "msgstr": ["Всі файли"] }, { "msgid": "Cancel", "msgstr": ["Скасувати"] }, { "msgid": "Cancel the entire operation", "msgstr": ["Скасувати всю операцію"] }, { "msgid": "Choose", "msgstr": ["Вибрати"] }, { "msgid": "Choose {file}", "msgstr": ["Вибрати {file}"] }, { "msgid": "Choose %n file", "msgid_plural": "Choose %n files", "msgstr": ["Вибрати %n файл", "Вибрати %n файли", "Вибрати %n файлів", "Вибрати %n файлів"] }, { "msgid": "Confirm", "msgstr": ["Підтвердити"] }, { "msgid": "Continue", "msgstr": ["Продовжити"] }, { "msgid": "Copy", "msgstr": ["Копіювати"] }, { "msgid": "Copy to {target}", "msgstr": ["Копіювати до {target}"] }, { "msgid": "Could not create the new folder", "msgstr": ["Не вдалося створити новий каталог"] }, { "msgid": "Could not load files settings", "msgstr": ["Не вдалося завантажити налаштування файлів"] }, { "msgid": "Could not load files views", "msgstr": ["Не вдалося завантажити подання файлів"] }, { "msgid": "Create directory", "msgstr": ["Створити каталог"] }, { "msgid": "Current view selector", "msgstr": ["Вибір подання"] }, { "msgid": "Enter your name", "msgstr": ["Зазначте ваше ім'я"] }, { "msgid": "Existing version", "msgstr": ["Наявна версія"] }, { "msgid": "Failed to set nickname.", "msgstr": ["Не вдалося встановити псевдо."] }, { "msgid": "Favorites", "msgstr": ["Із зірочкою"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["Тут показуватимуться файли та каталоги, які ви позначите зірочкою."] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["Тут показуватимуться файли та каталоги, які було нещодавно змінено."] }, { "msgid": "Filter file list", "msgstr": ["Фільтрувати список файлів"] }, { "msgid": 'Folder names must not end with "{extension}".', "msgstr": [`Ім'я каталогу не може закінчуватися на "{extension}".`] }, { "msgid": "Guest identification", "msgstr": ["Ім'я для гостя"] }, { "msgid": "Home", "msgstr": ["Домівка"] }, { "msgid": "If you select both versions, the incoming file will have a number added to its name.", "msgstr": ["Якщо вибрати обидві версії, до назви вхідного файлу буде додано цифру. "] }, { "msgid": "Invalid folder name.", "msgstr": ["Недійсне ім'я каталогу."] }, { "msgid": "Invalid name.", "msgstr": ["Недійсне ім'я."] }, { "msgid": "Last modified date unknown", "msgstr": ["Дата останньої зміни невідома"] }, { "msgid": "Modified", "msgstr": ["Змінено"] }, { "msgid": "Move", "msgstr": ["Перемістити"] }, { "msgid": "Move to {target}", "msgstr": ["Перемістити до {target}"] }, { "msgid": "Name", "msgstr": ["Ім'я"] }, { "msgid": "Names may be at most 64 characters long.", "msgstr": ["Імена мають мати довжину не більше 64 символів."] }, { "msgid": "Names must not be empty.", "msgstr": ["Ім'я не може бути порожнє."] }, { "msgid": 'Names must not end with "{extension}".', "msgstr": [`Ім'я не може закінчуватися на "{extension}".`] }, { "msgid": "Names must not start with a dot.", "msgstr": ["Ім'я не може починатися з крапки."] }, { "msgid": "New", "msgstr": ["Новий"] }, { "msgid": "New folder", "msgstr": ["Новий каталог"] }, { "msgid": "New folder name", "msgstr": ["Ім'я нового каталогу"] }, { "msgid": "New version", "msgstr": ["Нова версія"] }, { "msgid": "No files in here", "msgstr": ["Тут відсутні файли"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["Відсутні збіги за фільтром."] }, { "msgid": "No matching files", "msgstr": ["Відсутні збіги файлів."] }, { "msgid": "Please enter a name with at least 2 characters.", "msgstr": ["Зазначте ім'я довжиною не менше 2 символів"] }, { "msgid": "Recent", "msgstr": ["Останні"] }, { "msgid": "Select all checkboxes", "msgstr": ["Вибрати всі прапорці"] }, { "msgid": "Select all entries", "msgstr": ["Вибрати всі записи"] }, { "msgid": "Select all existing files", "msgstr": ["Вибрати всі наявні файли"] }, { "msgid": "Select all new files", "msgstr": ["Вибрати всі нові файли"] }, { "msgid": "Select entry", "msgstr": ["Вибрати запис"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["Вибрати рядок для {nodename}"] }, { "msgid": "Size", "msgstr": ["Розмір"] }, { "msgid": "Skip %n file", "msgid_plural": "Skip %n files", "msgstr": ["Пропустити %n файл", "Пропустити %n файли", "Пропустити %n файлів", "Пропустити %n файлів"] }, { "msgid": "Skip this file", "msgstr": ["Пропустити цей файл"] }, { "msgid": "Submit name", "msgstr": ["Встановити ім'я"] }, { "msgid": "Undo", "msgstr": ["Повернути"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["Завантажте вміст або синхронізуйте з вашим пристроєм!"] }, { "msgid": "When an incoming folder is selected, any conflicting files within it will also be overwritten.", "msgstr": ["Коли вибрано вхідний каталог, будь-які файли з конфліктами буде також перезаписано."] }, { "msgid": "When an incoming folder is selected, the content is written into the existing folder and a recursive conflict resolution is performed.", "msgstr": ["Коли вибрано вхідний каталог, вміст буде записано до існуючого каталогу, а також виконано вирішення конфліктів всередині каталогу."] }, { "msgid": "Which files do you want to keep?", "msgstr": ["Які файли залишити?"] }, { "msgid": "You are currently identified as {nickname}.", "msgstr": ["Вас визначено як {nickname}."] }, { "msgid": "You are currently not identified.", "msgstr": ["Вас не ідентифіковано."] }, { "msgid": "You cannot leave the name empty.", "msgstr": ["Потрібно зазначити ім'я."] }, { "msgid": "You need to choose at least one conflict solution", "msgstr": ["Треб вибрати щонайменше одне рішення конфлікту"] }, { "msgid": "You need to select at least one version of each file to continue.", "msgstr": ["Треба вибрати щонайменше одну версію кожного файлу, щоби продовжити."] }] }, { "language": "uz", "translations": [{ "msgid": '"{char}" is not allowed inside a folder name.', "msgstr": ['Papka nomi ichida "{char}" ga ruxsat berilmaydi.'] }, { "msgid": '"{char}" is not allowed inside a name.', "msgstr": ['Nom ichida "{char}" ga ruxsat berilmagan.'] }, { "msgid": '"{extension}" is not an allowed name.', "msgstr": ['"{extension}" ruxsat etilgan nom emas.'] }, { "msgid": '"{segment}" is a reserved name and not allowed for folder names.', "msgstr": [`"{segment}" ajratilgan nom bo'lib, papka nomlari uchun ruxsat berilmagan.`] }, { "msgid": '"{segment}" is a reserved name and not allowed.', "msgstr": ['"{segment}" - zaxiralangan nom va ruxsat berilmaydi.'] }, { "msgid": "%n file conflict", "msgid_plural": "%n files conflict", "msgstr": ["%n fayl ziddiyatli"] }, { "msgid": "%n file conflict in {dirname}", "msgid_plural": "%n file conflicts in {dirname}", "msgstr": ["{dirname} da %n fayl ziddiyati"] }, { "msgid": "All files", "msgstr": ["Barcha fayllar"] }, { "msgid": "Cancel", "msgstr": ["Bekor qilish"] }, { "msgid": "Cancel the entire operation", "msgstr": ["Butun operatsiyani bekor qiling"] }, { "msgid": "Choose", "msgstr": ["Tanlang"] }, { "msgid": "Choose {file}", "msgstr": ["Tanlang {file}"] }, { "msgid": "Choose %n file", "msgid_plural": "Choose %n files", "msgstr": ["Tanlang %n faylni"] }, { "msgid": "Confirm", "msgstr": ["Tasdiqlang"] }, { "msgid": "Continue", "msgstr": ["Davom eting"] }, { "msgid": "Copy", "msgstr": ["Nusxa"] }, { "msgid": "Copy to {target}", "msgstr": [" {target} ga nusxa"] }, { "msgid": "Could not create the new folder", "msgstr": ["Yangi jild yaratib bo‘lmadi"] }, { "msgid": "Could not load files settings", "msgstr": ["Fayl sozlamalari yuklanmadi"] }, { "msgid": "Could not load files views", "msgstr": ["Fayllarni koʻrishni yuklab boʻlmadi"] }, { "msgid": "Create directory", "msgstr": ["Katalog yaratish"] }, { "msgid": "Current view selector", "msgstr": ["Joriy ko'rinish selektori"] }, { "msgid": "Enter your name", "msgstr": ["Ismingizni kiriting"] }, { "msgid": "Existing version", "msgstr": ["Mavjud versiya"] }, { "msgid": "Failed to set nickname.", "msgstr": ["Taxallusni o‘rnatib bo‘lmadi."] }, { "msgid": "Favorites", "msgstr": ["Tanlanganlar"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["Tanlangan deb belgilagan fayl va papkalar shu yerda koʻrinadi."] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["Siz yaqinda oʻzgartirgan fayl va papkalar shu yerda koʻrinadi."] }, { "msgid": "Filter file list", "msgstr": ["Fayl ro'yxatini filtrlash"] }, { "msgid": 'Folder names must not end with "{extension}".', "msgstr": ['Papka nomlari "{extension}" bilan tugamasligi kerak.'] }, { "msgid": "Guest identification", "msgstr": ["Foydalanuvchini identifikatsiyalash"] }, { "msgid": "Home", "msgstr": ["Uy"] }, { "msgid": "If you select both versions, the incoming file will have a number added to its name.", "msgstr": ["Agar siz ikkala versiyani tanlasangiz, kiruvchi fayl nomiga qo'shilgan raqamga ega bo'ladi."] }, { "msgid": "Invalid folder name.", "msgstr": ["Jild nomi noto'g'ri."] }, { "msgid": "Invalid name.", "msgstr": ["Nomi noto‘g‘ri."] }, { "msgid": "Last modified date unknown", "msgstr": ["Oxirgi tahrirlangan sana noma'lum"] }, { "msgid": "Modified", "msgstr": ["Modifikatsiyalangan"] }, { "msgid": "Move", "msgstr": ["Ko'chirish"] }, { "msgid": "Move to {target}", "msgstr": [" {target} ga ko'chirish"] }, { "msgid": "Name", "msgstr": ["Nomi"] }, { "msgid": "Names may be at most 64 characters long.", "msgstr": ["Ismlar ko'pi bilan 64 ta belgidan iborat bo'lishi mumkin."] }, { "msgid": "Names must not be empty.", "msgstr": ["Ismlar bo'sh bo'lmasligi kerak."] }, { "msgid": 'Names must not end with "{extension}".', "msgstr": ['Ismlar "{extension}" bilan tugamasligi kerak.'] }, { "msgid": "Names must not start with a dot.", "msgstr": ["Ismlar nuqta bilan boshlanmasligi kerak."] }, { "msgid": "New", "msgstr": ["Yangi"] }, { "msgid": "New folder", "msgstr": ["Yangi jild"] }, { "msgid": "New folder name", "msgstr": ["Yangi jild nomi"] }, { "msgid": "New version", "msgstr": ["Yangi versiya"] }, { "msgid": "No files in here", "msgstr": ["Fayl mavjud emas"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["Filtringizga mos keladigan fayl topilmadi."] }, { "msgid": "No matching files", "msgstr": ["Mos fayllar yo'q"] }, { "msgid": "Please enter a name with at least 2 characters.", "msgstr": ["Kamida 2 ta belgidan iborat nom kiriting."] }, { "msgid": "Recent", "msgstr": ["Yaqinda"] }, { "msgid": "Select all checkboxes", "msgstr": ["Barcha katakchalarni belgilang"] }, { "msgid": "Select all entries", "msgstr": ["Barcha yozuvlarni tanlang"] }, { "msgid": "Select all existing files", "msgstr": ["Barcha mavjud fayllarni tanlang"] }, { "msgid": "Select all new files", "msgstr": ["Barcha yangi fayllarni tanlang"] }, { "msgid": "Select entry", "msgstr": ["Yozuvni tanlang"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["{nodename} uchun qatorni tanlang"] }, { "msgid": "Size", "msgstr": ["O`lcham"] }, { "msgid": "Skip %n file", "msgid_plural": "Skip %n files", "msgstr": ["%n faylni oʻtkazib yuborish"] }, { "msgid": "Skip this file", "msgstr": ["Ushbu faylni o'tkazib yuboring"] }, { "msgid": "Submit name", "msgstr": ["Ismni tasdiqlang"] }, { "msgid": "Undo", "msgstr": ["Bekor qilish"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["Qurilmangizga ba'zi kontentni yuklang yoki sinxronlang!"] }, { "msgid": "When an incoming folder is selected, any conflicting files within it will also be overwritten.", "msgstr": ["Kiruvchi papka tanlanganda, undagi har qanday ziddiyatli fayllar ham ustiga yoziladi."] }, { "msgid": "When an incoming folder is selected, the content is written into the existing folder and a recursive conflict resolution is performed.", "msgstr": ["Kiruvchi papka tanlanganda, kontent mavjud jildga yoziladi va nizolarni rekursiv hal qilish amalga oshiriladi."] }, { "msgid": "Which files do you want to keep?", "msgstr": ["Qaysi fayllarni saqlamoqchisiz?"] }, { "msgid": "You are currently identified as {nickname}.", "msgstr": ["Siz hozirda {nickname} sifatida aniqlangansiz."] }, { "msgid": "You are currently not identified.", "msgstr": ["Siz hozirda identifikatsiyadan o'tmagansiz"] }, { "msgid": "You cannot leave the name empty.", "msgstr": ["Ism katagini bo'sh qoldirib bo'lmaydi."] }, { "msgid": "You need to choose at least one conflict solution", "msgstr": ["Siz kamida bitta mojaro yechimini tanlashingiz kerak"] }, { "msgid": "You need to select at least one version of each file to continue.", "msgstr": ["Davom etish uchun har bir faylning kamida bitta versiyasini tanlashingiz kerak."] }] }, { "language": "vi", "translations": [{ "msgid": '"{name}" is an invalid folder name.', "msgstr": ['"{name}" là tên thư mục không hợp lệ.'] }, { "msgid": '"{name}" is not an allowed folder name', "msgstr": ['"1{name}"không phải là tên thư mục được cho phép'] }, { "msgid": '"/" is not allowed inside a folder name.', "msgstr": ['"/"không được phép đặt trong tên thư mục.'] }, { "msgid": "All files", "msgstr": ["Tất cả tệp"] }, { "msgid": "Choose", "msgstr": ["Chọn"] }, { "msgid": "Choose {file}", "msgstr": ["Chọn {file}"] }, { "msgid": "Choose %n file", "msgid_plural": "Choose %n files", "msgstr": ["Chọn %n tệp"] }, { "msgid": "Copy", "msgstr": ["Sao chép"] }, { "msgid": "Copy to {target}", "msgstr": ["Sao chép đến {target}"] }, { "msgid": "Could not create the new folder", "msgstr": ["Không thể tạo thư mục mới"] }, { "msgid": "Could not load files settings", "msgstr": ["Không thể tải tập tin cài đặt"] }, { "msgid": "Could not load files views", "msgstr": ["Không thể tải xuống tệp xem"] }, { "msgid": "Create directory", "msgstr": ["Tạo thư mục"] }, { "msgid": "Current view selector", "msgstr": ["Hiện tại chế độ xem của bộ chọn"] }, { "msgid": "Favorites", "msgstr": ["Yêu cầu thích"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["Các tập tin và thư mục bạn đánh dấu yêu thích sẽ hiển thị ở đây."] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["Các tập tin và thư mục bạn sửa đổi gần đây sẽ hiển thị ở đây."] }, { "msgid": "Filter file list", "msgstr": ["Filter list file"] }, { "msgid": "Folder name cannot be empty.", "msgstr": ["Thư mục tên không được để trống."] }, { "msgid": "Home", "msgstr": ["Trang chủ"] }, { "msgid": "Modified", "msgstr": ["Đã sửa đổi"] }, { "msgid": "Move", "msgstr": ["Di chuyển"] }, { "msgid": "Move to {target}", "msgstr": ["Di chuyển đến{target}"] }, { "msgid": "Name", "msgstr": ["Tên"] }, { "msgid": "New", "msgstr": ["Mới"] }, { "msgid": "New folder", "msgstr": ["New thư mục"] }, { "msgid": "New folder name", "msgstr": ["New thư mục tên"] }, { "msgid": "No files in here", "msgstr": ["No file at here"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["Không tìm thấy tệp nào phù hợp với bộ lọc của bạn."] }, { "msgid": "No matching files", "msgstr": ["No file phù hợp"] }, { "msgid": "Recent", "msgstr": ["Gần đây"] }, { "msgid": "Select all entries", "msgstr": ["Choose all items"] }, { "msgid": "Select entry", "msgstr": ["Chọn mục nhập"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["Choose hang cho{nodename}"] }, { "msgid": "Size", "msgstr": ["Kích cỡ"] }, { "msgid": "Undo", "msgstr": ["Hoàn tác"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["Tải lên một số nội dung hoặc đồng bộ hóa với thiết bị của bạn!"] }] }, { "language": "zh_CN", "translations": [{ "msgid": '"{name}" is an invalid folder name.', "msgstr": ["“{name}” 是无效的文件夹名称。"] }, { "msgid": '"{name}" is not an allowed folder name', "msgstr": ["“{name}” 不是允许的文件夹名称"] }, { "msgid": '"/" is not allowed inside a folder name.', "msgstr": ["文件夹名称中不允许包含 “/”。"] }, { "msgid": "All files", "msgstr": ["所有文件"] }, { "msgid": "Choose", "msgstr": ["选择"] }, { "msgid": "Choose {file}", "msgstr": ["选择 {file}"] }, { "msgid": "Choose %n file", "msgid_plural": "Choose %n files", "msgstr": ["选择 %n 个文件"] }, { "msgid": "Copy", "msgstr": ["复制"] }, { "msgid": "Copy to {target}", "msgstr": ["复制到 {target}"] }, { "msgid": "Could not create the new folder", "msgstr": ["无法创建新文件夹"] }, { "msgid": "Could not load files settings", "msgstr": ["无法加载文件设置"] }, { "msgid": "Could not load files views", "msgstr": ["无法加载文件视图"] }, { "msgid": "Create directory", "msgstr": ["创建目录"] }, { "msgid": "Current view selector", "msgstr": ["当前视图选择器"] }, { "msgid": "Favorites", "msgstr": ["最爱"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["您标记为最爱的文件与文件夹会显示在这里"] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["您最近修改的文件与文件夹会显示在这里"] }, { "msgid": "Filter file list", "msgstr": ["过滤文件列表"] }, { "msgid": "Folder name cannot be empty.", "msgstr": ["文件夹名称不能为空。"] }, { "msgid": "Home", "msgstr": ["主目录"] }, { "msgid": "Modified", "msgstr": ["已修改"] }, { "msgid": "Move", "msgstr": ["移动"] }, { "msgid": "Move to {target}", "msgstr": ["移动至 {target}"] }, { "msgid": "Name", "msgstr": ["名称"] }, { "msgid": "New", "msgstr": ["新建"] }, { "msgid": "New folder", "msgstr": ["新文件夹"] }, { "msgid": "New folder name", "msgstr": ["新文件夹名称"] }, { "msgid": "No files in here", "msgstr": ["此处无文件"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["找不到符合您过滤条件的文件"] }, { "msgid": "No matching files", "msgstr": ["无符合的文件"] }, { "msgid": "Recent", "msgstr": ["最近"] }, { "msgid": "Select all entries", "msgstr": ["选择所有条目"] }, { "msgid": "Select entry", "msgstr": ["选择条目"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["选择 {nodename} 的列"] }, { "msgid": "Size", "msgstr": ["大小"] }, { "msgid": "Undo", "msgstr": [" 撤消"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["上传一些项目或与您的设备同步！"] }] }, { "language": "zh_HK", "translations": [{ "msgid": '"{char}" is not allowed inside a folder name.', "msgstr": ["資料夾名稱中不允許使用「{char}」。"] }, { "msgid": '"{char}" is not allowed inside a name.', "msgstr": ['名稱中不能使用 "{char}"。'] }, { "msgid": '"{extension}" is not an allowed name.', "msgstr": ["「{extension}」並非允許的名稱。"] }, { "msgid": '"{segment}" is a reserved name and not allowed for folder names.', "msgstr": ["「{segment}」為保留名稱，不能用作資料夾名稱。"] }, { "msgid": '"{segment}" is a reserved name and not allowed.', "msgstr": ["「{segment}」是一個保留名稱，不能使用。"] }, { "msgid": "%n file conflict", "msgid_plural": "%n files conflict", "msgstr": ["%n 檔案衝突"] }, { "msgid": "%n file conflict in {dirname}", "msgid_plural": "%n file conflicts in {dirname}", "msgstr": ["{dirname} 中有 %n 個檔案衝突"] }, { "msgid": "All files", "msgstr": ["所有檔案"] }, { "msgid": "Cancel", "msgstr": ["取消"] }, { "msgid": "Cancel the entire operation", "msgstr": ["取消整個操作"] }, { "msgid": "Choose", "msgstr": ["選擇"] }, { "msgid": "Choose {file}", "msgstr": ["選擇 {file}"] }, { "msgid": "Choose %n file", "msgid_plural": "Choose %n files", "msgstr": ["選擇 %n 個檔案"] }, { "msgid": "Confirm", "msgstr": ["確認"] }, { "msgid": "Continue", "msgstr": ["繼續"] }, { "msgid": "Copy", "msgstr": ["複製"] }, { "msgid": "Copy to {target}", "msgstr": ["複製到 {target}"] }, { "msgid": "Could not create the new folder", "msgstr": ["無法建立新資料夾"] }, { "msgid": "Could not load files settings", "msgstr": ["無法載入檔案設定"] }, { "msgid": "Could not load files views", "msgstr": ["無法載入檔案視圖"] }, { "msgid": "Create directory", "msgstr": ["建立目錄"] }, { "msgid": "Current view selector", "msgstr": ["目前視圖選擇器"] }, { "msgid": "Enter your name", "msgstr": ["輸入您的名字"] }, { "msgid": "Existing version", "msgstr": ["現有的版本"] }, { "msgid": "Failed to set nickname.", "msgstr": ["無法設置暱稱。"] }, { "msgid": "Favorites", "msgstr": ["最愛"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["您標記為最愛的檔案與資料夾將會顯示在此處。"] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["您最近修改的檔案與資料夾將會顯示在此處。"] }, { "msgid": "Filter file list", "msgstr": ["過濾檔案清單"] }, { "msgid": 'Folder names must not end with "{extension}".', "msgstr": ["資料夾名稱不得以「{extension}」結尾。"] }, { "msgid": "Guest identification", "msgstr": ["訪客身份識別"] }, { "msgid": "Home", "msgstr": ["首頁"] }, { "msgid": "If you select both versions, the incoming file will have a number added to its name.", "msgstr": ["如果您選擇兩個版本，傳入的檔案名稱將會附加一個數字。"] }, { "msgid": "Invalid folder name.", "msgstr": ["無效的資料夾名稱。"] }, { "msgid": "Invalid name.", "msgstr": ["無效的名字。"] }, { "msgid": "Last modified date unknown", "msgstr": ["最後的修改日期不詳"] }, { "msgid": "Modified", "msgstr": ["已修改"] }, { "msgid": "Move", "msgstr": ["移動"] }, { "msgid": "Move to {target}", "msgstr": ["移動至 {target}"] }, { "msgid": "Name", "msgstr": ["名稱"] }, { "msgid": "Names may be at most 64 characters long.", "msgstr": ["名稱長度最多為 64 個字元。"] }, { "msgid": "Names must not be empty.", "msgstr": ["名稱不能為空。"] }, { "msgid": 'Names must not end with "{extension}".', "msgstr": ["名稱不得以「{extension}」結尾。"] }, { "msgid": "Names must not start with a dot.", "msgstr": ["名稱不得以點開頭。"] }, { "msgid": "New", "msgstr": ["新"] }, { "msgid": "New folder", "msgstr": ["新資料夾"] }, { "msgid": "New folder name", "msgstr": ["新資料夾名稱"] }, { "msgid": "New version", "msgstr": ["新版本"] }, { "msgid": "No files in here", "msgstr": ["此處無檔案"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["找不到符合您過濾條件的檔案。"] }, { "msgid": "No matching files", "msgstr": ["沒有匹配的檔案"] }, { "msgid": "Please enter a name with at least 2 characters.", "msgstr": ["請輸入至少 2 個字符的名稱。"] }, { "msgid": "Recent", "msgstr": ["最近"] }, { "msgid": "Select all checkboxes", "msgstr": ["選擇所有復選框"] }, { "msgid": "Select all entries", "msgstr": ["選擇所有項目"] }, { "msgid": "Select all existing files", "msgstr": ["選擇所有現有的檔案"] }, { "msgid": "Select all new files", "msgstr": ["選擇所有新檔案"] }, { "msgid": "Select entry", "msgstr": ["選擇項目"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["選擇 {nodename} 的列"] }, { "msgid": "Size", "msgstr": ["大小"] }, { "msgid": "Skip %n file", "msgid_plural": "Skip %n files", "msgstr": ["跳過 %n 個檔案"] }, { "msgid": "Skip this file", "msgstr": ["跳過此檔案"] }, { "msgid": "Submit name", "msgstr": ["遞交名字"] }, { "msgid": "Undo", "msgstr": ["還原"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["上傳一些內容或與您的裝置同步！"] }, { "msgid": "When an incoming folder is selected, any conflicting files within it will also be overwritten.", "msgstr": ["選取傳入資料夾時，其中任何衝突的檔案也將被覆蓋。"] }, { "msgid": "When an incoming folder is selected, the content is written into the existing folder and a recursive conflict resolution is performed.", "msgstr": ["當選取傳入資料夾時，內容將寫入現有資料夾，並執行遞歸衝突解決。"] }, { "msgid": "Which files do you want to keep?", "msgstr": ["你想保留哪些檔案？"] }, { "msgid": "You are currently identified as {nickname}.", "msgstr": ["您目前被識別為 {nickname}。"] }, { "msgid": "You are currently not identified.", "msgstr": ["您目前尚未被識別。"] }, { "msgid": "You cannot leave the name empty.", "msgstr": ["名稱不能留空。"] }, { "msgid": "You need to choose at least one conflict solution", "msgstr": ["你需要選擇至少一種衝突解決方案。"] }, { "msgid": "You need to select at least one version of each file to continue.", "msgstr": ["您必須選擇每個文件的至少一個版本才能繼續。"] }] }, { "language": "zh_TW", "translations": [{ "msgid": '"{name}" is an invalid file name.', "msgstr": ["「{name}」是無效的檔案名稱。"] }, { "msgid": '"{name}" is not an allowed filetype', "msgstr": ["「{name}」並非允許的檔案類型"] }, { "msgid": '"/" is not allowed inside a file name.', "msgstr": ["檔案名稱中不允許使用「/」。"] }, { "msgid": "All files", "msgstr": ["所有檔案"] }, { "msgid": "Choose", "msgstr": ["選擇"] }, { "msgid": "Choose {file}", "msgstr": ["選擇 {file}"] }, { "msgid": "Copy", "msgstr": ["複製"] }, { "msgid": "Copy to {target}", "msgstr": ["複製到 {target}"] }, { "msgid": "Could not create the new folder", "msgstr": ["無法建立新資料夾"] }, { "msgid": "Create directory", "msgstr": ["建立目錄"] }, { "msgid": "Current view selector", "msgstr": ["目前檢視選取器"] }, { "msgid": "Favorites", "msgstr": ["最愛"] }, { "msgid": "File name cannot be empty.", "msgstr": ["檔案名稱不能為空。"] }, { "msgid": "Filepicker sections", "msgstr": ["檔案挑選器選取"] }, { "msgid": "Files and folders you mark as favorite will show up here.", "msgstr": ["您標記為最愛的檔案與資料夾將會顯示在此處。"] }, { "msgid": "Files and folders you recently modified will show up here.", "msgstr": ["您最近修改的檔案與資料夾將會顯示在此處。"] }, { "msgid": "Filter file list", "msgstr": ["過濾檔案清單"] }, { "msgid": "Home", "msgstr": ["家"] }, { "msgid": "Mime type {mime}", "msgstr": ["Mime type {mime}"] }, { "msgid": "Modified", "msgstr": ["已修改"] }, { "msgid": "Move", "msgstr": ["移動"] }, { "msgid": "Move to {target}", "msgstr": ["移動至 {target}"] }, { "msgid": "Name", "msgstr": ["名稱"] }, { "msgid": "New", "msgstr": ["新"] }, { "msgid": "New folder", "msgstr": ["新資料夾"] }, { "msgid": "New folder name", "msgstr": ["新資料夾名稱"] }, { "msgid": "No files in here", "msgstr": ["此處無檔案"] }, { "msgid": "No files matching your filter were found.", "msgstr": ["找不到符合您過濾條件的檔案。"] }, { "msgid": "No matching files", "msgstr": ["無符合的檔案"] }, { "msgid": "Recent", "msgstr": ["最近"] }, { "msgid": "Select all entries", "msgstr": ["選取所有條目"] }, { "msgid": "Select entry", "msgstr": ["選取條目"] }, { "msgid": "Select the row for {nodename}", "msgstr": ["選取 {nodename} 的列"] }, { "msgid": "Size", "msgstr": ["大小"] }, { "msgid": "Undo", "msgstr": ["復原"] }, { "msgid": "unknown", "msgstr": ["未知"] }, { "msgid": "Upload some content or sync with your devices!", "msgstr": ["上傳一些內容或與您的裝置同步"] }] }]) {
  const { language, translations } = data;
  const bundle = {
    headers: {},
    translations: {
      "": Object.fromEntries(translations.map((translation) => [translation.msgid, translation]))
    }
  };
  gtBuilder.addTranslation(language, bundle);
}
const gt = gtBuilder.build();
gt.ngettext.bind(gt);
gt.gettext.bind(gt);
/*!
 * SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
getLoggerBuilder().setApp("@nextcloud/dialogs").detectLogLevel().build();
const TOAST_ARIA_LIVE_OFF = "off";
const TOAST_ARIA_LIVE_POLITE = "polite";
const TOAST_ARIA_LIVE_ASSERTIVE = "assertive";
var ToastAriaLive = /* @__PURE__ */ ((ToastAriaLive2) => {
  ToastAriaLive2[ToastAriaLive2["OFF"] = TOAST_ARIA_LIVE_OFF] = "OFF";
  ToastAriaLive2[ToastAriaLive2["POLITE"] = TOAST_ARIA_LIVE_POLITE] = "POLITE";
  ToastAriaLive2[ToastAriaLive2["ASSERTIVE"] = TOAST_ARIA_LIVE_ASSERTIVE] = "ASSERTIVE";
  return ToastAriaLive2;
})(ToastAriaLive || {});
const TOAST_DEFAULT_TIMEOUT = 7e3;
function showMessage(data, options) {
  options = {
    timeout: TOAST_DEFAULT_TIMEOUT,
    isHTML: false,
    type: void 0,
    // An undefined selector defaults to the body element
    selector: void 0,
    onRemove: () => {
    },
    onClick: void 0,
    close: true,
    ...options
  };
  if (typeof data === "string" && !options.isHTML) {
    const element = document.createElement("div");
    element.innerHTML = data;
    data = element.innerText;
  }
  let classes = options.type ?? "";
  if (typeof options.onClick === "function") {
    classes += " toast-with-click ";
  }
  const isNode = data instanceof Node;
  let ariaLive = ToastAriaLive.POLITE;
  if (options.ariaLive) {
    ariaLive = options.ariaLive;
  } else if (options.type === "toast-error" || options.type === "toast-undo") {
    ariaLive = ToastAriaLive.ASSERTIVE;
  }
  const toast = Toastify({
    [!isNode ? "text" : "node"]: data,
    duration: options.timeout,
    callback: options.onRemove,
    onClick: options.onClick,
    close: options.close,
    gravity: "top",
    selector: options.selector,
    position: "right",
    backgroundColor: "",
    className: "dialogs " + classes,
    escapeMarkup: !options.isHTML,
    ariaLive
  });
  toast.showToast();
  return toast;
}
function showError(text2, options) {
  return showMessage(text2, {
    ...options,
    type: "toast-error"
    /* ERROR */
  });
}
function bind(fn, thisArg) {
  return function wrap() {
    return fn.apply(thisArg, arguments);
  };
}
const { toString } = Object.prototype;
const { getPrototypeOf } = Object;
const { iterator, toStringTag } = Symbol;
const hasOwnProperty = (({ hasOwnProperty: hasOwnProperty2 }) => (obj, prop) => hasOwnProperty2.call(obj, prop))(Object.prototype);
const hasOwnInPrototypeChain = (thing, prop) => {
  let obj = thing;
  const seen = [];
  while (obj != null && obj !== Object.prototype) {
    if (seen.indexOf(obj) !== -1) {
      return false;
    }
    seen.push(obj);
    if (hasOwnProperty(obj, prop)) {
      return true;
    }
    obj = getPrototypeOf(obj);
  }
  return false;
};
const getSafeProp = (obj, prop) => obj != null && hasOwnInPrototypeChain(obj, prop) ? obj[prop] : void 0;
const kindOf = /* @__PURE__ */ ((cache) => (thing) => {
  const str = toString.call(thing);
  return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null));
const kindOfTest = (type) => {
  type = type.toLowerCase();
  return (thing) => kindOf(thing) === type;
};
const typeOfTest = (type) => (thing) => typeof thing === type;
const { isArray } = Array;
const isUndefined = typeOfTest("undefined");
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && isFunction$1(val.constructor.isBuffer) && val.constructor.isBuffer(val);
}
const isArrayBuffer = kindOfTest("ArrayBuffer");
function isArrayBufferView(val) {
  let result;
  if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
    result = ArrayBuffer.isView(val);
  } else {
    result = val && val.buffer && isArrayBuffer(val.buffer);
  }
  return result;
}
const isString = typeOfTest("string");
const isFunction$1 = typeOfTest("function");
const isNumber = typeOfTest("number");
const isObject = (thing) => thing !== null && typeof thing === "object";
const isBoolean = (thing) => thing === true || thing === false;
const isPlainObject = (val) => {
  if (!isObject(val)) {
    return false;
  }
  const prototype2 = getPrototypeOf(val);
  return (prototype2 === null || prototype2 === Object.prototype || getPrototypeOf(prototype2) === null) && // Treat any genuine (non-Object.prototype-polluted) Symbol.toStringTag or
  // Symbol.iterator as evidence the value is a tagged/iterable type rather
  // than a plain object, while ignoring keys injected onto Object.prototype.
  !hasOwnInPrototypeChain(val, toStringTag) && !hasOwnInPrototypeChain(val, iterator);
};
const isEmptyObject = (val) => {
  if (!isObject(val) || isBuffer(val)) {
    return false;
  }
  try {
    return Object.keys(val).length === 0 && Object.getPrototypeOf(val) === Object.prototype;
  } catch (e2) {
    return false;
  }
};
const isDate = kindOfTest("Date");
const isFile = kindOfTest("File");
const isReactNativeBlob = (value) => {
  return !!(value && typeof value.uri !== "undefined");
};
const isReactNative = (formData) => formData && typeof formData.getParts !== "undefined";
const isBlob = kindOfTest("Blob");
const isFileList = kindOfTest("FileList");
const isStream = (val) => isObject(val) && isFunction$1(val.pipe);
function getGlobal2() {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof self !== "undefined") return self;
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
  return {};
}
const G = getGlobal2();
const FormDataCtor = typeof G.FormData !== "undefined" ? G.FormData : void 0;
const isFormData = (thing) => {
  if (!thing) return false;
  if (FormDataCtor && thing instanceof FormDataCtor) return true;
  const proto = getPrototypeOf(thing);
  if (!proto || proto === Object.prototype) return false;
  if (!isFunction$1(thing.append)) return false;
  const kind = kindOf(thing);
  return kind === "formdata" || // detect form-data instance
  kind === "object" && isFunction$1(thing.toString) && thing.toString() === "[object FormData]";
};
const isURLSearchParams = kindOfTest("URLSearchParams");
const [isReadableStream, isRequest, isResponse, isHeaders] = [
  "ReadableStream",
  "Request",
  "Response",
  "Headers"
].map(kindOfTest);
const trim = (str) => {
  return str.trim ? str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
};
function forEach(obj, fn, { allOwnKeys = false } = {}) {
  if (obj === null || typeof obj === "undefined") {
    return;
  }
  let i2;
  let l2;
  if (typeof obj !== "object") {
    obj = [obj];
  }
  if (isArray(obj)) {
    for (i2 = 0, l2 = obj.length; i2 < l2; i2++) {
      fn.call(null, obj[i2], i2, obj);
    }
  } else {
    if (isBuffer(obj)) {
      return;
    }
    const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
    const len2 = keys.length;
    let key;
    for (i2 = 0; i2 < len2; i2++) {
      key = keys[i2];
      fn.call(null, obj[key], key, obj);
    }
  }
}
function findKey(obj, key) {
  if (isBuffer(obj)) {
    return null;
  }
  key = key.toLowerCase();
  const keys = Object.keys(obj);
  let i2 = keys.length;
  let _key;
  while (i2-- > 0) {
    _key = keys[i2];
    if (key === _key.toLowerCase()) {
      return _key;
    }
  }
  return null;
}
const _global = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  return typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : global;
})();
const isContextDefined = (context) => !isUndefined(context) && context !== _global;
function merge(...objs) {
  const { caseless, skipUndefined } = isContextDefined(this) && this || {};
  const result = {};
  const assignValue = (val, key) => {
    if (key === "__proto__" || key === "constructor" || key === "prototype") {
      return;
    }
    const targetKey = caseless && typeof key === "string" && findKey(result, key) || key;
    const existing = hasOwnProperty(result, targetKey) ? result[targetKey] : void 0;
    if (isPlainObject(existing) && isPlainObject(val)) {
      result[targetKey] = merge(existing, val);
    } else if (isPlainObject(val)) {
      result[targetKey] = merge({}, val);
    } else if (isArray(val)) {
      result[targetKey] = val.slice();
    } else if (!skipUndefined || !isUndefined(val)) {
      result[targetKey] = val;
    }
  };
  for (let i2 = 0, l2 = objs.length; i2 < l2; i2++) {
    const source = objs[i2];
    if (!source || isBuffer(source)) {
      continue;
    }
    forEach(source, assignValue);
    if (typeof source !== "object" || isArray(source)) {
      continue;
    }
    const symbols = Object.getOwnPropertySymbols(source);
    for (let j = 0; j < symbols.length; j++) {
      const symbol = symbols[j];
      if (propertyIsEnumerable.call(source, symbol)) {
        assignValue(source[symbol], symbol);
      }
    }
  }
  return result;
}
const extend = (a2, b2, thisArg, { allOwnKeys } = {}) => {
  forEach(
    b2,
    (val, key) => {
      if (thisArg && isFunction$1(val)) {
        Object.defineProperty(a2, key, {
          // Null-proto descriptor so a polluted Object.prototype.get cannot
          // hijack defineProperty's accessor-vs-data resolution.
          __proto__: null,
          value: bind(val, thisArg),
          writable: true,
          enumerable: true,
          configurable: true
        });
      } else {
        Object.defineProperty(a2, key, {
          __proto__: null,
          value: val,
          writable: true,
          enumerable: true,
          configurable: true
        });
      }
    },
    { allOwnKeys }
  );
  return a2;
};
const stripBOM = (content) => {
  if (content.charCodeAt(0) === 65279) {
    content = content.slice(1);
  }
  return content;
};
const inherits = (constructor, superConstructor, props, descriptors) => {
  constructor.prototype = Object.create(superConstructor.prototype, descriptors);
  Object.defineProperty(constructor.prototype, "constructor", {
    __proto__: null,
    value: constructor,
    writable: true,
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(constructor, "super", {
    __proto__: null,
    value: superConstructor.prototype
  });
  props && Object.assign(constructor.prototype, props);
};
const toFlatObject = (sourceObj, destObj, filter2, propFilter) => {
  let props;
  let i2;
  let prop;
  const merged = {};
  destObj = destObj || {};
  if (sourceObj == null) return destObj;
  do {
    props = Object.getOwnPropertyNames(sourceObj);
    i2 = props.length;
    while (i2-- > 0) {
      prop = props[i2];
      if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
        destObj[prop] = sourceObj[prop];
        merged[prop] = true;
      }
    }
    sourceObj = filter2 !== false && getPrototypeOf(sourceObj);
  } while (sourceObj && (!filter2 || filter2(sourceObj, destObj)) && sourceObj !== Object.prototype);
  return destObj;
};
const endsWith = (str, searchString, position) => {
  str = String(str);
  if (position === void 0 || position > str.length) {
    position = str.length;
  }
  position -= searchString.length;
  const lastIndex = str.indexOf(searchString, position);
  return lastIndex !== -1 && lastIndex === position;
};
const toArray = (thing) => {
  if (!thing) return null;
  if (isArray(thing)) return thing;
  let i2 = thing.length;
  if (!isNumber(i2)) return null;
  const arr = new Array(i2);
  while (i2-- > 0) {
    arr[i2] = thing[i2];
  }
  return arr;
};
const isTypedArray = /* @__PURE__ */ ((TypedArray) => {
  return (thing) => {
    return TypedArray && thing instanceof TypedArray;
  };
})(typeof Uint8Array !== "undefined" && getPrototypeOf(Uint8Array));
const forEachEntry = (obj, fn) => {
  const generator = obj && obj[iterator];
  const _iterator = generator.call(obj);
  let result;
  while ((result = _iterator.next()) && !result.done) {
    const pair = result.value;
    fn.call(obj, pair[0], pair[1]);
  }
};
const matchAll = (regExp, str) => {
  let matches;
  const arr = [];
  while ((matches = regExp.exec(str)) !== null) {
    arr.push(matches);
  }
  return arr;
};
const isHTMLForm = kindOfTest("HTMLFormElement");
const toCamelCase = (str) => {
  return str.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function replacer(m2, p1, p2) {
    return p1.toUpperCase() + p2;
  });
};
const { propertyIsEnumerable } = Object.prototype;
const isRegExp = kindOfTest("RegExp");
const reduceDescriptors = (obj, reducer) => {
  const descriptors = Object.getOwnPropertyDescriptors(obj);
  const reducedDescriptors = {};
  forEach(descriptors, (descriptor, name) => {
    let ret;
    if ((ret = reducer(descriptor, name, obj)) !== false) {
      reducedDescriptors[name] = ret || descriptor;
    }
  });
  Object.defineProperties(obj, reducedDescriptors);
};
const freezeMethods = (obj) => {
  reduceDescriptors(obj, (descriptor, name) => {
    if (isFunction$1(obj) && ["arguments", "caller", "callee"].includes(name)) {
      return false;
    }
    const value = obj[name];
    if (!isFunction$1(value)) return;
    descriptor.enumerable = false;
    if ("writable" in descriptor) {
      descriptor.writable = false;
      return;
    }
    if (!descriptor.set) {
      descriptor.set = () => {
        throw Error("Can not rewrite read-only method '" + name + "'");
      };
    }
  });
};
const toObjectSet = (arrayOrString, delimiter) => {
  const obj = {};
  const define = (arr) => {
    arr.forEach((value) => {
      obj[value] = true;
    });
  };
  isArray(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));
  return obj;
};
const noop = () => {
};
const toFiniteNumber = (value, defaultValue) => {
  return value != null && Number.isFinite(value = +value) ? value : defaultValue;
};
function isSpecCompliantForm(thing) {
  return !!(thing && isFunction$1(thing.append) && thing[toStringTag] === "FormData" && thing[iterator]);
}
const toJSONObject = (obj) => {
  const visited = /* @__PURE__ */ new WeakSet();
  const visit = (source) => {
    if (isObject(source)) {
      if (visited.has(source)) {
        return;
      }
      if (isBuffer(source)) {
        return source;
      }
      if (!("toJSON" in source)) {
        visited.add(source);
        const target = isArray(source) ? [] : {};
        forEach(source, (value, key) => {
          const reducedValue = visit(value);
          !isUndefined(reducedValue) && (target[key] = reducedValue);
        });
        visited.delete(source);
        return target;
      }
    }
    return source;
  };
  return visit(obj);
};
const isAsyncFn = kindOfTest("AsyncFunction");
const isThenable = (thing) => thing && (isObject(thing) || isFunction$1(thing)) && isFunction$1(thing.then) && isFunction$1(thing.catch);
const _setImmediate = ((setImmediateSupported, postMessageSupported) => {
  if (setImmediateSupported) {
    return setImmediate;
  }
  return postMessageSupported ? ((token, callbacks) => {
    _global.addEventListener(
      "message",
      ({ source, data }) => {
        if (source === _global && data === token) {
          callbacks.length && callbacks.shift()();
        }
      },
      false
    );
    return (cb) => {
      callbacks.push(cb);
      _global.postMessage(token, "*");
    };
  })(`axios@${Math.random()}`, []) : (cb) => setTimeout(cb);
})(typeof setImmediate === "function", isFunction$1(_global.postMessage));
const asap = typeof queueMicrotask !== "undefined" ? queueMicrotask.bind(_global) : typeof process$1 !== "undefined" && process$1.nextTick || _setImmediate;
const isIterable = (thing) => thing != null && isFunction$1(thing[iterator]);
const isSafeIterable = (thing) => thing != null && hasOwnInPrototypeChain(thing, iterator) && isIterable(thing);
const utils$1 = {
  isArray,
  isArrayBuffer,
  isBuffer,
  isFormData,
  isArrayBufferView,
  isString,
  isNumber,
  isBoolean,
  isObject,
  isPlainObject,
  isEmptyObject,
  isReadableStream,
  isRequest,
  isResponse,
  isHeaders,
  isUndefined,
  isDate,
  isFile,
  isReactNativeBlob,
  isReactNative,
  isBlob,
  isRegExp,
  isFunction: isFunction$1,
  isStream,
  isURLSearchParams,
  isTypedArray,
  isFileList,
  forEach,
  merge,
  extend,
  trim,
  stripBOM,
  inherits,
  toFlatObject,
  kindOf,
  kindOfTest,
  endsWith,
  toArray,
  forEachEntry,
  matchAll,
  isHTMLForm,
  hasOwnProperty,
  hasOwnProp: hasOwnProperty,
  // an alias to avoid ESLint no-prototype-builtins detection
  hasOwnInPrototypeChain,
  getSafeProp,
  reduceDescriptors,
  freezeMethods,
  toObjectSet,
  toCamelCase,
  noop,
  toFiniteNumber,
  findKey,
  global: _global,
  isContextDefined,
  isSpecCompliantForm,
  toJSONObject,
  isAsyncFn,
  isThenable,
  setImmediate: _setImmediate,
  asap,
  isIterable,
  isSafeIterable
};
const ignoreDuplicateOf = utils$1.toObjectSet([
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent"
]);
const parseHeaders = (rawHeaders) => {
  const parsed = {};
  let key;
  let val;
  let i2;
  rawHeaders && rawHeaders.split("\n").forEach(function parser(line) {
    i2 = line.indexOf(":");
    key = line.substring(0, i2).trim().toLowerCase();
    val = line.substring(i2 + 1).trim();
    if (!key || parsed[key] && ignoreDuplicateOf[key]) {
      return;
    }
    if (key === "set-cookie") {
      if (parsed[key]) {
        parsed[key].push(val);
      } else {
        parsed[key] = [val];
      }
    } else {
      parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
    }
  });
  return parsed;
};
function trimSPorHTAB(str) {
  let start = 0;
  let end = str.length;
  while (start < end) {
    const code2 = str.charCodeAt(start);
    if (code2 !== 9 && code2 !== 32) {
      break;
    }
    start += 1;
  }
  while (end > start) {
    const code2 = str.charCodeAt(end - 1);
    if (code2 !== 9 && code2 !== 32) {
      break;
    }
    end -= 1;
  }
  return start === 0 && end === str.length ? str : str.slice(start, end);
}
const INVALID_UNICODE_HEADER_VALUE_CHARS = new RegExp("[\\u0000-\\u0008\\u000a-\\u001f\\u007f]+", "g");
const INVALID_BYTE_STRING_HEADER_VALUE_CHARS = new RegExp("[^\\u0009\\u0020-\\u007e\\u0080-\\u00ff]+", "g");
function sanitizeValue(value, invalidChars) {
  if (utils$1.isArray(value)) {
    return value.map((item) => sanitizeValue(item, invalidChars));
  }
  return trimSPorHTAB(String(value).replace(invalidChars, ""));
}
const sanitizeHeaderValue = (value) => sanitizeValue(value, INVALID_UNICODE_HEADER_VALUE_CHARS);
const sanitizeByteStringHeaderValue = (value) => sanitizeValue(value, INVALID_BYTE_STRING_HEADER_VALUE_CHARS);
function toByteStringHeaderObject(headers) {
  const byteStringHeaders = /* @__PURE__ */ Object.create(null);
  utils$1.forEach(headers.toJSON(), (value, header) => {
    byteStringHeaders[header] = sanitizeByteStringHeaderValue(value);
  });
  return byteStringHeaders;
}
const $internals = /* @__PURE__ */ Symbol("internals");
function normalizeHeader(header) {
  return header && String(header).trim().toLowerCase();
}
function normalizeValue(value) {
  if (value === false || value == null) {
    return value;
  }
  return utils$1.isArray(value) ? value.map(normalizeValue) : sanitizeHeaderValue(String(value));
}
function parseTokens(str) {
  const tokens = /* @__PURE__ */ Object.create(null);
  const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let match;
  while (match = tokensRE.exec(str)) {
    tokens[match[1]] = match[2];
  }
  return tokens;
}
const isValidHeaderName = (str) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim());
function matchHeaderValue(context, value, header, filter2, isHeaderNameFilter) {
  if (utils$1.isFunction(filter2)) {
    return filter2.call(this, value, header);
  }
  if (isHeaderNameFilter) {
    value = header;
  }
  if (!utils$1.isString(value)) return;
  if (utils$1.isString(filter2)) {
    return value.indexOf(filter2) !== -1;
  }
  if (utils$1.isRegExp(filter2)) {
    return filter2.test(value);
  }
}
function formatHeader(header) {
  return header.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (w2, char, str) => {
    return char.toUpperCase() + str;
  });
}
function buildAccessors(obj, header) {
  const accessorName = utils$1.toCamelCase(" " + header);
  ["get", "set", "has"].forEach((methodName) => {
    Object.defineProperty(obj, methodName + accessorName, {
      // Null-proto descriptor so a polluted Object.prototype.get cannot turn
      // this data descriptor into an accessor descriptor on the way in.
      __proto__: null,
      value: function(arg1, arg2, arg3) {
        return this[methodName].call(this, header, arg1, arg2, arg3);
      },
      configurable: true
    });
  });
}
let AxiosHeaders$1 = class AxiosHeaders {
  constructor(headers) {
    headers && this.set(headers);
  }
  set(header, valueOrRewrite, rewrite) {
    const self2 = this;
    function setHeader(_value, _header, _rewrite) {
      const lHeader = normalizeHeader(_header);
      if (!lHeader) {
        return;
      }
      const key = utils$1.findKey(self2, lHeader);
      if (!key || self2[key] === void 0 || _rewrite === true || _rewrite === void 0 && self2[key] !== false) {
        self2[key || _header] = normalizeValue(_value);
      }
    }
    const setHeaders = (headers, _rewrite) => utils$1.forEach(headers, (_value, _header) => setHeader(_value, _header, _rewrite));
    if (utils$1.isPlainObject(header) || header instanceof this.constructor) {
      setHeaders(header, valueOrRewrite);
    } else if (utils$1.isString(header) && (header = header.trim()) && !isValidHeaderName(header)) {
      setHeaders(parseHeaders(header), valueOrRewrite);
    } else if (utils$1.isObject(header) && utils$1.isSafeIterable(header)) {
      let obj = /* @__PURE__ */ Object.create(null), dest, key;
      for (const entry of header) {
        if (!utils$1.isArray(entry)) {
          throw new TypeError("Object iterator must return a key-value pair");
        }
        key = entry[0];
        if (utils$1.hasOwnProp(obj, key)) {
          dest = obj[key];
          obj[key] = utils$1.isArray(dest) ? [...dest, entry[1]] : [dest, entry[1]];
        } else {
          obj[key] = entry[1];
        }
      }
      setHeaders(obj, valueOrRewrite);
    } else {
      header != null && setHeader(valueOrRewrite, header, rewrite);
    }
    return this;
  }
  get(header, parser) {
    header = normalizeHeader(header);
    if (header) {
      const key = utils$1.findKey(this, header);
      if (key) {
        const value = this[key];
        if (!parser) {
          return value;
        }
        if (parser === true) {
          return parseTokens(value);
        }
        if (utils$1.isFunction(parser)) {
          return parser.call(this, value, key);
        }
        if (utils$1.isRegExp(parser)) {
          return parser.exec(value);
        }
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(header, matcher) {
    header = normalizeHeader(header);
    if (header) {
      const key = utils$1.findKey(this, header);
      return !!(key && this[key] !== void 0 && (!matcher || matchHeaderValue(this, this[key], key, matcher)));
    }
    return false;
  }
  delete(header, matcher) {
    const self2 = this;
    let deleted = false;
    function deleteHeader(_header) {
      _header = normalizeHeader(_header);
      if (_header) {
        const key = utils$1.findKey(self2, _header);
        if (key && (!matcher || matchHeaderValue(self2, self2[key], key, matcher))) {
          delete self2[key];
          deleted = true;
        }
      }
    }
    if (utils$1.isArray(header)) {
      header.forEach(deleteHeader);
    } else {
      deleteHeader(header);
    }
    return deleted;
  }
  clear(matcher) {
    const keys = Object.keys(this);
    let i2 = keys.length;
    let deleted = false;
    while (i2--) {
      const key = keys[i2];
      if (!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
        delete this[key];
        deleted = true;
      }
    }
    return deleted;
  }
  normalize(format) {
    const self2 = this;
    const headers = {};
    utils$1.forEach(this, (value, header) => {
      const key = utils$1.findKey(headers, header);
      if (key) {
        self2[key] = normalizeValue(value);
        delete self2[header];
        return;
      }
      const normalized = format ? formatHeader(header) : String(header).trim();
      if (normalized !== header) {
        delete self2[header];
      }
      self2[normalized] = normalizeValue(value);
      headers[normalized] = true;
    });
    return this;
  }
  concat(...targets) {
    return this.constructor.concat(this, ...targets);
  }
  toJSON(asStrings) {
    const obj = /* @__PURE__ */ Object.create(null);
    utils$1.forEach(this, (value, header) => {
      value != null && value !== false && (obj[header] = asStrings && utils$1.isArray(value) ? value.join(", ") : value);
    });
    return obj;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([header, value]) => header + ": " + value).join("\n");
  }
  getSetCookie() {
    return this.get("set-cookie") || [];
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(thing) {
    return thing instanceof this ? thing : new this(thing);
  }
  static concat(first, ...targets) {
    const computed = new this(first);
    targets.forEach((target) => computed.set(target));
    return computed;
  }
  static accessor(header) {
    const internals = this[$internals] = this[$internals] = {
      accessors: {}
    };
    const accessors = internals.accessors;
    const prototype2 = this.prototype;
    function defineAccessor(_header) {
      const lHeader = normalizeHeader(_header);
      if (!accessors[lHeader]) {
        buildAccessors(prototype2, _header);
        accessors[lHeader] = true;
      }
    }
    utils$1.isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);
    return this;
  }
};
AxiosHeaders$1.accessor([
  "Content-Type",
  "Content-Length",
  "Accept",
  "Accept-Encoding",
  "User-Agent",
  "Authorization"
]);
utils$1.reduceDescriptors(AxiosHeaders$1.prototype, ({ value }, key) => {
  let mapped = key[0].toUpperCase() + key.slice(1);
  return {
    get: () => value,
    set(headerValue) {
      this[mapped] = headerValue;
    }
  };
});
utils$1.freezeMethods(AxiosHeaders$1);
const REDACTED = "[REDACTED ****]";
function hasOwnOrPrototypeToJSON(source) {
  if (utils$1.hasOwnProp(source, "toJSON")) {
    return true;
  }
  let prototype2 = Object.getPrototypeOf(source);
  while (prototype2 && prototype2 !== Object.prototype) {
    if (utils$1.hasOwnProp(prototype2, "toJSON")) {
      return true;
    }
    prototype2 = Object.getPrototypeOf(prototype2);
  }
  return false;
}
function redactConfig(config, redactKeys) {
  const lowerKeys = new Set(redactKeys.map((k2) => String(k2).toLowerCase()));
  const seen = [];
  const visit = (source) => {
    if (source === null || typeof source !== "object") return source;
    if (utils$1.isBuffer(source)) return source;
    if (seen.indexOf(source) !== -1) return void 0;
    if (source instanceof AxiosHeaders$1) {
      source = source.toJSON();
    }
    seen.push(source);
    let result;
    if (utils$1.isArray(source)) {
      result = [];
      source.forEach((v2, i2) => {
        const reducedValue = visit(v2);
        if (!utils$1.isUndefined(reducedValue)) {
          result[i2] = reducedValue;
        }
      });
    } else {
      if (!utils$1.isPlainObject(source) && hasOwnOrPrototypeToJSON(source)) {
        seen.pop();
        return source;
      }
      result = /* @__PURE__ */ Object.create(null);
      for (const [key, value] of Object.entries(source)) {
        const reducedValue = lowerKeys.has(key.toLowerCase()) ? REDACTED : visit(value);
        if (!utils$1.isUndefined(reducedValue)) {
          result[key] = reducedValue;
        }
      }
    }
    seen.pop();
    return result;
  };
  return visit(config);
}
let AxiosError$1 = class AxiosError extends Error {
  static from(error, code2, config, request, response, customProps) {
    const axiosError = new AxiosError(error.message, code2 || error.code, config, request, response);
    Object.defineProperty(axiosError, "cause", {
      __proto__: null,
      value: error,
      writable: true,
      enumerable: false,
      configurable: true
    });
    axiosError.name = error.name;
    if (error.status != null && axiosError.status == null) {
      axiosError.status = error.status;
    }
    customProps && Object.assign(axiosError, customProps);
    return axiosError;
  }
  /**
   * Create an Error with the specified message, config, error code, request and response.
   *
   * @param {string} message The error message.
   * @param {string} [code] The error code (for example, 'ECONNABORTED').
   * @param {Object} [config] The config.
   * @param {Object} [request] The request.
   * @param {Object} [response] The response.
   *
   * @returns {Error} The created error.
   */
  constructor(message, code2, config, request, response) {
    super(message);
    Object.defineProperty(this, "message", {
      // Null-proto descriptor so a polluted Object.prototype.get cannot turn
      // this data descriptor into an accessor descriptor on the way in.
      __proto__: null,
      value: message,
      enumerable: true,
      writable: true,
      configurable: true
    });
    this.name = "AxiosError";
    this.isAxiosError = true;
    code2 && (this.code = code2);
    config && (this.config = config);
    request && (this.request = request);
    if (response) {
      this.response = response;
      this.status = response.status;
    }
  }
  toJSON() {
    const config = this.config;
    const redactKeys = config && utils$1.hasOwnProp(config, "redact") ? config.redact : void 0;
    const serializedConfig = utils$1.isArray(redactKeys) && redactKeys.length > 0 ? redactConfig(config, redactKeys) : utils$1.toJSONObject(config);
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: serializedConfig,
      code: this.code,
      status: this.status
    };
  }
};
AxiosError$1.ERR_BAD_OPTION_VALUE = "ERR_BAD_OPTION_VALUE";
AxiosError$1.ERR_BAD_OPTION = "ERR_BAD_OPTION";
AxiosError$1.ECONNABORTED = "ECONNABORTED";
AxiosError$1.ETIMEDOUT = "ETIMEDOUT";
AxiosError$1.ECONNREFUSED = "ECONNREFUSED";
AxiosError$1.ERR_NETWORK = "ERR_NETWORK";
AxiosError$1.ERR_FR_TOO_MANY_REDIRECTS = "ERR_FR_TOO_MANY_REDIRECTS";
AxiosError$1.ERR_DEPRECATED = "ERR_DEPRECATED";
AxiosError$1.ERR_BAD_RESPONSE = "ERR_BAD_RESPONSE";
AxiosError$1.ERR_BAD_REQUEST = "ERR_BAD_REQUEST";
AxiosError$1.ERR_CANCELED = "ERR_CANCELED";
AxiosError$1.ERR_NOT_SUPPORT = "ERR_NOT_SUPPORT";
AxiosError$1.ERR_INVALID_URL = "ERR_INVALID_URL";
AxiosError$1.ERR_FORM_DATA_DEPTH_EXCEEDED = "ERR_FORM_DATA_DEPTH_EXCEEDED";
const httpAdapter = null;
const DEFAULT_FORM_DATA_MAX_DEPTH = 100;
function isVisitable(thing) {
  return utils$1.isPlainObject(thing) || utils$1.isArray(thing);
}
function removeBrackets(key) {
  return utils$1.endsWith(key, "[]") ? key.slice(0, -2) : key;
}
function renderKey(path, key, dots) {
  if (!path) return key;
  return path.concat(key).map(function each(token, i2) {
    token = removeBrackets(token);
    return !dots && i2 ? "[" + token + "]" : token;
  }).join(dots ? "." : "");
}
function isFlatArray(arr) {
  return utils$1.isArray(arr) && !arr.some(isVisitable);
}
const predicates = utils$1.toFlatObject(utils$1, {}, null, function filter(prop) {
  return /^is[A-Z]/.test(prop);
});
function toFormData$1(obj, formData, options) {
  if (!utils$1.isObject(obj)) {
    throw new TypeError("target must be an object");
  }
  formData = formData || new FormData();
  options = utils$1.toFlatObject(
    options,
    {
      metaTokens: true,
      dots: false,
      indexes: false
    },
    false,
    function defined(option, source) {
      return !utils$1.isUndefined(source[option]);
    }
  );
  const metaTokens = options.metaTokens;
  const visitor = options.visitor || defaultVisitor;
  const dots = options.dots;
  const indexes = options.indexes;
  const _Blob = options.Blob || typeof Blob !== "undefined" && Blob;
  const maxDepth = options.maxDepth === void 0 ? DEFAULT_FORM_DATA_MAX_DEPTH : options.maxDepth;
  const useBlob = _Blob && utils$1.isSpecCompliantForm(formData);
  const stack = [];
  if (!utils$1.isFunction(visitor)) {
    throw new TypeError("visitor must be a function");
  }
  function convertValue(value) {
    if (value === null) return "";
    if (utils$1.isDate(value)) {
      return value.toISOString();
    }
    if (utils$1.isBoolean(value)) {
      return value.toString();
    }
    if (!useBlob && utils$1.isBlob(value)) {
      throw new AxiosError$1("Blob is not supported. Use a Buffer instead.");
    }
    if (utils$1.isArrayBuffer(value) || utils$1.isTypedArray(value)) {
      if (useBlob && typeof _Blob === "function") {
        return new _Blob([value]);
      }
      if (typeof Buffer !== "undefined") {
        return Buffer.from(value);
      }
      throw new AxiosError$1("Blob is not supported. Use a Buffer instead.", AxiosError$1.ERR_NOT_SUPPORT);
    }
    return value;
  }
  function throwIfMaxDepthExceeded(depth) {
    if (depth > maxDepth) {
      throw new AxiosError$1(
        "Object is too deeply nested (" + depth + " levels). Max depth: " + maxDepth,
        AxiosError$1.ERR_FORM_DATA_DEPTH_EXCEEDED
      );
    }
  }
  function stringifyWithDepthLimit(value, depth) {
    if (maxDepth === Infinity) {
      return JSON.stringify(value);
    }
    const ancestors = [];
    return JSON.stringify(value, function limitDepth(_key, currentValue) {
      if (!utils$1.isObject(currentValue)) {
        return currentValue;
      }
      while (ancestors.length && ancestors[ancestors.length - 1] !== this) {
        ancestors.pop();
      }
      ancestors.push(currentValue);
      throwIfMaxDepthExceeded(depth + ancestors.length - 1);
      return currentValue;
    });
  }
  function defaultVisitor(value, key, path) {
    let arr = value;
    if (utils$1.isReactNative(formData) && utils$1.isReactNativeBlob(value)) {
      formData.append(renderKey(path, key, dots), convertValue(value));
      return false;
    }
    if (value && !path && typeof value === "object") {
      if (utils$1.endsWith(key, "{}")) {
        key = metaTokens ? key : key.slice(0, -2);
        value = stringifyWithDepthLimit(value, 1);
      } else if (utils$1.isArray(value) && isFlatArray(value) || (utils$1.isFileList(value) || utils$1.endsWith(key, "[]")) && (arr = utils$1.toArray(value))) {
        key = removeBrackets(key);
        arr.forEach(function each(el, index) {
          !(utils$1.isUndefined(el) || el === null) && formData.append(
            // eslint-disable-next-line no-nested-ternary
            indexes === true ? renderKey([key], index, dots) : indexes === null ? key : key + "[]",
            convertValue(el)
          );
        });
        return false;
      }
    }
    if (isVisitable(value)) {
      return true;
    }
    formData.append(renderKey(path, key, dots), convertValue(value));
    return false;
  }
  const exposedHelpers = Object.assign(predicates, {
    defaultVisitor,
    convertValue,
    isVisitable
  });
  function build(value, path, depth = 0) {
    if (utils$1.isUndefined(value)) return;
    throwIfMaxDepthExceeded(depth);
    if (stack.indexOf(value) !== -1) {
      throw new Error("Circular reference detected in " + path.join("."));
    }
    stack.push(value);
    utils$1.forEach(value, function each(el, key) {
      const result = !(utils$1.isUndefined(el) || el === null) && visitor.call(formData, el, utils$1.isString(key) ? key.trim() : key, path, exposedHelpers);
      if (result === true) {
        build(el, path ? path.concat(key) : [key], depth + 1);
      }
    });
    stack.pop();
  }
  if (!utils$1.isObject(obj)) {
    throw new TypeError("data must be an object");
  }
  build(obj);
  return formData;
}
function encode$1(str) {
  const charMap = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+"
  };
  return encodeURIComponent(str).replace(/[!'()~]|%20/g, function replacer(match) {
    return charMap[match];
  });
}
function AxiosURLSearchParams(params, options) {
  this._pairs = [];
  params && toFormData$1(params, this, options);
}
const prototype = AxiosURLSearchParams.prototype;
prototype.append = function append(name, value) {
  this._pairs.push([name, value]);
};
prototype.toString = function toString2(encoder) {
  const _encode = encoder ? (value) => encoder.call(this, value, encode$1) : encode$1;
  return this._pairs.map(function each(pair) {
    return _encode(pair[0]) + "=" + _encode(pair[1]);
  }, "").join("&");
};
function encode(val) {
  return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+");
}
function buildURL(url, params, options) {
  if (!params) {
    return url;
  }
  url = url || "";
  const _options = utils$1.isFunction(options) ? {
    serialize: options
  } : options;
  const _encode = utils$1.getSafeProp(_options, "encode") || encode;
  const serializeFn = utils$1.getSafeProp(_options, "serialize");
  let serializedParams;
  if (serializeFn) {
    serializedParams = serializeFn(params, _options);
  } else {
    serializedParams = utils$1.isURLSearchParams(params) ? params.toString() : new AxiosURLSearchParams(params, _options).toString(_encode);
  }
  if (serializedParams) {
    const hashmarkIndex = url.indexOf("#");
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }
    url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
  }
  return url;
}
class InterceptorManager {
  constructor() {
    this.handlers = [];
  }
  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   * @param {Object} options The options for the interceptor, synchronous and runWhen
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(fulfilled, rejected, options) {
    this.handlers.push({
      fulfilled,
      rejected,
      synchronous: options ? options.synchronous : false,
      runWhen: options ? options.runWhen : null
    });
    return this.handlers.length - 1;
  }
  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {void}
   */
  eject(id) {
    if (this.handlers[id]) {
      this.handlers[id] = null;
    }
  }
  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    if (this.handlers) {
      this.handlers = [];
    }
  }
  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(fn) {
    utils$1.forEach(this.handlers, function forEachHandler(h2) {
      if (h2 !== null) {
        fn(h2);
      }
    });
  }
}
const transitionalDefaults = {
  silentJSONParsing: true,
  forcedJSONParsing: true,
  clarifyTimeoutError: false,
  legacyInterceptorReqResOrdering: true,
  advertiseZstdAcceptEncoding: false,
  validateStatusUndefinedResolves: true
};
const URLSearchParams$1 = typeof URLSearchParams !== "undefined" ? URLSearchParams : AxiosURLSearchParams;
const FormData$1 = typeof FormData !== "undefined" ? FormData : null;
const Blob$1 = typeof Blob !== "undefined" ? Blob : null;
const platform$1 = {
  isBrowser: true,
  classes: {
    URLSearchParams: URLSearchParams$1,
    FormData: FormData$1,
    Blob: Blob$1
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
};
const hasBrowserEnv = typeof window !== "undefined" && typeof document !== "undefined";
const _navigator = typeof navigator === "object" && navigator || void 0;
const hasStandardBrowserEnv = hasBrowserEnv && (!_navigator || ["ReactNative", "NativeScript", "NS"].indexOf(_navigator.product) < 0);
const hasStandardBrowserWebWorkerEnv = (() => {
  return typeof WorkerGlobalScope !== "undefined" && // eslint-disable-next-line no-undef
  self instanceof WorkerGlobalScope && typeof self.importScripts === "function";
})();
const origin = hasBrowserEnv && window.location.href || "http://localhost";
const utils = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv,
  hasStandardBrowserEnv,
  hasStandardBrowserWebWorkerEnv,
  navigator: _navigator,
  origin
}, Symbol.toStringTag, { value: "Module" }));
const platform = {
  ...utils,
  ...platform$1
};
function toURLEncodedForm(data, options) {
  return toFormData$1(data, new platform.classes.URLSearchParams(), {
    visitor: function(value, key, path, helpers) {
      if (platform.isNode && utils$1.isBuffer(value)) {
        this.append(key, value.toString("base64"));
        return false;
      }
      return helpers.defaultVisitor.apply(this, arguments);
    },
    ...options
  });
}
const MAX_DEPTH = DEFAULT_FORM_DATA_MAX_DEPTH;
function throwIfDepthExceeded(index) {
  if (index > MAX_DEPTH) {
    throw new AxiosError$1(
      "FormData field is too deeply nested (" + index + " levels). Max depth: " + MAX_DEPTH,
      AxiosError$1.ERR_FORM_DATA_DEPTH_EXCEEDED
    );
  }
}
function parsePropPath(name) {
  const path = [];
  const pattern = /\w+|\[(\w*)]/g;
  let match;
  while ((match = pattern.exec(name)) !== null) {
    throwIfDepthExceeded(path.length);
    path.push(match[0] === "[]" ? "" : match[1] || match[0]);
  }
  return path;
}
function arrayToObject(arr) {
  const obj = {};
  const keys = Object.keys(arr);
  let i2;
  const len2 = keys.length;
  let key;
  for (i2 = 0; i2 < len2; i2++) {
    key = keys[i2];
    obj[key] = arr[key];
  }
  return obj;
}
function formDataToJSON(formData) {
  function buildPath(path, value, target, index) {
    throwIfDepthExceeded(index);
    let name = path[index++];
    if (name === "__proto__") return true;
    const isNumericKey = Number.isFinite(+name);
    const isLast = index >= path.length;
    name = !name && utils$1.isArray(target) ? target.length : name;
    if (isLast) {
      if (utils$1.hasOwnProp(target, name)) {
        target[name] = utils$1.isArray(target[name]) ? target[name].concat(value) : [target[name], value];
      } else {
        target[name] = value;
      }
      return !isNumericKey;
    }
    if (!utils$1.hasOwnProp(target, name) || !utils$1.isObject(target[name])) {
      target[name] = [];
    }
    const result = buildPath(path, value, target[name], index);
    if (result && utils$1.isArray(target[name])) {
      target[name] = arrayToObject(target[name]);
    }
    return !isNumericKey;
  }
  if (utils$1.isFormData(formData) && utils$1.isFunction(formData.entries)) {
    const obj = {};
    utils$1.forEachEntry(formData, (name, value) => {
      buildPath(parsePropPath(name), value, obj, 0);
    });
    return obj;
  }
  return null;
}
const own = (obj, key) => obj != null && utils$1.hasOwnProp(obj, key) ? obj[key] : void 0;
function stringifySafely(rawValue, parser, encoder) {
  if (utils$1.isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return utils$1.trim(rawValue);
    } catch (e2) {
      if (e2.name !== "SyntaxError") {
        throw e2;
      }
    }
  }
  return (encoder || JSON.stringify)(rawValue);
}
const defaults = {
  transitional: transitionalDefaults,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [
    function transformRequest(data, headers) {
      const contentType = headers.getContentType() || "";
      const hasJSONContentType = contentType.indexOf("application/json") > -1;
      const isObjectPayload = utils$1.isObject(data);
      if (isObjectPayload && utils$1.isHTMLForm(data)) {
        data = new FormData(data);
      }
      const isFormData2 = utils$1.isFormData(data);
      if (isFormData2) {
        return hasJSONContentType ? JSON.stringify(formDataToJSON(data)) : data;
      }
      if (utils$1.isArrayBuffer(data) || utils$1.isBuffer(data) || utils$1.isStream(data) || utils$1.isFile(data) || utils$1.isBlob(data) || utils$1.isReadableStream(data)) {
        return data;
      }
      if (utils$1.isArrayBufferView(data)) {
        return data.buffer;
      }
      if (utils$1.isURLSearchParams(data)) {
        headers.setContentType("application/x-www-form-urlencoded;charset=utf-8", false);
        return data.toString();
      }
      let isFileList2;
      if (isObjectPayload) {
        const formSerializer = own(this, "formSerializer");
        if (contentType.indexOf("application/x-www-form-urlencoded") > -1) {
          return toURLEncodedForm(data, formSerializer).toString();
        }
        if ((isFileList2 = utils$1.isFileList(data)) || contentType.indexOf("multipart/form-data") > -1) {
          const env = own(this, "env");
          const _FormData = env && env.FormData;
          return toFormData$1(
            isFileList2 ? { "files[]": data } : data,
            _FormData && new _FormData(),
            formSerializer
          );
        }
      }
      if (isObjectPayload || hasJSONContentType) {
        headers.setContentType("application/json", false);
        return stringifySafely(data);
      }
      return data;
    }
  ],
  transformResponse: [
    function transformResponse(data) {
      const transitional2 = own(this, "transitional") || defaults.transitional;
      const forcedJSONParsing = transitional2 && transitional2.forcedJSONParsing;
      const responseType = own(this, "responseType");
      const JSONRequested = responseType === "json";
      if (utils$1.isResponse(data) || utils$1.isReadableStream(data)) {
        return data;
      }
      if (data && utils$1.isString(data) && (forcedJSONParsing && !responseType || JSONRequested)) {
        const silentJSONParsing = transitional2 && transitional2.silentJSONParsing;
        const strictJSONParsing = !silentJSONParsing && JSONRequested;
        try {
          return JSON.parse(data, own(this, "parseReviver"));
        } catch (e2) {
          if (strictJSONParsing) {
            if (e2.name === "SyntaxError") {
              throw AxiosError$1.from(e2, AxiosError$1.ERR_BAD_RESPONSE, this, null, own(this, "response"));
            }
            throw e2;
          }
        }
      }
      return data;
    }
  ],
  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: platform.classes.FormData,
    Blob: platform.classes.Blob
  },
  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0
    }
  }
};
utils$1.forEach(["delete", "get", "head", "post", "put", "patch", "query"], (method) => {
  defaults.headers[method] = {};
});
function transformData(fns, response) {
  const config = this || defaults;
  const context = response || config;
  const headers = AxiosHeaders$1.from(context.headers);
  let data = context.data;
  utils$1.forEach(fns, function transform(fn) {
    data = fn.call(config, data, headers.normalize(), response ? response.status : void 0);
  });
  headers.normalize();
  return data;
}
function isCancel$1(value) {
  return !!(value && value.__CANCEL__);
}
let CanceledError$1 = class CanceledError extends AxiosError$1 {
  /**
   * A `CanceledError` is an object that is thrown when an operation is canceled.
   *
   * @param {string=} message The message.
   * @param {Object=} config The config.
   * @param {Object=} request The request.
   *
   * @returns {CanceledError} The created error.
   */
  constructor(message, config, request) {
    super(message == null ? "canceled" : message, AxiosError$1.ERR_CANCELED, config, request);
    this.name = "CanceledError";
    this.__CANCEL__ = true;
  }
};
function settle(resolve3, reject2, response) {
  const validateStatus2 = response.config.validateStatus;
  if (!response.status || !validateStatus2 || validateStatus2(response.status)) {
    resolve3(response);
  } else {
    reject2(new AxiosError$1(
      "Request failed with status code " + response.status,
      response.status >= 400 && response.status < 500 ? AxiosError$1.ERR_BAD_REQUEST : AxiosError$1.ERR_BAD_RESPONSE,
      response.config,
      response.request,
      response
    ));
  }
}
function parseProtocol(url) {
  const match = /^([-+\w]{1,25}):(?:\/\/)?/.exec(url);
  return match && match[1] || "";
}
function speedometer(samplesCount, min2) {
  samplesCount = samplesCount || 10;
  const bytes = new Array(samplesCount);
  const timestamps = new Array(samplesCount);
  let head = 0;
  let tail = 0;
  let firstSampleTS;
  min2 = min2 !== void 0 ? min2 : 1e3;
  return function push(chunkLength) {
    const now = Date.now();
    const startedAt = timestamps[tail];
    if (!firstSampleTS) {
      firstSampleTS = now;
    }
    bytes[head] = chunkLength;
    timestamps[head] = now;
    let i2 = tail;
    let bytesCount = 0;
    while (i2 !== head) {
      bytesCount += bytes[i2++];
      i2 = i2 % samplesCount;
    }
    head = (head + 1) % samplesCount;
    if (head === tail) {
      tail = (tail + 1) % samplesCount;
    }
    if (now - firstSampleTS < min2) {
      return;
    }
    const passed = startedAt && now - startedAt;
    return passed ? Math.round(bytesCount * 1e3 / passed) : void 0;
  };
}
function throttle(fn, freq) {
  let timestamp = 0;
  let threshold = 1e3 / freq;
  let lastArgs;
  let timer;
  const invoke = (args, now = Date.now()) => {
    timestamp = now;
    lastArgs = null;
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    fn(...args);
  };
  const throttled = (...args) => {
    const now = Date.now();
    const passed = now - timestamp;
    if (passed >= threshold) {
      invoke(args, now);
    } else {
      lastArgs = args;
      if (!timer) {
        timer = setTimeout(() => {
          timer = null;
          invoke(lastArgs);
        }, threshold - passed);
      }
    }
  };
  const flush = () => lastArgs && invoke(lastArgs);
  return [throttled, flush];
}
const progressEventReducer = (listener, isDownloadStream, freq = 3) => {
  let bytesNotified = 0;
  const _speedometer = speedometer(50, 250);
  return throttle((e2) => {
    if (!e2 || typeof e2.loaded !== "number") {
      return;
    }
    const rawLoaded = e2.loaded;
    const total = e2.lengthComputable ? e2.total : void 0;
    const loaded = total != null ? Math.min(rawLoaded, total) : rawLoaded;
    const progressBytes = Math.max(0, loaded - bytesNotified);
    const rate = _speedometer(progressBytes);
    bytesNotified = Math.max(bytesNotified, loaded);
    const data = {
      loaded,
      total,
      progress: total ? loaded / total : void 0,
      bytes: progressBytes,
      rate: rate ? rate : void 0,
      estimated: rate && total ? (total - loaded) / rate : void 0,
      event: e2,
      lengthComputable: total != null,
      [isDownloadStream ? "download" : "upload"]: true
    };
    listener(data);
  }, freq);
};
const progressEventDecorator = (total, throttled) => {
  const lengthComputable = total != null;
  return [
    (loaded) => throttled[0]({
      lengthComputable,
      total,
      loaded
    }),
    throttled[1]
  ];
};
const asyncDecorator = (fn) => (...args) => utils$1.asap(() => fn(...args));
const isURLSameOrigin = platform.hasStandardBrowserEnv ? /* @__PURE__ */ ((origin2, isMSIE) => (url) => {
  url = new URL(url, platform.origin);
  return origin2.protocol === url.protocol && origin2.host === url.host && (isMSIE || origin2.port === url.port);
})(
  new URL(platform.origin),
  platform.navigator && /(msie|trident)/i.test(platform.navigator.userAgent)
) : () => true;
const cookies = platform.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(name, value, expires, path, domain, secure, sameSite) {
      if (typeof document === "undefined") return;
      const cookie = [`${name}=${encodeURIComponent(value)}`];
      if (utils$1.isNumber(expires)) {
        cookie.push(`expires=${new Date(expires).toUTCString()}`);
      }
      if (utils$1.isString(path)) {
        cookie.push(`path=${path}`);
      }
      if (utils$1.isString(domain)) {
        cookie.push(`domain=${domain}`);
      }
      if (secure === true) {
        cookie.push("secure");
      }
      if (utils$1.isString(sameSite)) {
        cookie.push(`SameSite=${sameSite}`);
      }
      document.cookie = cookie.join("; ");
    },
    read(name) {
      if (typeof document === "undefined") return null;
      const cookies2 = document.cookie.split(";");
      for (let i2 = 0; i2 < cookies2.length; i2++) {
        const cookie = cookies2[i2].replace(/^\s+/, "");
        const eq = cookie.indexOf("=");
        if (eq !== -1 && cookie.slice(0, eq) === name) {
          try {
            return decodeURIComponent(cookie.slice(eq + 1));
          } catch (e2) {
            return cookie.slice(eq + 1);
          }
        }
      }
      return null;
    },
    remove(name) {
      this.write(name, "", Date.now() - 864e5, "/");
    }
  }
) : (
  // Non-standard browser env (web workers, react-native) lack needed support.
  {
    write() {
    },
    read() {
      return null;
    },
    remove() {
    }
  }
);
function isAbsoluteURL(url) {
  if (typeof url !== "string") {
    return false;
  }
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
}
function combineURLs(baseURL, relativeURL) {
  return relativeURL ? baseURL.replace(/\/?\/$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
}
const malformedHttpProtocol = /^https?:(?!\/\/)/i;
const httpProtocolControlCharacters = /[\t\n\r]/g;
function stripLeadingC0ControlOrSpace(url) {
  let i2 = 0;
  while (i2 < url.length && url.charCodeAt(i2) <= 32) {
    i2++;
  }
  return url.slice(i2);
}
function normalizeURLForProtocolCheck(url) {
  return stripLeadingC0ControlOrSpace(url).replace(httpProtocolControlCharacters, "");
}
function assertValidHttpProtocolURL(url, config) {
  if (typeof url === "string" && malformedHttpProtocol.test(normalizeURLForProtocolCheck(url))) {
    throw new AxiosError$1(
      'Invalid URL: missing "//" after protocol',
      AxiosError$1.ERR_INVALID_URL,
      config
    );
  }
}
function buildFullPath(baseURL, requestedURL, allowAbsoluteUrls, config) {
  assertValidHttpProtocolURL(requestedURL, config);
  let isRelativeUrl = !isAbsoluteURL(requestedURL);
  if (baseURL && (isRelativeUrl || allowAbsoluteUrls === false)) {
    assertValidHttpProtocolURL(baseURL, config);
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
}
const headersToObject = (thing) => thing instanceof AxiosHeaders$1 ? { ...thing } : thing;
function mergeConfig$1(config1, config2) {
  config1 = config1 || {};
  config2 = config2 || {};
  const config = /* @__PURE__ */ Object.create(null);
  Object.defineProperty(config, "hasOwnProperty", {
    // Null-proto descriptor so a polluted Object.prototype.get cannot turn
    // this data descriptor into an accessor descriptor on the way in.
    __proto__: null,
    value: Object.prototype.hasOwnProperty,
    enumerable: false,
    writable: true,
    configurable: true
  });
  function getMergedValue(target, source, prop, caseless) {
    if (utils$1.isPlainObject(target) && utils$1.isPlainObject(source)) {
      return utils$1.merge.call({ caseless }, target, source);
    } else if (utils$1.isPlainObject(source)) {
      return utils$1.merge({}, source);
    } else if (utils$1.isArray(source)) {
      return source.slice();
    }
    return source;
  }
  function mergeDeepProperties(a2, b2, prop, caseless) {
    if (!utils$1.isUndefined(b2)) {
      return getMergedValue(a2, b2, prop, caseless);
    } else if (!utils$1.isUndefined(a2)) {
      return getMergedValue(void 0, a2, prop, caseless);
    }
  }
  function valueFromConfig2(a2, b2) {
    if (!utils$1.isUndefined(b2)) {
      return getMergedValue(void 0, b2);
    }
  }
  function defaultToConfig2(a2, b2) {
    if (!utils$1.isUndefined(b2)) {
      return getMergedValue(void 0, b2);
    } else if (!utils$1.isUndefined(a2)) {
      return getMergedValue(void 0, a2);
    }
  }
  function getMergedTransitionalOption(prop) {
    const transitional2 = utils$1.hasOwnProp(config2, "transitional") ? config2.transitional : void 0;
    if (!utils$1.isUndefined(transitional2)) {
      if (utils$1.isPlainObject(transitional2)) {
        if (utils$1.hasOwnProp(transitional2, prop)) {
          return transitional2[prop];
        }
      } else {
        return void 0;
      }
    }
    const transitional1 = utils$1.hasOwnProp(config1, "transitional") ? config1.transitional : void 0;
    if (utils$1.isPlainObject(transitional1) && utils$1.hasOwnProp(transitional1, prop)) {
      return transitional1[prop];
    }
    return void 0;
  }
  function mergeDirectKeys(a2, b2, prop) {
    if (utils$1.hasOwnProp(config2, prop)) {
      return getMergedValue(a2, b2);
    } else if (utils$1.hasOwnProp(config1, prop)) {
      return getMergedValue(void 0, a2);
    }
  }
  const mergeMap = {
    url: valueFromConfig2,
    method: valueFromConfig2,
    data: valueFromConfig2,
    baseURL: defaultToConfig2,
    transformRequest: defaultToConfig2,
    transformResponse: defaultToConfig2,
    paramsSerializer: defaultToConfig2,
    timeout: defaultToConfig2,
    timeoutMessage: defaultToConfig2,
    withCredentials: defaultToConfig2,
    withXSRFToken: defaultToConfig2,
    adapter: defaultToConfig2,
    responseType: defaultToConfig2,
    xsrfCookieName: defaultToConfig2,
    xsrfHeaderName: defaultToConfig2,
    onUploadProgress: defaultToConfig2,
    onDownloadProgress: defaultToConfig2,
    decompress: defaultToConfig2,
    maxContentLength: defaultToConfig2,
    maxBodyLength: defaultToConfig2,
    beforeRedirect: defaultToConfig2,
    transport: defaultToConfig2,
    httpAgent: defaultToConfig2,
    httpsAgent: defaultToConfig2,
    cancelToken: defaultToConfig2,
    socketPath: defaultToConfig2,
    allowedSocketPaths: defaultToConfig2,
    responseEncoding: defaultToConfig2,
    validateStatus: mergeDirectKeys,
    headers: (a2, b2, prop) => mergeDeepProperties(headersToObject(a2), headersToObject(b2), prop, true)
  };
  utils$1.forEach(Object.keys({ ...config1, ...config2 }), function computeConfigValue(prop) {
    if (prop === "__proto__" || prop === "constructor" || prop === "prototype") return;
    const merge2 = utils$1.hasOwnProp(mergeMap, prop) ? mergeMap[prop] : mergeDeepProperties;
    const a2 = utils$1.hasOwnProp(config1, prop) ? config1[prop] : void 0;
    const b2 = utils$1.hasOwnProp(config2, prop) ? config2[prop] : void 0;
    const configValue = merge2(a2, b2, prop);
    utils$1.isUndefined(configValue) && merge2 !== mergeDirectKeys || (config[prop] = configValue);
  });
  if (utils$1.hasOwnProp(config2, "validateStatus") && utils$1.isUndefined(config2.validateStatus) && getMergedTransitionalOption("validateStatusUndefinedResolves") === false) {
    if (utils$1.hasOwnProp(config1, "validateStatus")) {
      config.validateStatus = getMergedValue(void 0, config1.validateStatus);
    } else {
      delete config.validateStatus;
    }
  }
  return config;
}
const FORM_DATA_CONTENT_HEADERS = ["content-type", "content-length"];
function setFormDataHeaders(headers, formHeaders, policy2) {
  if (policy2 !== "content-only") {
    headers.set(formHeaders);
    return;
  }
  Object.entries(formHeaders || {}).forEach(([key, val]) => {
    if (FORM_DATA_CONTENT_HEADERS.includes(key.toLowerCase())) {
      headers.set(key, val);
    }
  });
}
const encodeUTF8$1 = (str) => encodeURIComponent(str).replace(
  /%([0-9A-F]{2})/gi,
  (_2, hex) => String.fromCharCode(parseInt(hex, 16))
);
function resolveConfig(config) {
  const newConfig = mergeConfig$1({}, config);
  const own2 = (key) => utils$1.hasOwnProp(newConfig, key) ? newConfig[key] : void 0;
  const data = own2("data");
  let withXSRFToken = own2("withXSRFToken");
  const xsrfHeaderName = own2("xsrfHeaderName");
  const xsrfCookieName = own2("xsrfCookieName");
  let headers = own2("headers");
  const auth = own2("auth");
  const baseURL = own2("baseURL");
  const allowAbsoluteUrls = own2("allowAbsoluteUrls");
  const url = own2("url");
  newConfig.headers = headers = AxiosHeaders$1.from(headers);
  newConfig.url = buildURL(
    buildFullPath(baseURL, url, allowAbsoluteUrls, newConfig),
    own2("params"),
    own2("paramsSerializer")
  );
  if (auth) {
    const username = utils$1.getSafeProp(auth, "username") || "";
    const password = utils$1.getSafeProp(auth, "password") || "";
    try {
      headers.set(
        "Authorization",
        "Basic " + btoa(username + ":" + (password ? encodeUTF8$1(password) : ""))
      );
    } catch (e2) {
      throw AxiosError$1.from(e2, AxiosError$1.ERR_BAD_OPTION_VALUE, config);
    }
  }
  if (utils$1.isFormData(data)) {
    if (platform.hasStandardBrowserEnv || platform.hasStandardBrowserWebWorkerEnv || utils$1.isReactNative(data)) {
      headers.setContentType(void 0);
    } else if (utils$1.isFunction(data.getHeaders)) {
      setFormDataHeaders(headers, data.getHeaders(), own2("formDataHeaderPolicy"));
    }
  }
  if (platform.hasStandardBrowserEnv) {
    if (utils$1.isFunction(withXSRFToken)) {
      withXSRFToken = withXSRFToken(newConfig);
    }
    const shouldSendXSRF = withXSRFToken === true || withXSRFToken == null && isURLSameOrigin(newConfig.url);
    if (shouldSendXSRF) {
      const xsrfValue = xsrfHeaderName && xsrfCookieName && cookies.read(xsrfCookieName);
      if (xsrfValue) {
        headers.set(xsrfHeaderName, xsrfValue);
      }
    }
  }
  return newConfig;
}
const isXHRAdapterSupported = typeof XMLHttpRequest !== "undefined";
const xhrAdapter = isXHRAdapterSupported && function(config) {
  return new Promise(function dispatchXhrRequest(resolve3, reject2) {
    const _config = resolveConfig(config);
    let requestData = _config.data;
    const requestHeaders = AxiosHeaders$1.from(_config.headers).normalize();
    let { responseType, onUploadProgress, onDownloadProgress } = _config;
    let onCanceled;
    let uploadThrottled, downloadThrottled;
    let flushUpload, flushDownload;
    function done() {
      flushUpload && flushUpload();
      flushDownload && flushDownload();
      _config.cancelToken && _config.cancelToken.unsubscribe(onCanceled);
      _config.signal && _config.signal.removeEventListener("abort", onCanceled);
    }
    let request = new XMLHttpRequest();
    request.open(_config.method.toUpperCase(), _config.url, true);
    request.timeout = _config.timeout;
    function onloadend() {
      if (!request) {
        return;
      }
      const responseHeaders = AxiosHeaders$1.from(
        "getAllResponseHeaders" in request && request.getAllResponseHeaders()
      );
      const responseData = !responseType || responseType === "text" || responseType === "json" ? request.responseText : request.response;
      const response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      };
      settle(
        function _resolve(value) {
          resolve3(value);
          done();
        },
        function _reject(err) {
          reject2(err);
          done();
        },
        response
      );
      request = null;
    }
    if ("onloadend" in request) {
      request.onloadend = onloadend;
    } else {
      request.onreadystatechange = function handleLoad() {
        if (!request || request.readyState !== 4) {
          return;
        }
        if (request.status === 0 && !(request.responseURL && request.responseURL.startsWith("file:"))) {
          return;
        }
        setTimeout(onloadend);
      };
    }
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }
      reject2(new AxiosError$1("Request aborted", AxiosError$1.ECONNABORTED, config, request));
      done();
      request = null;
    };
    request.onerror = function handleError(event) {
      const msg = event && event.message ? event.message : "Network Error";
      const err = new AxiosError$1(msg, AxiosError$1.ERR_NETWORK, config, request);
      err.event = event || null;
      reject2(err);
      done();
      request = null;
    };
    request.ontimeout = function handleTimeout() {
      let timeoutErrorMessage = _config.timeout ? "timeout of " + _config.timeout + "ms exceeded" : "timeout exceeded";
      const transitional2 = _config.transitional || transitionalDefaults;
      if (_config.timeoutErrorMessage) {
        timeoutErrorMessage = _config.timeoutErrorMessage;
      }
      reject2(
        new AxiosError$1(
          timeoutErrorMessage,
          transitional2.clarifyTimeoutError ? AxiosError$1.ETIMEDOUT : AxiosError$1.ECONNABORTED,
          config,
          request
        )
      );
      done();
      request = null;
    };
    requestData === void 0 && requestHeaders.setContentType(null);
    if ("setRequestHeader" in request) {
      utils$1.forEach(toByteStringHeaderObject(requestHeaders), function setRequestHeader(val, key) {
        request.setRequestHeader(key, val);
      });
    }
    if (!utils$1.isUndefined(_config.withCredentials)) {
      request.withCredentials = !!_config.withCredentials;
    }
    if (responseType && responseType !== "json") {
      request.responseType = _config.responseType;
    }
    if (onDownloadProgress) {
      [downloadThrottled, flushDownload] = progressEventReducer(onDownloadProgress, true);
      request.addEventListener("progress", downloadThrottled);
    }
    if (onUploadProgress && request.upload) {
      [uploadThrottled, flushUpload] = progressEventReducer(onUploadProgress);
      request.upload.addEventListener("progress", uploadThrottled);
      request.upload.addEventListener("loadend", flushUpload);
    }
    if (_config.cancelToken || _config.signal) {
      onCanceled = (cancel) => {
        if (!request) {
          return;
        }
        reject2(!cancel || cancel.type ? new CanceledError$1(null, config, request) : cancel);
        request.abort();
        done();
        request = null;
      };
      _config.cancelToken && _config.cancelToken.subscribe(onCanceled);
      if (_config.signal) {
        _config.signal.aborted ? onCanceled() : _config.signal.addEventListener("abort", onCanceled);
      }
    }
    const protocol = parseProtocol(_config.url);
    if (protocol && !platform.protocols.includes(protocol)) {
      reject2(
        new AxiosError$1(
          "Unsupported protocol " + protocol + ":",
          AxiosError$1.ERR_BAD_REQUEST,
          config
        )
      );
      done();
      return;
    }
    request.send(requestData || null);
  });
};
const composeSignals = (signals, timeout) => {
  signals = signals ? signals.filter(Boolean) : [];
  if (!timeout && !signals.length) {
    return;
  }
  const controller = new AbortController();
  let aborted = false;
  const onabort = function(reason) {
    if (!aborted) {
      aborted = true;
      unsubscribe2();
      const err = reason instanceof Error ? reason : this.reason;
      controller.abort(
        err instanceof AxiosError$1 ? err : new CanceledError$1(err instanceof Error ? err.message : err)
      );
    }
  };
  let timer = timeout && setTimeout(() => {
    timer = null;
    onabort(new AxiosError$1(`timeout of ${timeout}ms exceeded`, AxiosError$1.ETIMEDOUT));
  }, timeout);
  const unsubscribe2 = () => {
    if (!signals) {
      return;
    }
    timer && clearTimeout(timer);
    timer = null;
    signals.forEach((signal2) => {
      signal2.unsubscribe ? signal2.unsubscribe(onabort) : signal2.removeEventListener("abort", onabort);
    });
    signals = null;
  };
  signals.forEach((signal2) => signal2.addEventListener("abort", onabort, { once: true }));
  const { signal } = controller;
  signal.unsubscribe = () => utils$1.asap(unsubscribe2);
  return signal;
};
const streamChunk = function* (chunk, chunkSize) {
  let len2 = chunk.byteLength;
  if (len2 < chunkSize) {
    yield chunk;
    return;
  }
  let pos = 0;
  let end;
  while (pos < len2) {
    end = pos + chunkSize;
    yield chunk.slice(pos, end);
    pos = end;
  }
};
const readBytes = async function* (iterable, chunkSize) {
  for await (const chunk of readStream(iterable)) {
    yield* streamChunk(chunk, chunkSize);
  }
};
const readStream = async function* (stream) {
  if (stream[Symbol.asyncIterator]) {
    yield* stream;
    return;
  }
  const reader = stream.getReader();
  try {
    for (; ; ) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      yield value;
    }
  } finally {
    await reader.cancel();
  }
};
const trackStream = (stream, chunkSize, onProgress, onFinish) => {
  const iterator2 = readBytes(stream, chunkSize);
  let bytes = 0;
  let done;
  let _onFinish = (e2) => {
    if (!done) {
      done = true;
      onFinish && onFinish(e2);
    }
  };
  return new ReadableStream(
    {
      async pull(controller) {
        try {
          const { done: done2, value } = await iterator2.next();
          if (done2) {
            _onFinish();
            controller.close();
            return;
          }
          let len2 = value.byteLength;
          if (onProgress) {
            let loadedBytes = bytes += len2;
            onProgress(loadedBytes);
          }
          controller.enqueue(new Uint8Array(value));
        } catch (err) {
          _onFinish(err);
          throw err;
        }
      },
      cancel(reason) {
        _onFinish(reason);
        return iterator2.return();
      }
    },
    {
      highWaterMark: 2
    }
  );
};
const isHexDigit = (charCode) => charCode >= 48 && charCode <= 57 || charCode >= 65 && charCode <= 70 || charCode >= 97 && charCode <= 102;
const isPercentEncodedByte = (str, i2, len2) => i2 + 2 < len2 && isHexDigit(str.charCodeAt(i2 + 1)) && isHexDigit(str.charCodeAt(i2 + 2));
function estimateDataURLDecodedBytes(url) {
  if (!url || typeof url !== "string") return 0;
  if (!url.startsWith("data:")) return 0;
  const comma = url.indexOf(",");
  if (comma < 0) return 0;
  const meta = url.slice(5, comma);
  const body = url.slice(comma + 1);
  const isBase64 = /;base64/i.test(meta);
  if (isBase64) {
    let effectiveLen = body.length;
    const len2 = body.length;
    for (let i2 = 0; i2 < len2; i2++) {
      if (body.charCodeAt(i2) === 37 && i2 + 2 < len2) {
        const a2 = body.charCodeAt(i2 + 1);
        const b2 = body.charCodeAt(i2 + 2);
        const isHex = isHexDigit(a2) && isHexDigit(b2);
        if (isHex) {
          effectiveLen -= 2;
          i2 += 2;
        }
      }
    }
    let pad = 0;
    let idx = len2 - 1;
    const tailIsPct3D = (j) => j >= 2 && body.charCodeAt(j - 2) === 37 && // '%'
    body.charCodeAt(j - 1) === 51 && // '3'
    (body.charCodeAt(j) === 68 || body.charCodeAt(j) === 100);
    if (idx >= 0) {
      if (body.charCodeAt(idx) === 61) {
        pad++;
        idx--;
      } else if (tailIsPct3D(idx)) {
        pad++;
        idx -= 3;
      }
    }
    if (pad === 1 && idx >= 0) {
      if (body.charCodeAt(idx) === 61) {
        pad++;
      } else if (tailIsPct3D(idx)) {
        pad++;
      }
    }
    const groups = Math.floor(effectiveLen / 4);
    const bytes2 = groups * 3 - (pad || 0);
    return bytes2 > 0 ? bytes2 : 0;
  }
  let bytes = 0;
  for (let i2 = 0, len2 = body.length; i2 < len2; i2++) {
    const c2 = body.charCodeAt(i2);
    if (c2 === 37 && isPercentEncodedByte(body, i2, len2)) {
      bytes += 1;
      i2 += 2;
    } else if (c2 < 128) {
      bytes += 1;
    } else if (c2 < 2048) {
      bytes += 2;
    } else if (c2 >= 55296 && c2 <= 56319 && i2 + 1 < len2) {
      const next = body.charCodeAt(i2 + 1);
      if (next >= 56320 && next <= 57343) {
        bytes += 4;
        i2++;
      } else {
        bytes += 3;
      }
    } else {
      bytes += 3;
    }
  }
  return bytes;
}
const VERSION$1 = "1.18.1";
const DEFAULT_CHUNK_SIZE = 64 * 1024;
const { isFunction } = utils$1;
const encodeUTF8 = (str) => encodeURIComponent(str).replace(
  /%([0-9A-F]{2})/gi,
  (_2, hex) => String.fromCharCode(parseInt(hex, 16))
);
const decodeURIComponentSafe = (value) => {
  if (!utils$1.isString(value)) {
    return value;
  }
  try {
    return decodeURIComponent(value);
  } catch (error) {
    return value;
  }
};
const test = (fn, ...args) => {
  try {
    return !!fn(...args);
  } catch (e2) {
    return false;
  }
};
const maybeWithAuthCredentials = (url) => {
  const protocolIndex = url.indexOf("://");
  let urlToCheck = url;
  if (protocolIndex !== -1) {
    urlToCheck = urlToCheck.slice(protocolIndex + 3);
  }
  return urlToCheck.includes("@") || urlToCheck.includes(":");
};
const factory = (env) => {
  const globalObject = utils$1.global !== void 0 && utils$1.global !== null ? utils$1.global : globalThis;
  const { ReadableStream: ReadableStream2, TextEncoder } = globalObject;
  env = utils$1.merge.call(
    {
      skipUndefined: true
    },
    {
      Request: globalObject.Request,
      Response: globalObject.Response
    },
    env
  );
  const { fetch: envFetch, Request, Response } = env;
  const isFetchSupported = envFetch ? isFunction(envFetch) : typeof fetch === "function";
  const isRequestSupported = isFunction(Request);
  const isResponseSupported = isFunction(Response);
  if (!isFetchSupported) {
    return false;
  }
  const isReadableStreamSupported = isFetchSupported && isFunction(ReadableStream2);
  const encodeText = isFetchSupported && (typeof TextEncoder === "function" ? /* @__PURE__ */ ((encoder) => (str) => encoder.encode(str))(new TextEncoder()) : async (str) => new Uint8Array(await new Request(str).arrayBuffer()));
  const supportsRequestStream = isRequestSupported && isReadableStreamSupported && test(() => {
    let duplexAccessed = false;
    const request = new Request(platform.origin, {
      body: new ReadableStream2(),
      method: "POST",
      get duplex() {
        duplexAccessed = true;
        return "half";
      }
    });
    const hasContentType = request.headers.has("Content-Type");
    if (request.body != null) {
      request.body.cancel();
    }
    return duplexAccessed && !hasContentType;
  });
  const supportsResponseStream = isResponseSupported && isReadableStreamSupported && test(() => utils$1.isReadableStream(new Response("").body));
  const resolvers = {
    stream: supportsResponseStream && ((res) => res.body)
  };
  isFetchSupported && (() => {
    ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((type) => {
      !resolvers[type] && (resolvers[type] = (res, config) => {
        let method = res && res[type];
        if (method) {
          return method.call(res);
        }
        throw new AxiosError$1(
          `Response type '${type}' is not supported`,
          AxiosError$1.ERR_NOT_SUPPORT,
          config
        );
      });
    });
  })();
  const getBodyLength = async (body) => {
    if (body == null) {
      return 0;
    }
    if (utils$1.isBlob(body)) {
      return body.size;
    }
    if (utils$1.isSpecCompliantForm(body)) {
      const _request = new Request(platform.origin, {
        method: "POST",
        body
      });
      return (await _request.arrayBuffer()).byteLength;
    }
    if (utils$1.isArrayBufferView(body) || utils$1.isArrayBuffer(body)) {
      return body.byteLength;
    }
    if (utils$1.isURLSearchParams(body)) {
      body = body + "";
    }
    if (utils$1.isString(body)) {
      return (await encodeText(body)).byteLength;
    }
  };
  const resolveBodyLength = async (headers, body) => {
    const length = utils$1.toFiniteNumber(headers.getContentLength());
    return length == null ? getBodyLength(body) : length;
  };
  return async (config) => {
    let {
      url,
      method,
      data,
      signal,
      cancelToken,
      timeout,
      onDownloadProgress,
      onUploadProgress,
      responseType,
      headers,
      withCredentials = "same-origin",
      fetchOptions,
      maxContentLength,
      maxBodyLength
    } = resolveConfig(config);
    const hasMaxContentLength = utils$1.isNumber(maxContentLength) && maxContentLength > -1;
    const hasMaxBodyLength = utils$1.isNumber(maxBodyLength) && maxBodyLength > -1;
    const own2 = (key) => utils$1.hasOwnProp(config, key) ? config[key] : void 0;
    let _fetch = envFetch || fetch;
    responseType = responseType ? (responseType + "").toLowerCase() : "text";
    let composedSignal = composeSignals(
      [signal, cancelToken && cancelToken.toAbortSignal()],
      timeout
    );
    let request = null;
    const unsubscribe2 = composedSignal && composedSignal.unsubscribe && (() => {
      composedSignal.unsubscribe();
    });
    let requestContentLength;
    let pendingBodyError = null;
    const maxBodyLengthError = () => new AxiosError$1(
      "Request body larger than maxBodyLength limit",
      AxiosError$1.ERR_BAD_REQUEST,
      config,
      request
    );
    try {
      let auth = void 0;
      const configAuth = own2("auth");
      if (configAuth) {
        const username = utils$1.getSafeProp(configAuth, "username") || "";
        const password = utils$1.getSafeProp(configAuth, "password") || "";
        auth = {
          username,
          password
        };
      }
      if (maybeWithAuthCredentials(url)) {
        const parsedURL = new URL(url, platform.origin);
        if (!auth && (parsedURL.username || parsedURL.password)) {
          const urlUsername = decodeURIComponentSafe(parsedURL.username);
          const urlPassword = decodeURIComponentSafe(parsedURL.password);
          auth = {
            username: urlUsername,
            password: urlPassword
          };
        }
        if (parsedURL.username || parsedURL.password) {
          parsedURL.username = "";
          parsedURL.password = "";
          url = parsedURL.href;
        }
      }
      if (auth) {
        headers.delete("authorization");
        headers.set(
          "Authorization",
          "Basic " + btoa(encodeUTF8((auth.username || "") + ":" + (auth.password || "")))
        );
      }
      if (hasMaxContentLength && typeof url === "string" && url.startsWith("data:")) {
        const estimated = estimateDataURLDecodedBytes(url);
        if (estimated > maxContentLength) {
          throw new AxiosError$1(
            "maxContentLength size of " + maxContentLength + " exceeded",
            AxiosError$1.ERR_BAD_RESPONSE,
            config,
            request
          );
        }
      }
      if (hasMaxBodyLength && method !== "get" && method !== "head") {
        const outboundLength = await getBodyLength(data);
        if (typeof outboundLength === "number" && isFinite(outboundLength)) {
          requestContentLength = outboundLength;
          if (outboundLength > maxBodyLength) {
            throw maxBodyLengthError();
          }
        }
      }
      const mustEnforceStreamBody = hasMaxBodyLength && (utils$1.isReadableStream(data) || utils$1.isStream(data));
      const trackRequestStream = (stream, onProgress, flush) => trackStream(
        stream,
        DEFAULT_CHUNK_SIZE,
        (loadedBytes) => {
          if (hasMaxBodyLength && loadedBytes > maxBodyLength) {
            throw pendingBodyError = maxBodyLengthError();
          }
          onProgress && onProgress(loadedBytes);
        },
        flush
      );
      if (supportsRequestStream && method !== "get" && method !== "head" && (onUploadProgress || mustEnforceStreamBody)) {
        requestContentLength = requestContentLength == null ? await resolveBodyLength(headers, data) : requestContentLength;
        if (requestContentLength !== 0 || mustEnforceStreamBody) {
          let _request = new Request(url, {
            method: "POST",
            body: data,
            duplex: "half"
          });
          let contentTypeHeader;
          if (utils$1.isFormData(data) && (contentTypeHeader = _request.headers.get("content-type"))) {
            headers.setContentType(contentTypeHeader);
          }
          if (_request.body) {
            const [onProgress, flush] = onUploadProgress && progressEventDecorator(
              requestContentLength,
              progressEventReducer(asyncDecorator(onUploadProgress))
            ) || [];
            data = trackRequestStream(_request.body, onProgress, flush);
          }
        }
      } else if (mustEnforceStreamBody && !isRequestSupported && isReadableStreamSupported && method !== "get" && method !== "head") {
        data = trackRequestStream(data);
      } else if (mustEnforceStreamBody && isRequestSupported && !supportsRequestStream && method !== "get" && method !== "head") {
        throw new AxiosError$1(
          "Stream request bodies are not supported by the current fetch implementation",
          AxiosError$1.ERR_NOT_SUPPORT,
          config,
          request
        );
      }
      if (!utils$1.isString(withCredentials)) {
        withCredentials = withCredentials ? "include" : "omit";
      }
      const isCredentialsSupported = isRequestSupported && "credentials" in Request.prototype;
      if (utils$1.isFormData(data)) {
        const contentType = headers.getContentType();
        if (contentType && /^multipart\/form-data/i.test(contentType) && !/boundary=/i.test(contentType)) {
          headers.delete("content-type");
        }
      }
      headers.set("User-Agent", "axios/" + VERSION$1, false);
      const resolvedOptions = {
        ...fetchOptions,
        signal: composedSignal,
        method: method.toUpperCase(),
        headers: toByteStringHeaderObject(headers.normalize()),
        body: data,
        duplex: "half",
        credentials: isCredentialsSupported ? withCredentials : void 0
      };
      request = isRequestSupported && new Request(url, resolvedOptions);
      let response = await (isRequestSupported ? _fetch(request, fetchOptions) : _fetch(url, resolvedOptions));
      const responseHeaders = AxiosHeaders$1.from(response.headers);
      if (hasMaxContentLength) {
        const declaredLength = utils$1.toFiniteNumber(responseHeaders.getContentLength());
        if (declaredLength != null && declaredLength > maxContentLength) {
          throw new AxiosError$1(
            "maxContentLength size of " + maxContentLength + " exceeded",
            AxiosError$1.ERR_BAD_RESPONSE,
            config,
            request
          );
        }
      }
      const isStreamResponse = supportsResponseStream && (responseType === "stream" || responseType === "response");
      if (supportsResponseStream && response.body && (onDownloadProgress || hasMaxContentLength || isStreamResponse && unsubscribe2)) {
        const options = {};
        ["status", "statusText", "headers"].forEach((prop) => {
          options[prop] = response[prop];
        });
        const responseContentLength = utils$1.toFiniteNumber(responseHeaders.getContentLength());
        const [onProgress, flush] = onDownloadProgress && progressEventDecorator(
          responseContentLength,
          progressEventReducer(asyncDecorator(onDownloadProgress), true)
        ) || [];
        let bytesRead = 0;
        const onChunkProgress = (loadedBytes) => {
          if (hasMaxContentLength) {
            bytesRead = loadedBytes;
            if (bytesRead > maxContentLength) {
              throw new AxiosError$1(
                "maxContentLength size of " + maxContentLength + " exceeded",
                AxiosError$1.ERR_BAD_RESPONSE,
                config,
                request
              );
            }
          }
          onProgress && onProgress(loadedBytes);
        };
        response = new Response(
          trackStream(response.body, DEFAULT_CHUNK_SIZE, onChunkProgress, () => {
            flush && flush();
            unsubscribe2 && unsubscribe2();
          }),
          options
        );
      }
      responseType = responseType || "text";
      let responseData = await resolvers[utils$1.findKey(resolvers, responseType) || "text"](
        response,
        config
      );
      if (hasMaxContentLength && !supportsResponseStream && !isStreamResponse) {
        let materializedSize;
        if (responseData != null) {
          if (typeof responseData.byteLength === "number") {
            materializedSize = responseData.byteLength;
          } else if (typeof responseData.size === "number") {
            materializedSize = responseData.size;
          } else if (typeof responseData === "string") {
            materializedSize = typeof TextEncoder === "function" ? new TextEncoder().encode(responseData).byteLength : responseData.length;
          }
        }
        if (typeof materializedSize === "number" && materializedSize > maxContentLength) {
          throw new AxiosError$1(
            "maxContentLength size of " + maxContentLength + " exceeded",
            AxiosError$1.ERR_BAD_RESPONSE,
            config,
            request
          );
        }
      }
      !isStreamResponse && unsubscribe2 && unsubscribe2();
      return await new Promise((resolve3, reject2) => {
        settle(resolve3, reject2, {
          data: responseData,
          headers: AxiosHeaders$1.from(response.headers),
          status: response.status,
          statusText: response.statusText,
          config,
          request
        });
      });
    } catch (err) {
      unsubscribe2 && unsubscribe2();
      if (composedSignal && composedSignal.aborted && composedSignal.reason instanceof AxiosError$1) {
        const canceledError = composedSignal.reason;
        canceledError.config = config;
        request && (canceledError.request = request);
        if (err !== canceledError) {
          Object.defineProperty(canceledError, "cause", {
            __proto__: null,
            value: err,
            writable: true,
            enumerable: false,
            configurable: true
          });
        }
        throw canceledError;
      }
      if (pendingBodyError) {
        request && !pendingBodyError.request && (pendingBodyError.request = request);
        throw pendingBodyError;
      }
      if (err instanceof AxiosError$1) {
        request && !err.request && (err.request = request);
        throw err;
      }
      if (err && err.name === "TypeError" && /Load failed|fetch/i.test(err.message)) {
        const networkError = new AxiosError$1(
          "Network Error",
          AxiosError$1.ERR_NETWORK,
          config,
          request,
          err && err.response
        );
        Object.defineProperty(networkError, "cause", {
          __proto__: null,
          value: err.cause || err,
          writable: true,
          enumerable: false,
          configurable: true
        });
        throw networkError;
      }
      throw AxiosError$1.from(err, err && err.code, config, request, err && err.response);
    }
  };
};
const seedCache = /* @__PURE__ */ new Map();
const getFetch = (config) => {
  let env = config && config.env || {};
  const { fetch: fetch2, Request, Response } = env;
  const seeds = [Request, Response, fetch2];
  let len2 = seeds.length, i2 = len2, seed, target, map = seedCache;
  while (i2--) {
    seed = seeds[i2];
    target = map.get(seed);
    target === void 0 && map.set(seed, target = i2 ? /* @__PURE__ */ new Map() : factory(env));
    map = target;
  }
  return target;
};
getFetch();
const knownAdapters = {
  http: httpAdapter,
  xhr: xhrAdapter,
  fetch: {
    get: getFetch
  }
};
utils$1.forEach(knownAdapters, (fn, value) => {
  if (fn) {
    try {
      Object.defineProperty(fn, "name", { __proto__: null, value });
    } catch (e2) {
    }
    Object.defineProperty(fn, "adapterName", { __proto__: null, value });
  }
});
const renderReason = (reason) => `- ${reason}`;
const isResolvedHandle = (adapter) => utils$1.isFunction(adapter) || adapter === null || adapter === false;
function getAdapter$1(adapters2, config) {
  adapters2 = utils$1.isArray(adapters2) ? adapters2 : [adapters2];
  const { length } = adapters2;
  let nameOrAdapter;
  let adapter;
  const rejectedReasons = {};
  for (let i2 = 0; i2 < length; i2++) {
    nameOrAdapter = adapters2[i2];
    let id;
    adapter = nameOrAdapter;
    if (!isResolvedHandle(nameOrAdapter)) {
      adapter = knownAdapters[(id = String(nameOrAdapter)).toLowerCase()];
      if (adapter === void 0) {
        throw new AxiosError$1(`Unknown adapter '${id}'`);
      }
    }
    if (adapter && (utils$1.isFunction(adapter) || (adapter = adapter.get(config)))) {
      break;
    }
    rejectedReasons[id || "#" + i2] = adapter;
  }
  if (!adapter) {
    const reasons = Object.entries(rejectedReasons).map(
      ([id, state]) => `adapter ${id} ` + (state === false ? "is not supported by the environment" : "is not available in the build")
    );
    let s2 = length ? reasons.length > 1 ? "since :\n" + reasons.map(renderReason).join("\n") : " " + renderReason(reasons[0]) : "as no adapter specified";
    throw new AxiosError$1(
      `There is no suitable adapter to dispatch the request ` + s2,
      AxiosError$1.ERR_NOT_SUPPORT
    );
  }
  return adapter;
}
const adapters = {
  /**
   * Resolve an adapter from a list of adapter names or functions.
   * @type {Function}
   */
  getAdapter: getAdapter$1,
  /**
   * Exposes all known adapters
   * @type {Object<string, Function|Object>}
   */
  adapters: knownAdapters
};
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
  if (config.signal && config.signal.aborted) {
    throw new CanceledError$1(null, config);
  }
}
function dispatchRequest(config) {
  throwIfCancellationRequested(config);
  config.headers = AxiosHeaders$1.from(config.headers);
  config.data = transformData.call(config, config.transformRequest);
  if (["post", "put", "patch"].indexOf(config.method) !== -1) {
    config.headers.setContentType("application/x-www-form-urlencoded", false);
  }
  const adapter = adapters.getAdapter(config.adapter || defaults.adapter, config);
  return adapter(config).then(
    function onAdapterResolution(response) {
      throwIfCancellationRequested(config);
      config.response = response;
      try {
        response.data = transformData.call(config, config.transformResponse, response);
      } finally {
        delete config.response;
      }
      response.headers = AxiosHeaders$1.from(response.headers);
      return response;
    },
    function onAdapterRejection(reason) {
      if (!isCancel$1(reason)) {
        throwIfCancellationRequested(config);
        if (reason && reason.response) {
          config.response = reason.response;
          try {
            reason.response.data = transformData.call(
              config,
              config.transformResponse,
              reason.response
            );
          } finally {
            delete config.response;
          }
          reason.response.headers = AxiosHeaders$1.from(reason.response.headers);
        }
      }
      return Promise.reject(reason);
    }
  );
}
const validators$1 = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((type, i2) => {
  validators$1[type] = function validator2(thing) {
    return typeof thing === type || "a" + (i2 < 1 ? "n " : " ") + type;
  };
});
const deprecatedWarnings = {};
validators$1.transitional = function transitional(validator2, version, message) {
  function formatMessage(opt, desc) {
    return "[Axios v" + VERSION$1 + "] Transitional option '" + opt + "'" + desc + (message ? ". " + message : "");
  }
  return (value, opt, opts) => {
    if (validator2 === false) {
      throw new AxiosError$1(
        formatMessage(opt, " has been removed" + (version ? " in " + version : "")),
        AxiosError$1.ERR_DEPRECATED
      );
    }
    if (version && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      console.warn(
        formatMessage(
          opt,
          " has been deprecated since v" + version + " and will be removed in the near future"
        )
      );
    }
    return validator2 ? validator2(value, opt, opts) : true;
  };
};
validators$1.spelling = function spelling(correctSpelling) {
  return (value, opt) => {
    console.warn(`${opt} is likely a misspelling of ${correctSpelling}`);
    return true;
  };
};
function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== "object" || options === null) {
    throw new AxiosError$1("options must be an object", AxiosError$1.ERR_BAD_OPTION_VALUE);
  }
  const keys = Object.keys(options);
  let i2 = keys.length;
  while (i2-- > 0) {
    const opt = keys[i2];
    const validator2 = Object.prototype.hasOwnProperty.call(schema, opt) ? schema[opt] : void 0;
    if (validator2) {
      const value = options[opt];
      const result = value === void 0 || validator2(value, opt, options);
      if (result !== true) {
        throw new AxiosError$1(
          "option " + opt + " must be " + result,
          AxiosError$1.ERR_BAD_OPTION_VALUE
        );
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw new AxiosError$1("Unknown option " + opt, AxiosError$1.ERR_BAD_OPTION);
    }
  }
}
const validator = {
  assertOptions,
  validators: validators$1
};
const validators = validator.validators;
let Axios$1 = class Axios {
  constructor(instanceConfig) {
    this.defaults = instanceConfig || {};
    this.interceptors = {
      request: new InterceptorManager(),
      response: new InterceptorManager()
    };
  }
  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  async request(configOrUrl, config) {
    try {
      return await this._request(configOrUrl, config);
    } catch (err) {
      if (err instanceof Error) {
        let dummy = {};
        Error.captureStackTrace ? Error.captureStackTrace(dummy) : dummy = new Error();
        const stack = (() => {
          if (!dummy.stack) {
            return "";
          }
          const firstNewlineIndex = dummy.stack.indexOf("\n");
          return firstNewlineIndex === -1 ? "" : dummy.stack.slice(firstNewlineIndex + 1);
        })();
        try {
          if (!err.stack) {
            err.stack = stack;
          } else if (stack) {
            const firstNewlineIndex = stack.indexOf("\n");
            const secondNewlineIndex = firstNewlineIndex === -1 ? -1 : stack.indexOf("\n", firstNewlineIndex + 1);
            const stackWithoutTwoTopLines = secondNewlineIndex === -1 ? "" : stack.slice(secondNewlineIndex + 1);
            if (!String(err.stack).endsWith(stackWithoutTwoTopLines)) {
              err.stack += "\n" + stack;
            }
          }
        } catch (e2) {
        }
      }
      throw err;
    }
  }
  _request(configOrUrl, config) {
    if (typeof configOrUrl === "string") {
      config = config || {};
      config.url = configOrUrl;
    } else {
      config = configOrUrl || {};
    }
    config = mergeConfig$1(this.defaults, config);
    const { transitional: transitional2, paramsSerializer, headers } = config;
    if (transitional2 !== void 0) {
      validator.assertOptions(
        transitional2,
        {
          silentJSONParsing: validators.transitional(validators.boolean),
          forcedJSONParsing: validators.transitional(validators.boolean),
          clarifyTimeoutError: validators.transitional(validators.boolean),
          legacyInterceptorReqResOrdering: validators.transitional(validators.boolean),
          advertiseZstdAcceptEncoding: validators.transitional(validators.boolean),
          validateStatusUndefinedResolves: validators.transitional(validators.boolean)
        },
        false
      );
    }
    if (paramsSerializer != null) {
      if (utils$1.isFunction(paramsSerializer)) {
        config.paramsSerializer = {
          serialize: paramsSerializer
        };
      } else {
        validator.assertOptions(
          paramsSerializer,
          {
            encode: validators.function,
            serialize: validators.function
          },
          true
        );
      }
    }
    if (config.allowAbsoluteUrls !== void 0) ;
    else if (this.defaults.allowAbsoluteUrls !== void 0) {
      config.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls;
    } else {
      config.allowAbsoluteUrls = true;
    }
    validator.assertOptions(
      config,
      {
        baseUrl: validators.spelling("baseURL"),
        withXsrfToken: validators.spelling("withXSRFToken")
      },
      true
    );
    config.method = (config.method || this.defaults.method || "get").toLowerCase();
    let contextHeaders = headers && utils$1.merge(headers.common, headers[config.method]);
    headers && utils$1.forEach(["delete", "get", "head", "post", "put", "patch", "query", "common"], (method) => {
      delete headers[method];
    });
    config.headers = AxiosHeaders$1.concat(contextHeaders, headers);
    const requestInterceptorChain = [];
    let synchronousRequestInterceptors = true;
    this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
      if (typeof interceptor.runWhen === "function" && interceptor.runWhen(config) === false) {
        return;
      }
      synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
      const transitional3 = config.transitional || transitionalDefaults;
      const legacyInterceptorReqResOrdering = transitional3 && transitional3.legacyInterceptorReqResOrdering;
      if (legacyInterceptorReqResOrdering) {
        requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
      } else {
        requestInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
      }
    });
    const responseInterceptorChain = [];
    this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
      responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
    });
    let promise;
    let i2 = 0;
    let len2;
    if (!synchronousRequestInterceptors) {
      const chain = [dispatchRequest.bind(this), void 0];
      chain.unshift(...requestInterceptorChain);
      chain.push(...responseInterceptorChain);
      len2 = chain.length;
      promise = Promise.resolve(config);
      while (i2 < len2) {
        promise = promise.then(chain[i2++], chain[i2++]);
      }
      return promise;
    }
    len2 = requestInterceptorChain.length;
    let newConfig = config;
    while (i2 < len2) {
      const onFulfilled = requestInterceptorChain[i2++];
      const onRejected = requestInterceptorChain[i2++];
      try {
        newConfig = onFulfilled(newConfig);
      } catch (error) {
        onRejected.call(this, error);
        break;
      }
    }
    try {
      promise = dispatchRequest.call(this, newConfig);
    } catch (error) {
      return Promise.reject(error);
    }
    i2 = 0;
    len2 = responseInterceptorChain.length;
    while (i2 < len2) {
      promise = promise.then(responseInterceptorChain[i2++], responseInterceptorChain[i2++]);
    }
    return promise;
  }
  getUri(config) {
    config = mergeConfig$1(this.defaults, config);
    const fullPath = buildFullPath(config.baseURL, config.url, config.allowAbsoluteUrls, config);
    return buildURL(fullPath, config.params, config.paramsSerializer);
  }
};
utils$1.forEach(["delete", "get", "head", "options"], function forEachMethodNoData(method) {
  Axios$1.prototype[method] = function(url, config) {
    return this.request(
      mergeConfig$1(config || {}, {
        method,
        url,
        data: config && utils$1.hasOwnProp(config, "data") ? config.data : void 0
      })
    );
  };
});
utils$1.forEach(["post", "put", "patch", "query"], function forEachMethodWithData(method) {
  function generateHTTPMethod(isForm) {
    return function httpMethod(url, data, config) {
      return this.request(
        mergeConfig$1(config || {}, {
          method,
          headers: isForm ? {
            "Content-Type": "multipart/form-data"
          } : {},
          url,
          data
        })
      );
    };
  }
  Axios$1.prototype[method] = generateHTTPMethod();
  if (method !== "query") {
    Axios$1.prototype[method + "Form"] = generateHTTPMethod(true);
  }
});
let CancelToken$1 = class CancelToken {
  constructor(executor) {
    if (typeof executor !== "function") {
      throw new TypeError("executor must be a function.");
    }
    let resolvePromise;
    this.promise = new Promise(function promiseExecutor(resolve3) {
      resolvePromise = resolve3;
    });
    const token = this;
    this.promise.then((cancel) => {
      if (!token._listeners) return;
      let i2 = token._listeners.length;
      while (i2-- > 0) {
        token._listeners[i2](cancel);
      }
      token._listeners = null;
    });
    this.promise.then = (onfulfilled) => {
      let _resolve;
      const promise = new Promise((resolve3) => {
        token.subscribe(resolve3);
        _resolve = resolve3;
      }).then(onfulfilled);
      promise.cancel = function reject2() {
        token.unsubscribe(_resolve);
      };
      return promise;
    };
    executor(function cancel(message, config, request) {
      if (token.reason) {
        return;
      }
      token.reason = new CanceledError$1(message, config, request);
      resolvePromise(token.reason);
    });
  }
  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason) {
      throw this.reason;
    }
  }
  /**
   * Subscribe to the cancel signal
   */
  subscribe(listener) {
    if (this.reason) {
      listener(this.reason);
      return;
    }
    if (this._listeners) {
      this._listeners.push(listener);
    } else {
      this._listeners = [listener];
    }
  }
  /**
   * Unsubscribe from the cancel signal
   */
  unsubscribe(listener) {
    if (!this._listeners) {
      return;
    }
    const index = this._listeners.indexOf(listener);
    if (index !== -1) {
      this._listeners.splice(index, 1);
    }
  }
  toAbortSignal() {
    const controller = new AbortController();
    const abort = (err) => {
      controller.abort(err);
    };
    this.subscribe(abort);
    controller.signal.unsubscribe = () => this.unsubscribe(abort);
    return controller.signal;
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let cancel;
    const token = new CancelToken(function executor(c2) {
      cancel = c2;
    });
    return {
      token,
      cancel
    };
  }
};
function spread$1(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
}
function isAxiosError$1(payload) {
  return utils$1.isObject(payload) && payload.isAxiosError === true;
}
const HttpStatusCode$1 = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511,
  WebServerIsDown: 521,
  ConnectionTimedOut: 522,
  OriginIsUnreachable: 523,
  TimeoutOccurred: 524,
  SslHandshakeFailed: 525,
  InvalidSslCertificate: 526
};
Object.entries(HttpStatusCode$1).forEach(([key, value]) => {
  HttpStatusCode$1[value] = key;
});
function createInstance(defaultConfig) {
  const context = new Axios$1(defaultConfig);
  const instance = bind(Axios$1.prototype.request, context);
  utils$1.extend(instance, Axios$1.prototype, context, { allOwnKeys: true });
  utils$1.extend(instance, context, null, { allOwnKeys: true });
  instance.create = function create2(instanceConfig) {
    return createInstance(mergeConfig$1(defaultConfig, instanceConfig));
  };
  return instance;
}
const axios = createInstance(defaults);
axios.Axios = Axios$1;
axios.CanceledError = CanceledError$1;
axios.CancelToken = CancelToken$1;
axios.isCancel = isCancel$1;
axios.VERSION = VERSION$1;
axios.toFormData = toFormData$1;
axios.AxiosError = AxiosError$1;
axios.Cancel = axios.CanceledError;
axios.all = function all2(promises) {
  return Promise.all(promises);
};
axios.spread = spread$1;
axios.isAxiosError = isAxiosError$1;
axios.mergeConfig = mergeConfig$1;
axios.AxiosHeaders = AxiosHeaders$1;
axios.formToJSON = (thing) => formDataToJSON(utils$1.isHTMLForm(thing) ? new FormData(thing) : thing);
axios.getAdapter = adapters.getAdapter;
axios.HttpStatusCode = HttpStatusCode$1;
axios.default = axios;
const {
  Axios: Axios2,
  AxiosError: AxiosError2,
  CanceledError: CanceledError2,
  isCancel,
  CancelToken: CancelToken2,
  VERSION,
  all: all3,
  Cancel,
  isAxiosError,
  spread,
  toFormData,
  AxiosHeaders: AxiosHeaders2,
  HttpStatusCode,
  formToJSON,
  getAdapter,
  mergeConfig,
  create
} = axios;
/*!
 * SPDX-License-Identifier: GPL-3.0-or-later
 * SPDX-FileCopyrightText: 2025 Nextcloud GmbH and Nextcloud contributors
 */
function getCancelableClient() {
  const client = axios.create({
    headers: {
      requesttoken: getRequestToken() ?? "",
      "X-Requested-With": "XMLHttpRequest"
    }
  });
  onRequestTokenUpdate((token) => {
    client.defaults.headers.requesttoken = token;
  });
  return Object.assign(client, {
    CancelToken: axios.CancelToken,
    isCancel: axios.isCancel
  });
}
const RETRY_KEY = "_nextcloudCsrfTokenReloaded";
function onCsrfTokenError(axios2) {
  return async (error) => {
    if (!isAxiosError(error)) {
      throw error;
    }
    const { config, response, request } = error;
    const responseURL = request?.responseURL;
    if (config && !(RETRY_KEY in config) && response?.status === 412 && response?.data?.message === "CSRF check failed") {
      console.warn(`Request to ${responseURL} failed because of a CSRF mismatch. Fetching a new token.`);
      const token = await fetchRequestToken();
      axios2.defaults.headers.requesttoken = token;
      return axios2({
        ...config,
        [RETRY_KEY]: true,
        headers: {
          ...config.headers,
          requesttoken: token
        }
      });
    }
    throw error;
  };
}
const RETRY_DELAY_KEY = "_nextcloudMaintenanceModeRetryDelay";
function onMaintenanceModeError(axios2) {
  return async (error) => {
    if (!isAxiosError(error)) {
      throw error;
    }
    const { config, response, request } = error;
    const responseURL = request?.responseURL;
    const status = response?.status;
    const headers = response?.headers;
    let retryDelay = config?.[RETRY_DELAY_KEY] ?? 1;
    if (status === 503 && headers?.["x-nextcloud-maintenance-mode"] === "1" && config?.retryIfMaintenanceMode) {
      retryDelay *= 2;
      if (retryDelay > 32) {
        console.error("Retry delay exceeded one minute, giving up.", { responseURL });
        throw error;
      }
      console.warn(`Request to ${responseURL} failed because of maintenance mode. Retrying in ${retryDelay}s`);
      await new Promise((resolve3) => {
        setTimeout(resolve3, retryDelay * 1e3);
      });
      return axios2({
        ...config,
        [RETRY_DELAY_KEY]: retryDelay
      });
    }
    throw error;
  };
}
async function onNotLoggedInError(error) {
  if (isAxiosError(error)) {
    const { config, response, request } = error;
    const responseURL = request?.responseURL;
    const status = response?.status;
    if (status === 401 && response?.data?.message === "Current user is not logged in" && config?.reloadExpiredSession && globalThis.location?.reload) {
      console.error(`Request to ${responseURL} failed because the user session expired. Reloading the page …`);
      if (globalThis.OC?.reload) {
        globalThis.OC.reload();
      } else {
        globalThis.location.reload();
      }
    }
  }
  throw error;
}
const cancelableClient = getCancelableClient();
cancelableClient.interceptors.response.use((r2) => r2, onCsrfTokenError(cancelableClient));
cancelableClient.interceptors.response.use((r2) => r2, onMaintenanceModeError(cancelableClient));
cancelableClient.interceptors.response.use((r2) => r2, onNotLoggedInError);
const POLL_INTERVAL = 1e4;
const DONE_TTL = 6e3;
const FADE_MS = 400;
const BADGE_CLASS = "song-finder-badge";
const jobs = /* @__PURE__ */ new Map();
const runningPaths = /* @__PURE__ */ new Set();
const SPINNER_SVG = '<svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M12 2a10 10 0 0 1 10 10h-3a7 7 0 0 0-7-7V2Z"/></svg>';
const CHECK_SVG = '<svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>';
function injectStyles() {
  if (document.getElementById("song-finder-styles")) {
    return;
  }
  const style = document.createElement("style");
  style.id = "song-finder-styles";
  style.textContent = `
		.${BADGE_CLASS} {
			display: inline-flex;
			align-items: center;
			margin-inline-start: 6px;
			vertical-align: middle;
			opacity: 1;
			transition: opacity ${FADE_MS}ms ease;
		}
		.${BADGE_CLASS}--hiding {
			opacity: 0;
		}
		.${BADGE_CLASS}[data-state="running"] {
			color: var(--color-primary-element, #0082c9);
			animation: song-finder-spin 1s linear infinite;
		}
		.${BADGE_CLASS}[data-state="done"] {
			color: var(--color-success, #46ba61);
		}
		@keyframes song-finder-spin {
			from { transform: rotate(0deg); }
			to { transform: rotate(360deg); }
		}
	`;
  document.head.appendChild(style);
}
function findRow(fileid) {
  return document.querySelector(`[data-cy-files-list-row-fileid="${fileid}"]`);
}
function findBadgeHost(row) {
  return row.querySelector(".files-list__row-name-text") ?? row.querySelector(".files-list__row-name") ?? row;
}
let renderScheduled = false;
function scheduleRender() {
  if (renderScheduled) {
    return;
  }
  renderScheduled = true;
  window.requestAnimationFrame(() => {
    renderScheduled = false;
    renderBadges();
  });
}
function renderBadges() {
  document.querySelectorAll(`.${BADGE_CLASS}`).forEach((el) => {
    const id = Number(el.dataset.fileid);
    if (!jobs.has(id)) {
      el.remove();
    }
  });
  for (const job of jobs.values()) {
    const row = findRow(job.fileid);
    if (!row) {
      continue;
    }
    let badge = row.querySelector(`.${BADGE_CLASS}`);
    if (!badge) {
      badge = document.createElement("span");
      badge.className = BADGE_CLASS;
      badge.dataset.fileid = String(job.fileid);
      findBadgeHost(row).appendChild(badge);
    }
    if (badge.dataset.state !== job.state) {
      badge.dataset.state = job.state;
      badge.innerHTML = job.state === "running" ? SPINNER_SVG : CHECK_SVG;
      badge.title = job.state === "running" ? `Identifying songs in ${job.name}…` : "Song identification done";
    }
  }
}
let observer = null;
function ensureObserver() {
  if (observer) {
    return;
  }
  const container = document.querySelector("[data-cy-files-list]") ?? document.querySelector(".files-list") ?? document.body;
  observer = new MutationObserver(() => scheduleRender());
  observer.observe(container, { childList: true, subtree: true });
}
function finishJob(job) {
  job.state = "done";
  runningPaths.delete(job.path);
  if (job.pollTimer) {
    window.clearInterval(job.pollTimer);
    job.pollTimer = void 0;
  }
  scheduleRender();
  job.clearTimer = window.setTimeout(() => {
    const badge = findRow(job.fileid)?.querySelector(`.${BADGE_CLASS}`);
    badge?.classList.add(`${BADGE_CLASS}--hiding`);
    window.setTimeout(() => {
      jobs.delete(job.fileid);
      scheduleRender();
    }, FADE_MS);
  }, DONE_TTL);
}
async function getStatus(path) {
  const response = await cancelableClient.get(generateUrl("/apps/song_finder/status"), {
    params: { path }
  });
  return response.data;
}
function watchJob(job, path) {
  job.pollTimer = window.setInterval(async () => {
    try {
      const status = await getStatus(path);
      if (!status.running) {
        finishJob(job);
      }
    } catch (e2) {
      if (job.pollTimer) {
        window.clearInterval(job.pollTimer);
      }
      jobs.delete(job.fileid);
      runningPaths.delete(path);
      scheduleRender();
      showError("Could not check Song Finder status");
      console.error(e2);
    }
  }, POLL_INTERVAL);
}
function startTracking(node, path) {
  const fileid = node.fileid;
  const name = path.split("/").pop() || path;
  const job = { fileid, path, name, state: "running" };
  jobs.set(fileid, job);
  runningPaths.add(path);
  injectStyles();
  ensureObserver();
  scheduleRender();
  watchJob(job, path);
  return job;
}
registerFileAction(new FileAction({
  id: "song_finder",
  displayName: () => "Identify songs",
  iconSvgInline: () => '<svg viewBox="0 0 20 20" width="20" height="20"><path fill="currentColor" d="M10 2a8 8 0 1 0 0 16a8 8 0 0 0 0-16Zm2 11.5a2 2 0 1 1-1-1.73V6h3v2h-2v5.5Z"/></svg>',
  enabled: (nodes) => {
    if (nodes.length !== 1) {
      return false;
    }
    const node = nodes[0];
    if (runningPaths.has(node.path)) {
      return false;
    }
    return (node.permissions & Permission.READ) !== 0;
  },
  exec: async (node) => {
    const path = node.path;
    try {
      const status = await getStatus(path);
      if (status.running) {
        startTracking(node, path);
        return false;
      }
      await cancelableClient.post(generateUrl("/apps/song_finder/start"), { path });
      startTracking(node, path);
      return true;
    } catch (e2) {
      runningPaths.delete(path);
      console.error(e2);
      return false;
    }
  }
}));
//# sourceMappingURL=song_finder-main.mjs.map
