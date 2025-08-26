// 创建气球
function createBalloons() {
    const colors = ['#ff6b6b', '#ffa502', '#2ed573', '#1e90ff', '#ff6348', '#ff7f50'];
    for (let i = 0; i < 15; i++) {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        balloon.style.left = Math.random() * 100 + 'vw';
        balloon.style.top = Math.random() * 100 + 'vh';
        balloon.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        balloon.style.animationDuration = (Math.random() * 5 + 5) + 's';
        balloon.style.animationDelay = Math.random() * 5 + 's';
        document.body.appendChild(balloon);

        // 气球点击事件
        balloon.addEventListener('click', function() {
            this.style.animation = 'none';
            this.style.transform = 'translateY(-100vh) rotate(360deg)';
            this.style.transition = 'all 2s ease-out';

            // 播放气球爆炸音效
            const popSound = new Audio('./assets/audios/balloon-pop.mp3');
            popSound.volume = 0.3;
            popSound.play();


            setTimeout(() => {
                this.remove();
            }, 2000);
            createMiniExplosion(this.offsetLeft, this.offsetTop, colors[Math.floor(Math.random() * colors.length)]);
        });
    }
}

// 创建迷你爆炸效果
function createMiniExplosion(x, y, color) {
    for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.className = 'confetti';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.backgroundColor = color;
        particle.style.animationDuration = (Math.random() * 1 + 0.5) + 's';
        particle.style.width = (Math.random() * 8 + 4) + 'px';
        particle.style.height = (Math.random() * 8 + 4) + 'px';

        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 50 + 30;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        particle.style.setProperty('--tx', tx + 'px');
        particle.style.setProperty('--ty', ty + 'px');
        document.body.appendChild(particle);
        setTimeout(() => {
            particle.remove();
        }, 1000);
    }
}

// 创建彩色纸屑
function createConfetti() {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    for (let i = 0; i < 150; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
        confetti.style.animationDelay = Math.random() * 2 + 's';
        confetti.style.width = (Math.random() * 10 + 5) + 'px';
        confetti.style.height = (Math.random() * 10 + 5) + 'px';
        document.body.appendChild(confetti);
    }
}

// 创建烟花
function createFirework(x, y) {
    const colors = ['#ff0000', '#ffff00', '#00ffff', '#ff00ff', '#00ff00'];
    const firework = document.createElement('div');
    firework.className = 'firework';
    firework.style.left = x + 'px';
    firework.style.top = y + 'px';
    firework.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    document.body.appendChild(firework);

    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.className = 'confetti';
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            particle.style.animationDuration = (Math.random() * 2 + 1) + 's';
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 100 + 50;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;
            particle.style.setProperty('--tx', tx + 'px');
            particle.style.setProperty('--ty', ty + 'px');
            document.body.appendChild(particle);
            setTimeout(() => {
                particle.remove();
            }, 2000);
        }, i * 20);
    }
    setTimeout(() => {
        firework.remove();
    }, 2000);
}

// 打字机效果
function typeWriter(element, text, speed, callback) {
    let i = 0;
    element.textContent = '';
    element.classList.add('typewriter');
    function typing() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(typing, speed);
        } else {
            element.classList.remove('typewriter');
            if (callback) callback();
        }
    }
    typing();
}

// 生日倒计时
function updateCountdown() {
    const now = new Date();
    const currentYear = now.getFullYear();

    // 设置生日日期为8月27日
    let birthday = new Date(currentYear, 7, 27); // 月份是0-11，所以7表示8月

    // 如果今年的生日已经过了，就计算明年的生日
    if (now > birthday) {
        birthday = new Date(currentYear + 1, 7, 27);
    }

    const diff = birthday - now;

    // 计算天数、小时、分钟和秒
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    // 如果是生日当天
    if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
        document.getElementById('countdown').textContent = "今天是团元的生日！";
    } else {
        document.getElementById('countdown').textContent = `距离团元生日还有: ${days}天 ${hours}小时 ${minutes}分 ${seconds}秒`;
    }
}

