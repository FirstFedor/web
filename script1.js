var selectedTd;
var classList = document.body.classList;
var arrColors = ['one', 'two', 'three', 'four'];
var element = document.getElementById('ul');
var fragment = document.createDocumentFragment();


var MassClass = []; //массив классов блоков(с которыми произошли изменения в процессе выполнения программы)
// при нажатие на блок в массив каждый раз сохраняется 4 элемента
// первые два - это классы двух блоков до изменение, вторые два- это классы , на которые они поменялись
var MassIndexChange = []; //массив индексов блоков (с которыми произошли изменения в процессе выполнения программы)
var CountElementInClassMass = 0; //счетчик, считает классов , записанных в массив MassClass



element.onclick = function (event) {
	event = event || window.event;
	TestTegLi(event);
}; // Теперь event - объект события во всех браузерах.

for (var i = 0; i < 6; i++) //рисуем блоки на страничке
{
	var rand = Math.floor(Math.random() * (arrColors.length - 1));
	for (var j = 0; j < 4; j++)
		{
		rand = Math.floor(Math.random() * (arrColors.length - 1));

		var li = document.createElement('LI');
		li.textContent = arrColors[rand];
		li.classList.remove(li.classList[0]);
		li.classList.add(arrColors[rand]);
		fragment.appendChild(li);

		}
}
element.appendChild(fragment);
var massLi = document.getElementsByTagName('UL')[0].getElementsByTagName('LI');
var ClickWas = false;

function Move() {
	
var WeUseUndo = true;
var WeUseRedo = true;

var next = 1;
var k = 0; //методы undo и redo связаны посредством счетчика(k), (при вызове undo счетчик увеличивается)
//при вызове redo при помощи общего счетчика определяем элемент , который был изменен последним (и уменьшаем счетчик на 1)

 


this.redo =function () //вперед
{
	if (k == 0) //если доходим до конца массива с классами, то выходим из метода
	{

		return;
	}
	if (WeUseUndo) //определяем , вызывался ли метод undo()
	{
		next = 1;
		WeUseUndo = false;
	}
	var start = CountElementInClassMass - 4 * k - 2; //определяем индекс откуда начнется перемещение по массиву(для замены цвета)
	massLi[MassIndexChange[start + 4 * next]].classList.remove(massLi[MassIndexChange[start + 4 * next]].classList[0]);
	massLi[MassIndexChange[start + 4 * next + 1]].classList.remove(massLi[MassIndexChange[start + 4 * next + 1]].classList[0]);
	massLi[MassIndexChange[start + 4 * next]].classList.add(MassClass[start + 4 * next]);
	massLi[MassIndexChange[start + 4 * next + 1]].classList.add(MassClass[start + 4 * next + 1]);
	k--;
	WeUseRedo = true;

};

this.undo = function () //назад
{
	if (WeUseRedo) //определяем , вызывался ли метод redo()
	{
		k = 0;
		WeUseRedo = false;
	}

	if (ClickWas) //проверка , был ли совершен клик по блоку
	{
		k = 0;
		ClickWas = false;
	}
	k++;

	if (CountElementInClassMass == 0 || 4 * k > CountElementInClassMass) // проверка на достижение конца массива
	{

		k--;
		return;
	}
	massLi[MassIndexChange[CountElementInClassMass - k * 4]].classList.remove(massLi[MassIndexChange[CountElementInClassMass - 4 * k]].classList[0]);
	massLi[MassIndexChange[CountElementInClassMass - (k * 4 - 1)]].classList.remove(massLi[MassIndexChange[CountElementInClassMass - (k * 4 - 1)]].classList[0]);
	massLi[MassIndexChange[CountElementInClassMass - k * 4]].classList.add(MassClass[CountElementInClassMass - 4 * k]);
	massLi[MassIndexChange[CountElementInClassMass - (k * 4 - 1)]].classList.add(MassClass[CountElementInClassMass - (k * 4 - 1)]);
	WeUseUndo = true;
};
	
 
  };
  
   
  
var M=new Move();





function TestTegLi() //проверка , произошел ли клик на блоке LI
{
	var x = Math.random();
	var rnd = Math.floor(x * (arrColors.length - 1));
	var target = event.target; // где был клик?
	if (target.tagName != 'LI')
		return;
	ClickWas = true;
	highlight(target, rnd);

};

function highlight(node, rnd) //Изменение цвета
{
	blokCount = 1;
	CountAllBlock=0;
	while (CountAllBlock!=massLi.length-1 && massLi[CountAllBlock].getBoundingClientRect().top == massLi[++CountAllBlock].getBoundingClientRect().top)
		blokCount++; //определяем количество блоков(смотрим сколько блоков на одинаковом расстоянии от верхушки страницы)
	selectedLi = node;
	while (selectedLi.classList[0] === arrColorss[rnd])
		rnd = Math.floor(Math.random() * (arrColors.length - 1)); //чтобы блок не перекрашивался в тот же самый цвет

	var index = findIndex(node);
	var StartInLine = index - index % blokCount;
	var HaveNotSameColor = true;
	for (var i = StartInLine; i < (StartInLine + blokCount); i++) //проходим строку с блоками с начала и ищем блок с таким же цветам, как и тот на который щелкнули
	{ //если находим , то меняем цвет
		if ((i != index)) {
			if (massLi[i].classList[0] === selectedLi.classList[0]) {
				while (selectedLi.classList[0] === arrColorss[rnd])
					rnd = Math.floor(Math.random() * (arrColors.length - 1)); //

				MassIndexChange[CountElementInClassMass] = i; //для кнопки undo
				MassClass[CountElementInClassMass] = massLi[i].classList[0];
				HaveNotSameColor  = false;
				massLi[i].classList.remove(massLi[i].classList[0]);
				massLi[i].classList.add(arrColors[rnd]);
				MassIndexChange[CountElementInClassMass + 2] = i; //для кнопки redo
				MassClass[CountElementInClassMass + 2] = massLi[i].classList[0];


				break;
			}

		}
	}
	if (HaveNotSameColor ) {
		MassIndexChange[CountElementInClassMass] = index; //для кнопки undo
		MassClass[CountElementInClassMass] = selectedLi.classList[0];

		MassIndexChange[CountElementInClassMass + 2] = index; //для кнопки redo
		MassClass[CountElementInClassMass + 2] = arrColors[rnd];
	}
	MassIndexChange[++CountElementInClassMass] = index; //для кнопки undo
	MassClass[CountElementInClassMass] = selectedLi.classList[0];
	selectedLi.classList.remove(selectedLi.classList[0]);
	selectedLi.classList.add(arrColors[rnd]);
	MassIndexChange[CountElementInClassMass + 2] = index; //для кнопки redo
	MassClass[CountElementInClassMass + 2] = selectedLi.classList[0];

	CountElementInClassMass = CountElementInClassMass + 3;

}

function findIndex(elem) {
	var i,
	len = massLi.length;
	for (i = 0; i < len; i++) {
		if (massLi[i] === elem) {
			return i;
		}
	}
	return -1;
}
