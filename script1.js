var selectedTd;
				var classList = document.body.classList;
				var arrColors = [ 'one', 'two', 'three','four'];
				var element  = document.getElementById('ul'); 
				var fragment = document.createDocumentFragment();
				var arrColorss = [ 'one', 'two', 'three','four'];
				var MassClass= []; //массив классов блоков(с которыми произошли изменения в процессе выполнения программы)
								   // при нажатие на блок в массив каждый раз сохраняется 4 элемента
								   // первые два - это классы двух блоков до изменение, вторые два- это классы , на которые они поменялись
				var MassIndexChange=[];//массив индексов блоков (с которыми произошли изменения в процессе выполнения программы)
				var Count =0;//счетчик, считает общее количество блоков		
				var Count1=0;			
				element.onclick = function(event) {
					event = event || window.event; TestTegLi(event);};// Теперь event - объект события во всех браузерах.
				for (var i = 0; i < 6; i++) //рисуем блоки на страничке
				{var rand = Math.floor(Math.random() * (arrColors.length-1));
					arrColors.forEach(function(arrColors) 
					{
					 rand = Math.floor(Math.random() * (arrColors.length-1));
					
				
					var li = document.createElement('LI');
					li.textContent = arrColors;
					li.classList.remove(li.classList[0]);
					li.classList.add(arrColorss[rand]);
					fragment.appendChild(li);
					
					});
				}
				element.appendChild(fragment);
				var massLi = document.getElementsByTagName('UL')[0].getElementsByTagName('LI');
				var logic1=true;
				var logic2=true;
				var logic3=false;
				var next=1;
				var k=0;//методы undo и redo связаны посредством счетчика(k), (при вызове undo счетчик увеличивается)
						//при вызове redo при помощи общего счетчика определяем элемент , который был изменен последним (и уменьшаем счетчик на 1)
				function redo()//вперед
				{
					if( k==0)//если доходим до конца массива с классами, то выходим из метода
					{
						alert("Count = "+ Count+" 2*k = "+ 2*k);
						return;
					}
					if(logic1)//определяем , вызывался ли метод undo()
					{
						next=1;logic1=false ;
					}
					var start=Count-4*k-2;//определяем индекс откуда начнется перемещение по массиву(для замены цвета)
					massLi[MassIndexChange[start+4*next]].classList.remove(massLi[MassIndexChange[start+4*next]].classList[0]);
					massLi[MassIndexChange[start+4*next+1]].classList.remove(massLi[MassIndexChange[start+4*next+1]].classList[0]);
					massLi[MassIndexChange[start+4*next]].classList.add(MassClass[start+4*next]);
					massLi[MassIndexChange[start+4*next+1]].classList.add(MassClass[start+4*next+1]);
					k--;
					logic2=true;
				
				}
				
				function undo()//назад
				{
					if(logic2)//определяем , вызывался ли метод redo()
					{
						k=0; logic2=false;
					}
				
					if(logic3)//проверка , был ли совершен клик по блоку
					{
						k=0; logic3=false;
					} 
					k++;
					
					if(Count==0 || 4*k>Count)// проверка на достижение конца массива
					{
						alert("Count = "+ Count+" 2*k = "+ 4*k);
						k--;
						return;
					}
					massLi[MassIndexChange[Count-k*4]].classList.remove(massLi[MassIndexChange[Count-4*k]].classList[0]);
					massLi[MassIndexChange[Count-(k*4-1)]].classList.remove(massLi[MassIndexChange[Count-(k*4-1)]].classList[0]);
					massLi[MassIndexChange[Count-k*4]].classList.add(MassClass[Count-4*k]);
					massLi[MassIndexChange[Count-(k*4-1)]].classList.add(MassClass[Count-(k*4-1)]);
					logic1=true;
				}
				
				function TestTegLi() //проверка , произошел ли клик на блоке LI
				{
					var x=Math.random();
					var rnd = Math.floor(x * (arrColors.length-1)) ;
					var target = event.target; // где был клик?
					if (target.tagName != 'LI') return;
						 logic3=true;
					highlight(target,rnd); 
	 
				};

				
				function highlight(node,rnd)//Изменение цвета
				{  
					blokCount=1;
					var count=0;
					while(massLi[count].getBoundingClientRect().top==massLi[++count].getBoundingClientRect().top)
						blokCount++;//определяем количество блоков(смотрим сколько блоков на одинаковом расстоянии от верхушки страницы)
						selectedLi = node;
					while(selectedLi.classList[0] === arrColorss[rnd])	rnd=Math.floor(Math.random() * (arrColors.length-1));//чтобы блок не перекрашивался в тот же самый цвет
					
					var index = findIndex( node );
					var k=index-index % blokCount;
					var prov=true;
					for (var i=k ; i<(k+blokCount);i++ )//проходим строку с блоками с начала и ищем блок с таким же цветам, как и тот на который щелкнули
					 {									//если находим , то меняем цвет 
						if((i != index) )
						{
							if( massLi[i].classList[0]===selectedLi.classList[0])
							{
						 		while(selectedLi.classList[0] === arrColorss[rnd])	
								rnd=Math.floor(Math.random() * (arrColors.length-1));//
								
								MassIndexChange[Count]=i;//для кнопки undo 
								MassClass[Count]=massLi[i].classList[0]; prov=false;
								massLi[i].classList.remove(massLi[i].classList[0]);
								massLi[i].classList.add(arrColors[rnd]);
								MassIndexChange[Count+2]=i;//для кнопки redo
								MassClass[Count+2]=massLi[i].classList[0];
								//MassIndexChange[Count]=i;
							
								break;
							}
							
						}
					 }
							if(prov)
							{ 	MassIndexChange[Count]=i;//для кнопки undo 
								MassClass[Count]=massLi[i].classList[0];
								
								MassIndexChange[Count+2]=i;//для кнопки redo
								MassClass[Count+2]=massLi[i].classList[0];
							}
							MassIndexChange[++Count]=index;//для кнопки undo 
							MassClass[Count]=selectedLi.classList[0];
						//	alert(MassClass[]);
					selectedLi.classList.remove(selectedLi.classList[0]);
					selectedLi.classList.add(arrColors[rnd]); 
					MassIndexChange[Count+2]=index;//для кнопки redo
					MassClass[Count+2]=selectedLi.classList[0];
				
					Count=Count+3;
	  
				}

				function findIndex( elem )
				{
					var i, len = massLi.length;
					for(i=0; i<len; i++) 
					{
						if (massLi[i]===elem) 
						{
							return i;
						}
					}
					return -1;
				}