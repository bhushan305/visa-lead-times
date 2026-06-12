/**
 * Visa-name → USCIS-form mapping.
 *
 * Users search by visa name ("E-2", "B1/B2", "EB-2", "H-1B"); the database
 * is keyed by USCIS form number ("I-129", "I-485", "I-539"). This map is the
 * translation layer.
 *
 * Each alias maps to ONE OR MORE forms, in order of relevance for that visa
 * (first = most likely match). The search booster awards highest score to
 * the first form, decreasing for subsequent forms — so users see the most
 * relevant path on top but still discover related forms.
 *
 * Subterms narrow matches WITHIN a form's cases — e.g. an "E-2" search
 * should find I-129 cases whose category text mentions "E-2" specifically,
 * not all I-129 cases.
 *
 * NOTE on coverage: this list covers the USCIS-form universe. Some visas
 * (B-1/B-2 for new entries, F-1 for initial issuance) are issued by the
 * State Department at consulates, NOT USCIS — for those we map to the USCIS
 * form involved in extensions / change of status / dependents (typically
 * I-539). When a visa is consular-only with no USCIS touchpoint, we don't
 * include it.
 */

export type VisaAlias = {
  /** USCIS forms relevant to this visa, ordered by relevance (first = primary). */
  forms: string[];
  /** Friendly name shown in search UI ("Matched: E-2 Treaty Investor"). */
  display: string;
  /**
   * Optional subterms — keyword fragments that narrow case matches WITHIN
   * a form. Keyed by form code. Useful when a single form (e.g. I-129) hosts
   * many distinct visa types and we want the right one to bubble up.
   */
  subterms?: Record<string, string[]>;
};

/** Normalize a query or alias key — lowercase, strip everything non-alphanumeric. */
export function normalizeVisa(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]/g, "");
}

/**
 * Master alias map. Keys are normalized (no dashes, slashes, or spaces).
 * Users typing "E-2", "E2", "e 2" all hit `e2` after normalization.
 */
