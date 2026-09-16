var readings=[
['Kana','Hiragana words','あさ　みず　ねこ　やま　えき','asa / mizu / neko / yama / eki','Which word means “station”?',['あさ','みず','えき','やま'],'えき','えき (駅) means station.'],
['Sentence','A simple schedule','わたしは まいあさ 7じに おきます。8じに がっこうへ いきます。','I wake at 7 every morning and go to school at 8.','What time does the person go to school?',['7:00','8:00','9:00','10:00'],'8:00','The second sentence says 8じに がっこうへ いきます.'],
['Notice','Shop notice','本日　午後6時まで','ほんじつ　ごご ろくじ まで','What does the notice indicate?',['Closed all day','Available until 6 p.m. today','Starts at 6 a.m.','Tomorrow at 6 p.m.'],'Available until 6 p.m. today','本日=today, 午後6時=6 p.m., まで=until.'],
['Menu','Cafe menu','コーヒー 350円\n紅茶 300円\nサンドイッチ 550円','Coffee ¥350 / Tea ¥300 / Sandwich ¥550','Which item is cheapest?',['コーヒー','紅茶','サンドイッチ','Same price'],'紅茶','紅茶 is ¥300.'],
['Sign','Station sign','新宿方面　2番線','しんじゅく ほうめん / にばんせん','What does this tell you?',['Exit 2','Platform 2 for the Shinjuku direction','Bus 2','Closed'],'Platform 2 for the Shinjuku direction','方面=direction, 番線=platform.'],
['Message','Short message','今日は少し遅れます。7時ごろ着きます。すみません。','I will be a little late and arrive around 7.','What is happening?',['Arrive around 7 and be late','Leave at 7','Sick','Early'],'Arrive around 7 and be late','遅れます=will be late; 7時ごろ着きます=arrive around 7.'],
['Paragraph','Weekend plans','土曜日は友達と東京へ行きます。昼はラーメンを食べます。それから、公園で写真を撮ります。','Saturday: Tokyo with a friend, ramen, then photos in a park.','What happens after lunch?',['Go home','Study','Take photos in a park','Buy a bicycle'],'Take photos in a park','それから introduces the next event.'],
['JLPT-style','Mini passage','田中さんの会社は駅の近くです。田中さんは毎朝8時に家を出ます。電車で会社へ行きます。会社は9時からです。','Tanaka leaves at 8, goes by train, work starts at 9.','How does Tanaka go to the company?',['Bus','Bicycle','Train','Walk'],'Train','電車で会社へ行きます means go to the company by train.']
].map((x,i)=>({id:i,level:x[0],title:x[1],jp:x[2],support:x[3],q:x[4],options:x[5],answer:x[6],explain:x[7]}));
