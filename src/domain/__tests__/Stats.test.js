import { describe, it, expect } from 'vitest';
import { Stats } from '../Stats';

describe('Stats Value Object', () => {
    it('should initialize with default values', () => {
        const stats = new Stats();
        expect(stats.hunger).toBe(100);
        expect(stats.hygiene).toBe(100);
        expect(stats.happiness).toBe(100);
        expect(stats.energy).toBe(100);
    });

    it('should clamp values between 0 and 100', () => {
        const stats = new Stats({ hunger: 150, hygiene: -50 });
        expect(stats.hunger).toBe(100);
        expect(stats.hygiene).toBe(0);
    });

    it('should be immutable on update', () => {
        const initial = new Stats({ hunger: 50 });
        const updated = initial.update({ hunger: 10 });

        expect(initial.hunger).toBe(50); // Original unchanged
        expect(updated.hunger).toBe(60); // New instance has change
    });

    it('should correctly calculate average', () => {
        const stats = new Stats({ hunger: 100, hygiene: 50, happiness: 50, energy: 0 });
        expect(stats.average).toBe(50);
    });

    it('should identify critical state', () => {
        const goodParams = { hunger: 50, hygiene: 50, happiness: 50, energy: 50 };
        expect(new Stats(goodParams).isCritical()).toBe(false);

        const badHunger = new Stats({ ...goodParams, hunger: 10 });
        expect(badHunger.isCritical()).toBe(true);
    });
});
