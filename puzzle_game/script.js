console.log("脚本已加载！");
console.log(document.getElementById('restart'));
// 游戏初始化
document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const scoreDisplay = document.getElementById('score');
    const restartButton = document.getElementById('restart');

    let cards = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];
    let flippedCards = [];
    let matchedPairs = 0;
    let score = 0;

    // 洗牌函数
    function shuffleArray(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    // 创建游戏板
    function createBoard() {
        gameBoard.innerHTML = '';
        shuffledCards = shuffleArray([...cards]);
        shuffledCards.forEach((card, index) => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('card');
            cardElement.dataset.value = card;
            cardElement.dataset.index = index;
            cardElement.addEventListener('click', flipCard);
            gameBoard.appendChild(cardElement);
        });
    }

    // 翻转卡片
    function flipCard() {
        if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
            this.classList.add('flipped');
            this.textContent = this.dataset.value;
            flippedCards.push(this);

            if (flippedCards.length == 2) {
                checkForMatch();
            }
        }
    }

    // 检查匹配
    function checkForMatch() {
        const [card1, card2] = flippedCards;

        if (card1.dataset.value === card2.dataset.value) {
            // 匹配成功
            matchedPairs++;
            score += 10;
            scoreDisplay.textContent = score;
            flippedCards = [];

            if (matchedPairs === cards.length / 2) {
                setTimeout(() => {
                    alert(`恭喜你赢了！ 最终得分：${score}`);
                }, 500);
            }
        } else {
            // 匹配失败
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                card1.textContent = '';
                card2.textContent = '';
                flippedCards = [];
                score = Math.max(0, score - 2);
                scoreDisplay.textContent = score;
            }, 1000)
        }
    }

    // 重新开始游戏
    restartButton.addEventListener('click', () => {
        console.log("点击了重新开始");
        flippedCards = [];
        matchedPairs = 0;
        score = 0;
        scoreDisplay.textContent = score;
        createBoard();
    });

    // 初始化游戏
    createBoard();
})