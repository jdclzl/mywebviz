/******/ (function(modules) { // webpackBootstrap
/******/ 	var parentHotUpdateCallback = this["webpackHotUpdate"];
/******/ 	this["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		importScripts(__webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js");
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	//eslint-disable-next-line no-unused-vars
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "3145c4e76fa2c088e0d1";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "main";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
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
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire("./node_modules/babel-loader/lib/index.js?cacheDirectory!./packages/webviz-core/src/panels/ImageView/ImageCanvas.worker.js")(__webpack_require__.s = "./node_modules/babel-loader/lib/index.js?cacheDirectory!./packages/webviz-core/src/panels/ImageView/ImageCanvas.worker.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/babel-loader/lib/index.js?cacheDirectory!./packages/webviz-core/src/panels/ImageView/ImageCanvas.worker.js":
/*!************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib?cacheDirectory!./packages/webviz-core/src/panels/ImageView/ImageCanvas.worker.js ***!
  \************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(global) {\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nvar _renderImage = __webpack_require__(/*! ./renderImage */ \"./packages/webviz-core/src/panels/ImageView/renderImage.js\");\n\nvar _Rpc = _interopRequireDefault(__webpack_require__(/*! webviz-core/src/util/Rpc */ \"./packages/webviz-core/src/util/Rpc.js\"));\n\nvar _RpcUtils = __webpack_require__(/*! webviz-core/src/util/RpcUtils */ \"./packages/webviz-core/src/util/RpcUtils.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nclass ImageCanvasWorker {\n  constructor(rpc) {\n    _defineProperty(this, \"_idToCanvas\", {});\n\n    _defineProperty(this, \"_rpc\", void 0);\n\n    this._rpc = rpc;\n\n    if (true) {\n      (0, _RpcUtils.setupSendReportErrorHandler)(this._rpc);\n    }\n\n    rpc.receive(\"initialize\", async ({\n      id,\n      canvas\n    }) => {\n      this._idToCanvas[id] = canvas;\n    });\n    rpc.receive(\"renderImage\", async ({\n      id,\n      imageMessage,\n      rawMarkerData,\n      imageMarkerDatatypes,\n      imageMarkerArrayDatatypes\n    }) => {\n      const canvas = this._idToCanvas[id];\n      return (0, _renderImage.renderImage)({\n        canvas,\n        imageMessage,\n        rawMarkerData,\n        imageMarkerDatatypes,\n        imageMarkerArrayDatatypes\n      });\n    });\n  }\n\n}\n\nexports.default = ImageCanvasWorker;\n\nif (global.postMessage && !global.onmessage) {\n  new ImageCanvasWorker(new _Rpc.default(global));\n}\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../node_modules/webpack/buildin/global.js */ \"./node_modules/webpack/buildin/global.js\")))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz9jYWNoZURpcmVjdG9yeSEuL3BhY2thZ2VzL3dlYnZpei1jb3JlL3NyYy9wYW5lbHMvSW1hZ2VWaWV3L0ltYWdlQ2FudmFzLndvcmtlci5qcy5qcyIsInNvdXJjZXMiOlsiL2hvbWUvbm9kZS93ZWJ2aXovcGFja2FnZXMvd2Vidml6LWNvcmUvc3JjL3BhbmVscy9JbWFnZVZpZXcvSW1hZ2VDYW52YXMud29ya2VyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIEBmbG93XG4vL1xuLy8gIENvcHlyaWdodCAoYykgMjAxOC1wcmVzZW50LCBDcnVpc2UgTExDXG4vL1xuLy8gIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCxcbi8vICBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuLy8gIFlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cblxuaW1wb3J0IHsgcmVuZGVySW1hZ2UgfSBmcm9tIFwiLi9yZW5kZXJJbWFnZVwiO1xuaW1wb3J0IHsgdHlwZSBEaW1lbnNpb25zLCB0eXBlIFJhd01hcmtlckRhdGEsIHR5cGUgT2Zmc2NyZWVuQ2FudmFzIH0gZnJvbSBcIi4vdXRpbFwiO1xuaW1wb3J0IFJwYyBmcm9tIFwid2Vidml6LWNvcmUvc3JjL3V0aWwvUnBjXCI7XG5pbXBvcnQgeyBzZXR1cFNlbmRSZXBvcnRFcnJvckhhbmRsZXIgfSBmcm9tIFwid2Vidml6LWNvcmUvc3JjL3V0aWwvUnBjVXRpbHNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW1hZ2VDYW52YXNXb3JrZXIge1xuICBfaWRUb0NhbnZhczogeyBbc3RyaW5nXTogT2Zmc2NyZWVuQ2FudmFzIH0gPSB7fTtcbiAgX3JwYzogUnBjO1xuXG4gIGNvbnN0cnVjdG9yKHJwYzogUnBjKSB7XG4gICAgdGhpcy5fcnBjID0gcnBjO1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJ0ZXN0XCIpIHtcbiAgICAgIHNldHVwU2VuZFJlcG9ydEVycm9ySGFuZGxlcih0aGlzLl9ycGMpO1xuICAgIH1cblxuICAgIHJwYy5yZWNlaXZlKFwiaW5pdGlhbGl6ZVwiLCBhc3luYyAoeyBpZCwgY2FudmFzIH06IHsgaWQ6IHN0cmluZywgY2FudmFzOiBPZmZzY3JlZW5DYW52YXMgfSkgPT4ge1xuICAgICAgdGhpcy5faWRUb0NhbnZhc1tpZF0gPSBjYW52YXM7XG4gICAgfSk7XG5cbiAgICBycGMucmVjZWl2ZShcbiAgICAgIFwicmVuZGVySW1hZ2VcIixcbiAgICAgIGFzeW5jICh7XG4gICAgICAgIGlkLFxuICAgICAgICBpbWFnZU1lc3NhZ2UsXG4gICAgICAgIHJhd01hcmtlckRhdGEsXG4gICAgICAgIGltYWdlTWFya2VyRGF0YXR5cGVzLFxuICAgICAgICBpbWFnZU1hcmtlckFycmF5RGF0YXR5cGVzLFxuICAgICAgfToge1xuICAgICAgICBpZDogc3RyaW5nLFxuICAgICAgICBpbWFnZU1lc3NhZ2U6IGFueSxcbiAgICAgICAgcmF3TWFya2VyRGF0YTogUmF3TWFya2VyRGF0YSxcbiAgICAgICAgaW1hZ2VNYXJrZXJEYXRhdHlwZXM6IHN0cmluZ1tdLFxuICAgICAgICBpbWFnZU1hcmtlckFycmF5RGF0YXR5cGVzOiBzdHJpbmdbXSxcbiAgICAgIH0pOiBQcm9taXNlPD9EaW1lbnNpb25zPiA9PiB7XG4gICAgICAgIGNvbnN0IGNhbnZhcyA9IHRoaXMuX2lkVG9DYW52YXNbaWRdO1xuICAgICAgICByZXR1cm4gcmVuZGVySW1hZ2UoeyBjYW52YXMsIGltYWdlTWVzc2FnZSwgcmF3TWFya2VyRGF0YSwgaW1hZ2VNYXJrZXJEYXRhdHlwZXMsIGltYWdlTWFya2VyQXJyYXlEYXRhdHlwZXMgfSk7XG4gICAgICB9XG4gICAgKTtcbiAgfVxufVxuXG5pZiAoZ2xvYmFsLnBvc3RNZXNzYWdlICYmICFnbG9iYWwub25tZXNzYWdlKSB7XG4gIG5ldyBJbWFnZUNhbnZhc1dvcmtlcihuZXcgUnBjKGdsb2JhbCkpO1xufVxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBUUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBOzs7OztBQUNBO0FBSUE7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBYUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBRUE7QUFDQTtBQWxDQTtBQUNBOzs7QUFtQ0E7QUFDQTtBQUNBO0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./node_modules/babel-loader/lib/index.js?cacheDirectory!./packages/webviz-core/src/panels/ImageView/ImageCanvas.worker.js\n");

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var g;\n\n// This works in non-strict mode\ng = (function() {\n\treturn this;\n})();\n\ntry {\n\t// This works if eval is allowed (see CSP)\n\tg = g || new Function(\"return this\")();\n} catch (e) {\n\t// This works if the window reference is available\n\tif (typeof window === \"object\") g = window;\n}\n\n// g can still be undefined, but nothing to do about it...\n// We return undefined, instead of nothing here, so it's\n// easier to handle this case. if(!global) { ...}\n\nmodule.exports = g;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvd2VicGFjay9idWlsZGluL2dsb2JhbC5qcy5qcyIsInNvdXJjZXMiOlsiL2hvbWUvbm9kZS93ZWJ2aXovbm9kZV9tb2R1bGVzL3dlYnBhY2svYnVpbGRpbi9nbG9iYWwuanMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIGc7XG5cbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXG5nID0gKGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcztcbn0pKCk7XG5cbnRyeSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxuXHRnID0gZyB8fCBuZXcgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpO1xufSBjYXRjaCAoZSkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxuXHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIikgZyA9IHdpbmRvdztcbn1cblxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3Ncbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cblxubW9kdWxlLmV4cG9ydHMgPSBnO1xuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./node_modules/webpack/buildin/global.js\n");

/***/ }),

/***/ "./packages/webviz-core/node_modules/lodash/_Hash.js":
/*!***********************************************************!*\
  !*** ./packages/webviz-core/node_modules/lodash/_Hash.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var hashClear = __webpack_require__(/*! ./_hashClear */ \"./packages/webviz-core/node_modules/lodash/_hashClear.js\"),\n    hashDelete = __webpack_require__(/*! ./_hashDelete */ \"./packages/webviz-core/node_modules/lodash/_hashDelete.js\"),\n    hashGet = __webpack_require__(/*! ./_hashGet */ \"./packages/webviz-core/node_modules/lodash/_hashGet.js\"),\n    hashHas = __webpack_require__(/*! ./_hashHas */ \"./packages/webviz-core/node_modules/lodash/_hashHas.js\"),\n    hashSet = __webpack_require__(/*! ./_hashSet */ \"./packages/webviz-core/node_modules/lodash/_hashSet.js\");\n\n/**\n * Creates a hash object.\n *\n * @private\n * @constructor\n * @param {Array} [entries] The key-value pairs to cache.\n */\nfunction Hash(entries) {\n  var index = -1,\n      length = entries == null ? 0 : entries.length;\n\n  this.clear();\n  while (++index < length) {\n    var entry = entries[index];\n    this.set(entry[0], entry[1]);\n  }\n}\n\n// Add methods to `Hash`.\nHash.prototype.clear = hashClear;\nHash.prototype['delete'] = hashDelete;\nHash.prototype.get = hashGet;\nHash.prototype.has = hashHas;\nHash.prototype.set = hashSet;\n\nmodule.exports = Hash;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWNrYWdlcy93ZWJ2aXotY29yZS9ub2RlX21vZHVsZXMvbG9kYXNoL19IYXNoLmpzLmpzIiwic291cmNlcyI6WyIvaG9tZS9ub2RlL3dlYnZpei9wYWNrYWdlcy93ZWJ2aXotY29yZS9ub2RlX21vZHVsZXMvbG9kYXNoL19IYXNoLmpzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBoYXNoQ2xlYXIgPSByZXF1aXJlKCcuL19oYXNoQ2xlYXInKSxcbiAgICBoYXNoRGVsZXRlID0gcmVxdWlyZSgnLi9faGFzaERlbGV0ZScpLFxuICAgIGhhc2hHZXQgPSByZXF1aXJlKCcuL19oYXNoR2V0JyksXG4gICAgaGFzaEhhcyA9IHJlcXVpcmUoJy4vX2hhc2hIYXMnKSxcbiAgICBoYXNoU2V0ID0gcmVxdWlyZSgnLi9faGFzaFNldCcpO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBoYXNoIG9iamVjdC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0FycmF5fSBbZW50cmllc10gVGhlIGtleS12YWx1ZSBwYWlycyB0byBjYWNoZS5cbiAqL1xuZnVuY3Rpb24gSGFzaChlbnRyaWVzKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gZW50cmllcyA9PSBudWxsID8gMCA6IGVudHJpZXMubGVuZ3RoO1xuXG4gIHRoaXMuY2xlYXIoKTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgZW50cnkgPSBlbnRyaWVzW2luZGV4XTtcbiAgICB0aGlzLnNldChlbnRyeVswXSwgZW50cnlbMV0pO1xuICB9XG59XG5cbi8vIEFkZCBtZXRob2RzIHRvIGBIYXNoYC5cbkhhc2gucHJvdG90eXBlLmNsZWFyID0gaGFzaENsZWFyO1xuSGFzaC5wcm90b3R5cGVbJ2RlbGV0ZSddID0gaGFzaERlbGV0ZTtcbkhhc2gucHJvdG90eXBlLmdldCA9IGhhc2hHZXQ7XG5IYXNoLnByb3RvdHlwZS5oYXMgPSBoYXNoSGFzO1xuSGFzaC5wcm90b3R5cGUuc2V0ID0gaGFzaFNldDtcblxubW9kdWxlLmV4cG9ydHMgPSBIYXNoO1xuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./packages/webviz-core/node_modules/lodash/_Hash.js\n");

/***/ }),

/***/ "./packages/webviz-core/node_modules/lodash/_ListCache.js":
/*!****************************************************************!*\
  !*** ./packages/webviz-core/node_modules/lodash/_ListCache.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var listCacheClear = __webpack_require__(/*! ./_listCacheClear */ \"./packages/webviz-core/node_modules/lodash/_listCacheClear.js\"),\n    listCacheDelete = __webpack_require__(/*! ./_listCacheDelete */ \"./packages/webviz-core/node_modules/lodash/_listCacheDelete.js\"),\n    listCacheGet = __webpack_require__(/*! ./_listCacheGet */ \"./packages/webviz-core/node_modules/lodash/_listCacheGet.js\"),\n    listCacheHas = __webpack_require__(/*! ./_listCacheHas */ \"./packages/webviz-core/node_modules/lodash/_listCacheHas.js\"),\n    listCacheSet = __webpack_require__(/*! ./_listCacheSet */ \"./packages/webviz-core/node_modules/lodash/_listCacheSet.js\");\n\n/**\n * Creates an list cache object.\n *\n * @private\n * @constructor\n * @param {Array} [entries] The key-value pairs to cache.\n */\nfunction ListCache(entries) {\n  var index = -1,\n      length = entries == null ? 0 : entries.length;\n\n  this.clear();\n  while (++index < length) {\n    var entry = entries[index];\n    this.set(entry[0], entry[1]);\n  }\n}\n\n// Add methods to `ListCache`.\nListCache.prototype.clear = listCacheClear;\nListCache.prototype['delete'] = listCacheDelete;\nListCache.prototype.get = listCacheGet;\nListCache.prototype.has = listCacheHas;\nListCache.prototype.set = listCacheSet;\n\nmodule.exports = ListCache;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWNrYWdlcy93ZWJ2aXotY29yZS9ub2RlX21vZHVsZXMvbG9kYXNoL19MaXN0Q2FjaGUuanMuanMiLCJzb3VyY2VzIjpbIi9ob21lL25vZGUvd2Vidml6L3BhY2thZ2VzL3dlYnZpei1jb3JlL25vZGVfbW9kdWxlcy9sb2Rhc2gvX0xpc3RDYWNoZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgbGlzdENhY2hlQ2xlYXIgPSByZXF1aXJlKCcuL19saXN0Q2FjaGVDbGVhcicpLFxuICAgIGxpc3RDYWNoZURlbGV0ZSA9IHJlcXVpcmUoJy4vX2xpc3RDYWNoZURlbGV0ZScpLFxuICAgIGxpc3RDYWNoZUdldCA9IHJlcXVpcmUoJy4vX2xpc3RDYWNoZUdldCcpLFxuICAgIGxpc3RDYWNoZUhhcyA9IHJlcXVpcmUoJy4vX2xpc3RDYWNoZUhhcycpLFxuICAgIGxpc3RDYWNoZVNldCA9IHJlcXVpcmUoJy4vX2xpc3RDYWNoZVNldCcpO1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gbGlzdCBjYWNoZSBvYmplY3QuXG4gKlxuICogQHByaXZhdGVcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtBcnJheX0gW2VudHJpZXNdIFRoZSBrZXktdmFsdWUgcGFpcnMgdG8gY2FjaGUuXG4gKi9cbmZ1bmN0aW9uIExpc3RDYWNoZShlbnRyaWVzKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gZW50cmllcyA9PSBudWxsID8gMCA6IGVudHJpZXMubGVuZ3RoO1xuXG4gIHRoaXMuY2xlYXIoKTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgZW50cnkgPSBlbnRyaWVzW2luZGV4XTtcbiAgICB0aGlzLnNldChlbnRyeVswXSwgZW50cnlbMV0pO1xuICB9XG59XG5cbi8vIEFkZCBtZXRob2RzIHRvIGBMaXN0Q2FjaGVgLlxuTGlzdENhY2hlLnByb3RvdHlwZS5jbGVhciA9IGxpc3RDYWNoZUNsZWFyO1xuTGlzdENhY2hlLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBsaXN0Q2FjaGVEZWxldGU7XG5MaXN0Q2FjaGUucHJvdG90eXBlLmdldCA9IGxpc3RDYWNoZUdldDtcbkxpc3RDYWNoZS5wcm90b3R5cGUuaGFzID0gbGlzdENhY2hlSGFzO1xuTGlzdENhY2hlLnByb3RvdHlwZS5zZXQgPSBsaXN0Q2FjaGVTZXQ7XG5cbm1vZHVsZS5leHBvcnRzID0gTGlzdENhY2hlO1xuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./packages/webviz-core/node_modules/lodash/_ListCache.js\n");

/***/ }),

/***/ "./packages/webviz-core/node_modules/lodash/_Map.js":
/*!**********************************************************!*\
  !*** ./packages/webviz-core/node_modules/lodash/_Map.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getNative = __webpack_require__(/*! ./_getNative */ \"./packages/webviz-core/node_modules/lodash/_getNative.js\"),\n    root = __webpack_require__(/*! ./_root */ \"./packages/webviz-core/node_modules/lodash/_root.js\");\n\n/* Built-in method references that are verified to be native. */\nvar Map = getNative(root, 'Map');\n\nmodule.exports = Map;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWNrYWdlcy93ZWJ2aXotY29yZS9ub2RlX21vZHVsZXMvbG9kYXNoL19NYXAuanMuanMiLCJzb3VyY2VzIjpbIi9ob21lL25vZGUvd2Vidml6L3BhY2thZ2VzL3dlYnZpei1jb3JlL25vZGVfbW9kdWxlcy9sb2Rhc2gvX01hcC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgZ2V0TmF0aXZlID0gcmVxdWlyZSgnLi9fZ2V0TmF0aXZlJyksXG4gICAgcm9vdCA9IHJlcXVpcmUoJy4vX3Jvb3QnKTtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgdGhhdCBhcmUgdmVyaWZpZWQgdG8gYmUgbmF0aXZlLiAqL1xudmFyIE1hcCA9IGdldE5hdGl2ZShyb290LCAnTWFwJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gTWFwO1xuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./packages/webviz-core/node_modules/lodash/_Map.js\n");

/***/ }),

/***/ "./packages/webviz-core/node_modules/lodash/_MapCache.js":
/*!***************************************************************!*\
  !*** ./packages/webviz-core/node_modules/lodash/_MapCache.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var mapCacheClear = __webpack_require__(/*! ./_mapCacheClear */ \"./packages/webviz-core/node_modules/lodash/_mapCacheClear.js\"),\n    mapCacheDelete = __webpack_require__(/*! ./_mapCacheDelete */ \"./packages/webviz-core/node_modules/lodash/_mapCacheDelete.js\"),\n    mapCacheGet = __webpack_require__(/*! ./_mapCacheGet */ \"./packages/webviz-core/node_modules/lodash/_mapCacheGet.js\"),\n    mapCacheHas = __webpack_require__(/*! ./_mapCacheHas */ \"./packages/webviz-core/node_modules/lodash/_mapCacheHas.js\"),\n    mapCacheSet = __webpack_require__(/*! ./_mapCacheSet */ \"./packages/webviz-core/node_modules/lodash/_mapCacheSet.js\");\n\n/**\n * Creates a map cache object to store key-value pairs.\n *\n * @private\n * @constructor\n * @param {Array} [entries] The key-value pairs to cache.\n */\nfunction MapCache(entries) {\n  var index = -1,\n      length = entries == null ? 0 : entries.length;\n\n  this.clear();\n  while (++index < length) {\n    var entry = entries[index];\n    this.set(entry[0], entry[1]);\n  }\n}\n\n// Add methods to `MapCache`.\nMapCache.prototype.clear = mapCacheClear;\nMapCache.prototype['delete'] = mapCacheDelete;\nMapCache.prototype.get = mapCacheGet;\nMapCache.prototype.has = mapCacheHas;\nMapCache.prototype.set = mapCacheSet;\n\nmodule.exports = MapCache;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWNrYWdlcy93ZWJ2aXotY29yZS9ub2RlX21vZHVsZXMvbG9kYXNoL19NYXBDYWNoZS5qcy5qcyIsInNvdXJjZXMiOlsiL2hvbWUvbm9kZS93ZWJ2aXovcGFja2FnZXMvd2Vidml6LWNvcmUvbm9kZV9tb2R1bGVzL2xvZGFzaC9fTWFwQ2FjaGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIG1hcENhY2hlQ2xlYXIgPSByZXF1aXJlKCcuL19tYXBDYWNoZUNsZWFyJyksXG4gICAgbWFwQ2FjaGVEZWxldGUgPSByZXF1aXJlKCcuL19tYXBDYWNoZURlbGV0ZScpLFxuICAgIG1hcENhY2hlR2V0ID0gcmVxdWlyZSgnLi9fbWFwQ2FjaGVHZXQnKSxcbiAgICBtYXBDYWNoZUhhcyA9IHJlcXVpcmUoJy4vX21hcENhY2hlSGFzJyksXG4gICAgbWFwQ2FjaGVTZXQgPSByZXF1aXJlKCcuL19tYXBDYWNoZVNldCcpO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBtYXAgY2FjaGUgb2JqZWN0IHRvIHN0b3JlIGtleS12YWx1ZSBwYWlycy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0FycmF5fSBbZW50cmllc10gVGhlIGtleS12YWx1ZSBwYWlycyB0byBjYWNoZS5cbiAqL1xuZnVuY3Rpb24gTWFwQ2FjaGUoZW50cmllcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGVudHJpZXMgPT0gbnVsbCA/IDAgOiBlbnRyaWVzLmxlbmd0aDtcblxuICB0aGlzLmNsZWFyKCk7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGVudHJ5ID0gZW50cmllc1tpbmRleF07XG4gICAgdGhpcy5zZXQoZW50cnlbMF0sIGVudHJ5WzFdKTtcbiAgfVxufVxuXG4vLyBBZGQgbWV0aG9kcyB0byBgTWFwQ2FjaGVgLlxuTWFwQ2FjaGUucHJvdG90eXBlLmNsZWFyID0gbWFwQ2FjaGVDbGVhcjtcbk1hcENhY2hlLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBtYXBDYWNoZURlbGV0ZTtcbk1hcENhY2hlLnByb3RvdHlwZS5nZXQgPSBtYXBDYWNoZUdldDtcbk1hcENhY2hlLnByb3RvdHlwZS5oYXMgPSBtYXBDYWNoZUhhcztcbk1hcENhY2hlLnByb3RvdHlwZS5zZXQgPSBtYXBDYWNoZVNldDtcblxubW9kdWxlLmV4cG9ydHMgPSBNYXBDYWNoZTtcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./packages/webviz-core/node_modules/lodash/_MapCache.js\n");

/***/ }),

/***/ "./packages/webviz-core/node_modules/lodash/_Symbol.js":
/*!*************************************************************!*\
  !*** ./packages/webviz-core/node_modules/lodash/_Symbol.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var root = __webpack_require__(/*! ./_root */ \"./packages/webviz-core/node_modules/lodash/_root.js\");\n\n/** Built-in value references. */\nvar Symbol = root.Symbol;\n\nmodule.exports = Symbol;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWNrYWdlcy93ZWJ2aXotY29yZS9ub2RlX21vZHVsZXMvbG9kYXNoL19TeW1ib2wuanMuanMiLCJzb3VyY2VzIjpbIi9ob21lL25vZGUvd2Vidml6L3BhY2thZ2VzL3dlYnZpei1jb3JlL25vZGVfbW9kdWxlcy9sb2Rhc2gvX1N5bWJvbC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgcm9vdCA9IHJlcXVpcmUoJy4vX3Jvb3QnKTtcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgU3ltYm9sID0gcm9vdC5TeW1ib2w7XG5cbm1vZHVsZS5leHBvcnRzID0gU3ltYm9sO1xuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./packages/webviz-core/node_modules/lodash/_Symbol.js\n");

/***/ }),

/***/ "./packages/webviz-core/node_modules/lodash/_assocIndexOf.js":
/*!*******************************************************************!*\
  !*** ./packages/webviz-core/node_modules/lodash/_assocIndexOf.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var eq = __webpack_require__(/*! ./eq */ \"./packages/webviz-core/node_modules/lodash/eq.js\");\n\n/**\n * Gets the index at which the `key` is found in `array` of key-value pairs.\n *\n * @private\n * @param {Array} array The array to inspect.\n * @param {*} key The key to search for.\n * @returns {number} Returns the index of the matched value, else `-1`.\n */\nfunction assocIndexOf(array, key) {\n  var length = array.length;\n  while (length--) {\n    if (eq(array[length][0], key)) {\n      return length;\n    }\n  }\n  return -1;\n}\n\nmodule.exports = assocIndexOf;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWNrYWdlcy93ZWJ2aXotY29yZS9ub2RlX21vZHVsZXMvbG9kYXNoL19hc3NvY0luZGV4T2YuanMuanMiLCJzb3VyY2VzIjpbIi9ob21lL25vZGUvd2Vidml6L3BhY2thZ2VzL3dlYnZpei1jb3JlL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Fzc29jSW5kZXhPZi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgZXEgPSByZXF1aXJlKCcuL2VxJyk7XG5cbi8qKlxuICogR2V0cyB0aGUgaW5kZXggYXQgd2hpY2ggdGhlIGBrZXlgIGlzIGZvdW5kIGluIGBhcnJheWAgb2Yga2V5LXZhbHVlIHBhaXJzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7Kn0ga2V5IFRoZSBrZXkgdG8gc2VhcmNoIGZvci5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIGluZGV4IG9mIHRoZSBtYXRjaGVkIHZhbHVlLCBlbHNlIGAtMWAuXG4gKi9cbmZ1bmN0aW9uIGFzc29jSW5kZXhPZihhcnJheSwga2V5KSB7XG4gIHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG4gIHdoaWxlIChsZW5ndGgtLSkge1xuICAgIGlmIChlcShhcnJheVtsZW5ndGhdWzBdLCBrZXkpKSB7XG4gICAgICByZXR1cm4gbGVuZ3RoO1xuICAgIH1cbiAgfVxuICByZXR1cm4gLTE7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYXNzb2NJbmRleE9mO1xuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./packages/webviz-core/node_modules/lodash/_assocIndexOf.js\n");

/***/ }),

/***/ "./packages/webviz-core/node_modules/lodash/_baseClamp.js":
/*!****************************************************************!*\
  !*** ./packages/webviz-core/node_modules/lodash/_baseClamp.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * The base implementation of `_.clamp` which doesn't coerce arguments.\n *\n * @private\n * @param {number} number The number to clamp.\n * @param {number} [lower] The lower bound.\n * @param {number} upper The upper bound.\n * @returns {number} Returns the clamped number.\n */\nfunction baseClamp(number, lower, upper) {\n  if (number === number) {\n    if (upper !== undefined) {\n      number = number <= upper ? number : upper;\n    }\n    if (lower !== undefined) {\n      number = number >= lower ? number : lower;\n    }\n  }\n  return number;\n}\n\nmodule.exports = baseClamp;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWNrYWdlcy93ZWJ2aXotY29yZS9ub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlQ2xhbXAuanMuanMiLCJzb3VyY2VzIjpbIi9ob21lL25vZGUvd2Vidml6L3BhY2thZ2VzL3dlYnZpei1jb3JlL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VDbGFtcC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmNsYW1wYCB3aGljaCBkb2Vzbid0IGNvZXJjZSBhcmd1bWVudHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7bnVtYmVyfSBudW1iZXIgVGhlIG51bWJlciB0byBjbGFtcC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbbG93ZXJdIFRoZSBsb3dlciBib3VuZC5cbiAqIEBwYXJhbSB7bnVtYmVyfSB1cHBlciBUaGUgdXBwZXIgYm91bmQuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBjbGFtcGVkIG51bWJlci5cbiAqL1xuZnVuY3Rpb24gYmFzZUNsYW1wKG51bWJlciwgbG93ZXIsIHVwcGVyKSB7XG4gIGlmIChudW1iZXIgPT09IG51bWJlcikge1xuICAgIGlmICh1cHBlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBudW1iZXIgPSBudW1iZXIgPD0gdXBwZXIgPyBudW1iZXIgOiB1cHBlcjtcbiAgICB9XG4gICAgaWYgKGxvd2VyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIG51bWJlciA9IG51bWJlciA+PSBsb3dlciA/IG51bWJlciA6IGxvd2VyO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbnVtYmVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VDbGFtcDtcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./packages/webviz-core/node_modules/lodash/_baseClamp.js\n");

/***/ }),

/***/ "./packages/webviz-core/node_modules/lodash/_baseGetTag.js":
/*!*****************************************************************!*\
  !*** ./packages/webviz-core/node_modules/lodash/_baseGetTag.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Symbol = __webpack_require__(/*! ./_Symbol */ \"./packages/webviz-core/node_modules/lodash/_Symbol.js\"),\n    getRawTag = __webpack_require__(/*! ./_getRawTag */ \"./packages/webviz-core/node_modules/lodash/_getRawTag.js\"),\n    objectToString = __webpack_require__(/*! ./_objectToString */ \"./packages/webviz-core/node_modules/lodash/_objectToString.js\");\n\n/** `Object#toString` result references. */\nvar nullTag = '[object Null]',\n    undefinedTag = '[object Undefined]';\n\n/** Built-in value references. */\nvar symToStringTag = Symbol ? Symbol.toStringTag : undefined;\n\n/**\n * The base implementation of `getTag` without fallbacks for buggy environments.\n *\n * @private\n * @param {*} value The value to query.\n * @returns {string} Returns the `toStringTag`.\n */\nfunction baseGetTag(value) {\n  if (value == null) {\n    return value === undefined ? undefinedTag : nullTag;\n  }\n  return (symToStringTag && symToStringTag in Object(value))\n    ? getRawTag(value)\n    : objectToString(value);\n}\n\nmodule.exports = baseGetTag;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWNrYWdlcy93ZWJ2aXotY29yZS9ub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlR2V0VGFnLmpzLmpzIiwic291cmNlcyI6WyIvaG9tZS9ub2RlL3dlYnZpei9wYWNrYWdlcy93ZWJ2aXotY29yZS9ub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlR2V0VGFnLmpzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBTeW1ib2wgPSByZXF1aXJlKCcuL19TeW1ib2wnKSxcbiAgICBnZXRSYXdUYWcgPSByZXF1aXJlKCcuL19nZXRSYXdUYWcnKSxcbiAgICBvYmplY3RUb1N0cmluZyA9IHJlcXVpcmUoJy4vX29iamVjdFRvU3RyaW5nJyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBudWxsVGFnID0gJ1tvYmplY3QgTnVsbF0nLFxuICAgIHVuZGVmaW5lZFRhZyA9ICdbb2JqZWN0IFVuZGVmaW5lZF0nO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBzeW1Ub1N0cmluZ1RhZyA9IFN5bWJvbCA/IFN5bWJvbC50b1N0cmluZ1RhZyA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgZ2V0VGFnYCB3aXRob3V0IGZhbGxiYWNrcyBmb3IgYnVnZ3kgZW52aXJvbm1lbnRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGB0b1N0cmluZ1RhZ2AuXG4gKi9cbmZ1bmN0aW9uIGJhc2VHZXRUYWcodmFsdWUpIHtcbiAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZFRhZyA6IG51bGxUYWc7XG4gIH1cbiAgcmV0dXJuIChzeW1Ub1N0cmluZ1RhZyAmJiBzeW1Ub1N0cmluZ1RhZyBpbiBPYmplY3QodmFsdWUpKVxuICAgID8gZ2V0UmF3VGFnKHZhbHVlKVxuICAgIDogb2JqZWN0VG9TdHJpbmcodmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VHZXRUYWc7XG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./packages/webviz-core/node_modules/lodash/_baseGetTag.js\n");

/***/ }),

