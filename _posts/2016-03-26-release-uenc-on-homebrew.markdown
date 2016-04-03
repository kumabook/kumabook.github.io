---
layout: post
title:  "release-uenc-on-homebrew"
date:   2016-03-26 18:11:42 +0900
categories: 
---


 uenc/udecの続き。
 標準出力対応したので、0.1.2として[cargo](https://crates.io/crates/uenc)にアップロードした。
 ただ、cargoを経由したダウンロードはrust自体が必要なので、できればバイナリを配布したい。
 Macならhomebrew、linuxならyumなりaptとかでリリースしたい。
 調べてみたところバイナリは [bintray](https://bintray.com/)で配布するのがモダンな感じ。
 コマンドラインでアップロードができるみたいでゆくゆく自動化ができる。

 今回はhomebrewという名前のbintrayのrepositoryを作ってそこにuenc packageを作った。
 bintray上のrepositoryの単位的にこれであっているのかちょっと半信半疑だが、とりあえず試しにリリースしてみた。

https://bintray.com/kumabook/homebrew/uenc

 github releaseでもいいような気がするが、お試しということで。

肝心のhomebrewの方は、とりあえず 自分でtapを作ってインストールできるようにしてみた。

https://github.com/kumabook/homebrew-uenc



```ruby
class Uenc < Formula
  desc "Simple command line url encoder and decoder"
  homepage "https://github.com/kumabook/uenc"
  url "https://bintray.com/artifact/download/kumabook/homebrew/uenc/0.1.2/uenc-0.1.2.zip"
  version "0.1.2"
  sha256 "39d07d3bc6a4a2d4250808b3d995a1ef536b5b9978b14e2d72fc7330aff216fe"

  def install
    bin.install 'uenc'
    bin.install 'udec'
  end

  test do
    raw     = "12345/@+-"
    encoded = "12345%2F%40%2B-"
    File.write("raw"    , raw)
    File.write("encoded", encoded)
    assert_equal "#{encoded}\n", pipe_output("#{bin}/uenc #{raw}")
    assert_equal encoded       , pipe_output("cat raw | #{bin}/uenc")
    assert_equal "#{raw}\n"    , pipe_output("#{bin}/udec #{encoded}")
    assert_equal raw           , pipe_output("cat encoded | #{bin}/udec")
  end
end
```

```
$ brew tap kumabook/uenc
$ brew install uenc
```

でインストールできるようになった。


とりあえず [cargo](https://crates.io/crates/uenc) で100ダウンロードまでいったら
それなりに需要がありそうということで本家で公開してみましょうかしらね。
