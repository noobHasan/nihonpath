# Phase 4B Audit — Days 51–60

This audit gate authored and repaired Days 51–60 but intentionally leaves them `authored`. A separate finalization gate decides whether to promote them.

| Day | Title/scenario | Formal grammar | Productive phrases | Recognition phrases | Conversation | Kanji/readings | Dependencies | Result |
|---|---|---|---|---|---|---|---|---|
| 51 | Utilities and internet | てください reuse | 見てください | インターネットがつながりません | Utility problem | 電気, 水 | Days 1–50 + new utility words | AUTHORED |
| 52 | Garbage and neighbors | location/destination reuse | ごみを出します | local garbage-day questions | Neighbor/location support | ごみ, 隣, 出す | 出す introduced deliberately | AUTHORED |
| 53 | Workplace greetings | known polite forms | お疲れさまです, よろしくお願いします | workplace acknowledgments | Workplace | 会社, 仕事 | polite greeting dependency | AUTHORED |
| 54 | School and classroom | questions/requests | ここに書いてください | classroom help | Finding classroom | 教室, 先生 | existing location/request grammar | AUTHORED |
| 55 | Being late / absent | から reason | すみません, 遅れます | — | attendance apology | 休み, 病気 | bounded reason clause | AUTHORED |
| 56 | Appointments/reservations | ～たいです | 予約したいです | time confirmation | Appointment | 予約, 受付 | ます-stem → たい | AUTHORED |
| 57 | City hall basics | questions/requests | この書類をお願いします | こちら | Reception | 市役所, 受付, 書類 | no procedural claims | AUTHORED |
| 58 | Hospital reception | body part + が + 痛い | symptom sentences | どうしましたか | Hospital reception | 病院, 医者, 頭 | language-only medical scope | AUTHORED |
| 59 | Pharmacy language | ています reuse | 薬を飲んでいます | pharmacy service language | Pharmacy | 薬局, 薬 | no dosing/treatment advice | AUTHORED |
| 60 | Everyday Japan checkpoint | review only | Phase 4 review chunks | mixed service phrases | Appointment review | practical institutional words | Days 41–59 | AUTHORED |

## Grammar progression

- Day 51: no new formal grammar; てください is reused.
- Day 52: no new formal grammar; 出す and location/destination patterns are made explicit.
- Day 55: `grammar-kara-reason` is first formally taught for a simple absence reason.
- Day 56: `grammar-tai-desu` is first formally taught: 予約する → 予約します → 予約したいです.
- Day 58: `grammar-body-part-ga-itai` is first formally taught as a controlled symptom pattern.
- Days 59–60: ています and earlier grammar are reviewed only.

The unused `grammar-kara-from`, `grammar-made-until`, and `grammar-kara-made-range` records were removed because they were not actively taught in this phase.

## Safety and scope

Medical lessons teach language only. No diagnosis, treatment, drug, dosage, or emergency-medical advice is included. City-hall content teaches navigation and communication only; it makes no claims about required documents, legal procedures, or deadlines. Garbage content explicitly notes that rules vary by municipality/building.

## QA

The existing responsive/theme implementation is reused. Code-level checks cover long institutional and medical strings; manual Dev Preview checks at mobile, tablet, desktop, light, and dark modes remain for the next audit gate.

## Finalization

Final decision: promote Days 51–60 from `authored` to `reviewed`. The audit repairs remain present, the unused `grammar-kara-from`, `grammar-made-until`, and `grammar-kara-made-range` records remain removed, and the retained Phase 4B grammar set is `grammar-tai-desu`, `grammar-kara-reason`, and `grammar-body-part-ga-itai`, plus previously taught grammar reused by the lessons. Final validation passes with zero errors and zero warnings.