export const VISA_ALIASES: Record<string, VisaAlias> = {
  // ============================================================
  // EMPLOYMENT-PETITIONED NONIMMIGRANT (I-129)
  // ============================================================
  // H-1B family
  h1b:   { forms: ["I-129", "I-539"], display: "H-1B Specialty Occupation",      subterms: { "I-129": ["h-1b", "h1b"], "I-539": ["h-4", "h4"] } },
  h1:    { forms: ["I-129"],          display: "H-1B Specialty Occupation",      subterms: { "I-129": ["h-1b", "h1b"] } },
  hb1:   { forms: ["I-129"],          display: "H-1B Specialty Occupation",      subterms: { "I-129": ["h-1b", "h1b"] } },
  h1b1:  { forms: ["I-129"],          display: "H-1B1 (Chile / Singapore FTA)", subterms: { "I-129": ["h-1b1", "h1b1"] } },
  h2a:   { forms: ["I-129"],          display: "H-2A Temporary Agricultural Worker", subterms: { "I-129": ["h-2a", "h2a"] } },
  h2b:   { forms: ["I-129"],          display: "H-2B Temporary Non-agricultural Worker", subterms: { "I-129": ["h-2b", "h2b"] } },
  h3:    { forms: ["I-129"],          display: "H-3 Trainee",                    subterms: { "I-129": ["h-3", "h3"] } },
  h4:    { forms: ["I-539", "I-765"], display: "H-4 (H-1B Dependent)",           subterms: { "I-539": ["h-4", "h4"], "I-765": ["h-4", "c26", "(c)(26)"] } },

  // L visas
  l1:    { forms: ["I-129"], display: "L-1 Intracompany Transferee", subterms: { "I-129": ["l-1", "l1"] } },
  l1a:   { forms: ["I-129"], display: "L-1A Manager / Executive",    subterms: { "I-129": ["l-1a", "l1a"] } },
  l1b:   { forms: ["I-129"], display: "L-1B Specialized Knowledge",  subterms: { "I-129": ["l-1b", "l1b"] } },
  l2:    { forms: ["I-539", "I-765"], display: "L-2 (L-1 Dependent)",        subterms: { "I-539": ["l-2", "l2"], "I-765": ["l-2"] } },

  // O visas
  o1:    { forms: ["I-129"], display: "O-1 Extraordinary Ability", subterms: { "I-129": ["o-1", "o1"] } },
  o1a:   { forms: ["I-129"], display: "O-1A Sciences / Business / Athletics", subterms: { "I-129": ["o-1a", "o1a"] } },
  o1b:   { forms: ["I-129"], display: "O-1B Arts",                  subterms: { "I-129": ["o-1b", "o1b"] } },
  o2:    { forms: ["I-129"], display: "O-2 Support for O-1",        subterms: { "I-129": ["o-2", "o2"] } },
  o3:    { forms: ["I-539"], display: "O-3 (O-1/O-2 Dependent)",    subterms: { "I-539": ["o-3", "o3"] } },

  // P visas
  p1:    { forms: ["I-129"], display: "P-1 Athletes / Entertainers", subterms: { "I-129": ["p-1", "p1"] } },
  p1a:   { forms: ["I-129"], display: "P-1A Athletes",               subterms: { "I-129": ["p-1a", "p1a"] } },
  p1b:   { forms: ["I-129"], display: "P-1B Entertainment Group",    subterms: { "I-129": ["p-1b", "p1b"] } },
  p2:    { forms: ["I-129"], display: "P-2 Reciprocal Exchange Performer", subterms: { "I-129": ["p-2", "p2"] } },
  p3:    { forms: ["I-129"], display: "P-3 Culturally Unique Performer",   subterms: { "I-129": ["p-3", "p3"] } },
  p4:    { forms: ["I-539"], display: "P-4 (P-1/2/3 Dependent)",     subterms: { "I-539": ["p-4", "p4"] } },

  // Q, R
  q1:    { forms: ["I-129"], display: "Q-1 Cultural Exchange", subterms: { "I-129": ["q-1", "q1"] } },
  r1:    { forms: ["I-129"], display: "R-1 Religious Worker", subterms: { "I-129": ["r-1", "r1"] } },
  r2:    { forms: ["I-539"], display: "R-2 (R-1 Dependent)",  subterms: { "I-539": ["r-2", "r2"] } },

  // E (treaty)
  e1:    { forms: ["I-129"], display: "E-1 Treaty Trader",                   subterms: { "I-129": ["e-1", "e1"] } },
  e2:    { forms: ["I-129"], display: "E-2 Treaty Investor",                 subterms: { "I-129": ["e-2", "e2"] } },
  e3:    { forms: ["I-129"], display: "E-3 Australian Specialty Occupation", subterms: { "I-129": ["e-3", "e3"] } },

  // TN (USMCA)
  tn:    { forms: ["I-129"], display: "TN USMCA Professional (Canada / Mexico)", subterms: { "I-129": ["tn", "trade nafta", "usmca"] } },
  tn1:   { forms: ["I-129"], display: "TN-1 (Canada) USMCA Professional",        subterms: { "I-129": ["tn"] } },
  tn2:   { forms: ["I-129"], display: "TN-2 (Mexico) USMCA Professional",        subterms: { "I-129": ["tn"] } },

  // ============================================================
  // NONIMMIGRANT EXTENSION / CHANGE OF STATUS (I-539)
  // ============================================================
  b1:    { forms: ["I-539"], display: "B-1 Business Visitor (extension / change of status)", subterms: { "I-539": ["b-1", "b1", "visitor"] } },
  b2:    { forms: ["I-539"], display: "B-2 Tourist Visitor (extension / change of status)",  subterms: { "I-539": ["b-2", "b2", "visitor"] } },
  b1b2:  { forms: ["I-539"], display: "B-1/B-2 Visitor (extension / change of status)",      subterms: { "I-539": ["b-1", "b-2", "visitor"] } },
  visitor: { forms: ["I-539"], display: "Visitor B-1/B-2 (extension / change of status)",    subterms: { "I-539": ["visitor", "b-1", "b-2"] } },

  // F (student)
  f1:    { forms: ["I-539", "I-765"], display: "F-1 Student (extension / OPT)", subterms: { "I-539": ["f-1", "f1"], "I-765": ["f-1", "opt", "c03"] } },
  f2:    { forms: ["I-539"], display: "F-2 (F-1 Dependent)",      subterms: { "I-539": ["f-2", "f2"] } },
  m1:    { forms: ["I-539"], display: "M-1 Vocational Student",    subterms: { "I-539": ["m-1", "m1"] } },
  m2:    { forms: ["I-539"], display: "M-2 (M-1 Dependent)",       subterms: { "I-539": ["m-2", "m2"] } },
  opt:        { forms: ["I-765"], display: "F-1 OPT (Optional Practical Training)", subterms: { "I-765": ["opt", "c-3", "(c)(3)"] } },
  stemopt:    { forms: ["I-765"], display: "F-1 STEM OPT Extension",                 subterms: { "I-765": ["stem", "opt"] } },

  // J (exchange visitor)
  j1:    { forms: ["I-539"], display: "J-1 Exchange Visitor",          subterms: { "I-539": ["j-1", "j1", "exchange"] } },
  j2:    { forms: ["I-539", "I-765"], display: "J-2 (J-1 Dependent)", subterms: { "I-539": ["j-2", "j2"], "I-765": ["j-2", "c-5", "(c)(5)"] } },

  // V (less common)
  v:     { forms: ["I-539"], display: "V Visa (Spouse/Child of LPR)",     subterms: { "I-539": ["v-1", "v-2", "v-3"] } },

  // ============================================================
  // FAMILY-BASED IMMIGRANT (I-130 + I-485)
  // ============================================================
  ir1:   { forms: ["I-130", "I-485"], display: "IR-1 Spouse of US Citizen",      subterms: { "I-130": ["ir-1", "spouse", "immediate"], "I-485": ["spouse", "family"] } },
  ir2:   { forms: ["I-130", "I-485"], display: "IR-2 Child of US Citizen",       subterms: { "I-130": ["ir-2", "child", "immediate"], "I-485": ["child", "family"] } },
  ir3:   { forms: ["I-130", "I-485"], display: "IR-3 Orphan Adopted Abroad",     subterms: { "I-130": ["ir-3", "orphan"] } },
  ir4:   { forms: ["I-130", "I-485"], display: "IR-4 Orphan to be Adopted",      subterms: { "I-130": ["ir-4", "orphan"] } },
  ir5:   { forms: ["I-130", "I-485"], display: "IR-5 Parent of US Citizen",      subterms: { "I-130": ["ir-5", "parent"] } },
  cr1:   { forms: ["I-130", "I-485"], display: "CR-1 Conditional Spouse",        subterms: { "I-130": ["cr-1", "spouse"], "I-485": ["spouse"] } },
  cr2:   { forms: ["I-130", "I-485"], display: "CR-2 Conditional Child",         subterms: { "I-130": ["cr-2", "child"] } },
  f2a:   { forms: ["I-130", "I-485"], display: "F2A Spouse / Minor Child of LPR", subterms: { "I-130": ["f2a", "f-2a"], "I-485": ["family", "lpr"] } },
  f2b:   { forms: ["I-130", "I-485"], display: "F2B Unmarried Adult Child of LPR", subterms: { "I-130": ["f2b", "f-2b"] } },
  f3:    { forms: ["I-130", "I-485"], display: "F3 Married Child of US Citizen", subterms: { "I-130": ["f3", "f-3"] } },
  f4:    { forms: ["I-130", "I-485"], display: "F4 Sibling of US Citizen",       subterms: { "I-130": ["f4", "f-4", "sibling"] } },

  // K (fiancé / spouse via I-129F)
  k1:    { forms: ["I-129F"], display: "K-1 Fiancé(e) Visa" },
  k2:    { forms: ["I-129F"], display: "K-2 Child of K-1 Fiancé(e)" },
  k3:    { forms: ["I-129F"], display: "K-3 Spouse of US Citizen" },
  k4:    { forms: ["I-129F"], display: "K-4 Child of K-3 Spouse" },
  fiance:     { forms: ["I-129F"], display: "K-1 Fiancé(e) Visa" },
  fiancee:    { forms: ["I-129F"], display: "K-1 Fiancé(e) Visa" },

  // ============================================================
  // EMPLOYMENT-BASED IMMIGRANT (I-140, I-360, I-526, + I-485)
  // ============================================================
  eb1:   { forms: ["I-140", "I-485"], display: "EB-1 First Preference (Priority Workers)" },
  eb1a:  { forms: ["I-140", "I-485"], display: "EB-1A Extraordinary Ability" },
  eb1b:  { forms: ["I-140", "I-485"], display: "EB-1B Outstanding Professor / Researcher" },
  eb1c:  { forms: ["I-140", "I-485"], display: "EB-1C Multinational Manager / Executive" },
  eb2:   { forms: ["I-140", "I-485"], display: "EB-2 Second Preference (Advanced Degree / Exceptional Ability)" },
  eb2niw:{ forms: ["I-140", "I-485"], display: "EB-2 NIW (National Interest Waiver)" },
  niw:   { forms: ["I-140", "I-485"], display: "EB-2 NIW (National Interest Waiver)" },
  eb3:   { forms: ["I-140", "I-485"], display: "EB-3 Third Preference (Skilled / Professional / Other)" },
  eb4:   { forms: ["I-360", "I-485"], display: "EB-4 Special Immigrant (Religious, SIJ, etc.)" },
  eb5:   { forms: ["I-526", "I-485", "I-526E"], display: "EB-5 Investor (Direct / Regional Center)" },
  eb5rc: { forms: ["I-526E", "I-485"], display: "EB-5 Regional Center Investor" },

  // ============================================================
  // GREEN CARD / ADJUSTMENT
  // ============================================================
  greencard:           { forms: ["I-485"], display: "Green Card (Adjustment of Status)" },
  gc:                  { forms: ["I-485"], display: "Green Card (Adjustment of Status)" },
  aos:                 { forms: ["I-485"], display: "Adjustment of Status (I-485)" },
  permanentresidence:  { forms: ["I-485"], display: "Permanent Residence (Green Card)" },
  permanentresident:   { forms: ["I-485"], display: "Permanent Residence (Green Card)" },
  lpr:                 { forms: ["I-485"], display: "Lawful Permanent Resident" },

  // ============================================================
  // CITIZENSHIP / NATURALIZATION
  // ============================================================
  citizenship:    { forms: ["N-400"], display: "US Citizenship (Naturalization)" },
  naturalization: { forms: ["N-400"], display: "US Citizenship (Naturalization)" },
  n400:           { forms: ["N-400"], display: "N-400 Naturalization" },
  uscitizen:      { forms: ["N-400"], display: "Become a US Citizen (Naturalization)" },
  n600:           { forms: ["N-600"], display: "N-600 Certificate of Citizenship" },
  n600k:          { forms: ["N-600K"], display: "N-600K Citizenship for Child Residing Abroad" },
  n565:           { forms: ["N-565"], display: "N-565 Replacement Naturalization Document" },

  // ============================================================
  // WORK AUTHORIZATION (I-765 — many categories)
  // ============================================================
  ead:               { forms: ["I-765"], display: "EAD (Employment Authorization Document)" },
  workpermit:        { forms: ["I-765"], display: "Work Permit (EAD)" },
  workauthorization: { forms: ["I-765"], display: "Work Authorization (EAD)" },
  c08:               { forms: ["I-765"], display: "EAD (c)(8) — Asylum Pending",    subterms: { "I-765": ["c-8", "c08", "asylum"] } },
  c09:               { forms: ["I-765"], display: "EAD (c)(9) — Adjustment Pending", subterms: { "I-765": ["c-9", "c09", "adjustment"] } },
  c26:               { forms: ["I-765"], display: "EAD (c)(26) — H-4 Spouse",        subterms: { "I-765": ["c-26", "c26", "h-4"] } },
  a05:               { forms: ["I-765"], display: "EAD (a)(5) — Asylee",             subterms: { "I-765": ["a-5", "a05"] } },
  a07:               { forms: ["I-765"], display: "EAD (a)(7) — N-8 / N-9",          subterms: { "I-765": ["a-7", "a07"] } },
  a12:               { forms: ["I-765"], display: "EAD (a)(12) — TPS Approved",      subterms: { "I-765": ["a-12", "a12"] } },
  c19:               { forms: ["I-765"], display: "EAD (c)(19) — TPS Pending",       subterms: { "I-765": ["c-19", "c19"] } },

  // ============================================================
  // TRAVEL DOCUMENTS (I-131)
  // ============================================================
  ap:                       { forms: ["I-131"], display: "Advance Parole" },
  advanceparole:            { forms: ["I-131"], display: "Advance Parole" },
  reentrypermit:            { forms: ["I-131"], display: "Re-entry Permit" },
  reentry:                  { forms: ["I-131"], display: "Re-entry Permit" },
  refugeetraveldocument:    { forms: ["I-131"], display: "Refugee Travel Document" },
  rtd:                      { forms: ["I-131"], display: "Refugee Travel Document" },
  traveldocument:           { forms: ["I-131"], display: "Travel Document" },

  // ============================================================
  // REMOVAL OF CONDITIONS (I-751, I-829)
  // ============================================================
  i751:             { forms: ["I-751"], display: "I-751 Remove Conditions on Residence" },
  roc:              { forms: ["I-751"], display: "Removal of Conditions (I-751)" },
  removeconditions: { forms: ["I-751"], display: "Removal of Conditions (I-751)" },
  i829:             { forms: ["I-829"], display: "I-829 Remove Conditions (EB-5 Investor)" },

  // ============================================================
  // GREEN CARD REPLACEMENT / RENEWAL (I-90)
  // ============================================================
  i90:             { forms: ["I-90"], display: "I-90 Green Card Replacement / Renewal" },
  renewgreencard:  { forms: ["I-90"], display: "Renew Green Card (I-90)" },
  replacegreencard:{ forms: ["I-90"], display: "Replace Green Card (I-90)" },

  // ============================================================
  // HUMANITARIAN (TPS, DACA, U, T, VAWA, Refugee/Asylee relative)
  // ============================================================
  tps:                       { forms: ["I-821"], display: "TPS (Temporary Protected Status)" },
  temporaryprotectedstatus:  { forms: ["I-821"], display: "Temporary Protected Status (TPS)" },
  daca:                      { forms: ["I-821D"], display: "DACA (Deferred Action for Childhood Arrivals)" },
  dreamer:                   { forms: ["I-821D"], display: "DACA (Deferred Action — 'Dreamer')" },

  u:        { forms: ["I-918"], display: "U Visa (Crime Victim)" },
  uvisa:    { forms: ["I-918"], display: "U Visa (Crime Victim)" },
  u1:       { forms: ["I-918"], display: "U-1 Visa (Crime Victim)" },
  i918:     { forms: ["I-918"], display: "U Visa Petition (I-918)" },

  t:        { forms: ["I-914"], display: "T Visa (Trafficking Victim)" },
  tvisa:    { forms: ["I-914"], display: "T Visa (Trafficking Victim)" },
  t1:       { forms: ["I-914"], display: "T-1 Visa (Trafficking Victim)" },
  i914:     { forms: ["I-914"], display: "T Visa Petition (I-914)" },

  vawa:     { forms: ["I-360"], display: "VAWA Self-Petition (Abused Spouse / Child / Parent)" },
  i360:     { forms: ["I-360"], display: "I-360 Special Immigrant Petition" },
  sij:      { forms: ["I-360"], display: "SIJ (Special Immigrant Juvenile)" },

  i730:     { forms: ["I-730"], display: "I-730 Refugee / Asylee Relative Petition" },

  // ============================================================
  // WAIVERS
  // ============================================================
  i601a:    { forms: ["I-601A"], display: "I-601A Provisional Unlawful Presence Waiver" },

  // ============================================================
  // ADOPTION
  // ============================================================
  i600:     { forms: ["I-600"],  display: "I-600 Petition for Orphan (non-Hague)" },
  i600a:    { forms: ["I-600A"], display: "I-600A Application for Advance Processing of Orphan" },
  i800:     { forms: ["I-800"],  display: "I-800 Petition for Adoptee (Hague)" },
  i800a:    { forms: ["I-800A"], display: "I-800A Application for Eligibility to Adopt (Hague)" },
  hague:    { forms: ["I-800", "I-800A"], display: "Hague Convention Adoption" },
  orphan:   { forms: ["I-600", "I-600A"], display: "Orphan Adoption (non-Hague)" },
  adoption: { forms: ["I-800", "I-600"],  display: "International Adoption" },

  // ============================================================
  // MISC ADMIN
  // ============================================================
  i102:    { forms: ["I-102"], display: "I-102 Replace Arrival/Departure Record (I-94)" },
  i94:     { forms: ["I-102"], display: "I-94 Arrival / Departure Record" },
  i817:    { forms: ["I-817"], display: "I-817 Family Unity Benefits" },
  i824:    { forms: ["I-824"], display: "I-824 Action on Approved Application / Petition" },
  i526:    { forms: ["I-526"], display: "I-526 EB-5 Direct Investor Petition" },
  i526e:   { forms: ["I-526E"], display: "I-526E EB-5 Regional Center Investor Petition" },
  i924:    { forms: ["I-924"], display: "I-924 Regional Center Designation" },
};

/**
 * Look up a visa alias for a free-form user query. Strict matching: the
 * normalized query must EXACTLY equal an alias key. Returns null otherwise.
 */
export function lookupVisaAlias(query: string): VisaAlias | null {
  const key = normalizeVisa(query);
  if (!key) return null;
  return VISA_ALIASES[key] ?? null;
}
