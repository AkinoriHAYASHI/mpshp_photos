// 画像検索を行う関数
function photo_search ( param ) {
    // APIリクエストパラメタの設定
    param.api_key  = '2266e2e11e20e86966e578c40a40ea60';
    param.method   = 'flickr.photosets.getPhotos';
    param.name='value';
    param.photoset_id='72157652489085310';
    param.extras='date_taken';
    param.per_page = 10;
    param.sort     = 'date-posted-desc';
    param.format   = 'json';
    param.jsoncallback = 'jsonFlickrApi';

    // APIリクエストURLの生成(GETメソッド)
    var url = 'http://www.flickr.com/services/rest/?'+
               obj2query( param );

    // script 要素の発行
    var script  = document.createElement( 'script' );
    script.type = 'text/javascript';
    script.src  = url;
    document.body.appendChild( script );
};

// 現在の表示内容をクリアする
function remove_children ( id ) {
    var div = document.getElementById( id );
    while ( div.firstChild ) { 
        div.removeChild( div.lastChild );
    }
};

// オブジェクトからクエリー文字列を生成する関数
function obj2query ( obj ) {
    var list = [];
    for( var key in obj ) {
        var k = encodeURIComponent(key);
        var v = encodeURIComponent(obj[key]);
        list[list.length] = k+'='+v;
    }
    var query = list.join( '&' );
    return query;
}

// Flickr検索終了後のコールバック関数
function jsonFlickrApi ( data ) {
    // データが取得できているかチェック
    if ( ! data ) return;
    if ( ! data.photoset ) return;
    var list = data.photoset.photo;
    if ( ! list ) return;
    if ( ! list.length ) return;

    // 現在の表示内容（Loading...）をクリアする
    remove_children( 'photos_here' );

    // 各画像を表示する
    var div = document.getElementById( 'photos_here' );
    for( var i=0; i<list.length; i++ ) {
        var photo = list[i];

        // a 要素の生成
        var atag = document.createElement( 'a' );
        atag.href = 'http://www.flickr.com/photos/'+
                    photo.owner+'/'+photo.id+'/';

        // img 要素の生成
        var img = document.createElement( 'img' );

        // 画像のURLの作成
        // 最後の文字列によって異なるサイズの画像が取得できる
        // '_s.jpg' : サムネイル
        // '_z.jpg' : 通常サイズ
        img.src = 'http://c1.staticflickr.com/'+ photo.farm +
                  '/' + photo.server + 
                  '/' + photo.id+'_'+photo.secret+'_z.jpg';
        img.style.border = '0';
        atag.appendChild( img );
        div.appendChild( atag );
    }
}
