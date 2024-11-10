// Класс дерева 2-3-4
class TreeTwoThreeFour {
	constructor() {
		this.root = null;
	};

	isEmpty() {
		return this.root === null;
	};

	insert(newValue) {
		// Если дерево пустое, то мы добавляем в узел элемент и делаем этот узел корнем
		if (this.isEmpty()) {
			const newNode = new NodeMultipathTree(3);

			newNode.addData(newValue);

			this.root = newNode;

			return true;
		}

		// Подготовили ссылку для передвижения по дереву
		let current = this.root;

		while(true) {
			// Если узел полон, то его требуется разбить перед тем, как что-то делать дальше
			if (current.isComplete()) {
				current = current.split();

				// Если после разбития узла у нас появился новый родитель всего древа, требуется его сделать root
				if (current.parent === null && this.root !== current) {
					this.root = current;
				}
			}

			// Если мы в листочке, то требуется вставить данные
			if (current.isLeaf()) {
				current.addData(newValue);

				return true;
			}

			// Если мы не в листочке, то ищем место вставки
			current = current.nextChild(newValue);
		}
	};

	find(searchValue) {
		if (this.isEmpty()) {
			console.log(`TreeTwoThreeFour is empty... Operation find() didn't give any results.`);

			return { node: null, index: -1 };
		}

		let current = this.root;

		while(true) {
			let x = 0;

			for (; x < current.length; x++) {
				const val = current.arrData[x];

				if (val === searchValue) {
					return { node: current, index: x };
				}

				if (val < searchValue) {
					continue;
				}

				break;
			}

			if (current.isLeaf()) {
				return { node: null, index: -1 };
			}

			current = current.getChildByIndex(x);

			if (!current) {
				return { node: null, index: -1 };
			}
		}
	};

	getMinValue() {
		if (this.isEmpty()) {
			console.log('TreeTwoThreeFour is empty... Operation getMinValue() is not supported.');

			return null;
		}

		let current = this.root;

		while(true) {
			if (current.isLeaf()) {
				return current.arrData[0];
			}

			current = current.arrChildren[0];
		}
	};

	deleteNode(value) {
		// Удаление целого узла дерева
	};

	// Удаляет значение из узла
	delete(value) {
		if (this.isEmpty()) {
			console.log(`TreeTwoThreeFour is empty... Operation delete() didn't give any results`);

			return { node: null, index: -1, status: false, value };
		}

		const searchNode = this.find(value);

		if (searchNode.node === null) {
			return { ...searchNode, status: false, value };
		}

		const { node, index } = searchNode;

		if (node.isLeaf() && node.length > 1) {
			node.removeData(value, index);

			return { ...searchNode, status: true, value };
		}

		// Случаи, когда листок содержит одно значение или узел не листовой!!! ДОПИСАТЬ
	};

	display() {
		if (this.isEmpty()) {
			console.log('TreeTwoThreeFour is empty... There is nothing to draw.');

		} else {
			let arrDraw = [];

			function collect(node) {
				let value = '  (';

				for (let m = 0; m < node.arrData.length; m++) {
					const val = node.arrData[m];

					if (val === undefined || val === null) {
						value = value + (m !== 0 ? ',': '') + '_';

					} else {
						value = value + (m !== 0 ? ',': '') + val;
					}
				}

				value += ')  ';

				return value;
			};

			function forwardTraversal(node, depth) {
				const str = collect(node);

				if (!arrDraw[depth]) {
					arrDraw[depth] = str;

				} else {
					arrDraw[depth] = arrDraw[depth] + str;
				}

				if (node.isLeaf()) {
					return;
				}

				for (let m = 0; m < node.connections; m++) {
					const child = node.arrChildren[m];

					forwardTraversal(child, depth + 1);
				}
			};

			forwardTraversal(this.root, 0);

			for (let v = 0; v < arrDraw.length; v++) {
				console.log(`DEPTH ${v}: ${arrDraw[v]}`);
			}
		}
	};
};
