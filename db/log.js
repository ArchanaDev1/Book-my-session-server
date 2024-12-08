const mongoose = require('mongoose');

const log = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true,
  },
  documentID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'DocumentModel', // Reference to the related document's model, replace with your model name if needed
  },
  timestamp: {
    type: String,
    required: true,
    default: () => {
      const date = new Date();
      return date.toLocaleString('en-GB', { 
        day: '2-digit', month: '2-digit', year: 'numeric', 
        hour: '2-digit', minute: '2-digit', second: '2-digit', 
        hour12: false 
      });
    }
  },
  operationType: {
    type: String,
    enum: ['CREATE', 'READ', 'UPDATE', 'DELETE', 'LOGIN'],
    required: true,
  },
  description: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
});

const Log = mongoose.model('Log', log);
module.exports = Log;