/***/ "./packages/webviz-core/node_modules/lodash/_baseIsNative.js":
/*!*******************************************************************!*\
  !*** ./packages/webviz-core/node_modules/lodash/_baseIsNative.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isFunction = __webpack_require__(/*! ./isFunction */ \"./packages/webviz-core/node_modules/lodash/isFunction.js\"),\n    isMasked = __webpack_require__(/*! ./_isMasked */ \"./packages/webviz-core/node_modules/lodash/_isMasked.js\"),\n    isObject = __webpack_require__(/*! ./isObject */ \"./packages/webviz-core/node_modules/lodash/isObject.js\"),\n    toSource = __webpack_require__(/*! ./_toSource */ \"./packages/webviz-core/node_modules/lodash/_toSource.js\");\n\n/**\n * Used to match `RegExp`\n * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).\n */\nvar reRegExpChar = /[\\\\^$.*+?()[\\]{}|]/g;\n\n/** Used to detect host constructors (Safari). */\nvar reIsHostCtor = /^\\[object .+?Constructor\\]$/;\n\n/** Used for built-in method references. */\nvar funcProto = Function.prototype,\n    objectProto = Object.prototype;\n\n/** Used to resolve the decompiled source of functions. */\nvar funcToString = funcProto.toString;\n\n/** Used to check objects for own properties. */\nvar hasOwnProperty = objectProto.hasOwnProperty;\n\n/** Used to detect if a method is native. */\nvar reIsNative = RegExp('^' +\n  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\\\$&')\n  .replace(/hasOwnProperty|(function).*?(?=\\\\\\()| for .+?(?=\\\\\\])/g, '$1.*?') + '$'\n);\n\n/**\n * The base implementation of `_.isNative` without bad shim checks.\n *\n * @private\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is a native function,\n *  else `false`.\n */\nfunction baseIsNative(value) {\n  if (!isObject(value) || isMasked(value)) {\n    return false;\n  }\n  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;\n  return pattern.test(toSource(value));\n}\n\nmodule.exports = baseIsNative;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWNrYWdlcy93ZWJ2aXotY29yZS9ub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlSXNOYXRpdmUuanMuanMiLCJzb3VyY2VzIjpbIi9ob21lL25vZGUvd2Vidml6L3BhY2thZ2VzL3dlYnZpei1jb3JlL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VJc05hdGl2ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgaXNGdW5jdGlvbiA9IHJlcXVpcmUoJy4vaXNGdW5jdGlvbicpLFxuICAgIGlzTWFza2VkID0gcmVxdWlyZSgnLi9faXNNYXNrZWQnKSxcbiAgICBpc09iamVjdCA9IHJlcXVpcmUoJy4vaXNPYmplY3QnKSxcbiAgICB0b1NvdXJjZSA9IHJlcXVpcmUoJy4vX3RvU291cmNlJyk7XG5cbi8qKlxuICogVXNlZCB0byBtYXRjaCBgUmVnRXhwYFxuICogW3N5bnRheCBjaGFyYWN0ZXJzXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1wYXR0ZXJucykuXG4gKi9cbnZhciByZVJlZ0V4cENoYXIgPSAvW1xcXFxeJC4qKz8oKVtcXF17fXxdL2c7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBob3N0IGNvbnN0cnVjdG9ycyAoU2FmYXJpKS4gKi9cbnZhciByZUlzSG9zdEN0b3IgPSAvXlxcW29iamVjdCAuKz9Db25zdHJ1Y3RvclxcXSQvO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgZnVuY1Byb3RvID0gRnVuY3Rpb24ucHJvdG90eXBlLFxuICAgIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgZGVjb21waWxlZCBzb3VyY2Ugb2YgZnVuY3Rpb25zLiAqL1xudmFyIGZ1bmNUb1N0cmluZyA9IGZ1bmNQcm90by50b1N0cmluZztcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGlmIGEgbWV0aG9kIGlzIG5hdGl2ZS4gKi9cbnZhciByZUlzTmF0aXZlID0gUmVnRXhwKCdeJyArXG4gIGZ1bmNUb1N0cmluZy5jYWxsKGhhc093blByb3BlcnR5KS5yZXBsYWNlKHJlUmVnRXhwQ2hhciwgJ1xcXFwkJicpXG4gIC5yZXBsYWNlKC9oYXNPd25Qcm9wZXJ0eXwoZnVuY3Rpb24pLio/KD89XFxcXFxcKCl8IGZvciAuKz8oPz1cXFxcXFxdKS9nLCAnJDEuKj8nKSArICckJ1xuKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pc05hdGl2ZWAgd2l0aG91dCBiYWQgc2hpbSBjaGVja3MuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBuYXRpdmUgZnVuY3Rpb24sXG4gKiAgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSXNOYXRpdmUodmFsdWUpIHtcbiAgaWYgKCFpc09iamVjdCh2YWx1ZSkgfHwgaXNNYXNrZWQodmFsdWUpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciBwYXR0ZXJuID0gaXNGdW5jdGlvbih2YWx1ZSkgPyByZUlzTmF0aXZlIDogcmVJc0hvc3RDdG9yO1xuICByZXR1cm4gcGF0dGVybi50ZXN0KHRvU291cmNlKHZhbHVlKSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUlzTmF0aXZlO1xuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./packages/webviz-core/node_modules/lodash/_baseIsNative.js\n");

/***/ }),

/***/ "./packages/webviz-core/node_modules/lodash/_coreJsData.js":
/*!*****************************************************************!*\
  !*** ./packages/webviz-core/node_modules/lodash/_coreJsData.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var root = __webpack_require__(/*! ./_root */ \"./packages/webviz-core/node_modules/lodash/_root.js\");\n\n/** Used to detect overreaching core-js shims. */\nvar coreJsData = root['__core-js_shared__'];\n\nmodule.exports = coreJsData;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWNrYWdlcy93ZWJ2aXotY29yZS9ub2RlX21vZHVsZXMvbG9kYXNoL19jb3JlSnNEYXRhLmpzLmpzIiwic291cmNlcyI6WyIvaG9tZS9ub2RlL3dlYnZpei9wYWNrYWdlcy93ZWJ2aXotY29yZS9ub2RlX21vZHVsZXMvbG9kYXNoL19jb3JlSnNEYXRhLmpzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciByb290ID0gcmVxdWlyZSgnLi9fcm9vdCcpO1xuXG4vKiogVXNlZCB0byBkZXRlY3Qgb3ZlcnJlYWNoaW5nIGNvcmUtanMgc2hpbXMuICovXG52YXIgY29yZUpzRGF0YSA9IHJvb3RbJ19fY29yZS1qc19zaGFyZWRfXyddO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNvcmVKc0RhdGE7XG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./packages/webviz-core/node_modules/lodash/_coreJsData.js\n");

/***/ }),

/***/ "./packages/webviz-core/node_modules/lodash/_freeGlobal.js":
/*!*****************************************************************!*\
  !*** ./packages/webviz-core/node_modules/lodash/_freeGlobal.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */\nvar freeGlobal = typeof global == 'object' && global && global.Object === Object && global;\n\nmodule.exports = freeGlobal;\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/global.js */ \"./node_modules/webpack/buildin/global.js\")))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWNrYWdlcy93ZWJ2aXotY29yZS9ub2RlX21vZHVsZXMvbG9kYXNoL19mcmVlR2xvYmFsLmpzLmpzIiwic291cmNlcyI6WyIvaG9tZS9ub2RlL3dlYnZpei9wYWNrYWdlcy93ZWJ2aXotY29yZS9ub2RlX21vZHVsZXMvbG9kYXNoL19mcmVlR2xvYmFsLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZ2xvYmFsYCBmcm9tIE5vZGUuanMuICovXG52YXIgZnJlZUdsb2JhbCA9IHR5cGVvZiBnbG9iYWwgPT0gJ29iamVjdCcgJiYgZ2xvYmFsICYmIGdsb2JhbC5PYmplY3QgPT09IE9iamVjdCAmJiBnbG9iYWw7XG5cbm1vZHVsZS5leHBvcnRzID0gZnJlZUdsb2JhbDtcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7O0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./packages/webviz-core/node_modules/lodash/_freeGlobal.js\n");

/***/ }),

/***/ "./packages/webviz-core/node_modules/lodash/_getMapData.js":
/*!*****************************************************************!*\
  !*** ./packages/webviz-core/node_modules/lodash/_getMapData.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isKeyable = __webpack_require__(/*! ./_isKeyable */ \"./packages/webviz-core/node_modules/lodash/_isKeyable.js\");\n\n/**\n * Gets the data for `map`.\n *\n * @private\n * @param {Object} map The map to query.\n * @param {string} key The reference key.\n * @returns {*} Returns the map data.\n */\nfunction getMapData(map, key) {\n  var data = map.__data__;\n  return isKeyable(key)\n    ? data[typeof key == 'string' ? 'string' : 'hash']\n    : data.map;\n}\n\nmodule.exports = getMapData;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWNrYWdlcy93ZWJ2aXotY29yZS9ub2RlX21vZHVsZXMvbG9kYXNoL19nZXRNYXBEYXRhLmpzLmpzIiwic291cmNlcyI6WyIvaG9tZS9ub2RlL3dlYnZpei9wYWNrYWdlcy93ZWJ2aXotY29yZS9ub2RlX21vZHVsZXMvbG9kYXNoL19nZXRNYXBEYXRhLmpzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBpc0tleWFibGUgPSByZXF1aXJlKCcuL19pc0tleWFibGUnKTtcblxuLyoqXG4gKiBHZXRzIHRoZSBkYXRhIGZvciBgbWFwYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG1hcCBUaGUgbWFwIHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUgcmVmZXJlbmNlIGtleS5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBtYXAgZGF0YS5cbiAqL1xuZnVuY3Rpb24gZ2V0TWFwRGF0YShtYXAsIGtleSkge1xuICB2YXIgZGF0YSA9IG1hcC5fX2RhdGFfXztcbiAgcmV0dXJuIGlzS2V5YWJsZShrZXkpXG4gICAgPyBkYXRhW3R5cGVvZiBrZXkgPT0gJ3N0cmluZycgPyAnc3RyaW5nJyA6ICdoYXNoJ11cbiAgICA6IGRhdGEubWFwO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldE1hcERhdGE7XG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./packages/webviz-core/node_modules/lodash/_getMapData.js\n");

/***/ }),

/***/ "./packages/webviz-core/node_modules/lodash/_getNative.js":
/*!****************************************************************!*\
  !*** ./packages/webviz-core/node_modules/lodash/_getNative.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseIsNative = __webpack_require__(/*! ./_baseIsNative */ \"./packages/webviz-core/node_modules/lodash/_baseIsNative.js\"),\n    getValue = __webpack_require__(/*! ./_getValue */ \"./packages/webviz-core/node_modules/lodash/_getValue.js\");\n\n/**\n * Gets the native function at `key` of `object`.\n *\n * @private\n * @param {Object} object The object to query.\n * @param {string} key The key of the method to get.\n * @returns {*} Returns the function if it's native, else `undefined`.\n */\nfunction getNative(object, key) {\n  var value = getValue(object, key);\n  return baseIsNative(value) ? value : undefined;\n}\n\nmodule.exports = getNative;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWNrYWdlcy93ZWJ2aXotY29yZS9ub2RlX21vZHVsZXMvbG9kYXNoL19nZXROYXRpdmUuanMuanMiLCJzb3VyY2VzIjpbIi9ob21lL25vZGUvd2Vidml6L3BhY2thZ2VzL3dlYnZpei1jb3JlL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2dldE5hdGl2ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgYmFzZUlzTmF0aXZlID0gcmVxdWlyZSgnLi9fYmFzZUlzTmF0aXZlJyksXG4gICAgZ2V0VmFsdWUgPSByZXF1aXJlKCcuL19nZXRWYWx1ZScpO1xuXG4vKipcbiAqIEdldHMgdGhlIG5hdGl2ZSBmdW5jdGlvbiBhdCBga2V5YCBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBtZXRob2QgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGZ1bmN0aW9uIGlmIGl0J3MgbmF0aXZlLCBlbHNlIGB1bmRlZmluZWRgLlxuICovXG5mdW5jdGlvbiBnZXROYXRpdmUob2JqZWN0LCBrZXkpIHtcbiAgdmFyIHZhbHVlID0gZ2V0VmFsdWUob2JqZWN0LCBrZXkpO1xuICByZXR1cm4gYmFzZUlzTmF0aXZlKHZhbHVlKSA/IHZhbHVlIDogdW5kZWZpbmVkO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldE5hdGl2ZTtcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./packages/webviz-core/node_modules/lodash/_getNative.js\n");

/***/ }),

/***/ "./packages/webviz-core/node_modules/lodash/_getRawTag.js":
/*!****************************************************************!*\
  !*** ./packages/webviz-core/node_modules/lodash/_getRawTag.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Symbol = __webpack_require__(/*! ./_Symbol */ \"./packages/webviz-core/node_modules/lodash/_Symbol.js\");\n\n/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/** Used to check objects for own properties. */\nvar hasOwnProperty = objectProto.hasOwnProperty;\n\n/**\n * Used to resolve the\n * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)\n * of values.\n */\nvar nativeObjectToString = objectProto.toString;\n\n/** Built-in value references. */\nvar symToStringTag = Symbol ? Symbol.toStringTag : undefined;\n\n/**\n * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.\n *\n * @private\n * @param {*} value The value to query.\n * @returns {string} Returns the raw `toStringTag`.\n */\nfunction getRawTag(value) {\n  var isOwn = hasOwnProperty.call(value, symToStringTag),\n      tag = value[symToStringTag];\n\n  try {\n    value[symToStringTag] = undefined;\n    var unmasked = true;\n  } catch (e) {}\n\n  var result = nativeObjectToString.call(value);\n  if (unmasked) {\n    if (isOwn) {\n      value[symToStringTag] = tag;\n    } else {\n      delete value[symToStringTag];\n    }\n  }\n  return result;\n}\n\nmodule.exports = getRawTag;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWNrYWdlcy93ZWJ2aXotY29yZS9ub2RlX21vZHVsZXMvbG9kYXNoL19nZXRSYXdUYWcuanMuanMiLCJzb3VyY2VzIjpbIi9ob21lL25vZGUvd2Vidml6L3BhY2thZ2VzL3dlYnZpei1jb3JlL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2dldFJhd1RhZy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgU3ltYm9sID0gcmVxdWlyZSgnLi9fU3ltYm9sJyk7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBuYXRpdmVPYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBzeW1Ub1N0cmluZ1RhZyA9IFN5bWJvbCA/IFN5bWJvbC50b1N0cmluZ1RhZyA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VHZXRUYWdgIHdoaWNoIGlnbm9yZXMgYFN5bWJvbC50b1N0cmluZ1RhZ2AgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHJhdyBgdG9TdHJpbmdUYWdgLlxuICovXG5mdW5jdGlvbiBnZXRSYXdUYWcodmFsdWUpIHtcbiAgdmFyIGlzT3duID0gaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwgc3ltVG9TdHJpbmdUYWcpLFxuICAgICAgdGFnID0gdmFsdWVbc3ltVG9TdHJpbmdUYWddO1xuXG4gIHRyeSB7XG4gICAgdmFsdWVbc3ltVG9TdHJpbmdUYWddID0gdW5kZWZpbmVkO1xuICAgIHZhciB1bm1hc2tlZCA9IHRydWU7XG4gIH0gY2F0Y2ggKGUpIHt9XG5cbiAgdmFyIHJlc3VsdCA9IG5hdGl2ZU9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpO1xuICBpZiAodW5tYXNrZWQpIHtcbiAgICBpZiAoaXNPd24pIHtcbiAgICAgIHZhbHVlW3N5bVRvU3RyaW5nVGFnXSA9IHRhZztcbiAgICB9IGVsc2Uge1xuICAgICAgZGVsZXRlIHZhbHVlW3N5bVRvU3RyaW5nVGFnXTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRSYXdUYWc7XG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./packages/webviz-core/node_modules/lodash/_getRawTag.js\n");

/***/ }),

/***/ "./packages/webviz-core/node_modules/lodash/_getValue.js":
/*!***************************************************************!*\
  !*** ./packages/webviz-core/node_modules/lodash/_getValue.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Gets the value at `key` of `object`.\n *\n * @private\n * @param {Object} [object] The object to query.\n * @param {string} key The key of the property to get.\n * @returns {*} Returns the property value.\n */\nfunction getValue(object, key) {\n  return object == null ? undefined : object[key];\n}\n\nmodule.exports = getValue;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWNrYWdlcy93ZWJ2aXotY29yZS9ub2RlX21vZHVsZXMvbG9kYXNoL19nZXRWYWx1ZS5qcy5qcyIsInNvdXJjZXMiOlsiL2hvbWUvbm9kZS93ZWJ2aXovcGFja2FnZXMvd2Vidml6LWNvcmUvbm9kZV9tb2R1bGVzL2xvZGFzaC9fZ2V0VmFsdWUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBHZXRzIHRoZSB2YWx1ZSBhdCBga2V5YCBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IFtvYmplY3RdIFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBwcm9wZXJ0eSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gZ2V0VmFsdWUob2JqZWN0LCBrZXkpIHtcbiAgcmV0dXJuIG9iamVjdCA9PSBudWxsID8gdW5kZWZpbmVkIDogb2JqZWN0W2tleV07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0VmFsdWU7XG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./packages/webviz-core/node_modules/lodash/_getValue.js\n");

/***/ }),

/***/ "./packages/webviz-core/node_modules/lodash/_hashClear.js":
/*!****************************************************************!*\
  !*** ./packages/webviz-core/node_modules/lodash/_hashClear.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ \"./packages/webviz-core/node_modules/lodash/_nativeCreate.js\");\n\n/**\n * Removes all key-value entries from the hash.\n *\n * @private\n * @name clear\n * @memberOf Hash\n */\nfunction hashClear() {\n  this.__data__ = nativeCreate ? nativeCreate(null) : {};\n  this.size = 0;\n}\n\nmodule.exports = hashClear;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWNrYWdlcy93ZWJ2aXotY29yZS9ub2RlX21vZHVsZXMvbG9kYXNoL19oYXNoQ2xlYXIuanMuanMiLCJzb3VyY2VzIjpbIi9ob21lL25vZGUvd2Vidml6L3BhY2thZ2VzL3dlYnZpei1jb3JlL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2hhc2hDbGVhci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgbmF0aXZlQ3JlYXRlID0gcmVxdWlyZSgnLi9fbmF0aXZlQ3JlYXRlJyk7XG5cbi8qKlxuICogUmVtb3ZlcyBhbGwga2V5LXZhbHVlIGVudHJpZXMgZnJvbSB0aGUgaGFzaC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgY2xlYXJcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKi9cbmZ1bmN0aW9uIGhhc2hDbGVhcigpIHtcbiAgdGhpcy5fX2RhdGFfXyA9IG5hdGl2ZUNyZWF0ZSA/IG5hdGl2ZUNyZWF0ZShudWxsKSA6IHt9O1xuICB0aGlzLnNpemUgPSAwO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGhhc2hDbGVhcjtcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./packages/webviz-core/node_modules/lodash/_hashClear.js\n");

/***/ }),

/***/ "./packages/webviz-core/node_modules/lodash/_hashDelete.js":
/*!*****************************************************************!*\
  !*** ./packages/webviz-core/node_modules/lodash/_hashDelete.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Removes `key` and its value from the hash.\n *\n * @private\n * @name delete\n * @memberOf Hash\n * @param {Object} hash The hash to modify.\n * @param {string} key The key of the value to remove.\n * @returns {boolean} Returns `true` if the entry was removed, else `false`.\n */\nfunction hashDelete(key) {\n  var result = this.has(key) && delete this.__data__[key];\n  this.size -= result ? 1 : 0;\n  return result;\n}\n\nmodule.exports = hashDelete;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWNrYWdlcy93ZWJ2aXotY29yZS9ub2RlX21vZHVsZXMvbG9kYXNoL19oYXNoRGVsZXRlLmpzLmpzIiwic291cmNlcyI6WyIvaG9tZS9ub2RlL3dlYnZpei9wYWNrYWdlcy93ZWJ2aXotY29yZS9ub2RlX21vZHVsZXMvbG9kYXNoL19oYXNoRGVsZXRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogUmVtb3ZlcyBga2V5YCBhbmQgaXRzIHZhbHVlIGZyb20gdGhlIGhhc2guXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGRlbGV0ZVxuICogQG1lbWJlck9mIEhhc2hcbiAqIEBwYXJhbSB7T2JqZWN0fSBoYXNoIFRoZSBoYXNoIHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gcmVtb3ZlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBlbnRyeSB3YXMgcmVtb3ZlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBoYXNoRGVsZXRlKGtleSkge1xuICB2YXIgcmVzdWx0ID0gdGhpcy5oYXMoa2V5KSAmJiBkZWxldGUgdGhpcy5fX2RhdGFfX1trZXldO1xuICB0aGlzLnNpemUgLT0gcmVzdWx0ID8gMSA6IDA7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaGFzaERlbGV0ZTtcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./packages/webviz-core/node_modules/lodash/_hashDelete.js\n");

/***/ }),

/***/ "./packages/webviz-core/node_modules/lodash/_hashGet.js":
/*!**************************************************************!*\
  !*** ./packages/webviz-core/node_modules/lodash/_hashGet.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ \"./packages/webviz-core/node_modules/lodash/_nativeCreate.js\");\n\n/** Used to stand-in for `undefined` hash values. */\nvar HASH_UNDEFINED = '__lodash_hash_undefined__';\n\n/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/** Used to check objects for own properties. */\nvar hasOwnProperty = objectProto.hasOwnProperty;\n\n/**\n * Gets the hash value for `key`.\n *\n * @private\n * @name get\n * @memberOf Hash\n * @param {string} key The key of the value to get.\n * @returns {*} Returns the entry value.\n */\nfunction hashGet(key) {\n  var data = this.__data__;\n  if (nativeCreate) {\n    var result = data[key];\n    return result === HASH_UNDEFINED ? undefined : result;\n  }\n  return hasOwnProperty.call(data, key) ? data[key] : undefined;\n}\n\nmodule.exports = hashGet;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWNrYWdlcy93ZWJ2aXotY29yZS9ub2RlX21vZHVsZXMvbG9kYXNoL19oYXNoR2V0LmpzLmpzIiwic291cmNlcyI6WyIvaG9tZS9ub2RlL3dlYnZpei9wYWNrYWdlcy93ZWJ2aXotY29yZS9ub2RlX21vZHVsZXMvbG9kYXNoL19oYXNoR2V0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBuYXRpdmVDcmVhdGUgPSByZXF1aXJlKCcuL19uYXRpdmVDcmVhdGUnKTtcblxuLyoqIFVzZWQgdG8gc3RhbmQtaW4gZm9yIGB1bmRlZmluZWRgIGhhc2ggdmFsdWVzLiAqL1xudmFyIEhBU0hfVU5ERUZJTkVEID0gJ19fbG9kYXNoX2hhc2hfdW5kZWZpbmVkX18nO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIEdldHMgdGhlIGhhc2ggdmFsdWUgZm9yIGBrZXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBnZXRcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBlbnRyeSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gaGFzaEdldChrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fO1xuICBpZiAobmF0aXZlQ3JlYXRlKSB7XG4gICAgdmFyIHJlc3VsdCA9IGRhdGFba2V5XTtcbiAgICByZXR1cm4gcmVzdWx0ID09PSBIQVNIX1VOREVGSU5FRCA/IHVuZGVmaW5lZCA6IHJlc3VsdDtcbiAgfVxuICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChkYXRhLCBrZXkpID8gZGF0YVtrZXldIDogdW5kZWZpbmVkO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGhhc2hHZXQ7XG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./packages/webviz-core/node_modules/lodash/_hashGet.js\n");

/***/ }),

/***/ "./packages/webviz-core/node_modules/lodash/_hashHas.js":
/*!**************************************************************!*\
  !*** ./packages/webviz-core/node_modules/lodash/_hashHas.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ \"./packages/webviz-core/node_modules/lodash/_nativeCreate.js\");\n\n/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/** Used to check objects for own properties. */\nvar hasOwnProperty = objectProto.hasOwnProperty;\n\n/**\n * Checks if a hash value for `key` exists.\n *\n * @private\n * @name has\n * @memberOf Hash\n * @param {string} key The key of the entry to check.\n * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.\n */\nfunction hashHas(key) {\n  var data = this.__data__;\n  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);\n}\n\nmodule.exports = hashHas;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWNrYWdlcy93ZWJ2aXotY29yZS9ub2RlX21vZHVsZXMvbG9kYXNoL19oYXNoSGFzLmpzLmpzIiwic291cmNlcyI6WyIvaG9tZS9ub2RlL3dlYnZpei9wYWNrYWdlcy93ZWJ2aXotY29yZS9ub2RlX21vZHVsZXMvbG9kYXNoL19oYXNoSGFzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBuYXRpdmVDcmVhdGUgPSByZXF1aXJlKCcuL19uYXRpdmVDcmVhdGUnKTtcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYSBoYXNoIHZhbHVlIGZvciBga2V5YCBleGlzdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGhhc1xuICogQG1lbWJlck9mIEhhc2hcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZW50cnkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZW50cnkgZm9yIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBoYXNoSGFzKGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX187XG4gIHJldHVybiBuYXRpdmVDcmVhdGUgPyAoZGF0YVtrZXldICE9PSB1bmRlZmluZWQpIDogaGFzT3duUHJvcGVydHkuY2FsbChkYXRhLCBrZXkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGhhc2hIYXM7XG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./packages/webviz-core/node_modules/lodash/_hashHas.js\n");

/***/ }),

/***/ "./packages/webviz-core/node_modules/lodash/_hashSet.js":
/*!**************************************************************!*\
  !*** ./packages/webviz-core/node_modules/lodash/_hashSet.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ \"./packages/webviz-core/node_modules/lodash/_nativeCreate.js\");\n\n/** Used to stand-in for `undefined` hash values. */\nvar HASH_UNDEFINED = '__lodash_hash_undefined__';\n\n/**\n * Sets the hash `key` to `value`.\n *\n * @private\n * @name set\n * @memberOf Hash\n * @param {string} key The key of the value to set.\n * @param {*} value The value to set.\n * @returns {Object} Returns the hash instance.\n */\nfunction hashSet(key, value) {\n  var data = this.__data__;\n  this.size += this.has(key) ? 0 : 1;\n  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;\n  return this;\n}\n\nmodule.exports = hashSet;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWNrYWdlcy93ZWJ2aXotY29yZS9ub2RlX21vZHVsZXMvbG9kYXNoL19oYXNoU2V0LmpzLmpzIiwic291cmNlcyI6WyIvaG9tZS9ub2RlL3dlYnZpei9wYWNrYWdlcy93ZWJ2aXotY29yZS9ub2RlX21vZHVsZXMvbG9kYXNoL19oYXNoU2V0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBuYXRpdmVDcmVhdGUgPSByZXF1aXJlKCcuL19uYXRpdmVDcmVhdGUnKTtcblxuLyoqIFVzZWQgdG8gc3RhbmQtaW4gZm9yIGB1bmRlZmluZWRgIGhhc2ggdmFsdWVzLiAqL1xudmFyIEhBU0hfVU5ERUZJTkVEID0gJ19fbG9kYXNoX2hhc2hfdW5kZWZpbmVkX18nO1xuXG4vKipcbiAqIFNldHMgdGhlIGhhc2ggYGtleWAgdG8gYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgc2V0XG4gKiBAbWVtYmVyT2YgSGFzaFxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBoYXNoIGluc3RhbmNlLlxuICovXG5mdW5jdGlvbiBoYXNoU2V0KGtleSwgdmFsdWUpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fO1xuICB0aGlzLnNpemUgKz0gdGhpcy5oYXMoa2V5KSA/IDAgOiAxO1xuICBkYXRhW2tleV0gPSAobmF0aXZlQ3JlYXRlICYmIHZhbHVlID09PSB1bmRlZmluZWQpID8gSEFTSF9VTkRFRklORUQgOiB2YWx1ZTtcbiAgcmV0dXJuIHRoaXM7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaGFzaFNldDtcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./packages/webviz-core/node_modules/lodash/_hashSet.js\n");

/***/ }),

/***/ "./packages/webviz-core/node_modules/lodash/_isKeyable.js":
/*!****************************************************************!*\
  !*** ./packages/webviz-core/node_modules/lodash/_isKeyable.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Checks if `value` is suitable for use as unique object key.\n *\n * @private\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is suitable, else `false`.\n */\nfunction isKeyable(value) {\n  var type = typeof value;\n  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')\n    ? (value !== '__proto__')\n    : (value === null);\n}\n\nmodule.exports = isKeyable;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWNrYWdlcy93ZWJ2aXotY29yZS9ub2RlX21vZHVsZXMvbG9kYXNoL19pc0tleWFibGUuanMuanMiLCJzb3VyY2VzIjpbIi9ob21lL25vZGUvd2Vidml6L3BhY2thZ2VzL3dlYnZpei1jb3JlL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2lzS2V5YWJsZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHN1aXRhYmxlIGZvciB1c2UgYXMgdW5pcXVlIG9iamVjdCBrZXkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgc3VpdGFibGUsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNLZXlhYmxlKHZhbHVlKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gKHR5cGUgPT0gJ3N0cmluZycgfHwgdHlwZSA9PSAnbnVtYmVyJyB8fCB0eXBlID09ICdzeW1ib2wnIHx8IHR5cGUgPT0gJ2Jvb2xlYW4nKVxuICAgID8gKHZhbHVlICE9PSAnX19wcm90b19fJylcbiAgICA6ICh2YWx1ZSA9PT0gbnVsbCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNLZXlhYmxlO1xuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./packages/webviz-core/node_modules/lodash/_isKeyable.js\n");

/***/ }),

/***/ "./packages/webviz-core/node_modules/lodash/_isMasked.js":
/*!***************************************************************!*\
  !*** ./packages/webviz-core/node_modules/lodash/_isMasked.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var coreJsData = __webpack_require__(/*! ./_coreJsData */ \"./packages/webviz-core/node_modules/lodash/_coreJsData.js\");\n\n/** Used to detect methods masquerading as native. */\nvar maskSrcKey = (function() {\n  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');\n  return uid ? ('Symbol(src)_1.' + uid) : '';\n}());\n\n/**\n * Checks if `func` has its source masked.\n *\n * @private\n * @param {Function} func The function to check.\n * @returns {boolean} Returns `true` if `func` is masked, else `false`.\n */\nfunction isMasked(func) {\n  return !!maskSrcKey && (maskSrcKey in func);\n}\n\nmodule.exports = isMasked;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWNrYWdlcy93ZWJ2aXotY29yZS9ub2RlX21vZHVsZXMvbG9kYXNoL19pc01hc2tlZC5qcy5qcyIsInNvdXJjZXMiOlsiL2hvbWUvbm9kZS93ZWJ2aXovcGFja2FnZXMvd2Vidml6LWNvcmUvbm9kZV9tb2R1bGVzL2xvZGFzaC9faXNNYXNrZWQuanMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIGNvcmVKc0RhdGEgPSByZXF1aXJlKCcuL19jb3JlSnNEYXRhJyk7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBtZXRob2RzIG1hc3F1ZXJhZGluZyBhcyBuYXRpdmUuICovXG52YXIgbWFza1NyY0tleSA9IChmdW5jdGlvbigpIHtcbiAgdmFyIHVpZCA9IC9bXi5dKyQvLmV4ZWMoY29yZUpzRGF0YSAmJiBjb3JlSnNEYXRhLmtleXMgJiYgY29yZUpzRGF0YS5rZXlzLklFX1BST1RPIHx8ICcnKTtcbiAgcmV0dXJuIHVpZCA/ICgnU3ltYm9sKHNyYylfMS4nICsgdWlkKSA6ICcnO1xufSgpKTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYGZ1bmNgIGhhcyBpdHMgc291cmNlIG1hc2tlZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYGZ1bmNgIGlzIG1hc2tlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc01hc2tlZChmdW5jKSB7XG4gIHJldHVybiAhIW1hc2tTcmNLZXkgJiYgKG1hc2tTcmNLZXkgaW4gZnVuYyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNNYXNrZWQ7XG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./packages/webviz-core/node_modules/lodash/_isMasked.js\n");

/***/ }),

/***/ "./packages/webviz-core/node_modules/lodash/_listCacheClear.js":
/*!*********************************************************************!*\
  !*** ./packages/webviz-core/node_modules/lodash/_listCacheClear.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Removes all key-value entries from the list cache.\n *\n * @private\n * @name clear\n * @memberOf ListCache\n */\nfunction listCacheClear() {\n  this.__data__ = [];\n  this.size = 0;\n}\n\nmodule.exports = listCacheClear;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWNrYWdlcy93ZWJ2aXotY29yZS9ub2RlX21vZHVsZXMvbG9kYXNoL19saXN0Q2FjaGVDbGVhci5qcy5qcyIsInNvdXJjZXMiOlsiL2hvbWUvbm9kZS93ZWJ2aXovcGFja2FnZXMvd2Vidml6LWNvcmUvbm9kZV9tb2R1bGVzL2xvZGFzaC9fbGlzdENhY2hlQ2xlYXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBSZW1vdmVzIGFsbCBrZXktdmFsdWUgZW50cmllcyBmcm9tIHRoZSBsaXN0IGNhY2hlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBjbGVhclxuICogQG1lbWJlck9mIExpc3RDYWNoZVxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVDbGVhcigpIHtcbiAgdGhpcy5fX2RhdGFfXyA9IFtdO1xuICB0aGlzLnNpemUgPSAwO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGxpc3RDYWNoZUNsZWFyO1xuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./packages/webviz-core/node_modules/lodash/_listCacheClear.js\n");

/***/ }),

