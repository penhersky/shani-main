export default {
  order: {
    NEW: 'new_order', // (only performers) ?many?
    NEW_PERFORMER: 'new_performer_request', // (customer)?one?
    new_comment: 'new_comment', // (customer)?one?
    performer_request_canceled: 'performer_request_canceled', // (performer)?one?
    performer_confirmed: 'performer_confirmed', // (subscribers) ?many?
    refused_performer: 'refused_performer', // (customer and subscribers) ?many?
    in_processing: 'in_processing', // (customer)?one?
    canceled_performer: 'canceled performer', // (subscribers, performers and canceled performer)?many?
    done: 'order_done', // done - (customer)?one?
    closed: 'order_closed', // closed - (performer)
    canceled: 'order_canceled', // canceled - (performer)
    delete: 'order_delete', // delete - (subscribers)
  },
};
