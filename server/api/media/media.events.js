"use strict";
/**
 * Media model events
 */
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = require("events");
var media_model_1 = require("./media.model");
var MediaEvents = new events_1.EventEmitter();
// Set max event listeners (0 == unlimited)
MediaEvents.setMaxListeners(0);
// Model events
var events = {
    save: 'save',
    remove: 'remove'
};
// Register the event emitter to the model events
for (var e in events) {
    var event_1 = events[e];
    media_model_1.default.schema.post(e, emitEvent(event_1));
}
function emitEvent(event) {
    return function (doc) {
        MediaEvents.emit(event + ':' + doc._id, doc);
        MediaEvents.emit(event, doc);
    };
}
exports.default = MediaEvents;
//# sourceMappingURL=media.events.js.map