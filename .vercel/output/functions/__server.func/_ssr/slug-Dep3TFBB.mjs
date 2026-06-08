const OFFICE_ABBREV = [
  [/service\s*center\s*operations\s*\(?\s*scops\s*\)?/i, "scops"],
  [/national\s*benefits\s*center\s*\(?\s*nbc\s*\)?/i, "nbc"],
  [/california\s*service\s*center/i, "csc"],
  [/texas\s*service\s*center/i, "tsc"],
  [/nebraska\s*service\s*center/i, "nsc"],
  [/vermont\s*service\s*center/i, "vsc"],
  [/potomac\s*service\s*center/i, "psc"],
  [/all\s*field\s*offices/i, "all-offices"]
];
function normaliseOffice(s) {
  let out = s;
  for (const [re, abbr] of OFFICE_ABBREV) out = out.replace(re, abbr);
  return out;
}
function stripUscisCodes(s) {
  return s.replace(/\[[^\]]+\]/g, " ").replace(/\(([^)]+)\)/g, (_m, inside) => {
    const meaningful = /^[A-Z]-?\d|^[A-Z]\d-?[A-Z]|^[CO]\d{1,2}$/i.test(inside.trim());
    return meaningful ? ` ${inside} ` : " ";
  }).replace(/^[\s-]*\d{2,4}[a-z]?\s*-\s*/i, "").replace(/\b[A-Z]\d{2,3}\b(?!\s*[A-Z])/g, " ");
}
function slugifyText(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
function caseSlug(form_code, category, office) {
  const form = slugifyText(form_code);
  const cat = slugifyText(stripUscisCodes(category));
  const off = slugifyText(normaliseOffice(office));
  const raw = [form, cat, off].filter(Boolean).join("-");
  if (raw.length <= 100) return raw;
  return raw.slice(0, 100).replace(/-+[^-]*$/, "");
}
export {
  caseSlug as c
};
