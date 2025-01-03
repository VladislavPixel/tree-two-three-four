// Класс узла для многопутевых деревьев
class NodeMultipathTree {
	constructor(maxAmountDataForNode) {
		this.arrData = new Array(maxAmountDataForNode);
		this.arrChildren = new Array(maxAmountDataForNode + 1);
		this.parent = null;
		this.length = 0;
		this.connections = 0;
	};

	isEmpty() {
		return this.length === 0;
	};

	isFull() {
		return this.length === this.arrData.length;
	};

	getChildByIndex(i) {
		return this.arrChildren[i];
	};

	display() {
		let value = '/ ';

		for (let v = 0; v < this.arrData.length; v++) {
			const item = this.arrData[v];

			value = value + item + ' /';
		}

		console.log(value);
	};

	addData(newValue) {
		if (this.isFull()) {
			throw new Error('Node multipath tree is full... Operation addData() is not supported...');
		}

		let m = this.length;

		for (; m > 0; m--) {
			const value = this.arrData[m - 1];

			if (newValue >= value) {
				break;
			}

			this.arrData[m] = this.arrData[m - 1];
		}

		this.arrData[m] = newValue;

		this.length = this.length + 1;

		return m;
	};

	removeLastData() {
		if (this.isEmpty()) {
			throw new Error('Node multipath tree is empty... Operation removeLastData() is not supported...');
		}

		this.length = this.length - 1;

		const deleteValue = this.arrData[this.length];

		this.arrData[this.length] = undefined;

		return deleteValue;
	};

	removeData(value, index) {
		if (this.isEmpty()) {
			return -1;
		}

		let j = index;

		if (j === null || j === undefined || j === -1) {
			for (let m = 0; m < this.length; m++) {
				const val = this.arrData[m];

				if (val === value) {
					j = m;

					break;
				}

				if (val > value) {
					j = -1;

					break;
				}

				j = -1;
			}

			if (j === -1) {
				return j;
			}
		}

		for (let m = j; m < this.length; m++) {
			this.arrData[m] = this.arrData[m + 1];
		}

		this.length = this.length - 1;

		return j;
	};

	isComplete() {
		return this.isFull();
	};

	isLeaf() {
		return (this.arrChildren[0] === undefined) || (this.arrChildren[0] === null);
	};

	getFirstElement() {
		return this.arrData[0];
	};

	connectChild(node) {
		if (this.connections === this.arrChildren.length) {
			throw new Error('The multipath node of the tree has reached the limit of child connections... Operation connectChild() is not supported...');
		}

		const firstValue = node.getFirstElement();

		let v = this.connections;

		for (; v > 0; v--) {
			const currentChild = this.arrChildren[v - 1];

			if (firstValue >= currentChild.getFirstElement()) {
				break;
			}

			this.arrChildren[v] = this.arrChildren[v - 1];
		}

		this.arrChildren[v] = node;

		node.parent = this;

		this.connections = this.connections + 1;
	};

	disconnectLastChild() {
		if (this.connections === 0) {
			throw new Error('The multipath node has no connections. Operation disconnectLastChild() is not supported...');
		}

		this.connections = this.connections - 1;

		const disconnectNode = this.arrChildren[this.connections];

		disconnectNode.parent = null;

		this.arrChildren[this.connections] = undefined;

		return disconnectNode;
	};

	split() {
		// Новый узел, который становится правым братом разбиваемого узла
		const rightBrother = new NodeMultipathTree(this.arrData.length);

		// Извлекаем середину данных из разбиваемого узла и крайнее правое значение
		const saveRightValue = this.removeLastData();
		const saveMidValue = this.removeLastData();

		let parent = this.parent;

		// Если ссылки на родительский узел нет, то мы пытаемся разбить корень дерева - это частный случай
		if (parent === null || parent === undefined) {
			const newParent = new NodeMultipathTree(this.arrData.length);

			parent = newParent;

			this.parent = parent;

			parent.connectChild(this);
		}

		// Данные, которые были на середине, идут в родителя
		parent.addData(saveMidValue);

		// Данные, которые были справа, идут в нового правого брата
		rightBrother.addData(saveRightValue);

		// Если разбиваемый узел не является листком, то отделяю от него двух правых потомков и вешаю их на новый правый узел
		if (!this.isLeaf()) {
			const child2 = this.disconnectLastChild();
			const child1 = this.disconnectLastChild();

			rightBrother.connectChild(child1);
			rightBrother.connectChild(child2);
		}

		// Разбиваемый узел у нас законнекчен на родителя, но это же требуется сделать и для нового правого брата
		parent.connectChild(rightBrother);

		return parent;
	};

	nextChild(value) {
		let i = 0;

		for (; i < this.length; i++) {
			const currentVal = this.arrData[i];

			if (value > currentVal) {
				continue;
			}

			break;
		}

		return this.arrChildren[i];
	};
};
