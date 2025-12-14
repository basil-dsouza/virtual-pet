export class Stats {
    constructor({ hunger = 100, hygiene = 100, happiness = 100, energy = 100 } = {}) {
        this.hunger = this.clamp(hunger);
        this.hygiene = this.clamp(hygiene);
        this.happiness = this.clamp(happiness);
        this.energy = this.clamp(energy);
    }

    clamp(value) {
        return Math.max(0, Math.min(100, value));
    }

    // Immutable update method
    update(changes) {
        return new Stats({
            hunger: this.hunger + (changes.hunger || 0),
            hygiene: this.hygiene + (changes.hygiene || 0),
            happiness: this.happiness + (changes.happiness || 0),
            energy: this.energy + (changes.energy || 0),
        });
    }

    get average() {
        return (this.hunger + this.hygiene + this.happiness + this.energy) / 4;
    }

    isCritical() {
        return (
            this.hunger < 20 ||
            this.hygiene < 20 ||
            this.happiness < 20 ||
            this.energy < 10
        );
    }
}
