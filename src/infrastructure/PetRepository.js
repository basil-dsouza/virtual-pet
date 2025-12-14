import { Pet, STAGES } from '../domain/Pet';
import { Stats } from '../domain/Stats';
import { Milestone } from '../domain/Milestone';

const STORAGE_KEY = 'virtual_pet_active';

export class PetRepository {
    static save(pet) {
        if (!pet) {
            localStorage.removeItem(STORAGE_KEY);
            return;
        }
        const data = JSON.stringify(pet);
        localStorage.setItem(STORAGE_KEY, data);
    }

    static load() {
        const data = localStorage.getItem(STORAGE_KEY);
        if (!data) return null;

        try {
            const parsed = JSON.parse(data);
            // Rehydrate Stats and Milestones
            const stats = new Stats(parsed.stats);
            const milestones = parsed.milestones.map(m => new Milestone(m));
            return new Pet({ ...parsed, stats, milestones });
        } catch (e) {
            console.error("Failed to load pet:", e);
            return null;
        }
    }

    static delete() {
        localStorage.removeItem(STORAGE_KEY);
    }
}
