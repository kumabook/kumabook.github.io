---
layout: post
title: "Count elememts with JavaScript"
date: 2014-04-07 22:45:22 UTC+9
categories: html, javascripts
---

Chrome developer toolとかFirebugでDOMツリーの内容は見れるのですが、エレメント数をさくっと集計することはできなそうだったので、JSで実装しました。

JavaScriptコンソールにコピペして、

DOMTreeUtil.countTags(document.body);

などとすれば、引数のDOM要素以下をタグ名ごとに集計されます。
firefox addonとかchrome extensionとか探せばありそうだったな。

gist を埋め込んでみましたが、
jekllyだとさくっと埋め込めるんですね。すばらしい。

{{"{% gist 10124893 count_elements.js %"}}}

と書くと良いらしい。
あとliquidのエスケープがイミフすぎる。上の一行を出すのに30分はまった。

{% gist 10124893 count_elements.js %}
