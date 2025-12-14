import { Milestone } from '../domain/Milestone';

const STORAGE_KEY = 'virtual_pet_memorial';

export class MemorialRepository {
    static save(pet) {
        if (!pet || !pet.isDead) return;

        const memorialList = this.loadAll();

        // Create a summarized record
        const record = {
            id: pet.id,
            name: pet.name,
            birthDate: pet.birthDate,
            deathDate: Date.now(),
            finalStage: pet.milestones[pet.milestones.length - 1]?.stage || 'UNKNOWN',
            milestones: pet.milestones
        };

        memorialList.push(record);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(memorialList));
    }

    static loadAll() {
        const data = localStorage.getItem(STORAGE_KEY);
        if (!data) return [];
        try {
            const parsed = JSON.parse(data);
            return parsed.map(record => ({
                ...record,
                milestones: record.milestones.map(m => new Milestone(m))
            }));
        } catch (e) {
            console.error("Failed to load memorial:", e);
            return [];
        }
    }
}
