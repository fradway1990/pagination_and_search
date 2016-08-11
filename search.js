//Object to handle searches
function Search(content,id,className){
	this.id = id;
	this.className = 'search-form';
	this.content = content;
	//if className is undefined keep default className else use given className
	if(typeof className === 'undefined'){
		className = this.className;
	}else{
		this.className = className;
	}
	
	//array to hold results of search
	this.results = [];
	
	//variable to hold the search input's value
	this.value;
}

//method used to generate a form field and button
Search.prototype.toHTML = function(){
	var _this = this;
	//create elements needed for search form and attributes for those elements
	var searchForm = document.createElement('form');
	var searchInput = document.createElement('input');
	var searchButton = document.createElement('button');
	
	searchForm.setAttribute('id',this.id);
	searchForm.classList.add(this.className);
	searchInput.setAttribute('type','text');
	searchInput.setAttribute('name',this.id);
	searchInput.setAttribute('placeholder','Search Students');
	searchButton.setAttribute('type','submit');
	searchButton.innerHTML = 'Search';
	
	//append children to searchForm
	searchForm.appendChild(searchInput);
	searchForm.appendChild(searchButton);
	
	//when input is typed into return input value to this.value
	searchInput.onkeyup = function(){
		_this.value = this.value;
		console.log(_this.value);
	}
	
	return searchForm;
	
}


//function used to handle search
Search.prototype.searchTerm = function(filterTag){
	var content = this.content;
	this.results =[];
	//if trim is not supported in browser
	if (!String.prototype.trim) {
		String.prototype.trim = function () {
			return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
		};
	}
	
	//search through content and append content item to results array if content matches this.value 
	for(var i = 0; i < content.length ;i++){
		var innerText = content[i].querySelector(filterTag).innerHTML.toLowerCase();
		if(innerText.indexOf(this['value'].toLowerCase()) === 0){
			this.results.push(content[i]);
		}
	}
	return this.results;
	
}