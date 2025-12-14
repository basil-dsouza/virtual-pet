import { describe, test, expect } from 'vitest';
import { Pet, STAGES } from '../Pet';

describe('Pet Domain', () => {
    test('should initialize with default values', () => {
        const pet = new Pet({});
        expect(pet.name).toBe('Unnamed Pet');
        expect(pet.stage).toBe(STAGES.EGG);
    });

    test('should rename correctly', () => {
        const pet = new Pet({ name: 'Old Name' });
        const renamedPet = pet.rename('New Name');

        expect(renamedPet.name).toBe('New Name');
        expect(renamedPet).not.toBe(pet); // Immutability check
    });

    test('should validate name length', () => {
        const pet = new Pet({});
        const longName = 'This name is way too long for a pet';
        const renamedPet = pet.rename(longName);

        expect(renamedPet.name.length).toBe(20);
        expect(renamedPet.name).toBe(longName.substring(0, 20));
    });

    test('should ignore empty names', () => {
        const pet = new Pet({ name: 'Original' });
        const renamedPet = pet.rename('');

        expect(renamedPet.name).toBe('Original');
    });

    test('should ignore whitespace only names', () => {
        const pet = new Pet({ name: 'Original' });
        const renamedPet = pet.rename('   ');

        expect(renamedPet.name).toBe('Original');
    });
});
