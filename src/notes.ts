import type { DataEntry, NewEntry } from './DataEntry.ts';
import './style.css';
import { loadData } from './main.ts';
const url = "https://retoolapi.dev/70PygG/data";
const diaryForm = document.getElementById("diary") as HTMLFormElement;
const diaryTable = document.getElementById("diaryTable") as HTMLTableElement;
const submitButton = document.getElementById("submit") as HTMLButtonElement;
const changeFormButton = document.getElementById("change") as HTMLButtonElement;

function init() {
    tablazat();
}

async function tablazat() {
    const data: DataEntry[] =  await loadData();
    const tbody = document.createElement("tbody");
    for (const datapoint of data) {
        const tr = document.createElement("tr");
        const moodcell = document.createElement("td");
        moodcell.textContent = datapoint.mood;
        tr.appendChild(moodcell);
        const textcell = document.createElement("td");
        textcell.textContent = datapoint.entry;
        tr.appendChild(textcell);
        const datecell = document.createElement("td");
        datecell.textContent = datapoint.date.toString();;
        tr.appendChild(datecell);
        const changeButton = document.createElement("button");
        changeButton.classList.add("btn", "btn-warning");
        changeButton.textContent = "Change";
        changeButton.addEventListener("click", () => {
            const formData = new FormData(diaryForm);
            formData.set("mood", datapoint.mood);
            formData.set("entry", datapoint.entry);
            formData.set("date", datapoint.date.toString());
            submitButton.hidden = true;
            changeFormButton.hidden = false;
            changeFormButton.addEventListener("click", async (e) => {
                e.preventDefault();
                try {
                    const row: NewEntry = {mood: formData.get("mood")!.toString(), entry: formData.get("entry")!.toString(), date: new Date(formData.get("date")!.toString())};
                    const response = await fetch(`${url}/${datapoint.id}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(row)
                    });
                    if (!response.ok) {
                        throw new Error("Hiba a módosítás során")
                    }
                }
                catch (error) {
                    if (error instanceof Error) {
                        console.error(error.message);
                    }
                    throw error;
                }
                finally {
                    diaryForm.reset;
                    submitButton.hidden = false;
                    changeFormButton.hidden = true;
                }
            })
        })
        tr.appendChild(changeButton);
        tbody.appendChild(tr);
    }
    diaryTable.appendChild(tbody);
}

diaryForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
        const data = new FormData(diaryForm);
        const newrow: NewEntry = { mood: data.get("mood")!.toString(), entry: data.get("entry")!.toString(), date: new Date(data.get("date")!.toString())};
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newrow)
        })
        if (!response.ok) {
            throw new Error("Hiba a mentés közben");
        }
        diaryForm.reset();
        loadData();
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
        throw error;
    }
});

document.addEventListener("DOMContentLoaded", init);