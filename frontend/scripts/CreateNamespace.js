var osl = (function () { 

	function createNamespace(string) { 

		// Define the parent for the next level in the nested namespace.
		var parent = this; 
		
		// Split the namespace into parts (e.g. a namespace could be something like osl.mydomain.biz).
		var nsParts = string.split(".");

		// We want to be able to include or exclude the root namespace, so strip it out if it's in the namespace.
		if (nsParts[0] === "osl") {
			nsParts = nsParts.slice(1);
		}
		
		// Look through all the dotted parts of the namespace, to create nested objects.
		for (var i = 0; i < nsParts.length; i++) { 
		
			// If the current parent doesn't have the namespace declared, then create it as a nested object.
			var thisPartName = nsParts[i];
			if (typeof parent[thisPartName] === "undefined") { 
				parent[thisPartName] = {}; 
			}
			
			// Drill down into the deepest part of the namespace so far.
			parent = parent[thisPartName];
		}
		
		// The parent has now been constructed with empty namespaces and can be used, so return the outermost namespace.
		return parent;
	}
	
	return { 
		createNamespace: createNamespace 
	};	
}());
