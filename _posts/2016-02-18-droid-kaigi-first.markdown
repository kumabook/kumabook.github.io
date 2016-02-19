---
layout: post
title:  "Droidkaigi1日目"
date:   2016-02-18 11:22:22 UTC+9
categories: programming
---


Droidkaigi1日目に行ってきた。
会場は東工大。久々の大岡山でテンションが上がり気味だった。
最近Android結構触ってるからか、自分の関心度も高く集中して充実した時間だった。

## [明日から使えるRxJava頻出パターン](http://www.slideshare.net/KazukiYoshida/droidkaigi-rxjava?qid=237d7fef-6d92-4c85-b826-52bf3bdaf10f&v=&b=&from_search=6)

 RxJavaのAPIクライアントの実装を例にした頻出パターンの解説

### 感想：
flatMapとかcombineLatistとかを概念的なものを実例を交えて簡潔に説明されていたので、かなりわかりやすかった。
ReactiveCocoaとほぼ同じようにRxJavaも使えそうでAndroidアプリ作る時はぜひ使いたい。

## [史上最速のAndroid](http://www.slideshare.net/kmt-t/android-58405226)

仮想マシン内部に依存した最適化の話。生成されるバイトコード、ネイティブコードやVMのアーキテクチャ、GCの設計の話などをソースも交えて解説。

### 感想
面白かった。VMハック楽しそうだった。Androidというよりもコンピュータサイエンス的に興味深い話だった。まさに廃人といった感じだった。
ローレベルにダイブする人は男気があってカッコ良い。

## [Android Dev Tools Knowledge](http://sssslide.com/www.slideshare.net/shinobuokano7/android-dev-tools-knowledge)

- デモも交えひたすらおすすめのコマンド・ツールを紹介していく話。

### 感想
良かった。スピーカーのイケイケな感じも勢いがあってよかった。
知らないものも多かったので、ちょっとずつ導入したい。

## [Instant Runを実現する仕組み](https://speakerdeck.com/atsushieno/how-instant-run-works-at-droidkaigi2016)

- Instant run で何をやっているのかの解説

### 感想

 情報が公開されていないので仕方ないが、前置きが長くて肝心の聞きたい部分が薄かった。概略だけって感じだった。

## [Androidの省電力について考える](https://speakerdeck.com/ynakanishi/droidkaigi-2016-androidfalsesheng-dian-li-wokao-eru)

省電力周りの歴史から最新のAPIまで順を追って説明する話。

### 感想

タイマーとか、常駐アプリに主にフォーカスした内容だった。割と新しめのAPIの話で、
普段気にしてなかったので、参考になった。


## [明日、敗訴しないためのセキュアコーディング](http://www.slideshare.net/KengoSuzuki1/ss-58412489)

- アンドロイドのセキュリティの話。

### 感想
セキュアコーディングの概要＋最低限抑えておきたいところのまとめって感じだった。
やはり、ちゃんとやるならJSSECのセキュアコーディングガイド読まないといかんなという感じっすね
## 全体の感想

全体的に面白いトークが多かったが、「史上最速のAndroid」が一番面白かったかな。
あと、企業ブースでお菓子が出てて地味に今まで参加した中で一番充実してる気がした。

晩飯は久々の大岡山で四川にいくか凌駕にいくか迷ったが、今日は四川にいくことにした。
写真は、青菜担々麺。

<img src="/assets/sisen_tantan.jpg" alt="tantan" style="width: 400px;"/>


以下はメモ。


-----
-----

# 明日から使えるRxJava頻出パターン

## 感想：
flatMapとかcombineLatistとかを概念的なものを実例を交えて簡潔に説明されていたので、かなりわかりやすかった。
ReactiveCocoaとほぼ同じようにRxJavaも使えそうでAndroidアプリ作る時はぜひ使いたい。

## メモ:

- RxJavaを使ったAPIとの非同期処理を説明
  - RxJavaはFRPやJava8のstream的に使える。
  - いろいろな文脈がある。
  - APIの非同期処理で困っている人が多そう
  - APIの非同期処理で使うのが入門として良い
