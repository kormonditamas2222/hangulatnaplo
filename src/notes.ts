import type { DataEntry, NewEntry } from './DataEntry.ts';
import './style.css';
import { loadData } from './main.ts';
const url = "https://retoolapi.dev/70PygG/data";
const diaryForm = document.getElementById("diary") as HTMLFormElement;
const diaryTable = document.getElementById("diaryTable") as HTMLTableSectionElement;
const submitButton = document.getElementById("submit") as HTMLButtonElement;
const changeFormButton = document.getElementById("change") as HTMLButtonElement;

function init() {
    tablazat();
}

async function tablazat() {
    const data: DataEntry[] =  await loadData();
    for (const datapoint of data) {
        const tr = document.createElement("tr");
        const moodcell = document.createElement("td");
        moodcell.textContent = datapoint.mood;
        tr.appendChild(moodcell);
        const textcell = document.createElement("td");
        textcell.textContent = datapoint.entry;
        tr.appendChild(textcell);
        const datecell = document.createElement("td");
        datecell.textContent = new Date(datapoint.date).toISOString().split('T')[0];
        tr.appendChild(datecell);
        const changeButton = document.createElement("button");
        changeButton.classList.add("btn", "btn-warning");
        changeButton.textContent = "Change";
        changeButton.addEventListener("click", () => {
            (document.getElementById("mood") as HTMLSelectElement).value = datapoint.mood;
            (document.getElementById("entry") as HTMLInputElement).value = datapoint.entry;
            const dateString = new Date(datapoint.date).toISOString().split('T')[0];
            (document.getElementById("date") as HTMLInputElement).value = dateString;
            
            submitButton.hidden = true;
            changeFormButton.hidden = false;
            changeFormButton.addEventListener("click", async (e) => {
                e.preventDefault();
                try {
                    const updatedFormData = new FormData(diaryForm);
                    const row: NewEntry = {mood: updatedFormData.get("mood")!.toString(), entry: updatedFormData.get("entry")!.toString(), date: new Date(updatedFormData.get("date")!.toString())};
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
                    diaryTable.innerHTML = "";
                    tablazat();
                }
                catch (error) {
                    if (error instanceof Error) {
                        console.error(error.message);
                    }
                    throw error;
                }
                finally {
                    diaryForm.reset();
                    submitButton.hidden = false;
                    changeFormButton.hidden = true;
                }
            }, {once: true});
        });
        tr.appendChild(changeButton);
        const delButton = document.createElement("button");
        delButton.classList.add("btn", "btn-danger");
        delButton.textContent = "Delete";
        delButton.addEventListener("click", async () => {
            try {
                const response = await fetch(`${url}/${datapoint.id}`, {
                    method: "DELETE"
                });
                if (!response.ok) {
                    throw new Error("Hiba a törlés közben");
                }
                diaryTable.innerHTML = "";
                tablazat();
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error(error.message);
                }
            }
        })
        tr.appendChild(delButton);
        diaryTable.appendChild(tr);
    }
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