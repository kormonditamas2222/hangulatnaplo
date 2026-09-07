import type { DataEntry, NewEntry } from './DataEntry.ts';
import './style.css'
const url = "https://retoolapi.dev/70PygG/data"
const diaryForm = document.getElementById("diary") as HTMLFormElement;

async function loadData() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Hibás betöltés")
    }
    const data = await response.json() as DataEntry[];
    console.log(data)
    return data;
  }
  catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
}

function init(){
  loadData();
}

diaryForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    const data = new FormData(diaryForm);
    const newrow: NewEntry = {mood: data.get("mood")!.toString(), entry: data.get("entry")!.toString(), date: new Date()};
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
  }
});
document.addEventListener("DOMContentLoaded", init);