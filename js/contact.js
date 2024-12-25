// 表单提交处理
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 获取表单数据
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        // 显示提交成功消息
        alert('感谢您的留言！我们会尽快回复。');
        
        // 清空表单
        contactForm.reset();
        
        // 这里可以添加实际的表单提交逻辑
        console.log('表单数据：', formData);
    });
    
    // 初始化百度地图
    initBaiduMap();
});

// 初始化百度地图
function initBaiduMap() {
    // 创建地图实例
    const map = new BMap.Map("baiduMap");
    
    // 西安市中心坐标（这里使用的是大雁塔的大致坐标）
    const point = new BMap.Point(108.967, 34.228);
    
    // 初始化地图，设置中心点坐标和地图级别
    map.centerAndZoom(point, 15);
    
    // 添加地图控件
    map.addControl(new BMap.NavigationControl());    // 添加平移缩放控件
    map.addControl(new BMap.ScaleControl());         // 添加比例尺控件
    map.addControl(new BMap.OverviewMapControl());   // 添加缩略地图控件
    map.enableScrollWheelZoom();                     // 启用滚轮放大缩小
    
    // 添加标记点
    const marker = new BMap.Marker(point);
    map.addOverlay(marker);
    
    // 添加信息窗口
    const infoWindow = new BMap.InfoWindow("西安旅游信息中心", {
        width: 200,
        height: 100,
        title: "我们在这里"
    });
    
    // 点击标记时显示信息窗口
    marker.addEventListener("click", function() {
        map.openInfoWindow(infoWindow, point);
    });
}

// 表单验证增强
function validateForm() {
    const emailInput = document.getElementById('email');
    const nameInput = document.getElementById('name');
    
    // 邮箱格式验证
    emailInput.addEventListener('input', function() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this.value)) {
            this.setCustomValidity('请输入有效的邮箱地址');
        } else {
            this.setCustomValidity('');
        }
    });
    
    // 姓名长度验证
    nameInput.addEventListener('input', function() {
        if (this.value.length < 2) {
            this.setCustomValidity('姓名至少需要2个字符');
        } else {
            this.setCustomValidity('');
        }
    });
}

// 调用表单验证
validateForm(); 