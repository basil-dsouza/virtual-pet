import { v4 as uuidv4 } from 'uuid';

export class Milestone {
    constructor({
        id = uuidv4(),
        stage,
        timestamp = Date.now(),
        statsSnapshot,
        message,
        photoUrl
    }) {
        this.id = id;
        this.stage = stage;
        this.timestamp = timestamp;
        this.statsSnapshot = statsSnapshot; // Instance of Stats
        this.message = message;
        this.photoUrl = photoUrl;
    }
}
