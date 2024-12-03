// Для корректной работы в качестве данных не нужно использовать дубликаты (не надо вставлять значения, которые уже сидят в дереве), этот случай не обрабатывается алгоритмами операций дерева 2-3-4 и алгоритмами операций многопутевого узла: ваше дерево 2-3-4 будет работать некорректно.

const tree = new TreeTwoThreeFour();

tree.insert(30);
tree.insert(20);
tree.insert(10);
tree.insert(40);
tree.insert(50);
tree.insert(60);
tree.insert(70);
tree.insert(80);
tree.insert(90);
tree.insert(100);
tree.insert(150);
tree.insert(33);
tree.insert(35);
tree.insert(220);
tree.insert(37);
tree.insert(350);
tree.insert(38);
tree.insert(34);
tree.insert(1);
tree.insert(8);
tree.insert(55);
tree.insert(57);
tree.insert(61);
tree.insert(63);
tree.insert(75);
tree.insert(73);
tree.insert(77);
tree.insert(45);

const someArr = [69, 7, 34, 22, 88, 99, 2, 1, 15, 199, 255, 242, 9, 5, 3, 15555, 4];

console.log(tree.sort(someArr), 'some Arr');
