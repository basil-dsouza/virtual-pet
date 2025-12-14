import React from 'react';
import { STAGES } from '../../domain/Pet';
import { Egg, Cat, Dog, Bird, Ghost, Skull } from 'lucide-react';

// Simple placeholder mapping until we have assets
const PET_ICONS = {
    [STAGES.EGG]: Egg,
    [STAGES.BABY]: Cat, // Baby looks like a cat?
    [STAGES.CHILD]: Dog,
    [STAGES.TEEN]: Bird,
    [STAGES.ADULT]: Cat,
    [STAGES.SENIOR]: Dog,
    [STAGES.DEAD]: Ghost,
};

export const PetCanvas = ({ stage, isDead }) => {
    const Icon = PET_ICONS[stage] || Egg;

    return (
        <div className="relative group">
            <div className={`
             transition-all duration-500 
             ${stage === STAGES.EGG && 'animate-bounce'} 
             ${isDead ? 'opacity-50 grayscale' : 'filter drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]'}
        `}>
                <Icon size={200} strokeWidth={1} className={isDead ? "text-gray-500" : "text-white"} />
            </div>

            {/* Simple shadow */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-32 h-4 bg-black/30 blur-xl rounded-full" />
        </div>
    );
};
