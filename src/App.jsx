import React, { useState } from 'react';
import { usePetGame } from './hooks/usePetGame';
import { PetCanvas } from './components/PetScreen/PetCanvas';
import { ControlPanel } from './components/PetScreen/ControlPanel';
import { StatsDisplay } from './components/PetScreen/StatsDisplay';
import { MemorialGallery } from './components/Memorial/MemorialGallery';
import { MilestoneCard } from './components/Memorial/MilestoneCard';
import { STAGES } from './domain/Pet';
import { BookOpen, Skull, Edit2, Check, X } from 'lucide-react';

function App() {
  const { pet, loading, startNewPet, feed, clean, play, sleep, rename } = usePetGame();
  const [view, setView] = useState('GAME'); // GAME, MEMORIAL
  const [showMilestone, setShowMilestone] = useState(null);
  const [isRenaming, setIsRenaming] = useState(false);
  const [newName, setNewName] = useState('');

  const startRenaming = () => {
    setNewName(pet?.name || '');
    setIsRenaming(true);
  };

  const saveRename = () => {
    if (newName.trim()) {
      rename(newName);
    }
    setIsRenaming(false);
  };

  const cancelRename = () => {
    setIsRenaming(false);
  };

  if (loading) return <div className="h-screen flex items-center justify-center bg-gray-900 text-white">Loading...</div>;

  if (!pet && view === 'GAME') {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gray-900 text-white font-sans p-4">
        <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Virtual Pet Companion</h1>
        <div className="flex gap-4">
          <button onClick={() => startNewPet('Fido')} className="px-6 py-3 bg-blue-600 rounded-full hover:bg-blue-500 transition shadow-lg shadow-blue-500/50 font-bold">
            Hatch New Pet
          </button>
          <button onClick={() => setView('MEMORIAL')} className="px-6 py-3 bg-gray-700 rounded-full hover:bg-gray-600 transition flex items-center gap-2">
            <BookOpen size={20} /> Memorial
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans selection:bg-pink-500 selection:text-white overflow-hidden">
      {/* Header */}
      <header className="absolute top-0 w-full p-4 flex justify-between items-center z-10 glass-panel">
        <div className="flex items-center gap-2">
          {isRenaming ? (
            <div className="flex items-center gap-2 bg-white/10 rounded-full p-1 pl-3 backdrop-blur-md">
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="bg-transparent border-none outline-none text-white placeholder-gray-400 w-32 font-bold"
                autoFocus
              />
              <button onClick={saveRename} className="p-1 hovered:bg-green-500/50 rounded-full text-green-400 hover:text-white transition">
                <Check size={16} />
              </button>
              <button onClick={cancelRename} className="p-1 hovered:bg-red-500/50 rounded-full text-red-400 hover:text-white transition">
                <X size={16} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 group cursor-pointer" onClick={startRenaming}>
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                {pet?.name || 'Pet'}
              </h1>
              <Edit2 size={14} className="text-gray-500 opacity-0 group-hover:opacity-100 transition" />
            </div>
          )}
          {pet?.isDead && <span className="ml-2 text-red-500 text-sm">(Deceased)</span>}
        </div>

        <button onClick={() => setView(view === 'GAME' ? 'MEMORIAL' : 'GAME')} className="p-2 bg-white/10 rounded-full hover:bg-white/20 backdrop-blur-md transition">
          {view === 'GAME' ? <BookOpen size={24} /> : <div className="font-bold px-2">Back to Game</div>}
        </button>
      </header>

      {/* Main Content */}
      <main className="h-screen flex flex-col relative">
        {view === 'GAME' && pet && (
          <>
            {/* Stats Overlay */}
            <div className="absolute top-16 left-0 w-full px-4 z-10">
              <StatsDisplay stats={pet.stats} />
            </div>

            {/* Pet Area */}
            <div className="flex-1 flex items-center justify-center relative">
              <PetCanvas stage={pet.stage} isDead={pet.isDead} />
            </div>

            {/* Controls */}
            <div className="absolute bottom-8 w-full px-4 max-w-md left-1/2 -translate-x-1/2">
              <ControlPanel
                onFeed={feed}
                onClean={clean}
                onPlay={play}
                onSleep={sleep}
                disabled={pet.isDead}
              />
              {pet.isDead && (
                <button onClick={() => { startNewPet('Buster'); }} className="mt-4 w-full py-3 bg-red-600 rounded-xl font-bold hover:bg-red-500 shadow-lg shadow-red-500/40 animate-pulse">
                  Start New Generation
                </button>
              )}
            </div>
          </>
        )}

        {view === 'MEMORIAL' && (
          <MemorialGallery onClose={() => setView('GAME')} />
        )}
      </main>

      {/* Milestone Modal (Simplified) */}
      {/* TODO: Trigger this when pet.milestones.length increases */}
    </div>
  );
}

export default App;
