// ==========================================
// CONFIGURACIÓN Y VARIABLES GLOBALES
// ==========================================
const STORAGE_KEY = 'miPeliculaMentalRespuestas';
let generationInterval; // Variable para el intervalo de texto de carga

// Banco de preguntas
const questions = [
    {
        id: 1, category: "🎓 MI FUTURO",
        question: "¿Qué carrera o profesión te ves ejerciendo en el futuro? ¿Qué tipo de vida quieres tener?",
        helper: "No importa si aún no estás 100% seguro. Escribe lo que te emociona imaginar.",
        sceneTitle: "Mi Visión de Futuro",
        imageUrls: ["https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg", "https://images.pexels.com/photos/210243/pexels-photo-210243.jpeg", "https://images.pexels.com/photos/935756/pexels-photo-935756.jpeg", "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg", "https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg"]
    },
    {
        id: 2, category: "🎯 METAS ACADÉMICAS",
        question: "¿Qué quieres lograr este año en tus estudios?",
        helper: "Sé específico. ¿Qué nota quieres? ¿Qué materias son prioridad?",
        sceneTitle: "Mis Metas Académicas",
        imageUrls: ["https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg", "https://images.pexels.com/photos/267507/pexels-photo-267507.jpeg", "https://images.pexels.com/photos/5905709/pexels-photo-5905709.jpeg", "https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg", "https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg"]
    },
    {
        id: 3, category: "💪 MIS FORTALEZAS",
        question: "¿En qué materias o actividades eres bueno? ¿Qué habilidades tienes?",
        helper: "Piensa en lo que te sale fácil o lo que otros reconocen en ti.",
        sceneTitle: "Mis Superpoderes como Estudiante",
        imageUrls: ["https://images.pexels.com/photos/914929/pexels-photo-914929.jpeg", "https://images.pexels.com/photos/1684187/pexels-photo-1684187.jpeg", "https://images.pexels.com/photos/3768131/pexels-photo-3768131.jpeg", "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg", "https://images.pexels.com/photos/3775120/pexels-photo-3775120.jpeg"]
    },
    {
        id: 4, category: "🚧 MIS OBSTÁCULOS",
        question: "¿Qué te impide estudiar mejor o alcanzar tus metas?",
        helper: "Sé honesto. Reconocer el problema es el primer paso para solucionarlo.",
        sceneTitle: "Los Villanos en mi Historia",
        imageUrls: ["https://images.pexels.com/photos/1194345/pexels-photo-1194345.jpeg", "https://images.pexels.com/photos/1118869/pexels-photo-1118869.jpeg", "https://images.pexels.com/photos/289586/pexels-photo-289586.jpeg", "https://images.pexels.com/photos/1562058/pexels-photo-1562058.jpeg", "https://images.pexels.com/photos/4034525/pexels-photo-4034525.jpeg"]
    },
    {
        id: 5, category: "📉 ÁREAS A MEJORAR",
        question: "¿Qué materias o hábitos necesitas mejorar?",
        helper: "Todos tenemos debilidades. Identifica las tuyas para trabajar en ellas.",
        sceneTitle: "Mis Desafíos de Crecimiento",
        imageUrls: ["https://images.pexels.com/photos/323951/pexels-photo-323951.jpeg", "https://images.pexels.com/photos/247819/pexels-photo-247819.jpeg", "https://images.pexels.com/photos/1206101/pexels-photo-1206101.jpeg", "https://images.pexels.com/photos/5302820/pexels-photo-5302820.jpeg", "https://images.pexels.com/photos/669584/pexels-photo-669584.jpeg"]
    },
    {
        id: 6, category: "🔥 MI MOTIVACIÓN",
        question: "¿Por qué es importante para ti tener éxito en tus estudios?",
        helper: "Puede ser hacer sentir orgullosos a tus padres, conseguir una beca, etc.",
        sceneTitle: "Mi Motor Interior",
        imageUrls: ["https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg", "https://images.pexels.com/photos/1528660/pexels-photo-1528660.jpeg", "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg", "https://images.pexels.com/photos/1239162/pexels-photo-1239162.jpeg", "https://images.pexels.com/photos/733853/pexels-photo-733853.jpeg"]
    },
    {
        id: 7, category: "🛤️ MI PLAN",
        question: "¿Qué 3 acciones concretas harás esta semana para acercarte a tus metas?",
        helper: "Ej: Estudiar 1 hora diaria, hacer un horario, pedir ayuda.",
        sceneTitle: "Mis Primeros Pasos",
        imageUrls: ["https://images.pexels.com/photos/1996333/pexels-photo-1996333.jpeg", "https://images.pexels.com/photos/4348403/pexels-photo-4348403.jpeg", "https://images.pexels.com/photos/8938927/pexels-photo-8938927.jpeg", "https://images.pexels.com/photos/1015568/pexels-photo-1015568.jpeg", "https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg"]
    },
    {
        id: 8, category: "🌟 MIS RECURSOS",
        question: "¿Qué apoyo tienes? (Profesores, familia, amigos, etc.)",
        helper: "Identifica tus recursos. No estás solo en este viaje.",
        sceneTitle: "Mi Equipo de Apoyo",
        imageUrls: ["https://images.pexels.com/photos/5076516/pexels-photo-5076516.jpeg", "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg", "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg", "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg", "https://images.pexels.com/photos/1595385/pexels-photo-1595385.jpeg"]
    }
];