- RxJavaを使うモチベーション
    - getActivity() == null 問題
      - 非同期コールバック内でgetActivity()がnullになる
      - 非同期コールバックの並列化・直列化を複雑な実装をすると可読性が低くなる。count latchとか

- Observableに同期・非同期実行の概念はない
    - 生成したスレッドで実行される
    - Schedulerで指定する。
      - subscribeOnとobserveOn
        - subsribeOnはobservableの処理のスレッド()
        - observeOnで以降のハンドラ処理のスレッドを指定

- trell/RxLifecycleでgetActivty() == null 問題を綺麗に解決。
  - `.compose(bindToLifecycle())` activityなどのlifecycle合わせて、いい感じにunsubscribeしてくれる


- 待ち合わせ処理(並列処理)をObservable.combineLatestを使う

  - `Observable.combineLatest(search(), search(), Pair::create)`

  - 片方が失敗するとエラーになる
     -`onErrorReturn`するとハンドリングできる
     - スレッドの問題：同じスレッドで実行される。
     - 両方にsubscribeOnを指定する

- リトライ機能
  - `retry`を使う

- 非同期処理の直列化 -> `flatMap`
  - searchRecipe().flatMap

- 並列処理と直接処理を合わせて使う
  - flatMap, combineLatist

- Android は最大16並列
  - `System.setProperty("rx.ring-buffer.size", "32")` で変更可能

- 特殊な用途のObservable
  - Single (Promise的なもの)
  - Completable (値なし、成功or失敗だけを知りたい場合に使う)


# 史上最速のAndroid

仮想マシン内部に依存した最適化

- ループのオーバヘッド
- ARTが犠牲にしたもの
- 遅い命令と速い命令
- JNIの秘密

## 感想
面白かった。VMハック楽しそうだった。Androidというよりもコンピュータサイエンス的に興味深い話だった。まさに廃人といった感じだった。
ローレベルにダイブする人は男気があってカッコ良い。

## メモ

### 解析ツール
- dexdump
- oatdump <- どっちもできる


### ループのオーバヘッド
- 1億回ループ ... 518ms
- アンロールしてみる...331ms
- 単純なアンロールが効果がある

### バイトコードを見てみる

### ネイティブコードを見てみる
-> ループのたびに謎のジャンプが入る。GCチェックをしている

- 後ろ向きのジャンプで生成
- GCチェックの処理
- GCチェックはGCポイントで実行
- GCポイントではGCマップというガイド情報が用意される
- GCマップはコンパイル時に生成されるため、効率が良い

※AndroidのARTのGCの発生する場所はある程度コンパイル時に決まる

- GCチェックがループの最後で走る
- 極めて小さいループではアンロールが効く、オブジェクトは生成しない方が良い。


## ARTが犠牲にしたもの
- オブジェクトのプロパティのアクセスを含むループをアンロールしてみる
  - 331ms, 980ms
  - フィールドアクセスが遅い。

- ネイティブコードがめちゃくちゃ長い。 200行ぐらいのアセンブラ
  - ARTのインタプリタのソースコードを読むのもあり。

- フィールドアクセスするたびにリードバリアが呼ばれる
  - リードバリアさん？
  - リードバリアが軽い処理なら -> 全然軽くない!?

### ARTのGCの闇

レイテンシという悪魔に魂を打ったART

- レイテンシ、スループット
- スループットを犠牲にしてレイテンシを改善
- ゲームのため？

#### 並行マークアンドスイープ

#### Pauseless GC

- HWのサポートが必要
- SWで頑張る必要がある -> リードバリア


## 速い命令・遅い命令

- ARTのアーキテクチャ
  - レジスタマシン
  - 仮想マシンレジスタに値を入れて計算
  - ローカル変数は仮想マシンレジスタに保存される

- MOVEとMOVE_LONG命令
  - コピー命令
  - 32 bitと64bit
- 仮想マシンレジスタの幅は32bit
- 64ビットリードはレジスタは2回リード
- x86でも2回リード
- double型も同様
- 浮動小数点はfloatの方が速い

- 値をレジスタに読み込むのは必須なので、この命令は必ず使われる

- IF_EQとIF_EQZとそのバリエーション
    - IF_EQ x86のcmp命令 (2つのレジスタを比較)
    - IF_EQZはx86のtest命令(０と一致するか)

