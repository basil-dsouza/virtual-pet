import { useState, useEffect, useCallback, useRef } from 'react';
import { Pet, STAGES } from '../domain/Pet';
import { PetRepository } from '../infrastructure/PetRepository';
import { MemorialRepository } from '../infrastructure/MemorialRepository';

const TICK_RATE = 1000; // 1 second

export const usePetGame = () => {
    const [pet, setPet] = useState(null);
    const [loading, setLoading] = useState(true);

    // Game Loop Ref to access latest state without dependency cycles
    const petRef = useRef(pet);
    useEffect(() => { petRef.current = pet; }, [pet]);

    // Load on mount
    useEffect(() => {
        const loaded = PetRepository.load();
        if (loaded) {
            // Calculate decay for time away
            const updated = loaded.update(Date.now());
            setPet(updated);
        }
        setLoading(false);
    }, []);

    // Game Loop
    useEffect(() => {
        if (!pet) return;
        if (pet.isDead) return;

        const interval = setInterval(() => {
            const currentPet = petRef.current;
            if (!currentPet || currentPet.isDead) return;

            const updatedPet = currentPet.update(Date.now());

            // Check if just died
            if (updatedPet.isDead && !currentPet.isDead) {
                MemorialRepository.save(updatedPet);
                PetRepository.save(null); // Clear active pet
            } else {
                PetRepository.save(updatedPet);
            }

            setPet(updatedPet);
        }, TICK_RATE);

        return () => clearInterval(interval);
    }, [pet?.isDead]); // Restart loop if death state changes

    const startNewPet = useCallback((name) => {
        const newPet = new Pet({ name });
        setPet(newPet);
        PetRepository.save(newPet);
    }, []);

    const handleInteraction = useCallback((action) => {
        setPet(prev => {
            if (!prev) return null;
            const newPet = prev[action](); // feed(), clean(), play()
            PetRepository.save(newPet);
            return newPet;
        });
    }, []);

    const rename = useCallback((newName) => {
        setPet(prev => {
            if (!prev) return null;
            const newPet = prev.rename(newName);
            PetRepository.save(newPet);
            return newPet;
        });
    }, []);

    return {
        pet,
        loading,
        startNewPet,
        feed: () => handleInteraction('feed'),
        clean: () => handleInteraction('clean'),
        play: () => handleInteraction('play'),
        sleep: () => handleInteraction('sleep'),
        rename,
    };
};
