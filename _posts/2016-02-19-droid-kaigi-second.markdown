---
layout: post
title:  "Droidkaigi2日目"
date:   2016-02-19 11:22:22 UTC+9
categories: programming
---

1日目に引き続き、Droidkaigi２日目に行ってきた。


## [基調講演](http://yaraki.github.io/slides/droidkaigi2016/#1)

朝だらだらしていたら、後半しか見れなかったので割愛。

## View into the abyss

View の根本的な話。からのカスタマイズ、パフォーマンスtipsをスマートニュースでの例を交え説明。

### 感想

本日のベストアクト。
スマートニュースでは基本的にonDrawをオーバーライドして、カスタマイズしてるとか、
スピーカーがIS03使ってるからFroyoサポートしてるとかなかなかロックだった。
Viewフレームワークの復習にもなったし、何よりできる人はやっぱりフレームワークの根幹のドキュメント、ソースは読んでるなっていうのが実感できたのが一番の収穫。

## [パフォーマンスを追求したAndroidアプリを作るには](https://speakerdeck.com/t_egg/droidkaigi-2016-pahuomansuwozhui-qiu-sitaandroidapuriwozuo-runiha)

電源消費系と速度の計測の話が主。単にこうすれば良いよっていうだけでなく、
コストパフォーマンスも考慮して最適化のtipsを紹介してくれていた。日頃から計測しましょう。

### 感想
「できるエンジニアは地味なこと(非機能)を地道にやっているべき」というスピーカーの思いに非常に共感した。
最新のライブラリとかでウェーイしている若者と違い、いぶし銀で芯のあるトークだった。
話していた内容でやっていることは本当に地道で、ノウハウいることだと思う。dumpsysとか事細かに見てて、組み込み感あった。
プロフェッショナルとして自分もああいう風に自分の作っているものの価値基準をしっかり持ちたいものである。非常に爽やかな気持ちにさせてくれるトークであった。
ふと思ったのだが、パフォーマンス計測をテスト中によしなに測ってくれて集計してくれるツールはないものなのだろうか。
CIで勝手に測って集計してくれれば、あとでどのタイミングでパフォーマンスが悪くなったのかわかるし、めちゃくちゃ敷居下がりそうなのだが。

## [Support Library 総復習](https://speakerdeck.com/androhi/support-library-zong-fu-xi)

 Support Libarry総復習だった。

### 感想

 雰囲気でsupport library使っていたので、個人的にはめちゃくちゃためになったセッション。
こういうドキュメントみればいいんだけど、なんとなく腰が上がらなかったところをまとめてくれるのは非常に助かる。

## [What's the difference between JavaScript and Java?](https://speakerdeck.com/izumin5210/whats-the-difference-between-javascript-and-java)

  JSのフレームワークの歴史とそれをAndroid持ってきて見たよという話。

### 感想
JSの設計をAndroidに持ってくるというのは、個人的にもありだと思っていたので、reduxのandroid実装のdroiduxは正直やられた感がある。
JS周りの説明が若干雑だった気が。というかdroiduxの実装とか設計の話をもっとして欲しかったな。
イケイケの若者が喋っていた。

## Android CI: 2016 edition

 - CIと自動テストの話

### 感想

うん、まあそうだよねっていう話だった。

## [5 年続く 「はてなブックマーク」 アプリを継続開発する技術](http://www.slideshare.net/YuNobuoka/5-58454512)

 はてなブックマークをしばらく開発メンテモードだったけど、最近アクティブなっていろいろあったよっていう話。

### 感想

これも、うん、まあそうだよねっていう感じだった。
ただ、プルリクを相手がレビューしやすいようにしてるよっとか、リファクタリングと修正は分けてるよとか、しっかりやってて羨ましかった。
しばらく放置されてたアプリのメンテとか機能追加とか境遇一緒じゃんって思って励みになった。

## 全体な感想

2日目もトークも面白くて充実した時間を過ごせた。
上級者向けと初級者向けのバランス程よく取れていたと思った。
自分のような片手間アンドロイダーは、あるポイントは初心者レベルだったり、
すっかり忘れていたりするので、初級者向けトークもかなり良くていろんな角度から有用だった。

