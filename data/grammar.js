function parseRows(raw,fields){return raw.trim().split('\n').map((line,i)=>{let a=line.split('|'),o={id:fields[0][0]+(i+1)};fields.forEach((f,j)=>o[f]=a[j]);return o})}
var grammar=parseRows(`
です|A は B です|A is B.|Put です after a noun or な-adjective to make a polite statement.|私は学生です。|I am a student.|Do not translate です as a separate English word every time.
ではありません|A は B ではありません|A is not B.|Polite negative of noun/な-adjective sentences.|今日は休みではありません。|Today is not a day off.|じゃありません is common in speech; ではありません is a little more formal.
でした|A は B でした|A was B.|Polite past for noun/な-adjective sentences.|昨日は休みでした。|Yesterday was a day off.|Do not use でした after an い-adjective.
は|A は …|topic marker|は tells us what the sentence is talking about.|私は学生です。|I am a student.|は is written ha but pronounced wa as a particle.
が|A が …|subject / focus marker|が often identifies or introduces the subject.|猫がいます。|There is a cat.|Use が in existence patterns and many question answers.
を|N を V|object marker|を marks what an action directly affects.|水を飲みます。|I drink water.|を is pronounced o.
に|time/place に|at / on / to|に marks specific time, destination, or existence location.|七時に起きます。|I wake up at seven.|Usually omit に after 今日, 明日, 昨日.
へ|place へ V|toward / to|へ marks direction of movement.|日本へ行きます。|I am going to Japan.|As a particle, へ is pronounced e.
で|place で V|action location|で marks where an action happens.|駅で会います。|I meet at the station.|For where something exists, use に.
と|A と B / person と V|and / with|と joins nouns or marks a companion.|友達と食べます。|I eat with a friend.|It is an exhaustive “and” between nouns.
も|N も …|also / too|も replaces は/が/を in many “also” uses.|私も学生です。|I am a student too.|Do not normally stack はも.
の|A の B|A's B / B of A|の connects nouns by possession, type, or relation.|私の本です。|It is my book.|Think “A-related B,” not possession only.
から|A から|from / because|Marks a starting point and can give a reason.|九時から働きます。|I work from nine.|Reason から follows a reason clause.
まで|A まで|until / as far as|Marks an endpoint.|五時まで働きます。|I work until five.|から and まで can be used together or separately.
より|A より B|than A|Marks the comparison baseline.|電車はバスより速いです。|The train is faster than the bus.|The noun after より is the comparison reference.
ね|…ね|right? / isn't it?|Seeks agreement or shares a feeling.|いい天気ですね。|Nice weather, isn't it?|Use a soft shared tone.
よ|…よ|information / emphasis|Gives the listener information or emphasis.|この店は安いですよ。|This shop is cheap, you know.|Overusing よ can sound pushy.
か|…か|question marker|Put か at the end of a polite sentence to make a question.|学生ですか。|Are you a student?|You do not need English-style word order changes.
これ・それ・あれ|pronoun|this / that / that over there|Use alone, not directly before a noun.|これは何ですか。|What is this?|Before a noun use この / その / あの.
この・その・あの|determiner + N|this N / that N|These must be followed by a noun.|この本は私のです。|This book is mine.|Do not say このです.
ここ・そこ・あそこ|place word|here / there / over there|Basic place words.|トイレはあそこです。|The toilet is over there.|Polite forms こちら etc. can come later.
どこ・だれ・なに・いつ・どう|question word|where / who / what / when / how|Put the question word where missing information belongs.|駅はどこですか。|Where is the station?|Question order often resembles statement order.
あります|place に thing が あります|there is / exists, non-living|Use for objects and plants at basic level.|机の上に本があります。|There is a book on the desk.|Do not use for people or animals.
います|place に person/animal が います|there is / exists, living|Use for people and animals.|公園に子どもがいます。|There are children in the park.|Do not use for objects.
い-adjectives|Adj + N / Adjです|describes with い-adjective|Most end in い in dictionary form.|おいしいラーメンです。|It is delicious ramen.|きれい is a な-adjective.
な-adjectives|Adjな + N|describes with な-adjective|Use な before a noun; no な before です.|静かな部屋です。|It is a quiet room.|Do not say 静かなです.
い-adjective negative|～くないです|is not …|Replace final い with くないです.|今日は寒くないです。|It is not cold today.|いい becomes よくない.
い-adjective past|～かったです|was …|Replace final い with かったです.|昨日は暑かったです。|Yesterday was hot.|Negative past: ～くなかったです.
な-adjective negative|～ではありません|is not …|Use noun-like negative form.|ここは静かではありません。|It is not quiet here.|じゃありません is common in speech.
Verb groups|Group 1 / Group 2 / irregular|classification|Verb group determines conjugation.|食べる→食べます、書く→書きます。|taberu→tabemasu, kaku→kakimasu.|Not every る verb is Group 2; 帰る is Group 1.
～ます|verb stem + ます|do / will do|Polite non-past for habits and future actions.|毎日勉強します。|I study every day.|Non-past can describe present or future.
～ません|verb stem + ません|do not / will not|Polite negative non-past.|今日は働きません。|I will not work today.|Do not add ない after ません.
～ました|verb stem + ました|did|Polite past affirmative.|昨日映画を見ました。|I watched a movie yesterday.|Time words clarify past context.
～ませんでした|verb stem + ませんでした|did not|Polite past negative.|朝ご飯を食べませんでした。|I did not eat breakfast.|Learn the full ending as one pattern.
て-form|Vて / Vで|connecting/action form|Used before requests, permission, sequences, and more.|朝ご飯を食べて、学校へ行きます。|I eat breakfast and go to school.|Group 1 has sound changes.
～てください|Vてください|please do V|Standard polite request.|ここに名前を書いてください。|Please write your name here.|Service language can use softer forms later.
～てもいいです|Vてもいいです|may V / it is okay to V|Ask or state permission.|写真を撮ってもいいですか。|May I take a photo?|Add か to ask permission.
～てはいけません|Vてはいけません|must not V|Expresses prohibition.|ここでたばこを吸ってはいけません。|You must not smoke here.|Signs may use shorter forms such as 禁煙.
～たいです|verb stem + たいです|want to do|Express your own desire to act.|日本へ行きたいです。|I want to go to Japan.|Other people's desires use different patterns later.
～ましょう|verb stem + ましょう|let's V|Suggest doing something together.|一緒に食べましょう。|Let's eat together.|Friendly and direct.
～ませんか|verb stem + ませんか|would you like to V?|Gentler invitation.|コーヒーを飲みませんか。|Would you like coffee?|Negative in form, invitation in function.
好き・嫌い|N が 好き/嫌いです|like / dislike N|The liked/disliked thing commonly takes が.|音楽が好きです。|I like music.|Do not automatically use を.
上手・下手|N が 上手/下手です|good / poor at N|Used for skill.|日本語が上手ですね。|Your Japanese is good.|Calling yourself 上手 can sound boastful.
Comparisons|A は B より Adj|A is more Adj than B|Basic two-item comparison.|東京は私の町より大きいです。|Tokyo is bigger than my town.|Keep the baseline after より.
いちばん|group で X が いちばん Adj|X is the most Adj|Superlative within a group.|果物の中でりんごがいちばん好きです。|I like apples best among fruit.|State the comparison group.
Counters|number + counter|count appropriately|Japanese uses counters for shape/type.|りんごを三つください。|Three apples, please.|Sound changes occur: 一本 いっぽん.
Frequency|いつも / よく / ときどき / あまり / ぜんぜん|always / often / sometimes / not much / not at all|Frequency words generally come before the verb.|ときどき映画を見ます。|I sometimes watch movies.|あまり and ぜんぜん pair with negatives at N5.
Reason から|reason + から|because…|State a simple reason.|雨ですから、家にいます。|Because it is raining, I stay home.|In speech だから is common after noun/な-adjective reasons.
そして・でも・それから|connector|and / but / after that|Connect short beginner statements.|朝ご飯を食べました。それから、出かけました。|I ate breakfast. Then I went out.|Short separate sentences are also fine.
あげます|A は B に N を あげます|give|Basic giving away from the speaker viewpoint.|友達に本をあげます。|I give a book to a friend.|Giving verbs depend on viewpoint and relationship.
もらいます|A は B から N を もらいます|receive|Basic receiving expression.|先生から本をもらいました。|I received a book from my teacher.|から clearly marks source.
Location nouns|N の 上/下/前/後ろ/中/外|on / under / in front / behind / inside / outside|Put の between reference noun and position noun.|駅の前にコンビニがあります。|There is a convenience store in front of the station.|Position words behave like nouns.
`,['pattern','formation','meaning','explanation','example','english','mistake']);
grammar.forEach((g,i)=>g.id='g'+(i+1));