/***/ "./packages/webviz-core/node_modules/lodash/_listCacheDelete.js":
/*!**********************************************************************!*\
  !*** ./packages/webviz-core/node_modules/lodash/_listCacheDelete.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ \"./packages/webviz-core/node_modules/lodash/_assocIndexOf.js\");\n\n/** Used for built-in method references. */\nvar arrayProto = Array.prototype;\n\n/** Built-in value references. */\nvar splice = arrayProto.splice;\n\n/**\n * Removes `key` and its value from the list cache.\n *\n * @private\n * @name delete\n * @memberOf ListCache\n * @param {string} key The key of the value to remove.\n * @returns {boolean} Returns `true` if the entry was removed, else `false`.\n */\nfunction listCacheDelete(key) {\n  var data = this.__data__,\n      index = assocIndexOf(data, key);\n\n  if (index < 0) {\n    return false;\n  }\n  var lastIndex = data.length - 1;\n  if (index == lastIndex) {\n    data.pop();\n  } else {\n    splice.call(data, index, 1);\n  }\n  --this.size;\n  return true;\n}\n\nmodule.exports = listCacheDelete;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWNrYWdlcy93ZWJ2aXotY29yZS9ub2RlX21vZHVsZXMvbG9kYXNoL19saXN0Q2FjaGVEZWxldGUuanMuanMiLCJzb3VyY2VzIjpbIi9ob21lL25vZGUvd2Vidml6L3BhY2thZ2VzL3dlYnZpei1jb3JlL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2xpc3RDYWNoZURlbGV0ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgYXNzb2NJbmRleE9mID0gcmVxdWlyZSgnLi9fYXNzb2NJbmRleE9mJyk7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBhcnJheVByb3RvID0gQXJyYXkucHJvdG90eXBlO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBzcGxpY2UgPSBhcnJheVByb3RvLnNwbGljZTtcblxuLyoqXG4gKiBSZW1vdmVzIGBrZXlgIGFuZCBpdHMgdmFsdWUgZnJvbSB0aGUgbGlzdCBjYWNoZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZGVsZXRlXG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHJlbW92ZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZW50cnkgd2FzIHJlbW92ZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlRGVsZXRlKGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX18sXG4gICAgICBpbmRleCA9IGFzc29jSW5kZXhPZihkYXRhLCBrZXkpO1xuXG4gIGlmIChpbmRleCA8IDApIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIGxhc3RJbmRleCA9IGRhdGEubGVuZ3RoIC0gMTtcbiAgaWYgKGluZGV4ID09IGxhc3RJbmRleCkge1xuICAgIGRhdGEucG9wKCk7XG4gIH0gZWxzZSB7XG4gICAgc3BsaWNlLmNhbGwoZGF0YSwgaW5kZXgsIDEpO1xuICB9XG4gIC0tdGhpcy5zaXplO1xuICByZXR1cm4gdHJ1ZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBsaXN0Q2FjaGVEZWxldGU7XG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./packages/webviz-core/node_modules/lodash/_listCacheDelete.js\n");

/***/ }),

/***/ "./packages/webviz-core/node_modules/lodash/_listCacheGet.js":
/*!*******************************************************************!*\
  !*** ./packages/webviz-core/node_modules/lodash/_listCacheGet.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ \"./packages/webviz-core/node_modules/lodash/_assocIndexOf.js\");\n\n/**\n * Gets the list cache value for `key`.\n *\n * @private\n * @name get\n * @memberOf ListCache\n * @param {string} key The key of the value to get.\n * @returns {*} Returns the entry value.\n */\nfunction listCacheGet(key) {\n  var data = this.__data__,\n      index = assocIndexOf(data, key);\n\n  return index < 0 ? undefined : data[index][1];\n}\n\nmodule.exports = listCacheGet;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWNrYWdlcy93ZWJ2aXotY29yZS9ub2RlX21vZHVsZXMvbG9kYXNoL19saXN0Q2FjaGVHZXQuanMuanMiLCJzb3VyY2VzIjpbIi9ob21lL25vZGUvd2Vidml6L3BhY2thZ2VzL3dlYnZpei1jb3JlL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2xpc3RDYWNoZUdldC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgYXNzb2NJbmRleE9mID0gcmVxdWlyZSgnLi9fYXNzb2NJbmRleE9mJyk7XG5cbi8qKlxuICogR2V0cyB0aGUgbGlzdCBjYWNoZSB2YWx1ZSBmb3IgYGtleWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGdldFxuICogQG1lbWJlck9mIExpc3RDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZW50cnkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZUdldChrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fLFxuICAgICAgaW5kZXggPSBhc3NvY0luZGV4T2YoZGF0YSwga2V5KTtcblxuICByZXR1cm4gaW5kZXggPCAwID8gdW5kZWZpbmVkIDogZGF0YVtpbmRleF1bMV07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbGlzdENhY2hlR2V0O1xuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./packages/webviz-core/node_modules/lodash/_listCacheGet.js\n");

/***/ }),

/***/ "./packages/webviz-core/node_modules/lodash/_listCacheHas.js":
/*!*******************************************************************!*\
  !*** ./packages/webviz-core/node_modules/lodash/_listCacheHas.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ \"./packages/webviz-core/node_modules/lodash/_assocIndexOf.js\");\n\n/**\n * Checks if a list cache value for `key` exists.\n *\n * @private\n * @name has\n * @memberOf ListCache\n * @param {string} key The key of the entry to check.\n * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.\n */\nfunction listCacheHas(key) {\n  return assocIndexOf(this.__data__, key) > -1;\n}\n\nmodule.exports = listCacheHas;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWNrYWdlcy93ZWJ2aXotY29yZS9ub2RlX21vZHVsZXMvbG9kYXNoL19saXN0Q2FjaGVIYXMuanMuanMiLCJzb3VyY2VzIjpbIi9ob21lL25vZGUvd2Vidml6L3BhY2thZ2VzL3dlYnZpei1jb3JlL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2xpc3RDYWNoZUhhcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgYXNzb2NJbmRleE9mID0gcmVxdWlyZSgnLi9fYXNzb2NJbmRleE9mJyk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgbGlzdCBjYWNoZSB2YWx1ZSBmb3IgYGtleWAgZXhpc3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZW50cnkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZW50cnkgZm9yIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVIYXMoa2V5KSB7XG4gIHJldHVybiBhc3NvY0luZGV4T2YodGhpcy5fX2RhdGFfXywga2V5KSA+IC0xO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGxpc3RDYWNoZUhhcztcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./packages/webviz-core/node_modules/lodash/_listCacheHas.js\n");

/***/ }),

/***/ "./packages/webviz-core/node_modules/lodash/_listCacheSet.js":
/*!*******************************************************************!*\
  !*** ./packages/webviz-core/node_modules/lodash/_listCacheSet.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ \"./packages/webviz-core/node_modules/lodash/_assocIndexOf.js\");\n\n/**\n * Sets the list cache `key` to `value`.\n *\n * @private\n * @name set\n * @memberOf ListCache\n * @param {string} key The key of the value to set.\n * @param {*} value The value to set.\n * @returns {Object} Returns the list cache instance.\n */\nfunction listCacheSet(key, value) {\n  var data = this.__data__,\n      index = assocIndexOf(data, key);\n\n  if (index < 0) {\n    ++this.size;\n    data.push([key, value]);\n  } else {\n    data[index][1] = value;\n  }\n  return this;\n}\n\nmodule.exports = listCacheSet;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWNrYWdlcy93ZWJ2aXotY29yZS9ub2RlX21vZHVsZXMvbG9kYXNoL19saXN0Q2FjaGVTZXQuanMuanMiLCJzb3VyY2VzIjpbIi9ob21lL25vZGUvd2Vidml6L3BhY2thZ2VzL3dlYnZpei1jb3JlL25vZGVfbW9kdWxlcy9sb2Rhc2gvX2xpc3RDYWNoZVNldC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgYXNzb2NJbmRleE9mID0gcmVxdWlyZSgnLi9fYXNzb2NJbmRleE9mJyk7XG5cbi8qKlxuICogU2V0cyB0aGUgbGlzdCBjYWNoZSBga2V5YCB0byBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBzZXRcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gc2V0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgbGlzdCBjYWNoZSBpbnN0YW5jZS5cbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlU2V0KGtleSwgdmFsdWUpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fLFxuICAgICAgaW5kZXggPSBhc3NvY0luZGV4T2YoZGF0YSwga2V5KTtcblxuICBpZiAoaW5kZXggPCAwKSB7XG4gICAgKyt0aGlzLnNpemU7XG4gICAgZGF0YS5wdXNoKFtrZXksIHZhbHVlXSk7XG4gIH0gZWxzZSB7XG4gICAgZGF0YVtpbmRleF1bMV0gPSB2YWx1ZTtcbiAgfVxuICByZXR1cm4gdGhpcztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBsaXN0Q2FjaGVTZXQ7XG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./packages/webviz-core/node_modules/lodash/_listCacheSet.js\n");

/***/ }),

/***/ "./packages/webviz-core/node_modules/lodash/_mapCacheClear.js":
/*!********************************************************************!*\
  !*** ./packages/webviz-core/node_modules/lodash/_mapCacheClear.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Hash = __webpack_require__(/*! ./_Hash */ \"./packages/webviz-core/node_modules/lodash/_Hash.js\"),\n    ListCache = __webpack_require__(/*! ./_ListCache */ \"./packages/webviz-core/node_modules/lodash/_ListCache.js\"),\n    Map = __webpack_require__(/*! ./_Map */ \"./packages/webviz-core/node_modules/lodash/_Map.js\");\n\n/**\n * Removes all key-value entries from the map.\n *\n * @private\n * @name clear\n * @memberOf MapCache\n */\nfunction mapCacheClear() {\n  this.size = 0;\n  this.__data__ = {\n    'hash': new Hash,\n    'map': new (Map || ListCache),\n    'string': new Hash\n  };\n}\n\nmodule.exports = mapCacheClear;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWNrYWdlcy93ZWJ2aXotY29yZS9ub2RlX21vZHVsZXMvbG9kYXNoL19tYXBDYWNoZUNsZWFyLmpzLmpzIiwic291cmNlcyI6WyIvaG9tZS9ub2RlL3dlYnZpei9wYWNrYWdlcy93ZWJ2aXotY29yZS9ub2RlX21vZHVsZXMvbG9kYXNoL19tYXBDYWNoZUNsZWFyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBIYXNoID0gcmVxdWlyZSgnLi9fSGFzaCcpLFxuICAgIExpc3RDYWNoZSA9IHJlcXVpcmUoJy4vX0xpc3RDYWNoZScpLFxuICAgIE1hcCA9IHJlcXVpcmUoJy4vX01hcCcpO1xuXG4vKipcbiAqIFJlbW92ZXMgYWxsIGtleS12YWx1ZSBlbnRyaWVzIGZyb20gdGhlIG1hcC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgY2xlYXJcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICovXG5mdW5jdGlvbiBtYXBDYWNoZUNsZWFyKCkge1xuICB0aGlzLnNpemUgPSAwO1xuICB0aGlzLl9fZGF0YV9fID0ge1xuICAgICdoYXNoJzogbmV3IEhhc2gsXG4gICAgJ21hcCc6IG5ldyAoTWFwIHx8IExpc3RDYWNoZSksXG4gICAgJ3N0cmluZyc6IG5ldyBIYXNoXG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbWFwQ2FjaGVDbGVhcjtcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./packages/webviz-core/node_modules/lodash/_mapCacheClear.js\n");

/***/ }),

/***/ "./packages/webviz-core/node_modules/lodash/_mapCacheDelete.js":
/*!*********************************************************************!*\
  !*** ./packages/webviz-core/node_modules/lodash/_mapCacheDelete.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getMapData = __webpack_require__(/*! ./_getMapData */ \"./packages/webviz-core/node_modules/lodash/_getMapData.js\");\n\n/**\n * Removes `key` and its value from the map.\n *\n * @private\n * @name delete\n * @memberOf MapCache\n * @param {string} key The key of the value to remove.\n * @returns {boolean} Returns `true` if the entry was removed, else `false`.\n */\nfunction mapCacheDelete(key) {\n  var result = getMapData(this, key)['delete'](key);\n  this.size -= result ? 1 : 0;\n  return result;\n}\n\nmodule.exports = mapCacheDelete;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWNrYWdlcy93ZWJ2aXotY29yZS9ub2RlX21vZHVsZXMvbG9kYXNoL19tYXBDYWNoZURlbGV0ZS5qcy5qcyIsInNvdXJjZXMiOlsiL2hvbWUvbm9kZS93ZWJ2aXovcGFja2FnZXMvd2Vidml6LWNvcmUvbm9kZV9tb2R1bGVzL2xvZGFzaC9fbWFwQ2FjaGVEZWxldGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIGdldE1hcERhdGEgPSByZXF1aXJlKCcuL19nZXRNYXBEYXRhJyk7XG5cbi8qKlxuICogUmVtb3ZlcyBga2V5YCBhbmQgaXRzIHZhbHVlIGZyb20gdGhlIG1hcC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZGVsZXRlXG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gcmVtb3ZlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBlbnRyeSB3YXMgcmVtb3ZlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBtYXBDYWNoZURlbGV0ZShrZXkpIHtcbiAgdmFyIHJlc3VsdCA9IGdldE1hcERhdGEodGhpcywga2V5KVsnZGVsZXRlJ10oa2V5KTtcbiAgdGhpcy5zaXplIC09IHJlc3VsdCA/IDEgOiAwO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG1hcENhY2hlRGVsZXRlO1xuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./packages/webviz-core/node_modules/lodash/_mapCacheDelete.js\n");

/***/ }),

/***/ "./packages/webviz-core/node_modules/lodash/_mapCacheGet.js":
/*!******************************************************************!*\
  !*** ./packages/webviz-core/node_modules/lodash/_mapCacheGet.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getMapData = __webpack_require__(/*! ./_getMapData */ \"./packages/webviz-core/node_modules/lodash/_getMapData.js\");\n\n/**\n * Gets the map value for `key`.\n *\n * @private\n * @name get\n * @memberOf MapCache\n * @param {string} key The key of the value to get.\n * @returns {*} Returns the entry value.\n */\nfunction mapCacheGet(key) {\n  return getMapData(this, key).get(key);\n}\n\nmodule.exports = mapCacheGet;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWNrYWdlcy93ZWJ2aXotY29yZS9ub2RlX21vZHVsZXMvbG9kYXNoL19tYXBDYWNoZUdldC5qcy5qcyIsInNvdXJjZXMiOlsiL2hvbWUvbm9kZS93ZWJ2aXovcGFja2FnZXMvd2Vidml6LWNvcmUvbm9kZV9tb2R1bGVzL2xvZGFzaC9fbWFwQ2FjaGVHZXQuanMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIGdldE1hcERhdGEgPSByZXF1aXJlKCcuL19nZXRNYXBEYXRhJyk7XG5cbi8qKlxuICogR2V0cyB0aGUgbWFwIHZhbHVlIGZvciBga2V5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZ2V0XG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGVudHJ5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBtYXBDYWNoZUdldChrZXkpIHtcbiAgcmV0dXJuIGdldE1hcERhdGEodGhpcywga2V5KS5nZXQoa2V5KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBtYXBDYWNoZUdldDtcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./packages/webviz-core/node_modules/lodash/_mapCacheGet.js\n");

/***/ }),

/***/ "./packages/webviz-core/node_modules/lodash/_mapCacheHas.js":
/*!******************************************************************!*\
  !*** ./packages/webviz-core/node_modules/lodash/_mapCacheHas.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getMapData = __webpack_require__(/*! ./_getMapData */ \"./packages/webviz-core/node_modules/lodash/_getMapData.js\");\n\n/**\n * Checks if a map value for `key` exists.\n *\n * @private\n * @name has\n * @memberOf MapCache\n * @param {string} key The key of the entry to check.\n * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.\n */\nfunction mapCacheHas(key) {\n  return getMapData(this, key).has(key);\n}\n\nmodule.exports = mapCacheHas;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWNrYWdlcy93ZWJ2aXotY29yZS9ub2RlX21vZHVsZXMvbG9kYXNoL19tYXBDYWNoZUhhcy5qcy5qcyIsInNvdXJjZXMiOlsiL2hvbWUvbm9kZS93ZWJ2aXovcGFja2FnZXMvd2Vidml6LWNvcmUvbm9kZV9tb2R1bGVzL2xvZGFzaC9fbWFwQ2FjaGVIYXMuanMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIGdldE1hcERhdGEgPSByZXF1aXJlKCcuL19nZXRNYXBEYXRhJyk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgbWFwIHZhbHVlIGZvciBga2V5YCBleGlzdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGhhc1xuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVIYXMoa2V5KSB7XG4gIHJldHVybiBnZXRNYXBEYXRhKHRoaXMsIGtleSkuaGFzKGtleSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbWFwQ2FjaGVIYXM7XG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./packages/webviz-core/node_modules/lodash/_mapCacheHas.js\n");

/***/ }),

/***/ "./packages/webviz-core/node_modules/lodash/_mapCacheSet.js":
/*!******************************************************************!*\
  !*** ./packages/webviz-core/node_modules/lodash/_mapCacheSet.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getMapData = __webpack_require__(/*! ./_getMapData */ \"./packages/webviz-core/node_modules/lodash/_getMapData.js\");\n\n/**\n * Sets the map `key` to `value`.\n *\n * @private\n * @name set\n * @memberOf MapCache\n * @param {string} key The key of the value to set.\n * @param {*} value The value to set.\n * @returns {Object} Returns the map cache instance.\n */\nfunction mapCacheSet(key, value) {\n  var data = getMapData(this, key),\n      size = data.size;\n\n  data.set(key, value);\n  this.size += data.size == size ? 0 : 1;\n  return this;\n}\n\nmodule.exports = mapCacheSet;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWNrYWdlcy93ZWJ2aXotY29yZS9ub2RlX21vZHVsZXMvbG9kYXNoL19tYXBDYWNoZVNldC5qcy5qcyIsInNvdXJjZXMiOlsiL2hvbWUvbm9kZS93ZWJ2aXovcGFja2FnZXMvd2Vidml6LWNvcmUvbm9kZV9tb2R1bGVzL2xvZGFzaC9fbWFwQ2FjaGVTZXQuanMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIGdldE1hcERhdGEgPSByZXF1aXJlKCcuL19nZXRNYXBEYXRhJyk7XG5cbi8qKlxuICogU2V0cyB0aGUgbWFwIGBrZXlgIHRvIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIHNldFxuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHNldC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNldC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIG1hcCBjYWNoZSBpbnN0YW5jZS5cbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVTZXQoa2V5LCB2YWx1ZSkge1xuICB2YXIgZGF0YSA9IGdldE1hcERhdGEodGhpcywga2V5KSxcbiAgICAgIHNpemUgPSBkYXRhLnNpemU7XG5cbiAgZGF0YS5zZXQoa2V5LCB2YWx1ZSk7XG4gIHRoaXMuc2l6ZSArPSBkYXRhLnNpemUgPT0gc2l6ZSA/IDAgOiAxO1xuICByZXR1cm4gdGhpcztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBtYXBDYWNoZVNldDtcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./packages/webviz-core/node_modules/lodash/_mapCacheSet.js\n");

/***/ }),

/***/ "./packages/webviz-core/node_modules/lodash/_nativeCreate.js":
/*!*******************************************************************!*\
  !*** ./packages/webviz-core/node_modules/lodash/_nativeCreate.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getNative = __webpack_require__(/*! ./_getNative */ \"./packages/webviz-core/node_modules/lodash/_getNative.js\");\n\n/* Built-in method references that are verified to be native. */\nvar nativeCreate = getNative(Object, 'create');\n\nmodule.exports = nativeCreate;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWNrYWdlcy93ZWJ2aXotY29yZS9ub2RlX21vZHVsZXMvbG9kYXNoL19uYXRpdmVDcmVhdGUuanMuanMiLCJzb3VyY2VzIjpbIi9ob21lL25vZGUvd2Vidml6L3BhY2thZ2VzL3dlYnZpei1jb3JlL25vZGVfbW9kdWxlcy9sb2Rhc2gvX25hdGl2ZUNyZWF0ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgZ2V0TmF0aXZlID0gcmVxdWlyZSgnLi9fZ2V0TmF0aXZlJyk7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIHRoYXQgYXJlIHZlcmlmaWVkIHRvIGJlIG5hdGl2ZS4gKi9cbnZhciBuYXRpdmVDcmVhdGUgPSBnZXROYXRpdmUoT2JqZWN0LCAnY3JlYXRlJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gbmF0aXZlQ3JlYXRlO1xuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./packages/webviz-core/node_modules/lodash/_nativeCreate.js\n");

/***/ }),

/***/ "./packages/webviz-core/node_modules/lodash/_objectToString.js":
/*!*********************************************************************!*\
  !*** ./packages/webviz-core/node_modules/lodash/_objectToString.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/**\n * Used to resolve the\n * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)\n * of values.\n */\nvar nativeObjectToString = objectProto.toString;\n\n/**\n * Converts `value` to a string using `Object.prototype.toString`.\n *\n * @private\n * @param {*} value The value to convert.\n * @returns {string} Returns the converted string.\n */\nfunction objectToString(value) {\n  return nativeObjectToString.call(value);\n}\n\nmodule.exports = objectToString;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWNrYWdlcy93ZWJ2aXotY29yZS9ub2RlX21vZHVsZXMvbG9kYXNoL19vYmplY3RUb1N0cmluZy5qcy5qcyIsInNvdXJjZXMiOlsiL2hvbWUvbm9kZS93ZWJ2aXovcGFja2FnZXMvd2Vidml6LWNvcmUvbm9kZV9tb2R1bGVzL2xvZGFzaC9fb2JqZWN0VG9TdHJpbmcuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG5hdGl2ZU9iamVjdFRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIHN0cmluZyB1c2luZyBgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZ2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBjb252ZXJ0ZWQgc3RyaW5nLlxuICovXG5mdW5jdGlvbiBvYmplY3RUb1N0cmluZyh2YWx1ZSkge1xuICByZXR1cm4gbmF0aXZlT2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gb2JqZWN0VG9TdHJpbmc7XG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./packages/webviz-core/node_modules/lodash/_objectToString.js\n");

/***/ }),

/***/ "./packages/webviz-core/node_modules/lodash/_root.js":
/*!***********************************************************!*\
  !*** ./packages/webviz-core/node_modules/lodash/_root.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var freeGlobal = __webpack_require__(/*! ./_freeGlobal */ \"./packages/webviz-core/node_modules/lodash/_freeGlobal.js\");\n\n/** Detect free variable `self`. */\nvar freeSelf = typeof self == 'object' && self && self.Object === Object && self;\n\n/** Used as a reference to the global object. */\nvar root = freeGlobal || freeSelf || Function('return this')();\n\nmodule.exports = root;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWNrYWdlcy93ZWJ2aXotY29yZS9ub2RlX21vZHVsZXMvbG9kYXNoL19yb290LmpzLmpzIiwic291cmNlcyI6WyIvaG9tZS9ub2RlL3dlYnZpei9wYWNrYWdlcy93ZWJ2aXotY29yZS9ub2RlX21vZHVsZXMvbG9kYXNoL19yb290LmpzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBmcmVlR2xvYmFsID0gcmVxdWlyZSgnLi9fZnJlZUdsb2JhbCcpO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYHNlbGZgLiAqL1xudmFyIGZyZWVTZWxmID0gdHlwZW9mIHNlbGYgPT0gJ29iamVjdCcgJiYgc2VsZiAmJiBzZWxmLk9iamVjdCA9PT0gT2JqZWN0ICYmIHNlbGY7XG5cbi8qKiBVc2VkIGFzIGEgcmVmZXJlbmNlIHRvIHRoZSBnbG9iYWwgb2JqZWN0LiAqL1xudmFyIHJvb3QgPSBmcmVlR2xvYmFsIHx8IGZyZWVTZWxmIHx8IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cbm1vZHVsZS5leHBvcnRzID0gcm9vdDtcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./packages/webviz-core/node_modules/lodash/_root.js\n");

/***/ }),

/***/ "./packages/webviz-core/node_modules/lodash/_toSource.js":
/*!***************************************************************!*\
  !*** ./packages/webviz-core/node_modules/lodash/_toSource.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/** Used for built-in method references. */\nvar funcProto = Function.prototype;\n\n/** Used to resolve the decompiled source of functions. */\nvar funcToString = funcProto.toString;\n\n/**\n * Converts `func` to its source code.\n *\n * @private\n * @param {Function} func The function to convert.\n * @returns {string} Returns the source code.\n */\nfunction toSource(func) {\n  if (func != null) {\n    try {\n      return funcToString.call(func);\n    } catch (e) {}\n    try {\n      return (func + '');\n    } catch (e) {}\n  }\n  return '';\n}\n\nmodule.exports = toSource;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWNrYWdlcy93ZWJ2aXotY29yZS9ub2RlX21vZHVsZXMvbG9kYXNoL190b1NvdXJjZS5qcy5qcyIsInNvdXJjZXMiOlsiL2hvbWUvbm9kZS93ZWJ2aXovcGFja2FnZXMvd2Vidml6LWNvcmUvbm9kZV9tb2R1bGVzL2xvZGFzaC9fdG9Tb3VyY2UuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIGZ1bmNQcm90byA9IEZ1bmN0aW9uLnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgZGVjb21waWxlZCBzb3VyY2Ugb2YgZnVuY3Rpb25zLiAqL1xudmFyIGZ1bmNUb1N0cmluZyA9IGZ1bmNQcm90by50b1N0cmluZztcblxuLyoqXG4gKiBDb252ZXJ0cyBgZnVuY2AgdG8gaXRzIHNvdXJjZSBjb2RlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBjb252ZXJ0LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgc291cmNlIGNvZGUuXG4gKi9cbmZ1bmN0aW9uIHRvU291cmNlKGZ1bmMpIHtcbiAgaWYgKGZ1bmMgIT0gbnVsbCkge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gZnVuY1RvU3RyaW5nLmNhbGwoZnVuYyk7XG4gICAgfSBjYXRjaCAoZSkge31cbiAgICB0cnkge1xuICAgICAgcmV0dXJuIChmdW5jICsgJycpO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG4gIH1cbiAgcmV0dXJuICcnO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRvU291cmNlO1xuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./packages/webviz-core/node_modules/lodash/_toSource.js\n");

/***/ }),

/***/ "./packages/webviz-core/node_modules/lodash/clamp.js":
/*!***********************************************************!*\
  !*** ./packages/webviz-core/node_modules/lodash/clamp.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseClamp = __webpack_require__(/*! ./_baseClamp */ \"./packages/webviz-core/node_modules/lodash/_baseClamp.js\"),\n    toNumber = __webpack_require__(/*! ./toNumber */ \"./packages/webviz-core/node_modules/lodash/toNumber.js\");\n\n/**\n * Clamps `number` within the inclusive `lower` and `upper` bounds.\n *\n * @static\n * @memberOf _\n * @since 4.0.0\n * @category Number\n * @param {number} number The number to clamp.\n * @param {number} [lower] The lower bound.\n * @param {number} upper The upper bound.\n * @returns {number} Returns the clamped number.\n * @example\n *\n * _.clamp(-10, -5, 5);\n * // => -5\n *\n * _.clamp(10, -5, 5);\n * // => 5\n */\nfunction clamp(number, lower, upper) {\n  if (upper === undefined) {\n    upper = lower;\n    lower = undefined;\n  }\n  if (upper !== undefined) {\n    upper = toNumber(upper);\n    upper = upper === upper ? upper : 0;\n  }\n  if (lower !== undefined) {\n    lower = toNumber(lower);\n    lower = lower === lower ? lower : 0;\n  }\n  return baseClamp(toNumber(number), lower, upper);\n}\n\nmodule.exports = clamp;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWNrYWdlcy93ZWJ2aXotY29yZS9ub2RlX21vZHVsZXMvbG9kYXNoL2NsYW1wLmpzLmpzIiwic291cmNlcyI6WyIvaG9tZS9ub2RlL3dlYnZpei9wYWNrYWdlcy93ZWJ2aXotY29yZS9ub2RlX21vZHVsZXMvbG9kYXNoL2NsYW1wLmpzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBiYXNlQ2xhbXAgPSByZXF1aXJlKCcuL19iYXNlQ2xhbXAnKSxcbiAgICB0b051bWJlciA9IHJlcXVpcmUoJy4vdG9OdW1iZXInKTtcblxuLyoqXG4gKiBDbGFtcHMgYG51bWJlcmAgd2l0aGluIHRoZSBpbmNsdXNpdmUgYGxvd2VyYCBhbmQgYHVwcGVyYCBib3VuZHMuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IE51bWJlclxuICogQHBhcmFtIHtudW1iZXJ9IG51bWJlciBUaGUgbnVtYmVyIHRvIGNsYW1wLlxuICogQHBhcmFtIHtudW1iZXJ9IFtsb3dlcl0gVGhlIGxvd2VyIGJvdW5kLlxuICogQHBhcmFtIHtudW1iZXJ9IHVwcGVyIFRoZSB1cHBlciBib3VuZC5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIGNsYW1wZWQgbnVtYmVyLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmNsYW1wKC0xMCwgLTUsIDUpO1xuICogLy8gPT4gLTVcbiAqXG4gKiBfLmNsYW1wKDEwLCAtNSwgNSk7XG4gKiAvLyA9PiA1XG4gKi9cbmZ1bmN0aW9uIGNsYW1wKG51bWJlciwgbG93ZXIsIHVwcGVyKSB7XG4gIGlmICh1cHBlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdXBwZXIgPSBsb3dlcjtcbiAgICBsb3dlciA9IHVuZGVmaW5lZDtcbiAgfVxuICBpZiAodXBwZXIgIT09IHVuZGVmaW5lZCkge1xuICAgIHVwcGVyID0gdG9OdW1iZXIodXBwZXIpO1xuICAgIHVwcGVyID0gdXBwZXIgPT09IHVwcGVyID8gdXBwZXIgOiAwO1xuICB9XG4gIGlmIChsb3dlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgbG93ZXIgPSB0b051bWJlcihsb3dlcik7XG4gICAgbG93ZXIgPSBsb3dlciA9PT0gbG93ZXIgPyBsb3dlciA6IDA7XG4gIH1cbiAgcmV0dXJuIGJhc2VDbGFtcCh0b051bWJlcihudW1iZXIpLCBsb3dlciwgdXBwZXIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNsYW1wO1xuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./packages/webviz-core/node_modules/lodash/clamp.js\n");

/***/ }),

/***/ "./packages/webviz-core/node_modules/lodash/eq.js":
/*!********************************************************!*\
  !*** ./packages/webviz-core/node_modules/lodash/eq.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Performs a\n * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)\n * comparison between two values to determine if they are equivalent.\n *\n * @static\n * @memberOf _\n * @since 4.0.0\n * @category Lang\n * @param {*} value The value to compare.\n * @param {*} other The other value to compare.\n * @returns {boolean} Returns `true` if the values are equivalent, else `false`.\n * @example\n *\n * var object = { 'a': 1 };\n * var other = { 'a': 1 };\n *\n * _.eq(object, object);\n * // => true\n *\n * _.eq(object, other);\n * // => false\n *\n * _.eq('a', 'a');\n * // => true\n *\n * _.eq('a', Object('a'));\n * // => false\n *\n * _.eq(NaN, NaN);\n * // => true\n */\nfunction eq(value, other) {\n  return value === other || (value !== value && other !== other);\n}\n\nmodule.exports = eq;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWNrYWdlcy93ZWJ2aXotY29yZS9ub2RlX21vZHVsZXMvbG9kYXNoL2VxLmpzLmpzIiwic291cmNlcyI6WyIvaG9tZS9ub2RlL3dlYnZpei9wYWNrYWdlcy93ZWJ2aXotY29yZS9ub2RlX21vZHVsZXMvbG9kYXNoL2VxLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogUGVyZm9ybXMgYVxuICogW2BTYW1lVmFsdWVaZXJvYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtc2FtZXZhbHVlemVybylcbiAqIGNvbXBhcmlzb24gYmV0d2VlbiB0d28gdmFsdWVzIHRvIGRldGVybWluZSBpZiB0aGV5IGFyZSBlcXVpdmFsZW50LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb21wYXJlLlxuICogQHBhcmFtIHsqfSBvdGhlciBUaGUgb3RoZXIgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgdmFsdWVzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICdhJzogMSB9O1xuICogdmFyIG90aGVyID0geyAnYSc6IDEgfTtcbiAqXG4gKiBfLmVxKG9iamVjdCwgb2JqZWN0KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmVxKG9iamVjdCwgb3RoZXIpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmVxKCdhJywgJ2EnKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmVxKCdhJywgT2JqZWN0KCdhJykpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmVxKE5hTiwgTmFOKTtcbiAqIC8vID0+IHRydWVcbiAqL1xuZnVuY3Rpb24gZXEodmFsdWUsIG90aGVyKSB7XG4gIHJldHVybiB2YWx1ZSA9PT0gb3RoZXIgfHwgKHZhbHVlICE9PSB2YWx1ZSAmJiBvdGhlciAhPT0gb3RoZXIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGVxO1xuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./packages/webviz-core/node_modules/lodash/eq.js\n");

/***/ }),

