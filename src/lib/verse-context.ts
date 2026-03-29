/**
 * Passage context and key terms for verses.
 *
 * These are NOT Scripture text — they are study-aid commentary to help
 * users understand the setting, audience, and vocabulary of each verse.
 * Only the most commonly memorized verses are covered; the UI falls
 * back gracefully when no context is available.
 */

export type VerseContext = {
  /** What is happening in the broader passage — audience, situation, purpose. */
  passageContext: string;
  /** Important theological or unfamiliar terms with brief definitions. */
  keyTerms?: Array<{ term: string; definition: string }>;
};

export const VERSE_CONTEXTS: Record<string, VerseContext> = {
  /* ---- Gospel & Salvation ---- */
  jn316: {
    passageContext:
      "Jesus is speaking at night with Nicodemus, a Pharisee and member of the Jewish ruling council. " +
      "Nicodemus came privately, curious but cautious. Jesus uses this moment to explain the heart of the gospel.",
    keyTerms: [
      { term: "only begotten", definition: "Unique, one-of-a-kind — emphasizing that Jesus is God's one and only Son" },
      { term: "perish", definition: "Spiritual death and eternal separation from God" },
      { term: "eternal life", definition: "Unending life in relationship with God, beginning now and lasting forever" },
    ],
  },
  rom323: {
    passageContext:
      "Paul is building his case in Romans that every person — Jew and Gentile alike — stands guilty before God. " +
      "This verse is the universal verdict: no one meets God's standard on their own.",
    keyTerms: [
      { term: "sinned", definition: "Missed God's mark — falling short of His perfect standard through thought, word, or action" },
      { term: "glory of God", definition: "The radiant perfection and holiness of God that humans were created to reflect" },
    ],
  },
  rom58: {
    passageContext:
      "Paul contrasts human love with God's love. People might die for a good person, but God demonstrated " +
      "His love by sending Christ to die for us while we were still hostile to Him.",
    keyTerms: [
      { term: "demonstrates", definition: "Proves by action, not just words — God's love is shown, not merely spoken" },
      { term: "sinners", definition: "Those living in rebellion against God — which, per Romans 3:23, includes everyone" },
    ],
  },
  rom623: {
    passageContext:
      "Paul has been explaining that sin leads to death, but grace leads to life. This verse draws the sharpest " +
      "contrast in Scripture: what sin pays versus what God gives.",
    keyTerms: [
      { term: "wages", definition: "What is earned or deserved — sin pays out death as its due compensation" },
      { term: "gift", definition: "Unearned, freely given — eternal life cannot be worked for; it is received" },
    ],
  },
  john146: {
    passageContext:
      "Jesus is preparing His disciples for His departure. Thomas asks how they can know the way. " +
      "Jesus answers with one of the most definitive claims in all of Scripture.",
    keyTerms: [
      { term: "the way", definition: "The only path to the Father — not a way, but the way" },
      { term: "the truth", definition: "Absolute, embodied truth — not a concept but a person" },
      { term: "the life", definition: "The source of all spiritual and eternal life" },
    ],
  },
  eph289: {
    passageContext:
      "Paul is writing to the church in Ephesus, reminding them that salvation is entirely God's work. " +
      "This follows his description of their former spiritual death and God's rich mercy.",
    keyTerms: [
      { term: "grace", definition: "Unmerited favor — receiving what you did not earn and could never deserve" },
      { term: "faith", definition: "Trust and reliance on God and His promises, not on your own effort" },
      { term: "boast", definition: "Take credit for — Paul says salvation eliminates all human boasting" },
    ],
  },
  rom81: {
    passageContext:
      "After the anguish of Romans 7, where Paul describes the war between flesh and spirit, chapter 8 " +
      "opens with this thunderclap of freedom. The verdict is in: no condemnation.",
    keyTerms: [
      { term: "condemnation", definition: "A final guilty verdict — the sentence of punishment that Christ absorbed" },
      { term: "in Christ Jesus", definition: "United with Christ by faith — His righteousness credited to you" },
    ],
  },
  rom10910: {
    passageContext:
      "Paul explains that salvation is accessible to everyone. It is not hidden behind ritual or achievement — " +
      "it is as near as your own mouth and heart.",
    keyTerms: [
      { term: "declare/confess", definition: "To publicly affirm and align yourself with the truth about Jesus" },
      { term: "believe in your heart", definition: "Genuine trust — not intellectual agreement alone, but deep reliance" },
    ],
  },

  /* ---- Peace & Anxiety ---- */
  matt1128: {
    passageContext:
      "Jesus has just finished rebuking cities that rejected Him, then thanks the Father for revealing truth " +
      "to the humble. He turns to the crowd and issues this personal, tender invitation.",
    keyTerms: [
      { term: "weary", definition: "Exhausted from labor, striving, or the weight of life and religion" },
      { term: "burdened", definition: "Loaded down — the Jews carried heavy religious demands; Jesus offers relief" },
      { term: "rest", definition: "Not inactivity, but soul-rest — freedom from striving to earn God's favor" },
    ],
  },
  php46: {
    passageContext:
      "Paul is writing from prison to the church in Philippi — a community he deeply loved. " +
      "Despite his chains, he urges them toward joy and gives this practical prescription for worry.",
    keyTerms: [
      { term: "anxious", definition: "Divided mind — pulled apart by worry instead of held together by trust" },
      { term: "petition", definition: "A specific, honest request brought to God" },
      { term: "thanksgiving", definition: "Gratitude that reframes the request — acknowledging what God has already done" },
    ],
  },
  ps4610: {
    passageContext:
      "Psalm 46 celebrates God as a refuge amid cosmic upheaval — mountains falling into the sea, nations raging. " +
      "In the middle of chaos, God speaks: 'Be still.'",
    keyTerms: [
      { term: "be still", definition: "Cease striving, let go, stop fighting — allow God to be God" },
      { term: "exalted", definition: "Lifted high, honored above all — God's supremacy over every threat" },
    ],
  },
  is4110: {
    passageContext:
      "God speaks through Isaiah to Israel in exile — a terrified, displaced people. " +
      "This is not a suggestion; it is a command backed by three promises: presence, strength, and help.",
    keyTerms: [
      { term: "do not fear", definition: "A command, not advice — God gives the reason to obey it: 'I am with you'" },
      { term: "uphold", definition: "To sustain, support, keep from falling — God's righteous hand holds you up" },
    ],
  },
  php47: {
    passageContext:
      "This verse follows directly after Paul's instruction to pray instead of worry (Philippians 4:6). " +
      "The peace described here is the result of bringing everything to God.",
    keyTerms: [
      { term: "transcends all understanding", definition: "A peace that doesn't make logical sense given the circumstances — supernatural calm" },
      { term: "guard", definition: "Military term — God's peace stands sentry over your thoughts and emotions" },
    ],
  },
  jn1427: {
    passageContext:
      "Jesus is speaking to His disciples on the night before His crucifixion. He knows they will be shattered. " +
      "He offers His peace — different from anything the world can manufacture.",
    keyTerms: [
      { term: "my peace", definition: "Not worldly peace (absence of conflict) but Christ's peace (presence of God amid conflict)" },
      { term: "troubled", definition: "Agitated, stirred up — the turmoil Jesus acknowledges and addresses" },
    ],
  },
  is263: {
    passageContext:
      "Isaiah describes the blessing for those who keep their mind fixed on God rather than on circumstances. " +
      "The double use of 'peace' (shalom shalom) emphasizes completeness.",
    keyTerms: [
      { term: "perfect peace", definition: "Hebrew: shalom shalom — complete wholeness, doubled for emphasis" },
      { term: "steadfast mind", definition: "A mind deliberately anchored on God, not drifting with anxiety" },
    ],
  },

  /* ---- Love ---- */
  jer313: {
    passageContext:
      "God speaks through Jeremiah to Israel using the tender language of a husband pursuing an unfaithful wife. " +
      "Despite their wandering, God's love does not let go.",
    keyTerms: [
      { term: "everlasting love", definition: "Hebrew olam — love without beginning or end; it has always been and will always be" },
      { term: "loving-kindness", definition: "Hebrew chesed — faithful, covenant love that will not quit" },
    ],
  },
  rom83839: {
    passageContext:
      "The climax of Romans 8 — Paul's triumphant conclusion. After listing every possible threat, " +
      "he declares that absolutely nothing can sever believers from God's love in Christ.",
    keyTerms: [
      { term: "separate", definition: "To cut off, disconnect — Paul says no force in existence can do this" },
      { term: "principalities/powers", definition: "Spiritual authorities and cosmic forces — even these cannot break God's hold" },
    ],
  },

  /* ---- Identity ---- */
  "2cor517": {
    passageContext:
      "Paul tells the Corinthians that anyone united with Christ has been fundamentally remade. " +
      "The old has passed; the new has come. This is not self-improvement — it is new creation.",
    keyTerms: [
      { term: "new creation", definition: "Not a renovation but a re-creation — God makes something entirely new" },
      { term: "the old has gone", definition: "The former identity, ruled by sin and death, is finished" },
    ],
  },
  gal220: {
    passageContext:
      "Paul describes his own experience of union with Christ. His old self was crucified; " +
      "the life he now lives is animated by Christ living in him.",
    keyTerms: [
      { term: "crucified with Christ", definition: "Spiritually united with Jesus in His death — the old self put to death" },
      { term: "lives in me", definition: "Christ's presence and power animating the believer's daily life" },
    ],
  },
  eph210: {
    passageContext:
      "Immediately after explaining that salvation is by grace through faith (Ephesians 2:8-9), " +
      "Paul reveals God's purpose: we are His workmanship, created for specific good works.",
    keyTerms: [
      { term: "workmanship", definition: "Greek poiēma — a masterpiece, a work of art crafted by God Himself" },
      { term: "prepared in advance", definition: "God planned your purpose before you were born" },
    ],
  },
  ps13914: {
    passageContext:
      "David reflects on God's intimate knowledge of him — formed in the womb, known before birth. " +
      "This verse is a declaration of wonder at how God made each person.",
    keyTerms: [
      { term: "fearfully", definition: "With reverent awe — you were made with sacred intention" },
      { term: "wonderfully", definition: "Marvelously, distinctly — your design is intentional and good" },
    ],
  },

  /* ---- Strength & Courage ---- */
  is4031: {
    passageContext:
      "Isaiah 40 opens with 'Comfort, comfort my people.' God reminds exiled Israel that He does not grow " +
      "tired. Those who wait on Him receive supernatural endurance.",
    keyTerms: [
      { term: "hope in the LORD", definition: "Hebrew qavah — to wait with expectation, like a rope pulled taut" },
      { term: "mount up with wings", definition: "Rise above exhaustion — an image of effortless soaring by God's power" },
    ],
  },
  php413: {
    passageContext:
      "Paul is in prison, yet content. He is not claiming limitless personal power — he is saying " +
      "that Christ's strength enables him to face any situation.",
    keyTerms: [
      { term: "all things", definition: "Any circumstance — plenty or want, freedom or chains" },
      { term: "gives me strength", definition: "Greek endynamoō — to pour power into; Christ is the source" },
    ],
  },
  josh19: {
    passageContext:
      "Moses has just died. Joshua must lead Israel into the Promised Land. God speaks directly to him — " +
      "three times commanding courage, each time grounding it in His presence.",
    keyTerms: [
      { term: "strong and courageous", definition: "Not fearless, but acting in faith because God is with you" },
      { term: "wherever you go", definition: "No location, situation, or season falls outside God's companionship" },
    ],
  },

  /* ---- Psalms ---- */
  ps23: {
    passageContext:
      "David writes from his experience as a shepherd. He pictures God leading, providing, and protecting — " +
      "using the most personal, intimate language in the Psalms.",
    keyTerms: [
      { term: "shepherd", definition: "One who leads, feeds, and protects — God is not a distant ruler but a close caretaker" },
      { term: "shall not want", definition: "Not 'I will never desire' but 'I will lack nothing essential'" },
    ],
  },
  ps234: {
    passageContext:
      "The tenderest verse in Psalm 23 — David moves from green pastures into darkness. " +
      "Even in the valley, the Shepherd's presence eliminates fear.",
    keyTerms: [
      { term: "valley of the shadow of death", definition: "The darkest, most threatening experience of life — but still only a shadow" },
      { term: "rod and staff", definition: "Tools of the shepherd — one for protection, one for guidance; both bring comfort" },
    ],
  },
  ps271: {
    passageContext:
      "David faces enemies and threats but opens with three bold declarations about God. " +
      "Each one eliminates a reason for fear.",
    keyTerms: [
      { term: "light", definition: "God dispels darkness, confusion, and ignorance" },
      { term: "salvation", definition: "Rescue, deliverance — God is not just helpful; He is safety itself" },
      { term: "stronghold", definition: "A fortified shelter — God is the place where no threat can reach you" },
    ],
  },

  /* ---- Prayer & Trust ---- */
  pro35: {
    passageContext:
      "Solomon instructs his son on the foundation of wisdom. The command is clear: trust fully, " +
      "lean not on your own reasoning, and let God direct your path.",
    keyTerms: [
      { term: "trust", definition: "Hebrew batach — to lean your full weight on; total reliance" },
      { term: "lean not on your own understanding", definition: "Stop relying on your ability to figure everything out" },
      { term: "acknowledge", definition: "Hebrew yada — to know intimately, to include God in every decision" },
    ],
  },
  jas15: {
    passageContext:
      "James writes to scattered Jewish believers facing trials. He tells them wisdom is available — " +
      "just ask. God gives it generously and without shaming you for needing it.",
    keyTerms: [
      { term: "generously", definition: "Without measure or grudging — God's wisdom is abundant" },
      { term: "without finding fault", definition: "God does not shame you for asking; He welcomes the request" },
    ],
  },

  /* ---- God's Word ---- */
  heb412: {
    passageContext:
      "The writer of Hebrews describes God's Word as active, not passive. It does not merely inform — " +
      "it penetrates, exposes, and judges the deepest motives of the heart.",
    keyTerms: [
      { term: "living and active", definition: "Not a dead document but a dynamic, working word that changes you" },
      { term: "double-edged sword", definition: "Cuts in every direction — nothing hides from its reach" },
      { term: "soul and spirit", definition: "The deepest layers of a person — God's Word reaches where nothing else can" },
    ],
  },
  ps119105: {
    passageContext:
      "Psalm 119 is the longest chapter in the Bible — 176 verses celebrating God's Word. " +
      "This verse captures the essential function: Scripture illuminates the next step.",
    keyTerms: [
      { term: "lamp", definition: "Illumination for the immediate — enough light for the step you are on" },
      { term: "light for my path", definition: "Direction for the road ahead — God's Word reveals where to go" },
    ],
  },

  /* ---- Faithfulness ---- */
  lam322: {
    passageContext:
      "Jeremiah writes from the ruins of Jerusalem. Everything is destroyed. " +
      "Yet in the darkest moment of Israel's history, he declares God's faithfulness unbroken.",
    keyTerms: [
      { term: "steadfast love", definition: "Hebrew chesed — covenant love that never ceases, even when everything else does" },
      { term: "mercies", definition: "Compassionate acts of God — renewed every morning, never running out" },
    ],
  },

  /* ---- Grace ---- */
  rom324: {
    passageContext:
      "After declaring all humanity guilty (Romans 3:23), Paul immediately pivots to the remedy. " +
      "Justification is a gift — freely given through Christ's redemptive work.",
    keyTerms: [
      { term: "justified", definition: "Declared righteous — a legal term meaning the verdict is 'not guilty'" },
      { term: "freely", definition: "Without cost to you — the price was paid entirely by another" },
      { term: "redemption", definition: "A purchase that sets a captive free — Christ paid the ransom" },
    ],
  },

  /* ---- Mission ---- */
  matt281920: {
    passageContext:
      "The risen Jesus gives His final command before ascending. Known as the Great Commission, " +
      "these words shape the mission of every believer and every church.",
    keyTerms: [
      { term: "make disciples", definition: "Not just converts but learners — forming people who follow Jesus as a way of life" },
      { term: "all nations", definition: "Greek ethne — every people group; the gospel is for everyone" },
      { term: "I am with you always", definition: "The promise that undergirds the command — you do not go alone" },
    ],
  },

  /* ---- Hope ---- */
  rom828: {
    passageContext:
      "Paul writes to believers enduring suffering. He assures them that God is not absent in pain — " +
      "He is working purposefully through all of it for their ultimate good.",
    keyTerms: [
      { term: "all things", definition: "Not just the good things — God works through suffering, loss, and confusion" },
      { term: "work together for good", definition: "God weaves every thread into His redemptive purpose" },
      { term: "called according to his purpose", definition: "Those who belong to God by faith — the promise is for His people" },
    ],
  },
  jer2911: {
    passageContext:
      "God speaks through Jeremiah to exiles in Babylon. They will be there 70 years. " +
      "This verse is not about short-term rescue but long-term hope in God's sovereign plan.",
    keyTerms: [
      { term: "plans", definition: "Hebrew machashavah — thoughts, intentions, designs — God's mind is set toward you" },
      { term: "prosper", definition: "Hebrew shalom — wholeness, well-being; not just financial but total flourishing" },
      { term: "hope and a future", definition: "An expected end — God's plan has a destination, and it is good" },
    ],
  },
};
