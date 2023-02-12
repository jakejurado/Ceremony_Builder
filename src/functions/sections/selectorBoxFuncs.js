//fetch request to the backend/database for all titles along with their varname and category
function fetchTitles(updateState) {
  console.log("fetching titles");
  fetch("/sections/titles")
    .then((res) => res.json())
    .then((res) => organizeDataByCategory(res))
    .then((res) => {
      // console.log({ updateState, res });
      updateState(res);
    })
    .catch((error) => {
      console.error("Error occured in fetchTitles:", error);
    });
}

//recieves array with multiple objects of "category", "varname", and "title", and returns an object organized by category.
function organizeDataByCategory(data) {
  const res = {};
  data.forEach(({ category, title, varname }) => {
    if (!res.hasOwnProperty(category)) res[category] = {};
    res[category][title] = varname;
  });
  return res;
}

// console.log(organizeDataByCategory([{"title":"Giving Away","varname":"giving_away","category":"Basic Elements"},{"title":"Opening Remarks: First Words","varname":"opening_remakrs1","category":"Basic Elements"},{"title":"Opening Remarks: Main Content","varname":"opening_remarks2","category":"Basic Elements"},{"title":"Declaration of Intent","varname":"declaration","category":"Basic Elements"},{"title":"Charge","varname":"charge","category":"Basic Elements"},{"title":"Transition to Vows","varname":"vows_symbolism","category":"Basic Elements"},{"title":"Vows","varname":"vow_content","category":"Basic Elements"},{"title":"Rings Content","varname":"ring_content","category":"Basic Elements"},{"title":"Ring Exchange","varname":"ring_exchange","category":"Basic Elements"},{"title":"Pronouncement","varname":"pronouncement","category":"Basic Elements"},{"title":"The Kiss","varname":"kiss","category":"Basic Elements"},{"title":"Introduction","varname":"introduction","category":"Basic Elements"},{"title":"Reading: Traditional","varname":"reading_traditional","category":"Readings"},{"title":"Prayer: Opening","varname":"prayer_opening","category":"Prayer"},{"title":"Unity: Cocktail","varname":"unity_cocktail","category":"Unity"},{"title":"Arras","varname":"arras","category":"Religious"},{"title":"Last Kiss","varname":"last_kiss","category":"Including Others"},{"title":"License Signing","varname":"license_sign","category":"Other Options"}]))
export { fetchTitles };