/***/ "./packages/webviz-core/node_modules/lodash/isFunction.js":
/*!****************************************************************!*\
  !*** ./packages/webviz-core/node_modules/lodash/isFunction.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ \"./packages/webviz-core/node_modules/lodash/_baseGetTag.js\"),\n    isObject = __webpack_require__(/*! ./isObject */ \"./packages/webviz-core/node_modules/lodash/isObject.js\");\n\n/** `Object#toString` result references. */\nvar asyncTag = '[object AsyncFunction]',\n    funcTag = '[object Function]',\n    genTag = '[object GeneratorFunction]',\n    proxyTag = '[object Proxy]';\n\n/**\n * Checks if `value` is classified as a `Function` object.\n *\n * @static\n * @memberOf _\n * @since 0.1.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is a function, else `false`.\n * @example\n *\n * _.isFunction(_);\n * // => true\n *\n * _.isFunction(/abc/);\n * // => false\n */\nfunction isFunction(value) {\n  if (!isObject(value)) {\n    return false;\n  }\n  // The use of `Object#toString` avoids issues with the `typeof` operator\n  // in Safari 9 which returns 'object' for typed arrays and other constructors.\n  var tag = baseGetTag(value);\n  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;\n}\n\nmodule.exports = isFunction;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWNrYWdlcy93ZWJ2aXotY29yZS9ub2RlX21vZHVsZXMvbG9kYXNoL2lzRnVuY3Rpb24uanMuanMiLCJzb3VyY2VzIjpbIi9ob21lL25vZGUvd2Vidml6L3BhY2thZ2VzL3dlYnZpei1jb3JlL25vZGVfbW9kdWxlcy9sb2Rhc2gvaXNGdW5jdGlvbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgYmFzZUdldFRhZyA9IHJlcXVpcmUoJy4vX2Jhc2VHZXRUYWcnKSxcbiAgICBpc09iamVjdCA9IHJlcXVpcmUoJy4vaXNPYmplY3QnKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGFzeW5jVGFnID0gJ1tvYmplY3QgQXN5bmNGdW5jdGlvbl0nLFxuICAgIGZ1bmNUYWcgPSAnW29iamVjdCBGdW5jdGlvbl0nLFxuICAgIGdlblRhZyA9ICdbb2JqZWN0IEdlbmVyYXRvckZ1bmN0aW9uXScsXG4gICAgcHJveHlUYWcgPSAnW29iamVjdCBQcm94eV0nO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgRnVuY3Rpb25gIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIGZ1bmN0aW9uLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNGdW5jdGlvbihfKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzRnVuY3Rpb24oL2FiYy8pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGdW5jdGlvbih2YWx1ZSkge1xuICBpZiAoIWlzT2JqZWN0KHZhbHVlKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICAvLyBUaGUgdXNlIG9mIGBPYmplY3QjdG9TdHJpbmdgIGF2b2lkcyBpc3N1ZXMgd2l0aCB0aGUgYHR5cGVvZmAgb3BlcmF0b3JcbiAgLy8gaW4gU2FmYXJpIDkgd2hpY2ggcmV0dXJucyAnb2JqZWN0JyBmb3IgdHlwZWQgYXJyYXlzIGFuZCBvdGhlciBjb25zdHJ1Y3RvcnMuXG4gIHZhciB0YWcgPSBiYXNlR2V0VGFnKHZhbHVlKTtcbiAgcmV0dXJuIHRhZyA9PSBmdW5jVGFnIHx8IHRhZyA9PSBnZW5UYWcgfHwgdGFnID09IGFzeW5jVGFnIHx8IHRhZyA9PSBwcm94eVRhZztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0Z1bmN0aW9uO1xuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./packages/webviz-core/node_modules/lodash/isFunction.js\n");

/***/ }),

/***/ "./packages/webviz-core/node_modules/lodash/isObject.js":
/*!**************************************************************!*\
  !*** ./packages/webviz-core/node_modules/lodash/isObject.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Checks if `value` is the\n * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)\n * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)\n *\n * @static\n * @memberOf _\n * @since 0.1.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is an object, else `false`.\n * @example\n *\n * _.isObject({});\n * // => true\n *\n * _.isObject([1, 2, 3]);\n * // => true\n *\n * _.isObject(_.noop);\n * // => true\n *\n * _.isObject(null);\n * // => false\n */\nfunction isObject(value) {\n  var type = typeof value;\n  return value != null && (type == 'object' || type == 'function');\n}\n\nmodule.exports = isObject;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWNrYWdlcy93ZWJ2aXotY29yZS9ub2RlX21vZHVsZXMvbG9kYXNoL2lzT2JqZWN0LmpzLmpzIiwic291cmNlcyI6WyIvaG9tZS9ub2RlL3dlYnZpei9wYWNrYWdlcy93ZWJ2aXotY29yZS9ub2RlX21vZHVsZXMvbG9kYXNoL2lzT2JqZWN0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgdGhlXG4gKiBbbGFuZ3VhZ2UgdHlwZV0oaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLWVjbWFzY3JpcHQtbGFuZ3VhZ2UtdHlwZXMpXG4gKiBvZiBgT2JqZWN0YC4gKGUuZy4gYXJyYXlzLCBmdW5jdGlvbnMsIG9iamVjdHMsIHJlZ2V4ZXMsIGBuZXcgTnVtYmVyKDApYCwgYW5kIGBuZXcgU3RyaW5nKCcnKWApXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3Qoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KF8ubm9vcCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiAodHlwZSA9PSAnb2JqZWN0JyB8fCB0eXBlID09ICdmdW5jdGlvbicpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzT2JqZWN0O1xuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./packages/webviz-core/node_modules/lodash/isObject.js\n");

/***/ }),

/***/ "./packages/webviz-core/node_modules/lodash/isObjectLike.js":
/*!******************************************************************!*\
  !*** ./packages/webviz-core/node_modules/lodash/isObjectLike.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Checks if `value` is object-like. A value is object-like if it's not `null`\n * and has a `typeof` result of \"object\".\n *\n * @static\n * @memberOf _\n * @since 4.0.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is object-like, else `false`.\n * @example\n *\n * _.isObjectLike({});\n * // => true\n *\n * _.isObjectLike([1, 2, 3]);\n * // => true\n *\n * _.isObjectLike(_.noop);\n * // => false\n *\n * _.isObjectLike(null);\n * // => false\n */\nfunction isObjectLike(value) {\n  return value != null && typeof value == 'object';\n}\n\nmodule.exports = isObjectLike;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWNrYWdlcy93ZWJ2aXotY29yZS9ub2RlX21vZHVsZXMvbG9kYXNoL2lzT2JqZWN0TGlrZS5qcy5qcyIsInNvdXJjZXMiOlsiL2hvbWUvbm9kZS93ZWJ2aXovcGFja2FnZXMvd2Vidml6LWNvcmUvbm9kZV9tb2R1bGVzL2xvZGFzaC9pc09iamVjdExpa2UuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS4gQSB2YWx1ZSBpcyBvYmplY3QtbGlrZSBpZiBpdCdzIG5vdCBgbnVsbGBcbiAqIGFuZCBoYXMgYSBgdHlwZW9mYCByZXN1bHQgb2YgXCJvYmplY3RcIi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZSh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNPYmplY3RMaWtlO1xuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./packages/webviz-core/node_modules/lodash/isObjectLike.js\n");

/***/ }),

/***/ "./packages/webviz-core/node_modules/lodash/isSymbol.js":
/*!**************************************************************!*\
  !*** ./packages/webviz-core/node_modules/lodash/isSymbol.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ \"./packages/webviz-core/node_modules/lodash/_baseGetTag.js\"),\n    isObjectLike = __webpack_require__(/*! ./isObjectLike */ \"./packages/webviz-core/node_modules/lodash/isObjectLike.js\");\n\n/** `Object#toString` result references. */\nvar symbolTag = '[object Symbol]';\n\n/**\n * Checks if `value` is classified as a `Symbol` primitive or object.\n *\n * @static\n * @memberOf _\n * @since 4.0.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.\n * @example\n *\n * _.isSymbol(Symbol.iterator);\n * // => true\n *\n * _.isSymbol('abc');\n * // => false\n */\nfunction isSymbol(value) {\n  return typeof value == 'symbol' ||\n    (isObjectLike(value) && baseGetTag(value) == symbolTag);\n}\n\nmodule.exports = isSymbol;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWNrYWdlcy93ZWJ2aXotY29yZS9ub2RlX21vZHVsZXMvbG9kYXNoL2lzU3ltYm9sLmpzLmpzIiwic291cmNlcyI6WyIvaG9tZS9ub2RlL3dlYnZpei9wYWNrYWdlcy93ZWJ2aXotY29yZS9ub2RlX21vZHVsZXMvbG9kYXNoL2lzU3ltYm9sLmpzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBiYXNlR2V0VGFnID0gcmVxdWlyZSgnLi9fYmFzZUdldFRhZycpLFxuICAgIGlzT2JqZWN0TGlrZSA9IHJlcXVpcmUoJy4vaXNPYmplY3RMaWtlJyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBzeW1ib2xUYWcgPSAnW29iamVjdCBTeW1ib2xdJztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYFN5bWJvbGAgcHJpbWl0aXZlIG9yIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHN5bWJvbCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzU3ltYm9sKFN5bWJvbC5pdGVyYXRvcik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1N5bWJvbCgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N5bWJvbCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdzeW1ib2wnIHx8XG4gICAgKGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgYmFzZUdldFRhZyh2YWx1ZSkgPT0gc3ltYm9sVGFnKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc1N5bWJvbDtcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./packages/webviz-core/node_modules/lodash/isSymbol.js\n");

/***/ }),

/***/ "./packages/webviz-core/node_modules/lodash/memoize.js":
/*!*************************************************************!*\
  !*** ./packages/webviz-core/node_modules/lodash/memoize.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var MapCache = __webpack_require__(/*! ./_MapCache */ \"./packages/webviz-core/node_modules/lodash/_MapCache.js\");\n\n/** Error message constants. */\nvar FUNC_ERROR_TEXT = 'Expected a function';\n\n/**\n * Creates a function that memoizes the result of `func`. If `resolver` is\n * provided, it determines the cache key for storing the result based on the\n * arguments provided to the memoized function. By default, the first argument\n * provided to the memoized function is used as the map cache key. The `func`\n * is invoked with the `this` binding of the memoized function.\n *\n * **Note:** The cache is exposed as the `cache` property on the memoized\n * function. Its creation may be customized by replacing the `_.memoize.Cache`\n * constructor with one whose instances implement the\n * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)\n * method interface of `clear`, `delete`, `get`, `has`, and `set`.\n *\n * @static\n * @memberOf _\n * @since 0.1.0\n * @category Function\n * @param {Function} func The function to have its output memoized.\n * @param {Function} [resolver] The function to resolve the cache key.\n * @returns {Function} Returns the new memoized function.\n * @example\n *\n * var object = { 'a': 1, 'b': 2 };\n * var other = { 'c': 3, 'd': 4 };\n *\n * var values = _.memoize(_.values);\n * values(object);\n * // => [1, 2]\n *\n * values(other);\n * // => [3, 4]\n *\n * object.a = 2;\n * values(object);\n * // => [1, 2]\n *\n * // Modify the result cache.\n * values.cache.set(object, ['a', 'b']);\n * values(object);\n * // => ['a', 'b']\n *\n * // Replace `_.memoize.Cache`.\n * _.memoize.Cache = WeakMap;\n */\nfunction memoize(func, resolver) {\n  if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {\n    throw new TypeError(FUNC_ERROR_TEXT);\n  }\n  var memoized = function() {\n    var args = arguments,\n        key = resolver ? resolver.apply(this, args) : args[0],\n        cache = memoized.cache;\n\n    if (cache.has(key)) {\n      return cache.get(key);\n    }\n    var result = func.apply(this, args);\n    memoized.cache = cache.set(key, result) || cache;\n    return result;\n  };\n  memoized.cache = new (memoize.Cache || MapCache);\n  return memoized;\n}\n\n// Expose `MapCache`.\nmemoize.Cache = MapCache;\n\nmodule.exports = memoize;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWNrYWdlcy93ZWJ2aXotY29yZS9ub2RlX21vZHVsZXMvbG9kYXNoL21lbW9pemUuanMuanMiLCJzb3VyY2VzIjpbIi9ob21lL25vZGUvd2Vidml6L3BhY2thZ2VzL3dlYnZpei1jb3JlL25vZGVfbW9kdWxlcy9sb2Rhc2gvbWVtb2l6ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgTWFwQ2FjaGUgPSByZXF1aXJlKCcuL19NYXBDYWNoZScpO1xuXG4vKiogRXJyb3IgbWVzc2FnZSBjb25zdGFudHMuICovXG52YXIgRlVOQ19FUlJPUl9URVhUID0gJ0V4cGVjdGVkIGEgZnVuY3Rpb24nO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IG1lbW9pemVzIHRoZSByZXN1bHQgb2YgYGZ1bmNgLiBJZiBgcmVzb2x2ZXJgIGlzXG4gKiBwcm92aWRlZCwgaXQgZGV0ZXJtaW5lcyB0aGUgY2FjaGUga2V5IGZvciBzdG9yaW5nIHRoZSByZXN1bHQgYmFzZWQgb24gdGhlXG4gKiBhcmd1bWVudHMgcHJvdmlkZWQgdG8gdGhlIG1lbW9pemVkIGZ1bmN0aW9uLiBCeSBkZWZhdWx0LCB0aGUgZmlyc3QgYXJndW1lbnRcbiAqIHByb3ZpZGVkIHRvIHRoZSBtZW1vaXplZCBmdW5jdGlvbiBpcyB1c2VkIGFzIHRoZSBtYXAgY2FjaGUga2V5LiBUaGUgYGZ1bmNgXG4gKiBpcyBpbnZva2VkIHdpdGggdGhlIGB0aGlzYCBiaW5kaW5nIG9mIHRoZSBtZW1vaXplZCBmdW5jdGlvbi5cbiAqXG4gKiAqKk5vdGU6KiogVGhlIGNhY2hlIGlzIGV4cG9zZWQgYXMgdGhlIGBjYWNoZWAgcHJvcGVydHkgb24gdGhlIG1lbW9pemVkXG4gKiBmdW5jdGlvbi4gSXRzIGNyZWF0aW9uIG1heSBiZSBjdXN0b21pemVkIGJ5IHJlcGxhY2luZyB0aGUgYF8ubWVtb2l6ZS5DYWNoZWBcbiAqIGNvbnN0cnVjdG9yIHdpdGggb25lIHdob3NlIGluc3RhbmNlcyBpbXBsZW1lbnQgdGhlXG4gKiBbYE1hcGBdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXByb3BlcnRpZXMtb2YtdGhlLW1hcC1wcm90b3R5cGUtb2JqZWN0KVxuICogbWV0aG9kIGludGVyZmFjZSBvZiBgY2xlYXJgLCBgZGVsZXRlYCwgYGdldGAsIGBoYXNgLCBhbmQgYHNldGAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBoYXZlIGl0cyBvdXRwdXQgbWVtb2l6ZWQuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbcmVzb2x2ZXJdIFRoZSBmdW5jdGlvbiB0byByZXNvbHZlIHRoZSBjYWNoZSBrZXkuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBtZW1vaXplZCBmdW5jdGlvbi5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ2EnOiAxLCAnYic6IDIgfTtcbiAqIHZhciBvdGhlciA9IHsgJ2MnOiAzLCAnZCc6IDQgfTtcbiAqXG4gKiB2YXIgdmFsdWVzID0gXy5tZW1vaXplKF8udmFsdWVzKTtcbiAqIHZhbHVlcyhvYmplY3QpO1xuICogLy8gPT4gWzEsIDJdXG4gKlxuICogdmFsdWVzKG90aGVyKTtcbiAqIC8vID0+IFszLCA0XVxuICpcbiAqIG9iamVjdC5hID0gMjtcbiAqIHZhbHVlcyhvYmplY3QpO1xuICogLy8gPT4gWzEsIDJdXG4gKlxuICogLy8gTW9kaWZ5IHRoZSByZXN1bHQgY2FjaGUuXG4gKiB2YWx1ZXMuY2FjaGUuc2V0KG9iamVjdCwgWydhJywgJ2InXSk7XG4gKiB2YWx1ZXMob2JqZWN0KTtcbiAqIC8vID0+IFsnYScsICdiJ11cbiAqXG4gKiAvLyBSZXBsYWNlIGBfLm1lbW9pemUuQ2FjaGVgLlxuICogXy5tZW1vaXplLkNhY2hlID0gV2Vha01hcDtcbiAqL1xuZnVuY3Rpb24gbWVtb2l6ZShmdW5jLCByZXNvbHZlcikge1xuICBpZiAodHlwZW9mIGZ1bmMgIT0gJ2Z1bmN0aW9uJyB8fCAocmVzb2x2ZXIgIT0gbnVsbCAmJiB0eXBlb2YgcmVzb2x2ZXIgIT0gJ2Z1bmN0aW9uJykpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKEZVTkNfRVJST1JfVEVYVCk7XG4gIH1cbiAgdmFyIG1lbW9pemVkID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGFyZ3MgPSBhcmd1bWVudHMsXG4gICAgICAgIGtleSA9IHJlc29sdmVyID8gcmVzb2x2ZXIuYXBwbHkodGhpcywgYXJncykgOiBhcmdzWzBdLFxuICAgICAgICBjYWNoZSA9IG1lbW9pemVkLmNhY2hlO1xuXG4gICAgaWYgKGNhY2hlLmhhcyhrZXkpKSB7XG4gICAgICByZXR1cm4gY2FjaGUuZ2V0KGtleSk7XG4gICAgfVxuICAgIHZhciByZXN1bHQgPSBmdW5jLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIG1lbW9pemVkLmNhY2hlID0gY2FjaGUuc2V0KGtleSwgcmVzdWx0KSB8fCBjYWNoZTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuICBtZW1vaXplZC5jYWNoZSA9IG5ldyAobWVtb2l6ZS5DYWNoZSB8fCBNYXBDYWNoZSk7XG4gIHJldHVybiBtZW1vaXplZDtcbn1cblxuLy8gRXhwb3NlIGBNYXBDYWNoZWAuXG5tZW1vaXplLkNhY2hlID0gTWFwQ2FjaGU7XG5cbm1vZHVsZS5leHBvcnRzID0gbWVtb2l6ZTtcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./packages/webviz-core/node_modules/lodash/memoize.js\n");

/***/ }),

/***/ "./packages/webviz-core/node_modules/lodash/toNumber.js":
/*!**************************************************************!*\
  !*** ./packages/webviz-core/node_modules/lodash/toNumber.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isObject = __webpack_require__(/*! ./isObject */ \"./packages/webviz-core/node_modules/lodash/isObject.js\"),\n    isSymbol = __webpack_require__(/*! ./isSymbol */ \"./packages/webviz-core/node_modules/lodash/isSymbol.js\");\n\n/** Used as references for various `Number` constants. */\nvar NAN = 0 / 0;\n\n/** Used to match leading and trailing whitespace. */\nvar reTrim = /^\\s+|\\s+$/g;\n\n/** Used to detect bad signed hexadecimal string values. */\nvar reIsBadHex = /^[-+]0x[0-9a-f]+$/i;\n\n/** Used to detect binary string values. */\nvar reIsBinary = /^0b[01]+$/i;\n\n/** Used to detect octal string values. */\nvar reIsOctal = /^0o[0-7]+$/i;\n\n/** Built-in method references without a dependency on `root`. */\nvar freeParseInt = parseInt;\n\n/**\n * Converts `value` to a number.\n *\n * @static\n * @memberOf _\n * @since 4.0.0\n * @category Lang\n * @param {*} value The value to process.\n * @returns {number} Returns the number.\n * @example\n *\n * _.toNumber(3.2);\n * // => 3.2\n *\n * _.toNumber(Number.MIN_VALUE);\n * // => 5e-324\n *\n * _.toNumber(Infinity);\n * // => Infinity\n *\n * _.toNumber('3.2');\n * // => 3.2\n */\nfunction toNumber(value) {\n  if (typeof value == 'number') {\n    return value;\n  }\n  if (isSymbol(value)) {\n    return NAN;\n  }\n  if (isObject(value)) {\n    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;\n    value = isObject(other) ? (other + '') : other;\n  }\n  if (typeof value != 'string') {\n    return value === 0 ? value : +value;\n  }\n  value = value.replace(reTrim, '');\n  var isBinary = reIsBinary.test(value);\n  return (isBinary || reIsOctal.test(value))\n    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)\n    : (reIsBadHex.test(value) ? NAN : +value);\n}\n\nmodule.exports = toNumber;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWNrYWdlcy93ZWJ2aXotY29yZS9ub2RlX21vZHVsZXMvbG9kYXNoL3RvTnVtYmVyLmpzLmpzIiwic291cmNlcyI6WyIvaG9tZS9ub2RlL3dlYnZpei9wYWNrYWdlcy93ZWJ2aXotY29yZS9ub2RlX21vZHVsZXMvbG9kYXNoL3RvTnVtYmVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vaXNPYmplY3QnKSxcbiAgICBpc1N5bWJvbCA9IHJlcXVpcmUoJy4vaXNTeW1ib2wnKTtcblxuLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG52YXIgTkFOID0gMCAvIDA7XG5cbi8qKiBVc2VkIHRvIG1hdGNoIGxlYWRpbmcgYW5kIHRyYWlsaW5nIHdoaXRlc3BhY2UuICovXG52YXIgcmVUcmltID0gL15cXHMrfFxccyskL2c7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBiYWQgc2lnbmVkIGhleGFkZWNpbWFsIHN0cmluZyB2YWx1ZXMuICovXG52YXIgcmVJc0JhZEhleCA9IC9eWy0rXTB4WzAtOWEtZl0rJC9pO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgYmluYXJ5IHN0cmluZyB2YWx1ZXMuICovXG52YXIgcmVJc0JpbmFyeSA9IC9eMGJbMDFdKyQvaTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG9jdGFsIHN0cmluZyB2YWx1ZXMuICovXG52YXIgcmVJc09jdGFsID0gL14wb1swLTddKyQvaTtcblxuLyoqIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIHdpdGhvdXQgYSBkZXBlbmRlbmN5IG9uIGByb290YC4gKi9cbnZhciBmcmVlUGFyc2VJbnQgPSBwYXJzZUludDtcblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgbnVtYmVyLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBwcm9jZXNzLlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgbnVtYmVyLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnRvTnVtYmVyKDMuMik7XG4gKiAvLyA9PiAzLjJcbiAqXG4gKiBfLnRvTnVtYmVyKE51bWJlci5NSU5fVkFMVUUpO1xuICogLy8gPT4gNWUtMzI0XG4gKlxuICogXy50b051bWJlcihJbmZpbml0eSk7XG4gKiAvLyA9PiBJbmZpbml0eVxuICpcbiAqIF8udG9OdW1iZXIoJzMuMicpO1xuICogLy8gPT4gMy4yXG4gKi9cbmZ1bmN0aW9uIHRvTnVtYmVyKHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgaWYgKGlzU3ltYm9sKHZhbHVlKSkge1xuICAgIHJldHVybiBOQU47XG4gIH1cbiAgaWYgKGlzT2JqZWN0KHZhbHVlKSkge1xuICAgIHZhciBvdGhlciA9IHR5cGVvZiB2YWx1ZS52YWx1ZU9mID09ICdmdW5jdGlvbicgPyB2YWx1ZS52YWx1ZU9mKCkgOiB2YWx1ZTtcbiAgICB2YWx1ZSA9IGlzT2JqZWN0KG90aGVyKSA/IChvdGhlciArICcnKSA6IG90aGVyO1xuICB9XG4gIGlmICh0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IDAgPyB2YWx1ZSA6ICt2YWx1ZTtcbiAgfVxuICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UocmVUcmltLCAnJyk7XG4gIHZhciBpc0JpbmFyeSA9IHJlSXNCaW5hcnkudGVzdCh2YWx1ZSk7XG4gIHJldHVybiAoaXNCaW5hcnkgfHwgcmVJc09jdGFsLnRlc3QodmFsdWUpKVxuICAgID8gZnJlZVBhcnNlSW50KHZhbHVlLnNsaWNlKDIpLCBpc0JpbmFyeSA/IDIgOiA4KVxuICAgIDogKHJlSXNCYWRIZXgudGVzdCh2YWx1ZSkgPyBOQU4gOiArdmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRvTnVtYmVyO1xuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./packages/webviz-core/node_modules/lodash/toNumber.js\n");

/***/ }),

/***/ "./packages/webviz-core/src/panels/ImageView/CameraModel.js":
/*!******************************************************************!*\
  !*** ./packages/webviz-core/src/panels/ImageView/CameraModel.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = void 0;\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n//\n//  Copyright (c) 2018-present, Cruise LLC\n//\n//  This source code is licensed under the Apache License, Version 2.0,\n//  found in the LICENSE file in the root directory of this source tree.\n//  You may not use this file except in compliance with the License.\nconst DISTORTION_STATE = {\n  NONE: \"NONE\",\n  CALIBRATED: \"CALIBRATED\"\n};\n\n// Essentially a copy of ROSPinholeCameraModel\n// but only the relevant methods, i.e.\n// fromCameraInfo() and unrectifyPoint()\n// http://docs.ros.org/diamondback/api/image_geometry/html/c++/pinhole__camera__model_8cpp_source.html\nclass PinholeCameraModel {\n  // Mostly copied from `fromCameraInfo`\n  // http://docs.ros.org/diamondback/api/image_geometry/html/c++/pinhole__camera__model_8cpp_source.html#l00062\n  constructor(info) {\n    _defineProperty(this, \"_distortionState\", DISTORTION_STATE.NONE);\n\n    _defineProperty(this, \"D\", []);\n\n    _defineProperty(this, \"K\", []);\n\n    _defineProperty(this, \"P\", []);\n\n    _defineProperty(this, \"R\", []);\n\n    const {\n      binning_x,\n      binning_y,\n      roi,\n      distortion_model,\n      D,\n      K,\n      P,\n      R\n    } = info;\n\n    if (distortion_model === \"\") {\n      // Allow CameraInfo with no model to indicate no distortion\n      this._distortionState = DISTORTION_STATE.NONE;\n      return;\n    } // Binning = 0 is considered the same as binning = 1 (no binning).\n\n\n    const binningX = binning_x ? binning_x : 1;\n    const binningY = binning_y ? binning_y : 1;\n    const adjustBinning = binningX > 1 || binningY > 1;\n    const adjustRoi = roi.x_offset !== 0 || roi.y_offset !== 0;\n\n    if (adjustBinning || adjustRoi) {\n      throw new Error(\"Failed to initialize camera model: unable to handle adjusted binning and adjusted roi camera models.\");\n    } // See comments about Tx = 0, Ty = 0 in\n    // http://docs.ros.org/melodic/api/sensor_msgs/html/msg/CameraInfo.html\n\n\n    if (P[3] !== 0 || P[7] !== 0) {\n      throw new Error(\"Failed to initialize camera model: projection matrix implies non monocular camera - cannot handle at this time.\");\n    } // Figure out how to handle the distortion\n\n\n    if (distortion_model === \"plumb_bob\" || distortion_model === \"rational_polynomial\") {\n      this._distortionState = D[0] === 0.0 ? DISTORTION_STATE.NONE : DISTORTION_STATE.CALIBRATED;\n    } else {\n      throw new Error(\"Failed to initialize camera model: distortion_model is unknown, only plumb_bob and rational_polynomial are supported.\");\n    }\n\n    this.D = D;\n    this.P = P;\n    this.R = R;\n    this.K = K;\n  }\n\n  unrectifyPoint({\n    x: rectX,\n    y: rectY\n  }) {\n    if (this._distortionState === DISTORTION_STATE.NONE) {\n      return {\n        x: rectX,\n        y: rectY\n      };\n    }\n\n    const {\n      P,\n      R,\n      D,\n      K\n    } = this;\n    const fx = P[0];\n    const fy = P[5];\n    const cx = P[2];\n    const cy = P[6];\n    const tx = P[3];\n    const ty = P[7]; // Formulae from docs for cv::initUndistortRectifyMap,\n    // http://opencv.willowgarage.com/documentation/cpp/camera_calibration_and_3d_reconstruction.html\n    // x <- (u - c'x) / f'x\n    // y <- (v - c'y) / f'y\n    // c'x, f'x, etc. (primed) come from \"new camera matrix\" P[0:3, 0:3].\n\n    const x1 = (rectX - cx - tx) / fx;\n    const y1 = (rectY - cy - ty) / fy; // [X Y W]^T <- R^-1 * [x y 1]^T\n\n    const X = R[0] * x1 + R[1] * y1 + R[2];\n    const Y = R[3] * x1 + R[4] * y1 + R[5];\n    const W = R[6] * x1 + R[7] * y1 + R[8];\n    const xp = X / W;\n    const yp = Y / W; // x'' <- x'(1+k1*r^2+k2*r^4+k3*r^6) + 2p1*x'*y' + p2(r^2+2x'^2)\n    // y'' <- y'(1+k1*r^2+k2*r^4+k3*r^6) + p1(r^2+2y'^2) + 2p2*x'*y'\n    // where r^2 = x'^2 + y'^2\n\n    const r2 = xp * xp + yp * yp;\n    const r4 = r2 * r2;\n    const r6 = r4 * r2;\n    const a1 = 2 * xp * yp;\n    const k1 = D[0];\n    const k2 = D[1];\n    const p1 = D[2];\n    const p2 = D[3];\n    const k3 = D[4];\n    let barrel_correction = 1 + k1 * r2 + k2 * r4 + k3 * r6;\n\n    if (D.length === 8) {\n      barrel_correction /= 1.0 + D[5] * r2 + D[6] * r4 + D[7] * r6;\n    }\n\n    const xpp = xp * barrel_correction + p1 * a1 + p2 * (r2 + 2 * (xp * xp));\n    const ypp = yp * barrel_correction + p1 * (r2 + 2 * (yp * yp)) + p2 * a1; // map_x(u,v) <- x''fx + cx\n    // map_y(u,v) <- y''fy + cy\n    // cx, fx, etc. come from original camera matrix K.\n\n    return {\n      x: xpp * K[0] + K[2],\n      y: ypp * K[4] + K[5]\n    };\n  }\n\n}\n\nexports.default = PinholeCameraModel;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWNrYWdlcy93ZWJ2aXotY29yZS9zcmMvcGFuZWxzL0ltYWdlVmlldy9DYW1lcmFNb2RlbC5qcy5qcyIsInNvdXJjZXMiOlsiL2hvbWUvbm9kZS93ZWJ2aXovcGFja2FnZXMvd2Vidml6LWNvcmUvc3JjL3BhbmVscy9JbWFnZVZpZXcvQ2FtZXJhTW9kZWwuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQGZsb3dcbi8vXG4vLyAgQ29weXJpZ2h0IChjKSAyMDE4LXByZXNlbnQsIENydWlzZSBMTENcbi8vXG4vLyAgVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLFxuLy8gIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4vLyAgWW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuXG5pbXBvcnQgdHlwZSB7IFBvaW50LCBDYW1lcmFJbmZvIH0gZnJvbSBcIndlYnZpei1jb3JlL3NyYy90eXBlcy9NZXNzYWdlc1wiO1xuXG5jb25zdCBESVNUT1JUSU9OX1NUQVRFID0ge1xuICBOT05FOiBcIk5PTkVcIixcbiAgQ0FMSUJSQVRFRDogXCJDQUxJQlJBVEVEXCIsXG59O1xuXG50eXBlIERpc3RvcnRpb25TdGF0ZSA9ICRWYWx1ZXM8dHlwZW9mIERJU1RPUlRJT05fU1RBVEU+O1xuXG4vLyBFc3NlbnRpYWxseSBhIGNvcHkgb2YgUk9TUGluaG9sZUNhbWVyYU1vZGVsXG4vLyBidXQgb25seSB0aGUgcmVsZXZhbnQgbWV0aG9kcywgaS5lLlxuLy8gZnJvbUNhbWVyYUluZm8oKSBhbmQgdW5yZWN0aWZ5UG9pbnQoKVxuLy8gaHR0cDovL2RvY3Mucm9zLm9yZy9kaWFtb25kYmFjay9hcGkvaW1hZ2VfZ2VvbWV0cnkvaHRtbC9jKysvcGluaG9sZV9fY2FtZXJhX19tb2RlbF84Y3BwX3NvdXJjZS5odG1sXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQaW5ob2xlQ2FtZXJhTW9kZWwge1xuICBfZGlzdG9ydGlvblN0YXRlOiBEaXN0b3J0aW9uU3RhdGUgPSBESVNUT1JUSU9OX1NUQVRFLk5PTkU7XG4gIEQ6IG51bWJlcltdID0gW107XG4gIEs6IG51bWJlcltdID0gW107XG4gIFA6IG51bWJlcltdID0gW107XG4gIFI6IG51bWJlcltdID0gW107XG5cbiAgLy8gTW9zdGx5IGNvcGllZCBmcm9tIGBmcm9tQ2FtZXJhSW5mb2BcbiAgLy8gaHR0cDovL2RvY3Mucm9zLm9yZy9kaWFtb25kYmFjay9hcGkvaW1hZ2VfZ2VvbWV0cnkvaHRtbC9jKysvcGluaG9sZV9fY2FtZXJhX19tb2RlbF84Y3BwX3NvdXJjZS5odG1sI2wwMDA2MlxuICBjb25zdHJ1Y3RvcihpbmZvOiBDYW1lcmFJbmZvKSB7XG4gICAgY29uc3QgeyBiaW5uaW5nX3gsIGJpbm5pbmdfeSwgcm9pLCBkaXN0b3J0aW9uX21vZGVsLCBELCBLLCBQLCBSIH0gPSBpbmZvO1xuXG4gICAgaWYgKGRpc3RvcnRpb25fbW9kZWwgPT09IFwiXCIpIHtcbiAgICAgIC8vIEFsbG93IENhbWVyYUluZm8gd2l0aCBubyBtb2RlbCB0byBpbmRpY2F0ZSBubyBkaXN0b3J0aW9uXG4gICAgICB0aGlzLl9kaXN0b3J0aW9uU3RhdGUgPSBESVNUT1JUSU9OX1NUQVRFLk5PTkU7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gQmlubmluZyA9IDAgaXMgY29uc2lkZXJlZCB0aGUgc2FtZSBhcyBiaW5uaW5nID0gMSAobm8gYmlubmluZykuXG4gICAgY29uc3QgYmlubmluZ1ggPSBiaW5uaW5nX3ggPyBiaW5uaW5nX3ggOiAxO1xuICAgIGNvbnN0IGJpbm5pbmdZID0gYmlubmluZ195ID8gYmlubmluZ195IDogMTtcblxuICAgIGNvbnN0IGFkanVzdEJpbm5pbmcgPSBiaW5uaW5nWCA+IDEgfHwgYmlubmluZ1kgPiAxO1xuICAgIGNvbnN0IGFkanVzdFJvaSA9IHJvaS54X29mZnNldCAhPT0gMCB8fCByb2kueV9vZmZzZXQgIT09IDA7XG5cbiAgICBpZiAoYWRqdXN0QmlubmluZyB8fCBhZGp1c3RSb2kpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgXCJGYWlsZWQgdG8gaW5pdGlhbGl6ZSBjYW1lcmEgbW9kZWw6IHVuYWJsZSB0byBoYW5kbGUgYWRqdXN0ZWQgYmlubmluZyBhbmQgYWRqdXN0ZWQgcm9pIGNhbWVyYSBtb2RlbHMuXCJcbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gU2VlIGNvbW1lbnRzIGFib3V0IFR4ID0gMCwgVHkgPSAwIGluXG4gICAgLy8gaHR0cDovL2RvY3Mucm9zLm9yZy9tZWxvZGljL2FwaS9zZW5zb3JfbXNncy9odG1sL21zZy9DYW1lcmFJbmZvLmh0bWxcbiAgICBpZiAoUFszXSAhPT0gMCB8fCBQWzddICE9PSAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIFwiRmFpbGVkIHRvIGluaXRpYWxpemUgY2FtZXJhIG1vZGVsOiBwcm9qZWN0aW9uIG1hdHJpeCBpbXBsaWVzIG5vbiBtb25vY3VsYXIgY2FtZXJhIC0gY2Fubm90IGhhbmRsZSBhdCB0aGlzIHRpbWUuXCJcbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gRmlndXJlIG91dCBob3cgdG8gaGFuZGxlIHRoZSBkaXN0b3J0aW9uXG4gICAgaWYgKGRpc3RvcnRpb25fbW9kZWwgPT09IFwicGx1bWJfYm9iXCIgfHwgZGlzdG9ydGlvbl9tb2RlbCA9PT0gXCJyYXRpb25hbF9wb2x5bm9taWFsXCIpIHtcbiAgICAgIHRoaXMuX2Rpc3RvcnRpb25TdGF0ZSA9IERbMF0gPT09IDAuMCA/IERJU1RPUlRJT05fU1RBVEUuTk9ORSA6IERJU1RPUlRJT05fU1RBVEUuQ0FMSUJSQVRFRDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBcIkZhaWxlZCB0byBpbml0aWFsaXplIGNhbWVyYSBtb2RlbDogZGlzdG9ydGlvbl9tb2RlbCBpcyB1bmtub3duLCBvbmx5IHBsdW1iX2JvYiBhbmQgcmF0aW9uYWxfcG9seW5vbWlhbCBhcmUgc3VwcG9ydGVkLlwiXG4gICAgICApO1xuICAgIH1cbiAgICB0aGlzLkQgPSBEO1xuICAgIHRoaXMuUCA9IFA7XG4gICAgdGhpcy5SID0gUjtcbiAgICB0aGlzLksgPSBLO1xuICB9XG5cbiAgdW5yZWN0aWZ5UG9pbnQoeyB4OiByZWN0WCwgeTogcmVjdFkgfTogUG9pbnQpOiB7IHg6IG51bWJlciwgeTogbnVtYmVyIH0ge1xuICAgIGlmICh0aGlzLl9kaXN0b3J0aW9uU3RhdGUgPT09IERJU1RPUlRJT05fU1RBVEUuTk9ORSkge1xuICAgICAgcmV0dXJuIHsgeDogcmVjdFgsIHk6IHJlY3RZIH07XG4gICAgfVxuXG4gICAgY29uc3QgeyBQLCBSLCBELCBLIH0gPSB0aGlzO1xuICAgIGNvbnN0IGZ4ID0gUFswXTtcbiAgICBjb25zdCBmeSA9IFBbNV07XG4gICAgY29uc3QgY3ggPSBQWzJdO1xuICAgIGNvbnN0IGN5ID0gUFs2XTtcbiAgICBjb25zdCB0eCA9IFBbM107XG4gICAgY29uc3QgdHkgPSBQWzddO1xuXG4gICAgLy8gRm9ybXVsYWUgZnJvbSBkb2NzIGZvciBjdjo6aW5pdFVuZGlzdG9ydFJlY3RpZnlNYXAsXG4gICAgLy8gaHR0cDovL29wZW5jdi53aWxsb3dnYXJhZ2UuY29tL2RvY3VtZW50YXRpb24vY3BwL2NhbWVyYV9jYWxpYnJhdGlvbl9hbmRfM2RfcmVjb25zdHJ1Y3Rpb24uaHRtbFxuXG4gICAgLy8geCA8LSAodSAtIGMneCkgLyBmJ3hcbiAgICAvLyB5IDwtICh2IC0gYyd5KSAvIGYneVxuICAgIC8vIGMneCwgZid4LCBldGMuIChwcmltZWQpIGNvbWUgZnJvbSBcIm5ldyBjYW1lcmEgbWF0cml4XCIgUFswOjMsIDA6M10uXG4gICAgY29uc3QgeDEgPSAocmVjdFggLSBjeCAtIHR4KSAvIGZ4O1xuICAgIGNvbnN0IHkxID0gKHJlY3RZIC0gY3kgLSB0eSkgLyBmeTtcbiAgICAvLyBbWCBZIFddXlQgPC0gUl4tMSAqIFt4IHkgMV1eVFxuICAgIGNvbnN0IFggPSBSWzBdICogeDEgKyBSWzFdICogeTEgKyBSWzJdO1xuICAgIGNvbnN0IFkgPSBSWzNdICogeDEgKyBSWzRdICogeTEgKyBSWzVdO1xuICAgIGNvbnN0IFcgPSBSWzZdICogeDEgKyBSWzddICogeTEgKyBSWzhdO1xuICAgIGNvbnN0IHhwID0gWCAvIFc7XG4gICAgY29uc3QgeXAgPSBZIC8gVztcblxuICAgIC8vIHgnJyA8LSB4JygxK2sxKnJeMitrMipyXjQrazMqcl42KSArIDJwMSp4Jyp5JyArIHAyKHJeMisyeCdeMilcbiAgICAvLyB5JycgPC0geScoMStrMSpyXjIrazIqcl40K2szKnJeNikgKyBwMShyXjIrMnknXjIpICsgMnAyKngnKnknXG4gICAgLy8gd2hlcmUgcl4yID0geCdeMiArIHknXjJcbiAgICBjb25zdCByMiA9IHhwICogeHAgKyB5cCAqIHlwO1xuICAgIGNvbnN0IHI0ID0gcjIgKiByMjtcbiAgICBjb25zdCByNiA9IHI0ICogcjI7XG4gICAgY29uc3QgYTEgPSAyICogeHAgKiB5cDtcbiAgICBjb25zdCBrMSA9IERbMF07XG4gICAgY29uc3QgazIgPSBEWzFdO1xuICAgIGNvbnN0IHAxID0gRFsyXTtcbiAgICBjb25zdCBwMiA9IERbM107XG4gICAgY29uc3QgazMgPSBEWzRdO1xuICAgIGxldCBiYXJyZWxfY29ycmVjdGlvbiA9IDEgKyBrMSAqIHIyICsgazIgKiByNCArIGszICogcjY7XG4gICAgaWYgKEQubGVuZ3RoID09PSA4KSB7XG4gICAgICBiYXJyZWxfY29ycmVjdGlvbiAvPSAxLjAgKyBEWzVdICogcjIgKyBEWzZdICogcjQgKyBEWzddICogcjY7XG4gICAgfVxuICAgIGNvbnN0IHhwcCA9IHhwICogYmFycmVsX2NvcnJlY3Rpb24gKyBwMSAqIGExICsgcDIgKiAocjIgKyAyICogKHhwICogeHApKTtcbiAgICBjb25zdCB5cHAgPSB5cCAqIGJhcnJlbF9jb3JyZWN0aW9uICsgcDEgKiAocjIgKyAyICogKHlwICogeXApKSArIHAyICogYTE7XG5cbiAgICAvLyBtYXBfeCh1LHYpIDwtIHgnJ2Z4ICsgY3hcbiAgICAvLyBtYXBfeSh1LHYpIDwtIHknJ2Z5ICsgY3lcbiAgICAvLyBjeCwgZngsIGV0Yy4gY29tZSBmcm9tIG9yaWdpbmFsIGNhbWVyYSBtYXRyaXggSy5cbiAgICByZXR1cm4geyB4OiB4cHAgKiBLWzBdICsgS1syXSwgeTogeXBwICogS1s0XSArIEtbNV0gfTtcbiAgfVxufVxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFGQTtBQUNBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQU9BO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBREE7QUFDQTtBQURBO0FBQ0E7QUFEQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUdBO0FBQ0E7QUFDQTtBQURBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBekdBO0FBQ0E7QSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./packages/webviz-core/src/panels/ImageView/CameraModel.js\n");

/***/ }),

