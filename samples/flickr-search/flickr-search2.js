// 画像検索を行う関数
// 使用例: photo_search ({}, new Date( 2015, 2, 14));
function photo_search ( param, date ) {
    // APIリクエストパラメタの設定
    param.api_key  = '2266e2e11e20e86966e578c40a40ea60';
    param.method   = 'flickr.photos.search';
    param.user_id='131512533@N04';
    param.extras='date_taken';
    param.format   = 'json';
    param.jsoncallback = 'jsonFlickrApi';
    param.min_taken_date = Math.round( date.getTime() / 1000 );
    var maxDate = new Date(date.getTime());    
    maxDate.setDate( maxDate.getDate() + 1 )
    param.max_taken_date = Math.round( maxDate.getTime() / 1000 );

    // APIリクエストURLの生成(GETメソッド)
    var url = 'https://api.flickr.com/services/rest/?'+
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
    if ( ! data.photos ) return;
    var list = data.photos.photo;
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

        // c1.staticflickr.com/9/8782/17526822730_8daa1a77f6_z.jpg

        // img 要素の生成
        var img = document.createElement( 'img' );
        img.src = 'http://c1.staticflickr.com/'+ photo.farm +
                  '/' + photo.server + 
                  '/' + photo.id+'_'+photo.secret+'_z.jpg';
        img.style.border = '0';
        atag.appendChild( img );
        div.appendChild( atag );
    }
}


function GetQueryString()
{
    var result = {};
    if( 1 < window.location.search.length )
    {
        // 最初の1文字 (?記号) を除いた文字列を取得する
        var query = window.location.search.substring( 1 );

        // クエリの区切り記号 (&) で文字列を配列に分割する
        var parameters = query.split( '&' );

        for( var i = 0; i < parameters.length; i++ )
        {
            // パラメータ名とパラメータ値に分割する
            var element = parameters[ i ].split( '=' );

            var paramName = decodeURIComponent( element[ 0 ] );
            var paramValue = decodeURIComponent( element[ 1 ] );

            // パラメータ名をキーとして連想配列に追加する
            result[ paramName ] = paramValue;
        }
    }
    return result;
}
