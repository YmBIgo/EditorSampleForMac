//
var got = require("got");
var jsdom = require("jsdom");
var crypto = require("crypto-js/md5");
const { JSDOM } = jsdom;

var hashed_array = []

function get_code_snippet_json(page_url, res){
	// app.js の res が必要かもしれない
	var response_result;
	var dom_result;
	console.log(page_url);
	(async () => {
		try {
			const response  = await got(page_url);
			response_result = response.body;
		} catch (error) {
			console.log(error)
		}
	})()
	.then(function(){
		dom_result = new JSDOM(response_result);
		var page_document = dom_result.window.document;
		var page_body	  = page_document.getElementsByTagName("body")[0];
		var search_result = search_dom_code_snippet(page_body);
		var search_result_json = { "search_result" : search_result }
		// res.send の コード ?
		res.send(search_result_json);
	})
}

function search_dom_code_snippet(page_document){
	//
	var search_tag_array = ["pre", "code", "textarea"];
	var search_result = []; var prev_search_content_result = {};
	hashed_array = []
	search_tag_array.forEach(function(item){
		//
		prev_search_content_result = page_document.getElementsByTagName(item);
		search_dom_code_snippet_each(prev_search_content_result, search_result)
	})
	console.log(search_result)
	return search_result
}

function search_dom_code_snippet_each(page_documents, search_result){
	for ( var i = 0; i < page_documents.length; i++ ){
		var page_document_text_original = page_documents[i].textContent;
		var page_document_text = page_documents[i].textContent;
		var page_document_text_hashed 	= crypto(page_document_text_original).toString();
		if ( hashed_array.indexOf(page_document_text_hashed) != -1 ) {
			continue
		} else {
			hashed_array.push(page_document_text_hashed)
		}
		var page_document_length = page_document_text.length;
		// "" と '' と / / と // と # を 空白に置き換え
		// 	→ プログラミング言語に 日本語入らないので
		var text_row1_regexp = /".+"/g
		page_document_text = page_document_text.replace(text_row1_regexp, "");
		var text_row2_regexp = /'.+'/g
		page_document_text = page_document_text.replace(text_row2_regexp, "");
		var text_row3_regexp = /\/.+\//g
		page_document_text = page_document_text.replace(text_row3_regexp, "");
		var text_row4_regexp = /(\/\/.+)/g
		page_document_text = page_document_text.replace(text_row4_regexp, "");
		var text_row5_regexp = /\#.+/g
		page_document_text = page_document_text.replace(text_row5_regexp, "");
		var text_row6_regexp = /`.+`/g
		page_document_text = page_document_text.replace(text_row6_regexp, "");
		// console.log(page_document_text)
		// var page_document_split_blank  	= page_document.split("\n");
		var japanese_count_match = page_document_text.match(/[\u30a0-\u30ff\u3040-\u309f\u3005-\u3006\u30e0-\u9fcf]/g)
		var japanese_count;
		if ( japanese_count_match == null ) { japanese_count = 0 } else { japanese_count = japanese_count_match.length }
		// console.log("text count : ", page_document_length, "japanese count : ", japanese_count);
		if ( japanese_count == 0 ) {
			search_result.push(page_document_text_original)
		}
		//
	}
}

// get_code_snippet("https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/String/slice")

module.exports.get_code_snippet_json = get_code_snippet_json;