/***/ "./packages/webviz-core/src/panels/ImageView/decodings.js":
/*!****************************************************************!*\
  !*** ./packages/webviz-core/src/panels/ImageView/decodings.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.decodeYUV = decodeYUV;\nexports.decodeRGB8 = decodeRGB8;\nexports.decodeBGR8 = decodeBGR8;\nexports.decodeFloat1c = decodeFloat1c;\nexports.decodeMono8 = decodeMono8;\nexports.decodeMono16 = decodeMono16;\nexports.decodeBayerGRBG8 = exports.decodeBayerGBRG8 = exports.decodeBayerBGGR8 = exports.decodeBayerRGGB8 = void 0;\n\n//\n//  Copyright (c) 2018-present, Cruise LLC\n//\n//  This source code is licensed under the Apache License, Version 2.0,\n//  found in the LICENSE file in the root directory of this source tree.\n//  You may not use this file except in compliance with the License.\nfunction decodeYUV(yuv, width, height, output) {\n  let c = 0;\n  let off = 0; // populate 2 pixels at a time\n\n  const max = height * width;\n\n  for (let r = 0; r <= max; r += 2) {\n    const u = yuv[off] - 128;\n    const y1 = yuv[off + 1];\n    const v = yuv[off + 2] - 128;\n    const y2 = yuv[off + 3]; // rgba\n\n    output[c] = y1 + 1.402 * v;\n    output[c + 1] = y1 - 0.34414 * u - 0.71414 * v;\n    output[c + 2] = y1 + 1.772 * u;\n    output[c + 3] = 255; // rgba\n\n    output[c + 4] = y2 + 1.402 * v;\n    output[c + 5] = y2 - 0.34414 * u - 0.71414 * v;\n    output[c + 6] = y2 + 1.772 * u;\n    output[c + 7] = 255;\n    c += 8;\n    off += 4;\n  }\n}\n\nfunction decodeRGB8(rgb, width, height, output) {\n  let inIdx = 0;\n  let outIdx = 0;\n\n  for (let i = 0; i < width * height; i++) {\n    const r = rgb[inIdx++];\n    const g = rgb[inIdx++];\n    const b = rgb[inIdx++];\n    output[outIdx++] = r;\n    output[outIdx++] = g;\n    output[outIdx++] = b;\n    output[outIdx++] = 255;\n  }\n}\n\nfunction decodeBGR8(bgr, width, height, output) {\n  let inIdx = 0;\n  let outIdx = 0;\n\n  for (let i = 0; i < width * height; i++) {\n    const b = bgr[inIdx++];\n    const g = bgr[inIdx++];\n    const r = bgr[inIdx++];\n    output[outIdx++] = r;\n    output[outIdx++] = g;\n    output[outIdx++] = b;\n    output[outIdx++] = 255;\n  }\n}\n\nfunction decodeFloat1c(gray, width, height, is_bigendian, output) {\n  const view = new DataView(gray.buffer, gray.byteOffset);\n  let outIdx = 0;\n\n  for (let i = 0; i < width * height * 4; i += 4) {\n    const val = view.getFloat32(i, !is_bigendian) * 255;\n    output[outIdx++] = val;\n    output[outIdx++] = val;\n    output[outIdx++] = val;\n    output[outIdx++] = 255;\n  }\n}\n\nfunction decodeMono8(mono8, width, height, output) {\n  let inIdx = 0;\n  let outIdx = 0;\n\n  for (let i = 0; i < width * height; i++) {\n    const ch = mono8[inIdx++];\n    output[outIdx++] = ch;\n    output[outIdx++] = ch;\n    output[outIdx++] = ch;\n    output[outIdx++] = 255;\n  }\n}\n\nfunction decodeMono16(mono16, width, height, is_bigendian, output) {\n  const view = new DataView(mono16.buffer, mono16.byteOffset);\n  let outIdx = 0;\n\n  for (let i = 0; i < width * height * 2; i += 2) {\n    let val = view.getUint16(i, !is_bigendian); // For now, just assume values are in the range 0-10000, consistent with image_view's default.\n    // TODO: support dynamic range adjustment and/or user-selectable range\n    // References:\n    // https://github.com/ros-perception/image_pipeline/blob/42266892502427eb566a4dffa61b009346491ce7/image_view/src/nodes/image_view.cpp#L80-L88\n    // https://github.com/ros-visualization/rqt_image_view/blob/fe076acd265a05c11c04f9d04392fda951878f54/src/rqt_image_view/image_view.cpp#L582\n    // https://github.com/ros-visualization/rviz/blob/68b464fb6571b8760f91e8eca6fb933ba31190bf/src/rviz/image/ros_image_texture.cpp#L114\n\n    val = val / 10000 * 255;\n    output[outIdx++] = val;\n    output[outIdx++] = val;\n    output[outIdx++] = val;\n    output[outIdx++] = 255;\n  }\n} // Specialize the Bayer decode function to a certain encoding. For performance reasons, we use\n// new Function() -- this is about 20% faster than a switch statement and .bind().\n\n\nfunction makeSpecializedDecodeBayer(tl, tr, bl, br) {\n  // We probably can't afford real debayering/demosaicking, so do something simpler\n  // The input array look like a single-plane array of pixels.  However, each pixel represents a one particular color\n  // for a group of pixels in the 2x2 region.  For 'rggb', there color representatio for the 2x2 region looks like:\n  //\n  // R  | G0\n  // -------\n  // G1 | B\n  //\n  // In other words, a 2x2 region is represented by one R value, one B value, and two G values.  In sophisticated\n  // algorithms, each color will be weighted and interpolated to fill in the missing colors for the pixels.  These\n  // algorithms may reach beyond the local 2x2 region and use values from neighboring regions.\n  //\n  // We'll do something much simpler.  For each group of 2x2, we're replicate the R and B values for all pixels.\n  // For the two row, we'll replicate G0 for the green channels, and replicate G1 for the bottom row.\n  // eslint-disable-next-line no-new-func\n  return new Function(\"data\", \"width\", \"height\", \"output\", `\n  for (let i = 0; i < height / 2; i++) {\n    let inIdx = i * 2 * width;\n    let outTopIdx = i * 2 * width * 4; // Addresses top row\n    let outBottomIdx = (i * 2 + 1) * width * 4; // Addresses bottom row\n    for (let j = 0; j < width / 2; j++) {\n      const tl = data[inIdx++];\n      const tr = data[inIdx++];\n      const bl = data[inIdx + width - 2];\n      const br = data[inIdx + width - 1];\n\n      const ${tl} = tl;\n      const ${tr} = tr;\n      const ${bl} = bl;\n      const ${br} = br;\n\n      // Top row\n      output[outTopIdx++] = r;\n      output[outTopIdx++] = g0;\n      output[outTopIdx++] = b;\n      output[outTopIdx++] = 255;\n\n      output[outTopIdx++] = r;\n      output[outTopIdx++] = g0;\n      output[outTopIdx++] = b;\n      output[outTopIdx++] = 255;\n\n      // Bottom row\n      output[outBottomIdx++] = r;\n      output[outBottomIdx++] = g1;\n      output[outBottomIdx++] = b;\n      output[outBottomIdx++] = 255;\n\n      output[outBottomIdx++] = r;\n      output[outBottomIdx++] = g1;\n      output[outBottomIdx++] = b;\n      output[outBottomIdx++] = 255;\n    }\n  }`);\n}\n\nconst decodeBayerRGGB8 = makeSpecializedDecodeBayer(\"r\", \"g0\", \"g1\", \"b\");\nexports.decodeBayerRGGB8 = decodeBayerRGGB8;\nconst decodeBayerBGGR8 = makeSpecializedDecodeBayer(\"b\", \"g0\", \"g1\", \"r\");\nexports.decodeBayerBGGR8 = decodeBayerBGGR8;\nconst decodeBayerGBRG8 = makeSpecializedDecodeBayer(\"g0\", \"b\", \"r\", \"g1\");\nexports.decodeBayerGBRG8 = decodeBayerGBRG8;\nconst decodeBayerGRBG8 = makeSpecializedDecodeBayer(\"g0\", \"r\", \"b\", \"g1\");\nexports.decodeBayerGRBG8 = decodeBayerGRBG8;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWNrYWdlcy93ZWJ2aXotY29yZS9zcmMvcGFuZWxzL0ltYWdlVmlldy9kZWNvZGluZ3MuanMuanMiLCJzb3VyY2VzIjpbIi9ob21lL25vZGUvd2Vidml6L3BhY2thZ2VzL3dlYnZpei1jb3JlL3NyYy9wYW5lbHMvSW1hZ2VWaWV3L2RlY29kaW5ncy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBAZmxvd1xuLy9cbi8vICBDb3B5cmlnaHQgKGMpIDIwMTgtcHJlc2VudCwgQ3J1aXNlIExMQ1xuLy9cbi8vICBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAsXG4vLyAgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbi8vICBZb3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5cbmV4cG9ydCBmdW5jdGlvbiBkZWNvZGVZVVYoeXV2OiBJbnQ4QXJyYXksIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBvdXRwdXQ6IFVpbnQ4Q2xhbXBlZEFycmF5KSB7XG4gIGxldCBjID0gMDtcbiAgbGV0IG9mZiA9IDA7XG5cbiAgLy8gcG9wdWxhdGUgMiBwaXhlbHMgYXQgYSB0aW1lXG4gIGNvbnN0IG1heCA9IGhlaWdodCAqIHdpZHRoO1xuICBmb3IgKGxldCByID0gMDsgciA8PSBtYXg7IHIgKz0gMikge1xuICAgIGNvbnN0IHUgPSB5dXZbb2ZmXSAtIDEyODtcbiAgICBjb25zdCB5MSA9IHl1dltvZmYgKyAxXTtcbiAgICBjb25zdCB2ID0geXV2W29mZiArIDJdIC0gMTI4O1xuICAgIGNvbnN0IHkyID0geXV2W29mZiArIDNdO1xuXG4gICAgLy8gcmdiYVxuICAgIG91dHB1dFtjXSA9IHkxICsgMS40MDIgKiB2O1xuICAgIG91dHB1dFtjICsgMV0gPSB5MSAtIDAuMzQ0MTQgKiB1IC0gMC43MTQxNCAqIHY7XG4gICAgb3V0cHV0W2MgKyAyXSA9IHkxICsgMS43NzIgKiB1O1xuICAgIG91dHB1dFtjICsgM10gPSAyNTU7XG5cbiAgICAvLyByZ2JhXG4gICAgb3V0cHV0W2MgKyA0XSA9IHkyICsgMS40MDIgKiB2O1xuICAgIG91dHB1dFtjICsgNV0gPSB5MiAtIDAuMzQ0MTQgKiB1IC0gMC43MTQxNCAqIHY7XG4gICAgb3V0cHV0W2MgKyA2XSA9IHkyICsgMS43NzIgKiB1O1xuICAgIG91dHB1dFtjICsgN10gPSAyNTU7XG5cbiAgICBjICs9IDg7XG4gICAgb2ZmICs9IDQ7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlY29kZVJHQjgocmdiOiBVaW50OEFycmF5LCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgb3V0cHV0OiBVaW50OENsYW1wZWRBcnJheSkge1xuICBsZXQgaW5JZHggPSAwO1xuICBsZXQgb3V0SWR4ID0gMDtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IHdpZHRoICogaGVpZ2h0OyBpKyspIHtcbiAgICBjb25zdCByID0gcmdiW2luSWR4KytdO1xuICAgIGNvbnN0IGcgPSByZ2JbaW5JZHgrK107XG4gICAgY29uc3QgYiA9IHJnYltpbklkeCsrXTtcblxuICAgIG91dHB1dFtvdXRJZHgrK10gPSByO1xuICAgIG91dHB1dFtvdXRJZHgrK10gPSBnO1xuICAgIG91dHB1dFtvdXRJZHgrK10gPSBiO1xuICAgIG91dHB1dFtvdXRJZHgrK10gPSAyNTU7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlY29kZUJHUjgoYmdyOiBVaW50OEFycmF5LCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgb3V0cHV0OiBVaW50OENsYW1wZWRBcnJheSkge1xuICBsZXQgaW5JZHggPSAwO1xuICBsZXQgb3V0SWR4ID0gMDtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IHdpZHRoICogaGVpZ2h0OyBpKyspIHtcbiAgICBjb25zdCBiID0gYmdyW2luSWR4KytdO1xuICAgIGNvbnN0IGcgPSBiZ3JbaW5JZHgrK107XG4gICAgY29uc3QgciA9IGJncltpbklkeCsrXTtcblxuICAgIG91dHB1dFtvdXRJZHgrK10gPSByO1xuICAgIG91dHB1dFtvdXRJZHgrK10gPSBnO1xuICAgIG91dHB1dFtvdXRJZHgrK10gPSBiO1xuICAgIG91dHB1dFtvdXRJZHgrK10gPSAyNTU7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlY29kZUZsb2F0MWMoXG4gIGdyYXk6IFVpbnQ4QXJyYXksXG4gIHdpZHRoOiBudW1iZXIsXG4gIGhlaWdodDogbnVtYmVyLFxuICBpc19iaWdlbmRpYW46IGJvb2xlYW4sXG4gIG91dHB1dDogVWludDhDbGFtcGVkQXJyYXlcbikge1xuICBjb25zdCB2aWV3ID0gbmV3IERhdGFWaWV3KGdyYXkuYnVmZmVyLCBncmF5LmJ5dGVPZmZzZXQpO1xuXG4gIGxldCBvdXRJZHggPSAwO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHdpZHRoICogaGVpZ2h0ICogNDsgaSArPSA0KSB7XG4gICAgY29uc3QgdmFsID0gdmlldy5nZXRGbG9hdDMyKGksICFpc19iaWdlbmRpYW4pICogMjU1O1xuICAgIG91dHB1dFtvdXRJZHgrK10gPSB2YWw7XG4gICAgb3V0cHV0W291dElkeCsrXSA9IHZhbDtcbiAgICBvdXRwdXRbb3V0SWR4KytdID0gdmFsO1xuICAgIG91dHB1dFtvdXRJZHgrK10gPSAyNTU7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlY29kZU1vbm84KG1vbm84OiBVaW50OEFycmF5LCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgb3V0cHV0OiBVaW50OENsYW1wZWRBcnJheSkge1xuICBsZXQgaW5JZHggPSAwO1xuICBsZXQgb3V0SWR4ID0gMDtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IHdpZHRoICogaGVpZ2h0OyBpKyspIHtcbiAgICBjb25zdCBjaCA9IG1vbm84W2luSWR4KytdO1xuICAgIG91dHB1dFtvdXRJZHgrK10gPSBjaDtcbiAgICBvdXRwdXRbb3V0SWR4KytdID0gY2g7XG4gICAgb3V0cHV0W291dElkeCsrXSA9IGNoO1xuICAgIG91dHB1dFtvdXRJZHgrK10gPSAyNTU7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlY29kZU1vbm8xNihcbiAgbW9ubzE2OiBVaW50OEFycmF5LFxuICB3aWR0aDogbnVtYmVyLFxuICBoZWlnaHQ6IG51bWJlcixcbiAgaXNfYmlnZW5kaWFuOiBib29sZWFuLFxuICBvdXRwdXQ6IFVpbnQ4Q2xhbXBlZEFycmF5XG4pIHtcbiAgY29uc3QgdmlldyA9IG5ldyBEYXRhVmlldyhtb25vMTYuYnVmZmVyLCBtb25vMTYuYnl0ZU9mZnNldCk7XG5cbiAgbGV0IG91dElkeCA9IDA7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgd2lkdGggKiBoZWlnaHQgKiAyOyBpICs9IDIpIHtcbiAgICBsZXQgdmFsID0gdmlldy5nZXRVaW50MTYoaSwgIWlzX2JpZ2VuZGlhbik7XG5cbiAgICAvLyBGb3Igbm93LCBqdXN0IGFzc3VtZSB2YWx1ZXMgYXJlIGluIHRoZSByYW5nZSAwLTEwMDAwLCBjb25zaXN0ZW50IHdpdGggaW1hZ2VfdmlldydzIGRlZmF1bHQuXG4gICAgLy8gVE9ETzogc3VwcG9ydCBkeW5hbWljIHJhbmdlIGFkanVzdG1lbnQgYW5kL29yIHVzZXItc2VsZWN0YWJsZSByYW5nZVxuICAgIC8vIFJlZmVyZW5jZXM6XG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3Jvcy1wZXJjZXB0aW9uL2ltYWdlX3BpcGVsaW5lL2Jsb2IvNDIyNjY4OTI1MDI0MjdlYjU2NmE0ZGZmYTYxYjAwOTM0NjQ5MWNlNy9pbWFnZV92aWV3L3NyYy9ub2Rlcy9pbWFnZV92aWV3LmNwcCNMODAtTDg4XG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3Jvcy12aXN1YWxpemF0aW9uL3JxdF9pbWFnZV92aWV3L2Jsb2IvZmUwNzZhY2QyNjVhMDVjMTFjMDRmOWQwNDM5MmZkYTk1MTg3OGY1NC9zcmMvcnF0X2ltYWdlX3ZpZXcvaW1hZ2Vfdmlldy5jcHAjTDU4MlxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9yb3MtdmlzdWFsaXphdGlvbi9ydml6L2Jsb2IvNjhiNDY0ZmI2NTcxYjg3NjBmOTFlOGVjYTZmYjkzM2JhMzExOTBiZi9zcmMvcnZpei9pbWFnZS9yb3NfaW1hZ2VfdGV4dHVyZS5jcHAjTDExNFxuICAgIHZhbCA9ICh2YWwgLyAxMDAwMCkgKiAyNTU7XG5cbiAgICBvdXRwdXRbb3V0SWR4KytdID0gdmFsO1xuICAgIG91dHB1dFtvdXRJZHgrK10gPSB2YWw7XG4gICAgb3V0cHV0W291dElkeCsrXSA9IHZhbDtcbiAgICBvdXRwdXRbb3V0SWR4KytdID0gMjU1O1xuICB9XG59XG5cbi8vIFNwZWNpYWxpemUgdGhlIEJheWVyIGRlY29kZSBmdW5jdGlvbiB0byBhIGNlcnRhaW4gZW5jb2RpbmcuIEZvciBwZXJmb3JtYW5jZSByZWFzb25zLCB3ZSB1c2Vcbi8vIG5ldyBGdW5jdGlvbigpIC0tIHRoaXMgaXMgYWJvdXQgMjAlIGZhc3RlciB0aGFuIGEgc3dpdGNoIHN0YXRlbWVudCBhbmQgLmJpbmQoKS5cbmZ1bmN0aW9uIG1ha2VTcGVjaWFsaXplZERlY29kZUJheWVyKFxuICB0bCxcbiAgdHIsXG4gIGJsLFxuICBiclxuKTogKGRhdGE6IFVpbnQ4QXJyYXksIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBvdXRwdXQ6IFVpbnQ4Q2xhbXBlZEFycmF5KSA9PiB2b2lkIHtcbiAgLy8gV2UgcHJvYmFibHkgY2FuJ3QgYWZmb3JkIHJlYWwgZGViYXllcmluZy9kZW1vc2FpY2tpbmcsIHNvIGRvIHNvbWV0aGluZyBzaW1wbGVyXG4gIC8vIFRoZSBpbnB1dCBhcnJheSBsb29rIGxpa2UgYSBzaW5nbGUtcGxhbmUgYXJyYXkgb2YgcGl4ZWxzLiAgSG93ZXZlciwgZWFjaCBwaXhlbCByZXByZXNlbnRzIGEgb25lIHBhcnRpY3VsYXIgY29sb3JcbiAgLy8gZm9yIGEgZ3JvdXAgb2YgcGl4ZWxzIGluIHRoZSAyeDIgcmVnaW9uLiAgRm9yICdyZ2diJywgdGhlcmUgY29sb3IgcmVwcmVzZW50YXRpbyBmb3IgdGhlIDJ4MiByZWdpb24gbG9va3MgbGlrZTpcbiAgLy9cbiAgLy8gUiAgfCBHMFxuICAvLyAtLS0tLS0tXG4gIC8vIEcxIHwgQlxuICAvL1xuICAvLyBJbiBvdGhlciB3b3JkcywgYSAyeDIgcmVnaW9uIGlzIHJlcHJlc2VudGVkIGJ5IG9uZSBSIHZhbHVlLCBvbmUgQiB2YWx1ZSwgYW5kIHR3byBHIHZhbHVlcy4gIEluIHNvcGhpc3RpY2F0ZWRcbiAgLy8gYWxnb3JpdGhtcywgZWFjaCBjb2xvciB3aWxsIGJlIHdlaWdodGVkIGFuZCBpbnRlcnBvbGF0ZWQgdG8gZmlsbCBpbiB0aGUgbWlzc2luZyBjb2xvcnMgZm9yIHRoZSBwaXhlbHMuICBUaGVzZVxuICAvLyBhbGdvcml0aG1zIG1heSByZWFjaCBiZXlvbmQgdGhlIGxvY2FsIDJ4MiByZWdpb24gYW5kIHVzZSB2YWx1ZXMgZnJvbSBuZWlnaGJvcmluZyByZWdpb25zLlxuICAvL1xuICAvLyBXZSdsbCBkbyBzb21ldGhpbmcgbXVjaCBzaW1wbGVyLiAgRm9yIGVhY2ggZ3JvdXAgb2YgMngyLCB3ZSdyZSByZXBsaWNhdGUgdGhlIFIgYW5kIEIgdmFsdWVzIGZvciBhbGwgcGl4ZWxzLlxuICAvLyBGb3IgdGhlIHR3byByb3csIHdlJ2xsIHJlcGxpY2F0ZSBHMCBmb3IgdGhlIGdyZWVuIGNoYW5uZWxzLCBhbmQgcmVwbGljYXRlIEcxIGZvciB0aGUgYm90dG9tIHJvdy5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5ldy1mdW5jXG4gIHJldHVybiAobmV3IEZ1bmN0aW9uKFxuICAgIFwiZGF0YVwiLFxuICAgIFwid2lkdGhcIixcbiAgICBcImhlaWdodFwiLFxuICAgIFwib3V0cHV0XCIsXG4gICAgYFxuICBmb3IgKGxldCBpID0gMDsgaSA8IGhlaWdodCAvIDI7IGkrKykge1xuICAgIGxldCBpbklkeCA9IGkgKiAyICogd2lkdGg7XG4gICAgbGV0IG91dFRvcElkeCA9IGkgKiAyICogd2lkdGggKiA0OyAvLyBBZGRyZXNzZXMgdG9wIHJvd1xuICAgIGxldCBvdXRCb3R0b21JZHggPSAoaSAqIDIgKyAxKSAqIHdpZHRoICogNDsgLy8gQWRkcmVzc2VzIGJvdHRvbSByb3dcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IHdpZHRoIC8gMjsgaisrKSB7XG4gICAgICBjb25zdCB0bCA9IGRhdGFbaW5JZHgrK107XG4gICAgICBjb25zdCB0ciA9IGRhdGFbaW5JZHgrK107XG4gICAgICBjb25zdCBibCA9IGRhdGFbaW5JZHggKyB3aWR0aCAtIDJdO1xuICAgICAgY29uc3QgYnIgPSBkYXRhW2luSWR4ICsgd2lkdGggLSAxXTtcblxuICAgICAgY29uc3QgJHt0bH0gPSB0bDtcbiAgICAgIGNvbnN0ICR7dHJ9ID0gdHI7XG4gICAgICBjb25zdCAke2JsfSA9IGJsO1xuICAgICAgY29uc3QgJHticn0gPSBicjtcblxuICAgICAgLy8gVG9wIHJvd1xuICAgICAgb3V0cHV0W291dFRvcElkeCsrXSA9IHI7XG4gICAgICBvdXRwdXRbb3V0VG9wSWR4KytdID0gZzA7XG4gICAgICBvdXRwdXRbb3V0VG9wSWR4KytdID0gYjtcbiAgICAgIG91dHB1dFtvdXRUb3BJZHgrK10gPSAyNTU7XG5cbiAgICAgIG91dHB1dFtvdXRUb3BJZHgrK10gPSByO1xuICAgICAgb3V0cHV0W291dFRvcElkeCsrXSA9IGcwO1xuICAgICAgb3V0cHV0W291dFRvcElkeCsrXSA9IGI7XG4gICAgICBvdXRwdXRbb3V0VG9wSWR4KytdID0gMjU1O1xuXG4gICAgICAvLyBCb3R0b20gcm93XG4gICAgICBvdXRwdXRbb3V0Qm90dG9tSWR4KytdID0gcjtcbiAgICAgIG91dHB1dFtvdXRCb3R0b21JZHgrK10gPSBnMTtcbiAgICAgIG91dHB1dFtvdXRCb3R0b21JZHgrK10gPSBiO1xuICAgICAgb3V0cHV0W291dEJvdHRvbUlkeCsrXSA9IDI1NTtcblxuICAgICAgb3V0cHV0W291dEJvdHRvbUlkeCsrXSA9IHI7XG4gICAgICBvdXRwdXRbb3V0Qm90dG9tSWR4KytdID0gZzE7XG4gICAgICBvdXRwdXRbb3V0Qm90dG9tSWR4KytdID0gYjtcbiAgICAgIG91dHB1dFtvdXRCb3R0b21JZHgrK10gPSAyNTU7XG4gICAgfVxuICB9YFxuICApOiBhbnkpO1xufVxuXG5leHBvcnQgY29uc3QgZGVjb2RlQmF5ZXJSR0dCOCA9IG1ha2VTcGVjaWFsaXplZERlY29kZUJheWVyKFwiclwiLCBcImcwXCIsIFwiZzFcIiwgXCJiXCIpO1xuZXhwb3J0IGNvbnN0IGRlY29kZUJheWVyQkdHUjggPSBtYWtlU3BlY2lhbGl6ZWREZWNvZGVCYXllcihcImJcIiwgXCJnMFwiLCBcImcxXCIsIFwiclwiKTtcbmV4cG9ydCBjb25zdCBkZWNvZGVCYXllckdCUkc4ID0gbWFrZVNwZWNpYWxpemVkRGVjb2RlQmF5ZXIoXCJnMFwiLCBcImJcIiwgXCJyXCIsIFwiZzFcIik7XG5leHBvcnQgY29uc3QgZGVjb2RlQmF5ZXJHUkJHOCA9IG1ha2VTcGVjaWFsaXplZERlY29kZUJheWVyKFwiZzBcIiwgXCJyXCIsIFwiYlwiLCBcImcxXCIpO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBT0E7QUFFQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQU9BO0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQURBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FBZ0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBcEJBO0FBNkNBO0FBQ0E7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTtBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./packages/webviz-core/src/panels/ImageView/decodings.js\n");

/***/ }),

