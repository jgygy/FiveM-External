// 页面加载动画
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有动画
    initAnimations();
    initScrollEffects();
    initInteractiveEffects();
    initParticleSystem();
});

// 动画初始化
function initAnimations() {
    // 英雄区域文字动画
    const heroTitle = document.querySelector('.hero-title');
    const heroDescription = document.querySelector('.hero-description');
    const heroButtons = document.querySelector('.hero-buttons');
    
    // 使用 Intersection Observer 触发动画
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 1s ease forwards';
            }
        });
    }, observerOptions);

    // 观察所有需要动画的元素
    const animatedElements = document.querySelectorAll('.feature-card, .version-card, .download-card');
    animatedElements.forEach(el => observer.observe(el));

    // 导航栏滚动效果
    window.addEventListener('scroll', handleNavbarScroll);
}

// 导航栏滚动效果
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.backdropFilter = 'blur(15px)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.9)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
}

// 滚动效果
function initScrollEffects() {
    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 视差滚动效果
    window.addEventListener('scroll', handleParallaxScroll);
}

function handleParallaxScroll() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hologram-item');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
}

// 交互效果
function initInteractiveEffects() {
    // 功能卡片悬停效果
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', handleCardHover);
        card.addEventListener('mouseleave', handleCardLeave);
    });

    // 版本卡片点击效果
    const versionCards = document.querySelectorAll('.version-card');
    versionCards.forEach(card => {
        card.addEventListener('click', handleVersionSelect);
    });

    // 按钮点击效果
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .download-btn');
    buttons.forEach(button => {
        button.addEventListener('click', handleButtonClick);
    });
}

function handleCardHover(e) {
    const card = e.target.closest('.feature-card');
    card.style.transform = 'translateY(-10px) scale(1.02)';
    card.style.boxShadow = '0 20px 60px rgba(0, 245, 255, 0.3)';
}

function handleCardLeave(e) {
    const card = e.target.closest('.feature-card');
    card.style.transform = 'translateY(0) scale(1)';
    card.style.boxShadow = '';
}

function handleVersionSelect(e) {
    const card = e.target.closest('.version-card');
    document.querySelectorAll('.version-card').forEach(c => c.classList.remove('active'));
    card.classList.add('active');
    
    // 添加选择动画
    card.style.transform = 'scale(1.05)';
    setTimeout(() => {
        card.style.transform = 'scale(1)';
    }, 200);
}

function handleButtonClick(e) {
    const button = e.target;
    
    // 创建涟漪效果
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);

    // 根据按钮类型处理不同逻辑
    if (button.textContent.includes('体验') || button.textContent.includes('试用')) {
        showDownloadModal();
    } else if (button.textContent.includes('演示')) {
        showDemoModal();
    }
}

