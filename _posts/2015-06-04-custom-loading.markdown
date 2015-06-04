---
layout: post
title:  iOSのPull To Refreshのローディングアイコンをカスタマイズする
date:   2015-06-04 00:00:00 UTC+9
categories: ios, swift, programming
---

スマートフォンアプリのUIのよくあるパターンとしてPull to refresh というものがある。
今でこそios のUIKit に標準として組み込まれているが、もともとはTweetieというアプリで
Loren Brichterという人が考案したものらしい。
現在はTweetieはTwitterに買収され、Twitterが特許をもっているらしいけど。
ただ、Twitterはこの特許を行使はしないらしい。ﾖｶｯﾀﾖｶｯﾀ


このPull to refreshはタッチパネルの利点をこれほど生かしたUIはないだろうというくらいに
自然な操作感である。
UIKitに組み込まれたことによりほんの数行のコードを書くことでこの機能を自分のアプリに実装することができる。
しかし、このOS標準のパーツUIRefreshControlはローディングアイコンが味気ない。普通のぐるぐるするやつである。
いろんなアプリでこのローディングアイコンをカスタマイズして独自のものを表示している。
こういった細かいところに遊び心があるアプリは使っていて親近感が湧くものである。
自分のアプリでもぜひカスタマイズしたアイコンを利用したい。


幸運にもOS標準のAPIに似たAPIを提供してくれているライブラリ
[ISAlternativeRefreshControl][]
というものがあり、UIKitのUIRefreshControlを使ったアプリも比較的少ない修正でカスタマイズすることができそうである。

まずは、ios開発者の友 [CocoaPods][]を使って[ISAlternativeRefreshControl][]をインストールする。
以下をPodfileに追加しよう。

```
pod 'ISAlternativeRefreshControl'
```

例のごとく pod installする

```
pod install
```

これで準備はできた。

exampleを見てみるとISAlternativeRefreshControlを継承したクラスを作り、
幾つかのメソッドをオーバライドしてあげれば良さそうである。

- didChangeProgress() ....... progress が変わったときによばれる
- willChangeRefreshingState(refreshingState: ISRefreshingState) ...... stateが変わる直前に呼ばれる

progress はどれくらい引っ張られているかを表してるようで だいたい0~2.0の値
stateは文字通り状態を表していてだいたい以下のようなイメージである。

- Normal ...... 引っ張りはじめの状態
- Refreshing ...... 引っ張ったあと話して更新中の状態
- Refreshed ....... 更新が終わったあとの状態

progress, stateに合わせてviewを変化させればよい。
今回は自分の作っているMusicFavのアイコンおんぷちゃんをくるくる回転させて、
更新が終わったら色を変化させようと思う。

回転はUIViewのCGAffineTransformでできる。
こんな感じである。
```
func updateView() {
    imageView.transform = CGAffineTransformMakeRotation(CGFloat(M_PI) * prog);
}
```

progressは0~2のなので少し係数をかけてやる。係数をかけたものがprogである。

```
override func didChangeProgress() {
    switch refreshingState {
    case .Normal:
        prog = (2.0 * progress) % 2.0
        updateView()
    case .Refreshing:
        break
    case .Refreshed:
        break
    }
}
```

これで引っ張っている途中のアニメーションができた。
次に、指が離れたあとのアニメーションである。
いくつかやり方はあるが今回はCABasicAnimationを使う。
stateがRefeshingになったタイミングでアニメーションをスタートさせる。

```
    override func willChangeRefreshingState(refreshingState: ISRefreshingState) {
        switch refreshingState {
        case .Normal:
            break
        case .Refreshing:
            startLayerAnimation()
        case .Refreshed:
            break
        }
    }

    func startLayerAnimation() {
        let layer              = imageView.layer;
        let animation          = CABasicAnimation(keyPath: "transform.rotation")
        let fromValue          = M_PI*Double(prog)
        let toValue            = fromValue + 2*M_PI
        animation.duration     = 0.5 * (toValue - fromValue) / (2*M_PI)
        animation.repeatCount  = 0
        animation.beginTime    = CACurrentMediaTime()
        animation.autoreverses = false
        animation.fromValue    = NSNumber(float: Float(fromValue))
        animation.toValue      = NSNumber(float: Float(toValue))
        animation.removedOnCompletion = false
        animation.fillMode     = kCAFillModeForwards
        animation.delegate     = self
        layer.addAnimation(animation , forKey:"rotate-animation")
    }

    override func animationDidStop(anim: CAAnimation, finished flag: Bool) {
        switch refreshingState {
        case .Normal:
            break
        case .Refreshing:
            startLayerAnimation()
        case .Refreshed:
            break
        }
    }
```

これで更新中のアニメーションができた。
最後は更新後のアニメーションである。
そのままだと更新後は即座にアイコンが上にスライドしてしまう。
アイコンを色違いのものに差し替えたあと少しだけ間を開けて上にスライドさせたい。
アイコンが正位置に戻ったところで止まるとなお良い。
そのためにアニメーションの状態を管理するenum AnimationStateを定義して、
通常のアニメーション中と正位置に戻すアニメーション中を区別する。
正位置に戻ったあとにアイコンを差し替え少し間を開けたあと上にスライドするようにする。

```
    enum AnimationState {
        case Normal
        case Animating
        case Completing
        case Completed
    }

    func startLayerAnimation(returnNormal: Bool) {
        let layer              = imageView.layer;
        let animation          = CABasicAnimation(keyPath: "transform.rotation")
        let fromValue          = M_PI*Double(prog)
        let toValue            = returnNormal ? (2*M_PI) : (fromValue + 2*M_PI)
        animation.duration     = 0.5 * (toValue - fromValue) / (2*M_PI)
        animation.repeatCount  = 0
        animation.beginTime    = CACurrentMediaTime()
        animation.autoreverses = false
        animation.fromValue    = NSNumber(float: Float(fromValue))
        animation.toValue      = NSNumber(float: Float(toValue))
        animation.removedOnCompletion = false
        animation.fillMode     = kCAFillModeForwards
        animation.delegate     = self
        layer.addAnimation(animation , forKey:"rotate-animation")
    }

    override func animationDidStop(anim: CAAnimation, finished flag: Bool) {
        switch animationState {
        case .Normal:
            break
        case .Animating:
            animationState = .Completing
            startLayerAnimation(false)
        case .Completing:
            startLayerAnimation(true)
            animationState = .Completed
        case .Completed:
            self.imageView.image = UIImage(named: "loading_icon_\(arc4random_uniform(4))")
            let startTime = dispatch_time(DISPATCH_TIME_NOW, Int64(1.0 * Double(NSEC_PER_SEC)))
            dispatch_after(startTime, dispatch_get_main_queue()) {
                super.endRefreshing()
            }
        }
    }


```

これで完成である。こんな感じになった。


<img src="/assets/custom_loading.gif" alt="Drawing" style="width: 400px;"/>

コミットはこちら

- [RefreshControlの実装](https://github.com/kumabook/MusicFav/commit/5cd4052076fe2f695b4209b081bbb044ec6063f0)
- [実際にViewControllerへの組み込み](https://github.com/kumabook/MusicFav/commit/c160ebf6a571a1756c0c923f27f95e82e0f13d73)

MusicFavの全体のソースは[こちら](https://github.com/kumabook/MusicFav)

[ISAlternativeRefreshControl]: https://github.com/ishkawa/ISAlternativeRefreshControl
[CocoaPods]: https://cocoapods.org/