/***/ "./packages/webviz-core/src/panels/ImageView/renderImage.js":
/*!******************************************************************!*\
  !*** ./packages/webviz-core/src/panels/ImageView/renderImage.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.renderImage = renderImage;\n\nvar _CameraModel = _interopRequireDefault(__webpack_require__(/*! ./CameraModel */ \"./packages/webviz-core/src/panels/ImageView/CameraModel.js\"));\n\nvar _decodings = __webpack_require__(/*! ./decodings */ \"./packages/webviz-core/src/panels/ImageView/decodings.js\");\n\nvar _util = __webpack_require__(/*! ./util */ \"./packages/webviz-core/src/panels/ImageView/util.js\");\n\nvar _reportError = _interopRequireDefault(__webpack_require__(/*! webviz-core/src/util/reportError */ \"./packages/webviz-core/src/util/reportError.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n//\n//  Copyright (c) 2018-present, Cruise LLC\n//\n//  This source code is licensed under the Apache License, Version 2.0,\n//  found in the LICENSE file in the root directory of this source tree.\n//  You may not use this file except in compliance with the License.\n// Just globally keep track of if we've shown an error in rendering, since typically when you get\nlet hasLoggedCameraModelError = false; // Given a canvas, an image message, and marker info, render the image to the canvas.\n// Nothing in this module should have state.\n\nasync function renderImage({\n  canvas,\n  imageMessage,\n  rawMarkerData,\n  imageMarkerDatatypes,\n  imageMarkerArrayDatatypes\n}) {\n  if (!canvas) {\n    return null;\n  }\n\n  if (!imageMessage) {\n    clearCanvas(canvas);\n    return null;\n  }\n\n  let markerData = null;\n\n  try {\n    markerData = (0, _util.buildMarkerData)(rawMarkerData);\n  } catch (error) {\n    if (!hasLoggedCameraModelError) {\n      (0, _reportError.default)(`Failed to initialize camera model from CameraInfo`, error, \"user\");\n      hasLoggedCameraModelError = true;\n    }\n  }\n\n  try {\n    const bitmap = await decodeMessageToBitmap(imageMessage);\n    const dimensions = paintBitmap(canvas, bitmap, markerData, imageMarkerDatatypes, imageMarkerArrayDatatypes);\n    bitmap.close();\n    return dimensions;\n  } catch (error) {\n    // If there is an error, clear the image and re-throw it.\n    clearCanvas(canvas);\n    throw error;\n  }\n}\n\nfunction toRGBA(color) {\n  const {\n    r,\n    g,\n    b,\n    a\n  } = color;\n  return `rgba(${r}, ${g}, ${b}, ${a || 1})`;\n}\n\nfunction maybeUnrectifyPoint(cameraModel, point) {\n  if (cameraModel) {\n    return cameraModel.unrectifyPoint(point);\n  }\n\n  return point;\n}\n\nasync function decodeMessageToBitmap(msg) {\n  let image;\n  const {\n    data: rawData,\n    is_bigendian\n  } = msg.message;\n\n  if (!(rawData instanceof Uint8Array)) {\n    throw new Error(\"Message must have data of type Uint8Array\");\n  } // Binary message processing\n\n\n  if (msg.datatype === \"sensor_msgs/Image\") {\n    const {\n      width,\n      height,\n      encoding\n    } = msg.message;\n    image = new ImageData(width, height); // prettier-ignore\n\n    switch (encoding) {\n      case \"yuv422\":\n        (0, _decodings.decodeYUV)(rawData, width, height, image.data);\n        break;\n\n      case \"rgb8\":\n        (0, _decodings.decodeRGB8)(rawData, width, height, image.data);\n        break;\n\n      case \"bgr8\":\n        (0, _decodings.decodeBGR8)(rawData, width, height, image.data);\n        break;\n\n      case \"32FC1\":\n        (0, _decodings.decodeFloat1c)(rawData, width, height, is_bigendian, image.data);\n        break;\n\n      case \"bayer_rggb8\":\n        (0, _decodings.decodeBayerRGGB8)(rawData, width, height, image.data);\n        break;\n\n      case \"bayer_bggr8\":\n        (0, _decodings.decodeBayerBGGR8)(rawData, width, height, image.data);\n        break;\n\n      case \"bayer_gbrg8\":\n        (0, _decodings.decodeBayerGBRG8)(rawData, width, height, image.data);\n        break;\n\n      case \"bayer_grbg8\":\n        (0, _decodings.decodeBayerGRBG8)(rawData, width, height, image.data);\n        break;\n\n      case \"mono8\":\n      case \"8UC1\":\n        (0, _decodings.decodeMono8)(rawData, width, height, image.data);\n        break;\n\n      case \"mono16\":\n      case \"16UC1\":\n        (0, _decodings.decodeMono16)(rawData, width, height, is_bigendian, image.data);\n        break;\n\n      default:\n        throw new Error(`Unsupported encoding ${encoding}`);\n    }\n  } else if (msg.datatype === \"sensor_msgs/CompressedImage\") {\n    image = new Blob([rawData], {\n      type: `image/${msg.message.format}`\n    });\n  } else {\n    throw new Error(`Message datatype ${msg.datatype} not usable for rendering images.`);\n  }\n\n  return self.createImageBitmap(image);\n}\n\nfunction clearCanvas(canvas) {\n  if (canvas) {\n    canvas.getContext(\"2d\").clearRect(0, 0, canvas.width, canvas.height);\n  }\n}\n\nfunction paintBitmap(canvas, bitmap, markerData, imageMarkerDatatypes, imageMarkerArrayDatatypes) {\n  let bitmapDimensions = {\n    width: bitmap.width,\n    height: bitmap.height\n  };\n  const ctx = canvas.getContext(\"2d\");\n\n  if (!markerData) {\n    resizeCanvas(canvas, bitmap.width, bitmap.height);\n    ctx.transform(1, 0, 0, 1, 0, 0);\n    ctx.drawImage(bitmap, 0, 0);\n    return bitmapDimensions;\n  }\n\n  const {\n    markers,\n    cameraModel\n  } = markerData;\n  let {\n    originalWidth,\n    originalHeight\n  } = markerData;\n\n  if (originalWidth == null) {\n    originalWidth = bitmap.width;\n  }\n\n  if (originalHeight == null) {\n    originalHeight = bitmap.height;\n  }\n\n  bitmapDimensions = {\n    width: originalWidth,\n    height: originalHeight\n  };\n  resizeCanvas(canvas, originalWidth, originalHeight);\n  ctx.save();\n  ctx.scale(originalWidth / bitmap.width, originalHeight / bitmap.height);\n  ctx.drawImage(bitmap, 0, 0);\n  ctx.restore();\n  ctx.save();\n\n  try {\n    paintMarkers(ctx, markers, cameraModel, imageMarkerDatatypes, imageMarkerArrayDatatypes);\n  } catch (err) {\n    console.warn(\"error painting markers:\", err);\n  } finally {\n    ctx.restore();\n  }\n\n  return bitmapDimensions;\n}\n\nfunction paintMarkers(ctx, markers, cameraModel, imageMarkerDatatypes, imageMarkerArrayDatatypes) {\n  for (const msg of markers) {\n    ctx.save();\n\n    if (imageMarkerArrayDatatypes.includes(msg.datatype)) {\n      for (const marker of msg.message.markers) {\n        paintMarker(ctx, marker, cameraModel);\n      }\n    } else if (imageMarkerDatatypes.includes(msg.datatype)) {\n      paintMarker(ctx, msg.message, cameraModel);\n    } else {\n      console.warn(\"unrecognized image marker datatype\", msg);\n    }\n\n    ctx.restore();\n  }\n}\n\nfunction paintMarker(ctx, marker, cameraModel) {\n  switch (marker.type) {\n    case 0:\n      {\n        // CIRCLE\n        ctx.beginPath();\n        const {\n          x,\n          y\n        } = maybeUnrectifyPoint(cameraModel, marker.position);\n        ctx.arc(x, y, marker.scale, 0, 2 * Math.PI);\n\n        if (marker.thickness <= 0) {\n          ctx.fillStyle = toRGBA(marker.outline_color);\n          ctx.fill();\n        } else {\n          ctx.lineWidth = marker.thickness;\n          ctx.strokeStyle = toRGBA(marker.outline_color);\n          ctx.stroke();\n        }\n\n        break;\n      }\n    // LINE_LIST\n\n    case 2:\n      if (marker.points.length % 2 !== 0) {\n        break;\n      }\n\n      ctx.strokeStyle = toRGBA(marker.outline_color);\n      ctx.lineWidth = marker.thickness;\n\n      for (let i = 0; i < marker.points.length; i += 2) {\n        const {\n          x: x1,\n          y: y1\n        } = maybeUnrectifyPoint(cameraModel, marker.points[i]);\n        const {\n          x: x2,\n          y: y2\n        } = maybeUnrectifyPoint(cameraModel, marker.points[i + 1]);\n        ctx.beginPath();\n        ctx.moveTo(x1, y1);\n        ctx.lineTo(x2, y2);\n        ctx.stroke();\n      }\n\n      break;\n    // LINE_STRIP, POLYGON\n\n    case 1:\n    case 3:\n      {\n        if (marker.points.length === 0) {\n          break;\n        }\n\n        ctx.beginPath();\n        const {\n          x,\n          y\n        } = maybeUnrectifyPoint(cameraModel, marker.points[0]);\n        ctx.moveTo(x, y);\n\n        for (let i = 1; i < marker.points.length; i++) {\n          const maybeUnrectifiedPoint = maybeUnrectifyPoint(cameraModel, marker.points[i]);\n          ctx.lineTo(maybeUnrectifiedPoint.x, maybeUnrectifiedPoint.y);\n        }\n\n        if (marker.type === 3) {\n          ctx.closePath();\n        }\n\n        if (marker.thickness <= 0) {\n          ctx.fillStyle = toRGBA(marker.outline_color);\n          ctx.fill();\n        } else {\n          ctx.strokeStyle = toRGBA(marker.outline_color);\n          ctx.lineWidth = marker.thickness;\n          ctx.stroke();\n        }\n\n        break;\n      }\n\n    case 4:\n      {\n        // POINTS\n        if (marker.points.length === 0) {\n          break;\n        }\n\n        const size = marker.scale || 4;\n\n        if (marker.outline_colors && marker.outline_colors.length === marker.points.length) {\n          for (let i = 0; i < marker.points.length; i++) {\n            const {\n              x,\n              y\n            } = maybeUnrectifyPoint(cameraModel, marker.points[i]);\n            ctx.fillStyle = toRGBA(marker.outline_colors[i]);\n            ctx.beginPath();\n            ctx.arc(x, y, size, 0, 2 * Math.PI);\n            ctx.fill();\n          }\n        } else {\n          ctx.beginPath();\n\n          for (let i = 0; i < marker.points.length; i++) {\n            const {\n              x,\n              y\n            } = maybeUnrectifyPoint(cameraModel, marker.points[i]);\n            ctx.arc(x, y, size, 0, 2 * Math.PI);\n            ctx.closePath();\n          }\n\n          ctx.fillStyle = toRGBA(marker.fill_color);\n          ctx.fill();\n        }\n\n        break;\n      }\n\n    case 5:\n      {\n        // TEXT (our own extension on visualization_msgs/Marker)\n        const {\n          x,\n          y\n        } = maybeUnrectifyPoint(cameraModel, marker.position);\n        const fontSize = marker.scale * 12;\n        const padding = 4 * marker.scale;\n        ctx.font = `${fontSize}px sans-serif`;\n        ctx.textBaseline = \"bottom\";\n\n        if (marker.filled) {\n          const metrics = ctx.measureText(marker.text.data);\n          const height = fontSize * 1.2; // Chrome doesn't yet support height in TextMetrics\n\n          ctx.fillStyle = toRGBA(marker.fill_color);\n          ctx.fillRect(x, y - height, Math.ceil(metrics.width + 2 * padding), Math.ceil(height));\n        }\n\n        ctx.fillStyle = toRGBA(marker.outline_color);\n        ctx.fillText(marker.text.data, x + padding, y);\n        break;\n      }\n\n    default:\n      console.warn(\"unrecognized image marker type\", marker);\n  }\n}\n\nfunction resizeCanvas(canvas, width, height) {\n  if (canvas && (canvas.width !== width || canvas.height !== height)) {\n    canvas.width = width;\n    canvas.height = height;\n  }\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWNrYWdlcy93ZWJ2aXotY29yZS9zcmMvcGFuZWxzL0ltYWdlVmlldy9yZW5kZXJJbWFnZS5qcy5qcyIsInNvdXJjZXMiOlsiL2hvbWUvbm9kZS93ZWJ2aXovcGFja2FnZXMvd2Vidml6LWNvcmUvc3JjL3BhbmVscy9JbWFnZVZpZXcvcmVuZGVySW1hZ2UuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQGZsb3dcbi8vXG4vLyAgQ29weXJpZ2h0IChjKSAyMDE4LXByZXNlbnQsIENydWlzZSBMTENcbi8vXG4vLyAgVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLFxuLy8gIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4vLyAgWW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuXG5pbXBvcnQgQ2FtZXJhTW9kZWwgZnJvbSBcIi4vQ2FtZXJhTW9kZWxcIjtcbmltcG9ydCB7XG4gIGRlY29kZVlVVixcbiAgZGVjb2RlUkdCOCxcbiAgZGVjb2RlQkdSOCxcbiAgZGVjb2RlRmxvYXQxYyxcbiAgZGVjb2RlQmF5ZXJSR0dCOCxcbiAgZGVjb2RlQmF5ZXJCR0dSOCxcbiAgZGVjb2RlQmF5ZXJHQlJHOCxcbiAgZGVjb2RlQmF5ZXJHUkJHOCxcbiAgZGVjb2RlTW9ubzgsXG4gIGRlY29kZU1vbm8xNixcbn0gZnJvbSBcIi4vZGVjb2RpbmdzXCI7XG5pbXBvcnQgeyBidWlsZE1hcmtlckRhdGEsIHR5cGUgRGltZW5zaW9ucywgdHlwZSBSYXdNYXJrZXJEYXRhLCB0eXBlIE1hcmtlckRhdGEsIHR5cGUgT2Zmc2NyZWVuQ2FudmFzIH0gZnJvbSBcIi4vdXRpbFwiO1xuaW1wb3J0IHR5cGUgeyBNZXNzYWdlIH0gZnJvbSBcIndlYnZpei1jb3JlL3NyYy9wbGF5ZXJzL3R5cGVzXCI7XG5pbXBvcnQgdHlwZSB7IEltYWdlTWFya2VyLCBDb2xvciwgUG9pbnQgfSBmcm9tIFwid2Vidml6LWNvcmUvc3JjL3R5cGVzL01lc3NhZ2VzXCI7XG5pbXBvcnQgcmVwb3J0RXJyb3IgZnJvbSBcIndlYnZpei1jb3JlL3NyYy91dGlsL3JlcG9ydEVycm9yXCI7XG5cbi8vIEp1c3QgZ2xvYmFsbHkga2VlcCB0cmFjayBvZiBpZiB3ZSd2ZSBzaG93biBhbiBlcnJvciBpbiByZW5kZXJpbmcsIHNpbmNlIHR5cGljYWxseSB3aGVuIHlvdSBnZXRcbi8vIG9uZSBlcnJvciwgeW91J2QgdGhlbiBnZXQgYSB3aG9sZSBidW5jaCBtb3JlLCB3aGljaCBpcyBzcGFtbXkuXG5sZXQgaGFzTG9nZ2VkQ2FtZXJhTW9kZWxFcnJvcjogYm9vbGVhbiA9IGZhbHNlO1xuXG4vLyBHaXZlbiBhIGNhbnZhcywgYW4gaW1hZ2UgbWVzc2FnZSwgYW5kIG1hcmtlciBpbmZvLCByZW5kZXIgdGhlIGltYWdlIHRvIHRoZSBjYW52YXMuXG4vLyBOb3RoaW5nIGluIHRoaXMgbW9kdWxlIHNob3VsZCBoYXZlIHN0YXRlLlxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlbmRlckltYWdlKHtcbiAgY2FudmFzLFxuICBpbWFnZU1lc3NhZ2UsXG4gIHJhd01hcmtlckRhdGEsXG4gIGltYWdlTWFya2VyRGF0YXR5cGVzLFxuICBpbWFnZU1hcmtlckFycmF5RGF0YXR5cGVzLFxufToge1xuICBjYW52YXM6ID8oSFRNTENhbnZhc0VsZW1lbnQgfCBPZmZzY3JlZW5DYW52YXMpLFxuICBpbWFnZU1lc3NhZ2U6IGFueSxcbiAgcmF3TWFya2VyRGF0YTogUmF3TWFya2VyRGF0YSxcbiAgaW1hZ2VNYXJrZXJEYXRhdHlwZXM6IHN0cmluZ1tdLFxuICBpbWFnZU1hcmtlckFycmF5RGF0YXR5cGVzOiBzdHJpbmdbXSxcbn0pOiBQcm9taXNlPD9EaW1lbnNpb25zPiB7XG4gIGlmICghY2FudmFzKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgaWYgKCFpbWFnZU1lc3NhZ2UpIHtcbiAgICBjbGVhckNhbnZhcyhjYW52YXMpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIGxldCBtYXJrZXJEYXRhID0gbnVsbDtcbiAgdHJ5IHtcbiAgICBtYXJrZXJEYXRhID0gYnVpbGRNYXJrZXJEYXRhKHJhd01hcmtlckRhdGEpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGlmICghaGFzTG9nZ2VkQ2FtZXJhTW9kZWxFcnJvcikge1xuICAgICAgcmVwb3J0RXJyb3IoYEZhaWxlZCB0byBpbml0aWFsaXplIGNhbWVyYSBtb2RlbCBmcm9tIENhbWVyYUluZm9gLCBlcnJvciwgXCJ1c2VyXCIpO1xuICAgICAgaGFzTG9nZ2VkQ2FtZXJhTW9kZWxFcnJvciA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBiaXRtYXAgPSBhd2FpdCBkZWNvZGVNZXNzYWdlVG9CaXRtYXAoaW1hZ2VNZXNzYWdlKTtcbiAgICBjb25zdCBkaW1lbnNpb25zID0gcGFpbnRCaXRtYXAoY2FudmFzLCBiaXRtYXAsIG1hcmtlckRhdGEsIGltYWdlTWFya2VyRGF0YXR5cGVzLCBpbWFnZU1hcmtlckFycmF5RGF0YXR5cGVzKTtcbiAgICBiaXRtYXAuY2xvc2UoKTtcbiAgICByZXR1cm4gZGltZW5zaW9ucztcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAvLyBJZiB0aGVyZSBpcyBhbiBlcnJvciwgY2xlYXIgdGhlIGltYWdlIGFuZCByZS10aHJvdyBpdC5cbiAgICBjbGVhckNhbnZhcyhjYW52YXMpO1xuICAgIHRocm93IGVycm9yO1xuICB9XG59XG5cbmZ1bmN0aW9uIHRvUkdCQShjb2xvcjogQ29sb3IpIHtcbiAgY29uc3QgeyByLCBnLCBiLCBhIH0gPSBjb2xvcjtcbiAgcmV0dXJuIGByZ2JhKCR7cn0sICR7Z30sICR7Yn0sICR7YSB8fCAxfSlgO1xufVxuXG5mdW5jdGlvbiBtYXliZVVucmVjdGlmeVBvaW50KGNhbWVyYU1vZGVsOiA/Q2FtZXJhTW9kZWwsIHBvaW50OiBQb2ludCk6IHsgeDogbnVtYmVyLCB5OiBudW1iZXIgfSB7XG4gIGlmIChjYW1lcmFNb2RlbCkge1xuICAgIHJldHVybiBjYW1lcmFNb2RlbC51bnJlY3RpZnlQb2ludChwb2ludCk7XG4gIH1cbiAgcmV0dXJuIHBvaW50O1xufVxuXG5hc3luYyBmdW5jdGlvbiBkZWNvZGVNZXNzYWdlVG9CaXRtYXAobXNnOiBhbnkpOiBQcm9taXNlPEltYWdlQml0bWFwPiB7XG4gIGxldCBpbWFnZTogSW1hZ2VEYXRhIHwgSW1hZ2UgfCBCbG9iO1xuICBjb25zdCB7IGRhdGE6IHJhd0RhdGEsIGlzX2JpZ2VuZGlhbiB9ID0gbXNnLm1lc3NhZ2U7XG4gIGlmICghKHJhd0RhdGEgaW5zdGFuY2VvZiBVaW50OEFycmF5KSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIk1lc3NhZ2UgbXVzdCBoYXZlIGRhdGEgb2YgdHlwZSBVaW50OEFycmF5XCIpO1xuICB9XG5cbiAgLy8gQmluYXJ5IG1lc3NhZ2UgcHJvY2Vzc2luZ1xuICBpZiAobXNnLmRhdGF0eXBlID09PSBcInNlbnNvcl9tc2dzL0ltYWdlXCIpIHtcbiAgICBjb25zdCB7IHdpZHRoLCBoZWlnaHQsIGVuY29kaW5nIH0gPSBtc2cubWVzc2FnZTtcbiAgICBpbWFnZSA9IG5ldyBJbWFnZURhdGEod2lkdGgsIGhlaWdodCk7XG4gICAgLy8gcHJldHRpZXItaWdub3JlXG4gICAgc3dpdGNoIChlbmNvZGluZykge1xuICAgICAgY2FzZSBcInl1djQyMlwiOiBkZWNvZGVZVVYocmF3RGF0YSwgd2lkdGgsIGhlaWdodCwgaW1hZ2UuZGF0YSk7IGJyZWFrO1xuICAgICAgY2FzZSBcInJnYjhcIjogZGVjb2RlUkdCOChyYXdEYXRhLCB3aWR0aCwgaGVpZ2h0LCBpbWFnZS5kYXRhKTsgYnJlYWs7XG4gICAgICBjYXNlIFwiYmdyOFwiOiBkZWNvZGVCR1I4KHJhd0RhdGEsIHdpZHRoLCBoZWlnaHQsIGltYWdlLmRhdGEpOyBicmVhaztcbiAgICAgIGNhc2UgXCIzMkZDMVwiOiBkZWNvZGVGbG9hdDFjKHJhd0RhdGEsIHdpZHRoLCBoZWlnaHQsIGlzX2JpZ2VuZGlhbiwgaW1hZ2UuZGF0YSk7IGJyZWFrO1xuICAgICAgY2FzZSBcImJheWVyX3JnZ2I4XCI6IGRlY29kZUJheWVyUkdHQjgocmF3RGF0YSwgd2lkdGgsIGhlaWdodCwgaW1hZ2UuZGF0YSk7IGJyZWFrO1xuICAgICAgY2FzZSBcImJheWVyX2JnZ3I4XCI6IGRlY29kZUJheWVyQkdHUjgocmF3RGF0YSwgd2lkdGgsIGhlaWdodCwgaW1hZ2UuZGF0YSk7IGJyZWFrO1xuICAgICAgY2FzZSBcImJheWVyX2dicmc4XCI6IGRlY29kZUJheWVyR0JSRzgocmF3RGF0YSwgd2lkdGgsIGhlaWdodCwgaW1hZ2UuZGF0YSk7IGJyZWFrO1xuICAgICAgY2FzZSBcImJheWVyX2dyYmc4XCI6IGRlY29kZUJheWVyR1JCRzgocmF3RGF0YSwgd2lkdGgsIGhlaWdodCwgaW1hZ2UuZGF0YSk7IGJyZWFrO1xuICAgICAgY2FzZSBcIm1vbm84XCI6XG4gICAgICBjYXNlIFwiOFVDMVwiOlxuICAgICAgICAgIGRlY29kZU1vbm84KHJhd0RhdGEsIHdpZHRoLCBoZWlnaHQsIGltYWdlLmRhdGEpOyBicmVhaztcbiAgICAgIGNhc2UgXCJtb25vMTZcIjpcbiAgICAgIGNhc2UgXCIxNlVDMVwiOlxuICAgICAgICAgIGRlY29kZU1vbm8xNihyYXdEYXRhLCB3aWR0aCwgaGVpZ2h0LCBpc19iaWdlbmRpYW4sIGltYWdlLmRhdGEpOyBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5zdXBwb3J0ZWQgZW5jb2RpbmcgJHtlbmNvZGluZ31gKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAobXNnLmRhdGF0eXBlID09PSBcInNlbnNvcl9tc2dzL0NvbXByZXNzZWRJbWFnZVwiKSB7XG4gICAgaW1hZ2UgPSBuZXcgQmxvYihbcmF3RGF0YV0sIHsgdHlwZTogYGltYWdlLyR7bXNnLm1lc3NhZ2UuZm9ybWF0fWAgfSk7XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBNZXNzYWdlIGRhdGF0eXBlICR7bXNnLmRhdGF0eXBlfSBub3QgdXNhYmxlIGZvciByZW5kZXJpbmcgaW1hZ2VzLmApO1xuICB9XG5cbiAgcmV0dXJuIHNlbGYuY3JlYXRlSW1hZ2VCaXRtYXAoaW1hZ2UpO1xufVxuXG5mdW5jdGlvbiBjbGVhckNhbnZhcyhjYW52YXM6ID9IVE1MQ2FudmFzRWxlbWVudCkge1xuICBpZiAoY2FudmFzKSB7XG4gICAgY2FudmFzLmdldENvbnRleHQoXCIyZFwiKS5jbGVhclJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBwYWludEJpdG1hcChcbiAgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCxcbiAgYml0bWFwOiBJbWFnZUJpdG1hcCxcbiAgbWFya2VyRGF0YTogTWFya2VyRGF0YSxcbiAgaW1hZ2VNYXJrZXJEYXRhdHlwZXM6IHN0cmluZ1tdLFxuICBpbWFnZU1hcmtlckFycmF5RGF0YXR5cGVzOiBzdHJpbmdbXVxuKTogP0RpbWVuc2lvbnMge1xuICBsZXQgYml0bWFwRGltZW5zaW9ucyA9IHsgd2lkdGg6IGJpdG1hcC53aWR0aCwgaGVpZ2h0OiBiaXRtYXAuaGVpZ2h0IH07XG4gIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gIGlmICghbWFya2VyRGF0YSkge1xuICAgIHJlc2l6ZUNhbnZhcyhjYW52YXMsIGJpdG1hcC53aWR0aCwgYml0bWFwLmhlaWdodCk7XG4gICAgY3R4LnRyYW5zZm9ybSgxLCAwLCAwLCAxLCAwLCAwKTtcbiAgICBjdHguZHJhd0ltYWdlKGJpdG1hcCwgMCwgMCk7XG4gICAgcmV0dXJuIGJpdG1hcERpbWVuc2lvbnM7XG4gIH1cblxuICBjb25zdCB7IG1hcmtlcnMsIGNhbWVyYU1vZGVsIH0gPSBtYXJrZXJEYXRhO1xuICBsZXQgeyBvcmlnaW5hbFdpZHRoLCBvcmlnaW5hbEhlaWdodCB9ID0gbWFya2VyRGF0YTtcbiAgaWYgKG9yaWdpbmFsV2lkdGggPT0gbnVsbCkge1xuICAgIG9yaWdpbmFsV2lkdGggPSBiaXRtYXAud2lkdGg7XG4gIH1cbiAgaWYgKG9yaWdpbmFsSGVpZ2h0ID09IG51bGwpIHtcbiAgICBvcmlnaW5hbEhlaWdodCA9IGJpdG1hcC5oZWlnaHQ7XG4gIH1cblxuICBiaXRtYXBEaW1lbnNpb25zID0geyB3aWR0aDogb3JpZ2luYWxXaWR0aCwgaGVpZ2h0OiBvcmlnaW5hbEhlaWdodCB9O1xuICByZXNpemVDYW52YXMoY2FudmFzLCBvcmlnaW5hbFdpZHRoLCBvcmlnaW5hbEhlaWdodCk7XG4gIGN0eC5zYXZlKCk7XG4gIGN0eC5zY2FsZShvcmlnaW5hbFdpZHRoIC8gYml0bWFwLndpZHRoLCBvcmlnaW5hbEhlaWdodCAvIGJpdG1hcC5oZWlnaHQpO1xuICBjdHguZHJhd0ltYWdlKGJpdG1hcCwgMCwgMCk7XG4gIGN0eC5yZXN0b3JlKCk7XG4gIGN0eC5zYXZlKCk7XG4gIHRyeSB7XG4gICAgcGFpbnRNYXJrZXJzKGN0eCwgbWFya2VycywgY2FtZXJhTW9kZWwsIGltYWdlTWFya2VyRGF0YXR5cGVzLCBpbWFnZU1hcmtlckFycmF5RGF0YXR5cGVzKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgY29uc29sZS53YXJuKFwiZXJyb3IgcGFpbnRpbmcgbWFya2VyczpcIiwgZXJyKTtcbiAgfSBmaW5hbGx5IHtcbiAgICBjdHgucmVzdG9yZSgpO1xuICB9XG4gIHJldHVybiBiaXRtYXBEaW1lbnNpb25zO1xufVxuXG5mdW5jdGlvbiBwYWludE1hcmtlcnMoXG4gIGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELFxuICBtYXJrZXJzOiBNZXNzYWdlW10sXG4gIGNhbWVyYU1vZGVsOiA/Q2FtZXJhTW9kZWwsXG4gIGltYWdlTWFya2VyRGF0YXR5cGVzOiBzdHJpbmdbXSxcbiAgaW1hZ2VNYXJrZXJBcnJheURhdGF0eXBlczogc3RyaW5nW11cbikge1xuICBmb3IgKGNvbnN0IG1zZyBvZiBtYXJrZXJzKSB7XG4gICAgY3R4LnNhdmUoKTtcbiAgICBpZiAoaW1hZ2VNYXJrZXJBcnJheURhdGF0eXBlcy5pbmNsdWRlcyhtc2cuZGF0YXR5cGUpKSB7XG4gICAgICBmb3IgKGNvbnN0IG1hcmtlciBvZiBtc2cubWVzc2FnZS5tYXJrZXJzKSB7XG4gICAgICAgIHBhaW50TWFya2VyKGN0eCwgbWFya2VyLCBjYW1lcmFNb2RlbCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChpbWFnZU1hcmtlckRhdGF0eXBlcy5pbmNsdWRlcyhtc2cuZGF0YXR5cGUpKSB7XG4gICAgICBwYWludE1hcmtlcihjdHgsIG1zZy5tZXNzYWdlLCBjYW1lcmFNb2RlbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUud2FybihcInVucmVjb2duaXplZCBpbWFnZSBtYXJrZXIgZGF0YXR5cGVcIiwgbXNnKTtcbiAgICB9XG4gICAgY3R4LnJlc3RvcmUoKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBwYWludE1hcmtlcihjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCwgbWFya2VyOiBJbWFnZU1hcmtlciwgY2FtZXJhTW9kZWw6ID9DYW1lcmFNb2RlbCkge1xuICBzd2l0Y2ggKG1hcmtlci50eXBlKSB7XG4gICAgY2FzZSAwOiB7XG4gICAgICAvLyBDSVJDTEVcbiAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgIGNvbnN0IHsgeCwgeSB9ID0gbWF5YmVVbnJlY3RpZnlQb2ludChjYW1lcmFNb2RlbCwgbWFya2VyLnBvc2l0aW9uKTtcbiAgICAgIGN0eC5hcmMoeCwgeSwgbWFya2VyLnNjYWxlLCAwLCAyICogTWF0aC5QSSk7XG4gICAgICBpZiAobWFya2VyLnRoaWNrbmVzcyA8PSAwKSB7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSB0b1JHQkEobWFya2VyLm91dGxpbmVfY29sb3IpO1xuICAgICAgICBjdHguZmlsbCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY3R4LmxpbmVXaWR0aCA9IG1hcmtlci50aGlja25lc3M7XG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IHRvUkdCQShtYXJrZXIub3V0bGluZV9jb2xvcik7XG4gICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIC8vIExJTkVfTElTVFxuICAgIGNhc2UgMjpcbiAgICAgIGlmIChtYXJrZXIucG9pbnRzLmxlbmd0aCAlIDIgIT09IDApIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjdHguc3Ryb2tlU3R5bGUgPSB0b1JHQkEobWFya2VyLm91dGxpbmVfY29sb3IpO1xuICAgICAgY3R4LmxpbmVXaWR0aCA9IG1hcmtlci50aGlja25lc3M7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1hcmtlci5wb2ludHMubGVuZ3RoOyBpICs9IDIpIHtcbiAgICAgICAgY29uc3QgeyB4OiB4MSwgeTogeTEgfSA9IG1heWJlVW5yZWN0aWZ5UG9pbnQoY2FtZXJhTW9kZWwsIG1hcmtlci5wb2ludHNbaV0pO1xuICAgICAgICBjb25zdCB7IHg6IHgyLCB5OiB5MiB9ID0gbWF5YmVVbnJlY3RpZnlQb2ludChjYW1lcmFNb2RlbCwgbWFya2VyLnBvaW50c1tpICsgMV0pO1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5tb3ZlVG8oeDEsIHkxKTtcbiAgICAgICAgY3R4LmxpbmVUbyh4MiwgeTIpO1xuICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICB9XG4gICAgICBicmVhaztcblxuICAgIC8vIExJTkVfU1RSSVAsIFBPTFlHT05cbiAgICBjYXNlIDE6XG4gICAgY2FzZSAzOiB7XG4gICAgICBpZiAobWFya2VyLnBvaW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICBjb25zdCB7IHgsIHkgfSA9IG1heWJlVW5yZWN0aWZ5UG9pbnQoY2FtZXJhTW9kZWwsIG1hcmtlci5wb2ludHNbMF0pO1xuICAgICAgY3R4Lm1vdmVUbyh4LCB5KTtcbiAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgbWFya2VyLnBvaW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBtYXliZVVucmVjdGlmaWVkUG9pbnQgPSBtYXliZVVucmVjdGlmeVBvaW50KGNhbWVyYU1vZGVsLCBtYXJrZXIucG9pbnRzW2ldKTtcbiAgICAgICAgY3R4LmxpbmVUbyhtYXliZVVucmVjdGlmaWVkUG9pbnQueCwgbWF5YmVVbnJlY3RpZmllZFBvaW50LnkpO1xuICAgICAgfVxuICAgICAgaWYgKG1hcmtlci50eXBlID09PSAzKSB7XG4gICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICAgIH1cbiAgICAgIGlmIChtYXJrZXIudGhpY2tuZXNzIDw9IDApIHtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHRvUkdCQShtYXJrZXIub3V0bGluZV9jb2xvcik7XG4gICAgICAgIGN0eC5maWxsKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSB0b1JHQkEobWFya2VyLm91dGxpbmVfY29sb3IpO1xuICAgICAgICBjdHgubGluZVdpZHRoID0gbWFya2VyLnRoaWNrbmVzcztcbiAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgY2FzZSA0OiB7XG4gICAgICAvLyBQT0lOVFNcbiAgICAgIGlmIChtYXJrZXIucG9pbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgY29uc3Qgc2l6ZSA9IG1hcmtlci5zY2FsZSB8fCA0O1xuICAgICAgaWYgKG1hcmtlci5vdXRsaW5lX2NvbG9ycyAmJiBtYXJrZXIub3V0bGluZV9jb2xvcnMubGVuZ3RoID09PSBtYXJrZXIucG9pbnRzLmxlbmd0aCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1hcmtlci5wb2ludHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBjb25zdCB7IHgsIHkgfSA9IG1heWJlVW5yZWN0aWZ5UG9pbnQoY2FtZXJhTW9kZWwsIG1hcmtlci5wb2ludHNbaV0pO1xuICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSB0b1JHQkEobWFya2VyLm91dGxpbmVfY29sb3JzW2ldKTtcbiAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgY3R4LmFyYyh4LCB5LCBzaXplLCAwLCAyICogTWF0aC5QSSk7XG4gICAgICAgICAgY3R4LmZpbGwoKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1hcmtlci5wb2ludHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBjb25zdCB7IHgsIHkgfSA9IG1heWJlVW5yZWN0aWZ5UG9pbnQoY2FtZXJhTW9kZWwsIG1hcmtlci5wb2ludHNbaV0pO1xuICAgICAgICAgIGN0eC5hcmMoeCwgeSwgc2l6ZSwgMCwgMiAqIE1hdGguUEkpO1xuICAgICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICAgICAgfVxuICAgICAgICBjdHguZmlsbFN0eWxlID0gdG9SR0JBKG1hcmtlci5maWxsX2NvbG9yKTtcbiAgICAgICAgY3R4LmZpbGwoKTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGNhc2UgNToge1xuICAgICAgLy8gVEVYVCAob3VyIG93biBleHRlbnNpb24gb24gdmlzdWFsaXphdGlvbl9tc2dzL01hcmtlcilcbiAgICAgIGNvbnN0IHsgeCwgeSB9ID0gbWF5YmVVbnJlY3RpZnlQb2ludChjYW1lcmFNb2RlbCwgbWFya2VyLnBvc2l0aW9uKTtcblxuICAgICAgY29uc3QgZm9udFNpemUgPSBtYXJrZXIuc2NhbGUgKiAxMjtcbiAgICAgIGNvbnN0IHBhZGRpbmcgPSA0ICogbWFya2VyLnNjYWxlO1xuICAgICAgY3R4LmZvbnQgPSBgJHtmb250U2l6ZX1weCBzYW5zLXNlcmlmYDtcbiAgICAgIGN0eC50ZXh0QmFzZWxpbmUgPSBcImJvdHRvbVwiO1xuICAgICAgaWYgKG1hcmtlci5maWxsZWQpIHtcbiAgICAgICAgY29uc3QgbWV0cmljcyA9IGN0eC5tZWFzdXJlVGV4dChtYXJrZXIudGV4dC5kYXRhKTtcbiAgICAgICAgY29uc3QgaGVpZ2h0ID0gZm9udFNpemUgKiAxLjI7IC8vIENocm9tZSBkb2Vzbid0IHlldCBzdXBwb3J0IGhlaWdodCBpbiBUZXh0TWV0cmljc1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gdG9SR0JBKG1hcmtlci5maWxsX2NvbG9yKTtcbiAgICAgICAgY3R4LmZpbGxSZWN0KHgsIHkgLSBoZWlnaHQsIE1hdGguY2VpbChtZXRyaWNzLndpZHRoICsgMiAqIHBhZGRpbmcpLCBNYXRoLmNlaWwoaGVpZ2h0KSk7XG4gICAgICB9XG4gICAgICBjdHguZmlsbFN0eWxlID0gdG9SR0JBKG1hcmtlci5vdXRsaW5lX2NvbG9yKTtcbiAgICAgIGN0eC5maWxsVGV4dChtYXJrZXIudGV4dC5kYXRhLCB4ICsgcGFkZGluZywgeSk7XG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICBkZWZhdWx0OlxuICAgICAgY29uc29sZS53YXJuKFwidW5yZWNvZ25pemVkIGltYWdlIG1hcmtlciB0eXBlXCIsIG1hcmtlcik7XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVzaXplQ2FudmFzKGNhbnZhczogP0hUTUxDYW52YXNFbGVtZW50LCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcikge1xuICBpZiAoY2FudmFzICYmIChjYW52YXMud2lkdGggIT09IHdpZHRoIHx8IGNhbnZhcy5oZWlnaHQgIT09IGhlaWdodCkpIHtcbiAgICBjYW52YXMud2lkdGggPSB3aWR0aDtcbiAgICBjYW52YXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICB9XG59XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFRQTtBQUNBO0FBQUE7QUFDQTtBQVdBO0FBQ0E7QUFFQTtBQUNBOzs7QUF4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBb0JBO0FBRUE7QUFHQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUFhQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQWhCQTtBQWtCQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFPQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBT0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFFQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUE3R0E7QUErR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./packages/webviz-core/src/panels/ImageView/renderImage.js\n");

