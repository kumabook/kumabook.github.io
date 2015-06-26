---
layout: post
title:  DVDをチャプターごとにmp4に変換する
date:   2015-05-30 00:00:00 UTC+9
categories: diary, tips
---

自分は趣味でバンドをやっている。細々ではあるがライブハウスなる場所で人様の前で
演奏などをしたりもする。
ライブハウスとは、文字通りライブをするための場所である。ギターアンプ・ドラムセット・
スピーカーなど、大音量で演奏するための機器が一通り揃っていて、バンドマンは高品質の環境で
演奏するためにライブハウスを借りてそこで演奏するのである。
大抵のライブハウスは録音も同時にしてくれる。
しかし残念ながらPA機器というのは買い替えのサイクルが長いからか録音はCD or DVDである。
未だにMDを使っているところなんかもたまにある。

CDはwavなのでiTunesなどで簡単にmp3に変換できる。
問題はDVDである。
昔ながらのアップローダーでDVDの中身がzipに固められてバンドメンバーから展開される。残りのメンバーはせっせとそれを落とす。
中身はVOBという謎フォーマットでどうも勝手が悪い。
忙しい現代社会にいきるソフトウェアエンジニアとしてはmp4に変換してiphoneなぞにいれて通勤
中でも聞けるようにしておきたいものである。

ということで本題である。今日はDVDの中身のファイルVOBをmp4に変換する。
プログラマたるものCUIからできるようにしてできる限り自動化したいものである。
以前調査した結果

[HandBrakeCLI](https://trac.handbrake.fr/wiki/CLIGuide) を使うのが良さそうである。
[ここ](https://handbrake.fr/downloads2.php) からHandBrakeCLIを落としてくる。

Rubyの[wrapper](https://github.com/rsutphin/handbrake.rb)もある。

```
gem install handbrake
```

でいれる。
Handbrakeではチャプターごとにファイルを分けることもすべてを一つのファイルにすることもできる。
今回は、チャプターごとにファイルを分けることにした。
転送するときのことを考えるとファイルが分かれていた方が何かと便利そうだ。
曲ごとにチャプターが分かれていればこれで良い感じになるだろう。

```

require 'rubygems'
require 'handbrake'

VOLUME = '/Users/kumabook/Downloads/logical/'
DIST_DIR = '/Users/kumabook/Movies'
PREFIX = 'logical-'
HAND_BRAKE_CLI = '/Users/kumabook/bin/HandBrakeCLI'

hb = HandBrake::CLI.new(:bin_path => HAND_BRAKE_CLI, :trace => false)

project = hb.input(VOLUME)

disc = project.scan
disc.titles[1].all_chapters.each {|chap|
  unless chap.nil?
    puts 'start chapter-' + chap.number.to_s
    project.title(1).preset('High Profile').chapter(chap.number.to_s + '-' + chap.number.to_s).output(DIST_DIR + '/' + PREFIX + chap.number.to_s + '.mp4')
  end
}
```

いちおう動いているようである。めでたしめでたし。

