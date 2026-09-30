// The four engineering calls I would make again — told as decisions, not
// features. Each has a situation, the call, the reasoning, and the cost.
//
// These come from the HMS clinical-safety and performance docs. They are the
// interview stories, written down.

export const decisions = [
  {
    n: '01',
    tag: 'Performance',
    title: 'Let the bill carry its department.',
    hook: 'The report took 10.5 seconds. The fix was not a faster query — it was a different question.',
    situation:
      'The 365-day billing report joined every bill to its admission or consultation to find the department. Two $lookups per bill, 56,000 bills, 10,465 ms.',
    decision:
      'Stamp the department onto the bill when the bill is generated. The report filters on an index range and never joins.',
    why:
      'A bill’s department is decided once and read thousands of times. Data that is read far more than it changes should be denormalised toward the reader.',
    cost:
      'A one-off backfill of 56,356 bills, and a refresh rule for the rare admission that moves department. 152 ms.'
  },
  {
    n: '02',
    tag: 'Correctness under load',
    title: 'The order that fell past row 500.',
    hook: 'The laboratory queue was fast. It was also wrong, and only at volume.',
    situation:
      'The queue took the first 500 active orders in index order and sorted those. With thousands active, a STAT troponin could be order 501 — and simply not appear.',
    decision:
      'Read each urgency tier oldest-first until the row limit, rather than reading 500 rows and sorting.',
    why:
      'A cardiac test that is not on the queue is not a performance bug; it is a patient-safety bug that a latency budget would never catch. The load test caught it because the seed writes a real hospital-year, not ten rows.',
    cost:
      'Slightly more query complexity, and a rule I now apply everywhere: never sort after you cut.'
  },
  {
    n: '03',
    tag: 'Access design',
    title: 'Break the glass — widen who, never what.',
    hook: 'A restriction that holds while the patient is unconscious is a safety failure, not a privacy win.',
    situation:
      'Some records are restricted to the treating team: a staff member as a patient, a public figure, a safeguarding case. In resus, the treating team is whoever is in the room.',
    decision:
      'Any clinical role can break the glass: a category, a written reason of at least 20 characters, 60 minutes of access, the same view their role always has. Every read under the grant is audited with the reason, the administrator is alerted at the moment of access, and a review queue marks each grant appropriate or not.',
    why:
      'Emergency access should change who can see, never how much. A nurse breaking the glass gets the nursing view. Charting is never blocked at all — a nurse must always be able to chart on the patient in front of her.',
    cost:
      'Roles with no clinical scope cannot break the glass, and the attempt is recorded as a denied access. Some people find that strict. That is the point.'
  },
  {
    n: '04',
    tag: 'Queue design',
    title: 'Untriaged comes first.',
    hook: 'A queue in arrival order sends the sprained ankle ahead of the chest pain.',
    situation:
      'The emergency board needed an order. Arrival time is the obvious one, and the wrong one.',
    decision:
      'The server orders the board — never the device — as: not yet triaged first, then ESI level 1 before 5, then arrival time within a level. A nurse may override the algorithm with a written reason, and both levels are kept.',
    why:
      'An unknown acuity may be the sickest person in the room. Burying them under level 4s because they have no number yet is exactly the failure triage exists to prevent.',
    cost:
      'Reception sees the level but never the reasoning or the vitals. Triage is a clinical act, and the permission matrix says so, route by route.'
  }
]
