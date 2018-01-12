var dataBarrage = [{
	value: '使用的是静态死数据',
	color: 'blue',
	range: [0, 0.5]
}, {
	value: '随机循环播放',
	color: 'blue',
	range: [0, 0.6]
}, {
	value: '可以控制区域和垂直分布范围',
	color: 'blue',
	range: [0, 0.5]
}, {
	value: '字体大小和速度在方法内设置',
	color: 'black',
	range: [0.1, 1]
}, {
	value: '适合用在一些静态页面上',
	color: 'black',
	range: [0.2, 1]
}, {
	value: '基于canvas实现',
	color: 'black',
	range: [0.2, 0.9]
}, {
	value: '因此IE9+浏览器才支持',
	color: 'black',
	range: [0.2, 1]
}, {
	value: '可以设置边框颜色',
	color: 'black',
	range: [0.2, 1]
}, {
	value: '文字颜色默认都是白色',
	color: 'black',
	range: [0.2, 0.9]
}, {
	value: '若文字颜色不想白色',
	color: 'black',
	range: [0.2, 1]
}, {
	value: '需要自己调整下JS',
	color: 'black',
	range: [0.6, 0.7]
}, {
	value: '如果需要的是真实和视频交互的弹幕',
	color: 'black',
	range: [0.2, 1]
}, {
	value: '可以回到原文',
	color: 'black',
	range: [0, 0.9]
}, {
	value: '查看另外一个demo',
	color: 'black',
	range: [0.7, 1]
}, {
	value: '下面就是占位弹幕了',
	color: 'black',
	range: [0.7, 0.95]
}, {
	value: '前方高能预警！！！',
	color: 'orange',
	range: [0.5, 0.8]
}, {
	value: '前方高能预警！！！',
	color: 'orange',
	range: [0.5, 0.9]
}, {
	value: '前方高能预警！！！',
	color: 'orange',
	range: [0, 1]
}, {
	value: '前方高能预警！！！',
	color: 'orange',
	range: [0, 1]
}];

const canvas = document.getElementById('my-canvas');
console.log(2);


class Barrage {
	constructor (canvas, data) {
		this.initSpeed = 0.4;
		this.initFontSize = 14;
		this.opacity = 0.8 + 0.2 * Math.random();
		this.canvas = canvas;
		this.data = data;
		this.x = (1 + 1 / Math.random()) * canvas.width;
		this.y = data.range[0] * canvas.height + (data.range[1] - data.range[0]) * canvas.height * Math.random();
		if (this.y < this.initFontSize) {
			this.y = this.initFontSize;
		} else if (this.y > canvas.height) {
			this.y = canvas.height - this.initFontSize;
		}
		this.speed = this.initSpeed + Math.random();
		this.ctx = canvas.getContext('2d');
	}
	
	render () {
		this.x -= this.speed;
		if (this.x < -1.5 * canvas.width) {
			this.x = canvas.width;
			this.y = this.data.range[0] * this.canvas.height + (this.data.range[1] - this.data.range[0]) * this.canvas.height * Math.random();
			if (this.y < 0) {
				this.y = this.initFontSize;
			} else if (this.y > canvas.height) {
				this.y = canvas.height - this.initFontSize;
			}
			this.speed = this.initSpeed + Math.random();			
		}
		this.draw();
	}

	draw() {
		this.ctx.font = this.initFontSize + 'px "microsoft yahei", sans-serif';
		this.ctx.strokeStyle = this.data.color;
		this.ctx.fillStyle = 'rgba(255, 255, 255,' + this.opacity + ')';
		this.ctx.fillText(this.data.value, this.x, this.y);
		this.ctx.strokeText(this.data.value, this.x, this.y);
	}

}

function initBarrage(canvas, data) {
	const stores = data.map((item) => new Barrage(canvas, item));
	const ctx = canvas.getContext('2d');
	const draw = () => {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		stores.map((barrage) => barrage.render());
		requestAnimationFrame(draw);
	}
	requestAnimationFrame(draw);
}


initBarrage(canvas, dataBarrage);