結構内容の幅があることがわかったので、Graffitiとかしっかり頑張ったらトークできそうな気がするので、短めのセッションの方に申し込んでみたいね。

帰りは生協で少しチルって、凌駕でゆずつけ麺食べてきました。

<img src="/assets/ryoga_yuzu.jpg" alt="ryoga" style="width: 400px;"/>


あと、ラー油と食べるラー油を四川で買った。

<img src="/assets/chili_oil.jpg" alt="chili_oil" style="width: 400px;"/>



以下はメモ。


-----
-----


# Design library

- CoordinatorLayout
  - 超すごいFrameLaout
- AppBarLayout
  - スクロールするとToolbarを隠す
- Collapsing
- BottomSheetBehavior (まだリリースされてない)
  - Persistent 後ろが触れる
  - Hideable
  - Modal 後ろが触れない <- BottomSheetDialogFragment


# View into the abyss
- Smart newsの人
- Supports Android 2.2 (Froyo)
  - IS03使っているらしい


- View
  - All you view is view
  - Developer settingsで可視化できる
  - Viewというものがどうやって矩形に描画するか

- View tree
  - ViewGroupとViewによる階層構造
  - Device Monitorでみれる
  - View treeは深く内容が良い
- 3steps to showing view
    - measure
      - 自分のサイズを決める
    - layout
      - 場所を決める、子供の配置
  - draw
      - 描画

- Text.setText -> requestLayout が親に伝搬 -> root(ViewRootImpl)まで -> layoutが必要というフラグが立つ
- rootからmeasureが呼ばれる -> 
  - 一つのviewに対して何回も呼ばれる
    - LinearLayoutとかが子供の結果に応じて、もう一度子供に対してmeasture呼び直す
    - measureの呼び出しが指数的に増えることがある
    - layoutは一回
- How to custom
    - onMeasure
      - 子供measureしてsetMeasuredDimension()
      - measureしなくて良くても必ず読んだ方が良い, textviewの改行位置とか
    - onLayout
      - サイズの変わる変更してはダメ
- requestLayoutは重い
  - requestLayoutを抑制するハックをsmart newsでしている

- Draw
  - Invalidの伝搬
  - onDrawでカスタマイズ
  - drawChildが子供を描画(クリッピングとかできる)
  - setWillDrawをtrue
  - SmartNewでは基本全てのViewでonDrawでカスタマイズしている
  - アニメーション最中はdrawをしない
    - 影をなくす、アンチエイリアスを切る
    - invalidate(l, t, r, b) で部分再描画
  - setLayerType(LAYER_TYPE_HARDWARE) only on transition. GLとかで一枚絵に対して加工できる
- ボトルネックを見つける
  - 本当にボトルネックならダーティなハックも許される
- Best practice: android/platform_frameworks_base

# パフォーマンスを追求したAndroidアプリを作るには

## 感想
- 計測の話が多め

## メモ

- 多角的視点
  - 電力消費
  - UI
- 計測・継続
  - 記録
  - 可視化

- 計測は未給電で
  - dumpsys battery unplug または set usb 0
- unplugの誤解
  - Doze的には未給電状態になる
  - バッテリーのステータス的には更新停止状態
  - WIFI でADB接続 -> 更新停止 -> USBでADB再接続
  - ハード的には給電されている

- 電池のゆとりは心のゆとり
  - フラッシュライト
    - 540mA
    - 2300 mAh
    - 理論上4時間

- 電流処理量を調べる
  - framwork-res.apk
    - /system/framework/framework-res.apk
  - res/xml/prower_profile.xml
    - 電力使用量申告値がわかる
    - デフォルト値0.1
- 消費電力の目安を把握しておくと良い
- dumpsys batterystats --charged
    - リアルタイムの変化
    - 日々のサマリ
    - 前回のチャージから
    - 電力消費の予想
- Battery Historian
    - go製
- 5-7割はアイドル時に消費される傾向
  - JobScheduler
  - GCM Network Manager
  - Doze Framework

- UIについて
  - パフォーマンス指標はUIに帰結し、顕在化する
  - 指標
      - 250ms以下が速い
      - 1sは利用者の集中力を保てる