- IF_EQZの方が使用するCPUレジスタが少ないので速くなる

## JNIの秘密

- Dalvikでは組み込みメソッドがあった。仮想マシン内にネイティブで実装されていた。JNIより速い
- ARTではJNIが速くなった。高速JNI関数
  - 型ディスクリプタの頭に「!」つける
  - 仮想マシンのステート切り替えのオーバヘッドがない
  - Javaオブジェクトにアクセスできない
  - 長い時間がかかるとGCに悪影響がある
  - 使っていいものか不明
  - Dalvikでは動かない

## まとめ 最速を目指すための作法
- ループの中でのオブジェクトを生成しない
- 数値計算の場合はループをアンロール
- ローカル変数のオブジェクトにアクセスしない
- フィールド変数はローカル変数にコピーする
- 遅い命令は避ける
- 高速JNIを使う？

### Android Guruを目指して

- バイトコードと逆アセンブラを読もう
- インタプリタのコードは読みましょう

- ベンチマークは重要

質問

Q. アーキテクチャの違いはどれくらい影響ある？
A. かなりある。nativeコード生成はそれぞれ独立して実装されているので、最適化が今後効く可能性がある

Q. 高速JNIは使ってはいけないのでは？dot netのmscorelibもそうだった
A. ダメ。

Q. 高速JNIなぜ速い？
A. ステートの切り替えがない。前準備がいらない。

Q. OATインタプリタとは?
A. 全てが事前コンパイルではない。インタプリタもある、リフレクションときなどはインタプリタが使う、dalvikと同等。jitコンパイラもある。

Q. リードバリアはローカル変数だけ？
A. フィールド変数でも同じ。

Q. メソッド呼び出しの場合は？
A. getterはインライン展開されることが多い。


# Android Dev Tools Knowledge

- コマンドの話
- gradle 周り

## 感想
 良かった。ひたすらツールの紹介で内容が濃かった。知らないものも多かったので、ちょっとずつ導入した。

## メモ
### 便利なコマンド
- adb-peco adbの使いやすさの向上
  - 端末指定オプションつけるのがめんどい
    - 複数の端末をつないでいる時
- input text
  - 入力が楽にできる
    - shell からテキストを入力できる
- dumpsys
  - adb shell dumpsys | grep "DUMP OF SERVICE"
  - activityの状態のDump
    - intentの情報とかも
    - adb shell dumpsys activity top
- Settings
  - adb shell settings list [system/global/secure]
- screenrecord
  - adb shell screenrecord /sdcard/somefile.mp4
  - --bugreport フレームレートが出る
- Systrace
  - パフォーマンスを見る
  - generate an HTML report
  - 公式ドキュメントあり
  - atraceを叩いている
    - adb shell atrace --async_start -a pakcage_name -c -b 16000 res
- operando/Android-Command-Note


## gradle plugin
- dexcount-gradle-plugin
      - methodカウントしてくれる
- gradle-versions-plugin
  - 新しいバージョンがあるかどうかチェックしてくれる
- build-time-tracker-plugin
  - build時間トラック
- gradle-slack-plugin
- gradle-android-command-plugin
  - 例: preferenceを削除する
- gradle-ribonnaizer

## Android Studio Plugin
- Android WiFi ADB
- ADB idea
- Android-DPI-Calculator
- android-percelable-intellij-plugin
- AdbCommander for Android
- Genymotion Plugin
- eventbus-intellij-plugin
- android-postfix-plugin
- Android File Grouping Plugin
- Google Developers color scheme


# その他
- androidtool-mac
  - screenshot, screenrecord ...
- vysor
  - ミラーリング
- Android SDK Search
- DPI Calculator
- Android Resource Navigator
- Material Terminal
- materialdoc.com
- DesignOverlay

## デバッグ
...

## どこで情報で集めるのか？
- コードを読む
- Google+
- Twitter
- Github

# Instant Runを実現する仕組み

## 感想
 前置きが長くてあまり話が深くなかったような気がする。概略だけって感じだった。

## Instance Run
- debugビルド用
  - skip proguard
  - includes support files
- cf: iOSは全然違う
  - Fast Development
   - apk インストールを減らす
   - dexとres だけを２回目以降はpushする
