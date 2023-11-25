interface Category {
  [key: string]: string;
}

type CategoryTitles = {
  [key: string]: Category;
}

export const allCategoryTitles: CategoryTitles = {
    "Basic Elements": {
      "Giving Away": "giving_away",
      "Opening Remarks: First Words": "opening_remarks1",
      "Opening Remarks: Main Content": "opening_remarks2",
      "Declaration of Intent": "declaration",
      "Charge": "charge",
      "Transition to Vows": "vows_symbolism",
      "Vows": "vow_content",
      "Rings Content": "ring_content",
      "Ring Exchange": "ring_exchange",
      "Pronouncement": "pronouncement",
      "The Kiss": "kiss",
      "Introduction": "introduction",
    },
    "Readings": { 
      "Reading: Traditional": "reading_traditional",
      "Reading: Humor": "reading_humor",
      "Reading: Entertainment": "reading_entertainment",
      "Reading: Scripture": "reading_scripture",
    },
    "Prayer": { 
      "Prayer: Opening": "prayer_opening",
      "Prayer: Wedding": "prayer_middle",
      "Prayer: Benediction": "prayer_benediction", 
    },
    "Unity": { 
      "Unity: Candle": "unity_candle",
      "Unity: Sand": "unity_sand",
      "Unity: Stone": "unity_stone",
      "Unity: Wine Box:": "unity_winebox",
      "Unity: Rose": "unity_rose",
      "Unity: Tea Ceremony": "unity_tea",
      "Unity: Hand Fasting": "unity_handfasting",
      "Unity: Mead": "unity_mead",
      "Unity: Cocktail": "unity_cocktail",
      "Unity Canvas": "unity_canvas",
      "Unity Glass": "unity_glass",
      "Unity: Playdough": "unity_playdough",
      "Unity: Beer": "unity_beer",
      "Unity: Plant": "unity_plant",
    },
    "Religious": { 
      "Arras": "arras",
      "Lasso": "lasso",
      "Veil": "veil",
      "Veil & Cord": "veil_cord",
      "God Knot": "god_knot",
      "Breaking Glass": "breaking_glass",
    },
    "Including Others": { 
      "Last Kiss": "last_kiss",
      "Flowers For Mothers": "flowers_mothers",
      "Gift To Parents": "gift_parents",
      "Song": "song",
      "Ring Warmer": "ring_warmer",
      "Vows of Suppoert": "vows_of_support"
    },
    "Other Options": { 
      "Blessing": "blessings",
      "Deceased": "deceased",
      "Turn Off Devices": "turnoff",
      "License Singing": "license_sign",
      "Custom": "custom"
    },
  }