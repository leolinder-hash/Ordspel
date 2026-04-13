import { describe, it, expect } from "@jest/globals";
import { getFeedback } from "../services/getFeedbackService.js";
import { checkLetter } from "../services/getFeedbackService.js";

/* Testerna nedan utgår från olika scenarion i guessWord, och att de hanteras korrekt

De testar att logiken fungerar för en gissning:
            Som är helt korrekt (correct)
            Som innehåller rätt bokstäver men på fel plats (misplaced)
            Som är helt inkorrekt (incorrect)
            Som har korrekta, felaktiga och felplacerade bokstäver (correct, incorrect, misplaced)
            Som har dubbletter av bokstav som förekommer en gång i korrekt ord och att de hanteras korrekt

  Det finns även tester för funktionen checkLetter som konstaterar att:
            Om en bokstav finns returneras misplaced och bokstaven stryks från array med korrekta bokstäver
            Om en bokstav inte finns returneras incorrect och array förblir densamma
  
  Ovanstående tester anses viktiga för att konstatera att logiken för de vanligaste scenariorna
  fungerar samt för konstatera att output blir som förväntat */

describe("getFeedback", () => {
  it("marks letters as correct for matching letters", () => {
    expect(getFeedback("BRUS", "BRUS")).toEqual([
      { letter: "b", result: "correct" },
      { letter: "r", result: "correct" },
      { letter: "u", result: "correct" },
      { letter: "s", result: "correct" }
    ])
  })

  it("marks letters as misplaced when in wrong position", () => {
    expect(getFeedback("HLALÅ", "HALLÅ")).toEqual([
      { letter: "h", result: "correct" },
      { letter: "l", result: "misplaced" },
      { letter: "a", result: "misplaced" },
      { letter: "l", result: "correct" },
      { letter: "å", result: "correct" }
    ])
  })

  it("marks letters as incorrect when it does not exist in correct word", () => {
    expect(getFeedback("BBBBB", "HALLÅ")).toEqual([
      { letter: "b", result: "incorrect" },
      { letter: "b", result: "incorrect" },
      { letter: "b", result: "incorrect" },
      { letter: "b", result: "incorrect" },
      { letter: "b", result: "incorrect" }
    ])
  })

  it("marks correct, misplaced and incorrect correctly", () => {
    expect(getFeedback("CYKLA", "HALLÅ")).toEqual([
      { letter: "c", result: "incorrect" },
      { letter: "y", result: "incorrect" },
      { letter: "k", result: "incorrect" },
      { letter: "l", result: "correct" },
      { letter: "a", result: "misplaced" }
    ])
  })

  it("handles multiple of the same letter correctly", () => {
    expect(getFeedback("HALLÅ", "CYKLA")).toEqual([
      { letter: "h", result: "incorrect" },
      { letter: "a", result: "misplaced" },
      { letter: "l", result: "incorrect" },
      { letter: "l", result: "correct" },
      { letter: "å", result: "incorrect" }
    ])
  })
});

describe("checkLetter", ()=>{
  it("returns misplaced and removes existing letter from array", ()=>{
    const letters = ["b", "a", "n", "a", "n"];
    const result = checkLetter("a", letters);

    expect(result).toBe("misplaced");
    expect(letters).toEqual(["b", null, "n", "a", "n"]);
  })

  it("returns incorrect and does not remove letters from array", ()=>{
    const letters = ["b", "a", "n", "a", "n"];
    const result = checkLetter("z", letters);

    expect(result).toBe("incorrect");
    expect(letters).toEqual(["b", "a", "n", "a", "n"]);
  })
})

