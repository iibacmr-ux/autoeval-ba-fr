// Application principale pour les quiz d'auto-évaluation BA
class BAAssessmentApp {
    constructor() {
        this.currentAssessment = null;
        this.currentQuestionIndex = 0;
        this.answers = {};
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.showAssessmentSelector();
    }

    setupEventListeners() {
        // Sélection d'évaluation
        document.querySelectorAll('.assessment-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const assessmentId = parseInt(card.dataset.assessment);
                this.startAssessment(assessmentId);
            });
        });

        // Navigation
        document.getElementById('next-btn').addEventListener('click', () => this.nextQuestion());
        document.getElementById('prev-btn').addEventListener('click', () => this.prevQuestion());
        document.getElementById('restart-btn').addEventListener('click', () => this.restart());

        // Gestion des réponses (radio et checkbox)
        document.addEventListener('change', (e) => {
            const target = e.target;
            if (
                target &&
                (
                    (target.type === 'radio' && target.name === 'answer') ||
                    (target.type === 'checkbox' && /^answer_/.test(target.name))
                )
            ) {
                this.handleAnswer(target);
            }
        });

        // Clic sur toute la zone d'option (pas seulement la coche)
        document.addEventListener('click', (e) => {
            const opt = e.target.closest('.option');
            if (!opt) return;
            const input = opt.querySelector('input');
            if (!input) return;
            if (e.target === input) return; // laisser le comportement natif
            if (input.type === 'radio') {
                input.checked = true;
                input.dispatchEvent(new Event('change', { bubbles: true }));
            } else if (input.type === 'checkbox') {
                input.checked = !input.checked;
                input.dispatchEvent(new Event('change', { bubbles: true }));
            }
        });
    }

    showAssessmentSelector() {
        document.getElementById('assessment-selector').style.display = 'grid';
        document.getElementById('quiz-container').classList.remove('active');
        document.getElementById('results-container').classList.remove('active');
    }

    startAssessment(assessmentId) {
        this.currentAssessment = assessmentData[assessmentId];
        this.currentQuestionIndex = 0;
        this.answers = {};

        // Masquer le sélecteur et afficher le quiz
        document.getElementById('assessment-selector').style.display = 'none';
        document.getElementById('quiz-container').classList.add('active');

        this.renderQuestion();
        this.updateProgress();
    }

    renderQuestion() {
        const question = this.currentAssessment.questions[this.currentQuestionIndex];
        const container = document.getElementById('question-container');
        
        container.innerHTML = `
            <div class="question-category">${question.category}</div>
            <div class="question-title">${question.question}</div>
            <div class="options-container">
                ${this.renderOptions(question)}
            </div>
        `;

        this.updateNavigation();
        this.restoreAnswer();
    }

    renderOptions(question) {
        const inputType = question.type === 'single' ? 'radio' : 'checkbox';
        const inputName = question.type === 'single' ? 'answer' : `answer_${question.id}`;

        return question.options.map((option, index) => `
            <div class="option" data-value="${option.value}">
                <input type="${inputType}" 
                       name="${inputName}" 
                       value="${option.value}" 
                       id="option_${index}">
                <label for="option_${index}">${option.text}</label>
            </div>
        `).join('');
    }

    handleAnswer(input) {
        const question = this.currentAssessment.questions[this.currentQuestionIndex];
        const option = input.closest('.option');
        
        // Mise à jour visuelle
        if (question.type === 'single') {
            document.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            this.answers[question.id] = input.value;
        } else {
            option.classList.toggle('selected', input.checked);
            if (!this.answers[question.id]) this.answers[question.id] = [];
            
            if (input.checked) {
                this.answers[question.id].push(input.value);
            } else {
                this.answers[question.id] = this.answers[question.id].filter(v => v !== input.value);
            }
        }

        this.updateNextButton();
    }

    restoreAnswer() {
        const question = this.currentAssessment.questions[this.currentQuestionIndex];
        const answer = this.answers[question.id];
        
        if (!answer) return;

        if (question.type === 'single') {
            const input = document.querySelector(`input[value="${answer}"]`);
            if (input) {
                input.checked = true;
                input.closest('.option').classList.add('selected');
            }
        } else {
            answer.forEach(value => {
                const input = document.querySelector(`input[value="${value}"]`);
                if (input) {
                    input.checked = true;
                    input.closest('.option').classList.add('selected');
                }
            });
        }
        
        this.updateNextButton();
    }

    updateNextButton() {
        const question = this.currentAssessment.questions[this.currentQuestionIndex];
        const hasAnswer = this.answers[question.id] && 
            (question.type === 'single' || this.answers[question.id].length > 0);
        
        document.getElementById('next-btn').disabled = !hasAnswer;
    }

    updateNavigation() {
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        const counter = document.getElementById('question-counter');
        
        prevBtn.disabled = this.currentQuestionIndex === 0;
        
        const isLastQuestion = this.currentQuestionIndex === this.currentAssessment.questions.length - 1;
        nextBtn.textContent = isLastQuestion ? 'Voir Résultats' : 'Suivant';
        
        counter.textContent = `Question ${this.currentQuestionIndex + 1} sur ${this.currentAssessment.questions.length}`;
        
        this.updateNextButton();
    }

    updateProgress() {
        const progress = ((this.currentQuestionIndex + 1) / this.currentAssessment.questions.length) * 100;
        document.getElementById('progress-fill').style.width = `${progress}%`;
    }

    nextQuestion() {
        if (this.currentQuestionIndex < this.currentAssessment.questions.length - 1) {
            this.currentQuestionIndex++;
            this.renderQuestion();
            this.updateProgress();
        } else {
            this.showResults();
        }
    }

    prevQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.renderQuestion();
            this.updateProgress();
        }
    }

    calculateScore() {
        let totalScore = 0;
        let maxScore = 0;
        let categoryScores = {};
        let discProfile = { D: 0, I: 0, S: 0, C: 0 };
        
        this.currentAssessment.questions.forEach(question => {
            const answer = this.answers[question.id];
            if (!answer) return;
            
            if (!categoryScores[question.category]) {
                categoryScores[question.category] = { score: 0, maxScore: 0 };
            }
            
            if (question.type === 'single') {
                const selectedOption = question.options.find(opt => opt.value === answer);
                if (selectedOption) {
                    totalScore += selectedOption.score;
                    categoryScores[question.category].score += selectedOption.score;
                    
                    // Pour le test DISC
                    if (selectedOption.disc) {
                        discProfile[selectedOption.disc] += selectedOption.score;
                    }
                }
                maxScore += Math.max(...question.options.map(opt => opt.score));
                categoryScores[question.category].maxScore += Math.max(...question.options.map(opt => opt.score));
            } else {
                const selectedOptions = question.options.filter(opt => answer.includes(opt.value));
                const questionScore = selectedOptions.reduce((sum, opt) => sum + opt.score, 0);
                totalScore += questionScore;
                categoryScores[question.category].score += questionScore;
                
                // Normalisation: le max dépend du nombre d'options sélectionnées (somme des K meilleurs scores)
                const k = selectedOptions.length || 1;
                const sortedScores = [...question.options].map(o => o.score).sort((a, b) => b - a);
                const questionMax = sortedScores.slice(0, k).reduce((sum, s) => sum + s, 0);
                maxScore += questionMax;
                categoryScores[question.category].maxScore += questionMax;
            }
        });
        
        return {
            totalScore,
            maxScore,
            percentage: Math.round((totalScore / maxScore) * 100),
            categoryScores,
            discProfile
        };
    }

    showResults() {
        const results = this.calculateScore();
        
        document.getElementById('quiz-container').classList.remove('active');
        document.getElementById('results-container').classList.add('active');
        
        // Titre du formulaire
        const titleEl = document.getElementById('assessment-title');
        if (titleEl) titleEl.textContent = this.currentAssessment.title;
        
        // Affichage du score global
        document.getElementById('score-circle').textContent = `${results.percentage}%`;
        
        // Comparaison avec la moyenne camerounaise
        this.renderComparison(results);
        
        // Recommandations personnalisées
        this.renderRecommendations(results);
    }

    renderComparison(results) {
        const container = document.getElementById('comparison-bars');
        let comparisonHTML = '';
        
        if (this.currentAssessment.title === "Profil BA Camerounais") {
            // Comparaison avec les données de l'enquête
            comparisonHTML = this.renderCameroonianComparison(results);
        } else if (this.currentAssessment.title.includes("DISC")) {
            // Comparaison DISC
            comparisonHTML = this.renderDISCComparison(results.discProfile);
        } else {
            // Comparaison par catégories BABOK
            comparisonHTML = this.renderBABOKComparison(results.categoryScores);
        }
        
        container.innerHTML = comparisonHTML;
        
        // Animation des barres
        setTimeout(() => {
            document.querySelectorAll('.chart-bar-fill').forEach(bar => {
                const width = bar.dataset.width;
                bar.style.width = width + '%';
            });
        }, 100);
    }

    renderCameroonianComparison(results) {
        const userProfile = this.extractUserProfile();

        return Object.entries(userProfile).map(([categoryKey, userValue]) => {
            const avgValue = this.getCameroonianAverage(categoryKey, userValue);
            const userPercentage = this.calculatePercentage(categoryKey, userValue);
            const explanation = this.getProfileCategoryExplanation(categoryKey);
            
            return `
                <div class="chart-bar">
                    <div class="chart-label">${this.translateCategory(categoryKey)}</div>
                    <div style="flex: 1; margin-left: 1rem;">
                        <div class="chart-bar-fill" data-width="${userPercentage}" 
                             style="background: linear-gradient(90deg, var(--orange), var(--medium-blue));">
                        </div>
                        <small style="color: #666; margin-top: 0.25rem; display: block;">
                            Vous: ${userPercentage}% | Moyenne: ${avgValue}%${explanation ? ' — ' + explanation : ''}
                        </small>
                    </div>
                </div>
            `;
        }).join('');
    }

    renderDISCComparison(discProfile) {
        const discMax = this.computeDiscMax();
        
        return Object.entries(discProfile).map(([type, score]) => {
            const percentage = discMax[type] > 0 ? Math.round((score / discMax[type]) * 100) : 0;
            const avgPercentage = cameroonianBAProfile.discProfile[type];
            const explanation = this.getDISCExplanation(type);
            
            return `
                <div class="chart-bar">
                    <div class="chart-label">${this.getDISCLabel(type)}</div>
                    <div style="flex: 1; margin-left: 1rem;">
                        <div class="chart-bar-fill" data-width="${percentage}"></div>
                        <small style="color: #666; margin-top: 0.25rem; display: block;">
                            Vous: ${percentage}% | BA Cameroun: ${avgPercentage}%${explanation ? ' — ' + explanation : ''}
                        </small>
                    </div>
                </div>
            `;
        }).join('');
    }

    renderBABOKComparison(categoryScores) {
        return Object.entries(categoryScores).map(([category, data]) => {
            const percentage = Math.round((data.score / data.maxScore) * 100);
            const explanation = this.getCategoryExplanation(category);
            return `
                <div class="chart-bar">
                    <div class="chart-label">${category}</div>
                    <div style="flex: 1; margin-left: 1rem;">
                        <div class="chart-bar-fill" data-width="${percentage}"></div>
                        <small style="color: #666; margin-top: 0.25rem; display: block;">
                            Score: ${percentage}%${explanation ? ' — ' + explanation : ''}
                        </small>
                    </div>
                </div>
            `;
        }).join('');
    }

    renderRecommendations(results) {
        const container = document.getElementById('recommendations-list');
        const recs = this.generatePersonalizedRecommendations(results);
        
        container.innerHTML = recs.map(rec => `<li>${rec}</li>`).join('');
    }

    generatePersonalizedRecommendations(results) {
        const recommendations = [];
        const percentage = results.percentage;
        
        if (percentage < 50) {
            recommendations.push(...this.getRecommendations('experience', 'low'));
        } else if (percentage < 75) {
            recommendations.push(...this.getRecommendations('experience', 'medium'));
        } else {
            recommendations.push(...this.getRecommendations('experience', 'high'));
        }
        
        // Recommandations spécifiques selon le type d'évaluation
        if (this.currentAssessment.title.includes("DISC")) {
            const dominantDisc = this.getDominantDISC(results.discProfile);
            recommendations.push(...this.getRecommendations('disc', dominantDisc));
        }
        
        // Recommandations générales pour le contexte camerounais
        recommendations.push("Participez aux événements IIBA Cameroun pour élargir votre réseau professionnel");
        recommendations.push("Considérez une spécialisation dans les secteurs porteurs au Cameroun (FinTech, AgriTech, E-gouvernement)");
        
        return recommendations.slice(0, 6); // Limiter à 6 recommandations
    }

    getRecommendations(type, level) {
        return recommendations[type]?.[level] || [];
    }

    getDominantDISC(discProfile) {
        return Object.entries(discProfile).reduce((a, b) => 
            discProfile[a] > discProfile[b[0]] ? a : b[0], 'D');
    }

    getDISCLabel(type) {
        const labels = {
            D: 'Dominance',
            I: 'Influence', 
            S: 'Stabilité',
            C: 'Conformité'
        };
        return labels[type] || type;
    }

    translateCategory(category) {
        const translations = {
            experience: 'Expérience',
            sectors: 'Secteurs',
            tools: 'Outils',
            languages: 'Langues',
            challenges: 'Défis',
            aspirations: 'Aspirations'
        };
        return translations[category] || category;
    }

    // Explications succinctes pour les catégories BABOK (IIBA Adapté Cameroun)
    getCategoryExplanation(category) {
        const map = {
            'Planification BA': "Qualité de la planification, méthode et intégration au pilotage.",
            "Élicitation": "Maîtrise des techniques pour recueillir les besoins.",
            'Gestion Exigences': "Rigueur du cycle de vie des exigences et traçabilité.",
            'Analyse Stratégique': "Implication et leadership sur l'alignement stratégique.",
            'Contexte Multiculturel': "Capacité d'adaptation aux spécificités locales.",
            'Évaluation Solutions': "Structure et profondeur de l'évaluation des options."
        };
        return map[category] || '';
    }
    
    // Explications pour le profil BA Camerounais
    getProfileCategoryExplanation(key) {
    const map = {
    experience: "Estimation de votre ancienneté en BA par rapport à la population locale.",
    sectors: "Diversité et adéquation des secteurs d'expérience au marché camerounais.",
    tools: "Maîtrise des outils courants utilisés par les BA au Cameroun.",
    languages: "Capacité à travailler dans les langues les plus utilisées.",
    challenges: "Défi principal rencontré par les BA dans le contexte local.",
    aspirations: "Projection de carrière par rapport aux tendances observées."
    };
    return map[key] || '';
    }
    
    // Explications pour chaque dimension DISC
    getDISCExplanation(type) {
    const map = {
    D: "Dominance: orientation action, décision et résultats.",
    I: "Influence: communication, engagement et motivation.",
    S: "Stabilité: constance, soutien et coopération.",
    C: "Conformité: précision, rigueur et respect des normes."
    };
    return map[type] || '';
    }
    
    // Calcul du score maximum possible par type DISC selon le questionnaire
    computeDiscMax() {
    const max = { D: 0, I: 0, S: 0, C: 0 };
    const questions = this.currentAssessment.questions.filter(q => Array.isArray(q.options) && q.options.some(o => o.disc));
    questions.forEach(q => {
    ['D','I','S','C'].forEach(t => {
    const opt = q.options.find(o => o.disc === t);
    if (opt) max[t] += opt.score;
    });
    });
    return max;
    }
    
    // Mapping catégories FR → clés internes du profil
    getCategoryKeyMap() {
        return {
            "Expérience Professionnelle": 'experience',
            "Secteur d'Activité": 'sectors',
            "Outils Techniques": 'tools',
            "Compétences Linguistiques": 'languages',
            "Défis Professionnels": 'challenges',
            "Aspirations": 'aspirations'
        };
    }

    // Mapping des valeurs utilisateur vers les clés du profil (pour les catégories single)
    mapValueToProfileKey(categoryKey, value) {
        if (categoryKey === 'experience') {
            const m = { '0-1': 'junior', '2-5': 'intermediate', '5-10': 'senior', '10+': 'senior' };
            return m[value] || null;
        }
        if (categoryKey === 'challenges') {
            const m = { recognition: 'recognition', tools: 'tools', training: 'training', stakeholders: 'stakeholders' };
            return m[value] || null; // 'documentation' non présent dans le profil type
        }
        if (categoryKey === 'aspirations') {
            const m = { senior_ba: 'senior_ba', lead_ba: 'lead_ba', manager: 'manager', consultant: 'consultant', other: 'other' };
            return m[value] || null;
        }
        return value;
    }

    extractUserProfile() {
        // Retourne un objet mappé sur les clés internes (experience, sectors, ...)
        const map = this.getCategoryKeyMap();
        const profile = {};

        this.currentAssessment.questions.forEach(question => {
            const answer = this.answers[question.id];
            if (!answer) return;
            const key = map[question.category];
            if (!key) return; // Catégories non comparables: formation, certifications

            if (question.type === 'single') {
                const mapped = this.mapValueToProfileKey(key, answer);
                if (mapped) profile[key] = mapped;
            } else {
                // multiple
                const arr = Array.isArray(answer) ? answer : [answer];
                profile[key] = arr;
            }
        });

        return profile;
    }

    getCameroonianAverage(categoryKey, userValue) {
        // Moyenne simple des prévalences de la catégorie au sein du profil type
        const base = cameroonianBAProfile[categoryKey];
        if (!base) return 0;
        const values = Object.values(base);
        if (!values.length) return 0;
        const avg = values.reduce((a, b) => a + b, 0) / values.length;
        return Math.round(avg);
    }

    calculatePercentage(categoryKey, value) {
        // Renvoie un pourcentage basé sur la prévalence du profil type
        const base = cameroonianBAProfile[categoryKey];
        if (!base) return 0;

        // single
        if (typeof value === 'string') {
            const key = this.mapValueToProfileKey(categoryKey, value);
            const v = key ? base[key] : undefined;
            return typeof v === 'number' ? v : 0;
        }

        // multiple
        const arr = Array.isArray(value) ? value : [value];
        const mapped = arr
            .map(v => this.mapValueToProfileKey(categoryKey, v))
            .filter(v => v && typeof base[v] === 'number');
        if (!mapped.length) return 0;
        const avg = mapped.reduce((sum, k) => sum + base[k], 0) / mapped.length;
        return Math.round(avg);
    }

    restart() {
        this.currentAssessment = null;
        this.currentQuestionIndex = 0;
        this.answers = {};
        this.showAssessmentSelector();
    }
}

// Initialisation de l'application
document.addEventListener('DOMContentLoaded', () => {
    new BAAssessmentApp();
});

// Utilitaires pour le stockage local
class StorageUtil {
    static saveProgress(assessmentId, answers, currentQuestion) {
        const data = {
            assessmentId,
            answers,
            currentQuestion,
            timestamp: new Date().toISOString()
        };
        localStorage.setItem('ba_assessment_progress', JSON.stringify(data));
    }
    
    static loadProgress() {
        const data = localStorage.getItem('ba_assessment_progress');
        return data ? JSON.parse(data) : null;
    }
    
    static clearProgress() {
        localStorage.removeItem('ba_assessment_progress');
    }
    
    static saveResults(assessmentId, results) {
        const key = `ba_assessment_result_${assessmentId}`;
        const data = {
            results,
            timestamp: new Date().toISOString()
        };
        localStorage.setItem(key, JSON.stringify(data));
    }
    
    static getResults(assessmentId) {
        const key = `ba_assessment_result_${assessmentId}`;
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    }
}