// 蜡烛控制
function toggleCandle() {
    const candle = document.getElementById('candle');
    const flame = document.getElementById('flame');
    const birthdayCake = document.getElementById('birthdayCake');

    if (flame.style.display === 'block') {
        // 吹灭蜡烛
        flame.style.display = 'none';
        createMiniExplosion(
            birthdayCake.offsetLeft + birthdayCake.offsetWidth / 2,
            birthdayCake.offsetTop - 20,
            '#ffff00'
        );
        // 播放吹气声
        const blowSound = new Audio('./assets/audios/chui.mp3');
        blowSound.volume = 0.3;
        blowSound.play();
    } else {
        // 点燃蜡烛
        candle.style.display = 'block';
        flame.style.display = 'block';
        // 播放点火声
        const fireSound = new Audio('./assets/audios/dianhuo.mp3');
        fireSound.volume = 0.3;
        fireSound.play();
    }
}


// 初始化
document.addEventListener('DOMContentLoaded', function() {
    createBalloons();
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // 获取元素
    const clockBtn = document.getElementById('clockBtn');
    const timeDisplay = document.getElementById('timeDisplay');
    let timeVisible = false;
    let timeUpdateInterval;

    const surpriseBtn = document.getElementById('surpriseBtn');
    const message = document.getElementById('message');
    const musicPlayer = document.getElementById('musicPlayer');
    const playBtn = document.getElementById('playBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const lyricsBtn = document.getElementById('lyricsBtn');
    const lyricsContainer = document.getElementById('lyricsContainer');
    const progressContainer = document.getElementById('progressContainer');
    const progressBar = document.getElementById('progressBar');
    const photoBtn = document.getElementById('photoBtn');
    const photoWall = document.getElementById('photoWall');
    const closeWall = document.getElementById('closeWall');
    const birthdayCake = document.getElementById('birthdayCake');
    const birthdayTitle = document.getElementById('birthdayTitle');
    const greetingText = document.getElementById('greetingText');
    const wishText = document.getElementById('wishText');



    // 时钟按钮点击事件
    clockBtn.addEventListener('click', function() {
        timeVisible = !timeVisible;

        if(timeVisible) {
            // 显示并更新时间
            updateTimeDisplay();
            timeDisplay.style.display = 'block';

            // 每秒更新时间
            timeUpdateInterval = setInterval(updateTimeDisplay, 1000);
        } else {
            // 隐藏时间
            timeDisplay.style.display = 'none';
            clearInterval(timeUpdateInterval);
        }
    });
    function updateTimeDisplay() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        timeDisplay.textContent = `${hours}:${minutes}:${seconds}`;
    }

    // 显示时钟按钮
    clockBtn.style.display = 'block';




    // 创建音频元素
    const audio = new Audio('./assets/audios/birthday.mp3');
    let lyricsLines = Array.from(document.querySelectorAll('.lyrics-line'));
    let currentLyric = 0;
    let fireworkInterval;

    // 更新进度条
    audio.addEventListener('timeupdate', function() {
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = `${progressPercent}%`;

        // 高亮当前歌词
        const currentTime = audio.currentTime;
        let found = false;
        lyricsLines.forEach((line, index) => {
            line.classList.remove('highlight');
            if (!found && index * 3 <= currentTime && currentTime < (index + 1) * 3) {
                line.classList.add('highlight');
                found = true;
            }
        });
    });

    // 点击进度条跳转
    progressContainer.addEventListener('click', function(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = audio.duration;
        audio.currentTime = (clickX / width) * duration;
    });

    // 播放按钮点击事件
    playBtn.addEventListener('click', function() {
        audio.play();
    });

    // 暂停按钮点击事件
    pauseBtn.addEventListener('click', function() {
        audio.pause();
    });

    // 歌词按钮点击事件
    lyricsBtn.addEventListener('click', function() {
        if (lyricsContainer.style.display === 'block') {
            lyricsContainer.style.display = 'none';
            this.textContent = '查看歌词';
        } else {
            lyricsContainer.style.display = 'block';
            this.textContent = '隐藏歌词';
        }
    });

    // 照片墙按钮点击事件
    photoBtn.addEventListener('click', function() {
        photoWall.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });

    // 关闭照片墙
    closeWall.addEventListener('click', function() {
        photoWall.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // 蛋糕点击事件
    //birthdayCake.addEventListener('click', toggleCandle);

    birthdayCake.addEventListener('click', function(e) {
        // 阻止事件冒泡，避免触发页面的爱心创建
        e.stopPropagation();
        toggleCandle();
    });





    // 惊喜按钮点击事件
    surpriseBtn.addEventListener('click', function() {
        // 打字机效果
        typeWriter(birthdayTitle, "团元，生日快乐！", 100, function() {
            typeWriter(greetingText, "在这个特别的日子里，祝你：", 50, function() {
                typeWriter(wishText, "健康快乐，心想事成，\n每一天都充满阳光和欢笑！", 30);
            });
        });

        message.classList.remove('hidden');
        createConfetti();
        surpriseBtn.textContent = '惊喜已送达！';
        surpriseBtn.disabled = true;
        photoBtn.classList.remove('hidden');

        // 显示音乐播放器
        musicPlayer.style.display = 'flex';

        // 点燃蜡烛
        document.getElementById('candle').style.display = 'block';
        document.getElementById('flame').style.display = 'block';

        // 播放生日歌
        audio.play().catch(e => {
            console.log('自动播放被阻止，请手动点击播放按钮');
            const hint = document.createElement('div');
            hint.textContent = '请点击播放按钮播放音乐';
            hint.style.position = 'fixed';
            hint.style.bottom = '100px';
            hint.style.right = '20px';
            hint.style.backgroundColor = 'rgba(255,255,255,0.9)';
            hint.style.padding = '8px 15px';
            hint.style.borderRadius = '15px';
            hint.style.zIndex = '1001';
            hint.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            document.body.appendChild(hint);
            setTimeout(() => {
                hint.remove();
            }, 3000);
        });

        // 随机烟花
        fireworkInterval = setInterval(() => {
            createFirework(
                Math.random() * window.innerWidth,
                Math.random() * window.innerHeight / 2
            );
        }, 2000);

            setTimeout(() => {
                document.getElementById('birthdayQuestion').classList.remove('hidden');
            }, 3000);
    }
    );
    // 添加新的交互逻辑
    let noBtnCount = 0;
    const noBtn = document.getElementById('no-btn');
    const yesBtn = document.getElementById('yes-btn');
    const birthdayQuestion = document.getElementById('birthdayQuestion');

    noBtn.addEventListener('mouseenter', function() {
        noBtnCount++;

        if(noBtnCount < 3) {
            noBtn.style.animation = 'buttonMove 0.5s infinite';
        }
        else if(noBtnCount < 5) {
            noBtn.style.animation = 'buttonMove2 0.5s infinite';
        }
        else {
            noBtn.style.animation = '';
            noBtn.textContent = '好吧...喜欢';
            noBtn.classList.remove('btn-danger');
            noBtn.classList.add('btn-primary');
            noBtn.style.transform = 'scale(1.2)';
        }
    });

    yesBtn.addEventListener('click', function() {
        showBirthdayCelebration();
    });

    noBtn.addEventListener('click', function() {
        if(noBtnCount >= 5) {
            showBirthdayCelebration();
        }
    });

    function showBirthdayCelebration() {
        birthdayQuestion.classList.add('hidden');

        const celebrationDiv = document.createElement('div');
        celebrationDiv.className = 'birthday-celebration';
        celebrationDiv.innerHTML = `
            <h1>太棒了！祝你生日快乐！</h1>
            <div style="font-size: 5em;">🎉🎂🎁</div>
        `;

        document.body.appendChild(celebrationDiv);

        // 添加更多庆祝效果
        createConfetti();
        setTimeout(() => {
            createFirework(window.innerWidth/2, window.innerHeight/2);
        }, 500);

        setTimeout(() => {
            celebrationDiv.remove();
        }, 5000);
    }

    // 点击页面任意位置创建爱心
    document.addEventListener('click', function(e) {
        if (e.target === surpriseBtn || e.target === playBtn || e.target === pauseBtn ||
            e.target === lyricsBtn || e.target === photoBtn || e.target === closeWall) {
            return;
        }
        const a = ["❤", "🎂", "🎁", "🎈", "✨"];
        const $i = document.createElement('span');
        $i.textContent = a[Math.floor(Math.random() * a.length)];
        $i.style.cssText = `
            z-index: 999;
            position: absolute;
            top: ${e.clientY - 20}px;
            left: ${e.clientX}px;
            font-weight: bold;
            font-size: ${Math.random() * 20 + 10}px;
            color: rgb(${~~(255 * Math.random())}, ${~~(255 * Math.random())}, ${~~(255 * Math.random())});
            pointer-events: none;
            user-select: none;
            transform: translate(-50%, -50%);
            animation: float-up ${Math.random() * 2 + 1}s ease-out forwards;
        `;
        document.body.appendChild($i);
        setTimeout(() => {
            $i.remove();
        }, 2000);
    });
});