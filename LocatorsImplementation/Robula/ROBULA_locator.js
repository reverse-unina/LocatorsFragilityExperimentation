LocatorBuilders.add('Robula', function(e, opt_contextNode) {
        
	try{
	console.log("[ROBULA] **START**");		
	console.log("[ROBULA] e: ", e);
	//variables for the list of attributes
	L_attr = [];
	var attr_temp = new Map([]);
	
	//variables for ROBULA
	var current = e;
	var path = '';
	var locator0 = '';
    var L = []; //xpath absolute list 
	var robula_loc = ''; //XPath res 
	var p = ['//*']; //starting point 
	var temp = []; //array of temp locators
	var N = 0; 
	
	
	//**BEGINNING ABSOLUTE XPATH AND ATTRIBUTE LIST CONSTRUCTION**
	while (current != document){ 	
		
		attr_temp = new Map([]);
		var currentPath;
		
		currentPath = this.relativeXPathFromParent(current);		
		if(!containsNumbers(currentPath)){
			currentPath = currentPath+'[1]';
		}
		path = currentPath + path;
		var locator = '/' + path;	 //abs_path
		
		for (var i = 0, l = current.attributes.length; i < l; ++i){					
			
			//Of the single current node I save all the <Attribute,Value> pairs.
			attr_temp.set( [ current.attributes[i].name ] , [ current.attributes[i].value ] );
		}
		
		L_attr.push(attr_temp);
		current = current.parentNode;
	}

	abs_path = locator;
	console.log('[ROBULA] abs_path: ', abs_path); ////html/body/app-root/table/tr[4]/td[2]
	console.log('[ROBULA]L_attr: ', L_attr);
	//**BEGINNING ABSOLUTE XPATH AND ATTRIBUTE LIST CONSTRUCTION**
	
	console.log('[ROBULA] myFindElement: ', myFindElement(abs_path))
	
	
	
	
	//**START CONSTRUCTION ARRAY PATH L **	

	L_num = get_L_num(abs_path); 
	console.log('[ROBULA] L_num: ', L_num); //['td[2]', 'tr[4]', 'table[1]', 'app-root[1]', 'body', 'html']
	

	for(let i = 0; i< L_num.length; i++){
		if(L_num[i].match(hook_h)){
			L.push(L_num[i]);
		}else{
			L.push(L_num[i].replace(/[^a-zA-Z- ]/g, '')); //L
		}
	}
	
	//after a fix there is no longer a need to discriminate  between L and L_num
	//to avoid changing the following sections we simply set L = L_num
	L = L_num;
	console.log('[ROBULA] L: ', L); // L=["p", "div", "app-root", "body", "html"]
	//**END CONSTRUCTION ARRAY PATH L **	


	// abs=		//html/body/app-root/table/tr[4]/td[2]
	// L_num=	['td[2]', 'tr[4]', 'table[1]', 'app-root[1]', 'body', 'html']
	// L=		["td", "tr", "table","app-root", "body", "html"]
	// L_base =	['//td', '//tr/td[2]', '//table/tr[4]/td[2]', '//app-root/table[1]/tr[4]/td[2]', '//body/app-root[1]/table[1]/tr[4]/td[2]', '//html/body/app-root[1]/table[1]/tr[4]/td[2]']
	
   
	//**START LOOP ROBULA **
	//till i not found the locators
	while (robula_loc == '' && N<100000){ //N<VALUE is not part of robula it was put just to avoid infinite loops, robula should finish in few iterations
	
		console.log('[ROBULA] N: ', N);		
		console.log('[ROBULA] p: ', p); //list of temp locators
		console.log('[ROBULA] b_Len_p: ', p.length);
		console.log('[ROBULA] a_Len_p: ', p.length);
		console.log(p);
		
		w = p.shift(); //pick the element at the top (in the first iteration it is the starting point //* 
		temp = []; //array of intermediate locators generated at the current step
		console.log('[ROBULA] elem_c: ', w);
		//N = 0;
		if(w.startsWith("//*")){
		
			//trasformazione 1 // //*/td --> //tr/td
			temp.push(transf1(w,L));
		}else{
						
			//trasformazione 2 //tr/td -> //tr[@id='val']/td			
			temp.push(transf2(w,L_attr)); 
			temp = temp.flat();					
			//trasformazione 3 //tr/td -> //tr[2]/td			
			temp.push(transf3(w,L_num));
			
		}		
		//trasformazione 4  //tr/td --> //*/tr/td
		temp.push(transf4(w,L)); 
		console.log("[ROBULA] temp: ", temp);
		for(let i = 0; i<temp.length;i++){
			
			
			if(XPathResCount(temp[i]) == 1){ //If the locator is unique
				
				console.log('[ROBULA] Locatore unico: ', temp[i]);
				res = myFindElement(temp[i]);
				if(res == e){
				console.log('[ROBULA] ok sono uguali');
				robula_loc = temp[i];
				break;
				}
				//return res;
				
			}else if (XPathResCount(temp[i]) > 1 && XPathResCount(temp[i]) != 0 && !temp[i].startsWith("//*/*")) {
				
				//add in list only if the locator is not unique, does not start with //*/* and is not null/undefined
				console.log('[ROBULA] Locatore NON unico: ', temp[i]);
				if(temp[i] != null && temp[i] != undefined){
				p.push(temp[i]);
				}
			}
		}
		
		N++;
	}//**END LOOP ROBULA **
	
	
	console.log('[ROBULA] finito loop');
	console.log('[ROBULA] ROBULA_LOC: ', robula_loc);
	return robula_loc;
	}catch(error){
		
		console.log('[ROBULA] debug: ', error);
	}
		
});



