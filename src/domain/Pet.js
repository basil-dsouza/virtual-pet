import { v4 as uuidv4 } from 'uuid';
import { Stats } from './Stats';
import { Milestone } from './Milestone';

export const STAGES = {
    EGG: 'EGG',
    BABY: 'BABY',
    CHILD: 'CHILD',
    TEEN: 'TEEN',
    ADULT: 'ADULT',
    SENIOR: 'SENIOR',
    DEAD: 'DEAD',
};

// Evolution Requirements (Duration in milliseconds)
const STAGE_DURATION = {
    [STAGES.EGG]: 10 * 1000, // 10 seconds for testing (Egg -> Baby)
    [STAGES.BABY]: 2 * 60 * 1000, // 2 minutes
    [STAGES.CHILD]: 5 * 60 * 1000, // 5 minutes
    [STAGES.TEEN]: 10 * 60 * 1000,
    [STAGES.ADULT]: 24 * 60 * 60 * 1000,
};

export class Pet {
    constructor({
        id = uuidv4(),
        name = 'Unnamed Pet',
        birthDate = Date.now(),
        stage = STAGES.EGG,
        stats = new Stats({ hunger: 100, hygiene: 100, happiness: 100, energy: 100 }),
        milestones = [],
        history = { careMistakes: 0 },
        lastUpdate = Date.now(),
    }) {
        this.id = id;
        this.name = name;
        this.birthDate = birthDate;
        this.stage = stage;
        this.stats = stats instanceof Stats ? stats : new Stats(stats);
        this.milestones = milestones;
        this.history = history;
        this.lastUpdate = lastUpdate;
    }

    rename(newName) {
        if (!newName || typeof newName !== 'string' || newName.trim().length === 0) {
            return this;
        }
        return new Pet({
            ...this,
            name: newName.trim().substring(0, 20) // Simple validation
        });
    }

    get age() {
        return Date.now() - this.birthDate;
    }

    get isDead() {
        return this.stage === STAGES.DEAD;
    }

    update(currentTime = Date.now()) {
        if (this.isDead) return this;

        const deltaTime = currentTime - this.lastUpdate;
        if (deltaTime <= 0) return this;

        // Decay rates (per second) - simpler calculation
        const seconds = deltaTime / 1000;

        // Stats decay only if not Egg
        let newStats = this.stats;
        if (this.stage !== STAGES.EGG) {
            newStats = this.stats.update({
                hunger: -0.5 * seconds,    // Full hunger in ~3.3 mins
                hygiene: -0.3 * seconds,
                happiness: -0.4 * seconds,
                energy: -0.1 * seconds,
            });
        }

        // Check Death (if critical for too long - simplified for now: if avg < 0)
        // Actually, let's keep it simple: if any stat hits 0, gain "mistake". Too many mistakes = death?
        // For now, let's just bounds check.

        // Check Evolution
        let newStage = this.stage;
        let newMilestones = [...this.milestones];

        if (this.stage !== STAGES.ADULT && this.stage !== STAGES.SENIOR) {
            const timeInStage = this.age - this.getAgeAtEntry(this.stage); // Simplify: age vs thresholds
            // Complex logic simplified: check if Age > Threshold to next stage
            if (this.shouldEvolve()) {
                newStage = this.getNextStage();
                newMilestones.push(new Milestone({
                    stage: newStage,
                    statsSnapshot: newStats,
                    message: `Evolved into ${newStage}!`,
                    photoUrl: `/assets/${newStage.toLowerCase()}.png`
                }));
            }
        }

        return new Pet({
            ...this,
            stats: newStats,
            stage: newStage,
            milestones: newMilestones,
            lastUpdate: currentTime,
        });
    }

    // Interaction Methods
    feed() {
        if (this.stage === STAGES.EGG || this.isDead) return this;
        return new Pet({
            ...this,
            stats: this.stats.update({ hunger: 30, energy: 5 }),
        });
    }

    clean() {
        if (this.stage === STAGES.EGG || this.isDead) return this;
        return new Pet({
            ...this,
            stats: this.stats.update({ hygiene: 100 }), // Fully clean
        });
    }

    play() {
        if (this.stage === STAGES.EGG || this.isDead) return this;
        return new Pet({
            ...this,
            stats: this.stats.update({ happiness: 25, energy: -10, hunger: -5 }),
        });
    }

    sleep() {
        if (this.stage === STAGES.EGG || this.isDead) return this;
        return new Pet({
            ...this,
            stats: this.stats.update({ energy: 100, hunger: -10 }), // Fast forward sleep for now
        });
    }

    die() {
        const deathMilestone = new Milestone({
            stage: STAGES.DEAD,
            statsSnapshot: this.stats,
            message: `${this.name} passed away.`,
            photoUrl: '/assets/rip.png'
        });
        return new Pet({
            ...this,
            stage: STAGES.DEAD,
            milestones: [...this.milestones, deathMilestone]
        });
    }

    // Helpers
    shouldEvolve() {
        // Simplified time based evolution
        const timeAlive = Date.now() - this.birthDate;
        if (this.stage === STAGES.EGG && timeAlive > STAGE_DURATION[STAGES.EGG]) return true;
        // Add other stages...
        // This logic needs to be robust, calculating time spent in CURRENT stage. 
        // For mvp, just global age thresholds.
        const thresholds = {
            [STAGES.EGG]: 10000,
            [STAGES.BABY]: 120000 + 10000,
            [STAGES.CHILD]: 300000 + 120000 + 10000
        };

        const nextThreshold = thresholds[this.stage];
        if (nextThreshold && timeAlive > nextThreshold) return true;
        return false;
    }

    getNextStage() {
        const flow = [STAGES.EGG, STAGES.BABY, STAGES.CHILD, STAGES.TEEN, STAGES.ADULT, STAGES.SENIOR];
        const idx = flow.indexOf(this.stage);
        return flow[idx + 1] || STAGES.DEAD;
    }

    getAgeAtEntry(stage) {
        // Placeholder: in real app, we'd store "stageEntryTime" in history.
        return 0;
    }
}
