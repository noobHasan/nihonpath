function parseRows(raw,fields){return raw.trim().split('\n').map((line,i)=>{let a=line.split('|'),o={id:fields[0][0]+(i+1)};fields.forEach((f,j)=>o[f]=a[j]);return o})}
var vocab=parseRows(`
Greetings|おはようございます|おはようございます|ohayou gozaimasu|good morning|expression
Greetings|こんにちは|こんにちは|konnichiwa|hello / good afternoon|expression
Greetings|こんばんは|こんばんは|konbanwa|good evening|expression
Greetings|ありがとうございます|ありがとうございます|arigatou gozaimasu|thank you very much|expression
Greetings|すみません|すみません|sumimasen|excuse me / sorry|expression
Greetings|お願いします|おねがいします|onegaishimasu|please / I ask this of you|expression
Greetings|はじめまして|はじめまして|hajimemashite|nice to meet you|expression
People|私|わたし|watashi|I / me|pronoun
People|人|ひと|hito|person|noun
People|友達|ともだち|tomodachi|friend|noun
People|先生|せんせい|sensei|teacher / respected instructor|noun
People|学生|がくせい|gakusei|student|noun
People|会社員|かいしゃいん|kaishain|company employee|noun
Family|家族|かぞく|kazoku|family|noun
Family|父|ちち|chichi|my father|noun
Family|母|はは|haha|my mother|noun
Family|お父さん|おとうさん|otousan|father / someone else's father|noun
Family|お母さん|おかあさん|okaasan|mother / someone else's mother|noun
Family|兄|あに|ani|my older brother|noun
Family|姉|あね|ane|my older sister|noun
Family|弟|おとうと|otouto|younger brother|noun
Family|妹|いもうと|imouto|younger sister|noun
Numbers|一|いち|ichi|one|number
Numbers|二|に|ni|two|number
Numbers|三|さん|san|three|number
Numbers|四|よん / し|yon / shi|four|number
Numbers|五|ご|go|five|number
Numbers|六|ろく|roku|six|number
Numbers|七|なな / しち|nana / shichi|seven|number
Numbers|八|はち|hachi|eight|number
Numbers|九|きゅう / く|kyuu / ku|nine|number
Numbers|十|じゅう|juu|ten|number
Numbers|百|ひゃく|hyaku|hundred|number
Numbers|千|せん|sen|thousand|number
Numbers|万|まん|man|ten thousand|number
Time|今|いま|ima|now|noun
Time|今日|きょう|kyou|today|noun
Time|明日|あした|ashita|tomorrow|noun
Time|昨日|きのう|kinou|yesterday|noun
Time|朝|あさ|asa|morning|noun
Time|昼|ひる|hiru|noon / daytime|noun
Time|夜|よる|yoru|night|noun
Time|時|じ|ji|o'clock / hour|counter
Time|分|ふん / ぷん|fun / pun|minute|counter
Days|月曜日|げつようび|getsuyoubi|Monday|noun
Days|火曜日|かようび|kayoubi|Tuesday|noun
Days|水曜日|すいようび|suiyoubi|Wednesday|noun
Days|木曜日|もくようび|mokuyoubi|Thursday|noun
Days|金曜日|きんようび|kinyoubi|Friday|noun
Days|土曜日|どようび|doyoubi|Saturday|noun
Days|日曜日|にちようび|nichiyoubi|Sunday|noun
Food|ご飯|ごはん|gohan|cooked rice / meal|noun
Food|パン|パン|pan|bread|noun
Food|肉|にく|niku|meat|noun
Food|魚|さかな|sakana|fish|noun
Food|野菜|やさい|yasai|vegetables|noun
Food|果物|くだもの|kudamono|fruit|noun
Food|卵|たまご|tamago|egg|noun
Drinks|水|みず|mizu|water|noun
Drinks|お茶|おちゃ|ocha|tea|noun
Drinks|コーヒー|コーヒー|koohii|coffee|noun
Drinks|牛乳|ぎゅうにゅう|gyuunyuu|milk|noun
Home|家|いえ|ie|house / home|noun
Home|部屋|へや|heya|room|noun
Home|台所|だいどころ|daidokoro|kitchen|noun
Home|玄関|げんかん|genkan|entrance area|noun
Home|お風呂|おふろ|ofuro|bath|noun
Home|トイレ|トイレ|toire|toilet|noun
Furniture|机|つくえ|tsukue|desk|noun
Furniture|椅子|いす|isu|chair|noun
Furniture|ベッド|ベッド|beddo|bed|noun
Furniture|冷蔵庫|れいぞうこ|reizouko|refrigerator|noun
Furniture|窓|まど|mado|window|noun
Clothing|服|ふく|fuku|clothes|noun
Clothing|シャツ|シャツ|shatsu|shirt|noun
Clothing|靴|くつ|kutsu|shoes|noun
Clothing|帽子|ぼうし|boushi|hat|noun
Weather|天気|てんき|tenki|weather|noun
Weather|雨|あめ|ame|rain|noun
Weather|雪|ゆき|yuki|snow|noun
Weather|暑い|あつい|atsui|hot weather|i-adjective
Weather|寒い|さむい|samui|cold weather|i-adjective
Transportation|電車|でんしゃ|densha|train|noun
Transportation|地下鉄|ちかてつ|chikatetsu|subway|noun
Transportation|バス|バス|basu|bus|noun
Transportation|タクシー|タクシー|takushii|taxi|noun
Transportation|自転車|じてんしゃ|jitensha|bicycle|noun
Transportation|駅|えき|eki|station|noun
Transportation|切符|きっぷ|kippu|ticket|noun
Transportation|乗り換え|のりかえ|norikae|transfer|noun
School|学校|がっこう|gakkou|school|noun
School|教室|きょうしつ|kyoushitsu|classroom|noun
School|本|ほん|hon|book|noun
School|ノート|ノート|nooto|notebook|noun
School|鉛筆|えんぴつ|enpitsu|pencil|noun
School|勉強|べんきょう|benkyou|study|noun
Work|会社|かいしゃ|kaisha|company|noun
Work|仕事|しごと|shigoto|work / job|noun
Work|会議|かいぎ|kaigi|meeting|noun
Work|電話|でんわ|denwa|telephone / phone call|noun
Shopping|店|みせ|mise|shop|noun
Shopping|スーパー|スーパー|suupaa|supermarket|noun
Shopping|コンビニ|コンビニ|konbini|convenience store|noun
Shopping|お金|おかね|okane|money|noun
Shopping|円|えん|en|yen|noun
Shopping|高い|たかい|takai|expensive / high|i-adjective
Shopping|安い|やすい|yasui|cheap / inexpensive|i-adjective
Health|病院|びょういん|byouin|hospital|noun
Health|薬局|やっきょく|yakkyoku|pharmacy|noun
Health|薬|くすり|kusuri|medicine|noun
Health|熱|ねつ|netsu|fever|noun
Health|痛い|いたい|itai|painful / hurts|i-adjective
Body|頭|あたま|atama|head|noun
Body|目|め|me|eye|noun
Body|耳|みみ|mimi|ear|noun
Body|口|くち|kuchi|mouth|noun
Body|手|て|te|hand|noun
Body|足|あし|ashi|foot / leg|noun
Places|銀行|ぎんこう|ginkou|bank|noun
Places|郵便局|ゆうびんきょく|yuubinkyoku|post office|noun
Places|市役所|しやくしょ|shiyakusho|city hall|noun
Places|公園|こうえん|kouen|park|noun
Directions|右|みぎ|migi|right|noun
Directions|左|ひだり|hidari|left|noun
Directions|前|まえ|mae|front / before|noun
Directions|後ろ|うしろ|ushiro|behind|noun
Directions|中|なか|naka|inside|noun
Directions|外|そと|soto|outside|noun
Travel|空港|くうこう|kuukou|airport|noun
Travel|ホテル|ホテル|hoteru|hotel|noun
Travel|荷物|にもつ|nimotsu|luggage|noun
Travel|地図|ちず|chizu|map|noun
Feelings|好き|すき|suki|liked / favorite|na-adjective
Feelings|嫌い|きらい|kirai|disliked|na-adjective
Feelings|楽しい|たのしい|tanoshii|fun / enjoyable|i-adjective
Feelings|大丈夫|だいじょうぶ|daijoubu|okay / all right|na-adjective
Verbs|行く|いく|iku|to go|verb
Verbs|来る|くる|kuru|to come|verb
Verbs|帰る|かえる|kaeru|to return / go home|verb
Verbs|食べる|たべる|taberu|to eat|verb
Verbs|飲む|のむ|nomu|to drink|verb
Verbs|見る|みる|miru|to see / watch|verb
Verbs|聞く|きく|kiku|to listen / ask|verb
Verbs|話す|はなす|hanasu|to speak|verb
Verbs|読む|よむ|yomu|to read|verb
Verbs|書く|かく|kaku|to write|verb
Verbs|買う|かう|kau|to buy|verb
Verbs|待つ|まつ|matsu|to wait|verb
Verbs|使う|つかう|tsukau|to use|verb
Verbs|分かる|わかる|wakaru|to understand|verb
Verbs|住む|すむ|sumu|to live / reside|verb
Verbs|働く|はたらく|hataraku|to work|verb
Verbs|勉強する|べんきょうする|benkyou suru|to study|verb
Adjectives|大きい|おおきい|ookii|big|i-adjective
Adjectives|小さい|ちいさい|chiisai|small|i-adjective
Adjectives|新しい|あたらしい|atarashii|new|i-adjective
Adjectives|古い|ふるい|furui|old|i-adjective
Adjectives|いい|いい|ii|good|i-adjective
Adjectives|悪い|わるい|warui|bad|i-adjective
Adjectives|忙しい|いそがしい|isogashii|busy|i-adjective
Adjectives|おいしい|おいしい|oishii|delicious|i-adjective
Adjectives|静か|しずか|shizuka|quiet|na-adjective
Adjectives|きれい|きれい|kirei|clean / pretty|na-adjective
Adjectives|便利|べんり|benri|convenient|na-adjective
Questions|何|なに / なん|nani / nan|what|pronoun
Questions|誰|だれ|dare|who|pronoun
Questions|どこ|どこ|doko|where|pronoun
Questions|いつ|いつ|itsu|when|pronoun
Questions|どう|どう|dou|how|adverb
Questions|どれ|どれ|dore|which one|pronoun
Questions|いくら|いくら|ikura|how much|adverb
Daily|起きる|おきる|okiru|to wake up|verb
Daily|寝る|ねる|neru|to sleep / go to bed|verb
Daily|休む|やすむ|yasumu|to rest / take a day off|verb
Daily|洗う|あらう|arau|to wash|verb
Daily|料理する|りょうりする|ryouri suru|to cook|verb
Daily|掃除する|そうじする|souji suru|to clean|verb
Daily|出る|でる|deru|to leave / exit|verb
Daily|入る|はいる|hairu|to enter|verb
`,['category','japanese','reading','romaji','meaning','type']);
vocab.forEach((v,i)=>{v.id='v'+(i+1);v.example=`「${v.japanese}」を覚えましょう。`;v.exampleEn=`Let’s learn and remember “${v.japanese}” (${v.meaning}).`;});
