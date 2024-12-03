class IteratorCenteredTraversal {
    constructor(tree) {
        this.current = tree;
        this.stack = [{ state: 'go-down', val: 0 }];
        this.dinamicIndex = 0;
    };

    [Symbol.iterator]() {
        return this;
    };

    next() {
        while(this.current && this.stack.length) {
            const { state, val } = this.stack[this.stack.length - 1];

            switch(state) {
                case 'go-down':
                    if (this.current.isLeaf()) {
                        this.stack.push({ state: 'save-all-items-on-current-step', val: null });

                    } else {
                        this.current = this.current.arrChildren[val];

                        this.stack.push({ state: 'go-down', val: 0 });
                    }
                break;
                case 'save-all-items-on-current-step':
                    while(this.dinamicIndex < this.current.length) {
                        const value = this.current.arrData[this.dinamicIndex];

                        this.dinamicIndex = this.dinamicIndex + 1;

                        return { value, done: false };
                    }

                    this.dinamicIndex = 0;

                    this.stack.pop(); // Удаляет свою команду на save-all-items-on-current-step из стека, т.к. больше она не нужна
                    this.stack.pop(); // Удаляет свою команду спуска вниз, т.к. ему спускаться некуда (является листочком)

                    this.stack.push({ state: 'go-line', val: null }); // Дает команду идти по текущей линии узлу сверху (родителю)

                    this.current = this.current.parent;
                break;
                case 'go-line':
                    this.stack.pop(); // Удаляет команду "идти по линии"

                    const config = this.stack[this.stack.length - 1];

                    // Если по линии есть куда передвигаться, то передвигается и сохраняет значение текущего этапа
                    if (config.val + 1 < this.current.connections) {
                        const currentIndexArrData = config.val;

                        config.val = config.val + 1;

                        return { value: this.current.arrData[currentIndexArrData], done: false };
                    }

                    this.stack.pop(); // Если идти уже некуда, то удаляет команду для текущего узла на спуск и идет выше

                    this.stack.push({ state: 'go-line', val: null });

                    this.current = this.current.parent;
                break;
                default:
                    throw new Error('Unexpected error... Not found command...');
            }
        }

        return { value: null, done: true };
    };
};
