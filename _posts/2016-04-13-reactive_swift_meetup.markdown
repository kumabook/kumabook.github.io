---
layout: post
title:  Reactive Swift Meetup に行ってきた
date:   2016-04-13 19:06:27 +0900
categories: programming, swift
---

 今週は [Reactive Swift Meetup](http://wantedly.connpass.com/event/29039/) に行ってきました。
 Reactive系のライブラリ最近流行ってるけど、みんなどんな感じで使っているか情報共有しようという会。
 登壇者は全部で9人で、RxSwift, ReactiveCocoa, SwiftBond がReactive系ライブラリとReSwift, SwiftFluxなどのFlux系の話もあった。

## 感想

- 僕はReactiveCocoaをメインで使っていたが、RxSwiftも流行っていて、
これからRxSwiftとReactiveCocoaをどっちを使おうかを最近悩んでいたが、
違いを説明してくれているトークがあって、ReactiveCocoaやっぱいいなという結論が自分の中で出たのでよかった。
- SwiftでFlux・Reduxする系の話もあったが、two-way bindingをしないようにして、Observable(イベント通知)をグローバル or シングルトンで行うようにしたりすれば、割とそれっぽく出るのかなと感じた。
[Delta](https://github.com/thoughtbot/Delta)はそういうものかもしれない。試してみたい。


## キーノート

 Reactive系ライブラリが流行ってきた背景、どういうライブラリが出てきたか、全体の歴史の振り返り。

- 基本的なReactiveのコンセプト
  - 時間とともに変更する値、イベントをどう処理するか
- obj-c時代はKVO, NSNotificationCenterを使っていた
- Swift時代: NSObject なくなって、KVOがなくなる
  - FRPライブラリ
  - Promiseライブラリの乱立
- Swiftででは参照型より値型、Imuutableが良しとされるがグローバルな状態がどうして出てくる
  - 一方、Webフロントエンド: Flux, Reduxで状態をグローバルに持って状態管理をシンプルにしようと試みもある
  - Flux, ReduxのSwift port の登場
    - SwiftFlux
    - ReSwift

## [SwiftBond MVVM:SwiftBondとMVVMで 状態管理をシンプルにしよう](https://speakerdeck.com/susieyy/swiftbondtomvvmde-zhuang-tai-guan-li-wosinpurunisiyou)

 主催者の人。[SwiftBond](https://github.com/SwiftBond/Bond)はシンプルなdata bindingライブラリでシンプルでいい、SyncでのMVVMの例。

- 背景
  - 非同期処理の多発
    - パフォーマンス向上のため
    - 通信のため
- MVVM
  - AngularJS がよかった
  - ViewとViewModelで責務と関心事の分離
    - Viewはデータがどう生成されるかは関知しない
    - ViewModelはどう表示されるかは関知しない
- SwiftBond
  - bindingフレームワーク + α
  - ミニマム
    - シンプルに使える
    - 理解することがシンプル
- UIStack
  - 一つの画面の中で状態が変わる
  - 状態に応じた画面の変化 (ViewStateBinding)
    - MVVM, ViewDataBinding, View
- 実例... (割愛)
- まとめ
  - 複数の状態をfunctionで宣言的に記述する
  - 振る舞いをFRPで記述すると副作用を考慮する必要がなくなり、挙動を把握しやすい
  - SwiftBondはシンプル!

## [ReactiveCocoa 入門](https://speakerdeck.com/nirma/reactivecocoa-4-dot-1ru-men)

[Swift Evolution SE-0053](https://github.com/apple/swift-evolution/blob/master/proposals/0053-remove-let-from-function-parameters.md)が採用されたらしい。素晴らしい。


Reactive Cocoaの入門。基本的なclassやstructの解説。
Reactive Cocoaは自分も推しライブラリなので、内容的にはだいたい全部知ってることだったが、わかりやすくて良い復習になった。

- FRPのメリットは?
  - コードノイズが減らせる
  - @IBAction, NSNotification, callback/delegateパターンより、シンプル
- Reactive Cocoa とRxの違い
  - Naming convention
    - Hot Observable -> Signal, Cold Observable -> SignalProducer
  - Cocoa 専用API拡張
  - よりシンプルな設計
  - etc (後述するReactive Cocoa 4.1入門で詳しく説明してくれている)

- Event: イベントストリーム
  - UI コントロール
  - API リクエスト
  - DB READ / WRITE
  - NSNotificationCenter (なんでも)
  - RAC marbles
- Signal
  - GenreratorTypeと同じように再利用できない
- SignalProcuder
  - Signalのファクトリー
  - 購読しない限り、処理は開始されない

## [カッコ悪くリアクティブじゃダメですか？](https://speakerdeck.com/tokorom/katukoe-kuriakuteibuziyadamedesuka)

- みなさんはどちら？
  - お仕事では、既存プロジェクトのバージョンアップがメイン？
  - 半年に一回くらい新規プロジェクトにゼロから携われる幸せ者？
- バージョンアップ時にリアクティブプログラミング用ライブラリ及びRxSwiftを導入した
- KVOをobserve
  - これはリアクティブ？→役に立つから良い？
    - バグが減った
    - 実装が楽になった
- 例:
  - 散らばる❤️問題(複数の画面を変更されたら更新)
  - 通信接続復活さん問題: 通信復活をObservableにして一元管理
- 失敗したところ
  - 勝手に更新ちゃん問題
    - バインディングをミスっただけ
    - プロアクティブ -> リアクティブならではの不具合
    - プロアクティブの方がバグは多い
  - スクロールかっくん問題
  - 更新の多いものにバインディングを張ると遅くなることがある
- 所感:
  - 実装がシンプルに
  - 不具合が50%以上減っている
  - 今後も使いたい
- 蛇足：
  - KVOは今後も有用?
    - いい所
      - 標準で使える
      - パフォーマンスがよく、省メモリ
    - 悪い所
      - keyPath誤りを発見できない
      - 実行時Exception
  - sendAction (Responder Chain)
    - View, ViewControllerの階層にしたがって伝搬する
    - 他手段で代替は難しい
    - インタフェースが古い
    - 決まった引数のメソッドしか通知を受けれない
      - 特定のオブジェクトを渡しづらい

## [Fluxで複雑な状態の変化を予測可能にするiOSアプリ開発](https://speakerdeck.com/yonekawa/fluxdefu-za-nazhuang-tai-falsebian-hua-woyu-ce-ke-neng-nisuruiosapurikai-fa)

- もともとの課題
  - Viewの状態管理が複雑
  - モデルの関連、依存関係が複雑
  - 画面が相互に関連しあう画面遷移の複雑さ
  - ReactiveCocoaでViewModelを作ってMVVMして対応している
  - 現状の課題:
    - イベントによる状態の変化を管理できなくなってきた
      - ViewModelとの双方向バインディングによる依存関係の予測のし辛さ
      - 状態の管理とモデルの操作とドメインロジックが密結合
    - どこで誰によって何が変わって今どうなっているのかが追いかけにくい
- Webフロントエンドでは
  - 2way-bindingよりFlux(単方向フロー)へ
- SwiftFlux
  - ViewController と1:1でStore
  - グローバルなStoreを別途用意
  - API リクエストは ActionCreator,結果をpayloadとしてStoreへ渡す
  - DB(Realm)への保存はアプリケーションの状態変化とみなし、グローバルなStoreで行う
  - ライブラリ化したのがSwiftFlux
- メリット
  - 見通しがよくなる
    - Viewは常にStoreから構築、Viewの状態が明示的
  - Storeを更新するのはStore自身, Actionが発行されたかを追うだけで良い
  - APIリクエスト等の状態を変えうるロジックと状態管理を明確に分けられる
- デメリット・課題
  - Viewの差分更新
    - 差分更新がないとコスト大、だが気をつけないと状態を作ってしまう
  - コード量は増える
    - 状態を変えるためにActionとStoreが必要などなど
    - 仕方ない
  - エラー処理
    - エラーも状態の一つとして扱う
  - アニメーション
    - Reactでも状態管理の対象外としている様子

- Redux
  - アプリケーションの状態は１つ: Single state tree
  - 見通しが良い
  - Undo/Redo
  - Reducerは純粋
  - ReSwift
- Redux or Flux?
  - Fluxはシンプルなので、既存アプリにも入れやすい


## [Getting Started with Reactive Cocoa v4.1.0](https://speakerdeck.com/inamiy/getting-started-with-reactivecocoa-v4-dot-1-0)
ReactKitの作者。だけど、最近はReactiveCocoa触ったり、ソースを読んでるらしい。個人的な本日のベストアクト。
RACの設計は美しいらしい。RxSwiftとどこが違ってどこが美しいかを説明されていた。
try! swift の時もこの人のトークはストロングスタイルで生で聞いてると痺れる

- SignalとSignalProducer
  - 2つの型いるのか？
    - Signalはブロードキャスト
    - SignalProdocuerはクローニング
  - Signal -> Signal -> Event
  - Signal: observers のコンテナ
    - (Signal, Observer) = Subject = pipe
  - SignalProducer: start Handlerのコンテナ
    - .buffer = pair of (SignalProducer, Observer) = ReplaySubject
  - RACはSignalとSignalProducerを明確に分けている、そこが素晴らしい
    - 振る舞いが違うものを明確分けているところが良い。
    - Define types based on its behavior (as simple as possible)
- ConnectableObservableを気にしなくて
  - Typed error
    - Result<T, E> (not Result<T>)
    - no mixed error type: コンパイル時にエラーを型付けして、どういうエラーになるか決める
    - エラーしないものにはNoError
- Compared to other FRPs
  - protocol oriented (no abstract classes & subclassing)
  - Separation of Signal and SignalProducer
  - Typed errors
## [RxSwift + MVVM](https://speakerdeck.com/ishkawa/rxswift-plus-mvvm)

 progmaticな発表だった。GlobalObservables的な設定がFlux, Reduxっぽくてこの辺がFRPとFluxの合流地点だろうと思う。
 GlobalObservablesという名前はアリありなんだろうか？AppXXXとかそれっぽいのがありそうではある。

  - MVVM: レイヤーの切り分けが良い感じ
    - 切り分け
      - View, View <-> ViewModel: 変わり安い
      - ViewModel, ViewModel <-> Model: データの操作は変わりにくい
    - View: データの反映が自動的: Observable
      - Likeフラグ: Observable<Bool>
      - UIイベント：Observable<Void>
        - 一度ストリーム繋げば、反映は自動
        - 頻繁に更新されてもコストが低いのでOK
    - ViewModel: 実装コストが高いが変更されにくい
        - 状態変更は画面間で共有
        - グローバルなものはグローバルで表わそう: GlobalObservables
        - Subject<T>: Observable<T>でありObserver<T>である
        - どこからでも変更を流せる、どこからでも変更を購読できる

## [ReSwiftでアプリの状態管理](https://speakerdeck.com/ninjinkun/reactive-swift-meetup)

- 課題:
  - クラッシュレポートきてるけど、ユーザの環境・状態再現できない
  - ログイン状態を意識しながらコード書くのがしんどい
  - 起動フローが複雑
- モチベーション
   - 複雑な内部状態を管理したい
   - すべての操作をActionで記述したい
- ReSwift
  - ReduxのSwift実装
  - ReduxはFluxの一実装
- RIDE(バイクのフリマアプリ)
  - AppStateにすべての状態を入れる
- なぜReSwift
  - 小さい概念と実装で大きな問題を解決
- メリット
  - 状態とUIが分離
  - 内部状態の変更が透明
  - 変更がすべてが追跡できる
- デメリット
  - 実装が増える、でも悩む余地はない
  - エラー処理でStateが増える
  - UITableViewとの相性
    - 差分更新がない
    - 差分を検知して一行ずつ反映する仕組みを作った

## [Carthage and ReactiveCocoa](https://speakerdeck.com/ikesyo/carthage-and-reactivecocoa)

 ReactiveCocoaの歴史とCarthageの中でどう使われ、ドックフードされてきたか。cuiならではの処理が多くて面白かった。

  - RACの歴史
    - RACは2012にスタート
    - 旧v3.0はSwiftが出てきてそのままClose
    - ReactiveCocoa swift版は昔はRxSwift
    - その後 v3.0としてリリース
  - CarthageでのReactiveCocoaの利用
    - 非同期処理の定型化
      - 非同期処理のチェーン
        - Callback hell
        - flatMap
        - flatten
    - 同期的API
      - テスト、CLIプログラミング
      - RxSwift: RxBlocking
      - SignalProducer#first(), single(), last(), wait()
    - 同期処理のラップ
      - 結果のハンドリングも非同期処理と共通化
      - 同期と非同期を意識しない
      - 非同期処理との合成
      - wait(). firat() などで待つ
    - 型付けされたエラー
      - RAC: Atomic, MutablePropertyを除いてthrowsは使っていない
      - Carthageはthrowsを使っていない
      - NoError
  - Delta
    - State管理をRxSwift, RACを使って行うライブラリ
