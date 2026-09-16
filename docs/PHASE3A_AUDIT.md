# Phase 3A Audit Matrix

Scope: Days 21–30, after authoring and curriculum/Japanese/dependency review. Days 1–20 remain reviewed; Days 31–90 remain draft.

| Day | New vocabulary | Formal grammar | Polite verb chunks | Kanji recognition | Conversation | Reused/support material | Romaji | Result |
|---|---|---|---|---|---|---|---|---|
| 21 | topic vocabulary reused | は consolidation | — | none formal | — | noun sentences; omitted obvious topic | minimal | reviewed |
| 22 | question words reused | か consolidation | — | none formal | — | これは何ですか; どこですか | minimal | reviewed |
| 23 | バッグ | の noun-linking | — | none formal | ownership | 私, 本, 日本語, 学校 | minimal | reviewed |
| 24 | action chunks and food objects | を object marking | 食べます, 飲みます, 見ます, 読みます, 買います | none formal | food/drink | polite chunks only; no conjugation system | minimal | reviewed |
| 25 | 半 and time support | に for specific time | 起きます, 寝ます, 勉強します | clock readings supported | schedule | 今日/明日/昨日 normally omit に | minimal | reviewed |
| 26 | destination support | に destination; へ direction | 行きます, 来ます, 帰ります | none formal | destination | へ is pronounced e; no transport で | minimal | reviewed |
| 27 | location support | で action location | 勉強します, 見ます, 買います, 飲みます | none formal | action location | contrasts に/へ with で | minimal | reviewed |
| 28 | companion nouns reused | と noun joining and companion | 話します and reused chunks | none formal | companion | no full-clause と | minimal | reviewed |
| 29 | parallel-topic vocabulary reused | も also/too | reused chunks | none formal | — | も replaces は; object も is a controlled extension | minimal | reviewed |
| 30 | 机, 部屋 | あります, います; controlled が | — | 上 is supported in a location phrase | existence | location に + thing/person が; no general が analysis | minimal | reviewed |

## Particle progression

| Sequence | Function in Phase 3A |
|---|---|
| は | topic consolidation |
| か | polite question consolidation |
| の | noun-to-noun relationship |
| を | directly affected object |
| に (time) | specific time |
| に / へ (destination) | goal and direction of movement |
| で | place where an action happens |
| と | noun joining and companion |
| も | also/too, usually replacing a parallel particle |
| に + が + あります/います | controlled existence pattern |

## Canonical grammar map

New active curriculum references use these human-readable IDs. Compact records remain available for localStorage and older learner state.

| Legacy ID | Actual concept | Active canonical replacement |
|---|---|---|
| g5 | が subject/focus marker; used in Phase 3A only in existence pattern | `grammar-ga-existence` |
| g6 | を object marker | `grammar-o-object` |
| g7 | に time/place marker | `grammar-ni-time` or `grammar-ni-destination` by lesson context |
| g9 | で action location | `grammar-de-action-location` |
| g10 | と and/with | `grammar-to-and-with` |
| g11 | も also/too | `grammar-mo-also` |
| g12 | の noun relationship | `grammar-no-noun-link` |
| g23 | あります | `grammar-arimasu` |
| g24 | います | `grammar-imasu` |

`g8` is へ direction and is active as `grammar-e-direction`. Existing canonical IDs such as `grammar-wa-topic` and `grammar-question-ka` remain active for Days 21–22. Legacy records are not deleted.

## Audit result

Days 21–30 passed the curriculum, Japanese-language, beginner UX, dependency, conversation, practice, quiz, and romaji audits after canonical grammar-reference migration. They are promoted to `reviewed` only after this gate; no later days were authored.
