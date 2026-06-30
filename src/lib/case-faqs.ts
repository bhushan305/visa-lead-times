/**
 * Visa-specific FAQ content shown at the bottom of each case page.
 *
 * Each form (and optionally a (form, category) pair) has a list of 5-10
 * Q&As tailored to that case type. Provides substantial editorial content
 * to every case page — useful for visitors AND for passing AdSense's
 * content-quality review.
 *
 * Lookup order in getCaseFaqs():
 *   1. Exact (form_code, category) match (highest specificity)
 *   2. Form-only match
 *   3. Generic fallback (always works)
 */

export type FAQ = { q: string; a: string };

/** Generic FAQ used when we have no form-specific content. */
const GENERIC: FAQ[] = [
  {
    q: "What does this processing time mean for my case?",
    a: "The range shown is USCIS's published estimate of how long it took to complete 80% of cases of this type at this office over the previous six months. Your specific case may resolve faster or slower. Use the range as a planning tool, not a promise.",
  },
  {
    q: "Why is the range so wide?",
    a: "USCIS publishes a range (typically the 50th to 80th percentile of recent completion times) because cases vary in complexity. Straightforward cases with all documents and no flags tend to resolve toward the low end. Cases with RFEs, background-check delays, or evidence issues take longer.",
  },
  {
    q: "What can I do if my case is past the high end of the range?",
    a: "Once your receipt date is older than the displayed case inquiry date, you can submit a service request through your USCIS online account. See our guide on what to do if your case is delayed for the full set of remedies.",
  },
  {
    q: "How often is this data updated?",
    a: "We pull USCIS's published numbers every weekday morning. USCIS itself typically updates its published ranges monthly, so the line you see is more about USCIS's update cadence than ours.",
  },
  {
    q: "Is this data official?",
    a: "The numbers come directly from USCIS's official Processing Times tool — we snapshot what they publish. We are an independent tracker and not affiliated with USCIS.",
  },
];

/**
 * Form-specific FAQs. Key is the form code (e.g., "I-485").
 * Add to this map any time you want to expand a form's FAQ.
 */
