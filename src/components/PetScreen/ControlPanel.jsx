import React from 'react';
import { Utensils, Sparkles, Heart, Moon } from 'lucide-react';

export const ControlPanel = ({ onFeed, onClean, onPlay, onSleep, disabled }) => {
    return (
        <div className={`grid grid-cols-4 gap-3 transition-opacity ${disabled ? 'opacity-50 pointer-events-none' : ''}`}>
            <ActionButton onClick={onFeed} icon={<Utensils />} label="Feed" color="bg-orange-500 hover:bg-orange-600" />
            <ActionButton onClick={onClean} icon={<Sparkles />} label="Clean" color="bg-blue-500 hover:bg-blue-600" />
            <ActionButton onClick={onPlay} icon={<Heart />} label="Play" color="bg-pink-500 hover:bg-pink-600" />
            <ActionButton onClick={onSleep} icon={<Moon />} label="Sleep" color="bg-purple-500 hover:bg-purple-600" />
        </div>
    );
};

const ActionButton = ({ onClick, icon, label, color }) => (
    <button
        onClick={onClick}
        className={`${color} text-white p-4 rounded-2xl flex flex-col items-center gap-2 shadow-lg shadow-black/20 hover:scale-105 active:scale-95 transition-all duration-200`}
    >
        <div className="bg-white/20 p-2 rounded-full">
            {icon}
        </div>
        <span className="text-xs font-bold uppercase tracking-wider">{label}</span>
    </button>
);
