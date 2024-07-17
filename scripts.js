const movieSelect = document.getElementById('movieSelect');
const timeSelect = document.getElementById('timeSelect');
const buyButton = document.getElementById('buyButton');
const ticketInfo = document.getElementById('ticketInfo');
const movieDescription = document.getElementById('movieDescription');
const seatSelection = document.getElementById('seatSelection');

const movies = {
    inception: {
        description: "Захоплюючий трилер про проникнення в підсвідомість людей для крадіжки або імплантації ідей.",
        image: "https://s9.vcdn.biz/static/f/1396166031/image.jpg",
        year: "2010",
        director: "Крістофер Нолан",
        country: "США, Велика Британія",
        rating: "8.8/10",
        actors: "Леонардо ДіКапріо, Джозеф Гордон-Левітт, Елліот Пейдж",
        trailerUrl: "https://www.youtube.com/watch?v=RlKr_lO45Nc"
    },
    shawshank: {
        description: "Драматична історія про надію, дружбу та силу людського духу у в'язниці Шоушенк.",
        image: "https://upload.wikimedia.org/wikipedia/uk/8/87/%D0%92%D1%82%D0%B5%D1%87%D0%B0_%D0%B7_%D0%A8%D0%BE%D1%83%D1%88%D0%B5%D0%BD%D0%BA%D0%B0.jpg",
        year: "1994",
        director: "Френк Дарабонт",
        country: "США",
        rating: "9.3/10",
        actors: "Тім Роббінс, Морган Фрімен, Боб Гантон",
        trailerUrl: "https://www.youtube.com/watch?v=kgAeKpAPOYk"
    },
    matrix: {
        description: "Культовий науково-фантастичний фільм, де реальність виявляється комп'ютерною симуляцією.",
        image: "https://upload.wikimedia.org/wikipedia/ru/9/9d/Matrix-DVD.jpg",
        year: "1999",
        director: "Лана і Лілі Вачовскі",
        country: "США",
        rating: "8.7/10",
        actors: "Кіану Рівз, Лоуренс Фішберн, Керрі-Енн Мосс",
        trailerUrl: "https://www.youtube.com/watch?v=YihPA42fdQ8"
    },
    interstellar: {
        description: "Епічна космічна одіссея про групу астронавтів, які шукають новий дім для людства.",
        image: "https://upload.wikimedia.org/wikipedia/ru/c/c3/Interstellar_2014.jpg",
        year: "2014",
        director: "Крістофер Нолан",
        country: "США, Велика Британія, Канада",
        rating: "8.6/10",
        actors: "Меттью МакКонахі, Енн Гетевей, Джессіка Честейн",
        trailerUrl: "https://www.youtube.com/watch?v=qcPfI0y7wRU"
    }
};

let selectedSeat = null;

function createSeats() {
    seatSelection.innerHTML = '';
    for (let i = 1; i <= 50; i++) {
        const seat = document.createElement('button');
        seat.className = 'seat ' + (Math.random() < 0.8 ? 'available' : 'occupied');
        seat.dataset.seatNumber = i;
        seat.addEventListener('click', selectSeat);
        seatSelection.appendChild(seat);
    }
}

function selectSeat(event) {
    if (event.target.classList.contains('occupied')) return;
    
    if (selectedSeat) {
        selectedSeat.classList.remove('selected');
    }
    
    selectedSeat = event.target;
    selectedSeat.classList.add('selected');
    
    ticketInfo.innerHTML = `<p>Вибрано місце: ${selectedSeat.dataset.seatNumber}</p>`;
}

movieSelect.addEventListener('change', () => {
    const selectedMovie = movieSelect.value;
    if (selectedMovie) {
        const movie = movies[selectedMovie];
        movieDescription.innerHTML = `
            <img src="${movie.image}" alt="${selectedMovie}" style="width:200px;float:left;margin-right:20px;">
            <p>${movie.description}</p>
            <div class="movie-info">
                <p><strong>Рік:</strong> ${movie.year}</p>
                <p><strong>Режисер:</strong> ${movie.director}</p>
                <p><strong>Країна:</strong> ${movie.country}</p>
                <p><strong>Рейтинг:</strong> ${movie.rating}</p>
                <p><strong>У головних ролях:</strong> ${movie.actors}</p>
            </div>
            <a href="${movie.trailerUrl}" target="_blank" class="trailer-button">Дивитися трейлер</a>
        `;
    } else {
        movieDescription.innerHTML = '';
    }
});

timeSelect.addEventListener('change', createSeats);

buyButton.addEventListener('click', () => {
    const selectedMovie = movieSelect.value;
    const selectedTime = timeSelect.value;

    if (selectedMovie && selectedTime && selectedSeat) {
        const ticketNumber = Math.floor(Math.random() * 1000000);
        ticketInfo.innerHTML = `
            <h3>Квиток успішно придбано!</h3>
            <p><strong>Фільм:</strong> ${movieSelect.options[movieSelect.selectedIndex].text}</p>
            <p><strong>Час сеансу:</strong> ${selectedTime}</p>
            <p><strong>Місце:</strong> ${selectedSeat.dataset.seatNumber}</p>
            <p><strong>Номер квитка:</strong> ${ticketNumber}</p>
            <p>Бажаємо приємного перегляду!</p>
        `;
        selectedSeat.classList.remove('selected');
        selectedSeat.classList.add('occupied');
        selectedSeat = null;
    } else {
        ticketInfo.innerHTML = '<p>Будь ласка, виберіть фільм, час сеансу та місце.</p>';
    }
});