const BY_FORM: Record<string, FAQ[]> = {
  "I-129": [
    {
      q: "What case types does Form I-129 cover?",
      a: "I-129 is the Petition for a Nonimmigrant Worker. It covers H-1B specialty occupation, H-2A and H-2B temporary workers, H-3 trainees, L-1A and L-1B intracompany transferees, O-1 extraordinary ability, P-1/2/3 athletes and performers, Q-1 cultural exchange, R-1 religious workers, E-1 treaty traders, E-2 treaty investors, E-3 Australian professionals, and TN USMCA professionals.",
    },
    {
      q: "Is premium processing available for my I-129?",
      a: "Yes, for nearly all I-129 case types. File Form I-907 with the premium processing fee ($2,805 for most I-129 categories as of the 2024 fee rule). USCIS guarantees an action — approval, denial, RFE, or NOID — within 15 business days of receiving the premium request.",
    },
    {
      q: "Can I start working as soon as my I-129 is approved?",
      a: "If you are already in the US in valid status and the petition includes a change-of-status request, you typically wait for approval before starting. If you're abroad, the petition approval lets you apply for a visa stamp; you can work after entering on the new visa. H-1B transferees can begin working at the new employer upon USCIS receipt of the new petition (H-1B portability).",
    },
    {
      q: "What's the H-1B cap process?",
      a: "Cap-subject H-1B requires electronic registration in March, lottery selection in late March or early April, petition filing window starting April 1, and earliest start date of October 1. Cap-exempt H-1B (universities, related nonprofits, government research) can file any time.",
    },
    {
      q: "What's an RFE and what triggers one?",
      a: "RFE = Request for Evidence. USCIS issues an RFE when it needs additional information to decide your case. Common I-129 RFE topics: specialty occupation (the job actually requires a degree), beneficiary qualifications, employer-employee relationship for third-party placements, and wage level discrepancies.",
    },
    {
      q: "What happens to my H-1B if I'm laid off?",
      a: "You have a 60-day grace period (or until your I-94 expires, whichever is shorter) to find a new employer who can file an H-1B transfer, change status, or leave the US. Use the grace period proactively — once it expires, you accrue unlawful presence.",
    },
    {
      q: "How does the H-1B 6-year limit work, and can I extend beyond it?",
      a: "Standard H-1B is capped at 6 years cumulative. You can extend beyond that under AC21 §104 if you have an approved I-140, or under §106 if your PERM labor certification or I-140 has been pending 365+ days.",
    },
  ],

  "I-485": [
    {
      q: "What is Form I-485?",
      a: "I-485 is the Application to Register Permanent Residence or Adjust Status. It's the form you file to become a green card holder while inside the United States, rather than through consular processing abroad.",
    },
    {
      q: "Can I work while my I-485 is pending?",
      a: "Yes, by filing Form I-765 (EAD) concurrently with your I-485. Most adjustment applicants receive an EAD within 4-8 months. The EAD is renewable in 5-year increments as of 2023.",
    },
    {
      q: "Can I travel while my I-485 is pending?",
      a: "Only with an approved Advance Parole (Form I-131), unless you maintain valid H, L, or K nonimmigrant status. Departing without AP is treated as abandoning the I-485 application, with limited exceptions.",
    },
    {
      q: "When is the I-485 interview required?",
      a: "Most family-based and some employment-based cases require an in-person interview at a USCIS field office. Asylee-based and many employment-based cases are waiver-eligible. The interview is typically scheduled in the final months of adjudication.",
    },
    {
      q: "What is concurrent filing?",
      a: "Concurrent filing means submitting your I-130 (family) or I-140 (employment) petition together with your I-485 and supporting EAD/AP applications. It's allowed when the immediate relative category or your employment-based priority date is current.",
    },
    {
      q: "Can I change jobs while my I-485 is pending (employment-based)?",
      a: "Yes, after your I-485 has been pending 180 days, you can change to a 'same or similar' occupation under AC21 §204(j) (INA §204(j)). File Form I-485 Supplement J with the new employer's offer letter.",
    },
    {
      q: "What documents do I need for the medical exam (Form I-693)?",
      a: "The civil surgeon (USCIS-designated doctor) will provide a sealed envelope you submit to USCIS. Vaccinations, tuberculosis test, syphilis/gonorrhea screening, and mental health/drug abuse evaluation are standard. As of 2024 USCIS policy, completed I-693s have indefinite validity once submitted.",
    },
    {
      q: "What's the difference between IR1 and CR1?",
      a: "Both are I-485 outcomes for spouses of US citizens. CR1 (Conditional Resident) is issued when your marriage was less than 2 years old at the time of green card grant — you'll file I-751 to remove conditions 90 days before the 2-year mark. IR1 (Immediate Relative) is the unconditional 10-year green card issued when your marriage is 2+ years old at grant.",
    },
  ],

  "I-130": [
    {
      q: "Who can I file an I-130 for?",
      a: "US citizens can petition for: spouse, unmarried children under 21 (Immediate Relative), parents (if petitioner is 21+), unmarried adult children 21+ (F1), married children of any age (F3), and siblings (F4). Lawful Permanent Residents can petition for: spouse and unmarried children (F2A) and unmarried adult children 21+ (F2B). LPRs cannot petition parents, married children, or siblings.",
    },
    {
      q: "Does I-130 approval mean my relative gets a green card?",
      a: "No. I-130 only establishes the qualifying relationship and creates a priority date. After approval, the beneficiary either files I-485 (if in the US and visa is current) or proceeds through consular processing (if abroad). Wait time depends on Visa Bulletin category and country of birth.",
    },
    {
      q: "What is the Visa Bulletin?",
      a: "A monthly publication from the US Department of State that lists priority dates becoming current for preference-category cases (F1, F2A, F2B, F3, F4, EB-1 through EB-5). Immediate Relatives (IR) are exempt — they don't wait on the bulletin.",
    },
    {
      q: "Why does country of birth matter?",
      a: "Federal law caps the number of visas any single country can use to 7% of the worldwide total per year. For countries with high demand (India, China, Mexico, Philippines), this creates multi-year or multi-decade backlogs in preference categories. Spouses can sometimes 'cross-charge' to the partner's country if it's more current.",
    },
    {
      q: "What evidence do I need for a spouse-based I-130?",
      a: "Marriage certificate, both partners' identity documents, divorce decrees from any prior marriages, and substantial evidence of bona fide marriage: joint bank accounts, joint lease/mortgage, joint utility bills, joint insurance, photos together across time, affidavits from people who know you as a couple, and similar comingled-life evidence.",
    },
    {
      q: "What happens after I-130 approval if my relative is abroad?",
      a: "USCIS forwards the approved petition to the National Visa Center (NVC). The NVC contacts the petitioner and beneficiary to collect the immigrant visa application (DS-260), civil documents (birth, marriage, police clearance, etc.), and the Affidavit of Support (Form I-864). After NVC review, the case ships to the US embassy in the beneficiary's country for an interview.",
    },
    {
      q: "What's an Affidavit of Support?",
      a: "Form I-864 is a legally enforceable promise by the US-citizen or LPR petitioner that they have sufficient income (typically 125% of federal poverty guidelines) to support the beneficiary. If the petitioner's income is insufficient, a 'joint sponsor' can also file an I-864.",
    },
    {
      q: "What if the petitioner dies before the case is complete?",
      a: "Under INA §204(l), the case may continue if the beneficiary was residing in the US at the time of the petitioner's death and meets certain other requirements. Otherwise, the I-130 is typically revoked. Substitute sponsors may step in for the Affidavit of Support.",
    },
  ],

  "I-140": [
    {
      q: "What is Form I-140?",
      a: "Immigrant Petition for Alien Worker. It's the employment-based green card petition typically filed by the US employer (or by the foreign worker themselves for EB-1A, EB-2 NIW, and EB-5). I-140 approval creates a priority date that the beneficiary later uses to file I-485 (adjustment) or pursue consular processing.",
    },
    {
      q: "Which categories does I-140 cover?",
      a: "EB-1 (priority workers — extraordinary ability, outstanding researchers, multinational managers), EB-2 (advanced degree professionals, exceptional ability, and National Interest Waivers), and EB-3 (skilled workers, professionals, and other workers).",
    },
    {
      q: "Is premium processing available for I-140?",
      a: "Yes, for most I-140 categories. File Form I-907 with $2,805 (as of 2024 fee rule) to guarantee USCIS action within 15 business days. EB-1C multinational manager and EB-2 NIW were added to premium processing in 2022.",
    },
    {
      q: "What is the priority date?",
      a: "The date your PERM labor certification was filed with the Department of Labor (for EB-2 and EB-3 cases requiring PERM), or the date USCIS received your I-140 (for EB-1A, EB-2 NIW, and other PERM-exempt categories). Your priority date is your place in line for a visa number.",
    },
    {
      q: "What's the difference between EB-2 and EB-3?",
      a: "EB-2 requires a US Master's degree (or higher) or a Bachelor's plus 5 years of progressive experience; EB-3 requires a Bachelor's plus job requirements of less than 5 years (Professional), 2+ years experience/training (Skilled), or less than 2 years training (Other Workers). EB-2 NIW is self-petitionable with no PERM and no employer. See our EB-2 vs EB-3 guide for the full comparison.",
    },
    {
      q: "Can I change jobs after I-140 is approved?",
      a: "Yes, under AC21 §106(c), once your I-485 has been pending 180+ days, you can change to a same-or-similar occupation without losing your priority date or green card eligibility. Your I-140 also remains valid for retaining the priority date even if you change employers before filing I-485 (subject to a 180-day requirement from approval).",
    },
    {
      q: "How long is PERM labor certification taking?",
      a: "PERM is a Department of Labor process that precedes most EB-2 and EB-3 I-140 filings. As of 2025-2026, PERM is taking approximately 14-18 months from filing for adjudication, plus an additional 6 months for the prevailing wage determination beforehand. Audits significantly extend timing.",
    },
  ],

  "I-765": [
    {
      q: "What is the EAD?",
      a: "Employment Authorization Document — a card from USCIS that lets you work legally in the United States. You file Form I-765 to request one. Different categories of EAD eligibility exist; the right category depends on your immigration situation.",
    },
    {
      q: "How do I know which EAD category to use?",
      a: "The category determines eligibility and document requirements. Common ones: (c)(9) for I-485 applicants, (c)(8) for asylum applicants, (c)(26) for H-4 spouses of certain H-1B holders, (c)(3)(A/B/C) for F-1 students (OPT/STEM OPT), (a)(5) for asylees, (a)(12) for TPS approved. See USCIS's EAD eligibility category list for the full set.",
    },
    {
      q: "How long does an EAD last?",
      a: "As of 2023, USCIS extended initial EAD validity to 5 years for several categories including (c)(8) asylum applicants, (c)(9) I-485 applicants, (a)(10) withholding of removal grantees, and (c)(11) certain parolees. Most other categories are 1-2 year validity.",
    },
    {
      q: "Can I renew before my EAD expires?",
      a: "Yes — file a new I-765 up to 180 days before expiration. For many categories, an automatic 540-day extension applies if you file before expiration, so you may continue working while the renewal is pending.",
    },
    {
      q: "What's a 'combo card' for I-485 applicants?",
      a: "When you file I-485 concurrently with I-765 (c)(9) and I-131 advance parole, USCIS often issues a single card that doubles as both an EAD and an AP travel document.",
    },
    {
      q: "Can my employer require specific documents to verify my EAD?",
      a: "Your EAD card itself is a List A document for Form I-9 employment verification and is sufficient on its own. Employers cannot require additional documents under federal law.",
    },
  ],

  "N-400": [
    {
      q: "When can I file Form N-400?",
      a: "You can file up to 90 days before reaching your eligibility window: 5 years of continuous LPR status (or 3 years if married to and living with a US citizen during that entire period). Filing earlier than 90 days before risks denial.",
    },
    {
      q: "What's the difference between continuous residence and physical presence?",
      a: "Continuous residence means you've maintained LPR status without abandoning it (trips of 6+ months can break it, 1+ year almost certainly breaks it). Physical presence is your actual time in the US — 30 months in 5 years (or 18 months in 3 years) is the minimum.",
    },
    {
      q: "What's on the civics test?",
      a: "USCIS pulls from a pool of 100 questions covering US history, geography, government, and rights. Officers ask up to 10 questions during the interview; you must answer 6 correctly. Senior applicants (65/20 rule) get a smaller question pool. Study materials are free on USCIS.gov.",
    },
    {
      q: "What's the English test?",
      a: "Three components: speaking (assessed during the interview as you answer the officer's questions), reading (read one of three short sentences correctly), and writing (write one of three short sentences correctly). The 50/20 rule (50+ years old, 20+ years as LPR) and 55/15 rule waive the English test.",
    },
    {
      q: "Will my prior arrests cause a problem?",
      a: "All arrests must be disclosed, even if dismissed or expunged. USCIS evaluates 'good moral character' over the statutory period (5 years for most, 3 years for spouse-based naturalization). Certain criminal convictions are permanent bars (aggravated felonies, murder); many others fall on the case-by-case continuum. Consult an immigration attorney if you have any criminal history.",
    },
    {
      q: "What happens at the oath ceremony?",
      a: "You return your green card, take the Oath of Allegiance, and receive your Certificate of Naturalization (Form N-550). You're a US citizen from that moment — you can register to vote that day, apply for a US passport, and begin sponsoring relatives faster than as an LPR.",
    },
    {
      q: "Can I travel while my N-400 is pending?",
      a: "Yes, but watch out for trips of 6+ months which can reset your continuous-residence clock. Keep all travel records (passport stamps, boarding passes). If your green card expires during the wait, request an ADIT stamp at USCIS (the card extension is automatic on the N-400 receipt notice for some applicants).",
    },
  ],

  "I-751": [
    {
      q: "What is Form I-751?",
      a: "Petition to Remove Conditions on Residence. It's filed by conditional permanent residents (those who got a green card based on marriage to a US citizen that was less than 2 years old at the time of grant) within the 90 days before their conditional green card expires.",
    },
    {
      q: "When do I file the I-751?",
      a: "Within the 90-day window before your conditional green card's 2-year expiration date. Filing too early (more than 90 days out) results in rejection. Filing late requires a written explanation of good cause.",
    },
    {
      q: "Can I file alone if I'm divorced or my spouse is abusive?",
      a: "Yes. You can request a 'waiver' of the joint filing requirement based on: good-faith marriage that ended in divorce or annulment; battered spouse / abuse waiver; or extreme hardship if removed. Each requires its own evidence package.",
    },
    {
      q: "Do I get a new green card while I-751 is pending?",
      a: "No, but USCIS issues an automatic extension of your conditional green card (currently 48 months as of 2024 policy) noted on the I-751 receipt notice. The receipt + expired green card together serve as proof of LPR status for work and travel.",
    },
    {
      q: "Is there an interview for I-751?",
      a: "Sometimes. Strong documentation can result in approval without interview. RFEs and interviews are more common when the bona fide marriage evidence is thin or when filing under a waiver.",
    },
    {
      q: "Can I file N-400 for naturalization while my I-751 is pending?",
      a: "Yes. You can file N-400 up to 90 days before your 3-year mark as a conditional resident if married to a US citizen. The N-400 doesn't depend on I-751 approval; the cases proceed in parallel, and USCIS often consolidates the I-751 decision with the N-400 interview.",
    },
  ],

  "I-90": [
    {
      q: "When do I file Form I-90?",
      a: "To renew an expiring 10-year green card (file within 6 months of expiration), to replace a lost or stolen card, to correct a USCIS error on your card, to update biographical info after a legal name change, or to receive your initial card if you became LPR before age 14 (issued for first time after 14th birthday).",
    },
    {
      q: "Do I need to file I-90 if I'm naturalizing?",
      a: "Not solely for that reason. If your N-400 is pending and your green card is expiring, USCIS will typically not require I-90 — you can request an ADIT stamp at a field office for proof of LPR status. But if you need to travel internationally before the N-400 interview and your card is expired, I-90 may be advisable.",
    },
    {
      q: "How long does I-90 take?",
      a: "Currently averaging 6-14 months for renewal; replacement may be faster. USCIS automatically extends the validity of your expiring/expired green card by 36 months via a notice printed on the I-90 receipt — the receipt + expired green card serve as proof of LPR status.",
    },
    {
      q: "Can I work and travel while my I-90 is pending?",
      a: "Yes. The I-90 receipt notice extends your LPR status validity by 36 months. Keep your receipt with your expired green card. If you need to travel and your card has been expired more than 12 months, request an ADIT stamp at a USCIS field office.",
    },
    {
      q: "What if I lost my green card?",
      a: "File I-90 with the 'lost or stolen' reason. File a police report if stolen and include it with your petition (not required but helpful). The replacement fee is the standard I-90 fee. Plan ahead — replacement can take months.",
    },
  ],

  "I-131": [
    {
      q: "What is Form I-131 for?",
      a: "Three main uses: (1) Advance Parole — permission to re-enter the US after temporary travel abroad, typically for I-485 applicants; (2) Re-entry Permit — for LPRs traveling abroad for 1-2 years; (3) Refugee Travel Document — for asylees, refugees, and certain LPRs.",
    },
    {
      q: "Why do I need Advance Parole if I have a pending I-485?",
      a: "Without AP, departing the US is treated as abandoning your adjustment application (with limited exceptions for H, L, K visa holders). AP is the official permission slip that lets you leave and return while your I-485 is pending.",
    },
    {
      q: "How long does AP last?",
      a: "Typically 1-2 years from approval, or until I-485 decision (whichever is earlier). Multiple entries allowed within validity period. Newer AP cards issued as a 'combo card' with EAD often last 5 years.",
    },
    {
      q: "Can I travel while my AP application is pending?",
      a: "No. If you depart the US before AP is approved, your I-485 is considered abandoned. Apply for AP and wait for approval before international travel.",
    },
    {
      q: "What's the difference between Re-entry Permit and Advance Parole?",
      a: "Re-entry Permit is for LPRs traveling for extended periods (1-2 years). Advance Parole is for those with pending immigration cases (I-485, certain humanitarian statuses) who need to travel without abandoning the case.",
    },
    {
      q: "Can a conditional permanent resident apply for a Re-entry Permit?",
      a: "Yes. Conditional residents have the same travel rights as 10-year LPRs and can apply for I-131 re-entry permits. The permit doesn't extend conditional status — you still must timely file I-751 to remove conditions.",
    },
  ],

  "I-129F": [
    {
      q: "What is Form I-129F?",
      a: "Petition for Alien Fiancé(e). Filed by a US citizen for a foreign-national fiancé(e) (K-1) or, less commonly, a foreign-national spouse abroad (K-3). Approval allows the beneficiary to apply for a K visa at a US consulate.",
    },
    {
      q: "What's the K-1 timeline?",
      a: "Typical end-to-end timeline: I-129F filing → USCIS approval (6-12 months) → National Visa Center processing (1-2 months) → Consular interview scheduling (1-6 months) → K-1 visa issuance → 6 months to enter the US → 90 days to marry → I-485 filing for adjustment of status.",
    },
    {
      q: "What evidence do I need for a bona fide relationship?",
      a: "Proof you've met in person within the past 2 years (photos, flight records, hotel receipts), communication history (chat logs, emails, call records), evidence of intent to marry within 90 days of beneficiary's US entry, and any joint travel or shared activities.",
    },
    {
      q: "What's the difference between K-1 and CR-1?",
      a: "K-1 is for fiancé(e)s — get married after entering the US, then file I-485 to adjust status. CR-1 is for spouses already married — direct immigrant visa, arrives as a conditional permanent resident. CR-1 is generally cleaner long-term but slower overall (and requires being married first); K-1 is faster to bring partner to US.",
    },
    {
      q: "Can my K-1 fiancé(e) work in the US?",
      a: "After arrival, they can file I-765 EAD (category a-6) but processing typically takes longer than the 90-day marriage window. Most K-1s skip the K-1 EAD and instead file I-485 + I-765 (c-9) after marriage; the c-9 EAD typically arrives in 4-8 months.",
    },
    {
      q: "What if we don't marry within 90 days of US entry?",
      a: "The K-1 beneficiary must leave the US. There is no extension and no path to adjust to another status from K-1. Marry within 90 days, or depart and re-file under a different petition (CR-1, B-2, etc.).",
    },
  ],

  "I-539": [
    {
      q: "What is Form I-539?",
      a: "Application to Extend/Change Nonimmigrant Status. Used to request more time in your current status (e.g., extending B-2 visitor status) or to switch to a different nonimmigrant category (e.g., F-1 to H-1B is typically handled via I-129 instead, but B-2 to F-1 uses I-539).",
    },
    {
      q: "What case types commonly use I-539?",
      a: "B-1/B-2 visitor extensions; F-1/F-2/M-1/M-2 student status changes; J-1/J-2 exchange visitors; H-4/L-2/O-3/P-4/R-2 dependents (extension or change of status); K-3/K-4 (less common).",
    },
    {
      q: "Can I file I-539 for my H-4 spouse separately?",
      a: "Yes, but it's typical to file H-4 dependents on a single I-539 alongside the principal's I-129 H-1B extension or change. If filed concurrently, USCIS often processes them together. If filed separately, the H-4 case can lag the principal's.",
    },
    {
      q: "Can I work on I-539 status?",
      a: "Not on the I-539 itself — it's a status application, not a work authorization. H-4 dependents of certain H-1B holders (those with approved I-140 or post-6-year extension) can file a separate I-765 for an EAD; L-2 spouses are automatically work-authorized incident to status.",
    },
    {
      q: "How long does I-539 take?",
      a: "Highly variable by case type. H-4 and L-2 extensions filed alongside principal's I-129 typically process together. B-2 extensions can take 4-8 months. Some I-539 categories are eligible for premium processing (H-4, L-2, E dependents) for $1,965 — file Form I-907.",
    },
    {
      q: "What's the 240-day work rule for H-4 EAD renewals?",
      a: "If your H-4 EAD renewal is filed timely (before expiration), federal regulations provide a 540-day automatic extension of EAD validity for certain categories (as of 2024 USCIS policy). This may allow continued employment while the renewal is pending.",
    },
  ],
};

/** Optional category-level overrides — for forms where category strongly determines the FAQ set. */
const BY_FORM_AND_CATEGORY: Record<string, Record<string, FAQ[]>> = {
  // Currently empty. Add entries like:
  // "I-485": { "Employment-based adjustment applications": [ ... ] }
};

/**
 * Public lookup. Returns the most-specific FAQ set available for this case.
 */
export function getCaseFaqs(form_code: string, category: string): FAQ[] {
  const formMap = BY_FORM_AND_CATEGORY[form_code];
  if (formMap) {
    for (const [k, v] of Object.entries(formMap)) {
      if (category.toLowerCase().includes(k.toLowerCase())) return v;
    }
  }
  if (BY_FORM[form_code]) return BY_FORM[form_code];
  return GENERIC;
}