- Altered Application: BootstrapApplication
  - monkey patching
    - replaces the path to dex, in app data path
  - IncrementalClassLoader loads .dex-es
    - Split Dex Uploads
    - Dex sharding.
- ビルドタスクが全然違う：以下がうまく動かないもの
  - Data Binding
  - Kotlin
- ブートストラップが違う
  - Package Manager
- 実行時
  - Cold Swap
  - Warm Swap
  - Hot Swap
- Detecting Changes
  - どのSwapでいけるかチェックする
- その他の環境でのInstance run
  - Inventing on Principle (2012)
    - Xcode Playground
  - Making Install C# Viable(2012)
    - Xamarin Sketches
  - Continuous Coding (2015)
    - The Evolutio of interactive C#


# Androidの省電力について考える

- Android 6.0 省電力
- Job schedulerの良さ

## 感想
タイマーとか、常駐アプリに主にフォーカスした内容。割と新しめのAPIの話。
普段気にしてなかったので、参考になった。

## メモ
電力使用量削減の歴史

- キャリア、メーカが独自の対策
- キャリアからのガイドライン
- 断片化

- Googleの取り組み
  - Fused Location Provider
    - Google play servicesが仲介
    - Kindleでは使えない
  - Sensor Batching 4.4以降
    - CPUを動かさずセンサー情報を取得
  - Job scheduler 5.0以降
    - 細かく条件設定できるジョブの遅延実行
  - BatterySaver (5.0以降)
    - OS標準の省電力モード

- Android 6.0の省電力
  - 強制的に電力消費を抑える
    - Doze
      - 画面OFF, 静止状態、バッテリ
      - アプリの動作に制限
        - ネットワークアクセス停止
        - Wake Lock を無視
        - AlarmManagerの処理を遅延
        - Donze中のAlarm発火
          - 回避策はあるけど、一部非推奨
        - Doze中のGCM
            - リアルタイム処理が要求される場合のみ
      - たまに起きる
- App stanby
  - ユーザ明示的にアプリを起動する
  - フォアグラウンドになる
  - 通知をユーザが見る
  - 1日一回しか通信できなくなる
- 対象外にする方法
  - manifestに書いて、intentを投げてシステムのダイアログを出す
- 潜在的Google Playリスク
  - AlarmManager#setAlarmClock()もbanされるかも
  - 電力的に行儀の良いアプリを

- AlarmManager of Job Scheduler
  - バッググラウンド処理にリアルタイム性が必須のアプリはほとんどない
  - 豊富な設定が可能
  - PendingIntentよりも使いやすい
  - JobServiceクラスを派生して実装

- Dozeの動作確認方法
 - adb でDozeモードにできる
 - adb shell dumpsys battery unplug (バッテリーモード)
 - adb shell dumpsys deviceidle step
 - adb shell dumpsys deviceidle force-idle

 - adb shell dumpsys battery reset

- App standbyの動作確認方法
 - adb shell am.set-inactive packageName true

- Android Jobというラッパーがある？


# 明日、敗訴しないためのセキュアコーディング
## 感想
セキュアコーディングの概要＋最低限抑えておきたいところのまとめって感じだった。
やはり、ちゃんとやるならJSSECのセキュアコーディングガイド読まないといかんなという感じっすね。
## メモ
- Androidのセキュアコーディング
  - 代表的な機関が警告したら対応しないと敗訴する
- セキュリティはサービス利用者のため
- 良書1： Android Securty
- 良書2: セキュアコーディングガイド JSSEC
- 課題：範囲が広い
- Build Security In
  - 各段階でセキュリティ対策をする

- 設計フェーズ
  - 脅威や脆弱性の把握
  - 80%の確率でここで発生
  - ポイント
    - Perssion
    - 3rd party
    - data store
    - webview
    - 連携アプリ

- 事例
  - 金融機関のログイン情報
  - WebView: javascript interface
  - 他アプリとの連携
    - 独自Permission
  - Anti skype
      - チャット履歴

- 実装フェーズ

- 運用フェーズ
  - keystoreと秘密鍵
  - ローカルにはkeystore、パスワードも書かない
  - ローカルCI上でリリースビルド
  - パスワードは環境変数に