function transf1(str, L){
  
	//replace the tag * with the tag of L.get(N)
	// L = [td, tr, div] -> L.get(2) = tr
	// //*/td --> //tr/td
	str = str.replace( '*', L[calcolaN(str)-1] );
	//console.log('w_replace: ', str);

  return str;
}

function transf2(str,L_attr){

	//add the predicate (one at time) of the element L.get(N)
	// to the first node in w 
	// ex. //tr/td -> //tr[@id='val']/td
	let temp = '';
	str1 = [];
	a = L_attr[calcolaN(str)-1];//individuare la Lista_attr che mi serve
	for (let k =1, v = a.size; k<v; k++){
		console.log('[ROBULA_t2] transf2');
		temp='';
		// The key at the desidered index
		var key = Array.from(a.keys())[k];  // ritorna il nome dell'attributo
		test_key = String(key);
		
		if(test_key.includes(hookPrefix) || test_key.includes(templatePrefix)){
			console.log('[ROBULA_t2] TROVATO HOOK: ', key);
			key = null;
		}
		// The value of the item at desidered index
		var val1 = a.get(key);  //ritorna il valore dell'attributo
		console.log('[ROBULA_t2] key: ', key);
		console.log('[ROBULA_t2] value', val1);
		s_attr = "[@"+key+"='"+val1+"']"; //costruisco la stringa
		console.log('[ROBULA_t2] s_attr: ', s_attr);
		b = mySlicer(str); //ritorna: in://tr/td => out:['tr','td']
		console.log('[ROBULA_t2] slicer: ', b); 
		//if(containsSpecialChar(b[0]) || key == null || key.includes('ng-') || key.includes('@ng-') || key.includes('@_ng')){
		if(containsSpecialChar(b[0])){
		console.log('[ROBULA_t2] FOUND: ', b[0], '- ', key);
			//return null;
			key = null;
		}else if(!containsSpecialChar(b[0]) && (key != null) && (val1 != null) && !test_key.includes('ng')  && !test_key.includes('style')  && !test_key.includes('href')) { //se non contiene già un attr AND se ho un attributo e un valore
		
			
			b[0]=b[0]+s_attr; // tr --> tr[@id='val']
			//console.log('b_len: ',  b.length);
			//console.log('b0 ', b[0])
			
			for(let k = 0, v = b.length; k < v; k++){
				temp+= '/'+b[k] //ricostruisco l'XPath
			}	  
			console.log('[ROBULA_t2] temp: ', temp);
			t='/'+temp;
			console.log('[ROBULA_t2] t: ', t);
			str1.push(t);
		}
		
		
	}	
	console.log('[ROBULA_t2] str1: ', str1);
	return str1;
}

function transf3(str,L_num){
	
	//adds the position of the element L.get(N)
	//to the first node in w
	// ex. //tr/td -> //tr[2]/td
	console.log('[ROBULA_t3] transf3: ',str);
	let temp = ''
	a = mySlicer(str);
	//console.log('a: ', a);
	
	if(containsNumbers(L_num[calcolaN(str)-1]) && a.length>1){ //se il node ha una position td[2]
	
		//elem = console.log('elem:', p[0] );
		//console.log(p[L_num[calcolaN(w)-1]]);
		a[0]=L_num[calcolaN(str)-1];
		//console.log('a0: ', a[0]);
		
		for(let k=0; k<a.length; k++){ 			
			temp+= '/'+ a[k]; //ricostruisco la stringa dell'XPath
		}
		str='/'+temp;
		console.log('[ROBULA_t3] str_t3: ', str);
		return str;
	}
	return null;
}

function transf4(str, L){

 // adds //* at the top of w 
 // //tr/td --> //*/tr/td
 console.log('[ROBULA_t4] transf4');
  if(w.startsWith("//*/*") || calcolaN(str) >= L.length ){
      console.log('[ROBULA_t4] ok');
  	return null;
  }else {
  	str = '//*'+str.substring(1,);  
  	console.log('[ROBULA_t4] str_t4: ',str);
	return str;
  }
}
