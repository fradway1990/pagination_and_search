//initialize variables to reference key elements on page
var studentUl = document.getElementsByClassName('student-list')[0];
var students = document.querySelectorAll('.student-list > li');
var header = document.querySelector('.page-header');
var page = document.querySelector('.page');

//create an initial Pagination object to paginate students when user first visits the
//site
var paginate = new Pagination(students,8,studentUl);
paginate.init({
	array: students
	},{
	appendTo: page,
	array: students
	});


//create a search instance and append it to the header of the page	
var search = new Search(students,'searchbar','search-form');
var searchForm = search.toHTML();
header.appendChild(searchForm);


//this function handles the search
function handleSearch(){
	//first delete any pagination buttons on page
	var paginationButtons = document.getElementsByClassName('pagination');
	for(var i = 0; i < paginationButtons.length; i++){
		paginationButtons[i].parentNode.removeChild(paginationButtons[i]);
	}
	//execute search of the search.content and store in results variable
	var results = search.searchTerm('h3');
	
	// create a new pagination instance that will repaginate with given results
	var searchPaginate = new Pagination(results,8,studentUl);
	searchPaginate.init({
		array: results
	},
	{
		appendTo: page,
		array:results
	}
	);
	
}

//when the searchform's button is clicked run handleSearch()
searchForm.querySelector('button').onclick = function(e){
	e.preventDefault();
	handleSearch();
}

//when the user presses a key while focused on searchform's input run handleSearch()
//after 300ms timeout
searchForm.querySelector('input').onkeyup = function(){
	search.value = this.value;
	setTimeout(
	function(){handleSearch();},
	300
	);
}