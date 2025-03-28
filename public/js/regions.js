// document.addEventListener("DOMContentLoaded", function () {
//     const regions = {
//         "Тверская область": ["Тверь", "Ржев", "Вышний Волочёк"],
//         "Московская область": ["Москва", "Химки", "Подольск"],
//         "Ленинградская область": ["Санкт-Петербург", "Гатчина", "Выборг"]
//     };
//
//     const regionSelect = document.getElementById("region");
//     const citySelect = document.getElementById("city");
//
//     // Заполняем список регионов
//     Object.keys(regions).forEach(region => {
//         const option = document.createElement("option");
//         option.value = region;
//         option.textContent = region;
//         regionSelect.appendChild(option);
//     });
//
//     // Обработчик выбора региона
//     regionSelect.addEventListener("change", function () {
//         const selectedRegion = regionSelect.value;
//         citySelect.innerHTML = '<option value="">Не указано</option>'; // Очищаем список городов
//         citySelect.disabled = !selectedRegion; // Делаем список активным только при выборе региона
//
//         if (selectedRegion && regions[selectedRegion]) {
//             regions[selectedRegion].forEach(city => {
//                 const option = document.createElement("option");
//                 option.value = city;
//                 option.textContent = city;
//                 citySelect.appendChild(option);
//             });
//         }
//     });
// });
//

// regions.js

// regions.js

document.addEventListener("DOMContentLoaded", function () {
    const regions = {
        "Тверская область": ["Тверь", "Ржев", "Вышний Волочёк"],
        "Московская область": ["Москва", "Химки", "Подольск"],
        "Ленинградская область": ["Санкт-Петербург", "Гатчина", "Выборг"]
    };

    const regionSelect = document.getElementById("region");
    const citySelect = document.getElementById("city");

    // Заполняем список регионов для регистрации
    if (regionSelect && regionSelect.options.length === 1) {
        Object.keys(regions).forEach(region => {
            const option = document.createElement("option");
            option.value = region;
            option.textContent = region;
            regionSelect.appendChild(option);
        });
    }

    // Обработчик выбора региона
    regionSelect.addEventListener("change", function () {
        const selectedRegion = regionSelect.value;
        citySelect.innerHTML = '<option value="">Не указано</option>'; // Очищаем список городов
        citySelect.disabled = !selectedRegion; // Делаем список активным только при выборе региона

        if (selectedRegion && regions[selectedRegion]) {
            regions[selectedRegion].forEach(city => {
                const option = document.createElement("option");
                option.value = city;
                option.textContent = city;
                citySelect.appendChild(option);
            });
        }
    });
});


