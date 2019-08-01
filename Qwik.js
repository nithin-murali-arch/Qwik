/**
 * 
 * @author Nithin Murali<nithin93@gmail.com>
 * @desc Qwik - Search Data Structure
 * 		 Custom Data Structure to help make searches faster on static data.
 * 
 * 		 Search/Add/Remove O(p) - where p is the length of the string vs O(n) with traditional methods.
 * 
 * 		 Browser compatibility: All Browsers!
 *
 */
window.Qwik = function(){
	//Constructor initializes head of the tree
	function Qwik() {
		this.head = {
			key : '',
			children: {}
		};
	}

	function fetchHeadFromString(string, head){
		let currentChar = string.substring(0,1);
		if(!head){
			head = this.head.children[currentChar];
		}
		else{
			head = head.children[currentChar];
		}
		let nextSet = string.substring(1, string.length);
		if(!nextSet){
			return head;
		}
		else{
			return fetchHeadFromString(nextSet, head);
		}
	}
	
	function removeHead(node, key, depth) {
		if (depth === 0 && Object.keys(node.children).length === 0){
			return true;
		} 
		let currentChar = key.slice(0,1);
		if (removeHead(node.children[currentChar], key.slice(1), depth - 1)) {
			delete node.children[currentChar];
			return Object.keys(node.children).length === 0;
		} else {
			return false;
		}
	}

	function search(root, currentPrefix){ 
		let recs = [];
		// found a string in Trie with the given prefix 
		if(root.value === null){ 
			return [currentPrefix];
		}
		Object.keys(root.children).forEach(function(key){
			let child = root.children[key];
			currentPrefix = currentPrefix + child.trueKey;
			recs = recs.concat(search(child, currentPrefix));
		});
		return recs;
	} 
	
	Qwik.prototype.add = function(key) {
		let currentNode = this.head;
		let newNode = null;
		let currentChar = key.slice(0,1);
		key = key.slice(1);
		while(typeof currentNode.children[currentChar] !== 'undefined' && currentChar.length > 0){
			currentNode = currentNode.children[currentChar];
			currentChar = key.slice(0,1);
			key = key.slice(1);
		}
		while(currentChar.length > 0) {
			newNode = {
				key : currentChar.toLowerCase(),
				trueKey: currentChar,
				value : key.length === 0 ? null : undefined,
				children : {}
			};
			currentNode.children[newNode.key] = newNode;
			currentNode = newNode;
			currentChar = key.slice(0,1);
			key = key.slice(1);
		}
	};

	Qwik.prototype.searchDepth = function(key) {
		let currentNode = this.head;
		let currentChar = key.slice(0,1);
		let depth = 0;
		key = key.slice(1);
		while(typeof currentNode.children[currentChar] !== 'undefined' && currentChar.length > 0){
			currentNode = currentNode.children[currentChar];
			currentChar = key.slice(0,1);
			key = key.slice(1);
			depth += 1;
		}
		if (currentNode.value === null && key.length === 0) {
			return depth;
		} else {
			return -1;
		}
	};

	Qwik.prototype.search = function(key){
		let qwikkey = key.toLowerCase();
		let head = key.length > 1 ? fetchHeadFromString.call(this, qwikkey) : this.head;
		if(head.children[key]){
			return search(head.children[key], head.children[key].trueKey);
		}
		else{
			return [];
		}
	};
	
	Qwik.prototype.remove = function(key) {
		let depth = this.search(key);
		if (depth > -1){
			removeHead(this.head, key, depth);
		}
	};

	return Qwik;
}();
