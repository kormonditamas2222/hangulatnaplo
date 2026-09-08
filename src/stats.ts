import type { DataEntry } from './DataEntry.ts';
import './style.css';
const url = "https://retoolapi.dev/70PygG/data";
const statsTable = document.getElementById("statsTable") as HTMLTableSectionElement;

async function init() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Hibás betöltés")
        }
        const data = await response.json() as DataEntry[];
        console.log(data)
        stats(data);

    }
    catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
        throw error;
    }
}

function stats(data: DataEntry[]) {
    let moods = new Map<string, number>();
    for (const datapoint of data) {
        const currentMood = datapoint.mood;
        const currentCount = moods.get(currentMood) || 0;
        moods.set(currentMood, currentCount + 1);
    }
    moods.forEach((count, mood) => {
        const tr = document.createElement("tr");
        const tdMood = document.createElement("td");
        tdMood.textContent = mood;
        const tdCount = document.createElement("td");
        tdCount.textContent = count.toString();
        tr.appendChild(tdMood);
        tr.appendChild(tdCount);
        statsTable.appendChild(tr);
    });
}

document.addEventListener("DOMContentLoaded", init);