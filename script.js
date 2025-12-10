document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const dogImage = document.getElementById('dog-image');
    const loadingText = document.getElementById('loading-text');

    // API 地址
    const apiUrl = 'https://dog.ceo/api/breeds/image/random';

    // 异步函数：获取并显示随机狗狗图片
    async function fetchDogImage() {
        // 1. 设置加载状态
        dogImage.style.display = 'none';
        loadingText.textContent = '正在努力寻找狗狗...请稍候...';

        try {
            // 2. 调用 API 获取数据
            const response = await fetch(apiUrl);
            
            if (!response.ok) {
                throw new Error(`HTTP 错误！状态码: ${response.status}`);
            }

            const data = await response.json();
            
            // 3. 检查数据是否成功
            if (data.status === 'success') {
                const imageUrl = data.message;
                
                // 4. 加载图片
                dogImage.onload = () => {
                    // 图片加载完成后，隐藏加载文字，显示图片
                    loadingText.style.display = 'none';
                    dogImage.style.display = 'block';
                };
                
                // 设置图片源
                dogImage.src = imageUrl;
                
            } else {
                throw new Error('API 返回了失败状态。');
            }

        } catch (error) {
            // 5. 错误处理
            console.error('获取狗狗图片失败:', error);
            loadingText.style.display = 'block';
            loadingText.textContent = '抱歉，加载图片失败。请检查网络或稍后重试。';
            dogImage.style.display = 'none';
        }
    }

    // 绑定按钮点击事件
    generateBtn.addEventListener('click', fetchDogImage);
    
    // 首次加载页面时，自动获取一张图片
    fetchDogImage();
});