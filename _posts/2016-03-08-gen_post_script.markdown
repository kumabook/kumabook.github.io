---
layout: post
title:  "jekyllの記事のテンプレートを作成するスクリプトを書いた"
date:   2016-03-08 20:34:03 +0900
categories: programming
---

このブログはjekyllで運用しているが、新しい記事を作成するのに、

`YEAR-MONTH-DAY-title.MARKUP`

という命名規則でファイルを作成して、先頭には

```
---
layout: post
title:  "jekyllの記事のテンプレートを作成するスクリプトを書いた"
date:   2016-03-08 20:34:03 +0900
categories: programming
---

```

を書く必要がある。
これが地味にめんどくさいので、現在の日付でテンプレートを生成するスクリプト書いた。

```
ruby gen_post.rb title tag
```

のように使う。

{% gist 2507546ff9004df76e84 %}
