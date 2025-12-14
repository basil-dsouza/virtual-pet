import React, { useEffect, useState } from 'react';
import { MemorialRepository } from '../../infrastructure/MemorialRepository';
import { MilestoneCard } from './MilestoneCard';
import { X } from 'lucide-react';

export const MemorialGallery = ({ onClose }) => {
    const [memorials, setMemorials] = useState([]);
    const [selectedPet, setSelectedPet] = useState(null);

    useEffect(() => {
        setMemorials(MemorialRepository.loadAll());
    }, []);

    return (
        <div className="absolute inset-0 bg-gray-900/95 backdrop-blur-xl z-20 overflow-y-auto p-8">
            <button onClick={onClose} className="fixed top-4 right-4 p-2 bg-white/10 text-white rounded-full hover:bg-white/20 z-30">
                <X />
            </button>

            <h2 className="text-3xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                Memorial Gallery
            </h2>

            {selectedPet ? (
                <div className="max-w-2xl mx-auto">
                    <button onClick={() => setSelectedPet(null)} className="mb-6 text-gray-400 hover:text-white flex items-center gap-2">
                        ← Back to Gallery
                    </button>
                    <h3 className="text-2xl font-bold mb-6 text-center">{selectedPet.name}'s Life</h3>
                    <div className="space-y-8">
                        {selectedPet.milestones.map(m => (
                            <div key={m.id} className="transform hover:scale-105 transition duration-500">
                                <MilestoneCard milestone={m} />
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {memorials.length === 0 && (
                        <div className="col-span-full text-center text-gray-500 mt-20">
                            No pets in the memorial yet.
                        </div>
                    )}

                    {memorials.map(pet => (
                        <button
                            key={pet.id}
                            onClick={() => setSelectedPet(pet)}
                            className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition group text-left"
                        >
                            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🪦</div>
                            <h3 className="font-bold text-lg text-gray-200">{pet.name}</h3>
                            <p className="text-sm text-gray-500">{new Date(pet.birthDate).toLocaleDateString()} - {new Date(pet.deathDate).toLocaleDateString()}</p>
                            <div className="mt-4 text-xs bg-white/10 inline-block px-2 py-1 rounded text-purple-300">
                                Reached {pet.finalStage}
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};
