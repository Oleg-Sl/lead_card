

export class Canvas {
    constructor(savedData) {
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

        if (savedData) {
            this.initFromSavedData(savedData);
        }

        this.initHandler();
    }

    initSize() {
        const coefficient = Math.SQRT2;
        const canvasContainer = document.querySelector('#canvasContainer');
        const width = canvasContainer.clientWidth;
        const height = canvasContainer.clientWidth / coefficient;
        this.canvas.setHeight(height);
        this.canvas.setWidth(width);
    }

    initHandler() {
        document.getElementById('addImage').addEventListener('click', () => {
            fabric.Image.fromURL('https://placekitten.com/200/300', (img) => {
                img.scaleToWidth(this.canvas.width * 0.15); // Устанавливаем ширину изображения в 25% ширины холста
                img.set({
                    left: this.canvas.width * 0.0, // Устанавливаем левую координату изображения в 10% ширины холста
                    top: this.canvas.height * 0.0 // Устанавливаем верхнюю координату изображения в 10% высоты холста
                });
                this.canvas.add(img);
            });
        });

        document.getElementById('addImg').addEventListener('click', () => {
            document.getElementById('imgLoader').click();
        })

        // Загрузка изображения
        document.getElementById('imgLoader').addEventListener('change', (e) => {
            let file = e.target.files[0];
            if (!file) return;
            
            let reader = new FileReader();
            reader.onload = (event) => {
                let img = new Image();
                img.onload = () => {
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
        document.getElementById('addArrow').addEventListener('click', () => {
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
        document.getElementById('addText').addEventListener('click', () => {
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
        document.getElementById('deleteSelected').addEventListener('click', () => {
            let activeObject = this.canvas.getActiveObject();
            if (activeObject) {
                this.canvas.remove(activeObject);
            }
        });
        
        // Изменение цвета выделенного объекта
        document.getElementById('changeColor').addEventListener('click', () => {
            let selectedObject = this.canvas.getActiveObject();
            if (selectedObject) {
                selectedObject.set('fill', document.getElementById('colorPicker').value);
                this.canvas.renderAll();
            }
        });
        
        document.getElementById('saveState').addEventListener('click', () => {
            let json = JSON.stringify(this.canvas.toJSON());
            let sizeInBytes = new Blob([json]).size; // Получаем размер данных в байтах
            let sizeInKb = sizeInBytes / 1024; // Преобразуем размер в килобайты
            console.log('Размер данных в JSON:', sizeInBytes, 'байт', '(' + sizeInKb.toFixed(2) + ' кб)');
            
            localStorage.setItem('canvasState', json);
            console.log('Состояние холста сохранено');
        });

        document.getElementById('loadState').addEventListener('click', () => {
            var json = localStorage.getItem('canvasState');
            if (json) {
                this.canvas.loadFromJSON(json, () => {
                    this.canvas.renderAll();
                    console.log('Состояние холста загружено');
                });
            }
        });

    }

    getData() {
        return this.canvas.toJSON();
        // return this.canvas.toDataURL();
    }

    initFromSavedData(savedData) {
        if (savedData) {
            this.canvas.loadFromJSON(savedData, () => {
                this.canvas.renderAll();
                console.log('Состояние холста загружено из сохраненных данных');
            });
        }
    }

    loadCanvasFromBase64(imageURL) {
        // fabric.Image.fromURL(base64Data, (img) => {
        fabric.Image.fromURL(imageURL, (img) => {
            // Добавляем изображение на полотно
            this.canvas.add(img);
            // Рендерим полотно
            this.canvas.renderAll();
        });
    }
}
