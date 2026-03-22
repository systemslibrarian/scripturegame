insert into public.verses (
  id,
  reference,
  translation,
  parts,
  answers,
  decoys,
  theme_id,
  theme_label,
  devotional,
  application_prompt,
  difficulty,
  is_daily_featured
)
values
  (
    'rom323',
    'Romans 3:23',
    'NIV',
    array['For all have ', ' and fall ', ' of the glory of God.'],
    array['SINNED', 'SHORT'],
    array['FAILED', 'AWAY', 'FAR'],
    'doubt',
    'Doubt',
    'Grace begins with honesty about our need for God.',
    'Where do you need to stop pretending and ask for mercy today?',
    'beginner',
    false
  ),
  (
    'jn316',
    'John 3:16',
    'NIV',
    array['For God so ', ' the world that he ', ' his one and only ', ', that whoever ', ' in him shall not perish but have eternal life.'],
    array['LOVED', 'GAVE', 'SON', 'BELIEVES'],
    array['SENT', 'CHILD', 'TRUSTS', 'SAVED'],
    'hope',
    'Hope',
    'God''s love gives solid ground when your heart feels unsteady.',
    'How can you live from God''s love rather than fear today?',
    'intermediate',
    true
  ),
  (
    'ps4610',
    'Psalm 46:10',
    'NIV',
    array['Be ', ' and know that I am God. I will be ', ' among the nations, I will be exalted in the earth.'],
    array['STILL', 'EXALTED'],
    array['QUIET', 'CALM', 'PRAISED'],
    'fear',
    'Fear',
    'Stillness makes room to remember who God is in the middle of fear.',
    'Where do you need to become still enough to trust God today?',
    'beginner',
    true
  )
on conflict (id) do nothing;
