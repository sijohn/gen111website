/**
 * OrderHistory model events
 */



import {EventEmitter} from 'events';
import OrderHistory from './orderHistory.model';
var OrderHistoryEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
OrderHistoryEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  OrderHistory.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    OrderHistoryEvents.emit(event + ':' + doc._id, doc);
    OrderHistoryEvents.emit(event, doc);
  };
}

export default OrderHistoryEvents;