// 粒子系统
function initParticleSystem() {
    const particleContainer = document.querySelector('.particles');
    
    // 创建动态粒子
    for (let i = 0; i < 50; i++) {
        createParticle(particleContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // 随机位置和大小
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const size = Math.random() * 3 + 1;
    
    // 随机颜色
    const colors = ['#00f5ff', '#ff0080', '#00ff88'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: 50%;
        left: ${x}px;
        top: ${y}px;
        opacity: ${Math.random() * 0.5 + 0.3};
        animation: float ${Math.random() * 10 + 10}s linear infinite;
    `;
    
    container.appendChild(particle);
    
    // 动画结束后重新创建
    setTimeout(() => {
        if (particle.parentNode) {
            particle.remove();
            createParticle(container);
        }
    }, 20000);
}

// 数字计数动画
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            start = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(start);
    }, 16);
}

// 下载模态框
function showDownloadModal() {
    const modal = createModal('download-modal', `
        <h3>选择下载版本</h3>
        <div class="modal-content">
            <p>请选择您要下载的版本：</p>
            <div class="download-options">
                <button class="modal-btn" onclick="startDownload('premium')">Premium版 - ¥99/月</button>
                <button class="modal-btn" onclick="startDownload('trial')">免费试用版</button>
            </div>
        </div>
    `);
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 10);
}

function showDemoModal() {
    const modal = createModal('demo-modal', `
        <h3>观看功能演示</h3>
        <div class="modal-content">
            <div class="demo-video">
                <div class="video-placeholder">
                    <div class="play-button">▶</div>
                    <p>演示视频加载中...</p>
                </div>
            </div>
            <p>完整演示即将上线，敬请期待！</p>
        </div>
    `);
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 10);
}

function createModal(id, content) {
    const modal = document.createElement('div');
    modal.id = id;
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-backdrop" onclick="closeModal('${id}')"></div>
        <div class="modal-container">
            <button class="modal-close" onclick="closeModal('${id}')">&times;</button>
            ${content}
        </div>
    `;
    
    return modal;
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
    }
}

function startDownload(version) {
    alert(`开始下载 ${version} 版本，感谢您的支持！`);
    closeModal('download-modal');
}

// 性能优化
function optimizePerformance() {
    // 使用节流函数优化滚动事件
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // 应用节流
    const throttledScroll = throttle(handleParallaxScroll, 16);
    window.addEventListener('scroll', throttledScroll);
}

// 添加CSS动画关键帧
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes float {
        0% {
            transform: translateY(0px) translateX(0px);
        }
        33% {
            transform: translateY(-20px) translateX(10px);
        }
        66% {
            transform: translateY(10px) translateX(-10px);
        }
        100% {
            transform: translateY(0px) translateX(0px);
        }
    }

    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: rippleEffect 0.6s linear;
        pointer-events: none;
    }

    @keyframes rippleEffect {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 2000;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
    }

    .modal.show {
        opacity: 1;
        visibility: visible;
    }

    .modal-backdrop {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
    }

    .modal-container {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: var(--bg-secondary);
        border: 1px solid var(--border-color);
        border-radius: 20px;
        padding: 2rem;
        min-width: 300px;
        max-width: 500px;
    }

    .modal-close {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: none;
        border: none;
        color: var(--text-primary);
        font-size: 1.5rem;
        cursor: pointer;
    }

    .modal-btn {
        width: 100%;
        padding: 1rem;
        margin: 0.5rem 0;
        background: var(--gradient-primary);
        color: white;
        border: none;
        border-radius: 10px;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .modal-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(0, 245, 255, 0.3);
    }

    .particle {
        pointer-events: none;
    }

    .demo-video {
        text-align: center;
        margin: 1rem 0;
    }

    .video-placeholder {
        width: 100%;
        height: 200px;
        background: var(--bg-tertiary);
        border: 1px solid var(--border-color);
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: var(--text-secondary);
    }

    .play-button {
        width: 60px;
        height: 60px;
        background: var(--gradient-primary);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        margin-bottom: 1rem;
        cursor: pointer;
    }
`;
document.head.appendChild(style);

// 初始化性能优化
optimizePerformance();

// 添加页面可见性API支持
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // 页面隐藏时暂停动画
        document.querySelectorAll('.particle').forEach(p => {
            p.style.animationPlayState = 'paused';
        });
    } else {
        // 页面显示时恢复动画
        document.querySelectorAll('.particle').forEach(p => {
            p.style.animationPlayState = 'running';
        });
    }
});

// 键盘导航支持
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // 关闭所有模态框
        document.querySelectorAll('.modal').forEach(modal => {
            modal.remove();
        });
    }
});

// 错误处理和用户体验优化
window.addEventListener('error', function(e) {
    console.error('页面错误:', e.error);
    // 可以在这里添加错误恢复逻辑
});

// 预加载关键资源
const preloadLinks = [
    'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Exo+2:wght@300;400;600&display=swap'
];

preloadLinks.forEach(href => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'style';
    link.href = href;
    document.head.appendChild(link);
});

// 音乐播放器事件监听
document.addEventListener('DOMContentLoaded', function() {
    // 等待MetingJS加载完成
    setTimeout(() => {
        const meting = document.querySelector('meting-js');
        if (meting && meting.aplayer) {
            const ap = meting.aplayer;
            
            // 播放状态监听
            ap.on('play', () => {
                console.log('🎵 音乐播放开始');
            });
            
            // 暂停监听
            ap.on('pause', () => {
                console.log('⏸️ 音乐已暂停');
            });
            
            // 加载完成监听
            ap.on('canplay', () => {
                console.log('🎶 音乐加载完成');
            });
            
            // 错误监听
            ap.on('error', (e) => {
                console.error('❌ 音乐播放错误:', e);
            });
        }
    }, 1000);
});

console.log('FiveM-External 网站已完全加载，所有功能正常运行！');

// 禁止复制文字功能
(function() {
    // 禁用右键菜单
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
    });

    // 禁用选择文字
    document.addEventListener('selectstart', function(e) {
        e.preventDefault();
        return false;
    });

    // 禁用拖拽
    document.addEventListener('dragstart', function(e) {
        e.preventDefault();
        return false;
    });

    // 禁用复制快捷键 (Ctrl+C, Ctrl+X)
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'x' || e.key === 'a')) {
            e.preventDefault();
            return false;
        }
    });

    // 禁用F12开发者工具
    document.addEventListener('keydown', function(e) {
        if (e.key === 'F12' || 
            (e.ctrlKey && e.shiftKey && e.key === 'I') || 
            (e.ctrlKey && e.shiftKey && e.key === 'J') ||
            (e.ctrlKey && e.key === 'u')) {
            e.preventDefault();
            return false;
        }
    });

    // 禁用复制事件
    document.addEventListener('copy', function(e) {
        e.preventDefault();
        return false;
    });

    // 禁用剪切事件
    document.addEventListener('cut', function(e) {
        e.preventDefault();
        return false;
    });

    // 添加版权提示
    document.addEventListener('copy', function(e) {
        e.preventDefault();
        alert('内容受版权保护，禁止复制！');
    });

    // 保护图片
    document.addEventListener('mousedown', function(e) {
        if (e.target.tagName === 'IMG') {
            e.preventDefault();
            return false;
        }
    });

    console.log('版权保护功能已启用');
})();