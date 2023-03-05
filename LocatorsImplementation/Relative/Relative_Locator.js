LocatorBuilders.add('myXpathRel', function(e, opt_contextNode) {
        
	try{
	console.log("[REL] **START**");		
	console.log("[REL] e: ", e);	
	L_attr = []; //variables for the list of attributes
	var attr_temp = new Map([]);
	
	
	var current = e;
	var path = '';
	var locator = '';
    var L = []; //xpath absolute list 
	var relative_loc = ''; //XPath res 
	var temp = [];//array of temp locators
	var N = 0; 
		
	//**BEGINNING ABSOLUTE XPATH AND ATTRIBUTE LIST CONSTRUCTION**
	while (current != document ){	
		
		attr_temp = new Map([]);
		var currentPath;
		
		currentPath = this.relativeXPathFromParent(current);		
		path = currentPath + path;			
		var locator = '/' + path;	
		
		for (var i = 0, l = current.attributes.length; i < l; ++i){					
			
			//Of the single current node I save all the <Attribute,Value> pairs
			attr_temp.set( [ current.attributes[i].name ] , [ current.attributes[i].value ] );
		}
		
		L_attr.push(attr_temp);
		current = current.parentNode;
	}
	
	abs_path = locator;	
	console.log('[REL] abs_path: ', abs_path); ////html/body/app-root/table/tr[4]/td[2]
	console.log('[REL] L_attr: ', L_attr);
	//**BEGINNING ABSOLUTE XPATH AND ATTRIBUTE LIST CONSTRUCTION**
	
	
	//**START CONSTRUCTION ARRAY PATH L **	
	L_num = get_L_num(abs_path); 
	console.log('[REL] L_num: ', L_num); //['td[2]', 'tr[4]', 'table[1]', 'app-root[1]', 'body', 'html']
	
   		for(let i = 0; i< L_num.length; i++){
		if(L_num[i].match(hook_h)){
			L.push(L_num[i]);
		}else{
			L.push(L_num[i].replace(/[^a-zA-Z- ]/g, '')); //genero L
		}
	}
	//after a fix there is no longer a need to discriminate  between L and L_num
	//to avoid changing the following sections we simply set L = L_num
	L = L_num;
	console.log('[REL] L: ', L); // L=["p", "div", "app-root", "body", "html"]
	//**END CONSTRUCTION ARRAY PATH L **
	
	// abs=		//html/body/app-root/table/tr[4]/td[2]
	// L_num=	['td[2]', 'tr[4]', 'table[1]', 'app-root[1]', 'body', 'html']
	// L=		["td", "tr", "table","app-root", "body", "html"]
	// L_base =	['//td', '//tr/td[2]', '//table/tr[4]/td[2]', '//app-root/table[1]/tr[4]/td[2]', '//body/app-root[1]/table[1]/tr[4]/td[2]', '//html/body/app-root[1]/table[1]/tr[4]/td[2]']
	
	
	L_base = get_L_base(L,L_num);
	console.log('[REL] L_base :', L_base); //genero array degli xpath 
   	
	N = 0;
	primo = 1;
	let current_path = '//';
	//till i not found the locators
	while(relative_loc == '' && N<L.length){
		
		temp= [];
		c_elem = L_base[N]; //pick the element at the top
		console.log('[REL] c_elem: ', c_elem);
		
		if(primo == 1){
			
			primo = 0;
			
			// //td[normalize-space()='Phone:']
			loc_primo = c_elem+"[normalize-space()='"+primo_text+"']"
			console.log('[REL] loc_primo: ',loc_primo);
			res1 = myFindElement(loc_primo);
			if(res1 == e){
				
				relative_loc = loc_primo;
				console.log('[REL] ok sono uguali');
				console.log('[REL] finito loop');
				console.log('[REL] RELATIVE LOC: ', relative_loc);
				return relative_loc;
			}
			
		}
		
		a = L_attr[calcolaN(c_elem)-1];
		console.log('[REL] a: ', a );
		console.log('[REL] a_size:', a.size);
		for(let k = 0, v = a.size; k<v; k++){
			t = '';
			// The key at the desidered index
			var key = Array.from(a.keys())[k];  // return name of the attribute
			// The value of the item at desidered index
			var val1 = a.get(key);  //ritorna il valore dell'attributo
			s_attr = "[@"+key+"='"+val1+"']"; //bulding the string 
			b = mySlicer(c_elem);
			b[0]=b[0]+s_attr; //insert attribute in the Xpath
			for(let k = 0, v = b.length; k < v; k++){
				t+= '/'+b[k] //re-build of the xpath
			}
			
			t='/'+t;
			if(!t.includes('href') && !t.includes('style') && !t.includes('ng-') && !t.includes('@ng-') && !t.includes('@_ng') && !t.includes(hookPrefix) && !t.includes(templatePrefix)){
				console.log('[REL] XPATH REL: ',t);
				temp.push(t); 
			}
		}
		
		console.log('[REL] lista_temp: ', temp);
		for(i = 0, v = temp.length; i<v; i++){ //check of the xpath
			
			if(XPathResCount(temp[i]) == 1){ // if the locator is unique
				console.log('[REL] Locatore unico: ', temp[i]);
				res = myFindElement(temp[i]);
					if(res == e){
						console.log('[REL] ok sono uguali');
						relative_loc = temp[i];
				}
			
			}
		}
		
		//if I haven't found a locator, I increase the XPath of one level-> \tr --> \tr\td
		N++;
	}
	
	console.log('[REL] finito loop');
	console.log('[REL] RELATIVE LOC: ', relative_loc);
	return relative_loc;
	
	}catch(error){
		
		console.log('debug: ', error);
	}
		
});