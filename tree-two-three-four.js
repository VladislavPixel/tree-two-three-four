// Класс дерева 2-3-4
class TreeTwoThreeFour {
	constructor() {
		this.root = null;
	};

	getRoot() {
		return this.root;
	};

	isEmpty() {
		return this.root === null;
	};

	[Symbol.iterator]() {
		return new IteratorCenteredTraversal(this.root);
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

	getMaxValue() {
		if (this.isEmpty()) {
			console.log('TreeTwoThreeFour is empty... Operation getMaxValue() is not supported.');

			return null;
		}

		let current = this.root;

		while(true) {
			if (current.isLeaf()) {
				return current.arrData[current.length - 1];
			}

			current = current.arrChildren[current.connections - 1];
		}
	};

	// Удаление целого узла дерева
	deleteNode(value) {
		
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

	getCenteredTraversalIterator(treeStructure) {
		const tree = treeStructure ? treeStructure : this.root;

		return new IteratorCenteredTraversal(tree);
	};

	// Центрированный (симметричный) обход дерева, все элементы выводятся в отсортированном порядке
	centeredTraversal() {
		if (this.isEmpty()) {
			console.log('TreeTwoThreeFour is empty... Operation centeredTraversal() is not supported.');

			return { arr: [], drawLine: '' };
		}

		const arr = [];

		let drawLine = '';

		let current = this.root;

		const stack = [{ state: 'go-down', val: 0 }];

		while(current && stack.length) {
			const { state, val } = stack[stack.length - 1];

			switch(state) {
				case 'go-down':
					if (current.isLeaf()) {
						stack.push({ state: 'save-all-items-on-current-step', val: null });

					} else {
						current = current.arrChildren[val];

						stack.push({ state: 'go-down', val: 0 });
					}
				break;
				case 'save-all-items-on-current-step':
					for (let m = 0; m < current.length; m++) {
						const value = current.arrData[m];

						arr.push(value);

						if (drawLine === '') {
							drawLine = drawLine + value;

						} else {
							drawLine = drawLine + `, ${value}`;
						}
					}

					stack.pop(); // Удаляет свою команду на save-all-items-on-current-step из стека, т.к. больше она не нужна
					stack.pop(); // Удаляет свою команду спуска вниз, т.к. ему спускаться некуда (является листочком)

					stack.push({ state: 'go-line', val: null }); // Дает команду идти по текущей линии узлу сверху (родителю)

					current = current.parent;
				break;
				case 'go-line':
					stack.pop(); // Удаляет команду "идти по линии"

					const config = stack[stack.length - 1];

					// Если по линии есть куда передвигаться, то передвигается и сохраняет значение текущего этапа
					if (config.val + 1 < current.connections) {
						arr.push(current.arrData[config.val]);

						drawLine = drawLine + `, ${current.arrData[config.val]}`;

						config.val = config.val + 1;

					} else {
						stack.pop(); // Если идти уже некуда, то удаляет команду для текущего узла на спуск и идет выше

						stack.push({ state: 'go-line', val: null });

						current = current.parent;
					}
				break;
				default:
					throw new Error('Unexpected error... Not found command...');
			}
		}

		return { arr, drawLine };
	};

	sort(arraySource) {
		if (arraySource.length === 0) {
			return arraySource;
		}

		// Создаем стороннее дерево
		const treeStructureData = new TreeTwoThreeFour();

		// Заносим в стороннее дерево данные. Значения выстраиваются в четкой последовательности дерева 2-3-4.
		for (let m = 0; m < arraySource.length; m++) {
			treeStructureData.insert(arraySource[m]);
		}

		// Создаем итератор, который будет отдавать нам значения в порядке сортировки
		const iteratorTree = this.getCenteredTraversalIterator(treeStructureData.getRoot());

		let i = 0;

		// Дергаем итератор и получаем данные. Записываем обратно в массив.
		for (const value of iteratorTree) {
			arraySource[i] = value;

			i++;
		}

		return arraySource;
	};
};
