---
layout: post
title:  "MusicKit JSでapple musicの曲を再生してみる"
date:   2018-12-14 00:00:00 +0900
categories: programming
---


この記事は「[We Are JavaScripters!【執筆初心者歓迎】 Advent Calendar 2018](https://adventar.org/calendars/2972)」の14日目の記事です。
今年はWe Are JavaScriptersには３回出させていただいて、大変お世話になりました。この場を借りてお礼を言わせてください。


 さて、今年やり残した・勉強し残したことが大量にあって途方にくれている僕なのですが、
 それを一つでも消化するべく、今日はずっと気になってて試せていなかった[MusicKit JS](https://developer.apple.com/documentation/musickitjs)を試して見たいと思います。


 MusicKit JSではApple Musicのライブラリを操作したり、楽曲の再生ができます。ただし、再生は、ユーザがApple Musicの有料会員である必要があります。今日は、まずは手を動かして楽曲を再生するところまでをこのページに実装していきたいと思います。


まず、musickit.jsを読み込みます。

```
<script src="https://js-cdn.music.apple.com/musickit/v1/musickit.js"></script>
```

<script src="https://js-cdn.music.apple.com/musickit/v1/musickit.js"></script>


次にMusicKitが読み込まれたタイミングでDeveloperTokenを設定します。DeveloperTokenはapple developer programに課金していないと使えないので、ここでは割愛しますが、なんかapple developer programのページをぽちぽちやって鍵を作ったり、pythonのスクリプトを使ったりしてそこからJSON Web Tokenを生成したりします。そうしてできたDeveloper Tokenを設定します。

```
document.addEventListener('musickitloaded', function() {
  MusicKit.configure({
    developerToken: 'DEVELOPER-TOKEN',
    app: {
      name: 'My Cool Web App',
      build: '1978.4.1'
    }
  });

  ...

});
```


設定ができたら、apple musicへログインするためのボタンを配置します。
ついでにログアウトボタンもおいておきます。


<button id="apple-music-authorize">Login to apple music</button>
<button id="apple-music-unauthorize">Logout from apple music</button>

```
<button id="apple-music-authorize">login to apple music</button>
<button id="apple-music-unauthorize">Logout from apple music</button>
...

let music = MusicKit.getInstance();
let authorizeButton = document.getElementById('apple-music-authorize');
let unauthorizeButton = document.getElementById('apple-music-unauthorize');
authorizeButton.addEventListener('click', function() {
  music.authorize().then(function() {
    console.log('authorize');
  });
});
unauthorizeButton.addEventListener('click', function() {
  music.unauthorize();
});
```

ログインできたら、再生できるようになるので、再生ボタンをおいて試しに再生してみます。
(ログインしてたら、再生されるので注意)

```
<button id="play">Play</button>
<button id="stop">Stop</button>


...

music.setQueue({
  album: '1025210938'
})

playButton.addEventListener('click', function() {
  music.player.play();
});
stopButton.addEventListener('click', function() {
  music.player.stop();
});
```

<button id="play">Play</button>
<button id="stop">Stop</button>


意外と簡単に再生させることができました。

electronを使ったりすれば、itunesの代替のプレイヤーなど作れそうですね。
(本当はwebextensionで実装したかったのですが、上手く行かなかったので断念)



<script>
const developerToken = 'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjYzTFhVVzNKS0IifQ.eyJpc3MiOiJNNEo4RkhWNDlCIiwiaWF0IjoxNTM0MTY1NDc1LCJleHAiOjE1NDk5NDI0NzV9.kbtBRuZ1Vty7bQEWx1iDhhlo5O3NNbWnXl0wt4O0oQHKCFHdn4QtJ_RfPPVFVuAllkWBfvZ946h_0qXnsSng7A';

document.addEventListener('musickitloaded', function() {
  MusicKit.configure({
    developerToken: developerToken,
    app: {
      name: 'My Cool Web App',
      build: '1978.4.1'
    }
  });
  let music = MusicKit.getInstance();
  let authorizeButton = document.getElementById('apple-music-authorize');
  let unauthorizeButton = document.getElementById('apple-music-unauthorize');
  let playButton = document.getElementById('play');
  let stopButton = document.getElementById('stop');
  authorizeButton.addEventListener('click', function() {
    if (music.isAuthorized) {
      alert('already login');
      return;
    }
    music.authorize().then(function() {
      music.setQueue({
        album: '1025210938'
      })
    });
  });
  unauthorizeButton.addEventListener('click', function() {
    music.unauthorize();
  });
  music.authorize().then(function() {
    music.setQueue({
      album: '1025210938'
    });
  });
  playButton.addEventListener('click', function() {
    music.player.play();
  });
  stopButton.addEventListener('click', function() {
    music.player.stop();
  });
});

</script>
