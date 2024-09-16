const menu = document.getElementById('menu');

var MenuA = [
    {name:'Купить билет', submenu: 
        [ 
            {name: 'Заказать онлайн', submenu: 
                [ 
                    {name:'Бизнес-класс', url: 'https://belavia.by/'},
                    {name:'Эконом-класс', url: 'https://belavia.by/'} 
                ] 
            }, 
            {name:'Приобрести у партнёров', submenu: 
                [ 
                    {name:'Авиасейлс', url: 'https://www.aviasales.by'},
                    {name:'AirFrance', url: 'https://wwws.airfrance.fr/'},
                    {name:'Turkish Airlines', url: 'https://www.turkishairlines.com/'},
                    {name:'Агенство АэроТрэвел', url: 'https://airtravel.by/'} 
                ] 
            },
            {name:'Покупка по льготному тарифу', url: 'https://belavia.by/'}
            
        ] 
    }, 
    {name: 'Мои бронирования', url: 'https://belavia.by/#trip-case'}, 
    {name:'Информация и услуги', submenu: 
        [ 
            {name:'Расписание рейсов', url: 'https://belavia.by/'}, 
            {name:'Где приобрести билет', url: 'https://belavia.by/kontakty/'},
            {name:'Услуги трансфера до аэропорта', url: 'https://belavia.by/kak-dobratsya-do-nacionalnogo-aeroporta-minsk'} 
        ] 
    },
    {name:'О компании', submenu: 
    [ 
        {name:'История', url: 'https://belavia.by/o-kompanii/istoriya-kompanii/'}, 
        {name:'Информация', url: 'https://belavia.by/o-kompanii/'} 
    ] }
];
var firstLayer = true;

function ShowMenu(MenuItemsA, ParentElem) {
    ParentElem.style.display = 'flex';
    if(firstLayer)
    {
        ParentElem.style.flexDirection = 'row';
        ParentElem.style.justifyContent = 'center';
        
    }
    else{
        ParentElem.style.flexDirection = 'column';
    }
    for (var i = 0; i < MenuItemsA.length; i++) {
        var menuItem = MenuItemsA[i];
        var menuElement = document.createElement('div');
        menuElement.classList.add('menu-element');
        if(menuItem.url)
        {
            var link = document.createElement('a');
            link.setAttribute('href', menuItem.url);
            link.textContent = menuItem.name;
            menuElement.appendChild(link);
        }
        else{
            menuElement.textContent = menuItem.name;
        }       
        menuElement.style.fontSize = '20px';
        menuElement.style.backgroundColor = '#daebe8'; 
        menuElement.style.padding = '20px';
        menuElement.style.position = 'relative';
        if(firstLayer)
        {
            menuElement.style.border = 'solid';
            menuElement.style.marginRight = '10px';
            menuElement.style.borderRadius = '5px';
            menuElement.style.height = '25px';
            menuElement.style.paddingBottom = '20px';
        } else {
            menuElement.style.top = '5px';
            menuElement.style.borderLeft = 'solid';
            menuElement.style.borderColor = '#87bdd8';
            menuElement.style.borderWidth = '5px';
        }

        ParentElem.appendChild(menuElement);
        if (menuItem.submenu) {
            var submenuContainer = document.createElement('div');
            submenuContainer.classList.add('submenu-container');
            
            (function(currentMenuItem, currentElement, currentContainer) {
                currentElement.addEventListener('click', function(event) {
                    event.stopPropagation();
                    currentElement.appendChild(currentContainer);
                    currentContainer.style.display = 'block';
                    if(currentMenuItem.activeSubmenu) 
                    {
                        currentMenuItem.activeSubmenu = false;
                        currentContainer.style.display = 'none';
                        return;
                    }
                    currentMenuItem.activeSubmenu = true;
                    if(currentMenuItem.activated)
                    {
                        return;
                    }
                    if (currentContainer.style.display === 'block') {
                        currentContainer.style.position = 'relative';
                        currentContainer.style.top = '20px';
                    }
                    ShowMenu(currentMenuItem.submenu, currentContainer);
                    currentMenuItem.activated = true;                    
                });
                currentElement.addEventListener('mousemove', (event)=>
                {
                    event.stopPropagation();
                    currentElement.style.backgroundColor = '#cfe0e8';
                });
                currentElement.addEventListener('mouseout', (event)=>
                {
                    event.stopPropagation();
                    currentElement.style.backgroundColor = '#daebe8';
                });
            })(menuItem, menuElement, submenuContainer);
        }
        else{
            (function(currentElement){
                currentElement.addEventListener('mousemove', (event)=>
                {
                    event.stopPropagation();
                    currentElement.style.backgroundColor = '#cfe0e8';
                });
                currentElement.addEventListener('mouseout', (event)=>
                {
                    event.stopPropagation();
                    currentElement.style.backgroundColor = '#daebe8';
                });
            })(menuElement);
        }
    }
    firstLayer = false;
}

window.addEventListener("load", function()
{
    ShowMenu(MenuA, menu);
})

