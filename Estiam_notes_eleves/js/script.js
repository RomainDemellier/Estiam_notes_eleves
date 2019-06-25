/*var listeElts = document.getElementsByClassName("moyenne");

var boutonInserCell = document.getElementById('inser_cell');



boutonInserCell.addEventListener("click", function () {

	var tdElt = document.createElement("td");
	tdElt.textContent = "Test";
	var trElts = document.getElementsByTagName("tr");

	for(i = 0;i < trElts.length;i++){
		trElt = trElts[i];
		var tdElt = document.createElement("td");
		var newInput = document.createElement('input');
		newInput.setAttribute('type', 'text');
		newInput.setAttribute('class', 'note');
		if(i == 0){
			tdElt.appendChild(document.createTextNode("Note1"));
		} else {
			tdElt.appendChild(newInput);
		}
		
		var lastTdElt = trElt.childNodes[trElt.childNodes.length-2];
		trElt.insertBefore(tdElt,lastTdElt);
	}

});*/

noteElts = document.getElementsByClassName('note');

var boolean = true;


/*for(i = 0;i < noteElts.length;i++){
	var noteElt = noteElts[i];
	noteElt.addEventListener("blur", function(){

		
			var tdElt = document.createElement("td");
		tdElt.textContent = "Test";
		var trElts = document.getElementsByTagName("tr");

		for(i = 0;i < trElts.length;i++){
			trElt = trElts[i];
			var tdElt = document.createElement("td");
			var newInput = document.createElement('input');
			newInput.setAttribute('type', 'text');
			newInput.setAttribute('class', 'note');
			newInput.addEventListener("blur", function(){

			})
			if(i == 0){
				tdElt.appendChild(document.createTextNode("Note1"));
			} else {
				tdElt.appendChild(newInput);
			}
		
		var lastTdElt = trElt.childNodes[trElt.childNodes.length-2];
		trElt.insertBefore(tdElt,lastTdElt);
	
		}
	}
});*/
var classInput;
var tabEntier = ['0','1','2','3','4','5','6','7','8','9'];

function ajout_colonne(){
		
	console.log("class de la cible " + event.target.className);

	var nbreElt = document.getElementsByClassName("header_note").length;
	console.log(nbreElt);

	var divElt2;

	var cible = event.target;
	var str = event.target.className.split(' ')[0];
	var num = str.charAt(str.length-1);
	console.log(num); 


	str = event.target.value;
	if(str.length > 0){
		var queDesEntiers = true;
		//event.target.setAttribute("disabled",true);
		var attr = cible.getAttribute("class");
		for(i = 0;i < str.length;i++){
			if(!tabEntier.includes(str.charAt(i))){
				queDesEntiers = false;
				console.log(queDesEntiers);
				break;
			}
		}

		if(!queDesEntiers){
			alert("Ne rentrez que des entiers");
		} else {
			var divElt = document.createElement("div");
			divElt.setAttribute("onclick","reactive()");
			divElt.setAttribute("class","rouge");
			//divElt.setAttribute("class",attr);
			classInput = attr;
			divElt.textContent = str;
			var parentElt = event.target.parentNode;
			console.log(parentElt);
			parentElt.replaceChild(divElt,cible);
			divElt2 = divElt;
			
			console.log("num " + num + ", nbreElt " + nbreElt);
			if(num == nbreElt){

				var tdElt = document.createElement("td");
				tdElt.textContent = "Test";
				var trElts = document.getElementsByTagName("tr");

				for(i = 0;i < trElts.length;i++){
					trElt = trElts[i];
					var tdElt = document.createElement("td");
			
					if(i == 0){
						tdElt.setAttribute('class','header_note center');
						tdElt.appendChild(document.createTextNode("Note" + nbreElt++));
					} else {
						tdElt.setAttribute('class','center');
						var newInput = document.createElement('input');
						newInput.setAttribute('type', 'text');
						nbre = nbreElt;
						newInput.setAttribute('class', 'note' + nbre + ' note');

						newInput.setAttribute('onblur', 'ajout_colonne()');
						tdElt.appendChild(newInput);
					}
		
					var lastTdElt = trElt.childNodes[trElt.childNodes.length-2];
					trElt.insertBefore(tdElt,lastTdElt);
				}
			}
			if(queDesEntiers){
				moyenne(divElt);
			}
		}	
	}

}

function reactive(){

	var cible = event.target;
	var attr = cible.getAttribute("class");
	var parentElt = event.target.parentNode;

	var newInput = document.createElement('input');
	newInput.setAttribute('type', 'text');
	newInput.setAttribute('class',classInput);
	newInput.setAttribute('onblur', 'ajout_colonne()');
	newInput.value = cible.textContent;

	parentElt.replaceChild(newInput,cible);
	newInput.focus();
}

function moyenne(cible){

	var parentElt = cible.parentNode.parentNode;
	//console.log("Enfant 7 : ");
	//console.log(parentElt.childNodes[7].childNodes[1]);
	listeChild = parentElt.childNodes;
	var nbreChild = listeChild.length;

	var moyenne = 0;
	var compteur = 0

	for(i = 0;i < nbreChild ;i++){
		var child = listeChild[i];
		var nbreChild2 = child.childNodes.length;
		//console.log("Nombre de petits enfants : " + nbreChild2);
		if(child.tagName == "TD"){
			for(j = 0;j < nbreChild2;j++){
				if(child.childNodes[j].tagName == "DIV"){
					compteur++;
					moyenne += Number(child.childNodes[j].textContent);
				}
			}
		}
	}
	//console.log("nombre de DIV : " + compteur);
	moyenne = moyenne/compteur;
	moyenne*=100;
	moyenne = Math.round(moyenne);
	moyenne/=100;
	listeChild[nbreChild - 2].textContent = moyenne;
}