let currentQuestionIndex = 0;
let userAnswers = [];

// ==========================================
// INICIALIZACIÓN
// ==========================================
document.addEventListener('DOMContentLoaded', initializeApp);

function initializeApp() {
    loadAnswersFromStorage();
    if (userAnswers.length > 0 && userAnswers.length < questions.length) {
        if (confirm('Tienes un cuestionario sin terminar. ¿Quieres continuar?')) {
            currentQuestionIndex = userAnswers.length;
        } else {
            localStorage.removeItem(STORAGE_KEY);
            userAnswers = [];
            currentQuestionIndex = 0;
        }
    }
    showScreen('musicSelectionScreen');
    initializeAudio();
}

// ==========================================
// GESTIÓN DE MÚSICA
// ==========================================
function playMusic(choice) {
    const audio = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');
    let url = '';

    if (choice === 'recommended') {
        url = 'assets/recommended.mp3';
    } else if (choice === 'custom') {
        const fileInput = document.getElementById('audioFileUpload');
        const file = fileInput.files[0];
        if (file) {
            url = URL.createObjectURL(file);
        } else {
            return;
        }
    } else if (choice === 'none') {
        audio.pause();
        audio.src = '';
        musicToggle.classList.add('hidden');
        startQuestionnaire();
        return;
    }

    if (url) {
        audio.src = url;
        audio.play().catch(e => console.log("La reproducción automática fue bloqueada."));
        musicToggle.classList.remove('hidden');
        document.getElementById('musicIcon').textContent = '🔊';
    }

    startQuestionnaire();
}

function initializeAudio() {
    const audio = document.getElementById('bgMusic');
    const toggleBtn = document.getElementById('musicToggle');
    const icon = document.getElementById('musicIcon');

    toggleBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            icon.textContent = '🔊';
        } else {
            audio.pause();
            icon.textContent = '🔇';
        }
    });
}

// ==========================================
// NAVEGACIÓN Y CUESTIONARIO
// ==========================================
function changeMusic() {
    const audio = document.getElementById('bgMusic');
    audio.pause();
    showScreen('musicSelectionScreen');
}

function showScreen(screenId) {
    const activeScreen = document.querySelector('.screen.active');
    const newScreen = document.getElementById(screenId);

    if (activeScreen) {
        activeScreen.classList.add('hiding');
        activeScreen.addEventListener('animationend', () => {
            activeScreen.classList.remove('active', 'hiding');
            newScreen.classList.add('active');
        }, { once: true });
    } else {
        newScreen.classList.add('active');
    }
}

function startQuestionnaire() {
    showScreen('questionnaireScreen');
    document.getElementById('progressBar').classList.remove('hidden');
    displayQuestion();
}

function displayQuestion() {
    const question = questions[currentQuestionIndex];
    let imageUrlToShow;
    if (userAnswers[currentQuestionIndex] && userAnswers[currentQuestionIndex].imageUrl) {
        imageUrlToShow = userAnswers[currentQuestionIndex].imageUrl;
    } else {
        const randomIndex = Math.floor(Math.random() * question.imageUrls.length);
        imageUrlToShow = question.imageUrls[randomIndex];
    }
    document.getElementById('questionImage').src = imageUrlToShow;
    document.getElementById('questionCategory').textContent = question.category;
    document.getElementById('questionTitle').textContent = question.question;
    document.getElementById('helperText').textContent = question.helper;
    document.getElementById('answerInput').value = userAnswers[currentQuestionIndex]?.answer || '';
    updateProgress();
    updateButtons();
    document.getElementById('answerInput').focus();
}

function updateProgress() {
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    document.getElementById('progressFill').style.width = `${progress}%`;
    document.getElementById('currentStep').textContent = currentQuestionIndex + 1;
    document.getElementById('totalSteps').textContent = questions.length;
}

function updateButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    prevBtn.disabled = currentQuestionIndex === 0;
    nextBtn.textContent = (currentQuestionIndex === questions.length - 1) ? 'Crear mi Película 🎬' : 'Siguiente →';
}

function nextQuestion() {
    const answerInput = document.getElementById('answerInput');
    const answer = answerInput.value.trim();

    if (answer.length < 10) {
        answerInput.classList.add('error');
        setTimeout(() => answerInput.classList.remove('error'), 820);
        return;
    }

    const currentImageUrl = document.getElementById('questionImage').src;
    userAnswers[currentQuestionIndex] = { answer: answer, imageUrl: currentImageUrl };
    saveAnswersToStorage();
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
    } else {
        generateMovie();
    }
}

function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion();
    }
}

// ==========================================
// GENERACIÓN DE LA PELÍCULA
// ==========================================
async function generateMovie() {
    showScreen('generationScreen');

    const statuses = [
        "Analizando tus fortalezas...",
        "Identificando tus obstáculos...",
        "Construyendo tu plan de acción...",
        "Pulido final de las escenas..."
    ];
    let statusIndex = 0;
    const statusElement = document.getElementById('generationStatus');
    statusElement.textContent = statuses[statusIndex];

    generationInterval = setInterval(() => {
        statusIndex = (statusIndex + 1) % statuses.length;
        statusElement.textContent = statuses[statusIndex];
    }, 1500);

    await new Promise(resolve => setTimeout(resolve, 5000));

    clearInterval(generationInterval);
    createMovieScenes();
    showScreen('resultScreen');
}

function createMovieScenes() {
    const timeline = document.getElementById('movieTimeline');
    timeline.innerHTML = '';
    const scenes = generateScenesFromAnswers();
    scenes.forEach((scene, i) => {
        const sceneCard = createSceneCard(scene, i + 1);
        sceneCard.style.animationDelay = `${i * 0.2}s`;
        timeline.appendChild(sceneCard);
    });
}

function generateScenesFromAnswers() {
    return questions.map((q, i) => ({
        title: q.sceneTitle,
        description: userAnswers[i]?.answer || "Sin respuesta.",
        insight: q.helper,
        imageUrl: userAnswers[i]?.imageUrl
    }));
}

function createSceneCard(scene, number) {
    const card = document.createElement('div');
    card.className = 'scene-card';
    card.innerHTML = `
        <span class="scene-number">Escena ${number}</span>
        <h3>${scene.title}</h3>
        <p><strong>Tu respuesta:</strong> ${escapeHtml(scene.description)}</p>
        <div class="scene-insight">
            💡 <strong>Para Reflexionar:</strong> ${scene.insight}
        </div>
        <img src="${scene.imageUrl}" alt="${escapeHtml(scene.title)}" class="scene-image">
    `;
    return card;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ==========================================
// ALMACENAMIENTO Y DESCARGA
// ==========================================
function saveAnswersToStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userAnswers));
}

function loadAnswersFromStorage() {
    const stored = localStorage.getItem(STORAGE_KEY);
    userAnswers = stored ? JSON.parse(stored) : [];
}

async function downloadPDF() {
    const downloadBtn = event.target;
    downloadBtn.textContent = 'Generando PDF...';
    downloadBtn.disabled = true;
    const timeline = document.getElementById('movieTimeline');
    try {
        const canvas = await html2canvas(timeline, {
            backgroundColor: '#0a0a0a', scale: 2, useCORS: true
        });
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 210; const pageHeight = 297;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight; let position = 0;
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        while (heightLeft > 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }
        pdf.save(`mi-pelicula-mental-${new Date().getTime()}.pdf`);
        alert('¡PDF descargado exitosamente!');
    } catch (error) {
        console.error('Error al generar PDF:', error);
        alert('Hubo un error al generar el PDF. Puede ser por las imágenes de internet.');
    } finally {
        downloadBtn.textContent = 'Descargar PDF 📥';
        downloadBtn.disabled = false;
    }
}

// ==========================================
// REINICIAR
// ==========================================
function restartJourney() {
    if (confirm('¿Estás seguro? Se borrarán tus respuestas y empezarás de nuevo.')) {
        localStorage.removeItem(STORAGE_KEY);
        userAnswers = [];
        currentQuestionIndex = 0;
        showScreen('musicSelectionScreen');
        document.getElementById('progressBar').classList.add('hidden');
    }
}

// Hacer funciones accesibles globalmente
window.playMusic = playMusic;
window.startQuestionnaire = startQuestionnaire;
window.nextQuestion = nextQuestion;
window.previousQuestion = previousQuestion;
window.downloadPDF = downloadPDF;
window.restartJourney = restartJourney;
window.changeMusic = changeMusic;