- レンダリングの歴史
  - GingerBread以前 CPU
  - Honeycomb ハードウェアアクセラレーションの追加
  - ICS ハードウェアアクセラレーションのデフォルト
  - JellyBean VSYNCによるフレーム最適化
  - 60fps, 16-17msにつき一回
  - 間に合わなければJank. `Skipped 136 frames! ...`
  - フレームがスキップされる。リストがカクつくなど
- Viewのレンダリング
  - measure
  - layoust
  - draw
  - Hiearchy Viewerで可視化可能
- ネストによるRemeasure
  - Drawにもっとも時間がかかる状態が一般的
  - Measureが遅い場合は何かがおかしい
  - 原因はレイアウトのネストが多い
      - フラットにするだけで改善される
- Overdrawの回避
  - 他のViewが描画した領域を別のViewがさらに描画
- 開発者向けオプション -> GPUオーバードローをデバッグ
  - 赤っぽい画面なら改善の余地あり
- Kitkat未満では有効。Kitkat以降では、自動的に無視するので、そこまででもない。
- Hiearchy ViewerでPSDファイルに出力して確認する方法もおすすめ
- GPUのプロファイル
  - 開発者向けオプション -> GPUレンダリングのプロフィール作成
  - グラフ化されて、16msのボーダーが出る
- dumpsys gfxinfo
    - 描画情報を出力
    - MarshmallowからJankの情報が出る
    - framestats でcsv
- 通信の最適化
  - セルラー(4G, 3G)、WiFiのレイテンシーの違いで辛い
  - お手軽アプローチ
    - 良い通信ライブラリ/キャッシュ
  - AT&T ARO
    - rooted要
- メモリの最適化
  - GCの仕組みの差異
  - お手軽アプローチ
      - GC はナーバスにならない
      - メモリリークはしっかりケアする
- Heap dump
- Allocation Tracker
- LeakCanary
- onTrimMemoryで何かするというのもある

- CPU最適化
  - ANRとJankを減らす
  - dumpsys cpuinfo
  - systrace
- Trepn Power Profiler
  - Qualcommプロセッサのみ

# Support Library 総復習

## 感想


## メモ

## Support Library

- 後方互換性の確保
- 数が増えている
  - 18個
- マテリアルデザイン対応
- V series
  - API levelを意識したライブラリ
  - v4 support library
    -  >= 1.6
    - API setをいっぱい持ってる
    - Fragment, View Pager ...
    - Dralwer
    - SwipeRefreshLayout
    - NestedScrollView
      - used in design support library
    - *Compat class
      - NotificationCompat, ...
  - v7 support library
    -  >= 2.1
    - 機能ごとに分かれている
    - v7-appcompat
      - depend on v4-support
      - material design
    - v7-recycleview
      - ListView のViewHolder pattern の置き換え
      - LayoutManager, ItemDecoration,...
    - v7-cardview
      - cardviewはカード
    - v7-gridlayout
      - グリッドレイアウトが簡単に実装できる
    - v7-palette
        - カラーパレット
    - v7-mediarouter
        - chromecast用?
  - v8 support library
    - >= 2.2
    - RenderScriptサポート用
        - High-speed drawing processing using GPU
  - v13 support library
    - v4でよければいらない？
    - min sdkによる
  - v14 support library
    - これもいらない?。min sdkによる
  - v17
    - android tv用
  - v17 leanback library
    - android tv用
  - multi dex support
    - minSdkが21より小さいとビルドが遅くなる
    - debugビルドだけ21にすると良い
  - Annotations support library
      - @NotNull
      - resourceId: @StringRes, @LayoutRes
      - enum: @IntDef, @StringDef
      - thread: @MainThread, @WorkerThread
  - Design support library
    - viewコンポーネントだけでなくlayoutパターンも
    - コンテナと中身が連動して動く
  - Custom tabs support library
    - アプリの中でchromeの機能を使えるようになる
    - UI customization
    - pre-fetchができる
  - Percent support library
    - レイアウトをpercent指定できる
  - Recommendation support library for tv
    - android tv 用
    - おすすめのコンテンツの画面を作るよう


# What's the difference between JavaScript and Java?

