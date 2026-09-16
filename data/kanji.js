function parseRows(raw,fields){return raw.trim().split('\n').map((line,i)=>{let a=line.split('|'),o={id:fields[0][0]+(i+1)};fields.forEach((f,j)=>o[f]=a[j]);return o})}
var kanji=parseRows(`
一|one|イチ|ひと(つ)|1|一つ|ひとつ|One horizontal line = one.
二|two|ニ|ふた(つ)|2|二つ|ふたつ|Two lines = two.
三|three|サン|みっ(つ)|3|三つ|みっつ|Three lines = three.
四|four|シ|よん・よ(つ)|5|四月|しがつ|A box holding four corners.
五|five|ゴ|いつ(つ)|4|五つ|いつつ|Learn the bent middle hook as five.
六|six|ロク|むっ(つ)|4|六月|ろくがつ|A lid over lower strokes.
七|seven|シチ|なな(つ)|2|七時|しちじ|A cut across a line.
八|eight|ハチ|やっ(つ)|2|八つ|やっつ|The strokes open outward.
九|nine|キュウ・ク|ここの(つ)|2|九時|くじ|A curved hook for nine.
十|ten|ジュウ|とお|2|十円|じゅうえん|A cross = ten.
百|hundred|ヒャク|もも|6|百円|ひゃくえん|Memorize as the common hundred unit.
千|thousand|セン|ち|3|千円|せんえん|A slanted stroke over ten.
万|ten thousand|マン|よろず|3|一万円|いちまんえん|Essential large-number unit in prices.
円|yen / circle|エン|まる(い)|4|五百円|ごひゃくえん|Currency and circular idea.
日|day / sun|ニチ・ジツ|ひ・か|4|日本|にほん|A sun in a box.
月|month / moon|ゲツ・ガツ|つき|4|月曜日|げつようび|Crescent moon shape.
火|fire|カ|ひ|4|火曜日|かようび|Flames spreading outward.
水|water|スイ|みず|4|水曜日|すいようび|Water splashes left and right.
木|tree / wood|モク・ボク|き|4|木曜日|もくようび|Trunk, branches, roots.
金|gold / money|キン|かね|8|金曜日|きんようび|Metal or money under a roof.
土|earth / soil|ド・ト|つち|3|土曜日|どようび|Ground line with growth above it.
曜|weekday|ヨウ|—|18|曜日|ようび|Common ending in weekday names.
年|year|ネン|とし|6|今年|ことし|Think of a yearly harvest.
時|time / hour|ジ|とき|10|三時|さんじ|Sun + temple marks time.
分|minute / part|ブン・フン・プン|わ(ける)|4|十分|じゅっぷん|A knife divides into parts.
半|half|ハン|なか(ば)|5|三時半|さんじはん|A thing split in half.
今|now|コン|いま|4|今|いま|The present moment under a cover.
午|noon marker|ゴ|—|4|午前|ごぜん|Used in a.m./p.m. compounds.
前|front / before|ゼン|まえ|9|午前|ごぜん|Something in front.
後|after / behind|ゴ・コウ|あと・うし(ろ)|9|午後|ごご|Steps following behind.
人|person|ジン・ニン|ひと|2|日本人|にほんじん|Looks like a walking person.
子|child|シ|こ|3|子ども|こども|A child with arms out.
女|woman / female|ジョ|おんな|3|女の人|おんなのひと|Common beginner people kanji.
男|man / male|ダン・ナン|おとこ|7|男の人|おとこのひと|Field + strength.
父|father|フ|ちち|4|父|ちち|Learn as the family word for father.
母|mother|ボ|はは|5|母|はは|Two dots inside the mother shape.
友|friend|ユウ|とも|4|友達|ともだち|Hands helping each other.
名|name|メイ・ミョウ|な|6|名前|なまえ|Say a name with the mouth component.
私|I / private|シ|わたし|7|私|わたし|Memorize as the common “I”.
上|up / above|ジョウ|うえ・あ(がる)|3|上|うえ|A mark above a line.
下|down / below|カ・ゲ|した・さ(がる)|3|下|した|A mark below a line.
中|middle / inside|チュウ|なか|4|中|なか|A line through the center.
外|outside|ガイ|そと|5|外|そと|Remember as the opposite of 中.
左|left|サ|ひだり|5|左|ひだり|Learn together with 右.
右|right|ウ・ユウ|みぎ|5|右|みぎ|Learn together with 左.
東|east|トウ|ひがし|8|東京|とうきょう|Sun caught in a tree = east.
西|west|セイ・サイ|にし|6|西|にし|A sun setting into the west.
南|south|ナン|みなみ|9|南口|みなみぐち|Common station direction word.
北|north|ホク|きた|5|北口|きたぐち|Two figures back-to-back in the cold north.
口|mouth / entrance|コウ・ク|くち|3|入口|いりぐち|A square mouth.
入|enter|ニュウ|はい(る)・い(れる)|2|入口|いりぐち|Strokes move inward.
出|exit / leave|シュツ|で(る)・だ(す)|5|出口|でぐち|Something coming out.
山|mountain|サン|やま|3|富士山|ふじさん|Three mountain peaks.
川|river|セン|かわ|3|川|かわ|Three flowing lines.
田|rice field|デン|た|5|田中|たなか|A field divided into plots.
天|heaven / sky|テン|あめ・あま|4|天気|てんき|A person under the large sky.
気|spirit / air|キ|—|6|天気|てんき|Moving air/energy.
雨|rain|ウ|あめ|8|雨|あめ|Drops under a cloud.
電|electricity|デン|—|13|電車|でんしゃ|Rain + electric/lightning idea.
車|vehicle|シャ|くるま|7|電車|でんしゃ|Looks like a cart from above.
駅|station|エキ|—|14|駅|えき|Memorize as the station character.
道|road / way|ドウ|みち|12|道|みち|Walking radical = path.
国|country|コク|くに|8|外国|がいこく|Something enclosed by borders.
語|language / word|ゴ|かた(る)|14|日本語|にほんご|Speech radical signals language.
本|book / origin|ホン|もと|5|本|ほん|Tree with a root mark = origin/book.
学|study / learning|ガク|まな(ぶ)|8|学生|がくせい|Child under a school roof.
校|school|コウ|—|10|学校|がっこう|Common school compound.
先|ahead / previous|セン|さき|6|先生|せんせい|A person ahead of you.
生|life / birth|セイ・ショウ|い(きる)・う(まれる)|5|学生|がくせい|A sprout growing.
会|meet / association|カイ|あ(う)|6|会社|かいしゃ|People meeting under a roof.
社|company / shrine|シャ|やしろ|7|会社|かいしゃ|Common in company words.
店|shop|テン|みせ|8|店|みせ|A building containing a shop.
食|eat / food|ショク|た(べる)|9|食べる|たべる|Food under a cover.
飲|drink|イン|の(む)|12|飲む|のむ|Food radical + open mouth idea.
見|see|ケン|み(る)|7|見る|みる|An eye on legs.
行|go|コウ・ギョウ|い(く)|6|行く|いく|A crossroads = go.
来|come|ライ|く(る)|7|来る|くる|Something coming toward you.
帰|return|キ|かえ(る)|10|帰る|かえる|Memorize with the everyday verb.
買|buy|バイ|か(う)|12|買う|かう|Shell/money idea = buy.
休|rest|キュウ|やす(む)|6|休む|やすむ|A person leaning on a tree.
何|what|カ|なに・なん|7|何|なん|Question word kanji.
大|big|ダイ・タイ|おお(きい)|3|大きい|おおきい|Arms stretched wide.
小|small|ショウ|ちい(さい)|3|小さい|ちいさい|Three tiny strokes.
高|high / expensive|コウ|たか(い)|10|高い|たかい|A tall tower shape.
安|cheap / safe|アン|やす(い)|6|安い|やすい|Calm under a roof.
新|new|シン|あたら(しい)|13|新しい|あたらしい|Cut wood to make something new.
古|old|コ|ふる(い)|5|古い|ふるい|Old stories across generations.
長|long / leader|チョウ|なが(い)|8|長い|ながい|A long vertical form.
間|interval / between|カン・ケン|あいだ・ま|12|時間|じかん|Sun between gate doors.
毎|every|マイ|—|6|毎日|まいにち|Common prefix meaning every.
週|week|シュウ|—|11|毎週|まいしゅう|A cycle around = week.
`,['meaning','kanji','onyomi','kunyomi','strokes','word','wordReading','mnemonic']);
// parseRows gives the first column id collision; repair kanji field layout
var kanjiFixed=`一|one|イチ|ひと(つ)|1|一つ|ひとつ|One horizontal line = one.|二|two|ニ|ふた(つ)|2|二つ|ふたつ|Two lines = two.`;
// Rebuild kanji correctly from the same raw DOM-free source by remapping generated objects.
kanji.forEach((k,i)=>{let ch=k.meaning;k.meaning=k.kanji;k.kanji=ch;k.id='k'+(i+1);k.strokes=Number(k.strokes)});
