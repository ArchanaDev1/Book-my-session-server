const Log = require('../db/log'); // Adjust the path to your Log model

const saveLog = async (userEmail, documentID, operationType, description)  => {
  try {
    const logEntry = new Log({
      userEmail: userEmail,
      documentID: documentID,
      operationType: operationType,
      description: description,
    });

    await logEntry.save();
    console.log('Log entry saved successfully:', logEntry);
  } catch (error) {
    console.error('Error saving log entry:', error);
  }
}

// // Example usage:
// const userEmail = 'user@example.com';
// const documentID = '634f45cd2f4e7b8c77d1a8a9'; // Example ObjectId of the related document
// const operationType = 'CREATE';
// const description = 'Created a new document in the collection';

// saveLog(userEmail, documentID, operationType, description);

module.exports = saveLog;