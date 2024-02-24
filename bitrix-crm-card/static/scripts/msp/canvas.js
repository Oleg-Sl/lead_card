

class Canvas {
    constructor() {
        this.canvas = new fabric.Canvas('canvas');

        // Включение перемещения объектов по холсту
        this.canvas.selection = true;
        this.canvas.allowTouchScrolling = true;

        // Включение изменения размера объектов
        this.canvas.on('object:selected', function(e) {
            let selectedObject = e.target;
            if (selectedObject) {
                selectedObject.setControlsVisibility({
                    'tl': true, 'tr': true, 'bl': true, 'br': true,
                    'ml': false, 'mt': false, 'mr': false, 'mb': false,
                    'mtr': true
                });
            }
        });
    }

    initHandler() {
        document.getElementById('addImage').addEventListener('click', function() {
            fabric.Image.fromURL('https://placekitten.com/200/300', function(img) {
                img.scaleToWidth(this.canvas.width * 0.15); // Устанавливаем ширину изображения в 25% ширины холста
                img.set({
                    left: this.canvas.width * 0.0, // Устанавливаем левую координату изображения в 10% ширины холста
                    top: this.canvas.height * 0.0 // Устанавливаем верхнюю координату изображения в 10% высоты холста
                });
                this.canvas.add(img);
            });
        });

        document.getElementById('addImg').addEventListener('click', function() {
            document.getElementById('imgLoader').click();
        })

        // Загрузка изображения
        document.getElementById('imgLoader').addEventListener('change', function(e) {
            let file = e.target.files[0];
            if (!file) return;
            
            let reader = new FileReader();
            reader.onload = function(event) {
                let img = new Image();
                img.onload = function() {
                    let fabricImg = new fabric.Image(img, {
                        left: 100,
                        top: 100,
                        scaleX: 0.5,
                        scaleY: 0.5
                    });
                    this.canvas.add(fabricImg);
                }
                img.src = event.target.result;
            }
            reader.readAsDataURL(new Blob([file], { type: file.type }));
        });

        // Добавление стрелки
        document.getElementById('addArrow').addEventListener('click', function() {
            let line = new fabric.Line([100, 100, 300, 200], {
                stroke: document.getElementById('colorPicker').value,
                strokeWidth: 3,
                selectable: true,
                hasControls: true,
                lockRotation: false // Разрешаем вращение стрелки
            });

            this.canvas.add(line);
        });

        // Добавление текста
        document.getElementById('addText').addEventListener('click', function() {
            let text = new fabric.Textbox('Ваш текст', {
                left: 100,
                top: 100,
                width: 200,
                fontSize: 30, // Размер текста
                fill: document.getElementById('colorPicker').value, // Цвет текста
                fontFamily: 'Arial'
            });
            this.canvas.add(text);
        });
        
        // Удаление выделенного объекта
        document.getElementById('deleteSelected').addEventListener('click', function() {
            let activeObject = this.canvas.getActiveObject();
            if (activeObject) {
                this.canvas.remove(activeObject);
            }
        });
        
        // Изменение цвета выделенного объекта
        document.getElementById('changeColor').addEventListener('click', function() {
            let selectedObject = this.canvas.getActiveObject();
            if (selectedObject) {
                selectedObject.set('fill', document.getElementById('colorPicker').value);
                this.canvas.renderAll();
            }
        });
        
        document.getElementById('saveState').addEventListener('click', function() {
            let json = JSON.stringify(this.canvas.toJSON());
            let sizeInBytes = new Blob([json]).size; // Получаем размер данных в байтах
            let sizeInKb = sizeInBytes / 1024; // Преобразуем размер в килобайты
            console.log('Размер данных в JSON:', sizeInBytes, 'байт', '(' + sizeInKb.toFixed(2) + ' кб)');
            
            localStorage.setItem('canvasState', json);
            console.log('Состояние холста сохранено');
        });
        
        
        document.getElementById('loadState').addEventListener('click', function() {
            var json = localStorage.getItem('canvasState');
            if (json) {
                this.canvas.loadFromJSON(json, function() {
                    this.canvas.renderAll();
                    console.log('Состояние холста загружено');
                });
            }
        });

    }

}

            

    
            


            