## 感想
JSの設計をAndroidに持ってくるというのは、個人的にもありだと思っていたので、droiduxは正直やられた感がある。
JS周りの説明が若干雑だった気が。というかdroiduxの実装とか設計をもっとすればよかったと思った。

## メモ

- JavaScriptは進化が激しい
- 「16秒に1つライブラリができている」という人もいる
- JavaScript front endとandroid も作ろうしているアプリは似ている

- JSの歴史
  - prototype.js + jQuery 時代
  - RIA
  - SPA
- Application architecture
  - readability
  - maintainability
  - testability
  - MVW
    - MVC
    - MVVM
    - MVP
  - Flux
  - Redux
  - android でreduxするためにDroiduxを作った
  - Java
    - annotation processing
    - strong typing
  - JavaScript
    - duck typing
    - first-class function
  - viewの更新はData bindingを使って解決
  - Clean Architecture

# Android CI: 2016 edition

## 感想

## メモ

- Android テストの分類
- テスト自動化のプランニング
- CIのプランニング
- CIのパターン

- 自動テスト/CI どこを取るか、捨てるか、一種の価値判断
- 技術的制約、人的リソース、時間的制約 ...
- V字開発フローの中で
  - 単体テスト：Unit Test, instrumentation Test
  - 結合テスト：Instrumentation Test
  - システム・受け入れテスト：End to end Test
  - 探索的テスト(手動)

- Unit test
  - app/src/test ディレクトリ
  - JVM/JUnit4ベース
  - 高速
  - Android SDK依存の部分はテストできない
- Instrumentation Test
  - Android SDK依存もテストできる
  - mockできる
- End-to-end Test
  - ビルド済みのAPKに対する操作テスト
  - Productionサーバにつなぐかどうかとか？

- JUnit, Mockito, Robolectric, Espresso, UI Automator, Appium
- Robolectric
  - Unit test用Android SDK shim
  - 部分的には有用
  - 端末結合度が高いものは微妙
- Mockito
  - モックライブラリ
  - SpyとStubの違い
- Espresso
  - Instrumentation Testの高レベルのラッパー
  - 非同期なActivityのテストが同期的に
  - matcherが独特
  - testing support libraryの一部
- UI Automator
  - testing support libraryの一部
- Appium
    - selenium互換
    - テストコードがいろんな言語でかける

- テスト自動化のセオリー
 - Unit > Instrumentation > End-to-end の順で速度
- テストをどう自動化するか
  - 稼働中の場合： End-to-end, instrumentationから
  - 新規開発の場合: testabilityの高い設計をしてunit testから
- どこまでテストかくか？
  - End-to-endでハッピーパスだけ
  - 「安心するまでテストを書く」

- CIのプランニング
  - Jenkins
    - 全部いけるけど、構築コスト高
  - コンテナベース CI
    - JVMベーステストは問題ないが、実機テストは辛い
  - Device farm (DFaaS)
    - 実機テストが可能
    - 独自テストDSLの場合もある
  - STF
    - リモートで接続
- CIを全体としたテスト
  - 端末状態がかわらないように
  - 端末ロックの解除とか
- CIパターン
  - jenkins + 実機
- Jenkins + STF + 実機接続
- コンテナベース + DFaaS



# 5 年続く 「はてなブックマーク」 アプリを継続開発する技術
## 感想
## メモ
###  Android アプリ５周年
- 2011-02-04 API level 4+対応
- コードがレガシー
- CI・テスト
  - gradleでテストが書きやすくなった
    - Testing concepts
    - AndroidJUnitRunner, Espresso
  - テスト用のビルドタイプ
    - Build config, pro guard
  - 目的を意識してテストをかく
    - 各API levelで問題なく動くか？
    - ...
- テストを自動で実行する
    - Jenkins
    - Android SDK
    - sdk-manager-plugin
- 結果のフィードバック
- リリースフローを自動化
  - Githubにリリースを作るところまで自動化
- 開発フロー
  - git flow
  - コートレビュー
  - レビューされやすいように依頼側も気をつける
  - リファクタリングと機能追加は分ける。ブランチから分ける
    - 混ざるとレビューできない
    - 不必要なリファクタリングは行わない
  - preview版(product flavor)でのみ機能を有効
- 複雑な処理をライブラリに