/***/ }),

/***/ "./packages/webviz-core/src/panels/ImageView/util.js":
/*!***********************************************************!*\
  !*** ./packages/webviz-core/src/panels/ImageView/util.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.getMarkerOptions = getMarkerOptions;\nexports.getMarkerTopics = getMarkerTopics;\nexports.getCameraInfoTopic = getCameraInfoTopic;\nexports.getCameraNamespace = getCameraNamespace;\nexports.groupTopics = groupTopics;\nexports.checkOutOfBounds = checkOutOfBounds;\nexports.buildMarkerData = buildMarkerData;\nexports.supportsOffscreenCanvas = void 0;\n\nvar _clamp = _interopRequireDefault(__webpack_require__(/*! lodash/clamp */ \"./packages/webviz-core/node_modules/lodash/clamp.js\"));\n\nvar _memoize = _interopRequireDefault(__webpack_require__(/*! lodash/memoize */ \"./packages/webviz-core/node_modules/lodash/memoize.js\"));\n\nvar _CameraModel = _interopRequireDefault(__webpack_require__(/*! ./CameraModel */ \"./packages/webviz-core/src/panels/ImageView/CameraModel.js\"));\n\nvar _reportError = _interopRequireDefault(__webpack_require__(/*! webviz-core/src/util/reportError */ \"./packages/webviz-core/src/util/reportError.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n//\n//  Copyright (c) 2018-present, Cruise LLC\n//\n//  This source code is licensed under the Apache License, Version 2.0,\n//  found in the LICENSE file in the root directory of this source tree.\n//  You may not use this file except in compliance with the License.\n// given all available marker topics, filter out the names that are available for this image topic\nfunction getMarkerOptions(imageTopic, markerTopics, allCameraNamespaces) {\n  const results = [];\n  const cameraNamespace = getCameraNamespace(imageTopic);\n\n  for (const topic of markerTopics) {\n    if (cameraNamespace && topic.startsWith(cameraNamespace)) {\n      results.push({\n        topic,\n        name: topic.substr(cameraNamespace.length).replace(/^\\//, \"\")\n      });\n    } else if (cameraNamespace && topic.startsWith(`/old${cameraNamespace}`)) {\n      results.push({\n        topic,\n        name: topic\n      });\n    } else if (allCameraNamespaces.includes(getCameraNamespace(topic))) {\n      // this topic corresponds to a different camera\n      continue;\n    } else {\n      results.push({\n        topic,\n        name: topic\n      });\n    }\n  }\n\n  return results;\n} // derive the marker topics from the selected marker names which can be associated with this camera\n// (the camera topic must be rectified in order for markers to align properly)\n\n\nfunction getMarkerTopics(imageTopic, markerNames) {\n  const cameraNamespace = getCameraNamespace(imageTopic);\n\n  if (cameraNamespace) {\n    return markerNames.map(name => name.startsWith(\"/\") ? name : `${cameraNamespace}/${name}`);\n  }\n\n  return [];\n} // get the sensor_msgs/CameraInfo topic associated with an image topic\n\n\nfunction getCameraInfoTopic(imageTopic) {\n  const cameraNamespace = getCameraNamespace(imageTopic);\n\n  if (cameraNamespace) {\n    return `${cameraNamespace}/camera_info`;\n  }\n\n  return null;\n}\n\nfunction getCameraNamespace(topicName) {\n  let splitTopic = topicName.split(\"/\"); // Remove the last part of the selected topic to get the camera namespace.\n\n  splitTopic.pop();\n  splitTopic = splitTopic.filter(topicPart => topicPart !== \"old\"); // Since there is a leading slash in the topicName, splitTopic will always have at least one empty string to start.\n  // If we can't find the namespace, return null.\n\n  return splitTopic.length > 1 ? splitTopic.join(\"/\") : null;\n} // group topics by the first component of their name\n\n\nfunction groupTopics(topics) {\n  const imageTopicsByNamespace = new Map();\n\n  for (const topic of topics) {\n    const key = getCameraNamespace(topic.name) || topic.name;\n    const vals = imageTopicsByNamespace.get(key);\n\n    if (vals) {\n      vals.push(topic);\n    } else {\n      imageTopicsByNamespace.set(key, [topic]);\n    }\n  }\n\n  return imageTopicsByNamespace;\n} // check if we pan out of bounds with the given top, left, right, bottom\n// x, y, scale is the state after we pan\n// if out of bound, return newX and newY satisfying the bounds\n// else, return the original x and y\n\n\nfunction checkOutOfBounds(x, y, outsideWidth, outsideHeight, insideWidth, insideHeight) {\n  const leftX = 0;\n  const topY = 0;\n  const rightX = outsideWidth - insideWidth;\n  const bottomY = outsideHeight - insideHeight;\n  return [(0, _clamp.default)(x, Math.min(leftX, rightX), Math.max(leftX, rightX)), (0, _clamp.default)(y, Math.min(topY, bottomY), Math.max(topY, bottomY))];\n}\n\nfunction buildMarkerData(rawMarkerData) {\n  const {\n    markers,\n    scale,\n    transformMarkers,\n    cameraInfo\n  } = rawMarkerData;\n\n  if (markers.length === 0) {\n    return {\n      markers,\n      cameraModel: null,\n      originalHeight: undefined,\n      originalWidth: undefined\n    };\n  }\n\n  let cameraModel;\n\n  if (transformMarkers) {\n    if (!cameraInfo) {\n      return null;\n    }\n\n    cameraModel = new _CameraModel.default(cameraInfo);\n  } // Markers can only be rendered if we know the original size of the image.\n\n\n  let originalWidth;\n  let originalHeight;\n\n  if (cameraInfo && cameraInfo.width && cameraInfo.height) {\n    // Prefer using CameraInfo can be used to determine the image size.\n    originalWidth = cameraInfo.width;\n    originalHeight = cameraInfo.height;\n  } else if (scale === 1) {\n    // Otherwise, if scale === 1, the image was not downsampled, so the size of the bitmap is accurate.\n    originalWidth = undefined;\n    originalHeight = undefined;\n  } else {\n    return null;\n  }\n\n  return {\n    markers,\n    cameraModel,\n    originalWidth,\n    originalHeight\n  };\n}\n\nconst supportsOffscreenCanvas = (0, _memoize.default)(() => {\n  try {\n    // $FlowFixMe This is a function that is not yet in Flow.\n    document.createElement(\"canvas\").transferControlToOffscreen();\n  } catch (error) {\n    (0, _reportError.default)(\"Rendering the image view in a worker is unsupported in this browser, falling back to rendering using the main thread\", \"\", \"app\");\n    return false;\n  }\n\n  return true;\n});\nexports.supportsOffscreenCanvas = supportsOffscreenCanvas;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWNrYWdlcy93ZWJ2aXotY29yZS9zcmMvcGFuZWxzL0ltYWdlVmlldy91dGlsLmpzLmpzIiwic291cmNlcyI6WyIvaG9tZS9ub2RlL3dlYnZpei9wYWNrYWdlcy93ZWJ2aXotY29yZS9zcmMvcGFuZWxzL0ltYWdlVmlldy91dGlsLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIEBmbG93XG4vL1xuLy8gIENvcHlyaWdodCAoYykgMjAxOC1wcmVzZW50LCBDcnVpc2UgTExDXG4vL1xuLy8gIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCxcbi8vICBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuLy8gIFlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cblxuaW1wb3J0IGNsYW1wIGZyb20gXCJsb2Rhc2gvY2xhbXBcIjtcbmltcG9ydCBtZW1vaXplIGZyb20gXCJsb2Rhc2gvbWVtb2l6ZVwiO1xuXG5pbXBvcnQgQ2FtZXJhTW9kZWwgZnJvbSBcIi4vQ2FtZXJhTW9kZWxcIjtcbmltcG9ydCB0eXBlIHsgVG9waWMsIE1lc3NhZ2UgfSBmcm9tIFwid2Vidml6LWNvcmUvc3JjL3BsYXllcnMvdHlwZXNcIjtcbmltcG9ydCB0eXBlIHsgQ2FtZXJhSW5mbyB9IGZyb20gXCJ3ZWJ2aXotY29yZS9zcmMvdHlwZXMvTWVzc2FnZXNcIjtcbmltcG9ydCByZXBvcnRFcnJvciBmcm9tIFwid2Vidml6LWNvcmUvc3JjL3V0aWwvcmVwb3J0RXJyb3JcIjtcblxuLy8gVGhlIE9mZnNjcmVlbkNhbnZhcyB0eXBlIGlzIG5vdCB5ZXQgaW4gRmxvdy4gSXQncyBzaW1pbGFyIHRvLCBidXQgbW9yZSByZXN0cmljdGl2ZSB0aGFuIEhUTUxDYW52YXNFbGVtZW50LlxuLy8gVE9ETzogY2hhbmdlIHRoaXMgdG8gdGhlIEZsb3cgZGVmaW5pdGlvbiBvbmNlIGl0J3MgYmVlbiBhZGRlZC5cbmV4cG9ydCB0eXBlIE9mZnNjcmVlbkNhbnZhcyA9IEhUTUxDYW52YXNFbGVtZW50O1xuXG5leHBvcnQgdHlwZSBEaW1lbnNpb25zID0ge3wgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIgfH07XG5cbmV4cG9ydCB0eXBlIE1hcmtlck9wdGlvbiA9IHtcbiAgdG9waWM6IHN0cmluZyxcbiAgbmFtZTogc3RyaW5nLFxufTtcblxuZXhwb3J0IHR5cGUgUmF3TWFya2VyRGF0YSA9IHt8XG4gIG1hcmtlcnM6IE1lc3NhZ2VbXSxcbiAgc2NhbGU6IG51bWJlcixcbiAgdHJhbnNmb3JtTWFya2VyczogYm9vbGVhbixcbiAgY2FtZXJhSW5mbzogP0NhbWVyYUluZm8sXG58fTtcblxuZXhwb3J0IHR5cGUgTWFya2VyRGF0YSA9ID97fFxuICBtYXJrZXJzOiBNZXNzYWdlW10sXG4gIG9yaWdpbmFsV2lkdGg6ID9udW1iZXIsIC8vIG51bGwgbWVhbnMgbm8gc2NhbGluZyBpcyBuZWVkZWQgKHVzZSB0aGUgaW1hZ2UncyBzaXplKVxuICBvcmlnaW5hbEhlaWdodDogP251bWJlciwgLy8gbnVsbCBtZWFucyBubyBzY2FsaW5nIGlzIG5lZWRlZCAodXNlIHRoZSBpbWFnZSdzIHNpemUpXG4gIGNhbWVyYU1vZGVsOiA/Q2FtZXJhTW9kZWwsIC8vIG51bGwgbWVhbnMgbm8gdHJhbnNmb3JtYXRpb24gaXMgbmVlZGVkXG58fTtcblxuLy8gZ2l2ZW4gYWxsIGF2YWlsYWJsZSBtYXJrZXIgdG9waWNzLCBmaWx0ZXIgb3V0IHRoZSBuYW1lcyB0aGF0IGFyZSBhdmFpbGFibGUgZm9yIHRoaXMgaW1hZ2UgdG9waWNcbmV4cG9ydCBmdW5jdGlvbiBnZXRNYXJrZXJPcHRpb25zKFxuICBpbWFnZVRvcGljOiBzdHJpbmcsXG4gIG1hcmtlclRvcGljczogc3RyaW5nW10sXG4gIGFsbENhbWVyYU5hbWVzcGFjZXM6IHN0cmluZ1tdXG4pOiBNYXJrZXJPcHRpb25bXSB7XG4gIGNvbnN0IHJlc3VsdHMgPSBbXTtcbiAgY29uc3QgY2FtZXJhTmFtZXNwYWNlID0gZ2V0Q2FtZXJhTmFtZXNwYWNlKGltYWdlVG9waWMpO1xuICBmb3IgKGNvbnN0IHRvcGljIG9mIG1hcmtlclRvcGljcykge1xuICAgIGlmIChjYW1lcmFOYW1lc3BhY2UgJiYgdG9waWMuc3RhcnRzV2l0aChjYW1lcmFOYW1lc3BhY2UpKSB7XG4gICAgICByZXN1bHRzLnB1c2goeyB0b3BpYywgbmFtZTogdG9waWMuc3Vic3RyKGNhbWVyYU5hbWVzcGFjZS5sZW5ndGgpLnJlcGxhY2UoL15cXC8vLCBcIlwiKSB9KTtcbiAgICB9IGVsc2UgaWYgKGNhbWVyYU5hbWVzcGFjZSAmJiB0b3BpYy5zdGFydHNXaXRoKGAvb2xkJHtjYW1lcmFOYW1lc3BhY2V9YCkpIHtcbiAgICAgIHJlc3VsdHMucHVzaCh7IHRvcGljLCBuYW1lOiB0b3BpYyB9KTtcbiAgICB9IGVsc2UgaWYgKGFsbENhbWVyYU5hbWVzcGFjZXMuaW5jbHVkZXMoZ2V0Q2FtZXJhTmFtZXNwYWNlKHRvcGljKSkpIHtcbiAgICAgIC8vIHRoaXMgdG9waWMgY29ycmVzcG9uZHMgdG8gYSBkaWZmZXJlbnQgY2FtZXJhXG4gICAgICBjb250aW51ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0cy5wdXNoKHsgdG9waWMsIG5hbWU6IHRvcGljIH0pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0cztcbn1cblxuLy8gZGVyaXZlIHRoZSBtYXJrZXIgdG9waWNzIGZyb20gdGhlIHNlbGVjdGVkIG1hcmtlciBuYW1lcyB3aGljaCBjYW4gYmUgYXNzb2NpYXRlZCB3aXRoIHRoaXMgY2FtZXJhXG4vLyAodGhlIGNhbWVyYSB0b3BpYyBtdXN0IGJlIHJlY3RpZmllZCBpbiBvcmRlciBmb3IgbWFya2VycyB0byBhbGlnbiBwcm9wZXJseSlcbmV4cG9ydCBmdW5jdGlvbiBnZXRNYXJrZXJUb3BpY3MoaW1hZ2VUb3BpYzogc3RyaW5nLCBtYXJrZXJOYW1lczogc3RyaW5nW10pOiBzdHJpbmdbXSB7XG4gIGNvbnN0IGNhbWVyYU5hbWVzcGFjZSA9IGdldENhbWVyYU5hbWVzcGFjZShpbWFnZVRvcGljKTtcbiAgaWYgKGNhbWVyYU5hbWVzcGFjZSkge1xuICAgIHJldHVybiBtYXJrZXJOYW1lcy5tYXAoKG5hbWUpID0+IChuYW1lLnN0YXJ0c1dpdGgoXCIvXCIpID8gbmFtZSA6IGAke2NhbWVyYU5hbWVzcGFjZX0vJHtuYW1lfWApKTtcbiAgfVxuICByZXR1cm4gW107XG59XG5cbi8vIGdldCB0aGUgc2Vuc29yX21zZ3MvQ2FtZXJhSW5mbyB0b3BpYyBhc3NvY2lhdGVkIHdpdGggYW4gaW1hZ2UgdG9waWNcbmV4cG9ydCBmdW5jdGlvbiBnZXRDYW1lcmFJbmZvVG9waWMoaW1hZ2VUb3BpYzogc3RyaW5nKTogP3N0cmluZyB7XG4gIGNvbnN0IGNhbWVyYU5hbWVzcGFjZSA9IGdldENhbWVyYU5hbWVzcGFjZShpbWFnZVRvcGljKTtcbiAgaWYgKGNhbWVyYU5hbWVzcGFjZSkge1xuICAgIHJldHVybiBgJHtjYW1lcmFOYW1lc3BhY2V9L2NhbWVyYV9pbmZvYDtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldENhbWVyYU5hbWVzcGFjZSh0b3BpY05hbWU6IHN0cmluZyk6ID9zdHJpbmcge1xuICBsZXQgc3BsaXRUb3BpYyA9IHRvcGljTmFtZS5zcGxpdChcIi9cIik7XG4gIC8vIFJlbW92ZSB0aGUgbGFzdCBwYXJ0IG9mIHRoZSBzZWxlY3RlZCB0b3BpYyB0byBnZXQgdGhlIGNhbWVyYSBuYW1lc3BhY2UuXG4gIHNwbGl0VG9waWMucG9wKCk7XG4gIHNwbGl0VG9waWMgPSBzcGxpdFRvcGljLmZpbHRlcigodG9waWNQYXJ0KSA9PiB0b3BpY1BhcnQgIT09IFwib2xkXCIpO1xuXG4gIC8vIFNpbmNlIHRoZXJlIGlzIGEgbGVhZGluZyBzbGFzaCBpbiB0aGUgdG9waWNOYW1lLCBzcGxpdFRvcGljIHdpbGwgYWx3YXlzIGhhdmUgYXQgbGVhc3Qgb25lIGVtcHR5IHN0cmluZyB0byBzdGFydC5cbiAgLy8gSWYgd2UgY2FuJ3QgZmluZCB0aGUgbmFtZXNwYWNlLCByZXR1cm4gbnVsbC5cbiAgcmV0dXJuIHNwbGl0VG9waWMubGVuZ3RoID4gMSA/IHNwbGl0VG9waWMuam9pbihcIi9cIikgOiBudWxsO1xufVxuXG4vLyBncm91cCB0b3BpY3MgYnkgdGhlIGZpcnN0IGNvbXBvbmVudCBvZiB0aGVpciBuYW1lXG5leHBvcnQgZnVuY3Rpb24gZ3JvdXBUb3BpY3ModG9waWNzOiBUb3BpY1tdKTogTWFwPHN0cmluZywgVG9waWNbXT4ge1xuICBjb25zdCBpbWFnZVRvcGljc0J5TmFtZXNwYWNlOiBNYXA8c3RyaW5nLCBUb3BpY1tdPiA9IG5ldyBNYXAoKTtcbiAgZm9yIChjb25zdCB0b3BpYyBvZiB0b3BpY3MpIHtcbiAgICBjb25zdCBrZXkgPSBnZXRDYW1lcmFOYW1lc3BhY2UodG9waWMubmFtZSkgfHwgdG9waWMubmFtZTtcbiAgICBjb25zdCB2YWxzID0gaW1hZ2VUb3BpY3NCeU5hbWVzcGFjZS5nZXQoa2V5KTtcbiAgICBpZiAodmFscykge1xuICAgICAgdmFscy5wdXNoKHRvcGljKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaW1hZ2VUb3BpY3NCeU5hbWVzcGFjZS5zZXQoa2V5LCBbdG9waWNdKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGltYWdlVG9waWNzQnlOYW1lc3BhY2U7XG59XG5cbi8vIGNoZWNrIGlmIHdlIHBhbiBvdXQgb2YgYm91bmRzIHdpdGggdGhlIGdpdmVuIHRvcCwgbGVmdCwgcmlnaHQsIGJvdHRvbVxuLy8geCwgeSwgc2NhbGUgaXMgdGhlIHN0YXRlIGFmdGVyIHdlIHBhblxuLy8gaWYgb3V0IG9mIGJvdW5kLCByZXR1cm4gbmV3WCBhbmQgbmV3WSBzYXRpc2Z5aW5nIHRoZSBib3VuZHNcbi8vIGVsc2UsIHJldHVybiB0aGUgb3JpZ2luYWwgeCBhbmQgeVxuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrT3V0T2ZCb3VuZHMoXG4gIHg6IG51bWJlcixcbiAgeTogbnVtYmVyLFxuICBvdXRzaWRlV2lkdGg6IG51bWJlcixcbiAgb3V0c2lkZUhlaWdodDogbnVtYmVyLFxuICBpbnNpZGVXaWR0aDogbnVtYmVyLFxuICBpbnNpZGVIZWlnaHQ6IG51bWJlclxuKTogbnVtYmVyW10ge1xuICBjb25zdCBsZWZ0WCA9IDA7XG4gIGNvbnN0IHRvcFkgPSAwO1xuICBjb25zdCByaWdodFggPSBvdXRzaWRlV2lkdGggLSBpbnNpZGVXaWR0aDtcbiAgY29uc3QgYm90dG9tWSA9IG91dHNpZGVIZWlnaHQgLSBpbnNpZGVIZWlnaHQ7XG4gIHJldHVybiBbXG4gICAgY2xhbXAoeCwgTWF0aC5taW4obGVmdFgsIHJpZ2h0WCksIE1hdGgubWF4KGxlZnRYLCByaWdodFgpKSxcbiAgICBjbGFtcCh5LCBNYXRoLm1pbih0b3BZLCBib3R0b21ZKSwgTWF0aC5tYXgodG9wWSwgYm90dG9tWSkpLFxuICBdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRNYXJrZXJEYXRhKHJhd01hcmtlckRhdGE6IFJhd01hcmtlckRhdGEpOiA/TWFya2VyRGF0YSB7XG4gIGNvbnN0IHsgbWFya2Vycywgc2NhbGUsIHRyYW5zZm9ybU1hcmtlcnMsIGNhbWVyYUluZm8gfSA9IHJhd01hcmtlckRhdGE7XG4gIGlmIChtYXJrZXJzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiB7XG4gICAgICBtYXJrZXJzLFxuICAgICAgY2FtZXJhTW9kZWw6IG51bGwsXG4gICAgICBvcmlnaW5hbEhlaWdodDogdW5kZWZpbmVkLFxuICAgICAgb3JpZ2luYWxXaWR0aDogdW5kZWZpbmVkLFxuICAgIH07XG4gIH1cbiAgbGV0IGNhbWVyYU1vZGVsO1xuICBpZiAodHJhbnNmb3JtTWFya2Vycykge1xuICAgIGlmICghY2FtZXJhSW5mbykge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGNhbWVyYU1vZGVsID0gbmV3IENhbWVyYU1vZGVsKGNhbWVyYUluZm8pO1xuICB9XG5cbiAgLy8gTWFya2VycyBjYW4gb25seSBiZSByZW5kZXJlZCBpZiB3ZSBrbm93IHRoZSBvcmlnaW5hbCBzaXplIG9mIHRoZSBpbWFnZS5cbiAgbGV0IG9yaWdpbmFsV2lkdGg7XG4gIGxldCBvcmlnaW5hbEhlaWdodDtcbiAgaWYgKGNhbWVyYUluZm8gJiYgY2FtZXJhSW5mby53aWR0aCAmJiBjYW1lcmFJbmZvLmhlaWdodCkge1xuICAgIC8vIFByZWZlciB1c2luZyBDYW1lcmFJbmZvIGNhbiBiZSB1c2VkIHRvIGRldGVybWluZSB0aGUgaW1hZ2Ugc2l6ZS5cbiAgICBvcmlnaW5hbFdpZHRoID0gY2FtZXJhSW5mby53aWR0aDtcbiAgICBvcmlnaW5hbEhlaWdodCA9IGNhbWVyYUluZm8uaGVpZ2h0O1xuICB9IGVsc2UgaWYgKHNjYWxlID09PSAxKSB7XG4gICAgLy8gT3RoZXJ3aXNlLCBpZiBzY2FsZSA9PT0gMSwgdGhlIGltYWdlIHdhcyBub3QgZG93bnNhbXBsZWQsIHNvIHRoZSBzaXplIG9mIHRoZSBiaXRtYXAgaXMgYWNjdXJhdGUuXG4gICAgb3JpZ2luYWxXaWR0aCA9IHVuZGVmaW5lZDtcbiAgICBvcmlnaW5hbEhlaWdodCA9IHVuZGVmaW5lZDtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgbWFya2VycyxcbiAgICBjYW1lcmFNb2RlbCxcbiAgICBvcmlnaW5hbFdpZHRoLFxuICAgIG9yaWdpbmFsSGVpZ2h0LFxuICB9O1xufVxuXG5leHBvcnQgY29uc3Qgc3VwcG9ydHNPZmZzY3JlZW5DYW52YXM6ICgpID0+IGJvb2xlYW4gPSBtZW1vaXplKFxuICAoKTogYm9vbGVhbiA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIC8vICRGbG93Rml4TWUgVGhpcyBpcyBhIGZ1bmN0aW9uIHRoYXQgaXMgbm90IHlldCBpbiBGbG93LlxuICAgICAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKS50cmFuc2ZlckNvbnRyb2xUb09mZnNjcmVlbigpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICByZXBvcnRFcnJvcihcbiAgICAgICAgXCJSZW5kZXJpbmcgdGhlIGltYWdlIHZpZXcgaW4gYSB3b3JrZXIgaXMgdW5zdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyLCBmYWxsaW5nIGJhY2sgdG8gcmVuZGVyaW5nIHVzaW5nIHRoZSBtYWluIHRocmVhZFwiLFxuICAgICAgICBcIlwiLFxuICAgICAgICBcImFwcFwiXG4gICAgICApO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuKTtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFRQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBOzs7QUFkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFtQ0E7QUFDQTtBQUtBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQURBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBTUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFNQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBS0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./packages/webviz-core/src/panels/ImageView/util.js\n");

/***/ }),

