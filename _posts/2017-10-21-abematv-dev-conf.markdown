---
layout: post
title:  AbemaTV Developer Conference 2017に行ってきた
date:   2017-10-21 13:44:42 +0900
categories: event
---

AbemaTV Developer Conference 2017に行ってきた。

印象に残ったことを箇条書きにすると

- google cloud キテるな
- 映像系の技術別世界
- プロ意識高いチームで羨ましい
  - チームビルディング大事
- webのアーキテクチャ・TYPICAでやろうとしていることとほぼ同じそうなので、参考になりまくった
- 「作るものの目的が明確」っていうのがあるから全員が同じ方を向いてるイメージを受けた
- キャラクターかわいい

こんな感じ。以下は個人的なメモ。


## AbemaTVにおけるGoogle Cloudの活用

- アプリケーション基盤
  - GKE: コンテナ
    - GCLB
- 分析基盤
  - BigQuery
  - PubSub dataflow

- アーキテクチャ
  - キャッシュはakamai
  - マイクロサービスをコンテナで運用

- アプリーケション基盤の選択肢
  - app engine
    - インフラは意識しない
  - container engine (GKE) = Managed kubernetes by Google
    - kubernetes
  - compute engine
    - VM: 汎用性高い
- kubernetes
  - google社内のコンテナ管理ツールvokeのオープンソース版
  - go言語
  - dockerがサポートしてデファクトになりそう

- load balancer
  - 全リージョンで1つのglobal VIP
    - DNS負荷分散が不要
  - マルチリージョン
v    - 複数リージョンにデプロイして
    - 一番近いバックエンドにルーティングされる
- CDN


## AbemaTV将棋チャンネルの配信技術 〜全国完全生中継への挑戦〜

- 生中継の仕方
  - FPU
    - ビルの上の中継地点
    - 場所に依存
    - 免許
  - 衛星を使う
    - 天候に依存
    - 高い
    - 6分で5000万
    - 免許
  - Skype
    - 簡単
  - SkypeTX
  - 4GLTE革命
  - LiveU
    - キャリアを束ねる
    - USBのsimをめっちゃさす
  - ２ヶ月前から現地に行って回線のNTT工事、電力のチェック

## AbemaTVの画質定義～ラウドネスマネージメント録画放送）

- トランスコードエンジニア
- 配信レゾリューション
- CODEC
  - コーデック：圧縮と展開
- コンテナ・拡張子
  - 映像と音の入れ物
  - 映像CODECと音声CODEC
- CPからデータ素材を買って、入稿

## トランスコード

- H.264: 10Mbps VBR
- 容量負荷を品質担保
- ハードウェア依存や追っかけ
- サラウンドからステレオへ
- 配信用の動画のバランス
  - 定量的な基準で品質を評価
  - 主観評価も重視している
- ラウドネスマネージメント
  - ラウドネス
    - 音量差をなくすための基準
  - AbemaTVの独自の基準: youtubeやnetflixにもある
  - ザッピング時やレゾリューションごと
  - ダイナミックレンジのコントロール
    - 劇場版
  - ライブ配信と録画のバランス
  - ハードウェアで対応して来ている

## AbemaTV モバイルアプリの開発体制と開発プロセスの話

- 10 人
- 全体で ５０人
- ビデオ・グロース・本質改善・TVデバイス
 - Codebase
  - ios, tvoc, api, protobuf-swift, cmdshelf-ios, etc
  - ios ... 1030, 89723 line
  - api ... 3700
- pull request 169 / month, 7~9 / month
  - 毎日開発している
- 開発フロー
  - スプリント
  - before
    - 開発を２週、QA1周
    - QAと開発の重複
  - after
    - 開発を１週、QA１週
  - モックを作る
  - 勝手に作る
  - ブランチ戦略
    - masterとqaブランチ
  - Slack活用
  - QA効率化
    - デバッグ情報メニュー
    - アクティビティーモニター
    - 保存情報
    - ユーザ区分
    - アニメーション速度
    - キャッシュ削除
    - ログなど
## デザインのBefore & After
  - グロースライン
  - ビデオライン
  - UX改善ライン
- 毎リリースに３つ
- 優先度は変わっていくもの

  - モバイルダウンロード率
    - 再生ボタンを出しつつ、騙しにならように
  - twitterからの流入

## AbemaTVにおけるモニタリング
  - mongo DB vm
  - redis CM
  - trannscoder VM
  - Stackdriver
    - マシンメトリクスなどのみ
  - Prometeus
    - kubernates
    - 性能がいい
    - PromQL
    - Exporter
    - Alertmanager

## Microservices下におけるWebの負荷対策 -SSR×SPA×PWAへ向けて-
  - 負荷対策
  - システム構成
    - サーバサイド: 2つのサーバ
      - nginx
        - assetsの配信
      - nodejs
        - grpcでデータの取得
        - HTMLをサーバサイドレンダリング
    - クライアントサイド
      - SPA として動作
        - APIを叩く
        - nativeと同じAPIを叩く(API Gaeway)
    - 障害の詳細
    - Webのサーバのリクエスト
      - スケーリング?
    - CDNを導入
      - 利点
        - パフォーマンス
        - 可溶性
      - 欠点
        - 細かい振り分け
        - キャッシュの整合性
        - キャッシュミス

## AbemaTVを支えるアプリの優しさ
  - キャッシュしようぜ
  - UI/UXをだいじに
  - ネットワーク帯域を使うな
  - ネットワーク通信を抑える

  - HLSで通信
    - 生放送の場合: MEDIA-SEQUENCEがインクリメントされて返ってくる
    - adaptive streaming

    - 縦画面・マルチウィンドウ
      - 視聴面パターンが増えた
      - ビットレートを動的に変更
        - 画質、通信回線、OS ver
- MPEG-DASHによるリニア型配信
  - HLS
    - apple が作った Http Live streaming
  - MPEG-DASH
   - ISOの標準規格
