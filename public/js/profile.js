const loadRegions = async (regionSelect, citySelect) => {
    try {
        // // Пример статичного списка регионов (если нужно загрузить с сервера, заменим на fetch)
        const regions = ["Московская область", "Ленинградская область", "Тверская область"];
        regionSelect.innerHTML = "<option value=''>Не указано</option>";

        // Заполнение селектора регионов
        regions.forEach(region => {
            const option = document.createElement("option");
            option.value = region;
            option.textContent = region;
            regionSelect.appendChild(option);
        });

        // Делаем города недоступными до выбора региона
        citySelect.disabled = true;

        // Можно добавить дополнительную логику для загрузки городов в зависимости от выбранного региона
    } catch (error) {
        console.error("Ошибка при загрузке регионов:", error);
    }
};

document.addEventListener("DOMContentLoaded", async () => {
    const profileForm = document.getElementById("profileForm");
    const regionSelect = document.getElementById("region");
    const citySelect = document.getElementById("city");

    // Подгружаем список регионов
    await loadRegions(regionSelect, citySelect);

    try {
        console.log("Отправка запроса на получение данных пользователя...");

        const res = await fetch("/api/user", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1]}`,
            },
        });

        console.log("Ответ от сервера:", res);

        // Получаем ответ как JSON, если сервер вернул корректный JSON
        if (res.ok) {
            const user = await res.json();
            console.log("Данные пользователя:", user);

            regionSelect.value = user.region || "";
            citySelect.value = user.town || "";
            citySelect.disabled = !regionSelect.value;
        } else {
            const errorText = await res.text();
            console.error("Ошибка при получении данных пользователя:", errorText);
        }
    } catch (error) {
        console.error("Ошибка при загрузке профиля:", error);
    }


    // Обработчик отправки формы
    profileForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const region = regionSelect.value || "Не указано";
        const town = citySelect.value || "Не указано";

        const res = await fetch("/api/profile", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ region, town }),
        });

        if (res.ok) {
            alert("Профиль успешно обновлен!");
            window.location.href = "/dashboard";
        } else {
            alert("Ошибка обновления профиля");
        }
    });
});
