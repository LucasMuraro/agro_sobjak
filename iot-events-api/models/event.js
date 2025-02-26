// models/event.js
class Event {
  constructor({ person, deviceId, description, type, timestamp, additionalDetails }) {
    this.person = person ? { id: person.id, name: person.name } : null;
    this.deviceId = deviceId;
    this.description = description;
    this.type = type;
    this.timestamp = timestamp || new Date();
    this.additionalDetails = additionalDetails;
  }

  validate() {
    if (this.person && (!this.person.id || !this.person.name)) {
      throw new Error('Person ID and name are required if person is provided');
    }
    if (!this.deviceId || typeof this.deviceId !== 'number') {
      throw new Error('Device ID must be a number');
    }
    if (!this.description) {
      throw new Error('Description is required');
    }
    if (!this.type) {
      throw new Error('Type is required');
    }
  }
}

module.exports = Event;