/***/ "./packages/webviz-core/src/util/Rpc.js":
/*!**********************************************!*\
  !*** ./packages/webviz-core/src/util/Rpc.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.createLinkedChannels = createLinkedChannels;\nexports.default = void 0;\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n//\n//  Copyright (c) 2018-present, Cruise LLC\n//\n//  This source code is licensed under the Apache License, Version 2.0,\n//  found in the LICENSE file in the root directory of this source tree.\n//  You may not use this file except in compliance with the License.\n// this type mirrors the MessageChannel api which is available on\n// instances of web-workers as well as avaiable on 'global' within a worker\nconst RESPONSE = \"$$RESPONSE\";\nconst ERROR = \"$$ERROR\"; // helper function to create linked channels for testing\n\nfunction createLinkedChannels() {\n  const local = {\n    onmessage: undefined,\n\n    postMessage(data, transfer) {\n      const ev = new MessageEvent(\"message\", {\n        data\n      }); // eslint-disable-next-line no-use-before-define\n\n      if (remote.onmessage) {\n        remote.onmessage(ev); // eslint-disable-line no-use-before-define\n      }\n    },\n\n    terminate: () => {}\n  };\n  const remote = {\n    onmessage: undefined,\n\n    postMessage(data, transfer) {\n      const ev = new MessageEvent(\"message\", {\n        data\n      });\n\n      if (local.onmessage) {\n        local.onmessage(ev);\n      }\n    },\n\n    terminate: () => {}\n  };\n  return {\n    local,\n    remote\n  };\n} // This class allows you to hook up bi-directional async calls across web-worker\n// boundaries where a single call to or from a worker can 'wait' on the response.\n// Errors in receivers are propigated back to the caller as a rejection.\n// It also supports returning transferrables over the web-worker postMessage api,\n// which was the main shortcomming with the worker-rpc npm module.\n// To attach rpc to an instance of a worker in the main thread:\n//   const rpc = new Rpc(workerInstace);\n// To attach rpc within an a web worker:\n//   const rpc = new Rpc(global);\n// Check out the tests for more examples.\n\n\nclass Rpc {\n  constructor(channel) {\n    _defineProperty(this, \"_channel\", void 0);\n\n    _defineProperty(this, \"_messageId\", 0);\n\n    _defineProperty(this, \"_pendingCallbacks\", {});\n\n    _defineProperty(this, \"_receivers\", new Map());\n\n    _defineProperty(this, \"_onChannelMessage\", ev => {\n      const {\n        id,\n        topic,\n        data\n      } = ev.data;\n\n      if (topic === RESPONSE) {\n        this._pendingCallbacks[id](ev.data);\n\n        delete this._pendingCallbacks[id];\n        return;\n      } // invoke the receive handler in a promise so if it throws synchronously we can reject\n\n\n      new Promise((resolve, reject) => {\n        const handler = this._receivers.get(topic);\n\n        if (!handler) {\n          throw new Error(`no receiver registered for ${topic}`);\n        } // This works both when `handler` returns a value or a Promise.\n\n\n        resolve(handler(data));\n      }).then(result => {\n        if (!result) {\n          return this._channel.postMessage({\n            topic: RESPONSE,\n            id\n          });\n        }\n\n        const transferrables = result[Rpc.transferrables];\n        delete result[Rpc.transferrables];\n        const message = {\n          topic: RESPONSE,\n          id,\n          data: result\n        };\n\n        this._channel.postMessage(message, transferrables);\n      }).catch(err => {\n        const message = {\n          topic: RESPONSE,\n          id,\n          data: {\n            [ERROR]: true,\n            name: err.name,\n            message: err.message,\n            stack: err.stack\n          }\n        };\n\n        this._channel.postMessage(message);\n      });\n    });\n\n    this._channel = channel;\n\n    if (this._channel.onmessage) {\n      throw new Error(\"channel.onmessage is already set. Can only use one Rpc instance per channel.\");\n    }\n\n    this._channel.onmessage = this._onChannelMessage;\n  }\n\n  // send a message across the rpc boundary to a receiver on the other side\n  // this returns a promise for the receiver's response.  If there is no registered\n  // receiver for the given topic, this method throws\n  send(topic, data, transfer) {\n    const id = this._messageId++;\n    const message = {\n      topic,\n      id,\n      data\n    };\n    const result = new Promise((resolve, reject) => {\n      this._pendingCallbacks[id] = info => {\n        if (info.data && info.data[ERROR]) {\n          const error = new Error(info.data.message);\n          error.name = info.data.name;\n          error.stack = info.data.stack;\n          reject(error);\n        } else {\n          resolve(info.data);\n        }\n      };\n    });\n\n    this._channel.postMessage(message, transfer);\n\n    return result;\n  } // register a receiver for a given message on a topic\n  // only one receiver can be registered per topic and currently\n  // 'deregistering' a receiver is not supported since this is not common\n\n\n  receive(topic, handler) {\n    if (this._receivers.has(topic)) {\n      throw new Error(`Receiver already registered for topic: ${topic}`);\n    }\n\n    this._receivers.set(topic, handler);\n  }\n\n}\n\nexports.default = Rpc;\n\n_defineProperty(Rpc, \"transferrables\", \"$$TRANSFERRABLES\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWNrYWdlcy93ZWJ2aXotY29yZS9zcmMvdXRpbC9ScGMuanMuanMiLCJzb3VyY2VzIjpbIi9ob21lL25vZGUvd2Vidml6L3BhY2thZ2VzL3dlYnZpei1jb3JlL3NyYy91dGlsL1JwYy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBAZmxvd1xuLy9cbi8vICBDb3B5cmlnaHQgKGMpIDIwMTgtcHJlc2VudCwgQ3J1aXNlIExMQ1xuLy9cbi8vICBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAsXG4vLyAgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbi8vICBZb3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5cbi8vIHRoaXMgdHlwZSBtaXJyb3JzIHRoZSBNZXNzYWdlQ2hhbm5lbCBhcGkgd2hpY2ggaXMgYXZhaWxhYmxlIG9uXG4vLyBpbnN0YW5jZXMgb2Ygd2ViLXdvcmtlcnMgYXMgd2VsbCBhcyBhdmFpYWJsZSBvbiAnZ2xvYmFsJyB3aXRoaW4gYSB3b3JrZXJcbmV4cG9ydCBpbnRlcmZhY2UgQ2hhbm5lbCB7XG4gIHBvc3RNZXNzYWdlKGRhdGE6IGFueSwgdHJhbnNmZXI/OiBhbnlbXSk6IHZvaWQ7XG4gIG9ubWVzc2FnZTogPyhldjogTWVzc2FnZUV2ZW50KSA9PiB2b2lkO1xuICB0ZXJtaW5hdGU6ICgpID0+IHZvaWQ7XG59XG5cbmNvbnN0IFJFU1BPTlNFID0gXCIkJFJFU1BPTlNFXCI7XG5jb25zdCBFUlJPUiA9IFwiJCRFUlJPUlwiO1xuXG4vLyBoZWxwZXIgZnVuY3Rpb24gdG8gY3JlYXRlIGxpbmtlZCBjaGFubmVscyBmb3IgdGVzdGluZ1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUxpbmtlZENoYW5uZWxzKCk6IHsgbG9jYWw6IENoYW5uZWwsIHJlbW90ZTogQ2hhbm5lbCB9IHtcbiAgY29uc3QgbG9jYWw6IENoYW5uZWwgPSB7XG4gICAgb25tZXNzYWdlOiB1bmRlZmluZWQsXG4gICAgcG9zdE1lc3NhZ2UoZGF0YTogYW55LCB0cmFuc2Zlcj86IEFycmF5PEFycmF5QnVmZmVyPikge1xuICAgICAgY29uc3QgZXYgPSBuZXcgTWVzc2FnZUV2ZW50KFwibWVzc2FnZVwiLCB7IGRhdGEgfSk7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdXNlLWJlZm9yZS1kZWZpbmVcbiAgICAgIGlmIChyZW1vdGUub25tZXNzYWdlKSB7XG4gICAgICAgIHJlbW90ZS5vbm1lc3NhZ2UoZXYpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVzZS1iZWZvcmUtZGVmaW5lXG4gICAgICB9XG4gICAgfSxcbiAgICB0ZXJtaW5hdGU6ICgpID0+IHt9LFxuICB9O1xuXG4gIGNvbnN0IHJlbW90ZTogQ2hhbm5lbCA9IHtcbiAgICBvbm1lc3NhZ2U6IHVuZGVmaW5lZCxcbiAgICBwb3N0TWVzc2FnZShkYXRhOiBhbnksIHRyYW5zZmVyPzogQXJyYXk8QXJyYXlCdWZmZXI+KSB7XG4gICAgICBjb25zdCBldiA9IG5ldyBNZXNzYWdlRXZlbnQoXCJtZXNzYWdlXCIsIHsgZGF0YSB9KTtcbiAgICAgIGlmIChsb2NhbC5vbm1lc3NhZ2UpIHtcbiAgICAgICAgbG9jYWwub25tZXNzYWdlKGV2KTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHRlcm1pbmF0ZTogKCkgPT4ge30sXG4gIH07XG4gIHJldHVybiB7IGxvY2FsLCByZW1vdGUgfTtcbn1cblxuLy8gVGhpcyBjbGFzcyBhbGxvd3MgeW91IHRvIGhvb2sgdXAgYmktZGlyZWN0aW9uYWwgYXN5bmMgY2FsbHMgYWNyb3NzIHdlYi13b3JrZXJcbi8vIGJvdW5kYXJpZXMgd2hlcmUgYSBzaW5nbGUgY2FsbCB0byBvciBmcm9tIGEgd29ya2VyIGNhbiAnd2FpdCcgb24gdGhlIHJlc3BvbnNlLlxuLy8gRXJyb3JzIGluIHJlY2VpdmVycyBhcmUgcHJvcGlnYXRlZCBiYWNrIHRvIHRoZSBjYWxsZXIgYXMgYSByZWplY3Rpb24uXG4vLyBJdCBhbHNvIHN1cHBvcnRzIHJldHVybmluZyB0cmFuc2ZlcnJhYmxlcyBvdmVyIHRoZSB3ZWItd29ya2VyIHBvc3RNZXNzYWdlIGFwaSxcbi8vIHdoaWNoIHdhcyB0aGUgbWFpbiBzaG9ydGNvbW1pbmcgd2l0aCB0aGUgd29ya2VyLXJwYyBucG0gbW9kdWxlLlxuLy8gVG8gYXR0YWNoIHJwYyB0byBhbiBpbnN0YW5jZSBvZiBhIHdvcmtlciBpbiB0aGUgbWFpbiB0aHJlYWQ6XG4vLyAgIGNvbnN0IHJwYyA9IG5ldyBScGMod29ya2VySW5zdGFjZSk7XG4vLyBUbyBhdHRhY2ggcnBjIHdpdGhpbiBhbiBhIHdlYiB3b3JrZXI6XG4vLyAgIGNvbnN0IHJwYyA9IG5ldyBScGMoZ2xvYmFsKTtcbi8vIENoZWNrIG91dCB0aGUgdGVzdHMgZm9yIG1vcmUgZXhhbXBsZXMuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBScGMge1xuICBzdGF0aWMgdHJhbnNmZXJyYWJsZXMgPSBcIiQkVFJBTlNGRVJSQUJMRVNcIjtcbiAgX2NoYW5uZWw6IENoYW5uZWw7XG4gIF9tZXNzYWdlSWQ6IG51bWJlciA9IDA7XG4gIF9wZW5kaW5nQ2FsbGJhY2tzOiB7IFtudW1iZXJdOiAoYW55KSA9PiB2b2lkIH0gPSB7fTtcbiAgX3JlY2VpdmVyczogTWFwPHN0cmluZywgKGFueSkgPT4gYW55PiA9IG5ldyBNYXAoKTtcblxuICBjb25zdHJ1Y3RvcihjaGFubmVsOiBDaGFubmVsKSB7XG4gICAgdGhpcy5fY2hhbm5lbCA9IGNoYW5uZWw7XG4gICAgaWYgKHRoaXMuX2NoYW5uZWwub25tZXNzYWdlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjaGFubmVsLm9ubWVzc2FnZSBpcyBhbHJlYWR5IHNldC4gQ2FuIG9ubHkgdXNlIG9uZSBScGMgaW5zdGFuY2UgcGVyIGNoYW5uZWwuXCIpO1xuICAgIH1cbiAgICB0aGlzLl9jaGFubmVsLm9ubWVzc2FnZSA9IHRoaXMuX29uQ2hhbm5lbE1lc3NhZ2U7XG4gIH1cblxuICBfb25DaGFubmVsTWVzc2FnZSA9IChldjogTWVzc2FnZUV2ZW50KSA9PiB7XG4gICAgY29uc3QgeyBpZCwgdG9waWMsIGRhdGEgfSA9IChldi5kYXRhOiBhbnkpO1xuICAgIGlmICh0b3BpYyA9PT0gUkVTUE9OU0UpIHtcbiAgICAgIHRoaXMuX3BlbmRpbmdDYWxsYmFja3NbaWRdKGV2LmRhdGEpO1xuICAgICAgZGVsZXRlIHRoaXMuX3BlbmRpbmdDYWxsYmFja3NbaWRdO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBpbnZva2UgdGhlIHJlY2VpdmUgaGFuZGxlciBpbiBhIHByb21pc2Ugc28gaWYgaXQgdGhyb3dzIHN5bmNocm9ub3VzbHkgd2UgY2FuIHJlamVjdFxuICAgIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IGhhbmRsZXIgPSB0aGlzLl9yZWNlaXZlcnMuZ2V0KHRvcGljKTtcbiAgICAgIGlmICghaGFuZGxlcikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYG5vIHJlY2VpdmVyIHJlZ2lzdGVyZWQgZm9yICR7dG9waWN9YCk7XG4gICAgICB9XG4gICAgICAvLyBUaGlzIHdvcmtzIGJvdGggd2hlbiBgaGFuZGxlcmAgcmV0dXJucyBhIHZhbHVlIG9yIGEgUHJvbWlzZS5cbiAgICAgIHJlc29sdmUoaGFuZGxlcihkYXRhKSk7XG4gICAgfSlcbiAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5fY2hhbm5lbC5wb3N0TWVzc2FnZSh7IHRvcGljOiBSRVNQT05TRSwgaWQgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdHJhbnNmZXJyYWJsZXMgPSByZXN1bHRbUnBjLnRyYW5zZmVycmFibGVzXTtcbiAgICAgICAgZGVsZXRlIHJlc3VsdFtScGMudHJhbnNmZXJyYWJsZXNdO1xuICAgICAgICBjb25zdCBtZXNzYWdlID0ge1xuICAgICAgICAgIHRvcGljOiBSRVNQT05TRSxcbiAgICAgICAgICBpZCxcbiAgICAgICAgICBkYXRhOiByZXN1bHQsXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuX2NoYW5uZWwucG9zdE1lc3NhZ2UobWVzc2FnZSwgdHJhbnNmZXJyYWJsZXMpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSB7XG4gICAgICAgICAgdG9waWM6IFJFU1BPTlNFLFxuICAgICAgICAgIGlkLFxuICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIFtFUlJPUl06IHRydWUsXG4gICAgICAgICAgICBuYW1lOiBlcnIubmFtZSxcbiAgICAgICAgICAgIG1lc3NhZ2U6IGVyci5tZXNzYWdlLFxuICAgICAgICAgICAgc3RhY2s6IGVyci5zdGFjayxcbiAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLl9jaGFubmVsLnBvc3RNZXNzYWdlKG1lc3NhZ2UpO1xuICAgICAgfSk7XG4gIH07XG5cbiAgLy8gc2VuZCBhIG1lc3NhZ2UgYWNyb3NzIHRoZSBycGMgYm91bmRhcnkgdG8gYSByZWNlaXZlciBvbiB0aGUgb3RoZXIgc2lkZVxuICAvLyB0aGlzIHJldHVybnMgYSBwcm9taXNlIGZvciB0aGUgcmVjZWl2ZXIncyByZXNwb25zZS4gIElmIHRoZXJlIGlzIG5vIHJlZ2lzdGVyZWRcbiAgLy8gcmVjZWl2ZXIgZm9yIHRoZSBnaXZlbiB0b3BpYywgdGhpcyBtZXRob2QgdGhyb3dzXG4gIHNlbmQ8VFJlc3VsdD4odG9waWM6IHN0cmluZywgZGF0YTogYW55LCB0cmFuc2Zlcj86IEFycmF5QnVmZmVyW10pOiBQcm9taXNlPFRSZXN1bHQ+IHtcbiAgICBjb25zdCBpZCA9IHRoaXMuX21lc3NhZ2VJZCsrO1xuICAgIGNvbnN0IG1lc3NhZ2UgPSB7IHRvcGljLCBpZCwgZGF0YSB9O1xuICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMuX3BlbmRpbmdDYWxsYmFja3NbaWRdID0gKGluZm8pID0+IHtcbiAgICAgICAgaWYgKGluZm8uZGF0YSAmJiBpbmZvLmRhdGFbRVJST1JdKSB7XG4gICAgICAgICAgY29uc3QgZXJyb3IgPSBuZXcgRXJyb3IoaW5mby5kYXRhLm1lc3NhZ2UpO1xuICAgICAgICAgIGVycm9yLm5hbWUgPSBpbmZvLmRhdGEubmFtZTtcbiAgICAgICAgICBlcnJvci5zdGFjayA9IGluZm8uZGF0YS5zdGFjaztcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc29sdmUoaW5mby5kYXRhKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9KTtcbiAgICB0aGlzLl9jaGFubmVsLnBvc3RNZXNzYWdlKG1lc3NhZ2UsIHRyYW5zZmVyKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLy8gcmVnaXN0ZXIgYSByZWNlaXZlciBmb3IgYSBnaXZlbiBtZXNzYWdlIG9uIGEgdG9waWNcbiAgLy8gb25seSBvbmUgcmVjZWl2ZXIgY2FuIGJlIHJlZ2lzdGVyZWQgcGVyIHRvcGljIGFuZCBjdXJyZW50bHlcbiAgLy8gJ2RlcmVnaXN0ZXJpbmcnIGEgcmVjZWl2ZXIgaXMgbm90IHN1cHBvcnRlZCBzaW5jZSB0aGlzIGlzIG5vdCBjb21tb25cbiAgcmVjZWl2ZTxULCBUT3V0Pih0b3BpYzogc3RyaW5nLCBoYW5kbGVyOiAoVCkgPT4gVE91dCkge1xuICAgIGlmICh0aGlzLl9yZWNlaXZlcnMuaGFzKHRvcGljKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBSZWNlaXZlciBhbHJlYWR5IHJlZ2lzdGVyZWQgZm9yIHRvcGljOiAke3RvcGljfWApO1xuICAgIH1cbiAgICB0aGlzLl9yZWNlaXZlcnMuc2V0KHRvcGljLCBoYW5kbGVyKTtcbiAgfVxufVxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQU9BO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQVRBO0FBWUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQVJBO0FBVUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQU9BO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFEQTtBQUNBO0FBREE7QUFDQTtBQURBO0FBU0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUNBO0FBSUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQUhBO0FBQ0E7QUFTQTtBQUNBO0FBQ0E7QUFDQTtBQWxEQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUE2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBMUZBO0FBQ0E7OztBQURBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./packages/webviz-core/src/util/Rpc.js\n");

/***/ }),

/***/ "./packages/webviz-core/src/util/RpcUtils.js":
/*!***************************************************!*\
  !*** ./packages/webviz-core/src/util/RpcUtils.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.setupSendReportErrorHandler = setupSendReportErrorHandler;\nexports.setupReceiveReportErrorHandler = setupReceiveReportErrorHandler;\n\nvar _Rpc = _interopRequireDefault(__webpack_require__(/*! ./Rpc */ \"./packages/webviz-core/src/util/Rpc.js\"));\n\nvar _reportError = _interopRequireWildcard(__webpack_require__(/*! webviz-core/src/util/reportError */ \"./packages/webviz-core/src/util/reportError.js\"));\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n//\n//  Copyright (c) 2018-present, Cruise LLC\n//\n//  This source code is licensed under the Apache License, Version 2.0,\n//  found in the LICENSE file in the root directory of this source tree.\n//  You may not use this file except in compliance with the License.\n// We frequently want to propagate errors to the main thread so that they can be displayed to the user.\n// This function should be called inside the worker; it sets up sending a message to the parent thread when\n// reportError is called.\nfunction setupSendReportErrorHandler(rpc) {\n  (0, _reportError.setErrorHandler)((message, details, type) => {\n    rpc.send(\"reportError\", {\n      message,\n      details: details instanceof Error ? details.toString() : JSON.stringify(details),\n      type\n    });\n  });\n} // This function should be called inside the parent thread; it sets up receiving a message from the worker thread and\n// calling reportError.\n\n\nfunction setupReceiveReportErrorHandler(rpc) {\n  rpc.receive(\"reportError\", ({\n    message,\n    details,\n    type\n  }) => {\n    (0, _reportError.default)(message, details, type);\n  });\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWNrYWdlcy93ZWJ2aXotY29yZS9zcmMvdXRpbC9ScGNVdGlscy5qcy5qcyIsInNvdXJjZXMiOlsiL2hvbWUvbm9kZS93ZWJ2aXovcGFja2FnZXMvd2Vidml6LWNvcmUvc3JjL3V0aWwvUnBjVXRpbHMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQGZsb3dcbi8vXG4vLyAgQ29weXJpZ2h0IChjKSAyMDE4LXByZXNlbnQsIENydWlzZSBMTENcbi8vXG4vLyAgVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLFxuLy8gIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4vLyAgWW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuXG5pbXBvcnQgUnBjIGZyb20gXCIuL1JwY1wiO1xuaW1wb3J0IHJlcG9ydEVycm9yLCB7IHNldEVycm9ySGFuZGxlciwgdHlwZSBEZXRhaWxzVHlwZSwgdHlwZSBFcnJvclR5cGUgfSBmcm9tIFwid2Vidml6LWNvcmUvc3JjL3V0aWwvcmVwb3J0RXJyb3JcIjtcblxuLy8gV2UgZnJlcXVlbnRseSB3YW50IHRvIHByb3BhZ2F0ZSBlcnJvcnMgdG8gdGhlIG1haW4gdGhyZWFkIHNvIHRoYXQgdGhleSBjYW4gYmUgZGlzcGxheWVkIHRvIHRoZSB1c2VyLlxuLy8gVGhpcyBmdW5jdGlvbiBzaG91bGQgYmUgY2FsbGVkIGluc2lkZSB0aGUgd29ya2VyOyBpdCBzZXRzIHVwIHNlbmRpbmcgYSBtZXNzYWdlIHRvIHRoZSBwYXJlbnQgdGhyZWFkIHdoZW5cbi8vIHJlcG9ydEVycm9yIGlzIGNhbGxlZC5cbmV4cG9ydCBmdW5jdGlvbiBzZXR1cFNlbmRSZXBvcnRFcnJvckhhbmRsZXIocnBjOiBScGMpIHtcbiAgc2V0RXJyb3JIYW5kbGVyKChtZXNzYWdlOiBzdHJpbmcsIGRldGFpbHM6IERldGFpbHNUeXBlLCB0eXBlOiBFcnJvclR5cGUpID0+IHtcbiAgICBycGMuc2VuZChcInJlcG9ydEVycm9yXCIsIHtcbiAgICAgIG1lc3NhZ2UsXG4gICAgICBkZXRhaWxzOiBkZXRhaWxzIGluc3RhbmNlb2YgRXJyb3IgPyBkZXRhaWxzLnRvU3RyaW5nKCkgOiBKU09OLnN0cmluZ2lmeShkZXRhaWxzKSxcbiAgICAgIHR5cGUsXG4gICAgfSk7XG4gIH0pO1xufVxuXG4vLyBUaGlzIGZ1bmN0aW9uIHNob3VsZCBiZSBjYWxsZWQgaW5zaWRlIHRoZSBwYXJlbnQgdGhyZWFkOyBpdCBzZXRzIHVwIHJlY2VpdmluZyBhIG1lc3NhZ2UgZnJvbSB0aGUgd29ya2VyIHRocmVhZCBhbmRcbi8vIGNhbGxpbmcgcmVwb3J0RXJyb3IuXG5leHBvcnQgZnVuY3Rpb24gc2V0dXBSZWNlaXZlUmVwb3J0RXJyb3JIYW5kbGVyKHJwYzogUnBjKSB7XG4gIHJwYy5yZWNlaXZlKFwicmVwb3J0RXJyb3JcIiwgKHsgbWVzc2FnZSwgZGV0YWlscywgdHlwZSB9KSA9PiB7XG4gICAgcmVwb3J0RXJyb3IobWVzc2FnZSwgZGV0YWlscywgdHlwZSk7XG4gIH0pO1xufVxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQVFBO0FBQ0E7QUFBQTtBQUNBOzs7OztBQVRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQURBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./packages/webviz-core/src/util/RpcUtils.js\n");

/***/ }),

/***/ "./packages/webviz-core/src/util/reportError.js":
/*!******************************************************!*\
  !*** ./packages/webviz-core/src/util/reportError.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.setErrorHandler = setErrorHandler;\nexports.unsetErrorHandler = unsetErrorHandler;\nexports.detailsToString = detailsToString;\nexports.default = reportError;\n\n//\n//  Copyright (c) 2018-present, Cruise LLC\n//\n//  This source code is licensed under the Apache License, Version 2.0,\n//  found in the LICENSE file in the root directory of this source tree.\n//  You may not use this file except in compliance with the License.\n// For some handlers it's important to know if the error was due to the application malfunctioning\n// (programming error, dependency being down, etc) or a user mistake (incorrect/malformed data,\n// etc). We should generally prevent users from making mistakes in the first place, but sometimes\n// its unavoidable to bail out with a generic error message (e.g. when dragging in a malformed\n// ROS bag).\nconst defaultErrorHandler = (message, details, type) => {\n  // eslint-disable-next-line no-undef\n  if (typeof WorkerGlobalScope !== \"undefined\" && self instanceof WorkerGlobalScope) {\n    const webWorkerError = \"Web Worker has uninitialized reportError function; this means this error message cannot show up in the UI (so we show it here in the console instead).\";\n\n    if (false) {} else {\n      console.error(webWorkerError, message, details, type);\n    }\n\n    return;\n  } else if (false) {}\n\n  console.error(\"Error before error display is mounted\", message, details, type);\n};\n\nlet addError = defaultErrorHandler;\n\nfunction setErrorHandler(handler) {\n  if (addError !== defaultErrorHandler) {\n    throw new Error(\"Tried to overwrite existing ErrorHandler\");\n  }\n\n  addError = handler; // attach to window in dev mode for testing errors\n\n  if ( true && typeof window !== \"undefined\") {\n    window.addError = handler;\n  }\n}\n\nfunction unsetErrorHandler() {\n  if (addError === defaultErrorHandler) {\n    throw new Error(\"Tried to unset ErrorHandler but it was already the default\");\n  }\n\n  addError = defaultErrorHandler;\n}\n\nfunction detailsToString(details) {\n  if (typeof details === \"string\") {\n    return details;\n  }\n\n  if (details instanceof Error) {\n    return details.toString();\n  }\n\n  return \"unable to convert details to string type\";\n} // Call this to add an error to the application nav bar error component if mounted\n// if the component is not mounted, console.error is used as a fallback.\n\n\nfunction reportError(message, details, type) {\n  addError(message, details, type);\n}\n\nreportError.expectCalledDuringTest = () => {}; // Overridden in tests; added here so Flow doesn't complain.//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWNrYWdlcy93ZWJ2aXotY29yZS9zcmMvdXRpbC9yZXBvcnRFcnJvci5qcy5qcyIsInNvdXJjZXMiOlsiL2hvbWUvbm9kZS93ZWJ2aXovcGFja2FnZXMvd2Vidml6LWNvcmUvc3JjL3V0aWwvcmVwb3J0RXJyb3IuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQGZsb3dcbi8vXG4vLyAgQ29weXJpZ2h0IChjKSAyMDE4LXByZXNlbnQsIENydWlzZSBMTENcbi8vXG4vLyAgVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLFxuLy8gIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4vLyAgWW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuXG4vLyBGb3Igc29tZSBoYW5kbGVycyBpdCdzIGltcG9ydGFudCB0byBrbm93IGlmIHRoZSBlcnJvciB3YXMgZHVlIHRvIHRoZSBhcHBsaWNhdGlvbiBtYWxmdW5jdGlvbmluZ1xuLy8gKHByb2dyYW1taW5nIGVycm9yLCBkZXBlbmRlbmN5IGJlaW5nIGRvd24sIGV0Yykgb3IgYSB1c2VyIG1pc3Rha2UgKGluY29ycmVjdC9tYWxmb3JtZWQgZGF0YSxcbi8vIGV0YykuIFdlIHNob3VsZCBnZW5lcmFsbHkgcHJldmVudCB1c2VycyBmcm9tIG1ha2luZyBtaXN0YWtlcyBpbiB0aGUgZmlyc3QgcGxhY2UsIGJ1dCBzb21ldGltZXNcbi8vIGl0cyB1bmF2b2lkYWJsZSB0byBiYWlsIG91dCB3aXRoIGEgZ2VuZXJpYyBlcnJvciBtZXNzYWdlIChlLmcuIHdoZW4gZHJhZ2dpbmcgaW4gYSBtYWxmb3JtZWRcbi8vIFJPUyBiYWcpLlxuaW1wb3J0IHR5cGUgeyBOb2RlIH0gZnJvbSBcInJlYWN0XCI7XG5cbmV4cG9ydCB0eXBlIEVycm9yVHlwZSA9IFwiYXBwXCIgfCBcInVzZXJcIjtcbmV4cG9ydCB0eXBlIERldGFpbHNUeXBlID0gc3RyaW5nIHwgRXJyb3IgfCBOb2RlO1xuXG50eXBlIEVycm9ySGFuZGxlciA9IChtZXNzYWdlOiBzdHJpbmcsIGRldGFpbHM6IERldGFpbHNUeXBlLCB0eXBlOiBFcnJvclR5cGUpID0+IHZvaWQ7XG5cbmNvbnN0IGRlZmF1bHRFcnJvckhhbmRsZXI6IEVycm9ySGFuZGxlciA9IChtZXNzYWdlOiBzdHJpbmcsIGRldGFpbHM6IERldGFpbHNUeXBlLCB0eXBlOiBFcnJvclR5cGUpOiB2b2lkID0+IHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG4gIGlmICh0eXBlb2YgV29ya2VyR2xvYmFsU2NvcGUgIT09IFwidW5kZWZpbmVkXCIgJiYgc2VsZiBpbnN0YW5jZW9mIFdvcmtlckdsb2JhbFNjb3BlKSB7XG4gICAgY29uc3Qgd2ViV29ya2VyRXJyb3IgPVxuICAgICAgXCJXZWIgV29ya2VyIGhhcyB1bmluaXRpYWxpemVkIHJlcG9ydEVycm9yIGZ1bmN0aW9uOyB0aGlzIG1lYW5zIHRoaXMgZXJyb3IgbWVzc2FnZSBjYW5ub3Qgc2hvdyB1cCBpbiB0aGUgVUkgKHNvIHdlIHNob3cgaXQgaGVyZSBpbiB0aGUgY29uc29sZSBpbnN0ZWFkKS5cIjtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwidGVzdFwiKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3Iod2ViV29ya2VyRXJyb3IpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmVycm9yKHdlYldvcmtlckVycm9yLCBtZXNzYWdlLCBkZXRhaWxzLCB0eXBlKTtcbiAgICB9XG4gICAgcmV0dXJuO1xuICB9IGVsc2UgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSBcInRlc3RcIikge1xuICAgIHJldHVybjtcbiAgfVxuICBjb25zb2xlLmVycm9yKFwiRXJyb3IgYmVmb3JlIGVycm9yIGRpc3BsYXkgaXMgbW91bnRlZFwiLCBtZXNzYWdlLCBkZXRhaWxzLCB0eXBlKTtcbn07XG5cbmxldCBhZGRFcnJvcjogRXJyb3JIYW5kbGVyID0gZGVmYXVsdEVycm9ySGFuZGxlcjtcblxuZXhwb3J0IGZ1bmN0aW9uIHNldEVycm9ySGFuZGxlcihoYW5kbGVyOiBFcnJvckhhbmRsZXIpOiB2b2lkIHtcbiAgaWYgKGFkZEVycm9yICE9PSBkZWZhdWx0RXJyb3JIYW5kbGVyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiVHJpZWQgdG8gb3ZlcndyaXRlIGV4aXN0aW5nIEVycm9ySGFuZGxlclwiKTtcbiAgfVxuICBhZGRFcnJvciA9IGhhbmRsZXI7XG4gIC8vIGF0dGFjaCB0byB3aW5kb3cgaW4gZGV2IG1vZGUgZm9yIHRlc3RpbmcgZXJyb3JzXG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiYgdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHdpbmRvdy5hZGRFcnJvciA9IGhhbmRsZXI7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVuc2V0RXJyb3JIYW5kbGVyKCkge1xuICBpZiAoYWRkRXJyb3IgPT09IGRlZmF1bHRFcnJvckhhbmRsZXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJUcmllZCB0byB1bnNldCBFcnJvckhhbmRsZXIgYnV0IGl0IHdhcyBhbHJlYWR5IHRoZSBkZWZhdWx0XCIpO1xuICB9XG4gIGFkZEVycm9yID0gZGVmYXVsdEVycm9ySGFuZGxlcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRldGFpbHNUb1N0cmluZyhkZXRhaWxzOiBEZXRhaWxzVHlwZSk6IHN0cmluZyB7XG4gIGlmICh0eXBlb2YgZGV0YWlscyA9PT0gXCJzdHJpbmdcIikge1xuICAgIHJldHVybiBkZXRhaWxzO1xuICB9XG4gIGlmIChkZXRhaWxzIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICByZXR1cm4gZGV0YWlscy50b1N0cmluZygpO1xuICB9XG4gIHJldHVybiBcInVuYWJsZSB0byBjb252ZXJ0IGRldGFpbHMgdG8gc3RyaW5nIHR5cGVcIjtcbn1cblxuLy8gQ2FsbCB0aGlzIHRvIGFkZCBhbiBlcnJvciB0byB0aGUgYXBwbGljYXRpb24gbmF2IGJhciBlcnJvciBjb21wb25lbnQgaWYgbW91bnRlZFxuLy8gaWYgdGhlIGNvbXBvbmVudCBpcyBub3QgbW91bnRlZCwgY29uc29sZS5lcnJvciBpcyB1c2VkIGFzIGEgZmFsbGJhY2suXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZXBvcnRFcnJvcihtZXNzYWdlOiBzdHJpbmcsIGRldGFpbHM6IERldGFpbHNUeXBlLCB0eXBlOiBFcnJvclR5cGUpOiB2b2lkIHtcbiAgYWRkRXJyb3IobWVzc2FnZSwgZGV0YWlscywgdHlwZSk7XG59XG5yZXBvcnRFcnJvci5leHBlY3RDYWxsZWREdXJpbmdUZXN0ID0gKCkgPT4ge307IC8vIE92ZXJyaWRkZW4gaW4gdGVzdHM7IGFkZGVkIGhlcmUgc28gRmxvdyBkb2Vzbid0IGNvbXBsYWluLlxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFFQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0Esc0JBRUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQURBO0FBQ0E7QUFDQTtBQUNBO0FBQUEiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./packages/webviz-core/src/util/reportError.js\n");

/***/ })

/******/ });