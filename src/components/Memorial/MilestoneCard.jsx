import React from 'react';
import { format } from 'date-fns';

export const MilestoneCard = ({ milestone }) => {
    return (
        <div className="bg-[#fdfaf5] text-gray-800 p-6 rounded-sm shadow-xl border-4 border-white rotate-1 hover:rotate-0 transition-transform duration-300 max-w-xs mx-auto">
            <div className="flex justify-between items-center mb-4 border-b-2 border-dashed border-gray-300 pb-2">
                <span className="font-serif italic text-gray-500 text-sm">
                    {format(milestone.timestamp, 'MMM do, yyyy')}
                </span>
                <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded-full text-xs font-bold uppercase">
                    {milestone.stage}
                </span>
            </div>

            {/* Mock Photo Area */}
            <div className="bg-gray-200 aspect-square mb-4 rounded-sm flex items-center justify-center text-gray-400 border-2 border-gray-300 border-inset">
                <span>{milestone.message}</span>
                {/* In real app, render milestone.photoUrl image here */}
            </div>

            <p className="font-handwriting text-center text-lg leading-relaxed text-gray-700">
                "{milestone.message}"
            </p>

            <div className="mt-4 flex flex-wrap gap-2 justify-center">
                {Object.entries(milestone.statsSnapshot || {}).map(([key, val]) => (
                    <div key={key} className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                        {key}: {Math.round(val)}
                    </div>
                ))}
            </div>
        </div>
    );
};
