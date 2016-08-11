//array: set array to paginate through
//perPage: set how many items to display perPage
//paginateElement: set where items will be appended to

function Pagination(array,perPage,paginateElement){
	this.array = array;
	this.perPage = perPage;
	this.numOfPages = 1;
	this.currentPage = 1;
	this.totalPages = Math.ceil(this.array.length / this.perPage);
	
	this.paginateElement = paginateElement;
	
}

//init method used as a shortcut for calling both list and generate button method
Pagination.prototype.init = function(listOptions,buttonOptions){
	this.list(listOptions);
	this.generateButtons(buttonOptions);
	
}

//method used to list items on a page.
//function takes an object as an argument Pagination.list{[optional]array: array of content to list , [optional]appendTo: element to append list to}
Pagination.prototype.list = function(options){
	//if options is not an object, create object
	options = (typeof options === 'object')? options: {};
	
	//if array is not set default to this.array
	options.array = (typeof options.array === 'undefined')? this.array : options.array;
	
	//if appendTo is not set, default to this.paginateElement
	options.appendTo = (typeof options.appendTo === 'undefined')? this.paginateElement : options.appendTo;
	
	//change this.paginateElement to whatever was specified in options.appendTo for future use
	this.paginateElement = options.appendTo;
	
	//remove any children of element we want to append to 
	options['appendTo'].innerHTML = '';
	
	//if currentPage === 1 start itterating through array at 0
	//else find proper starting point for itteration
	if(this.currentPage === 1){
		var start = 0;
	}else{
		var start = (this.perPage * this.currentPage) - this.perPage;
	}
	//itterate until we meet required items per page
	var count = 1;
	while(count <= this.perPage){
		
		//first check to see if next item exists in array
		//if not stop while loop
		if(typeof options.array[start] === 'undefined'){
			break;
		}
		
		//append item to element specified in options.appendTo
		options['appendTo'].appendChild(options.array[start]);
		start++;
		count++;
	}
}

Pagination.prototype.changePage = function( page ){
	this.currentPage = page;
}

//method used to create pagination buttons takes arguments
//{appendTo: element, array: array we are checking for pagination, actOnElement: Element to append content to on button press}
Pagination.prototype.generateButtons = function(options){
	options = (typeof options === 'object')? options: {};
	options.appendTo = options.appendTo
	options.array = (typeof options.array === 'undefined')? this.array : options.array;
	options.actOnElement = this.paginateElement;
	
	//create buttons only this.totalPages is greater than 1
	if(this.totalPages > 1){
		var _this = this;
		//create ul to be container for pagination buttons
		var pagination = document.createElement('ul');
		pagination.classList.add('pagination');
		
		//variable used as data attribute for pagination buttons
		var page = 1;
		var count = 1;
		
		while(count <= this.totalPages){
			//create button and append it to containing ul
			var li = document.createElement('li');
			var a = document.createElement('a');
			var aText = document.createTextNode(page);
			li.setAttribute('data-page', page);
			a.setAttribute('href','#');
			a.appendChild(aText);
			li.appendChild(a);
			
			//when buttons are first generated set active class to a element
			if(page === 1){
				a.classList.add('active');
			}
			
			//add eventListener that changes active class to clicked list items
			//and removes it from siblings
			li.addEventListener('click',function(e){
				e.preventDefault();
				for(var i = 0; i < this.parentNode.childNodes.length; i++){
					var childa = this.parentNode.childNodes[i].querySelector('a');
					childa.classList.remove('active');
				}
				this.querySelector('a').classList.add('active');
				
				//onclick change this.currentPage to value held in data-page attribute
				_this.changePage(parseInt(this.getAttribute('data-page')));
				
				//list elements based on current page
				_this.list({
					array: options.array,
					appendTo: options.actOnElement
				});
			});
			pagination.appendChild(li);
			count++;
			page++;
		}
		
		options['appendTo'].appendChild(pagination);
	}
	
}
