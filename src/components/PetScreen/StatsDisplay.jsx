import React from 'react';
import { Heart, Utensils, Zap, Sparkles } from 'lucide-react';

export const StatsDisplay = ({ stats }) => {
    return (
        <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
            <StatItem icon={<Utensils size={16} />} value={stats.hunger} color="text-orange-400" label="Hunger" />
            <StatItem icon={<Sparkles size={16} />} value={stats.hygiene} color="text-blue-400" label="Hygiene" />
            <StatItem icon={<Heart size={16} />} value={stats.happiness} color="text-pink-400" label="Happiness" />
            <StatItem icon={<Zap size={16} />} value={stats.energy} color="text-yellow-400" label="Energy" />
        </div>
    );
};

const StatItem = ({ icon, value, color, label }) => (
    <div className="bg-white/5 backdrop-blur-md rounded-xl p-3 border border-white/10 flex items-center gap-3">
        <div className={`p-2 rounded-lg bg-white/5 ${color}`}>
            {icon}
        </div>
        <div className="flex-1">
            <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>{label}</span>
                <span>{Math.round(value)}%</span>
            </div>
            <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                <div
                    className={`h-full rounded-full transition-all duration-500 ${value < 30 ? 'bg-red-500' : 'bg-white'}`}
                    style={{ width: `${value}%` }}
                />
            </div>
        </div>
    </div>
);
