import { describe, it, expect } from "@jest/globals";
import { chooseWord } from "./chooseWord.js";
import { hasUniqueLetters } from "./chooseWord.js";


/* Nedan följer tester som anses konstatera att logiken för chooseWord fungerar som väntat
        Testerna gör följande:
        - Konstaterar att endast ord av önskad längd är i resulterande ord
        - Konstaterar att endast ord med unika bokstäver förekommer i resulterande ord (om så önskas)
        - Konstaterar att resultat blir null om inget ord uppfyller kriterierna

  Hjälpfunktionen hasUniqueLetters kontrolleras även och testar:
        - Att true returneras om alla bokstäver i ett ord är unika
        - Att false returneras om alla bokstäver i ett ord inte är unika
*/

describe("chooseWord", () => {
  it("returns a word of correct length", () => {

    const words = ["Häst", "Pest", "Bäst", "Höghus", "Drömmar"];
    const result = chooseWord(words, 4, true);

    const validWords = ["Häst", "Pest", "Bäst"];

    expect(validWords).toContain(result);
  })

  it("returns a word with only unique letters", () => {
    const words = ["Huvud", "Mumma", "Brusa", "Lådor", "Pappa", "Grann"];
    const result = chooseWord(words, 5, false);
    const validWords = ["Brusa", "Lådor"];

    expect(validWords).toContain(result);
  })

  it("returns null when no matching word is found", () => {
    const words = ["Huvud", "Mumma", "Brusa", "Lådor", "Pappa", "Grann"];
    const result = chooseWord(words, 10, true);

    expect(result).toEqual(null);

  })
})

describe("hasUniqueletters", () => {
  it("returns true when no repeated letters occur", () => {
    expect(hasUniqueLetters("CYKLA")).toBe(true);
  })

  it("returns false when repeating letters occur", () => {
    expect(hasUniqueLetters("DRÖMMAR")).toBe(false);
  })
})