# 共同作業開始手順
1. **cd hoge** で作業ディレクトリに移動
2. **git init** でgitの初期設定
3. **git remote add origin hoge** sshパスでリモートリポジトリを登録
4. **git remote -v** で登録された内容を確認
5. **git pull hoge** sshパス ブランチ（main）でファイルを複製
6. **.gitignore** ファイルをルートに作成してimageディレクトリなど構築に不要なディレクトリ、またはファイルをgitに登録させないようにする
7. 開発環境の情報（Googleドライブに入ってるドキュメント）をREADME.mdに追記する


# gulpの設定ファイル関係を入れていきます
## gulp実行コマンド
- **yarn gulp dev** （サーバーを起動してリアルタイムで修正内容を更新する）停止するときは、Ctrl+Cを叩いた後にy
- **yarn gulp images** （src内の画像を圧縮して上のディレクトリに吐き出す）
- **yarn gulp compress** （src内のjsファイルを圧縮して上のディレクトリに吐き出す）


# nodist関連
- **nodist -v** nodistバージョン確認


# node関連
- **nodist + 12.17.0** バージョンインストール
- **nodist global 10.14.1** バージョン変更
- **node -v** バージョン確認
- **nodist - 10.14.1** バージョン削除


# npm関連
- **npm -v** npmバージョン確認 nodistでnpmがアップデートできなくなった時の解決方法( https://webtechdays.com/?p=486 )
- **nodist npm global match** バージョン一致させる
- **nodist npm 6.14.4** バージョン変更（nodeと対応するバージョンじゃないと動かない https://nodejs.org/ja/download/releases/ )


# Webpack関連
https://www.webdesignleaves.com/pr/jquery/webpack_basic_01.html  


# SEOチェックツール
https://wacul-ai.com/blog/seo/seotool/


# 初期設定
## …or create a new repository on the command line
- echo "# gulp" >> README.md
- it init
- git add README.md
- git commit -m "first commit"
- git branch -M main
- git remote add origin git@github.com:noveltyinc-jp/gulp.git
- git push -u origin main

## …or push an existing repository from the command line
- git remote add origin git@github.com:noveltyinc-jp/gulp.git
- git branch -M main
- git push -u origin main

## …or import code from another repository
- You can initialize this repository with code from a Subversion, Mercurial, or TFS project.


# メモ
## マークダウン記法 一覧表・チートシート
https://qiita.com/kamorits/items/6f342da395ad57468ae3

## gitのブランチ作成〜リモートへの登録
https://qiita.com/shungo_m/items/4bbcbcbd3d7aea40b21e

## ブランチ関連のコマンド
- **git branch** 今のブランチを確認
- **git checkout hoge** ブランチをhogeに切り替え
- **git status** 現在の状態を確認

## アド関連のコマンド

## コミット関連のコマンド
- **git reset --soft HEAD^** コミットの取り消し
- **git reset --hard HEAD^** コミットの取り消し修正内容まで戻す

## マージ関連のコマンド
- **git merge hoge** マージしたいブランチに移動してから、マージ先のブランチをhogeに指定
- **git push origin hoge** マージ後にリモートにマージ内容をプッシュする

## プッシュ関連のコマンド
- git add .
- git commit -m "hoge"
- git push origin branch-name

## プル関連のコマンド


# 開発環境系
## Gulp + Webpack + Babel 概念を理解
https://qiita.com/bakira/items/3c4e2d10aae085767817

## Gulp + Webpack + Babel 環境構築
https://qiita.com/KoichiSugimoto/items/d8a5563f197682dea0f4


# Nuxt.js関連
## Nuxt.jsを勉強する前の事前知識
- https://qiita.com/newt0/items/763b0c228a8451c68865
## インストールオプション解説
- https://amg-solution.jp/blog/22243
## ファイル構成まとめ
- https://b1tblog.com/2019/12/16/nuxt-first/
## エラー解消
- **node_modules/.bin/eslint --fix --ext .js,.vue --ignore-path .gitignore .** デフォでprettier/prettierエラーが表示される場合( https://qiita.com/ryosukes/items/1d2d2f2be9fa46c50f85 )
- **yarn run lint --fix** https://qiita.com/bellx2/items/9ff80594d57ff36fa0b1
- eslintとpritterが競合してるっぽいけどようわからん https://stackoverflow.com/questions/53516594/why-do-i-keep-getting-delete-cr-prettier-prettier

# JavaScript勉強
## 最初になんとなく理解しておくといい言葉（一通り理解出来ていれば大抵のソースコードが読めるようになる筈）
### 初級
- **プロパティ**（値）
- **関数**（一連の処理を行う）
- **コールバック関数**（関数が実行中に、実行される関数 = コールバック関数）
- **ホイスティング**（変数や関数の定義をコードが実行される前にメモリに配置すること）
### 中級
- **メソッド**（オブジェクトの中に定義されている関数の事、メソッドの呼び出し方 オブジェクト.メソッドのプロパティ()）
- **オブジェクト指向**（概念）
- **プリミティブ**（数値・文字列・論理値・null・undefined）
- **オブジェクト**（ほとんどのものがオブジェクト、配列、new で呼び出されるもの、var hoge = function() {} とかもオブジェクト）
### 上級
- **クラス**（型、オブジェクトをつくるための仕様書みたいなもの）
- **コンストラクタ**（関数（クラスと同義）、インスタンスを作成するための関数）
- **インスタンス**（実態、コンストラクタを基にして場面で出力するオブジェクト）
- **プロトタイプ**（プロトタイプ（親）インスタンス（子）に継承することが出来るもの、汎用的な関数はprototypeに定義）

## メソッドとは？
https://www.sejuku.net/blog/24962

## 【JavaScript】ホイスティングとは？
https://qiita.com/TakanoriOkawa/items/ab51d9bf33cbd2f82501

## オブジェクト指向とは？
https://eng-entrance.com/what-oop

## プリミティブ型とオブジェクト型
https://qiita.com/makotoo2/items/9566cebf205ef8b42505

## JavaScriptにおけるクラスとインスタンス
https://hacknote.jp/archives/42689/

## JavaScriptのクラス（class）を理解する
https://techplay.jp/column/482

## コンストラクターとは？
https://note.affi-sapo-sv.com/js-constructor.php

## プロトタイプについて
https://www.sejuku.net/blog/47722

## JavaScriptのthisについて
https://www.sejuku.net/blog/29389  
https://qiita.com/takeharu/items/9935ce476a17d6258e27  
https://qiita.com/takkyun/items/c6e2f2cf25327299cf03  


# プラグイン
- All In One SEO Pack
- Contact Form 7
- Contact Form 7 add confirm
- Flamingo
- Duplicate Post
- WP Total Hacks
- PS Auto Sitemap
- TinyMCE Advanced
- Google XML Sitemaps
- WP Maintenance Mode
- Enable Media Replace
- What The File
- Login rebuilder
- EWWW Image Optimizer
- WP Admin UI Customize