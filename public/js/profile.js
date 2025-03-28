const loadRegions = async (regionSelect, citySelect) => {
    try {
        // Пример статичного списка регионов (если нужно загрузить с сервера, заменим на fetch)
        const regions = ["Московская область", "Ленинградская область", "Тверская область"];

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

    // Подгружаем список регионов и городов
    await loadRegions(regionSelect, citySelect);

    // Заполняем текущие данные пользователя
    const response = await fetch("/api/user");
    const user = await response.json();
    regionSelect.value = user.region || "";
    citySelect.value = user.town || "";
    citySelect.disabled = !regionSelect.value;

    // Обработчик отправки формы
    profileForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const region = regionSelect.value || "Не указано";
        const town = citySelect.value || "Не указано";

        const res = await fetch("/profile", {
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
