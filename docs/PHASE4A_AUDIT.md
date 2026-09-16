# Phase 4A Audit — Days 41–50

## Result

Days 41–50 were realigned around their canonical everyday-life titles. All ten now pass the curriculum, Japanese, practical-use, and dependency audit and are marked `reviewed`. Days 51–90 remain draft.

| Day | Scenario | Formal grammar | Productive/fixed phrases | Recognition/sign language | Conversation | Result |
|---|---|---|---|---|---|---|
| 41 | Convenience-store checkout | て-form, てください | おにぎりと水をください | 袋は要りますか, レシートです | Checkout | PASS |
| 42 | Restaurant ordering | てください support | メニューをお願いします, 水をお願いします | ご注文は？ | Ordering simply | PASS |
| 43 | Buying coffee | てください support | ホット/アイスコーヒーをお願いします | size, sugar, milk | Café counter | PASS |
| 44 | Clothes shopping | てもいいですか, てください | 試着してもいいですか | size/color vocabulary | Clothing shop | PASS |
| 45 | Prices and money | question marker reuse | price/payment chunks | 円 and larger prices | — | PASS |
| 46 | Stations/platforms | prohibition in station-rule context | station questions | 番線, 改札, 入口, 出口 | Platform | PASS |
| 47 | Transfers/directions | location and destination reuse | 右です, 左です, まっすぐです | 階段, エレベーター | Transfer | PASS |
| 48 | Buses/taxis | transport で | ここまでお願いします | まで as fixed chunk | — | PASS |
| 49 | Home/rooms | あります, います, の reuse | room-location sentences | 玄関, 台所, お風呂 | Room problem setup | PASS |
| 50 | Apartment problems | てください support | 見てください, 来てください | 水が出ません, お湯が出ません | Reporting a problem | PASS |

## Grammar progression

| Grammar | First formal lesson | Reason |
|---|---:|---|
| て-form | 41 | Needed for practical requests; taught as a bounded system using familiar verbs. |
| ～てください | 41 | Naturally supports requesting an item/help at a convenience store. |
| ～ています | 43 | Remains available for current-action support, but does not dominate coffee ordering. |
| ～てもいいですか | 44 | Natural for looking at, photographing, or trying on clothing. |
| ～てはいけません | 46 | Station-entry rules provide a realistic prohibition context. |
| transport で | 48 | Bus/taxi/train travel makes means-of-transport usage direct and useful. |

## Japanese and dependency notes

- て-form coverage explicitly distinguishes 食べる/見る from 帰る and includes the 行く exception.
- `水が出ません`, `お湯が出ません`, and `エアコンが動きません` are practical fixed sentences; potential-form mastery is not claimed.
- `ここまでお願いします` is a fixed taxi chunk; `まで` is not formally expanded here.
- `袋は要りますか`, `ご注文は？`, and `レシートです` are listening-recognition/service phrases.
- Prices include 百, 千, 万 and the readings さんびゃく, ろっぴゃく, はっぴゃく, さんぜん, はっせん.
- Practical sign vocabulary includes 駅, 入口, 出口, 改札, 番線, 右, 左, 円, 上, 下, and 中 where relevant.

## QA and validation

Code-level responsive/theme inspection was performed; manual Dev Preview inspection at mobile, tablet, and desktop sizes remains recommended. JavaScript syntax checks and the full content validator pass with 90 lessons, no duplicate IDs, no missing references, and status counts of reviewed 50 / authored 0 / draft 40.
