---
layout: post
title:  "phoenix deploy on heroku"
date:   2016-10-12 01:28:30 +0900
categories: programming, elixir, phoenix
---


しばらくelixir phoenixを勉強しようかと思います。
まずは

- elixir・phonixの環境構築
- phoenix でプロジェクトを作る
- テーブル一個作って、CRUDする
- heroku上にデプロイする

というところまでやっていきたいと思います。

### elixir・phonixの環境構築

kerlとかexenvとかもありますが、同期の通称perfect human(僕が勝手に呼んでいる、以下PH)がお勧めしていた[asdf]()を使います。
インストールの仕方はさらにその愛弟子のperfect child(以下PC)が最高にわかりやすくまとめてくれています。

http://qiita.com/ymtszw/items/28cc7a000236510b71c2


```shell
asdf plugin-add erlang https://github.com/asdf-vm/asdf-erlang.git
asdf plugin-add elixir https://github.com/asdf-vm/asdf-elixir.git
asdf install erlang 19.1
asdf install elixir 1.3.3
```

### phoenix でプロジェクトを作る

詳しくは公式を見るのが今後のため吉ですが、http://www.phoenixframework.org/docs/installation
以下でプロジェクトが作られます。

```
mix archive.install https://github.com/phoenixframework/archives/raw/master/phoenix_new.ez
mix phoenix.new web --no-brunch
```

posgresql, nodeも必要になるので入れます。

```shell
brew install posgresql
asdf plugin-add nodejs https://github.com/asdf-vm/asdf-nodejs
asdf install nodejs 6.7.0
```

### とりあえず起動する

```shell
cd web/
mix phoenix.server
```

よし。

### テーブルを作る

```shell
mix phoenix.gen.html Objective objectives name:string description:string frequency:integer
```

routerにresourceを追加しろと出るので以下を追加

```elixir:web/router.ex
scope "/", Web do
  pipe_through :browser # Use the default browser stack

  get "/", PageController, :index
  resources "/objectives", ObjectiveController
end
```

```shell
mix ecto.create
mix ecto.migrate
mix phoenix.server
```

http://localhost:4000/objectives

にアクセスすれば、CRUDができる。

# herokuにデプロイ

http://www.phoenixframework.org/docs/heroku に従えばよい。


```shell
heroku apps:create app_name
heroku config:set SECRET_KEY_BASE=$(mix phoenix.gen.secret)
heroku buildpacks:set https://github.com/gjaldon/phoenix-static-buildpack
heroku buildpacks:add --index 1 https://github.com/HashNuke/heroku-buildpack-elixir
heroku addons:create heroku-postgresql:hobby-dev
heroku config:set POOL_SIZE=18
heroku config:set SECRET_KEY_BASE="`mix phoenix.gen.secret`"
git push heroku master
heroku run mix ecto.migrate
```

次は、guardianを使った認証をやる予定。
