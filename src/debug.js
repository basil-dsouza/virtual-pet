import { Pet, STAGES } from './domain/Pet';
import { PetRepository } from './infrastructure/PetRepository';

// Global state for debug
let currentPet = null;

const render = () => {
    const output = document.getElementById('json-output');
    const quick = document.getElementById('quick-stats');

    if (!currentPet) {
        output.innerText = "No active pet.";
        quick.innerHTML = "";
        return;
    }

    output.innerText = JSON.stringify(currentPet, null, 2);

    quick.innerHTML = `
        <span class="stat" style="color:${getColor(currentPet.stats.hunger)}">Hunger: ${Math.round(currentPet.stats.hunger)}</span>
        <span class="stat" style="color:${getColor(currentPet.stats.hygiene)}">Hygiene: ${Math.round(currentPet.stats.hygiene)}</span>
        <span class="stat" style="color:${getColor(currentPet.stats.happiness)}">Happiness: ${Math.round(currentPet.stats.happiness)}</span>
        <span class="stat">Stage: <strong>${currentPet.stage}</strong></span>
    `;
};

const getColor = (val) => val < 30 ? '#ff5555' : '#55ff55';

// Actions
document.getElementById('btn-create').onclick = () => {
    currentPet = new Pet({ name: 'DebugPet_' + Math.floor(Math.random() * 100) });
    render();
    console.log("Created:", currentPet);
};

document.getElementById('btn-feed').onclick = () => {
    if (!currentPet) return;
    currentPet = currentPet.feed();
    render();
    console.log("Fed:", currentPet);
};

document.getElementById('btn-clean').onclick = () => {
    if (!currentPet) return;
    currentPet = currentPet.clean();
    render();
    console.log("Cleaned:", currentPet);
};

document.getElementById('btn-play').onclick = () => {
    if (!currentPet) return;
    currentPet = currentPet.play();
    render();
    console.log("Played:", currentPet);
};

document.getElementById('btn-kill').onclick = () => {
    if (!currentPet) return;
    currentPet = currentPet.die();
    render();
    console.log("Killed:", currentPet);
};

document.getElementById('btn-tick').onclick = () => {
    if (!currentPet) return;
    // Simulate 10 minutes passing
    const tenMinutes = 10 * 60 * 1000;
    // Need to trick the 'lastUpdate' to be in the past relative to 'now'
    // Or just call update with a future timestamp
    const future = Date.now() + tenMinutes; // This implies the pet WAS updated 'now' and we are calculating for 'future'

    // Actually, to make 'update' work, we need to artificially age the lastUpdate
    // currentPet.lastUpdate is when it was last simulated.
    // If we call update(currentPet.lastUpdate + tenMinutes), it simulates that delta.

    const nextTime = currentPet.lastUpdate + tenMinutes;
    currentPet = currentPet.update(nextTime);
    render();
    console.log(`Advanced 10m to ${new Date(nextTime).toISOString()}:`, currentPet);
};

// Initial Load
console.log("Debug harness loaded. Window accessible as 'window.pet'");
window.pet = currentPet; // Expose for console hacking
